import { describe, expect, it } from 'vitest';
import { getQuestions, mbtiTypes, zodiacs } from './quiz.js';
import { buildResult, scoreAnswers } from './match.js';

describe('quiz reference data', () => {
  it('offers non-repeating question sets that can vary between sessions', () => {
    const lowRandomSet = getQuestions(12, () => 0);
    const highRandomSet = getQuestions(12, () => 0.999);

    expect(lowRandomSet).toHaveLength(12);
    expect(getQuestions(20)).toHaveLength(20);
    expect(new Set(lowRandomSet.map((question) => question.id)).size).toBe(12);
    expect(lowRandomSet.map((question) => question.id)).not.toEqual(
      highRandomSet.map((question) => question.id)
    );
  });

  it('uses established zodiac date ranges and all MBTI types', () => {
    expect(zodiacs.find((sign) => sign.id === 'aries')).toMatchObject({
      name: '白羊座',
      dates: '3月21日 - 4月19日'
    });
    expect(mbtiTypes).toHaveLength(16);
    expect(mbtiTypes.find((type) => type.id === 'infj')).toMatchObject({
      name: 'INFJ',
      dimensions: '内倾 · 直觉 · 情感 · 判断'
    });
  });
});

describe('relationship-preference scoring', () => {
  it('counts selected relationship needs', () => {
    expect(scoreAnswers(['direct', 'direct', 'independent'])).toEqual({
      direct: 2,
      reassurance: 0,
      independent: 1,
      reliable: 0
    });
  });

  it('builds explainable, non-deterministic reference results', () => {
    const result = buildResult(
      { zodiac: 'libra', mbti: 'infp' },
      Array(12).fill('reassurance')
    );

    expect(result.topZodiacs).toHaveLength(3);
    expect(result.topMbti).toHaveLength(3);
    expect(result.topZodiacs.map((sign) => sign.id)).toEqual(['gemini', 'leo', 'aquarius']);
    expect(result.headline).toContain('情绪回应');
    expect(result.zodiacMethod).toContain('传统西方占星');
    expect(result.disclaimer).toContain('娱乐性');
    expect(result.caution).toContain('不代表不适合');
  });
});
