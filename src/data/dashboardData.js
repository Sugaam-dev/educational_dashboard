export const navItems = [
  // Core / Legacy
  { id: 'dashboard',           label: 'Command Center' },
  { id: 'funnel',              label: 'Approval Funnel' },
  { id: 'risk',                label: 'Risk Heat Map' },
  { id: 'exceptions',          label: 'Exceptions' },
  { id: 'ask-buddy',           label: 'Ask Buddy' },
  { id: 'notes',               label: 'Draft Notes' },
  { id: 'audit-trail',         label: 'Audit Trails' },
  { id: 'settings',            label: 'Settings' },
  // Layer 3 — Channel Governance
  { id: 'agents',              label: 'Agents' },
  { id: 'markets',             label: 'Markets' },
  { id: 'matrix',              label: 'Program Matrix' },
  { id: 'direct-admissions',   label: 'Direct Admissions' },
  { id: 'digital-campaigns',   label: 'Digital Campaigns' },
  { id: 'regional-offices',    label: 'Regional Offices' },
  { id: 'education-fairs',     label: 'Education Fairs' },
  { id: 'revenue-governance',  label: 'Revenue Governance' },
  { id: 'admission-quality',   label: 'Admission Quality' },
  // Layer 2 — Student Governance
  { id: 'student-lifecycle',   label: 'Student Lifecycle' },
  { id: 'student-pipeline',    label: 'Student Pipeline' },
  // Layer 1 — Institutional Governance
  { id: 'university-governance',  label: 'University Governance' },
  { id: 'academic-performance',   label: 'Academic Performance' },
  { id: 'finance-governance',     label: 'Finance Governance' },
  { id: 'compliance-centre',      label: 'Compliance Centre' },
];

export const appPages = [...navItems.map((item) => item.id), 'heatmap-detail'];

// ─── LAYER 3 DATA ──────────────────────────────────────────────────────────────

export const RECRUITMENT_FUNNEL = [
  { stage: 'Lead Generated',       volume: 13450, dropOff: 0,    convRate: 100,  sla: 'On Time',  owner: 'Marketing Team',      color: '#1d4ed8', icon: 'Users' },
  { stage: 'Inquiry Submitted',    volume: 8920,  dropOff: 4530, convRate: 66.3, sla: 'On Time',  owner: 'Admissions Team',     color: '#2563eb', icon: 'MessageSquare' },
  { stage: 'Application Received', volume: 5640,  dropOff: 3280, convRate: 63.2, sla: 'Breached', owner: 'Admissions Office',   color: '#3b82f6', icon: 'FileText' },
  { stage: 'Conditional Offer',    volume: 3890,  dropOff: 1750, convRate: 69.0, sla: 'On Time',  owner: 'Academic Review',     color: '#0891b2', icon: 'Award' },
  { stage: 'Fee Payment',          volume: 2840,  dropOff: 1050, convRate: 73.0, sla: 'Breached', owner: 'Finance Office',      color: '#0d9488', icon: 'CreditCard' },
  { stage: 'Visa Application',     volume: 2210,  dropOff: 630,  convRate: 77.8, sla: 'On Time',  owner: 'Visa Compliance',     color: '#059669', icon: 'Stamp' },
  { stage: 'Student Arrival',      volume: 1940,  dropOff: 270,  convRate: 87.8, sla: 'On Time',  owner: 'Student Services',    color: '#16a34a', icon: 'Plane' },
  { stage: 'Enrollment Confirmed', volume: 1720,  dropOff: 220,  convRate: 88.7, sla: 'On Time',  owner: 'Registrar Office',    color: '#15803d', icon: 'GraduationCap' },
];

export const CAMPAIGNS = [
  { name: 'Google Search — International MBA', platform: 'Google Ads', spend: 48000, leads: 420, apps: 168, enrollments: 89, cpl: 114, cpe: 539, roi: '186%', status: 'Active' },
  { name: 'Facebook Lead Form — Nursing',      platform: 'Meta Ads',   spend: 32000, leads: 380, apps: 145, enrollments: 71, cpl: 84,  cpe: 451, roi: '221%', status: 'Active' },
  { name: 'Website Organic (SEO)',             platform: 'Organic',    spend: 8000,  leads: 680, apps: 294, enrollments: 182, cpl: 12, cpe: 44,  roi: '2270%', status: 'Active' },
  { name: 'Email Re-engagement Campaign',      platform: 'Email',      spend: 4500,  leads: 210, apps: 72,  enrollments: 38, cpl: 21,  cpe: 118, roi: '844%', status: 'Paused' },
  { name: 'LinkedIn — Executive MBA',          platform: 'LinkedIn',   spend: 62000, leads: 195, apps: 98,  enrollments: 54, cpl: 318, cpe: 1148, roi: '87%', status: 'Active' },
  { name: 'YouTube Brand Awareness',           platform: 'YouTube',    spend: 18000, leads: 320, apps: 88,  enrollments: 41, cpl: 56,  cpe: 439, roi: '228%', status: 'Active' },
];

export const PLATFORMS = [
  { platform: 'Google Ads',              spend: 94000, impressions: 1840000, clicks: 28400, leads: 890, apps: 312, cpl: 106, cpa: 301, convRate: 3.1, quality: 'High' },
  { platform: 'Meta (FB/IG)',            spend: 38500, impressions: 4200000, clicks: 84000, leads: 740, apps: 198, cpl: 52,  cpa: 194, convRate: 0.9, quality: 'Medium' },
  { platform: 'LinkedIn',               spend: 26000, impressions: 420000,  clicks: 8400,  leads: 245, apps: 148, cpl: 106, cpa: 176, convRate: 1.8, quality: 'High' },
  { platform: 'YouTube',                spend: 9800,  impressions: 2100000, clicks: 42000, leads: 180, apps: 54,  cpl: 54,  cpa: 181, convRate: 0.9, quality: 'Medium' },
  { platform: 'Local (PK/BD)',          spend: 4200,  impressions: 680000,  clicks: 9800,  leads: 150, apps: 62,  cpl: 28,  cpa: 68,  convRate: 0.9, quality: 'Medium' },
];

export const REGIONAL_OFFICES = [
  { office: 'India Regional Office',    city: 'New Delhi', manager: 'Priya Sharma',     apps: 580, offers: 510, enrollments: 468, revenue: 18800000, convRate: 80.7, marketShare: 31.5, staffCount: 8, status: 'Exceeding' },
  { office: 'UAE Regional Office',      city: 'Dubai',     manager: 'Khalid Al-Rashid', apps: 380, offers: 342, enrollments: 324, revenue: 14200000, convRate: 85.3, marketShare: 20.6, staffCount: 5, status: 'On Target' },
  { office: 'West Africa Office',       city: 'Lagos',     manager: 'Chukwuma Obi',     apps: 290, offers: 232, enrollments: 196, revenue: 7400000,  convRate: 67.6, marketShare: 15.7, staffCount: 4, status: 'Below Target' },
  { office: 'South Asia Office',        city: 'Dhaka',     manager: 'Rana Islam',       apps: 340, offers: 289, enrollments: 248, revenue: 4800000,  convRate: 72.9, marketShare: 18.5, staffCount: 6, status: 'On Target' },
  { office: 'East Africa Office',       city: 'Nairobi',   manager: 'Amara Wangeci',    apps: 250, offers: 225, enrollments: 208, revenue: 1000000,  convRate: 83.2, marketShare: 13.6, staffCount: 3, status: 'Exceeding' },
];

export const FAIRS = [
  { event: 'India Education Expo — New Delhi',    country: 'India',      date: 'Feb 2026', cost: 24000, leads: 480, apps: 196, enrollments: 78,  cpl: 50,  cpe: 308,  roi: '324%',  rating: 'Excellent' },
  { event: 'Gulf Education Fair — Dubai',         country: 'UAE',        date: 'Mar 2026', cost: 38000, leads: 390, apps: 178, enrollments: 92,  cpl: 97,  cpe: 413,  roi: '242%',  rating: 'Good' },
  { event: 'StudyWorld — London (International)', country: 'UK Hub',     date: 'Mar 2026', cost: 62000, leads: 280, apps: 124, enrollments: 48,  cpl: 221, cpe: 1292, roi: '78%',   rating: 'Poor' },
  { event: 'Nepal University Fair — Kathmandu',   country: 'Nepal',      date: 'Apr 2026', cost: 12000, leads: 420, apps: 198, enrollments: 112, cpl: 29,  cpe: 107,  roi: '933%',  rating: 'Excellent' },
  { event: 'Bangladesh Higher Ed Summit',         country: 'Bangladesh', date: 'Apr 2026', cost: 9500,  leads: 350, apps: 142, enrollments: 64,  cpl: 27,  cpe: 148,  roi: '675%',  rating: 'Good' },
  { event: 'Nigeria Study Abroad Exhibition',     country: 'Nigeria',    date: 'May 2026', cost: 18000, leads: 310, apps: 98,  enrollments: 32,  cpl: 58,  cpe: 563,  roi: '178%',  rating: 'Below Avg' },
  { event: 'Kenya Education Summit — Nairobi',    country: 'Kenya',      date: 'May 2026', cost: 8000,  leads: 290, apps: 132, enrollments: 88,  cpl: 28,  cpe: 91,   roi: '1100%', rating: 'Excellent' },
  { event: 'Turkey International University Fair',country: 'Turkey',     date: 'Jun 2026', cost: 14000, leads: 240, apps: 96,  enrollments: 44,  cpl: 58,  cpe: 318,  roi: '314%',  rating: 'Good' },
];

export const COST_ANALYSIS = [
  { channel: 'Website Organic',    costPerApp: 44,  costPerEnroll: 44,   agentFee: 0,    totalCostPerStudent: 44,   revenuePerStudent: 64128, margin: '99.9%' },
  { channel: 'Email Marketing',    costPerApp: 118, costPerEnroll: 118,  agentFee: 0,    totalCostPerStudent: 118,  revenuePerStudent: 64128, margin: '99.8%' },
  { channel: 'Google Ads',         costPerApp: 301, costPerEnroll: 539,  agentFee: 0,    totalCostPerStudent: 539,  revenuePerStudent: 64128, margin: '99.2%' },
  { channel: 'Education Fairs',    costPerApp: 62,  costPerEnroll: 240,  agentFee: 0,    totalCostPerStudent: 240,  revenuePerStudent: 64128, margin: '99.6%' },
  { channel: 'Recruitment Agents', costPerApp: 180, costPerEnroll: 480,  agentFee: 3200, totalCostPerStudent: 3680, revenuePerStudent: 64128, margin: '94.3%' },
  { channel: 'LinkedIn Ads',       costPerApp: 176, costPerEnroll: 1148, agentFee: 0,    totalCostPerStudent: 1148, revenuePerStudent: 64128, margin: '98.2%' },
];

export const AGENT_QUALITY = [
  { agent: 'Global Education Group',  country: 'India',   docComplete: 98.2, academicElig: 96.1, visaApproval: 95.1, regCompletion: 97.4, trcCompletion: 92.1, overallScore: 95.8, grade: 'A+' },
  { agent: 'Elite Scholars Ltd',      country: 'Turkey',  docComplete: 97.1, academicElig: 95.8, visaApproval: 98.0, regCompletion: 96.2, trcCompletion: 91.8, overallScore: 95.8, grade: 'A+' },
  { agent: 'Oasis Recruitment Group', country: 'Kenya',   docComplete: 96.4, academicElig: 91.2, visaApproval: 94.3, regCompletion: 94.8, trcCompletion: 88.4, overallScore: 93.0, grade: 'A' },
  { agent: 'Beacon International',    country: 'UAE',     docComplete: 91.2, academicElig: 88.4, visaApproval: 88.4, regCompletion: 90.2, trcCompletion: 84.1, overallScore: 88.5, grade: 'B' },
  { agent: 'Apex Consultancy',        country: 'Nepal',   docComplete: 75.8, academicElig: 80.2, visaApproval: 72.1, regCompletion: 82.4, trcCompletion: 68.2, overallScore: 75.7, grade: 'C' },
  { agent: 'Zenith Admissions',       country: 'Nigeria', docComplete: 61.5, academicElig: 72.4, visaApproval: 58.2, regCompletion: 74.1, trcCompletion: 52.4, overallScore: 63.7, grade: 'F' },
];

export const DEFECT_TYPES = [
  { type: 'Missing Authenticated Transcripts',   count: 142, agents: ['Zenith Admissions', 'Apex Consultancy'], risk: 'Critical' },
  { type: 'Insufficient Proof of Funds',         count: 98,  agents: ['Zenith Admissions', 'Beacon International'], risk: 'Critical' },
  { type: 'Expired English Proficiency Cert.',   count: 74,  agents: ['Apex Consultancy', 'Oasis Recruitment'], risk: 'High' },
  { type: 'Missing Ministry Decree / Attestation', count: 48, agents: ['Zenith Admissions'], risk: 'Critical' },
  { type: 'Incomplete Health Clearance',         count: 31,  agents: ['Apex Consultancy'], risk: 'High' },
  { type: 'Photo Quality / Biometric Issues',    count: 18,  agents: ['Multiple agents'],  risk: 'Medium' },
];

// ─── LAYER 2 DATA ──────────────────────────────────────────────────────────────

export const STUDENTS = [
  { id: 'STU-0042', name: 'Aravind Sharma',       country: 'India',      flag: '🇮🇳', program: 'MD Medicine', agent: 'Global Education Group', stage: 'Visa Applied',  daysInStage: 14, slaThreshold: 21, status: 'On Track' },
  { id: 'STU-0118', name: 'Fatima Al-Rashidi',    country: 'UAE',        flag: '🇦🇪', program: 'MBA',         agent: 'Beacon International',   stage: 'Fee Payment',   daysInStage: 8,  slaThreshold: 7,  status: 'Breached' },
  { id: 'STU-0204', name: 'Benjamin Okonkwo',     country: 'Nigeria',    flag: '🇳🇬', program: 'Nursing',     agent: 'Zenith Admissions',      stage: 'Offer',         daysInStage: 5,  slaThreshold: 5,  status: 'Breached' },
  { id: 'STU-0302', name: 'Binod Bhandari',       country: 'Nepal',      flag: '🇳🇵', program: 'BBA',         agent: 'Apex Consultancy',       stage: 'Application',   daysInStage: 3,  slaThreshold: 10, status: 'On Track' },
  { id: 'STU-0448', name: 'Amara Kamau',          country: 'Kenya',      flag: '🇰🇪', program: 'Nursing',     agent: 'Oasis Recruitment',      stage: 'Arrived',       daysInStage: 1,  slaThreshold: 3,  status: 'On Track' },
  { id: 'STU-0512', name: 'Liu Wei',              country: 'China',      flag: '🇨🇳', program: 'MBA',         agent: 'Direct',                 stage: 'Enrolled',      daysInStage: 0,  slaThreshold: 5,  status: 'On Track' },
  { id: 'STU-0634', name: 'Tariq Hassan',         country: 'Bangladesh', flag: '🇧🇩', program: 'MD Medicine', agent: 'Apex Consultancy',       stage: 'TRC',           daysInStage: 45, slaThreshold: 60, status: 'On Track' },
  { id: 'STU-0721', name: 'Adaeze Nwosu',         country: 'Nigeria',    flag: '🇳🇬', program: 'BBA',         agent: 'Zenith Admissions',      stage: 'Visa Applied',  daysInStage: 32, slaThreshold: 21, status: 'Breached' },
  { id: 'STU-0889', name: 'Ravi Krishnaswamy',    country: 'India',      flag: '🇮🇳', program: 'MBA',         agent: 'Global Education Group', stage: 'Fee Payment',   daysInStage: 2,  slaThreshold: 7,  status: 'On Track' },
  { id: 'STU-0912', name: 'Priya Mehta',          country: 'India',      flag: '🇮🇳', program: 'Nursing',     agent: 'Global Education Group', stage: 'Offer',         daysInStage: 1,  slaThreshold: 5,  status: 'On Track' },
];

export const DECREE_STUDENTS = [
  { id: 'STU-0042', name: 'Aravind Sharma',    country: 'India',   decreeStatus: 'Submitted — Awaiting Embassy',      daysWaiting: 12, urgency: 'Medium' },
  { id: 'STU-0118', name: 'Fatima Al-Rashidi', country: 'UAE',     decreeStatus: 'Missing — Not Uploaded',            daysWaiting: 0,  urgency: 'Critical' },
  { id: 'STU-0204', name: 'Benjamin Okonkwo',  country: 'Nigeria', decreeStatus: 'Rejected — Resubmission Required',  daysWaiting: 3,  urgency: 'Critical' },
  { id: 'STU-0302', name: 'Binod Bhandari',    country: 'Nepal',   decreeStatus: 'Approved',                          daysWaiting: 0,  urgency: 'None' },
];

export const LIFECYCLE_STAGES = [
  { stage: 'Application',  count: 5640,  pct: 100.0, sla: 'On Time',  owner: 'Admissions Office',  slaThreshold: 10, avgDays: 4.2 },
  { stage: 'Offer',        count: 3890,  pct: 69.0,  sla: 'Breached', owner: 'Academic Review',    slaThreshold: 5,  avgDays: 6.8 },
  { stage: 'Fee Payment',  count: 2840,  pct: 50.4,  sla: 'Breached', owner: 'Finance Office',     slaThreshold: 7,  avgDays: 9.1 },
  { stage: 'Visa Applied', count: 2210,  pct: 39.2,  sla: 'On Time',  owner: 'Visa Compliance',    slaThreshold: 21, avgDays: 18.4 },
  { stage: 'Arrived',      count: 1940,  pct: 34.4,  sla: 'On Time',  owner: 'Student Services',   slaThreshold: 3,  avgDays: 1.2 },
  { stage: 'Enrolled',     count: 1720,  pct: 30.5,  sla: 'On Time',  owner: 'Registrar Office',   slaThreshold: 5,  avgDays: 2.4 },
  { stage: 'TRC',          count: 1247,  pct: 22.1,  sla: 'On Time',  owner: 'International Office', slaThreshold: 60, avgDays: 42 },
];

// ─── LAYER 1 DATA ──────────────────────────────────────────────────────────────

export const INITIATIVES = [
  { name: 'Digital Transformation — CRM Integration',     status: 'On Track',  completion: 72, owner: 'VP Technology',             deadline: 'Sep 2026', risk: 'Low' },
  { name: 'New Campus — East Africa Expansion',           status: 'At Risk',   completion: 34, owner: 'Board Steering Committee',  deadline: 'Dec 2026', risk: 'High' },
  { name: 'Nursing Accreditation Renewal (WHO)',          status: 'On Track',  completion: 88, owner: 'Dean of Nursing',           deadline: 'Jul 2026', risk: 'Low' },
  { name: 'Scholarship Fund Endowment Drive',             status: 'Behind',    completion: 45, owner: 'Development Office',        deadline: 'Jun 2026', risk: 'Critical' },
  { name: 'Student Information System Upgrade',           status: 'On Track',  completion: 61, owner: 'IT Department',             deadline: 'Aug 2026', risk: 'Medium' },
  { name: 'Research Center Partnership — WHO',            status: 'On Track',  completion: 80, owner: 'VP Research',               deadline: 'Oct 2026', risk: 'Low' },
  { name: 'MBA AACSB Accreditation Application',          status: 'On Track',  completion: 55, owner: 'Business School Dean',      deadline: 'Jan 2027', risk: 'Medium' },
  { name: 'International Student Welfare Policy Update',  status: 'At Risk',   completion: 28, owner: 'Student Services VP',       deadline: 'Jul 2026', risk: 'High' },
];

export const GOV_CALENDAR = [
  { date: 'Jun 20, 2026', event: 'Board of Trustees — Quarterly Review',      type: 'Board Meeting',  urgency: 'High' },
  { date: 'Jun 25, 2026', event: 'WHO Nursing Accreditation Site Visit',       type: 'Accreditation',  urgency: 'Critical' },
  { date: 'Jul 01, 2026', event: 'Scholarship Fund Endowment Deadline',        type: 'Finance',        urgency: 'Critical' },
  { date: 'Jul 15, 2026', event: 'International Student Welfare Policy Submit',type: 'Compliance',     urgency: 'High' },
  { date: 'Aug 01, 2026', event: 'New Intake Enrollment Confirmation Deadline',type: 'Admissions',     urgency: 'High' },
  { date: 'Sep 30, 2026', event: 'Annual External Audit — Financial',          type: 'Audit',          urgency: 'Medium' },
];

export const ACADEMIC_PROGRAMS = [
  { program: 'MD (Medicine)',           faculty: 24, students: 480, gradRate: 91.2, satisfaction: 4.6, employRate: 98.4, accreditation: 'WHO Certified',        nextReview: 'Jul 2026', status: 'Excellent' },
  { program: 'B.Sc Nursing',           faculty: 18, students: 620, gradRate: 88.4, satisfaction: 4.4, employRate: 97.2, accreditation: 'National Board',        nextReview: 'Dec 2026', status: 'Excellent' },
  { program: 'MBA',                    faculty: 22, students: 540, gradRate: 84.1, satisfaction: 4.1, employRate: 92.8, accreditation: 'Candidate (AACSB)',     nextReview: 'Jan 2027', status: 'Good' },
  { program: 'BBA',                    faculty: 16, students: 820, gradRate: 81.2, satisfaction: 3.9, employRate: 88.4, accreditation: 'Nationally Accredited', nextReview: 'Mar 2027', status: 'Good' },
  { program: 'B.Sc Computer Science',  faculty: 14, students: 380, gradRate: 79.8, satisfaction: 4.0, employRate: 96.2, accreditation: 'Nationally Accredited', nextReview: 'Sep 2027', status: 'Good' },
  { program: 'Master of Public Health',faculty: 10, students: 180, gradRate: 92.1, satisfaction: 4.5, employRate: 91.4, accreditation: 'WHO Affiliate',         nextReview: 'Nov 2026', status: 'Excellent' },
];

export const COMPLIANCE_ISSUES = [
  { id: 'COMP-041', issue: 'Student visa tracking — 3 students unlocated post-arrival', area: 'Immigration',    severity: 'Critical', owner: 'International Office', daysOpen: 8,  deadline: 'Immediate' },
  { id: 'COMP-038', issue: 'GDPR data deletion request — 2 former students pending',    area: 'Data Protection',severity: 'High',     owner: 'IT/Legal',             daysOpen: 12, deadline: '5 days' },
  { id: 'COMP-034', issue: 'Agent contract renewal overdue — Apex Consultancy',         area: 'Agent Governance',severity: 'High',     owner: 'Registrar',            daysOpen: 21, deadline: 'Overdue' },
];

export const EXEC_ACTIONS = [
  { priority: 'Critical', layer: 'L2', action: 'STU-0204 Benjamin Okonkwo — Offer SLA breached 48hrs. Zenith portal freeze needed.', owner: 'Regional Director', dueIn: 'Today' },
  { priority: 'Critical', layer: 'L1', action: 'WHO Nursing accreditation site visit — Jun 25, 2026. Documentation package incomplete.', owner: 'Dean of Nursing', dueIn: '9 days' },
  { priority: 'Critical', layer: 'L1', action: 'Scholarship Fund Endowment — $4M gap vs target. Board escalation required.', owner: 'Development Office', dueIn: '15 days' },
  { priority: 'Critical', layer: 'L2', action: 'STU-0118 Fatima Al-Rashidi — Fee payment SLA breached. Ministry decree missing.', owner: 'Finance Office', dueIn: 'Today' },
  { priority: 'High',     layer: 'L3', action: 'Zenith Admissions visa approval 58.2% — portal restriction pending governance decision.', owner: 'VP Admissions', dueIn: 'Today' },
  { priority: 'High',     layer: 'L1', action: 'Agent contract renewal (Apex Consultancy) — 21 days overdue. Legal exposure risk.', owner: 'Registrar', dueIn: 'Overdue' },
  { priority: 'High',     layer: 'L3', action: 'Nigeria market fee-payment drop-off 18% — FX intervention required.', owner: 'Market Manager', dueIn: '3 days' },
  { priority: 'High',     layer: 'L1', action: '3 students unlocated post-arrival — immigration compliance breach (COMP-041).', owner: 'International Office', dueIn: 'Immediate' },
];

// ─── LEGACY DATA (preserved) ──────────────────────────────────────────────────

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
  'Visa Risk', 'Agent Portal', 'Scholarship', 'Finance Sync', 'Document AI',
  'Country Plan', 'Orientation', 'Compliance', 'Program Mix', 'Enrollment',
  'Audit Trail', 'Student Care', 'Forecasting', 'Hostel Accommodation'
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
  { country: 'India',      leads: 4800, apps: 2100, visa: 94.5, enroll: 88.2, revenue: '$38.2M', trend: 'Growing' },
  { country: 'Nigeria',    leads: 3200, apps: 1450, visa: 72.3, enroll: 78.0, revenue: '$22.4M', trend: 'Declining' },
  { country: 'UAE',        leads: 1800, apps: 820,  visa: 97.2, enroll: 91.5, revenue: '$21.6M', trend: 'Growing' },
  { country: 'Nepal',      leads: 1500, apps: 710,  visa: 85.0, enroll: 82.1, revenue: '$11.4M', trend: 'Growing' },
  { country: 'Bangladesh', leads: 1200, apps: 540,  visa: 78.1, enroll: 75.3, revenue: '$8.8M',  trend: 'Declining' },
  { country: 'Kenya',      leads: 950,  apps: 420,  visa: 91.8, enroll: 86.4, revenue: '$7.9M',  trend: 'Growing' },
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
  // ─ Legacy queries ─
  { question: 'Which students are waiting for finance approval?', keywords: ['finance', 'approval'], answer: '11 finance approvals are pending. Priority cases are MBA fee exceptions, Nursing scholarships, and two MD deposit waivers. Clear MBA first because it blocks visa filing.' },
  { question: 'Which agents have the highest visa risk?', keywords: ['agent', 'visa', 'risk'], answer: 'Zenith Admissions is critical at 58.2% visa success, followed by Apex Consultancy at 72.1%. Freeze Zenith new submissions and run an Apex document audit.' },
  { question: 'Which programs are underperforming?', keywords: ['program', 'underperforming'], answer: 'MBA is under target in Nigeria because of deposit friction and sponsor proof issues. Master of Data Science is behind because Nepal and Bangladesh visa processing exceeded 45 days.' },
  { question: 'Which market should we invest in next intake?', keywords: ['market', 'invest', 'intake'], answer: 'Invest in UAE, Kenya, and India tier-2 cities. UAE has high tuition yield and 97.2% visa success; Kenya is strong for Nursing; India remains the volume engine.' },
  { question: 'Show students awaiting ministry decree.', keywords: ['ministry', 'decree'], answer: 'Four students are waiting for ministry decree actions: STU-042 Aravind S., STU-118 Fatima A., STU-204 Benjamin O., and STU-302 Binod B. Benjamin is already breached by 48 hours.' },
  { question: 'Which documents are missing?', keywords: ['document', 'missing'], answer: 'Missing items include authenticated transcripts, English-proficiency evidence, sponsor bank statements, translated citizenship certificates, and two original high-school mark sheets.' },
  { question: 'How can we reduce application review SLA?', keywords: ['reduce', 'application', 'sla'], answer: 'Move South Asia applications to a same-day triage lane, assign three reviewers to the stale queue, and auto-escalate files untouched after 36 hours.' },
  { question: 'Which country has highest enrollment?', keywords: ['country', 'highest', 'enrollment'], answer: 'India has the highest enrollment volume with 2,100 applications, 1,650 offers, 88.2% enrollment rate, and $38.2M revenue.' },
  { question: 'Draft escalation note for overdue approvals.', keywords: ['draft', 'escalation', 'approval'], answer: 'Draft: Please confirm the decision owner, blocked cohort, SLA age, required approval, and recovery date by 5 PM today. This item is now a governance blocker for the June 2026 intake.' },
  // ─ University Governance (Layer 1) ─
  { question: 'Which campuses are at compliance risk?', keywords: ['campus', 'compliance', 'risk'], answer: 'Three compliance items are active. Immigration compliance is flagged at 84.1% — 3 students unlocated post-arrival. Agent contracts (Apex) are 21 days overdue. GDPR deletion requests are 12 days pending. Overall institutional score is 91.4%.' },
  { question: 'Which programs are approaching accreditation review?', keywords: ['accreditation', 'review', 'program'], answer: 'MD Medicine has a WHO site visit on June 25, 2026 — 9 days away. Documentation package must be completed by June 20. Master of Public Health review is November 2026. MBA AACSB candidacy application is due January 2027.' },
  { question: 'What is the financial health of the university?', keywords: ['financial', 'health', 'budget', 'revenue'], answer: 'Total annual revenue is $110.3M vs $102M budget — performing at 108.2%. Net surplus is $12.9M (11.7% margin). Outstanding receivables are $4.2M — Nigeria accounts for $1.2M. Scholarship fund has a $4M gap vs endowment target.' },
  // ─ Student Lifecycle (Layer 2) ─
  { question: 'Which students will breach visa SLA this week?', keywords: ['students', 'breach', 'visa', 'sla', 'week'], answer: 'STU-0721 Adaeze Nwosu (Nigeria/BBA/Zenith) is already 11 days over the 21-day visa SLA. STU-0042 Aravind Sharma (India/MD) is at day 14 of 21 — will breach Friday if no update. Escalate both to the Visa Compliance Lead immediately.' },
  { question: 'Which students are awaiting ministry decree?', keywords: ['ministry', 'decree', 'students', 'waiting'], answer: 'Four students await ministry decree action: STU-0042 Aravind Sharma (submitted, 12 days), STU-0118 Fatima Al-Rashidi (missing — Critical), STU-0204 Benjamin Okonkwo (rejected — resubmission required, Critical), STU-0302 Binod Bhandari (approved). Fatima and Benjamin are critical.' },
  { question: 'How many students are in each lifecycle stage?', keywords: ['students', 'lifecycle', 'stage', 'pipeline'], answer: 'Current pipeline: 5,640 applications → 3,890 offers → 2,840 fee paid → 2,210 visa applied → 1,940 arrived → 1,720 enrolled → 1,247 TRC completed. Biggest drop is Application to Offer (31%) and Fee to Visa (22.2%). Both need immediate review.' },
  // ─ Channel Governance (Layer 3) ─
  { question: 'Which agent has the highest visa approval rate?', keywords: ['agent', 'highest', 'visa', 'approval'], answer: 'Elite Scholars Ltd (Turkey) leads at 98.0% visa approval rate. Global Education Group (India) follows at 95.1%, and Oasis Recruitment Group (Kenya) at 94.3%. All three maintain Excellent compliance scores above 95%.' },
  { question: 'Which country generated the most enrollments this quarter?', keywords: ['country', 'enrollments', 'quarter'], answer: 'India leads with 1,465 enrollments this intake cycle and $38.2M revenue. UAE is second with 740 enrollments and $21.6M. Nepal shows strong growth at 582 enrollments. Nigeria has declined 18% due to forex and visa challenges.' },
  { question: 'Which admission channel has the highest ROI?', keywords: ['channel', 'roi', 'admission', 'return'], answer: 'Website Organic (Direct Admissions) has the highest ROI at 2,270% with only $44 cost per enrolled student. Email marketing is second at 844% ROI. LinkedIn Ads perform worst at 87% ROI with $1,148 cost per enrollment — recommend budget reallocation.' },
  { question: 'Which vendors are causing document quality issues?', keywords: ['vendors', 'document', 'quality', 'issues'], answer: 'Zenith Admissions is the worst performer with an F quality grade (63.7% overall) — 38.5% document rejection rate, 58.2% visa approval. Apex Consultancy has a C grade (75.7%) with 24.2% document rejection rate. Both require immediate audit intervention.' },
  { question: 'Which markets should we invest in next intake?', keywords: ['market', 'invest', 'intake', 'next'], answer: 'Invest in UAE (97.2% visa, $36k avg tuition, growing), Kenya (91.8% visa, excellent quality, 1,100% fair ROI), and India Tier-2 cities (volume engine, strong agent base). Reduce Nigeria exposure due to 72.3% visa rate and forex instability. Bangladesh needs payment method reform.' },
  { question: 'Why are MBA enrollments declining in West Africa?', keywords: ['mba', 'declining', 'west africa', 'nigeria'], answer: 'MBA enrollments from West Africa (primarily Nigeria) have declined 22% this intake. Root causes: (1) FX guidelines restricting international wire transfers, (2) MBA deposit requirement ($4,500) exceeding student forex access limits, (3) Zenith Admissions — primary Nigeria agent — has a 58.2% visa approval rate. Recommend split-payment options and alternative settlement portals.' },
  { question: 'What is the best performing education fair?', keywords: ['fair', 'event', 'best', 'performing'], answer: 'Kenya Education Summit (Nairobi, May 2026) has the highest ROI at 1,100% with only $91 cost per enrollment. Nepal University Fair is second at 933% ROI. London StudyWorld has the worst ROI at 78% — this event should be dropped or replaced with targeted stakeholder meetings.' },
  { question: 'Which digital platform drives the best quality applications?', keywords: ['digital', 'platform', 'quality', 'applications'], answer: 'Google Ads drives the highest quality applications with 312 applications at $301 CPA, and strong conversion to enrollment. LinkedIn delivers the best lead-to-enrollment conversion rate among paid platforms at 22% (though high CPA of $1,148). Meta/Facebook generates volume but moderate quality. SEO/Organic remains the unbeaten champion at $44 cost per enrollment.' },
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
      direct:  { apps: 45,  enroll: '85.0%', rev: '$1.8M', roi: '80.0%', note: 'Slow conversion pace but high retention loyalty.' },
      agents:  { apps: 185, enroll: '91.2%', rev: '$7.4M', roi: '56.8%', note: 'Highest absolute recruiter for MD; Global Ed Group generates 55%.' },
      offices: { apps: 62,  enroll: '89.0%', rev: '$2.5M', roi: '43.3%', note: 'Stable admissions through UAE Regional Office.' },
      digital: { apps: 18,  enroll: '72.1%', rev: '$0.7M', roi: '26.6%', note: 'High customer acquisition spend per seat.' },
      fairs:   { apps: 35,  enroll: '78.5%', rev: '$1.4M', roi: '30.0%', note: 'Yields high academic eligibility prospects.' }
    },
    {
      program: 'Nursing',
      direct:  { apps: 90,  enroll: '82.1%', rev: '$2.2M', roi: '80.0%', note: 'Steady domestic and direct international interest.' },
      agents:  { apps: 240, enroll: '90.1%', rev: '$5.8M', roi: '56.8%', note: 'Oasis Recruitment Group manages strong Nursing pipelines.' },
      offices: { apps: 45,  enroll: '79.2%', rev: '$1.1M', roi: '43.3%', note: 'Under-utilized regional recruitment staff.' },
      digital: { apps: 32,  enroll: '75.0%', rev: '$0.8M', roi: '26.6%', note: 'Targeted LinkedIn campaigns showing fair ROI.' },
      fairs:   { apps: 50,  enroll: '78.2%', rev: '$1.2M', roi: '30.0%', note: 'Strong physical engagement conversion.' }
    },
    {
      program: 'BBA',
      direct:  { apps: 120, enroll: '78.4%', rev: '$2.4M', roi: '80.0%', note: 'High direct traffic from organic Google rankings.' },
      agents:  { apps: 310, enroll: '74.1%', rev: '$6.2M', roi: '56.8%', note: 'Volume recruitment, but moderate visa dropouts.' },
      offices: { apps: 85,  enroll: '86.4%', rev: '$1.7M', roi: '43.3%', note: 'Best-performing channel for BBA; India Regional Office leads.' },
      digital: { apps: 110, enroll: '70.2%', rev: '$2.2M', roi: '26.6%', note: 'Meta Ads target younger demographic successfully.' },
      fairs:   { apps: 40,  enroll: '72.5%', rev: '$0.8M', roi: '30.0%', note: 'Fair conversion rate from regional event booths.' }
    },
    {
      program: 'MBA',
      direct:  { apps: 145, enroll: '88.2%', rev: '$4.4M', roi: '80.0%', note: 'Executive applicants prefer applying directly.' },
      agents:  { apps: 125, enroll: '78.0%', rev: '$3.8M', roi: '56.8%', note: 'Declining in West Africa due to FX guidelines.' },
      offices: { apps: 78,  enroll: '85.0%', rev: '$2.3M', roi: '43.3%', note: 'Corporate tie-ups by UAE Regional Office driving growth.' },
      digital: { apps: 68,  enroll: '75.3%', rev: '$2.0M', roi: '26.6%', note: 'Google Search Ads for "Executive MBA" convert well.' },
      fairs:   { apps: 30,  enroll: '72.0%', rev: '$0.9M', roi: '30.0%', note: 'Moderate yield due to high executive price sensitivity.' }
    }
  ]
};
