"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

const OPTIONS = [
  { id: 'GUILTY', label: '🔴 GUILTY' },
  { id: 'NOT_GUILTY', label: '🟢 NOT GUILTY' },
  { id: 'BOTH_CLOWNS', label: '🤡 BOTH CLOWNS' },
  { id: 'NEEDS_THERAPY', label: '💀 NEEDS THERAPY' }
];

export default function VoteButtons({ caseId, currentCounts }: { caseId: string, currentCounts: any }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [counts, setCounts] = useState(currentCounts);

  useEffect(() => {
    if (localStorage.getItem(`voted_${caseId}`)) setHasVoted(true);
  }, [caseId]);

  const handleVote = async (type: string) => {
    if (hasVoted) return;
    
    // Optimistic UI update
    setCounts((prev: any) => ({ ...prev, [type]: prev[type] + 1 }));
    setHasVoted(true);
    localStorage.setItem(`voted_${caseId}`, 'true');

    // Generate pseudo-fingerprint for zero-budget MVP
    const fp = navigator.userAgent.replace(/\D+/g, "") + new Date().getDate();

    await supabase.from('votes').insert({
      case_id: caseId,
      vote_type: type,
      fingerprint: fp
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {OPTIONS.map(opt => (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          key={opt.id}
          disabled={hasVoted}
          onClick={() => handleVote(opt.id)}
          className={`p-4 rounded-xl font-bold text-lg border transition-all ${
            hasVoted ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white'
          }`}
        >
          {opt.label}
          {hasVoted && <span className="block text-sm font-normal mt-1">{counts[opt.id]} votes</span>}
        </motion.button>
      ))}
    </div>
  );
}