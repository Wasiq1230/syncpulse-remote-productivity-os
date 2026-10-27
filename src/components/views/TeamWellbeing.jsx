import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeartPulse, Shield, Moon, Clock, Flame, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TeamWellbeing() {
  const { teamMembers } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2.5">
          <HeartPulse className="w-6 h-6 text-rose-400" />
          <span>Team Wellbeing & Burnout Shield</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor workload equilibrium, prevent out-of-hours alert fatigue, and protect dedicated deep work capacity.
        </p>
      </div>

      {/* 3 Overview Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gauge 1: Meeting vs Deep Work Ratio */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Meeting Load Index</span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-bold">Optimal Zone</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white font-bold">14% Total Meeting Time</span>
              <span className="text-slate-400">Target &lt; 20%</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full w-[14%]" title="Meetings" />
              <div className="bg-indigo-500 h-full w-[72%]" title="Deep Work" />
              <div className="bg-purple-500 h-full w-[14%]" title="Async Sync" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Meetings (14%)</span>
              <span>Deep Work (72%)</span>
              <span>Async (14%)</span>
            </div>
          </div>
        </div>

        {/* Gauge 2: After-Hours Notification Shield */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notification Shield</span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-[11px] font-bold">Active</span>
          </div>

          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white font-mono">100%</span>
              <span className="text-xs text-slate-400">Quiet hours respected</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Zero after-hours Slack & email pings sent to teammates in Tokyo & Sydney during local midnight hours.
            </p>
          </div>
        </div>

        {/* Gauge 3: Recovery & Weekend Energy Index */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Team Energy Score</span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 text-[11px] font-bold">92 / 100</span>
          </div>

          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white font-mono">High Flow</span>
              <span className="text-xs text-emerald-400">+4 pts vs last sprint</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Low context-switching penalty recorded across all engineering subteams this week.
            </p>
          </div>
        </div>
      </div>

      {/* Teammate Individual Load Table */}
      <div className="p-6 rounded-3xl glass-card space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white">Teammate Workload & Recovery Balance</h3>

        <div className="divide-y divide-slate-800/80">
          {teamMembers.map((m) => (
            <div key={m.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-3">
                <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-slate-200">{m.name}</p>
                  <p className="text-[11px] text-slate-400">{m.role} • {m.location.split(' ')[0]}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Daily Focus</span>
                  <span className="font-mono font-bold text-white">{m.todayHoursLogged}h</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Energy</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    m.energy === 'high' ? 'bg-emerald-500/20 text-emerald-300' :
                    m.energy === 'medium' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {m.energy}
                  </span>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] text-slate-500 uppercase block">Quiet Mode</span>
                  <span className="text-[11px] text-slate-400">Starts 19:00 local</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
