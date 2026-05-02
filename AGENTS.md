# AGENTS.md — angelsrest-studio

Sanity Studio for angelsrest.online. Manages all CMS content and serves as the content layer for the photographer CRM platform.

---

## Stack

- **CMS:** Sanity Studio v3 (package: sanity 5.13.0+)
- **Project ID:** `n7rvza4g`
- **Dataset:** `production`
- **Plugins:** `@sanity/orderable-document-list`, `@sanity/vision`, `sanity/presentation`
- **Linting:** Biome (check + format)
- **Dependencies:** `@sanity/icons` (for schema icons)

---

## Schema Types

| Type | Purpose | Notes |
|---|---|---|
| `gallery` | Photo galleries | Orderable, has SEO + isVisible fields |
| `product` | Shop products (postcards, tapestries, digital, merch) | Orderable, has SEO fields |
| `lumaProductV2` | Shop V2 print products | Paper × size variant matrix, inline cost/margin |
| `lumaPrintSetV2` | Shop V2 print sets | N-image bundles with per-set retail + image-count margin |
| `printCollection` | Hierarchical print groupings | Orderable, supports nesting via parent ref |
| `coupon` | Discount codes | Tracks usage counts |
| `about` | About page (singleton) | Has SEO fields |
| `siteSettings` | Global site config (singleton) | Artist name, title, social links, default SEO |
| `contactPage` | Contact & booking config (singleton) | Conditional booking fields |
| `post` | Blog posts | 5 template types with conditional fields |
| `author` | Blog authors | |
| `category` | Blog categories | |
| `blockContent` | Portable Text definition | |

> Orders and inquiries are **Convex-owned**, not Sanity. They used to live here;
> the schemas were removed as part of audit #50. Operational data (orders,
> inquiries, CRM) lives in Convex; content data (galleries, products, pages)
> lives in Sanity. See `feedback_sanity_vs_admin_split` for the split rule.

---

## Desk Structure

```
Angel's Rest
├── Dashboard          — Custom React component with stats + quick actions
├── ── Content ──
│   ├── Galleries      — Orderable list
│   ├── About          — Singleton
│   └── Contact & Booking — Singleton
├── ── Shop ──
│   ├── Products       — By category (All, Prints, Postcards, etc.)
│   ├── Print Collections — Orderable
│   ├── Print Sets     — Orderable
│   └── Coupons
├── ── Blog ──
│   ├── Posts / Authors / Categories
└── ── Settings ──
    └── Site Settings  — Singleton
```

---

## Singletons

`siteSettings`, `about`, and `contactPage` are singletons:
- Limited actions: publish, discard, restore only (no delete/duplicate)
- Enforced in `sanity.config.ts` via `document.actions` filter

---

## Presentation Plugin (Live Preview)

The studio has a Presentation tab that opens angelsrest.online in an iframe with visual editing overlay.

- **Draft mode enable:** `/api/draft/enable` on angelsrest frontend
- **Draft mode disable:** `/api/draft/disable` on angelsrest frontend
- **Preview token:** `SANITY_PREVIEW_TOKEN` env var on angelsrest (Viewer role)
- **How it works:** Studio sends a signed URL → frontend validates via `@sanity/preview-url-secret` → sets `__sanity_preview` cookie → enables `@sanity/visual-editing` overlay

---

## Critical Rules

### Schema changes ripple to the frontend
When modifying schema types, check `angelsrest/src/lib/sanity/` for GROQ queries that may need updating. Field renames or removals are breaking changes.

### Orderable types need `orderRank`
`gallery`, `product`, `printCollection`, and `printSet` use `@sanity/orderable-document-list` — any new orderable type needs the `orderRankField` added to its schema.

### Singleton types need desk structure + action filter
Add new singletons to both the `SINGLETON_TYPES` set in `sanity.config.ts` AND create a desk structure entry.

### Deploy studio changes
After schema or config changes, deploy the studio:
```bash
npx sanity deploy
```

### Do not touch production data carelessly
Dataset is `production` — this is live data for a real site. Do not run destructive mutations without explicit instruction.

---

## Commands

```bash
pnpm dev          # Run Studio locally (localhost:3333)
pnpm build        # Build Studio for deployment
pnpm lint         # Run Biome check
pnpm format       # Run Biome format
npx sanity deploy # Deploy Studio to sanity.io
npx sanity manage # Open Sanity project dashboard
```

---

## Useful GROQ Patterns

```groq
# All galleries ordered (visible only)
*[_type == "gallery" && isVisible == true] | order(orderRank) { title, slug, images }

# All products ordered
*[_type == "product"] | order(orderRank) { title, slug, price }

# Single document by slug
*[_type == "post" && slug.current == $slug][0]

# Site settings singleton
*[_type == "siteSettings"][0]

# Dashboard stats (matches src/components/DashboardHome.tsx)
{
  "galleries": count(*[_type == "gallery"]),
  "totalImages": count(*[_type == "gallery"].images[]),
  "products": count(*[_type == "product" && inStock == true]),
  "printProducts": count(*[_type == "lumaProductV2" && inStock == true])
}
```

---

## Platform Context

This studio is part of the photographer CRM platform:
- **angelsrest** = your personal site + platform hub
- **angelsrest-studio** = your Sanity CMS (content only — galleries, products, pages)
- **Convex** = operational backend (orders, inquiries, CRM, messages, tiers)
- **admin-dashboard** (`@jessepomeroy/admin`) = shared admin package consumed by all client sites

See full spec: `~/Documents/quilt/02_reference/projects/photographer_crm/implementation-spec.md`
