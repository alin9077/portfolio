"""Render menu-film.html in headless Chrome.

  python render.py sheet [--film menu|income] [--beats 0-51] [--step 1]   one frame per beat → contact sheets in output/menu-story/film/
  python render.py still --at 0,24 [--size 1300]      full-size PNGs at the given seconds (posters, detail checks)
  python render.py video [--size 1300] [--workers 8]  every frame at 60 fps, 6 averaged subframes → H.264 + yuv420p

Needs Playwright (Chromium), Pillow and an ffmpeg with libx264 (set FFMPEG=/path/to/ffmpeg if it is not on PATH).
"""
import argparse, asyncio, http.server, io, os, shutil, subprocess, sys, threading
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]          # the portfolio, so the film can load ../../fonts
FILMS = {
    'menu': ('scripts/menu-film/menu-film.html', ROOT / 'output/menu-story/film', ROOT / 'assets/menu-story/menu-film-1x1.mp4'),
    'income': ('scripts/income-film/income-film.html', ROOT / 'output/ai-income-story/film', ROOT / 'assets/ai-income-story/income-film-1x1.mp4'),
}
PAGE, OUT, VIDEO = FILMS['menu']
FPS, SUB = 60, 6


class Frames:
    """Collects posted frames and writes them to ffmpeg in order."""
    def __init__(self, sink):
        self.sink, self.next, self.pending, self.lock = sink, 0, {}, threading.Lock()

    def put(self, i, data):
        with self.lock:
            self.pending[i] = data
            while self.next in self.pending:
                self.sink.write(self.pending.pop(self.next))
                self.next += 1


def serve(frames=None):
    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **k): super().__init__(*a, directory=str(ROOT), **k)
        def log_message(self, *a): pass
        def do_POST(self):
            data = self.rfile.read(int(self.headers['Content-Length']))
            frames.put(int(self.path.rsplit('/', 1)[1]), data)
            self.send_response(204); self.end_headers()
    http.server.ThreadingHTTPServer.request_queue_size = 128
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, f'http://127.0.0.1:{server.server_address[1]}'


async def open_film(browser, base, size, extra=''):
    context = await browser.new_context(viewport={'width': size, 'height': size}, device_scale_factor=1)
    page = await context.new_page()
    page.on('pageerror', lambda e: print('page error:', e, file=sys.stderr))
    await page.goto(f'{base}/{PAGE}?render&size={size}{extra}')
    await page.evaluate('() => window.film.ready')
    return page


async def sheet(beats, step, size=900, cols=4):
    OUT.mkdir(parents=True, exist_ok=True)
    server, base = serve()
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel=os.environ.get('PW_CHANNEL', 'chrome'))
        page = await open_film(browser, base, size)
        times = [b for b in frange(beats[0], beats[1], step)]
        beat = await page.evaluate('() => window.film.BEAT')
        shots = []
        for b in times:
            url = await page.evaluate('(t) => { window.film.draw(t); return document.getElementById("film").toDataURL("image/png"); }', b * beat)
            shots.append((b, Image.open(io.BytesIO(__import__('base64').b64decode(url.split(',')[1])))))
        await browser.close()
    server.shutdown()
    cell, gap, label = 400, 12, 28
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 18)
    for n in range(0, len(shots), cols * 3):
        group = shots[n:n + cols * 3]
        rows = (len(group) + cols - 1) // cols
        sheet = Image.new('RGB', (cols * (cell + gap) + gap, rows * (cell + gap + label) + gap), '#222')
        draw = ImageDraw.Draw(sheet)
        for k, (b, im) in enumerate(group):
            x, y = gap + (k % cols) * (cell + gap), gap + (k // cols) * (cell + gap + label)
            draw.text((x, y + 2), f'beat {b:g}  ·  {b * beat:.2f}s', fill='#ddd', font=font)
            sheet.paste(im.resize((cell, cell), Image.LANCZOS), (x, y + label))
        path = OUT / f'contact-{shots[n][0]:05.1f}-{group[-1][0]:05.1f}.png'
        sheet.save(path)
        print(path)


async def still(times, size, clean=False):
    OUT.mkdir(parents=True, exist_ok=True)
    server, base = serve()
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel=os.environ.get('PW_CHANNEL', 'chrome'))
        page = await open_film(browser, base, size, '&clean' if clean else '')
        for t in times:
            url = await page.evaluate('(t) => { window.film.draw(t); return document.getElementById("film").toDataURL("image/png"); }', t)
            path = OUT / f"still-{t:06.2f}s{'-clean' if clean else ''}.png"
            path.write_bytes(__import__('base64').b64decode(url.split(',')[1]))
            print(path)
        await browser.close()
    server.shutdown()


async def video(size, workers):
    ffmpeg = os.environ.get('FFMPEG') or shutil.which('ffmpeg')
    if not ffmpeg: sys.exit('ffmpeg not found: set FFMPEG=/path/to/ffmpeg')
    VIDEO.parent.mkdir(parents=True, exist_ok=True)
    enc = subprocess.Popen([ffmpeg, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{size}x{size}', '-r', str(FPS), '-i', '-',
                            '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20',
                            '-tune', 'animation', '-profile:v', 'high', '-g', '120', '-colorspace', 'bt709', '-color_primaries', 'bt709',
                            '-color_trc', 'bt709', '-color_range', 'tv', '-movflags', '+faststart', '-an', str(VIDEO)], stdin=subprocess.PIPE)
    frames = Frames(enc.stdin)
    server, base = serve(frames)
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel=os.environ.get('PW_CHANNEL', 'chrome'))
        pages = [await open_film(browser, base, size) for _ in range(workers)]
        total = round(await pages[0].evaluate('() => window.film.T') * FPS)
        print(f'{total} frames × {SUB} subframes at {size}px, {workers} workers')
        # Interleave frames across workers so the in-order writer never waits long.
        await asyncio.gather(*[page.evaluate('''async ([start, step, total, fps, sub]) => {
            for (let i = start; i < total; i += step)
              await fetch('/frame/' + i, { method: 'POST', body: window.film.frame(i, fps, sub) });
          }''', [w, workers, total, FPS, SUB]) for w, page in enumerate(pages)])
        await browser.close()
    server.shutdown()
    enc.stdin.close(); enc.wait()
    print(VIDEO, f'{VIDEO.stat().st_size / 1e6:.1f} MB')


def frange(a, b, s):
    x = a
    while x <= b + 1e-9:
        yield round(x, 3); x += s


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('mode', choices=['sheet', 'still', 'video'])
    ap.add_argument('--film', choices=list(FILMS), default='menu')
    ap.add_argument('--at', default='0')
    ap.add_argument('--clean', action='store_true', help='still: leave out captions and the cursor')
    ap.add_argument('--beats', default='0-51.5')
    ap.add_argument('--step', type=float, default=1)
    ap.add_argument('--size', type=int, default=1300)
    ap.add_argument('--workers', type=int, default=8)
    a = ap.parse_args()
    PAGE, OUT, VIDEO = FILMS[a.film]
    if a.mode == 'sheet': asyncio.run(sheet([float(v) for v in a.beats.split('-')], a.step))
    elif a.mode == 'still': asyncio.run(still([float(v) for v in a.at.split(',')], a.size, a.clean))
    else: asyncio.run(video(a.size, a.workers))
