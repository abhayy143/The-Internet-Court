import './globals.css';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'The Internet Court',
  description: 'Submit your drama. The internet decides your fate.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-50 min-h-screen flex flex-col font-sans">
        <Navbar />
        
        {/* main content flex-1 pushes the footer to the bottom of the screen */}
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="w-full py-8 text-center text-sm text-zinc-500 border-t border-zinc-900/50 mt-auto bg-zinc-950/50 backdrop-blur-sm">
          Made with <span className="text-red-500 animate-pulse inline-block">❤️</span> by{' '}
          <a 
            href="https://github.com/abhayy143/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold text-zinc-300 hover:text-amber-500 transition-colors underline decoration-zinc-700 underline-offset-4 hover:decoration-amber-500"
          >
            Abhayy
          </a>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}