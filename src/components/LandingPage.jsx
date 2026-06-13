import React from 'react';
import { Shield, FileSearch, TrendingUp, Sparkles, UserCheck, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  // Card A CTA handler
  const handleBuddyClick = () => {
    onNavigate('auth', 'overview', null, '', 'buddy');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* Decorative background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Responsive logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Layers className="h-5 w-5 text-white" />
            </div>
            {/* Show full brand name only on medium screens and up, or crop to icon on mobile */}
            <span className="hidden sm:block text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              EduGov Platform
            </span>
          </div>

          <div>
            <button
              onClick={() => onNavigate('auth')}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Open Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Dynamic Release Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-semibold tracking-wider text-blue-400 uppercase mb-6 pulse-glow">
            <Shield className="h-3.5 w-3.5" />
            <span>Governance Decision Control Layer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            AI-Assisted Governance Platform
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Ensure institutional compliance, automate risk gates, and establish absolute flow control. Manage portfolio visibility across all active projects, recruitment channels, and global markets with integrated document intelligence and conversational AI helper capabilities designed for executive leadership.
          </p>
        </div>

        {/* Feature Cards Grid (3-column) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1 */}
          <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px]">
            <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-5 border border-blue-500/20">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Governance Workflow</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Define multi-stage approval pathways and decision gates. Automate notification flows and record tamper-proof audit trails for institutional compliance.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px]">
            <div className="h-12 w-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-5 border border-indigo-500/20">
              <FileSearch className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Document Intelligence</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Scan, verify, and validate international credentials, transcript authenticity, and visa application documentation with automated compliance scoreboards.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px]">
            <div className="h-12 w-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 mb-5 border border-violet-500/20">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Portfolio Visibility</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Monitor active enrollment funnels, regional market trends, country-specific visa success percentages, and partner agent metrics on a single screen.
            </p>
          </div>

        </div>

        {/* Action Card Grid (2-column split) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Card A: Clickable PM Buddy */}
          <div 
            onClick={handleBuddyClick}
            className="group cursor-pointer bg-slate-900/40 border border-slate-900 hover:bg-slate-900/60 hover:border-blue-500/40 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 bg-blue-500/15 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/30">
                  <Sparkles className="h-6 w-6 pulse-glow" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Interactive Assistant
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                Project Manager Buddy
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Access our conversational AI helper. Query system-wide metrics, review student lifecycles, run compliance audit checks, and generate performance reports in real time using conversational queries.
              </p>
            </div>
            <div className="inline-flex items-center font-semibold text-sm text-blue-400 group-hover:text-blue-300 space-x-2">
              <span>Initialize AI Assistant</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card B: Static Human-in-the-loop */}
          <div 
            className="bg-slate-900/40 border border-slate-900 hover:bg-slate-900/60 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between border-slate-900/60 opacity-90"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 bg-emerald-500/15 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                  <UserCheck className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Decision Safety
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Human-in-the-Loop Approval
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Maintain strict control over high-risk actions. All visa overrides, agent freezes, compliance waivers, and program policy adjustments require manual sign-off by an authorized university stakeholder.
              </p>
            </div>
            <div className="inline-flex items-center text-sm text-slate-500 space-x-2">
              <Shield className="h-4 w-4" />
              <span>Strict compliance policy active</span>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 bg-slate-950 text-center relative z-10">
        <p className="text-slate-500 text-xs sm:text-sm">
          &copy; 2026 PMRG Solution. All rights reserved. &bull; Internal Decision Control Layer
        </p>
      </footer>
    </div>
  );
}
