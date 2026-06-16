import { useState } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import MetricCard from '../components/common/MetricCard';
import { INITIATIVES, GOV_CALENDAR } from '../data/dashboardData';
import { University, ShieldCheck, BookOpen, Banknote, FlaskConical, ChevronRight, AlertTriangle, Calendar, CheckCircle, ShieldAlert } from 'lucide-react';
import { navigateHash } from '../utils/routing';

export default function UniversityGovernancePage({ onAsk }) {
  return (
    <>
      <div className="rounded-xl mb-6 p-6 bg-gradient-to-r from-slate-700 to-gray-800 text-white">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/30 text-white border border-white/10">Layer 1: Institutional Governance</span>
        </div>
        <h2 className="text-2xl font-black text-white mb-1">University Governance Overview</h2>
        <p className="text-slate-300 text-sm">Institutional Health, Strategy & Compliance Dashboard</p>
      </div>

      <SectionTitle title="Institutional Health KPIs" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <MetricCard label="Overall Compliance Score" value="91.4%" note="Institutional health" tone="green" />
        <MetricCard label="Academic Performance Index" value="87.2%" note="All 14 programs" tone="green" />
        <MetricCard label="Financial Health" value="Strong" note="Revenue: 108.2% of budget" tone="green" />
        <MetricCard label="Active Research Projects" value="28" note="$8.4M in grants" tone="blue" />
        <MetricCard label="Strategic Initiatives" value="8 of 12" note="On Track (4 need attention)" tone="amber" />
      </div>

      <SectionTitle title="Governance Pillars" />
      <section className="two-column">
        {/* Academic */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="h-1 bg-blue-500 w-full" />
          <div className="p-5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><BookOpen size={20} /></div>
              <h3 className="font-bold text-slate-800 m-0 text-base">Academic Excellence</h3>
            </div>
            <ul className="text-sm text-slate-600 space-y-2 mb-5 list-none p-0">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"/> Programs Accredited: 14 of 14 (100%)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"/> Avg Program Completion Rate: 91.2%</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"/> Faculty-Student Ratio: 1:18</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"/> Graduate Employment Rate: 94.8%</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <button className="w-full text-blue-600 font-bold text-xs hover:text-blue-700 transition flex items-center justify-center gap-1" onClick={() => navigateHash('academic-performance')}>
              View Academic Performance <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Financial */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="h-1 bg-green-500 w-full" />
          <div className="p-5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-50 rounded-lg text-green-600"><Banknote size={20} /></div>
              <h3 className="font-bold text-slate-800 m-0 text-base">Financial Governance</h3>
            </div>
            <ul className="text-sm text-slate-600 space-y-2 mb-5 list-none p-0">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"/> Annual Revenue: $110.3M</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"/> Budget Utilization: 88.4%</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"/> Outstanding Receivables: $4.2M</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"/> Scholarship Fund: 68% allocated</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <button className="w-full text-green-600 font-bold text-xs hover:text-green-700 transition flex items-center justify-center gap-1" onClick={() => navigateHash('finance-governance')}>
              View Finance Governance <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Compliance */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="h-1 bg-red-500 w-full" />
          <div className="p-5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-red-50 rounded-lg text-red-600"><ShieldAlert size={20} /></div>
              <h3 className="font-bold text-slate-800 m-0 text-base">Compliance & Risk</h3>
            </div>
            <ul className="text-sm text-slate-600 space-y-2 mb-5 list-none p-0">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"/> Active Compliance Issues: 3</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"/> Last External Audit Score: 94.1%</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"/> Pending Regulatory Actions: 1</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"/> Data Protection Score: 98.2%</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <button className="w-full text-red-600 font-bold text-xs hover:text-red-700 transition flex items-center justify-center gap-1" onClick={() => navigateHash('compliance-centre')}>
              View Compliance Centre <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Research */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="h-1 bg-purple-500 w-full" />
          <div className="p-5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><FlaskConical size={20} /></div>
              <h3 className="font-bold text-slate-800 m-0 text-base">Research & Development</h3>
            </div>
            <ul className="text-sm text-slate-600 space-y-2 mb-5 list-none p-0">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"/> Active Research Projects: 28</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"/> Published Papers This Year: 142</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"/> Research Grants Secured: $8.4M</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"/> Industry Partnerships: 14</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
            <span className="text-slate-400 text-xs italic">(Informational — no sub-page)</span>
          </div>
        </div>
      </section>

      <section className="two-column">
        <Card title="Strategic Initiatives Tracker">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs" style={{ minWidth: '600px' }}>
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-4">Initiative Name</th>
                  <th className="py-2 pr-4 w-32">Progress</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Owner</th>
                  <th className="py-2 pr-4">Deadline</th>
                  <th className="py-2">Risk</th>
                </tr>
              </thead>
              <tbody>
                {INITIATIVES.map(init => {
                  const statusColors = {
                    'On Track': { bg: 'bg-green-100', text: 'text-green-800', bar: 'bg-green-500' },
                    'At Risk': { bg: 'bg-amber-100', text: 'text-amber-800', bar: 'bg-amber-500' },
                    'Behind': { bg: 'bg-red-100', text: 'text-red-800', bar: 'bg-red-500' },
                  };
                  const riskColors = {
                    'Low': 'bg-green-100 text-green-800',
                    'Medium': 'bg-blue-100 text-blue-800',
                    'High': 'bg-amber-100 text-amber-800',
                    'Critical': 'bg-red-100 text-red-800',
                  };
                  const sc = statusColors[init.status];
                  return (
                    <tr key={init.name} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 pr-4 font-bold text-slate-700">{init.name}</td>
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className={`h-full rounded-full ${sc.bar}`} style={{ width: `${init.completion}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-500 w-6">{init.completion}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sc.bg} ${sc.text}`}>{init.status}</span>
                      </td>
                      <td className="py-2.5 pr-4 text-slate-600">{init.owner}</td>
                      <td className="py-2.5 pr-4 text-slate-600 whitespace-nowrap">{init.deadline}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${riskColors[init.risk]}`}>{init.risk}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Upcoming Governance Events — Jun-Sep 2026">
          <div className="flex flex-col relative pl-4 mt-2">
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-100" />
            
            {GOV_CALENDAR.map((ev, i) => {
              const dots = {
                'Critical': 'bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.2)] animate-pulse',
                'High': 'bg-amber-500',
                'Medium': 'bg-slate-400'
              };
              return (
                <div key={i} className="relative pb-6 pl-6 last:pb-0">
                  <div className={`absolute left-[-4px] top-1.5 w-3 h-3 rounded-full ${dots[ev.urgency]}`} />
                  <div className="bg-white border border-slate-100 shadow-sm p-3 rounded-lg text-xs hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <strong className="text-slate-800">{ev.date}</strong>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{ev.type}</span>
                    </div>
                    <div className="text-slate-600 font-medium">{ev.event}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </>
  );
}
