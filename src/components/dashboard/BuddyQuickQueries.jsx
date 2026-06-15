import Card from '../common/Card';
import { buddyTemplates } from '../../data/dashboardData';
import { navigateHash } from '../../utils/routing';

export default function BuddyQuickQueries({ onAsk }) {
  function ask(question) {
    onAsk(question);
    navigateHash('ask-buddy');
  }

  return (
    <Card>
      <p className="muted">Ask Buddy templates:</p>
      <div className="query-row">
        {buddyTemplates.slice(0, 6).map((item) => (
          <button key={item.question} onClick={() => ask(item.question)}>{item.question}</button>
        ))}
      </div>
    </Card>
  );
}
