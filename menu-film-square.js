/* Menu Finder hero film, 22 October 2026. A 26-second 1:1 loop rendered from scripts/menu-film/menu-film.html
   (render.py: 60 fps, six averaged subframes, H.264). Played by film-player.js. The previous illustrated film is kept in output/menu-story/. */
window.MenuFilm = { mount: (host) => window.FilmPlayer.mount(host, {
  sources: { large: 'assets/menu-story/menu-film-1x1.mp4', small: 'assets/menu-story/menu-film-720.mp4' },
  poster: 'assets/menu-story/menu-film-poster.webp',
  duration: 26,
  label: 'Menu Finder film. Dinner meant pinching and squinting at menu photos. What if you started with the food? ' +
    'Agents collected 82,000+ menu documents from websites and photos, and models read each menu into dishes and prices: 700,000+ menu items from 35,000+ restaurants. ' +
    'Then one neighbourhood: 823 places near Newtown. Ramen under $20 finds 6 places within 2 km, and the match is hokkaido miso ramen, $14.70, at Take Sushi and Ramen Bar, 174 m away.'
}) };
