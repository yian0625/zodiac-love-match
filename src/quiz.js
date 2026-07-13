export const zodiacs = [
  { id: 'aries', name: '白羊座', dates: '3月21日 - 4月19日', element: '火象' },
  { id: 'taurus', name: '金牛座', dates: '4月20日 - 5月20日', element: '土象' },
  { id: 'gemini', name: '双子座', dates: '5月21日 - 6月21日', element: '风象' },
  { id: 'cancer', name: '巨蟹座', dates: '6月22日 - 7月22日', element: '水象' },
  { id: 'leo', name: '狮子座', dates: '7月23日 - 8月22日', element: '火象' },
  { id: 'virgo', name: '处女座', dates: '8月23日 - 9月22日', element: '土象' },
  { id: 'libra', name: '天秤座', dates: '9月23日 - 10月23日', element: '风象' },
  { id: 'scorpio', name: '天蝎座', dates: '10月24日 - 11月22日', element: '水象' },
  { id: 'sagittarius', name: '射手座', dates: '11月23日 - 12月21日', element: '火象' },
  { id: 'capricorn', name: '摩羯座', dates: '12月22日 - 1月19日', element: '土象' },
  { id: 'aquarius', name: '水瓶座', dates: '1月20日 - 2月18日', element: '风象' },
  { id: 'pisces', name: '双鱼座', dates: '2月19日 - 3月20日', element: '水象' }
];

export const mbtiTypes = [
  ['intj', 'INTJ', '内倾 · 直觉 · 思考 · 判断'],
  ['intp', 'INTP', '内倾 · 直觉 · 思考 · 感知'],
  ['entj', 'ENTJ', '外向 · 直觉 · 思考 · 判断'],
  ['entp', 'ENTP', '外向 · 直觉 · 思考 · 感知'],
  ['infj', 'INFJ', '内倾 · 直觉 · 情感 · 判断'],
  ['infp', 'INFP', '内倾 · 直觉 · 情感 · 感知'],
  ['enfj', 'ENFJ', '外向 · 直觉 · 情感 · 判断'],
  ['enfp', 'ENFP', '外向 · 直觉 · 情感 · 感知'],
  ['istj', 'ISTJ', '内倾 · 实感 · 思考 · 判断'],
  ['isfj', 'ISFJ', '内倾 · 实感 · 情感 · 判断'],
  ['estj', 'ESTJ', '外向 · 实感 · 思考 · 判断'],
  ['esfj', 'ESFJ', '外向 · 实感 · 情感 · 判断'],
  ['istp', 'ISTP', '内倾 · 实感 · 思考 · 感知'],
  ['isfp', 'ISFP', '内倾 · 实感 · 情感 · 感知'],
  ['estp', 'ESTP', '外向 · 实感 · 思考 · 感知'],
  ['esfp', 'ESFP', '外向 · 实感 · 情感 · 感知']
].map(([id, name, dimensions]) => ({ id, name, dimensions }));

const relationshipMapClue = (category) =>
  `关系地图线索：在「${category}」这件事里，什么会让你感觉彼此正在好好相处？`;

const quizKeyMoments = {
  12: {
    3: '关键分岔：这组选择正在帮你看清，你需要怎样被认真回应。',
    7: '关系地图开始成形：你对靠近与边界的偏好正在变得清楚。',
    10: '最后一段线索：接下来会整理你在修复关系时最看重的部分。'
  },
  20: {
    5: '关键分岔：这组选择正在帮你看清，你需要怎样被认真回应。',
    11: '关系地图开始成形：你对靠近与边界的偏好正在变得清楚。',
    16: '最后一段线索：接下来会整理你在修复关系时最看重的部分。'
  }
};

export function getKeyMoment(total, index) {
  return quizKeyMoments[total]?.[index] ?? null;
}

const questions = [
  {
    category: '发生误会',
    prompt: '约会后对方的语气突然变冷，你更希望怎样处理？',
    choices: [
      ['当下直接说清楚，不把猜测留到明天', 'direct'],
      ['先确认彼此都没事，再慢慢聊原因', 'reassurance'],
      ['给彼此一点时间，整理好情绪再谈', 'independent'],
      ['约一个明确时间，把问题好好解决', 'reliable']
    ]
  },
  {
    category: '日常联系',
    prompt: '忙碌的一天里，哪种联系频率让你最安心？',
    choices: [
      ['有事直说，重要时刻及时回应', 'direct'],
      ['不需要长聊，但会收到关心和报备', 'reassurance'],
      ['各自忙自己的，晚些时候再自然分享', 'independent'],
      ['形成稳定节奏，例如早晚问候', 'reliable']
    ]
  },
  {
    category: '冲突时刻',
    prompt: '意见不一致时，你最看重对方做到什么？',
    choices: [
      ['把真实想法讲明白，即使不完全一致', 'direct'],
      ['先让我感到被理解，再讨论对错', 'reassurance'],
      ['允许我暂时沉默，不逼我马上回答', 'independent'],
      ['不失联、不冷处理，愿意把对话完成', 'reliable']
    ]
  },
  {
    category: '相处节奏',
    prompt: '刚开始交往时，你舒服的靠近方式是？',
    choices: [
      ['尽快确认彼此期待，减少暧昧猜测', 'direct'],
      ['通过被照顾和被回应，慢慢建立信任', 'reassurance'],
      ['保持自己的生活，不急着绑定全部时间', 'independent'],
      ['用持续的行动，让关系自然落地', 'reliable']
    ]
  },
  {
    category: '约会计划',
    prompt: '周末空出来时，你更喜欢怎样安排约会？',
    choices: [
      ['说出想去的地方，快速做决定', 'direct'],
      ['选一个能安心聊天、彼此陪伴的地方', 'reassurance'],
      ['临时起意也很好，保留变化空间', 'independent'],
      ['提前商量好行程，避免落空', 'reliable']
    ]
  },
  {
    category: '表达在乎',
    prompt: '当你状态不好时，最想从伴侣那里得到什么？',
    choices: [
      ['坦率问我发生了什么，并一起找办法', 'direct'],
      ['温柔地陪伴，告诉我不用一个人扛', 'reassurance'],
      ['相信我能处理好，等我准备好再说', 'independent'],
      ['记得承诺过的事，并实际做到', 'reliable']
    ]
  },
  {
    category: '社交边界',
    prompt: '伴侣和异性朋友来往时，你最需要的安全感来自？',
    choices: [
      ['有疑虑就直接沟通，不绕弯子', 'direct'],
      ['主动照顾我的感受，给我确认', 'reassurance'],
      ['彼此信任，不需要过度汇报', 'independent'],
      ['提前说清界限，并长期一致地执行', 'reliable']
    ]
  },
  {
    category: '重要决定',
    prompt: '遇到两人都受影响的决定时，你期待的方式是？',
    choices: [
      ['把分歧摆出来，快速对齐关键点', 'direct'],
      ['先听见彼此担心什么，再做选择', 'reassurance'],
      ['保留各自选择，不把关系变成控制', 'independent'],
      ['列好安排和后续，按约定推进', 'reliable']
    ]
  },
  {
    category: '亲密距离',
    prompt: '连续几天没有见面时，你比较理想的状态是？',
    choices: [
      ['直接说想念或想见，不等对方猜', 'direct'],
      ['有一些温柔的互动，感觉仍被惦记', 'reassurance'],
      ['享受各自的时间，见面时依然自然', 'independent'],
      ['按原定计划见面，有变化及时告诉我', 'reliable']
    ]
  },
  {
    category: '修复关系',
    prompt: '争执之后，哪一句话最能让你愿意继续靠近？',
    choices: [
      ['“我想把这件事说清楚。”', 'direct'],
      ['“我知道你现在不好受，我在。”', 'reassurance'],
      ['“你可以先静一静，我不会逼你。”', 'independent'],
      ['“我会在今晚八点回来继续聊。”', 'reliable']
    ]
  },
  {
    category: '生活习惯',
    prompt: '对方临时取消约会，怎样回应最能让你接受？',
    choices: [
      ['清楚说明原因，不含糊其辞', 'direct'],
      ['先表达抱歉，让我知道自己被在意', 'reassurance'],
      ['有各自的突发状况，我能理解', 'independent'],
      ['主动给出新的具体时间并守约', 'reliable']
    ]
  },
  {
    category: '关系期待',
    prompt: '你觉得一段长期关系最不可少的基础是？',
    choices: [
      ['坦诚，不靠试探表达需求', 'direct'],
      ['共情，在脆弱时能互相接住', 'reassurance'],
      ['独立，两个人都不失去自己', 'independent'],
      ['稳定，说到做到且彼此可依靠', 'reliable']
    ]
  },
  {
    category: '被误解时',
    prompt: '当对方误会你的动机，你第一反应更接近？',
    choices: [
      ['立刻解释真实想法，避免越想越偏', 'direct'],
      ['先问对方为什么会这样感受', 'reassurance'],
      ['等情绪过去后再处理这件事', 'independent'],
      ['约定一个不被打扰的时间认真谈', 'reliable']
    ]
  },
  {
    category: '分享生活',
    prompt: '旅行途中计划被打乱，你更欣赏对方怎么做？',
    choices: [
      ['直接提出备选方案，马上重新安排', 'direct'],
      ['先照顾彼此情绪，把遗憾变得轻一点', 'reassurance'],
      ['顺其自然，意外也可以成为体验', 'independent'],
      ['提前准备方案，确保两人都有着落', 'reliable']
    ]
  },
  {
    category: '亲密表达',
    prompt: '收到一份不太合心意的礼物时，你会希望怎样交流？',
    choices: [
      ['坦率感谢，再说明自己真实偏好', 'direct'],
      ['先珍惜对方的心意，之后温柔沟通', 'reassurance'],
      ['不必把每件小事都变成讨论', 'independent'],
      ['记住彼此偏好，下次做得更贴心', 'reliable']
    ]
  },
  {
    category: '独处时间',
    prompt: '你需要一个人待着时，理想的伴侣反应是？',
    choices: [
      ['直接确认我需要多久和怎样联系', 'direct'],
      ['告诉我没关系，仍然愿意支持我', 'reassurance'],
      ['尊重空间，不把独处理解成疏远', 'independent'],
      ['约好下一次联系的时间，让人安心', 'reliable']
    ]
  },
  {
    category: '共同成长',
    prompt: '对未来有不同期待时，你最想先完成哪一步？',
    choices: [
      ['直接问清彼此底线和目标', 'direct'],
      ['理解不同期待背后的情绪和担心', 'reassurance'],
      ['承认变化是正常的，给彼此选择权', 'independent'],
      ['把共识写成清晰的下一步安排', 'reliable']
    ]
  },
  {
    category: '承诺感',
    prompt: '什么最能证明一段关系正在变得可靠？',
    choices: [
      ['困难的事情也愿意坦白说出来', 'direct'],
      ['彼此的感受会被认真对待', 'reassurance'],
      ['依然支持对方保有自己的世界', 'independent'],
      ['承诺能落实在日常细节里', 'reliable']
    ]
  },
  {
    category: '化解尴尬',
    prompt: '饭局上对方说了一句让你不舒服的话，你希望事后？',
    choices: [
      ['找个合适时机直接指出来', 'direct'],
      ['先听到真诚的关心和道歉', 'reassurance'],
      ['不想把小插曲放得太大', 'independent'],
      ['说明会怎样避免下一次再发生', 'reliable']
    ]
  },
  {
    category: '爱的语言',
    prompt: '你更容易从哪件小事里感到被爱？',
    choices: [
      ['对方真诚说出心里话', 'direct'],
      ['对方注意到我的情绪变化', 'reassurance'],
      ['对方支持我去做自己喜欢的事', 'independent'],
      ['对方一直记得并做到答应我的事', 'reliable']
    ]
  },
  {
    category: '第一次约会',
    prompt: '第一次见面后，对方说“到家告诉我”，你更期待后续怎样发展？',
    choices: [
      ['直接说想不想再见，而不是拖着猜', 'direct'],
      ['收到一句真诚的“今天和你在一起很开心”', 'reassurance'],
      ['不用立刻定义，给彼此自然了解的空间', 'independent'],
      ['约好下一次见面的时间，再各自回归生活', 'reliable']
    ]
  },
  {
    category: '回复消息',
    prompt: '对方在工作日很久没回消息，你最希望他或她怎样处理？',
    choices: [
      ['忙完后直接说明刚才在忙什么', 'direct'],
      ['先告诉我不是故意忽略，让我别担心', 'reassurance'],
      ['不用把即时回复当作关系考题', 'independent'],
      ['形成大致的联系习惯，减少反复落空', 'reliable']
    ]
  },
  {
    category: '暧昧边界',
    prompt: '关系还没确认时，对方仍和别人保持暧昧互动，你会怎么做？',
    choices: [
      ['直接问清彼此目前的期待和边界', 'direct'],
      ['先表达这让我不安，希望被认真对待', 'reassurance'],
      ['不想过早控制对方，也保留自己的选择', 'independent'],
      ['等双方都愿意时，再明确专一的约定', 'reliable']
    ]
  },
  {
    category: '临时爽约',
    prompt: '对方在见面前一小时临时取消，你最在意哪一个细节？',
    choices: [
      ['把真实原因讲清楚，不敷衍带过', 'direct'],
      ['先照顾我的失落，而不是只说“下次再约”', 'reassurance'],
      ['偶尔变化可以接受，不想把人困在计划里', 'independent'],
      ['主动提出具体补偿方案并真的兑现', 'reliable']
    ]
  },
  {
    category: '异地相处',
    prompt: '异地期间你觉得最能维持连接感的事情是？',
    choices: [
      ['有分歧时愿意视频聊清楚，不靠冷战', 'direct'],
      ['在疲惫或想念时能得到及时安慰', 'reassurance'],
      ['尊重彼此线下生活，不全天候报备', 'independent'],
      ['把下一次见面的计划落到具体日期', 'reliable']
    ]
  },
  {
    category: '认识朋友',
    prompt: '对方想带你见朋友，你会更希望怎样被介绍？',
    choices: [
      ['明确说清我们目前是什么关系', 'direct'],
      ['照顾我的紧张感，让我不被晾在一边', 'reassurance'],
      ['不用高调定义，顺其自然认识就好', 'independent'],
      ['提前告诉我有哪些人和场合，让我有准备', 'reliable']
    ]
  },
  {
    category: '纪念日',
    prompt: '对方忘了一个对你很重要的纪念日，你更希望怎样修复？',
    choices: [
      ['承认忘记了，不找借口也不回避', 'direct'],
      ['理解这件事对我的意义，认真安抚我', 'reassurance'],
      ['不把纪念日当作检验爱的唯一标准', 'independent'],
      ['一起想办法记住以后重要的日子', 'reliable']
    ]
  },
  {
    category: '前任话题',
    prompt: '聊到前任时，什么样的态度会让你最舒适？',
    choices: [
      ['坦白必要的经历和还没处理好的部分', 'direct'],
      ['确认现在被选择的是我，而不是让我比较', 'reassurance'],
      ['每个人都有过去，不需要追问所有细节', 'independent'],
      ['如果仍有联系，会提前说明边界和原因', 'reliable']
    ]
  },
  {
    category: '社交媒体',
    prompt: '对方很少在社交平台提到你，你更可能怎么理解？',
    choices: [
      ['直接问这个习惯背后的想法，不自己猜', 'direct'],
      ['更在意私下是否被重视和被肯定', 'reassurance'],
      ['愿意把关系留在生活里，不必公开展示', 'independent'],
      ['如果曾说好公开方式，希望能保持一致', 'reliable']
    ]
  },
  {
    category: '工作变动',
    prompt: '对方因工作机会可能搬到另一座城市，你最希望先聊什么？',
    choices: [
      ['直接讨论这会怎样影响两人的关系', 'direct'],
      ['先确认彼此都被放在重要位置', 'reassurance'],
      ['支持对方发展，也不急着替对方决定', 'independent'],
      ['一起评估时间线和可执行的安排', 'reliable']
    ]
  },
  {
    category: '金钱观念',
    prompt: '约会消费习惯不同，你认为最舒服的处理方式是？',
    choices: [
      ['把预算和期待说清楚，避免事后别扭', 'direct'],
      ['不让对方因为钱感到被衡量或亏欠', 'reassurance'],
      ['各自承担自己舒服的部分，不强求一致', 'independent'],
      ['提前商量规则，让日常花费可预期', 'reliable']
    ]
  },
  {
    category: '生病时',
    prompt: '你生病却不方便见面时，什么最让你感到被照顾？',
    choices: [
      ['直接问我需要什么，并尽力做到', 'direct'],
      ['主动关心状态，让我知道不是一个人', 'reassurance'],
      ['尊重我想安静休息，不频繁打扰', 'independent'],
      ['记得按时提醒、送药或持续跟进', 'reliable']
    ]
  },
  {
    category: '低落情绪',
    prompt: '当你明显情绪低落却说“没事”时，你最希望伴侣？',
    choices: [
      ['温和追问一次，给我机会说清楚', 'direct'],
      ['先陪着我，不急着让我变好', 'reassurance'],
      ['相信我需要空间，等我主动开口', 'independent'],
      ['过一段时间仍会回来关心，不忘记这件事', 'reliable']
    ]
  },
  {
    category: '私人边界',
    prompt: '关于手机和聊天记录，你认同哪种相处方式？',
    choices: [
      ['有疑虑直接说，不靠偷看求答案', 'direct'],
      ['愿意给彼此安全感，但不把怀疑扩大', 'reassurance'],
      ['手机属于私人空间，信任比检查重要', 'independent'],
      ['共同约定哪些事需要主动说明并遵守', 'reliable']
    ]
  },
  {
    category: '家庭相处',
    prompt: '第一次见对方家人前，你最想得到怎样的支持？',
    choices: [
      ['提前告诉我家人的性格和注意事项', 'direct'],
      ['在场时多照顾我的感受和参与感', 'reassurance'],
      ['允许我按自己的节奏熟悉，不强迫亲近', 'independent'],
      ['提前一起确认时间、礼物和安排', 'reliable']
    ]
  },
  {
    category: '亲密边界',
    prompt: '当你对亲密接触还没准备好时，理想的回应是？',
    choices: [
      ['直接确认我的界限，不让人猜测', 'direct'],
      ['让我知道拒绝不会影响被喜欢的程度', 'reassurance'],
      ['完全尊重我自己的节奏和决定', 'independent'],
      ['之后也持续遵守说好的界限', 'reliable']
    ]
  },
  {
    category: '共同生活',
    prompt: '如果开始频繁在对方家过夜，你最在意先协商什么？',
    choices: [
      ['把彼此不舒服的习惯早点说出来', 'direct'],
      ['让彼此都感到被欢迎，而非像客人', 'reassurance'],
      ['仍保留各自独处和回自己家的选择', 'independent'],
      ['明确日常分工和物品使用的规则', 'reliable']
    ]
  },
  {
    category: '意见分歧',
    prompt: '当你们对同一件社会新闻看法完全不同，你希望？',
    choices: [
      ['把观点讲完整，也允许彼此追问', 'direct'],
      ['即使不同意，也不否定对方的感受', 'reassurance'],
      ['可以保留分歧，不必事事统一', 'independent'],
      ['约定不人身攻击，聊不下去时暂停', 'reliable']
    ]
  },
  {
    category: '线上约会',
    prompt: '网上认识的人提出第一次线下见面，你最看重？',
    choices: [
      ['提前把地点、时间和期待说清楚', 'direct'],
      ['对方理解我对安全感的顾虑', 'reassurance'],
      ['可以先多聊几次，不赶进度', 'independent'],
      ['选公共场所并确认好往返安排', 'reliable']
    ]
  },
  {
    category: '未来规划',
    prompt: '恋爱一段时间后谈到结婚或同居，你会更想？',
    choices: [
      ['直接问双方想不想走向下一步', 'direct'],
      ['确认彼此谈未来不是出于压力或比较', 'reassurance'],
      ['允许答案暂时不一样，不急着逼定', 'independent'],
      ['把时间、城市和现实条件逐项讨论', 'reliable']
    ]
  },
  {
    category: '爱好差异',
    prompt: '伴侣对你不感兴趣的爱好投入很多时间，你最舒服的态度是？',
    choices: [
      ['直接讨论怎样平衡陪伴与个人时间', 'direct'],
      ['希望对方偶尔邀请我参与和分享', 'reassurance'],
      ['支持他或她拥有自己的热爱和圈子', 'independent'],
      ['提前约好固定的两人时间不被挤掉', 'reliable']
    ]
  },
  {
    category: '道歉之后',
    prompt: '对方已经道歉，但你还是有些介意，你希望接下来？',
    choices: [
      ['把还没说完的感受继续讲清楚', 'direct'],
      ['对方愿意理解我需要时间消化', 'reassurance'],
      ['不必反复复盘，给彼此恢复空间', 'independent'],
      ['看到之后有具体改变，而不只是道歉', 'reliable']
    ]
  }
].map((question, index) => ({
  id: index + 1,
  ...question,
  clue: relationshipMapClue(question.category),
  choices: question.choices.map(([label, value]) => ({ label, value }))
}));

export function getQuestions(count, random = Math.random) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled.slice(0, count === 20 ? 20 : 12);
}
