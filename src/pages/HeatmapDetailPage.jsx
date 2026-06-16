import { useState } from 'react';
import { 
  Clock, 
  User, 
  FileText, 
  CheckSquare, 
  DollarSign, 
  AlertTriangle, 
  ClipboardList, 
  Bot, 
  ArrowLeft,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import Card from '../components/common/Card';
import DataTable from '../components/common/DataTable';
import { navigateHash } from '../utils/routing';
import { heatmapDetails } from '../data/dashboardData';

// Project metadata mapper
// Project metadata mapper
const getProjectMeta = (project) => {
  const p = project.toLowerCase();
  
  if (p.includes('portal') || p.includes('agent')) {
    return {
      title: 'Agent Portal Integration',
      pm: 'Priya M.',
      owner: 'Ramesh K.',
      budget: '$120,000',
      stuckAge: '8 days',
      desc: "Upgrading the international agent partner portal to run automated document quality verifications and track recruiter compliance levels in real-time.",
      recommendation: "Freeze Zenith Admissions Lagos portals immediately. Agent visa approval rates have fallen below the mandatory 80% threshold (currently 58.2%).",
      activeGate: 'Application Intake',
      costStatus: 'Approved',
      slaStatus: 'Breached'
    };
  }
  if (p.includes('scholarship')) {
    return {
      title: 'Scholarship Allocations',
      pm: 'Anil S.',
      owner: 'Sanjay P.',
      budget: '$85,000',
      stuckAge: '6 days',
      desc: "Managing student financial aid allocations, criteria filters, and board approval workflow pipelines for high-achieving candidates.",
      recommendation: 'Review MBA and Nursing fee exception requests immediately. Finance sign-off has exceeded target SLA window of 72 hours.',
      activeGate: 'Deposit Clearance',
      costStatus: 'Pending',
      slaStatus: 'Breached'
    };
  }
  if (p.includes('visa')) {
    return {
      title: 'Visa Risk Triage',
      pm: 'Visa Compliance Lead',
      owner: 'Regional Director',
      budget: '$45,000',
      stuckAge: '5 days',
      desc: "Automated analysis of embassy rejection histories, sponsor bank certificates, and high-risk country pipelines for the June 2026 intake.",
      recommendation: 'Freeze Zenith admissions portal access immediately. Lagos consulate approval rates have fallen to 58.2%.',
      activeGate: 'Visa Sponsorship Check',
      costStatus: 'Approved',
      slaStatus: 'At Risk'
    };
  }
  if (p.includes('finance')) {
    return {
      title: 'Finance Ledger Sync',
      pm: 'Neha R.',
      owner: 'Anil S.',
      budget: '$140,000',
      stuckAge: '11 days',
      desc: "Reconciling billing systems with ERP financials to audit unapproved tuition waivers and tuition deposit clearings.",
      recommendation: 'Execute manual ledgers sync. 11 tuition waivers are awaiting verification by the chief audit officer.',
      activeGate: 'Deposit Clearance',
      costStatus: 'Pending',
      slaStatus: 'Breached'
    };
  }
  if (p.includes('document')) {
    return {
      title: 'Document AI Transcript OCR',
      pm: 'Registrar Staff',
      owner: 'Registrar Office',
      budget: '$95,000',
      stuckAge: '4 days',
      desc: "Automating transcript verification and certificate matching using OCR to identify document file defects and verify secondary mark sheets.",
      recommendation: "Manually verify 4 files where OCR flagged compression artifacts on secondary certificates.",
      activeGate: 'Visa Sponsorship Check',
      costStatus: 'Approved',
      slaStatus: 'At Risk'
    };
  }
  if (p.includes('country') || p.includes('plan')) {
    return {
      title: 'Intake Market Allocations',
      pm: 'Market Analyst',
      owner: 'Regional Director',
      budget: '$75,000',
      stuckAge: '3 days',
      desc: "Planning tuition pricing, volume targets, and recruitment agents incentives across growing vs declining countries.",
      recommendation: "Rebalance budgets away from West Africa currency volatility and shift capacity towards UAE and India tier-2 regions.",
      activeGate: 'Academic Review',
      costStatus: 'Approved',
      slaStatus: 'Good Standing'
    };
  }
  if (p.includes('orientation')) {
    return {
      title: 'Orientation & Onboarding',
      pm: 'Student Care Lead',
      owner: 'Student Affairs',
      budget: '$30,000',
      stuckAge: '2 days',
      desc: "Scheduling student housing allocations, arrival briefings, orientation slots, and local bank account setup assistance.",
      recommendation: "Coordinate airport pickup lists for the nursing cohort and confirm TRC briefing dates.",
      activeGate: 'Application Intake',
      costStatus: 'Approved',
      slaStatus: 'Good Standing'
    };
  }
  if (p.includes('complaince') || p.includes('compliance')) {
    return {
      title: 'Governance Audit Checklist',
      pm: 'Compliance Lead',
      owner: 'Academic Registrar',
      budget: '$65,000',
      stuckAge: '9 days',
      desc: "Auditing student visa credentials, Ministry of Education decree letters, English capability certificates, and finance sign-offs.",
      recommendation: "Escalate stuck dossiers awaiting ministry uploads. Benjamin O. has breached the 48-hour warning window.",
      activeGate: 'Final Enrollment Audit',
      costStatus: 'Approved',
      slaStatus: 'Breached'
    };
  }
  if (p.includes('program') || p.includes('mix')) {
    return {
      title: 'Program Capacity Planning',
      pm: 'Dean of Studies',
      owner: 'Vice Provost Office',
      budget: '$50,000',
      stuckAge: '6 days',
      desc: "Balancing admission volumes for MD (Medicine), Nursing, BBA, and MBA programs based on faculty sizes and clinical capacity caps.",
      recommendation: "Verify Nursing clinical capacity cap and review MD direct admissions intake conversion pace.",
      activeGate: 'Tuition Assessment',
      costStatus: 'Pending',
      slaStatus: 'Breached'
    };
  }
  if (p.includes('enrollment')) {
    return {
      title: 'Enrollment Release Protocol',
      pm: 'Registrar',
      owner: 'Academic Desk',
      budget: '$40,000',
      stuckAge: '2 days',
      desc: "Releasing course registration pins, active student ID cards, portal credentials, and introductory syllabus files.",
      recommendation: "Deploy automated notifications to registered candidates and release registration pins for BBA.",
      activeGate: 'Final Enrollment Audit',
      costStatus: 'Approved',
      slaStatus: 'Good Standing'
    };
  }
  if (p.includes('audit') || p.includes('trail')) {
    return {
      title: 'System Security Ledger',
      pm: 'SecOps Architect',
      owner: 'IT Governance',
      budget: '$55,000',
      stuckAge: '1 day',
      desc: "Immutable recording of administrator SSO logins, quality warnings, portal restrictions, and tuition fee approvals.",
      recommendation: "Run automated SHA-256 validation scan on the compliance ledger block entries.",
      activeGate: 'Academic Review',
      costStatus: 'Approved',
      slaStatus: 'Good Standing'
    };
  }
  if (p.includes('student') || p.includes('care')) {
    return {
      title: 'Student Welfare & Support',
      pm: 'Welfare Officer',
      owner: 'Student Care',
      budget: '$25,000',
      stuckAge: '4 days',
      desc: "Managing student safety alerts, hostel booking check-ins, local medical registrations, and TRC arrival assistance.",
      recommendation: "Approve budget clearance for emergency housing vouchers and confirm airport terminal pick-ups.",
      activeGate: 'Application Intake',
      costStatus: 'Approved',
      slaStatus: 'At Risk'
    };
  }
  if (p.includes('forecasting')) {
    return {
      title: 'Intake Yield Predictive Model',
      pm: 'BI Analyst',
      owner: 'Admissions Office',
      budget: '$80,000',
      stuckAge: '3 days',
      desc: "Predicting total enrollments, visa drop-off rates, and tuition revenue projections for future intake cycles.",
      recommendation: "Refresh forecasting models with Nigerian deposit drop-off trends and UAE buy signals.",
      activeGate: 'Visa Sponsorship Check',
      costStatus: 'Approved',
      slaStatus: 'Good Standing'
    };
  }
  if (p.includes('hostel') || p.includes('accommodation')) {
    return {
      title: 'Hostel Block Assignments',
      pm: 'Housing Lead',
      owner: 'Residential Life',
      budget: '$90,000',
      stuckAge: '7 days',
      desc: "Allocating campus housing units, processing accommodation deposits, and verifying roommate profiles.",
      recommendation: "Release block assignments for the nursing cohort and clear deposit exceptions.",
      activeGate: 'Application Intake',
      costStatus: 'Approved',
      slaStatus: 'Breached'
    };
  }

  // Default values for other projects
  return {
    title: project,
    pm: 'Neha R.',
    owner: 'Ramesh K.',
    budget: '$60,000',
    stuckAge: '3 days',
    desc: `University admissions governance workflow checklist for regulating ${project} checkpoints.`,
    recommendation: `Verify compliance readiness status for ${project} and review eligibility requirements.`,
    activeGate: 'Academic Review',
    costStatus: 'Approved',
    slaStatus: 'Good Standing'
  };
};

// Lifecycle timeline steps
const STEPS = [
  { name: 'Application Intake', desc: 'Academic records, transcripts, and credentials uploaded.', date: 'May 20' },
  { name: 'Academic Review', desc: 'Faculty credential checks, GPA checks, and offer validation.', date: 'May 22' },
  { name: 'Visa Sponsorship Check', desc: 'Verification of proof of funds, sponsorship, and visa status.', date: 'May 23' },
  { name: 'Tuition Assessment', desc: 'Fee assessment, scholarship matching, and tuition billing.', date: 'May 24' },
  { name: 'Deposit Clearance', desc: 'Finance deposit clearance and CAS/visa support issuance.', date: 'May 25' },
  { name: 'Final Enrollment Audit', desc: 'Registrar document check-in, registration, and ID card release.', date: 'Audit complete' }
];

export default function HeatmapDetailPage({ params }) {
  const project = params.project || 'Agent Portal';
  const dimension = params.dimension || 'Approval delay';
  const risk = params.risk || 'critical';
  const view = params.view;

  if (view === 'simple') {
    const detail = heatmapDetails[dimension] || heatmapDetails['Visa risk'];

    return (
      <div className="space-y-6">
        <div>
          <button 
            className="secondary" 
            onClick={() => navigateHash('risk')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', padding: '6px 12px' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Risk Heat Map</span>
          </button>
        </div>

        <section className="two-column">
          <Card title={`${project} - ${dimension} Details`}>
            <div className="detail-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span 
                  className="badge text-[10px] font-bold uppercase"
                  style={{
                    backgroundColor: risk === 'critical' ? '#ef4444' : risk === 'high' ? '#f59e0b' : risk === 'medium' ? '#3b82f6' : '#10b981',
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {risk} Risk
                </span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>
                  Owner: <span style={{ color: '#1e293b' }}>{detail.owner}</span>
                </span>
              </div>
              
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>Risk Evidence</span>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#334155', lineHeight: '1.5' }}>{detail.evidence}</p>
              </div>

              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>Recommended Remediation Action</span>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#334155', lineHeight: '1.5', padding: '10px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>{detail.action}</p>
              </div>
            </div>
          </Card>

          <Card title="Related Compliance Records">
            <DataTable
              headers={['Record ID', 'Owner Desk', 'Pending Age', 'Next Action Requirement']}
              rows={[
                [<span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 'bold' }}>{project.replace(/\s+/g, '')}-001</span>, detail.owner, <span style={{ fontWeight: 'bold', color: '#ef4444' }}>6 days</span>, 'Escalate today'],
                [<span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{project.replace(/\s+/g, '')}-014</span>, 'PMO Coordinator', '3 days', 'Confirm checkpoint'],
                [<span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{project.replace(/\s+/g, '')}-022</span>, 'Registrar Staff', '1 day', 'Monitor status'],
              ]}
            />
          </Card>
        </section>
      </div>
    );
  }

  const meta = getProjectMeta(project);
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { id: 'Overview', label: 'Overview', icon: Layers },
    { id: 'Documents', label: 'Documents', icon: FileText },
    { id: 'Approvals', label: 'Approvals', icon: CheckSquare },
    { id: 'Costing', label: 'Costing', icon: DollarSign },
    { id: 'Risks', label: 'Risks', icon: AlertTriangle },
    { id: 'Audit Trail', label: 'Audit Trail', icon: ClipboardList },
    { id: 'Buddy Notes', label: 'Buddy Notes', icon: Bot },
  ];

  // Helper to determine step status
  const getStepStatus = (stepName) => {
    if (stepName === meta.activeGate) return 'active';
    const activeIndex = STEPS.findIndex(s => s.name === meta.activeGate);
    const stepIndex = STEPS.findIndex(s => s.name === stepName);
    if (stepIndex < activeIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      
      {/* Back to dashboard button */}
      <div>
        <button 
          className="secondary" 
          onClick={() => navigateHash('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', padding: '6px 12px' }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Command Center</span>
        </button>
      </div>

      {/* Title block banner */}
      <div 
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        style={{ position: 'relative' }}
      >
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              {meta.title}
            </h2>
            <span className="badge badge-blue text-[10px] font-bold uppercase">{meta.activeGate}</span>
            <span 
              className="badge text-[10px] font-bold uppercase"
              style={{
                backgroundColor: risk === 'critical' ? '#ef4444' : risk === 'high' ? '#f59e0b' : risk === 'medium' ? '#3b82f6' : '#10b981',
                color: '#ffffff'
              }}
            >
              {risk}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-slate-400" />
              <span>PM: {meta.pm}</span>
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-slate-400" />
              <span>Business Owner: {meta.owner}</span>
            </span>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: '3px solid #3b82f6', fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>
            {meta.desc}
          </div>
        </div>

        {/* Stuck Age Card (top right) */}
        <div 
          className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center gap-4 min-w-[200px]"
          style={{ alignSelf: 'stretch', justifyContent: 'center' }}
        >
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <span className="muted" style={{ fontSize: '9px', fontWeight: 'black', textTransform: 'uppercase', display: 'block' }}>Stuck Age</span>
            <strong style={{ fontSize: '13px', color: '#0f172a', display: 'block', marginTop: '2px' }}>{meta.stuckAge} at current gate</strong>
          </div>
        </div>

      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200 pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: isActive ? '#3b82f6' : '#64748b',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="tab-viewport">
        
        {/* Overview Tab Content */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Timeline (2/3 width) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-5">
                Lifecycle Timeline & Approval Sprints
              </h3>
              
              {/* Vertical timeline */}
              <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid #e2e8f0', marginLeft: '12px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {STEPS.map((step) => {
                  const status = getStepStatus(step.name);
                  const isActive = status === 'active';
                  const isCompleted = status === 'completed';

                  return (
                    <div key={step.name} style={{ position: 'relative' }}>
                      
                      {/* Circle Dot */}
                      <span 
                        style={{
                          position: 'absolute',
                          left: '-31px',
                          top: '2px',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: isActive ? '#3b82f6' : isCompleted ? '#3b82f6' : '#cbd5e1',
                          boxShadow: isActive ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : 'none',
                          border: isCompleted ? 'none' : '2px solid #ffffff',
                          display: 'block',
                          zIndex: 10
                        }}
                      />

                      {/* Step details */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <strong 
                            style={{ 
                              fontSize: '13px', 
                              color: isActive ? '#3b82f6' : '#1e293b',
                              fontWeight: isActive ? 'bold' : '600'
                            }}
                          >
                            {step.name} {isActive ? '(Active Gate)' : ''}
                          </strong>
                          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>
                            {step.desc}
                          </p>
                        </div>
                        <span 
                          style={{ 
                            fontSize: '10px', 
                            fontWeight: 'bold', 
                            color: isActive ? '#3b82f6' : '#94a3b8',
                            whitespace: 'nowrap'
                          }}
                        >
                          {isActive ? 'Current' : isCompleted ? `Completed` : step.date}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right details sidebar (1/3 width) */}
            <div className="space-y-6 lg:col-span-1">
              
              {/* Gate Summary Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4">
                  Gate Summary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748b' }}>Active Gate</span>
                    <strong style={{ color: '#0f172a' }}>{meta.activeGate}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748b' }}>SLA Status</span>
                    <strong style={{ color: meta.slaStatus === 'Breached' ? '#ef4444' : '#d97706' }}>
                      {meta.slaStatus}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748b' }}>Pending Owner</span>
                    <strong style={{ color: '#0f172a' }}>{meta.owner}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748b' }}>Cost Status</span>
                    <strong style={{ color: '#10b981' }}>{meta.costStatus}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Sized Budget</span>
                    <strong style={{ color: '#0f172a' }}>{meta.budget}</strong>
                  </div>
                </div>
              </div>

              {/* AI Assistant Recommendation */}
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '16px', padding: '16px', fontSize: '11px' }}>
                <h4 style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#1e40af', letterSpacing: '0.05em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bot className="h-4 w-4" />
                  <span>AI Assistant Recommendation</span>
                </h4>
                <p style={{ margin: 0, color: '#1e3a8a', fontStyle: 'italic', lineHeight: '1.5' }}>
                  "{meta.recommendation}"
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Documents Tab Content */}
        {activeTab === 'Documents' && (
          <Card title="Student Credentials & Document Ledger">
            <div className="space-y-4">
              <div style={{ padding: '12px 16px', border: '1px solid #f1f5f9', background: '#f8fafc', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <div>
                  <strong style={{ color: '#1e293b' }}>Verified Academic Transcripts & Degrees</strong>
                  <span className="muted" style={{ display: 'block', fontSize: '10px', marginTop: '2px' }}>Uploaded by agent partner • Audited and certified by Registrar Office</span>
                </div>
                <span className="badge badge-green">Verified</span>
              </div>
              <div style={{ padding: '12px 16px', border: '1px solid #f1f5f9', background: '#f8fafc', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <div>
                  <strong style={{ color: '#1e293b' }}>English Language Proficiency Certificate (IELTS/TOEFL)</strong>
                  <span className="muted" style={{ display: 'block', fontSize: '10px', marginTop: '2px' }}>Awaiting academic equivalency confirmation</span>
                </div>
                <span className="badge badge-amber">Under Review</span>
              </div>
              <div style={{ padding: '12px 16px', border: '1px solid #f1f5f9', background: '#f8fafc', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <div>
                  <strong style={{ color: '#94a3b8' }}>Ministry Equivalence Decree / Attestation</strong>
                  <span className="muted" style={{ display: 'block', fontSize: '10px', marginTop: '2px' }}>Not yet uploaded to the student file</span>
                </div>
                <span className="badge badge-red" style={{ opacity: 0.6 }}>Pending Upload</span>
              </div>
            </div>
          </Card>
        )}

        {/* Approvals Tab Content */}
        {activeTab === 'Approvals' && (
          <Card title="Admissions Approval Gates Sign-off History">
            <div className="space-y-3" style={{ fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eef2f7' }}>
                <strong>Application & Transcript Intake Verification</strong>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>Approved by Admissions Desk (May 22)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eef2f7' }}>
                <strong>Academic Eligibility & GPA Auditing</strong>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>Approved by Dean of Faculty (May 23)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <strong>Tuition Deposit & Scholarship Clearance</strong>
                <span style={{ color: '#d97706', fontWeight: 'bold' }}>Awaiting sign-off by Finance Office</span>
              </div>
            </div>
          </Card>
        )}

        {/* Costing Tab Content */}
        {activeTab === 'Costing' && (
          <Card title="Intake Fee & Sized Budget Details">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '1px solid #eef2f7' }}>
                <span>Annual Tuition Assessment</span>
                <strong>$45,000</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '1px solid #eef2f7' }}>
                <span>Clinical & Laboratory Capacity Fee</span>
                <strong>$35,000</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '1px solid #eef2f7' }}>
                <span>International Health Insurance Levy</span>
                <strong>$25,000</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '1px solid #eef2f7' }}>
                <span>Admissions & Equivalency Filing Fee</span>
                <strong>$15,000</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 10px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontWeight: 'black', fontSize: '13px' }}>Total Assessed Fees</span>
                <strong style={{ fontSize: '13px', color: '#0f766e' }}>{meta.budget}</strong>
              </div>
            </div>
          </Card>
        )}

        {/* Risks Tab Content */}
        {activeTab === 'Risks' && (
          <Card title="Active Admissions & Visa Compliance Risks">
            <div className="space-y-4">
              <div style={{ padding: '12px', border: '1px solid #fee2e2', background: '#fff5f5', borderRadius: '12px', fontSize: '12px' }}>
                <strong style={{ color: '#b91c1c', display: 'block' }}>⚠️ SLA Gateway Breach (Immigration Risk)</strong>
                <p style={{ margin: '4px 0 8px 0', color: '#475569' }}>
                  Stuck in {meta.activeGate} for {meta.stuckAge} (exceeds admissions target window of 72 hours).
                </p>
                <em style={{ fontStyle: 'normal', color: '#94a3b8', fontSize: '10px', fontWeight: 'bold' }}>
                  Active mitigation: Trigger auto-alert to regional sponsor liaison.
                </em>
              </div>
              <div style={{ padding: '12px', border: '1px solid #fef3c7', background: '#fffbeb', borderRadius: '12px', fontSize: '12px' }}>
                <strong style={{ color: '#d97706', display: 'block' }}>⚠️ Document Defect Risk</strong>
                <p style={{ margin: '4px 0 8px 0', color: '#475569' }}>
                  Potential delay in visa filing due to missing ministry attestation decree.
                </p>
                <em style={{ fontStyle: 'normal', color: '#94a3b8', fontSize: '10px', fontWeight: 'bold' }}>
                  Active mitigation: Route file to priority international verification pool.
                </em>
              </div>
            </div>
          </Card>
        )}

        {/* Audit Trail Tab Content */}
        {activeTab === 'Audit Trail' && (
          <Card title="Admissions Activity Ledger Logs">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontFamily: 'monospace', color: '#64748b' }}>12 Jun 2026 10:30</span>
                <span>Application Submitted</span>
                <span style={{ color: '#475569' }}>Agent partner uploaded student transcripts</span>
                <span className="badge badge-green" style={{ fontSize: '9px', padding: '2px 6px' }}>Completed</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontFamily: 'monospace', color: '#64748b' }}>13 Jun 2026 11:15</span>
                <span>Admissions Audit</span>
                <span>System validated credentials against regional GPA indexes</span>
                <span className="badge badge-green" style={{ fontSize: '9px', padding: '2px 6px' }}>Passed</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
                <span style={{ fontFamily: 'monospace', color: '#64748b' }}>15 Jun 2026 15:30</span>
                <span>SLA Flagged</span>
                <span>System auto-warned target gateway deadline exceeded</span>
                <span className="badge badge-red" style={{ fontSize: '9px', padding: '2px 6px' }}>Escalated</span>
              </div>
            </div>
          </Card>
        )}

        {/* Buddy Notes Tab Content */}
        {activeTab === 'Buddy Notes' && (
          <Card title="Governance Buddy Consultation & Chase Notes">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p className="card-copy" style={{ fontSize: '11px', margin: 0 }}>
                Generate automated chase notes to notify the Admissions Manager of the SLA breach, or review policy exceptions with the AI Buddy.
              </p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button 
                  className="secondary" 
                  style={{ fontSize: '11px', padding: '6px 12px' }}
                  onClick={() => alert(`SLA escalation warning dispatched to ${meta.owner}.`)}
                >
                  Ping Owner ({meta.owner})
                </button>
                <button 
                  className="primary" 
                  style={{ fontSize: '11px', padding: '6px 12px' }}
                  onClick={() => navigateHash('ask-buddy')}
                >
                  Consult AI Buddy
                </button>
              </div>
            </div>
          </Card>
        )}

      </div>

    </div>
  );
}
