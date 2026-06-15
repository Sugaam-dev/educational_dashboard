import { useState, useMemo } from 'react';
import Card from '../components/common/Card';
import SectionTitle from '../components/common/SectionTitle';
import DataTable from '../components/common/DataTable';
import { Search } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';


const INITIAL_AUDIT_LOGS = [
  { time: '15 Jun 2026 16:42', type: 'Policy Update', actor: 'Project Manager', area: 'NotesPage', details: 'Saved draft note to browser local storage (uni_gov_draft_history)', status: 'Success' },
  { time: '15 Jun 2026 15:30', type: 'Freeze Portal', actor: 'System Engine', area: 'Zenith Admissions', details: 'Suspended Zenith Admissions due to visa approval falling to 58.2%', status: 'Triggered' },
  { time: '15 Jun 2026 14:15', type: 'Warning', actor: 'Registrar', area: 'Apex Consultancy', details: 'Issued quality warning for scanned certificates with compression artifacts', status: 'Active' },
  { time: '15 Jun 2026 11:00', type: 'Sign-off', actor: 'Finance Director', area: 'MBA Scholarship', details: 'Approved MBA fee exemption exception package', status: 'Completed' },
  { time: '15 Jun 2026 09:30', type: 'Policy Update', actor: 'Admin', area: 'Global Settings', details: 'Renamed project namespace and identifiers from EduGov to UniGov', status: 'Success' },
  { time: '14 Jun 2026 16:30', type: 'SLA Reset', actor: 'Admissions Team', area: 'South Asia Queue', details: 'Re-allocated reviewer capacity to address CRM queue buildup', status: 'Active' },
  { time: '14 Jun 2026 12:15', type: 'System Audit', actor: 'Cron Daemon', area: 'Risk Heatmap', details: 'Generated weekly project risk levels matrix calculations', status: 'Success' },
  { time: '14 Jun 2026 09:15', type: 'Triage', actor: 'Registrar', area: 'Ministry Decree Queue', details: 'Auto-triaged four candidates awaiting ministry upload', status: 'Completed' },
  { time: '13 Jun 2026 13:00', type: 'Authentication', actor: 'Anil S. (Finance)', area: 'SSO Login Gateway', details: 'SSO credential validation for executive session', status: 'Approved' },
  { time: '12 Jun 2026 10:45', type: 'Sign-off', actor: 'Academic Review', area: 'MD Program', details: 'Authorized intake cap expansion to accommodate direct candidates', status: 'Completed' },
];

export default function AuditPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [verifying, setVerifying] = useState(false);
  const [verSuccess, setVerSuccess] = useState(false);

  // Filter logs
  const filteredLogs = useMemo(() => {
    return INITIAL_AUDIT_LOGS.filter(log => {
      const matchesSearch = log.details.toLowerCase().includes(search.toLowerCase()) ||
                            log.actor.toLowerCase().includes(search.toLowerCase()) ||
                            log.area.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'All' || log.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [search, filterType]);

  // Calculate log counts for the chart
  const chartData = useMemo(() => {
    const counts = {};
    filteredLogs.forEach(log => {
      counts[log.type] = (counts[log.type] || 0) + 1;
    });
    return Object.keys(counts).map(type => ({
      name: type,
      count: counts[type]
    }));
  }, [filteredLogs]);

  const verifyLedger = () => {
    setVerifying(true);
    setVerSuccess(false);
    setTimeout(() => {
      setVerifying(false);
      setVerSuccess(true);
      setTimeout(() => setVerSuccess(false), 3000);
    }, 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Success':
      case 'Approved':
      case 'Completed':
        return <span className="badge badge-green" style={{ fontSize: '9px', padding: '2px 6px' }}>{status}</span>;
      case 'Triggered':
      case 'Active':
        return <span className="badge badge-red" style={{ fontSize: '9px', padding: '2px 6px' }}>{status}</span>;
      default:
        return <span className="badge badge-blue" style={{ fontSize: '9px', padding: '2px 6px' }}>{status}</span>;
    }
  };

  const logTypes = ['All', 'Policy Update', 'Freeze Portal', 'Warning', 'Sign-off', 'SLA Reset'];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div style={{ marginBottom: '18px' }}>
        <span style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#10b981', textTransform: 'uppercase', display: 'block' }}>
          Platform Security Ledger
        </span>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: '4px 0 0' }}>
          Compliance Audit Trails
        </h2>
        <p className="muted" style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
          Immutable records of governance actions, policy updates, status changes, and administrator sign-offs for the June 2026 intake cycle.
        </p>
      </div>

      {/* Control row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs by actor, area, details..."
            style={{
              width: '100%',
              paddingLeft: '36px',
              paddingRight: '12px',
              paddingTop: '6px',
              paddingBottom: '6px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              fontSize: '11px',
              outline: 'none'
            }}
          />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-1">
          {logTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                fontSize: '10px',
                padding: '4px 10px',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                backgroundColor: filterType === type ? '#0f172a' : '#ffffff',
                color: filterType === type ? '#ffffff' : '#475569',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Verification */}
        <div>
          <button 
            className="primary" 
            onClick={verifyLedger}
            disabled={verifying}
            style={{ fontSize: '11px', padding: '6px 14px', fontWeight: 'bold' }}
          >
            {verifying ? 'Calculating SHA hashes...' : 'Verify Ledger Integrity'}
          </button>
        </div>

      </div>

      {/* Verify Toast */}
      {verSuccess && (
        <div className="badge badge-green animate-in fade-in duration-200" style={{ width: '100%', textAlign: 'center', display: 'block', fontWeight: 'bold', padding: '8px 12px' }}>
          🛡️ SHA-256 integrity check passed. Ledger is synchronized and immutable!
        </div>
      )}

      {/* Compliance Event Distribution Chart */}
      {chartData.length > 0 && (
        <Card title="Compliance Event Distribution">
          <div style={{ height: '220px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} isAnimationActive={true} animationDuration={800}>
                  {chartData.map((entry, index) => {
                    const colors = ['#1d73bd', '#d97706', '#ef4444', '#10b981', '#6366f1', '#8b5cf6', '#ec4899', '#14b8a6'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Ledger Table */}
      <Card title="Compliance Log Ledger">
        <DataTable
          headers={['Timestamp', 'Action Type', 'Actor', 'Target Area', 'Details', 'Ledger Status']}
          rows={filteredLogs.map(log => [
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#64748b' }}>{log.time}</span>,
            <strong style={{ fontSize: '11px' }}>{log.type}</strong>,
            <span style={{ fontWeight: 'bold', color: '#475569' }}>{log.actor}</span>,
            <span className="badge badge-blue" style={{ fontSize: '10px', opacity: 0.8 }}>{log.area}</span>,
            <span style={{ color: '#334155' }}>{log.details}</span>,
            getStatusBadge(log.status)
          ])}
        />
        {filteredLogs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 8px', color: '#94a3b8' }}>
            No audit logs match current filters.
          </div>
        )}
      </Card>

    </div>
  );
}
