import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquareQuote, Sparkles, AlertCircle, CheckCircle2, 
  Smile, Share2, Plus, Calendar, Filter, Heart, Flame, ThumbsUp
} from 'lucide-react';

export default function AsyncStandups() {
  const { standups, setIsStandupModalOpen } = useApp();
  const [filterTag, setFilterTag] = useState('all');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2.5">
            <MessageSquareQuote className="w-6 h-6 text-purple-400" />
            <span>Async Standups & AI Daily Digest</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Zero-meeting asynchronous check-ins synthesized automatically with AI executive summaries and blocker radars.
          </p>
        </div>

        <button
          onClick={() => setIsStandupModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition-all transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Post My Standup</span>
        </button>
      </div>

      {/* AI Synthesized Blocker & Takeaway Radar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 glass-card space-y-4 shadow-xl">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-purple-200">AI Daily Synthesis & Blocker Radar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-emerald-400">Team Velocity & Highlights</span>
            <p className="text-slate-300 leading-relaxed font-light">
              Design system components finalized. WebSocket benchmark completed handling 10k connections with &lt;12ms latency.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-rose-400 flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Active Blocker (1)</span>
            </span>
            <p className="text-slate-300 leading-relaxed font-light">
              Marcus Vance requires DevOps/Security IAM role permissions for AWS staging canary deployment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-indigo-400">Recommended Next Action</span>
            <p className="text-slate-300 leading-relaxed font-light">
              Async code review on PR #482 recommended for Oliver Wright during 16:00 UTC overlap.
            </p>
          </div>
        </div>
      </div>

      {/* Standup Entries Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Today's Check-ins ({standups.length})</h2>
          <div className="flex items-center space-x-2 text-xs">
            <button className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 font-semibold">Today</button>
            <button className="px-3 py-1 rounded-xl text-slate-500 hover:text-slate-300">Yesterday</button>
          </div>
        </div>

        <div className="space-y-4">
          {standups.map((s) => (
            <div 
              key={s.id}
              className="p-6 rounded-3xl glass-card border border-slate-800/80 hover:border-purple-500/30 transition-all space-y-4"
            >
              {/* Top author row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img src={s.avatar} alt={s.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/30" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-white">{s.author}</h3>
                      <span className="text-[11px] text-slate-400">• {s.role}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{s.timeAgo}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                  {s.mood}
                </span>
              </div>

              {/* 3 Core Questions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Yesterday Accomplished</span>
                  <p className="text-slate-300 leading-relaxed">{s.yesterday}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-400 block">Today's Focus</span>
                  <p className="text-slate-200 leading-relaxed font-medium">{s.today}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-rose-400 block">Blockers</span>
                  <p className="text-slate-300 leading-relaxed">{s.blockers}</p>
                </div>
              </div>

              {/* AI Key Takeaway Banner */}
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs text-purple-200">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span><strong>AI Synthesis:</strong> {s.aiKeyTakeaway}</span>
                </div>
              </div>

              {/* Bottom reactions */}
              <div className="flex items-center space-x-2 pt-1">
                {Object.entries(s.reactions || {}).map(([emoji, count], i) => (
                  <button 
                    key={i}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-300 transition-colors"
                  >
                    <span>{emoji}</span>
                    <span className="font-bold text-[11px]">{count}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
