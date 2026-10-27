import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  KanbanSquare, Plus, AlertCircle, Clock, CheckCircle2, 
  ChevronRight, ArrowRight, User, Sparkles
} from 'lucide-react';

export default function SprintKanban() {
  const { tasks, moveTask, setIsNewTaskModalOpen, teamMembers } = useApp();

  const columns = [
    { id: 'backlog', label: 'Sprint Backlog', color: 'border-slate-700/60' },
    { id: 'in_progress', label: 'In Deep Work', color: 'border-indigo-500/40' },
    { id: 'review', label: 'Review & Async Sync', color: 'border-purple-500/40' },
    { id: 'done', label: 'Shipped & Closed', color: 'border-emerald-500/40' }
  ];

  const getAssignee = (id) => teamMembers.find(m => m.id === id) || { name: 'Unassigned', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2.5">
            <KanbanSquare className="w-6 h-6 text-indigo-400" />
            <span>Sprint Flow & Kanban Board</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Focus-first task board prioritizing uninterrupted deep work and async progress tracking.
          </p>
        </div>

        <button
          onClick={() => setIsNewTaskModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Task</span>
        </button>
      </div>

      {/* 4 Column Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="space-y-3">
              {/* Column header */}
              <div className={`p-3 rounded-2xl bg-slate-900/80 border ${col.color} flex items-center justify-between`}>
                <span className="text-xs font-bold text-slate-200">{col.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono font-bold">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks in column */}
              <div className="space-y-3 min-h-[400px]">
                {colTasks.map((t) => {
                  const assignee = getAssignee(t.assignee);
                  return (
                    <div
                      key={t.id}
                      className="p-4 rounded-2xl glass-card border border-slate-800/80 hover:border-indigo-500/40 space-y-3 group transition-all shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                          {t.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          t.priority === 'urgent' ? 'bg-rose-500/20 text-rose-300' :
                          t.priority === 'high' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {t.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-100 leading-snug group-hover:text-indigo-300 transition-colors">
                        {t.title}
                      </h4>

                      {t.blocker && (
                        <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-[11px] text-rose-300 flex items-start space-x-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>{t.blockerReason || 'Blocked on external dependency'}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                        <div className="flex items-center space-x-2">
                          <img src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700" />
                          <span className="text-[11px] text-slate-400">{assignee.name.split(' ')[0]}</span>
                        </div>

                        {/* Status Progression Dropdown */}
                        <select
                          value={t.status}
                          onChange={(e) => moveTask(t.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                        >
                          <option value="backlog">Backlog</option>
                          <option value="in_progress">In Deep Work</option>
                          <option value="review">Review</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
