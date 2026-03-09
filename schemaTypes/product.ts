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
      description:
        'LumaPrints = auto-submit when order is placed. Self = handle fulfillment manually.',
    }),

    // Available paper types for LumaPrints (shown as options on product page)
    defineField({
      name: 'availablePapers',
      title: 'Available Paper Types',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Size & Paper',
              type: 'string',
              options: {
                list: [
                  {title: 'Archival Matte 4×6', value: 'Archival Matte 4×6|103001|4|6'},
                  {title: 'Archival Matte 6×9', value: 'Archival Matte 6×9|103001|6|9'},
                  {title: 'Archival Matte 8×12', value: 'Archival Matte 8×12|103001|8|12'},
                  {title: 'Archival Matte 12×18', value: 'Archival Matte 12×18|103001|12|18'},
                  {title: 'Glossy 4×6', value: 'Glossy 4×6|103007|4|6'},
                  {title: 'Glossy 6×9', value: 'Glossy 6×9|103007|6|9'},
                  {title: 'Glossy 8×12', value: 'Glossy 8×12|103007|8|12'},
                  {title: 'Glossy 12×18', value: 'Glossy 12×18|103007|12|18'},
                ],
              },
            },
          ],
        },
      ],
      options: {
        modal: {type: 'popover'},
      },
      hidden: ({parent}) => parent?.fulfillmentType !== 'lumaprints',
      description: 'Add paper options. All sizes are 2:3 ratio for your images.',
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
