import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Agile Articles',
  description: 'Agile ways of working — a curated set of articles.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-100 selection:text-brand-700 dark:bg-slate-900 dark:text-slate-100">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
