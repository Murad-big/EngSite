import { useState } from 'react';
import { FoxArt } from './FoxArt';
import type { CSSProperties, KeyboardEvent } from 'react';
import { ArrowRight, BookOpen, MessageCircle } from 'lucide-react';
import { programs } from '../data';
import type { Goal } from '../data';
import { ArrowLink, Reveal, SectionLabel } from './Shared';

export default function Programs({ onChoose, onQuiz }: { onChoose: (goal: Goal) => void; onQuiz: () => void }) {
  const [active, setActive] = useState(0);
  const program = programs[active];
  const scene = program.id === 'start' ? 'study' : program.id === 'work' ? 'laptop' : program.id === 'travel' ? 'travel' : 'conversation';
  const sceneLabel = scene === 'study' ? 'Лисёнок читает учебник английского' : scene === 'laptop' ? 'Лисёнок изучает английский за ноутбуком' : scene === 'travel' ? 'Лисёнок с билетом и чемоданом отправляется в путешествие' : 'Лисёнок в наушниках практикует разговорный английский';
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % programs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + programs.length) % programs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = programs.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`program-tab-${next}`)?.focus();
  };
  return <section id="programs" className="programs section container" aria-labelledby="programs-title">
    <Reveal><SectionLabel number="01">Ваши цели</SectionLabel></Reveal>
    <Reveal className="section-heading"><h2 id="programs-title">Один язык.<br /><em>Столько возможностей.</em></h2><p>Выберите то, ради чего<br className="desktop-break" /> хочется говорить.<br />Мы поможем найти свой маршрут.</p></Reveal>
    <Reveal>
      <div className="program-tabs" style={{ '--active-tab': active, '--tab-column': active % 2, '--tab-row': Math.floor(active / 2) } as CSSProperties} role="tablist" aria-label="Выберите цель обучения">{programs.map((item, index) => <button key={item.id} id={`program-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="program-panel" tabIndex={active === index ? 0 : -1} onKeyDown={event => onKeyDown(event, index)} onClick={() => setActive(index)}>{item.label}</button>)}</div>
      <div id="program-panel" className={`program-panel ${program.color}`} data-tilt role="tabpanel" aria-labelledby={`program-tab-${active}`} tabIndex={0}>
        <div className="program-content" key={program.id}><h3>{program.title}</h3><p>{program.description}</p><div className="program-skills"><span><MessageCircle aria-hidden="true" />{program.skills[0]}</span><span><BookOpen aria-hidden="true" />{program.skills[1]}</span></div><div className="program-actions"><ArrowLink href="#contact" variant="dark" onClick={() => onChoose(program.id)}>Это про меня</ArrowLink><a href={`#/programs/${program.id}`} className="text-link">Вся программа<ArrowRight size={18} /></a></div></div>
        <div className="program-media"><FoxArt key={program.id} scene={scene} className="program-fox" label={sceneLabel} /></div>
      </div>
      <div className="program-footer"><p>Не знаете, с чего начать?</p><button className="text-link" type="button" onClick={onQuiz}>Пройдём короткий тест<ArrowRight size={19} aria-hidden="true" /></button><span className="quiet-caption">Больше, чем просто язык</span></div>
    </Reveal>
  </section>;
}
