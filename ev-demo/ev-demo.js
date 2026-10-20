/* EV comparison demo (web edition). Same system as booking-demo/booking-demo.js, in a browser window.
   Markup: <div class="ev-demo" data-base="ev-demo/"></div>, after demo-data.js.
   The window's screen is the only video; the cursor follows its clock, the page field drifts on wall time. */
(function () {
  'use strict';
  if (window.EVDemo) { window.EVDemo.init(); return; }
  const instances = new WeakMap();

  const HAND_SVG =
    '<svg class="ev-demo__hand" viewBox="13 0 19 24" aria-hidden="true">' +
    '<path d="M19 1h2v1h1v4h2v1h3v1h2v1h1v1h1v7h-1v3h-1v3H19v-3h-1v-2h-1v-2h-1v-2h-1v-1h-1v-3h3v1h1V2h1"/>' +
    '<path fill="#fff" d="M21 2v9h1V7h2v4h1V8h2v4h1V9h1v1h1v7h-1v3h-1v2h-8v-2h-1v-2h-1v-2h-1v-2h-1v-1h-1v-2h2v1h1v1h1V2"/>' +
    '</svg>';
  const HOT = [7, 1];             // fingertip inside the 19 x 24 hand
  const LANES = 6;                // pages travel in horizontal lanes, two per lane, evenly spaced

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const lerp = (a, b, f) => a + (b - a) * f;
  const smooth = (x) => { x = Math.min(Math.max(x, 0), 1); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };

  function cursorAt(keys, t) {
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i], b = keys[i + 1];
      if (t >= a[0] && t <= b[0]) {
        const f = b[0] > a[0] ? smooth((t - a[0]) / (b[0] - a[0])) : 1;
        return [lerp(a[1], b[1], f), lerp(a[2], b[2], f)];
      }
    }
    const last = keys[keys.length - 1];
    return [last[1], last[2]];
  }

  function el(tag, cls, parent) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (parent) parent.appendChild(n);
    return n;
  }

  function build(root, data) {
    const prefix = root.dataset.base || '';
    const base = prefix && prefix.replace(/\/?$/, '/');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Cache the preference; update it through change events rather than per-frame query reads.
    let reduced = reduce.matches;
    const events = new AbortController();
    const on = (target, type, fn) => target.addEventListener(type, fn, { signal: events.signal });
    root.setAttribute('role', 'button');
    const label = data.label;
    root.tabIndex = 0;
    root.setAttribute('aria-label', 'Play ' + label);

    // drifting pages
    const field = el('div', 'ev-demo__field', root);
    field.setAttribute('aria-hidden', 'true');
    const rnd = mulberry32(20261019);
    const cards = [];
    for (let i = 0; i < LANES * 2; i++) {
      const lane = i >> 1;
      const d = (lane % 2 ? 0.6 : 0.05) + rnd() * 0.3;   // alternate near and far lanes: 0 near .. 1 far
      const img = el('img', 'ev-demo__card', null);
      img.src = base + 'media/cards/' + data.cards[(i * 7) % data.cards.length];
      img.alt = '';
      img.decoding = 'async';
      img.loading = 'lazy';
      img.style.filter = 'brightness(' + lerp(1, 0.5, d).toFixed(3) + ')';
      cards.push({ img, d, w: lerp(0.36, 0.14, d), speed: lerp(0.026, 0.009, d),
                   x0: (i % 2) * 0.5 + lane * 0.17 + (rnd() - 0.5) * 0.1,     // the pair sits half a lap apart
                   y: (lane + 0.5) / LANES + (rnd() - 0.5) * 0.05 });
    }
    cards.sort((a, b) => b.d - a.d).forEach((c) => field.appendChild(c.img));
    el('div', 'ev-demo__shade', root);

    // browser window
    const win = el('div', 'ev-demo__window', root);
    win.setAttribute('aria-hidden', 'true');
    const bar = el('div', 'ev-demo__bar', win);
    el('span', 'ev-demo__dot', bar); el('span', 'ev-demo__dot', bar); el('span', 'ev-demo__dot', bar);
    el('span', 'ev-demo__url', bar);
    const screen = el('div', 'ev-demo__screen', win);
    const video = el('video', null, screen);
    video.muted = true; video.loop = true; video.playsInline = true;
    video.setAttribute('muted', ''); video.setAttribute('playsinline', '');
    video.preload = 'none'; // Fetch video only when the visible project starts playback.
    video.poster = base + data.poster;
    video.src = base + data.video;
    screen.insertAdjacentHTML('beforeend', HAND_SVG);
    const hand = screen.lastElementChild;

    let S = 0, scale = 0;
    let running = false, raf = 0, lastDraw = 0, t0 = performance.now(), wall = 0;
    let visible = false, active = true, userPaused = false, userStarted = false, pending = false, destroyed = false;
    function layout() {
      S = root.clientWidth;
      root.style.setProperty('--s', S + 'px');
      cards.forEach((c) => { c.img.style.width = (c.w * S).toFixed(1) + 'px'; });
      scale = screen.clientWidth / data.screen[0];
      draw(performance.now());
    }
    const resize = new ResizeObserver(layout);
    resize.observe(root);
    layout();

    function draw(now) {
      if (running && !reduced) wall = (now - t0) / 1000;
      const f = scale;
      for (const c of cards) {
        const w = c.w * S, h = w / 1.5, span = S + w + 0.08 * S;
        const x = ((c.x0 * span + c.speed * S * wall) % span + span) % span - w;
        const y = c.y * S - h / 2;
        c.img.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0)';
      }
      const [cx, cy] = cursorAt(data.cursorKeys, video.currentTime || 0);
      const u = data.unit * f;
      hand.style.transform = 'translate3d(' + (cx * f - HOT[0] * u).toFixed(2) + 'px,' + (cy * f - HOT[1] * u).toFixed(2) + 'px,0)';
    }
    function frame(now) {
      // The video keeps its native cadence; decorative pages/cursor need at most 30fps.
      if (now - lastDraw >= 1000 / 30 - 1) { lastDraw = now; draw(now); }
      if (running) raf = requestAnimationFrame(frame);
    }
    function start() { if (!running) { running = true; lastDraw = 0; t0 = performance.now() - wall * 1000; raf = requestAnimationFrame(frame); } }
    function stop() { running = false; cancelAnimationFrame(raf); }
    function wantsPlayback() {
      return !destroyed && active && visible && !document.hidden && !userPaused && (!reduced || userStarted);
    }
    function announce() {
      if (root.getAttribute('aria-pressed') === String(!video.paused)) return;
      root.setAttribute('aria-pressed', String(!video.paused));
      root.setAttribute('aria-label', (video.paused ? 'Play ' : 'Pause ') + label);
    }
    function sync() {
      if (wantsPlayback()) {
        if (video.paused && !pending) {
          pending = true;
          video.play().catch(() => { stop(); }).finally(() => { pending = false; if (!destroyed) announce(); });
        }
      } else {
        if (!video.paused) video.pause();
        if (running) { stop(); draw(performance.now()); }
      }
      announce();
    }
    on(video, 'play', () => { if (wantsPlayback()) start(); else video.pause(); announce(); });
    on(video, 'pause', () => { stop(); announce(); });
    on(video, 'seeked', () => draw(performance.now()));
    on(root, 'click', (e) => {
      e.stopPropagation();
      userPaused = !video.paused;
      if (!userPaused) {
        userStarted = true;
        root.dispatchEvent(new CustomEvent('project-play', { bubbles: true }));
      }
      sync();
    });
    on(root, 'keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); e.stopPropagation();
        if (!e.repeat) root.click();
      }
    });
    on(document, 'visibilitychange', sync);
    const motionChanged = (e) => { reduced = e.matches; userStarted = false; sync(); };
    reduce.addEventListener('change', motionChanged);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      sync();
    }, { threshold: [0, 0.2] });
    io.observe(root);
    announce();
    return {
      setActive(value) { if (active === value) return; active = value; sync(); },
      destroy() {
        destroyed = true;
        io.disconnect(); resize.disconnect(); events.abort();
        reduce.removeEventListener('change', motionChanged);
        video.pause(); stop();
        video.removeAttribute('src'); video.load();
        root.replaceChildren();
        ['data-ready', 'role', 'aria-label', 'aria-pressed', 'tabindex'].forEach((name) => root.removeAttribute(name));
      }
    };
  }

  function roots(scope = document) {
    return [...(scope.matches && scope.matches('.ev-demo') ? [scope] : []), ...scope.querySelectorAll('.ev-demo')];
  }
  function init(scope = document) {
    const data = window.EV_DEMO_DATA;
    if (!data) return;
    roots(scope).forEach((root) => {
      if (instances.has(root)) return;
      instances.set(root, build(root, data));
      root.dataset.ready = '1';
    });
  }
  window.EVDemo = {
    init,
    setActive(scope, active) { roots(scope).forEach((root) => instances.get(root)?.setActive(active)); },
    destroy(scope) { roots(scope).forEach((root) => { instances.get(root)?.destroy(); instances.delete(root); }); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();
})();
