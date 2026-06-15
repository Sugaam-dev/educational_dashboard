import { useEffect, useState, Fragment } from 'react';
import BuddyQuickQueries from '../components/dashboard/BuddyQuickQueries';
import FunnelCard from '../components/dashboard/FunnelCard';
import { AttentionCard, PeopleCard, PlanCard, ProgressCard, TodoCard } from '../components/dashboard/WorkBlocks';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import SectionTitle from '../components/common/SectionTitle';
import { approvalSignals, commandStats, portfolioCards, weeklyMovement, agents, markets, exceptions, badgeClass, riskProjects, riskColumns } from '../data/dashboardData';
import { navigateHash } from '../utils/routing';
import { riskFor, riskInitial } from '../utils/risk';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage({ todos, toggleTodo, onAsk }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SectionTitle title="Portfolio health" />
      <section className="portfolio-grid">
        {portfolioCards.map((card) => (
          <button className="metric-button" key={card.label} onClick={() => navigateHash(card.page)}>
            <MetricCard {...card} />
          </button>
        ))}
      </section>

      <SectionTitle title="Approval funnel & signals" />
      <section className="two-column">
        <FunnelCard />
        <Card title="Approval age signals">
          <div className="signal-grid">
            {approvalSignals.map((item) => <MetricCard key={item.label} {...item} small />)}
          </div>
        </Card>
      </section>

      {/* NEW: Domain Summaries & Quick Access */}
      <SectionTitle title="Executive Domain Summaries" />
      
      {/* Full Screen Width Risk Heatmap */}
      <div style={{ marginBottom: '24px' }}>
        <Card title="Risk Matrix Overview - Click any cell for project detailed analysis">
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <div className="heatmap" style={{ minWidth: '700px', fontSize: '10px', gap: '3px' }}>
              <div className="heatmap-head" />
              {riskColumns.map((column) => (
                <div className="heatmap-head" key={column} style={{ fontSize: '9px', fontWeight: 'bold' }}>{column}</div>
              ))}
              {riskProjects.map((project, rowIndex) => (
                <Fragment key={project}>
                  <div className="heatmap-project" style={{ fontSize: '10px', padding: '4px 6px' }}>{project}</div>
                  {riskColumns.map((column, colIndex) => {
                    const risk = riskFor(rowIndex, colIndex);
                    return (
                      <button
                        className={`heat-cell ${risk}`}
                        key={`${project}-${column}`}
                        onClick={() => navigateHash('heatmap-detail', { project, dimension: column, risk })}
                        title={`${project} - ${column} - ${risk}`}
                        style={{
                          minHeight: '18px',
                          fontSize: '8px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '2px'
                        }}
                      >
                        {riskInitial(risk)}
                      </button>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <section className="two-column" style={{ marginBottom: '24px' }}>
        {/* Row 1: Exceptions & Agents */}
        <Card title="Exceptions Briefing">
          <div className="exception-list" style={{ marginBottom: '16px', gap: '8px' }}>
            {exceptions.slice(0, 3).map((item) => (
              <div 
                key={item.title} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px 10px', 
                  background: '#f8fafc', 
                  borderRadius: '8px', 
                  border: '1px solid #f1f5f9',
                  fontSize: '11px'
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', overflow: 'hidden' }}>
                  <span className={badgeClass[item.badge]} style={{ fontSize: '9px', padding: '2px 6px' }}>{item.badge}</span>
                  <span className="truncate" style={{ fontWeight: 'bold', color: '#475569' }}>{item.title}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontStyle: 'italic', flexShrink: 0 }}>{item.owner.split(' ')[0]}</span>
              </div>
            ))}
          </div>
          <button 
            className="secondary" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', padding: '8px' }}
            onClick={() => navigateHash('exceptions')}
          >
            <span>View All Exceptions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Card>

        <Card title="Top Recruiting Agents">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {agents.slice(0, 3).map((agent) => (
              <div key={agent.name} style={{ fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ color: '#475569' }}>{agent.name}</strong>
                  <span style={{ fontWeight: 'bold', color: '#0f766e' }}>{agent.revenue}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: animate ? `${agent.visa}%` : '0%', height: '6px', backgroundColor: agent.visa > 90 ? '#10b981' : agent.visa > 75 ? '#f59e0b' : '#ef4444', borderRadius: '3px', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                  </div>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>{agent.visa}% Visa</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="secondary" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', padding: '8px' }}
            onClick={() => navigateHash('agents')}
          >
            <span>Open Agents Directory</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Card>
      </section>

      <section className="two-column" style={{ marginBottom: '24px' }}>
        {/* Row 2: Markets & Quality */}
        <Card title="Primary Intake Markets">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {markets.slice(0, 3).map((market) => (
              <div key={market.country} style={{ fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ color: '#475569' }}>{market.country}</strong>
                  <span style={{ fontWeight: 'bold', color: '#1d73bd' }}>{market.revenue}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: animate ? `${(parseFloat(market.revenue.replace(/[^0-9.]/g, '')) / 38.2) * 100}%` : '0%', 
                        height: '6px', 
                        backgroundColor: '#3b82f6', 
                        borderRadius: '3px', 
                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' 
                      }} 
                    />
                  </div>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>{market.trend}</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="secondary" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', padding: '8px' }}
            onClick={() => navigateHash('markets')}
          >
            <span>Explore Markets Overview</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Card>

        <Card title="Admissions Quality & Security">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ color: '#475569', fontWeight: 'bold' }}>Average Compliance Score</span>
              <strong style={{ color: '#10b981' }}>89.2%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ color: '#475569', fontWeight: 'bold' }}>Document Verification</span>
              <strong style={{ color: '#10b981' }}>100% Secure</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ color: '#475569', fontWeight: 'bold' }}>Integrations Status</span>
              <strong style={{ color: '#3b82f6' }}>All Systems Active</strong>
            </div>
          </div>
          <button 
            className="secondary" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', padding: '8px' }}
            onClick={() => navigateHash('settings')}
          >
            <span>Open System Settings</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Card>
      </section>

      <SectionTitle title="Governance trends" />
      <Card title="Weekly movement">
        <div className="trend-list">
          {weeklyMovement.map(([label, value, delta]) => (
            <div className="trend-row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <em className={delta === 'ok' ? 'good' : delta.includes('d') ? 'bad' : Number(delta) > 2 ? 'bad' : 'good'}>
                {delta === 'ok' ? 'OK' : delta}
              </em>
            </div>
          ))}
        </div>
      </Card>

      <SectionTitle title="Ask Buddy quick queries" />
      <BuddyQuickQueries onAsk={onAsk} />

      <SectionTitle title="PM command centre - today" />
      <section className="portfolio-grid">
        {commandStats.map((card) => <MetricCard key={card.label} {...card} />)}
      </section>

      <section className="command-grid">
        <TodoCard todos={todos} toggleTodo={toggleTodo} />
        <div className="stack">
          <PlanCard />
          <PeopleCard />
        </div>
      </section>

      <section className="two-column">
        <AttentionCard />
        <ProgressCard onAsk={onAsk} />
      </section>
    </>
  );
}

