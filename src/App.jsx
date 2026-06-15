import { useEffect, useState } from 'react';
import AppShell from './components/layout/AppShell';
import { appPages, initialTodos } from './data/dashboardData';
import { useHashRoute } from './hooks/useHashRoute';
import { useSessionUser } from './hooks/useSessionUser';
import { useTemporaryNotes } from './hooks/useTemporaryNotes';
import AgentsPage from './pages/AgentsPage';
import AskBuddyPage from './pages/AskBuddyPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ExceptionsPage from './pages/ExceptionsPage';
import FunnelPage from './pages/FunnelPage';
import HeatmapDetailPage from './pages/HeatmapDetailPage';
import LandingPage from './pages/LandingPage';
import MarketsPage from './pages/MarketsPage';
import MatrixPage from './pages/MatrixPage';
import NotesPage from './pages/NotesPage';
import RiskPage from './pages/RiskPage';
import AuditPage from './pages/AuditPage';
import SettingsPage from './pages/SettingsPage';
import { findBuddyAnswer } from './utils/buddy';
import { navigateHash } from './utils/routing';

export default function App() {
  const route = useHashRoute();
  const [user, setUser] = useSessionUser();
  const [todos, setTodos] = useState(initialTodos);
  const [query, setQuery] = useState('');
  const [buddyReply, setBuddyReply] = useState('Choose a template question or ask about finance approvals, visa risk, documents, markets, or overdue approvals.');
  const [notes, setNotes] = useTemporaryNotes();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (appPages.includes(route.page) && !user) {
      navigateHash('login', { redirect: route.page, ...route.params });
    }
  }, [route, user]);

  function login(profile, redirect = 'dashboard') {
    const nextUser = profile || { name: 'Demo User', email: 'demo@unigov.local', role: 'Project Manager', initials: 'DU' };
    setUser(nextUser);
    navigateHash(redirect);
  }

  function logout() {
    setUser(null);
    navigateHash('landing');
  }

  function askBuddy(text) {
    const response = findBuddyAnswer(text);
    setQuery(text);
    setBuddyReply(response.answer);
    navigateHash('ask-buddy');
  }

  function toggleTodo(index) {
    setTodos((current) => current.map((todo, todoIndex) => (
      todoIndex === index ? { ...todo, done: !todo.done } : todo
    )));
  }

  if (route.page === 'landing') {
    return <LandingPage />;
  }

  if (route.page === 'login') {
    return <AuthPage route={route} onLogin={login} />;
  }

  if (!user || !appPages.includes(route.page)) {
    return null;
  }

  return (
    <AppShell
      route={route}
      user={user}
      onLogout={logout}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      {route.page === 'dashboard' && <DashboardPage todos={todos} toggleTodo={toggleTodo} onAsk={askBuddy} />}
      {route.page === 'funnel' && <FunnelPage onAsk={askBuddy} />}
      {route.page === 'risk' && <RiskPage />}
      {route.page === 'heatmap-detail' && <HeatmapDetailPage params={route.params} />}
      {route.page === 'exceptions' && <ExceptionsPage onAsk={askBuddy} />}
      {route.page === 'agents' && <AgentsPage />}
      {route.page === 'markets' && <MarketsPage />}
      {route.page === 'matrix' && <MatrixPage />}
      {route.page === 'ask-buddy' && <AskBuddyPage query={query} setQuery={setQuery} reply={buddyReply} onAsk={askBuddy} />}
      {route.page === 'notes' && <NotesPage notes={notes} setNotes={setNotes} />}
      {route.page === 'audit-trail' && <AuditPage />}
      {route.page === 'settings' && <SettingsPage user={user} setUser={setUser} />}
    </AppShell>
  );
}
