import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, Globe, Zap, MessageSquareQuote, 
  KanbanSquare, HeartPulse, Sliders, ChevronRight,
  Headphones, Users2, Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const { activeView, setActiveView, teamMembers, huddle, setIsHuddleDrawerOpen } = useApp();

  const navItems = [
    { id: 'overview', label: 'Pulse Overview', icon: LayoutDashboard, badge: null },
    { id: 'timezone', label: 'Timezone Radar', icon: Globe, badge: 'Live' },
    { id: 'focus', label: 'Focus & Deep Work', icon: Zap, badge: 'Active' },
    { id: 'standups', label: 'Async Standups', icon: MessageSquareQuote, badge: '3 New' },
    { id: 'kanban', label: 'Sprint Kanban', icon: KanbanSquare, badge: null },
    { id: 'wellbeing', label: 'Burnout Shield', icon: HeartPulse, badge: '98%' },
    { id: 'integrations', label: 'Integrations', icon: Sliders, badge: null }
  ];

  const onlineCount = teamMembers.filter(m => m.status === 'online' || m.status === 'deep_work').length;

  return (
    <aside className="w-64 border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-[#090D16]/95 dark:bg-[#090D16]/95 light:bg-slate-50/95 flex flex-col justify-between p-4 sticky top-16 h-[calc(100vh-4rem)] z-20 select-none transition-colors">
      {/* Top Nav items */}
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
            Core Command
          </span>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-200/70'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold uppercase tracking-wider ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : (item.badge === 'Live' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Team Quick Presence */}
        <div className="pt-2 border-t border-slate-800/60">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Distributed Team
            </span>
            <span className="flex items-center space-x-1 text-[11px] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{onlineCount}/{teamMembers.length} Online</span>
            </span>
          </div>

          <div className="space-y-1.5 px-1 max-h-44 overflow-y-auto">
            {teamMembers.map(m => (
              <div 
                key={m.id} 
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-800/40 text-xs cursor-pointer group transition-colors"
                onClick={() => setActiveView('timezone')}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-[#090D16] ${
                      m.status === 'online' ? 'bg-emerald-400' :
                      m.status === 'deep_work' ? 'bg-indigo-400' :
                      m.status === 'in_meeting' ? 'bg-amber-400' : 'bg-slate-500'
                    }`} />
                  </div>
                  <div className="truncate max-w-[100px]">
                    <p className="text-slate-200 font-medium truncate leading-none">{m.name.split(' ')[0]}</p>
                    <span className="text-[10px] text-slate-400 leading-none">{m.location.split(' ')[0]}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-indigo-300">
                  {m.currentLocalTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Promo / AI Productivity Assistant Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center space-x-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-indigo-200">AI Daily Pulse</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          High focus momentum today across 4 zones. 0 critical blockers.
        </p>
      </div>
    </aside>
  );
}
