import { loadAllArticles } from '../lib/contentLoader';
import Link from 'next/link';
import ArticleCard from './components/ArticleCard';
import { Layers, BookOpen, ArrowRight, TrendingUp } from 'lucide-react';

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
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
          <BookOpen aria-hidden="true" className="mr-2 inline-block h-6 w-6 align-[-2px]" />
          Team Patterns
        </h1>
        <p className="max-w-2xl text-slate-700">
          Curated guidance for agile product teams — concise patterns that help you ship better with clarity and flow.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/articles" className="btn btn-primary">
            <BookOpen aria-hidden="true" className="h-5 w-5" />
            <span>Browse articles</span>
          </Link>
          <Link href="/collections" className="btn btn-outline">
            <Layers aria-hidden="true" className="h-5 w-5" />
            <span>Explore collections</span>
          </Link>
        </div>
      </section>

      {featured && (
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <article className="kb-card p-6 transition">
              <div className="flex items-center gap-3 text-xs text-slate-600">
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
                <p className="mt-3 text-slate-700">{featured.description}</p>
              )}
              <div className="mt-5">
                <Link href={`/${featured.slug}`} className="inline-flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-900">
                  Read the feature
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </Link>
              </div>
            </article>

            <aside className="kb-card p-6">
              <h3 className="text-sm font-semibold text-slate-800">
                <TrendingUp aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
                Trending tags
              </h3>
              {trendingTags.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {trendingTags.map((t) => (
                    <Link
                      key={t.tag}
                      href={`/articles?tag=${encodeURIComponent(t.tag)}`}
                      className="badge"
                    >
                      <span>#{t.tag}</span>
                      <span className="text-slate-600">· {t.count}</span>
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
          <div className="mb-12 flex items-center justify-between">
            <h2 id="highlights-heading" className="text-xl font-bold">Latest Articles</h2>
            <Link href="/articles" className="text-sm text-indigo-700 hover:text-indigo-900">View all</Link>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </ul>
        </section>
      )}

      {/* Collections section (placed at end) */}
      {collections.length > 0 && (
        <section className="mt-16 mb-4" aria-labelledby="collections-heading">
          <div className="constellation-divider mb-4">
            <Layers aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
            Collections
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(({ tag, count }) => (
              <li key={tag} className="kb-card collection-card p-6">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-indigo-700" />
                    <span className="meta-pill">Collection</span>
                  </div>
                  <span className="text-slate-500">{count} {count === 1 ? 'article' : 'articles'}</span>
                </div>
                <h2 id="collections-heading" className="mt-2 text-lg font-semibold">
                  <Link href={`/articles?tag=${encodeURIComponent(tag)}`} className="hover:underline">
                    {tag.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  Explore practices related to {tag}.
                </p>
                <div className="mt-4">
                  <Link href={`/articles?tag=${encodeURIComponent(tag)}`} className="inline-flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-900">
                    View collection
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <Link href="/collections" className="text-sm text-indigo-700 hover:text-indigo-900">See all collections</Link>
          </div>
        </section>
      )}


    </>
  );
}
