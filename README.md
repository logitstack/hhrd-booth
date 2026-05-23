# HHRD Booth

Interactive globe for the HHRD booth at ICNA 2026. Target hardware is a 1920x1080 Android touchscreen, web-based delivery via Vercel.

## Quick start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. The Network URL printed in the terminal works from any device on the same wifi for testing on the actual touchscreen.

## Project layout

```
hhrd-booth/
  index.html              vite entry
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    main.jsx              react bootstrap
    App.jsx               main app (component tree, analytics, globe, popup, photo pane)
    countryData.js        all 57 countries, 198 program rows, 47 stories, photo manifest
    index.css             tailwind directives and base reset
  public/
    photos/               drop HHRD photos here, one folder per country
                          (e.g. public/photos/pakistan/KIND-R_1.jpg)
  DEPLOY.md               full deploy and test guide
  LAUNCH_NOTES.md         what's in this version, soft-launch toggle, photo workflow
```

## Soft launch mode

`SOFT_LAUNCH_MODE = true` in `src/App.jsx` suppresses the photo pane entirely. Flip to `false` once photos and stories are in place. Full details in `LAUNCH_NOTES.md`.

## Deploy

`DEPLOY.md` walks through the GitHub + Vercel setup and the Fully Kiosk Browser setup on the Android touchscreen.
