import { steps } from '../data';
import { Reveal, SectionLabel } from './Shared';

export default function Approach() {
  return <section id="approach" className="approach section container" aria-labelledby="approach-title">
    <Reveal><SectionLabel number="02">Как учимся</SectionLabel></Reveal>
    <Reveal className="section-heading approach-heading"><h2 id="approach-title">Не зубрить.<br /><em>А проживать.</em></h2><p>Английский становится привычкой, когда он связан с вашей жизнью.</p></Reveal>
    <div className="steps">{steps.map((step, index) => <Reveal key={step.title} className="step" delay={index * 100}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</div>
  </section>;
}
