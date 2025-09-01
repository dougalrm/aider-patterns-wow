import Link from 'next/link';
import {
  Info,
  Users,
  ListChecks,
  Filter,
  Rocket,
  Github,
  GitPullRequest,
  MessageSquarePlus,
  Bug,
  UserCheck,
  Wrench,
  Repeat,
  FileText,
  Layers,
  BookOpen,
  BookText,
  Image,
  Share2,
  Mail,
  Compass
} from 'lucide-react';

export const metadata = {
  title: 'About • Team Patterns',
  description:
    'Team Patterns is a modern, professional knowledge base for agile ways of working — curated, practical guidance for product teams.'
};

export default function AboutPage() {
  return (
    <>
      <section className="kb-card p-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          <Info aria-hidden="true" className="mr-2 inline-block h-6 w-6 align-[-2px]" />
          About Team Patterns
        </h1>
        <p className="max-w-3xl text-slate-700 dark:text-slate-200">
          Team Patterns is a curated knowledge base for modern product development and agile delivery.
          Our mission is to distill proven practices into clear, actionable guidance that helps teams ship better work
          with less friction.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="kb-card p-6">
          <h2 className="text-xl font-bold mb-2">
            <Users aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
            Who it’s for
          </h2>
          <ul className="list-none pl-0 space-y-1 text-slate-700 dark:text-slate-200">
            <li className="flex items-start gap-2"><UserCheck aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Product managers and designers aligning strategy with outcomes</span></li>
            <li className="flex items-start gap-2"><Wrench aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Engineering managers and tech leads optimizing delivery flow</span></li>
            <li className="flex items-start gap-2"><Repeat aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Scrum masters and agile coaches enabling continuous improvement</span></li>
            <li className="flex items-start gap-2"><Users aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Teams seeking practical, real-world patterns over theory</span></li>
          </ul>
        </div>

        <div className="kb-card p-6">
          <h2 className="text-xl font-bold mb-2">
            <ListChecks aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
            What you’ll find
          </h2>
          <ul className="list-none pl-0 space-y-1 text-slate-700 dark:text-slate-200">
            <li className="flex items-start gap-2"><FileText aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Concise articles that explain the “why”, “when”, and “how”</span></li>
            <li className="flex items-start gap-2"><Layers aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Collections that group related practices for common scenarios</span></li>
            <li className="flex items-start gap-2"><BookText aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>A glossary to standardize language across teams</span></li>
            <li className="flex items-start gap-2"><Image aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Lightweight visuals and examples to speed up adoption</span></li>
          </ul>
        </div>
      </section>

      <div className="constellation-divider mb-8">
        <Compass aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
        Our approach
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="kb-card p-6">
          <h2 className="text-xl font-bold mb-2">
            <Filter aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
            How we curate
          </h2>
          <p className="text-slate-700 dark:text-slate-200">
            Content is selected for clarity, evidence, and usefulness. We prioritize patterns that demonstrably improve
            flow efficiency, transparency, and outcomes, and we revise continuously as practices evolve.
          </p>
        </div>

        <div className="kb-card p-6">
          <h2 className="text-xl font-bold mb-2">
            <Rocket aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
            How to use this site
          </h2>
          <ul className="list-none pl-0 space-y-1 text-slate-700 dark:text-slate-200">
            <li className="flex items-start gap-2"><BookOpen aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Browse <Link href="/articles" className="text-primary hover:text-secondary">Articles</Link> for deep dives</span></li>
            <li className="flex items-start gap-2"><Layers aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Explore <Link href="/collections" className="text-primary hover:text-secondary">Collections</Link> to solve specific problems</span></li>
            <li className="flex items-start gap-2"><BookText aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Align terminology with the <Link href="/glossary" className="text-primary hover:text-secondary">Glossary</Link></span></li>
            <li className="flex items-start gap-2"><Share2 aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Share pieces in rituals to drive consistent, incremental change</span></li>
          </ul>
        </div>
      </section>

      <section className="kb-card p-6 md:p-8">
        <h2 className="text-xl font-bold mb-2">
          <Github aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
          Contributing
        </h2>
        <p className="text-slate-700 dark:text-slate-200">
          This project welcomes lightweight GitHub contributions — open a small issue, submit a focused pull request, or suggest topics that would help practitioners.
        </p>
        <ul className="mt-3 list-none pl-0 space-y-1 text-slate-700 dark:text-slate-200">
          <li className="flex items-start gap-2"><Bug aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Report problems or broken links with clear context and examples</span></li>
          <li className="flex items-start gap-2"><GitPullRequest aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Propose edits that improve clarity, accuracy, or structure</span></li>
          <li className="flex items-start gap-2"><MessageSquarePlus aria-hidden="true" className="mt-0.5 h-5 w-5" /><span>Suggest new topics or patterns you’d find valuable</span></li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://github.com/dougalrm" target="_blank" rel="noreferrer" className="btn btn-primary">
            <Github aria-hidden="true" className="h-5 w-5" />
            <span>View on GitHub</span>
          </a>
          <Link href="/articles" className="btn btn-outline">
            <BookOpen aria-hidden="true" className="h-5 w-5" />
            <span>Browse articles</span>
          </Link>
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Prefer email? <Link href="/contact" className="underline underline-offset-2">Contact us</Link>.
        </p>
      </section>
    </>
  );
}
