import Card from '../common/Card';
import { badgeClass, exceptions } from '../../data/dashboardData';

export default function ExceptionsList({ compact }) {
  return (
    <Card title={compact ? 'Urgent items needing action' : undefined}>
      <div className="exception-list">
        {exceptions.map((item) => (
          <div className="exception-row" key={item.title}>
            <span className={badgeClass[item.badge]}>{item.badge}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
