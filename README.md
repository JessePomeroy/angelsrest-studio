# Photographer Sanity Studio

A customized Sanity Studio designed as the content layer for a photographer
SaaS. Currently the canonical instance is `angelsrest-studio` (Angel's Rest),
but the codebase is structured so cloning for a new photographer client is a
**clone + edit one file + deploy** workflow rather than a fork-and-genericize.

## What lives here

- **Photographer schemas** — galleries, products, print collections, print
  sets, LumaPrints v2 print products, blog posts, inquiries, orders, coupons,
  site settings, about, contact page
- **Customized desk structure** — Dashboard, Needs Attention (control tower
  view), Content, Shop, Shop V2, Inquiries, Orders, Blog, Settings
- **Custom dashboard pane** with stats + recent orders
- **Custom field components** — `RetailPriceWithMargin` (inline cost +
  margin display on `lumaProductV2` variants)
- **Singleton enforcement** for site settings, about, and contact page
- **Orderable lists** for galleries, print collections, print sets
- **Presentation tool** wired with draft mode toggle for visual editing

The goal is to keep the schemas, desk structure, and customization stack
shared across **every** photographer client studio, so each polish PR
compounds.

## Cloning for a new client

The only file you should need to edit is **`client.config.ts`** at the repo
root. Everything photographer-specific is sourced from there.

1. Create a new GitHub repo for the client (e.g. `acmephoto-studio`).
2. Clone this repo and re-point the remote:
   ```bash
   git clone git@github.com:jessepomeroy/angelsrest-studio.git acmephoto-studio
   cd acmephoto-studio
   git remote set-url origin git@github.com:jessepomeroy/acmephoto-studio.git
   git push -u origin main
   ```
3. Create a Sanity project for the client at https://sanity.io/manage and
   note the new `projectId`.
4. Edit `client.config.ts`:
   - `projectId` → new project ID
   - `dataset` → usually `production`
   - `studioTitle` / `dashboardHeading` / `dashboardSubtitle` → client branding
   - `liveSiteUrl` / `adminDashboardUrl` → client's deployed URLs
   - `appId` → leave the existing value, replace after first deploy (see
     step 6)
5. Edit `package.json` `name` field to match the new repo (optional —
   it's marked private so it doesn't matter functionally, but it's tidy).
6. Deploy for the first time:
   ```bash
   pnpm install
   pnpm sanity deploy
   ```
   Sanity will prompt for a studio hostname and assign a new `appId`. Copy
   that `appId` into `client.config.ts` so future deploys are non-interactive.
7. Optional cleanup: there are still a few comments and doc strings that
   reference `angelsrest` by name (e.g. `AGENTS.md`, comments in
   `schemaTypes/post.ts` and `RetailPriceWithMargin.tsx`). They don't affect
   runtime; grep for `angelsrest` and `Angel's Rest` if you want to clean
   them up for the new client.

That's it. **All schemas, desk customization, custom components, and the
PR-stack improvements (image thumbnails, Needs Attention, future PRs) are
inherited automatically.** Future polish PRs against this repo can be
cherry-picked or rebased into client repos.

## Local development

```bash
pnpm install
pnpm dev          # localhost:3333
pnpm build        # build studio bundle
pnpm lint         # biome check
pnpm format       # biome format --write
pnpm sanity deploy   # deploy to sanity.studio (uses pinned appId)
```

## Studio customization roadmap

The angelsrest-studio repo is the working surface for the **Sanity Studio
Deep Dive** — a 10-PR stack to make the editing experience feel hand-built
for non-technical photographers. See the spec at
`~/Documents/quilt/02_reference/projects/photographer_crm/sanity-studio-deep-dive.md`
and the `project_studio_deep_dive` memory entry for status.
