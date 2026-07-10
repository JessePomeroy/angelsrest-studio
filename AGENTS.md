# AGENTS.md — angelsrest-studio

Canonical rules for the Angel's Rest Sanity Studio instance.

## Repository role

- This is the live Angel's Rest client Studio.
- `../sanity-studio-template` is the upstream source for shared schemas, desk
  structure, actions, and components.
- `../angelsrest` is the frontend and operational platform hub.
- Client-specific values belong in `client.config.ts`.

Do not make a shared Studio change here first. Land it in the template, verify
it there, then sync the focused commit into this repository.

## Data boundary

Sanity owns editorial content: portfolio galleries, catalog/products,
collections, coupons, blog, about, contact/booking, and site settings.

Convex owns operations: orders, inquiries, CRM, invoices, quotes, contracts,
messages, platform tenancy, and private delivery galleries. Do not reintroduce
operational Sanity schemas or dashboard panes.

## Schema rules

- Registered schemas live in `schemaTypes/index.ts`.
- Optional `homepage` and `modelingPage` schemas are gated by
  `clientConfig.enabledSchemas`.
- New orderable types need `orderRankField` and a matching desk entry.
- New singletons need `SINGLETON_TYPES`, restricted actions, and a direct desk
  entry.
- Shared SEO, category, print-catalog, validation, and pricing logic remains in
  existing shared modules rather than being copied into individual schemas.
- Schema field changes require checking the frontend GROQ/normalization code in
  `../angelsrest`.

## Presentation and preview

- The Presentation tool points to the configured live site.
- Draft enable/disable routes live in the frontend.
- Preview credentials belong in the frontend/deployment, never this repository.
- Do not commit Sanity auth tokens or local npm registry tokens.

## Private package access

The Studio consumes private `@jessepomeroy/*` packages from GitHub Packages.
Configure a user or hosted npm token before install; never add it to `.npmrc`.

## Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm check` also builds and runs the dependency audit. `pnpm format` writes
files. `pnpm sanity deploy` changes the hosted Studio; run either only when the
task authorizes it.

## Safety

- The configured dataset is live production content.
- Do not run destructive data mutations or deploy without explicit permission.
- Do not edit generated/build output (`dist`, `.sanity`, `tsconfig.tsbuildinfo`).
- Preserve unrelated worktree changes.
- Do not add AI-assistant co-author trailers.
