"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'dev123';

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    const pw = prompt("Admin Password:");
    if (pw === ADMIN_SECRET) {
      setAuth(true);
      fetchPending();
    }
  }, []);

  const fetchPending = async () => {
    const { data } = await supabase
      .from('cases')
      .select('*, verdicts(id)')
      .order('created_at', { ascending: false });
    
    // THE FIX: Safely check if verdicts is null or an empty array
    setCases(data?.filter(c => !c.verdicts || (Array.isArray(c.verdicts) && c.verdicts.length === 0)) || []);
  };

  const generatePrompt = (c: any) => {
    const prompt = `You are the Internet Judge. Read this case:
TITLE: ${c.title}
STORY: ${c.story}

Respond ONLY with a JSON object in this exact format:
{
  "guilty_party": "Name or 'Both'",
  "blame_split": "e.g., 80% OP / 20% Partner",
  "toxicity_score": number between 1-100,
  "red_flag_count": number,
  "sentence": "A funny, brutal one-liner punishment",
  "verdict_text": "A 1-paragraph savage breakdown of why they are wrong."
}`;
    navigator.clipboard.writeText(prompt);
    alert("Prompt copied to clipboard! Paste into Gemini.");
  };

  const handleVerdictSubmit = async (e: React.FormEvent, caseId: string) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const jsonStr = fd.get('verdict_json') as string;
    
    try {
      const parsed = JSON.parse(jsonStr);
      await supabase.from('verdicts').insert({ case_id: caseId, ...parsed });
      alert("Verdict Published!");
      fetchPending(); // Refresh the list
    } catch (err) {
      alert("Invalid JSON format. Check your brackets!");
    }
  };

  if (!auth) return <div className="h-screen flex items-center justify-center text-zinc-500">Unauthorized</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black text-white">Admin: Pending Cases</h1>
      {cases.length === 0 && (
        <p className="text-zinc-500">No pending cases. The docket is clear!</p>
      )}
      
      {cases.map(c => (
        <div key={c.id} className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-4">
          <h2 className="text-xl font-bold text-white">{c.title}</h2>
          <p className="text-sm text-zinc-400 line-clamp-3">{c.story}</p>
          
          <button 
            onClick={() => generatePrompt(c)}
            className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-900 rounded-md text-sm font-bold transition-colors"
          >
            📋 Copy AI Prompt
          </button>

          <form onSubmit={(e) => handleVerdictSubmit(e, c.id)} className="space-y-2 mt-4">
            <textarea 
              name="verdict_json" 
              placeholder="Paste AI JSON Output here..." 
              className="w-full h-48 bg-zinc-950 p-4 font-mono text-xs border border-zinc-700 rounded-md text-green-400 focus:outline-none focus:border-amber-500"
              required
            />
            <button type="submit" className="px-4 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-md font-bold text-sm w-full transition-colors">
              Drop the Gavel (Publish Verdict)
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}