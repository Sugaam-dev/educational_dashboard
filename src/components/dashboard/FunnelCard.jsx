import Card from '../common/Card';
import { funnelStages } from '../../data/dashboardData';

export default function FunnelCard() {
  return (
    <Card title="Gate breakdown">
      <div className="funnel-list">
        {funnelStages.map((stage) => (
          <div className="funnel-row" key={stage.label}>
            <span>{stage.label}</span>
            <div className="bar-track"><div style={{ width: `${(stage.value / 34) * 100}%`, background: stage.color }} /></div>
            <strong>{stage.value}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
