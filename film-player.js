/* Shared player for the 1:1 hero films (window.IncomeFilm, window.MenuFilm).
   Streams the size that suits the slot (720px for phones and the dock, 1300px otherwise) so playback starts as soon as
   the first second has arrived. Safari can't stream from servers without byte ranges (some local previews), so if
   nothing has loaded after a few seconds the film is fetched whole and played from memory instead.
   A loader appears only when the film is meant to be playing but is still buffering.
   Chapters run along the bottom: each segment fills as it plays, and choosing one jumps to that chapter. */
window.FilmPlayer = { mount(host, { sources, poster, duration, label, chapters = [] }) {
  if (host.film) return host.film;
  host.setAttribute('aria-label', label);
  // The chapter buttons need to be reachable, so the film is a labelled group rather than an image; it sits above the
  // project link, but only the chapters take clicks (the slot's CSS keeps everything else click-through).
  host.setAttribute('role', 'group');
  host.style.zIndex = '2';
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>
    :host{display:block;width:100%;height:100%;position:relative}
    video{display:block;width:100%;height:100%;object-fit:cover;background:#f2f1ec}
    .load{position:absolute;left:50%;top:50%;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;background:rgba(242,241,236,.92);
      box-shadow:0 6px 24px -8px rgba(30,28,20,.35);display:grid;place-items:center;opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s .25s}
    .load i{width:22px;height:22px;border:2px solid rgba(27,27,32,.16);border-top-color:#1b1b20;border-radius:50%;animation:spin .85s linear infinite}
    :host([data-buffering]) .load{opacity:1;visibility:visible;transition:opacity .25s .35s,visibility 0s .35s}
    @keyframes spin{to{transform:rotate(360deg)}}
    @media (prefers-reduced-motion:reduce){.load i{animation:none;border-color:#1b1b20;border-right-color:rgba(27,27,32,.16)}}
    :host{container-type:inline-size}
    .chapters{position:absolute;left:7%;right:calc(6% + 52px);bottom:calc(5% + 3px);display:flex;flex-direction:column;align-items:flex-start;gap:6px;pointer-events:none}
    .now{font:600 11px/1 Archivo,"Helvetica Neue",Helvetica,Arial,sans-serif;letter-spacing:.06em;color:#1b1b20;background:rgba(242,241,236,.92);padding:6px 9px;border-radius:999px;white-space:nowrap}
    .now b{font-weight:600;color:#6e6e73;margin-right:6px}
    .bar{display:flex;gap:4px;width:100%}
    .bar button{flex:var(--d) 1 0;height:24px;padding:0;margin:0;border:0;background:none;cursor:pointer;position:relative;pointer-events:auto;border-radius:4px}
    .bar button::before,.bar button i{content:"";position:absolute;left:0;top:10px;height:4px;border-radius:2px}
    .bar button::before{right:0;background:rgba(27,27,32,.18)}
    .bar button i{width:calc(var(--p,0) * 100%);background:#1b1b20}
    .bar button:hover::before{background:rgba(27,27,32,.32)}
    .bar button:focus-visible{outline:2px solid #1b1b20;outline-offset:2px}
    @container (max-width:340px){.now{display:none}.chapters{left:6%;right:calc(6% + 46px)}.bar{gap:3px}}
  </style>
  <video muted playsinline loop preload="auto" disablepictureinpicture aria-hidden="true" poster="${poster}"></video>
  <span class="load" role="status" aria-label="Loading film"><i></i></span>
  ${chapters.length ? `<nav class="chapters" aria-label="Film chapters"><span class="now" aria-hidden="true"></span><div class="bar">${chapters.map((c, i) => {
    const end = i + 1 < chapters.length ? chapters[i + 1].t : duration;
    return `<button type="button" style="--d:${(end - c.t).toFixed(2)}" title="${c.label}" aria-label="Chapter ${i + 1} of ${chapters.length}: ${c.label}"><i></i></button>`;
  }).join('')}</div></nav>` : ''}`;
  const video = root.querySelector('video');
  video.muted = true;
  let playing = false, destroyed = false, wanted = 0, inMemory = false;
  // Size for the largest the slot gets (the 650px project hero): phones and 1x screens take 720px, Retina desktops 1300px.
  // Slow or data-saving connections take the small file too.
  const net = navigator.connection, slow = net && (net.saveData || (net.downlink && net.downlink < 5));
  const src = (slow || innerWidth <= 760 || Math.min(650, innerWidth) * Math.min(devicePixelRatio || 1, 2) <= 820) ? sources.small : sources.large;
  // Show the loader when playback is starved; clear it only once enough is buffered, so stutters don't flicker it.
  let starved = false;
  const buffering = () => {
    if (!playing || destroyed) starved = false;
    else if (video.readyState < 3) starved = true;
    else if (video.readyState === 4 || !video.paused && video.currentTime > 0 && video.readyState >= 3 && video.buffered.length && video.buffered.end(video.buffered.length - 1) - video.currentTime > 2) starved = false;
    host.toggleAttribute('data-buffering', starved);
  };
  const resume = () => { if (wanted) try { video.currentTime = wanted; } catch (e) { /* not seekable yet */ } if (playing) video.play().catch(() => {}); buffering(); };
  function fromMemory() {
    if (inMemory || destroyed) return;
    inMemory = true;
    fetch(src).then((r) => (r.ok ? r.blob() : Promise.reject())).then((blob) => {
      if (destroyed) return;
      video.src = URL.createObjectURL(blob);
      video.addEventListener('loadedmetadata', resume, { once: true });
    }).catch(() => {});
  }
  video.src = src;
  video.addEventListener('error', fromMemory);
  // Nothing yet? Only fall back if the server really can't stream (no byte ranges); a slow network just keeps streaming.
  setTimeout(() => {
    if (video.readyState > 0 || inMemory || destroyed) return;
    const probe = new AbortController();
    fetch(src, { headers: { Range: 'bytes=0-1' }, signal: probe.signal }).then((r) => { probe.abort(); if (r.status !== 206) fromMemory(); }).catch(() => {});
  }, 3500);
  ['waiting', 'stalled', 'canplay', 'canplaythrough', 'playing', 'progress', 'timeupdate', 'loadeddata', 'pause', 'seeked'].forEach((e) => video.addEventListener(e, buffering));
  // Moving the player (the floating dock) can pause it; resume while the portfolio still wants it playing.
  video.addEventListener('pause', () => queueMicrotask(() => { if (playing && !destroyed && video.paused) video.play().catch(() => {}); }));
  // Chapters: fill each segment with its share of the current time; choosing one seeks there, keeping play or pause.
  const segs = [...root.querySelectorAll('.bar button')], now = root.querySelector('.now');
  let shown = -1, frame = 0;
  const pad = (n) => String(n).padStart(2, '0');
  function chapterUI() {
    frame = 0;
    if (!segs.length || destroyed) return;
    const t = video.currentTime;
    let at = 0;
    chapters.forEach((c, i) => {
      const end = i + 1 < chapters.length ? chapters[i + 1].t : duration;
      if (t >= c.t) at = i;
      segs[i].style.setProperty('--p', Math.min(1, Math.max(0, (t - c.t) / (end - c.t))).toFixed(4));
    });
    if (at !== shown) { shown = at; now.innerHTML = `<b>${pad(at + 1)} / ${pad(chapters.length)}</b>${chapters[at].label}`; segs.forEach((b, i) => b.toggleAttribute('aria-current', i === at)); }
    if (playing && !video.paused) frame = requestAnimationFrame(chapterUI);
  }
  segs.forEach((b, i) => b.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    wanted = chapters[i].t;
    try { video.currentTime = wanted; } catch (err) { /* applied once loaded */ }
    chapterUI();
  }));
  ['playing', 'seeked', 'timeupdate', 'loadedmetadata'].forEach((e) => video.addEventListener(e, () => { if (!frame) chapterUI(); }));
  chapterUI();
  const api = {
    D: duration,
    set(v) { api.pause(); wanted = Math.max(0, Math.min(duration - 0.05, v)); try { video.currentTime = wanted; } catch (e) { /* applied once loaded */ } },
    play() { playing = true; buffering(); video.play().catch((e) => { if (e.name === 'NotAllowedError') { playing = false; buffering(); } }); },
    pause() { playing = false; video.pause(); buffering(); },
    get playing() { return playing; },
    get time() { return video.currentTime; },
    destroy() { destroyed = true; api.pause(); },
    setReduced() {}
  };
  host.film = api;
  return api;
}};
