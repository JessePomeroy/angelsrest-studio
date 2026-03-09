/**
 * Product Schema
 * 
 * Defines the structure for shop products.
 * Products have images, pricing, and inventory status.
 * 
 * Used on: /shop, /shop/[slug]
 */

import {defineField, defineType} from 'sanity'

export const product = defineType({
  // API name — used in GROQ queries: *[_type == "product"]
  name: 'product',
  title: 'Product',
  type: 'document',
  
  fields: [
    // Order rank for drag-and-drop ordering in Studio
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // URL-friendly identifier, auto-generated from title
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // Product images — first image is used as the main photo
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Product details, materials, dimensions, etc.',
    }),

    // Price in dollars (or your currency)
    // Stored as number for calculations; format in frontend
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
      description: 'Price in USD',
    }),

    // Product category for filtering
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Prints', value: 'prints'},
          {title: 'Postcards', value: 'postcards'},
          {title: 'Tapestries', value: 'tapestries'},
          {title: 'Digital', value: 'digital'},
          {title: 'Merchandise', value: 'merchandise'},
        ],
      },
    }),

    // Fulfillment type — determines if order is auto-sent to LumaPrints or handled manually
    defineField({
      name: 'fulfillmentType',
      title: 'Fulfillment Type',
      type: 'string',
      options: {
        list: [
          {title: 'LumaPrints', value: 'lumaprints'},
          {title: 'Self-fulfilled', value: 'self'},
        ],
      },
      initialValue: 'self',
      description: 'LumaPrints = auto-submit when order is placed. Self = handle fulfillment manually.',
    }),

    // Available paper types for LumaPrints (shown as options on product page)
    defineField({
      name: 'availablePapers',
      title: 'Available Paper Types',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'name', 
            title: 'Paper Type', 
            type: 'string',
            options: {
              list: [
                { title: 'Archival Matte 8×10', value: 'Archival Matte 8×10' },
                { title: 'Archival Matte 4×6', value: 'Archival Matte 4×6' },
                { title: 'Glossy 8×10', value: 'Glossy 8×10' },
                { title: 'Glossy 4×6', value: 'Glossy 4×6' },
              ]
            }
          },
          { 
            name: 'subcategoryId', 
            title: 'LumaPrints Subcategory', 
            type: 'string',
            options: {
              list: [
                { title: 'Archival Matte (103001)', value: '103001' },
                { title: 'Glossy (103007)', value: '103007' },
              ]
            }
          },
          { 
            name: 'width', 
            title: 'Width (in)', 
            type: 'number',
            options: {
              list: [
                { title: '4', value: 4 },
                { title: '8', value: 8 },
                { title: '10', value: 10 },
                { title: '12', value: 12 },
                { title: '16', value: 16 },
              ]
            }
          },
          { 
            name: 'height', 
            title: 'Height (in)', 
            type: 'number',
            options: {
              list: [
                { title: '4', value: 4 },
                { title: '6', value: 6 },
                { title: '8', value: 8 },
                { title: '10', value: 10 },
                { title: '12', value: 12 },
              ]
            }
          },
        ]
      }],
      options: {
        modal: { type: 'popover' }
      },
      hidden: ({ parent }) => parent?.fulfillmentType !== 'lumaprints',
      description: 'Add paper options. Select from predefined sizes and paper types.',
    }),

    // Inventory status — hide out-of-stock items or show "Sold Out"
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),

    // Featured products can be highlighted on homepage or shop page
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Highlight this product?',
    }),
  ],

  // Preview in document lists shows title, thumbnail, and price
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'price',
    },
    prepare({title, media, price}) {
      return {
        title,
        media,
        subtitle: price ? `$${price}` : 'No price set',
      }
    },
  },
})
