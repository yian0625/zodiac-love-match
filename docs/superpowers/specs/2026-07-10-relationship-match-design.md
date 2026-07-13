# Relationship Match Design

## Goal

Create a Chinese, mobile-responsive, browser-only relationship reflection experience. A visitor enters a zodiac sign and MBTI type, chooses a 12- or 20-question scenario quiz, and receives explainable zodiac and MBTI reference suggestions.

## Product boundaries

- The site makes no scientific claim that zodiac signs or MBTI types predict relationship success.
- Zodiac date ranges and MBTI four-letter dimensions are presented accurately. Compatibility outputs are explicitly labelled as entertainment-oriented reflection prompts.
- No account, network request, analytics, or server storage is used. Answers live only in page memory and can be restarted at any time.

## Experience

1. A short welcome screen explains the privacy and entertainment framing.
2. The profile screen collects zodiac sign and MBTI type with clear validation.
3. The visitor selects either a 12-question quick path or a 20-question deep path.
4. Realistic dating scenarios collect preferences across communication, conflict, closeness, pace, and reliability.
5. The results screen derives four preference dimensions from the answers, then recommends the three closest zodiac and MBTI reference profiles while explaining the shared relationship needs.
6. A caution section names profiles that may require more intentional communication, rather than calling anyone unsuitable.

## Scoring model

Each option contributes one point to a single relationship preference dimension: directness, emotional reassurance, independence, or planning reliability. The site scores the visitor's answers, creates a compact narrative from the leading dimensions, and ranks locally defined profile archetypes by shared dimensions. Zodiac and MBTI labels only contextualize those archetypes; all match language must stay probabilistic and non-deterministic.

## Visual direction

An editorial, night-sky-inspired consumer interface: deep ink background, warm ivory typography, one coral accent, rounded panels, fine star-map linework, and restrained motion. The page uses a left-aligned desktop hero, large readable Chinese type, and a single-column mobile flow.

## Architecture

Use a small Vite application with vanilla JavaScript. Keep quiz data and scoring logic in a separate module so it can be unit tested independently. The DOM controller renders a single application state into named screens and delegates click/change handlers from the app root. CSS owns the responsive layout and non-essential decoration.

## Error handling and accessibility

- Prevent moving forward until both profile fields are selected and show an inline error.
- Provide visible keyboard focus, semantic labels, button controls, progress text, and sufficient contrast.
- Respect reduced-motion preferences.
- Treat missing or interrupted quiz state as recoverable by returning the visitor to the setup screen.

## Verification

- Unit tests cover quiz selection, preference scoring, result ordering, and deterministic result copy.
- The production build must succeed.
- A local browser pass checks the 12-question and 20-question paths, validation, results, reset flow, responsive layout, and the stated disclaimer.
