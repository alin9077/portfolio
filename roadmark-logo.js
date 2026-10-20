/* Original Roadmark globe and lightning motion, shared by both portfolio views. */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const instances = new Set();
  const pending = new WeakSet();
  const green = [74, 115, 38], yellow = [240, 214, 72];
  const tilt = -23 * Math.PI / 180;
  const round = value => Math.round(value * 100) / 100;
  const between = (low, high) => low + Math.random() * (high - low);
  // Same sphere grid and dot order as the original Roadmark component.
  const globe = Array.from({ length: 15 }, (_, row) => {
    const y = 4 + row * 4;
    const reach = Math.sqrt(900 - (y - 32) ** 2);
    const step = 2 * Math.PI / Math.round(2 * Math.PI * reach / 4);
    const count = Math.ceil(Math.PI / step);
    return Array.from({ length: count }, (_, index) => ({ y, reach, offset: index * step, span: count * step }));
  }).flat();
  let artwork, frame = 0, last = 0;

  function visible(instance) {
    return instance.visible && instance.svg.isConnected && !instance.svg.closest('[inert]');
  }

  function refresh() {
    for (const instance of instances) {
      if (!instance.svg.isConnected) {
        observer.unobserve(instance.svg);
        instances.delete(instance);
      }
    }
    if (document.hidden || motion.matches || ![...instances].some(visible)) {
      cancelAnimationFrame(frame);
      frame = 0;
      return;
    }
    if (!frame) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      for (const instance of instances) {
        if (instance.svg === entry.target) instance.visible = entry.isIntersecting;
      }
    }
    refresh();
  });

  function animate(instance, elapsed) {
    instance.turn += elapsed * .05;
    instance.land.forEach((circle, index) => {
      const dot = globe[index];
      const longitude = ((dot.offset + instance.turn) % dot.span + dot.span) % dot.span - Math.PI / 2;
      const across = dot.reach * Math.sin(longitude), down = dot.y - 32;
      const x = 32 + across * Math.cos(tilt) - down * Math.sin(tilt);
      const y = 32 + across * Math.sin(tilt) + down * Math.cos(tilt);
      const edge = Math.min(1, Math.hypot(across, down) / 30);
      let gap = Infinity;
      for (const cell of instance.cells) gap = Math.min(gap, Math.hypot(cell.x - x, cell.y - y));
      circle.setAttribute('cx', round(x));
      circle.setAttribute('cy', round(y));
      circle.setAttribute('r', longitude >= Math.PI / 2 ? 0 : round(1.05 * Math.sqrt(1 - edge * edge)));
      circle.setAttribute('opacity', longitude >= Math.PI / 2 ? 0 : round(.5 * Math.min(1, Math.max(0, (gap - 2.6) / 2.2))));
    });
    instance.wait -= elapsed;
    if (instance.wait <= 0) {
      const from = Math.random() < .65 ? -1.5 : between(0, 6);
      instance.surges.push({ at: from, end: Math.min(12, from + between(4, 13)), speed: between(7, 16), peak: between(.18, .5) });
      instance.wait = Math.random() < .25 ? between(.12, .4) : between(1.2, 4.5);
    }
    for (const surge of instance.surges) surge.at += surge.speed * elapsed * between(.1, 1.9);
    instance.surges = instance.surges.filter(surge => surge.at < surge.end + 3);
    for (const cell of instance.cells) {
      let target = 0;
      for (const surge of instance.surges) {
        const fade = Math.min(1, Math.max(0, (surge.end + 3 - surge.at) / 3));
        const distance = (cell.along - surge.at) / 1.6;
        target = Math.max(target, surge.peak * fade * Math.exp(-distance * distance));
      }
      target *= between(.75, 1);
      const level = cell.level + (target - cell.level) * (target > cell.level ? .5 : .08);
      if (Math.abs(level - cell.level) < .002 && level < .004) continue;
      cell.level = level;
      cell.circle.style.fill = `rgb(${green.map((value, index) => Math.round(value + (yellow[index] - value) * level)).join(' ')})`;
    }
  }

  function tick(now) {
    if (document.hidden || motion.matches) { frame = 0; return; }
    // The original animation runs at 60fps; 30fps keeps this small mark light.
    if (now - last < 1000 / 30 - 1) { frame = requestAnimationFrame(tick); return; }
    const elapsed = Math.min((now - last) / 1000, .1);
    last = now;
    let active = false;
    for (const instance of instances) {
      if (!visible(instance)) continue;
      active = true;
      animate(instance, elapsed);
    }
    frame = active ? requestAnimationFrame(tick) : 0;
  }

  async function mount(root) {
    const images = [...root.querySelectorAll('img.project-brand-mark[src="assets/ev-story/roadmark-ev.svg"]')].filter(image => !pending.has(image));
    if (!images.length) return;
    images.forEach(image => pending.add(image));
    // Keep the existing SVG image as the fallback if the artwork cannot load.
    artwork ||= fetch('assets/ev-story/roadmark-ev.svg').then(response => {
      if (!response.ok) throw new Error('Roadmark artwork unavailable');
      return response.text();
    }).then(source => new DOMParser().parseFromString(source, 'image/svg+xml').documentElement).catch(() => null);
    const template = await artwork;
    if (!template || template.localName !== 'svg') return;
    for (const image of images) {
      if (!image.isConnected) continue;
      const svg = document.importNode(template, true);
      svg.setAttribute('class', image.className.baseVal || image.className);
      svg.classList.add('roadmark-logo');
      svg.setAttribute('focusable', 'false');
      svg.setAttribute('aria-label', image.alt);
      const [sphere, charge] = svg.children;
      const land = [...sphere.children];
      if (land.length !== globe.length) continue;
      const cells = [...charge.children].map(circle => ({ circle, along: Number(circle.dataset.along), x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')), level: 0 }));
      image.replaceWith(svg);
      instances.add({ svg, land, cells, visible: false, turn: 0, surges: [], wait: between(.4, 1.6) });
      observer.observe(svg);
    }
    refresh();
  }

  motion.addEventListener('change', refresh);
  document.addEventListener('visibilitychange', refresh);
  const stateObserver = new MutationObserver(refresh);
  stateObserver.observe(document.body, { attributes: true, attributeFilter: ['data-level'] });
  // The image viewer temporarily makes these roots inert without changing level.
  document.querySelectorAll('#page, #sub').forEach(root => {
    stateObserver.observe(root, { attributes: true, attributeFilter: ['inert'] });
  });
  window.RoadmarkLogo = { mount };
})();
