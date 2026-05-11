import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
          🏛️ THE INTERNET COURT
        </Link>
        <Link href="/submit" className="bg-zinc-100 text-zinc-900 px-4 py-2 rounded-md font-semibold hover:bg-zinc-300 transition">
          File a Case
        </Link>
      </div>
    </nav>
  );
}