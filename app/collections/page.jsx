import Link from 'next/link';
import { loadAllArticles } from '../../lib/contentLoader';

export const metadata = {
  title: 'Collections • Team Patterns',
  description: 'Explore collections of related practices grouped by theme (tags).'
};

export default async function CollectionsPage() {
  const articles = await loadAllArticles();

  // Aggregate tags as lightweight "collections"
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
    .slice(0, 24);

  return (
    <>
      <section className="kb-card p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Collections</h1>
        <p className="mt-2 text-slate-700 dark:text-slate-200">
          Thematic groups based on tags; jump into focused sets of patterns.
        </p>
      </section>

      {collections.length === 0 ? (
        <div className="kb-card p-8">
          <p className="text-slate-700 dark:text-slate-200">No collections yet — add tags to your articles to build them.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(({ tag, count }) => (
            <li key={tag} className="kb-card p-6">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-indigo-200/80">
                <span className="badge">#{tag}</span>
                <span className="text-slate-500 dark:text-slate-300">{count} {count === 1 ? 'article' : 'articles'}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">
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
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 1 1 0-2h9.586l-3.293-3.293a1 1 0  0 1 0-1.414Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
