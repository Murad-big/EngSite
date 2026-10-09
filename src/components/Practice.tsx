import { useRef, useState } from 'react';
import { ArrowRight, Check, Coffee, RotateCcw, Smile, Sparkles, X } from 'lucide-react';
import { practiceQuestions } from '../data';
import { SuccessBurst } from './Motion';
import { Reveal, SectionLabel } from './Shared';

export default function Practice({ onQuiz }: { onQuiz: () => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [complete, setComplete] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const question = practiceQuestions[step];
  const next = () => {
    if (step === practiceQuestions.length - 1) setComplete(true);
    else setStep(step + 1);
    setSelected(null);
    setChecked(false);
    requestAnimationFrame(() => titleRef.current?.focus({ preventScroll: true }));
  };
  const restart = () => {
    setStep(0); setSelected(null); setChecked(false); setComplete(false);
    requestAnimationFrame(() => titleRef.current?.focus({ preventScroll: true }));
  };

  return <section id="practice" className="practice" aria-labelledby="practice-title">
    <div className="practice-inner container">
      <Reveal className="practice-intro">
        <SectionLabel number="03">Попробуйте сами</SectionLabel>
        <h2 id="practice-title">Уже немного<br /><em>говорите.</em></h2>
        <p>Попробуйте прямо сейчас. Всего одна фраза — и вы уже на шаг ближе к свободному английскому.</p>
        <div className="practice-signature"><Smile strokeWidth={1} aria-hidden="true" /><span>It’s okay to<br />make mistakes.</span></div>
      </Reveal>
      <Reveal className="practice-card" delay={100}>
        {complete ? <div className="practice-complete" key="complete"><SuccessBurst />
          <Sparkles className="completion-icon" size={42} strokeWidth={1.4} aria-hidden="true" />
          <span className="small-label">Первый шаг сделан</span>
          <h3 ref={titleRef} tabIndex={-1}>Видите?<br /><em>Уже получается.</em></h3>
          <p>Три ситуации, три полезные фразы. Сохраните этот настрой — дальше будет ещё интереснее.</p>
          <button className="button button-purple" onClick={onQuiz}>Попробовать тест<ArrowRight size={22} aria-hidden="true" /></button>
          <button className="practice-restart text-link" onClick={restart}><RotateCcw size={16} aria-hidden="true" />Ещё раз</button>
        </div> : <div className="practice-question" key={question.title}>
          <div className="practice-card-top"><span>0{step + 1} <span className="muted">/ 03 · {question.situation}</span></span><Coffee size={27} strokeWidth={1.3} aria-hidden="true" /></div>
          <div className="practice-progress" aria-hidden="true">{practiceQuestions.map((_, index) => <span className={index <= step ? 'filled' : ''} key={index} />)}</div>
          <h3 ref={titleRef} tabIndex={-1}>{question.title}</h3>
          <p className="question-prompt">{question.prompt}</p>
          <fieldset className="answer-options" disabled={checked}>
            <legend className="sr-only">Выберите ответ</legend>
            {question.options.map((option, index) => <label key={option} className={`answer-option ${checked && index === question.correct ? 'answer-correct' : ''} ${checked && selected === index && index !== question.correct ? 'answer-incorrect' : ''}`}>
              <input type="radio" name="practice-answer" value={index} checked={selected === index} onChange={() => setSelected(index)} />
              <span className="answer-letter" aria-hidden="true">{checked && index === question.correct ? <Check size={17} /> : checked && selected === index ? <X size={17} /> : String.fromCharCode(65 + index)}</span>
              <span lang="en">{option}</span>
            </label>)}
          </fieldset>
          {checked ? <div className="answer-feedback" role="status"><strong>{selected === question.correct ? 'Exactly! Всё верно.' : 'Почти! Давайте разберёмся.'}</strong><p>{question.explanation}</p></div> : null}
          <button type="button" className="button button-purple practice-action" disabled={selected === null} onClick={checked ? next : () => setChecked(true)}>{checked ? step === 2 ? 'Готово!' : 'Следующая ситуация' : 'Проверить ответ'}<ArrowRight size={21} aria-hidden="true" /></button>
        </div>}
      </Reveal>
    </div>
  </section>;
}
