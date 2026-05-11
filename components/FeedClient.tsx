"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedClient({ initialCases }: { initialCases: any[] }) {
  const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'JUDGED'>('ALL');

  const filteredCases = initialCases.filter((c) => {
    const hasVerdict = c.verdicts && Array.isArray(c.verdicts) ? c.verdicts.length > 0 : !!c.verdicts;
    if (filter === 'OPEN') return !hasVerdict;
    if (filter === 'JUDGED') return hasVerdict;
    return true; 
  });

  return (
    <div className="space-y-6">
      {/* 🎛️ Filter Tabs */}
      <div className="flex gap-2 p-1 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-lg w-fit mx-auto md:mx-0 shadow-xl">
        <button 
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === 'ALL' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          All Cases
        </button>
        <button 
          onClick={() => setFilter('OPEN')}
          className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === 'OPEN' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          ⚖️ Open for Voting
        </button>
        <button 
          onClick={() => setFilter('JUDGED')}
          className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === 'JUDGED' ? 'bg-amber-900/40 text-amber-500 shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          🔨 Judged
        </button>
      </div>

      {/* 🗂️ The Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredCases.map((c, index) => {
            const hasVerdict = c.verdicts && Array.isArray(c.verdicts) ? c.verdicts.length > 0 : !!c.verdicts;

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.01 }}
                key={c.id}
              >
                <Link href={`/case/${c.id}`} className="block h-full">
                  <Card className={`relative overflow-hidden p-6 bg-zinc-950/80 backdrop-blur-sm border transition-all duration-300 h-full flex flex-col justify-between group ${
                    hasVerdict ? 'border-amber-900/40 hover:border-amber-500/60 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]' 
                    : 'border-zinc-800 hover:border-zinc-500 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]'
                  }`}>
                    
                    {/* Animated gradient background reveal on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <span className="text-xs font-black text-amber-500 tracking-widest">{c.category}</span>
                      <h3 className="text-2xl font-black mt-2 text-zinc-100 leading-tight group-hover:text-white transition-colors">{c.title}</h3>
                      <p className="text-zinc-400 mt-3 line-clamp-3 text-sm leading-relaxed">{c.story}</p>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between relative z-10 border-t border-zinc-800/50 pt-4">
                      <div className={`text-xs font-black tracking-widest flex items-center gap-2 ${hasVerdict ? 'text-amber-500' : 'text-zinc-500'}`}>
                        {hasVerdict ? (
                          <><span className="animate-pulse">🔨</span> VERDICT REACHED</>
                        ) : (
                          <><span>⚖️</span> OPEN FOR VOTING</>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 font-bold bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
                        {c.votes?.[0]?.count || 0} Votes
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredCases.length === 0 && (
        <div className="text-center py-20 text-zinc-500 font-bold animate-in fade-in">
          No cases found in this category.
        </div>
      )}
    </div>
  );
}