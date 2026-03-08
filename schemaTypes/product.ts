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

    // LumaPrints subcategory ID — which product type (only needed if fulfillmentType = lumaprints)
    defineField({
      name: 'lumaprintsSubcategoryId',
      title: 'LumaPrints Subcategory ID',
      type: 'number',
      description: 'e.g., 103001 for Archival Matte Fine Art Paper, 103007 for Glossy',
      hidden: ({ parent }) => parent?.fulfillmentType !== 'lumaprints',
    }),

    // Print dimensions in inches (only needed if fulfillmentType = lumaprints)
    defineField({
      name: 'printWidth',
      title: 'Print Width (inches)',
      type: 'number',
      description: 'Width in inches, e.g., 8 for 8x10',
      hidden: ({ parent }) => parent?.fulfillmentType !== 'lumaprints',
    }),

    defineField({
      name: 'printHeight',
      title: 'Print Height (inches)',
      type: 'number',
      description: 'Height in inches, e.g., 10 for 8x10',
      hidden: ({ parent }) => parent?.fulfillmentType !== 'lumaprints',
    }),

    // LumaPrints option IDs (e.g., bleed size)
    defineField({
      name: 'lumaprintsOptions',
      title: 'LumaPrints Option IDs',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Option IDs to apply, e.g., 36 for 0.25in bleed. Leave empty for defaults.',
      hidden: ({ parent }) => parent?.fulfillmentType !== 'lumaprints',
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
