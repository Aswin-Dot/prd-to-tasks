# prd-to-tasks

**Paste a product requirement, get structured dev tasks with context, priority, and effort — ready to drop into Jira or Notion.**

---

## Origin Story

Built because writing PRDs and then re-explaining them to engineers wastes hours every sprint. This bridges the gap — product thinking in, dev-ready tasks out.

You paste a rough idea, a full PRD, or anything in between. Claude thinks through your requirement and breaks it into actionable tasks with:

- Clear acceptance criteria
- Effort estimates (S/M/L)
- Priority levels (P1/P2/P3)
- Task dependencies
- Type tags (frontend, backend, design, infra, research)

No more back-and-forth. No more "what does this mean?" Just paste and go.

---

## Getting Started

### Prerequisites

- Node.js 18+
- An Anthropic API key ([get one free](https://console.anthropic.com/settings/keys))

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Aswin-Dot/prd-to-tasks.git
cd prd-to-tasks

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Add Your API Key

1. Click the ⚙️ Settings icon in the top right
2. Paste your Anthropic API key (starts with `sk-ant-...`)
3. Click Save

Your key is stored locally in your browser and only sent directly to Anthropic's API.

---

## Example Output

Here's what you get when you paste a referral system PRD:

### T001: Create referral code generation service

**Priority:** P1 | **Effort:** M | **Type:** backend

Generate unique 8-character referral codes for each user on signup. Codes must be collision-resistant and human-readable (no 0/O/I/l confusion).

**Acceptance Criteria:**
- [ ] Each user has exactly one referral code
- [ ] Codes are unique across all users  
- [ ] Collision handling with retry logic

**Dependencies:** none

---

### T002: Build referral tracking database schema

**Priority:** P1 | **Effort:** S | **Type:** backend

Design and implement database tables to track referral relationships, including who referred whom, timestamps, and status (pending, credited, expired).

**Acceptance Criteria:**
- [ ] Schema supports referrer → referee relationship
- [ ] Timestamps for signup and first order
- [ ] Status field for tracking credit state

**Dependencies:** none

---

### T003: Implement fraud detection rules

**Priority:** P1 | **Effort:** L | **Type:** backend

Prevent referral abuse by detecting self-referrals, device fingerprint matches, and suspicious signup patterns from the same IP/location.

**Acceptance Criteria:**
- [ ] Block same device/browser fingerprint
- [ ] Flag multiple signups from same IP within 24h
- [ ] Detect matching payment methods between accounts

**Dependencies:** T001, T002

---

## Export Options

- **Copy Markdown** — Formatted task list ready for documentation
- **Download JSON** — Raw data for custom integrations
- **Copy for Notion** — Table format that pastes perfectly into Notion

---

## Tech Stack

- **React + Vite** — Fast dev experience
- **Tailwind CSS** — Utility-first styling
- **Anthropic Claude API** — Task generation with streaming
- **No backend** — API key stored locally, calls made directly to Anthropic

---

## Live Demo

**[aswin-dot.github.io/prd-to-tasks](https://aswin-dot.github.io/prd-to-tasks)**

---

## License

MIT

---

## Contributing

Issues and PRs welcome. If you're adding features, please:

1. Keep the UI clean and minimal
2. Maintain the two-panel layout
3. Test with various PRD styles and lengths

---

*Built by [Aswin Raj](https://github.com/Aswin-Dot)*
