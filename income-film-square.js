/* AI income hero film, 22 October 2026. A 28-second 1:1 loop rendered from scripts/income-film/income-film.html
   (render.py --film income: 60 fps, six averaged subframes, H.264). Played by film-player.js. The previous line-drawn film is kept in output/ai-income-story/. */
window.IncomeFilm = { mount: (host) => window.FilmPlayer.mount(host, {
  sources: { large: 'assets/ai-income-story/income-film-1x1.mp4', small: 'assets/ai-income-story/income-film-720.mp4' },
  poster: 'assets/ai-income-story/income-film-poster.webp',
  duration: 28,
  label: 'AI income verification film, with sample values. A customer applies for a credit card and uploads a payslip from the city. ' +
    'First, the bank has to verify their income. Today bankers do it by hand: opening the payslip, blacking out the tax file number and copying figures into a calculator, 31 clicks. ' +
    'Now an AI agent redacts, reads and checks it all, and shows the figure and how it got there: $8,109.57 a month, $3,742.88 gross pay × 26 ÷ 12. ' +
    'The banker checks the evidence, then confirms in one click. 31 clicks become one confirmation in the proposed workflow, and customers get what they applied for, sooner.'
}) };
