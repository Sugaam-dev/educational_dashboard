import { useState } from 'react';
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
  Menu,
  X,
  // New icons
  MousePointerClick,
  Megaphone,
  Building2,
  CalendarDays,
  DollarSign,
  BadgeCheck,
  GraduationCap,
  ListOrdered,
  University,
  BookOpen,
  Banknote,
  ShieldAlert,
  LayoutDashboard,
} from 'lucide-react';

const navIcons = {
  dashboard:             Gauge,
  funnel:                GitPullRequest,
  risk:                  AlertTriangle,
  exceptions:            ShieldCheck,
  'ask-buddy':           Bot,
  notes:                 FileText,
  'audit-trail':         ClipboardList,
  settings:              Settings,
  // Layer 3 — Channel Governance
  agents:                Users,
  markets:               Globe,
  matrix:                Grid,
  'direct-admissions':   MousePointerClick,
  'digital-campaigns':   Megaphone,
  'regional-offices':    Building2,
  'education-fairs':     CalendarDays,
  'revenue-governance':  DollarSign,
  'admission-quality':   BadgeCheck,
  // Layer 2 — Student Governance
  'student-lifecycle':   GraduationCap,
  'student-pipeline':    ListOrdered,
  // Layer 1 — Institutional Governance
  'university-governance':  University,
  'academic-performance':   BookOpen,
  'finance-governance':     Banknote,
  'compliance-centre':      ShieldAlert,
};

// Grouped nav structure
const NAV_GROUPS = [
  {
    label: null, // ungrouped core items at the top
    ids: ['dashboard', 'funnel', 'risk', 'exceptions', 'ask-buddy', 'notes', 'audit-trail', 'settings'],
  },
  {
    label: 'Channel Governance',
    ids: ['agents', 'markets', 'matrix', 'direct-admissions', 'digital-campaigns', 'regional-offices', 'education-fairs', 'revenue-governance', 'admission-quality'],
  },
  {
    label: 'Student Governance',
    ids: ['student-lifecycle', 'student-pipeline'],
  },
  {
    label: 'Institutional Governance',
    ids: ['university-governance', 'academic-performance', 'finance-governance', 'compliance-centre'],
  },
];

export default function AppShell({ route, user, onLogout, sidebarCollapsed, setSidebarCollapsed, children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobile = () => setMobileNavOpen(false);

  return (
    <div className={`app-frame ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Mobile backdrop overlay */}
      {mobileNavOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`right-sidebar ${mobileNavOpen ? 'mobile-open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
          <button className="brand sidebar-brand" onClick={() => { navigateHash('landing'); closeMobile(); }} aria-label="Go to landing page">
            <img src="/logo.png" alt="PMRG Solution logo" />
            {!sidebarCollapsed && <span style={{fontSize:'13px', fontWeight:'800', color:'#1e3a8a', letterSpacing:'-0.01em'}}></span>}
          </button>
          {/* Close button on mobile */}
          <button
            className="sidebar-mobile-close"
            onClick={closeMobile}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <button
          className="sidebar-rail-toggle"
          onClick={() => setSidebarCollapsed((current) => !current)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <nav aria-label="Dashboard navigation" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {NAV_GROUPS.map((group) => (
            <div key={group.label || 'core'} className="nav-group">
              {group.label && !sidebarCollapsed && (
                <div className="nav-group-label">{group.label}</div>
              )}
              {group.label && sidebarCollapsed && (
                <div className="nav-group-divider" />
              )}
              {group.ids.map((id) => {
                const item = navItems.find((n) => n.id === id);
                if (!item) return null;
                return (
                  <SidebarNavButton
                    key={item.id}
                    item={item}
                    active={route.page === item.id}
                    collapsed={sidebarCollapsed}
                    onClick={closeMobile}
                  />
                );
              })}
            </div>
          ))}
        </nav>

        {!sidebarCollapsed && (
          <div className="sidebar-card" style={{ marginBottom: '12px', marginTop: '8px' }}>
            <strong>{user.name}</strong>
            <p>{user.role} - June 2026 intake</p>
          </div>
        )}

        <div className="sidebar-footer" style={{ width: '100%' }}>


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
        <Topbar route={route} user={user} onHamburger={() => setMobileNavOpen(true)} />
        {children}
      </main>
    </div>
  );
}

function SidebarNavButton({ item, active, collapsed, onClick, highlight }) {
  const Icon = navIcons[item.id] || ChartNoAxesColumnIncreasing;

  return (
    <button
      className={`${active ? 'active' : ''} ${highlight ? 'nav-executive' : ''}`}
      onClick={() => { navigateHash(item.id); onClick?.(); }}
      title={item.label}
    >
      <span className="nav-icon"><Icon size={16} strokeWidth={2.4} /></span>
      {!collapsed && item.label}
    </button>
  );
}

function Topbar({ route, user, onHamburger }) {
  const allNavItems = navItems;
  const title = route.page === 'heatmap-detail'
    ? 'Heatmap Details'
    : allNavItems.find((item) => item.id === route.page)?.label || 'Command Center';

  return (
    <section className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Hamburger — mobile only */}
        <button
          className="topbar-hamburger"
          onClick={onHamburger}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1>{title}</h1>
          <p>University governance dashboard — Mon, 15 Jun 2026 — signed in as {user.name}</p>
        </div>
      </div>
      <div className="topbar-actions">
        <button onClick={() => navigateHash('notes')}>Draft notes</button>
        <button onClick={() => navigateHash('ask-buddy')}>Ask Buddy</button>
        <button className="primary" onClick={() => navigateHash('exceptions')}>Review blockers</button>
      </div>
    </section>
  );
}
