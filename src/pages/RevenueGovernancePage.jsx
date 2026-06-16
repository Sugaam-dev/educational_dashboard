import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  LineChart, Line, ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import {
  DollarSign, TrendingUp, Users, Award, Globe, BookOpen,
  Calculator,
} from 'lucide-react';
import { COST_ANALYSIS } from '../data/dashboardData';

// ─── Inline chart data ────────────────────────────────────────────────────────
const REV_CHANNEL = [
  { channel: 'Agents/Partners',   revenue: 52500000 },
  { channel: 'Direct Admissions', revenue: 21800000 },
  { channel: 'Regional Offices',  revenue: 18200000 },
  { channel: 'Digital Campaigns', revenue:  9800000 },
  { channel: 'Education Fairs',   revenue:  8000000 },
];

const REV_COUNTRY = [
  { country: 'India',      revenue: 38.2 },
  { country: 'Nigeria',    revenue: 22.4 },
  { country: 'UAE',        revenue: 21.6 },
  { country: 'Nepal',      revenue: 11.4 },
  { country: 'Bangladesh', revenue:  8.8 },
  { country: 'Kenya',      revenue:  7.9 },
];

const REV_PROGRAM = [
  { program: 'MD Medicine', direct: 1800000, agents: 7400000, offices: 3900000 },
  { program: 'Nursing',     direct: 2200000, agents: 5800000, offices: 3100000 },
  { program: 'MBA',         direct: 4400000, agents: 3800000, offices: 4400000 },
  { program: 'BBA',         direct: 2400000, agents: 6200000, offices: 4200000 },
];

const REV_TREND = [
  { month: 'Jan', revenue:  7.2, target: 10 },
  { month: 'Feb', revenue:  8.1, target: 10 },
  { month: 'Mar', revenue:  9.4, target: 10 },
  { month: 'Apr', revenue:  8.8, target: 10 },
  { month: 'May', revenue: 10.2, target: 10 },
  { month: 'Jun', revenue: 11.1, target: 10 },
  { month: 'Jul', revenue:  9.8, target: 10 },
  { month: 'Aug', revenue: 10.8, target: 10 },
  { month: 'Sep', revenue: 11.4, target: 10 },
  { month: 'Oct', revenue: 10.9, target: 10 },
  { month: 'Nov', revenue: 12.1, target: 10 },
  { month: 'Dec', revenue: 11.8, target: 10 },
];

const PIE_COLORS = ['#3b82f6', '#10b981', '#0891b2', '#8b5cf6', '#f59e0b'];

// ─── Custom Pie label ─────────────────────────────────────────────────────────
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5 + 14;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#374151" fontSize={11} fontWeight={600} textAnchor="middle" dominantBaseline="central">
      ${(value / 1000000).toFixed(1)}M
    </text>
  );
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────
const KpiCard = ({ icon: Icon, label, value, tone, note }) => {
  const toneMap = {
    green: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', val: 'text-emerald-700' },
    blue:  { bg: 'bg-blue-50',    border: 'border-blue-200',    icon: 'text-blue-600',    val: 'text-blue-700'    },
    amber: { bg: 'bg-amber-50',   border: 'border-amber-200',   icon: 'text-amber-600',   val: 'text-amber-700'   },
  };
  const t = toneMap[tone] || toneMap.green;
  return (
    <div className={`card p-4 border ${t.border} ${t.bg}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 leading-tight">{label}</p>
          <p className={`text-2xl font-extrabold ${t.val} leading-none`}>{value}</p>
          {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
        </div>
        <div className={`p-2 rounded-lg ${t.bg} border ${t.border} ml-3 flex-shrink-0`}>
          <Icon size={20} className={t.icon} />
        </div>
      </div>
    </div>
  );
};

// ─── Chart card wrapper ───────────────────────────────────────────────────────
const ChartCard = ({ title, children }) => (
  <div className="card p-4">
    <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">{title}</h3>
    {children}
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function RevenueGovernancePage({ onAsk }) {
  const [tuitionPerYear,       setTuitionPerYear]       = useState(16000);
  const [duration,             setDuration]             = useState(4);
  const [programsPerStudent,   setProgramsPerStudent]   = useState(1.2);
  const [referralProbability,  setReferralProbability]  = useState(0.3);

  const ltv = Math.round(
    tuitionPerYear * duration * programsPerStudent +
    tuitionPerYear * duration * referralProbability * 0.5
  );
  const ltvPct = Math.min(100, (ltv / 250000) * 100);

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur mb-2 tracking-wide uppercase">
              Layer 3: Channel Governance
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
              Recruitment Revenue Governance
            </h1>
            <p className="text-emerald-100 text-sm mt-1">
              Financial Performance Across All Admission Channels — FY 2026
            </p>
          </div>
          <button
            onClick={() => onAsk?.('What is the financial health of the university?')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur self-start sm:self-auto whitespace-nowrap"
          >
            <Calculator size={16} />
            Ask Buddy
          </button>
        </div>
      </div>

      {/* ── SECTION 1: KPI STRIP ───────────────────────────────────────────── */}
      <div>
        <p className="section-title mb-3">Revenue KPIs — FY 2026</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <KpiCard icon={DollarSign}  label="Total Enrollment Revenue"     value="$110.3M"          tone="green" note="FY 2026 total" />
          <KpiCard icon={TrendingUp}  label="Revenue per Enrolled Student" value="$64,128"           tone="green" note="Avg across all channels" />
          <KpiCard icon={Users}       label="Avg Student Lifetime Value"   value="$192,384"          tone="blue"  note="Over full study period" />
          <KpiCard icon={Award}       label="Highest Rev Channel"          value="Agents ($52.5M)"   tone="blue"  note="48% of total revenue" />
          <KpiCard icon={Globe}       label="Highest Rev Market"           value="India ($38.2M)"    tone="green" note="Leading source market" />
          <KpiCard icon={BookOpen}    label="Highest Rev Program"          value="MBA ($13.4M)"      tone="amber" note="Top revenue program" />
        </div>
      </div>

      {/* ── SECTION 2: 2x2 CHART GRID ──────────────────────────────────────── */}
      <div>
        <p className="section-title mb-3">Revenue Analytics — Multi-Channel View</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* a) Revenue by Channel — Donut PieChart */}
          <ChartCard title="Revenue by Channel">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={REV_CHANNEL}
                  dataKey="revenue"
                  nameKey="channel"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={110}
                  labelLine={false}
                  label={renderPieLabel}
                >
                  {REV_CHANNEL.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span style={{ fontSize: 11, color: '#4b5563' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* b) Revenue by Country — Horizontal BarChart */}
          <ChartCard title="Revenue by Country (USD M)">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                layout="vertical"
                data={REV_COUNTRY}
                margin={{ top: 4, right: 30, left: 10, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
                <YAxis type="category" dataKey="country" tick={{ fontSize: 12 }} width={80} />
                <Tooltip formatter={(v) => [`$${v}M`, 'Revenue']} />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                  {REV_COUNTRY.map((entry, i) => (
                    <Cell key={i} fill={entry.revenue >= 20 ? '#10b981' : entry.revenue >= 10 ? '#3b82f6' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* c) Revenue by Program — Stacked BarChart */}
          <ChartCard title="Revenue by Program and Channel">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={REV_PROGRAM}
                margin={{ top: 4, right: 16, left: 10, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="program" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`$${(v / 1000000).toFixed(1)}M`]} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="direct"  name="Direct"  stackId="a" fill="#10b981" />
                <Bar dataKey="agents"  name="Agents"  stackId="a" fill="#3b82f6" />
                <Bar dataKey="offices" name="Offices" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* d) Revenue Trend — LineChart */}
          <ChartCard title="Monthly Revenue Trend vs Target (USD M)">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={REV_TREND}
                margin={{ top: 4, right: 16, left: 10, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[6, 14]} tickFormatter={(v) => `$${v}M`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`$${v}M`]} />
                <Legend iconType="circle" iconSize={8} />
                <ReferenceLine y={10} stroke="#ef4444" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10b981' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#ef4444"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

        </div>
      </div>

      {/* ── SECTION 3: COST ANALYSIS TABLE ─────────────────────────────────── */}
      <div>
        <p className="section-title mb-3">Cost Analysis by Channel</p>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto table-scroll">
            <table className="w-full text-sm" style={{ minWidth: '950px' }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['Channel', 'Cost / App', 'Cost / Enroll', 'Agent Fee', 'Total Cost / Student', 'Revenue / Student', 'Margin'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COST_ANALYSIS.map((row, i) => {
                  const marginVal = parseFloat(row.margin);
                  const rowBg = marginVal >= 99 ? 'bg-green-50' : marginVal < 97 ? 'bg-red-50' : '';
                  const marginColor = marginVal >= 99
                    ? 'text-emerald-700 bg-emerald-100'
                    : marginVal < 97
                    ? 'text-red-700 bg-red-100'
                    : 'text-blue-700 bg-blue-100';
                  return (
                    <tr key={i} className={`hover:bg-gray-50 transition-colors ${rowBg}`}>
                      <td className="px-4 py-3 font-semibold text-gray-800">{row.channel}</td>
                      <td className="px-4 py-3 text-gray-600">${row.costPerApp.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-600">${row.costPerEnroll.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {row.agentFee > 0 ? (
                          <span className="text-amber-700 font-semibold">${row.agentFee.toLocaleString()}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-700">${row.totalCostPerStudent.toLocaleString()}</td>
                      <td className="px-4 py-3 font-semibold text-emerald-700">${row.revenuePerStudent.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${marginColor}`}>
                          {row.margin}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-green-100 inline-block"></span>
              Margin 99%+ — Excellent efficiency
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-100 inline-block"></span>
              Margin below 97% — Needs review
            </span>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: LTV CALCULATOR ───────────────────────────────────────── */}
      <div>
        <p className="section-title mb-3">Student Lifetime Value Calculator</p>
        <div className="card p-5 border border-emerald-200 bg-gradient-to-br from-white to-emerald-50">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Inputs */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">
                  Tuition per Year (USD)
                  <span className="ml-2 font-normal text-emerald-600">${tuitionPerYear.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  value={tuitionPerYear}
                  min={5000} max={50000} step={500}
                  onChange={(e) => setTuitionPerYear(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>$5K</span><span>$50K</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">
                  Program Duration (Years)
                  <span className="ml-2 font-normal text-emerald-600">{duration} yrs</span>
                </label>
                <input
                  type="range"
                  value={duration}
                  min={1} max={6} step={0.5}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>1 yr</span><span>6 yrs</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">
                  Programs per Student
                  <span className="ml-2 font-normal text-emerald-600">{programsPerStudent.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  value={programsPerStudent}
                  min={1} max={3} step={0.1}
                  onChange={(e) => setProgramsPerStudent(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>1.0</span><span>3.0</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">
                  Referral Probability
                  <span className="ml-2 font-normal text-emerald-600">{(referralProbability * 100).toFixed(0)}%</span>
                </label>
                <input
                  type="range"
                  value={referralProbability}
                  min={0} max={1} step={0.05}
                  onChange={(e) => setReferralProbability(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>0%</span><span>100%</span>
                </div>
              </div>
            </div>

            {/* Result Panel */}
            <div className="lg:w-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm text-center gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Calculated LTV</p>
                <p className="text-4xl font-extrabold text-emerald-700 leading-none">
                  ${ltv.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-1">per enrolled student</p>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>$0</span>
                  <span>$250K</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
                    style={{ width: `${ltvPct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">{ltvPct.toFixed(1)}% of $250K</p>
              </div>

              <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3 text-left w-full leading-relaxed">
                <span className="font-semibold text-gray-500">Formula:</span><br />
                (Tuition × Duration × Programs)<br />
                + (Tuition × Duration × Referral × 0.5)
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
