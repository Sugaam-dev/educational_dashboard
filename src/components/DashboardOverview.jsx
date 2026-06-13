import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  DollarSign, 
  Flag, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  ArrowRight,
  Sparkles,
  Globe
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  LineChart,
  Line
} from 'recharts';
import { INSTITUTIONAL_METRICS, ALERTS, CHANNEL_ROIS, COUNTRY_DATA, FUNNEL_STAGES } from '../data';

export default function DashboardOverview({ onNavigate, user }) {
  
  // Format large currency numbers
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(value);
  };

  // Channel ROI chart data
  const chartData = CHANNEL_ROIS.map(item => ({
    name: item.name.split(' ')[0], // Short name
    Revenue: item.revenue / 1000000, // in Millions
    ROI: item.roi,
    Conversion: item.conversionRate
  }));

  // Student funnel chart data
  const funnelChartData = FUNNEL_STAGES.map(item => ({
    stage: item.stage,
    Count: item.count
  }));

  // Alert handler
  const handleAlertAction = (alert) => {
    if (alert.category.includes('Agent') || alert.message.includes('Zenith') || alert.message.includes('Apex')) {
      onNavigate('app', 'agents');
    } else if (alert.category.includes('SLA')) {
      onNavigate('app', 'funnel');
    } else {
      // Open AI buddy with the message
      onNavigate('app', 'buddy', null, `Why are there ${alert.message}`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Institutional Governance Command Center
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            System overview for <span className="font-bold text-slate-800">{user.name}</span> &bull; Security Level: <span className="text-blue-600 font-semibold uppercase text-xs px-2 py-0.5 bg-blue-50 border border-blue-100 rounded">{user.role} Authorization</span>
          </p>
        </div>
        <button
          onClick={() => onNavigate('app', 'buddy')}
          className="inline-flex items-center space-x-2 px-4.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow transition-all hover:scale-[1.01]"
        >
          <Sparkles className="h-4 w-4 text-blue-400" />
          <span>Ask AI Governance Buddy</span>
        </button>
      </div>

      {/* Layer 1: University Governance KPI Cards */}
      <div>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          Layer 1: University Governance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          
          {/* Card 1: Compliance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start text-slate-400 mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {INSTITUTIONAL_METRICS.complianceTrend}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Compliance Index</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{INSTITUTIONAL_METRICS.complianceScore}%</p>
            <span className="text-[10px] text-slate-400 font-medium mt-1 block">Institutional standards audit</span>
          </div>

          {/* Card 2: Academic */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start text-slate-400 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600 border border-blue-100">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {INSTITUTIONAL_METRICS.academicTrend}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Academic Excellence</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{INSTITUTIONAL_METRICS.academicPerformance}%</p>
            <span className="text-[10px] text-slate-400 font-medium mt-1 block">Course conversion & retention</span>
          </div>

          {/* Card 3: Finance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start text-slate-400 mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100">
                <DollarSign className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {INSTITUTIONAL_METRICS.financialHealth.growth}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Tuition Revenue</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {formatCurrency(INSTITUTIONAL_METRICS.financialHealth.revenue)}
            </p>
            <span className="text-[10px] text-slate-400 font-medium mt-1 block">
              Budget utilization: {INSTITUTIONAL_METRICS.financialHealth.budgetUtilization}%
            </span>
          </div>

          {/* Card 4: Research */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start text-slate-400 mb-4">
              <div className="p-2 bg-violet-50 rounded-lg text-violet-600 border border-violet-100">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded">
                {INSTITUTIONAL_METRICS.researchTrend}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Research Performance</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{INSTITUTIONAL_METRICS.researchPerformance}%</p>
            <span className="text-[10px] text-slate-400 font-medium mt-1 block">Publications & grants index</span>
          </div>

          {/* Card 5: Initiatives */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start text-slate-400 mb-4">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600 border border-amber-100">
                <Flag className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                1 Delayed
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Strategic Projects</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {INSTITUTIONAL_METRICS.strategicInitiatives.active} Active
            </p>
            <span className="text-[10px] text-slate-400 font-medium mt-1 block">
              On track: {INSTITUTIONAL_METRICS.strategicInitiatives.onTrack} initiatives
            </span>
          </div>

        </div>
      </div>

      {/* Layer 3: Admission Channel Performance & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Channel Revenue & ROI (2/3 width) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Layer 3: Admission Channel Yield</h3>
                <p className="text-slate-400 text-xs mt-0.5">Recruitment revenues (in $ Millions) and conversion metrics</p>
              </div>
              <button 
                onClick={() => onNavigate('app', 'matrix')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <span>View Program Matrix</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            
            {/* Recharts BarChart */}
            <div className="h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94a3b8', fontSize: 10, fontWeight: 600 } }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'ROI (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#94a3b8', fontSize: 10, fontWeight: 600 } }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} 
                    labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                  />
                  <Bar yAxisId="left" dataKey="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={45} name="Revenue ($M)" />
                  <Bar yAxisId="right" dataKey="ROI" fill="#818cf8" radius={[4, 4, 0, 0]} maxBarSize={45} name="ROI (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 border-t border-slate-100 pt-5 mt-5">
            {CHANNEL_ROIS.map((channel, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <span className="text-[10px] text-slate-400 font-bold block truncate">{channel.name}</span>
                <span className="text-sm font-extrabold text-slate-800 block mt-0.5">{formatCurrency(channel.revenue)}</span>
                <span className="text-[10px] font-semibold text-emerald-600">ROI: {channel.roi}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Security & Governance Alerts (1/3 width) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Decision Risk Alerts</h3>
                <p className="text-slate-400 text-xs mt-0.5">Real-time gate warnings</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            </div>

            {/* Alerts List */}
            <div className="space-y-3 mt-4 overflow-y-auto max-h-[300px] pr-1">
              {ALERTS.map((alert) => {
                const isCritical = alert.type === 'critical';
                const isWarning = alert.type === 'warning';
                
                let borderClass = 'border-blue-100 bg-blue-50/40';
                let textClass = 'text-blue-800';
                let iconClass = 'bg-blue-100 text-blue-600';
                
                if (isCritical) {
                  borderClass = 'border-rose-100 bg-rose-50/40';
                  textClass = 'text-rose-800';
                  iconClass = 'bg-rose-100 text-rose-600';
                } else if (isWarning) {
                  borderClass = 'border-amber-100 bg-amber-50/40';
                  textClass = 'text-amber-800';
                  iconClass = 'bg-amber-100 text-amber-600';
                }

                return (
                  <div 
                    key={alert.id} 
                    className={`border rounded-xl p-3.5 transition-all text-xs flex flex-col justify-between gap-2.5 ${borderClass}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-lg shrink-0 ${iconClass}`}>
                        <AlertTriangle className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold uppercase tracking-wider text-[9px] text-slate-500">{alert.category}</span>
                          <span className="text-[9px] text-slate-400 font-medium">&bull; {alert.time}</span>
                        </div>
                        <p className={`font-semibold mt-1 leading-snug ${textClass}`}>
                          {alert.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleAlertAction(alert)}
                        className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 px-2.5 py-1 rounded-md transition-colors"
                      >
                        {alert.action}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-4 mt-4 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Security Compliance Level</p>
            <p className="text-xs font-bold text-slate-700 mt-1">Authorized for manual bypass overrides</p>
          </div>
        </div>

      </div>

      {/* Layer 2: Student Lifecycle Funnel Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Student Lifecycle Trends (2/3 width) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Layer 2: Student Lifecycle Pipeline</h3>
              <p className="text-slate-400 text-xs mt-0.5">Drop-off analysis from Lead creation to Registration and Residency (TRC)</p>
            </div>
            <button 
              onClick={() => onNavigate('app', 'funnel')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>Interactive Funnel</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={funnelChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} 
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                />
                <Area type="monotone" dataKey="Count" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" name="Students" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Channel Insights Scoreboard */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4">Governance KPI Checklist</h3>
            
            <div className="space-y-4 mt-2">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-500 font-semibold">Top Partner Recruiter</span>
                </div>
                <span 
                  onClick={() => onNavigate('app', 'agents')}
                  className="text-xs font-bold text-slate-800 hover:text-blue-600 hover:underline cursor-pointer"
                >
                  Global Education Group
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-500 font-semibold">Highest Yield Country</span>
                </div>
                <span 
                  onClick={() => onNavigate('app', 'countries')}
                  className="text-xs font-bold text-slate-800 hover:text-blue-600 hover:underline cursor-pointer"
                >
                  India ($38.2M)
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="text-xs text-slate-500 font-semibold">Declining Market</span>
                </div>
                <span 
                  onClick={() => onNavigate('app', 'countries')}
                  className="text-xs font-bold text-slate-800 hover:text-blue-600 hover:underline cursor-pointer"
                >
                  Nigeria (Forex Risk)
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-xs text-slate-500 font-semibold">Under Audit Review</span>
                </div>
                <span 
                  onClick={() => onNavigate('app', 'agents')}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  Zenith (Visa: 58.2%)
                </span>
              </div>

            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => onNavigate('app', 'buddy', null, 'Which vendors are causing document quality issues?')}
              className="w-full flex items-center justify-center space-x-2 py-2 border border-blue-100 bg-blue-50/50 hover:bg-blue-50 text-blue-600 rounded-xl text-xs font-bold transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Audit Document Quality via AI</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
