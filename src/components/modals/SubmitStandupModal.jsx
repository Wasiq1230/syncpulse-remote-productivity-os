import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, MessageSquareQuote } from 'lucide-react';

export default function SubmitStandupModal() {
  const { isStandupModalOpen, setIsStandupModalOpen, addStandup } = useApp();
  const [yesterday, setYesterday] = useState('');
  const [today, setToday] = useState('');
  const [blockers, setBlockers] = useState('None');
  const [mood, setMood] = useState('⚡ High Momentum');

  if (!isStandupModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!today.trim()) return;

    addStandup({
      author: 'Oliver Wright',
      role: 'Frontend Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      yesterday: yesterday || 'Completed sprint task reviews and aligned on API schemas.',
      today,
      blockers: blockers || 'None.',
      mood,
      aiKeyTakeaway: `Frontend architecture progressing smoothly. Focus on ${today.slice(0, 30)}...`
    });

    setIsStandupModalOpen(false);
    alert('✨ Standup published and AI digest synthesized!');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl glass-card border border-purple-500/40 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <MessageSquareQuote className="w-4 h-4 text-purple-400" />
            <span>Post Today's Async Standup</span>
          </h3>
          <button onClick={() => setIsStandupModalOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Today's Focus (What will you ship?)</label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Completing Pomodoro Web Audio synthesizer and Timezone overlap slider..."
              value={today}
              onChange={(e) => setToday(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Yesterday Accomplished</label>
            <textarea
              rows={2}
              placeholder="e.g. Merged 3 PRs and reviewed Design System 3.0 tokens."
              value={yesterday}
              onChange={(e) => setYesterday(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Blockers / External Needs</label>
              <input
                type="text"
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                placeholder="None or specific blocker"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Current Mood / Energy</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="⚡ High Momentum">⚡ High Momentum</option>
                <option value="🎯 Deep Focus">🎯 Deep Focus</option>
                <option value="☕ Steady Flow">☕ Steady Flow</option>
                <option value="🧘 Recharging">🧘 Recharging</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={() => setIsStandupModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-purple-600/30"
            >
              Post & Synthesize AI Digest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
