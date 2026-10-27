import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, Bell, Sun, Moon, Zap, Mic, Radio, ChevronDown, CheckCircle2,
  Clock, ShieldAlert, Sparkles, User
} from 'lucide-react';

export default function Navbar() {
  const { 
    theme, toggleTheme, setIsCommandPaletteOpen, huddle, setIsHuddleDrawerOpen,
    isFocusRunning, focusTime, notifications, setIsNewTaskModalOpen, setIsStandupModalOpen
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-16 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-[#090D16]/90 dark:bg-[#090D16]/90 light:bg-white/90 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between transition-colors">
      {/* Left: Workspace selector & Command palette search */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-center space-x-1.5 font-semibold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
              <span>Acme Distributed OS</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Core Platform • 12 Active</p>
          </div>
        </div>

        {/* Global Search / Command palette trigger */}
        <button 
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden md:flex items-center space-x-3 px-3.5 py-1.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-700/50 dark:border-slate-800 light:border-slate-200 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all w-64 justify-between shadow-inner"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search team, tasks, radar...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 rounded font-mono border border-slate-700/60 light:border-slate-300">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Center: Live Focus Status & Audio Huddle Pill */}
      <div className="hidden lg:flex items-center space-x-3">
        {/* Deep work timer badge */}
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
          isFocusRunning 
            ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 animate-pulse-slow'
            : 'bg-slate-800/40 border-slate-700/40 text-slate-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isFocusRunning ? 'bg-indigo-400 animate-ping' : 'bg-slate-500'}`} />
          <span>{isFocusRunning ? `Deep Work • ${formatTimer(focusTime)} left` : 'Deep Work Idle'}</span>
        </div>

        {/* Live Audio Huddle Room */}
        {huddle.isActive && (
          <button 
            onClick={() => setIsHuddleDrawerOpen(true)}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-medium transition-all group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Mic className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="truncate max-w-[140px]">{huddle.title}</span>
            <span className="px-1.5 py-0.2 bg-emerald-500/20 rounded text-[10px] text-emerald-200">
              {huddle.participants.length} live
            </span>
          </button>
        )}
      </div>

      {/* Right: Quick actions, notifications, theme & profile */}
      <div className="flex items-center space-x-3">
        {/* Quick action buttons */}
        <button
          onClick={() => setIsStandupModalOpen(true)}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Post Standup</span>
        </button>

        <button
          onClick={() => setIsNewTaskModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all transform active:scale-95"
        >
          <span>+ New Task</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-slate-700/50 light:border-slate-200 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-300 hover:text-white border border-slate-700/50 light:border-slate-200 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#090D16]" />
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-card border border-slate-700/80 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-200">Notifications & Alerts</span>
                <span className="text-[10px] text-indigo-400 hover:underline cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto mt-2">
                {notifications.map(n => (
                  <div key={n.id} className="py-2.5 flex items-start space-x-3 text-xs">
                    <div className={`mt-0.5 p-1 rounded-full ${n.type === 'ai' ? 'bg-purple-500/20 text-purple-400' : (n.type === 'alert' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400')}`}>
                      <Zap className="w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 font-medium leading-snug">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User profile avatar */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 pl-2 cursor-pointer focus:outline-none"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
              alt="Avatar"
              className="w-8 h-8 rounded-full ring-2 ring-indigo-500/40 object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
