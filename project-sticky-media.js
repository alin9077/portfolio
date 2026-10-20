/* Keep the same demo player in view as a compact, dismissible top-corner dock. */
(() => {
  let cleanup = () => {};
  function destroy() { cleanup(); cleanup = () => {}; }
  function mount({ root, hero, title = 'Project demo' }) {
    destroy();
    const media = hero.querySelector('.row__media:is(.is-demo, .is-film)');
    if (!media) return;
    let docked = false, dismissed = false, frame = 0;
    // Preserve the media's responsive layout without copying a player or its IDs.
    const placeholder = document.createElement('div');
    placeholder.className = `${media.className} project-media-placeholder`;
    placeholder.inert = true;
    placeholder.setAttribute('aria-hidden', 'true');
    const dock = document.createElement('aside');
    dock.className = 'project-media-dock';
    dock.hidden = true;
    dock.setAttribute('aria-label', `${title} — floating demo`);
    dock.innerHTML = '<div class="project-media-dock__bar"><span></span><button type="button" data-expand aria-label="Return to full demo">↗</button><button type="button" data-dismiss aria-label="Hide floating demo">×</button></div><div class="project-media-dock__player"></div>';
    dock.querySelector('span').textContent = title;
    root.append(dock);
    const player = dock.querySelector('.project-media-dock__player');
    const relocated = () => root.dispatchEvent(new Event('project-media-relocated'));
    function restore() {
      if (!docked) return;
      const returnFocus = dock.contains(document.activeElement);
      placeholder.replaceWith(media);
      hero.classList.remove('has-docked-media');
      dock.hidden = true;
      docked = false;
      relocated();
      if (returnFocus) media.querySelector('[tabindex], button')?.focus({ preventScroll: true });
    }
    function update() {
      frame = 0;
      if (dismissed || root.getAttribute('aria-hidden') === 'true') return;
      const passed = hero.getBoundingClientRect().bottom < 72;
      if (passed && !docked) {
        hero.classList.add('has-docked-media');
        dock.hidden = false;
        media.replaceWith(placeholder);
        player.append(media);
        docked = true;
        relocated();
      } else if (!passed && docked) restore();
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    dock.querySelector('[data-expand]').addEventListener('click', () => {
      const top = root.scrollTop + hero.getBoundingClientRect().top - 64;
      root.scrollTo({ top: Math.max(0, top), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
    dock.querySelector('[data-dismiss]').addEventListener('click', () => {
      dismissed = true;
      restore();
      document.getElementById('back')?.focus({ preventScroll: true });
    });
    root.addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    cleanup = () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      restore();
      dock.remove();
    };
    schedule();
  }
  window.ProjectStickyMedia = { mount, destroy };
})();
