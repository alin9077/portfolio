/* H / Print — native scrolling through persistent brand sections.
   Paper lighting uses compositor opacity; only the active card receives local light variables. */
(() => {
  document.documentElement.classList.add('js');
  const ME = window.H_PROFILE, B = window.H_BRANDS, PR = window.H_PROJECTS;
  const G = Object.fromEntries(window.G_PROJECTS.map((p) => [p.id, p]));
  const N = B.length;
  const $ = (s) => document.querySelector(s);
  const root = document.documentElement, body = document.body;
  const top = $('#top'), picker = $('#picker'), pageEl = $('#page');
  let heroSlot, rowsEl;
  const subEl = $('#sub'), subHero = $('#subHero'), subCopy = $('#subCopy'), back = $('#back');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const dark = matchMedia('(prefers-color-scheme: dark)');
  let themePreference;
  try { themePreference = localStorage.getItem('portfolio-theme'); } catch {}
  if (!['light', 'dark'].includes(themePreference)) themePreference = null;
  const themeControls = () => `<div class="theme-control" role="group" aria-label="Colour mode"><button type="button" data-theme="light" aria-pressed="false">Light</button><button type="button" data-theme="dark" aria-pressed="false">Dark</button></div>`;
  const R = (ms) => (reduce.matches ? Math.min(ms, 140) : ms);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const q = (v, step) => Math.round(v / step) * step;
  const EXPO = 'cubic-bezier(.16,1,.3,1)';

  const ICONS = {
    spark: 'M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3',
    coins: 'M5 7c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3zM5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5',
    home: 'M4 11l8-7 8 7M6 9.5V20h12V9.5M10 20v-5h4v5',
    shield: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z',
    plane: 'M21 3L3 10.5l7 2.5 2.5 7zM10 13l11-10',
    pen: 'M4 20l1.2-4.6L16 4.6 19.4 8 8.6 18.8zM13.8 6.8l3.4 3.4M4 20h16'
  };
  const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[k]}"/></svg>`;
  const XSVG = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0L100 100M100 0L0 100"/></svg>';
  const PAUSE = '<svg class="i-pause" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2h3v12H4zM9 2h3v12H9z"/></svg>';
  const PLAY = '<svg class="i-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2l10 6-10 6z"/></svg>';

  let ALT = {};
  fetch('assets/f/manifest.json').then((r) => r.json()).then((m) => {
    ALT = m;
    subCopy.querySelectorAll('img[data-media-key]').forEach((img) => { if (!img.alt) img.alt = alt(img.dataset.mediaKey); });
  }).catch(() => {});
  const alt = (key) => { const [k, n] = key.split(':'); return (k === 'f' && ALT[n] && ALT[n].alt) || ''; };
  function src(key, size) {
    const [k, n] = key.split(':');
    if (k === 'f') return `assets/f/${n}-${{ s: 480, m: 960, l: 1440 }[size]}.webp`;
    if (k === 'b') return `assets/brands/${n}-${size === 'l' ? 1600 : 960}.webp`;
    return `assets/${n}-${size === 'l' ? 1600 : 720}.webp`;
  }

  /* ── Cards: a trading card per brand. Generated art in three depth layers, a foil mask for the holo,
        and the company's figures set as its moves. Mini cards in the deck use one flattened thumbnail. ── */
  const pad3 = (n) => String(n).padStart(3, '0');
  // full art: the art fills the card and the type sits on it. Psychic energy marks the moves.
  const PSY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.6 12c3.3-5.4 15.5-5.4 18.8 0-3.3 5.4-15.5 5.4-18.8 0z"/><circle cx="12" cy="12" r="3.1"/></svg>';
  const energy = `<i class="k-energy">${PSY}</i>`;
  const PH = '<span class="k-ph" aria-hidden="true"></span>';
  const variantOf = (d) => {
    const want = new URLSearchParams(location.search).get('austin');
    return d.variants.includes(want) ? want : d.variants[0];
  };
  function fullHTML(b, i, mini, lazy) {
    const d = b.deck, v = variantOf(d), base = `assets/h/cards/${d.art}`, ld = lazy ? ' loading="lazy"' : '';
    const file = { back: `${base}-back`, mid: `${base}-${v}-mid`, front: `${base}-front` };
    const foil = { back: `${base}-foil-back`, mid: `${base}-${v}-foil-mid`, front: `${base}-foil-front` };
    const art = mini
      ? `<img class="k-l" src="${base}-${v}-thumb.webp" alt="" decoding="async">`
      : ['back', 'mid', 'front'].map((k) => `<div class="k-d k-${k}"><img class="k-l" src="${file[k]}.webp" alt=""${ld} decoding="async">`
          + `<div class="k-foil" style="--foil:url(${foil[k]}.webp)"><i class="k-spec"></i></div></div>`).join('')
        + '<div class="k-glit"><i class="k-spot"></i></div>';
    const moves = d.moves.map((m) => `<li class="k-move"><span class="k-costs">${energy.repeat(m.cost || 1)}</span>
        <b class="k-mname">${m.name}</b><p class="k-mtext">${m.text}</p></li>`).join('');
    return `<div class="card__tilt"><div class="card__face"><i class="card__rainbow"></i><div class="card__panel is-full">
      <div class="k-art">${art}</div><i class="k-veil"></i>
      <header class="k-head"><span class="k-stage">${d.kicker}</span>
        <h3 class="k-name">${d.name}</h3><p class="k-hp"><small>HP</small>${PH}</p>${energy}
        <p class="k-sub">${d.sub}</p></header>
      <ol class="k-moves">${moves}</ol>
      <p class="k-wrr"><span>weakness${PH}</span><span>resistance${PH}</span><span>retreat${PH}</span></p>
      <p class="k-set"><span>${PH}</span><span>${pad3(i + 1)}/${pad3(N)} ★★</span></p>
      <i class="c-paper"></i>
    </div><i class="card__glare"></i></div></div>`;
  }
  // Supplied cards already contain their frame, logo and lettering: display the whole print.
  function imageCardHTML(b, mini, lazy) {
    const d = b.deck.image, base = `public/cards/${d.file}`;
    return `<div class="card__tilt"><div class="card__face is-image">
      <img class="card__image" src="${base}${mini ? '-thumb' : ''}.webp" ${mini ? "" : `srcset="${base}-240.webp 240w, ${base}-600.webp 600w, ${base}.webp ${d.width}w" sizes="(max-width: 760px) min(20.8vw, 117px), min(20.15vw, 292.5px, 36.3svh)"`} width="${d.width}" height="${d.height}" alt="" decoding="async"${lazy ? ' loading="lazy"' : ''} draggable="false">
      ${mini ? '' : `<div class="card__finish" aria-hidden="true">
        <div class="card__prism"><i class="card__spectrum"></i></div>
        <div class="card__sparkles"><i class="card__shimmer"></i></div>
        <i class="card__reflection"></i>
      </div>`}
    </div></div>`;
  }
  function cardHTML(b, i, mini = false, lazy = false) {
    if (b.deck.image) return imageCardHTML(b, mini, lazy);
    if (b.deck.layout === 'full') return fullHTML(b, i, mini, lazy);
    const d = b.deck, base = `assets/h/cards/${d.art}`, ld = lazy ? ' loading="lazy"' : '';
    const art = mini
      ? `<img class="k-l" src="${base}-thumb.webp" alt="" decoding="async">`
      : ['back', 'mid', 'front'].map((k) => `<div class="k-d k-${k}"><img class="k-l" src="${base}-${k}.webp" alt=""${ld} decoding="async">`
          + `<div class="k-foil" style="--foil:url(${base}-foil-${k}.webp)"><i class="k-spec"></i></div></div>`).join('')
        + '<div class="k-glit"><i class="k-spot"></i></div>';
    const moves = d.moves.map((m) => `<li class="k-move${m.ability ? ' is-ability' : ''}">
        ${m.ability ? '<span class="k-tag">Ability</span>' : `<i class="k-cost">${icon(b.mark)}</i>`}
        <b class="k-mname">${m.name}</b>${m.value ? `<span class="k-val">${m.value}</span>` : ''}
        <p class="k-mtext">${m.text}</p></li>`).join('');
    const projects = b.projects.map((id) => PR[id].name).join(' · ');
    const foot = d.foot || ['Projects', projects];
    return `<div class="card__tilt"><div class="card__face"><i class="card__rainbow"></i><div class="card__panel">
      <header class="k-head">
        <p class="k-kicker">${d.kicker}</p>
        <h3 class="k-name">${d.name}</h3>
        <p class="k-hp"><small>${d.hp[0]}</small> ${d.hp[1]}</p>
        <i class="k-type">${icon(b.mark)}</i>
      </header>
      <div class="k-art">${art}</div>
      <p class="k-strip"><span>No. ${pad3(i + 1)}</span>${d.strip || b.sector}</p>
      <ol class="k-moves">${moves}</ol>
      <p class="k-foot"><span>${foot[0]}</span>${foot[1]}</p>
      ${d.flavour ? `<p class="k-flavour">${d.flavour}</p>` : ''}
      <p class="k-set"><span>${d.source}</span><span>${pad3(i + 1)}/${pad3(N)} ${i === 0 ? '★' : '◆'}</span></p>
      <i class="c-paper"></i>
    </div><i class="card__glare"></i></div></div>`;
  }
  const cardLabel = (b) => b.deck.image?.alt || `${b.deck.name}: ${b.deck.moves.map((m) => (m.value ? `${m.name} ${m.value}` : m.name)).join(', ')}`;

  picker.innerHTML = B.map((b, i) => `<div class="slot" data-i="${i}"><span aria-hidden="true">${i + 1}</span></div>`).join('')
    + '<span class="picker__label hud" id="pickLabel" aria-hidden="true"></span>';
  const slots = [...picker.querySelectorAll('.slot')];
  const pickLabel = $('#pickLabel');

  const cards = B.map((b, i) => {
    const el = document.createElement('div');
    el.className = 'card in-slot';
    el.dataset.i = i; el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `${b.name}: ${b.projects.map((id) => PR[id].name).join(', ')}`);
    el.dataset.etch = b.deck.etch; el.dataset.foil = b.deck.foil || 'silver';
    el.style.cssText = `--p1:${b.card.bg};--cink:${b.card.ink};--cacc:${b.card.acc};--glowc:${b.card.bg}`;
    el.innerHTML = cardHTML(b, i, true);
    slots[i].append(el);
    return el;
  });

  /* ── Header ──────────────────────────────── */
  const contacts = ME.contact || [];
  top.innerHTML = `<div class="me"><p><span class="me__name">${ME.name}</span><span class="me__role">${ME.role}<img class="me__flag" src="assets/brands/australian-flag.svg" width="16" height="16" alt="Australia"></span></p></div>`;
  top.insertAdjacentHTML('beforeend', `<div class="top__right">${themeControls()}</div>`);
  $('#themeFooter').innerHTML = themeControls();
  document.querySelectorAll('[data-theme]').forEach(button => button.addEventListener('click', () => {
    themePreference = button.dataset.theme;
    try { localStorage.setItem('portfolio-theme', themePreference); } catch {}
    applyTheme(Math.max(sel, 0));
  }));
  const aboutHTML = `<section class="about" id="about" aria-label="About Austin">
    <section><h2>My interests</h2><ul>${ME.interests.map(x => `<li>${x}</li>`).join('')}</ul></section>
    <section><h2>Looking for</h2><ul>${ME.lookingFor.map(x => `<li>${x}</li>`).join('')}</ul></section>
    <p class="links hud">${contacts.map(([l, h]) => h ? `<a href="${h}"${h === '#cv' ? ' data-open="cv"' : h.startsWith('mailto:') ? '' : ' target="_blank" rel="noopener noreferrer"'}>${l} ↗</a>` : `<span class="ph" title="CV coming soon">${l}</span>`).join('')}</p>
  </section>`;

  /* ── Cover: numeral and brand, alongside the compact project list ── */
  function coverHTML(i) {
    const b = B[i];
    return `<div class="mast"><span class="mast__no" aria-hidden="true"><span>${i + 1}</span></span>
        <p class="mast__meta"><i class="swatch" style="--sw:${b.card.bg}"></i><b>${b.name}</b><br>${b.sector}</p></div>`;
  }
  /* ── Rows: a rounded picture or film, then the words ── */
  // a project's own subs (curated, with real shots) win over its G insights (placeholders for now)
  const subsOf = (p) => p.subs || (p.gid && G[p.gid] ? G[p.gid].subs : null);
  const hasPage = (p) => !p.brief && !!subsOf(p) && subsOf(p).some((s) => s.more);
  function demoHTML(p, id, b) {
    const demo = p.media && p.media.demo;
    if (!demo) return '';
    const cls = demo === 'booking' ? 'cba-demo' : 'ev-demo';
    const base = demo === 'booking' ? 'booking-demo/' : 'ev-demo/';
    return `<div class="row__media is-demo"><div class="${cls}" data-base="${base}"></div>
      ${id ? `<a class="film__open" href="#${b.id}/${id}" data-open="${id}" aria-label="Explore ${p.name}"></a>
      <button class="row__toggle" type="button" data-demo-toggle aria-pressed="false" aria-label="Play the demo">${PAUSE}${PLAY}</button>` : ''}</div>`;
  }
  function demos(method, scope, ...args) {
    [window.CBADemo, window.EVDemo].forEach((api) => api[method](scope, ...args));
  }
  function filmHTML(p, id) {
    return `<div class="row__media is-film" data-film="${p.media.film}" role="group" aria-label="${p.name} explanatory film">
      ${id ? `<a class="film__open" href="#ai/${id}" data-open="${id}" aria-label="Explore ${p.name}"></a>` : ''}
      <div class="film__canvas" role="img" aria-label="${p.name} — animated square film"></div>
      <button class="row__toggle" type="button" aria-pressed="false" aria-label="Play the film">${PAUSE}${PLAY}</button>
    </div>`;
  }
  function artworkImageHTML(p) {
    const m = p.media;
    return `<img src="${m.image}" data-full="${m.image}" alt="${m.alt}" style="object-fit:${m.fit || 'cover'};object-position:${m.pos || '50% 50%'}" loading="lazy" decoding="async">`;
  }
  function mediaHTML(p, id, linked, b) {
    if (p.media && p.media.embed) return filmHTML(p, linked ? id : null);
    if (p.media && p.media.demo) return demoHTML(p, linked ? id : null, b);
    if (p.media?.comparison) return `<div class="row__media is-artwork is-comparison" data-comparison role="group" aria-label="${p.name}: old and new designs">
      ${p.media.comparison.map((m, i) => `<button type="button" class="comparison__layer${i === 0 ? ' is-current' : ''}" data-view-artwork aria-label="Enlarge ${m.label.toLowerCase()} designs" ${i ? 'inert aria-hidden="true"' : ''}>${artworkImageHTML({ media: m })}</button>`).join('')}
    </div>`;
    if (p.media && p.media.image) {
      const image = artworkImageHTML(p);
      const ground = `style="background:${p.media.ground || '#e6e6e6'}"`;
      return linked
        ? `<a class="row__media is-artwork" ${ground} href="#${b.id}/${id}" data-open="${id}" aria-label="Explore ${p.name}">${image}</a>`
        : `<button class="row__media is-artwork row__enlarge" ${ground} type="button" data-view-artwork aria-label="Enlarge: ${p.name}">${image}</button>`;
    }
    return linked
      ? `<a class="row__media is-placeholder" href="#${b.id}/${id}" data-open="${id}" aria-label="Explore ${p.name}"></a>`
      : '<div class="row__media is-placeholder" aria-hidden="true"></div>';
  }

  function rowsHTML(i) {
    const b = B[i];
    return b.projects.map((id, k) => {
      const p = PR[id], linked = hasPage(p);
      const [client, ...context] = p.eyebrow.split(' · ');
      const brand = b.id === 'iag' ? b.name : client;
      const logoFile = { NAB: 'nab-mark.svg', CommBank: 'commbank-mark.svg', Qantas: 'qantas-mark.svg', IAG: 'iag-mark.png' }[brand];
      const logo = logoFile ? `<img class="row__logo" src="assets/brands/${logoFile}" width="16" height="16" alt="">` : '';
      return `<article class="row${p.brief ? ' is-brief' : ''}" id="p-${id}">
        ${mediaHTML(p, id, linked, b)}
        <div class="row__text">
          <p class="row__eyebrow"><span class="row__identity"><span class="row__number">${i + 1}.${k + 1}</span><span class="row__brand">${logo}${brand}</span></span>${context.length ? `<span class="row__context">${context.join(' · ')}</span>` : ''}</p>
          <h3 class="row__title">${p.name}</h3>
          ${p.headline ? `<p class="row__p">${p.headline}</p>` : ''}
          ${p.highlights?.length ? `<ul class="row__p row__highlights">${p.highlights.map(point => `<li>${point}</li>`).join('')}</ul>` : ''}
          ${linked ? `<a class="row__link" href="#${b.id}/${id}" data-open="${id}" aria-label="View More: ${p.name}">View More</a>` : ''}
        </div>
      </article>`;
    }).join('');
  }
  const reveal = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); reveal.unobserve(e.target); }
  }), { threshold: 0, rootMargin: '80px 0px' });

  /* Films share the demo lifecycle: only visible, active media plays. */
  let level = 1;
  const films = new Map();
  let focusedProject = null, projectFocusDirty = true, focusCandidate = null, focusTimer = 0;
  const mediaBlocked = () => document.hidden || !$('#viewer').inert;
  let filmReduced = reduce.matches;
  function filmUI(f) {
    const on = !!f.api?.playing;
    f.toggle.setAttribute('aria-pressed', String(on));
    f.toggle.setAttribute('aria-label', `${on ? 'Pause' : 'Play'} the film`);
  }
  function filmSet(f, on) {
    if (f.api) on ? f.api.play() : f.api.pause();
    filmUI(f);
  }
  function syncFilm(f) {
    if (!f.ready) return;
    if (f.reduced !== reduce.matches) { f.reduced = reduce.matches; f.api.setReduced?.(f.reduced); }
    const on = f.visible && !mediaBlocked() && !f.userPaused &&
      (!reduce.matches || f.manualPlay) && (f.inPage ? level === 3 : level === 1 && f.row === focusedProject);
    if (f.api.playing !== on) filmSet(f, on);
  }
  function syncFilms() {
    if (filmReduced !== reduce.matches) { filmReduced = reduce.matches; films.forEach(f => { f.manualPlay = false; }); }
    films.forEach(syncFilm);
  }
  function loadFilm(f) {
    if (f.ready) return;
    f.api = (f.source === 'menu-film-square.html' ? window.MenuFilm : window.IncomeFilm).mount(f.host);
    if (reduce.matches) f.api.set(f.source === 'menu-film-square.html' ? 51.5 : 43.1);
    f.ready = true;
  }
  const filmIO = new IntersectionObserver((entries) => entries.forEach(e => {
    const f = films.get(e.target);
    if (!f) return;
    f.visible = e.isIntersecting && e.intersectionRatio >= .2;
    if (f.visible) loadFilm(f);
    syncFilm(f);
  }), { threshold: [0, .2] });
  function mountFilms(scope, inPage = false) {
    scope.querySelectorAll('[data-film]').forEach(el => {
      if (films.has(el)) return;
      const f = { row: el.closest('.row'), source: el.dataset.film, host: el.querySelector('.film__canvas'), toggle: el.querySelector('button'), visible: false, ready: false, userPaused: false, manualPlay: false, inPage };
      films.set(el, f);
      f.toggle.addEventListener('click', () => {
        loadFilm(f);
        const on = !f.api.playing;
        f.userPaused = !on; f.manualPlay = on;
        if (on && !f.inPage) setProjectFocus(f.row);
        syncFilm(f);
      });
      filmIO.observe(el);
    });
  }
  function destroyFilms(scope) {
    films.forEach((f, el) => { if (scope.contains(el)) { if (f.ready) { filmSet(f, false); f.api.destroy?.(); } filmIO.unobserve(el); films.delete(el); } });
  }
  document.addEventListener('visibilitychange', () => films.forEach(syncFilm));
  reduce.addEventListener('change', () => films.forEach(f => { f.manualPlay = false; syncFilm(f); }));

  /* Every brand stays in document flow. Scrolling is entirely native. */
  const ACCENTS = { ai: '#1c2b6b', commbank: '#755400', nab: '#b71d18', qantas: '#b71d18', iag: '#145577' };
  const DARK_ACCENTS = { ai: '#aabaff', commbank: '#e4c46e', nab: '#f69891', qantas: '#f69891', iag: '#85c7e5' };
  const sections = B.map((b, i) => {
    const section = document.createElement('section');
    section.className = 'cover';
    section.id = `brand-${b.id}`;
    section.dataset.brand = b.id;
    section.style.setProperty('--accent-light', ACCENTS[b.id]);
    section.style.setProperty('--accent-dark', DARK_ACCENTS[b.id]);
    if (b.deck.image) section.style.setProperty('--card-ratio', b.deck.image.width / b.deck.image.height);
    section.setAttribute('aria-label', b.name);
    section.innerHTML = `<div class="stage__card"><div class="card is-hero" data-i="${i}" data-etch="${b.deck.etch}" data-foil="${b.deck.foil || 'silver'}" role="group" aria-label="${cardLabel(b)}" style="--p1:${b.card.bg};--cink:${b.card.ink};--cacc:${b.card.acc};--glowc:${b.card.bg}">${cardHTML(b, i, false, i > 1)}</div></div>
      <div class="brand-content"><div class="story">${coverHTML(i)}</div><div class="rows">${rowsHTML(i)}</div></div>`;
    if (i === 0) {
      const profile = document.createElement('div');
      profile.className = 'profile-column';
      section.querySelector('.stage__card').before(profile);
      profile.append(section.querySelector('.stage__card'));
      profile.insertAdjacentHTML('beforeend', aboutHTML);
      new ResizeObserver(() => profile.style.setProperty('--profile-height', `${profile.offsetHeight}px`)).observe(profile);
    }
    pageEl.append(section);
    section.querySelectorAll('.row').forEach(r => reveal.observe(r));
    return section;
  });
  const heroSlots = sections.map(s => s.querySelector('.stage__card'));
  const heroCards = heroSlots.map(s => s.querySelector('.card'));
  // the parts of each hero that move; all of them by transform, so the card is never repainted while it sways
  const parts = heroCards.map((c) => ({
    tilt: c.querySelector('.card__tilt'), back: c.querySelector('.k-back'), mid: c.querySelector('.k-mid'), front: c.querySelector('.k-front'),
    spec: [...c.querySelectorAll('.k-spec, .card__rainbow, .card__spectrum')],
    spot: c.querySelector('.k-spot, .card__shimmer'), glare: c.querySelector('.card__glare, .card__reflection')
  }));
  demos('init', pageEl);
  demos('setActive', pageEl, false);
  mountFilms(pageEl);

  pageEl.querySelectorAll('[data-demo-toggle]').forEach(toggle => {
    const demo = toggle.parentElement.querySelector('.cba-demo, .ev-demo');
    // Preview navigation and playback each have their own keyboard control.
    demo.tabIndex = -1;
    const announce = () => {
      toggle.setAttribute('aria-pressed', demo.getAttribute('aria-pressed') || 'false');
      toggle.setAttribute('aria-label', demo.getAttribute('aria-label'));
    };
    new MutationObserver(announce).observe(demo, { attributes: true, attributeFilter: ['aria-pressed', 'aria-label'] });
    toggle.addEventListener('click', () => demo.click());
    announce();
  });

  let sel = -1, open = null;
  let heroBox = { x: 0, y: 0, w: 1, h: 1 };
  let sectionTops = [];
  function syncHeroBox() {
    if (!heroSlot) return;
    const r = heroSlot.getBoundingClientRect();
    heroBox = { x: r.left, y: r.top, w: r.width, h: r.height };
  }
  function measure() {
    cards.forEach((c, i) => {
      const w = heroSlots[i].offsetWidth, h = heroSlots[i].offsetHeight;
      c.style.width = w + 'px'; c.style.height = h + 'px';
      c.style.transform = `scale(${(slots[i].offsetHeight / h).toFixed(4)})`;
    });
    sectionTops = sections.map(s => s.offsetTop);
    syncHeroBox();
  }

  function showLabel(i) {
    pickLabel.innerHTML = i == null || i === sel ? `<b>${sel + 1}</b>of ${N}` : `<b>${i + 1}</b>${B[i].name}`;
  }
  // Both paper palettes take only a trace of the active card's hue.
  const PAPER = [246, 244, 240];
  const DARK_PAPER = [24, 25, 27];
  const hex = (h) => [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16));
  function tintOf(c, paper = PAPER, k = .035) {
    const v = hex(c), m = (v[0] + v[1] + v[2]) / 3;
    return '#' + paper.map((p, n) => clamp(Math.round(p + (v[n] - m) * k), 0, 255).toString(16).padStart(2, '0')).join('');
  }
  function applyTheme(i) {
    const lightTint = tintOf(B[i].card.bg), darkTint = tintOf(B[i].card.bg, DARK_PAPER, .02);
    root.dataset.mode = themePreference || (dark.matches ? 'dark' : 'light');
    document.querySelectorAll('[data-theme]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === root.dataset.mode)));
    root.style.setProperty('--paper-light', lightTint);
    root.style.setProperty('--paper-dark', darkTint);
    root.style.setProperty('--accent-light', ACCENTS[B[i].id]);
    root.style.setProperty('--accent-dark', DARK_ACCENTS[B[i].id]);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', root.dataset.mode === 'dark' ? darkTint : lightTint);
  }
  dark.addEventListener('change', () => { if (sel >= 0) applyTheme(sel); });

  const written = new Map();
  function put(el, key, v) {
    let m = written.get(el);
    if (!m) { m = {}; written.set(el, m); }
    if (m[key] === v) return;
    m[key] = v;
    if (key === 'opacity') el.style.opacity = v; else el.style.setProperty(key, v);
  }
  function selectBrand(i, updateHash = true) {
    if (i === sel) return;
    if (sel >= 0) { heroCards[sel].classList.remove('is-hover'); rest(sel); }
    sel = i;
    heroSlot = heroSlots[i]; rowsEl = sections[i].querySelector('.rows');
    sections.forEach((s, k) => s.dataset.active = String(k === i));
    cards.forEach((c, k) => {
      if (k === i) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
    });
    root.dataset.brand = B[i].id;
    applyTheme(i); showLabel(); syncHeroBox();
    if (updateHash) history.replaceState(null, '', `#${B[i].id}`);
  }
  function go(i, first = false) {
    if (level !== 1) return;
    i = clamp(i, 0, N - 1);
    measure();
    selectBrand(i, !first);
    scrollTo({ top: i === 0 ? 0 : sectionTops[i] - 36, behavior: 'instant' });
    resetWind();
    syncHeroBox();
  }
  let scrollFrame = 0;
  function trackBrand() {
    scrollFrame = 0;
    if (level !== 1) return;
    const line = scrollY + Math.min(120, innerHeight * .2);
    let i = 0;
    while (i + 1 < N && sectionTops[i + 1] <= line) i++;
    selectBrand(i); syncHeroBox();
  }

  /* ── Light: follows the pointer, drifts when left alone ── */
  const light = { x: innerWidth * .25, y: innerHeight * .15, tx: innerWidth * .25, ty: innerHeight * .15 };
  const paperX = $('.paper__x'), paperXn = $('.paper__xn'), paperY = $('.paper__y'), paperYn = $('.paper__yn');
  let lastInput = -1e9;
  function updateLight(now, dt) {
    const cx = heroBox.x + heroBox.w / 2, cy = heroBox.y + heroBox.h / 2;
    const idle = now - lastInput > 3500 || reduce.matches;
    if (idle) {
      const t = reduce.matches ? 0 : now / 1000;
      light.tx = cx + Math.cos(t * .21 + 2.4) * innerWidth * .32;
      light.ty = cy + Math.sin(t * .29 + 3.6) * innerHeight * .4 - innerHeight * .1;
    }
    const k = Math.min(1, dt * (idle ? 1.2 : 8));
    light.x += (light.tx - light.x) * k; light.y += (light.ty - light.y) * k;
    let lx = (light.x - cx) / (innerWidth * .45), ly = (light.y - cy) / (innerHeight * .5);
    const len = Math.hypot(lx, ly);
    if (len > 1) { lx /= len; ly /= len; }
    if (len < .35) { const f = .35 / Math.max(len, .001); lx *= f; ly *= f; }
    put(paperX, 'opacity', q(Math.max(0, lx) * .15, .02).toFixed(2));
    put(paperXn, 'opacity', q(.03 + Math.max(0, -lx) * .15, .02).toFixed(2));
    put(paperY, 'opacity', q(Math.max(0, ly) * .15, .02).toFixed(2));
    put(paperYn, 'opacity', q(.03 + Math.max(0, -ly) * .15, .02).toFixed(2));
    return { lx, ly };
  }

  /* ── Project page: the row's picture grows into the page ── */
  function caseMediaHTML(s) {
    const figures = s.media.map((item) => `<figure class="case-media__item">
      <button class="case-media__image${item.frame ? ` case-media__image--${item.frame}` : ''}" type="button" aria-label="Enlarge: ${item.label || item.alt}">
        <img src="${item.image || src(item.key, 'm')}" ${item.image ? '' : `srcset="${src(item.key, 's')} 480w, ${src(item.key, 'm')} 960w, ${src(item.key, 'l')} 1440w"`} sizes="(max-width: 760px) 85vw, 40vw" ${item.key ? `data-media-key="${item.key}"` : ''} data-full="${item.image || src(item.key, 'l')}" alt="${item.alt || alt(item.key)}" loading="lazy" decoding="async">
      </button>
      ${item.label ? `<figcaption>${item.label}</figcaption>` : ''}
    </figure>`).join('');
    return `<div class="sc__media case-media case-media--${s.mediaLayout}"><div class="case-media__figures">${figures}</div></div>`;
  }
  function pageHTML(p) {
    const shot = (item) => { const k = typeof item === 'string' ? item : item.key; return `<figure class="${item.caption ? 'is-captioned' : ''}"><img src="${src(k, 'm')}" srcset="${src(k, 's')} 480w, ${src(k, 'm')} 960w, ${src(k, 'l')} 1440w" sizes="${item.caption ? '(max-width: 760px) 90vw, 55vw' : '300px'}" data-media-key="${k}" data-full="${src(k, 'l')}" alt="${item.alt || alt(k)}" width="1440" height="1440" loading="lazy" decoding="async">${item.caption ? `<figcaption>${item.caption}</figcaption>` : ''}</figure>`; };
    const secs = subsOf(p).filter((s) => s.more).map((s) => {
      const media = s.mediaLayout ? caseMediaHTML(s) : s.media ? `<div class="sc__media">${s.media.map((k) => p.subs ? shot(k) : '<figure class="is-placeholder" aria-hidden="true"></figure>').join('')}</div>` : '';
      return `<li class="sc__sec${s.mediaLayout ? ' sc__sec--composed' : ''}"><span class="sc__lab">${s.label}</span><div><h3 class="sc__h">${s.title}</h3>${s.more.map((t) => `<p class="sc__p">${t}</p>`).join('')}${s.mediaLayout ? '' : media}</div>${s.mediaLayout ? media : ''}</li>`;
    }).join('');
    return `<p class="sc__eyebrow">${p.eyebrow}</p><h2 class="sc__title">${p.headline || p.name}</h2><p class="sc__lede">${p.text}</p><ol class="sc__sections">${secs}</ol>`;
  }
  function subHeroHTML(p) {
    if (p.media && p.media.embed) return filmHTML(p);
    if (p.media && p.media.demo) return demoHTML(p);
    if (p.media && p.media.image) return `<button class="row__media is-artwork case-media__image" style="background:${p.media.ground || '#e6e6e6'}" type="button" aria-label="Enlarge: ${p.name}">${artworkImageHTML(p)}</button>`;
    return '<div class="row__media is-placeholder" aria-hidden="true"></div>';
  }

  function cvSidebarHTML() {
    const cv = window.H_CV;
    const contactIcon = kind => `<svg class="cv-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${kind === 'email' ? '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>' : '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L9 11a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9z"/>'}</svg>`;
    return `<aside class="cv-sidebar">
      <img class="cv-portrait" src="assets/cv-profile-original.png" alt="Austin Lin seated against a stone wall" width="200" height="200">
      <section><h3>Contact</h3><p>Sydney, Australia</p><p class="cv-contact-row">${contactIcon('email')}<a href="mailto:alin9077@gmail.com">alin9077@gmail.com</a></p><p class="cv-contact-row">${contactIcon('phone')}<a href="tel:+61477773225">0477 773 225</a></p><p class="cv-contact-row cv-contact-row--linkedin"><svg class="cv-contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.4 7.9H2V22h3.4V7.9ZM3.7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM22 13.9c0-4.2-2.2-6.2-5.1-6.2-2.4 0-3.4 1.3-4 2.2v-2h-3.4V22h3.4v-7.8c0-2.1.4-4.1 2.9-4.1 2.5 0 2.5 2.3 2.5 4.2V22H22v-8.1Z"/></svg><a href="https://au.linkedin.com/in/austin-lin-2a179643" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></p></section>
      <section><h3>Education</h3>${cv.education.map(e => `<div class="cv-education"><h4 class="cv-school"><img class="cv-school__logo" src="assets/brands/${e.school === 'The University of Sydney' ? 'usyd-mark.png' : 'muirfield-mark.png'}" width="18" height="18" alt=""><span>${e.school}</span></h4><p>${e.course}${e.minor ? `<br>(${e.minor})` : ''}</p><p class="cv-date">${e.year}</p></div>`).join('')}</section>
    </aside>`;
  }
  function cvHTML() {
    const cv = window.H_CV;
    const experience = cv.experience.map(job => {
      const months = job.start ? (cv.asOf[0] - job.start[0]) * 12 + cv.asOf[1] - job.start[1] : null;
      const tenure = months == null ? '' : ` · ${months} months (${Math.floor(months / 12)} years, ${months % 12} months)`;
      const brandIcons = {
        'National Australia Bank (NAB)': 'nab-mark.svg',
        'Commonwealth Bank of Australia (CBA)': 'commbank-mark.svg',
        'Qantas': 'qantas-mark.svg',
        'HSBC': 'hsbc-mark.svg',
        'Massive Interactive': 'massive-mark.png',
        'Insurance Australia Group (IAG)': 'iag-mark.png',
        'The University of Sydney': 'usyd-mark.png',
        'Wunderman Bienalto': 'wpp-mark.png',
        'Retail and hospitality': 'telstra-mark.png'
      };
      const initials = { 'HSBC': 'H', 'Massive Interactive': 'M', 'The University of Sydney': 'US', 'Wunderman Bienalto': 'WB', 'Retail and hospitality': 'R' };
      const icon = brandIcons[job.company]
        ? `<img class="cv-job__logo${job.company === 'Wunderman Bienalto' ? ' cv-job__logo--wpp' : ''}" src="assets/brands/${brandIcons[job.company]}" width="20" height="20" alt="">`
        : `<span class="cv-job__monogram" aria-hidden="true">${initials[job.company] || job.company[0]}</span>`;
      return `<li class="cv-job"><div class="cv-job__heading"><h4>${icon}<span>${job.company}</span></h4>${job.start ? '<span class="cv-current">Current</span>' : ''}</div>
        <p class="cv-role">${job.role}${job.type ? `<span> · ${job.type}</span>` : ''}</p>
        ${job.team ? `<p class="cv-team">${job.team}</p>` : ''}<p class="cv-date">${job.dates}${tenure}</p>
        ${job.points ? `<ul class="cv-points">${job.points.map(t => `<li>${t}</li>`).join('')}</ul>` : ''}</li>`;
    }).join('');
    return `<header class="cv-header"><p class="sc__eyebrow">Curriculum vitae</p><h2 class="sc__title" id="cv-title">Austin Lin</h2><p class="sc__lede">${cv.title}</p></header>
      <section class="cv-experience"><h3>Experience</h3><ol>${experience}</ol></section>`;
  }

  const box = (r, radius) => ({ left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: radius });

  async function openPage(id, push = true) {
    if (open?.closing) await open.closePromise;
    const isCV = id === 'cv';
    const p = isCV ? {} : PR[id];
    if (level !== 1 || open || !p) return;
    if (!isCV && !hasPage(p)) {
      const brand = B.find(b => b.projects.includes(id));
      if (brand) history.replaceState(null, '', `#${brand.id}`);
      return;
    }
    const owner = B.findIndex(b => b.projects.includes(id));
    if (owner >= 0) selectBrand(owner);
    const overviewY = scrollY;
    const returnFocus = document.activeElement;
    const source = isCV ? null : pageEl.querySelector(`#p-${id} .row__media:is(.is-film, .is-demo)`);
    const origin = source?.getBoundingClientRect();
    const shouldTravel = origin && origin.bottom > 0 && origin.top < innerHeight && !reduce.matches;
    subEl.classList.remove('is-returned');
    subEl.classList.toggle('is-entering', !!shouldTravel);
    subEl.classList.toggle('is-cv', isCV);
    if (isCV) { subEl.setAttribute('role', 'dialog'); subEl.setAttribute('aria-modal', 'true'); subEl.setAttribute('aria-labelledby', 'cv-title'); top.inert = true; }
    level = 3; body.dataset.level = '3'; subEl.setAttribute('aria-hidden', 'false');
    body.style.position = 'fixed'; body.style.top = -overviewY + 'px'; body.style.width = '100%';
    resetWind();
    $('#page').inert = true; picker.inert = true; $('#themeFooter').inert = true;
    films.forEach((f) => { if (f.ready) filmSet(f, false); });
    demos('setActive', pageEl, false);
    demos('destroy', subHero);
    destroyFilms(subHero);
    subHero.innerHTML = isCV ? cvSidebarHTML() : subHeroHTML(p);
    let mediaHome = null;
    if (source) {
      // Reuse the live player, including its shadow root, playback position and pause state.
      mediaHome = document.createElement('div');
      mediaHome.className = source.className;
      mediaHome.setAttribute('aria-hidden', 'true');
      mediaHome.style.visibility = 'hidden';
      source.replaceWith(mediaHome);
      subHero.replaceChildren(source);
      const film = films.get(source);
      if (film) { film.inPage = true; loadFilm(film); syncFilm(film); }
      demos('setActive', source, true);
    }
    demos('init', subHero);
    mountFilms(subHero, true);
    subCopy.innerHTML = isCV ? cvHTML() : pageHTML(p);
    subEl.scrollTop = 0;
    const current = open = { id, pushed: push, overviewY, returnFocus, source, mediaHome };
    const b = B[sel];
    const pageHash = isCV ? '#cv' : `#${b.id}/${id}`;
    if (push) history.pushState({ p: id }, '', pageHash); else history.replaceState({ p: id }, '', pageHash);
    [...subCopy.children].forEach((el, k) => el.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }],
      { duration: R(900), delay: R(300 + k * 80), easing: EXPO, fill: 'backwards' }));
    const from = rowsEl.querySelector(`#p-${id} .row__media > img`), heroImg = subHero.querySelector('.row__media > img');
    if (shouldTravel) {
      const target = source.getBoundingClientRect();
      current.motion = source.animate([
        { transform: `translate(${origin.left - target.left}px, ${origin.top - target.top}px) scale(${origin.width / target.width}, ${origin.height / target.height})` },
        { transform: 'none' }
      ], { duration: 850, easing: 'cubic-bezier(.65,0,.15,1)' });
      await current.motion.finished.catch(() => {});
      if (open !== current || current.closing) return;
      subEl.classList.remove('is-entering');
    } else if (from && heroImg && !reduce.matches) {
      const a = from.getBoundingClientRect(), r = getComputedStyle(from.parentElement).borderRadius;
      const flyer = document.createElement('img');
      flyer.className = 'flyer'; flyer.src = from.currentSrc || from.src; flyer.style.objectPosition = from.style.objectPosition; flyer.style.objectFit = from.style.objectFit;
      Object.assign(flyer.style, box(a, r));
      body.append(flyer);
      heroImg.style.visibility = 'hidden';
      const t = heroImg.getBoundingClientRect();
      await flyer.animate([box(a, r), box(t, r)], { duration: 900, easing: 'cubic-bezier(.75,0,.15,1)', fill: 'forwards' }).finished.catch(() => {});
      heroImg.style.visibility = ''; flyer.remove();
    } else {
      subHero.firstElementChild.animate([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: R(800), easing: EXPO });
    }
    if (open === current && !current.closing && (keyboard || isCV)) back.focus({ preventScroll: true });
  }
  function closePage() {
    if (!open) return;
    if (open.closing) return open.closePromise;
    const current = open;
    current.closing = true;
    current.closePromise = returnToOverview(current);
    return current.closePromise;
  }
  async function returnToOverview(current) {
    const { id, overviewY, returnFocus, source, mediaHome, motion } = current;
    // Capture the rendered frame before cancelling an unfinished entrance.
    const start = source?.getBoundingClientRect();
    const target = mediaHome?.getBoundingClientRect();
    const travel = start && target && !reduce.matches && start.bottom > 0 && start.top < innerHeight && target.bottom > 0 && target.top < innerHeight;
    const paperOpacity = subEl.classList.contains('is-entering') ? getComputedStyle(subEl, '::before').opacity : '1';
    motion?.cancel();
    subEl.classList.remove('is-entering');
    if (travel) {
      subEl.style.setProperty('--return-paper-opacity', paperOpacity);
      subEl.classList.add('is-leaving');
      const base = source.getBoundingClientRect();
      const pose = rect => `translate(${rect.left - base.left}px, ${rect.top - base.top}px) scale(${rect.width / base.width}, ${rect.height / base.height})`;
      const fade = subCopy.animate([{ opacity: getComputedStyle(subCopy).opacity }, { opacity: 0 }], { duration: 220, fill: 'forwards' });
      const returning = source.animate([{ transform: pose(start) }, { transform: pose(target) }],
        { duration: 850, easing: 'cubic-bezier(.85,0,.35,1)', fill: 'forwards' });
      const finish = () => returning.cancel();
      addEventListener('resize', finish, { once: true });
      reduce.addEventListener('change', finish, { once: true });
      await returning.finished.catch(() => {});
      removeEventListener('resize', finish);
      reduce.removeEventListener('change', finish);
      returning.cancel(); fade.cancel();
      subEl.classList.add('is-returned');
      subEl.classList.remove('is-leaving');
      subEl.style.removeProperty('--return-paper-opacity');
    }
    open = null;
    if (source && mediaHome) {
      mediaHome.replaceWith(source);
      const film = films.get(source);
      if (film) film.inPage = false;
    }
    top.inert = false;
    subEl.removeAttribute('aria-modal'); subEl.removeAttribute('aria-labelledby'); subEl.removeAttribute('role');
    level = 1; body.dataset.level = '1';
    body.style.position = ''; body.style.top = ''; body.style.width = '';
    scrollTo({ top: overviewY, behavior: 'instant' });
    resetWind();
    $('#page').inert = false; picker.inert = false; $('#themeFooter').inert = false;
    subEl.setAttribute('aria-hidden', 'true');
    demos('setActive', subHero, false);
    projectFocusDirty = true;
    history.replaceState(null, '', `#${B[sel].id}`);
    destroyFilms(subHero);
    syncProjectMedia();
    setTimeout(() => { if (!open) { demos('destroy', subHero); subHero.innerHTML = ''; subCopy.innerHTML = ''; } }, 520);
    if (id === 'cv' && returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    if (keyboard) { const l = rowsEl.querySelector(`#p-${id} .row__link`); if (l) l.focus({ preventScroll: true }); }
  }
  function goBack() { if (!open || open.closing) return; if (open.pushed) history.back(); else closePage(); }
  back.addEventListener('click', goBack);
  addEventListener('popstate', async (e) => {
    const p = e.state && e.state.p;
    if (open?.closing) await open.closePromise;
    if (open && p == null) closePage();
    else if (!open && p != null && level === 1) openPage(p, false);
  });
  // a typed or linked hash (#nab, #ai/menu-finder) routes like a click; our own replaceState never fires this
  addEventListener('hashchange', async () => {
    const [bid, pid] = location.hash.replace('#', '').split('/');
    if (bid === 'cv') { if (open && open.id !== 'cv') await closePage(); if (!open) openPage('cv', false); return; }
    const i = B.findIndex((b) => b.id === bid);
    if (open && (!pid || (i >= 0 && i !== sel))) await closePage();
    if (i >= 0 && i !== sel) go(i);
    if (pid && PR[pid] && !open && sel >= 0 && B[sel].projects.includes(pid)) openPage(pid, false);
  });

  /* ── Artefact viewer ─────────────────────── */
  const viewer = (() => {
    const v = $('#viewer'), frame = v.querySelector('.viewer__frame'), img = frame.querySelector('img'), pct = v.querySelector('.viewer__pct');
    let s = 1, tx = 0, ty = 0, thumb = null, isOpen = false, bw = 0, bh = 0, pinch = null, panFrom = null, moved = false, downOn = null;
    let closing = false, returnFocus = null, backgroundStates = [], savedOverflow = '';
    const pts = new Map();
    function apply(smooth) {
      img.style.transition = smooth && !reduce.matches ? 'transform .5s cubic-bezier(.16,1,.3,1)' : 'none';
      img.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
      pct.textContent = Math.round(s * 100) + '%'; v.classList.toggle('is-zoomed', s > 1.01);
    }
    function bound() {
      const mx = Math.max(0, (bw * s - innerWidth * .94) / 2), my = Math.max(0, (bh * s - innerHeight * .86) / 2);
      tx = clamp(tx, -mx, mx); ty = clamp(ty, -my, my);
    }
    function zoomAt(s2, px, py, smooth) {
      s2 = clamp(s2, 1, 6);
      const r = frame.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const ux = (px - cx - tx) / s, uy = (py - cy - ty) / s;
      tx = px - cx - ux * s2; ty = py - cy - uy * s2; s = s2;
      if (s === 1) { tx = 0; ty = 0; }
      bound(); apply(smooth);
    }
    function fit() {
      const nw = img.naturalWidth || 1600, nh = img.naturalHeight || 1000;
      const k = Math.min(innerWidth * .92 / nw, innerHeight * .82 / nh, 2);
      bw = nw * k; bh = nh * k; frame.style.width = bw + 'px'; frame.style.height = bh + 'px';
    }
    function flipFrom(el) {
      const a = el.getBoundingClientRect(), b = frame.getBoundingClientRect();
      return `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, ${a.top + a.height / 2 - (b.top + b.height / 2)}px) scale(${a.width / b.width}, ${a.height / b.height})`;
    }
    async function openV(el) {
      if (isOpen || closing) return;
      isOpen = true; thumb = el;
      returnFocus = el.closest('button, a') || document.activeElement;
      savedOverflow = body.style.overflow;
      backgroundStates = [...body.children].filter(node => node !== v && !node.matches('script, style, link')).map(node => [node, node.inert]);
      backgroundStates.forEach(([node]) => { node.inert = true; });
      body.style.overflow = 'hidden';
      img.src = el.dataset.full || el.currentSrc || el.src; img.alt = el.alt || '';
      try { await img.decode(); } catch (e) { /* show anyway */ }
      if (!isOpen) return;
      s = 1; tx = ty = 0; apply(false); fit();
      v.inert = false;
      v.classList.add('is-open'); v.setAttribute('aria-hidden', 'false');
      thumb.style.visibility = 'hidden';
      frame.animate([{ transform: flipFrom(thumb) }, { transform: 'none' }], { duration: R(700), easing: 'cubic-bezier(.7,0,.15,1)' });
      v.querySelector('.viewer__close').focus({ preventScroll: true });
    }
    async function closeV() {
      if (!isOpen) return;
      isOpen = false; closing = true;
      if (s > 1.01) { s = 1; tx = ty = 0; apply(true); }
      v.classList.remove('is-open'); v.setAttribute('aria-hidden', 'true');
      const t = thumb;
      const a = frame.animate([{ transform: 'none' }, { transform: flipFrom(t) }], { duration: R(560), easing: 'cubic-bezier(.7,0,.15,1)', fill: 'forwards' });
      await a.finished.catch(() => {});
      t.style.visibility = ''; a.cancel(); img.removeAttribute('src');
      v.inert = true;
      backgroundStates.forEach(([node, inert]) => { node.inert = inert; });
      body.style.overflow = savedOverflow;
      closing = false;
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    }
    v.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const buttons = [...v.querySelectorAll('button')], first = buttons[0], last = buttons.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    v.addEventListener('wheel', (e) => { e.preventDefault(); e.stopPropagation(); zoomAt(s * Math.exp(-e.deltaY * (e.ctrlKey ? .01 : .0022)), e.clientX, e.clientY, false); }, { passive: false });
    v.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.viewer__bar')) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) downOn = e.target;
      v.setPointerCapture(e.pointerId); moved = false;
      if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s }; }
      else panFrom = { x: e.clientX - tx, y: e.clientY - ty };
    });
    v.addEventListener('pointermove', (e) => {
      if (!pts.has(e.pointerId)) return;
      const p0 = pts.get(e.pointerId);
      if (Math.hypot(e.clientX - p0.x, e.clientY - p0.y) > 4) moved = true;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch && pts.size === 2) { const [a, b] = [...pts.values()]; zoomAt(pinch.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch.d, (a.x + b.x) / 2, (a.y + b.y) / 2, false); }
      else if (panFrom && s > 1.01 && moved) { v.classList.add('is-panning'); tx = e.clientX - panFrom.x; ty = e.clientY - panFrom.y; bound(); apply(false); }
    });
    const up = (e) => {
      if (!pts.has(e.pointerId)) return;
      pts.delete(e.pointerId); v.classList.remove('is-panning');
      if (pts.size < 2) pinch = null;
      if (pts.size === 0) {
        panFrom = null;
        if (!moved && e.type === 'pointerup') { if (downOn === img) zoomAt(s > 1.01 ? 1 : 2.5, e.clientX, e.clientY, true); else closeV(); }
      }
    };
    v.addEventListener('pointerup', up); v.addEventListener('pointercancel', up);
    v.querySelector('.viewer__bar').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.classList.contains('viewer__close')) return closeV();
      const r = frame.getBoundingClientRect();
      zoomAt(s * (+b.dataset.z > 0 ? 1.6 : 1 / 1.6), r.left + r.width / 2, r.top + r.height / 2, true);
    });
    addEventListener('resize', () => { if (isOpen) { fit(); bound(); apply(false); } });
    return { open: openV, close: closeV, get isOpen() { return isOpen || closing; } };
  })();
  subEl.addEventListener('click', (e) => {
    const imageButton = e.target.closest('.case-media__image');
    const im = imageButton ? imageButton.querySelector('img') : e.target.closest('.sc__media img, .sub__hero .row__media > img');
    if (im) viewer.open(im);
  });
  pageEl.addEventListener('click', (e) => {
    const button = e.target.closest('[data-view-artwork]');
    if (button) viewer.open(button.querySelector('img'));
  });

  /* Automatic two-second comparison crossfade with no off-screen timer. */
  const comparisons = [...pageEl.querySelectorAll('[data-comparison]')].map(el => {
    const state = { el, index: 0, paused: reduce.matches, visible: false, ready: false, timer: null };
    const layers = [...el.querySelectorAll('.comparison__layer')];
    state.show = index => {
      state.index = index;
      layers.forEach((layer, i) => {
        layer.classList.toggle('is-current', i === index);
        layer.inert = i !== index;
        layer.setAttribute('aria-hidden', String(i !== index));
      });
    };
    state.sync = () => {
      clearTimeout(state.timer); state.timer = null;
      if (state.paused || !state.ready || !state.visible || el.closest('.row') !== focusedProject || document.hidden || level !== 1 || viewer.isOpen || el.querySelector('.comparison__layer:focus')) return;
      state.timer = setTimeout(() => { state.show((state.index + 1) % layers.length); state.sync(); }, 2000);
    };
    el.addEventListener('focusin', state.sync);
    el.addEventListener('focusout', () => queueMicrotask(state.sync));
    Promise.all(layers.map(layer => layer.querySelector('img').decode())).then(() => { state.ready = true; state.sync(); }).catch(() => {});
    state.sync();
    return state;
  });
  const syncComparisons = () => comparisons.forEach(state => state.sync());
  const comparisonIO = new IntersectionObserver(entries => entries.forEach(entry => {
    const state = comparisons.find(item => item.el === entry.target);
    state.visible = entry.isIntersecting; state.sync();
  }), { threshold: 0.2 });
  comparisons.forEach(state => comparisonIO.observe(state.el));
  new MutationObserver(syncComparisons).observe(body, { attributes: true, attributeFilter: ['data-level'] });
  new MutationObserver(syncComparisons).observe($('#viewer'), { attributes: true, attributeFilter: ['class', 'inert'] });
  document.addEventListener('visibilitychange', syncComparisons);
  reduce.addEventListener('change', () => { comparisons.forEach(state => { state.paused = reduce.matches; }); syncComparisons(); });

  /* One project owns motion. A spatial buffer and short dwell prevent boundary jitter. */
  const projectRows = [...pageEl.querySelectorAll('.row')];
  function syncProjectMedia() {
    // Stop every outgoing player before allowing the incoming player to start.
    projectRows.forEach(row => {
      if (row !== focusedProject || level !== 1 || mediaBlocked()) demos('setActive', row, false);
    });
    films.forEach(f => { if (!f.inPage && f.row !== focusedProject) filmSet(f, false); });
    if (focusedProject && level === 1 && !mediaBlocked()) demos('setActive', focusedProject, true);
    demos('setActive', subHero, level === 3 && !mediaBlocked());
    syncFilms();
    syncComparisons();
  }
  function setProjectFocus(row) {
    clearTimeout(focusTimer); focusCandidate = null;
    if (row === focusedProject) return;
    focusedProject = row;
    syncProjectMedia();
  }
  function updateProjectFocus() {
    projectFocusDirty = false;
    if (level !== 1 || mediaBlocked()) return;
    const center = innerHeight * .5;
    const candidates = projectRows.map(row => {
      const r = row.querySelector('.row__media').getBoundingClientRect();
      const visible = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
      return { row, distance: Math.abs(r.top + r.height / 2 - center), visible: visible / Math.min(r.height, innerHeight) };
    }).filter(item => item.visible >= .2).sort((a, b) => a.distance - b.distance);
    const next = candidates[0], current = candidates.find(item => item.row === focusedProject);
    if (!next) { setProjectFocus(null); return; }
    if (!current) { setProjectFocus(next.row); return; }
    // Keep the current project through small scroll reversals near the midpoint.
    if (next.row === focusedProject || current.distance - next.distance < Math.min(64, innerHeight * .08)) {
      clearTimeout(focusTimer); focusCandidate = null; return;
    }
    if (focusCandidate !== next.row) {
      clearTimeout(focusTimer); focusCandidate = next.row;
      focusTimer = setTimeout(() => {
        setProjectFocus(next.row);
        projectFocusDirty = true;
      }, 120);
    }
  }
  pageEl.addEventListener('project-play', e => setProjectFocus(e.target.closest('.row')));
  addEventListener('scroll', () => { projectFocusDirty = true; }, { passive: true });
  addEventListener('resize', () => { projectFocusDirty = true; });
  new ResizeObserver(() => { projectFocusDirty = true; }).observe(pageEl);
  const refreshProjectMedia = () => { projectFocusDirty = true; syncProjectMedia(); };
  document.addEventListener('visibilitychange', refreshProjectMedia);
  new MutationObserver(refreshProjectMedia).observe($('#viewer'), { attributes: true, attributeFilter: ['inert'] });

  /* ── Input ───────────────────────────────── */
  let keyboard = false;
  addEventListener('keydown', () => { keyboard = true; }, true);
  addEventListener('pointerdown', () => { keyboard = false; lastInput = performance.now(); }, true);
  addEventListener('pointermove', (e) => { if (e.pointerType !== 'touch') { lastInput = performance.now(); light.tx = e.clientX; light.ty = e.clientY; } }, { passive: true });

  // the deck: pointing at a card names it; choosing it lifts it out
  const point = (i, on) => { if (cards[i].classList.contains('in-slot')) cards[i].classList.toggle('is-pointed', on); showLabel(on ? i : null); };
  cards.forEach((c, i) => {
    c.addEventListener('pointerenter', () => { if (c.classList.contains('in-slot')) point(i, true); });
    c.addEventListener('pointerleave', () => point(i, false));
    c.addEventListener('click', () => { if (!c.classList.contains('is-hero')) go(i); });
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-cv-portfolio]') && !e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); closePage(); go(0); return; }
    const o = e.target.closest('[data-open]');
    if (o && !e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); openPage(o.dataset.open); return; }
  });

  // Wheel, touch, PageUp/PageDown and vertical arrows keep the browser's native scroll.
  // Only the detail media strip translates a vertical wheel into horizontal browsing.
  subEl.addEventListener('wheel', (e) => {
    if (viewer.isOpen || e.ctrlKey || e.metaKey) return;
    const m = e.target.closest('.sc__media');
    if (m && Math.abs(e.deltaY) > Math.abs(e.deltaX) && m.scrollWidth > m.clientWidth) {
      const atEnd = (e.deltaY > 0 && m.scrollLeft + m.clientWidth >= m.scrollWidth - 1) || (e.deltaY < 0 && m.scrollLeft <= 0);
      if (!atEnd) { m.scrollLeft += e.deltaY; e.preventDefault(); }
    }
  }, { passive: false });

  // Actual page travel drives a damped spring, so wheel, touch and keys all create the same breeze.
  // Navigation/restoration resets its baseline instead of turning a page jump into a gust.
  const wind = { y: scrollY, time: performance.now(), force: 0, position: 0, velocity: 0, ignoreUntil: 0 };
  function resetWind() {
    wind.y = scrollY; wind.time = performance.now(); wind.ignoreUntil = wind.time + 140;
    wind.force = wind.position = wind.velocity = 0;
    aim = null;
  }
  function updateWind(dt) {
    if (reduce.matches || level !== 1 || document.hidden) {
      wind.force = wind.position = wind.velocity = 0;
      return;
    }
    wind.force *= Math.exp(-dt * 4.6);
    // Small integration steps keep the spring stable after dropped frames.
    for (let left = dt; left > 0; left -= 1 / 120) {
      const h = Math.min(left, 1 / 120);
      wind.velocity += ((wind.force - wind.position) * 95 - wind.velocity * 10.5) * h;
      wind.position += wind.velocity * h;
    }
    if (Math.abs(wind.position) + Math.abs(wind.velocity) + Math.abs(wind.force) < .0001) {
      wind.force = wind.position = wind.velocity = 0;
    }
  }

  // Follow the cursor across the page, not only while it is over the card.
  // Store viewport coordinates so scrolling can update the aim relative to the sticky card.
  let aim = null;
  addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' || reduce.matches || level !== 1 || document.hidden) return;
    aim = { x: e.clientX, y: e.clientY };
  }, { passive: true });
  document.addEventListener('pointerout', (e) => { if (!e.relatedTarget) aim = null; });
  addEventListener('pointercancel', () => { aim = null; });
  addEventListener('blur', resetWind);
  const sway = { rx: 0, ry: 0 };
  const tf = (el, v) => { if (el) put(el, 'transform', v); };
  const tr = (x, y) => `translate3d(${x.toFixed(2)}%,${y.toFixed(2)}%,0)`;
  function rest(i) {
    const m = parts[i];
    [m.tilt, m.back, m.mid, m.front, m.spot, m.glare, ...m.spec].forEach((el) => tf(el, 'none'));
  }
  function swayCard(now, dt) {
    const m = parts[sel];
    let tx = 0, ty = 0;
    if (reduce.matches) { sway.rx = 2; sway.ry = -4; tx = 2; ty = -4; }
    else if (aim) {
      tx = Math.tanh((heroBox.y + heroBox.h / 2 - aim.y) / (heroBox.h * .7)) * 7.5;
      ty = Math.tanh((aim.x - heroBox.x - heroBox.w / 2) / (heroBox.w * .7)) * 10;
    }
    else if (!reduce.matches) {
      const t = now / 1000;
      tx = Math.sin(t * .43) * 1.2;
      ty = Math.sin(t * .31 + 1.3) * 2.8;
    }
    const k = 1 - Math.exp(-dt * (aim ? 8 : 2.2));
    sway.rx += (tx - sway.rx) * k; sway.ry += (ty - sway.ry) * k;
    const breeze = reduce.matches ? 0 : wind.position;
    // Flutter follows the gust's energy and disappears as the spring settles.
    const gust = reduce.matches ? 0 : clamp(Math.abs(breeze) + Math.abs(wind.velocity) * .06, 0, 1);
    const t = now / 1000, flutter = Math.sin(t * 7.5) * .65 + Math.sin(t * 11.3 + .4) * .35;
    const rx = clamp(sway.rx + breeze * 9 + gust * flutter * .8, -15, 15);
    const ry = clamp(sway.ry - breeze * 4 + gust * Math.sin(t * 5.2 + .7) * 1.1, -14, 14);
    const roll = -breeze * 2 + gust * flutter * .55;
    // Keep enlarged reflection sheets covering the face even at the strongest combined tilt.
    const nx = Math.tanh(ry / 11) * .8, ny = Math.tanh(-rx / 7.5) * .8;
    tf(m.tilt, `perspective(1500px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg) translate3d(${(breeze * 3).toFixed(2)}px,${(-breeze * 6 + gust * flutter * 1.2).toFixed(2)}px,0)`);
    tf(m.back, tr(nx * 1.1, ny * 1.1));
    tf(m.mid, tr(-nx * .5, -ny * .5));
    tf(m.front, tr(-nx * 2.2, -ny * 2.2));
    m.spec.forEach((el) => tf(el, tr(-nx * 18, -ny * 18)));
    tf(m.spot, tr(nx * 34, ny * 34));
    tf(m.glare, tr(nx * 26, ny * 26));
  }

  addEventListener('keydown', (e) => {
    if (viewer.isOpen) {
      if (e.key === 'Escape') { e.preventDefault(); viewer.close(); }
      else if (['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
      return;
    }
    if (level === 3) {
      if (e.key === 'Escape') goBack();
      if (open?.id === 'cv' && e.key === 'Tab') {
        const focusable = [back, ...subEl.querySelectorAll('a[href], button:not([disabled])')];
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      return;
    }
    const k = e.key;
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (k === 'ArrowRight') { if (!e.repeat) go(sel + 1); e.preventDefault(); }
    else if (k === 'ArrowLeft') { if (!e.repeat) go(sel - 1); e.preventDefault(); }
    else if ((k === 'Enter' || k === ' ') && e.target.closest && e.target.closest('.card')) { go(+e.target.closest('.card').dataset.i); e.preventDefault(); }
  });

  addEventListener('resize', measure);
  addEventListener('load', measure);
  addEventListener('scroll', () => {
    const now = performance.now(), y = scrollY;
    const speed = (y - wind.y) / clamp(now - wind.time, 16, 64);
    if (level === 1 && !reduce.matches && !document.hidden && now > wind.ignoreUntil) {
      wind.force = clamp(speed / 1.4, -1, 1);
    }
    wind.y = y; wind.time = now; lastInput = now;
    if (!scrollFrame) scrollFrame = requestAnimationFrame(trackBrand);
  }, { passive: true });
  reduce.addEventListener('change', resetWind);
  document.addEventListener('visibilitychange', resetWind);
  new ResizeObserver(measure).observe(pageEl);
  if (document.fonts) document.fonts.ready.then(measure);

  /* ── Loop ────────────────────────────────── */
  let last = performance.now();
  function tick(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (projectFocusDirty) updateProjectFocus();
    syncFilms();
    updateWind(dt);
    updateLight(now, dt);
    const c = sel >= 0 ? heroCards[sel] : null;
    const seen = heroBox.y + heroBox.h > 0 && heroBox.y < innerHeight;
    if (c && seen && level === 1 && !document.hidden) swayCard(now, dt);
    requestAnimationFrame(tick);
  }

  /* ── Start: restore the requested section without blocking input. ── */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const hash = location.hash.replace('#', '').split('/');
  const startIdx = Math.max(0, B.findIndex(b => b.id === hash[0]));
  measure();
  go(startIdx, true);
  requestAnimationFrame(tick);
  if (hash[0] === 'cv') openPage('cv', false);
  else if (hash[1] && B[startIdx].projects.includes(hash[1])) openPage(hash[1], false);
})();
