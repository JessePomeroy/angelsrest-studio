# Angel's Rest Studio

The client-specific Sanity Studio for
[angelsrest.online](https://angelsrest.online). This repository is a downstream
instance of `../sanity-studio-template`.

Shared schemas, desk structure, actions, and components should land in the
template first and then be synchronized here. Angel's Rest-specific project,
deployment, branding, URLs, and optional-module flags live in
`client.config.ts`.

## Content ownership

Sanity owns editorial content:

- portfolio galleries
- products, print products, print sets, collections, and coupons
- blog posts, authors, and categories
- about, contact/booking, and site settings
- optional homepage/modeling modules when enabled

Orders, inquiries, CRM, invoices, quotes, contracts, messages, tenant state,
and private delivery galleries are Convex-owned and managed through the Angels
Rest admin dashboard.

## Studio features

- custom dashboard and content-health views
- orderable galleries and print collections
- singleton enforcement for site-level documents
- shared print catalog and inline margin components
- product stock actions
- document back-reference panes
- Presentation tool/draft-mode integration with the frontend

## Local development

```bash
pnpm config set --location user //npm.pkg.github.com/:_authToken "$GITHUB_TOKEN"
pnpm install
pnpm dev
```

Checks and build:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm check` also runs the dependency audit and therefore requires network
access. Deploy only with explicit permission:

```bash
pnpm sanity deploy
```

## Configuration and synchronization

- `client.config.ts` is the client-specific configuration surface.
- `schemaTypes/` and shared Studio components mirror
  `../sanity-studio-template`.
- Make shared changes upstream, verify the template, then port the focused
  commit here and run the same checks.
- Do not copy operational schemas into Sanity.

The public frontend and platform hub live in `../angelsrest`.
