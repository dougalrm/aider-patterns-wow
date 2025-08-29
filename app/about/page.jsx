import Link from 'next/link';

export const metadata = {
  title: 'About • Team Patterns',
  description:
    'Team Patterns is a modern, professional knowledge base for agile ways of working — curated, practical guidance for product teams.'
};

export default function AboutPage() {
  return (
    <>
      <section className="kb-card p-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">About Team Patterns</h1>
        <p className="max-w-3xl text-slate-700 dark:text-slate-200">
          Team Patterns is a curated knowledge base for modern product development and agile delivery.
          Our mission is to distill proven practices into clear, actionable guidance that helps teams ship better work
          with less friction.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="kb-card p-6">
          <h2 className="text-xl font-bold mb-2">Who it’s for</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-200">
            <li>Product managers and designers aligning strategy with outcomes</li>
            <li>Engineering managers and tech leads optimizing delivery flow</li>
            <li>Scrum masters and agile coaches enabling continuous improvement</li>
            <li>Teams seeking practical, real-world patterns over theory</li>
          </ul>
        </div>

        <div className="kb-card p-6">
          <h2 className="text-xl font-bold mb-2">What you’ll find</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-200">
            <li>Concise articles that explain the “why”, “when”, and “how”</li>
            <li>Collections that group related practices for common scenarios</li>
            <li>A glossary to standardize language across teams</li>
            <li>Lightweight visuals and examples to speed up adoption</li>
          </ul>
        </div>
      </section>

      <div className="constellation-divider mb-8">Our approach</div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="kb-card p-6">
          <h2 className="text-xl font-bold mb-2">How we curate</h2>
          <p className="text-slate-700 dark:text-slate-200">
            Content is selected for clarity, evidence, and usefulness. We prioritize patterns that demonstrably improve
            flow efficiency, transparency, and outcomes, and we revise continuously as practices evolve.
          </p>
        </div>

        <div className="kb-card p-6">
          <h2 className="text-xl font-bold mb-2">How to use this site</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-200">
            <li>Browse <Link href="/articles" className="text-primary hover:text-secondary">Articles</Link> for deep dives</li>
            <li>Explore <Link href="/collections" className="text-primary hover:text-secondary">Collections</Link> to solve specific problems</li>
            <li>Align terminology with the <Link href="/glossary" className="text-primary hover:text-secondary">Glossary</Link></li>
            <li>Share pieces in rituals to drive consistent, incremental change</li>
          </ul>
        </div>
      </section>

      <section className="kb-card p-6">
        <h2 className="text-xl font-bold mb-2">Contribute and feedback</h2>
        <p className="text-slate-700 dark:text-slate-200">
          We welcome suggestions, improvements, and new perspectives that make the library more useful for practitioners.
          If you’ve found a gap or have a pattern to propose, please reach out.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">Contact us</Link>
          <Link href="/articles" className="btn btn-outline">Browse articles</Link>
        </div>
      </section>
    </>
  );
}
