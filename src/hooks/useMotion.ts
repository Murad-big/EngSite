import { useEffect } from 'react';

/** One-shot entrances and one active card; no animation loop for the full page. */
export function useMotion(route = '/') {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let card: HTMLElement | null = null;
    let cardRect: DOMRect | null = null;
    let pointerFrame = 0;
    let pointerX = 0, pointerY = 0;
    const resetCard = () => {
      if (!card) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      card.removeAttribute('data-pointer-active');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card = null;
      cardRect = null;
      document.removeEventListener('pointermove', moveCard);
    };
    const drawCard = () => {
      pointerFrame = 0;
      if (!card || !cardRect) return;
      const clamp = (value: number) => Math.max(-1, Math.min(1, value));
      const x = clamp((pointerX - cardRect.left) / cardRect.width * 2 - 1);
      const y = clamp((pointerY - cardRect.top) / cardRect.height * 2 - 1);
      const angle = card.classList.contains('program-panel') ? 1.4 : 2.5;
      card.style.setProperty('--tilt-x', `${(-y * angle).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * angle).toFixed(2)}deg`);
    };
    function moveCard(event: PointerEvent) {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(drawCard);
    }
    const enterCard = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || reduced.matches || !precisePointer.matches) return;
      const next = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-tilt]') : null;
      if (next === card) return;
      resetCard();
      if (!next) return;
      card = next;
      // Cache the resting rectangle once; pointer frames only write transforms.
      cardRect = card.getBoundingClientRect();
      card.dataset.pointerActive = 'true';
      document.addEventListener('pointermove', moveCard, { passive: true });
      moveCard(event);
    };
    const leaveCard = (event: PointerEvent) => {
      if (card && (!(event.relatedTarget instanceof Node) || !card.contains(event.relatedTarget))) resetCard();
    };
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: .05 });
    const reveal = () => {
      if (reduced.matches) elements.forEach(element => element.classList.add('is-visible'));
      if (reduced.matches || !precisePointer.matches) resetCard();
    };
    elements.forEach(element => observer.observe(element));
    root.classList.add('motion-ready');
    reveal();

    // Pause the hero outside the viewport; other mascot scenes observe themselves.
    const hero = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.classList.toggle('is-in-view', entry.isIntersecting);
    });
    if (hero) heroObserver.observe(hero);
    const visibility = () => {
      root.classList.toggle('motion-paused', document.hidden);
      if (document.hidden) resetCard();
    };
    visibility();
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('pointerover', enterCard, { passive: true });
    document.addEventListener('pointerout', leaveCard, { passive: true });
    window.addEventListener('scroll', resetCard, { passive: true });
    window.addEventListener('resize', resetCard);
    reduced.addEventListener('change', reveal);
    precisePointer.addEventListener('change', reveal);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('pointerover', enterCard);
      document.removeEventListener('pointerout', leaveCard);
      window.removeEventListener('scroll', resetCard);
      window.removeEventListener('resize', resetCard);
      reduced.removeEventListener('change', reveal);
      precisePointer.removeEventListener('change', reveal);
      resetCard();
      root.classList.remove('motion-ready', 'motion-paused');
    };
  }, [route]);
}
