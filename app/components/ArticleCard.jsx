import Link from 'next/link';

export default function ArticleCard({ article }) {
  return (
    <li className="group relative kb-card p-6 transition hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-4 text-xs text-slate-600 dark:text-indigo-200/80">
        {article.date ? (
          <time dateTime={new Date(article.date).toISOString()}>{new Date(article.date).toLocaleDateString()}</time>
        ) : <span />}
        {article.tags?.length ? (
          <div className="flex flex-wrap gap-1.5 justify-end">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge">#{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900 dark:text-indigo-100">
        <Link className="hover:text-indigo-300 transition-colors" href={`/${article.slug}`}>{article.title}</Link>
      </h3>
      {article.description ? (
        <p className="mt-3 text-sm text-slate-700 dark:text-indigo-200/85 line-clamp-3">{article.description}</p>
      ) : null}
      <div className="mt-5">
        <Link href={`/${article.slug}`} className="inline-flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-fuchsia-300 transition-colors">
          Read more
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </li>
  );
}
