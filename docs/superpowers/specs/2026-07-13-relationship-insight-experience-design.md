# Relationship Insight Experience Design

## Goal

Evolve Match Atlas from a short compatibility quiz into an engaging, mobile-first relationship insight experience. The product should make visitors want to finish the quiz by showing a clear personal payoff, creating an intentional sense of progression, and returning actionable relationship guidance rather than only a ranked compatibility list.

## Product boundaries

- Keep the app browser-only and anonymous: no account, network request, analytics, or answer storage beyond the current page session.
- Preserve the existing 12-question quick path and 20-question deep path. The deep path earns its extra time through additional insight, not a different compatibility verdict.
- Treat zodiac and MBTI as optional entertainment-oriented reference lenses. The relationship profile and recommendations must be based on quiz answers and must never claim to predict relationship success.
- Encourage completion without dark patterns: no countdowns, guilt copy, fabricated scarcity, or anxiety-inducing match claims.

## Experience narrative

The experience is framed as building a personal “relationship map.” A visitor first sees why a relationship can feel tiring even when both people are good, then learns what the quiz will reveal, answers scenario cards that each add a small non-diagnostic clue, and watches the final map unfold in layers.

1. **Invitation:** The welcome page opens with an emotionally recognisable question about why two good people can still feel mismatched. It previews four unlockable areas: core needs, conflict rhythm, closeness pace, and communication prompts.
2. **Setup:** Zodiac and MBTI remain optional reference data in tone, but both remain required fields in the current implementation to keep the existing result lenses available. The copy makes clear that they do not determine the outcome.
3. **Path selection:** The 12-question path promises a core relationship map. The 20-question path promises the same map plus tension patterns, repair guidance, and a small practice plan.
4. **Quiz:** Questions remain scenario-based and have four equally valid choices. A progress meter, category label, and a rotating “map clue” make each answer feel consequential without interpreting it prematurely. A key-moment callout appears at selected questions to explain which relationship area is being clarified.
5. **Reveal:** The analysis state visibly assembles four dimensions before moving into the report.
6. **Report:** The report reveals a concise identity statement first, then the relationship map, a tension/strength interpretation, actionable communication scripts, and optional zodiac/MBTI reference cards. The deep path additionally unlocks a one-week practice section.

## Information architecture

### Welcome screen

- Replace the generic title with a relatable relationship tension hook and a short supporting sentence.
- Add a compact four-item “you will unlock” strip below the primary action. Items name the four report areas, not unearned outcomes.
- Keep the reassurance note that the experience is reflective and not predictive.

### Path selection

- Give each option a distinct report-preview treatment:
  - **12 questions / core map:** primary needs, interaction rhythm, and matching reference cards.
  - **20 questions / full map:** all core-map content plus tension patterns, repair prompts, and a one-week practice.
- State time estimates honestly and keep both buttons equally legible; full map is emphasised by value, not fear of missing out.

### Quiz screen

- Add a visual progress rail that represents completed, current, and remaining questions in addition to the textual count.
- Introduce a short `map clue` beneath or above the choices. It rotates by question category and says what is being explored, for example: “这一题在帮你辨认：你如何感到被认真对待。”
- Show a key-moment notice around the middle and near the final third of each path. It explicitly says that a relationship area is becoming clearer, but does not label an answer as good or bad.
- Preserve back navigation, keyboard support, selection state, reduced-motion support, and the current one-tap progression model.

### Analysis state

- Replace the static orbit treatment with an accessible staged status sequence: collecting answers, mapping four relationship needs, and preparing the report.
- Motion is decorative only. Users with reduced-motion preferences receive the same text sequence without animated transforms.

### Insight report

The report is presented in this order so the most meaningful answer appears before the entertainment references:

1. **Relationship map hero:** Name the leading need and supporting need in clear, non-deterministic language. Display a four-axis visual map with readable labels and values.
2. **Strength and tension:** Explain the leading combination, then identify whether the answer pattern is balanced, strongly concentrated, or contains a meaningful pull between needs (for example, reassurance and independence). Use “may” and “often” language, never diagnosis.
3. **Your interaction manual:** Provide three practical sections: what helps the visitor feel close, what tends to trigger friction, and how to make a request clearly. Each section contains concrete, first-person-ready wording rather than abstract advice.
4. **Repair prompt:** Give a short, reusable repair sequence appropriate to the leading profile: notice, name the need, ask for a specific next step, and agree on when to reconnect.
5. **Reference lenses:** Keep zodiac and MBTI suggestions, but change each card into “easy to connect with / watch for / try this.” All cards explain that the result is a reflection prompt, not a verdict.
6. **Full-map practice:** On the 20-question path only, show a modest one-week practice with one conversation starter and one observable action. The 12-question path shows a transparent invitation to take the full map rather than hiding its own result.
7. **Method and disclaimer:** Retain the scoring explanation and entertainment disclaimer at the end of the report.

## Scoring and insight rules

The four existing dimensions remain the model: direct communication, emotional reassurance, independence, and reliable action.

- Keep the raw score for each dimension and derive a percentage from the answer count. Percentages are explanatory visual weights, not psychometric scores.
- Sort dimensions deterministically using the existing tie-break order.
- Classify the overall map into one of three transparent patterns:
  - **Focused:** top dimension leads the lowest dimension by at least four answers on the 20-question path or three answers on the 12-question path.
  - **Layered:** the top two dimensions are within one answer and both are above the remaining dimensions.
  - **Balanced:** no dimension meets the focused or layered condition.
- Detect a useful tension when the top two needs form one of the defined pairs: reassurance + independence, directness + reassurance, or independence + reliable action. These are described as needs to negotiate, not incompatibilities.
- Attach deterministic copy blocks for each leading dimension, support dimension, pattern, and tension. The app should never generate unsupported personalised claims.
- Preserve the existing compatibility rankings, while adding a plain-language “why it might feel easy” and “what to discuss early” explanation to each reference item.

## Component and state changes

- `quiz.js` continues to own question data. Add category-specific clue copy and optional key-moment metadata rather than duplicating logic in the renderer.
- `match.js` remains the pure analysis module. Extend `buildResult` with dimension weights, pattern, tension, interaction-manual copy, repair prompt, and full-map practice data. Keep results deterministic and unit-testable.
- `main.js` remains the DOM state controller. Add a `reportStage` only for the analysis reveal if needed, and render report sections from `buildResult`; do not introduce persistence or a framework.
- `style.css` owns the report map, progress rail, report hierarchy, and restrained reveal states. The mobile single-column composition remains the primary layout.

## Visual direction

Maintain the current calm, editorial app shell while increasing depth through content hierarchy rather than stacking generic cards. The visual language is a soft relationship atlas: ink blue typography, paper surfaces, one coral accent, sparse constellation-like connective lines, and a compact four-axis map. The report uses varied section treatments—map panel, annotated text, repair sequence, and expandable reference rows—to avoid a repetitive card wall.

Desktop stays contained in the existing app-frame concept; mobile is first-class. Each visualization includes a text alternative, the coral accent is never the only indicator of state, and all button text remains legible at normal sizes.

## Error handling and accessibility

- Continue to prevent starting the quiz without both reference fields and retain an inline validation message.
- All map data has a textual summary and visible labels; the visual shape is not the only way to understand the result.
- Quiz choices maintain radiogroup semantics and visible selection states. Progress is communicated in text as well as graphically.
- Respect `prefers-reduced-motion`; reveal timing may shorten, but no information is delayed indefinitely.
- The report handles ties and unusual distributions through the deterministic pattern rules above, so every complete answer set receives usable guidance.

## Verification

- Extend unit tests for dimension weights, focused/layered/balanced classification, tension detection, and deterministic guidance copy.
- Retain tests for question counts, data references, compatibility ordering, and disclaimer language.
- Run the production build and manually verify: profile validation, both paths, back navigation, progress states, reduced-motion state, map text alternative, 12-question report, 20-question practice, reset flow, and the existing mobile picker behavior.
