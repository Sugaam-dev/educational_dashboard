export const navItems = [
  { id: 'dashboard', label: 'Command center' },
  { id: 'funnel', label: 'Approval funnel' },
  { id: 'risk', label: 'Risk heat map' },
  { id: 'exceptions', label: 'Exceptions' },
  { id: 'agents', label: 'Agents' },
  { id: 'markets', label: 'Markets' },
  { id: 'matrix', label: 'Program matrix' },
  { id: 'ask-buddy', label: 'Ask Buddy' },
  { id: 'notes', label: 'Draft notes' },
  { id: 'audit-trail', label: 'Audit trails' },
  { id: 'settings', label: 'Settings' },
];

export const appPages = [...navItems.map((item) => item.id), 'heatmap-detail'];

export const portfolioCards = [
  { label: 'On track', value: '12', note: 'of 32 initiatives', tone: 'green', page: 'dashboard' },
  { label: 'At risk', value: '8', note: 'need intervention', tone: 'amber', page: 'risk' },
  { label: 'Blocked', value: '5', note: 'no progression', tone: 'red', page: 'exceptions' },
  { label: 'Awaiting approval', value: '7', note: 'pending sign-off', tone: 'blue', page: 'funnel' },
];

export const funnelStages = [
  { label: 'Lead submitted', value: 34, sla: 1, owner: 'Recruitment Ops', color: '#1d73bd' },
  { label: 'Application review', value: 28, sla: 9, owner: 'Admissions Team', color: '#3388d8' },
  { label: 'Offer approval', value: 19, sla: 6, owner: 'Academic Review', color: '#b97915' },
  { label: 'Fee clearance', value: 16, sla: 11, owner: 'Finance', color: '#2c6f16' },
  { label: 'Visa go/no-go', value: 9, sla: 5, owner: 'Visa Desk', color: '#0f766e' },
  { label: 'Enrollment released', value: 6, sla: 2, owner: 'Registrar', color: '#5546b8' },
];

export const approvalSignals = [
  { label: 'SLA breached', value: '9', note: '>5 days waiting', tone: 'red' },
  { label: 'Approaching SLA', value: '6', note: '3-5 days waiting', tone: 'amber' },
  { label: 'Avg approval time', value: '4.1d', note: 'across gates', tone: 'blue' },
  { label: 'Unapproved costs', value: '11', note: 'finance pending', tone: 'amber' },
];

export const riskProjects = [
  'Visa Risk',
  'Agent Portal',
  'Scholarship',
  'Finance Sync',
  'Document AI',
  'Country Plan',
  'Orientation',
  'Compliance',
  'Program Mix',
  'Enrollment',
  'Audit Trail',
  'Student Care',
  'Forecasting',
  'Hostel Accommodation'
];

export const riskColumns = ['Approval delay', 'Cost risk', 'Document gap', 'Visa risk', 'Schedule slip'];
export const riskLevels = ['low', 'medium', 'high', 'critical'];

export const heatmapDetails = {
  'Approval delay': {
    owner: 'Admissions SLA Office',
    evidence: 'Delay is calculated from the last untouched approval gate and the current intake deadline.',
    action: 'Reassign queue ownership, create a same-day reviewer rota, and send overdue decisions to PMO.'
  },
  'Cost risk': {
    owner: 'Finance Director',
    evidence: 'Cost risk includes unapproved waivers, overdue scholarship approvals, and unbudgeted partner spend.',
    action: 'Approve or reject pending scholarships, deposit exceptions, and partner incentive requests.'
  },
  'Document gap': {
    owner: 'Registrar',
    evidence: 'Document gap flags missing transcripts, proof-of-funds issues, translation gaps, and ministry decree blockers.',
    action: 'Trigger document audit, request missing originals, and hold offers until transcript checks pass.'
  },
  'Visa risk': {
    owner: 'Visa Compliance Lead',
    evidence: 'Visa risk combines rejection rate, embassy backlog, sponsor proof quality, and agent history.',
    action: 'Run pre-visa financial review and freeze high-risk agent submissions until evidence improves.'
  },
  'Schedule slip': {
    owner: 'PMO',
    evidence: 'Schedule slip compares planned release dates with the current intake readiness milestone.',
    action: 'Move decisions to daily standup, set a recovery date, and record the next checkpoint owner.'
  }
};

export const exceptions = [
  { badge: 'Critical', area: 'Agent', title: 'Zenith Admissions - visa approval below threshold', meta: '42% rejection rate - freeze portal decision pending', owner: 'Regional Director' },
  { badge: 'Critical', area: 'Admissions', title: 'CRM intake - offer review exceeds 72h SLA', meta: 'South Asia queue - 84 applications waiting', owner: 'Admissions Lead' },
  { badge: 'High', area: 'Finance', title: 'Scholarship approvals pending 6 days', meta: 'MBA and Nursing cohorts blocked', owner: 'Finance Director' },
  { badge: 'High', area: 'Documents', title: 'Apex Consultancy document quality issues', meta: '24% rejection rate - transcript audit required', owner: 'Registrar' },
  { badge: 'Watch', area: 'Market', title: 'Nigeria market showing fee-payment drop-off', meta: 'Currency volatility and sponsor proof changes', owner: 'Market Manager' },
];

export const agents = [
  { name: 'Global Education Group', country: 'India', apps: 1240, visa: 95.1, revenue: '$18.4M', status: 'Excellent', docs: 2.1 },
  { name: 'Beacon International', country: 'UAE', apps: 890, visa: 88.4, revenue: '$12.1M', status: 'Good', docs: 4.8 },
  { name: 'Apex Consultancy', country: 'Nepal', apps: 650, visa: 72.1, revenue: '$8.9M', status: 'High', docs: 24.2 },
  { name: 'Oasis Recruitment', country: 'Kenya', apps: 480, visa: 94.3, revenue: '$7.2M', status: 'Excellent', docs: 3.0 },
  { name: 'Zenith Admissions', country: 'Nigeria', apps: 340, visa: 58.2, revenue: '$3.8M', status: 'Critical', docs: 38.5 },
  { name: 'Elite Scholars', country: 'Turkey', apps: 210, visa: 98.0, revenue: '$3.1M', status: 'Good', docs: 6.2 },
];

export const markets = [
  { country: 'India', leads: 4800, apps: 2100, visa: 94.5, enroll: 88.2, revenue: '$38.2M', trend: 'Growing' },
  { country: 'Nigeria', leads: 3200, apps: 1450, visa: 72.3, enroll: 78.0, revenue: '$22.4M', trend: 'Declining' },
  { country: 'UAE', leads: 1800, apps: 820, visa: 97.2, enroll: 91.5, revenue: '$21.6M', trend: 'Growing' },
  { country: 'Nepal', leads: 1500, apps: 710, visa: 85.0, enroll: 82.1, revenue: '$11.4M', trend: 'Growing' },
  { country: 'Bangladesh', leads: 1200, apps: 540, visa: 78.1, enroll: 75.3, revenue: '$8.8M', trend: 'Declining' },
  { country: 'Kenya', leads: 950, apps: 420, visa: 91.8, enroll: 86.4, revenue: '$7.9M', trend: 'Growing' },
];

export const weeklyMovement = [
  ['Avg approval cycle time', '4.1 days', '0.6d'],
  ['Escalations this week', '9', '3'],
  ['Application-to-offer mismatches', '7', '1'],
  ['Students moved to next gate', '42', '12'],
  ['Projects started without sign-off', '0', 'ok'],
];

export const commandStats = [
  { label: 'Actions due today', value: '11', tone: 'red' },
  { label: 'Follow-ups overdue', value: '5', tone: 'amber' },
  { label: 'Meetings today', value: '3', tone: 'blue' },
  { label: 'Completed this week', value: '18', tone: 'green' },
];

export const initialTodos = [
  { task: 'Chase Zenith - confirm visa freeze decision', status: 'Critical', meta: 'Owner: Regional Director', done: false },
  { task: 'Review MBA fee exception requests', status: 'Critical', meta: 'Finance: 11 cases pending', done: false },
  { task: 'Escalate document audit for Apex', status: 'Critical', meta: 'Registrar: transcript defects', done: false },
  { task: 'Confirm ministry decree uploads', status: 'High', meta: '4 students waiting', done: false },
  { task: 'Verify Nursing clinical capacity cap', status: 'High', meta: 'Dean approval needed', done: false },
  { task: 'Prepare Friday PMO governance pack', status: 'High', meta: 'Ask Buddy for draft', done: false },
  { task: 'Send Bangladesh visa-watch reminder', status: 'Done', meta: 'Done 09:14 - response received', done: true },
];

export const dayPlan = [
  ['09:00', 'Daily governance brief - review Buddy summary', '15 min'],
  ['10:30', 'Escalation call - Zenith visa risk', '30 min'],
  ['12:00', 'Finance sync - unblock scholarships', '45 min'],
  ['14:00', 'CRM offer review with admissions team', '1 hr'],
  ['16:00', 'PMO call prep - draft agenda with Buddy', '30 min'],
];

export const people = [
  ['AS', 'Anil S. - Finance', 'Cost approvals: MBA, Nursing, Loyalty Module', '6 days overdue - SLA breached'],
  ['RK', 'Ramesh K. - Business Owner', 'BRD review: Portal Redesign', '8 days no action - escalation needed'],
  ['NB', 'Neha R. - Solution Architect', 'Solution doc: Agent Portal, SSO Rollout', 'Reminder yesterday - no response yet'],
];

export const progressBars = [
  ['To-dos completed', 64, '7 / 11', '#1d73bd'],
  ['Follow-ups sent', 78, '7 / 9', '#2c6f16'],
  ['Approvals unblocked', 36, '4 / 11', '#9a600e'],
  ['SLA gaps resolved', 28, '2 / 7', '#7f1d1d'],
];

export const buddyTemplates = [
  { question: 'Which students are waiting for finance approval?', keywords: ['finance', 'approval'], answer: '11 finance approvals are pending. Priority cases are MBA fee exceptions, Nursing scholarships, and two MD deposit waivers. Clear MBA first because it blocks visa filing.' },
  { question: 'Which agents have the highest visa risk?', keywords: ['agent', 'visa', 'risk'], answer: 'Zenith Admissions is critical at 58.2% visa success, followed by Apex Consultancy at 72.1%. Freeze Zenith new submissions and run an Apex document audit.' },
  { question: 'Which programs are underperforming?', keywords: ['program', 'underperforming'], answer: 'MBA is under target in Nigeria because of deposit friction and sponsor proof issues. Master of Data Science is behind because Nepal and Bangladesh visa processing exceeded 45 days.' },
  { question: 'Which market should we invest in next intake?', keywords: ['market', 'invest', 'intake'], answer: 'Invest in UAE, Kenya, and India tier-2 cities. UAE has high tuition yield and 97.2% visa success; Kenya is strong for Nursing; India remains the volume engine.' },
  { question: 'Show students awaiting ministry decree.', keywords: ['ministry', 'decree'], answer: 'Four students are waiting for ministry decree actions: STU-092 Aravind S., STU-118 Fatima A., STU-204 Benjamin O., and STU-302 Binod B. Benjamin is already breached by 48 hours.' },
  { question: 'Which documents are missing?', keywords: ['document', 'missing'], answer: 'Missing items include authenticated transcripts, English-proficiency evidence, sponsor bank statements, translated citizenship certificates, and two original high-school mark sheets.' },
  { question: 'How can we reduce application review SLA?', keywords: ['reduce', 'application', 'sla'], answer: 'Move South Asia applications to a same-day triage lane, assign three reviewers to the stale queue, and auto-escalate files untouched after 36 hours.' },
  { question: 'Which country has highest enrollment?', keywords: ['country', 'highest', 'enrollment'], answer: 'India has the highest enrollment volume with 2,100 applications, 1,650 offers, 88.2% enrollment rate, and $38.2M revenue.' },
  { question: 'Draft escalation note for overdue approvals.', keywords: ['draft', 'escalation', 'approval'], answer: 'Draft: Please confirm the decision owner, blocked cohort, SLA age, required approval, and recovery date by 5 PM today. This item is now a governance blocker for the June 2026 intake.' },
];

export const badgeClass = {
  Critical: 'badge badge-red',
  High: 'badge badge-amber',
  Watch: 'badge badge-blue',
  Done: 'badge badge-green',
  Excellent: 'badge badge-green',
  Good: 'badge badge-blue',
};

export const MATRIX_DATA = {
  headers: ['Program', 'Direct Admissions', 'Agents', 'Regional Offices', 'Digital Campaigns', 'Education Fairs'],
  rows: [
    {
      program: 'MD (Medicine)',
      direct: { apps: 45, enroll: '85.0%', rev: '$1.8M', roi: '80.0%', note: 'Slow conversion pace but high retention loyalty.' },
      agents: { apps: 185, enroll: '91.2%', rev: '$7.4M', roi: '56.8%', note: 'Highest absolute recruiter for MD; Global Ed Group generates 55%.' },
      offices: { apps: 62, enroll: '89.0%', rev: '$2.5M', roi: '43.3%', note: 'Stable admissions through UAE Regional Office.' },
      digital: { apps: 18, enroll: '72.1%', rev: '$0.7M', roi: '26.6%', note: 'High customer acquisition spend per seat.' },
      fairs: { apps: 35, enroll: '78.5%', rev: '$1.4M', roi: '30.0%', note: 'Yields high academic eligibility prospects.' }
    },
    {
      program: 'Nursing',
      direct: { apps: 90, enroll: '82.1%', rev: '$2.2M', roi: '80.0%', note: 'Steady domestic and direct international interest.' },
      agents: { apps: 240, enroll: '90.1%', rev: '$5.8M', roi: '56.8%', note: 'Oasis Recruitment Group manages strong Nursing pipelines.' },
      offices: { apps: 45, enroll: '79.2%', rev: '$1.1M', roi: '43.3%', note: 'Under-utilized regional recruitment staff.' },
      digital: { apps: 32, enroll: '75.0%', rev: '$0.8M', roi: '26.6%', note: 'Targeted LinkedIn campaigns showing fair ROI.' },
      fairs: { apps: 50, enroll: '78.2%', rev: '$1.2M', roi: '30.0%', note: 'Strong physical engagement conversion.' }
    },
    {
      program: 'BBA',
      direct: { apps: 120, enroll: '78.4%', rev: '$2.4M', roi: '80.0%', note: 'High direct traffic from organic Google rankings.' },
      agents: { apps: 310, enroll: '74.1%', rev: '$6.2M', roi: '56.8%', note: 'Volume recruitment, but moderate visa dropouts.' },
      offices: { apps: 85, enroll: '86.4%', rev: '$1.7M', roi: '43.3%', note: 'Best-performing channel for BBA; India Regional Office leads.' },
      digital: { apps: 110, enroll: '70.2%', rev: '$2.2M', roi: '26.6%', note: 'Meta Ads target younger demographic successfully.' },
      fairs: { apps: 40, enroll: '72.5%', rev: '$0.8M', roi: '30.0%', note: 'Fair conversion rate from regional event booths.' }
    },
    {
      program: 'MBA',
      direct: { apps: 145, enroll: '88.2%', rev: '$4.4M', roi: '80.0%', note: 'Executive applicants prefer applying directly.' },
      agents: { apps: 125, enroll: '78.0%', rev: '$3.8M', roi: '56.8%', note: 'Declining in West Africa due to FX guidelines.' },
      offices: { apps: 78, enroll: '85.0%', rev: '$2.3M', roi: '43.3%', note: 'Corporate tie-ups by UAE Regional Office driving growth.' },
      digital: { apps: 68, enroll: '75.3%', rev: '$2.0M', roi: '26.6%', note: 'Google Search Ads for "Executive MBA" convert well.' },
      fairs: { apps: 30, enroll: '72.0%', rev: '$0.9M', roi: '30.0%', note: 'Moderate yield due to high executive price sensitivity.' }
    }
  ]
};

