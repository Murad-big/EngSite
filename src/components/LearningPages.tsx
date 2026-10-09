import { useEffect, useState } from 'react';
import { SuccessBurst } from './Motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, CheckCircle2, Download, RotateCcw } from 'lucide-react';
import { MaterialCards } from './MaterialCards';
import { programs, type Goal } from '../data';
import { courseDetails, materials, vocabulary } from '../learning';
import { ArrowLink } from './Shared';

export function CoursePage({ id, onChoose }: { id: Goal; onChoose: (goal: Goal) => void }) {
  const program = programs.find(item => item.id === id)!;
  const detail = courseDetails[id];
  return <article className="inner-page container">
    <a className="back-link" href="#programs"><ArrowLeft size={18} />Все программы</a>
    <div className={`course-hero ${program.color}`}><div><span className="small-label">{id === 'start' ? 'Английский с самого начала' : `Английский ${program.label.toLowerCase()}`}</span><h1>{program.title}</h1><p>{program.description}</p><div className="pill-row"><span>{detail.level}</span><span>{detail.pace}</span><span>Онлайн</span></div><ArrowLink href="#contact" onClick={() => onChoose(id)}>Подобрать занятия</ArrowLink></div><div className="course-mascot"><FoxArt key={id} scene={id === 'start' ? 'study' : id === 'work' ? 'laptop' : id === 'travel' ? 'travel' : 'conversation'} label={id === 'travel' ? 'Лисёнок с билетом и чемоданом отправляется в путешествие' : 'Лисёнок изучает английский'} /></div></div>
    <div className="course-body">
      <div className="course-body-heading"><div><h2>Что будет <em>в программе.</em></h2><p>Темы и сложность можно адаптировать под ваши задачи.</p></div><div className="course-outcome"><CheckCircle2 size={22} /><p>{detail.outcome}</p></div></div>
      <div className="curriculum">{detail.modules.map((module, i) => <details key={module.title} open={i === 0}><summary><span>0{i + 1}</span><h3>{module.title}</h3><span className="details-plus">+</span></summary><div className="curriculum-copy"><p>{module.text}</p><div className="curriculum-task"><strong>Попробуйте на практике</strong><p>{module.task}</p></div></div></details>)}</div>
    </div>
    <div className="inner-cta"><div><h2>Сначала — <em>попробовать.</em></h2><p>Бесплатная практика поможет почувствовать формат.</p></div><ArrowLink href="#practice" variant="dark">Начать разминку</ArrowLink></div>
  </article>;
}


export function LibraryPage({ onQuiz }: { onQuiz: () => void }) {
  return <section className="inner-page container"><a href="#resources" className="back-link"><ArrowLeft size={18} />На главную</a><div className="page-intro"><h1>Немного английского.<br /><em>Много нового.</em></h1><p>Читайте, пробуйте, возвращайтесь.<br />Все материалы открыты без регистрации.</p></div><div className="library-shortcuts"><a href="#/vocabulary"><BookOpen size={25} /><span><strong>Слова в кармане</strong><small>12 выражений · карточки и повторение</small></span><ArrowUpRight /></a><button onClick={onQuiz}><CheckCircle2 size={25} /><span><strong>Проверьте себя</strong><small>12 вопросов · ответы с объяснениями</small></span><ArrowUpRight /></button></div><MaterialCards /></section>;
}

function downloadMaterial(item: typeof materials[number]) {
  const text = `${item.title}\nEasyEnglish · Бесплатные материалы\n\n${item.sections.map(section => `${section.title}\n${section.text}\n${section.examples?.join('\n') ?? ''}`).join('\n\n')}\n\nПопробуйте сами\n${item.exercise.prompt}\n\nРазбор\n${item.exercise.answer}`;
  const url = URL.createObjectURL(new Blob(['\uFEFF', text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = `easyenglish-${item.id}.txt`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ArticlePage({ id }: { id: string }) {
  const item = materials.find(material => material.id === id);
  const [showAnswer, setShowAnswer] = useState(false);
  if (!item) return <NotFound />;
  return <article className="inner-page container article-page"><a href="#/materials" className="back-link"><ArrowLeft size={18} />Все материалы</a><div className="article-layout"><aside className={`article-art ${item.color}`}><span>{item.mark}</span><p>{item.category} / {item.time}</p></aside><div className="article-copy"><h1>{item.title}</h1><p className="article-lead">{item.description}</p>{item.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p>{section.examples && <ul className="example-list">{section.examples.map(example => <li key={example}>{example}</li>)}</ul>}</section>)}<section className="article-exercise"><span className="small-label">Теперь ваша очередь</span><h2>Попробуйте сами</h2><p>{item.exercise.prompt}</p><button className="text-link" aria-expanded={showAnswer} aria-controls="exercise-answer" onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? 'Скрыть разбор' : 'Посмотреть разбор'}<ArrowRight size={18} /></button>{showAnswer && <p id="exercise-answer" className="exercise-answer">{item.exercise.answer}</p>}</section><button className="button button-outline" onClick={() => downloadMaterial(item)}>Скачать памятку<Download size={20} /></button><a className="article-next text-link" href={`#/materials/${materials[(materials.indexOf(item) + 1) % materials.length].id}`}>Следующий материал<ArrowRight size={18} /></a></div></div></article>;
}

const VOCAB_KEY = 'easyenglish:vocabulary:v1';
function readKnown(): number[] {
  try { const value: unknown = JSON.parse(localStorage.getItem(VOCAB_KEY) ?? '[]'); return Array.isArray(value) ? [...new Set(value.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < vocabulary.length))] : []; } catch { return []; }
}

export function VocabularyPage() {
  const [known, setKnown] = useState(readKnown);
  const [queue, setQueue] = useState(() => vocabulary.map((_, i) => i).filter(i => !readKnown().includes(i)));
  const [flipped, setFlipped] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => { try { localStorage.setItem(VOCAB_KEY, JSON.stringify(known)); } catch { setStorageError(true); } }, [known]);
  const item = vocabulary[queue[0]];
  const answer = (remembered: boolean) => {
    if (remembered) { setKnown(old => [...new Set([...old, queue[0]])]); setQueue(queue.slice(1)); }
    else setQueue([...queue.slice(1), queue[0]]);
    setFlipped(false);
  };
  const restart = () => { setKnown([]); setQueue(vocabulary.map((_, i) => i)); setFlipped(false); };
  return <section className="inner-page container vocab-page"><a href="#/materials" className="back-link"><ArrowLeft size={18} />Бесплатные материалы</a><div className="page-intro"><h1>Слова <em>в кармане.</em></h1><p>Попробуйте вспомнить перевод.<br />Переверните карточку и проверьте себя.</p></div><div className="vocab-wrap"><div className="vocab-status"><span>Знакомых выражений: {known.length} из {vocabulary.length}</span><button className="text-link" onClick={restart} aria-label="Сбросить прогресс словаря"><RotateCcw size={16} />Заново</button></div><progress max={vocabulary.length} value={known.length} aria-label="Прогресс изучения слов" />{item ? <><button className={`flashcard ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped(!flipped)} aria-label={flipped ? 'Показать английское выражение' : 'Показать перевод'}><span className="flashcard-stage" key={queue[0]}><span className="flashcard-rotor"><span className="flashcard-face flashcard-front" aria-hidden={flipped}><span className="small-label">Как это сказать по-русски?</span><strong lang="en">{item[0]}</strong><span className="flashcard-example">Нажмите, чтобы перевернуть ↻</span></span><span className="flashcard-face flashcard-back" aria-hidden={!flipped}><span className="small-label">Проверьте себя</span><strong lang="ru">{item[1]}</strong><span className="flashcard-example" lang="en">{item[2]}</span></span></span></span></button><div className="flashcard-actions"><button disabled={!flipped} className="button button-outline" onClick={() => answer(false)}>Ещё повторю<RotateCcw size={18} /></button><button disabled={!flipped} className="button button-purple" onClick={() => answer(true)}>Уже знаю<Check size={20} /></button></div></> : <div className="vocab-complete" role="status"><SuccessBurst /><CheckCircle2 size={48} /><h2>Все 12 — <em>ваши.</em></h2><p>Теперь придумайте короткую историю с тремя выражениями. Вернитесь завтра и попробуйте вспомнить их снова.</p><button className="button button-purple" onClick={restart}>Повторить все<RotateCcw size={18} /></button></div>}<p className="vocab-note">{storageError ? 'Хранилище браузера недоступно. Прогресс сохранится только до закрытия страницы.' : 'Прогресс сохраняется на этом устройстве. Регистрация не нужна.'}</p></div></section>;
}

export function PrivacyPage() {
  return <article className="inner-page container privacy-page"><a href="#top" className="back-link"><ArrowLeft size={18} />На главную</a><h1>Ваши данные<br /><em>на этом сайте.</em></h1><section><h2>Что сохраняет эта версия</h2><p>В демонстрационном режиме данные формы (имя, контакт, цель и пожелания) хранятся только в localStorage вашего браузера. Словарный тренажёр отдельно сохраняет номера отмеченных карточек. Аналитика и рекламные cookies не используются.</p></section><section><h2>Как удалить данные</h2><p>После сохранения формы нажмите «Удалить и заполнить заново». В словарном тренажёре нажмите «Заново», чтобы очистить отметки. Можно также удалить данные сайта в настройках браузера.</p></section><section><h2>Если подключена отправка</h2><p>Когда для сайта настроен сервис приёма заявок, форма отдельно сообщает об отправке. Контактные данные передаются этому сервису только после нажатия кнопки отправки и согласия пользователя. При ошибке сайт не показывает успешную отправку.</p></section><section><h2>О материалах</h2><p>Короткий тест служит разминкой и не заменяет оценку навыков преподавателем. Фотографии иллюстрируют процесс обучения и не являются профилями сотрудников. Учебные сценарии не являются отзывами студентов.</p></section></article>;
}

export function NotFound() {
  return <section className="inner-page container not-found"><span className="small-label">404 / Немного заблудились</span><h1>Let’s find<br /><em>another way.</em></h1><p>Такой страницы нет. Все программы и материалы доступны с главной.</p><ArrowLink href="#top">На главную</ArrowLink></section>;
}
import { FoxArt } from './FoxArt';
