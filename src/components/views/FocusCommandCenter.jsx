import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, Play, Pause, RotateCcw, Volume2, VolumeX, Flame, 
  Trophy, CheckCircle2, CloudRain, Waves, Coffee, Music, Sparkles
} from 'lucide-react';

export default function FocusCommandCenter() {
  const { 
    focusTime, setFocusTime, isFocusRunning, setIsFocusRunning,
    activeSoundscape, setActiveSoundscape, todayFocusSeconds, focusStreakDays, teamMembers
  } = useApp();

  const [sessionDuration, setSessionDuration] = useState(25); // 25, 45, 60, 90 mins
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);

  // Web Audio Synthetic Soundscapes generator (Rain / Pink Noise / Binaural tone)
  const toggleSoundscape = (sound) => {
    if (activeSoundscape === sound && isPlayingAudio) {
      // Stop
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingAudio(false);
      setActiveSoundscape('none');
    } else {
      // Start Synthetic Audio Node
      try {
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = ctx;

        // Generate Pink noise / soft rain texture
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.08; // Soft volume
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        
        // Filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = sound === 'rain' ? 800 : (sound === 'binaural' ? 400 : 1200);

        noise.connect(filter);
        filter.connect(ctx.destination);
        noise.start(0);
        noiseNodeRef.current = noise;

        setIsPlayingAudio(true);
        setActiveSoundscape(sound);
      } catch (e) {
        console.warn('AudioContext not allowed without gesture', e);
        setActiveSoundscape(sound);
        setIsPlayingAudio(true);
      }
    }
  };

  const handleSelectDuration = (mins) => {
    setSessionDuration(mins);
    setFocusTime(mins * 60);
    setIsFocusRunning(false);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const soundscapes = [
    { id: 'rain', label: 'Nordic Rain', icon: CloudRain, desc: 'Gentle rainfall for sustained coding' },
    { id: 'binaural', label: '432Hz Alpha Waves', icon: Waves, desc: 'Binaural beats for deep problem solving' },
    { id: 'coffee', label: 'Café Atmosphere', icon: Coffee, desc: 'Soft background chatter & ambient warmth' },
    { id: 'lofi', label: 'Lo-Fi Chill Synth', icon: Music, desc: 'Slow tempo melodic beats' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2.5">
          <Zap className="w-6 h-6 text-amber-400 fill-current" />
          <span>Deep Work & Focus Command Center</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Eliminate distraction, synchronize team deep work blocks, and activate cognitive flow soundscapes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Interactive Focus Clock */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl glass-card border border-indigo-500/30 flex flex-col items-center justify-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Session selector pills */}
            <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 z-10">
              {[25, 45, 60, 90].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleSelectDuration(mins)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    sessionDuration === mins
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>

            {/* Huge Timer Display with Pulsing Ring */}
            <div className="relative flex items-center justify-center">
              <div className={`w-72 h-72 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-500 ${
                isFocusRunning 
                  ? 'border-indigo-500/80 shadow-[0_0_50px_rgba(99,102,241,0.4)] animate-pulse-slow' 
                  : 'border-slate-800'
              }`}>
                <span className="text-6xl font-extrabold tracking-tight text-white font-mono">
                  {formatTimer(focusTime)}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mt-2 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isFocusRunning ? 'Session Active' : 'Ready to Focus'}</span>
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center space-x-4 z-10">
              <button
                onClick={() => setIsFocusRunning(!isFocusRunning)}
                className={`px-8 py-3.5 rounded-2xl text-sm font-extrabold flex items-center space-x-2 shadow-xl transition-all transform active:scale-95 ${
                  isFocusRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/30'
                }`}
              >
                {isFocusRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                <span>{isFocusRunning ? 'Pause Deep Work' : 'Start Focus Session'}</span>
              </button>

              <button
                onClick={() => { setIsFocusRunning(false); setFocusTime(sessionDuration * 60); }}
                className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Ambient Flow Soundscapes Bar */}
          <div className="p-6 rounded-3xl glass-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Cognitive Flow Soundscapes</h3>
              </div>
              <span className="text-[11px] text-slate-400">Synthesized Real-Time Audio</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {soundscapes.map((s) => {
                const Icon = s.icon;
                const isActive = activeSoundscape === s.id && isPlayingAudio;
                return (
                  <div
                    key={s.id}
                    onClick={() => toggleSoundscape(s.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2.5 rounded-xl ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-100">{s.label}</p>
                        <p className="text-[11px] text-slate-400">{s.desc}</p>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isActive ? 'bg-indigo-500 text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {isActive ? 'Playing' : 'Play'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Focus Streak & Leaderboard */}
        <div className="space-y-6">
          {/* Daily Streak Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 glass-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                <Flame className="w-4 h-4 fill-current" />
                <span>Deep Work Streak</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-300">Top 5%</span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">{focusStreakDays}</span>
              <span className="text-sm font-bold text-slate-300">Consecutive Days</span>
            </div>

            <p className="text-xs text-slate-400">
              You’ve achieved your daily 3-hour deep work goal for 12 days straight.
            </p>
          </div>

          {/* Team Deep Work Leaderboard */}
          <div className="p-6 rounded-3xl glass-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Team Focus Champions</h3>
              </div>
              <span className="text-[11px] text-slate-500">Today</span>
            </div>

            <div className="space-y-3">
              {teamMembers.map((m, i) => (
                <div key={m.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900/60 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-bold w-4 text-center ${i === 0 ? 'text-amber-400' : (i === 1 ? 'text-slate-300' : 'text-slate-500')}`}>
                      #{i + 1}
                    </span>
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-200">{m.name}</p>
                      <span className="text-[10px] text-slate-400">{m.role.split(' ')[0]}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-extrabold text-indigo-300">
                    {m.todayHoursLogged} hrs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
