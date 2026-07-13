import './style.css';
import { getKeyMoment, getQuestions, mbtiTypes, zodiacs } from './quiz.js';
import { buildResult } from './match.js';

const app = document.querySelector('#app');

const state = {
  screen: 'welcome',
  profile: { zodiac: '', mbti: '' },
  questionCount: 12,
  questionIndex: 0,
  answers: [],
  validationError: '',
  result: null,
  questions: [],
  openPicker: null
};

const screenLayout = (content, screen) => `
  <main class="app-shell screen-${screen}">
    <header class="site-header">
      <button class="wordmark" type="button" data-action="home" aria-label="回到首页">Match Atlas</button>
    </header>
    ${content}
  </main>
`;

const preferenceLabels = {
  direct: '坦诚沟通',
  reassurance: '情绪回应',
  independent: '独立空间',
  reliable: '稳定行动'
};

function renderProgressRail(total, current) {
  const items = Array.from({ length: total }, (_, index) => {
    const classes = [
      index < current ? 'is-complete' : '',
      index === current ? 'is-current' : ''
    ].filter(Boolean).join(' ');
    return `<li class="${classes}"><span class="sr-only">第 ${index + 1} 题</span></li>`;
  }).join('');

  return `<ol class="progress-rail" style="--count:${total}" aria-label="答题进度">${items}</ol>`;
}

function renderMapClue(question, index, total) {
  const keyMoment = getKeyMoment(total, index);
  return `
    <aside class="map-clue">
      <span>关系地图线索 ${index + 1}</span>
      <p>${question.clue}</p>
      ${keyMoment ? `<p class="key-moment">${keyMoment}</p>` : ''}
    </aside>
  `;
}

function renderPicker({ field, label, helper, items, formatter }) {
  const selected = items.find((item) => item.id === state.profile[field]);
  const isOpen = state.openPicker === field;
  const menuId = `${field}-options`;

  return `
    <div class="field-group picker-field">
      <span class="field-label" id="${field}-label">${label}</span>
      <button class="select-trigger ${selected ? 'has-value' : ''}" type="button" data-action="toggle-picker" data-field="${field}" aria-expanded="${isOpen}" aria-haspopup="listbox" aria-controls="${menuId}" aria-labelledby="${field}-label ${field}-value">
        <span id="${field}-value">${selected ? `${selected.name} - ${formatter(selected)}` : `请选择${label.replace('你的', '')}`}</span>
        <span class="select-chevron" aria-hidden="true"></span>
      </button>
      <small>${helper}</small>
    </div>
  `;
}

function renderPickerSheet(field) {
  const config = field === 'zodiac'
    ? {
        field: 'zodiac',
        label: '你的星座',
        items: zodiacs,
        formatter: (sign) => `${sign.dates} / ${sign.element}`
      }
    : {
        field: 'mbti',
        label: '你的 MBTI',
        items: mbtiTypes,
        formatter: (type) => type.dimensions
      };
  const optionRows = config.items.map((item) => `
    <button class="select-option ${item.id === state.profile[config.field] ? 'is-selected' : ''}" type="button" aria-pressed="${item.id === state.profile[config.field]}" data-action="pick-option" data-field="${config.field}" data-value="${item.id}">
      <strong>${item.name}</strong>
      <span>${config.formatter(item)}</span>
    </button>
  `).join('');

  return `
    <button class="picker-scrim" type="button" data-action="close-picker" aria-label="关闭${config.label}选择器"></button>
    <section class="select-sheet" id="${config.field}-options" role="dialog" aria-modal="true" aria-labelledby="${config.field}-sheet-title">
      <header class="select-sheet-header">
        <div>
          <p>选择资料</p>
          <h2 id="${config.field}-sheet-title">${config.label}</h2>
        </div>
        <button class="sheet-close" type="button" data-action="close-picker">完成</button>
      </header>
      <div class="select-options" role="group" aria-label="${config.label}选项">${optionRows}</div>
    </section>
  `;
}

function renderWelcome() {
  return screenLayout(`
    <section class="welcome-screen">
      <div class="hero-image" aria-hidden="true"></div>
      <div class="hero-copy">
        <p class="eyebrow">YOUR RELATIONSHIP MAP</p>
        <h1>为什么有人很好，<br class="desktop-break" />相处却总觉得累？</h1>
        <p class="hero-description">从真实恋爱场景出发，找到你在亲密关系里最需要被怎样对待。</p>
        <button class="primary-button" type="button" data-action="to-profile">绘制我的关系地图 <span aria-hidden="true">→</span></button>
        <ul class="unlock-list" aria-label="完成后将解锁的内容">
          <li>核心需要</li>
          <li>冲突节奏</li>
          <li>沟通提示</li>
          <li>相处参考</li>
        </ul>
      </div>
      <aside class="hero-fact" aria-label="使用说明">
        <strong>不是给你贴标签</strong>
        <p>星座与 MBTI 只是参考镜头。真正重要的是，你们愿不愿意把需要说清楚。</p>
      </aside>
    </section>
  `, 'welcome');
}

function renderProfile() {
  return screenLayout(`
    <section class="flow-screen profile-screen">
      <div class="flow-heading">
        <p class="eyebrow">START WITH YOU</p>
        <h1>先认识一下你。</h1>
        <p>基础资料只用于在结果页提供更完整的星座与 MBTI 参考。</p>
      </div>

      <form class="profile-form" novalidate>
        ${renderPicker({
          field: 'zodiac',
          label: '你的星座',
          helper: '采用西方黄道十二宫的常见日期范围。',
          items: zodiacs,
          formatter: (sign) => `${sign.dates} / ${sign.element}`
        })}

        ${renderPicker({
          field: 'mbti',
          label: '你的 MBTI',
          helper: 'MBTI 描述偏好维度，不衡量能力或预测恋爱结果。',
          items: mbtiTypes,
          formatter: (type) => type.dimensions
        })}

        ${state.validationError ? `<p class="form-error" role="alert">${state.validationError}</p>` : ''}
        <button class="primary-button" type="button" data-action="to-length">继续 <span aria-hidden="true">→</span></button>
      </form>
    </section>
    ${state.openPicker ? renderPickerSheet(state.openPicker) : ''}
  `, 'profile');
}

function renderLength() {
  return screenLayout(`
    <section class="flow-screen length-screen">
      <div class="flow-heading">
        <p class="eyebrow">CHOOSE YOUR PACE</p>
        <h1>给自己一点<br />不被打扰的时间。</h1>
        <p>题目没有正确答案。请选更贴近你真实感受的那一项。</p>
      </div>

      <div class="length-options" role="group" aria-label="选择题目数量">
        <button class="length-option quick" type="button" data-action="choose-length" data-count="12">
          <span class="option-kicker">轻量版</span>
          <strong>12 题</strong>
          <span>约 3 分钟，聚焦你在关系里的核心需要。</span>
          <span class="option-unlock">解锁：核心需要 · 相处节奏 · 互动参考</span>
          <span class="option-arrow" aria-hidden="true">→</span>
        </button>
        <button class="length-option deep" type="button" data-action="choose-length" data-count="20">
          <span class="option-kicker">完整地图</span>
          <strong>20 题</strong>
          <span>约 5 分钟，延展到边界、修复与共同成长。</span>
          <span class="option-unlock">额外解锁：关系拉扯 · 修复提示 · 一周练习</span>
          <span class="option-arrow" aria-hidden="true">→</span>
        </button>
      </div>

      <button class="text-button" type="button" data-action="to-profile">返回修改资料</button>
    </section>
  `, 'length');
}

function renderQuiz() {
  const questions = state.questions;
  const question = questions[state.questionIndex];
  const currentAnswer = state.answers[state.questionIndex];

  return screenLayout(`
    <section class="quiz-screen">
      <div class="quiz-meta">
        <p><span>恋爱场景</span>${question.category}</p>
        <span>第 ${state.questionIndex + 1} 题，共 ${questions.length} 题</span>
      </div>
      ${renderProgressRail(questions.length, state.questionIndex)}
      <div class="question-area">
        ${renderMapClue(question, state.questionIndex, questions.length)}
        <h1>${question.prompt}</h1>
        <div class="choice-list" role="radiogroup" aria-label="${question.prompt}">
          ${question.choices.map((choice, index) => `
            <button class="choice ${currentAnswer === choice.value ? 'is-selected' : ''}" type="button" role="radio" aria-checked="${currentAnswer === choice.value}" data-action="answer" data-value="${choice.value}">
              <span class="choice-key" aria-hidden="true">${String.fromCharCode(65 + index)}</span>
              <span>${choice.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <footer class="quiz-footer">
        <button class="text-button" type="button" data-action="previous" ${state.questionIndex === 0 ? 'disabled' : ''}>上一题</button>
        <p aria-live="polite">凭第一反应作答即可</p>
      </footer>
    </section>
  `, 'quiz');
}

function renderAnalyzing() {
  return screenLayout(`
    <section class="analysis-screen" aria-live="polite">
      <p class="eyebrow">YOUR RELATIONSHIP MAP</p>
      <h1>正在绘制你的<br />相处地图。</h1>
      <ol class="analysis-steps">
        <li class="is-done">收集你的场景选择</li>
        <li class="is-active">整理四种关系需要</li>
        <li>准备你的相处建议</li>
      </ol>
      <p>每一种选择都只是你的一个线索，不是给你贴标签。</p>
    </section>
  `, 'analyzing');
}

function resultCards(items, kind) {
  return items.map((item, index) => `
    <article class="match-item ${index === 0 ? 'is-top' : ''}">
      <span class="match-rank">${String(index + 1).padStart(2, '0')}</span>
      <div>
        <p>${kind}</p>
        <h3>${item.name}</h3>
        <dl>
          <div><dt>容易靠近</dt><dd>${item.easy}</dd></div>
          <div><dt>早点聊聊</dt><dd>${item.watchFor}</dd></div>
          <div><dt>试试看</dt><dd>${item.tryThis}</dd></div>
        </dl>
      </div>
    </article>
  `).join('');
}

function renderRelationshipMap(result) {
  const axes = Object.entries(result.weights)
    .map(([preference, weight]) => `
      <span class="map-axis map-axis-${preference}" style="--weight:${weight}">
        <b>${weight}%</b>
        <small>${preferenceLabels[preference]}</small>
      </span>
    `).join('');
  const summary = Object.entries(result.weights)
    .map(([preference, weight]) => `<li><span>${preferenceLabels[preference]}</span><strong>${weight}%</strong></li>`)
    .join('');

  return `
    <section class="relationship-map" aria-labelledby="map-title">
      <div class="map-heading">
        <p>你的关系地图</p>
        <h2 id="map-title">四种需要的相对位置</h2>
      </div>
      <div class="map-visual" aria-hidden="true">
        <span class="map-center">关系<br />地图</span>
        ${axes}
      </div>
      <ul class="map-summary">${summary}</ul>
    </section>
  `;
}

function renderPractice(result) {
  if (!result.practice) {
    return `
      <section class="full-map-invite">
        <strong>想看见更多关系细节？</strong>
        <p>20 题完整地图会解锁冲突拉扯、修复提示和一周练习。</p>
        <button class="text-button" type="button" data-action="to-length">探索完整地图</button>
      </section>
    `;
  }

  return `
    <section class="practice-card">
      <p>完整地图 · 本周练习</p>
      <h2>${result.practice.title}</h2>
      <p>${result.practice.conversation}</p>
      <p>${result.practice.action}</p>
    </section>
  `;
}

function renderResult() {
  const { result } = state;
  const profileZodiac = zodiacs.find((sign) => sign.id === state.profile.zodiac);
  const profileMbti = mbtiTypes.find((type) => type.id === state.profile.mbti);
  const preferenceTags = result.preferences.slice(0, 3)
    .map((preference) => `<span class="preference-tag">${preferenceLabels[preference]}</span>`)
    .join('');

  return screenLayout(`
    <section class="result-screen">
      <div class="result-intro">
        <p class="eyebrow">YOUR RELATIONSHIP MAP</p>
        <h1>${result.headline}</h1>
        <p>${result.summary}</p>
        <div class="preference-tags">${preferenceTags}</div>
      </div>

      <aside class="profile-summary">
        <span>你的资料</span>
        <strong>${profileZodiac.name} / ${profileMbti.name}</strong>
        <p>${profileZodiac.dates} / ${profileMbti.dimensions}</p>
      </aside>

      ${renderRelationshipMap(result)}

      <section class="insight-section profile-pattern">
        <p>你的地图状态</p>
        <h2>${result.pattern.name}</h2>
        <p>${result.pattern.detail}</p>
        ${result.tension ? `
          <div class="tension-note">
            <strong>${result.tension.name}</strong>
            <p>${result.tension.detail}</p>
          </div>
        ` : ''}
      </section>

      <section class="insight-section interaction-manual">
        <p>你的相处说明书</p>
        <h2>怎样会让你感觉被好好对待？</h2>
        <dl>
          <div><dt>靠近感来自</dt><dd>${result.manual.close}</dd></div>
          <div><dt>容易卡住时</dt><dd>${result.manual.friction}</dd></div>
          <div><dt>可以这样开口</dt><dd>“${result.manual.request}”</dd></div>
        </dl>
      </section>

      <section class="repair-sequence">
        <p>关系修复提示</p>
        <h2>先说需要，再约下一步</h2>
        <ol>
          <li>停一下，先辨认自己正在在意什么。</li>
          <li>用具体的需要代替指责。</li>
          <li>${result.repairPrompt}</li>
        </ol>
      </section>

      ${renderPractice(result)}

      <section class="matches-section">
        <header>
          <h2>相处参考镜头</h2>
          <p>按你的场景题偏好整理，而非判定关系好坏。</p>
        </header>
        <div class="match-columns">
          <div class="match-group">
            <h3>星座传统配对参考</h3>
            ${resultCards(result.topZodiacs, '传统元素配对提示')}
          </div>
          <div class="match-group">
            <h3>MBTI 互动偏好参考</h3>
            ${resultCards(result.topMbti, '本次答题的偏好模型')}
          </div>
        </div>
      </section>

      <section class="caution-note">
        <span>需要多一点说明的地方</span>
        <p>${result.caution}</p>
      </section>

      <section class="method-note">
        <h2>结果是怎样形成的？</h2>
        <p>题目将你的选择归纳为坦诚沟通、情绪回应、独立空间与稳定行动四类需求。${result.zodiacMethod}</p>
        <p class="disclaimer">${result.disclaimer}</p>
      </section>

      <button class="primary-button restart-button" type="button" data-action="restart">重新探索 <span aria-hidden="true">→</span></button>
    </section>
  `, 'result');
}

function render() {
  const views = {
    welcome: renderWelcome,
    profile: renderProfile,
    length: renderLength,
    quiz: renderQuiz,
    analyzing: renderAnalyzing,
    result: renderResult
  };
  app.innerHTML = views[state.screen]();
}

function resetState() {
  state.screen = 'welcome';
  state.profile = { zodiac: '', mbti: '' };
  state.questionCount = 12;
  state.questionIndex = 0;
  state.answers = [];
  state.validationError = '';
  state.result = null;
  state.questions = [];
  state.openPicker = null;
}

function finishQuiz() {
  state.screen = 'analyzing';
  render();
  window.setTimeout(() => {
    state.result = buildResult(state.profile, state.answers);
    state.screen = 'result';
    render();
  }, 720);
}

app.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action } = button.dataset;

  if (action === 'home' || action === 'restart') {
    resetState();
    render();
    return;
  }

  if (action === 'toggle-picker') {
    state.openPicker = state.openPicker === button.dataset.field ? null : button.dataset.field;
    render();
    return;
  }

  if (action === 'close-picker') {
    state.openPicker = null;
    render();
    return;
  }

  if (action === 'pick-option') {
    state.profile[button.dataset.field] = button.dataset.value;
    state.openPicker = null;
    state.validationError = '';
    render();
    return;
  }

  if (action === 'to-profile') {
    state.screen = 'profile';
    state.openPicker = null;
    render();
    return;
  }

  if (action === 'to-length') {
    if (!state.profile.zodiac || !state.profile.mbti) {
      state.validationError = '请选择你的星座和 MBTI 后再继续。';
    } else {
      state.screen = 'length';
      state.openPicker = null;
    }
    render();
    return;
  }

  if (action === 'choose-length') {
    state.questionCount = Number(button.dataset.count);
    state.questionIndex = 0;
    state.answers = [];
    state.questions = getQuestions(state.questionCount);
    state.screen = 'quiz';
    render();
    return;
  }

  if (action === 'previous' && state.questionIndex > 0) {
    state.questionIndex -= 1;
    render();
    return;
  }

  if (action === 'answer') {
    state.answers[state.questionIndex] = button.dataset.value;
    if (state.questionIndex === state.questionCount - 1) {
      finishQuiz();
      return;
    }
    state.questionIndex += 1;
    render();
  }
});

render();
