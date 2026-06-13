// Mock datasets for the 360° International Education Governance Platform

export const INSTITUTIONAL_METRICS = {
  complianceScore: 94.2,
  complianceTrend: '+1.5%',
  complianceStatus: 'excellent', // excellent, warning, critical
  academicPerformance: 91.5,
  academicTrend: '+0.8%',
  financialHealth: {
    revenue: 148200000, // $148.2M
    growth: '+12.4%',
    budgetUtilization: 88.5
  },
  strategicInitiatives: {
    active: 8,
    onTrack: 7,
    delayed: 1
  },
  researchPerformance: 88.9,
  researchTrend: '+3.2%'
};

export const ALERTS = [
  {
    id: 1,
    type: 'critical',
    category: 'Agent Compliance',
    message: 'Zenith Admissions visa rejection rate at 42% (Threshold: 15%)',
    action: 'Freeze agent portal',
    time: '10 mins ago'
  },
  {
    id: 2,
    type: 'warning',
    category: 'SLA Breach',
    message: '84 applications pending review > 72h SLA for South Asia Channel',
    action: 'Reallocate reviewers',
    time: '1 hour ago'
  },
  {
    id: 3,
    type: 'warning',
    category: 'Document Rejection',
    message: 'Apex Consultancy document rejection rate climbed to 24% this week',
    action: 'Audit submitted transcripts',
    time: '3 hours ago'
  },
  {
    id: 4,
    type: 'info',
    category: 'Strategic Alert',
    message: 'Ministry of Education changes to post-study work visas starting Q4',
    action: 'Update policy sheets',
    time: '1 day ago'
  }
];

export const FUNNEL_STAGES = [
  { stage: 'Lead', count: 14250, conversion: 100 },
  { stage: 'Inquiry', count: 9840, conversion: 69.1 },
  { stage: 'Application', count: 6420, conversion: 45.1 },
  { stage: 'Conditional Offer', count: 4810, conversion: 33.8 },
  { stage: 'Fee Payment', count: 3290, conversion: 23.1 },
  { stage: 'Visa Application', count: 2950, conversion: 20.7 },
  { stage: 'Arrival', count: 2410, conversion: 16.9 },
  { stage: 'Enrollment', count: 2350, conversion: 16.5 },
  { stage: 'TRC Settlement', count: 1980, conversion: 13.9 }
];

export const FUNNEL_TRANSITIONS = [
  { from: 'Lead', to: 'Inquiry', rate: 69.1, count: 9840, drop: 4410 },
  { from: 'Inquiry', to: 'Application', rate: 65.2, count: 6420, drop: 3420 },
  { from: 'Application', to: 'Conditional Offer', rate: 74.9, count: 4810, drop: 1610 },
  { from: 'Conditional Offer', to: 'Fee Payment', rate: 68.4, count: 3290, drop: 1520 },
  { from: 'Fee Payment', to: 'Visa Application', rate: 89.7, count: 2950, drop: 340 },
  { from: 'Visa Application', to: 'Arrival', rate: 81.7, count: 2410, drop: 540 },
  { from: 'Arrival', to: 'Enrollment', rate: 97.5, count: 2350, drop: 60 },
  { from: 'Enrollment', to: 'TRC Settlement', rate: 84.3, count: 1980, drop: 370 }
];

export const AGENT_DATA = [
  {
    id: 'A001',
    name: 'Global Education Group',
    applications: 1240,
    offerRate: 82.3,
    visaRate: 95.1,
    enrollmentRate: 91.2,
    revenue: 18400000,
    complianceScore: 98.4,
    status: 'Excellent',
    pendingSla: 4,
    missingDocRate: 2.1
  },
  {
    id: 'A002',
    name: 'Beacon International',
    applications: 890,
    offerRate: 75.1,
    visaRate: 88.4,
    enrollmentRate: 85.0,
    revenue: 12100000,
    complianceScore: 92.0,
    status: 'Good',
    pendingSla: 8,
    missingDocRate: 4.8
  },
  {
    id: 'A003',
    name: 'Apex Consultancy',
    applications: 650,
    offerRate: 68.2,
    visaRate: 72.1,
    enrollmentRate: 78.4,
    revenue: 8900000,
    complianceScore: 74.5,
    status: 'High Risk',
    pendingSla: 18,
    missingDocRate: 24.2
  },
  {
    id: 'A004',
    name: 'Oasis Recruitment Group',
    applications: 480,
    offerRate: 85.0,
    visaRate: 94.3,
    enrollmentRate: 90.1,
    revenue: 7200000,
    complianceScore: 96.8,
    status: 'Excellent',
    pendingSla: 3,
    missingDocRate: 3.0
  },
  {
    id: 'A005',
    name: 'Zenith Admissions',
    applications: 340,
    offerRate: 90.2,
    visaRate: 58.2,
    enrollmentRate: 74.1,
    revenue: 3800000,
    complianceScore: 65.0,
    status: 'Critical Risk',
    pendingSla: 32,
    missingDocRate: 38.5
  },
  {
    id: 'A006',
    name: 'Elite Scholars Ltd',
    applications: 210,
    offerRate: 60.5,
    visaRate: 98.0,
    enrollmentRate: 82.3,
    revenue: 3100000,
    complianceScore: 89.2,
    status: 'Good',
    pendingSla: 2,
    missingDocRate: 6.2
  }
];

export const COUNTRY_DATA = [
  { country: 'India', leads: 4800, applications: 2100, offers: 1650, visaRate: 94.5, enrollmentRate: 88.2, revenue: 38200000, trend: 'up' },
  { country: 'Nigeria', leads: 3200, applications: 1450, offers: 1080, visaRate: 72.3, enrollmentRate: 78.0, revenue: 22400000, trend: 'down' },
  { country: 'UAE', leads: 1800, applications: 820, offers: 640, visaRate: 97.2, enrollmentRate: 91.5, revenue: 21600000, trend: 'up' },
  { country: 'Nepal', leads: 1500, applications: 710, offers: 510, visaRate: 85.0, enrollmentRate: 82.1, revenue: 11400000, trend: 'up' },
  { country: 'Bangladesh', leads: 1200, applications: 540, offers: 390, visaRate: 78.1, enrollmentRate: 75.3, revenue: 8800000, trend: 'down' },
  { country: 'Kenya', leads: 950, applications: 420, offers: 320, visaRate: 91.8, enrollmentRate: 86.4, revenue: 7900000, trend: 'up' },
  { country: 'Turkey', leads: 800, applications: 380, offers: 220, visaRate: 93.5, enrollmentRate: 89.0, revenue: 6400000, trend: 'stable' }
];

export const CHANNEL_ROIS = [
  { name: 'Direct Admissions', leads: 2500, applications: 1200, enrollment: 480, spend: 120000, revenue: 9600000, roi: 80.0, conversionRate: 19.2 },
  { name: 'Vendor / Agents', leads: 6500, applications: 3100, enrollment: 1280, spend: 450000, commission: 320000, revenue: 25600000, roi: 56.8, conversionRate: 19.6 },
  { name: 'Regional Offices', leads: 2200, applications: 1120, enrollment: 390, spend: 180000, revenue: 7800000, roi: 43.3, conversionRate: 17.7 },
  { name: 'Digital Campaigns', leads: 3050, applications: 1000, enrollment: 200, spend: 150000, revenue: 4000000, roi: 26.6, conversionRate: 6.5 }
];

// Matrix representing Program (rows) x Channel (columns)
// Columns: Direct, Agents, Regional Offices, Digital Campaigns
export const PROGRAM_CHANNEL_MATRIX = {
  headers: ['Program', 'Direct', 'Agents', 'Regional Offices', 'Digital Campaigns'],
  rows: [
    {
      program: 'MD (Doctor of Medicine)',
      direct: { count: 45, revenue: '$1.8M', conversion: '12.4%', score: 'high', note: 'Direct site leads convert slow but high loyalty' },
      agents: { count: 185, revenue: '$7.4M', conversion: '18.2%', score: 'best', note: 'Highest recruiter for MD; Global Ed Group generates 55%' },
      regionalOffices: { count: 62, revenue: '$2.5M', conversion: '15.1%', score: 'stable', note: 'Solid applications from UAE Regional Office' },
      digitalCampaigns: { count: 18, revenue: '$0.7M', conversion: '4.8%', score: 'low', note: 'High cost per acquisition; bad campaign target' }
    },
    {
      program: 'Nursing',
      direct: { count: 90, revenue: '$2.2M', conversion: '18.1%', score: 'stable', note: 'Steady domestic and direct international interest' },
      agents: { count: 240, revenue: '$5.8M', conversion: '20.5%', score: 'best', note: 'Oasis Recruitment has strong Nursing pipelines' },
      regionalOffices: { count: 45, revenue: '$1.1M', conversion: '11.2%', score: 'low', note: 'Under-utilized regional recruitment staff' },
      digitalCampaigns: { count: 32, revenue: '$0.8M', conversion: '8.4%', score: 'stable', note: 'Targeted LinkedIn campaigns showing fair ROI' }
    },
    {
      program: 'BBA (Bachelor of Business Admin)',
      direct: { count: 120, revenue: '$2.4M', conversion: '15.6%', score: 'stable', note: 'High direct traffic from organic Google rankings' },
      agents: { count: 310, revenue: '$6.2M', conversion: '14.8%', score: 'stable', note: 'Volume recruitment, but moderate visa dropouts' },
      regionalOffices: { count: 85, revenue: '$1.7M', conversion: '19.4%', score: 'best', note: 'Best-performing market for BBA; India Regional Office leads' },
      digitalCampaigns: { count: 110, revenue: '$2.2M', conversion: '10.2%', score: 'stable', note: 'Meta Ads target younger demographic successfully' }
    },
    {
      program: 'MBA (Master of Business Admin)',
      direct: { count: 145, revenue: '$4.4M', conversion: '22.1%', score: 'best', note: 'Executive applicants prefer applying directly' },
      agents: { count: 125, revenue: '$3.8M', conversion: '12.4%', score: 'low', note: 'Declining in West Africa due to high deposit requirement' },
      regionalOffices: { count: 78, revenue: '$2.3M', conversion: '17.8%', score: 'stable', note: 'Corporate tie-ups by UAE Regional Office driving growth' },
      digitalCampaigns: { count: 68, revenue: '$2.0M', conversion: '11.5%', score: 'stable', note: 'Google Search Ads for "Executive MBA" convert well' }
    }
  ]
};

// Seed questions and responses for the AI Assistant
export const AI_BUDDY_KNOWLEDGE = [
  {
    keywords: ['compliance', 'campuses', 'risk'],
    question: 'Which campuses are at compliance risk?',
    answer: `### Campus Compliance Risk Assessment

Based on the latest audit (updated 2 hours ago), our compliance status is generally stable but highlights specific areas of attention:

| Campus Location | Risk Level | Primary Risk Vector | Affected Partner Agencies | Corrective Action |
| :--- | :--- | :--- | :--- | :--- |
| **Main Campus** | <span class="px-2 py-0.5 text-xs font-semibold rounded bg-green-100 text-green-800 border border-green-200">Low</span> | N/A | None | Routine monitoring |
| **West Wing Extension** | <span class="px-2 py-0.5 text-xs font-semibold rounded bg-rose-100 text-rose-800 border border-rose-200">High</span> | Missing English Proficiency Test Audits | Zenith Admissions (32 cases) | Mandatory audit freeze on Zenith registrations |
| **Downtown Medical Center** | <span class="px-2 py-0.5 text-xs font-semibold rounded bg-amber-100 text-amber-800 border border-amber-200">Medium</span> | Clinical Placement Ratio SLA | Direct Intake | Increase host clinic contracts by 15% |

> [!WARNING]
> Regulatory warning: The West Wing Extension will undergo institutional inspection in 18 days. The English Proficiency Audits must be completed before **June 30, 2026**.`
  },
  {
    keywords: ['programs', 'underperforming'],
    question: 'Which programs are underperforming?',
    answer: `### Program Performance Analysis (Q2 2026)

Underperformance is evaluated based on a composite score of **Enrollment Rate**, **Visa Success Rate**, and **Revenue Target Margins**.

1. **MBA (Master of Business Administration)**
   - **Target Enrollment**: 450 students | **Actual**: 416 students (<span class="text-rose-600 font-semibold">-7.5%</span>)
   - **Underperforming Market**: Nigeria (Down 24% YoY due to currency volatility and higher upfront deposits).
   - **Primary Channel Gap**: Agents (conversion dropped from 16.4% to 12.4%).

2. **Nursing (B.Sc)**
   - **Target Enrollment**: 350 students | **Actual**: 407 students (<span class="text-green-600 font-semibold">+16.3%</span>) - *Note: High demand, but facing capacity cap.*
   - **Bottleneck**: Clinical placement compliance issues ( downtown capacity constraint).

3. **Master of Data Science (MDS)**
   - **Target Enrollment**: 200 students | **Actual**: 160 students (<span class="text-rose-600 font-semibold">-20%</span>)
   - **Root Cause**: Visa SLA delays. Nepal & Bangladesh visa processing times exceeded 45 days.

**Recommendation**: Reallocate $60k digital ad budget from MDS to BBA which has a higher conversion-to-enrollment speed.`
  },
  {
    keywords: ['ministry', 'decree', 'awaiting'],
    question: 'Show students awaiting ministry decree.',
    answer: `### Students Awaiting Ministry Decree Approval

There are currently **4 students** whose international enrollment is blocked pending Ministry of Education Equivalency Decrees. 

| Student ID | Name | Country | Program | Sponsor Agency | SLA Status | Action Required |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **STU-2026-092** | Aravind Swamy | India | MD | Global Education Group | <span class="text-amber-600 font-semibold">12h left</span> | Upload certified 12th Board marksheet |
| **STU-2026-118** | Fatima Al-Hashemi | UAE | BBA | Direct | <span class="text-green-600 font-semibold">4 days left</span> | Pending ministry verification queue |
| **STU-2026-204** | Benjamin Okoro | Nigeria | MBA | Zenith Admissions | <span class="text-rose-600 font-semibold">Breached (48h)</span> | Resubmit authenticated transcript |
| **STU-2026-302** | Binod Bhandari | Nepal | MD | Apex Consultancy | <span class="text-amber-600 font-semibold">6h left</span> | Upload citizenship certificate translation |

*Note: Double click on any student row in your dashboard to trigger a direct email request to the coordinating partner.*`
  },
  {
    keywords: ['visa', 'sla', 'breach', 'this week'],
    question: 'Which students will breach visa SLA this week?',
    answer: `### Visa Process SLA Watchlist

The following students are within 48 hours of breaching their processing SLA or have already breached it:

*   **STU-2026-441: Priyadharshini K.** (India, BBA)
    *   *Channel*: Direct Campaign
    *   *SLA State*: <span class="text-rose-600 font-semibold">Critical Breach (Delayed by 72h)</span>
    *   *Blocker*: Embassy requested original sponsor tax return.
    *   *Resolution*: Finance Director approved alternative bank escrow deposit. Documents sent to embassy.
*   **STU-2026-204: Benjamin Okoro** (Nigeria, MBA)
    *   *Channel*: Zenith Admissions
    *   *SLA State*: <span class="text-rose-600 font-semibold">Breached (48h)</span>
    *   *Blocker*: Awaiting certified English translation of baccalaureate papers.
*   **STU-2026-877: Sarah Lin** (Turkey, MD)
    *   *Channel*: Regional Office (Istanbul)
    *   *SLA State*: <span class="text-amber-600 font-semibold">Warning (24h remaining)</span>
    *   *Blocker*: Embassy interview scheduled for June 15. Requires updated sponsorship confirmation letter.
    *   *Action*: Auto-generated letter dispatched to student.`
  },
  {
    keywords: ['highest', 'visa', 'approval', 'agent'],
    question: 'Which agent has the highest visa approval rate?',
    answer: `### Top Recruiter by Visa Approval Success

The recruiter with the highest visa success rate is:

**Elite Scholars Ltd**
*   **Visa Success Rate**: <span class="text-green-600 font-bold text-lg">98.0%</span>
*   **Applications Submitted**: 210
*   **Offers Issued**: 127
*   **Total Enrollments**: 104
*   **Key Advantage**: Extremely rigorous pre-screening of finances. They reject 40% of applicants internally before submitting to our system.

**Runner Up**:
*   **Global Education Group**
    *   *Visa Success Rate*: **95.1%** (on a volume of 1,240 applications, yielding $18.4M in revenue). This remains our most valuable partner in absolute numbers.`
  },
  {
    keywords: ['most', 'enrollments', 'country'],
    question: 'Which country generated the most enrollments this quarter?',
    answer: `### Enrollment Volumes by Market (Current Intake)

**India** is our top market by a significant margin:

*   **Leads Generated**: 4,800
*   **Applications**: 2,100
*   **Offers Issued**: 1,650
*   **Enrollment Rate**: 88.2%
*   **Total Enrolled Students**: **1,455**
*   **Revenue Generated**: **$38.2M** (highest in the portfolio)
*   **Primary Driving Channel**: Recruitment Partners & Direct Organic Search.

**Comparison Matrix**:
1.  **India**: 1,455 enrolled ($38.2M)
2.  **Nigeria**: 842 enrolled ($22.4M) - *Note: High conversion drop at fee payment phase.*
3.  **UAE**: 585 enrolled ($21.6M) - *Note: Highest per-student average tuition fee.*`
  },
  {
    keywords: ['roi', 'channel', 'highest'],
    question: 'Which admission channel has the highest ROI?',
    answer: `### Admission Channel Return-on-Investment (ROI)

ROI is calculated as: \`(Tuition Revenue - Marketing/Agent Spend) / Marketing/Agent Spend * 100\`

1.  **Direct Admissions**
    *   *Total Spend*: $120,000 (Website SEO, content team, direct response ads)
    *   *Revenue*: $9,600,000
    *   *Conversion-to-Enrollment*: 19.2%
    *   **ROI**: <span class="text-green-600 font-bold text-lg">8,000%</span> (extremely high due to zero agent commission payouts).
2.  **Vendor / Agents**
    *   *Total Spend*: $770,000 ($450,000 operational + $320,000 commissions)
    *   *Revenue*: $25,600,000
    *   *Conversion-to-Enrollment*: 19.6%
    *   **ROI**: **3,324%** (highest in *absolute volume* but carries higher compliance risk).
3.  **Regional Recruitment Offices**
    *   *Total Spend*: $180,000 (Local leases & local staff salaries)
    *   *Revenue*: $7,800,000
    *   *Conversion-to-Enrollment*: 17.7%
    *   **ROI**: **4,233%**.
4.  **Digital Marketing Campaigns**
    *   *Total Spend*: $150,000 (Direct ad spend on Google/Meta)
    *   *Revenue*: $4,000,000
    *   *Conversion-to-Enrollment*: 6.5%
    *   **ROI**: **2,566%** (lower conversion due to broad funnel leakage).`
  },
  {
    keywords: ['document', 'quality', 'vendors', 'issues'],
    question: 'Which vendors are causing document quality issues?',
    answer: `### Document Quality Issues and Vendor Flag Report

Our compliance engine flags vendors when their application rejection rate due to missing, fraudulent, or poorly translated documents exceeds the **8% safety threshold**.

1.  **Zenith Admissions** (Flag: <span class="text-rose-600 font-semibold">Critical Risk</span>)
    *   *Total Applications*: 340
    *   *Document Rejection Rate*: <span class="text-rose-600 font-bold">38.5%</span> (131 cases flagged)
    *   *Primary Issues*: Outdated high school transcript formats, missing proof of funds statements.
    *   *Action*: System block active. Review of all pending applications mandated.
2.  **Apex Consultancy** (Flag: <span class="text-amber-600 font-semibold">High Warning</span>)
    *   *Total Applications*: 650
    *   *Document Rejection Rate*: <span class="text-amber-600 font-bold">24.2%</span> (157 cases flagged)
    *   *Primary Issues*: Unauthenticated English test credentials, sponsor statement signature mismatch.
3.  **Beacon International** (Flag: <span class="text-green-600 font-semibold">Satisfactory</span>)
    *   *Total Applications*: 890
    *   *Document Rejection Rate*: **4.8%** (Within threshold).`
  },
  {
    keywords: ['invest', 'next', 'intake', 'markets'],
    question: 'Which markets should we invest in next intake?',
    answer: `### Strategic Market Investment Recommendation (Q3/Q4 Intake)

Based on country-specific conversion rate acceleration, high visa approvals, and low documentation friction:

#### 1. UAE & Gulf Region (Target: High-Value Direct Admissions)
*   **Visa Success Rate**: 97.2%
*   **Average Student Revenue**: $36,920 (Premium pricing eligibility)
*   **Trend**: +12.5% applications YoY with zero document fraud risk.
*   **Action**: Setup a regional event in Dubai and recruit 1 additional Country Manager.

#### 2. Kenya (Target: Allied Health Programs)
*   **Visa Success Rate**: 91.8%
*   **Conversion Speed**: Average 18 days from application to enrollment.
*   **Trend**: Rising demand for Nursing and BBA.
*   **Action**: Expand agent contracts (Oasis Recruitment) with localized pricing support.

#### 3. India (Tier 2/3 Cities)
*   **Volume Capacity**: High capacity but requires strict screening.
*   **Action**: Partner only with pre-approved agents (Global Ed Group) to maintain low visa risk.`
  },
  {
    keywords: ['why', 'declining', 'mba', 'region'],
    question: 'Why are MBA enrollments declining in a specific region?',
    answer: `### West Africa (Nigeria) MBA Enrollment Decline Report

MBA applications from Nigeria have experienced a **24% decline** over the past two intakes. Analysis indicates the following primary drivers:

1.  **Currency Devaluation (Naira Volatility)**
    *   The effective tuition cost in local currency increased by 80% due to Forex market adjustments.
    *   *Impact*: Applicants are failing to meet the financial solvency requirements for visas.
2.  **Sponsor Proof Guidelines**
    *   Embassy rules changed requiring immediate family-only sponsorship or escrow bank confirmation.
    *   *Result*: Zenith Admissions (our primary agent in Nigeria) saw a 42% visa rejection rate due to "insufficient financial proof".
3.  **Regional Competitor Pricing**
    *   Competitors in the UK/Canada are offering flexible tuition deposits ($1,500 compared to our current $5,000 requirement).

**Proposed Remediation**:
*   Implement a verified escrow payment plan for West African students.
*   Reduce deposit threshold to $2,500 for candidates with verified 1st-class undergraduate honors.`
  }
];

export const searchBuddyKnowledge = (query) => {
  if (!query) return null;
  const lowercaseQuery = query.toLowerCase();
  
  // Try to find matching keyword combination
  for (const item of AI_BUDDY_KNOWLEDGE) {
    const matched = item.keywords.every(keyword => lowercaseQuery.includes(keyword));
    if (matched) return item;
  }
  
  // Try fuzzy matching on individual keywords
  let bestMatch = null;
  let maxMatches = 0;
  for (const item of AI_BUDDY_KNOWLEDGE) {
    let matchCount = 0;
    for (const keyword of item.keywords) {
      if (lowercaseQuery.includes(keyword)) {
        matchCount++;
      }
    }
    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      bestMatch = item;
    }
  }
  
  if (maxMatches >= 2 && bestMatch) {
    return bestMatch;
  }
  
  // Return a generic intelligent response if no match is found
  return {
    question: query,
    answer: `### AI Governance Helper Analysis

I've scanned the governance database for your inquiry: **"${query}"**.

While I don't have a pre-seeded executive summary matching those exact parameters, I can report the following cross-referenced data points from the platform:

1.  **Platform Health**: Compliance is currently sitting at **94.2%** with **8 active projects** in high-density governance control.
2.  **Visa SLA Watchlist**: 3 agencies are under audit review due to threshold breaches (Zenith, Apex).
3.  **Active Recruitment Funnel**: Total leads in play stand at **14,250**, converting down to **2,350 enrollments** (16.5% overall efficiency).

For specific details, please ask a question related to:
*   *Campuses compliance risk*
*   *Underperforming programs*
*   *Students awaiting ministry decrees*
*   *Visa SLA breaches this week*
*   *Agents with highest visa approval rates*
*   *High-risk vendors and document issues*
*   *Market expansion opportunities for next intake*`
  };
};
