import { useState } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import { FAIRS } from '../data/dashboardData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import { CalendarDays, MapPin, TrendingUp, Award, Star } from 'lucide-react';

const PIE_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
  '#ef4444', '#0891b2', '#16a34a', '#dc2626',
];

const UPCOMING = [
  { name: 'Gulf Education Fair — Dubai',  date: 'Mar 15-17, 2026', budget: '$38,000', status: 'Confirmed', target: 400 },
  { name: 'Nepal University Fair',        date: 'Apr 10-12, 2026', budget: '$12,000', status: 'Confirmed', target: 450 },
  { name: 'Bangladesh Higher Ed Summit',  date: 'Apr 22-23, 2026', budget: '$9,500',  status: 'Planning',  target: 380 },
];

const SORT_FIELDS = ['roi', 'cost', 'enrollments', 'leads'];

function RatingBadge({ rating }) {
  if (rating === 'Excellent') return <span className="badge badge-green">{rating}</span>;
  if (rating === 'Good')      return <span className="badge badge-blue">{rating}</span>;
  if (rating === 'Below Avg') return <span className="badge badge-amber">{rating}</span>;
  if (rating === 'Poor')      return <span className="badge badge-red">{rating}</span>;
  return <span className="badge">{rating}</span>;
}

function UpcomingStatusBadge({ status }) {
  if (status === 'Confirmed') return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Confirmed
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      Planning
    </span>
  );
}

const CustomROITooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        <p style={{ color: payload[0].fill }}>ROI: {payload[0].value}%</p>
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
        <p>Enrollments: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

function getROIColor(roi) {
  if (roi > 500) return '#10b981';
  if (roi > 200) return '#3b82f6';
  return '#f59e0b';
}

export default function EducationFairsPage({ onAsk }) {
  const [sortBy, setSortBy] = useState('roi');

  const sortedFairs = [...FAIRS].sort((a, b) => {
    if (sortBy === 'roi') {
      return parseInt(b.roi) - parseInt(a.roi);
    }
    return b[sortBy] - a[sortBy];
  });

  const roiChartData = FAIRS.map((f) => ({
    name: f.country,
    roi: parseInt(f.roi),
  }));

  const pieData = FAIRS.map((f) => ({
    name: f.country,
    value: f.enrollments,
  }));

  const totalLeads = FAIRS.reduce((s, f) => s + f.leads, 0);
  const totalEnrollments = FAIRS.reduce((s, f) => s + f.enrollments, 0);
  const totalCost = FAIRS.reduce((s, f) => s + f.cost, 0);
  const overallCPL = Math.round(totalCost / totalLeads);
  const leadToEnrollRate = ((totalEnrollments / totalLeads) * 100).toFixed(1);

  return (
    <div className="space-y-8 pb-10">
      {/* ── Header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-8 shadow-xl">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm mb-3">
              <CalendarDays size={12} />
              Layer 3: Channel Governance
            </span>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              Education Fairs &amp; Events
            </h1>
            <p className="mt-1 text-sm text-orange-100">
              Global Recruitment Event Performance — 2026
            </p>
          </div>
          {onAsk && (
            <button
              onClick={() => onAsk('Which education fairs have the best ROI and should be prioritised for 2027 budget allocation?')}
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
        <SectionTitle title="Event Portfolio Overview" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mt-4">
          <div className="metric-card tone-blue">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 opacity-75">Total Events</span>
              <span className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <CalendarDays size={18} />
              </span>
            </div>
            <p className="text-3xl font-black text-blue-700">18</p>
            <p className="mt-1 text-xs text-blue-500">This Year 2026</p>
          </div>

          <div className="metric-card tone-green">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 opacity-75">Total Leads</span>
              <span className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                <MapPin size={18} />
              </span>
            </div>
            <p className="text-3xl font-black text-emerald-700">3,240</p>
            <p className="mt-1 text-xs text-emerald-500">Leads generated</p>
          </div>

          <div className="metric-card tone-green">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 opacity-75">Cost per Lead</span>
              <span className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                <TrendingUp size={18} />
              </span>
            </div>
            <p className="text-3xl font-black text-emerald-700">$28</p>
            <p className="mt-1 text-xs text-emerald-500">Avg across all fairs</p>
          </div>

          <div className="metric-card tone-amber">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 opacity-75">Lead-to-Enroll</span>
              <span className="rounded-lg bg-amber-100 p-2 text-amber-600">
                <Award size={18} />
              </span>
            </div>
            <p className="text-3xl font-black text-amber-700">4.2%</p>
            <p className="mt-1 text-xs text-amber-500">Lead → Enrollment rate</p>
          </div>
        </div>
      </div>

      {/* ── Section 2: Events Table ── */}
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <SectionTitle title="Event Performance Table" />
          <div className="flex flex-wrap gap-2">
            {SORT_FIELDS.map((field) => (
              <button
                key={field}
                onClick={() => setSortBy(field)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  sortBy === field
                    ? 'bg-orange-500 text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sort: {field.charAt(0).toUpperCase() + field.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto table-scroll">
            <table className="w-full text-sm" style={{ minWidth: '950px' }}>
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 pt-1 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4 min-w-48">Event Name</th>
                  <th className="pb-3 pt-1 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Country</th>
                  <th className="pb-3 pt-1 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Date</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Cost ($)</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Leads</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Apps</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">Enrollments</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">CPL ($)</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">CPE ($)</th>
                  <th className="pb-3 pt-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400 pr-4">ROI</th>
                  <th className="pb-3 pt-1 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Rating</th>
                </tr>
              </thead>
              <tbody>
                {sortedFairs.map((f, i) => {
                  const roiNum = parseInt(f.roi);
                  return (
                    <tr
                      key={f.event}
                      className={`border-b border-gray-50 transition-colors hover:bg-orange-50/40 ${
                        i % 2 === 1 ? 'bg-gray-50/40' : ''
                      }`}
                    >
                      <td className="py-3 pr-4 font-semibold text-gray-800 min-w-48">{f.event}</td>
                      <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{f.country}</td>
                      <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{f.date}</td>
                      <td className="py-3 pr-4 text-right font-mono text-gray-700">
                        ${f.cost.toLocaleString()}
                      </td>
                      <td className="py-3 pr-4 text-right font-mono text-gray-700">{f.leads}</td>
                      <td className="py-3 pr-4 text-right font-mono text-gray-700">{f.apps}</td>
                      <td className="py-3 pr-4 text-right font-mono font-semibold text-orange-700">
                        {f.enrollments}
                      </td>
                      <td className="py-3 pr-4 text-right font-mono text-gray-600">${f.cpl}</td>
                      <td className="py-3 pr-4 text-right font-mono text-gray-600">${f.cpe.toLocaleString()}</td>
                      <td className="py-3 pr-4 text-right">
                        <span
                          className="font-mono font-bold"
                          style={{ color: getROIColor(roiNum) }}
                        >
                          {f.roi}
                        </span>
                      </td>
                      <td className="py-3 text-center whitespace-nowrap">
                        <RatingBadge rating={f.rating} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* ── Section 3: Charts ── */}
      <div>
        <SectionTitle title="ROI Analysis & Geographic Distribution" />
        <div className="two-column mt-4">
          {/* Left: ROI Comparison Bar Chart */}
          <Card title="ROI Comparison by Country">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={roiChartData}
                layout="vertical"
                margin={{ top: 8, right: 30, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  tickFormatter={(v) => `${v}%`}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#374151' }}
                  width={80}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomROITooltip />} />
                <Bar dataKey="roi" radius={[0, 6, 6, 0]} name="ROI (%)">
                  {roiChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getROIColor(entry.roi)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Color legend */}
            <div className="mt-3 flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-gray-600">{'>'} 500% ROI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <span className="text-xs text-gray-600">200–500% ROI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="text-xs text-gray-600">{'<'} 200% ROI</span>
              </div>
            </div>
          </Card>

          {/* Right: Geo Pie + Recommendation */}
          <Card title="Enrollment by Geography">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Pie Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mb-4">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span className="text-xs text-gray-600">{d.name}: {d.value}</span>
                </div>
              ))}
            </div>

            {/* Recommendation Card */}
            <div className="mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-white">
              <div className="flex items-start gap-2">
                <Star size={16} className="flex-shrink-0 mt-0.5 text-yellow-300" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-100 mb-1">
                    Recommendation
                  </p>
                  <p className="text-xs leading-relaxed text-white/90">
                    <span className="font-semibold text-white">Nepal</span> and{' '}
                    <span className="font-semibold text-white">Kenya</span> fairs deliver
                    the best ROI (933% and 1100%). London StudyWorld at{' '}
                    <span className="font-semibold text-yellow-200">78% ROI</span> should
                    be dropped or replaced with a targeted networking dinner.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Section 4: Upcoming Events ── */}
      <div>
        <SectionTitle title="Upcoming Events Pipeline" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-4">
          {UPCOMING.map((event, i) => {
            const borderColors = ['border-blue-400', 'border-emerald-400', 'border-amber-400'];
            const iconBg = ['bg-blue-50', 'bg-emerald-50', 'bg-amber-50'];
            const iconColor = ['text-blue-600', 'text-emerald-600', 'text-amber-600'];
            return (
              <div
                key={event.name}
                className={`card border-t-4 ${borderColors[i % borderColors.length]} hover:shadow-lg transition-shadow`}
              >
                <div className={`inline-flex items-center justify-center rounded-xl p-3 mb-4 ${iconBg[i % iconBg.length]}`}>
                  <CalendarDays size={20} className={iconColor[i % iconColor.length]} />
                </div>

                <h3 className="text-sm font-bold text-gray-800 leading-snug mb-3">
                  {event.name}
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDays size={13} className="flex-shrink-0 text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp size={13} className="flex-shrink-0 text-gray-400" />
                    <span>Budget: <span className="font-semibold text-gray-800">{event.budget}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={13} className="flex-shrink-0 text-gray-400" />
                    <span>Target Leads: <span className="font-semibold text-gray-800">{event.target}</span></span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <UpcomingStatusBadge status={event.status} />
                  <span className="text-xs text-gray-400 font-mono">
                    ~${Math.round(parseInt(event.budget.replace(/[$,]/g, '')) / event.target)}/lead
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer Insight Strip ── */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:divide-x sm:divide-orange-200">
          <div className="sm:pr-6">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-700 mb-1">
              Best Performing Fair
            </p>
            <p className="text-sm font-semibold text-gray-800">Kenya Education Summit</p>
            <p className="text-xs text-gray-500">1100% ROI · 88 enrollments from $8,000 spend</p>
          </div>
          <div className="sm:px-6">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-700 mb-1">
              Worst Performing Fair
            </p>
            <p className="text-sm font-semibold text-gray-800">StudyWorld — London</p>
            <p className="text-xs text-gray-500">78% ROI · $62,000 spend · $1,292 cost/enrollment</p>
          </div>
          <div className="sm:pl-6">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-700 mb-1">
              2026 Budget Efficiency
            </p>
            <p className="text-sm font-semibold text-gray-800">
              ${totalCost.toLocaleString()} total spend
            </p>
            <p className="text-xs text-gray-500">
              Avg CPL: ${overallCPL} · Lead-to-Enroll: {leadToEnrollRate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
