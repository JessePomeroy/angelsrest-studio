/**
 * Schema Types Index
 *
 * Exports all schema types for registration in sanity.config.ts
 *
 * To add a new content type:
 * 1. Create the schema file (e.g., myType.ts)
 * 2. Import it here
 * 3. Add it to the schemaTypes array
 * 4. Run `npx sanity deploy` to update the hosted Studio
 */

import { about } from "./about";
import author from "./author";
// Default blog schemas (from template)
import blockContent from "./blockContent";
import category from "./category";
import { contactPage } from "./contactPage";
import { coupon } from "./coupon";
// Custom schemas for Angel's Rest
import { gallery } from "./gallery";
import { inquiry } from "./inquiry";
import { order } from "./order";
import post from "./post";
import { printCollection } from "./printCollection";
import { printSet } from "./printSet";
import { product } from "./product";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  // === Custom Content Types ===
  gallery, // Photo galleries with ordering
  printCollection, // Print collections for shop
  printSet, // Print sets (bundles)
  coupon, // Discount codes
  product, // Shop products
  about, // About page content
  order, // Order history

  // === Singletons ===
  siteSettings, // Global site configuration
  contactPage, // Contact & booking page

  // === Form Submissions ===
  inquiry, // Contact form submissions (read-only)

  // === Blog Content Types ===
  // Ready for future blog implementation
  post, // Blog posts
  author, // Post authors
  category, // Post categories
  blockContent, // Rich text blocks for posts
];
