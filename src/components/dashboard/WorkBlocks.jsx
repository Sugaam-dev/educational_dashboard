import Card from '../common/Card';
import { badgeClass, dayPlan, people, progressBars } from '../../data/dashboardData';
import { navigateHash } from '../../utils/routing';

export function TodoCard({ todos, toggleTodo }) {
  return (
    <Card title="Today's to-do list">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <label className={`todo-row ${todo.done ? 'done' : ''}`} key={todo.task}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(index)} />
            <div>
              <strong>{todo.task}</strong>
              <p>{todo.meta}</p>
            </div>
            <span className={badgeClass[todo.done ? 'Done' : todo.status]}>{todo.done ? 'Done' : todo.status}</span>
          </label>
        ))}
      </div>
    </Card>
  );
}

export function PlanCard() {
  return (
    <Card title="Today's plan">
      <div className="plan-list">
        {dayPlan.map(([time, item, duration], index) => (
          <div className="plan-row" key={item}>
            <span>{time}</span>
            <i className={`dot dot-${index}`} />
            <strong>{item}</strong>
            <em>{duration}</em>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PeopleCard() {
  return (
    <Card title="People to chase today">
      <div className="people-list">
        {people.map(([avatar, name, meta, warning]) => (
          <div className="person-row" key={name}>
            <span>{avatar}</span>
            <div>
              <strong>{name}</strong>
              <p>{meta}</p>
              <em>{warning}</em>
            </div>
            <button onClick={() => navigateHash('notes')}>Draft note</button>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function AttentionCard() {
  const attention = [
    ['Zenith Admissions', 'Critical', 'Visa approval below threshold'],
    ['CRM Intake', 'Critical', '72h review SLA breached'],
    ['Scholarship Finance', 'High', 'Cost approval overdue'],
    ['Apex Consultancy', 'High', 'Document quality issue'],
    ['Nigeria Market', 'Watch', 'Fee-payment conversion drop'],
  ];

  return (
    <Card title="Initiatives needing attention this week">
      <div className="attention-list">
        {attention.map(([name, status, note]) => (
          <div className="attention-row" key={name}>
            <span>{name}</span>
            <b className={badgeClass[status]}>{status}</b>
            <em>{note}</em>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProgressCard({ onAsk }) {
  return (
    <Card title="This week's progress">
      <div className="progress-list">
        {progressBars.map(([label, value, count, color]) => (
          <div className="progress-row" key={label}>
            <div><span>{label}</span><strong>{count}</strong></div>
            <div className="progress-track"><i style={{ width: `${value}%`, background: color }} /></div>
          </div>
        ))}
      </div>
      <h3 className="buddy-title">Ask Buddy</h3>
      <div className="buddy-actions">
        {['How can we reduce application review SLA?', 'Which country has highest enrollment?', 'Draft escalation note for overdue approvals.'].map((question) => (
          <button key={question} onClick={() => onAsk(question)}>{question}</button>
        ))}
      </div>
    </Card>
  );
}
