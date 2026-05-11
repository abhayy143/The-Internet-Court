import { supabase } from '@/lib/supabaseClient';
import VoteButtons from '@/components/VoteButtons';
import VerdictCard from '@/components/VerdictCard';
import { notFound } from 'next/navigation';

export default async function CaseDetail({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await the params (Next.js 15 requirement)
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. Fetch the data using the resolved id
  const { data: caseData } = await supabase.from('cases').select('*').eq('id', id).single();
  if (!caseData) notFound();

  const { data: verdict } = await supabase.from('verdicts').select('*').eq('case_id', id).single();
  
  // 3. Aggregate votes
  const { data: votes } = await supabase.from('votes').select('vote_type').eq('case_id', id);
  const voteCounts = { GUILTY: 0, NOT_GUILTY: 0, BOTH_CLOWNS: 0, NEEDS_THERAPY: 0 };
  votes?.forEach(v => { voteCounts[v.vote_type as keyof typeof voteCounts]++; });

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <span className="text-sm font-bold text-amber-500 uppercase">{caseData.category}</span>
        <h1 className="text-4xl font-black text-white">{caseData.title}</h1>
        <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-300 leading-relaxed whitespace-pre-wrap">
          {caseData.story}
        </div>
      </div>

      {!verdict && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center">Jury, cast your vote:</h2>
          <VoteButtons caseId={caseData.id} currentCounts={voteCounts} />
        </div>
      )}

      {verdict && (
        <VerdictCard caseTitle={caseData.title} verdict={verdict} />
      )}
    </div>
  );
}