import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Approach from './components/Approach';
import Practice from './components/Practice';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useMotion } from './hooks/useMotion';
import type { Goal } from './data';
import { programs } from './data';
import { Club, Formats, Resources, Teachers } from './components/MoreSections';

const loadPages = () => import('./components/LearningPages');
const CoursePage = lazy(() => loadPages().then(module => ({ default: module.CoursePage })));
const LibraryPage = lazy(() => loadPages().then(module => ({ default: module.LibraryPage })));
const ArticlePage = lazy(() => loadPages().then(module => ({ default: module.ArticlePage })));
const VocabularyPage = lazy(() => loadPages().then(module => ({ default: module.VocabularyPage })));
const PrivacyPage = lazy(() => loadPages().then(module => ({ default: module.PrivacyPage })));
const NotFound = lazy(() => loadPages().then(module => ({ default: module.NotFound })));

const LevelQuiz = lazy(() => import('./components/LevelQuiz'));

function PageReady({ path, children }: { path: string; children: ReactNode }) {
  useMotion(path);
  useEffect(() => {
    const heading = document.querySelector('h1');
    const title = heading?.innerText.replace(/\s+/g, ' ').trim();
    document.title = path === '/' ? 'EasyEnglish — английский в вашем ритме' : `${title ?? 'Страница'} · EasyEnglish`;
    if (path !== '/') {
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    }
  }, [path]);
  return children;
}

export default function App() {
  const [goal, setGoal] = useState<Goal>('life');
  const [quizOpen, setQuizOpen] = useState(false);
  const [preference, setPreference] = useState('');
  const [hash, setHash] = useState(() => window.location.hash);
  const path = hash.startsWith('#/') ? hash.slice(1) : '/';
  const previousPath = useRef<string | null>(null);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    const withinPage = previousPath.current === path;
    previousPath.current = path;
    const frame = requestAnimationFrame(() => {
      if (path === '/' && hash.length > 1) {
        const animate = withinPage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: animate ? 'smooth' : 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, path]);
  const openQuiz = () => setQuizOpen(true);
  const courseId = path.split('/')[2];
  let content;
  if (path === '/') content = <><Hero /><Programs onChoose={setGoal} onQuiz={openQuiz} /><Approach /><Teachers onPreference={setPreference} /><Club onPreference={setPreference} /><Formats onPreference={setPreference} /><Practice onQuiz={openQuiz} /><Resources onQuiz={openQuiz} /><Faq /><Contact goal={goal} onGoalChange={setGoal} preference={preference} onPreferenceChange={setPreference} /></>;
  else if (/^\/programs\/[^/]+$/.test(path) && programs.some(item => item.id === courseId)) content = <CoursePage id={courseId as Goal} onChoose={setGoal} />;
  else if (path === '/materials') content = <LibraryPage onQuiz={openQuiz} />;
  else if (/^\/materials\/[^/]+$/.test(path)) content = <ArticlePage key={courseId} id={courseId} />;
  else if (path === '/vocabulary') content = <VocabularyPage />;
  else if (path === '/privacy') content = <PrivacyPage />;
  else content = <NotFound />;
  return <><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>К содержимому</a><div id="top" /><Header onQuiz={openQuiz} home={path === '/'} /><main id="main" tabIndex={-1} key={path}><Suspense fallback={<div className="page-loading container" role="status">Открываем страницу…</div>}><PageReady path={path}>{content}</PageReady></Suspense></main><Footer onQuiz={openQuiz} />{quizOpen ? <Suspense fallback={<div className="quiz-loading" role="status">Открываем тест…</div>}><LevelQuiz onClose={() => setQuizOpen(false)} /></Suspense> : null}</>;
}
