/* Menu Finder hero film, 22 October 2026. A 41.6-second 1:1 loop rendered from scripts/menu-film/menu-film.html
   (render.py: 60 fps, six averaged subframes, H.264). Played by film-player.js. The previous illustrated film is kept in output/menu-story/. */
window.MenuFilm = { mount: (host) => window.FilmPlayer.mount(host, {
  sources: { large: 'assets/menu-story/menu-film-1x1.mp4', small: 'assets/menu-story/menu-film-720.mp4' },
  poster: 'assets/menu-story/menu-film-poster.webp',
  duration: 41.6,
  chapters: [
    { t: 0.0, label: 'The problem' },
    { t: 8.4, label: 'The idea' },
    { t: 13.2, label: 'Collect' },
    { t: 18.0, label: 'Read' },
    { t: 23.6, label: 'Scale' },
    { t: 28.0, label: 'Newtown' },
    { t: 31.6, label: 'Search' },
    { t: 35.6, label: 'The match' }
  ],
  label: 'Menu Finder film. Dinner meant pinching and squinting at menu photos. What if you started with the food? ' +
    'Agents collected 82,000+ menu documents from websites and photos, and models read each menu into dishes and prices: 700,000+ menu items from 35,000+ restaurants. ' +
    'Then one neighbourhood: 823 places near Newtown. Ramen under $20 finds 6 places within 2 km, and the match is hokkaido miso ramen, $14.70, at Take Sushi and Ramen Bar, 174 m away.'
}) };
