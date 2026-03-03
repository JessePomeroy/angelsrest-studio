# AGENTS.md — angelsrest-studio

Sanity Studio for angelsrest.online. Manages all CMS content: galleries, products, posts, authors, about page.

---

## Stack

- **CMS:** Sanity Studio v3
- **Project ID:** `n7rvza4g`
- **Dataset:** `production`
- **Plugins:** `@sanity/orderable-document-list`, `@sanity/vision`
- **Linting:** ESLint (not Biome — this repo uses ESLint)

---

## Schema Types

| Type | Purpose |
|---|---|
| `gallery` | Photo galleries (drag-and-drop ordered via `orderRank`) |
| `product` | Shop products (drag-and-drop ordered via `orderRank`) |
| `about` | Single about page document |
| `post` | Blog posts (future use) |
| `author` | Blog authors (future use) |
| `category` | Blog categories (future use) |
| `blockContent` | Portable Text block content definition |

---

## Critical Rules

### Schema changes ripple to the frontend
When modifying schema types, check `angelsrest/src/lib/sanity/` for GROQ queries that may need updating. Field renames or removals are breaking changes.

### Orderable types need `orderRank`
`gallery` and `product` use `@sanity/orderable-document-list` — any new orderable type needs the `orderRankField` added to its schema.

### Deploy studio changes
After schema or config changes, deploy the studio:
```bash
npx sanity deploy
```

### Vision tool = GROQ playground
Use the Vision tab in Studio to test GROQ queries before putting them in the frontend. Always validate queries there first.

### Do not touch production data carelessly
Dataset is `production` — this is live data for a real site. Do not run destructive mutations without explicit instruction.

---

## Commands

```bash
pnpm dev          # Run Studio locally (localhost:3333)
npx sanity deploy # Deploy Studio to sanity.io
npx sanity manage # Open Sanity project dashboard
```

---

## Useful GROQ Patterns

```groq
# All galleries ordered
*[_type == "gallery"] | order(orderRank) { title, slug, images }

# All products ordered
*[_type == "product"] | order(orderRank) { title, slug, price }

# Single document by slug
*[_type == "post" && slug.current == $slug][0]
```
