import { ArrowRight } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

export function Brand() {
  return <a className="brand" href="#top" aria-label="EasyEnglish — на главную"><span className="brand-mascot" aria-hidden="true"><span className="brand-fox" /></span><span className="brand-word">easy<span>English</span></span></a>;
}

export function ArrowLink({ children, href, variant = 'purple', onClick, className = '' }: {
  children: ReactNode; href: string; variant?: 'purple' | 'dark' | 'outline'; onClick?: () => void; className?: string;
}) {
  return <a className={`button button-${variant} ${className}`} href={href} onClick={onClick}>
    <span>{children}</span><ArrowRight size={22} strokeWidth={1.7} aria-hidden="true" />
  </a>;
}

export function Reveal({ children, className = '', delay = 0, variant = 'rise' }: {
  children: ReactNode; className?: string; delay?: number; variant?: 'rise' | 'left' | 'right' | 'scale';
}) {
  return <div data-reveal={variant} className={className} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}

export function SectionLabel({ number, children }: { number?: string; children: ReactNode }) {
  return <div className="section-label">{number ? <><span>{number}</span><i>/</i></> : null}{children}</div>;
}
