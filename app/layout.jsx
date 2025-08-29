import './globals.css';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import { Lora, Cinzel } from 'next/font/google';

const lora = Lora({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-sans', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400','700'], variable: '--font-serif', display: 'swap' });

export const metadata = {
  title: 'Team Patterns',
  description: 'Ways of working for your org — a curated set of articles.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={`${lora.variable} ${cinzel.variable} min-h-screen scroll-smooth text-foreground antialiased selection:bg-primary-20 selection:text-foreground retro-bg font-sans`}>
        <div className="stars"></div>
        <Header />
        <main className="mx-auto max-w-5xl px-6 py-12">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
