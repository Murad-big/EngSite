import { useState, type CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight, RotateCcw, Search } from 'lucide-react';
import { materials } from '../learning';
import { ChoiceGroup } from './Motion';

export function MaterialCards({ featured = false }: { featured?: boolean }) {
  const [category, setCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const shown = (featured ? materials.slice(0, 3) : materials).filter(item => (category === 'Все' || item.category === category) && `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(search.trim().toLowerCase()));
  return <>{!featured && <div className="library-tools"><ChoiceGroup className="filter-buttons" value={category} label="Категории материалов">{['Все', 'Практика', 'Грамматика', 'Лексика', 'Привычки'].map(item => <button type="button" aria-pressed={item === category} key={item} onClick={() => setCategory(item)}>{item}</button>)}</ChoiceGroup><label className="library-search"><Search size={19} /><span className="sr-only">Поиск материалов</span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Найти что-то полезное" /></label></div>}
    {!featured && <p className="results-count" role="status">Материалов: {shown.length}</p>}
    <div className="material-grid" key={`${category}:${search.trim()}`} data-stagger>{shown.map((item, index) => <a href={`#/materials/${item.id}`} className="material-card" key={item.id} style={{ '--card-index': index } as CSSProperties}><div className={`material-cover ${item.color}`} data-tilt><span>{item.mark}</span><ArrowUpRight size={32} /></div><div className="material-meta"><span>{item.category}</span><span>{item.time}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="material-read">Открыть материал<ArrowRight size={18} /></span></a>)}</div>
    {shown.length === 0 && <div className="empty-results"><Search size={32} /><h3>Такого материала пока нет.</h3><p>Попробуйте другой запрос или посмотрите все темы.</p><button className="text-link" onClick={() => { setSearch(''); setCategory('Все'); }}>Сбросить фильтры<RotateCcw size={16} /></button></div>}
  </>;
}
