import './globals.css';
import 'sonner/styles.css';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Team Patterns',
  description: 'Ways of working for your org — a curated set of articles.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Literata:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen scroll-smooth bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground retro-bg font-sans">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
