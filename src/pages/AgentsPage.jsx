import { useMemo, useState } from 'react';
import { 
  Search, 
  FileText, 
  Edit, 
  ArrowUpDown, 
  AlertCircle,
  AlertTriangle,
  Users
} from 'lucide-react';
import Card from '../components/common/Card';

const INITIAL_AGENTS_DATA = [
  { id: 'A001', name: 'Global Education Group', country: 'India', apps: 1240, offer: 82.3, visa: 95.1, enroll: 91.2, revenue: 18000000, compliance: 98.4, status: 'Excellent' },
  { id: 'A002', name: 'Beacon International', country: 'UAE', apps: 890, offer: 75.1, visa: 88.4, enroll: 85.0, revenue: 12000000, compliance: 92.0, status: 'Good' },
  { id: 'A003', name: 'Apex Consultancy', country: 'Nepal', apps: 650, offer: 68.2, visa: 72.1, enroll: 78.4, revenue: 9000000, compliance: 74.5, status: 'High Risk' },
  { id: 'A004', name: 'Oasis Recruitment Group', country: 'Kenya', apps: 480, offer: 85.0, visa: 94.3, enroll: 90.1, revenue: 7000000, compliance: 96.8, status: 'Excellent' },
  { id: 'A005', name: 'Zenith Admissions', country: 'Nigeria', apps: 340, offer: 90.2, visa: 58.2, enroll: 74.1, revenue: 4000000, compliance: 65.0, status: 'Critical Risk' },
  { id: 'A006', name: 'Elite Scholars Ltd', country: 'Turkey', apps: 210, offer: 92.5, visa: 98.0, enroll: 82.3, revenue: 3000000, compliance: 97.2, status: 'Good' },
];

export default function AgentsPage() {
  const [agentsList, setAgentsList] = useState(INITIAL_AGENTS_DATA);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Partners');
  const [sortField, setSortField] = useState('apps');
  const [sortAsc, setSortAsc] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // Handle toggle suspension
  const toggleSuspension = (agentId) => {
    setAgentsList(prev => prev.map(agent => {
      if (agent.id === agentId) {
        const isSuspended = agent.status === 'Suspended';
        return {
          ...agent,
          status: isSuspended ? 'Critical Risk' : 'Suspended'
        };
      }
      return agent;
    }));

    const agent = agentsList.find(a => a.id === agentId);
    if (agent.status === 'Suspended') {
      setAlertMsg(`Unrestricted portal access for ${agent.name}.`);
    } else {
      setAlertMsg(`Suspended portal access for ${agent.name}!`);
    }
    setTimeout(() => setAlertMsg(''), 4000);
  };

  // Deploy warning toast
  const deployWarning = (agentName) => {
    setAlertMsg(`Audit warning dispatched to ${agentName} recruitment ledger.`);
    setTimeout(() => setAlertMsg(''), 4000);
  };

  // Sorting handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Filter logic
  const filteredAgents = useMemo(() => {
    return agentsList.filter((agent) => {
      // Search match
      const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase()) || 
                            agent.country.toLowerCase().includes(search.toLowerCase()) ||
                            agent.id.toLowerCase().includes(search.toLowerCase());
      
      // Tab match
      if (!matchesSearch) return false;
      if (activeTab === 'All Partners') return true;
      if (activeTab === 'Good Standing') return agent.status === 'Excellent' || agent.status === 'Good';
      if (activeTab === 'Under Review / Risk') return agent.status === 'High Risk' || agent.status === 'Critical Risk';
      if (activeTab === 'Suspended') return agent.status === 'Suspended';
      return true;
    });
  }, [agentsList, search, activeTab]);

  // Sort logic
  const sortedAgents = useMemo(() => {
    return [...filteredAgents].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      return sortAsc ? aVal - bVal : bVal - aVal;
    });
  }, [filteredAgents, sortField, sortAsc]);

  // Format currency
  const formatCurrency = (val) => {
    return `$${(val / 1000000).toFixed(0)}M`;
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Excellent': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Good': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'High Risk': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Critical Risk': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Suspended': return 'bg-slate-100 text-slate-700 border-slate-300';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  // Zenith state matching
  const zenith = agentsList.find(a => a.id === 'A005');
  const isZenithSuspended = zenith.status === 'Suspended';

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div style={{ marginBottom: '18px' }}>
        <span style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#3b82f6', textTransform: 'uppercase', display: 'block' }}>
           
        </span>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: '4px 0 0' }}>
          Agent Performance Scorecard
        </h2>
        <p className="muted" style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
          Monitor recruitment partners and compliance benchmarks. Issue manual warnings, trigger documentation quality audits, or freeze portal integrations.
        </p>
      </div>

      {/* Alert toast notification */}
      {alertMsg && (
        <div 
          className="badge animate-in fade-in slide-in-from-top-4 duration-300"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            backgroundColor: alertMsg.includes('Suspended') ? '#f43f5e' : '#10b981',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
            fontWeight: 'bold',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <AlertCircle className="h-4 w-4" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* Main Grid: Left Table + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Scorecard Table Card (3/4 width) */}
        <div className="xl:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Search inputs */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search agency by name or ID..."
                style={{
                  width: '100%',
                  paddingLeft: '36px',
                  paddingRight: '12px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
              />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100/60 p-1 rounded-xl">
              {['All Partners', 'Good Standing', 'Under Review / Risk', 'Suspended'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s',
                      backgroundColor: isActive ? '#0f172a' : 'transparent',
                      color: isActive ? '#ffffff' : '#475569',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Table Wrap */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase" style={{ fontSize: '10px' }}>
                  <th className="py-3 px-3 select-none cursor-pointer hover:bg-slate-50" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">
                      <span>Recruiter Name</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('apps')}>
                    <div className="flex items-center justify-center gap-1">
                      <span>Apps</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('offer')}>
                    <div className="flex items-center justify-center gap-1">
                      <span>Offer %</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('visa')}>
                    <div className="flex items-center justify-center gap-1">
                      <span>Visa %</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('enroll')}>
                    <div className="flex items-center justify-center gap-1">
                      <span>Enroll %</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('revenue')}>
                    <div className="flex items-center justify-center gap-1">
                      <span>Revenue</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('compliance')}>
                    <div className="flex items-center justify-center gap-1">
                      <span>Compliance</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {sortedAgents.map((agent) => (
                  <tr 
                    key={agent.id} 
                    className="hover:bg-slate-50/50 transition-colors"
                    style={{
                      opacity: agent.status === 'Suspended' ? 0.65 : 1
                    }}
                  >
                    <td className="py-3 px-3">
                      <div>
                        <strong style={{ fontSize: '13px', color: '#0f172a' }}>{agent.name}</strong>
                        <div className="flex items-center gap-2 mt-1">
                          <span style={{ color: '#94a3b8', fontSize: '10px' }}>{agent.id} • STATUS:</span>
                          <span 
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold border"
                            style={{
                              backgroundColor: agent.status === 'Excellent' ? '#ecfdf5' : agent.status === 'Good' ? '#eff6ff' : agent.status === 'High Risk' ? '#fffbeb' : '#fef2f2',
                              color: agent.status === 'Excellent' ? '#047857' : agent.status === 'Good' ? '#1d4ed8' : agent.status === 'High Risk' ? '#b45309' : '#b91c1c',
                              borderColor: agent.status === 'Excellent' ? '#a7f3d0' : agent.status === 'Good' ? '#bfdbfe' : agent.status === 'High Risk' ? '#fde68a' : '#fca5a5'
                            }}
                          >
                            {agent.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-800">{agent.apps.toLocaleString()}</td>
                    <td className="py-3 px-3 text-center font-semibold">{agent.offer}%</td>
                    <td className="py-3 px-3 text-center font-bold" style={{ color: agent.visa < 75 ? '#ef4444' : '#1e293b' }}>
                      {agent.visa}%
                    </td>
                    <td className="py-3 px-3 text-center font-semibold">{agent.enroll}%</td>
                    <td className="py-3 px-3 text-center font-black text-slate-900">{formatCurrency(agent.revenue)}</td>
                    <td className="py-3 px-3 text-center font-bold" style={{ color: agent.compliance < 80 ? '#ef4444' : '#10b981' }}>
                      {agent.compliance}%
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex justify-center gap-1">
                        <button 
                          className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700" 
                          title="View quality audit logs"
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                          <FileText className="h-4.5 w-4.5" />
                        </button>
                        <button 
                          className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700" 
                          title="Manage channel details"
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                          <Edit className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sortedAgents.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '48px 12px', color: '#94a3b8' }}>
                      No recruiters match the filter parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Sidebar Cards (1/4 width) */}
        <div className="space-y-6 xl:col-span-1">
          
          {/* SLA & Risk Monitor */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>SLA & Risk Monitor</span>
            </h3>

            <div className="space-y-3">
              
              {/* Zenith Risk Box */}
              <div style={{ padding: '12px', border: '1px solid #fee2e2', backgroundColor: '#fff5f5', borderRadius: '12px', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ color: '#b91c1c', textTransform: 'uppercase', fontSize: '10px' }}>Critical Risk (Zenith)</strong>
                  <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
                </div>
                <p style={{ color: '#475569', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                  Visa approval rate fell to <strong style={{ color: '#b91c1c' }}>58.2%</strong>. Pending SLA review count at <strong style={{ color: '#0f172a' }}>32 cases</strong>.
                </p>
                <button
                  onClick={() => toggleSuspension('A005')}
                  className={isZenithSuspended ? 'btn-success' : 'btn-danger'}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {isZenithSuspended ? 'Lift Portal Restrict' : 'Restrict Agent Portal'}
                </button>
              </div>

              {/* Apex Warning Box */}
              <div style={{ padding: '12px', border: '1px solid #fef3c7', backgroundColor: '#fffbeb', borderRadius: '12px', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ color: '#d97706', textTransform: 'uppercase', fontSize: '10px' }}>Warning (Apex)</strong>
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <p style={{ color: '#475569', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                  Documentation rejection rate climbed to <strong style={{ color: '#d97706' }}>24.2%</strong> this week due to unverified high school papers.
                </p>
                <button
                  onClick={() => deployWarning('Apex Consultancy')}
                  className="btn-warning"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Deploy Audit Warning
                </button>
              </div>

            </div>

          </div>

          {/* Portfolio Benchmarks (Dark Card) */}
          <div style={{ backgroundColor: '#0f172a', borderRadius: '16px', padding: '20px', color: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            
            <h4 style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users className="h-4 w-4 text-blue-500" />
              <span>Portfolio Benchmarks</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '9px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Avg Compliance</span>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#10b981', display: 'block', marginTop: '2px' }}>89.2%</span>
              </div>
              <div>
                <span style={{ fontSize: '9px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Avg Visa Approval</span>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#3b82f6', display: 'block', marginTop: '2px' }}>84.4%</span>
              </div>
              <div>
                <span style={{ fontSize: '9px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Applications Volume</span>
                <span style={{ fontSize: '18px', fontWeight: '900', display: 'block', marginTop: '2px' }}>3,810</span>
              </div>
              <div>
                <span style={{ fontSize: '9px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Total Yield Revenue</span>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#0f766e', display: 'block', marginTop: '2px' }}>$52.5M</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
