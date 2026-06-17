import { useState } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import { RECRUITMENT_FUNNEL } from '../data/dashboardData';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area
} from 'recharts';
import { Users, MessageSquare, FileText, Award, CreditCard, Stamp, Plane, GraduationCap, TrendingDown, AlertTriangle, Clock } from 'lucide-react';

const STAGE_ICONS = { Users, MessageSquare, FileText, Award, CreditCard, Stamp, Plane, GraduationCap };

const CHANNEL_FILTERS = ['All', 'Agents', 'Direct', 'Digital'];

const CONV_TREND = [
  { month: 'Jan', rate: 10.2 },
  { month: 'Feb', rate: 11.4 },
  { month: 'Mar', rate: 10.8 },
  { month: 'Apr', rate: 12.1 },
  { month: 'May', rate: 11.8 },
  { month: 'Jun', rate: 12.8 },
];

function fmt(n) {
  return n.toLocaleString();
}

export default function FunnelPage({ onAsk }) {
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [selected, setSelected] = useState(null);

  const max = RECRUITMENT_FUNNEL[0].volume;

  // Determine bottleneck stages (drop > 25%)
  const isBottleneck = (stage) => stage.dropOff > 0 && (stage.dropOff / (stage.volume + stage.dropOff)) > 0.25;

  return (
    <>
      {/* Header */}
      <div className="rounded-xl mb-6 p-6 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white"> </span>
        </div>
        <h2 className="text-2xl font-black text-white mb-1">8-Stage International Recruitment Funnel</h2>
        <p className="text-blue-100 text-sm">Lead-to-Enrollment Conversion Intelligence — June 2026 Intake</p>
      </div>

      {/* Channel filter tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {CHANNEL_FILTERS.map((ch) => (
          <button
            key={ch}
            onClick={() => setSelectedChannel(ch)}
            className={selectedChannel === ch ? 'primary' : 'secondary'}
            style={{ padding: '6px 16px', fontSize: '12px', borderRadius: '999px' }}
          >
            {ch}
          </button>
        ))}
        <span className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
          <Clock size={12} /> Data for: June 2026 Intake
        </span>
      </div>

      {/* Funnel Visualization */}
      <SectionTitle title="Recruitment Pipeline — Stage by Stage" />
      <section className="card mb-5">
        <div className="flex flex-col gap-2">
          {RECRUITMENT_FUNNEL.map((stage, i) => {
            const Icon = STAGE_ICONS[stage.icon] || Users;
            const widthPct = (stage.volume / max) * 100;
            const bottleneck = isBottleneck(stage);
            const isSelected = selected?.stage === stage.stage;

            return (
              <button
                key={stage.stage}
                onClick={() => setSelected(isSelected ? null : stage)}
                title={`Click for details on ${stage.stage}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `2px solid ${isSelected ? stage.color : bottleneck ? '#fecaca' : '#f1f5f9'}`,
                  background: isSelected ? `${stage.color}12` : bottleneck ? '#fff5f5' : '#f8fafc',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {/* Stage number */}
                <span style={{ minWidth: '24px', height: '24px', borderRadius: '50%', background: stage.color, color: '#fff', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</span>

                {/* Icon */}
                <span style={{ color: stage.color, flexShrink: 0 }}><Icon size={16} /></span>

                {/* Stage name */}
                <span style={{ minWidth: '160px', fontWeight: '700', fontSize: '12px', color: '#1e293b', flexShrink: 0 }}>{stage.stage}</span>

                {/* Progress bar */}
                <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden', minWidth: '60px' }}>
                  <div style={{ width: `${widthPct}%`, height: '100%', background: stage.color, borderRadius: '999px', transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
                </div>

                {/* Volume */}
                <span style={{ fontWeight: '800', fontSize: '14px', color: stage.color, minWidth: '55px', textAlign: 'right', flexShrink: 0 }}>{fmt(stage.volume)}</span>

                {/* Conv rate */}
                <span style={{ fontSize: '11px', color: stage.convRate >= 75 ? '#16a34a' : '#d97706', fontWeight: '700', minWidth: '80px', textAlign: 'center', flexShrink: 0 }}>
                  {i === 0 ? '—' : `${stage.convRate}% conv.`}
                </span>

                {/* SLA badge */}
                <span className={`badge ${stage.sla === 'On Time' ? 'badge-green' : 'badge-red'}`} style={{ flexShrink: 0, fontSize: '9px' }}>
                  {stage.sla}
                </span>

                {/* Bottleneck warning */}
                {bottleneck && <AlertTriangle size={14} color="#ef4444" style={{ flexShrink: 0 }} />}

                {/* Owner */}
                <span style={{ fontSize: '10px', color: '#94a3b8', minWidth: '110px', textAlign: 'right', flexShrink: 0, display: 'none' }} className="md:inline">{stage.owner}</span>
              </button>
            );
          })}
        </div>

        {/* Expanded detail panel */}
        {selected && (
          <div style={{ marginTop: '16px', padding: '16px', borderRadius: '10px', background: `${selected.color}0d`, border: `1px solid ${selected.color}40` }}>
            <div className="flex flex-wrap gap-4 items-start">
              <div style={{ flex: 1, minWidth: '180px' }}>
                <h4 style={{ margin: 0, color: selected.color, fontWeight: '800', fontSize: '14px' }}>{selected.stage}</h4>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '12px' }}>Owner: <strong>{selected.owner}</strong></p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div style={{ textAlign: 'center', padding: '8px 12px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: selected.color }}>{fmt(selected.volume)}</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>In Stage</div>
                </div>
                {selected.dropOff > 0 && (
                  <div style={{ textAlign: 'center', padding: '8px 12px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#ef4444' }}>{fmt(selected.dropOff)}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Dropped</div>
                  </div>
                )}
                <div style={{ textAlign: 'center', padding: '8px 12px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: selected.convRate >= 75 ? '#16a34a' : '#d97706' }}>{selected.convRate}%</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>Conv. Rate</div>
                </div>
              </div>
              <button className="primary" style={{ fontSize: '11px', padding: '8px 14px' }} onClick={() => onAsk(`What actions are needed for the ${selected.stage} stage?`)}>
                Ask Buddy
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Drop-off Analysis */}
      <SectionTitle title="Stage Drop-Off Analysis — Critical Bottlenecks" />
      <section className="card mb-5">
        <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '12px' }}>Showing student loss between consecutive stages. Red indicates critical bottleneck (&gt;25% drop).</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {RECRUITMENT_FUNNEL.slice(1).map((stage, i) => {
            const prev = RECRUITMENT_FUNNEL[i];
            const dropPct = ((stage.dropOff / prev.volume) * 100).toFixed(1);
            const isCritical = parseFloat(dropPct) > 25;
            return (
              <div key={stage.stage} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '8px 14px', borderRadius: '8px',
                background: isCritical ? '#fef2f2' : '#f8fafc',
                border: `1px solid ${isCritical ? '#fecaca' : '#e2e8f0'}`
              }}>
                <TrendingDown size={14} color={isCritical ? '#ef4444' : '#94a3b8'} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: '12px', fontWeight: '600', color: isCritical ? '#b91c1c' : '#475569' }}>
                  {prev.stage} → {stage.stage}
                </span>
                <span style={{ fontSize: '13px', fontWeight: '800', color: isCritical ? '#ef4444' : '#64748b', minWidth: '50px', textAlign: 'right' }}>
                  -{fmt(stage.dropOff)}
                </span>
                <span style={{
                  padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '700',
                  background: isCritical ? '#ef4444' : '#e2e8f0',
                  color: isCritical ? '#fff' : '#475569'
                }}>
                  {dropPct}% lost
                </span>
                {isCritical && <span className="badge badge-red" style={{ fontSize: '9px' }}>CRITICAL</span>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="two-column">
        {/* Volume Bar Chart */}
        <Card title="Volume at Each Funnel Stage">
          <div style={{ height: '280px', width: '100%', marginTop: '8px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RECRUITMENT_FUNNEL} layout="vertical" margin={{ top: 0, right: 20, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => v.toLocaleString()} />
                <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} width={90} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                  formatter={(v) => [v.toLocaleString(), 'Students']}
                />
                <Bar dataKey="volume" radius={[0, 6, 6, 0]}>
                  {RECRUITMENT_FUNNEL.map((s, i) => (
                    <rect key={i} fill={s.color} />
                  ))}
                </Bar>
                {RECRUITMENT_FUNNEL.map((s, i) => null)}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Conversion Trend */}
        <Card title="Overall Funnel Conversion Rate Trend (Last 6 Months)">
          <div style={{ height: '280px', width: '100%', marginTop: '8px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CONV_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} domain={[9, 14]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                  formatter={(v) => [`${v}%`, 'Conv. Rate']}
                />
                <Area type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2.5} fill="url(#convGrad)" name="Conversion Rate" dot={{ fill: '#3b82f6', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: '12px', padding: '10px 14px', background: '#eff6ff', borderRadius: '8px', fontSize: '12px' }}>
            <strong style={{ color: '#1d4ed8' }}>📈 Trend:</strong> <span style={{ color: '#475569' }}>Overall funnel conversion improved from 10.2% (Jan) to <strong>12.8%</strong> (Jun 2026). Fee Payment and Application stages remain the primary bottlenecks.</span>
          </div>
        </Card>
      </section>
    </>
  );
}
