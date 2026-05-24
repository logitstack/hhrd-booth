# HHRD Booth - Soft Launch + Quiz

The app is configured for a soft launch (no photos, no stories yet) and now includes an interactive quiz with leaderboards.

---

## What's live

### Explore mode
- All 57 countries on the globe with correct coordinates
- **Tap anywhere on a country** to open its details (not just the pin)
- **Pinch to zoom** in and out of the globe
- **Zoom buttons** (+/−/Reset) in the bottom-right for users who don't pinch
- All 11 programs with correct codes (SPR, CWDP, KIND-R, ESP, Qurbani all fixed)
- All 198 program rows with real beneficiary numbers and Cumulative tags
- Expandable program descriptions in the country popup
- Search bar across 57 countries
- Donate QR (client-side, points to hhrd.org with UTM tags)
- 5-tap top-left corner admin access
- Full analytics + CSV export

### Quiz mode (new)
- Floating "Play the quiz" button in the bottom-left of active mode
- Visitor enters a nickname for the leaderboard
- 8 questions per game, randomly drawn from a pool of 15 humanitarian and HHRD trivia questions
- Question appears at the top of the screen; visitor taps a country on the globe to answer
- Right answer: green flash on the country, +10 points, brief context explanation
- Wrong answer: red flash on tapped country, green outline on the correct country, context explanation
- Auto-advances every 3 seconds
- Final score screen with top-10 leaderboard, current player highlighted
- Play again or back to globe

### Question pool topics
- World refugee data (Kutupalong, Lebanon, Jordan, Kenya, Pakistan-Afghan refugees)
- Humanitarian crises (Türkiye earthquake, Pakistan floods, Haiti earthquake, Nepal earthquake, Marawi siege, Hurricane Maria)
- HHRD-specific (KIND-R, Gaza response, Pakistan as largest country of operation)

Edit the questions in `src/quizData.js` if any facts need adjustment before launch. All answer countries are validated against `countryData.js` so visitors can actually tap them on the globe.

## What's suppressed

- Right-side photo pane (the entire 420px column that holds stories and photo cards)
- The 47 success stories from the workbook (still in `countryData.js`, dormant)
- Gradient placeholder cards

## To flip back to full experience

Edit `src/App.jsx`, near the top change:

```js
const SOFT_LAUNCH_MODE = true;
```

to `false`. No other code changes needed. Photos appear wherever `PHOTO_MANIFEST` has entries in `countryData.js`. Stories appear automatically for the 47 country/program combinations that have one.

---

## Files in this drop

| File | Where it goes |
|---|---|
| `src/App.jsx` | main app component |
| `src/countryData.js` | country and program data |
| `src/quizData.js` | quiz question bank + leaderboard helper (new) |
| `DEPLOY.md` | deploy guide |

`main.jsx`, `index.html`, `index.css`, and config files unchanged from the initial drop.

---

## One-time setup

Already done if you've already run `npm install` in the project. Otherwise:

```bash
npm install
```

The QR code dependency `qrcode.react` is already in `package.json`.

---

## Test checklist

### Explore mode
- [ ] Globe loads, pins appear when you rotate
- [ ] Pinch to zoom in and out (smooth, snaps to limits)
- [ ] Tap +/− buttons in bottom-right; zoom changes by 35% each step
- [ ] Reset button appears only when zoomed away from 1x; tapping it returns to default
- [ ] **Tap on a country body (not the pin)** opens the popup
- [ ] Tap a pin: same result
- [ ] Drag to rotate; popup follows the country
- [ ] Search bar filters dropdown
- [ ] Donate QR scans to hhrd.org with UTM params

### Quiz mode
- [ ] "Play the quiz" button visible in bottom-left during active mode
- [ ] Button hidden during quiz, when a country popup is open, and in attract mode
- [ ] Tap "Play the quiz" → intro modal with nickname input
- [ ] Nickname autofocuses; Enter key starts the quiz
- [ ] Empty nickname defaults to "Guest"
- [ ] Question banner appears at top; globe takes the rest of the screen
- [ ] Pins are hidden during quiz (visitors find countries themselves)
- [ ] Tap a country: green or red feedback appears, country flashes
- [ ] Wrong answer: correct country shown with green outline
- [ ] After 3 seconds: next question appears, or game-complete screen
- [ ] Final score: ranked leaderboard with player highlighted
- [ ] Play again starts a fresh game with same nickname
- [ ] Back to globe returns to explore mode
- [ ] Top-left 5-tap → admin still works
- [ ] 90 seconds idle in any quiz phase: returns to screensaver, quiz state cleared

---

## Editing the quiz

Open `src/quizData.js`. Each question is an object with:

```js
{
  id: 'unique-id',
  question: "The text shown to the visitor",
  answer: 'Country Name',           // must match a country in countryData.js
  context: "Shown during feedback.",
  category: 'refugees' | 'crises' | 'hhrd',
  source: 'optional citation'
}
```

To add or remove questions, edit the array. To change game length, edit `QUIZ_LENGTH` at the top (defaults to 8).

To reset the leaderboard, open the admin panel (5-tap top-left in any mode) — currently the admin panel only resets analytics, not the leaderboard. To reset the leaderboard, run this in the browser console:

```js
localStorage.removeItem('hhrd:quiz:leaderboard:v1')
```

Or just clear browser storage on the booth before showtime.
