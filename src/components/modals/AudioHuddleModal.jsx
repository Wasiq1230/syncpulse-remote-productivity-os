import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mic, MicOff, Video, Share2, PhoneOff, Users, Sparkles, MessageSquare } from 'lucide-react';

export default function AudioHuddleModal() {
  const { isHuddleDrawerOpen, setIsHuddleDrawerOpen, huddle } = useApp();
  const [isMuted, setIsMuted] = useState(false);

  if (!isHuddleDrawerOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl glass-card border border-emerald-500/40 p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Spontaneous Audio Huddle</span>
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">{huddle.title}</h3>
          </div>
          <button onClick={() => setIsHuddleDrawerOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Audio Waves & Participant Avatars */}
        <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center space-x-6">
            {huddle.participants.map((p, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 text-center">
                <div className="relative">
                  <img 
                    src={p.avatar} 
                    alt={p.name} 
                    className={`w-16 h-16 rounded-full object-cover ring-4 ${p.isSpeaking ? 'ring-emerald-400 animate-pulse' : 'ring-slate-800'}`} 
                  />
                  {p.isSpeaking && (
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full text-[10px] font-bold">
                      <Mic className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-200">{p.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          {/* Animated sound wave bars */}
          <div className="flex items-center space-x-1.5 h-8">
            {[40, 70, 90, 60, 100, 50, 80, 45, 95, 30].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-emerald-400 rounded-full animate-pulse"
                style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex items-center justify-center space-x-4 pt-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-2xl transition-all shadow-lg ${
              isMuted ? 'bg-rose-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400'
            }`}
            title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => alert('Screen share stream ready')}
            className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Share Screen"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsHuddleDrawerOpen(false)}
            className="px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-rose-600/30"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Leave Voice Room</span>
          </button>
        </div>
      </div>
    </div>
  );
}
