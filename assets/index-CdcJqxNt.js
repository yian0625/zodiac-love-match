(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`aries`,name:`白羊座`,dates:`3月21日 - 4月19日`,element:`火象`},{id:`taurus`,name:`金牛座`,dates:`4月20日 - 5月20日`,element:`土象`},{id:`gemini`,name:`双子座`,dates:`5月21日 - 6月21日`,element:`风象`},{id:`cancer`,name:`巨蟹座`,dates:`6月22日 - 7月22日`,element:`水象`},{id:`leo`,name:`狮子座`,dates:`7月23日 - 8月22日`,element:`火象`},{id:`virgo`,name:`处女座`,dates:`8月23日 - 9月22日`,element:`土象`},{id:`libra`,name:`天秤座`,dates:`9月23日 - 10月23日`,element:`风象`},{id:`scorpio`,name:`天蝎座`,dates:`10月24日 - 11月22日`,element:`水象`},{id:`sagittarius`,name:`射手座`,dates:`11月23日 - 12月21日`,element:`火象`},{id:`capricorn`,name:`摩羯座`,dates:`12月22日 - 1月19日`,element:`土象`},{id:`aquarius`,name:`水瓶座`,dates:`1月20日 - 2月18日`,element:`风象`},{id:`pisces`,name:`双鱼座`,dates:`2月19日 - 3月20日`,element:`水象`}],t=[[`intj`,`INTJ`,`内倾 · 直觉 · 思考 · 判断`],[`intp`,`INTP`,`内倾 · 直觉 · 思考 · 感知`],[`entj`,`ENTJ`,`外向 · 直觉 · 思考 · 判断`],[`entp`,`ENTP`,`外向 · 直觉 · 思考 · 感知`],[`infj`,`INFJ`,`内倾 · 直觉 · 情感 · 判断`],[`infp`,`INFP`,`内倾 · 直觉 · 情感 · 感知`],[`enfj`,`ENFJ`,`外向 · 直觉 · 情感 · 判断`],[`enfp`,`ENFP`,`外向 · 直觉 · 情感 · 感知`],[`istj`,`ISTJ`,`内倾 · 实感 · 思考 · 判断`],[`isfj`,`ISFJ`,`内倾 · 实感 · 情感 · 判断`],[`estj`,`ESTJ`,`外向 · 实感 · 思考 · 判断`],[`esfj`,`ESFJ`,`外向 · 实感 · 情感 · 判断`],[`istp`,`ISTP`,`内倾 · 实感 · 思考 · 感知`],[`isfp`,`ISFP`,`内倾 · 实感 · 情感 · 感知`],[`estp`,`ESTP`,`外向 · 实感 · 思考 · 感知`],[`esfp`,`ESFP`,`外向 · 实感 · 情感 · 感知`]].map(([e,t,n])=>({id:e,name:t,dimensions:n})),n=[{category:`发生误会`,prompt:`约会后对方的语气突然变冷，你更希望怎样处理？`,choices:[[`当下直接说清楚，不把猜测留到明天`,`direct`],[`先确认彼此都没事，再慢慢聊原因`,`reassurance`],[`给彼此一点时间，整理好情绪再谈`,`independent`],[`约一个明确时间，把问题好好解决`,`reliable`]]},{category:`日常联系`,prompt:`忙碌的一天里，哪种联系频率让你最安心？`,choices:[[`有事直说，重要时刻及时回应`,`direct`],[`不需要长聊，但会收到关心和报备`,`reassurance`],[`各自忙自己的，晚些时候再自然分享`,`independent`],[`形成稳定节奏，例如早晚问候`,`reliable`]]},{category:`冲突时刻`,prompt:`意见不一致时，你最看重对方做到什么？`,choices:[[`把真实想法讲明白，即使不完全一致`,`direct`],[`先让我感到被理解，再讨论对错`,`reassurance`],[`允许我暂时沉默，不逼我马上回答`,`independent`],[`不失联、不冷处理，愿意把对话完成`,`reliable`]]},{category:`相处节奏`,prompt:`刚开始交往时，你舒服的靠近方式是？`,choices:[[`尽快确认彼此期待，减少暧昧猜测`,`direct`],[`通过被照顾和被回应，慢慢建立信任`,`reassurance`],[`保持自己的生活，不急着绑定全部时间`,`independent`],[`用持续的行动，让关系自然落地`,`reliable`]]},{category:`约会计划`,prompt:`周末空出来时，你更喜欢怎样安排约会？`,choices:[[`说出想去的地方，快速做决定`,`direct`],[`选一个能安心聊天、彼此陪伴的地方`,`reassurance`],[`临时起意也很好，保留变化空间`,`independent`],[`提前商量好行程，避免落空`,`reliable`]]},{category:`表达在乎`,prompt:`当你状态不好时，最想从伴侣那里得到什么？`,choices:[[`坦率问我发生了什么，并一起找办法`,`direct`],[`温柔地陪伴，告诉我不用一个人扛`,`reassurance`],[`相信我能处理好，等我准备好再说`,`independent`],[`记得承诺过的事，并实际做到`,`reliable`]]},{category:`社交边界`,prompt:`伴侣和异性朋友来往时，你最需要的安全感来自？`,choices:[[`有疑虑就直接沟通，不绕弯子`,`direct`],[`主动照顾我的感受，给我确认`,`reassurance`],[`彼此信任，不需要过度汇报`,`independent`],[`提前说清界限，并长期一致地执行`,`reliable`]]},{category:`重要决定`,prompt:`遇到两人都受影响的决定时，你期待的方式是？`,choices:[[`把分歧摆出来，快速对齐关键点`,`direct`],[`先听见彼此担心什么，再做选择`,`reassurance`],[`保留各自选择，不把关系变成控制`,`independent`],[`列好安排和后续，按约定推进`,`reliable`]]},{category:`亲密距离`,prompt:`连续几天没有见面时，你比较理想的状态是？`,choices:[[`直接说想念或想见，不等对方猜`,`direct`],[`有一些温柔的互动，感觉仍被惦记`,`reassurance`],[`享受各自的时间，见面时依然自然`,`independent`],[`按原定计划见面，有变化及时告诉我`,`reliable`]]},{category:`修复关系`,prompt:`争执之后，哪一句话最能让你愿意继续靠近？`,choices:[[`“我想把这件事说清楚。”`,`direct`],[`“我知道你现在不好受，我在。”`,`reassurance`],[`“你可以先静一静，我不会逼你。”`,`independent`],[`“我会在今晚八点回来继续聊。”`,`reliable`]]},{category:`生活习惯`,prompt:`对方临时取消约会，怎样回应最能让你接受？`,choices:[[`清楚说明原因，不含糊其辞`,`direct`],[`先表达抱歉，让我知道自己被在意`,`reassurance`],[`有各自的突发状况，我能理解`,`independent`],[`主动给出新的具体时间并守约`,`reliable`]]},{category:`关系期待`,prompt:`你觉得一段长期关系最不可少的基础是？`,choices:[[`坦诚，不靠试探表达需求`,`direct`],[`共情，在脆弱时能互相接住`,`reassurance`],[`独立，两个人都不失去自己`,`independent`],[`稳定，说到做到且彼此可依靠`,`reliable`]]},{category:`被误解时`,prompt:`当对方误会你的动机，你第一反应更接近？`,choices:[[`立刻解释真实想法，避免越想越偏`,`direct`],[`先问对方为什么会这样感受`,`reassurance`],[`等情绪过去后再处理这件事`,`independent`],[`约定一个不被打扰的时间认真谈`,`reliable`]]},{category:`分享生活`,prompt:`旅行途中计划被打乱，你更欣赏对方怎么做？`,choices:[[`直接提出备选方案，马上重新安排`,`direct`],[`先照顾彼此情绪，把遗憾变得轻一点`,`reassurance`],[`顺其自然，意外也可以成为体验`,`independent`],[`提前准备方案，确保两人都有着落`,`reliable`]]},{category:`亲密表达`,prompt:`收到一份不太合心意的礼物时，你会希望怎样交流？`,choices:[[`坦率感谢，再说明自己真实偏好`,`direct`],[`先珍惜对方的心意，之后温柔沟通`,`reassurance`],[`不必把每件小事都变成讨论`,`independent`],[`记住彼此偏好，下次做得更贴心`,`reliable`]]},{category:`独处时间`,prompt:`你需要一个人待着时，理想的伴侣反应是？`,choices:[[`直接确认我需要多久和怎样联系`,`direct`],[`告诉我没关系，仍然愿意支持我`,`reassurance`],[`尊重空间，不把独处理解成疏远`,`independent`],[`约好下一次联系的时间，让人安心`,`reliable`]]},{category:`共同成长`,prompt:`对未来有不同期待时，你最想先完成哪一步？`,choices:[[`直接问清彼此底线和目标`,`direct`],[`理解不同期待背后的情绪和担心`,`reassurance`],[`承认变化是正常的，给彼此选择权`,`independent`],[`把共识写成清晰的下一步安排`,`reliable`]]},{category:`承诺感`,prompt:`什么最能证明一段关系正在变得可靠？`,choices:[[`困难的事情也愿意坦白说出来`,`direct`],[`彼此的感受会被认真对待`,`reassurance`],[`依然支持对方保有自己的世界`,`independent`],[`承诺能落实在日常细节里`,`reliable`]]},{category:`化解尴尬`,prompt:`饭局上对方说了一句让你不舒服的话，你希望事后？`,choices:[[`找个合适时机直接指出来`,`direct`],[`先听到真诚的关心和道歉`,`reassurance`],[`不想把小插曲放得太大`,`independent`],[`说明会怎样避免下一次再发生`,`reliable`]]},{category:`爱的语言`,prompt:`你更容易从哪件小事里感到被爱？`,choices:[[`对方真诚说出心里话`,`direct`],[`对方注意到我的情绪变化`,`reassurance`],[`对方支持我去做自己喜欢的事`,`independent`],[`对方一直记得并做到答应我的事`,`reliable`]]},{category:`第一次约会`,prompt:`第一次见面后，对方说“到家告诉我”，你更期待后续怎样发展？`,choices:[[`直接说想不想再见，而不是拖着猜`,`direct`],[`收到一句真诚的“今天和你在一起很开心”`,`reassurance`],[`不用立刻定义，给彼此自然了解的空间`,`independent`],[`约好下一次见面的时间，再各自回归生活`,`reliable`]]},{category:`回复消息`,prompt:`对方在工作日很久没回消息，你最希望他或她怎样处理？`,choices:[[`忙完后直接说明刚才在忙什么`,`direct`],[`先告诉我不是故意忽略，让我别担心`,`reassurance`],[`不用把即时回复当作关系考题`,`independent`],[`形成大致的联系习惯，减少反复落空`,`reliable`]]},{category:`暧昧边界`,prompt:`关系还没确认时，对方仍和别人保持暧昧互动，你会怎么做？`,choices:[[`直接问清彼此目前的期待和边界`,`direct`],[`先表达这让我不安，希望被认真对待`,`reassurance`],[`不想过早控制对方，也保留自己的选择`,`independent`],[`等双方都愿意时，再明确专一的约定`,`reliable`]]},{category:`临时爽约`,prompt:`对方在见面前一小时临时取消，你最在意哪一个细节？`,choices:[[`把真实原因讲清楚，不敷衍带过`,`direct`],[`先照顾我的失落，而不是只说“下次再约”`,`reassurance`],[`偶尔变化可以接受，不想把人困在计划里`,`independent`],[`主动提出具体补偿方案并真的兑现`,`reliable`]]},{category:`异地相处`,prompt:`异地期间你觉得最能维持连接感的事情是？`,choices:[[`有分歧时愿意视频聊清楚，不靠冷战`,`direct`],[`在疲惫或想念时能得到及时安慰`,`reassurance`],[`尊重彼此线下生活，不全天候报备`,`independent`],[`把下一次见面的计划落到具体日期`,`reliable`]]},{category:`认识朋友`,prompt:`对方想带你见朋友，你会更希望怎样被介绍？`,choices:[[`明确说清我们目前是什么关系`,`direct`],[`照顾我的紧张感，让我不被晾在一边`,`reassurance`],[`不用高调定义，顺其自然认识就好`,`independent`],[`提前告诉我有哪些人和场合，让我有准备`,`reliable`]]},{category:`纪念日`,prompt:`对方忘了一个对你很重要的纪念日，你更希望怎样修复？`,choices:[[`承认忘记了，不找借口也不回避`,`direct`],[`理解这件事对我的意义，认真安抚我`,`reassurance`],[`不把纪念日当作检验爱的唯一标准`,`independent`],[`一起想办法记住以后重要的日子`,`reliable`]]},{category:`前任话题`,prompt:`聊到前任时，什么样的态度会让你最舒适？`,choices:[[`坦白必要的经历和还没处理好的部分`,`direct`],[`确认现在被选择的是我，而不是让我比较`,`reassurance`],[`每个人都有过去，不需要追问所有细节`,`independent`],[`如果仍有联系，会提前说明边界和原因`,`reliable`]]},{category:`社交媒体`,prompt:`对方很少在社交平台提到你，你更可能怎么理解？`,choices:[[`直接问这个习惯背后的想法，不自己猜`,`direct`],[`更在意私下是否被重视和被肯定`,`reassurance`],[`愿意把关系留在生活里，不必公开展示`,`independent`],[`如果曾说好公开方式，希望能保持一致`,`reliable`]]},{category:`工作变动`,prompt:`对方因工作机会可能搬到另一座城市，你最希望先聊什么？`,choices:[[`直接讨论这会怎样影响两人的关系`,`direct`],[`先确认彼此都被放在重要位置`,`reassurance`],[`支持对方发展，也不急着替对方决定`,`independent`],[`一起评估时间线和可执行的安排`,`reliable`]]},{category:`金钱观念`,prompt:`约会消费习惯不同，你认为最舒服的处理方式是？`,choices:[[`把预算和期待说清楚，避免事后别扭`,`direct`],[`不让对方因为钱感到被衡量或亏欠`,`reassurance`],[`各自承担自己舒服的部分，不强求一致`,`independent`],[`提前商量规则，让日常花费可预期`,`reliable`]]},{category:`生病时`,prompt:`你生病却不方便见面时，什么最让你感到被照顾？`,choices:[[`直接问我需要什么，并尽力做到`,`direct`],[`主动关心状态，让我知道不是一个人`,`reassurance`],[`尊重我想安静休息，不频繁打扰`,`independent`],[`记得按时提醒、送药或持续跟进`,`reliable`]]},{category:`低落情绪`,prompt:`当你明显情绪低落却说“没事”时，你最希望伴侣？`,choices:[[`温和追问一次，给我机会说清楚`,`direct`],[`先陪着我，不急着让我变好`,`reassurance`],[`相信我需要空间，等我主动开口`,`independent`],[`过一段时间仍会回来关心，不忘记这件事`,`reliable`]]},{category:`私人边界`,prompt:`关于手机和聊天记录，你认同哪种相处方式？`,choices:[[`有疑虑直接说，不靠偷看求答案`,`direct`],[`愿意给彼此安全感，但不把怀疑扩大`,`reassurance`],[`手机属于私人空间，信任比检查重要`,`independent`],[`共同约定哪些事需要主动说明并遵守`,`reliable`]]},{category:`家庭相处`,prompt:`第一次见对方家人前，你最想得到怎样的支持？`,choices:[[`提前告诉我家人的性格和注意事项`,`direct`],[`在场时多照顾我的感受和参与感`,`reassurance`],[`允许我按自己的节奏熟悉，不强迫亲近`,`independent`],[`提前一起确认时间、礼物和安排`,`reliable`]]},{category:`亲密边界`,prompt:`当你对亲密接触还没准备好时，理想的回应是？`,choices:[[`直接确认我的界限，不让人猜测`,`direct`],[`让我知道拒绝不会影响被喜欢的程度`,`reassurance`],[`完全尊重我自己的节奏和决定`,`independent`],[`之后也持续遵守说好的界限`,`reliable`]]},{category:`共同生活`,prompt:`如果开始频繁在对方家过夜，你最在意先协商什么？`,choices:[[`把彼此不舒服的习惯早点说出来`,`direct`],[`让彼此都感到被欢迎，而非像客人`,`reassurance`],[`仍保留各自独处和回自己家的选择`,`independent`],[`明确日常分工和物品使用的规则`,`reliable`]]},{category:`意见分歧`,prompt:`当你们对同一件社会新闻看法完全不同，你希望？`,choices:[[`把观点讲完整，也允许彼此追问`,`direct`],[`即使不同意，也不否定对方的感受`,`reassurance`],[`可以保留分歧，不必事事统一`,`independent`],[`约定不人身攻击，聊不下去时暂停`,`reliable`]]},{category:`线上约会`,prompt:`网上认识的人提出第一次线下见面，你最看重？`,choices:[[`提前把地点、时间和期待说清楚`,`direct`],[`对方理解我对安全感的顾虑`,`reassurance`],[`可以先多聊几次，不赶进度`,`independent`],[`选公共场所并确认好往返安排`,`reliable`]]},{category:`未来规划`,prompt:`恋爱一段时间后谈到结婚或同居，你会更想？`,choices:[[`直接问双方想不想走向下一步`,`direct`],[`确认彼此谈未来不是出于压力或比较`,`reassurance`],[`允许答案暂时不一样，不急着逼定`,`independent`],[`把时间、城市和现实条件逐项讨论`,`reliable`]]},{category:`爱好差异`,prompt:`伴侣对你不感兴趣的爱好投入很多时间，你最舒服的态度是？`,choices:[[`直接讨论怎样平衡陪伴与个人时间`,`direct`],[`希望对方偶尔邀请我参与和分享`,`reassurance`],[`支持他或她拥有自己的热爱和圈子`,`independent`],[`提前约好固定的两人时间不被挤掉`,`reliable`]]},{category:`道歉之后`,prompt:`对方已经道歉，但你还是有些介意，你希望接下来？`,choices:[[`把还没说完的感受继续讲清楚`,`direct`],[`对方愿意理解我需要时间消化`,`reassurance`],[`不必反复复盘，给彼此恢复空间`,`independent`],[`看到之后有具体改变，而不只是道歉`,`reliable`]]}].map((e,t)=>({id:t+1,...e,choices:e.choices.map(([e,t])=>({label:e,value:t}))}));function r(e,t=Math.random){let r=[...n];for(let e=r.length-1;e>0;--e){let n=Math.floor(t()*(e+1));[r[e],r[n]]=[r[n],r[e]]}return r.slice(0,e===20?20:12)}var i=()=>({direct:0,reassurance:0,independent:0,reliable:0}),a=[[`aries`,`白羊座`,{direct:4,reassurance:1,independent:3,reliable:1}],[`taurus`,`金牛座`,{direct:1,reassurance:3,independent:1,reliable:4}],[`gemini`,`双子座`,{direct:3,reassurance:1,independent:4,reliable:1}],[`cancer`,`巨蟹座`,{direct:1,reassurance:4,independent:1,reliable:3}],[`leo`,`狮子座`,{direct:3,reassurance:3,independent:2,reliable:2}],[`virgo`,`处女座`,{direct:3,reassurance:1,independent:2,reliable:4}],[`libra`,`天秤座`,{direct:2,reassurance:3,independent:2,reliable:2}],[`scorpio`,`天蝎座`,{direct:2,reassurance:4,independent:1,reliable:3}],[`sagittarius`,`射手座`,{direct:3,reassurance:1,independent:4,reliable:1}],[`capricorn`,`摩羯座`,{direct:2,reassurance:1,independent:3,reliable:4}],[`aquarius`,`水瓶座`,{direct:3,reassurance:1,independent:4,reliable:2}],[`pisces`,`双鱼座`,{direct:1,reassurance:4,independent:2,reliable:2}]].map(([e,t,n])=>({id:e,name:t,weights:n})),o=[[`intj`,`INTJ`,{direct:3,reassurance:1,independent:4,reliable:3}],[`intp`,`INTP`,{direct:3,reassurance:1,independent:4,reliable:1}],[`entj`,`ENTJ`,{direct:4,reassurance:1,independent:3,reliable:4}],[`entp`,`ENTP`,{direct:4,reassurance:1,independent:4,reliable:1}],[`infj`,`INFJ`,{direct:2,reassurance:4,independent:2,reliable:3}],[`infp`,`INFP`,{direct:1,reassurance:4,independent:3,reliable:1}],[`enfj`,`ENFJ`,{direct:3,reassurance:4,independent:1,reliable:3}],[`enfp`,`ENFP`,{direct:3,reassurance:3,independent:4,reliable:1}],[`istj`,`ISTJ`,{direct:2,reassurance:1,independent:2,reliable:4}],[`isfj`,`ISFJ`,{direct:1,reassurance:4,independent:1,reliable:4}],[`estj`,`ESTJ`,{direct:4,reassurance:1,independent:2,reliable:4}],[`esfj`,`ESFJ`,{direct:2,reassurance:4,independent:1,reliable:3}],[`istp`,`ISTP`,{direct:3,reassurance:1,independent:4,reliable:1}],[`isfp`,`ISFP`,{direct:1,reassurance:3,independent:4,reliable:1}],[`estp`,`ESTP`,{direct:4,reassurance:1,independent:4,reliable:1}],[`esfp`,`ESFP`,{direct:2,reassurance:3,independent:3,reliable:1}]].map(([e,t,n])=>({id:e,name:t,weights:n})),s={direct:{name:`坦诚沟通`,detail:`倾向把需求和分歧说清楚，减少反复猜测。`},reassurance:{name:`情绪回应`,detail:`在意被理解、被安抚，以及稳定的情感确认。`},independent:{name:`独立空间`,detail:`需要保有自己的节奏，并把信任放在控制之前。`},reliable:{name:`稳定行动`,detail:`更容易因守约、可预期和持续投入感到安心。`}},c={aries:[`leo`,`sagittarius`,`aquarius`],taurus:[`cancer`,`virgo`,`capricorn`],gemini:[`libra`,`aquarius`,`aries`],cancer:[`scorpio`,`pisces`,`taurus`],leo:[`aries`,`libra`,`sagittarius`],virgo:[`taurus`,`cancer`,`capricorn`],libra:[`gemini`,`leo`,`aquarius`],scorpio:[`cancer`,`pisces`,`virgo`],sagittarius:[`aries`,`leo`,`aquarius`],capricorn:[`taurus`,`virgo`,`scorpio`],aquarius:[`gemini`,`libra`,`sagittarius`],pisces:[`cancer`,`scorpio`,`taurus`]},l={aries:`传统西方占星常把火象与风象的互动视为节奏较合拍。`,taurus:`传统西方占星常把土象与水象的互动视为较容易建立稳定感。`,gemini:`传统西方占星常把风象与火象的互动视为交流感较强。`,cancer:`传统西方占星常把水象与土象的互动视为较容易形成情感承接。`,leo:`传统西方占星常把火象与风象的互动视为节奏较合拍。`,virgo:`传统西方占星常把土象与水象的互动视为较容易建立稳定感。`,libra:`传统西方占星常把风象与火象的互动视为交流感较强。`,scorpio:`传统西方占星常把水象与土象的互动视为较容易形成情感承接。`,sagittarius:`传统西方占星常把火象与风象的互动视为节奏较合拍。`,capricorn:`传统西方占星常把土象与水象的互动视为较容易建立稳定感。`,aquarius:`传统西方占星常把风象与火象的互动视为交流感较强。`,pisces:`传统西方占星常把水象与土象的互动视为较容易形成情感承接。`};function u(e){return e.reduce((e,t)=>(Object.hasOwn(e,t)&&(e[t]+=1),e),i())}function d(e){let t=Object.keys(s);return[...t].sort((n,r)=>e[r]-e[n]||t.indexOf(n)-t.indexOf(r))}function f(e,t){let n=Math.max(Object.values(t).reduce((e,t)=>e+t,0),1);return e.map(e=>{let r=Object.entries(t).reduce((t,[n,r])=>t+r*e.weights[n],0),i=d(t)[0];return{...e,fit:r,reason:`按本工具的答题偏好模型，可能较容易回应你对${s[i].name}的需要。`,alignment:Math.round(r/(n*4)*100)}}).sort((e,t)=>t.fit-e.fit||e.name.localeCompare(t.name,`zh-CN`))}function p(e,t){let n=Object.fromEntries(a.map(e=>[e.id,e])),r=f(a,t).slice(0,3),i=c[e];return i?i.map(t=>({...n[t],reason:l[e]})):r}function m(e,t){let n=u(t),r=d(n),[i,a]=r;return{scores:n,preferences:r,headline:`你的相处重心是${s[i].name}和${s[a].name}`,summary:`${s[i].detail}${s[a].detail}`,topZodiacs:p(e.zodiac,n),topMbti:f(o,n).slice(0,3),zodiacMethod:`星座部分采用最简化的传统西方占星太阳星座元素配对参考，不包含完整出生星盘，也不是科学预测。`,caution:`如果双方对沟通频率、独处空间或承诺方式的期待不同，就需要更主动地说明节奏和边界。这不代表不适合，只是提醒双方把沟通做得更具体。`,profile:e,disclaimer:`星座与 MBTI 仅作娱乐性自我探索。它们不能科学预测恋爱是否成功，真实关系仍取决于双方的尊重、沟通与行动。`}}var h=document.querySelector(`#app`),g={screen:`welcome`,profile:{zodiac:``,mbti:``},questionCount:12,questionIndex:0,answers:[],validationError:``,result:null,questions:[],openPicker:null},_=(e,t)=>`
  <main class="app-shell screen-${t}">
    <header class="site-header">
      <button class="wordmark" type="button" data-action="home" aria-label="回到首页">Match Atlas</button>
    </header>
    ${e}
  </main>
`;function v({field:e,label:t,helper:n,items:r,formatter:i}){let a=r.find(t=>t.id===g.profile[e]),o=g.openPicker===e,s=`${e}-options`;return`
    <div class="field-group picker-field">
      <span class="field-label" id="${e}-label">${t}</span>
      <button class="select-trigger ${a?`has-value`:``}" type="button" data-action="toggle-picker" data-field="${e}" aria-expanded="${o}" aria-haspopup="listbox" aria-controls="${s}" aria-labelledby="${e}-label ${e}-value">
        <span id="${e}-value">${a?`${a.name} - ${i(a)}`:`请选择${t.replace(`你的`,``)}`}</span>
        <span class="select-chevron" aria-hidden="true"></span>
      </button>
      <small>${n}</small>
    </div>
  `}function y(n){let r=n===`zodiac`?{field:`zodiac`,label:`你的星座`,items:e,formatter:e=>`${e.dates} / ${e.element}`}:{field:`mbti`,label:`你的 MBTI`,items:t,formatter:e=>e.dimensions},i=r.items.map(e=>`
    <button class="select-option ${e.id===g.profile[r.field]?`is-selected`:``}" type="button" aria-pressed="${e.id===g.profile[r.field]}" data-action="pick-option" data-field="${r.field}" data-value="${e.id}">
      <strong>${e.name}</strong>
      <span>${r.formatter(e)}</span>
    </button>
  `).join(``);return`
    <button class="picker-scrim" type="button" data-action="close-picker" aria-label="关闭${r.label}选择器"></button>
    <section class="select-sheet" id="${r.field}-options" role="dialog" aria-modal="true" aria-labelledby="${r.field}-sheet-title">
      <header class="select-sheet-header">
        <div>
          <p>选择资料</p>
          <h2 id="${r.field}-sheet-title">${r.label}</h2>
        </div>
        <button class="sheet-close" type="button" data-action="close-picker">完成</button>
      </header>
      <div class="select-options" role="group" aria-label="${r.label}选项">${i}</div>
    </section>
  `}function b(){return _(`
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
  `,`welcome`)}function x(){return _(`
    <section class="flow-screen profile-screen">
      <div class="flow-heading">
        <p class="eyebrow">START WITH YOU</p>
        <h1>先认识一下你。</h1>
        <p>基础资料只用于在结果页提供更完整的星座与 MBTI 参考。</p>
      </div>

      <form class="profile-form" novalidate>
        ${v({field:`zodiac`,label:`你的星座`,helper:`采用西方黄道十二宫的常见日期范围。`,items:e,formatter:e=>`${e.dates} / ${e.element}`})}

        ${v({field:`mbti`,label:`你的 MBTI`,helper:`MBTI 描述偏好维度，不衡量能力或预测恋爱结果。`,items:t,formatter:e=>e.dimensions})}

        ${g.validationError?`<p class="form-error" role="alert">${g.validationError}</p>`:``}
        <button class="primary-button" type="button" data-action="to-length">继续 <span aria-hidden="true">→</span></button>
      </form>
    </section>
    ${g.openPicker?y(g.openPicker):``}
  `,`profile`)}function S(){return _(`
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
  `,`length`)}function C(){let e=g.questions,t=e[g.questionIndex],n=g.answers[g.questionIndex];return _(`
    <section class="quiz-screen">
      <div class="quiz-meta">
        <p><span>恋爱场景</span>${t.category}</p>
        <span>第 ${g.questionIndex+1} 题，共 ${e.length} 题</span>
      </div>
      <div class="question-area">
        <h1>${t.prompt}</h1>
        <div class="choice-list" role="radiogroup" aria-label="${t.prompt}">
          ${t.choices.map((e,t)=>`
            <button class="choice ${n===e.value?`is-selected`:``}" type="button" role="radio" aria-checked="${n===e.value}" data-action="answer" data-value="${e.value}">
              <span class="choice-key" aria-hidden="true">${String.fromCharCode(65+t)}</span>
              <span>${e.label}</span>
            </button>
          `).join(``)}
        </div>
      </div>
      <footer class="quiz-footer">
        <button class="text-button" type="button" data-action="previous" ${g.questionIndex===0?`disabled`:``}>上一题</button>
        <p aria-live="polite">凭第一反应作答即可</p>
      </footer>
    </section>
  `,`quiz`)}function w(){return _(`
    <section class="analysis-screen" aria-live="polite">
      <p class="eyebrow">YOUR RELATIONSHIP MAP</p>
      <h1>正在整理你的<br />相处偏好。</h1>
      <div class="analysis-orbits" aria-hidden="true"><i></i><i></i><i></i></div>
      <p>把你刚才的真实选择，转成更清晰的关系语言。</p>
    </section>
  `,`analyzing`)}function T(e,t){return e.map((e,n)=>`
    <article class="match-item ${n===0?`is-top`:``}">
      <span class="match-rank">${n+1}</span>
      <div>
        <p>${t}</p>
        <h3>${e.name}</h3>
        <span>${e.reason}</span>
      </div>
    </article>
  `).join(``)}function E(){let{result:n}=g,r=e.find(e=>e.id===g.profile.zodiac),i=t.find(e=>e.id===g.profile.mbti),a=n.preferences.slice(0,3).map(e=>`<span class="preference-tag">${{direct:`坦诚沟通`,reassurance:`情绪回应`,independent:`独立空间`,reliable:`稳定行动`}[e]}</span>`).join(``);return _(`
    <section class="result-screen">
      <div class="result-intro">
        <p class="eyebrow">YOUR RELATIONSHIP MAP</p>
        <h1>${n.headline}</h1>
        <p>${n.summary}</p>
        <div class="preference-tags">${a}</div>
      </div>

      <aside class="profile-summary">
        <span>你的资料</span>
        <strong>${r.name} / ${i.name}</strong>
        <p>${r.dates} / ${i.dimensions}</p>
      </aside>

      <section class="matches-section">
        <header>
          <h2>更可能让你感到舒服的互动参考</h2>
          <p>按你的场景题偏好排序，而非判定关系好坏。</p>
        </header>
        <div class="match-columns">
          <div class="match-group">
            <h3>星座传统配对参考</h3>
            ${T(n.topZodiacs,`传统元素配对提示`)}
          </div>
          <div class="match-group">
            <h3>MBTI 互动偏好参考</h3>
            ${T(n.topMbti,`本次答题的偏好模型`)}
          </div>
        </div>
      </section>

      <section class="caution-note">
        <span>需要多一点说明的地方</span>
        <p>${n.caution}</p>
      </section>

      <section class="method-note">
        <h2>结果是怎样形成的？</h2>
        <p>题目将你的选择归纳为坦诚沟通、情绪回应、独立空间与稳定行动四类需求。${n.zodiacMethod}</p>
        <p class="disclaimer">${n.disclaimer}</p>
      </section>

      <button class="primary-button restart-button" type="button" data-action="restart">重新探索 <span aria-hidden="true">→</span></button>
    </section>
  `,`result`)}function D(){h.innerHTML={welcome:b,profile:x,length:S,quiz:C,analyzing:w,result:E}[g.screen]()}function O(){g.screen=`welcome`,g.profile={zodiac:``,mbti:``},g.questionCount=12,g.questionIndex=0,g.answers=[],g.validationError=``,g.result=null,g.questions=[],g.openPicker=null}function k(){g.screen=`analyzing`,D(),window.setTimeout(()=>{g.result=m(g.profile,g.answers),g.screen=`result`,D()},720)}h.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action]`);if(!t)return;let{action:n}=t.dataset;if(n===`home`||n===`restart`){O(),D();return}if(n===`toggle-picker`){g.openPicker=g.openPicker===t.dataset.field?null:t.dataset.field,D();return}if(n===`close-picker`){g.openPicker=null,D();return}if(n===`pick-option`){g.profile[t.dataset.field]=t.dataset.value,g.openPicker=null,g.validationError=``,D();return}if(n===`to-profile`){g.screen=`profile`,g.openPicker=null,D();return}if(n===`to-length`){!g.profile.zodiac||!g.profile.mbti?g.validationError=`请选择你的星座和 MBTI 后再继续。`:(g.screen=`length`,g.openPicker=null),D();return}if(n===`choose-length`){g.questionCount=Number(t.dataset.count),g.questionIndex=0,g.answers=[],g.questions=r(g.questionCount),g.screen=`quiz`,D();return}if(n===`previous`&&g.questionIndex>0){--g.questionIndex,D();return}if(n===`answer`){if(g.answers[g.questionIndex]=t.dataset.value,g.questionIndex===g.questionCount-1){k();return}g.questionIndex+=1,D()}}),D();