const zeroScores = () => ({ direct: 0, reassurance: 0, independent: 0, reliable: 0 });

const zodiacProfiles = [
  ['aries', '白羊座', { direct: 4, reassurance: 1, independent: 3, reliable: 1 }],
  ['taurus', '金牛座', { direct: 1, reassurance: 3, independent: 1, reliable: 4 }],
  ['gemini', '双子座', { direct: 3, reassurance: 1, independent: 4, reliable: 1 }],
  ['cancer', '巨蟹座', { direct: 1, reassurance: 4, independent: 1, reliable: 3 }],
  ['leo', '狮子座', { direct: 3, reassurance: 3, independent: 2, reliable: 2 }],
  ['virgo', '处女座', { direct: 3, reassurance: 1, independent: 2, reliable: 4 }],
  ['libra', '天秤座', { direct: 2, reassurance: 3, independent: 2, reliable: 2 }],
  ['scorpio', '天蝎座', { direct: 2, reassurance: 4, independent: 1, reliable: 3 }],
  ['sagittarius', '射手座', { direct: 3, reassurance: 1, independent: 4, reliable: 1 }],
  ['capricorn', '摩羯座', { direct: 2, reassurance: 1, independent: 3, reliable: 4 }],
  ['aquarius', '水瓶座', { direct: 3, reassurance: 1, independent: 4, reliable: 2 }],
  ['pisces', '双鱼座', { direct: 1, reassurance: 4, independent: 2, reliable: 2 }]
].map(([id, name, weights]) => ({ id, name, weights }));

const mbtiProfiles = [
  ['intj', 'INTJ', { direct: 3, reassurance: 1, independent: 4, reliable: 3 }],
  ['intp', 'INTP', { direct: 3, reassurance: 1, independent: 4, reliable: 1 }],
  ['entj', 'ENTJ', { direct: 4, reassurance: 1, independent: 3, reliable: 4 }],
  ['entp', 'ENTP', { direct: 4, reassurance: 1, independent: 4, reliable: 1 }],
  ['infj', 'INFJ', { direct: 2, reassurance: 4, independent: 2, reliable: 3 }],
  ['infp', 'INFP', { direct: 1, reassurance: 4, independent: 3, reliable: 1 }],
  ['enfj', 'ENFJ', { direct: 3, reassurance: 4, independent: 1, reliable: 3 }],
  ['enfp', 'ENFP', { direct: 3, reassurance: 3, independent: 4, reliable: 1 }],
  ['istj', 'ISTJ', { direct: 2, reassurance: 1, independent: 2, reliable: 4 }],
  ['isfj', 'ISFJ', { direct: 1, reassurance: 4, independent: 1, reliable: 4 }],
  ['estj', 'ESTJ', { direct: 4, reassurance: 1, independent: 2, reliable: 4 }],
  ['esfj', 'ESFJ', { direct: 2, reassurance: 4, independent: 1, reliable: 3 }],
  ['istp', 'ISTP', { direct: 3, reassurance: 1, independent: 4, reliable: 1 }],
  ['isfp', 'ISFP', { direct: 1, reassurance: 3, independent: 4, reliable: 1 }],
  ['estp', 'ESTP', { direct: 4, reassurance: 1, independent: 4, reliable: 1 }],
  ['esfp', 'ESFP', { direct: 2, reassurance: 3, independent: 3, reliable: 1 }]
].map(([id, name, weights]) => ({ id, name, weights }));

const preferenceCopy = {
  direct: { name: '坦诚沟通', detail: '倾向把需求和分歧说清楚，减少反复猜测。' },
  reassurance: { name: '情绪回应', detail: '在意被理解、被安抚，以及稳定的情感确认。' },
  independent: { name: '独立空间', detail: '需要保有自己的节奏，并把信任放在控制之前。' },
  reliable: { name: '稳定行动', detail: '更容易因守约、可预期和持续投入感到安心。' }
};

const traditionalZodiacMatches = {
  aries: ['leo', 'sagittarius', 'aquarius'],
  taurus: ['cancer', 'virgo', 'capricorn'],
  gemini: ['libra', 'aquarius', 'aries'],
  cancer: ['scorpio', 'pisces', 'taurus'],
  leo: ['aries', 'libra', 'sagittarius'],
  virgo: ['taurus', 'cancer', 'capricorn'],
  libra: ['gemini', 'leo', 'aquarius'],
  scorpio: ['cancer', 'pisces', 'virgo'],
  sagittarius: ['aries', 'leo', 'aquarius'],
  capricorn: ['taurus', 'virgo', 'scorpio'],
  aquarius: ['gemini', 'libra', 'sagittarius'],
  pisces: ['cancer', 'scorpio', 'taurus']
};

const traditionalZodiacReasons = {
  aries: '传统西方占星常把火象与风象的互动视为节奏较合拍。',
  taurus: '传统西方占星常把土象与水象的互动视为较容易建立稳定感。',
  gemini: '传统西方占星常把风象与火象的互动视为交流感较强。',
  cancer: '传统西方占星常把水象与土象的互动视为较容易形成情感承接。',
  leo: '传统西方占星常把火象与风象的互动视为节奏较合拍。',
  virgo: '传统西方占星常把土象与水象的互动视为较容易建立稳定感。',
  libra: '传统西方占星常把风象与火象的互动视为交流感较强。',
  scorpio: '传统西方占星常把水象与土象的互动视为较容易形成情感承接。',
  sagittarius: '传统西方占星常把火象与风象的互动视为节奏较合拍。',
  capricorn: '传统西方占星常把土象与水象的互动视为较容易建立稳定感。',
  aquarius: '传统西方占星常把风象与火象的互动视为交流感较强。',
  pisces: '传统西方占星常把水象与土象的互动视为较容易形成情感承接。'
};

export function scoreAnswers(answers) {
  return answers.reduce((scores, answer) => {
    if (Object.hasOwn(scores, answer)) scores[answer] += 1;
    return scores;
  }, zeroScores());
}

function sortedPreferences(scores) {
  const order = Object.keys(preferenceCopy);
  return [...order].sort((left, right) => scores[right] - scores[left] || order.indexOf(left) - order.indexOf(right));
}

function rankProfiles(profiles, scores) {
  const total = Math.max(Object.values(scores).reduce((sum, value) => sum + value, 0), 1);
  return profiles
    .map((profile) => {
      const fit = Object.entries(scores).reduce(
        (sum, [preference, score]) => sum + score * profile.weights[preference],
        0
      );
      const dominant = sortedPreferences(scores)[0];
      return {
        ...profile,
        fit,
        reason: `按本工具的答题偏好模型，可能较容易回应你对${preferenceCopy[dominant].name}的需要。`,
        alignment: Math.round((fit / (total * 4)) * 100)
      };
    })
    .sort((left, right) => right.fit - left.fit || left.name.localeCompare(right.name, 'zh-CN'));
}

function traditionalZodiacReferences(zodiacId, scores) {
  const profileById = Object.fromEntries(zodiacProfiles.map((profile) => [profile.id, profile]));
  const fallback = rankProfiles(zodiacProfiles, scores).slice(0, 3);
  const ids = traditionalZodiacMatches[zodiacId];
  if (!ids) return fallback;

  return ids.map((id) => ({
    ...profileById[id],
    reason: traditionalZodiacReasons[zodiacId]
  }));
}

export function buildResult(profile, answers) {
  const scores = scoreAnswers(answers);
  const preferences = sortedPreferences(scores);
  const [first, second] = preferences;
  return {
    scores,
    preferences,
    headline: `你的相处重心是${preferenceCopy[first].name}和${preferenceCopy[second].name}`,
    summary: `${preferenceCopy[first].detail}${preferenceCopy[second].detail}`,
    topZodiacs: traditionalZodiacReferences(profile.zodiac, scores),
    topMbti: rankProfiles(mbtiProfiles, scores).slice(0, 3),
    zodiacMethod: '星座部分采用最简化的传统西方占星太阳星座元素配对参考，不包含完整出生星盘，也不是科学预测。',
    caution: '如果双方对沟通频率、独处空间或承诺方式的期待不同，就需要更主动地说明节奏和边界。这不代表不适合，只是提醒双方把沟通做得更具体。',
    profile,
    disclaimer: '星座与 MBTI 仅作娱乐性自我探索。它们不能科学预测恋爱是否成功，真实关系仍取决于双方的尊重、沟通与行动。'
  };
}
