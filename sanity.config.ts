/**
 * Sanity Studio Configuration
 * 
 * This file configures the Sanity Studio:
 * - Project connection (projectId, dataset)
 * - Plugins (structure tool, vision tool)
 * - Custom desk structure (sidebar organization)
 * - Schema types
 * 
 * Deploy changes with: npx sanity deploy
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  // Internal name for this config
  name: 'default',
  
  // Title shown in the Studio header
  title: 'angelsrest',

  // Your Sanity project ID (from sanity.io/manage)
  projectId: 'n7rvza4g',
  
  // Dataset to use — 'production' is the default
  // You can create other datasets (e.g., 'staging') for testing
  dataset: 'production',

  plugins: [
    /**
     * Structure Tool
     * 
     * Customizes the sidebar/desk structure in the Studio.
     * Without this, all document types appear as a flat list.
     * With this, we can:
     * - Group related items
     * - Add dividers
     * - Enable drag-and-drop ordering for specific types
     */
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            /**
             * Galleries with drag-and-drop ordering
             * Uses the @sanity/orderable-document-list plugin
             * Requires orderRankField in the schema
             */
            orderableDocumentListDeskItem({
              type: 'gallery',
              title: 'Galleries',
              S,
              context,
            }),
            
            S.divider(),
            
            // Products — standard list view
            S.listItem()
              .title('Products')
              .schemaType('product')
              .child(S.documentTypeList('product')),
            
            // About — typically just one document
            S.listItem()
              .title('About')
              .schemaType('about')
              .child(S.documentTypeList('about')),
            
            S.divider(),
            
            /**
             * Blog schemas (for future use)
             * These came with the template and are ready
             * for when you want to add a blog section
             */
            S.listItem()
              .title('Posts')
              .schemaType('post')
              .child(S.documentTypeList('post')),
            S.listItem()
              .title('Authors')
              .schemaType('author')
              .child(S.documentTypeList('author')),
            S.listItem()
              .title('Categories')
              .schemaType('category')
              .child(S.documentTypeList('category')),
          ]),
    }),

    /**
     * Vision Tool
     * 
     * GROQ query playground — accessible via "Vision" tab in Studio.
     * Use it to test queries before adding them to your frontend.
     * 
     * Example query:
     * *[_type == "gallery"] | order(orderRank) { title, slug }
     */
    visionTool(),
  ],

  // Register all schema types
  schema: {
    types: schemaTypes,
  },
})
