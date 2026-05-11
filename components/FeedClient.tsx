"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedClient({ initialCases }: { initialCases: any[] }) {
  const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'JUDGED'>('ALL');

  // Filter logic
  const filteredCases = initialCases.filter((c) => {
    // Check if the verdicts array exists and has at least one item
    const hasVerdict = c.verdicts && Array.isArray(c.verdicts) ? c.verdicts.length > 0 : !!c.verdicts;
    
    if (filter === 'OPEN') return !hasVerdict;
    if (filter === 'JUDGED') return hasVerdict;
    return true; // 'ALL'
  });

  return (
    <div className="space-y-6">
      {/* 🎛️ Filter Tabs */}
      <div className="flex gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-lg w-fit mx-auto md:mx-0">
        <button 
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === 'ALL' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          All Cases
        </button>
        <button 
          onClick={() => setFilter('OPEN')}
          className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === 'OPEN' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          ⚖️ Open for Voting
        </button>
        <button 
          onClick={() => setFilter('JUDGED')}
          className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === 'JUDGED' ? 'bg-amber-600/20 text-amber-500' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          🔨 Judged
        </button>
      </div>

      {/* 🗂️ The Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredCases.map((c) => {
            const hasVerdict = c.verdicts && Array.isArray(c.verdicts) ? c.verdicts.length > 0 : !!c.verdicts;

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={c.id}
              >
                <Link href={`/case/${c.id}`} className="block h-full">
                  <Card className={`p-6 bg-zinc-900 border transition-all h-full flex flex-col justify-between ${hasVerdict ? 'border-amber-900/50 hover:border-amber-700' : 'border-zinc-800 hover:border-zinc-600'}`}>
                    <div>
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{c.category}</span>
                      <h3 className="text-xl font-bold mt-2 text-zinc-100">{c.title}</h3>
                      <p className="text-zinc-400 mt-2 line-clamp-3 text-sm">{c.story}</p>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className={`text-xs font-black tracking-wide ${hasVerdict ? 'text-amber-500' : 'text-zinc-500'}`}>
                        {hasVerdict ? '🔨 VERDICT REACHED' : '⚖️ OPEN FOR VOTING'}
                      </div>
                      <div className="text-xs text-zinc-600 font-bold">
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
        <div className="text-center py-20 text-zinc-500 font-bold">
          No cases found in this category.
        </div>
      )}
    </div>
  );
}