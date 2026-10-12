# Recreation audit

Source: `https://titandumpsterrental.webflow.io/`  
Captured: 2026-10-12

| Route | Source captured | Recreated |
| --- | --- | --- |
| `/` | Home hero, industries, six prices, advantage timeline, quote CTA, ten FAQs, gallery | Yes |
| `/residential-hub` | Hero, four benefits, prices, CTA, FAQs | Yes |
| `/contractors-hub` | Hero, four benefits, prices, CTA, FAQs | Yes |
| `/hoa-property-manager-hub` | Hero, four benefits, prices, CTA, FAQs | Yes |
| `/quote` | Two-step fields, prices, FAQs | Yes |
| `/privacy-policy` | Source has OUAB privacy copy | Titan-specific draft |

Original image files are in `public/assets`; `asset-map.json` records their Webflow URLs. The seventh gallery photo could not be exported by the browser's asset security policy, so the gallery has six images.

The homepage was compared at desktop width and checked at 390px for horizontal overflow. The mobile menu, quote form step transition, and gallery image loads were checked in the browser. `pnpm build` passed.
