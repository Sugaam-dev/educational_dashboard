import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  ShieldCheck, FileCheck, Stamp, UserCheck, BookMarked,
  AlertTriangle, CheckCircle, XCircle, Info, TrendingUp,
} from 'lucide-react';
import { AGENT_QUALITY, DEFECT_TYPES } from '../data/dashboardData';

// ─── Inline chart data ────────────────────────────────────────────────────────
const CHANNEL_QUALITY = [
  { metric: 'Doc Complete',   Direct: 96, Agents: 86, Digital: 88, Fairs: 82 },
  { metric: 'Academic Elig',  Direct: 94, Agents: 87, Digital: 85, Fairs: 88 },
  { metric: 'Visa Approval',  Direct: 91, Agents: 84, Digital: 80, Fairs: 83 },
  { metric: 'Reg Completion', Direct: 95, Agents: 89, Digital: 86, Fairs: 84 },
  { metric: 'TRC Completion', Direct: 88, Agents: 78, Digital: 80, Fairs: 76 },
];

// ─── Grade helpers ────────────────────────────────────────────────────────────
const gradeConfig = {
  'A+': { badge: 'bg-green-700 text-white',   barColor: '#15803d', label: 'A+' },
  'A':  { badge: 'bg-emerald-500 text-white', barColor: '#10b981', label: 'A'  },
  'B':  { badge: 'bg-blue-500 text-white',    barColor: '#3b82f6', label: 'B'  },
  'C':  { badge: 'bg-amber-500 text-white',   barColor: '#f59e0b', label: 'C'  },
  'F':  { badge: 'bg-red-600 text-white',     barColor: '#ef4444', label: 'F'  },
};

const riskConfig = {
  Critical: { border: 'border-l-red-500',   badge: 'bg-red-100 text-red-700',   icon: XCircle,       iconColor: 'text-red-500'  },
  High:     { border: 'border-l-amber-500', badge: 'bg-amber-100 text-amber-700',icon: AlertTriangle, iconColor: 'text-amber-500' },
  Medium:   { border: 'border-l-blue-500',  badge: 'bg-blue-100 text-blue-700',  icon: Info,          iconColor: 'text-blue-500'  },
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────
const QualityKpiCard = ({ icon: Icon, label, value, tone }) => {
  const toneMap = {
    green: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', val: 'text-emerald-700' },
    amber: { bg: 'bg-amber-50',   border: 'border-amber-200',   icon: 'text-amber-600',   val: 'text-amber-700'   },
    blue:  { bg: 'bg-blue-50',    border: 'border-blue-200',    icon: 'text-blue-600',    val: 'text-blue-700'    },
  };
  const t = toneMap[tone] || toneMap.green;
  return (
    <div className={`card p-4 border ${t.border} ${t.bg}`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg border ${t.border} ${t.bg}`}>
          <Icon size={18} className={t.icon} />
        </div>
      </div>
      <p className={`text-2xl font-extrabold ${t.val}`}>{value}</p>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1 leading-tight">{label}</p>
    </div>
  );
};

// ─── Custom bar with grade color ──────────────────────────────────────────────
const AgentScoreBarCell = (props) => {
  const { x, y, width, height, grade } = props;
  const color = gradeConfig[grade]?.barColor || '#6b7280';
  return <rect x={x} y={y} width={width} height={height} fill={color} rx={3} />;
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdmissionQualityPage({ onAsk }) {
  const [selectedGrade, setSelectedGrade] = useState('All');

  // Prepare agent bar chart data
  const agentBarData = AGENT_QUALITY.map((a) => ({
    name:  a.agent.split(' ')[0],
    score: a.overallScore,
    grade: a.grade,
    full:  a.agent,
  }));

  const totalDefects = DEFECT_TYPES.reduce((s, d) => s + d.count, 0);

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur mb-2 tracking-wide uppercase">
              
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
              Admission Quality Governance
            </h1>
            <p className="text-indigo-100 text-sm mt-1">
              Document Quality, Compliance &amp; Agent Performance Matrix
            </p>
          </div>
          <button
            onClick={() => onAsk?.('Which vendors are causing document quality issues?')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur self-start sm:self-auto whitespace-nowrap"
          >
            <ShieldCheck size={16} />
            Ask Buddy
          </button>
        </div>
      </div>

      {/* ── SECTION 1: QUALITY SCORE SUMMARY ───────────────────────────────── */}
      <div>
        <p className="section-title mb-3">Quality Score Summary — All Channels</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <QualityKpiCard icon={FileCheck}    label="Complete Documentation Rate" value="81.4%" tone="green" />
          <QualityKpiCard icon={BookMarked}   label="Academic Eligibility Rate"   value="88.2%" tone="green" />
          <QualityKpiCard icon={Stamp}        label="Visa Approval Rate"          value="84.4%" tone="amber" />
          <QualityKpiCard icon={UserCheck}    label="Registration Completion"     value="91.2%" tone="green" />
          <QualityKpiCard icon={CheckCircle}  label="TRC Completion Rate"         value="76.8%" tone="amber" />
        </div>
      </div>

      {/* ── SECTION 2: AGENT QUALITY TABLE ─────────────────────────────────── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <p className="section-title">Agent Quality Performance Matrix</p>
          {/* Grade filter */}
          <div className="flex items-center gap-1 flex-wrap">
            {['All', 'A+', 'A', 'B', 'C', 'F'].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  selectedGrade === g
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto table-scroll">
            <table className="w-full text-sm" style={{ minWidth: '950px' }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['Agent', 'Country', 'Doc Complete%', 'Academic Elig%', 'Visa Approval%', 'Reg Completion%', 'TRC Completion%', 'Overall Score', 'Grade'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {AGENT_QUALITY
                  .filter((a) => selectedGrade === 'All' || a.grade === selectedGrade)
                  .map((agent, i) => {
                    const gc = gradeConfig[agent.grade] || gradeConfig['B'];
                    const scoreColor =
                      agent.overallScore >= 90 ? 'text-emerald-700'
                      : agent.overallScore >= 80 ? 'text-blue-700'
                      : agent.overallScore >= 70 ? 'text-amber-700'
                      : 'text-red-700';
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{agent.agent}</td>
                        <td className="px-4 py-3 text-gray-600">{agent.country}</td>
                        <td className="px-4 py-3 text-gray-700">{agent.docComplete.toFixed(1)}%</td>
                        <td className="px-4 py-3 text-gray-700">{agent.academicElig.toFixed(1)}%</td>
                        <td className="px-4 py-3">
                          <span className={agent.visaApproval < 75 ? 'text-red-600 font-bold' : 'text-gray-700'}>
                            {agent.visaApproval.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{agent.regCompletion.toFixed(1)}%</td>
                        <td className="px-4 py-3 text-gray-700">{agent.trcCompletion.toFixed(1)}%</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <span className={`font-bold text-base w-12 ${scoreColor}`}>
                              {agent.overallScore.toFixed(1)}
                            </span>
                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{ width: `${agent.overallScore}%`, backgroundColor: gc.barColor }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${gc.badge}`}>
                            {agent.grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: TWO-COLUMN CHARTS ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Left: Radar chart — Quality by Channel */}
        <div className="card p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
            Quality Score by Channel
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={CHANNEL_QUALITY} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <PolarRadiusAxis angle={90} domain={[70, 100]} tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <Radar name="Direct"  dataKey="Direct"  stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.12} strokeWidth={2} />
              <Radar name="Agents"  dataKey="Agents"  stroke="#10b981" fill="#10b981" fillOpacity={0.12} strokeWidth={2} />
              <Radar name="Digital" dataKey="Digital" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.12} strokeWidth={2} />
              <Radar name="Fairs"   dataKey="Fairs"   stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.12} strokeWidth={2} />
              <Legend iconType="circle" iconSize={8} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Right: BarChart — Overall score per agent */}
        <div className="card p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
            Overall Quality Score by Agent
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={agentBarData}
              margin={{ top: 8, right: 16, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v, _n, p) => [`${v.toFixed(1)}%`, p.payload.full]}
                labelFormatter={() => ''}
              />
              <Bar dataKey="score" name="Score" radius={[4, 4, 0, 0]}>
                {agentBarData.map((entry, i) => (
                  <Cell key={i} fill={gradeConfig[entry.grade]?.barColor || '#6b7280'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* Grade legend */}
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {Object.entries(gradeConfig).map(([g, cfg]) => (
              <span key={g} className={`px-2 py-0.5 rounded-full text-xs font-bold ${cfg.badge}`}>
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 4: DOCUMENT DEFECT TRACKER ──────────────────────────────── */}
      <div>
        <p className="section-title mb-3">Document Defect Tracker</p>

        {/* Summary banner */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 mb-4">
          <AlertTriangle size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800 font-semibold">
            Total defects recorded: <span className="text-red-700 font-extrabold">{totalDefects}</span>
            {' '}— Critical items require immediate agent intervention
          </p>
        </div>

        <div className="space-y-3">
          {DEFECT_TYPES.map((defect, i) => {
            const rc = riskConfig[defect.risk] || riskConfig.Medium;
            const RiskIcon = rc.icon;
            const pct = Math.round((defect.count / totalDefects) * 100);
            return (
              <div
                key={i}
                className={`card p-4 border-l-4 ${rc.border} hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                  {/* Risk badge + icon */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <RiskIcon size={18} className={rc.iconColor} />
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${rc.badge}`}>
                      {defect.risk}
                    </span>
                  </div>

                  {/* Defect info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm leading-tight">{defect.type}</p>

                    {/* Agents involved */}
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {defect.agents.map((ag, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                          {ag}
                        </span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${pct}%`,
                            backgroundColor:
                              defect.risk === 'Critical' ? '#ef4444'
                              : defect.risk === 'High' ? '#f59e0b'
                              : '#3b82f6',
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-10 text-right">{pct}%</span>
                    </div>
                  </div>

                  {/* Count */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-extrabold text-gray-800">{defect.count}</p>
                    <p className="text-xs text-gray-400">defects</p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-4 p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-700 flex items-start gap-2">
          <Info size={14} className="flex-shrink-0 mt-0.5" />
          <span>
            Critical defects trigger automatic portal restriction after 72 hours without remediation.
            Agents flagged as Critical must submit a corrective action plan within 5 business days.
          </span>
        </div>
      </div>

    </div>
  );
}
