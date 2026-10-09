import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, RotateCcw, Sparkles, X } from 'lucide-react';
import { levelQuestions } from '../data';
import { AnimatedNumber, SuccessBurst } from './Motion';

export default function LevelQuiz({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selection, setSelection] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const finished = step === levelQuestions.length;
  const question = levelQuestions[step];
  const score = answers.reduce((total, answer, index) => total + Number(answer === levelQuestions[index].correct), 0);

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => { dialog?.close(); opener?.focus({ preventScroll: true }); };
  }, []);

  const next = () => {
    if (selection === null) return;
    setAnswers(previous => { const updated = [...previous]; updated[step] = selection; return updated; });
    setStep(step + 1); setSelection(answers[step + 1] ?? null);
    requestAnimationFrame(() => headingRef.current?.focus());
  };
  const restart = () => {
    setAnswers([]); setSelection(null); setStep(0);
    requestAnimationFrame(() => headingRef.current?.focus());
  };
  return <dialog ref={dialogRef} className="quiz-dialog" aria-labelledby="quiz-title" onCancel={onClose} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) onClose();
  }}>
    <div className="quiz-shell">
      <div className="quiz-top"><span>Easy check <Sparkles size={15} aria-hidden="true" /></span><button className="icon-button" type="button" onClick={onClose} aria-label="Закрыть тест"><X size={23} /></button></div>
      {finished ? <div className="quiz-result" key="result"><SuccessBurst />
        <span className="quiz-score"><AnimatedNumber value={score} /><span> / {levelQuestions.length}</span></span>
        <h2 id="quiz-title" ref={headingRef} tabIndex={-1}>{score >= 9 ? 'Хорошее начало.' : 'Теперь есть ориентир.'}</h2>
        <p>{score >= 9 ? 'Вы уверенно справились с этими вопросами. Попробуйте больше разговорной практики.' : 'Каждый ответ помогает понять, что стоит повторить. Начните с разбора ответов и небольших разговоров.'} Этот тест не оценивает устную речь и аудирование и не определяет уровень CEFR.</p>
        <div className="quiz-review">{levelQuestions.map((item, index) => <div key={item.question}><span className={answers[index] === item.correct ? 'review-correct' : 'review-wrong'}>{answers[index] === item.correct ? <Check size={16} /> : <X size={16} />}</span><p><strong lang="en">{item.question.replace('___', item.options[item.correct])}</strong><span>{item.explanation}</span></p></div>)}</div>
        <a href="#contact" className="button button-purple" onClick={onClose}>Найти свой маршрут<ArrowRight size={21} aria-hidden="true" /></a>
        <button className="text-link quiz-restart" type="button" onClick={restart}><RotateCcw size={16} aria-hidden="true" />Пройти ещё раз</button>
      </div> : <div className="quiz-question" key={step}>
        <div className="quiz-step"><span>Вопрос {step + 1} из {levelQuestions.length}</span><span>Без спешки :)</span></div>
        <div className="quiz-progress" aria-hidden="true"><span style={{ width: `${(step + 1) / levelQuestions.length * 100}%` }} /></div>
        <h2 id="quiz-title" ref={headingRef} tabIndex={-1} lang="en">{question.question}</h2>
        <p className="quiz-instruction">Выберите слово, которое подходит по смыслу.</p>
        <fieldset className="answer-options"><legend className="sr-only">Выберите слово</legend>{question.options.map((option, index) => <label className="answer-option" key={option}><input type="radio" name="quiz-answer" checked={selection === index} value={index} onChange={() => setSelection(index)} /><span className="answer-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span><span lang="en">{option}</span></label>)}</fieldset>
        <button className="button button-purple" disabled={selection === null} onClick={next}>{step === levelQuestions.length - 1 ? 'Посмотреть результат' : 'Дальше'}<ArrowRight size={21} aria-hidden="true" /></button>
        {step > 0 && <button className="text-link quiz-back" onClick={() => {
          if (selection !== null) setAnswers(previous => { const updated = [...previous]; updated[step] = selection; return updated; });
          setStep(step - 1); setSelection(answers[step - 1]);
          requestAnimationFrame(() => headingRef.current?.focus());
        }}>К предыдущему вопросу</button>}
        <p className="quiz-disclaimer">Небольшая разминка, а не официальный экзамен.</p>
      </div>}
    </div>
  </dialog>;
}
