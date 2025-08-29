import { loadAllArticles } from '../lib/contentLoader';
import Link from 'next/link';
import ArticleCard from './components/ArticleCard';

export default async function HomePage() {
  const articles = await loadAllArticles();

  const featured = articles[0] || null;
  const latest = featured ? articles.slice(1) : articles;

  // Build trending tags
  const tagCounts = new Map();
  for (const a of articles) {
    (a.tags || []).forEach((t) => {
      const k = String(t).toLowerCase();
      tagCounts.set(k, (tagCounts.get(k) || 0) + 1);
    });
  }
  const trendingTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));

  // Collections preview (top tags by frequency)
  const counts = new Map();
  for (const a of articles) {
    (a.tags || []).forEach((t) => {
      const k = String(t).toLowerCase();
      counts.set(k, (counts.get(k) || 0) + 1);
    });
  }
  const collections = Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, 6);

  return (
    <>
      <section className="mb-10 overflow-hidden kb-card p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Team Patterns</h1>
        <p className="max-w-2xl text-slate-700 dark:text-slate-200">
          Curated guidance for agile product teams — concise patterns that help you ship better with clarity and flow.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/articles" className="btn btn-primary">Browse articles</Link>
          <Link href="/collections" className="btn btn-outline">Explore collections</Link>
        </div>
      </section>

      {featured && (
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <article className="kb-card p-6 transition">
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-indigo-200/80">
                {featured.date && (
                  <time dateTime={new Date(featured.date).toISOString()}>
                    {new Date(featured.date).toLocaleDateString()}
                  </time>
                )}
                {featured.tags?.length ? (
                  <>
                    <div className="flex flex-wrap gap-1.5">
                      {featured.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="badge">#{tag}</span>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">
                <Link className="hover:underline" href={`/${featured.slug}`}>{featured.title}</Link>
              </h2>
              {featured.description && (
                <p className="mt-3 text-slate-700 dark:text-slate-200">{featured.description}</p>
              )}
              <div className="mt-5">
                <Link href={`/${featured.slug}`} className="inline-flex items-center gap-2 text-indigo-300 hover:text-fuchsia-300">
                  Read the feature
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0  0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0  0 1 0-1.414Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </article>

            <aside className="kb-card p-6">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Trending tags</h3>
              {trendingTags.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {trendingTags.map((t) => (
                    <Link
                      key={t.tag}
                      href={`/articles?tag=${encodeURIComponent(t.tag)}`}
                      className="badge"
                    >
                      <span>#{t.tag}</span>
                      <span className="text-slate-600 dark:text-slate-400">· {t.count}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-indigo-200/80">Tags will appear as you add more content.</p>
              )}
            </aside>
          </div>
        </section>
      )}

      {collections.length > 0 && (
        <section className="mb-12" aria-labelledby="collections-heading">
          <div className="constellation-divider mb-4">Collections</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(({ tag, count }) => (
              <li key={tag} className="kb-card p-6">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-indigo-200/80">
                  <span className="badge">#{tag}</span>
                  <span className="text-slate-500 dark:text-slate-300">{count} {count === 1 ? 'article' : 'articles'}</span>
                </div>
                <h2 id="collections-heading" className="mt-2 text-lg font-semibold">
                  <Link href={`/articles?tag=${encodeURIComponent(tag)}`} className="hover:underline">
                    {tag.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                  Explore practices related to {tag}.
                </p>
                <div className="mt-4">
                  <Link href={`/articles?tag=${encodeURIComponent(tag)}`} className="inline-flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-fuchsia-300">
                    View collection
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <Link href="/collections" className="text-sm text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-white">See all collections</Link>
          </div>
        </section>
      )}

      {latest.length > 0 && (
        <section aria-labelledby="highlights-heading">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="highlights-heading" className="text-xl font-bold">Latest highlights</h2>
            <Link href="/articles" className="text-sm text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-white">View all</Link>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
