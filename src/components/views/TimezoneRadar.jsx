import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Clock, Sun, Moon, Zap, Users, MessageSquare, Mic, Sparkles, Filter } from 'lucide-react';

export default function TimezoneRadar() {
  const { teamMembers, setIsHuddleDrawerOpen } = useApp();
  const [sliderHour, setSliderHour] = useState(16); // 16:00 UTC default

  // Calculate local time for each member given UTC slider hour
  const timezonesInfo = [
    { city: 'San Francisco', tz: 'UTC-7', offset: -7, flag: '🇺🇸' },
    { city: 'London', tz: 'UTC+1', offset: 1, flag: '🇬🇧' },
    { city: 'Berlin', tz: 'UTC+2', offset: 2, flag: '🇩🇪' },
    { city: 'Dubai', tz: 'UTC+4', offset: 4, flag: '🇦🇪' },
    { city: 'Tokyo', tz: 'UTC+9', offset: 9, flag: '🇯🇵' },
    { city: 'Sydney', tz: 'UTC+10', offset: 10, flag: '🇦🇺' }
  ];

  const formatHour = (utcH, offset) => {
    let local = (utcH + offset + 24) % 24;
    return `${local.toString().padStart(2, '0')}:00`;
  };

  const getStatusForHour = (utcH, offset) => {
    let local = (utcH + offset + 24) % 24;
    if (local >= 9 && local <= 18) return { status: 'Working Hours', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (local >= 19 && local <= 22) return { status: 'Evening Flex', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    return { status: 'Off-hours / Sleep', color: 'text-slate-500 bg-slate-800/40 border-slate-700/40' };
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2.5">
            <Globe className="w-6 h-6 text-indigo-400" />
            <span>Global Timezone & Availability Radar</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate future meeting hours, identify optimal team overlap windows, and prevent after-hours burnout.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSliderHour(16)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold hover:bg-indigo-600/30 transition-all"
          >
            ✨ Jump to Golden Overlap (16:00 UTC)
          </button>
        </div>
      </div>

      {/* Interactive Overlap Time Slider Bar */}
      <div className="p-6 rounded-3xl glass-card border border-indigo-500/30 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Simulate Universal Time (UTC)</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-white font-mono">{sliderHour.toString().padStart(2, '0')}:00 UTC</span>
              <span className="text-xs font-semibold text-emerald-400">Optimal Collaboration Window</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Working (9-18)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ml-2" />
            <span>Evening (19-22)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600 ml-2" />
            <span>Sleeping</span>
          </div>
        </div>

        {/* 24-Hour Interactive Range Slider */}
        <div className="space-y-2">
          <input 
            type="range" 
            min="0" 
            max="23" 
            value={sliderHour}
            onChange={(e) => setSliderHour(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span className="text-indigo-400 font-bold">16:00 (Overlap)</span>
            <span>20:00</span>
            <span>23:00</span>
          </div>
        </div>

        {/* Visual Matrix across all hubs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {timezonesInfo.map((tz, i) => {
            const status = getStatusForHour(sliderHour, tz.offset);
            const time = formatHour(sliderHour, tz.offset);
            return (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                <span className="text-xl">{tz.flag}</span>
                <p className="text-xs font-bold text-slate-200">{tz.city}</p>
                <p className="text-sm font-mono font-extrabold text-white">{time}</p>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${status.color}`}>
                  {status.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Teammates Detailed Availability Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center justify-between">
          <span>Distributed Team Live Roster</span>
          <span className="text-xs text-slate-400 font-normal">{teamMembers.length} team members across 6 global hubs</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((m) => (
            <div 
              key={m.id}
              className="p-5 rounded-3xl glass-card border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-4 relative group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/30" />
                    <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-[#090D16] ${
                      m.status === 'online' ? 'bg-emerald-400' :
                      m.status === 'deep_work' ? 'bg-indigo-400' :
                      m.status === 'in_meeting' ? 'bg-amber-400' : 'bg-slate-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{m.name}</h3>
                    <p className="text-xs text-slate-400">{m.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-indigo-300">{m.currentLocalTime}</span>
                  <span className="block text-[10px] text-slate-500">{m.location}</span>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/60 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">Current Focus</span>
                <p className="text-slate-300 font-medium">{m.statusText}</p>
              </div>

              {/* Overlap & Quick Actions */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[11px] text-slate-400">Overlap: <strong className="text-slate-300">{m.overlapWindow}</strong></span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => alert(`Sent async ping notification to ${m.name}`)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors" 
                    title="Send Async Ping"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setIsHuddleDrawerOpen(true)}
                    className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors" 
                    title="Start 5-min Huddle"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
