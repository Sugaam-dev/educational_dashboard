import { useState } from "react";
import Card from "../components/common/Card";
import SectionTitle from "../components/common/SectionTitle";
import { CAMPAIGNS } from "../data/dashboardData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Globe,
  TrendingUp,
  DollarSign,
  Users,
  FileText,
  Award,
  Search,
  ChevronDown,
  Lightbulb,
  BarChart2,
  ArrowRight,
} from "lucide-react";

const MONTHLY_TREND = [
  { month: "Jan", leads: 380, enrollments: 48 },
  { month: "Feb", leads: 420, enrollments: 58 },
  { month: "Mar", leads: 510, enrollments: 71 },
  { month: "Apr", leads: 480, enrollments: 65 },
  { month: "May", leads: 560, enrollments: 82 },
  { month: "Jun", leads: 490, enrollments: 101 },
];

const PIE_COLORS = ["#3b82f6","#6366f1","#10b981","#f59e0b","#8b5cf6","#ef4444"];

const FUNNEL_STAGES = [
  { label: "Leads",        count: 2840, pct: 100,  color: "bg-blue-500" },
  { label: "Applications", count: 1120, pct: 39.4, color: "bg-indigo-500" },
  { label: "Offers",       count: 810,  pct: 28.5, color: "bg-emerald-500" },
  { label: "Enrollments",  count: 425,  pct: 15.0, color: "bg-teal-500" },
];

const SORT_KEYS = { Spend: "spend", Leads: "leads", ROI: "roi", Enrollments: "enrollments" };

function numericRoi(str) { return parseFloat(str?.replace("%", "") ?? "0"); }

const RADIAN = Math.PI / 180;
function CustomPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.06) return null;
  return (
    <text x={x} y={y} fill="#374151" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={11}>
      {name} ({(percent * 100).toFixed(0)}%)
    </text>
  );
}

export default function DirectAdmissionsPage({ onAsk }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Spend");

  const pieData = CAMPAIGNS.map((c) => ({ name: c.platform, value: c.leads }));
  const sortKey = SORT_KEYS[sortBy] ?? "spend";
  const filtered = CAMPAIGNS
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortKey === "roi" ? numericRoi(b.roi) - numericRoi(a.roi) : (b[sortKey] ?? 0) - (a[sortKey] ?? 0));

  return (
    <div className="space-y-6 pb-10">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/20 rounded-full px-3 py-1 mb-3">
          Layer 3: Channel Governance
        </span>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Direct Admissions Channel</h1>
        <p className="text-blue-100 text-sm md:text-base">
          Website, Email &amp; Organic Campaign Intelligence &mdash; June 2026 Intake
        </p>
        {onAsk && (
          <button
            onClick={() => onAsk("Which admission channel has the highest ROI?")}
            className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition rounded-lg px-4 py-2 text-sm font-medium"
          >
            <Lightbulb size={15} /> Ask Buddy about this channel
          </button>
        )}
      </div>

      {/* KPI Strip */}
      <div className="portfolio-grid">
        <article className="metric-card tone-blue">
          <div className="flex items-start justify-between">
            <div>
              <p className="section-title">Total Leads</p>
              <p className="text-3xl font-bold mt-1">2,840</p>
              <p className="text-xs text-blue-600 mt-1">Direct channel intake</p>
            </div>
            <span className="p-2 rounded-xl bg-blue-100"><Users size={22} className="text-blue-600" /></span>
          </div>
        </article>

        <article className="metric-card tone-green">
          <div className="flex items-start justify-between">
            <div>
              <p className="section-title">Applications Submitted</p>
              <p className="text-3xl font-bold mt-1">1,120</p>
              <p className="text-xs text-emerald-600 mt-1">39.4% of leads converted</p>
            </div>
            <span className="p-2 rounded-xl bg-emerald-100"><FileText size={22} className="text-emerald-600" /></span>
          </div>
        </article>

        <article className="metric-card tone-green">
          <div className="flex items-start justify-between">
            <div>
              <p className="section-title">Offer Rate</p>
              <p className="text-3xl font-bold mt-1">72.3%</p>
              <p className="text-xs text-emerald-600 mt-1">810 of 1,120 applications</p>
            </div>
            <span className="p-2 rounded-xl bg-emerald-100"><Award size={22} className="text-emerald-600" /></span>
          </div>
        </article>

        <article className="metric-card tone-blue">
          <div className="flex items-start justify-between">
            <div>
              <p className="section-title">Cost per Enrollment</p>
              <p className="text-3xl font-bold mt-1">$186</p>
              <p className="text-xs text-blue-600 mt-1">Blended across campaigns</p>
            </div>
            <span className="p-2 rounded-xl bg-blue-100"><DollarSign size={22} className="text-blue-600" /></span>
          </div>
        </article>
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <BarChart2 size={18} className="text-blue-600" />
            Campaign Performance
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search campaigns..."
                className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-48"
              />
            </div>
            <div className="relative">
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                {Object.keys(SORT_KEYS).map((k) => <option key={k}>{k}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto table-scroll">
          <table className="w-full text-sm" style={{ minWidth: '950px' }}>
            <thead>
              <tr className="border-b border-gray-100">
                {["Campaign Name","Platform","Spend ($)","Leads","Apps","Enrollments","Cost/Lead","Cost/Enroll","ROI","Status"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/40 transition">
                  <td className="py-3 px-3 font-medium text-gray-800 whitespace-nowrap">{c.name}</td>
                  <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{c.platform}</td>
                  <td className="py-3 px-3 font-mono text-gray-800">${c.spend.toLocaleString()}</td>
                  <td className="py-3 px-3 text-gray-700">{c.leads.toLocaleString()}</td>
                  <td className="py-3 px-3 text-gray-700">{c.apps}</td>
                  <td className="py-3 px-3 text-gray-700">{c.enrollments}</td>
                  <td className="py-3 px-3 font-mono text-gray-700">${c.cpl}</td>
                  <td className="py-3 px-3 font-mono text-gray-700">${c.cpe}</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">{c.roi}</td>
                  <td className="py-3 px-3">
                    <span className={c.status === "Active" ? "badge badge-green" : "badge badge-amber"}>{c.status}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="py-8 text-center text-gray-400 text-sm">No campaigns match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Two-column: Pie + Funnel */}
      <div className="two-column">

        {/* Lead Source Pie */}
        <Card>
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe size={17} className="text-indigo-500" />
            Lead Source Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={95} dataKey="value" labelLine={false} label={CustomPieLabel}>
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [v.toLocaleString() + " leads", n]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {pieData.map((d, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                {d.name}
              </span>
            ))}
          </div>
        </Card>

        {/* Conversion Funnel + Insight */}
        <Card>
          <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
            <TrendingUp size={17} className="text-emerald-500" />
            Conversion Funnel
          </h2>
          <div className="space-y-4">
            {FUNNEL_STAGES.map((stage, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                    {i > 0 && <ArrowRight size={13} className="text-gray-400" />}
                    {stage.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{stage.pct}% of leads</span>
                    <span className="text-sm font-bold text-gray-800">{stage.count.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className={`h-4 rounded-full ${stage.color} transition-all duration-700`} style={{ width: stage.pct + "%" }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
            <Lightbulb size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              <span className="font-semibold">AI Insight: </span>
              Website Organic has the best ROI at 2,270% &mdash; recommend increasing SEO budget by 30% to accelerate lead volume.
            </p>
          </div>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card>
        <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
          <TrendingUp size={17} className="text-blue-500" />
          Monthly Leads vs Enrollments Trend
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={MONTHLY_TREND} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} name="Leads" />
            <Line type="monotone" dataKey="enrollments" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }} activeDot={{ r: 6 }} name="Enrollments" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

    </div>
  );
}
