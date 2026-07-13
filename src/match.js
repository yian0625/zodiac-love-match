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
    repair: '先说出自己的需要和感受，再确认一句能让人安心的回应。',
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

const tensionCopy = {
  'reassurance-independent': {
    name: '靠近与空间都重要',
    detail: '你可能既希望被惦记，也需要不被追问的独处。把联系节奏说具体，会比彼此猜测更轻松。'
  },
  'direct-reassurance': {
    name: '真实与温柔需要同时到场',
    detail: '你可能希望事情讲清楚，也在乎表达时是否被好好接住。先确认感受，再讨论观点会更顺畅。'
  },
  'independent-reliable': {
    name: '自由和可预期并不矛盾',
    detail: '你可能需要各自的空间，也会因稳定的约定感到安心。关键在于约定联系，而不是随时在线。'
  }
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

function weightScores(scores) {
  const total = Math.max(Object.values(scores).reduce((sum, value) => sum + value, 0), 1);
  return Object.fromEntries(
    Object.keys(preferenceCopy).map((preference) => [
      preference,
      Math.round((scores[preference] / total) * 100)
    ])
  );
}

function classifyMap(scores, preferences) {
  const [first, second, third, fourth] = preferences;
  const answerCount = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const focusGap = answerCount >= 20 ? 4 : 3;

  if (scores[first] - scores[fourth] >= focusGap) {
    return {
      id: 'focused',
      name: '清晰聚焦',
      detail: `你对${preferenceCopy[first].name}的需要格外明确，它会明显影响你对一段关系是否舒服的判断。`
    };
  }

  if (scores[first] - scores[second] <= 1 && scores[second] > scores[third]) {
    return {
      id: 'layered',
      name: '双重需要',
      detail: `${preferenceCopy[first].name}和${preferenceCopy[second].name}会一起影响你的相处感受。`
    };
  }

  return {
    id: 'balanced',
    name: '弹性平衡',
    detail: '你的不同关系需要比较均衡，会随情境调整更看重的部分。'
  };
}

function findTension(scores, preferences) {
  if (scores[preferences[1]] === 0 || scores[preferences[1]] === scores[preferences[2]]) return null;

  const pair = [preferences[0], preferences[1]].sort().join('-');
  const tensionId = {
    'independent-reassurance': 'reassurance-independent',
    'direct-reassurance': 'direct-reassurance',
    'independent-reliable': 'independent-reliable'
  }[pair];

  return tensionId ? { id: tensionId, ...tensionCopy[tensionId] } : null;
}

function addReferenceGuidance(profile, dominantPreference) {
  return {
    ...profile,
    easy: profile.reason || `可能较容易回应你对${preferenceCopy[dominantPreference].name}的需要。`,
    watchFor: '不同的联系频率、表达方式或独处需求，仍值得早点说清。',
    tryThis: '从彼此舒服的沟通节奏开始协商，而不是把标签当作结论。'
  };
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

export function analyzeRelationshipMap(answers) {
  const scores = scoreAnswers(answers);
  const preferences = sortedPreferences(scores);
  const primary = preferenceGuidance[preferences[0]];

  return {
    scores,
    weights: weightScores(scores),
    preferences,
    pattern: classifyMap(scores, preferences),
    tension: findTension(scores, preferences),
    manual: {
      close: primary.close,
      friction: primary.friction,
      request: primary.request
    },
    repairPrompt: primary.repair,
    practice: answers.length === 20 ? primary.practice : null
  };
}

export function buildResult(profile, answers) {
  const map = analyzeRelationshipMap(answers);
  const { scores, preferences } = map;
  const [first, second] = preferences;
  return {
    ...map,
    headline: `你的相处重心是${preferenceCopy[first].name}和${preferenceCopy[second].name}`,
    summary: `${preferenceCopy[first].detail}${preferenceCopy[second].detail}`,
    topZodiacs: traditionalZodiacReferences(profile.zodiac, scores)
      .map((profileItem) => addReferenceGuidance(profileItem, first)),
    topMbti: rankProfiles(mbtiProfiles, scores)
      .slice(0, 3)
      .map((profileItem) => addReferenceGuidance(profileItem, first)),
    zodiacMethod: '星座部分采用最简化的传统西方占星太阳星座元素配对参考，不包含完整出生星盘，也不是科学预测。',
    caution: '如果双方对沟通频率、独处空间或承诺方式的期待不同，就需要更主动地说明节奏和边界。这不代表不适合，只是提醒双方把沟通做得更具体。',
    profile,
    disclaimer: '星座与 MBTI 仅作娱乐性自我探索。它们不能科学预测恋爱是否成功，真实关系仍取决于双方的尊重、沟通与行动。'
  };
}
