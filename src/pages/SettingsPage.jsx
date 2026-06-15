import { useState } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';

export default function SettingsPage({ user, setUser }) {
  // SLA Settings
  const [visaThreshold, setVisaThreshold] = useState(80);
  const [docSlaTrigger, setDocSlaTrigger] = useState(20);
  const [turnaroundHours, setTurnaroundHours] = useState(72);

  // Auto switches
  const [freezeOnSlaBreach, setFreezeOnSlaBreach] = useState(true);
  const [bypassDoubleSignoff, setBypassDoubleSignoff] = useState(false);
  const [autoTriageDecree, setAutoTriageDecree] = useState(true);

  // Identity Form
  const [fullName, setFullName] = useState(user?.name || 'Demo User');
  const [userRole, setUserRole] = useState(user?.role || 'Project Manager');
  const [userEmail, setUserEmail] = useState(user?.email || 'demo@unigov.local');

  // Integrations state
  const [crmStatus, setCrmStatus] = useState('Connected');
  const [zenithStatus, setZenithStatus] = useState('Connected');
  const [apexStatus, setApexStatus] = useState('Connected');

  const [saveStatus, setSaveStatus] = useState('');

  const handleSaveSettings = () => {
    // Save user state back to parent
    if (setUser) {
      setUser({
        ...user,
        name: fullName,
        role: userRole,
        email: userEmail,
        initials: fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      });
    }

    setSaveStatus('Governance settings synchronized successfully!');
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const testConnection = (portalName, setStatus) => {
    setStatus('Testing...');
    setTimeout(() => {
      setStatus('Connected');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="System settings" />

      {saveStatus && (
        <div 
          className="badge animate-in fade-in slide-in-from-top-2 duration-300"
          style={{
            backgroundColor: '#10b981',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '12px',
            width: '100%',
            textAlign: 'center',
            marginBottom: '16px',
            display: 'block'
          }}
        >
          {saveStatus}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: SLA Benchmarks & Thresholds */}
        <Card title="Compliance SLA Parameters">
          <p className="card-copy" style={{ marginBottom: '16px', fontSize: '11px' }}>
            Set benchmark parameters that trigger automated flags, warnings, and escalation notifications.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Slider 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                <strong style={{ color: '#475569' }}>Mandatory Visa Success Threshold</strong>
                <span style={{ fontWeight: 'black', color: '#3b82f6' }}>{visaThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={visaThreshold}
                onChange={(e) => setVisaThreshold(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <span className="muted" style={{ fontSize: '10px', marginTop: '2px', display: 'block' }}>
                Agents falling below this threshold will automatically flag critical risk alerts.
              </span>
            </div>

            {/* Slider 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                <strong style={{ color: '#475569' }}>Document Rejection Trigger Rate</strong>
                <span style={{ fontWeight: 'black', color: '#eab308' }}>{docSlaTrigger}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={docSlaTrigger}
                onChange={(e) => setDocSlaTrigger(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <span className="muted" style={{ fontSize: '10px', marginTop: '2px', display: 'block' }}>
                Triggers warning badges and quality audit checks on recruiter portals.
              </span>
            </div>

            {/* Slider 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                <strong style={{ color: '#475569' }}>Target Offer Turnaround Time (SLA)</strong>
                <span style={{ fontWeight: 'black', color: '#ef4444' }}>{turnaroundHours} Hours</span>
              </div>
              <input 
                type="range" 
                min="24" 
                max="168" 
                value={turnaroundHours}
                onChange={(e) => setTurnaroundHours(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <span className="muted" style={{ fontSize: '10px', marginTop: '2px', display: 'block' }}>
                Escalates queue delays to the PMO if offers exceed this window.
              </span>
            </div>
          </div>
        </Card>

        {/* Card 2: Auto Governance Toggles */}
        <Card title="Automated Governance Directives">
          <p className="card-copy" style={{ marginBottom: '16px', fontSize: '11px' }}>
            Authorize system automation protocols to handle SLA violations in real-time.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Toggle 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid #f1f5f9', background: '#f8fafc', borderRadius: '12px' }}>
              <div>
                <strong style={{ fontSize: '12px', color: '#1e293b', display: 'block' }}>Auto-Freeze Agent Portal</strong>
                <span className="muted" style={{ fontSize: '10px' }}>Immediately locks portal on Critical Risk status.</span>
              </div>
              <input 
                type="checkbox" 
                checked={freezeOnSlaBreach} 
                onChange={(e) => setFreezeOnSlaBreach(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            {/* Toggle 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid #f1f5f9', background: '#f8fafc', borderRadius: '12px' }}>
              <div>
                <strong style={{ fontSize: '12px', color: '#1e293b', display: 'block' }}>Bypass Double-Signoff</strong>
                <span className="muted" style={{ fontSize: '10px' }}>Auto-approve scholarship exceptions under $5,000.</span>
              </div>
              <input 
                type="checkbox" 
                checked={bypassDoubleSignoff} 
                onChange={(e) => setBypassDoubleSignoff(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            {/* Toggle 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid #f1f5f9', background: '#f8fafc', borderRadius: '12px' }}>
              <div>
                <strong style={{ fontSize: '12px', color: '#1e293b', display: 'block' }}>Ministry Decree Auto-Triage</strong>
                <span className="muted" style={{ fontSize: '10px' }}>Auto-assign tasks for missing authenticated originals.</span>
              </div>
              <input 
                type="checkbox" 
                checked={autoTriageDecree} 
                onChange={(e) => setAutoTriageDecree(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

          </div>
        </Card>

        {/* Card 3: Board Member Identity Configuration */}
        <Card title="Stakeholder Profile Settings">
          <p className="card-copy" style={{ marginBottom: '16px', fontSize: '11px' }}>
            Modify active board user identifiers for prototype credential simulations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Input 1 */}
            <div>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px' }}
              />
            </div>

            {/* Input 2 */}
            <div>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Role / Title</label>
              <input 
                type="text" 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px' }}
              />
            </div>

            {/* Input 3 */}
            <div>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Email Address</label>
              <input 
                type="email" 
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px' }}
              />
            </div>

          </div>
        </Card>

        {/* Card 4: Connected Integration Portals */}
        <Card title="Connected Integration Systems">
          <p className="card-copy" style={{ marginBottom: '16px', fontSize: '11px' }}>
            Monitor and test API integrations and database connections.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* System 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid #f1f5f9', borderRadius: '12px', fontSize: '11px' }}>
              <div>
                <strong style={{ color: '#475569' }}>CRM Admissions Database</strong>
                <span className="badge badge-green" style={{ fontSize: '9px', padding: '2px 6px', marginLeft: '8px' }}>
                  {crmStatus}
                </span>
              </div>
              <button 
                className="secondary" 
                style={{ fontSize: '10px', padding: '4px 8px' }}
                onClick={() => testConnection('CRM', setCrmStatus)}
              >
                Ping API
              </button>
            </div>

            {/* System 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid #f1f5f9', borderRadius: '12px', fontSize: '11px' }}>
              <div>
                <strong style={{ color: '#475569' }}>Zenith Recruiter API</strong>
                <span className="badge badge-green" style={{ fontSize: '9px', padding: '2px 6px', marginLeft: '8px' }}>
                  {zenithStatus}
                </span>
              </div>
              <button 
                className="secondary" 
                style={{ fontSize: '10px', padding: '4px 8px' }}
                onClick={() => testConnection('Zenith', setZenithStatus)}
              >
                Ping API
              </button>
            </div>

            {/* System 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid #f1f5f9', borderRadius: '12px', fontSize: '11px' }}>
              <div>
                <strong style={{ color: '#475569' }}>Apex Quality Portal Link</strong>
                <span className="badge badge-green" style={{ fontSize: '9px', padding: '2px 6px', marginLeft: '8px' }}>
                  {apexStatus}
                </span>
              </div>
              <button 
                className="secondary" 
                style={{ fontSize: '10px', padding: '4px 8px' }}
                onClick={() => testConnection('Apex', setApexStatus)}
              >
                Ping API
              </button>
            </div>

          </div>
        </Card>

      </div>

      <div style={{ textAlign: 'right', marginTop: '18px' }}>
        <button 
          className="primary" 
          onClick={handleSaveSettings}
          style={{ padding: '10px 24px', fontSize: '12px', fontWeight: 'bold' }}
        >
          Save All Settings
        </button>
      </div>

    </div>
  );
}
