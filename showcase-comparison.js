/* Readable before/after motion, active only for the visible project. */
(() => {
  const states = new Map();
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const focusDelay = 1000;
  const duration = 8000;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    const state = states.get(entry.target);
    if (!state) return;
    const visible = entry.isIntersecting && entry.intersectionRatio >= .2;
    if (state.visible !== visible) { state.visible = visible; state.sync(); }
  }), { threshold: [0, .2] });

  function mount(scope) {
    scope.querySelectorAll('[data-showcase-comparison]').forEach(el => {
      if (states.has(el)) return;
      const pause = el.querySelector('[data-comparison-pause]');
      const cards = el.querySelector('.rewards-comparison__cards');
      const state = { el, phase: 'before', active: false, visible: false, ready: false, paused: false, reading: false, focused: false, revealPending: true, timer: 0 };
      state.sync = () => {
        clearTimeout(state.timer); state.timer = 0;
        if (pause) {
          pause.hidden = reduce.matches;
          pause.setAttribute('aria-label', state.paused ? 'Play comparison animation' : 'Pause comparison animation');
          pause.querySelector('span').textContent = state.paused ? 'Play' : 'Pause';
          pause.dataset.paused = String(state.paused);
        }
        el.dataset.playing = String(state.active && state.visible && state.ready && !state.paused && !state.focused && (!state.reading || state.revealPending) && !reduce.matches && !document.hidden);
        if (el.dataset.playing === 'true') state.timer = setTimeout(() => {
          state.revealPending = false;
          state.show(state.phase === 'before' ? 'after' : 'before');
          state.sync();
        }, state.revealPending ? focusDelay : duration);
      };
      state.show = phase => {
        state.phase = phase;
        el.dataset.phase = phase;
        el.querySelectorAll('[data-comparison-phase]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.comparisonPhase === phase)));
        el.querySelectorAll('[data-comparison-copy]').forEach(copy => { copy.hidden = copy.dataset.comparisonCopy !== phase; });
        el.querySelectorAll('[data-comparison-face]').forEach(face => {
          const inactive = face.dataset.comparisonFace !== phase;
          face.setAttribute('aria-hidden', String(inactive));
          face.inert = inactive;
          if (face.matches('[data-view]')) face.tabIndex = inactive ? -1 : 0;
        });
      };
      const select = event => {
        const button = event.target.closest('[data-comparison-phase], [data-comparison-pause]');
        if (!button) return;
        if (button.hasAttribute('data-comparison-phase')) {
          state.paused = true;
          state.revealPending = false;
          state.show(button.dataset.comparisonPhase);
        } else {
          state.paused = !state.paused;
          if (!state.paused) {
            if (state.phase === 'before') state.revealPending = true;
            el.dispatchEvent(new CustomEvent('project-play', { bubbles: true }));
          }
        }
        state.sync();
      };
      const enter = () => { state.reading = true; if (!state.revealPending) state.sync(); };
      const leave = () => { state.reading = false; if (!state.revealPending) state.sync(); };
      const focus = () => { state.focused = true; state.sync(); };
      const blur = event => { if (!cards.contains(event.relatedTarget)) { state.focused = false; state.sync(); } };
      el.addEventListener('click', select);
      cards.addEventListener('pointerenter', enter);
      cards.addEventListener('pointerleave', leave);
      cards.addEventListener('focusin', focus);
      cards.addEventListener('focusout', blur);
      state.destroy = () => {
        clearTimeout(state.timer);
        observer.unobserve(el);
        el.removeEventListener('click', select);
        cards.removeEventListener('pointerenter', enter);
        cards.removeEventListener('pointerleave', leave);
        cards.removeEventListener('focusin', focus);
        cards.removeEventListener('focusout', blur);
      };
      states.set(el, state);
      state.show('before');
      observer.observe(el);
      Promise.allSettled([...el.querySelectorAll('img')].map(img => img.decode())).then(() => {
        if (!states.has(el)) return;
        state.ready = [...el.querySelectorAll('img')].every(img => img.naturalWidth > 0);
        state.sync();
      });
      state.sync();
    });
  }
  function setActive(scope, active) {
    states.forEach(state => {
      if (scope.contains(state.el) && state.active !== active) {
        state.active = active;
        if (active && state.phase === 'before' && !state.paused) state.revealPending = true;
        state.sync();
      }
    });
  }
  function destroy(scope) {
    states.forEach((state, el) => { if (scope.contains(el)) { state.destroy(); states.delete(el); } });
  }
  document.addEventListener('visibilitychange', () => states.forEach(state => state.sync()));
  reduce.addEventListener('change', () => states.forEach(state => state.sync()));
  window.ShowcaseComparison = { mount, setActive, destroy };
})();
