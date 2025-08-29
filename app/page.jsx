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
                    <span aria-hidden="true">•</span>
                    <div className="flex flex-wrap gap-1.5">
                      {featured.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">{tag}</span>
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
                      className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-950/30 px-3 py-1.5 text-xs text-indigo-200 hover:bg-indigo-900/40"
                    >
                      <span>#{t.tag}</span>
                      <span className="text-slate-400">· {t.count}</span>
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

      {latest.length > 0 && (
        <section aria-labelledby="highlights-heading">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="highlights-heading" className="text-xl font-bold">Latest highlights</h2>
            <Link href="/articles" className="text-sm text-indigo-300 hover:text-white">View all</Link>
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
