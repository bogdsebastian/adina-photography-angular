# Roadmap

Work plan for evolving Collide & Capture from a fully prerendered static site into a
site with dynamic, editor-managed content — while keeping hosting simple and cheap.

Check items off in the PR that delivers them. Each phase is independently shippable;
no phase requires rework of a previous one.

## Guiding architecture

- The app stays a prerendered Angular SPA served from **classic (static) Firebase Hosting**.
  Prerendering only fixes the *initial HTML*; the app can still fetch data at runtime.
- Dynamic content lives in **Firestore + Firebase Storage**, read client-side.
- Anything requiring secrets (Instagram tokens, mail delivery) goes through
  **Cloud Functions** (EU region), never the browser.
- Per-route render modes (`src/app/app.routes.server.ts`) let marketing pages stay
  `Prerender` while future dynamic routes use `Client` (or `Server` later).

## Phase 1 — Hosting & CI

- [ ] Create Firebase project (EU region) and enable Hosting
- [ ] `firebase init hosting` — public dir `dist/adina-photography-angular/browser`,
      not configured as SPA, decline the Angular "web frameworks" integration
- [ ] Configure `firebase.json`: `cleanUrls`, long-lived immutable cache for hashed
      JS/CSS, moderate cache for `/images/**`
- [ ] Serve the prerendered not-found page as `404.html` (small post-build copy step)
- [ ] `firebase init hosting:github` — service-account secret in GitHub repo
- [ ] GitHub Action: PR preview channels (unique URL per PR)
- [ ] GitHub Action: deploy to live on merge to `main`
- [ ] Run `npm test` + `npm run build` in CI before any deploy

## Phase 2 — Contact form goes live

- [ ] Cloud Function (EU) for contact submission, replacing the simulation in
      `src/app/services/contact.ts`
- [ ] Firebase App Check on the function
- [ ] No submission data stored at rest (send-only), per the notes in `contact.ts`
- [ ] Hosting rewrite `/api/contact` → function (keeps the frontend origin-relative)

## Phase 3 — Dynamic "Our Works" gallery

- [ ] Firestore collection for work entries (image ref, title, category, sort order,
      published flag)
- [ ] Move gallery images to Firebase Storage
- [ ] Gallery component fetches the collection at runtime (loading skeleton, error state)
- [ ] Firestore security rules: public read of published entries only
- [ ] Keep a local fallback/placeholder so the page never renders empty

## Phase 4 — Admin editing

- [ ] Firebase Auth (email or Google) restricted to the appointed editor account(s)
- [ ] `/admin` route family, `RenderMode.Client`, lazy-loaded, excluded from prerender
- [ ] Admin UI: create/edit/reorder/unpublish work entries, upload images to Storage
- [ ] Firestore/Storage rules: writes only for authed editor UIDs

## Phase 5 — Instagram sync (optional)

- [ ] Instagram professional (Business/Creator) account + Meta app with Instagram
      Graph API access (the old Basic Display API is discontinued)
- [ ] Scheduled Cloud Function: fetch recent media, refresh the long-lived token,
      cache results into the same Firestore works/feed collection
- [ ] Frontend reads only the Firestore cache — no Meta calls or tokens in the browser

## Phase 6 — Blog / editor-created pages

- [ ] Firestore collection for posts (slug, title, body, cover image, published date)
- [ ] `/blog` list + `/blog/:slug` detail routes, `RenderMode.Client`
- [ ] Hosting rewrite `/blog/**` → app shell so new slugs resolve without a redeploy
- [ ] Authoring UI in `/admin` (reuse Phase 4 auth)
- [ ] Decide the SEO upgrade when post visibility in search becomes a goal:
  - [ ] *Option A — rebuild on publish:* publish event triggers the GitHub Action
        (`repository_dispatch`); new posts are prerendered within minutes; hosting
        stays static
  - [ ] *Option B — runtime SSR:* deploy the existing Express server
        (`src/server.ts`) via Firebase App Hosting and switch blog routes to
        `RenderMode.Server`; instant publish, adds infra cost

## Deferred / undecided

- Firebase-hosted dynamic global config (noted in `src/app/services/config.ts`)
- Headless CMS instead of the in-app admin, if editing needs outgrow it
- Sitemap generation for blog posts (pairs with whichever SEO option is chosen)
