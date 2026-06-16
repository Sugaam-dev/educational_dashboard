import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import MetricCard from '../components/common/MetricCard';
import { ACADEMIC_PROGRAMS } from '../data/dashboardData';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Star, AlertTriangle } from 'lucide-react';

export default function AcademicPerformancePage({ onAsk }) {
  const GRAD_TREND = [
    { year: '2022', rate: 83.1 },
    { year: '2023', rate: 84.8 },
    { year: '2024', rate: 85.9 },
    { year: '2025', rate: 86.7 },
    { year: '2026', rate: 87.4 },
  ];

  const SATISFACTION_RADAR = [
    { metric: 'Teaching Quality', score: 4.4 },
    { metric: 'Research', score: 3.8 },
    { metric: 'Campus Life', score: 4.1 },
    { metric: 'Career Support', score: 4.0 },
    { metric: 'Academic Resources', score: 4.3 },
  ];

  const FACULTY_QUAL = [
    { type: 'PhD', value: 82.1 },
    { type: 'Masters', value: 12.4 },
    { type: 'Professional Cert', value: 5.5 },
  ];

  return (
    <>
      <div className="rounded-xl mb-6 p-6 bg-gradient-to-r from-blue-600 to-cyan-700 text-white">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/20 text-white border border-white/10">Layer 1: Institutional Governance</span>
        </div>
        <h2 className="text-2xl font-black text-white mb-1">Academic Excellence & Performance</h2>
        <p className="text-blue-100 text-sm">Program-Level Quality, Accreditation & Outcome Metrics</p>
      </div>

      <SectionTitle title="Academic KPIs" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <MetricCard label="Programs Accredited" value="14/14" note="100% compliance" tone="green" />
        <MetricCard label="Student Satisfaction" value="4.2 / 5.0" note="Overall average" tone="green" />
        <MetricCard label="Graduation Rate" value="87.4%" note="On-Time, All programs" tone="green" />
        <MetricCard label="Faculty with PhD" value="82.1%" note="Qualified faculty" tone="blue" />
        <MetricCard label="Faculty-Student Ratio" value="1:18" note="Campus average" tone="blue" />
        <MetricCard label="Employment Rate" value="94.8%" note="12 months post-grad" tone="green" />
      </div>

      <SectionTitle title="Program Performance & Accreditation" />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" style={{ minWidth: '800px' }}>
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-4">Program</th>
                <th className="py-2 pr-4 text-right">Faculty</th>
                <th className="py-2 pr-4 text-right">Students</th>
                <th className="py-2 pr-4 text-right">Grad Rate</th>
                <th className="py-2 pr-4">Satisfaction</th>
                <th className="py-2 pr-4 text-right">Employ Rate</th>
                <th className="py-2 pr-4">Accreditation</th>
                <th className="py-2 pr-4">Next Review</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ACADEMIC_PROGRAMS.map(prog => {
                const upcomingReview = prog.nextReview.includes('2026');
                const isCritical = prog.nextReview.includes('Jun 2026');
                
                return (
                  <tr key={prog.program} className={`border-b border-slate-100 ${upcomingReview ? (isCritical ? 'bg-red-50' : 'bg-yellow-50/50') : ''}`}>
                    <td className="py-2 pr-4 font-bold text-slate-700">{prog.program}</td>
                    <td className="py-2 pr-4 text-right text-slate-600">{prog.faculty}</td>
                    <td className="py-2 pr-4 text-right text-slate-600">{prog.students}</td>
                    <td className="py-2 pr-4 text-right font-medium">{prog.gradRate}%</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        <span className="text-slate-700 font-bold mr-1">{prog.satisfaction}</span>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < Math.floor(prog.satisfaction) ? 'currentColor' : 'none'} className={i < Math.floor(prog.satisfaction) ? 'text-amber-500' : 'text-slate-300'} />
                        ))}
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-right font-medium">{prog.employRate}%</td>
                    <td className="py-2 pr-4 text-slate-600">{prog.accreditation}</td>
                    <td className={`py-2 pr-4 font-medium ${isCritical ? 'text-red-600' : upcomingReview ? 'text-amber-600' : 'text-slate-600'}`}>{prog.nextReview}</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${prog.status === 'Excellent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{prog.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="two-column mt-5">
        <Card title="Graduation Rate Trend (Last 5 Years)">
          <div style={{ height: '220px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GRAD_TREND} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={[80, 90]} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', fontSize: '11px' }} formatter={v => [`${v}%`, 'Graduation Rate']} />
                <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#64748b', fontSize: 10, formatter: v => `${v}%` }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Student Satisfaction & Faculty Profile">
          <div className="flex flex-col h-[220px]">
            <div style={{ flex: 1, minHeight: '130px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={SATISFACTION_RADAR} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 9 }} />
                  <Radar name="Satisfaction Score (out of 5)" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ height: '80px', display: 'flex', alignItems: 'center' }} className="border-t border-slate-100 pt-2 mt-2">
              <div style={{ width: '100px', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={FACULTY_QUAL} innerRadius={25} outerRadius={35} paddingAngle={2} dataKey="value" stroke="none">
                      {FACULTY_QUAL.map((e, i) => <Cell key={i} fill={['#3b82f6','#8b5cf6','#94a3b8'][i]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 text-[10px] text-slate-600">
                <div className="font-bold text-slate-800 mb-1">Faculty Qualifications</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full" /> 82.1% PhD</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-full" /> 12.4% Masters</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-400 rounded-full" /> 5.5% Prof. Cert</div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <SectionTitle title="Accreditation Risk Monitor" />
      <div className="grid gap-3">
        {/* Critical */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm flex items-start gap-3">
          <AlertTriangle className="text-red-500 mt-0.5" size={20} />
          <div className="flex-1">
            <h4 className="text-red-800 font-bold text-sm mb-1">CRITICAL: MD Medicine — WHO Site Visit (Jun 25, 2026)</h4>
            <p className="text-red-700 text-xs mb-2">Only 9 days away. Documentation package is incomplete. Standard 4 (Clinical Facilities) requires urgent sign-off from Hospital Director.</p>
            <button className="bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-red-700 transition" onClick={() => onAsk('What documents are missing for the WHO site visit?')}>Escalate to Faculty Dean</button>
          </div>
        </div>
        
        {/* Warnings */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded shadow-sm flex items-start gap-3">
          <AlertTriangle className="text-amber-500 mt-0.5" size={20} />
          <div className="flex-1">
            <h4 className="text-amber-800 font-bold text-sm mb-1">PLANNING REQUIRED: Master of Public Health — CEPH Renewal (Nov 2026)</h4>
            <p className="text-amber-700 text-xs">Self-study report due in 60 days. Progress currently at 45%.</p>
          </div>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded shadow-sm flex items-start gap-3">
          <AlertTriangle className="text-amber-500 mt-0.5" size={20} />
          <div className="flex-1">
            <h4 className="text-amber-800 font-bold text-sm mb-1">PLANNING REQUIRED: B.Sc Nursing — National Board Review (Dec 2026)</h4>
            <p className="text-amber-700 text-xs">Awaiting curriculum mapping updates from 3 faculty members.</p>
          </div>
        </div>
      </div>
    </>
  );
}
