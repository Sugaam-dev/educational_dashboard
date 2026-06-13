import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  AlertTriangle, 
  Slash, 
  CheckCircle, 
  ChevronDown,
  ArrowUpDown,
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { AGENT_DATA } from '../data';

export default function AgentGovernance() {
  const [agents, setAgents] = useState(AGENT_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('applications');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showFreezeConfirm, setShowFreezeConfirm] = useState(false);

  // Filter agent list
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    if (statusFilter === 'RISK') return matchesSearch && (agent.status === 'High Risk' || agent.status === 'Critical Risk' || agent.status === 'Suspended');
    if (statusFilter === 'GOOD') return matchesSearch && (agent.status === 'Excellent' || agent.status === 'Good');
    if (statusFilter === 'SUSPENDED') return matchesSearch && agent.status === 'Suspended';
    return matchesSearch;
  });

  // Sort agent list
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (typeof aVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // Default descending for numbers
    }
  };

  // Toggle freeze/unfreeze status
  const handleToggleFreeze = (agent) => {
    setSelectedAgent(agent);
    setShowFreezeConfirm(true);
  };

  const confirmFreeze = () => {
    setAgents(agents.map(a => {
      if (a.id === selectedAgent.id) {
        const isSuspended = a.status === 'Suspended';
        return {
          ...a,
          status: isSuspended ? 'Good' : 'Suspended',
          complianceScore: isSuspended ? 85.0 : 40.0 // drop compliance when suspended
        };
      }
      return a;
    }));
    setShowFreezeConfirm(false);
    setSelectedAgent(null);
  };

  // Score badge style generator
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Excellent':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">Excellent</span>;
      case 'Good':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">Good</span>;
      case 'High Risk':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">High Risk</span>;
      case 'Critical Risk':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">Critical Risk</span>;
      case 'Suspended':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-300">Suspended</span>;
      default:
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-50 text-slate-600">{status}</span>;
    }
  };

  // Compliance rating badge
  const getComplianceColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-amber-600';
    return 'text-rose-600';
  };

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 relative">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-3 text-blue-600 mb-2">
          <ShieldCheck className="h-5 w-5" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Layer 3: Channel Management</h2>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Agent Performance Scorecard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Monitor recruitment partners and compliance benchmarks. Issue manual warnings, trigger documentation quality audits, or freeze portal integrations.
        </p>
      </div>

      {/* Grid Layout: Scorecard + Watchlist */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Main Scorecard Table (3/4 width) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm xl:col-span-3 flex flex-col justify-between overflow-hidden">
          
          {/* Filters Topbar */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search agency by name or ID..."
                className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all text-slate-700"
              />
            </div>

            {/* Status Filter Tab Buttons */}
            <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'ALL', label: 'All Partners' },
                { id: 'GOOD', label: 'Good Standing' },
                { id: 'RISK', label: 'Under Review / Risk' },
                { id: 'SUSPENDED', label: 'Suspended' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
                    statusFilter === tab.id 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/20">
                  <th className="py-3.5 px-5 select-none cursor-pointer hover:bg-slate-50" onClick={() => handleSort('name')}>
                    <div className="flex items-center space-x-1">
                      <span>Recruiter Name</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('applications')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Apps</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center hidden md:table-cell" onClick={() => handleSort('offerRate')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Offer %</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center" onClick={() => handleSort('visaRate')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Visa %</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center hidden lg:table-cell" onClick={() => handleSort('enrollmentRate')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Enroll %</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center hidden sm:table-cell" onClick={() => handleSort('revenue')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Revenue</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-3 select-none cursor-pointer hover:bg-slate-50 text-center hidden md:table-cell" onClick={() => handleSort('complianceScore')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Compliance</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {sortedAgents.length > 0 ? (
                  sortedAgents.map((agent) => (
                    <tr 
                      key={agent.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${agent.status === 'Suspended' ? 'bg-slate-50/40 text-slate-400' : ''}`}
                    >
                      <td className="py-4 px-5">
                        <div className="font-bold text-slate-900">{agent.name}</div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{agent.id} &bull; Status: </span>
                        {getStatusBadge(agent.status)}
                      </td>
                      <td className="py-4 px-3 text-center font-bold text-slate-800">
                        {agent.applications.toLocaleString()}
                      </td>
                      <td className="py-4 px-3 text-center font-semibold hidden md:table-cell">{agent.offerRate}%</td>
                      <td className="py-4 px-3 text-center font-semibold">{agent.visaRate}%</td>
                      <td className="py-4 px-3 text-center font-semibold hidden lg:table-cell">{agent.enrollmentRate}%</td>
                      <td className="py-4 px-3 text-center font-black text-slate-800 hidden sm:table-cell">{formatCurrency(agent.revenue)}</td>
                      <td className="py-4 px-3 text-center hidden md:table-cell">
                        <span className={`font-extrabold ${getComplianceColor(agent.complianceScore)}`}>
                          {agent.complianceScore}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex space-x-2">
                          <button
                            onClick={() => alert(`Initiating full documentation audit for: ${agent.name}`)}
                            className="p-1 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                            title="Audit Documents"
                            disabled={agent.status === 'Suspended'}
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => handleToggleFreeze(agent)}
                            className={`p-1 rounded transition-all ${
                              agent.status === 'Suspended' 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            }`}
                            title={agent.status === 'Suspended' ? 'Restore Portal Access' : 'Freeze Portal Access'}
                          >
                            <Slash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-slate-400 font-bold">
                      No recruiters match the filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
            <span>Showing {sortedAgents.length} partners</span>
            <span>All values verified by institutional ledger</span>
          </div>

        </div>

        {/* Watchlist Sidebar (1/4 width) */}
        <div className="space-y-6">
          
          {/* Active Risks Watchlist */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>SLA & Risk Monitor</span>
            </h3>

            <div className="space-y-3.5">
              
              <div className="p-3.5 bg-rose-50/40 border border-rose-100 rounded-xl text-xs flex flex-col justify-between gap-1">
                <div className="flex items-center justify-between text-rose-800 font-bold uppercase tracking-wider text-[9px]">
                  <span>Critical Risk (Zenith)</span>
                  <AlertCircle className="h-3 w-3" />
                </div>
                <p className="font-semibold text-slate-700 mt-1 leading-snug">
                  Visa approval rate fell to <span className="text-rose-600 font-bold">58.2%</span>. Pending SLA review count at 32 cases.
                </p>
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => handleToggleFreeze({id: 'A005', name: 'Zenith Admissions', status: 'Critical Risk'})}
                    className="px-2.5 py-1 text-[9px] font-bold bg-rose-600 hover:bg-rose-500 text-white rounded transition-colors"
                  >
                    Restrict Agent Portal
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/40 border border-amber-100 rounded-xl text-xs flex flex-col justify-between gap-1">
                <div className="flex items-center justify-between text-amber-800 font-bold uppercase tracking-wider text-[9px]">
                  <span>Warning (Apex)</span>
                  <AlertCircle className="h-3 w-3" />
                </div>
                <p className="font-semibold text-slate-700 mt-1 leading-snug">
                  Documentation rejection rate climbed to <span className="text-amber-600 font-bold">24.2%</span> this week due to unverified high school papers.
                </p>
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => alert('Apex Consultancy notified. Mandating academic transcript audit.')}
                    className="px-2.5 py-1 text-[9px] font-bold bg-amber-600 hover:bg-amber-500 text-white rounded transition-colors"
                  >
                    Deploy Audit Warning
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Metrics stats */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 text-white shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Portfolio Benchmarks</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Avg Compliance</span>
                <span className="text-lg font-black text-emerald-400">89.2%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Avg Visa Approval</span>
                <span className="text-lg font-black text-blue-400">84.4%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Applications Volume</span>
                <span className="text-lg font-black text-indigo-400">3,810</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Total Yield Revenue</span>
                <span className="text-lg font-black text-violet-400">$52.5M</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Freeze Confirmation Modal (Human-in-the-Loop) */}
      {showFreezeConfirm && selectedAgent && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl animate-in zoom-in-95 duration-200 text-slate-800">
            <div className="flex items-center space-x-3 text-rose-600">
              <AlertTriangle className="h-6 w-6 shrink-0" />
              <h3 className="text-lg font-black tracking-tight">Human-in-the-Loop Override</h3>
            </div>
            
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              You are about to execute a manual override to {selectedAgent.status === 'Suspended' ? 'RESTORE portal access for' : 'FREEZE all portal integrations for'} <span className="font-bold text-slate-900">{selectedAgent.name}</span> ({selectedAgent.id}).
            </p>
            
            <p className="text-xs text-slate-400 mt-2 italic">
              This action will restrict student file submissions and auto-generate legal notification letters to the partner organization.
            </p>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => { setShowFreezeConfirm(false); setSelectedAgent(null); }}
                className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Cancel Action
              </button>
              
              <button
                onClick={confirmFreeze}
                className={`px-4 py-2 text-white text-xs font-bold rounded-xl transition-all shadow ${
                  selectedAgent.status === 'Suspended' 
                    ? 'bg-green-600 hover:bg-green-500 shadow-green-500/20' 
                    : 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20'
                }`}
              >
                {selectedAgent.status === 'Suspended' ? 'Confirm Authorization (Restore)' : 'Confirm Authorization (Freeze)'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
