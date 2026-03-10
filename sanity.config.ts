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
            
            /**
             * Products with drag-and-drop ordering
             * Uses the @sanity/orderable-document-list plugin
             * Requires orderRank field in the product schema
             */
            S.listItem()
              .title('Products')
              .schemaType('product')
              .child(
                S.list()
                  .title('Products')
                  .items([
                    S.listItem()
                      .title('All Products')
                      .child(
                        S.documentTypeList('product')
                          .title('All Products')
                          .defaultOrdering([{field: 'orderRank', direction: 'asc'}])
                      ),
                    S.divider(),
                    ...['prints', 'postcards', 'tapestries', 'digital', 'merchandise'].map((cat) =>
                      S.listItem()
                        .title(cat.charAt(0).toUpperCase() + cat.slice(1))
                        .child(
                          S.documentList()
                            .title(cat.charAt(0).toUpperCase() + cat.slice(1))
                            .schemaType('product')
                            .filter('_type == "product" && category == $category')
                            .params({category: cat})
                            .defaultOrdering([{field: 'orderRank', direction: 'asc'}])
                        )
                    ),
                  ])
              ),

            /**
             * Print Collections for the shop
             * Organize prints into sets/collections
             */
            orderableDocumentListDeskItem({
              type: 'printCollection',
              title: 'Print Collections',
              S,
              context,
            }),

            // About — typically just one document
            S.listItem()
              .title('About')
              .schemaType('about')
              .child(S.documentTypeList('about')),
            
            S.divider(),
            
            /**
             * Orders from online purchases
             * Created automatically via Stripe webhook
             * Organized by time period for easy browsing
             */
            S.listItem()
              .title('Orders')
              .schemaType('order')
              .child(
                S.list()
                  .title('Orders')
                  .items([
                    S.listItem()
                      .title('All Orders')
                      .child(
                        S.documentTypeList('order')
                          .title('All Orders')
                          .defaultOrdering([{field: 'createdAt', direction: 'desc'}])
                      ),
                    S.divider(),
                    S.listItem()
                      .title('Today')
                      .child(
                        S.documentList()
                          .title('Today')
                          .schemaType('order')
                          .filter('_type == "order" && createdAt >= $start')
                          .params({start: new Date(new Date().setHours(0,0,0,0)).toISOString()})
                          .defaultOrdering([{field: 'createdAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('This Week')
                      .child(
                        S.documentList()
                          .title('This Week')
                          .schemaType('order')
                          .filter('_type == "order" && createdAt >= $start')
                          .params({start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()})
                          .defaultOrdering([{field: 'createdAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('This Month')
                      .child(
                        S.documentList()
                          .title('This Month')
                          .schemaType('order')
                          .filter('_type == "order" && createdAt >= $start')
                          .params({start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()})
                          .defaultOrdering([{field: 'createdAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('This Year')
                      .child(
                        S.documentList()
                          .title('This Year')
                          .schemaType('order')
                          .filter('_type == "order" && createdAt >= $start')
                          .params({start: new Date(new Date().getFullYear(), 0, 1).toISOString()})
                          .defaultOrdering([{field: 'createdAt', direction: 'desc'}])
                      ),
                  ])
              ),
            
            S.divider(),
            
            /**
             * Coupons / Discount codes
             */
            S.listItem()
              .title('Coupons')
              .schemaType('coupon')
              .child(S.documentTypeList('coupon').title('Coupons')),
            
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
