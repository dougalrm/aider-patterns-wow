import { loadAllArticles } from '../lib/contentLoader';
import Link from 'next/link';
import ArticleCard from './components/ArticleCard';

export default async function HomePage() {
  const articles = await loadAllArticles();

  const featured = articles[0] || null;
  const latest = featured ? articles.slice(1) : articles;

  const tagCounts = new Map();
  for (const a of articles) {
    (a.tags || []).forEach((t) => {
      const k = String(t).toLowerCase();
      tagCounts.set(k, (tagCounts.get(k) || 0) + 1);
    });
  }
  const trendingTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([tag, count]) => ({ tag, count }));

  return (
    <>
      <section className="mb-10 overflow-hidden rounded-xl border border-indigo-400/50 bg-indigo-950/40 backdrop-blur-md shadow-lg shadow-purple-900/50 p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Ways of Working Articles</h1>
        <p className="max-w-2xl text-slate-700 dark:text-slate-300">Ideas, stories, and practices to help modern teams ship better work. Curated essays and guides — not a knowledge base.</p>
        <div className="mt-6">
          <Link href="#latest" className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-700 via-indigo-600 to-purple-800 text-white font-bold tracking-wide rounded-xl px-5 py-2 shadow-[0_0_12px_rgba(167,139,250,0.7)] hover:shadow-[0_0_24px_rgba(250,250,150,0.9)] transition">
            Explore articles
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

      {featured && (
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <article className="rounded-xl border border-indigo-400/50 bg-indigo-950/40 p-6 shadow-lg shadow-purple-900/50 backdrop-blur-md transition hover:shadow-purple-400/30">
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
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
                <p className="mt-3 text-slate-700 dark:text-slate-300">{featured.description}</p>
              )}
              <div className="mt-5">
                <Link href={`/${featured.slug}`} className="inline-flex items-center gap-2 text-indigo-300 hover:text-fuchsia-300">
                  Read the feature
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </article>

            <aside className="rounded-xl border border-indigo-400/50 bg-indigo-950/40 p-6 shadow-lg shadow-purple-900/50 backdrop-blur-md">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Trending tags</h3>
              {trendingTags.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {trendingTags.map((t) => (
                    <Link key={t.tag} href="#latest" className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-950/30 px-3 py-1.5 text-xs text-indigo-200 hover:bg-indigo-900/40">
                      <span>#{t.tag}</span>
                      <span className="text-slate-400">· {t.count}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Tags will appear as you add more content.</p>
              )}
            </aside>
          </div>
        </section>
      )}

      <section id="latest" aria-labelledby="latest-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="latest-heading" className="text-xl font-bold">Latest</h2>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white">View all</Link>
        </div>

        {(!latest?.length && !featured) ? (
          <div className="rounded-xl border border-indigo-400/40 bg-indigo-950/40 backdrop-blur-md p-8 text-center text-indigo-200/80">
            <p className="mb-2">No articles were found.</p>
            <p className="text-sm">Add .md files under <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded dark:bg-slate-800">./data/docs</span> and refresh.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(latest || []).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
