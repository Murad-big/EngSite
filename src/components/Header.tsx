import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { ArrowLink, Brand } from './Shared';
import { programs } from '../data';

const links = [{ href: '#programs', label: 'Программы' }, { href: '#club', label: 'Разговорная практика' }, { href: '#formats', label: 'Форматы' }, { href: '#/materials', label: 'Бесплатное' }];

export default function Header({ onQuiz, home }: { onQuiz: () => void; home: boolean }) {
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: PointerEvent) => { if (!coursesRef.current?.contains(event.target as Node)) setCoursesOpen(false); };
    const navigate = () => { setOpen(false); setCoursesOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && coursesOpen) { setCoursesOpen(false); coursesRef.current?.querySelector('button')?.focus(); } };
    document.addEventListener('pointerdown', close);
    window.addEventListener('hashchange', navigate);
    window.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', close); window.removeEventListener('hashchange', navigate); window.removeEventListener('keydown', escape); };
  }, [coursesOpen]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); menuButtonRef.current?.focus(); } };
    const resize = () => { if (window.innerWidth > 900) setOpen(false); };
    window.addEventListener('keydown', close);
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize); };
  }, [open]);
  return <header className={`site-header ${open ? 'menu-open' : ''}`} data-home={home}>
    <div className="header-inner container">
      <Brand />
      <nav aria-label="Основная навигация" className="desktop-nav"><div className="nav-disclosure" ref={coursesRef} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setCoursesOpen(false); }}><button aria-expanded={coursesOpen} aria-controls="course-navigation" onClick={() => setCoursesOpen(!coursesOpen)}>Обучение<ChevronDown size={15} /></button>{coursesOpen && <div id="course-navigation" className="course-dropdown">{programs.map(program => <a key={program.id} href={`#/programs/${program.id}`}>{program.label}<ArrowUpRight size={16} /></a>)}<a href="#teachers">Ваш преподаватель<ArrowUpRight size={16} /></a><a href="#formats">Форматы и нагрузка<ArrowUpRight size={16} /></a></div>}</div><a href="#club">Разговорная практика</a><a href="#/materials">Бесплатное</a><button className="nav-quiz" onClick={onQuiz}>Тест</button></nav>
      <ArrowLink href="#contact" variant="outline" className="header-cta">Начать знакомство</ArrowLink>
      <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Мобильная навигация" inert={!open}>
      {links.map((link, i) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}><span className="menu-number">0{i + 1}</span>{link.label}<ArrowUpRight aria-hidden="true" /></a>)}
      <a href="#teachers" onClick={() => setOpen(false)}><span className="menu-number">05</span>Ваш преподаватель<ArrowUpRight aria-hidden="true" /></a>
      <button onClick={() => { setOpen(false); menuButtonRef.current?.focus(); onQuiz(); }}>Пройти тест<ArrowUpRight aria-hidden="true" /></button>
      <a href="#contact" onClick={() => setOpen(false)} className="mobile-contact">Давайте знакомиться<ArrowUpRight aria-hidden="true" /></a>
    </nav>
  </header>;
}
