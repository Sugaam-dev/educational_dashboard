import { buddyTemplates, funnelStages } from '../data/dashboardData';

export function findBuddyAnswer(text) {
  const normalized = text.toLowerCase();

  // Intercept status queries for funnel gates
  if (normalized.includes('gate')) {
    const matchedStage = funnelStages.find((stage) => 
      normalized.includes(stage.label.toLowerCase())
    );
    if (matchedStage) {
      const otherOptions = funnelStages
        .filter((stage) => stage.label !== matchedStage.label)
        .map((stage) => `• ${stage.label} (Value: ${stage.value}, Owner: ${stage.owner})`)
        .join('\n');

      return {
        question: text,
        answer: `The **${matchedStage.label}** gate currently has **${matchedStage.value}** records in queue. There are **${matchedStage.sla}** SLA exceptions. It is managed by the **${matchedStage.owner}** team.\n\nHere are other available gate options you can query:\n${otherOptions}`
      };
    }
  }

  const exact = buddyTemplates.find((item) => item.question.toLowerCase() === normalized);
  if (exact) return exact;

  let best = buddyTemplates[0];
  let bestScore = 0;
  for (const item of buddyTemplates) {
    const score = item.keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? 1 : 0), 0);
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }

  if (bestScore === 0) {
    return {
      question: text,
      answer: 'I can help with finance approvals, visa SLA, agents, underperforming programs, ministry decree students, missing documents, country performance, and escalation notes. Try one of the template questions.'
    };
  }
  return best;
}

