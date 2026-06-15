import { useState, useMemo } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import { badgeClass, exceptions } from '../data/dashboardData';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function ExceptionsPage({ onAsk }) {
  const [filter, setFilter] = useState('All');
  const [expandedTitle, setExpandedTitle] = useState(null);
  
  const filtered = filter === 'All' ? exceptions : exceptions.filter((item) => item.badge === filter || item.area === filter);

  // Dynamic severity count for PieChart
  const chartData = useMemo(() => {
    const counts = {};
    filtered.forEach((item) => {
      counts[item.badge] = (counts[item.badge] || 0) + 1;
    });
    return Object.keys(counts).map((badge) => ({
      name: badge,
      value: counts[badge],
    }));
  }, [filtered]);

  const getDiagnosticReport = (title) => {
    const t = title.toLowerCase();
    if (t.includes('zenith')) {
      return 'Visa approval rates for Zenith Admissions have fallen to 58.2%, far below the mandatory 80% threshold. The regional consulate in Lagos has flagged multiple files for inadequate proof of funds. Recommendation: Freeze portal access immediately, review all pending offers, and mandate paper transcript verification.';
    }
    if (t.includes('crm intake') || t.includes('crm')) {
      return 'Offer processing queue for South Asia region is currently backlogged with 84 applications. Average turnaround time has hit 92 hours, breaching the 72h SLA. Recommendation: Automatically route BBA/MBA files to the secondary admissions queue and add two additional temporary reviewers.';
    }
    if (t.includes('scholarship')) {
      return 'Multiple scholarship applications for MBA and Nursing programs have been pending for over 6 days without sign-off. The delay is caused by dual dean approval requirements. Recommendation: Trigger auto-approval for applicants with GPA above 3.8, and escalate double-signoff exceptions to the Vice Provost.';
    }
    if (t.includes('apex')) {
      return 'Apex Consultancy document audit reports 24% document rejection rate. Multiple files contained scanned high-school certificates with compression artifacts. Recommendation: Pause automated offer generation for Apex candidates, and execute a formal audit on the last 50 uploaded student transcripts.';
    }
    if (t.includes('nigeria market') || t.includes('nigeria')) {
      return 'Fee-payment completions from Nigeria have dropped by 18% due to local currency volatility. Student bank proofs are taking longer to clear international compliance checks. Recommendation: Integrate alternative currency settlement portals or offer split-deposit payment schedules to candidates.';
    }
    return 'System diagnostic report shows a potential governance compliance delay. Owner has been notified to execute a manual audit. Recommended action: schedule daily follow-up and review eligibility checklists.';
  };

  return (
    <>
      <SectionTitle title="Exception panel" />
      <div className="filter-row">
        {['All', 'Critical', 'High', 'Agent', 'Finance'].map((item) => (
          <button className={filter === item ? 'active-filter' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>

      {chartData.length > 0 && (
        <section className="two-column" style={{ marginBottom: '24px' }}>
          <Card title="Exceptions Severity Distribution">
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={600}
                  >
                    {chartData.map((entry, index) => {
                      const colors = {
                        Critical: '#ef4444',
                        High: '#f59e0b',
                        Watch: '#3b82f6',
                        Done: '#10b981',
                      };
                      return <Cell key={`cell-${index}`} fill={colors[entry.name] || '#64748b'} />;
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card title="Exceptions Analytics Summary">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', fontSize: '12px' }}>
                <span style={{ color: '#64748b', fontWeight: 'bold' }}>Active Exceptions</span>
                <strong style={{ color: '#0f172a' }}>{filtered.length}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fff5f5', borderRadius: '10px', fontSize: '12px' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Critical Actions Pending</span>
                <strong style={{ color: '#b91c1c' }}>{filtered.filter(e => e.badge === 'Critical').length}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fffbeb', borderRadius: '10px', fontSize: '12px' }}>
                <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>High Priority Actions</span>
                <strong style={{ color: '#b45309' }}>{filtered.filter(e => e.badge === 'High').length}</strong>
              </div>
            </div>
          </Card>
        </section>
      )}
      
      <Card title="Urgent items needing action - Click row to expand diagnostics">
        <div className="exception-list">
          {filtered.map((item) => {
            const isExpanded = expandedTitle === item.title;
            return (
              <div 
                className="exception-item-container" 
                key={item.title}
                style={{ borderBottom: '1px solid #eef2f7' }}
              >
                {/* Clickable Header Row */}
                <div 
                  className={`exception-row exception-rich clickable ${isExpanded ? 'bg-slate-50' : ''}`}
                  onClick={() => setExpandedTitle(isExpanded ? null : item.title)}
                  style={{ 
                    cursor: 'pointer',
                    padding: '12px 8px',
                    borderBottom: 'none',
                    backgroundColor: isExpanded ? '#f8fafc' : 'transparent',
                    transition: 'all 0.2s',
                    borderRadius: '8px',
                  }}
                >
                  <span className={badgeClass[item.badge]}>{item.badge}</span>
                  <div>
                    <strong style={{ color: '#1e293b', fontSize: '12px' }}>{item.title}</strong>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '11px' }}>{item.meta}</p>
                  </div>
                  <em style={{ fontStyle: 'normal', fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>{item.owner}</em>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAsk(`Draft escalation note for ${item.title}`);
                    }}
                    style={{ fontSize: '11px', padding: '4px 8px' }}
                  >
                    Draft note
                  </button>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div 
                    className="exception-details-panel animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      padding: '16px 20px',
                      backgroundColor: '#f8fafc',
                      borderLeft: '4px solid #3b82f6',
                      borderRadius: '0 0 8px 8px',
                      marginBottom: '8px',
                      marginTop: '-4px',
                      fontSize: '12px',
                      color: '#475569',
                      borderBottom: '1px solid #e2e8f0'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>Governance Area</span>
                        <strong style={{ color: '#1e293b' }}>{item.area}</strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>Escalation Owner</span>
                        <strong style={{ color: '#1e293b' }}>{item.owner} ({item.owner.toLowerCase().replace(/\s+/g, '')}@unigov.local)</strong>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>System Diagnostic Report</span>
                      <p style={{ margin: '4px 0 0', lineHeight: '1.4', color: '#334155', fontStyle: 'italic' }}>
                        "{getDiagnosticReport(item.title)}"
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="secondary"
                        style={{ fontSize: '11px', padding: '6px 12px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`SLA ticket ping sent to ${item.owner}.`);
                        }}
                      >
                        Ping Owner
                      </button>
                      <button 
                        className="primary"
                        style={{ fontSize: '11px', padding: '6px 12px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAsk(`Draft escalation note for ${item.title}`);
                        }}
                      >
                        Ask Buddy to Draft Escalation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

