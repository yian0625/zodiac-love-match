# Relationship Insight Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Upgrade Match Atlas into an engaging relationship-map experience with deeper, explainable analysis and practical relationship guidance.

**Architecture:** Retain the in-memory Vite application. Quiz data owns scene and engagement metadata; the pure matching module computes a complete relationship map; the DOM controller renders the map and report; CSS provides an accessible, mobile-first atlas interface.

**Tech Stack:** Vite, vanilla JavaScript, CSS, Vitest.

## Global Constraints

- Keep the application anonymous, browser-only, and free of network requests or persistence.
- Retain the 12-question and 20-question paths. One-week practice appears only after 20 answers.
- Zodiac and MBTI remain entertainment-oriented references, never compatibility predictions.
- Preserve visible focus, semantic radio controls, inline validation, reduced-motion support, and mobile-first layout.
- Derive all guidance from deterministic local copy blocks. Never create unsupported personal claims.
- Retain zodiac dates, MBTI reference data, compatibility rank ordering, and the disclaimer.

## File Structure

- src/quiz.js: question data, category clues, and key moments.
- src/match.js: score normalization, pattern and tension identification, guidance, practice, and reference-row augmentation.
- src/match.test.js: pure-domain tests.
- src/main.js: state transitions and all new report markup.
- src/style.css: progress, report-map, responsive, and accessibility rules.
- index.html: page description and document title.

---

### Task 1: Define new analysis behavior in failing tests

**Files:**

- Modify: src/match.test.js
- Modify: src/match.js

**Interfaces:**

- Consumes analyzeRelationshipMap(answers) and buildResult(profile, answers).
- Produces deterministic coverage for weights, patterns, tensions, practices, and reference guidance.

- [ ] **Step 1: Import the new pure analysis function and write a normalization test**

~~~js
import { analyzeRelationshipMap, buildResult, scoreAnswers } from './match.js';

it('normalizes dimension weights from completed answers', () => {
  expect(analyzeRelationshipMap(['direct', 'direct', 'reliable', 'independent']).weights).toEqual({
    direct: 50,
    reassurance: 0,
    independent: 25,
    reliable: 25
  });
});
~~~

- [ ] **Step 2: Write distribution and tension tests**

~~~js
it('classifies focused, layered, and balanced maps deterministically', () => {
  expect(analyzeRelationshipMap(Array(12).fill('direct')).pattern.id).toBe('focused');

  const layered = [
    'reassurance', 'reassurance', 'reassurance',
    'independent', 'independent', 'independent',
    'direct', 'direct', 'reliable', 'reliable', 'reliable', 'reliable'
  ];
  expect(analyzeRelationshipMap(layered).pattern.id).toBe('layered');

  expect(analyzeRelationshipMap(['direct', 'reassurance', 'independent', 'reliable']).pattern.id)
    .toBe('balanced');
});

it('describes a defined tension as a negotiation need', () => {
  const map = analyzeRelationshipMap(['reassurance', 'reassurance', 'independent', 'independent']);
  expect(map.tension.id).toBe('reassurance-independent');
  expect(map.repairPrompt).toContain('需要');
  expect(map.tension.detail).not.toContain('不适合');
});
~~~

- [ ] **Step 3: Write practice and reference-row tests**

~~~js
it('only returns a practice for the 20-question full map', () => {
  const profile = { zodiac: 'libra', mbti: 'infp' };
  expect(buildResult(profile, Array(12).fill('direct')).practice).toBeNull();
  expect(buildResult(profile, Array(20).fill('direct')).practice).toMatchObject({
    title: expect.any(String),
    conversation: expect.any(String),
    action: expect.any(String)
  });
});

it('adds actionable guidance to reference rows', () => {
  const result = buildResult({ zodiac: 'libra', mbti: 'infp' }, Array(12).fill('reassurance'));
  expect(result.topMbti[0]).toMatchObject({
    easy: expect.any(String),
    watchFor: expect.any(String),
    tryThis: expect.any(String)
  });
});
~~~

- [ ] **Step 4: Run the targeted test to prove the new import fails**

Run: npm test -- src/match.test.js

Expected: failure because analyzeRelationshipMap is not exported.

- [ ] **Step 5: Commit only if the branch uses red-green incremental commits**

~~~bash
git add src/match.test.js
git commit -m "test: define relationship insight behavior"
~~~

### Task 2: Implement the pure relationship-map analysis

**Files:**

- Modify: src/match.js
- Test: src/match.test.js

**Interfaces:**

- Consumes an answer list containing direct, reassurance, independent, or reliable.
- Produces analyzeRelationshipMap(answers) and expanded buildResult(profile, answers).

- [ ] **Step 1: Add deterministic copy dictionaries**

~~~js
const preferenceGuidance = {
  direct: {
    close: '把真实想法说清楚，并允许对方追问。',
    friction: '含糊、回避或让你反复猜测时，容易消耗耐心。',
    request: '我想先把这件事说清楚，再一起决定下一步。',
    repair: '先讲清发生了什么，再确认彼此需要怎样继续聊。',
    practice: {
      title: '清晰表达练习',
      conversation: '这周找一次平静时刻，说出一个具体期待。',
      action: '把期待落到一个可执行的时间或行为上。'
    }
  },
  reassurance: {
    close: '先确认感受被接住，再慢慢进入事情本身。',
    friction: '冷淡、敷衍或只讲道理时，容易感到自己不被放在心上。',
    request: '我现在更需要先被理解，再一起想办法。',
    repair: '先承认彼此的感受，再确认一句能让人安心的回应。',
    practice: {
      title: '情绪回应练习',
      conversation: '这周分享一次小小的失落，并说清希望得到怎样的回应。',
      action: '和对方约定一句你们都听得懂的安慰方式。'
    }
  },
  independent: {
    close: '保有各自的生活节奏，见面时仍能自然靠近。',
    friction: '被频繁追问或把独处理解为疏远时，容易想后退。',
    request: '我需要一点自己的时间，但这不代表我不在乎你。',
    repair: '说明需要空间的时长，再约一个重新连接的时间。',
    practice: {
      title: '空间协商练习',
      conversation: '这周谈一次各自舒服的独处和联系节奏。',
      action: '约定一个不打扰彼此、也不会失联的具体方式。'
    }
  },
  reliable: {
    close: '稳定的行动、守约和可预期的安排，会让你慢慢放松下来。',
    friction: '临时变化没有说明，或承诺反复落空时，容易失去安全感。',
    request: '如果计划有变化，请尽早告诉我，并一起决定下一步。',
    repair: '把下次怎样做说具体，并用一次行动重新建立信任。',
    practice: {
      title: '稳定行动练习',
      conversation: '这周选一件小事，确认彼此最看重的兑现方式。',
      action: '完成一个约定后，彼此说出这件事带来的感受。'
    }
  }
};
~~~

Define the three approved tension identifiers: reassurance-independent, direct-reassurance, and independent-reliable. Each tension explains an interaction to negotiate, never an incompatibility.

- [ ] **Step 2: Implement normalized score weights and map classification**

~~~js
const preferenceOrder = ['direct', 'reassurance', 'independent', 'reliable'];

function weightScores(scores) {
  const total = Math.max(Object.values(scores).reduce((sum, value) => sum + value, 0), 1);
  return Object.fromEntries(
    preferenceOrder.map((key) => [key, Math.round((scores[key] / total) * 100)])
  );
}

function classifyMap(scores, preferences) {
  const [first, second, third, fourth] = preferences;
  const answerCount = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const focusGap = answerCount >= 20 ? 4 : 3;

  if (scores[first] - scores[fourth] >= focusGap) {
    return { id: 'focused', name: '清晰聚焦', detail: '主导需要格外明确。' };
  }
  if (scores[first] - scores[second] <= 1 && scores[second] > scores[third]) {
    return { id: 'layered', name: '双重需要', detail: '前两项需要会一起影响相处感受。' };
  }
  return { id: 'balanced', name: '弹性平衡', detail: '不同关系需要比较均衡，会随情境调整重点。' };
}
~~~

- [ ] **Step 3: Export one complete pure analysis function**

~~~js
export function analyzeRelationshipMap(answers) {
  const scores = scoreAnswers(answers);
  const preferences = sortedPreferences(scores);
  const pair = [preferences[0], preferences[1]].sort().join('-');
  const tensionId = {
    'independent-reassurance': 'reassurance-independent',
    'direct-reassurance': 'direct-reassurance',
    'independent-reliable': 'independent-reliable'
  }[pair];
  const primary = preferenceGuidance[preferences[0]];

  return {
    scores,
    weights: weightScores(scores),
    preferences,
    pattern: classifyMap(scores, preferences),
    tension: tensionId ? { id: tensionId, ...tensionCopy[tensionId] } : null,
    manual: { close: primary.close, friction: primary.friction, request: primary.request },
    repairPrompt: primary.repair,
    practice: answers.length === 20 ? primary.practice : null
  };
}
~~~

- [ ] **Step 4: Add guidance to each existing compatibility reference**

~~~js
function addReferenceGuidance(profile, dominantPreference) {
  return {
    ...profile,
    easy: '可能较容易回应你此刻最重视的互动需要。',
    watchFor: '不同的联系频率、表达方式或独处需求，仍值得早点说清。',
    tryThis: '从彼此舒服的沟通节奏开始协商，而不是把标签当作结论。',
    dominantPreference
  };
}
~~~

Use it for both topZodiacs and topMbti without changing the existing three-item ordering. Keep the existing reason property for backward compatibility.

- [ ] **Step 5: Expand buildResult with the map output**

~~~js
export function buildResult(profile, answers) {
  const map = analyzeRelationshipMap(answers);
  const [first, second] = map.preferences;

  return {
    ...map,
    profile,
    headline: '你的相处重心有清晰的主次层次',
    summary: preferenceCopy[first].detail + preferenceCopy[second].detail,
    topZodiacs: traditionalZodiacReferences(profile.zodiac, map.scores)
      .map((item) => addReferenceGuidance(item, first)),
    topMbti: rankProfiles(mbtiProfiles, map.scores)
      .slice(0, 3)
      .map((item) => addReferenceGuidance(item, first)),
    zodiacMethod: '星座部分采用最简化的传统西方占星太阳星座元素配对参考，不包含完整出生星盘，也不是科学预测。',
    caution: '如果双方对沟通频率、独处空间或承诺方式的期待不同，就需要更主动地说明节奏和边界。这不代表不适合，只是提醒双方把沟通做得更具体。',
    disclaimer: '星座与 MBTI 仅作娱乐性自我探索。它们不能科学预测恋爱是否成功，真实关系仍取决于双方的尊重、沟通与行动。'
  };
}
~~~

- [ ] **Step 6: Run tests and build**

Run: npm test && npm run build

Expected: every existing and new assertion passes, and Vite completes with no errors.

- [ ] **Step 7: Commit the pure analysis**

~~~bash
git add src/match.js src/match.test.js
git commit -m "feat: add relationship insight analysis"
~~~

### Task 3: Add quiz engagement metadata and test it

**Files:**

- Modify: src/quiz.js
- Modify: src/match.test.js

**Interfaces:**

- Consumes the shuffled question list.
- Produces clue text and stable key-moment flags on each question object.

- [ ] **Step 1: Add the metadata test**

~~~js
it('includes a map clue on every question and marks key moments', () => {
  const questions = getQuestions(20, () => 0);
  expect(questions.every((question) => question.clue)).toBe(true);
  expect(questions.some((question) => question.isKeyMoment)).toBe(true);
});
~~~

- [ ] **Step 2: Run it to verify it fails**

Run: npm test -- src/match.test.js

Expected: failure because question objects lack clue and isKeyMoment.

- [ ] **Step 3: Define one non-diagnostic clue for every category**

~~~js
const categoryClues = {
  '发生误会': '这一题在帮你辨认：被误解时，你需要怎样重新靠近。',
  '日常联系': '这一题在帮你辨认：什么样的联系会让你安心。',
  '冲突时刻': '这一题在帮你辨认：分歧出现时，你最需要被怎样对待。',
  '相处节奏': '这一题在帮你辨认：你习惯怎样慢慢建立信任。'
};
~~~

Add a clue entry for each of these question categories: 临时爽约、亲密表达、亲密距离、亲密边界、低落情绪、修复关系、共同成长、共同生活、关系期待、冲突时刻、分享生活、前任话题、化解尴尬、发生误会、回复消息、家庭相处、工作变动、异地相处、意见分歧、承诺感、日常联系、暧昧边界、未来规划、爱好差异、爱的语言、独处时间、生活习惯、生病时、相处节奏、社交媒体、社交边界、私人边界、第一次约会、约会计划、纪念日、线上约会、表达在乎、被误解时、认识朋友、道歉之后、重要决定、金钱观念. Do not use a fallback string.

- [ ] **Step 4: Attach clue and key-moment metadata when assigning ids**

~~~js
].map((question, index) => ({
  id: index + 1,
  ...question,
  clue: categoryClues[question.category],
  isKeyMoment: [4, 10, 16, 22].includes(index + 1),
  choices: question.choices.map(([label, value]) => ({ label, value }))
}));
~~~

- [ ] **Step 5: Verify and commit**

Run: npm test

Expected: every returned question has a clue, at least one returned question is key, and existing shuffled non-repeating behavior remains intact.

~~~bash
git add src/quiz.js src/match.test.js
git commit -m "feat: add quiz engagement cues"
~~~

### Task 4: Render progressive quiz and staged analysis

**Files:**

- Modify: src/main.js

**Interfaces:**

- Consumes question clue and isKeyMoment fields plus existing in-memory state.
- Produces an accessible progress rail, clue, key-moment notice, and staged analysis status.

- [ ] **Step 1: Add a renderProgressRail(total, current) helper**

~~~js
function renderProgressRail(total, current) {
  const items = Array.from({ length: total }, (_, index) => {
    const classes = [
      index < current ? 'is-complete' : '',
      index === current ? 'is-current' : ''
    ].filter(Boolean).join(' ');
    return '<li class="' + classes + '"><span class="sr-only">第 ' + (index + 1) + ' 题</span></li>';
  }).join('');

  return '<ol class="progress-rail" style="--count:' + total + '" aria-label="答题进度">' + items + '</ol>';
}
~~~

- [ ] **Step 2: Add a renderMapClue(question, index) helper**

~~~js
function renderMapClue(question, index) {
  const keyNotice = question.isKeyMoment
    ? '<p class="key-moment">关键分岔：这一组选择会影响你的关系地图。</p>'
    : '';

  return '<aside class="map-clue"><span>关系地图线索 ' + (index + 1) + '</span><p>' +
    question.clue + '</p>' + keyNotice + '</aside>';
}
~~~

- [ ] **Step 3: Place rail and clue before the question heading in renderQuiz**

Keep the existing category, question count, radiogroup markup, back navigation, and one-tap progression. The rendered rail receives total and current index. The clue receives the active question and index.

- [ ] **Step 4: Render an explicit staged analysis state**

~~~html
<ol class="analysis-steps">
  <li class="is-done">收集你的场景选择</li>
  <li class="is-active">整理四种关系需要</li>
  <li>准备你的相处建议</li>
</ol>
<p>每一种选择都只是你的一个线索，不是给你贴标签。</p>
~~~

Keep the current automatic transition; no user action should be needed to leave analysis.

- [ ] **Step 5: Build and commit**

Run: npm run build

Expected: Vite finds no syntax errors and quiz completion still reaches result state.

~~~bash
git add src/main.js
git commit -m "feat: enrich quiz progression"
~~~

### Task 5: Render the complete relationship insight report

**Files:**

- Modify: src/main.js

**Interfaces:**

- Consumes result weights, pattern, tension, manual, repairPrompt, practice, topZodiacs, and topMbti.
- Produces a text-readable map, interaction manual, repair prompt, practice/invitation, and enhanced reference rows.

- [ ] **Step 1: Add a preference-label map and renderRelationshipMap(result) helper**

~~~js
const preferenceLabels = {
  direct: '坦诚沟通',
  reassurance: '情绪回应',
  independent: '独立空间',
  reliable: '稳定行动'
};

function renderRelationshipMap(result) {
  const axes = Object.entries(result.weights)
    .map(([key, value]) => '<span class="map-axis map-axis-' + key +
      '" style="--weight:' + value + '%"><b>' + value + '%</b></span>')
    .join('');
  const summary = Object.entries(result.weights)
    .map(([key, value]) => '<li><span>' + preferenceLabels[key] +
      '</span><strong>' + value + '%</strong></li>')
    .join('');

  return '<section class="relationship-map" aria-labelledby="map-title">' +
    '<div class="map-heading"><p>你的关系地图</p><h2 id="map-title">四种需要的相对位置</h2></div>' +
    '<div class="map-visual" aria-hidden="true">' + axes + '</div>' +
    '<ul class="map-summary">' + summary + '</ul></section>';
}
~~~

- [ ] **Step 2: Expand resultCards so each reference has three explanations**

Each card retains rank, kind, and name, then renders easy, watchFor, and tryThis in a definition list. Do not remove the current method and disclaimer sections.

- [ ] **Step 3: Add report sections before compatibility references**

Render in this exact order: relationship map; map-pattern section; optional tension note; interaction manual with close, friction, and first-person request; repair prompt; practice or full-map invitation; existing matches; caution; method; disclaimer; restart.

- [ ] **Step 4: Add a renderPractice(result) helper**

~~~js
function renderPractice(result) {
  if (!result.practice) {
    return '<section class="full-map-invite"><strong>想看见更多关系细节？</strong>' +
      '<p>20 题完整地图会解锁冲突拉扯与一周练习。</p>' +
      '<button class="text-button" type="button" data-action="to-length">探索完整地图</button></section>';
  }
  return '<section class="practice-card"><p>完整地图 · 本周练习</p><h2>' + result.practice.title +
    '</h2><p>' + result.practice.conversation + '</p><p>' + result.practice.action + '</p></section>';
}
~~~

- [ ] **Step 5: Test and commit**

Run: npm test && npm run build

Expected: every result returns readable map content and repair copy; practice appears only on the 20-question path.

~~~bash
git add src/main.js
git commit -m "feat: add actionable relationship report"
~~~

### Task 6: Add the relationship-atlas visual system

**Files:**

- Modify: src/style.css
- Modify: index.html

**Interfaces:**

- Consumes new classes from Tasks 4 and 5.
- Produces a readable, responsive report with one coral accent and reduced-motion-safe interactions.

- [ ] **Step 1: Update the document description and title**

~~~html
<meta name="description" content="用真实恋爱场景绘制你的关系地图，获得可沟通、可练习的相处线索。" />
<title>Match Atlas - 你的关系地图</title>
~~~

- [ ] **Step 2: Add screen-reader, progress, clue, and status rules**

~~~css
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.progress-rail { display: grid; grid-template-columns: repeat(var(--count), minmax(0, 1fr)); gap: 4px; margin: 18px 0 0; padding: 0; list-style: none; }
.progress-rail li { height: 4px; border-radius: 999px; background: var(--line); }
.progress-rail li.is-complete { background: color-mix(in srgb, var(--accent) 48%, var(--paper)); }
.progress-rail li.is-current { background: var(--accent); box-shadow: 0 0 0 3px rgb(217 95 81 / 14%); }
.map-clue { margin: 0 0 18px; padding: 12px 14px; border-left: 2px solid var(--accent); background: rgb(255 255 255 / 68%); color: var(--muted); font-size: .8rem; line-height: 1.6; }
.map-clue span, .key-moment { color: var(--accent); font-size: .72rem; font-weight: 760; }
.analysis-steps { display: grid; width: 100%; margin: 28px 0 4px; padding: 0; list-style: none; }
.analysis-steps li { padding: 11px 0; border-bottom: 1px solid var(--line); color: var(--muted); }
.analysis-steps li.is-done, .analysis-steps li.is-active { color: var(--text); font-weight: 720; }
~~~

- [ ] **Step 3: Add varied map and report-section treatments**

~~~css
.relationship-map { margin: 48px 0; padding: 25px 21px; border: 1px solid var(--line); border-radius: var(--radius); background: linear-gradient(145deg, #edf3ff, var(--paper)); }
.map-heading > p, .profile-pattern > p, .repair-sequence > p, .practice-card > p { margin: 0 0 7px; color: var(--accent); font-size: .76rem; font-weight: 760; }
.map-visual { position: relative; min-height: 210px; margin: 24px 0 18px; background: linear-gradient(45deg, transparent 49.5%, var(--line) 50%, transparent 50.5%), linear-gradient(-45deg, transparent 49.5%, var(--line) 50%, transparent 50.5%); }
.map-axis { position: absolute; display: grid; place-items: center; width: clamp(48px, calc(var(--weight) * .75), 78px); aspect-ratio: 1; border-radius: 50%; background: var(--accent); color: white; font-size: .78rem; }
.map-axis-direct { top: 6%; left: 12%; }.map-axis-reassurance { top: 12%; right: 9%; }.map-axis-independent { bottom: 8%; left: 16%; }.map-axis-reliable { right: 13%; bottom: 5%; }
.map-summary { display: grid; gap: 9px; padding: 0; list-style: none; }.map-summary li { display: flex; justify-content: space-between; padding-top: 9px; border-top: 1px solid var(--line); }
.insight-section, .repair-sequence, .practice-card, .full-map-invite { margin-top: 38px; }.tension-note, .practice-card { margin-top: 18px; padding: 20px; border-radius: var(--radius); background: var(--accent-soft); }
.interaction-manual dl, .match-item dl { display: grid; gap: 15px; }.interaction-manual dt, .match-item dt { color: var(--accent); font-size: .74rem; font-weight: 760; }.interaction-manual dd, .match-item dd { margin: 5px 0 0; color: var(--muted); line-height: 1.65; }
~~~

- [ ] **Step 4: Protect narrow mobile layouts and reduced motion**

~~~css
@media (max-width: 360px) {
  .progress-rail { gap: 3px; }
  .map-visual { min-height: 185px; }
  .map-axis { font-size: .7rem; }
}
@media (prefers-reduced-motion: reduce) {
  .progress-rail li, .map-axis { transition: none; }
}
~~~

- [ ] **Step 5: Build and visually audit 320px and 480px widths**

Run: npm run dev -- --host 127.0.0.1

Expected: controls fit, map labels are readable in the text summary, no state relies on coral alone, and buttons have legible contrast.

- [ ] **Step 6: Commit the visual system**

~~~bash
git add src/style.css index.html
git commit -m "feat: style relationship map experience"
~~~

### Task 7: Complete verification

**Files:**

- Modify: src/match.test.js only if manual verification exposes a pure-data edge case.

**Interfaces:**

- Consumes completed production code.
- Produces evidence that both quiz paths work and existing behavior has not regressed.

- [ ] **Step 1: Run automated verification**

Run: npm test && npm run build

Expected: all Vitest tests pass and Vite emits the production bundle with no errors.

- [ ] **Step 2: Manually verify the 12-question core-map path**

Check profile validation, progress and clue visibility, previous-answer persistence, result map, manual, repair prompt, enhanced references, full-map invitation, disclaimer, and restart.

- [ ] **Step 3: Manually verify the 20-question full-map path**

Check key-moment visibility, practice card, reset behavior, and the reduced-motion version.

- [ ] **Step 4: Inspect and commit final corrections**

~~~bash
git diff --check
git status --short
git add src/quiz.js src/match.js src/match.test.js src/main.js src/style.css index.html
git commit -m "feat: enrich relationship insight experience"
~~~
