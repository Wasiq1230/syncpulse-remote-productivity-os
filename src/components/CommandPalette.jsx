import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Globe, Zap, MessageSquareQuote, KanbanSquare, HeartPulse, Sliders, CheckCircle2, User, Mic } from 'lucide-react';

export default function CommandPalette() {
  const { 
    isCommandPaletteOpen, setIsCommandPaletteOpen, setActiveView,
    teamMembers, tasks, setIsNewTaskModalOpen, setIsStandupModalOpen, setIsHuddleDrawerOpen
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  const actions = [
    { label: 'Jump to Pulse Overview', icon: Zap, action: () => { setActiveView('overview'); setIsCommandPaletteOpen(false); } },
    { label: 'View Global Timezone Overlap Radar', icon: Globe, action: () => { setActiveView('timezone'); setIsCommandPaletteOpen(false); } },
    { label: 'Start Pomodoro / Deep Work Focus Session', icon: Zap, action: () => { setActiveView('focus'); setIsCommandPaletteOpen(false); } },
    { label: "Post Today's Async Standup Check-in", icon: MessageSquareQuote, action: () => { setIsStandupModalOpen(true); setIsCommandPaletteOpen(false); } },
    { label: 'Create New Sprint Task', icon: KanbanSquare, action: () => { setIsNewTaskModalOpen(true); setIsCommandPaletteOpen(false); } },
    { label: 'Open Team Voice Huddle Room', icon: Mic, action: () => { setIsHuddleDrawerOpen(true); setIsCommandPaletteOpen(false); } },
    { label: 'Check Team Wellbeing & Meeting Load Gauge', icon: HeartPulse, action: () => { setActiveView('wellbeing'); setIsCommandPaletteOpen(false); } },
    { label: 'Manage Slack / GitHub / Linear Integrations', icon: Sliders, action: () => { setActiveView('integrations'); setIsCommandPaletteOpen(false); } }
  ];

  const filteredActions = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));
  const filteredMembers = teamMembers.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.role.toLowerCase().includes(query.toLowerCase()));
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-xl rounded-2xl glass-card border border-indigo-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search input header */}
        <div className="flex items-center px-4 border-b border-slate-800/80 bg-slate-900/80">
          <Search className="w-4 h-4 text-indigo-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command, search teammate, or query sprint task..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-3.5 bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded font-mono border border-slate-700">ESC</kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4 text-xs">
          {/* Quick Actions */}
          {filteredActions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Commands</span>
              <div className="mt-1 space-y-0.5">
                {filteredActions.map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={i}
                      onClick={act.action}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-indigo-600/20 hover:text-indigo-300 text-slate-300 transition-colors text-left group"
                    >
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                      <span className="font-medium">{act.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Team Members */}
          {filteredMembers.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Team Members</span>
              <div className="mt-1 space-y-0.5">
                {filteredMembers.map(m => (
                  <div
                    key={m.id}
                    onClick={() => { setActiveView('timezone'); setIsCommandPaletteOpen(false); }}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800/60 cursor-pointer text-slate-300"
                  >
                    <div className="flex items-center space-x-2.5">
                      <img src={m.avatar} alt={m.name} className="w-5 h-5 rounded-full object-cover" />
                      <div>
                        <span className="font-semibold text-slate-200">{m.name}</span>
                        <span className="text-slate-400 text-[11px] ml-2">• {m.role}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-indigo-400">{m.currentLocalTime} ({m.location.split(' ')[0]})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sprint Tasks */}
          {filteredTasks.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Tasks</span>
              <div className="mt-1 space-y-0.5">
                {filteredTasks.map(t => (
                  <div
                    key={t.id}
                    onClick={() => { setActiveView('kanban'); setIsCommandPaletteOpen(false); }}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800/60 cursor-pointer text-slate-300"
                  >
                    <span className="truncate max-w-[340px] text-slate-200">{t.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-mono">{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
