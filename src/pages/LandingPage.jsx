import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import { funnelStages } from '../data/dashboardData';
import { navigateHash } from '../utils/routing';

export default function LandingPage() {
  const goLogin = (redirect = 'dashboard') => navigateHash('login', { redirect });

  return (
    <main className="landing">
      <header className="landing-nav">
        <div className="brand landing-brand">
          <img src="/logo.png" alt="PMRG Solution logo" />
          <span>UniGov Control</span>
        </div>
        <div>
          <button onClick={() => goLogin('risk')}>View risk heat map</button>
          <button className="primary" onClick={() => goLogin('dashboard')}>Login</button>
        </div>
      </header>

      <section className="hero-panel">
        <div>
          <span className="eyebrow">International education governance</span>
          <h1>Control approvals, visa risk, agents, markets, notes, and follow-ups from one command centre.</h1>
          <p>
            A static but fully featured frontend prototype with realistic dummy data for university
            leadership, admissions teams, finance, registrars, and regional recruitment managers.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold', margin: 0 }}>
              To access the governance command center, click the button below to sign in/sign up:
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="primary" 
                onClick={() => goLogin('dashboard')}
                style={{ fontSize: '12px', padding: '8px 16px' }}
              >
                Login / Signup
              </button>
            </div>
          </div>
        </div>
        <div className="hero-preview">
          <MetricCard label="Compliance health" value="94.2%" note="institutional audit index" tone="green" />
          <MetricCard label="Visa SLA risk" value="9" note="cases breached today" tone="red" />
          <div className="mini-bars">
            {funnelStages.slice(0, 5).map((stage) => (
              <div key={stage.label}><span>{stage.label}</span><i style={{ width: `${(stage.value / 34) * 100}%`, background: stage.color }} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-grid">
        {[
          ['Approval gates', 'Track application, offer, finance, visa, and enrollment release gates.'],
          ['Risk matrix', 'Click any heatmap cell to open a detail page for that risk area.'],
          ['Ask Buddy', 'Use predefined education governance questions mapped to realistic answers.'],
          ['Draft notes', 'Write notes that auto-save temporarily for 10 minutes.'],
        ].map(([title, text]) => (
          <Card key={title} title={title}><p className="card-copy">{text}</p></Card>
        ))}
      </section>
    </main>
  );
}
