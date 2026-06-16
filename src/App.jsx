import { useEffect, useState } from 'react';
import AppShell from './components/layout/AppShell';
import { appPages, initialTodos } from './data/dashboardData';
import { useHashRoute } from './hooks/useHashRoute';
import { useSessionUser } from './hooks/useSessionUser';
import { useTemporaryNotes } from './hooks/useTemporaryNotes';
// Existing pages
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
// New Layer 3 — Channel Governance pages
import DirectAdmissionsPage from './pages/DirectAdmissionsPage';
import DigitalCampaignsPage from './pages/DigitalCampaignsPage';
import RegionalOfficesPage from './pages/RegionalOfficesPage';
import EducationFairsPage from './pages/EducationFairsPage';
import RevenueGovernancePage from './pages/RevenueGovernancePage';
import AdmissionQualityPage from './pages/AdmissionQualityPage';
// New Layer 2 — Student Governance pages
import StudentLifecyclePage from './pages/StudentLifecyclePage';
import StudentPipelinePage from './pages/StudentPipelinePage';
// New Layer 1 — Institutional Governance pages
import UniversityGovernancePage from './pages/UniversityGovernancePage';
import AcademicPerformancePage from './pages/AcademicPerformancePage';
import FinanceGovernancePage from './pages/FinanceGovernancePage';
import ComplianceCentrePage from './pages/ComplianceCentrePage';
// Executive
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

  useEffect(() => {
    const el = document.querySelector('.dashboard-shell');
    if (el) {
      el.scrollTop = 0;
    }
  }, [route.page]);

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
      {/* Existing pages */}
      {route.page === 'dashboard'     && <DashboardPage todos={todos} toggleTodo={toggleTodo} onAsk={askBuddy} />}
      {route.page === 'funnel'        && <FunnelPage onAsk={askBuddy} />}
      {route.page === 'risk'          && <RiskPage />}
      {route.page === 'heatmap-detail'&& <HeatmapDetailPage params={route.params} />}
      {route.page === 'exceptions'    && <ExceptionsPage onAsk={askBuddy} />}
      {route.page === 'agents'        && <AgentsPage />}
      {route.page === 'markets'       && <MarketsPage />}
      {route.page === 'matrix'        && <MatrixPage />}
      {route.page === 'ask-buddy'     && <AskBuddyPage query={query} setQuery={setQuery} reply={buddyReply} onAsk={askBuddy} />}
      {route.page === 'notes'         && <NotesPage notes={notes} setNotes={setNotes} />}
      {route.page === 'audit-trail'   && <AuditPage />}
      {route.page === 'settings'      && <SettingsPage user={user} setUser={setUser} />}
      {/* Layer 3 — Channel Governance */}
      {route.page === 'direct-admissions'  && <DirectAdmissionsPage onAsk={askBuddy} />}
      {route.page === 'digital-campaigns'  && <DigitalCampaignsPage onAsk={askBuddy} />}
      {route.page === 'regional-offices'   && <RegionalOfficesPage onAsk={askBuddy} />}
      {route.page === 'education-fairs'    && <EducationFairsPage onAsk={askBuddy} />}
      {route.page === 'revenue-governance' && <RevenueGovernancePage onAsk={askBuddy} />}
      {route.page === 'admission-quality'  && <AdmissionQualityPage onAsk={askBuddy} />}
      {/* Layer 2 — Student Governance */}
      {route.page === 'student-lifecycle'  && <StudentLifecyclePage onAsk={askBuddy} />}
      {route.page === 'student-pipeline'   && <StudentPipelinePage onAsk={askBuddy} />}
      {/* Layer 1 — Institutional Governance */}
      {route.page === 'university-governance' && <UniversityGovernancePage onAsk={askBuddy} />}
      {route.page === 'academic-performance'  && <AcademicPerformancePage onAsk={askBuddy} />}
      {route.page === 'finance-governance'    && <FinanceGovernancePage onAsk={askBuddy} />}
      {route.page === 'compliance-centre'     && <ComplianceCentrePage onAsk={askBuddy} />}

    </AppShell>
  );
}
