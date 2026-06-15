import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import { buddyTemplates } from '../data/dashboardData';

export default function AskBuddyPage({ query, setQuery, reply, onAsk }) {
  return (
    <>
      <SectionTitle title="Ask Buddy" />
      <section className="two-column">
        <Card title="Ask education governance Buddy">
          <form className="buddy-form" onSubmit={(event) => { event.preventDefault(); onAsk(query || buddyTemplates[0].question); }}>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about approvals, visa risk, agents, markets..." />
            <button className="primary">Ask</button>
          </form>
          <div className="template-list">
            {buddyTemplates.map((item) => (
              <button key={item.question} onClick={() => onAsk(item.question)}>{item.question}</button>
            ))}
          </div>
        </Card>
        <Card title="Buddy response">
          <div className="buddy-response">
            <strong>{query || 'Governance summary'}</strong>
            <p>{reply}</p>
          </div>
        </Card>
      </section>
    </>
  );
}
