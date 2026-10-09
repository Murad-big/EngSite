import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, ChevronDown, Download, RotateCcw } from 'lucide-react';
import { programs, type Goal } from '../data';
import { Reveal } from './Shared';

const STORAGE_KEY = 'easyenglish:enquiry:v1';
const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT?.trim();
type Enquiry = { version: 1; name: string; email: string; channel?: 'email' | 'telegram'; goal: Goal; preference?: string; createdAt?: string };

function readEnquiry(): Enquiry | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (typeof value !== 'object' || value === null || !('version' in value) || value.version !== 1
      || !('name' in value) || typeof value.name !== 'string' || !('email' in value) || typeof value.email !== 'string'
      || !('goal' in value) || !programs.some(program => program.id === value.goal)) return null;
    return value as Enquiry;
  } catch { return null; }
}

export default function Contact({ goal, onGoalChange, preference, onPreferenceChange }: { goal: Goal; onGoalChange: (goal: Goal) => void; preference: string; onPreferenceChange: (value: string) => void }) {
  const [saved, setSaved] = useState<Enquiry | null>(readEnquiry);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [channel, setChannel] = useState<'email' | 'telegram'>('email');
  const [error, setError] = useState('');
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get('name') ?? '').trim();
    const email = String(fields.get('contact') ?? '').trim();
    if (name.length < 2) { setError('Напишите имя — хотя бы два символа.'); form.querySelector<HTMLInputElement>('[name="name"]')?.focus(); return; }
    if (channel === 'telegram' && !/^@[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(email)) { setError('Укажите Telegram в формате @username: от 5 до 32 латинских букв, цифр или _.'); return; }
    const enquiry: Enquiry = { version: 1, name, email, channel, goal, preference: preference.trim(), createdAt: new Date().toISOString() };
    setError(''); setPending(true);
    try {
      if (endpoint) {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(enquiry), signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error('request-failed');
        const body: unknown = await response.json();
        if (!body || typeof body !== 'object' || !('success' in body) || body.success !== true) throw new Error('request-failed');
        setSent(true);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiry));
      }
      setSaved(enquiry);
      requestAnimationFrame(() => successRef.current?.focus({ preventScroll: true }));
    } catch {
      setError(endpoint ? 'Не удалось отправить заявку. Данные остались в форме — попробуйте ещё раз.' : 'Браузер запретил сохранение. Разрешите локальное хранилище и попробуйте снова.');
    } finally { setPending(false); }
  };
  const reset = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { setError('Не удалось удалить запись. Удалите данные сайта в настройках браузера.'); return; }
    setSaved(null); setSent(false); setError('');
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true }));
  };
  const download = () => {
    if (!saved) return;
    const text = `EasyEnglish — моя заявка\n\nИмя: ${saved.name}\nКонтакт: ${saved.email}\nЦель: ${programs.find(program => program.id === saved.goal)?.label}\nПожелания: ${saved.preference || 'Не указаны'}\n\n${sent ? 'Сервис подтвердил приём заявки.' : 'Сохранено локально. В школу не отправлено.'}`;
    const url = URL.createObjectURL(new Blob(['\uFEFF', text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'easyenglish-my-plan.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <section id="contact" className="contact-section container" aria-labelledby="contact-title"><Reveal className="contact-band">
    <div className="contact-intro"><h2 id="contact-title">Ваше новое<br /><em>hello.</em></h2><p>Расскажите немного о себе.<br />Начнём с того, что важно именно вам.</p><div className="contact-doodle" aria-hidden="true"><span>Let’s do this.</span><svg viewBox="0 0 160 80" fill="none"><path d="M8 16c20 34 71 54 112 29m-13-6 16 4-4 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></div></div>
    {saved ? <div className="contact-success" role="status"><div className="success-check"><Check size={32} strokeWidth={1.5} aria-hidden="true" /></div><h3 ref={successRef} tabIndex={-1}>{sent ? 'Заявка отправлена.' : 'Ваш план сохранён.'}</h3><p>{saved.name}, первый шаг сделан.</p><p className="contact-success-note">{sent ? 'Сервис приёма заявок подтвердил отправку.' : 'Заявка сохранена только в этом браузере. В школу данные не отправлялись. Вы можете скачать свою копию.'}</p><button className="text-link download-enquiry" onClick={download}><Download size={16} />Скачать мой план</button><button className="text-link" type="button" onClick={reset}><RotateCcw size={16} aria-hidden="true" />{sent ? 'Заполнить ещё раз' : 'Удалить и заполнить заново'}</button>{error && <p className="form-error" role="alert">{error}</p>}</div> : <form className="contact-form" onSubmit={submit} ref={formRef} aria-busy={pending}>
      <label htmlFor="contact-name">Ваше имя<input id="contact-name" name="name" type="text" placeholder="Как к вам обращаться?" autoComplete="given-name" required minLength={2} maxLength={80} onInput={() => setError('')} /></label>
      <div className="contact-channel" aria-label="Способ связи"><button type="button" aria-pressed={channel === 'email'} onClick={() => { setChannel('email'); setError(''); }}>Email</button><button type="button" aria-pressed={channel === 'telegram'} onClick={() => { setChannel('telegram'); setError(''); }}>Telegram</button></div>
      <label htmlFor="contact-email">{channel === 'email' ? 'Email' : 'Имя пользователя в Telegram'}<input key={channel} id="contact-email" name="contact" type={channel === 'email' ? 'email' : 'text'} placeholder={channel === 'email' ? 'you@example.com' : '@username'} autoComplete={channel === 'email' ? 'email' : 'off'} required maxLength={200} onInput={() => setError('')} /></label>
      <label htmlFor="contact-goal">Ваша цель<span className="select-wrap"><select id="contact-goal" name="goal" value={goal} onChange={event => onGoalChange(event.target.value as Goal)}>{programs.map(program => <option key={program.id} value={program.id}>{program.label}</option>)}</select><ChevronDown size={18} aria-hidden="true" /></span></label>
      <label htmlFor="contact-preference">Пожелания · необязательно<textarea id="contact-preference" name="preference" value={preference} onChange={event => onPreferenceChange(event.target.value)} maxLength={600} placeholder="Удобный ритм, время, что хочется попробовать…" /></label>
      <label className="consent-label"><input type="checkbox" name="consent" required /><span>{endpoint ? 'Согласен(на) на отправку указанных данных для обработки заявки. ' : 'Согласен(на) сохранить эти данные на моём устройстве. '}<a href="#/privacy" target="_blank" rel="noopener">О данных и приватности</a></span></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="button button-dark" disabled={pending}>{pending ? 'Отправляем…' : endpoint ? 'Отправить заявку' : 'Сохранить мой план'}<ArrowRight size={22} aria-hidden="true" /></button>
      <p className="form-note">{endpoint ? 'Заявка будет отправлена в подключённый сервис приёма заявок.' : 'Демо-режим: данные сохранятся только в этом браузере. Отправка в школу пока не подключена.'}</p>
    </form>}
  </Reveal></section>;
}
