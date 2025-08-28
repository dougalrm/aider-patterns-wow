import './globals.css';
import 'sonner/css';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import { Inter, Literata } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600'], variable: '--font-sans', display: 'swap' });
const literata = Literata({ subsets: ['latin'], weight: ['500','700'], variable: '--font-serif', display: 'swap' });

export const metadata = {
  title: 'Team Patterns',
  description: 'Ways of working for your org — a curated set of articles.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={`${inter.variable} ${literata.variable} min-h-screen scroll-smooth bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground retro-bg font-sans`}>
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
