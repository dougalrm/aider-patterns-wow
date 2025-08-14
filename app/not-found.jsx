export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold mb-2">Not Found</h1>
        <p className="text-slate-700 dark:text-slate-300">The page you are looking for does not exist.</p>
        <div className="mt-6">
          <a href="/" className="text-brand-700 hover:underline dark:text-brand-100">Go back home</a>
        </div>
      </div>
    </section>
  );
}
