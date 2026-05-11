import { supabase } from '@/lib/supabaseClient';
import FeedClient from '@/components/FeedClient';
import { Scale, Users, Gavel, Share2 } from 'lucide-react'; // We installed this earlier!

// Revalidate the cache every 60 seconds
export const revalidate = 60;

export default async function Feed() {
  const { data: cases } = await supabase
    .from('cases')
    .select('*, votes(count), verdicts(id)') 
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      
      {/* 1. HERO SECTION */}
      <header className="text-center pt-12 md:pt-20 pb-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-sm font-bold tracking-wide border border-amber-500/20 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Court is now in session
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-lg">
          Let the Internet <br className="hidden md:block"/> Judge You.
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Submit your drama anonymously. Let real people vote on who is guilty. Wait for the AI Judge to drop the final, brutal gavel.
        </p>
      </header>

      {/* 2. HOW IT WORKS SECTION (NEW) */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 px-4 pb-8">
        
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col items-center text-center space-y-3 hover:bg-zinc-900 transition-colors">
          <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-2 shadow-inner">
            <Scale className="w-5 h-5 text-zinc-300" />
          </div>
          <h3 className="font-black text-zinc-100 tracking-wide">1. File a Case</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">Post your relationship drama, work conflict, or petty argument anonymously.</p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col items-center text-center space-y-3 hover:bg-zinc-900 transition-colors">
          <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-2 shadow-inner">
            <Users className="w-5 h-5 text-zinc-300" />
          </div>
          <h3 className="font-black text-zinc-100 tracking-wide">2. The Jury Votes</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">The public reads the evidence and votes on exactly who is in the wrong.</p>
        </div>

        <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-900/30 flex flex-col items-center text-center space-y-3 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-amber-900/40 border border-amber-500/30 rounded-full flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Gavel className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="font-black text-amber-500 tracking-wide">3. AI Verdict</h3>
          <p className="text-sm text-amber-500/70 leading-relaxed">Our ruthless AI Judge analyzes the votes and drops the final, brutal judgment.</p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col items-center text-center space-y-3 hover:bg-zinc-900 transition-colors">
          <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-2 shadow-inner">
            <Share2 className="w-5 h-5 text-zinc-300" />
          </div>
          <h3 className="font-black text-zinc-100 tracking-wide">4. Share Receipt</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">Download the official verdict card and send it to the guilty party to prove a point.</p>
        </div>

      </section>

      <hr className="border-zinc-800/60 max-w-5xl mx-auto" />

      {/* 3. THE FEED */}
      <FeedClient initialCases={cases || []} />
      
    </div>
  );
}