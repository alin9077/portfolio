/* Casual invitation gate for static hosting; this is not server authentication.
   Only a SHA-256 verifier is stored here. Portfolio scripts load after validation. */
(async () => {
  const root = document.documentElement;
  const status = document.getElementById('access-status');
  const code = new URLSearchParams(location.search).get('access');
  if (!code) return;
  try {
    if (!crypto.subtle) throw new Error('Secure browser context required');
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code));
    const digest = Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
    if (digest !== 'dbb3602445b9beeecc41df69e7fb0cf92680dc34ff13586909ee572c7ef00891') {
      status.textContent = 'This invitation link is not valid. Please use the complete link shared with you.';
      return;
    }
    status.textContent = 'Opening portfolio…';
    for (const source of document.querySelectorAll('script[data-portfolio-src]')) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = source.dataset.portfolioSrc;
        script.async = false;
        // Reveal before initialization so project routes measure the real layout.
        if (source.dataset.portfolioSrc.startsWith('portfolio.js')) root.dataset.access = 'granted';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Portfolio file unavailable'));
        document.body.appendChild(script);
      });
    }
    document.title = 'Portfolio 2027 — Austin Lin';
    root.dataset.access = 'granted';
    // The overview measures visible media after a resize; refresh it after reveal.
    window.dispatchEvent(new Event('resize'));
  } catch {
    root.dataset.access = 'locked';
    status.textContent = 'The portfolio could not open. Check your connection and reopen the invitation link in a current browser.';
  }
})();
