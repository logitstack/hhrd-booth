# HHRD Booth - Soft Launch

The app is configured for a soft launch: live data and full functionality, but no photos and no stories shown. The country popup carries the entire experience.

---

## What's live in soft launch

- All 57 countries with correct coordinates on the globe
- All 11 programs with correct codes (SPR, CWDP, KIND-R, ESP, Qurbani all fixed)
- All 198 program rows with real beneficiary numbers
- All expandable program descriptions from the workbook (long-form, sourced from HHRD's 2025 reports)
- Cumulative tags rendered next to program codes where applicable
- Search bar with all 57 countries
- Country popup with Donate button
- Donate QR (client-side, points to `hhrd.org` with UTM tags for icna2026 booth attribution)
- 5-tap admin access on top-left corner
- Full analytics: sessions, country views, donate opens, first-country-of-session, dwell time, search queries, hour-of-day distribution
- CSV export

## What's suppressed

- Right-side photo pane (the entire 420px column that holds stories and photo cards)
- The 47 success stories from the workbook (still in `countryData.js`, just not rendered)
- The colored gradient placeholder cards that would otherwise fill the photo slots

When a country is tapped, the globe stays full-width and the popup floats over the globe as the sole post-selection content. The popup's program tiles still expand inline to reveal full descriptions, so the rich content is there.

---

## To flip back to full experience

Edit `src/App.jsx`, find this near the top:

```js
const SOFT_LAUNCH_MODE = true;
```

Change to `false`. No other code edits needed. Photos appear wherever `PHOTO_MANIFEST` has entries in `countryData.js`; stories appear automatically for the 47 country/program combinations that have one.

Recommended workflow once photos are coming in:

1. Drop a batch of resized photos into `public/photos/{country-slug}/`
2. Add entries to `PHOTO_MANIFEST` in `countryData.js`
3. Flip `SOFT_LAUNCH_MODE` to `false`
4. Push to git, Vercel rebuilds automatically

You can do this incrementally. Even with just 5 countries having photos and the rest showing colored placeholders, flipping to false might look better than soft mode. Test both ways once a few countries have photos and pick whichever reads better on the touchscreen.

---

## Files in this drop

| File | Where it goes |
|---|---|
| `App.jsx` | `src/App.jsx` (replace existing) |
| `countryData.js` | `src/countryData.js` (new file) |
| `DEPLOY.md` | project root (replace existing) |

`main.jsx` unchanged. Folder structure unchanged.

---

## One-time setup

```bash
npm install qrcode.react
```

This is a new dependency for the client-side QR code (replaces the previous `api.qrserver.com` call). Run once in the project root; Vercel picks up the package.json change on push.

---

## Test checklist for soft launch

- [ ] Screensaver loads, globe rotates
- [ ] Tap anywhere; search bar slides in
- [ ] Search "pak"; Pakistan appears in dropdown
- [ ] Tap Pakistan; globe rotates to it, popup appears, no photo pane on right
- [ ] Globe area stays full-width when country selected
- [ ] Tap program tile in popup; description expands inline
- [ ] Tap Donate button; QR modal appears with QR code rendered
- [ ] Scan QR with another phone; opens hhrd.org with UTM params attached
- [ ] Wait 90 seconds idle; returns to screensaver
- [ ] 5-tap top-left; admin panel opens
- [ ] Export CSV; file downloads with all metrics

If anything reads "missing" or "empty" rather than intentional during the soft launch, send a note and we'll tighten it.
