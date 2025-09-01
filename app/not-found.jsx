import { SearchX, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">
          <SearchX aria-hidden="true" className="mr-2 inline-block h-5 w-5 align-[-2px]" />
          Not Found
        </h1>
        <p className="text-slate-700">The page you are looking for does not exist.</p>
        <div className="mt-6">
          <a href="/" className="text-brand-700 hover:underline">
            <Home aria-hidden="true" className="mr-1 inline-block h-5 w-5 align-[-2px]" />
            Go back home
          </a>
        </div>
      </div>
    </section>
  );
}
