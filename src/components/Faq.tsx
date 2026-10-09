import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '../data';
import { Reveal, SectionLabel } from './Shared';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return <section className="faq section container" id="faq" aria-labelledby="faq-title">
    <Reveal className="faq-heading"><div><SectionLabel number="04">Всё понятно</SectionLabel><h2 id="faq-title">Остались <em>вопросы?</em></h2></div><p>Это нормально.<br />Давайте разберёмся вместе.</p></Reveal>
    <Reveal className="faq-list" delay={100}>{faqs.map((item, index) => <div key={item.question} className={`faq-item ${open === index ? 'is-open' : ''}`}>
      <h3><button type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={() => setOpen(open === index ? null : index)}><span>{item.question}</span><Plus size={24} strokeWidth={1.4} aria-hidden="true" /></button></h3>
      <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} inert={open !== index} aria-hidden={open !== index}><div><p>{item.answer}</p></div></div>
    </div>)}</Reveal>
  </section>;
}
