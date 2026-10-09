import { ArrowUp } from 'lucide-react';
import { programs } from '../data';

export default function Footer({ onQuiz }: { onQuiz: () => void }) {
  return <footer className="site-footer container">
    <div className="footer-links"><div className="footer-intro"><span>Английский, в котором<br />есть место <em>вам.</em></span><p>Ваш голос. Ваш ритм.<br />Ваше новое hello.</p></div><nav aria-label="Программы в подвале"><h2>Учиться</h2>{programs.map(program => <a key={program.id} href={`#/programs/${program.id}`}>{program.label}</a>)}<a href="#formats">Форматы и нагрузка</a></nav><nav aria-label="Практика и материалы"><h2>Пробовать</h2><a href="#/materials">Бесплатные материалы</a><a href="#/vocabulary">Словарный тренажёр</a><a href="#club">Темы для разговора</a><a href="#practice">Мини-практика</a><button onClick={onQuiz}>Тест с разбором</button></nav><nav aria-label="О школе"><h2>Знакомиться</h2><a href="#approach">Наш подход</a><a href="#teachers">Ваш преподаватель</a><a href="#faq">Вопросы и ответы</a><a href="#contact">Оставить заявку</a><a href="#/privacy">Данные и приватность</a></nav></div>
    <a className="footer-wordmark" href="#top" aria-label="EasyEnglish — вернуться наверх">easyEnglish<span className="footer-logo" aria-hidden="true" /></a>
    <div className="footer-bottom"><span>© 2026 EasyEnglish</span><span>Онлайн-школа английского</span><a href="#top">Наверх<ArrowUp size={17} aria-hidden="true" /></a></div>
  </footer>;
}
