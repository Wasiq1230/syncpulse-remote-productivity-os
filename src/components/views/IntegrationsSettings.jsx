import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, CheckCircle2, Shield, RefreshCw, Key, ExternalLink } from 'lucide-react';

export default function IntegrationsSettings() {
  const { integrations, setIntegrations } = useApp();

  const toggleConnect = (id) => {
    setIntegrations(integrations.map(item => 
      item.id === id ? { ...item, connected: !item.connected } : item
    ));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2.5">
          <Sliders className="w-6 h-6 text-indigo-400" />
          <span>Connected Workspace Integrations</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Two-way synchronization for async standups, calendar protection, pull request linkage, and video huddles.
        </p>
      </div>

      {/* Grid of integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((item) => (
          <div 
            key={item.id}
            className="p-5 rounded-3xl glass-card border border-slate-800/80 hover:border-indigo-500/30 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-3xl p-2 rounded-2xl bg-slate-900 border border-slate-800">{item.icon}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  item.connected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                }`}>
                  {item.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
              </div>

              <p className="text-xs text-slate-300 font-mono bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                {item.syncStatus}
              </p>
            </div>

            <button
              onClick={() => toggleConnect(item.id)}
              className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                item.connected 
                  ? 'bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 border border-slate-700'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
              }`}
            >
              {item.connected ? 'Disconnect' : 'Connect Workspace'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
