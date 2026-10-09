import { useEffect, useLayoutEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/** One measured highlight follows the selected button, including wrapped rows. */
export function ChoiceGroup({ children, className, value, label }: {
  children: ReactNode; className: string; value: string | number; label: string;
}) {
  const groupRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const position = () => {
      const selected = group.querySelector<HTMLButtonElement>('button[aria-pressed="true"]');
      if (!selected) return;
      group.style.setProperty('--choice-x', `${selected.offsetLeft}px`);
      group.style.setProperty('--choice-y', `${selected.offsetTop}px`);
      group.style.setProperty('--choice-w', `${selected.offsetWidth}px`);
      group.style.setProperty('--choice-h', `${selected.offsetHeight}px`);
      group.dataset.measured = 'true';
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(group);
    group.querySelectorAll('button').forEach(button => observer.observe(button));
    return () => observer.disconnect();
  }, [value]);
  return <div ref={groupRef} className={`${className} motion-choices`} role="group" aria-label={label}>
    <span className="choice-indicator" aria-hidden="true" />{children}
  </div>;
}

/** Updates only its decorative span on animation frames, never the React tree. */
export function AnimatedNumber({ value }: { value: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const previous = useRef(0);
  const seen = useRef(false);
  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const finish = () => { cancelAnimationFrame(frame); span.textContent = String(value); previous.current = value; };
    const play = () => {
      if (reduced.matches) { finish(); return; }
      const startValue = previous.current;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 480, 1);
        const current = Math.round(startValue + (value - startValue) * (1 - (1 - progress) ** 3));
        span.textContent = String(current);
        previous.current = current;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { seen.current = true; play(); observer.disconnect(); }
    });
    if (seen.current || reduced.matches) play();
    else observer.observe(span);
    const onPreferenceChange = () => { if (reduced.matches) finish(); };
    reduced.addEventListener('change', onPreferenceChange);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); reduced.removeEventListener('change', onPreferenceChange); };
  }, [value]);
  return <><span ref={spanRef} className="animated-number" aria-hidden="true">{value}</span><span className="sr-only">{value}</span></>;
}

/** A brief, decorative burst on completion; no timers or ongoing animation. */
export function SuccessBurst() {
  return <span className="success-burst" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} style={{
    '--burst-x': `${Math.cos(index * Math.PI / 6) * (58 + index % 3 * 18)}px`,
    '--burst-y': `${Math.sin(index * Math.PI / 6) * 70 - 12}px`,
    '--burst-rotate': `${index * 67}deg`,
    '--burst-delay': `${index % 3 * 45}ms`,
  } as CSSProperties} />)}</span>;
}
