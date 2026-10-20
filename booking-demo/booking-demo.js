/* CBA booking demo (web edition).
   Markup: <div class="cba-demo" data-base="booking-demo/"></div>, after booking-demo-data.js.
   The phone screen is the only video; the cursor follows its clock, the page field drifts on wall time. */
(function () {
  'use strict';
  if (window.CBADemo) { window.CBADemo.init(); return; }
  const instances = new WeakMap();

  const HAND_SVG =
    '<svg class="cba-demo__hand" viewBox="13 0 19 24" aria-hidden="true">' +
    '<path d="M19 1h2v1h1v4h2v1h3v1h2v1h1v1h1v7h-1v3h-1v3H19v-3h-1v-2h-1v-2h-1v-2h-1v-1h-1v-3h3v1h1V2h1"/>' +
    '<path fill="#fff" d="M21 2v9h1V7h2v4h1V8h2v4h1V9h1v1h1v7h-1v3h-1v2h-8v-2h-1v-2h-1v-2h-1v-2h-1v-1h-1v-2h2v1h1v1h1V2"/>' +
    '</svg>';
  const UNIT = 7.6;               // hand: source px per SVG unit
  const HOT = [7, 1];             // fingertip inside the 19 x 24 hand
  const PRESS = 5 / 6;            // one pixel step smaller while pressed

  const SCREEN_H = 0.80;          // screen height as a share of the tile
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
  const smoother = (x) => { x = Math.min(Math.max(x, 0), 1); return x * x * x * (x * (6 * x - 15) + 10); };

  function cursorAt(keys, t) {
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i], b = keys[i + 1];
      if (t >= a[0] && t <= b[0]) {
        const f = b[0] > a[0] ? smoother((t - a[0]) / (b[0] - a[0])) : 1;
        return [lerp(a[1], b[1], f), lerp(a[2], b[2], f), a[3] && b[3]];
      }
    }
    const last = keys[keys.length - 1];
    return [last[1], last[2], 0];
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
    const label = 'Demo: booking a home lending appointment in the CommBank mobile site';
    root.tabIndex = 0;
    root.setAttribute('aria-label', 'Play ' + label);

    // drifting pages
    const field = el('div', 'cba-demo__field', root);
    field.setAttribute('aria-hidden', 'true');
    const rnd = mulberry32(20261018);
    const cards = [];
    for (let i = 0; i < LANES * 2; i++) {
      const lane = i >> 1;
      const d = (lane % 2 ? 0.6 : 0.05) + rnd() * 0.3;   // alternate near and far lanes: 0 near .. 1 far
      const img = el('img', 'cba-demo__card', null);
      img.src = base + 'media/cards/' + data.cards[i % data.cards.length];
      img.alt = '';
      img.decoding = 'async';
      img.loading = 'eager';
      img.style.filter = 'brightness(' + lerp(1, 0.5, d).toFixed(3) + ')';
      cards.push({ img, d, w: lerp(0.36, 0.14, d), speed: lerp(0.026, 0.009, d),
                   x0: (i % 2) * 0.5 + lane * 0.17 + (rnd() - 0.5) * 0.1,     // the pair sits half a lap apart
                   y: (lane + 0.5) / LANES + (rnd() - 0.5) * 0.05 });
    }
    cards.sort((a, b) => b.d - a.d).forEach((c) => field.appendChild(c.img));
    el('div', 'cba-demo__shade', root);

    // phone
    const phone = el('div', 'cba-demo__phone', root);
    phone.setAttribute('aria-hidden', 'true');
    el('div', 'cba-demo__body', phone);
    el('div', 'cba-demo__rim', phone);
    el('div', 'cba-demo__bezel', phone);
    [[-58, 330, 110], [-58, 540, 180], [-58, 760, 180], [1230, 600, 280]].forEach(([x, y, h]) => {
      const b = el('div', 'cba-demo__btn', phone);
      b.style.left = 'calc(var(--f) * ' + x + ')';
      b.style.top = 'calc(var(--f) * ' + y + ')';
      b.style.height = 'calc(var(--f) * ' + h + ')';
    });
    const screen = el('div', 'cba-demo__screen', phone);
    const video = el('video', null, screen);
    video.muted = true; video.loop = true; video.playsInline = true;
    video.setAttribute('muted', ''); video.setAttribute('playsinline', '');
    video.preload = 'none'; // Fetch video only when the visible project starts playback.
    video.poster = base + 'media/screen-poster.webp';
    video.src = base + 'media/screen-h264.mp4';   // H.264: decodes in hardware everywhere, so no dropped frames
    phone.insertAdjacentHTML('beforeend', HAND_SVG);
    const hand = phone.lastElementChild;

    // layout
    let S = 0, scale = 0;
    let running = false, raf = 0, t0 = performance.now(), wall = 0;
    let visible = false, active = true, userPaused = false, userStarted = false, pending = false, destroyed = false;
    function layout() {
      S = root.clientWidth;
      root.style.setProperty('--s', S + 'px');
      root.style.setProperty('--sh', SCREEN_H);
      cards.forEach((c) => { c.img.style.width = (c.w * S).toFixed(1) + 'px'; });
      scale = phone.clientWidth / data.screen[0];
      draw(performance.now());
    }
    const resize = new ResizeObserver(layout);
    resize.observe(root);
    layout();

    // frame loop
    function draw(now) {
      if (running && !reduced) wall = (now - t0) / 1000;
      const f = scale;
      for (const c of cards) {
        const w = c.w * S, h = w / 1.5, span = S + w + 0.08 * S;
        const x = ((c.x0 * span + c.speed * S * wall) % span + span) % span - w;
        const y = c.y * S - h / 2;
        c.img.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0)';
      }
      const [cx, cy, down] = cursorAt(data.cursorKeys, video.currentTime || 0);
      const u = UNIT * f;
      hand.style.transform = 'translate3d(' + (cx * f - HOT[0] * u).toFixed(2) + 'px,' + (cy * f - HOT[1] * u).toFixed(2) +
        'px,0)' + (down ? ' scale(' + PRESS + ')' : '');
    }
    function frame(now) {
      draw(now);
      if (running) raf = requestAnimationFrame(frame);
    }
    function start() { if (!running) { running = true; t0 = performance.now() - wall * 1000; raf = requestAnimationFrame(frame); } }
    function stop() { running = false; cancelAnimationFrame(raf); }

    function wantsPlayback() {
      return !destroyed && active && visible && !document.hidden && !userPaused && (!reduced || userStarted);
    }
    function announce() {
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
        video.pause(); stop(); draw(performance.now());
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
      setActive(value) { active = value; sync(); },
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
    return [...(scope.matches && scope.matches('.cba-demo') ? [scope] : []), ...scope.querySelectorAll('.cba-demo')];
  }
  function init(scope = document) {
    const data = window.CBA_DEMO_DATA;
    if (!data) return;
    roots(scope).forEach((root) => {
      if (instances.has(root)) return;
      instances.set(root, build(root, data));
      root.dataset.ready = '1';
    });
  }
  window.CBADemo = {
    init,
    setActive(scope, active) { roots(scope).forEach((root) => instances.get(root)?.setActive(active)); },
    destroy(scope) { roots(scope).forEach((root) => { instances.get(root)?.destroy(); instances.delete(root); }); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();
})();
