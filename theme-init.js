(() => {
  let preference;
  try { preference = localStorage.getItem('portfolio-theme'); } catch {}
  const mode = preference === 'light' || preference === 'dark' ? preference : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.mode = mode;
  document.querySelector('meta[name="theme-color"]').content = mode === 'dark' ? '#18191b' : '#f6f4f0';
})();
