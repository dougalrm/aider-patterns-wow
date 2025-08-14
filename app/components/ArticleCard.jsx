import Link from 'next/link';

export default function ArticleCard({ article }) {
  return (
    <li className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-300">
        {article.date ? (
          <time dateTime={new Date(article.date).toISOString()}>{new Date(article.date).toLocaleDateString()}</time>
        ) : <span />}
        {article.tags?.length ? (
          <div className="flex flex-wrap gap-1.5 justify-end">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-brand-700">
        <Link className="hover:underline" href={`/${article.slug}`}>{article.title}</Link>
      </h3>
      {article.description ? (
        <p className="mt-3 text-sm text-slate-700 line-clamp-3 dark:text-slate-300">{article.description}</p>
      ) : null}
      <div className="mt-5">
        <Link href={`/${article.slug}`} className="inline-flex items-center gap-2 text-sm text-brand-700 hover:text-brand-600">
          Read more
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </li>
  );
}
