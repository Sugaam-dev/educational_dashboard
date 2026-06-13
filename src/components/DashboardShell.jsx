import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Filter, 
  ShieldCheck, 
  Globe, 
  Grid, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Calendar,
  Layers,
  Menu,
  X
} from 'lucide-react';
import DashboardOverview from './DashboardOverview';
import FunnelGovernance from './FunnelGovernance';
import AgentGovernance from './AgentGovernance';
import CountryGovernance from './CountryGovernance';
import ProgramMatrix from './ProgramMatrix';
import AIBuddy from './AIBuddy';

export default function DashboardShell({ 
  user, 
  page, 
  buddyQuery,
  onNavigate, 
  onLogout 
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Nav items configuration
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'funnel', label: 'Channel Funnel', icon: Filter },
    { id: 'agents', label: 'Agent Governance', icon: ShieldCheck },
    { id: 'countries', label: 'Country & Market', icon: Globe },
    { id: 'matrix', label: 'Program Matrix', icon: Grid },
    { id: 'buddy', label: 'AI Governance Buddy', icon: Sparkles, badge: 'AI' }
  ];

  const handleNavClick = (itemId) => {
    onNavigate('app', itemId);
    setIsMobileOpen(false); // Close mobile drawer on selection
  };

  // Render correct sub-page based on 'page' state
  const renderActivePage = () => {
    switch (page) {
      case 'overview':
        return <DashboardOverview onNavigate={onNavigate} user={user} />;
      case 'funnel':
        return <FunnelGovernance user={user} />;
      case 'agents':
        return <AgentGovernance user={user} />;
      case 'countries':
        return <CountryGovernance user={user} />;
      case 'matrix':
        return <ProgramMatrix user={user} />;
      case 'buddy':
        return <AIBuddy initialQuery={buddyQuery} user={user} />;
      default:
        return <DashboardOverview onNavigate={onNavigate} user={user} />;
    }
  };

  const currentRoleLabel = () => {
    if (user.role === 'PM') return 'Project Manager';
    if (user.role === 'Finance') return 'Finance Director';
    if (user.role === 'Architect') return 'Systems Architect';
    return user.role;
  };

  const SidebarContent = ({ collapsedState = false, isMobile = false }) => (
    <div className="flex flex-col justify-between h-full bg-white text-slate-700">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center overflow-hidden w-full">
            {collapsedState ? (
              <div className="h-9 w-9 overflow-hidden rounded bg-slate-100 flex items-center justify-center border border-slate-200/60 shadow-sm">
                <img 
                  src="/logo.png" 
                  alt="PMRG Solution Emblem" 
                  className="h-7 w-auto max-w-none scale-[1.7] object-left translate-x-1" 
                />
              </div>
            ) : (
              <img 
                src="/logo.png" 
                alt="PMRG Solution Logo" 
                className="h-10 w-auto object-contain" 
              />
            )}
          </div>
          {isMobile && (
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Link List */}
        <nav className="mt-6 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={collapsedState ? item.label : undefined}
                className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-bold transition-all group relative border ${
                  isActive 
                    ? 'bg-blue-50 border-blue-100 text-blue-600 shadow-sm' 
                    : 'border-transparent text-slate-500 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                
                {(!collapsedState) && (
                  <span className="ml-3 transition-opacity duration-200 truncate">{item.label}</span>
                )}

                {(!collapsedState) && item.badge && (
                  <span className="ml-auto px-1.5 py-0.5 text-[10px] font-black bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                    {item.badge}
                  </span>
                )}

                {collapsedState && item.badge && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border border-white" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-2 border-t border-slate-200 bg-slate-50/40">
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!collapsedState)}
            className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors mb-1 font-bold"
          >
            {collapsedState ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            {!collapsedState && <span className="ml-2 text-xs font-bold">Collapse Navigation</span>}
          </button>
        )}

        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-sm font-bold transition-all"
          title={collapsedState ? "Log Out" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsedState && <span className="ml-3">Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans antialiased relative">
      
      {/* 1. Mobile Sidebar Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 2. Mobile Sidebar Slide-over Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 transform lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent collapsedState={false} isMobile={true} />
      </aside>

      {/* 3. Desktop Sidebar (Hidden on Mobile) */}
      <aside 
        className={`hidden lg:flex flex-col justify-between border-r border-slate-200 bg-white transition-all duration-300 shrink-0 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <SidebarContent collapsedState={isCollapsed} isMobile={false} />
      </aside>

      {/* 4. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 z-20 shrink-0 shadow-sm shadow-slate-100/40">
          
          <div className="flex items-center">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 mr-2 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">platform</span>
              <span className="text-slate-300 font-normal">/</span>
              <span className="text-slate-800 text-xs sm:text-sm font-black capitalize truncate max-w-[120px] sm:max-w-none">
                {page === 'matrix' ? 'Program × Channel Matrix' : page.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Right Topbar Items */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Intake cycle badge (hidden on small screen) */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded-md text-xs font-bold">
              <Calendar className="h-3.5 w-3.5" />
              <span>June 2026 Cycle</span>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                onBlur={() => setTimeout(() => setShowProfileMenu(false), 200)}
                className="flex items-center space-x-2 sm:space-x-3 p-1 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/10 shrink-0">
                  {user.initials || 'DU'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {user.name || 'Demo User'}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {currentRoleLabel()}
                  </div>
                </div>
              </button>

              {/* Dropdown menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Stakeholder</p>
                    <p className="text-sm font-black text-slate-800 truncate">{user.name || 'Demo User'}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email || 'demo@pmrg-gov.edu'}</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center px-3 py-2 text-sm text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-semibold"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Active viewport page */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-50">
          {renderActivePage()}
        </main>
      </div>

    </div>
  );
}
