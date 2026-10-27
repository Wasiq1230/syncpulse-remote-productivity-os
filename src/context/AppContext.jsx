import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTeamMembers, initialTasks, initialStandups, initialHuddleState, initialIntegrations } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme (dark default)
  const [theme, setTheme] = useState('dark');
  
  // Navigation View ('overview', 'timezone', 'focus', 'standups', 'kanban', 'wellbeing', 'integrations')
  const [activeView, setActiveView] = useState('overview');
  
  // App Data State
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [tasks, setTasks] = useState(initialTasks);
  const [standups, setStandups] = useState(initialStandups);
  const [huddle, setHuddle] = useState(initialHuddleState);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  
  // Focus / Deep Work Timer State
  const [focusTime, setFocusTime] = useState(25 * 60); // 25 min default
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState('rain'); // 'none', 'rain', 'binaural', 'lofi', 'coffee'
  const [todayFocusSeconds, setTodayFocusSeconds] = useState(38 * 60 + 24);
  const [focusStreakDays, setFocusStreakDays] = useState(12);

  // Modals & UI Triggers
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isStandupModalOpen, setIsStandupModalOpen] = useState(false);
  const [isHuddleDrawerOpen, setIsHuddleDrawerOpen] = useState(false);
  
  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'AI Standup Summary ready', time: '10m ago', read: false, type: 'ai' },
    { id: 'n2', title: 'Marcus Vance marked a blocker on Staging IAM', time: '1h ago', read: false, type: 'alert' },
    { id: 'n3', title: 'Design & Frontend Token Huddle is active', time: '14m ago', read: true, type: 'huddle' }
  ]);

  // Handle Theme switching in DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Global Keyboard Shortcuts (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsNewTaskModalOpen(false);
        setIsStandupModalOpen(false);
        setIsHuddleDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pomodoro Focus Timer countdown
  useEffect(() => {
    let interval = null;
    if (isFocusRunning && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime((prev) => prev - 1);
        setTodayFocusSeconds((prev) => prev + 1);
      }, 1000);
    } else if (focusTime === 0 && isFocusRunning) {
      setIsFocusRunning(false);
      alert('🎯 Great job! Your Deep Work session has concluded. Take a 5-minute breather.');
    }
    return () => clearInterval(interval);
  }, [isFocusRunning, focusTime]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const addTask = (newTask) => {
    setTasks([
      {
        id: 't' + (Date.now()),
        status: 'backlog',
        deepWorkRequired: true,
        blocker: false,
        ...newTask
      },
      ...tasks
    ]);
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const addStandup = (newStandup) => {
    setStandups([
      {
        id: 's' + Date.now(),
        timeAgo: 'Just now',
        reactions: { '🚀': 1 },
        ...newStandup
      },
      ...standups
    ]);
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      activeView,
      setActiveView,
      teamMembers,
      setTeamMembers,
      tasks,
      setTasks,
      addTask,
      moveTask,
      standups,
      addStandup,
      huddle,
      setHuddle,
      integrations,
      setIntegrations,
      focusTime,
      setFocusTime,
      isFocusRunning,
      setIsFocusRunning,
      activeSoundscape,
      setActiveSoundscape,
      todayFocusSeconds,
      focusStreakDays,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      isNewTaskModalOpen,
      setIsNewTaskModalOpen,
      isStandupModalOpen,
      setIsStandupModalOpen,
      isHuddleDrawerOpen,
      setIsHuddleDrawerOpen,
      notifications,
      setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
