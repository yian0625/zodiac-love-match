import { describe, expect, it } from 'vitest';
import { getKeyMoment, getQuestions, mbtiTypes, zodiacs } from './quiz.js';
import { analyzeRelationshipMap, buildResult, scoreAnswers } from './match.js';

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

  it('attaches a relationship-map clue to every question', () => {
    const questions = getQuestions(20, () => 0);

    expect(questions.every((question) => question.clue)).toBe(true);
    expect(questions.every((question) => question.clue.includes(question.category))).toBe(true);
  });

  it('marks meaningful progress moments for both quiz lengths', () => {
    expect(getKeyMoment(12, 3)).toContain('关键分岔');
    expect(getKeyMoment(12, 4)).toBeNull();
    expect(getKeyMoment(20, 11)).toContain('关系地图');
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

  it('normalizes relationship needs into readable map weights', () => {
    expect(analyzeRelationshipMap(['direct', 'direct', 'reliable', 'independent']).weights).toEqual({
      direct: 50,
      reassurance: 0,
      independent: 25,
      reliable: 25
    });
  });

  it('classifies focused, layered, and balanced relationship maps', () => {
    expect(analyzeRelationshipMap(Array(12).fill('direct')).pattern.id).toBe('focused');

    const layeredAnswers = [
      ...Array(4).fill('reassurance'),
      ...Array(4).fill('independent'),
      ...Array(2).fill('direct'),
      ...Array(2).fill('reliable')
    ];
    expect(analyzeRelationshipMap(layeredAnswers).pattern.id).toBe('layered');

    expect(analyzeRelationshipMap(['direct', 'reassurance', 'independent', 'reliable']).pattern.id)
      .toBe('balanced');
  });

  it('identifies negotiation tensions without treating them as incompatibilities', () => {
    const map = analyzeRelationshipMap(['reassurance', 'reassurance', 'independent', 'independent']);

    expect(map.tension).toMatchObject({ id: 'reassurance-independent' });
    expect(map.repairPrompt).toContain('需要');
    expect(map.tension.detail).not.toContain('不适合');
  });

  it('does not infer a tension from an unanswered secondary need', () => {
    expect(analyzeRelationshipMap(Array(12).fill('direct')).tension).toBeNull();
  });

  it('unlocks a practice only on the 20-question path', () => {
    const profile = { zodiac: 'libra', mbti: 'infp' };

    expect(buildResult(profile, Array(12).fill('direct')).practice).toBeNull();
    expect(buildResult(profile, Array(20).fill('direct')).practice).toMatchObject({
      title: expect.any(String),
      conversation: expect.any(String),
      action: expect.any(String)
    });
  });

  it('gives every reference a way to connect, discuss, and try', () => {
    const result = buildResult(
      { zodiac: 'libra', mbti: 'infp' },
      Array(12).fill('reassurance')
    );

    expect(result.topMbti[0]).toMatchObject({
      easy: expect.any(String),
      watchFor: expect.any(String),
      tryThis: expect.any(String)
    });
  });
});
