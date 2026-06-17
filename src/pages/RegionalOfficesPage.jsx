import { useState } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import { REGIONAL_OFFICES } from '../data/dashboardData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import { Building2, Users, TrendingUp, Award, AlertTriangle } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

const QUARTERLY = [
  { quarter: 'Q1 2026', India: 142, UAE: 94, WestAfrica: 71, SouthAsia: 84, EastAfrica: 62 },
  { quarter: 'Q2 2026', India: 158, UAE: 102, WestAfrica: 65, SouthAsia: 88, EastAfrica: 68 },
  { quarter: 'Q3 2026', India: 148, UAE: 98, WestAfrica: 78, SouthAsia: 92, EastAfrica: 72 },
  { quarter: 'Q4 2026', India: 132, UAE: 86, WestAfrica: 76, SouthAsia: 76, EastAfrica: 48 },
];

const QUARTERLY_COLORS = {
  India: '#3b82f6',
  UAE: '#10b981',
  WestAfrica: '#f59e0b',
  SouthAsia: '#8b5cf6',
  EastAfrica: '#ef4444',
};

const SORT_OPTIONS = ['revenue', 'apps', 'enrollments', 'convRate', 'marketShare'];

function StatusBadge({ status }) {
  if (status === 'Exceeding') return <span className="badge badge-green">{status}</span>;
  if (status === 'On Target') return <span className="badge badge-blue">{status}</span>;
  if (status === 'Below Target') return <span className="badge badge-red">{status}</span>;
  return <span className="badge">{status}</span>;
}

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {p.dataKey === 'revenue' ? `$${p.value.toFixed(1)}M` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
        <p className="font-semibold">{payload[0].name}</p>
        <p>Market Share: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function RegionalOfficesPage({ onAsk }) {
  const [sortBy, setSortBy] = useState('revenue');

  const sortedOffices = [...REGIONAL_OFFICES].sort((a, b) => b[sortBy] - a[sortBy]);

  const revenueChartData = REGIONAL_OFFICES.map((o) => ({
    name: o.city,
    revenue: parseFloat((o.revenue / 1_000_000).toFixed(1)),
  }));

  const marketShareData = REGIONAL_OFFICES.map((o) => ({
    name: o.office.replace(' Regional Office', '').replace(' Office', ''),
    value: o.marketShare,
  }));

  return (
    <div className="space-y-8 pb-10">
      {/* ── Header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-700 px-6 py-8 shadow-xl">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm mb-3">
              <Building2 size={12} />
               
            </span>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              Regional Recruitment Offices
            </h1>
            <p className="mt-1 text-sm text-teal-100">
              Worldwide Office Performance — June 2026 Intake
            </p>
          </div>
          {onAsk && (
            <button
              onClick={() => onAsk('Show me which regional office has the best ROI per staff member')}
              className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30 transition-colors self-start sm:self-auto"
            >
              <TrendingUp size={16} />
              Ask Buddy
            </button>
          )}
        </div>
      </div>

      {/* ── Section 1: KPI Strip ── */}
      <div>
        <SectionTitle title="Office Network Overview" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mt-4">
          <div className="metric-card tone-blue">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 opacity-75">Active Offices</span>
              <span className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <Building2 size={18} />
              </span>
            </div>
            <p className="text-3xl font-black text-blue-700">5</p>
            <p className="mt-1 text-xs text-blue-500">Across 4 continents</p>
          </div>

          <div className="metric-card tone-green">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 opacity-75">Combined Apps</span>
              <span className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                <Users size={18} />
              </span>
            </div>
            <p className="text-3xl font-black text-emerald-700">1,840</p>
            <p className="mt-1 text-xs text-emerald-500">June 2026 intake</p>
          </div>

          <div className="metric-card tone-green">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 opacity-75">Total Revenue</span>
              <span className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                <TrendingUp size={18} />
              </span>
            </div>
            <p className="text-3xl font-black text-emerald-700">$46.2M</p>
            <p className="mt-1 text-xs text-emerald-500">Combined all offices</p>
          </div>

          <div className="metric-card tone-blue">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 opacity-75">Avg Conv. Rate</span>
              <span className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <Award size={18} />
              </span>
            </div>
            <p className="text-3xl font-black text-blue-700">84.2%</p>
            <p className="mt-1 text-xs text-blue-500">Offer to Enrollment</p>
          </div>
        </div>
      </div>

      {/* ── Section 2: Scorecard Table ── */}
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <SectionTitle title="Office Performance Scorecard" />
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  sortBy === opt
                    ? 'bg-teal-600 text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt === 'convRate'
                  ? 'Conv %'
                  : opt === 'marketShare'
                  ? 'Market %'
                  : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto table-scroll">
            <table className="w-full text-sm" style={{ minWidth: '950px' }}>
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 pt-1 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Office</th>
                  <th className="pb-3 pt-1 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">City</th>
                  <th className="pb-3 pt-1 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Manager</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Apps</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Offers</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Enrollments</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Revenue</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Conv %</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Mkt %</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Staff</th>
                  <th className="pb-3 pt-1 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedOffices.map((o, i) => (
                  <tr
                    key={o.office}
                    className={`border-b border-gray-50 transition-colors hover:bg-teal-50/40 ${
                      i % 2 === 1 ? 'bg-gray-50/40' : ''
                    }`}
                  >
                    <td className="py-3 pr-4 font-semibold text-gray-800 whitespace-nowrap">{o.office}</td>
                    <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{o.city}</td>
                    <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{o.manager}</td>
                    <td className="py-3 pr-4 text-right font-mono text-gray-700">{o.apps.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-right font-mono text-gray-700">{o.offers.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-right font-mono font-semibold text-teal-700">
                      {o.enrollments.toLocaleString()}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono font-semibold text-emerald-700">
                      ${(o.revenue / 1_000_000).toFixed(1)}M
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <span
                        className={`font-mono font-semibold ${
                          o.convRate >= 75 ? 'text-emerald-600' : 'text-red-500'
                        }`}
                      >
                        {o.convRate}%
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right font-mono text-gray-700">{o.marketShare}%</td>
                    <td className="py-3 pr-4 text-right font-mono text-gray-700">{o.staffCount}</td>
                    <td className="py-3 text-center whitespace-nowrap">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* ── Section 3: Charts ── */}
      <div>
        <SectionTitle title="Revenue & Market Intelligence" />
        <div className="two-column mt-4">
          {/* Left: Revenue Bar Chart */}
          <Card title="Revenue by Office ($M)">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={revenueChartData}
                layout="vertical"
                margin={{ top: 8, right: 30, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  tickFormatter={(v) => `$${v}M`}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#374151' }}
                  width={70}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="revenue" radius={[0, 6, 6, 0]} name="Revenue ($M)">
                  {revenueChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-3">
              {revenueChartData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-xs text-gray-600">{d.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Right: Market Share Donut + Staff Productivity */}
          <Card title="Market Share & Staff Productivity">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Legend */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {marketShareData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-xs text-gray-600">{d.name}: {d.value}%</span>
                </div>
              ))}
            </div>

            {/* Staff Productivity */}
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Apps per Staff Member
            </p>
            <div className="space-y-2">
              {REGIONAL_OFFICES.map((o, i) => {
                const productivity = (o.apps / o.staffCount).toFixed(1);
                const maxProductivity = Math.max(
                  ...REGIONAL_OFFICES.map((x) => x.apps / x.staffCount)
                );
                const pct = ((o.apps / o.staffCount) / maxProductivity) * 100;
                return (
                  <div key={o.office} className="flex items-center gap-3">
                    <div
                      className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="w-20 flex-shrink-0 text-xs text-gray-600 truncate">{o.city}</span>
                    <div className="flex-1 rounded-full bg-gray-100 h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }}
                      />
                    </div>
                    <span className="w-12 text-right text-xs font-mono font-semibold text-gray-700">
                      {productivity}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Alert Box */}
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
              <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-amber-600" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-semibold">West Africa Office</span> conversion rate{' '}
                <span className="font-bold">67.6%</span> is below the 75% benchmark.
                Review agent training pipeline.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Section 4: Quarterly Trend ── */}
      <div>
        <SectionTitle title="Quarterly Application Volume Trends" />
        <Card title="Application Volume by Office — Quarterly Comparison">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={QUARTERLY}
              margin={{ top: 16, right: 24, left: 0, bottom: 8 }}
              barCategoryGap="20%"
              barGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
              {Object.entries(QUARTERLY_COLORS).map(([key, color]) => (
                <Bar key={key} dataKey={key} fill={color} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Footer Summary Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} className="text-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Top Performer</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">India — New Delhi</p>
          <p className="text-xs text-gray-500 mt-1">Highest revenue at $18.8M · 580 applications</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Highest Efficiency</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">UAE — Dubai</p>
          <p className="text-xs text-gray-500 mt-1">85.3% conv. rate · 76.0 apps/staff</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-red-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-700">Needs Attention</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">West Africa — Lagos</p>
          <p className="text-xs text-gray-500 mt-1">67.6% conv. rate below 75% threshold</p>
        </div>
      </div>
    </div>
  );
}
