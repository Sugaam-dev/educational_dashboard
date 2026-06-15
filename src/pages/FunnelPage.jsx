import { useState } from 'react';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import SectionTitle from '../components/common/SectionTitle';
import { approvalSignals, funnelStages } from '../data/dashboardData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const LIVENESS_DATA = [
  { day: 'Mon', volume: 42 },
  { day: 'Tue', volume: 55 },
  { day: 'Wed', volume: 48 },
  { day: 'Thu', volume: 70 },
  { day: 'Fri', volume: 62 },
  { day: 'Sat', volume: 38 },
  { day: 'Sun', volume: 45 },
];

export default function FunnelPage({ onAsk }) {
  const [selected, setSelected] = useState(funnelStages[1]);

  return (
    <>
      <SectionTitle title="Approval funnel" />
      <section className="two-column">
        <Card title="Interactive gate breakdown">
          <div className="funnel-list">
            {funnelStages.map((stage) => (
              <button className={`funnel-row clickable ${selected.label === stage.label ? 'selected' : ''}`} key={stage.label} onClick={() => setSelected(stage)}>
                <span>{stage.label}</span>
                <div className="bar-track"><div style={{ width: `${(stage.value / 34) * 100}%`, background: stage.color }} /></div>
                <strong>{stage.value}</strong>
              </button>
            ))}
          </div>
        </Card>
        <Card title="Selected gate diagnostics">
          <div className="detail-panel">
            <span className="badge badge-blue">{selected.label}</span>
            <strong>{selected.value} records in gate</strong>
            <p>{selected.sla} SLA exceptions need owner confirmation. Owner: {selected.owner}. Recommended action: rebalance reviewer capacity and ask Buddy for a chase note.</p>
            <button className="primary" onClick={() => onAsk(`What is the status of the ${selected.label} gate?`)}>Ask Buddy about this gate</button>
          </div>
        </Card>
      </section>

      <SectionTitle title="Liveness Analytics & Signals" />
      <section className="two-column">
        <Card title="Active Queue Liveness Volume (Past 7 Days)">
          <div style={{ height: '220px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LIVENESS_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d73bd" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1d73bd" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#1d73bd" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVolume)" name="Active Queue" isAnimationActive={true} animationDuration={800} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Approval Age Metrics">
          <div className="signal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginTop: '10px' }}>
            {approvalSignals.map((item) => (
              <MetricCard key={item.label} {...item} small />
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}
