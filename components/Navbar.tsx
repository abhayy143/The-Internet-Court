import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-3 md:py-4 px-4 md:px-8 border-b border-zinc-900/50 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-1.5 md:gap-2 hover:opacity-80 transition-opacity">
        <span className="text-lg md:text-2xl">🏛️</span>
        <span className="font-black text-sm md:text-xl tracking-widest text-white uppercase mt-0.5">
          The Internet Court
        </span>
      </Link>
      
      {/* shrink-0 prevents the button from being squished by long titles on very small phones */}
      <Link href="/submit" className="shrink-0">
        <button className="bg-zinc-100 text-zinc-950 hover:bg-white font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-md text-xs md:text-sm transition-colors shadow-sm">
          File a Case
        </button>
      </Link>
    </nav>
  );
}