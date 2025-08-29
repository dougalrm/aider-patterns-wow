import { ListTree } from 'lucide-react';

export default function TableOfContents({ toc = [] }) {
  if (!toc.length) return null;
  return (
    <div className="sticky top-24 rounded-lg border border-white/20 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/40">
      <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">
        <ListTree aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
        On this page
      </p>
      <nav>
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
    </div>
  );
}
