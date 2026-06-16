import { useState } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import { STUDENTS, LIFECYCLE_STAGES } from '../data/dashboardData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';

export default function StudentPipelinePage({ onAsk }) {
  // Volume by country
  const countryCounts = STUDENTS.reduce((acc, s) => {
    acc[s.country] = (acc[s.country] || 0) + 1;
    return acc;
  }, {});
  const countryData = Object.keys(countryCounts).map(k => ({ country: k, volume: countryCounts[k] }));

  // Volume by program
  const programCounts = STUDENTS.reduce((acc, s) => {
    acc[s.program] = (acc[s.program] || 0) + 1;
    return acc;
  }, {});
  const programData = Object.keys(programCounts).map(k => ({ name: k, value: programCounts[k] }));
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const atRiskStudents = STUDENTS.filter(s => s.daysInStage > s.slaThreshold * 0.8);
  const breachedCount = atRiskStudents.filter(s => s.status === 'Breached').length;

  return (
    <>
      <div className="rounded-xl mb-6 p-6 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">Layer 2: Student Governance</span>
        </div>
        <h2 className="text-2xl font-black text-white mb-1">Student Pipeline Overview</h2>
        <p className="text-blue-100 text-sm">Kanban Board — Live Admission Pipeline — June 2026 Intake</p>
      </div>

      <SectionTitle title="Live Pipeline Board" />
      <div className="overflow-x-auto mb-6 pb-4">
        <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
          {LIFECYCLE_STAGES.map(stage => {
            const stageStudents = STUDENTS.filter(s => s.stage === stage.stage);
            const isBreached = stage.sla === 'Breached';
            
            return (
              <div key={stage.stage} className="flex flex-col bg-slate-50 rounded-lg p-3 min-w-[240px] w-[240px]">
                <div className={`px-3 py-2 rounded-t-lg font-bold text-sm flex justify-between items-center mb-3 ${isBreached ? 'bg-red-100 text-red-800 border-b-2 border-red-200' : 'bg-green-100 text-green-800 border-b-2 border-green-200'}`}>
                  <span>{stage.stage}</span>
                  <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs">{stage.count}</span>
                </div>
                
                <div className="flex flex-col gap-2 flex-1">
                  {stageStudents.slice(0, 3).map(s => (
                    <div key={s.id} className="bg-white p-3 rounded shadow-sm border border-slate-100 text-xs flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <strong className="text-slate-800">{s.name} {s.flag}</strong>
                      </div>
                      <div className="text-slate-500">{s.program}</div>
                      <div className="text-slate-400 text-[10px]">{s.agent}</div>
                      <div className="mt-1 flex justify-between items-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.status === 'Breached' ? 'bg-red-100 text-red-700' : s.daysInStage > s.slaThreshold * 0.8 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                          {s.daysInStage} / {s.slaThreshold} d
                        </span>
                      </div>
                    </div>
                  ))}
                  {stageStudents.length === 0 && (
                    <div className="text-slate-400 text-xs italic text-center py-4">No top students in stage</div>
                  )}
                </div>
                
                <button className="mt-3 w-full py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                  View All
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <section className="two-column">
        <Card title="Volume by Country">
          <div style={{ height: '200px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="country" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="volume" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Volume by Program">
          <div style={{ height: '200px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={programData} innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {programData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="two-column">
        <Card title="Avg Days per Stage vs SLA">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs" style={{ minWidth: '400px' }}>
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2">Stage</th>
                  <th className="py-2">Avg Days</th>
                  <th className="py-2">SLA</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Performance</th>
                </tr>
              </thead>
              <tbody>
                {LIFECYCLE_STAGES.map(stage => {
                  const isBreached = stage.avgDays > stage.slaThreshold;
                  const pct = Math.min((stage.avgDays / stage.slaThreshold) * 100, 100);
                  return (
                    <tr key={stage.stage} className="border-b border-slate-100">
                      <td className="py-2 font-bold text-slate-700">{stage.stage}</td>
                      <td className="py-2">{stage.avgDays}</td>
                      <td className="py-2">{stage.slaThreshold}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isBreached ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {isBreached ? 'BREACHED' : 'OK'}
                        </span>
                      </td>
                      <td className="py-2">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className={`h-full rounded-full ${isBreached ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="At-Risk Students Alert">
          <div className="mb-4 text-xs font-bold text-slate-500 flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-500" />
            {atRiskStudents.length} students at risk, {breachedCount} breached
          </div>
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {atRiskStudents.map(s => {
              const isBreach = s.status === 'Breached';
              return (
                <div key={s.id} className={`flex items-center justify-between p-3 rounded border-l-4 text-xs bg-white shadow-sm ${isBreach ? 'border-l-red-500 bg-red-50' : 'border-l-amber-500 bg-amber-50'}`}>
                  <div>
                    <div className="font-bold text-slate-800">{s.id} • {s.name} {s.flag}</div>
                    <div className="text-slate-500 mt-0.5">Stage: {s.stage} ({s.daysInStage}/{s.slaThreshold}d)</div>
                  </div>
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-600 font-bold hover:bg-slate-50 transition-colors" onClick={() => onAsk(`Escalate student ${s.id}`)}>
                    Escalate
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </>
  );
}
