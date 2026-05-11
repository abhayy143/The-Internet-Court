import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'The Internet Court',
  description: 'Submit your drama. The internet decides your fate.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-50 min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}