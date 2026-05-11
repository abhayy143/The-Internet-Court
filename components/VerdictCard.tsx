"use client";
import { Verdict } from '@/lib/types';
import { generateShareCard } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function VerdictCard({ caseTitle, verdict }: { caseTitle: string, verdict: Verdict }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 bg-zinc-950 border-2 border-amber-600 rounded-xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 to-red-600" />
      <h2 className="text-3xl font-black text-center mb-6 uppercase tracking-widest text-zinc-100">Official Verdict</h2>
      
      <div className="space-y-6 text-zinc-300">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <span className="font-bold">Guilty Party:</span>
          <span className="text-red-500 font-black text-xl">{verdict.guilty_party}</span>
        </div>
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <span className="font-bold">Blame Split:</span>
          <span className="text-amber-500 font-bold">{verdict.blame_split}</span>
        </div>
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <span className="font-bold">Toxicity / Red Flags:</span>
          <span>☠️ {verdict.toxicity_score}/100 | 🚩 {verdict.red_flag_count}</span>
        </div>
        
        <div className="pt-4">
          <p className="italic leading-relaxed font-serif text-lg text-zinc-400 border-l-4 border-zinc-700 pl-4">
            &quot;{verdict.verdict_text}&quot;
          </p>
        </div>

        <div className="bg-red-950/30 p-4 rounded-lg border border-red-900">
          <span className="text-red-500 font-bold block mb-1">THE SENTENCE:</span>
          <span className="text-white font-medium">{verdict.sentence}</span>
        </div>

        <button 
          onClick={() => generateShareCard(caseTitle, verdict)}
          className="w-full mt-6 py-4 bg-zinc-100 text-zinc-900 font-black rounded-lg hover:bg-white transition"
        >
          📸 DOWNLOAD SHAREABLE VERDICT CARD
        </button>
      </div>
    </motion.div>
  );
}