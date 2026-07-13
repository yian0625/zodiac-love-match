# Relationship Match Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a browser-only Chinese relationship reflection quiz that produces explainable, entertainment-framed zodiac and MBTI match references.

**Architecture:** A Vite vanilla-JavaScript single-page app stores UI state in memory. `src/quiz.js` owns questions and profile facts, `src/match.js` turns answers into preference scores and ranked reference profiles, and `src/main.js` renders screens and binds user actions. CSS implements the complete responsive visual system.

**Tech Stack:** Vite, vanilla JavaScript, CSS, Vitest.

## Global Constraints

- Do not make scientific claims that zodiac signs or MBTI types determine compatibility.
- Retain all answers in memory only; do not make network requests or add persistence.
- Support exactly 12-question and 20-question paths.
- Present accurate zodiac date ranges and MBTI four-letter dimensions as reference data.
- Use the page-wide palette: ink `#101426`, ivory `#f8f4ec`, and coral `#ff765f`.
- Maintain keyboard focus, semantic controls, inline validation, reduced-motion support, and mobile-first responsiveness.

## File Structure

- `package.json` — build, development, and test scripts.
- `index.html` — Vite document shell and Chinese language metadata.
- `src/quiz.js` — immutable question, zodiac, and MBTI reference data.
- `src/match.js` — pure scoring, ranking, and result copy functions.
- `src/match.test.js` — unit tests for the domain logic.
- `src/main.js` — view rendering, app state, validation, and event wiring.
- `src/style.css` — visual tokens, screen transitions, responsive layout, and accessibility states.

### Task 1: Establish the application shell and test runner

**Files:**
- Create: `package.json`
- Create: `index.html`

**Interfaces:**
- Produces: the `npm run dev`, `npm run build`, and `npm test` commands used by later tasks.

- [ ] **Step 1: Create the package manifest**

```json
{
  "name": "relationship-match",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run"
  },
  "devDependencies": {
    "vite": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Create the Vite document shell**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#101426" />
    <title>Match Atlas · 恋爱相处偏好</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 3: Install dependencies and verify the runner sees no test files yet**

Run: `npm install && npm test`

Expected: Vitest exits with no test files discovered; later tasks add the first test.

### Task 2: Define testable quiz and matching logic with TDD

**Files:**
- Create: `src/quiz.js`
- Create: `src/match.js`
- Create: `src/match.test.js`

**Interfaces:**
- Produces: `getQuestions(count)`, `scoreAnswers(answers)`, `buildResult(profile, answers)`, and `zodiacs` / `mbtiTypes` data exports.

- [ ] **Step 1: Write failing behavior tests**

```js
import { describe, expect, it } from 'vitest';
import { getQuestions } from './quiz.js';
import { buildResult, scoreAnswers } from './match.js';

describe('relationship matching', () => {
  it('returns the requested quiz length', () => {
    expect(getQuestions(12)).toHaveLength(12);
    expect(getQuestions(20)).toHaveLength(20);
  });

  it('counts answer preferences', () => {
    expect(scoreAnswers(['direct', 'direct', 'independent'])).toMatchObject({
      direct: 2,
      independent: 1
    });
  });

  it('returns transparent reference matches', () => {
    const result = buildResult({ zodiac: 'libra', mbti: 'infp' }, Array(12).fill('reassurance'));
    expect(result.topZodiacs).toHaveLength(3);
    expect(result.topMbti).toHaveLength(3);
    expect(result.disclaimer).toContain('娱乐性');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails because modules are absent**

Run: `npm test`

Expected: FAIL with a module-resolution error for `src/quiz.js`.

- [ ] **Step 3: Implement immutable data and pure matching functions**

```js
export function getQuestions(count) {
  return questions.slice(0, count);
}

export function scoreAnswers(answers) {
  return answers.reduce((scores, answer) => ({
    ...scores,
    [answer]: scores[answer] + 1
  }), { direct: 0, reassurance: 0, independent: 0, reliable: 0 });
}

export function buildResult(profile, answers) {
  const scores = scoreAnswers(answers);
  return {
    profile,
    scores,
    topZodiacs: rankProfiles(zodiacProfiles, scores).slice(0, 3),
    topMbti: rankProfiles(mbtiProfiles, scores).slice(0, 3),
    disclaimer: '星座与 MBTI 仅作娱乐性自我探索，不构成科学的恋爱预测。'
  };
}
```

- [ ] **Step 4: Run the unit tests to verify they pass**

Run: `npm test`

Expected: 3 passing tests and 0 failures.

### Task 3: Render the quiz flow and result state

**Files:**
- Create: `src/main.js`

**Interfaces:**
- Consumes: `getQuestions`, `zodiacs`, `mbtiTypes`, and `buildResult`.
- Produces: a complete interactive flow within `#app`.

- [ ] **Step 1: Render welcome, profile, quiz-length, quiz, and result screens from one `state` object**

```js
const state = {
  screen: 'welcome',
  profile: { zodiac: '', mbti: '' },
  questionCount: 12,
  answers: [],
  validationError: ''
};

function render() {
  app.innerHTML = views[state.screen]();
}
```

- [ ] **Step 2: Validate profile fields and drive event transitions**

```js
function startQuiz() {
  if (!state.profile.zodiac || !state.profile.mbti) {
    state.validationError = '请选择你的星座和 MBTI 后再继续。';
    return render();
  }
  state.screen = 'length';
  state.validationError = '';
  render();
}
```

- [ ] **Step 3: Render results with explainable preference cues and a reset action**

```js
function showResults() {
  const result = buildResult(state.profile, state.answers);
  state.screen = 'result';
  state.result = result;
  render();
}
```

- [ ] **Step 4: Run automated verification after the controller imports all modules**

Run: `npm test && npm run build`

Expected: all Vitest tests pass and Vite creates `dist/` without errors.

### Task 4: Apply responsive visual design and perform browser verification

**Files:**
- Create: `src/style.css`
- Modify: `src/main.js` to import `./style.css`.

**Interfaces:**
- Consumes: semantic classes emitted by `src/main.js`.
- Produces: an accessible desktop and mobile visual experience.

- [ ] **Step 1: Implement tokens, grid background, type scale, panels, choices, badges, result cards, and progress indicator**

```css
:root { --ink: #101426; --ivory: #f8f4ec; --coral: #ff765f; }
body { margin: 0; background: var(--ink); color: var(--ivory); }
.app-shell { min-height: 100dvh; }
.choice:focus-visible, button:focus-visible, select:focus-visible {
  outline: 3px solid var(--coral);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }
```

- [ ] **Step 2: Verify the 12-question flow in a local browser**

Run: `npm run dev -- --host 127.0.0.1`

Expected: profile validation blocks incomplete submission; 12 answers reach a readable result with three zodiac and three MBTI references.

- [ ] **Step 3: Verify the 20-question flow and reset action in a local browser**

Run: continue the local dev server and select “深入版 · 20 题”.

Expected: 20 progress steps render; reset returns to the welcome screen without retaining answers.

- [ ] **Step 4: Run final automated verification**

Run: `npm test && npm run build`

Expected: tests and production build both exit 0.
