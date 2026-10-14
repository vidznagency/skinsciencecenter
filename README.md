# Skin Science Center — Website

A static HTML/CSS/JS website for Dr. Niyati Parikh's Skin Science Center, Memnagar, Ahmedabad.
It has no build step and no framework. You can open it with any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Run locally
```bash
python3 -m http.server 5173
```
Then open http://localhost:5173

## Files
| File | What it is |
|---|---|
| `index.html` | Homepage: hero, treatment categories, concern finder, about teaser, results, reviews, clinic, booking, contact |
| `services.html` | All 31 treatments (filterable, with detail panels), price list, packages, FAQ |
| `about.html` | Dr. Niyati Parikh: profile, credentials timeline, why choose us, clinic, reviews |
| `journal.html` | Articles, myth vs fact, Instagram |
| `assets/js/layout.js` | Shared header, footer, icons and floating buttons for every page |
| `assets/img/` | Real photos: `doctor/`, `clinic/`, `results/` (results shared with patient consent) |
| `assets/js/config.js` | **The one file to edit**: phone, WhatsApp, address, timings, prices, offers, reviews, social links, images |
| `assets/js/content.js` | Treatment descriptions, FAQs, journal articles, myths, timeline |
| `assets/js/i18n.js` | Gujarati and Hindi strings for the language toggle |
| `assets/js/main.js` | Rendering, motion, quiz, booking form |
| `assets/css/style.css` | Design system: colours, type, components, dark mode |
| `care-guides.html` | Printable pre/post-care guides ("Save as PDF") |
| `privacy.html` | Privacy policy template |

## Before going live: fill in the `EDIT` markers
Anything that isn't a verified fact shows as a small gold **EDIT** tag. Fill these in:

1. **`config.js` → `clinic`**: `phone`, `phoneHref`, `whatsapp`, `email`, `addressLine`, `parking`
2. **`timings`**: the real clinic hours
3. **`prices`** and **`consultation`**: starting prices in ₹ (numbers, e.g. `1500`)
4. **`offers`**: package contents and prices
5. **`reviews.items`**: paste real Justdial/Google reviews **verbatim, with permission**. Also add the ratings and listing URLs
6. **`images.portrait`**: Dr. Parikh's photo. Replace all Unsplash placeholders with real clinic photos (WebP, ~1600px wide)
7. **Before/after**: replace the demo images with consented patient photos
8. **About section** (`index.html`): philosophy quote in her own words, memberships, conferences, awards, years of experience
9. **`booking.formEndpoint`**: a Formspree / Google Apps Script URL so bookings (including photo uploads) arrive by email. If you leave it empty, bookings open a pre-filled WhatsApp message instead
10. **`index.html` `<head>`**: the canonical URL / domain, and add `telephone` and the full address to the JSON-LD once confirmed
11. Have a native speaker review the Gujarati and Hindi text in `i18n.js`
12. Have Dr. Parikh review the clinical wording in `content.js` and `care-guides.html`

When everything is filled in, set `showEditMarkers: false` in `config.js`.

## Notes
- Smooth scrolling uses Lenis (from the CDN). The site still works if it fails to load.
- Motion is turned off when the visitor's system has `prefers-reduced-motion` set.
- Deep links: `/#treatment/prp` opens a treatment's detail panel and `/#journal/sunscreen-myths` opens an article.
