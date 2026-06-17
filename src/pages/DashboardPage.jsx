import { useState, useEffect, Fragment } from 'react';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import SectionTitle from '../components/common/SectionTitle';
import { 
  EXEC_ACTIONS, 
  INITIATIVES, 
  LIFECYCLE_STAGES, 
  agents, 
  markets, 
  exceptions, 
  badgeClass, 
  riskProjects, 
  riskColumns,
  portfolioCards,
  approvalSignals
} from '../data/dashboardData';
import { navigateHash } from '../utils/routing';
import { riskFor, riskInitial } from '../utils/risk';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  ChevronRight, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  University, 
  Bot, 
  Send, 
  Globe, 
  ShieldAlert, 
  ArrowRight,
  Eye,
  BookOpen
} from 'lucide-react';

export default function DashboardPage({ todos, toggleTodo, onAsk }) {
  const [activeTab, setActiveTab] = useState('institutional');
  const [buddyInput, setBuddyInput] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const submitBuddy = (e) => {
    e.preventDefault();
    if (buddyInput.trim()) {
      onAsk(buddyInput);
      setBuddyInput('');
    }
  };

  return (
    <div className={`space-y-6 pb-10 transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* ── HEADER PANEL ── */}
      <div className="rounded-xl mb-6 p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-black px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 uppercase tracking-widest shadow-lg">
              Executive View — Unified 360° Command
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">360° Unified Command Center</h2>
          <p className="text-blue-200 text-base mb-6 font-medium">Vice-Chancellor & Board Strategic Intelligence — June 2026 Intake</p>
          
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white flex items-center gap-2">
              <DollarSign size={16} className="text-green-400"/>
              <span className="text-sm font-bold">Revenue: $110.3M</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white flex items-center gap-2">
              <Users size={16} className="text-blue-400"/>
              <span className="text-sm font-bold">Enrolled: 1,720</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white flex items-center gap-2">
              <Shield size={16} className="text-purple-400"/>
              <span className="text-sm font-bold">Compliance: 91.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: UNIFIED PLATFORM HEALTH STRIP ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Layer 1 */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative top-0 hover:-top-1">
          <div className="h-1.5 w-full bg-blue-500" />
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600"><University size={24} strokeWidth={2.5} /></div>
                <div>
                  <h3 className="font-black text-slate-800 m-0 text-lg">Institutional Health</h3>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">Layer 1</span>
                </div>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 font-medium list-none p-0 mb-6">
              <li className="flex items-center justify-between"><span className="text-slate-500">Compliance</span> <span className="flex items-center gap-1 text-slate-800">91.4% <CheckCircle size={14} className="text-green-500"/></span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">Finance</span> <span className="flex items-center gap-1 text-slate-800">$12.9M surplus <CheckCircle size={14} className="text-green-500"/></span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">Academic API</span> <span className="flex items-center gap-1 text-slate-800">87.2% <CheckCircle size={14} className="text-green-500"/></span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">Research</span> <span className="flex items-center gap-1 text-slate-800">28 Active <CheckCircle size={14} className="text-green-500"/></span></li>
            </ul>
          </div>
          <button className="w-full bg-slate-50 p-4 border-t border-slate-100 text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-1" onClick={() => navigateHash('university-governance')}>
            University Governance <ChevronRight size={14} />
          </button>
        </div>

        {/* Layer 2 */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative top-0 hover:-top-1">
          <div className="h-1.5 w-full bg-purple-500" />
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600"><Users size={24} strokeWidth={2.5} /></div>
                <div>
                  <h3 className="font-black text-slate-800 m-0 text-lg">Student Lifecycle</h3>
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded">Layer 2</span>
                </div>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 font-medium list-none p-0 mb-6">
              <li className="flex items-center justify-between"><span className="text-slate-500">Active Apps</span> <span className="flex items-center gap-1 text-slate-800">5,640</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">In Visa Stage</span> <span className="flex items-center gap-1 text-slate-800">847</span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">SLA Breaches</span> <span className="flex items-center gap-1 font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">3 <AlertTriangle size={12}/></span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">TRC Pending</span> <span className="flex items-center gap-1 text-slate-800">473</span></li>
            </ul>
          </div>
          <button className="w-full bg-slate-50 p-4 border-t border-slate-100 text-purple-600 font-bold text-xs hover:bg-purple-50 transition-colors flex items-center justify-center gap-1" onClick={() => navigateHash('student-lifecycle')}>
            Student Lifecycle <ChevronRight size={14} />
          </button>
        </div>

        {/* Layer 3 */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative top-0 hover:-top-1">
          <div className="h-1.5 w-full bg-green-500" />
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-50 rounded-xl text-green-600"><TrendingUp size={24} strokeWidth={2.5} /></div>
                <div>
                  <h3 className="font-black text-slate-800 m-0 text-lg"> </h3>
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded">Layer 3</span>
                </div>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 font-medium list-none p-0 mb-6">
              <li className="flex items-center justify-between"><span className="text-slate-500">Top Agent</span> <span className="flex items-center gap-1 text-slate-800">Global Ed <CheckCircle size={14} className="text-green-500"/></span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">Visa Risk</span> <span className="flex items-center gap-1 font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Zenith (58%) <AlertTriangle size={12}/></span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">Best Market</span> <span className="flex items-center gap-1 text-slate-800">India ($38.2M) <CheckCircle size={14} className="text-green-500"/></span></li>
              <li className="flex items-center justify-between"><span className="text-slate-500">Best ROI</span> <span className="flex items-center gap-1 text-slate-800">Organic (2270%)</span></li>
            </ul>
          </div>
          <button className="w-full bg-slate-50 p-4 border-t border-slate-100 text-green-600 font-bold text-xs hover:bg-green-50 transition-colors flex items-center justify-center gap-1" onClick={() => navigateHash('agents')}>
              <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── SECTION 2: EXECUTIVE METRICS GRID ── */}
      <SectionTitle title="Global Performance Matrix" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-20 transform group-hover:scale-125 transition-transform duration-500"><DollarSign size={80}/></div>
          <div className="relative z-10">
            <div className="text-green-100 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-sm">Total Revenue</div>
            <div className="text-3xl font-black mb-1 drop-shadow-md">$110.3M</div>
            <div className="text-green-100 text-[11px] font-medium">+8.4% YoY</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-20 transform group-hover:scale-125 transition-transform duration-500"><Users size={80}/></div>
          <div className="relative z-10">
            <div className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-sm">Enrolled Students</div>
            <div className="text-3xl font-black mb-1 drop-shadow-md">1,720</div>
            <div className="text-blue-100 text-[11px] font-medium">June 2026 Intake</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-20 transform group-hover:scale-125 transition-transform duration-500"><Shield size={80}/></div>
          <div className="relative z-10">
            <div className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-sm">Platform Compliance</div>
            <div className="text-3xl font-black mb-1 drop-shadow-md">91.4%</div>
            <div className="text-emerald-100 text-[11px] font-medium">Institutional score</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-20 transform group-hover:scale-125 transition-transform duration-500"><TrendingUp size={80}/></div>
          <div className="relative z-10">
            <div className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-sm">Funnel Conversion</div>
            <div className="text-3xl font-black mb-1 drop-shadow-md">12.8%</div>
            <div className="text-indigo-100 text-[11px] font-medium">Leads → Enrolled</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-20 transform group-hover:scale-125 transition-transform duration-500"><AlertTriangle size={80}/></div>
          <div className="relative z-10">
            <div className="text-rose-100 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-sm">SLA Breach Count</div>
            <div className="text-3xl font-black mb-1 drop-shadow-md">9</div>
            <div className="text-rose-100 text-[11px] font-medium">Requires action</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-20 transform group-hover:scale-125 transition-transform duration-500"><Zap size={80}/></div>
          <div className="relative z-10">
            <div className="text-amber-100 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-sm">Governance Exceptions</div>
            <div className="text-3xl font-black mb-1 drop-shadow-md">5 active</div>
            <div className="text-amber-100 text-[11px] font-medium">2 Critical</div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: THREE LAYER SUMMARY PANELS ── */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5 flex-wrap gap-4">
          <SectionTitle title="Strategic Pillars Drill-down" className="m-0" />
          <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
            <button className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'institutional' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 border-0 hover:bg-slate-200'}`} onClick={() => setActiveTab('institutional')}>Institutional</button>
            <button className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'student' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 border-0 hover:bg-slate-200'}`} onClick={() => setActiveTab('student')}>Student Lifecycle</button>
            <button className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'channel' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 border-0 hover:bg-slate-200'}`} onClick={() => setActiveTab('channel')}>Channel Performance</button>
          </div>
        </div>

        {activeTab === 'institutional' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Strategic Initiatives Progress</h4>
              <div className="space-y-3">
                {INITIATIVES.slice(0, 4).map((init, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>{init.name}</span>
                      <span>{init.completion}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${init.completion}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Accreditation & Audits</h4>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-700">MD Medicine Accreditation</span>
                  <span className="badge badge-red">WHO visit Jun 25</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-700">B.Sc Nursing Certification</span>
                  <span className="badge badge-green">WHO Certified</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-700">MBA AACSB Accreditation</span>
                  <span className="badge badge-blue">Candidate Status</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-700">Annual External Audit</span>
                  <span className="badge badge-blue">Scheduled Sep 30</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Lifecycle Pipeline Volume</h4>
              <div className="space-y-2">
                {LIFECYCLE_STAGES.map((st, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 w-24 truncate">{st.stage}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${st.pct}%` }} />
                    </div>
                    <span className="text-xs font-black text-slate-700 w-12 text-right">{st.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Priority SLA Breaches</h4>
              <div className="space-y-2">
                <div className="p-3 bg-red-50/50 rounded-lg border border-red-100 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-red-800">STU-0204 Benjamin Okonkwo (Nigeria)</span>
                    <p className="text-[10px] text-red-600 m-0">Offer SLA breached by 48hrs</p>
                  </div>
                  <button className="primary" style={{ padding: '4px 10px', fontSize: '10px' }} onClick={() => navigateHash('student-lifecycle')}>View</button>
                </div>
                <div className="p-3 bg-red-50/50 rounded-lg border border-red-100 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-red-800">STU-0118 Fatima Al-Rashidi (UAE)</span>
                    <p className="text-[10px] text-red-600 m-0">Fee Payment SLA breached</p>
                  </div>
                  <button className="primary" style={{ padding: '4px 10px', fontSize: '10px' }} onClick={() => navigateHash('student-lifecycle')}>View</button>
                </div>
                <div className="p-3 bg-red-50/50 rounded-lg border border-red-100 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-red-800">STU-0721 Adaeze Nwosu (Nigeria)</span>
                    <p className="text-[10px] text-red-600 m-0">Visa Applied SLA breached by 11 days</p>
                  </div>
                  <button className="primary" style={{ padding: '4px 10px', fontSize: '10px' }} onClick={() => navigateHash('student-lifecycle')}>View</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'channel' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Top Markets</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">1. India</span>
                  <span className="font-extrabold text-blue-600">$38.2M revenue</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">2. Nigeria</span>
                  <span className="font-extrabold text-blue-600">$22.4M revenue</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">3. UAE</span>
                  <span className="font-extrabold text-blue-600">$21.6M revenue</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">4. Nepal</span>
                  <span className="font-extrabold text-blue-600">$11.4M revenue</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Top Recruiter Compliance Grades</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">Global Education Group (India)</span>
                  <span className="badge badge-green font-extrabold">A+ (95.8)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">Elite Scholars Ltd (Turkey)</span>
                  <span className="badge badge-green font-extrabold">A+ (95.8)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">Apex Consultancy (Nepal)</span>
                  <span className="badge badge-amber font-extrabold">C (75.7)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">Zenith Admissions (Nigeria)</span>
                  <span className="badge badge-red font-extrabold">F (63.7)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      {/* ── SECTION: RISK MATRIX OVERVIEW (HEATMAP) ── */}
      <div>
        <Card title="Risk Matrix Overview - Click any cell for project detailed analysis">
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <div className="heatmap" style={{ minWidth: '700px', fontSize: '10px', gap: '3px' }}>
              <div className="heatmap-head" />
              {riskColumns.map((column) => (
                <div className="heatmap-head" key={column} style={{ fontSize: '9px', fontWeight: 'bold' }}>{column}</div>
              ))}
              {riskProjects.map((project, rowIndex) => (
                <Fragment key={project}>
                  <div className="heatmap-project" style={{ fontSize: '10px', padding: '4px 6px' }}>{project}</div>
                  {riskColumns.map((column, colIndex) => {
                    const risk = riskFor(rowIndex, colIndex);
                    return (
                      <button
                        className={`heat-cell ${risk}`}
                        key={`${project}-${column}`}
                        onClick={() => navigateHash('heatmap-detail', { project, dimension: column, risk })}
                        title={`${project} - ${column} - ${risk}`}
                        style={{
                          minHeight: '18px',
                          fontSize: '8px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '2px'
                        }}
                      >
                        {riskInitial(risk)}
                      </button>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ── SECTION: EXCEPTIONS & AGENTS ── */}
      <section className="two-column">
        {/* Exceptions Briefing */}
        <Card title="Exceptions Briefing">
          <div className="exception-list" style={{ marginBottom: '16px', gap: '8px', display: 'flex', flexDirection: 'column' }}>
            {exceptions.slice(0, 4).map((item) => (
              <div 
                key={item.title} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px 10px', 
                  background: '#f8fafc', 
                  borderRadius: '8px', 
                  border: '1px solid #f1f5f9',
                  fontSize: '11px'
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', overflow: 'hidden' }}>
                  <span className={badgeClass[item.badge]} style={{ fontSize: '9px', padding: '2px 6px' }}>{item.badge}</span>
                  <span className="truncate" style={{ fontWeight: 'bold', color: '#475569' }}>{item.title}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontStyle: 'italic', flexShrink: 0 }}>{item.owner.split(' ')[0]}</span>
              </div>
            ))}
          </div>
          <button 
            className="secondary" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', padding: '8px' }}
            onClick={() => navigateHash('exceptions')}
          >
            <span>View All Exceptions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Card>

        {/* Top Recruiting Agents */}
        <Card title="Top Recruiting Agents">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {agents.slice(0, 4).map((agent) => (
              <div key={agent.name} style={{ fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ color: '#475569' }}>{agent.name}</strong>
                  <span style={{ fontWeight: 'bold', color: '#0f766e' }}>{agent.revenue}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-blue" style={{ fontSize: '9px', padding: '1px 5px' }}>{agent.country}</span>
                  <span style={{ color: '#64748b' }}>Apps: <strong>{agent.apps}</strong></span>
                  <span style={{ color: '#64748b' }}>Visa Success: <strong style={{ color: agent.visa >= 90 ? '#16a34a' : '#d97706' }}>{agent.visa}%</strong></span>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="secondary" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', padding: '8px' }}
            onClick={() => navigateHash('agents')}
          >
            <span>Go to Agents Governance</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Card>
      </section>
      {/* ── SECTION: CRITICAL ACTIONS + QUICK COMMANDS ── */}
      <section className="two-column">
        {/* CRITICAL ACTIONS PANEL */}
        <Card title="Critical Governance Actions" className="h-full flex flex-col">
          <div className="flex flex-col gap-3 mt-4 flex-1 justify-between">
            {EXEC_ACTIONS.map((act, index) => {
              const isCrit = act.priority === 'Critical';
              const handleEscalate = () => {
                if (act.layer === 'L1') {
                  navigateHash('university-governance');
                } else if (act.layer === 'L2') {
                  navigateHash('student-lifecycle');
                } else if (act.layer === 'L3') {
                  navigateHash('agents');
                }
              };

              return (
                <div key={index} className={`bg-white border p-4 rounded-lg shadow-sm flex flex-col gap-3 ${isCrit ? 'border-l-4 border-l-red-500 border-red-100' : 'border-l-4 border-l-amber-500 border-amber-100'}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${isCrit ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{act.priority}</span>
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded uppercase bg-slate-800 text-slate-200">{act.layer}</span>
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase bg-red-500 text-white`}>{act.dueIn}</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-snug">{act.action}</p>
                  <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">Owner: {act.owner}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold rounded transition-colors flex items-center gap-1" onClick={() => onAsk(act.action)}><Bot size={12}/> Ask Buddy</button>
                      <button className="px-3 py-1.5 bg-slate-700 text-white hover:bg-slate-900 text-xs font-bold rounded transition-colors" onClick={handleEscalate}>Escalate</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* QUICK ACTIONS */}
        <Card title="Command Quick Actions" className="h-full flex flex-col">
          <div className="grid grid-cols-2 gap-3 mt-4 flex-1">
            <button className="p-3 bg-slate-50 hover:bg-red-600 border border-slate-200 rounded-lg flex items-center gap-3 transition-all text-left group" onClick={() => navigateHash('student-lifecycle')}>
              <div className="p-2 bg-red-100 text-red-600 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors"><AlertTriangle size={16}/></div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">Review SLA Breaches</span>
            </button>
            <button className="p-3 bg-slate-50 hover:bg-amber-500 border border-slate-200 rounded-lg flex items-center gap-3 transition-all text-left group" onClick={() => navigateHash('finance-governance')}>
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors"><DollarSign size={16}/></div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">Approve Scholarships</span>
            </button>
            <button className="p-3 bg-slate-50 hover:bg-blue-600 border border-slate-200 rounded-lg flex items-center gap-3 transition-all text-left group" onClick={() => navigateHash('student-pipeline')}>
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors"><Clock size={16}/></div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">Check Visa Pipeline</span>
            </button>
            <button className="p-3 bg-slate-50 hover:bg-emerald-600 border border-slate-200 rounded-lg flex items-center gap-3 transition-all text-left group" onClick={() => navigateHash('admission-quality')}>
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors"><Shield size={16}/></div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">Agent Governance</span>
            </button>
            <button className="p-3 bg-slate-50 hover:bg-indigo-600 border border-slate-200 rounded-lg flex items-center gap-3 transition-all text-left group" onClick={() => navigateHash('markets')}>
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-colors"><Globe size={16}/></div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">Market Intelligence</span>
            </button>
            <button className="p-3 bg-slate-50 hover:bg-teal-600 border border-slate-200 rounded-lg flex items-center gap-3 transition-all text-left group" onClick={() => navigateHash('revenue-governance')}>
              <div className="p-2 bg-teal-100 text-teal-600 rounded-lg group-hover:bg-teal-500 group-hover:text-white transition-colors"><TrendingUp size={16}/></div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">Revenue Report</span>
            </button>
            <button className="p-3 bg-slate-50 hover:bg-rose-600 border border-slate-200 rounded-lg flex items-center gap-3 transition-all text-left group" onClick={() => navigateHash('compliance-centre')}>
              <div className="p-2 bg-rose-100 text-rose-600 rounded-lg group-hover:bg-rose-500 group-hover:text-white transition-colors"><ShieldAlert size={16}/></div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">Compliance Issues</span>
            </button>
            <button className="p-3 bg-slate-50 hover:bg-purple-600 border border-slate-200 rounded-lg flex items-center gap-3 transition-all text-left group" onClick={() => onAsk('What are the most critical governance issues today?')}>
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors"><Bot size={16}/></div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-white transition-colors">Ask Buddy</span>
            </button>
          </div>
        </Card>
      </section>

      {/* ── GOVERNANCE BUDDY INTEGRATION ── */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 rounded-xl p-6 text-white shadow-lg border border-blue-800 relative">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Bot size={120} /></div>
        <div className="relative z-10">
          <h3 className="text-lg font-black flex items-center gap-2 mb-4"><Bot size={20} className="text-blue-400"/> Governance Buddy — AI Intelligence</h3>
          <div className="flex flex-wrap gap-2 mb-5">
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-colors" onClick={() => onAsk('Which students breach visa SLA this week?')}>Which students breach visa SLA this week?</button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-colors" onClick={() => onAsk('What is the financial health of the university?')}>What is the financial health of the university?</button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-colors" onClick={() => onAsk('Which channel has the highest ROI?')}>Which channel has the highest ROI?</button>
          </div>
          <form onSubmit={submitBuddy} className="flex relative">
            <input 
              type="text" 
              value={buddyInput}
              onChange={e => setBuddyInput(e.target.value)}
              placeholder="Ask any question about university governance, revenue, or students..." 
              className="w-full bg-slate-900/50 border border-blue-700/50 rounded-lg py-3 pl-4 pr-12 text-sm text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 rounded px-3 flex items-center justify-center transition-colors">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
