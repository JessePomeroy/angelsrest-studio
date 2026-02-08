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

// Default blog schemas (from template)
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'

// Custom schemas for Angel's Rest
import {gallery} from './gallery'
import {product} from './product'
import {about} from './about'

export const schemaTypes = [
  // === Custom Content Types ===
  gallery,   // Photo galleries with ordering
  product,   // Shop products
  about,     // About page content
  
  // === Blog Content Types ===
  // Ready for future blog implementation
  post,      // Blog posts
  author,    // Post authors
  category,  // Post categories
  blockContent, // Rich text blocks for posts
]
