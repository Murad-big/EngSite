import { useEffect, useRef, type CSSProperties } from 'react';

export const foxImages = {
  hello: '/images/hello-fox.webp',
  study: '/images/fox-reading.webp',
  laptop: '/images/fox-laptop.webp',
  conversation: '/images/fox-conversation.webp',
  travel: '/images/fox-travel.webp',
  mentor: '/images/fox-mentor.webp',
};

type FoxScene = keyof typeof foxImages;

function SceneDetails({ scene }: { scene: FoxScene }) {
  if (scene === 'travel') return <span className="fox-travel-plane fox-scene-motion fox-scene-decor" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><path d="m5 18 30-12-11 29-5-13-14-4Z" fill="#f7f6f2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m19 22 16-16" stroke="currentColor" strokeWidth="2" /></svg></span>;
  if (scene === 'conversation') return <span className="fox-scene-decor" aria-hidden="true"><span className="fox-life-bubble fox-life-hello fox-scene-motion" lang="en">Hello!</span><span className="fox-life-bubble fox-life-reply fox-scene-motion" lang="en">Hi!</span></span>;
  if (scene === 'laptop') return <span className="fox-scene-decor" aria-hidden="true"><span className="fox-work-typing"><i className="fox-scene-motion" /><i className="fox-scene-motion" /><i className="fox-scene-motion" /></span><span className="fox-work-mail fox-scene-motion"><svg viewBox="0 0 48 40" fill="none"><rect x="3" y="8" width="34" height="25" rx="5" fill="#f7f6f2" stroke="currentColor" strokeWidth="2" /><path d="m5 11 15 12 15-12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="36" cy="10" r="9" fill="#dce9b7" /><path d="m32 10 3 3 5-6" stroke="#465d35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span></span>;
  if (scene === 'study') return <span className="fox-scene-decor" aria-hidden="true"><span className="fox-study-letters" lang="en">{['A', 'B', 'C'].map(letter => <span key={letter} className="fox-study-letter fox-scene-motion">{letter}</span>)}</span><span className="fox-study-star fox-scene-motion"><svg viewBox="0 0 32 32" fill="none"><path d="m16 3 3.5 9.5L29 16l-9.5 3.5L16 29l-3.5-9.5L3 16l9.5-3.5L16 3Z" fill="#dce9b7" stroke="#718644" strokeWidth="1.5" /></svg></span></span>;
  if (scene === 'mentor') return <span className="fox-scene-decor" aria-hidden="true"><span className="fox-mentor-wave fox-scene-motion"><svg viewBox="0 0 40 50" fill="none"><path d="M28 18q-8 7 0 14M20 10q-16 15 0 30M12 3q-23 22 0 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg></span><span className="fox-mentor-equalizer"><i className="fox-scene-motion" /><i className="fox-scene-motion" /><i className="fox-scene-motion" /><i className="fox-scene-motion" /></span></span>;
  return null;
}

export function FoxArt({ scene = 'hello', className = '', label }: {
  scene?: FoxScene; className?: string; label?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const art = ref.current;
    if (scene === 'hello' || !art) return;
    const observer = new IntersectionObserver(([entry]) => art.classList.toggle('is-in-view', entry.isIntersecting && entry.intersectionRatio >= .15), { threshold: .15 });
    observer.observe(art);
    return () => observer.disconnect();
  }, [scene]);
  return <span ref={ref} className={`fox-art ${className}`} data-scene={scene} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} style={{ '--fox-art': `url("${foxImages[scene]}")` } as CSSProperties}>
    {scene !== 'hello' && <><span className={`fox-scene-character fox-${scene}-character fox-scene-motion`} aria-hidden="true" /><SceneDetails scene={scene} /></>}
  </span>;
}
