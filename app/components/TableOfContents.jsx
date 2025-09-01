import { ListTree } from 'lucide-react';

export default function TableOfContents({ toc = [], variant = 'panel' }) {
  if (!toc.length) return null;

  const List = () => (
    <nav aria-label="Table of contents">
      <ul className="space-y-1">
        {toc.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : h.level >= 4 ? 'pl-6' : ''}>
            <a
              href={`#${h.id}`}
              className="block text-sm text-slate-700 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-100"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (variant === 'inline') {
    return (
      <details className="rounded-lg border border-white/20 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/40">
        <summary className="mb-1 cursor-pointer select-none text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">
          <ListTree aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
          On this page
        </summary>
        <div className="mt-2 max-h-[40vh] overflow-auto pr-1">
          <List />
        </div>
      </details>
    );
  }

  const containerClass =
    variant === 'floating'
      ? 'sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto rounded-lg border border-white/10 bg-white/70 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/50'
      : 'sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto rounded-lg border border-white/20 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/40';

  return (
    <div className={containerClass}>
      <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">
        <ListTree aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
        On this page
      </p>
      <List />
    </div>
  );
}
