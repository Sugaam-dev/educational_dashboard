import { useMemo } from 'react';
import RiskHeatmap from '../components/dashboard/RiskHeatmap';
import ExceptionsList from '../components/dashboard/ExceptionsList';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import { riskProjects, riskColumns } from '../data/dashboardData';
import { riskFor } from '../utils/risk';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

export default function RiskPage() {
  // Compute risk distributions across the entire matrix
  const riskCounts = useMemo(() => {
    let low = 0, medium = 0, high = 0, critical = 0;
    riskProjects.forEach((proj, rowIndex) => {
      riskColumns.forEach((col, colIndex) => {
        const risk = riskFor(rowIndex, colIndex);
        if (risk === 'low') low++;
        else if (risk === 'medium') medium++;
        else if (risk === 'high') high++;
        else if (risk === 'critical') critical++;
      });
    });
    return [
      { name: 'Low', count: low, fill: '#10b981' },
      { name: 'Medium', count: medium, fill: '#3b82f6' },
      { name: 'High', count: high, fill: '#f59e0b' },
      { name: 'Critical', count: critical, fill: '#ef4444' }
    ];
  }, []);

  return (
    <>
      <SectionTitle title="Risk heat map" />
      <RiskHeatmap />
      <section className="two-column" style={{ marginTop: '24px' }}>
        <Card title="Top risk summary">
          <ExceptionsList compact />
        </Card>
        <Card title="Overall Risk Weight Distribution">
          <div style={{ height: '220px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskCounts} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} isAnimationActive={true} animationDuration={800}>
                  {riskCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </>
  );
}
