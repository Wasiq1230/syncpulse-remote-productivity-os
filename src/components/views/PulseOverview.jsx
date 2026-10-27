import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, Clock, Globe, ArrowUpRight, CheckCircle2, AlertCircle, 
  Flame, MessageSquareQuote, Play, Sparkles, Shield, User, ChevronRight, Mic
} from 'lucide-react';

export default function PulseOverview() {
  const { 
    teamMembers, tasks, standups, setActiveView, 
    setIsFocusRunning, isFocusRunning, setIsStandupModalOpen, setIsNewTaskModalOpen,
    huddle, setIsHuddleDrawerOpen, focusStreakDays, todayFocusSeconds
  } = useApp();

  const totalSprintTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const blockedTasks = tasks.filter(t => t.blocker);
  const activeFocusMembers = teamMembers.filter(m => m.status === 'deep_work');
  const onlineMembers = teamMembers.filter(m => m.status === 'online');

  const formatHours = (secs) => (secs / 3600).toFixed(1);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Hero: AI Daily Executive Pulse Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/80 border border-indigo-500/30 glass-card relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Distributed Pulse Digest</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">Updated 12m ago</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Team momentum is <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Peak Velocity (88%)</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Global team has logged <strong className="text-emerald-300">28.4 hours of Deep Work</strong> today. Next golden collaboration overlap begins at <strong className="text-indigo-300">16:00 UTC</strong> across SF, London & Berlin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveView('focus')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all transform active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current text-amber-300" />
              <span>{isFocusRunning ? 'View Focus Lab' : 'Start Focus Timer'}</span>
            </button>
            <button
              onClick={() => setIsStandupModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white text-xs font-semibold transition-all"
            >
              <MessageSquareQuote className="w-4 h-4 text-indigo-400" />
              <span>Share Standup</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Team Deep Work */}
        <div 
          onClick={() => setActiveView('focus')}
          className="p-5 rounded-2xl glass-card hover:border-indigo-500/40 cursor-pointer transition-all duration-200 group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Deep Work Today</span>
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white tracking-tight">{formatHours(todayFocusSeconds)}h</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">+18% vs avg</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{activeFocusMembers.length} teammates currently in Do-Not-Disturb</p>
        </div>

        {/* Card 2: Golden Hour Overlap */}
        <div 
          onClick={() => setActiveView('timezone')}
          className="p-5 rounded-2xl glass-card hover:border-emerald-500/40 cursor-pointer transition-all duration-200 group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Timezone Overlap</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:scale-110 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white tracking-tight">4.5 hrs</span>
            <span className="text-xs font-semibold text-indigo-300">Golden Window</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">4 of 6 zones available for live sync</p>
        </div>

        {/* Card 3: Sprint Velocity */}
        <div 
          onClick={() => setActiveView('kanban')}
          className="p-5 rounded-2xl glass-card hover:border-purple-500/40 cursor-pointer transition-all duration-200 group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Sprint Progress</span>
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white tracking-tight">{doneTasks}/{totalSprintTasks}</span>
            <span className="text-xs font-semibold text-emerald-400">60% Complete</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full w-3/5" />
          </div>
        </div>

        {/* Card 4: Focus Streak & Wellbeing */}
        <div 
          onClick={() => setActiveView('wellbeing')}
          className="p-5 rounded-2xl glass-card hover:border-amber-500/40 cursor-pointer transition-all duration-200 group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Team Energy & Shield</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white tracking-tight">{focusStreakDays} Days</span>
            <span className="text-xs font-semibold text-amber-300">Streak Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Meeting load at 14% (Optimal focus zone)</p>
        </div>
      </div>

      {/* Main Grid: Team Live Radar & AI Standup Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Team Radar Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl glass-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>Global Teammate Radar</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h2>
                <p className="text-xs text-slate-400">Live availability, current focus mode, and local time</p>
              </div>
              <button
                onClick={() => setActiveView('timezone')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>Full Radar View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Teammate presence rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teamMembers.map((m) => (
                <div 
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className="relative">
                      <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800" />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-[#090D16] ${
                        m.status === 'online' ? 'bg-emerald-400' :
                        m.status === 'deep_work' ? 'bg-indigo-400' :
                        m.status === 'in_meeting' ? 'bg-amber-400' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors truncate">{m.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{m.statusText}</p>
                    </div>
                  </div>

                  <div className="text-right pl-2">
                    <span className="text-xs font-mono font-bold text-slate-300">{m.currentLocalTime}</span>
                    <span className="block text-[10px] text-slate-500 uppercase">{m.location.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Sprint Highlights & Blockers */}
          <div className="p-6 rounded-3xl glass-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Active Sprint Priorities</h3>
                <p className="text-xs text-slate-400">High-impact tasks requiring deep work focus</p>
              </div>
              <button
                onClick={() => setActiveView('kanban')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>Kanban Board</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {tasks.slice(0, 3).map((t) => (
                <div 
                  key={t.id}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-4 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className={`w-2 h-2 rounded-full ${t.priority === 'urgent' ? 'bg-rose-500' : 'bg-amber-400'}`} />
                    <div className="truncate">
                      <p className="text-xs font-medium text-slate-200 truncate">{t.title}</p>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">{t.category}</span>
                        {t.blocker && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold flex items-center space-x-1">
                            <AlertCircle className="w-3 h-3 text-rose-400" />
                            <span>Blocked</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 uppercase text-[10px]">
                    {t.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Async Standups & Audio Huddle Room */}
        <div className="space-y-6">
          {/* Active Audio Huddle Quick Widget */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 glass-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                <Mic className="w-3.5 h-3.5" />
                <span>Live Audio Huddle</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                14m in progress
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">{huddle.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">Quick 5-min spontaneous drop-in room</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="flex -space-x-2 overflow-hidden">
                {huddle.participants.map((p, i) => (
                  <img 
                    key={i} 
                    src={p.avatar} 
                    alt={p.name} 
                    className={`w-8 h-8 rounded-full ring-2 ${p.isSpeaking ? 'ring-emerald-400 animate-pulse' : 'ring-slate-900'} object-cover`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setIsHuddleDrawerOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
              >
                Join Voice
              </button>
            </div>
          </div>

          {/* Daily Standups Feed */}
          <div className="p-5 rounded-3xl glass-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <MessageSquareQuote className="w-4 h-4 text-indigo-400" />
                <span>Today's Async Standups</span>
              </h3>
              <button 
                onClick={() => setActiveView('standups')}
                className="text-xs text-indigo-400 hover:underline"
              >
                All ({standups.length})
              </button>
            </div>

            <div className="space-y-3">
              {standups.slice(0, 2).map((s) => (
                <div key={s.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img src={s.avatar} alt={s.author} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs font-bold text-slate-200">{s.author.split(' ')[0]}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{s.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{s.today}</p>
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200">
                    ✨ <strong>AI Digest:</strong> {s.aiKeyTakeaway}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
