import Link from 'next/link';
import { loadAllArticles } from '../../lib/contentLoader';
import ArticleCard from '../components/ArticleCard';

export const metadata = {
  title: 'Articles • Team Patterns',
  description: 'Browse curated articles on agile ways of working, delivery flow, and modern product development.'
};

export default async function ArticlesPage({ searchParams }) {
  const tag = typeof searchParams?.tag === 'string' ? searchParams.tag.toLowerCase() : null;
  const articles = await loadAllArticles();

  const filtered = tag
    ? articles.filter((a) => (a.tags || []).map((t) => String(t).toLowerCase()).includes(tag))
    : articles;

  // Build trending tags for quick filters
  const tagCounts = new Map();
  for (const a of articles) {
    (a.tags || []).forEach((t) => {
      const k = String(t).toLowerCase();
      tagCounts.set(k, (tagCounts.get(k) || 0) + 1);
    });
  }
  const trendingTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 16)
    .map(([t, c]) => ({ tag: t, count: c }));

  return (
    <>
      <section className="kb-card p-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Articles</h1>
            <p className="mt-2 text-slate-700 dark:text-slate-200">
              {tag ? `Filtering by “${tag}” — ` : ''}Curated guidance for better ways of working.
            </p>
          </div>
          {tag && (
            <Link href="/articles" className="btn btn-outline">Clear filter</Link>
          )}
        </div>

        {trendingTags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {trendingTags.map(({ tag: t, count }) => (
              <Link
                key={t}
                href={`/articles?tag=${encodeURIComponent(t)}`}
                className="badge"
              >
                <span>#{t}</span>
                <span className="text-slate-600 dark:text-slate-400">· {count}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {filtered.length === 0 ? (
        <div className="kb-card p-8 text-center">
          <p className="text-slate-700 dark:text-slate-200">No articles match your filter.</p>
          <p className="mt-2 text-sm">
            Try another tag or <Link className="text-primary hover:text-secondary" href="/articles">view all articles</Link>.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </ul>
      )}
    </>
  );
}
