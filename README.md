# Titan Dumpster Rental website

Recreation of the published [Webflow site](https://titandumpsterrental.webflow.io/) for the linked GitHub and Vercel project. Built with Next.js and the original Webflow images.

## Routes

- `/` — homepage
- `/residential-hub`
- `/contractors-hub`
- `/hoa-property-manager-hub`
- `/quote` — two-step quote form
- `/privacy-policy`

## Local development

```sh
pnpm install
pnpm dev
```

Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` for quote submissions. The form posts to `/api/quote`, which validates the fields and inserts into `public.titan_quote_requests`. The database schema is recorded in `supabase/schema.sql`. The table permits anonymous inserts and denies public reads.

## Source notes

The Webflow site has an inactive Blog link. It also has copied privacy text naming Once Upon A Business. This recreation keeps Blog inactive and uses a Titan-specific privacy draft to describe its quote flow. The published source gallery shows seven dumpster photos; six were available for local asset capture.
