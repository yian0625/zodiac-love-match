import './style.css';
import { getQuestions, mbtiTypes, zodiacs } from './quiz.js';
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

function renderPicker({ field, label, helper, items, formatter }) {
  const selected = items.find((item) => item.id === state.profile[field]);
  const isOpen = state.openPicker === field;
  const menuId = `${field}-options`;
  const optionRows = items.map((item) => `
    <button class="select-option ${item.id === state.profile[field] ? 'is-selected' : ''}" type="button" aria-pressed="${item.id === state.profile[field]}" data-action="pick-option" data-field="${field}" data-value="${item.id}">
      <strong>${item.name}</strong>
      <span>${formatter(item)}</span>
    </button>
  `).join('');

  return `
    <div class="field-group picker-field">
      <span class="field-label" id="${field}-label">${label}</span>
      <button class="select-trigger ${selected ? 'has-value' : ''}" type="button" data-action="toggle-picker" data-field="${field}" aria-expanded="${isOpen}" aria-haspopup="listbox" aria-controls="${menuId}" aria-labelledby="${field}-label ${field}-value">
        <span id="${field}-value">${selected ? `${selected.name} - ${formatter(selected)}` : `请选择${label.replace('你的', '')}`}</span>
        <span class="select-chevron" aria-hidden="true"></span>
      </button>
      ${isOpen ? `
        <button class="picker-scrim" type="button" data-action="close-picker" aria-label="关闭${label}选择器"></button>
        <section class="select-sheet" id="${menuId}" role="dialog" aria-modal="true" aria-labelledby="${field}-sheet-title">
          <header class="select-sheet-header">
            <div>
              <p>选择资料</p>
              <h2 id="${field}-sheet-title">${label}</h2>
            </div>
            <button class="sheet-close" type="button" data-action="close-picker">完成</button>
          </header>
          <div class="select-options" role="group" aria-label="${label}选项">${optionRows}</div>
        </section>
      ` : ''}
      <small>${helper}</small>
    </div>
  `;
}

function renderWelcome() {
  return screenLayout(`
    <section class="welcome-screen">
      <div class="hero-image" aria-hidden="true"></div>
      <div class="hero-copy">
        <p class="eyebrow">RELATIONSHIP REFLECTION</p>
        <h1>找到让你感到<br class="desktop-break" />舒服的相处方式。</h1>
        <p class="hero-description">从真实恋爱场景出发，梳理你在关系中最在意的互动需求。</p>
        <button class="primary-button" type="button" data-action="to-profile">开始探索 <span aria-hidden="true">→</span></button>
      </div>
      <aside class="hero-fact" aria-label="使用说明">
        <strong>这不是恋爱预测</strong>
        <p>星座与 MBTI 用于自我探索。结果不替代真实沟通与相互尊重。</p>
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
          <span class="option-arrow" aria-hidden="true">→</span>
        </button>
        <button class="length-option deep" type="button" data-action="choose-length" data-count="20">
          <span class="option-kicker">深入版</span>
          <strong>20 题</strong>
          <span>约 5 分钟，延展到边界、修复与共同成长。</span>
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
      <div class="question-area">
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
      <h1>正在整理你的<br />相处偏好。</h1>
      <div class="analysis-orbits" aria-hidden="true"><i></i><i></i><i></i></div>
      <p>把你刚才的真实选择，转成更清晰的关系语言。</p>
    </section>
  `, 'analyzing');
}

function resultCards(items, kind) {
  return items.map((item, index) => `
    <article class="match-item ${index === 0 ? 'is-top' : ''}">
      <span class="match-rank">${index + 1}</span>
      <div>
        <p>${kind}</p>
        <h3>${item.name}</h3>
        <span>${item.reason}</span>
      </div>
    </article>
  `).join('');
}

function renderResult() {
  const { result } = state;
  const profileZodiac = zodiacs.find((sign) => sign.id === state.profile.zodiac);
  const profileMbti = mbtiTypes.find((type) => type.id === state.profile.mbti);
  const preferenceTags = result.preferences.slice(0, 3)
    .map((preference) => `<span class="preference-tag">${({ direct: '坦诚沟通', reassurance: '情绪回应', independent: '独立空间', reliable: '稳定行动' })[preference]}</span>`)
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

      <section class="matches-section">
        <header>
          <h2>更可能让你感到舒服的互动参考</h2>
          <p>按你的场景题偏好排序，而非判定关系好坏。</p>
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
