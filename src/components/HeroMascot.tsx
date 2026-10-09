import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FoxArt, foxImages } from './FoxArt';
import { useMascotJourney } from '../hooks/useMascotJourney';

export default function HeroMascot() {
  const [ready, setReady] = useState(false);
  const [greeting, setGreeting] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  useMascotJourney(rootRef, dropRef, ready);
  useEffect(() => {
    let active = true;
    const image = new Image();
    image.onload = () => { if (active) setReady(true); };
    image.src = foxImages.hello;
    if (image.complete && image.naturalWidth) setReady(true);
    return () => { active = false; image.onload = null; };
  }, []);

  return <><div className="hero-mascot" ref={rootRef} data-ready={ready}>
    <div className="mascot-scene">
      <div className="mascot-puddle" aria-hidden="true" />
      <div className="mascot-shadow" key={`shadow-${greeting}`} aria-hidden="true" />
      <div className="mascot-drop" key={`drop-${greeting}`} aria-hidden="true"><span /></div>
      <div className="mascot-ripple" key={`ripple-${greeting}`} aria-hidden="true" />
      <div className="mascot-melt" aria-hidden="true" />
      <button className="mascot-character" type="button" onClick={() => setGreeting(value => value + 1)} aria-label="Поздороваться с лисёнком ещё раз" title="Нажмите, чтобы поздороваться ещё раз">
        <span className="mascot-morph"><span className="mascot-arrival" key={greeting}><span className="mascot-idle"><span className="fox-look"><span className="fox-breathe"><FoxArt /></span></span></span></span></span>
      </button>
      <div className="mascot-greeting-wrap"><div className="mascot-greeting" key={`hello-${greeting}`} aria-hidden="true"><strong>{greeting ? 'Hi again!' : 'Hello, you!'}</strong><span>Пойдём учиться?</span></div></div>
      <span className="mascot-spark" key={`spark-${greeting}`} aria-hidden="true"><i /><i /><i /></span>
    </div>
    <p className="mascot-hint">Поздоровайтесь — а потом прокрутите страницу.</p>
  </div>{createPortal(<div className="mascot-journey" ref={dropRef} aria-hidden="true"><span /></div>, document.body)}</>;
}
