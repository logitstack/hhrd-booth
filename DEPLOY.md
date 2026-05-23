# HHRD Booth - Deploy and Test

The project is a Vite + React app running the country-level booth (screensaver, search, country popup, photo pane, donate QR).

Target hardware: **1920x1080 Android touchscreen, web-based delivery via Vercel**. The app is designed for landscape 16:9 and works in any modern browser (Chrome on Android, Safari on iPad, desktop browsers for testing).

Three steps to get it live:

1. Run it locally to confirm it works
2. Push to GitHub and deploy on Vercel
3. Open on the touchscreen

The whole flow takes about 15 minutes the first time.

---

## Prerequisites

- Node.js installed (any 18+ version works)
- A GitHub account
- A Vercel account linked to GitHub
- Git installed

If any of these is missing, fix that first.

---

## Step 1: Run Locally

```bash
cd path/to/hhrd-booth
npm install
npm install qrcode.react
npm run dev
```

The `qrcode.react` package is required because the QR code is generated client-side rather than fetched from an external service. You only need to install it once; it goes into `package.json` and Vercel picks it up on deploy.

The dev server prints two URLs:

```
  Local:   http://localhost:5173/
  Network: http://192.168.x.x:5173/
```

Open the Local URL in any browser. The booth should load to the screensaver: rotating globe with "Find your country." headline. Tap anywhere and the search bar slides in at the top.

If something breaks, check the terminal for compile errors. Most issues at this stage are missing dependencies; `npm install` should handle them, but if you see "Cannot find module X", run `npm install X` and restart.

### Test from any device on the same wifi

The Network URL works from any device on the same wifi network as the laptop. Connect the Android touchscreen (or any phone/tablet) to the same wifi, open a browser, and type the Network URL. Changes you make to the code while `npm run dev` is running hot-reload on the device within a second or two.

This is the fastest way to test on the actual target hardware without deploying.

---

## Step 2: Deploy to Vercel

### Push to GitHub

```bash
cd path/to/hhrd-booth
git init
git add .
git commit -m "Initial HHRD booth"
```

Then on github.com:

1. Click New repository, name it `hhrd-booth`, private is fine
2. Don't add a README or .gitignore; they're already in the project
3. Copy the commands GitHub shows under "push an existing repository"
4. Paste them into your terminal. Looks like:
   ```bash
   git remote add origin https://github.com/yourname/hhrd-booth.git
   git branch -M main
   git push -u origin main
   ```

### Deploy on Vercel

1. Go to vercel.com/new
2. Pick the `hhrd-booth` repository
3. Vercel auto-detects Vite, no settings to change
4. Click Deploy
5. Wait ~1 minute for the build to finish
6. Vercel shows the deployed URL, something like `hhrd-booth.vercel.app` or `hhrd-booth-yourname.vercel.app`

Every time you `git push` to main, Vercel rebuilds and redeploys automatically. No manual step needed.

---

## Step 3: Open on the Touchscreen

### Casual test (just open in a browser)

1. On the Android touchscreen, open Chrome (or whatever browser comes with it)
2. Type the Vercel URL
3. The booth loads

For a casual test, this is enough. You can interact with everything, verify touch responsiveness, check that the globe rotates smoothly, and confirm the popup and photo pane render correctly.

### Full-screen kiosk mode (recommended for the convention)

To make the experience feel like a real booth display:

#### Option A: Chrome's built-in kiosk mode (Android)
1. Use **Fully Kiosk Browser** (popular Android kiosk app, free for non-commercial use)
2. Install from Play Store
3. Set Start URL to the Vercel deployment URL
4. Enable "Run on device startup" so it survives reboots
5. Enable "Disable Status Bar" and "Hide Navigation Bar" for full screen
6. Set a session PIN to prevent visitors from exiting

#### Option B: Chrome incognito + full-screen
1. Open Chrome
2. Open the Vercel URL
3. Tap browser menu > Add to Home Screen
4. Open from home screen icon (runs without browser chrome)
5. To exit: hard-reboot or use a launcher app

If you're traveling with the Android touchscreen, install Fully Kiosk before the convention so you can configure it ahead of time.

---

## What to Test

Run through this checklist:

- [ ] Screensaver loads, globe rotates, "Find your country." headline readable
- [ ] Tap anywhere; search bar slides in at top, screensaver fades out
- [ ] Tap search bar; dropdown of all 57 countries appears
- [ ] Type "pak"; dropdown filters to Pakistan
- [ ] Tap Pakistan in dropdown; globe rotates to it, popup appears
- [ ] Photo pane slides in from right with story and program cards
- [ ] Tap Donate button; QR modal appears with QR code rendered
- [ ] Scan QR with another phone; opens hhrd.org with UTM params
- [ ] Tap a program tile in the popup; it expands to show full description
- [ ] Tap right side of a photo card; advances to next photo
- [ ] Tap left side of a photo card; goes back
- [ ] Tap a dot indicator; jumps to that photo
- [ ] Close popup; search bar still there, globe still rotating
- [ ] Wait 90 seconds; booth returns to screensaver, all state cleared
- [ ] Tap top-left corner 5 times within ~3 seconds; admin panel appears
- [ ] Verify analytics counters reflect your interactions
- [ ] Export CSV button; file downloads with all the new fields

Things to watch for:

- Touch lag or unresponsive taps (only true on actual hardware, never the simulator)
- Globe drag feels right (not too sticky, not too slippery)
- Text rendering at the 1920x1080 viewport
- Whether the screensaver headline reads cleanly over the globe
- Photo card aspect ratio looks right with the placeholder gradients

If anything feels off, send details and we'll adjust.

---

## Updating after the First Deploy

Edit code, then:

```bash
git add .
git commit -m "describe what changed"
git push
```

Vercel rebuilds automatically. The touchscreen picks up the new version on next load: pull to refresh or close and reopen the kiosk app.

---

## Adding Photos

Photos drop into `public/photos/{country-slug}/{PROGRAM_CODE}_{n}.jpg`. After adding files, edit `src/countryData.js` and add an entry to `PHOTO_MANIFEST`:

```js
export const PHOTO_MANIFEST = {
  'Pakistan|KIND-R': 3,
  'Tanzania|SDLP': 2,
  // etc.
};
```

The number is the count of photos available. The app will then render the carousel for that country and program. Photo paths:

- Country slug: lowercased, non-alphanumeric replaced with hyphens
- Pakistan = `pakistan`
- Palestine - Gaza = `palestine-gaza`
- Somalia/Somaliland = `somalia-somaliland`
- Trinidad and Tobago = `trinidad-and-tobago`

Use `resize_photos.py` to batch-resize raw SharePoint photos. Recommended setting: 1000px long edge, 82% JPEG quality (already the script's defaults; just lower TARGET_LONG_EDGE if you want even smaller).

---

## Troubleshooting

**Build fails on Vercel**: Check the build log on Vercel for the specific error. Usually a missing dependency in package.json or a syntax error in a recent edit.

**Globe doesn't appear**: The world atlas TopoJSON is fetched from a CDN. Check the browser console (Chrome DevTools, remote inspection works for Android). If you see a fetch error, the CDN is being blocked. Both cdn.jsdelivr.net and unpkg.com need to be reachable.

**QR code doesn't appear**: Should not happen with the new client-side QR (no network needed once page loads). If it does, check the console for a qrcode.react import error.

**Fonts look wrong**: Google Fonts is being blocked. The booth still works but the typography reverts to system serif and sans. Acceptable fallback for testing, not for production booth.

**Analytics not persisting**: Some browsers in incognito or "private" mode block localStorage. Make sure the test is in a normal (not incognito) browser window or in the kiosk app.

**Photos don't load**: Verify the country slug matches exactly. Check the browser network tab for 404s on `/photos/...` paths. Most common issue is a typo in the country name key in `PHOTO_MANIFEST`, or a mismatch between the file path and the slug computed from the country name.
