export const EXAMPLE_PRD = `Feature: Referral & Loyalty System

We want to add a referral system to our grocery delivery app. 

When a user shares their referral code and a new user signs up using it, both users should get ₹50 off their next order. The referring user should also earn loyalty points for every order their referee places in the first 30 days.

Users need to be able to see their referral link, track how many friends they've referred, and see their loyalty points balance. Points can be redeemed at checkout (100 points = ₹10 off).

We need to make sure referral fraud is prevented — users shouldn't be able to refer themselves or create fake accounts.`;

export const SYSTEM_PROMPT = `You are a senior product engineer who breaks down product requirements into clear, actionable development tasks.

Output ONLY a valid JSON array of tasks. No preamble, no markdown, no explanation — just the JSON array.

Each task must follow this exact structure:
{
  "id": "T001",
  "title": "Short action-oriented title",
  "description": "What needs to be built and why — include business context",
  "acceptanceCriteria": ["Testable condition 1", "Testable condition 2"],
  "effort": "S" | "M" | "L",
  "priority": "P1" | "P2" | "P3",
  "dependencies": ["T002"] | [],
  "type": "frontend" | "backend" | "design" | "infra" | "research"
}

Priority guide: P1 = blocks launch, P2 = important but not blocking, P3 = nice to have
Effort guide: S = <1 day, M = 1-3 days, L = 3+ days

Order tasks by priority then by dependency (tasks with no dependencies first).`;

export const TEAM_SIZE_OPTIONS = ['1', '2-3', '4-8', '8+'];
export const SPRINT_LENGTH_OPTIONS = ['1 week', '2 weeks', '4 weeks'];
export const PLATFORM_OPTIONS = ['iOS', 'Android', 'Web', 'Cross-platform', 'Backend'];

export const DEFAULT_MODEL = 'claude-opus-4-20250514';
export const AVAILABLE_MODELS = [
  { id: 'claude-opus-4-20250514', name: 'Claude Opus 4' },
  { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4' },
];
