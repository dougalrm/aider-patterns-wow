import Link from 'next/link';

export default function ArticleCard({ article }) {
  return (
    <li className="group relative rounded-2xl border border-white/20 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:drop-shadow-neon dark:border-white/10 dark:bg-slate-950/40">
      <div className="flex items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-300">
        {article.date ? (
          <time dateTime={new Date(article.date).toISOString()}>{new Date(article.date).toLocaleDateString()}</time>
        ) : <span />}
        {article.tags?.length ? (
          <div className="flex flex-wrap gap-1.5 justify-end">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full border border-white/20 bg-gradient-to-r from-brand-50 to-white/70 px-2 py-0.5 text-xs text-slate-700 dark:border-white/10 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200">{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-snug">
        <Link className="hover:underline hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-600 hover:to-cyan-400 transition-colors" href={`/${article.slug}`}>{article.title}</Link>
      </h3>
      {article.description ? (
        <p className="mt-3 text-sm text-slate-700 line-clamp-3 dark:text-slate-300">{article.description}</p>
      ) : null}
      <div className="mt-5">
        <Link href={`/${article.slug}`} className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-cyan-400 transition-colors drop-shadow-neon-sm">
          Read more
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </li>
  );
}
