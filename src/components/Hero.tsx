import { ArrowDown } from 'lucide-react';
import { ArrowLink } from './Shared';
import HeroMascot from './HeroMascot';

export default function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-layout container">
      <div className="hero-copy">
        <h1 id="hero-title" className="hero-title">
          <span className="line"><span>Английский.</span></span>
          <span className="line"><span>Легко быть</span></span>
          <span className="line line-centered"><span><em>собой.</em></span></span>
        </h1>
        <div className="hero-intro"><p>Для работы, путешествий и разговоров, которые давно хотелось начать.</p><ArrowLink href="#programs">Найти свой английский</ArrowLink></div>
      </div>
      <HeroMascot />
    </div>
    <div className="hero-caption container"><p>Ваш голос. Ваш ритм. Ваш английский.</p><a href="#programs" className="scroll-link" aria-label="Перейти к программам"><ArrowDown strokeWidth={1.5} aria-hidden="true" /></a></div>
  </section>;
}
