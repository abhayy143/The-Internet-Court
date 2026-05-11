"use client";
import { Verdict } from '@/lib/types';
import { generateShareCard } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function VerdictCard({ caseTitle, verdict }: { caseTitle: string, verdict: Verdict }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.2, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", damping: 14, stiffness: 100 }}
      className="p-8 md:p-10 bg-[#0a0a0a] border border-amber-900/50 shadow-[0_0_50px_-12px_rgba(245,158,11,0.15)] rounded-2xl relative overflow-hidden group"
    >
      {/* Animated glowing top border */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-800 via-red-600 to-amber-800 bg-[length:200%_100%] animate-pulse" />
      
      {/* Background watermark */}
      <div className="absolute -right-10 -bottom-20 text-[200px] opacity-[0.03] pointer-events-none transform -rotate-12 select-none">
        ⚖️
      </div>

      <div className="relative z-10 space-y-6">
        <h2 className="text-3xl font-black text-center mb-8 uppercase tracking-[0.2em] text-zinc-100 drop-shadow-md">Official Verdict</h2>
        
        <div className="space-y-6 text-zinc-300">
          <div className="flex justify-between items-center border-b border-zinc-800/50 pb-4">
            <span className="font-bold text-zinc-500 tracking-wider text-sm uppercase">Guilty Party:</span>
            <span className="text-red-500 font-black text-2xl drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">{verdict.guilty_party}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-zinc-800/50 pb-4">
            <span className="font-bold text-zinc-500 tracking-wider text-sm uppercase">Blame Split:</span>
            <span className="text-amber-500 font-bold text-lg">{verdict.blame_split}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-zinc-800/50 pb-4">
            <span className="font-bold text-zinc-500 tracking-wider text-sm uppercase">Toxicity / Red Flags:</span>
            <span className="font-mono text-lg text-zinc-100">☠️ {verdict.toxicity_score}/100 <span className="mx-2 text-zinc-700">|</span> 🚩 {verdict.red_flag_count}</span>
          </div>
          
          <div className="pt-6">
            <p className="italic leading-relaxed font-serif text-xl text-zinc-300 border-l-4 border-amber-600/50 pl-6 py-2 bg-gradient-to-r from-zinc-900/50 to-transparent">
              &quot;{verdict.verdict_text}&quot;
            </p>
          </div>

          <div className="mt-8 bg-red-950/20 p-6 rounded-xl border border-red-900/30 backdrop-blur-sm">
            <span className="text-red-500 font-black tracking-widest text-sm block mb-2">THE SENTENCE:</span>
            <span className="text-white font-medium text-lg leading-snug">{verdict.sentence}</span>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => generateShareCard(caseTitle, verdict)}
            className="w-full mt-8 py-5 bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-950 font-black rounded-xl hover:from-white hover:to-zinc-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] text-lg tracking-wider uppercase"
          >
            📸 Download Shareable Card
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}