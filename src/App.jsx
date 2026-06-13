import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import DashboardShell from './components/DashboardShell';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'auth' | 'app'
  const [page, setPage] = useState('overview'); // 'overview' | 'funnel' | 'agents' | 'countries' | 'matrix' | 'buddy'
  const [projectId, setProjectId] = useState(null);
  const [buddyQuery, setBuddyQuery] = useState('');
  const [redirectTarget, setRedirectTarget] = useState(null);
  const [user, setUser] = useState(null); // Authenticated user profile

  // Define custom navigation function
  const navigateTo = (nextView, nextPage = 'overview', nextProjectId = null, nextBuddyQuery = '', nextRedirectTarget = null) => {
    setView(nextView);
    setPage(nextPage);
    setProjectId(nextProjectId);
    setBuddyQuery(nextBuddyQuery);
    
    let targetRedirect = nextRedirectTarget;
    if (nextRedirectTarget !== null) {
      setRedirectTarget(nextRedirectTarget);
    } else {
      targetRedirect = redirectTarget;
    }

    // Build URL hash representation
    let hash = `#${nextView}`;
    if (nextView === 'app') {
      hash += `?page=${nextPage}`;
      if (nextProjectId) hash += `&projectId=${nextProjectId}`;
      if (nextBuddyQuery) hash += `&query=${encodeURIComponent(nextBuddyQuery)}`;
    }

    const stateObj = { 
      view: nextView, 
      page: nextPage, 
      projectId: nextProjectId, 
      buddyQuery: nextBuddyQuery,
      redirectTarget: targetRedirect
    };
    
    window.history.pushState(stateObj, '', hash);
  };

  // Parse hash and initialize state on startup
  useEffect(() => {
    const parseUrlHash = () => {
      const hash = window.location.hash || '#landing';
      const questionIdx = hash.indexOf('?');
      
      let currentView = 'landing';
      let currentPage = 'overview';
      let currentProjectId = null;
      let currentBuddyQuery = '';
      
      const viewPart = questionIdx === -1 ? hash : hash.substring(0, questionIdx);
      if (viewPart === '#auth') {
        currentView = 'auth';
      } else if (viewPart === '#app') {
        currentView = 'app';
      }
      
      if (questionIdx !== -1) {
        const queryStr = hash.substring(questionIdx + 1);
        const params = new URLSearchParams(queryStr);
        currentPage = params.get('page') || 'overview';
        currentProjectId = params.get('projectId');
        currentBuddyQuery = params.get('query') || '';
      }

      // Read user profile from session storage to maintain session on refresh
      const savedUser = sessionStorage.getItem('edu_gov_user');
      let parsedUser = null;
      if (savedUser) {
        parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }

      if (currentView === 'app' && !parsedUser) {
        // Redirect unauthorized access to auth
        setView('auth');
        window.history.replaceState({ view: 'auth', page: 'overview', projectId: null, buddyQuery: '', redirectTarget: null }, '', '#auth');
        return;
      }

      setView(currentView);
      setPage(currentPage);
      setProjectId(currentProjectId);
      setBuddyQuery(currentBuddyQuery);
      
      window.history.replaceState(
        { view: currentView, page: currentPage, projectId: currentProjectId, buddyQuery: currentBuddyQuery, redirectTarget: null },
        '',
        window.location.hash || '#landing'
      );
    };

    parseUrlHash();

    // Listen to popstate event for back/forward navigation
    const handlePopState = (e) => {
      if (e.state) {
        const savedUser = sessionStorage.getItem('edu_gov_user');
        if (!savedUser && e.state.view === 'app') {
          setView('auth');
          window.history.replaceState({ view: 'auth', page: 'overview', projectId: null, buddyQuery: '', redirectTarget: null }, '', '#auth');
          return;
        }

        setView(e.state.view || 'landing');
        setPage(e.state.page || 'overview');
        setProjectId(e.state.projectId || null);
        setBuddyQuery(e.state.buddyQuery || '');
        setRedirectTarget(e.state.redirectTarget || null);
      } else {
        parseUrlHash();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleLogin = (userProfile) => {
    setUser(userProfile);
    sessionStorage.setItem('edu_gov_user', JSON.stringify(userProfile));
    
    // Check redirection target from Card A landing CTA
    if (redirectTarget === 'buddy') {
      navigateTo('app', 'buddy', null, '');
      setRedirectTarget(null);
    } else {
      navigateTo('app', 'overview', null, '');
    }
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('edu_gov_user');
    navigateTo('landing');
  };

  const renderView = () => {
    switch (view) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'auth':
        return <AuthPage onNavigate={navigateTo} onLogin={handleLogin} redirectTarget={redirectTarget} />;
      case 'app':
        if (!user) return <AuthPage onNavigate={navigateTo} onLogin={handleLogin} redirectTarget={redirectTarget} />;
        return (
          <DashboardShell 
            user={user} 
            page={page} 
            buddyQuery={buddyQuery}
            onNavigate={navigateTo} 
            onLogout={handleLogout} 
          />
        );
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
}

export default App;
