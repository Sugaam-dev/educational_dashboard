import { navItems } from '../../data/dashboardData';
import { navigateHash } from '../../utils/routing';
import {
  AlertTriangle,
  Bot,
  ChartNoAxesColumnIncreasing,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Gauge,
  GitPullRequest,
  Globe,
  Grid,
  ShieldCheck,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';

const navIcons = {
  dashboard: Gauge,
  funnel: GitPullRequest,
  risk: AlertTriangle,
  exceptions: ShieldCheck,
  agents: Users,
  markets: Globe,
  matrix: Grid,
  'ask-buddy': Bot,
  notes: FileText,
  'audit-trail': ClipboardList,
  settings: Settings,
};

export default function AppShell({ route, user, onLogout, sidebarCollapsed, setSidebarCollapsed, children }) {
  return (
    <div className={`app-frame ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="right-sidebar">
        <button className="brand sidebar-brand" onClick={() => navigateHash('landing')} aria-label="Go to landing page">
          <img src="/logo.png" alt="PMRG Solution logo" />
          {!sidebarCollapsed && <span>UniGov</span>}
        </button>

        <button
          className="sidebar-rail-toggle"
          onClick={() => setSidebarCollapsed((current) => !current)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <nav aria-label="Dashboard navigation">
          {navItems.map((item) => (
            <SidebarNavButton key={item.id} item={item} active={route.page === item.id} collapsed={sidebarCollapsed} />
          ))}
        </nav>

        {!sidebarCollapsed && (
          <div className="sidebar-card" style={{ marginBottom: '12px' }}>
            <strong>{user.name}</strong>
            <p>{user.role} - June 2026 intake</p>
          </div>
        )}

        <div className="sidebar-footer" style={{ marginTop: 'auto', width: '100%' }}>
          <button 
            className="logout-btn" 
            onClick={onLogout}
            title="Logout"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              padding: sidebarCollapsed ? '10px 0' : '9px 14px',
              borderRadius: '9px',
              border: '1px solid #fee2e2',
              backgroundColor: '#fff5f5',
              color: '#ef4444',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            <span className="nav-icon" style={{ display: 'inline-grid', width: '22px', height: '22px', placeItems: 'center', borderRadius: '7px', background: '#fee2e2', color: '#ef4444', margin: 0 }}>
              <LogOut size={14} strokeWidth={2.6} />
            </span>
            {!sidebarCollapsed && <span style={{ fontSize: '12px' }}>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="dashboard-shell">
        <Topbar route={route} user={user} />
        {children}
      </main>
    </div>
  );
}

function SidebarNavButton({ item, active, collapsed }) {
  const Icon = navIcons[item.id] || ChartNoAxesColumnIncreasing;

  return (
    <button
      className={active ? 'active' : ''}
      onClick={() => navigateHash(item.id)}
      title={item.label}
    >
      <span className="nav-icon"><Icon size={16} strokeWidth={2.4} /></span>
      {!collapsed && item.label}
    </button>
  );
}

function Topbar({ route, user }) {
  const title = route.page === 'heatmap-detail'
    ? 'Heatmap details'
    : navItems.find((item) => item.id === route.page)?.label || 'Command center';

  return (
    <section className="topbar">
      <div>
        <h1>{title}</h1>
        <p>Education governance dashboard - Mon, 15 Jun 2026 - signed in as {user.name}</p>
      </div>
      <div className="topbar-actions">
        <button onClick={() => navigateHash('notes')}>Draft notes</button>
        <button onClick={() => navigateHash('ask-buddy')}>Ask Buddy</button>
        <button className="primary" onClick={() => navigateHash('exceptions')}>Review blockers</button>
      </div>
    </section>
  );
}
