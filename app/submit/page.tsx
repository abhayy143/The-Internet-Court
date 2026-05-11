"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function SubmitCase() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const story = formData.get('story') as string;
    
    const { data, error } = await supabase
      .from('cases')
      .insert([{ title, category, story }])
      .select()
      .single();

    if (error) {
      alert("Error submitting case. Make sure your database tables are set up!");
      console.error(error);
      setLoading(false);
    } else {
      // Success! Redirect to the new case page
      router.push(`/case/${data.id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-zinc-900 border border-zinc-800 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-black mb-6 text-white">File a New Case</h1>
      <p className="text-zinc-400 mb-6">State your case clearly. The jury is unforgiving.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-bold text-zinc-400 mb-2 block">Case Title</label>
          <Input 
            name="title" 
            required 
            placeholder="e.g., My roommate ate my leftover pizza" 
            className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600" 
          />
        </div>
        
        <div>
          <label className="text-sm font-bold text-zinc-400 mb-2 block">Category</label>
          <select 
            name="category" 
            required 
            className="w-full p-3 rounded-md bg-zinc-950 border border-zinc-800 text-white focus:ring-2 focus:ring-zinc-600 outline-none"
          >
            <option value="Relationship">Relationship</option>
            <option value="Work">Work</option>
            <option value="Family">Family</option>
            <option value="Money">Money</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm font-bold text-zinc-400 mb-2 block">The Story</label>
          <Textarea 
            name="story" 
            required 
            placeholder="Tell us everything..." 
            className="h-48 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600" 
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-300 font-bold py-6 text-lg"
        >
          {loading ? "Filing Case..." : "Submit to the Jury"}
        </Button>
      </form>
    </div>
  );
}