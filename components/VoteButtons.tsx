"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

const OPTIONS = [
  { id: 'GUILTY', label: '🔴 GUILTY', style: 'hover:bg-red-950/40 hover:border-red-500/50 hover:text-red-400 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]' },
  { id: 'NOT_GUILTY', label: '🟢 NOT GUILTY', style: 'hover:bg-emerald-950/40 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]' },
  { id: 'BOTH_CLOWNS', label: '🤡 BOTH CLOWNS', style: 'hover:bg-amber-950/40 hover:border-amber-500/50 hover:text-amber-400 hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]' },
  { id: 'NEEDS_THERAPY', label: '💀 NEEDS THERAPY', style: 'hover:bg-purple-950/40 hover:border-purple-500/50 hover:text-purple-400 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]' }
];

export default function VoteButtons({ caseId, currentCounts }: { caseId: string, currentCounts: any }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [counts, setCounts] = useState(currentCounts);

  useEffect(() => {
    if (localStorage.getItem(`voted_${caseId}`)) setHasVoted(true);
  }, [caseId]);

  const handleVote = async (type: string) => {
    if (hasVoted) return;
    
    setCounts((prev: any) => ({ ...prev, [type]: prev[type] + 1 }));
    setHasVoted(true);
    localStorage.setItem(`voted_${caseId}`, 'true');

    const fp = navigator.userAgent.replace(/\D+/g, "") + new Date().getDate();

    await supabase.from('votes').insert({
      case_id: caseId,
      vote_type: type,
      fingerprint: fp
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {OPTIONS.map(opt => (
        <motion.button
          whileHover={!hasVoted ? { scale: 1.03 } : {}}
          whileTap={!hasVoted ? { scale: 0.98 } : {}}
          key={opt.id}
          disabled={hasVoted}
          onClick={() => handleVote(opt.id)}
          className={`relative p-5 rounded-xl font-bold text-lg border-2 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center ${
            hasVoted 
              ? 'bg-zinc-950 border-zinc-900 text-zinc-600 opacity-80 cursor-default' 
              : `bg-zinc-900 border-zinc-800 text-zinc-300 ${opt.style}`
          }`}
        >
          <span className="relative z-10">{opt.label}</span>
          
          <AnimatePresence>
            {hasVoted && (
              <motion.span 
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                className="block text-sm font-normal mt-2 text-zinc-400"
              >
                {counts[opt.id]} votes
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}