import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import MetricCard from '../components/common/MetricCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function FinanceGovernancePage({ onAsk }) {
  const REVENUE_BREAKDOWN = [
    { source: 'Tuition', revenue: 98.4, fill: '#10b981' },
    { source: 'Research Grants', revenue: 8.4, fill: '#3b82f6' },
    { source: 'Hostel & Ancillary', revenue: 2.1, fill: '#8b5cf6' },
    { source: 'Events & Licensing', revenue: 1.4, fill: '#f59e0b' },
  ];

  const EXPENSES = [
    { name: 'Academic Staff', value: 42.1, pct: 43.2 },
    { name: 'Admin & Ops', value: 18.4, pct: 18.9 },
    { name: 'Infrastructure & IT', value: 14.2, pct: 14.6 },
    { name: 'Marketing & Recruit', value: 11.8, pct: 12.1 },
    { name: 'Research & Dev', value: 7.4, pct: 7.6 },
    { name: 'Other', value: 3.5, pct: 3.6 },
  ];
  const EXP_COLORS = ['#3b82f6','#10b981','#8b5cf6','#f59e0b','#0891b2','#94a3b8'];

  const RECEIVABLES = [
    { country: 'Nigeria', amount: 1200000, status: 'FX Risk', pct: 100 },
    { country: 'Bangladesh', amount: 980000, status: 'Delayed', pct: 81 },
    { country: 'India', amount: 780000, status: 'Processing', pct: 65 },
    { country: 'Nepal', amount: 640000, status: 'Processing', pct: 53 },
    { country: 'Others', amount: 600000, status: 'Normal', pct: 50 },
  ];

  const SCHOLARSHIP_BACKLOG = [
    { program: 'MBA', pending: 8, value: 240000, status: 'Blocked' },
    { program: 'Nursing', pending: 6, value: 180000, status: 'Pending FD' },
    { program: 'MD Medicine', pending: 3, value: 150000, status: 'Pending FD' },
  ];

  const CASH_FLOW = [
    { month: 'Jan', inflow: 9.2, outflow: 7.8 },
    { month: 'Feb', inflow: 10.1, outflow: 8.4 },
    { month: 'Mar', inflow: 11.4, outflow: 9.1 },
    { month: 'Apr', inflow: 10.8, outflow: 8.6 },
    { month: 'May', inflow: 12.2, outflow: 9.8 },
    { month: 'Jun', inflow: 13.1, outflow: 10.4 },
  ];

  return (
    <>
      <div className="rounded-xl mb-6 p-6 bg-gradient-to-r from-green-700 to-emerald-800 text-white">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/20 text-white border border-white/10"> </span>
        </div>
        <h2 className="text-2xl font-black text-white mb-1">Financial Governance</h2>
        <p className="text-green-100 text-sm">Revenue, Expenditure & Financial Health Dashboard — FY 2026</p>
      </div>

      <SectionTitle title="Financial KPIs" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <MetricCard label="Total Annual Revenue" value="$110.3M" note="+8.4% vs FY2025" tone="green" />
        <MetricCard label="Operating Expenses" value="$97.4M" note="88.4% budget utilization" tone="blue" />
        <MetricCard label="Net Surplus" value="$12.9M" note="11.7% net margin" tone="green" />
        <MetricCard label="Budget Utilization" value="88.4%" note="On track" tone="blue" />
        <MetricCard label="Outstanding Receivables" value="$4.2M" note="3.8% of revenue" tone="amber" />
        <MetricCard label="Scholarship Fund" value="$8.4M / $12.4M" note="67.7% allocated" tone="amber" />
      </div>

      <SectionTitle title="Revenue & Expense Breakdown" />
      <section className="two-column">
        <Card title="Revenue Source Waterfall ($M)">
          <div style={{ height: '260px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_BREAKDOWN} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="source" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `$${v}M`} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', fontSize: '11px' }} formatter={v => [`$${v}M`, 'Revenue']} />
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#64748b', fontSize: 10, formatter: v => `$${v}M` }}>
                  {REVENUE_BREAKDOWN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Operating Expenses Breakdown">
          <div style={{ height: '260px', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, minHeight: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={EXPENSES} innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                    {EXPENSES.map((e, i) => <Cell key={i} fill={EXP_COLORS[i % EXP_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={v => [`$${v}M`, 'Expense']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-600 px-4 pb-2">
              {EXPENSES.map((e, i) => (
                <div key={e.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: EXP_COLORS[i] }} />
                    {e.name}
                  </div>
                  <span className="font-bold">{e.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <SectionTitle title="Financial Risk Alerts" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-600 to-rose-700 p-5 rounded-xl text-white shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-transform"><AlertTriangle size={64} /></div>
          <h3 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle size={16} /> Scholarship Fund Gap</h3>
          <p className="text-red-100 text-xs mb-4 leading-relaxed">$4.0M gap vs target for endowment. Deadline Jul 1, 2026.</p>
          <button className="bg-white text-red-700 text-xs font-bold px-4 py-2 rounded shadow-sm hover:bg-red-50 transition" onClick={() => onAsk('Escalate scholarship fund gap to Board')}>Escalate to Board</button>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-5 rounded-xl text-white shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-transform"><TrendingDown size={64} /></div>
          <h3 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle size={16} /> FX Risk Exposure</h3>
          <p className="text-amber-100 text-xs mb-4 leading-relaxed">Nigeria tuition receivables $1.2M outstanding — high volatility risk.</p>
          <button className="bg-white text-amber-700 text-xs font-bold px-4 py-2 rounded shadow-sm hover:bg-amber-50 transition" onClick={() => onAsk('What is our FX hedging strategy for Nigeria?')}>Review Hedging Strategy</button>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-5 rounded-xl text-white shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-transform"><DollarSign size={64} /></div>
          <h3 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle size={16} /> Unapproved Exceptions</h3>
          <p className="text-amber-100 text-xs mb-4 leading-relaxed">MBA cost exceptions: 11 cases pending Finance Director review.</p>
          <button className="bg-white text-amber-700 text-xs font-bold px-4 py-2 rounded shadow-sm hover:bg-amber-50 transition" onClick={() => onAsk('Show me the pending MBA cost exceptions')}>Review Cases</button>
        </div>
      </div>

      <SectionTitle title="Fee & Payment Tracking" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card title="Outstanding Receivables by Country">
          <div className="flex flex-col gap-3 mt-2">
            {RECEIVABLES.map(r => (
              <div key={r.country}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700">{r.country}</span>
                  <span className="font-bold text-slate-900">${(r.amount/1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${r.status === 'FX Risk' ? 'bg-red-500' : r.status === 'Delayed' ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${r.status === 'FX Risk' ? 'bg-red-100 text-red-700' : r.status === 'Delayed' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Scholarship Approval Backlog" className="lg:col-span-2">
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-4">Program</th>
                  <th className="py-2 pr-4 text-right">Cases Pending</th>
                  <th className="py-2 pr-4 text-right">Total Value</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {SCHOLARSHIP_BACKLOG.map(b => (
                  <tr key={b.program} className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-bold text-slate-700">{b.program}</td>
                    <td className="py-3 pr-4 text-right text-slate-600">{b.pending}</td>
                    <td className="py-3 pr-4 text-right font-medium text-slate-800">${b.value.toLocaleString()}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.status === 'Blocked' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-blue-600 font-bold hover:text-blue-800 transition" onClick={() => onAsk(`Approve scholarship backlog for ${b.program}`)}>Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card title="Monthly Cash Flow ($M) — 2026">
        <div style={{ height: '220px', width: '100%', marginTop: '10px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CASH_FLOW} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="inflow" name="Cash Inflow" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="outflow" name="Cash Outflow" fill="#ef4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
}
