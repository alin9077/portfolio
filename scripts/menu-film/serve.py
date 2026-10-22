"""Local static server with HTTP Range support, so video heroes can seek like on the real host. Usage: serve.py PORT ROOT"""
import http.server, os, re, sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        if self.path.split('?')[0] == '/__preview':
            # Local review only: open the portfolio without the invitation gate (as output/mobile-review/preview-server.cjs does).
            html = open('index.html', encoding='utf8').read().replace('<head>', '<head><base href="/">') \
                .replace('data-access="locked"', 'data-access="granted"').replace('<script src="access.js" defer></script>', '') \
                .replace('data-portfolio-src=', 'src=')
            if 'reduce' in self.path:  # emulate the system Reduce Motion setting
                html = html.replace('<head>', "<head><script>{const m=matchMedia.bind(window);window.matchMedia=q=>m(q.includes('reduced-motion')?'(min-width:0px)':q)}</script>", 1)
            html = html.encode()
            self.send_response(200); self.send_header('Content-Type', 'text/html'); self.send_header('Content-Length', str(len(html))); self.end_headers()
            import io; return io.BytesIO(html)
        path = self.translate_path(self.path)
        m = re.match(r'bytes=(\d+)-(\d*)', self.headers.get('Range', ''))
        if not m or not os.path.isfile(path):
            return super().send_head()
        size = os.path.getsize(path)
        start, end = int(m.group(1)), int(m.group(2) or size - 1)
        f = open(path, 'rb'); f.seek(start)
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Accept-Ranges', 'bytes')
        self.end_headers()
        self.range_left = end - start + 1
        return f

    def copyfile(self, src, dst):
        left = getattr(self, 'range_left', None)
        if left is None:
            return super().copyfile(src, dst)
        while left > 0:
            chunk = src.read(min(65536, left))
            if not chunk: break
            dst.write(chunk); left -= len(chunk)

os.chdir(sys.argv[2])
http.server.ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1])), Handler).serve_forever()
