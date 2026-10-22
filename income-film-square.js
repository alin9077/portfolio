/* AI income hero film, 22 October 2026. A 28-second 1:1 loop rendered from scripts/income-film/income-film.html
   (render.py --film income: 60 fps, six averaged subframes, H.264). The previous line-drawn film is kept in output/ai-income-story/. */
window.IncomeFilm = { mount(host) {
  if (host.film) return host.film;
  const D = 28;
  host.setAttribute('aria-label', 'AI income verification film, with sample values. A customer applies for a credit card and uploads a payslip from the city. ' +
    'First, the bank has to verify their income. Today bankers do it by hand: opening the payslip, blacking out the tax file number and copying figures into a calculator, 31 clicks. ' +
    'Now an AI agent redacts, reads and checks it all, and shows the figure and how it got there: $8,109.57 a month, $3,742.88 gross pay × 26 ÷ 12. ' +
    'The banker checks the evidence, then confirms in one click. 31 clicks become one confirmation in the proposed workflow, and customers get what they applied for, sooner.');
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>:host{display:block;width:100%;height:100%}video{display:block;width:100%;height:100%;object-fit:cover;background:#f2f1ec}</style>
    <video muted playsinline loop preload="auto" disablepictureinpicture aria-hidden="true" poster="assets/ai-income-story/income-film-poster.webp"></video>`;
  const video = root.querySelector('video'), SRC = 'assets/ai-income-story/income-film-1x1.mp4';
  video.muted = true;
  // Play from memory: Safari can't stream video from servers without byte ranges (local previews), so fetch it whole.
  // Fall back to streaming if the fetch or a blob: source is refused.
  const stream = () => { if (video.getAttribute('src') !== SRC) { video.src = SRC; restore(); } };
  let wanted = 0;
  const restore = () => { if (wanted) video.currentTime = wanted; if (playing) video.play().catch(() => {}); };
  fetch(SRC).then((r) => (r.ok ? r.blob() : Promise.reject())).then((blob) => {
    if (destroyed) return;
    video.addEventListener('error', stream, { once: true });
    video.src = URL.createObjectURL(blob);
    video.addEventListener('loadedmetadata', restore, { once: true });
  }).catch(stream);
  let playing = false, destroyed = false;
  // Moving the player (the floating dock) can pause it; resume while the portfolio still wants it playing.
  video.addEventListener('pause', () => queueMicrotask(() => { if (playing && !destroyed && video.paused) video.play().catch(() => {}); }));
  const api = {
    D,
    set(v) { api.pause(); wanted = Math.max(0, Math.min(D - 0.05, v)); try { video.currentTime = wanted; } catch (e) { /* applied once loaded */ } },
    play() { playing = true; video.play().catch((e) => { if (e.name === 'NotAllowedError') playing = false; }); },
    pause() { playing = false; video.pause(); },
    get playing() { return playing; },
    get time() { return video.currentTime; },
    destroy() { destroyed = true; api.pause(); },
    setReduced() {}
  };
  host.film = api;
  return api;
}};
