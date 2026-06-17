import { useState } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import { COMPLIANCE_ISSUES } from '../data/dashboardData';
import { ShieldAlert, CheckCircle, AlertTriangle, Clock, FileText, Database, Globe, Bell } from 'lucide-react';

export default function ComplianceCentrePage({ onAsk }) {
  const [activeIssues, setActiveIssues] = useState(COMPLIANCE_ISSUES);
  const [complianceEscalated, setComplianceEscalated] = useState(null);
  const AUDIT_FINDINGS = [
    { finding: 'Student visa tracking system upgrade required', status: 'In Progress', completion: 65 },
    { finding: 'Faculty qualification verification process gaps', status: 'Resolved', completion: 100 },
    { finding: 'Financial controls documentation update', status: 'Resolved', completion: 100 },
    { finding: 'Agent contract governance framework', status: 'In Progress', completion: 40 },
    { finding: 'Data retention policy implementation', status: 'Planned', completion: 20 },
  ];

  const POLICIES = [
    { name: 'Student Admissions Policy', status: 'Current', lastReview: 'Jan 2026', nextDue: 'Jan 2028' },
    { name: 'International Student Welfare', status: 'Due for Review', lastReview: 'Jan 2024', nextDue: 'Jan 2026' },
    { name: 'Agent & Vendor Agreements', status: 'Due for Review', lastReview: 'Aug 2024', nextDue: 'Aug 2026' },
    { name: 'Data Protection & Privacy', status: 'Current', lastReview: 'Mar 2026', nextDue: 'Mar 2028' },
    { name: 'Academic Integrity Policy', status: 'Current', lastReview: 'Sep 2025', nextDue: 'Sep 2027' },
    { name: 'Financial Aid & Scholarships', status: 'Due for Review', lastReview: 'Nov 2023', nextDue: 'Nov 2025' },
  ];

  return (
    <>
      <div className="rounded-xl mb-6 p-6 bg-gradient-to-r from-red-700 to-rose-800 text-white shadow-lg">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/20 text-white border border-white/10"> </span>
        </div>
        <h2 className="text-2xl font-black text-white mb-1">Compliance & Risk Management Centre</h2>
        <p className="text-red-100 text-sm">Regulatory, Data Protection & Institutional Risk Monitoring</p>
      </div>

      <SectionTitle title="Compliance Score Dashboard" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Overall Compliance', value: 91.4, color: '#16a34a' },
          { label: 'Data Protection', value: 98.2, color: '#16a34a' },
          { label: 'Accreditation', value: 100, color: '#16a34a' },
          { label: 'Immigration', value: 84.1, color: '#f59e0b' },
          { label: 'Financial', value: 96.8, color: '#16a34a' }
        ].map((score, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                <circle cx="40" cy="40" r="36" fill="none" stroke={score.color} strokeWidth="6" strokeDasharray={`${(score.value / 100) * 226} 226`} strokeLinecap="round" />
              </svg>
              <span className="font-black text-lg text-slate-800 relative z-10">{score.value}%</span>
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{score.label}</span>
          </div>
        ))}
      </div>

      <SectionTitle title="Active Compliance Issues" />
      <Card className="mb-6 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" style={{ minWidth: '900px' }}>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Issue Description</th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Days Open</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeIssues.map(issue => {
                const isOverdue = issue.deadline === 'Overdue';
                const isImm = issue.deadline === 'Immediate';
                
                return (
                  <tr key={issue.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-400">{issue.id}</td>
                    <td className="px-4 py-3 font-bold text-slate-700">{issue.issue}</td>
                    <td className="px-4 py-3 text-slate-600">{issue.area}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${issue.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {issue.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{issue.owner}</td>
                    <td className="px-4 py-3 font-medium">{issue.daysOpen}</td>
                    <td className={`px-4 py-3 font-bold ${isOverdue || isImm ? 'text-red-600' : 'text-slate-600'}`}>
                      {issue.deadline}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded font-bold transition" onClick={() => setActiveIssues(prev => prev.filter(item => item.id !== issue.id))}>Resolve</button>
                      <button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-3 py-1 rounded font-bold transition" onClick={() => setComplianceEscalated(`Escalated compliance issue ${issue.id} ("${issue.issue}") to the Legal Affairs team and Ministry Liaison.`)}>Escalate</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="two-column">
        <Card title="Audit History & Schedule">
          <div className="flex flex-col gap-5 mt-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center">
              <div className="text-xs text-green-700 font-bold uppercase tracking-wide mb-1">Last External Audit</div>
              <div className="text-3xl font-black text-green-600 mb-1">94.1%</div>
              <div className="inline-flex items-center gap-1 bg-green-200 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full"><CheckCircle size={12} /> PASSED</div>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Next Major Audit</div>
              <div className="text-xl font-black text-slate-700 mb-1">Sep 30, 2026</div>
              <div className="inline-flex items-center gap-1 bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full"><Clock size={12} /> in 106 days</div>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Regulatory Bodies</h4>
              <ul className="space-y-2">
                {['Ministry of Education (Primary Regulator)', 'WHO (Health programs — site visit Jun 25)', 'National Accreditation Board', 'Data Protection Authority'].map((body, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <Globe size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    <span>{body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Key Audit Findings Status">
          <div className="flex flex-col gap-4 mt-4">
            {AUDIT_FINDINGS.map((finding, i) => {
              const isResolved = finding.status === 'Resolved';
              const isProg = finding.status === 'In Progress';
              return (
                <div key={i} className="bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-700 text-xs pr-4">{finding.finding}</span>
                    <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold ${isResolved ? 'bg-green-100 text-green-700' : isProg ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                      {finding.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${isResolved ? 'bg-green-500' : isProg ? 'bg-blue-500' : 'bg-slate-400'}`} style={{ width: `${finding.completion}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 w-6 text-right">{finding.completion}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <SectionTitle title="Policy Library Status" />
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {POLICIES.map((pol, i) => {
            const isCurrent = pol.status === 'Current';
            return (
              <div key={i} className={`flex items-center justify-between p-3 rounded border-l-4 text-xs bg-white shadow-sm border ${isCurrent ? 'border-l-green-500 border-slate-100' : 'border-l-red-500 border-red-100 bg-red-50/30'}`}>
                <div className="flex items-start gap-3">
                  <FileText className={isCurrent ? 'text-green-500' : 'text-red-500'} size={20} />
                  <div>
                    <div className="font-bold text-slate-800">{pol.name}</div>
                    <div className="text-slate-500 mt-1 flex gap-3">
                      <span>Reviewed: {pol.lastReview}</span>
                      <span>Next Due: {pol.nextDue}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold shrink-0 ${isCurrent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isCurrent ? 'Current' : 'OVERDUE'}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {complianceEscalated && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Compliance Escalation</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-5">{complianceEscalated}</p>
            <button className="w-full primary" onClick={() => setComplianceEscalated(null)}>Dismiss</button>
          </div>
        </div>
      )}
    </>
  );
}
