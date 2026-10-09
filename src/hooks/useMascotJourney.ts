import { useEffect, type RefObject } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

export function useMascotJourney(rootRef: RefObject<HTMLDivElement | null>, dropRef: RefObject<HTMLDivElement | null>, ready: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    const drop = dropRef.current;
    const header = document.querySelector<HTMLElement>('.site-header');
    const target = header?.querySelector<HTMLElement>('.brand-mascot');
    const character = root?.querySelector<HTMLButtonElement>('.mascot-character');
    if (!ready || !root || !drop || !header || !target || !character) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let sourceX = 0, landingY = 0, targetX = 0, targetY = 0, headerBottom = 0, viewportHeight = 0;
    let start = 0, distance = 240, progress = 0, lastProgress = -1;
    let lastFrame = performance.now();
    let geometryChanged = true;
    let active = true;
    let dockState: boolean | null = null;
    const values = new Map<string, string>();
    const set = (name: string, value: number) => {
      const text = String(value);
      if (values.get(name) === text) return;
      root.style.setProperty(name, text);
      values.set(name, text);
    };
    // Read layout only on mount/resize, before any animation writes.
    const measure = () => {
      const rect = character.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      sourceX = rect.left + rect.width / 2;
      landingY = rect.bottom + window.scrollY - 12;
      targetX = to.left + to.width / 2;
      targetY = to.top + to.height / 2;
      headerBottom = header.getBoundingClientRect().bottom;
      viewportHeight = window.innerHeight;
      start = Math.max(48, landingY - viewportHeight * .62);
      distance = Math.min(310, Math.max(210, root.offsetHeight * .65));
      geometryChanged = true;
    };
    const desiredProgress = () => clamp((window.scrollY - start) / distance);
    const update = (now: number) => {
      frame = 0;
      const desired = desiredProgress();
      const step = Math.min(64, now - lastFrame) / 600;
      lastFrame = now;
      progress = reduced.matches ? desired : progress + Math.max(-step, Math.min(step, desired - progress));
      if (progress !== lastProgress || geometryChanged) {
        lastProgress = progress;
        geometryChanged = false;
        const melt = reduced.matches ? Number(progress >= .6) : smooth((progress - .04) / .3);
        const docked = progress >= (reduced.matches ? .6 : .91);
        const foxOpacity = reduced.matches ? 1 - melt : 1 - smooth((progress - .17) / .16);
        set('--fox-squash-x', 1 + melt * .45);
        set('--fox-squash-y', 1 - melt * .91);
        set('--fox-opacity', foxOpacity);
        set('--greeting-opacity', 1 - smooth(progress / .15));
        set('--melt-opacity', smooth((progress - .08) / .18) * (1 - smooth((progress - .4) / .18)));
        const journey = String(progress > .01);
        if (root.dataset.journey !== journey) root.dataset.journey = journey;
        if (dockState !== docked) {
          dockState = docked;
          root.dataset.docked = String(docked);
          header.dataset.mascotDocked = String(docked);
          root.setAttribute('aria-hidden', String(docked));
        }
        if (character.disabled !== (foxOpacity === 0)) character.disabled = foxOpacity === 0;

        const opacity = reduced.matches ? 0 : smooth((progress - .33) / .07) * (1 - smooth((progress - .84) / .08));
        const opacityText = String(opacity);
        if (drop.style.opacity !== opacityText) drop.style.opacity = opacityText;
        if (opacity > 0) {
          const t = smooth((progress - .34) / .55);
          const arc = Math.sin(Math.PI * t);
          const sourceY = Math.max(headerBottom + 48, Math.min(viewportHeight * .85, landingY - window.scrollY));
          const x = sourceX + (targetX - sourceX) * t;
          const y = sourceY + (targetY - sourceY) * t - arc * Math.min(140, Math.abs(sourceY - targetY) * .4);
          drop.style.transform = 'translate3d(' + (x - 20) + 'px,' + (y - 28) + 'px,0) rotate(' + (-28 * arc) + 'deg) scale(' + (1 - t * .4) + ',' + (1 + arc * .18 - t * .4) + ')';
        }
      }
      if (Math.abs(desired - progress) > .001 && !document.hidden) frame = requestAnimationFrame(update);
    };
    const schedule = () => {
      // No frames or DOM writes while scrolling the rest of the page.
      if (!frame && !document.hidden && (geometryChanged || desiredProgress() !== progress)) frame = requestAnimationFrame(update);
    };
    const resize = () => { measure(); schedule(); };
    const preference = () => { lastProgress = -1; geometryChanged = true; schedule(); };
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else { lastFrame = performance.now(); schedule(); }
    };
    measure();
    progress = desiredProgress();
    update(performance.now());
    void document.fonts.ready.then(() => { if (active) { measure(); schedule(); } });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', preference);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
      reduced.removeEventListener('change', preference);
      header.removeAttribute('data-mascot-docked');
    };
  }, [ready, rootRef, dropRef]);
}
