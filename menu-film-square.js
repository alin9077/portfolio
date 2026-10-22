/* Menu Finder hero film, 22 October 2026. A 26-second 1:1 loop rendered from scripts/menu-film/menu-film.html
   (render.py: 60 fps, six averaged subframes, H.264). The previous illustrated film is kept in output/menu-story/. */
window.MenuFilm = { mount(host) {
  if (host.film) return host.film;
  const D = 26;
  host.setAttribute('aria-label', 'Menu Finder film. Dinner meant pinching and squinting at menu photos. What if you started with the food? ' +
    'Agents collected 82,000+ menu documents from websites and photos, and models read each menu into dishes and prices: 700,000+ menu items from 35,000+ restaurants. ' +
    'Then one neighbourhood: 823 places near Newtown. Ramen under $20 finds 6 places within 2 km, and the match is hokkaido miso ramen, $14.70, at Take Sushi and Ramen Bar, 174 m away.');
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>:host{display:block;width:100%;height:100%}video{display:block;width:100%;height:100%;object-fit:cover;background:#f2f1ec}</style>
    <video muted playsinline loop preload="auto" disablepictureinpicture aria-hidden="true" poster="assets/menu-story/menu-film-poster.webp">
      <source src="assets/menu-story/menu-film-1x1.mp4" type="video/mp4">
    </video>`;
  const video = root.querySelector('video');
  video.muted = true;
  let playing = false, destroyed = false;
  // Moving the player (the floating dock) can pause it; resume while the portfolio still wants it playing.
  video.addEventListener('pause', () => queueMicrotask(() => { if (playing && !destroyed && video.paused) video.play().catch(() => {}); }));
  const api = {
    D,
    set(v) { api.pause(); try { video.currentTime = Math.max(0, Math.min(D - 0.05, v)); } catch (e) { /* not seekable yet */ } },
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
