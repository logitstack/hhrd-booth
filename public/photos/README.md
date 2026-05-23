# HHRD field photos

Drop photos here, one folder per country, named after the country slug.

## Path pattern

```
public/photos/{country-slug}/{PROGRAM_CODE}_{n}.jpg
```

- `country-slug`: country name lowercased with non-alphanumerics replaced by hyphens
- `PROGRAM_CODE`: one of OSP, ESP, CWDP, WASH, SDLP, SPR, CPRP, HANP, ERDM, Qurbani, KIND-R
- `n`: 1-based index (1, 2, 3...)

## Examples

- Pakistan KIND-R photo 1: `public/photos/pakistan/KIND-R_1.jpg`
- Palestine - Gaza ERDM photo 2: `public/photos/palestine-gaza/ERDM_2.jpg`
- Somalia/Somaliland WASH photo 1: `public/photos/somalia-somaliland/WASH_1.jpg`
- Trinidad and Tobago OSP photo 1: `public/photos/trinidad-and-tobago/OSP_1.jpg`

## After adding photos

Add an entry to `PHOTO_MANIFEST` in `src/countryData.js`:

```js
export const PHOTO_MANIFEST = {
  'Pakistan|KIND-R': 3,
  'Palestine - Gaza|ERDM': 2,
  // ...
};
```

The number is the count of photos available. The app then renders the carousel for that country and program.

## Resizing raw photos

Use `resize_photos.py` (kept outside the project for now). Recommended: 1000px long edge, 82% JPEG quality. Keeps file sizes small without visible loss on the booth display.
