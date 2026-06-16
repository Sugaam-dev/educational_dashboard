import { useState } from "react";
import Card from "../components/common/Card";
import SectionTitle from "../components/common/SectionTitle";
import { PLATFORMS } from "../data/dashboardData";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  Monitor,
  DollarSign,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  AlertTriangle,
  BarChart2,
  Zap,
} from "lucide-react";

// ─── Static data ─────────────────────────────────────────────────────────────

const RADAR_DATA = [
  { metric: "Lead Quality",     google: 90, meta: 65, linkedin: 88, youtube: 60 },
  { metric: "Cost Efficiency",  google: 72, meta: 85, linkedin: 68, youtube: 75 },
  { metric: "Enrollment Conv.", google: 84, meta: 62, linkedin: 92, youtube: 58 },
  { metric: "Targeting",        google: 88, meta: 80, linkedin: 95, youtube: 70 },
  { metric: "Brand Reach",      google: 78, meta: 92, linkedin: 72, youtube: 88 },
];

const CALENDAR_DATA = [
  { platform: "Google Ads", Jan: 14000, Feb: 16000, Mar: 18000, Apr: 15000, May: 17000, Jun: 14000 },
  { platform: "Meta",       Jan: 5000,  Feb: 7000,  Mar: 8000,  Apr: 6000,  May: 7500,  Jun: 5000  },
  { platform: "LinkedIn",   Jan: 3500,  Feb: 4500,  Mar: 5000,  Apr: 4000,  May: 4500,  Jun: 4500  },
  { platform: "YouTube",    Jan: 1200,  Feb: 1800,  Mar: 2400,  Apr: 1400,  May: 1600,  Jun: 1400  },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun"];

const DONUT_COLORS = ["#3b82f6","#8b5cf6","#0891b2","#f59e0b","#10b981"];

const RADAR_COLORS = {
  google:   "#3b82f6",
  meta:     "#8b5cf6",
  linkedin: "#0891b2",
  youtube:  "#ef4444",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSpendColor(value) {
  if (value >= 16000) return "bg-blue-700 text-white";
  if (value >= 12000) return "bg-blue-600 text-white";
  if (value >= 8000)  return "bg-blue-500 text-white";
  if (value >= 5000)  return "bg-blue-400 text-white";
  if (value >= 3000)  return "bg-blue-300 text-blue-900";
  if (value >= 1500)  return "bg-blue-200 text-blue-900";
  return "bg-blue-100 text-blue-800";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DigitalCampaignsPage({ onAsk }) {
  const donutData = PLATFORMS.map((p) => ({ name: p.platform, value: p.spend }));

  return (
    <div className="space-y-6 pb-10">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/20 rounded-full px-3 py-1 mb-3">
          Layer 3: Channel Governance
        </span>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Digital Marketing Campaigns</h1>
        <p className="text-purple-100 text-sm md:text-base">
          Multi-Platform Performance Intelligence &mdash; June 2026 Intake
        </p>
        {onAsk && (
          <button
            onClick={() => onAsk("Which digital platform drives the best quality applications?")}
            className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition rounded-lg px-4 py-2 text-sm font-medium"
          >
            <Lightbulb size={15} /> Ask Buddy about digital campaigns
          </button>
        )}
      </div>

      {/* KPI Strip */}
      <div className="portfolio-grid">
        <article className="metric-card tone-blue">
          <div className="flex items-start justify-between">
            <div>
              <p className="section-title">Total Digital Spend</p>
              <p className="text-3xl font-bold mt-1">$172,500</p>
              <p className="text-xs text-blue-600 mt-1">Across all platforms</p>
            </div>
            <span className="p-2 rounded-xl bg-blue-100"><DollarSign size={22} className="text-blue-600" /></span>
          </div>
        </article>

        <article className="metric-card tone-green">
          <div className="flex items-start justify-between">
            <div>
              <p className="section-title">Total Leads</p>
              <p className="text-3xl font-bold mt-1">2,205</p>
              <p className="text-xs text-emerald-600 mt-1">From paid channels</p>
            </div>
            <span className="p-2 rounded-xl bg-emerald-100"><Users size={22} className="text-emerald-600" /></span>
          </div>
        </article>

        <article className="metric-card tone-amber">
          <div className="flex items-start justify-between">
            <div>
              <p className="section-title">Avg Cost per Application</p>
              <p className="text-3xl font-bold mt-1">$156</p>
              <p className="text-xs text-amber-600 mt-1">Blended CPA</p>
            </div>
            <span className="p-2 rounded-xl bg-amber-100"><Target size={22} className="text-amber-600" /></span>
          </div>
        </article>

        <article className="metric-card tone-blue">
          <div className="flex items-start justify-between">
            <div>
              <p className="section-title">Overall Conv. Rate</p>
              <p className="text-3xl font-bold mt-1">8.4%</p>
              <p className="text-xs text-blue-600 mt-1">Leads to applications</p>
            </div>
            <span className="p-2 rounded-xl bg-blue-100"><TrendingUp size={22} className="text-blue-600" /></span>
          </div>
        </article>
      </div>

      {/* Platform Comparison Table */}
      <Card>
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Monitor size={18} className="text-purple-600" />
          Platform Performance Comparison
        </h2>
        <div className="overflow-x-auto table-scroll">
          <table className="w-full text-sm" style={{ minWidth: '950px' }}>
            <thead>
              <tr className="border-b border-gray-100">
                {["Platform","Spend","Impressions","Clicks","Leads","Apps","Cost/Lead","Cost/App","Conv Rate %","Quality"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLATFORMS.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-purple-50/40 transition">
                  <td className="py-3 px-3 font-semibold text-gray-800 whitespace-nowrap">{p.platform}</td>
                  <td className="py-3 px-3 font-mono text-gray-800">${p.spend.toLocaleString()}</td>
                  <td className="py-3 px-3 text-gray-600">{p.impressions.toLocaleString()}</td>
                  <td className="py-3 px-3 text-gray-600">{p.clicks.toLocaleString()}</td>
                  <td className="py-3 px-3 text-gray-700">{p.leads.toLocaleString()}</td>
                  <td className="py-3 px-3 text-gray-700">{p.apps}</td>
                  <td className="py-3 px-3 font-mono text-gray-700">${p.cpl}</td>
                  <td className="py-3 px-3 font-mono text-gray-700">${p.cpa}</td>
                  <td className="py-3 px-3 text-gray-700">{p.convRate}%</td>
                  <td className="py-3 px-3">
                    <span className={p.quality === "High" ? "badge badge-green" : "badge badge-amber"}>{p.quality}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Two-column: Donut + Radar */}
      <div className="two-column">

        {/* Spend Distribution Donut */}
        <Card>
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign size={17} className="text-purple-500" />
            Spend Distribution by Platform
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {donutData.map((_, idx) => (
                  <Cell key={idx} fill={DONUT_COLORS[idx % DONUT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => ["$" + v.toLocaleString()]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {donutData.map((d, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                {d.name}: <strong>${d.value.toLocaleString()}</strong>
              </span>
            ))}
          </div>
        </Card>

        {/* Radar Quality Chart */}
        <Card>
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap size={17} className="text-violet-500" />
            Platform Quality Radar
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={RADAR_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "#6b7280" }} />
              <Radar name="Google Ads" dataKey="google"   stroke={RADAR_COLORS.google}   fill={RADAR_COLORS.google}   fillOpacity={0.12} strokeWidth={2} />
              <Radar name="Meta"       dataKey="meta"     stroke={RADAR_COLORS.meta}     fill={RADAR_COLORS.meta}     fillOpacity={0.12} strokeWidth={2} />
              <Radar name="LinkedIn"   dataKey="linkedin" stroke={RADAR_COLORS.linkedin} fill={RADAR_COLORS.linkedin} fillOpacity={0.12} strokeWidth={2} />
              <Radar name="YouTube"    dataKey="youtube"  stroke={RADAR_COLORS.youtube}  fill={RADAR_COLORS.youtube}  fillOpacity={0.12} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recommendation Card */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 p-5 shadow-lg flex gap-4 items-start">
        <div className="p-2 bg-white/30 rounded-xl flex-shrink-0">
          <AlertTriangle size={22} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-base mb-1">Budget Reallocation Recommendation</p>
          <p className="text-white/90 text-sm">
            LinkedIn drives highest application quality (148 apps at $176 CPA). Recommend budget reallocation from YouTube to LinkedIn by $5k/month to maximise application-to-enrollment conversion.
          </p>
        </div>
      </div>

      {/* Campaign Calendar Heatmap */}
      <Card>
        <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
          <BarChart2 size={18} className="text-purple-600" />
          Monthly Spend Heatmap — Jan to Jun 2026
        </h2>
        <p className="text-xs text-gray-500 mb-4">Spend intensity by platform and month. Darker = higher spend.</p>

        <div className="overflow-x-auto table-scroll">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-2 px-3 w-28">Platform</th>
                {MONTHS.map((m) => (
                  <th key={m} className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide py-2 px-2">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CALENDAR_DATA.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-50">
                  <td className="py-2 px-3 font-semibold text-gray-700 whitespace-nowrap">{row.platform}</td>
                  {MONTHS.map((m) => {
                    const val = row[m];
                    return (
                      <td key={m} className="py-1.5 px-1.5 text-center">
                        <div className={`rounded-lg py-2 px-1 text-xs font-semibold ${getSpendColor(val)}`}>
                          ${(val / 1000).toFixed(0)}k
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 font-medium mr-1">Spend level:</span>
          {[
            { label: "$1k–2k",  cls: "bg-blue-100 text-blue-800" },
            { label: "$2k–4k",  cls: "bg-blue-200 text-blue-900" },
            { label: "$4k–6k",  cls: "bg-blue-300 text-blue-900" },
            { label: "$6k–8k",  cls: "bg-blue-400 text-white" },
            { label: "$8k–12k", cls: "bg-blue-500 text-white" },
            { label: "$12k–16k",cls: "bg-blue-600 text-white" },
            { label: "$16k+",   cls: "bg-blue-700 text-white" },
          ].map(({ label, cls }) => (
            <span key={label} className={`text-xs font-semibold rounded px-2 py-0.5 ${cls}`}>{label}</span>
          ))}
        </div>
      </Card>

    </div>
  );
}
