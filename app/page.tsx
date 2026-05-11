import { supabase } from '@/lib/supabaseClient';
import FeedClient from '@/components/FeedClient';

// Revalidate the cache every 60 seconds
export const revalidate = 60;

export default async function Feed() {
  // We added `verdicts(id)` to the query so we know if it's judged!
  const { data: cases } = await supabase
    .from('cases')
    .select('*, votes(count), verdicts(id)') 
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="text-center py-12 space-y-4">
        <h1 className="text-5xl font-black tracking-tight text-white">Let the Internet Judge You.</h1>
        <p className="text-zinc-400 text-lg">Submit your drama anonymously. Real people vote. AI drops the gavel.</p>
      </header>

      {/* Hand the data off to our interactive client component */}
      <FeedClient initialCases={cases || []} />
    </div>
  );
}