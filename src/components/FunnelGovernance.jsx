import React, { useState } from 'react';
import { 
  Filter, 
  ArrowDown, 
  ChevronRight, 
  AlertCircle, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { FUNNEL_STAGES, FUNNEL_TRANSITIONS } from '../data';

export default function FunnelGovernance() {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  // Extra details for interactive sidebar
  const stageDetails = [
    {
      stage: 'Lead',
      drivers: [
        'Unqualified digital campaign clicks',
        'Organic web search visits',
        'Direct agent intake leads'
      ],
      painPoints: 'High volume of incomplete inquiries; high cost-per-lead on generalized keywords.',
      actions: 'Deploy AI-based chatbot on web portals to pre-screen candidates before database registration.',
      compliance: 'Low risk. Data protection (GDPR) consents verified on lead forms.'
    },
    {
      stage: 'Inquiry',
      drivers: [
        'Awaiting counselor follow-ups',
        'Slow response times exceeding 48h SLA',
        'Incomplete high-school credential details'
      ],
      painPoints: '45% drop-off due to delay in counselor outreach. South Asia inquiries pending response exceed standard SLA.',
      actions: 'Reallocate 3 regional counselors to Indian/Nepal inquiry channels. Automate SMS reminders.',
      compliance: 'Low risk. Communication consent checks active.'
    },
    {
      stage: 'Application',
      drivers: [
        'High application fees for specific regions',
        'Complex document submission interface',
        'Awaiting transcripts translations'
      ],
      painPoints: 'Candidates drop off due to complex credit card authorization for application fees.',
      actions: 'Introduce localized digital payment options (UPI, Flutterwave). Freeze application fees for Nurse program.',
      compliance: 'Medium risk. Outdated document uploads flagged on Zenith agent portal.'
    },
    {
      stage: 'Conditional Offer',
      drivers: [
        'Awaiting official transcript verification',
        'English test results pending (IELTS/TOEFL)',
        'Ministry decree equivalency requirements'
      ],
      painPoints: 'SLA for issuing offers exceeds 72h. High transcript forgery flags in Apex applications.',
      actions: 'Activate automated API verification with international transcript databases.',
      compliance: 'High risk. 13% of pending conditional offers have missing or unauthenticated transcripts.'
    },
    {
      stage: 'Fee Payment',
      drivers: [
        'Naira currency volatility in West Africa',
        'High upfront deposit requirement ($5,000)',
        'Lack of student loan validation'
      ],
      painPoints: 'Massive drop-off in Nigerian market. Students struggle to purchase foreign exchange under strict regulations.',
      actions: 'Deploy localized escrow accounts. Reduce MBA deposit threshold to $2,500 for honor graduates.',
      compliance: 'High risk. Anti-money laundering (AML) compliance screening required on payments.'
    },
    {
      stage: 'Visa Application',
      drivers: [
        'Strict financial capacity checks by embassies',
        'Immigration backlog delays',
        'Sponsor verification failures'
      ],
      painPoints: 'Embassy rejection rate peaks in Nepal (41.8% rejection) and Nigeria (27.7% rejection) due to insufficient funds proof.',
      actions: 'Mandate pre-visa financial audit by partners before issuing Fee Receipt.',
      compliance: 'Critical risk. Rejection rate above 15% threshold triggers automatic government warning.'
    },
    {
      stage: 'Arrival',
      drivers: [
        'Flight booking delays',
        'Housing/Accommodation placement queues',
        'Delayed pre-departure orientations'
      ],
      painPoints: '12% of visa-approved students delay arrival due to shortage of approved campus dormitory slots.',
      actions: 'Contract local homestay networks. Extend arrival deadline window by 7 days.',
      compliance: 'Low risk. Border entry documents and visa validation checks complete.'
    },
    {
      stage: 'Enrollment',
      drivers: [
        'Awaiting tuition fee balance clearance',
        'Original document submission verification',
        'Health insurance verification queues'
      ],
      painPoints: 'Slow lines at physical registration counters. Missing original high-school certificates.',
      actions: 'Implement digital-first validation gates. Enable off-site biometric registration.',
      compliance: 'High risk. All enrollments must match ministry registry within 14 days of classes starting.'
    },
    {
      stage: 'TRC Settlement',
      drivers: [
        'Local immigration appointment delays',
        'Rent lease registration delays',
        'Biometric registry capacity bottlenecks'
      ],
      painPoints: 'Students wait up to 90 days for Temporary Residency Card. Inability to work part-time creates financial distress.',
      actions: 'Liaise directly with immigration department for dedicated university biometric slots.',
      compliance: 'Critical risk. Overstaying visa limits without TRC applications violates immigration governance.'
    }
  ];

  const currentStage = FUNNEL_STAGES[selectedStageIndex];
  const currentDetails = stageDetails[selectedStageIndex] || stageDetails[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-3 text-blue-600 mb-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Layer 2: Student Lifecycle</h2>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Recruitment Funnel Governance</h1>
        <p className="text-slate-500 text-sm mt-1">
          Complete funnel drop-off analysis. Click on any stage in the funnel stack to diagnose drop-off causes and apply automated governance decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Visual Funnel Column (2/3 width) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 mb-6">Interactive Funnel Pipeline</h3>
          
          <div className="flex flex-col items-center space-y-2">
            {FUNNEL_STAGES.map((stage, index) => {
              const maxCount = FUNNEL_STAGES[0].count;
              // Width calculations (clamp minimum width for visibility)
              const widthPct = Math.max((stage.count / maxCount) * 100, 15);
              const isSelected = selectedStageIndex === index;
              
              // Transition rate from previous stage
              let transitionText = null;
              if (index > 0) {
                const prev = FUNNEL_STAGES[index - 1];
                const rate = ((stage.count / prev.count) * 100).toFixed(1);
                const drop = prev.count - stage.count;
                transitionText = `${rate}% conversion (${drop.toLocaleString()} dropped)`;
              }

              return (
                <div key={stage.stage} className="w-full flex flex-col items-center">
                  
                  {/* Transition Arrow / Text */}
                  {transitionText && (
                    <div className="flex flex-col items-center py-1 group">
                      <div className="flex items-center space-x-1.5 px-3 py-1 rounded bg-slate-50 border border-slate-100 text-[10px] text-slate-400 font-bold group-hover:border-slate-200 group-hover:text-slate-600 transition-all">
                        <ArrowDown className="h-3 w-3 text-slate-400 group-hover:text-blue-500" />
                        <span>{transitionText}</span>
                      </div>
                    </div>
                  )}

                  {/* Funnel Stage Bar */}
                  <button
                    onClick={() => setSelectedStageIndex(index)}
                    style={{ width: `${widthPct}%` }}
                    className={`h-11 rounded-xl flex items-center justify-between px-4 transition-all duration-300 relative text-left shadow-sm ${
                      isSelected 
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 scale-[1.01] z-10' 
                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200/40'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? 'bg-white text-blue-600' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-bold text-xs sm:text-sm truncate">{stage.stage}</span>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="font-black text-xs sm:text-sm">{stage.count.toLocaleString()}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {stage.conversion}%
                      </span>
                      <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-white' : 'text-slate-400'}`} />
                    </div>
                  </button>

                </div>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Insight Column (1/3 width) */}
        <div className="space-y-6">
          
          {/* Stage Details Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  Stage {selectedStageIndex + 1} of 9
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2.5">{currentStage.stage}</h3>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-slate-950">{currentStage.count.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400">Cohort volume</p>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              
              {/* Conversion Metric details */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Conversion rate from start</span>
                  <span className="text-sm font-bold text-slate-800">{currentStage.conversion}%</span>
                </div>
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <TrendingDown className="h-4 w-4" />
                </div>
              </div>

              {/* Blocker Analysis */}
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Primary Drop-off Blocker</span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed mt-1">
                  {currentDetails.painPoints}
                </p>
              </div>

              {/* Key Drivers list */}
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Cohort Flow Drivers</span>
                <ul className="space-y-1.5">
                  {currentDetails.drivers.map((driver, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-start space-x-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span className="font-semibold">{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compliance Rating */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Governance Compliance Rating</span>
                <div className="flex items-center space-x-2 mt-1.5">
                  <AlertCircle className={`h-4 w-4 shrink-0 ${
                    currentDetails.compliance.includes('Critical') ? 'text-rose-500 animate-pulse' :
                    currentDetails.compliance.includes('High') ? 'text-amber-500' : 'text-slate-400'
                  }`} />
                  <span className="text-xs font-semibold text-slate-700 leading-tight">{currentDetails.compliance}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Action Trigger Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-md text-white">
            <div className="flex items-center space-x-2 text-blue-400 mb-3">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Decision Automation</span>
            </div>
            
            <h4 className="text-sm font-bold">Recommended Mitigation Action</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {currentDetails.actions}
            </p>

            <button
              onClick={() => alert(`Governance request submitted: ${currentDetails.actions}`)}
              className="w-full py-2.5 mt-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1.5"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Apply Governance Order</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
