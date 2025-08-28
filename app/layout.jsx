import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Team Patterns',
  description: 'Ways of working for your org — a curated set of articles.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen scroll-smooth bg-background text-foreground antialiased selection:bg-brand-100 selection:text-brand-700 retro-bg">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
