import React from 'react';
import { Shield, FileSearch, TrendingUp, Sparkles, UserCheck, ArrowRight, Layers } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  // Card A CTA handler
  const handleBuddyClick = () => {
    onNavigate('auth', 'overview', null, '', 'buddy');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-blue-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* Decorative background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm shadow-slate-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Responsive logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
            <img 
              src="/logo.png" 
              alt="PMRG Solution Logo" 
              className="h-10 w-auto object-contain hover:opacity-90 transition-opacity" 
            />
          </div>

          <div>
            <button
              onClick={() => onNavigate('auth')}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-500/10 active:scale-95"
            >
              Open Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Dynamic Release Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-xs font-bold tracking-wider text-blue-600 uppercase mb-6 pulse-glow">
            <Shield className="h-3.5 w-3.5" />
            <span>Governance Decision Control Layer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            AI-Assisted Governance Platform
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Ensure institutional compliance, automate risk gates, and establish absolute flow control. Manage portfolio visibility across all active projects, recruitment channels, and global markets with integrated document intelligence and conversational AI helper capabilities designed for executive leadership.
          </p>
        </div>

        {/* Feature Cards Grid (3-column) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] shadow-sm hover:shadow-md">
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5 border border-blue-100">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Governance Workflow</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
              Define multi-stage approval pathways and decision gates. Automate notification flows and record tamper-proof audit trails for institutional compliance.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] shadow-sm hover:shadow-md">
            <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-5 border border-indigo-100">
              <FileSearch className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Document Intelligence</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
              Scan, verify, and validate international credentials, transcript authenticity, and visa application documentation with automated compliance scoreboards.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] shadow-sm hover:shadow-md">
            <div className="h-12 w-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 mb-5 border border-violet-100">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Portfolio Visibility</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
              Monitor active enrollment funnels, regional market trends, country-specific visa success percentages, and partner agent metrics on a single screen.
            </p>
          </div>

        </div>

        {/* Action Card Grid (2-column split) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Card A: Clickable PM Buddy */}
          <div 
            onClick={handleBuddyClick}
            className="group cursor-pointer bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-500/40 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
                  <Sparkles className="h-6 w-6 pulse-glow" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  Interactive Assistant
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                Project Manager Buddy
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-6">
                Access our conversational AI helper. Query system-wide metrics, review student lifecycles, run compliance audit checks, and generate performance reports in real time using conversational queries.
              </p>
            </div>
            <div className="inline-flex items-center font-bold text-sm text-blue-600 group-hover:text-blue-500 space-x-2">
              <span>Initialize AI Assistant</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card B: Static Human-in-the-loop */}
          <div 
            className="bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between shadow-sm opacity-90"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100">
                  <UserCheck className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Decision Safety
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Human-in-the-Loop Approval
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-6">
                Maintain strict control over high-risk actions. All visa overrides, agent freezes, compliance waivers, and program policy adjustments require manual sign-off by an authorized university stakeholder.
              </p>
            </div>
            <div className="inline-flex items-center text-sm text-slate-400 space-x-2 font-bold">
              <Shield className="h-4 w-4" />
              <span>Strict compliance policy active</span>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white text-center relative z-10 shadow-inner">
        <p className="text-slate-400 text-xs sm:text-sm font-bold">
          &copy; 2026 PMRG Solution. All rights reserved. &bull; Internal Decision Control Layer
        </p>
      </footer>
    </div>
  );
}
