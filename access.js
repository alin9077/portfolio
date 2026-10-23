/* Casual invitation gate for static hosting; this is not server authentication.
   Only a SHA-256 verifier is stored here. Portfolio scripts load after validation. */
(async () => {
  const activeInvitationDigest = null;
  const root = document.documentElement;
  const status = document.getElementById('access-status');
  const loader = document.getElementById('portfolio-loader');
  const loaderCard = document.getElementById('loader-card');
  const finishLoading = () => {
    delete root.dataset.loading;
    loader.hidden = true;
    document.getElementById('page').removeAttribute('aria-busy');
  };
  const waitAtMost = (promise, ms) => new Promise(resolve => {
    const timer = setTimeout(resolve, ms);
    Promise.resolve(promise).catch(() => {}).then(() => { clearTimeout(timer); resolve(); });
  });
  const code = new URLSearchParams(location.search).get('access');
  if (!code) return;
  if (!activeInvitationDigest) {
    status.textContent = 'This invitation link has been disabled.';
    return;
  }
  try {
    if (!crypto.subtle) throw new Error('Secure browser context required');
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code));
    const digest = Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
    if (digest !== activeInvitationDigest) {
      status.textContent = 'This invitation link is not valid. Please use the complete link shared with you.';
      return;
    }
    root.dataset.loading = 'true';
    document.getElementById('page').setAttribute('aria-busy', 'true');
    loader.hidden = false;
    loaderCard.srcset = 'public/cards/austin-240.webp 240w, public/cards/austin-600.webp 600w';
    loaderCard.sizes = '(max-width: 428px) 56vw, 240px';
    loaderCard.src = 'public/cards/austin-600.webp';
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
    document.title = 'Designer Austin Lin';
    root.dataset.access = 'granted';
    // The overview measures visible media after a resize; refresh it after reveal.
    window.dispatchEvent(new Event('resize'));
    const firstImages = [...document.querySelectorAll('#top img, #picker img, #brand-ai .card__image')];
    await Promise.all([
      waitAtMost(document.fonts?.ready, 3000),
      ...firstImages.map(image => waitAtMost(image.decode(), 8000))
    ]);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    finishLoading();
  } catch {
    root.dataset.access = 'locked';
    finishLoading();
    status.textContent = 'The portfolio could not open. Check your connection and reopen the invitation link in a current browser.';
  }
})();
