/**
 * Product Schema
 *
 * Defines the structure for shop products.
 * Products have images, pricing, and inventory status.
 *
 * Used on: /shop, /shop/[slug]
 */

import {defineField, defineType} from 'sanity'
import {paperOptions} from './constants/paperOptions'

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
      validation: (rule) => rule.positive(),
      description: 'Base price in USD. Optional if paper-specific prices are set.',
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

    // Collection reference - only for Prints category
    defineField({
      name: 'collection',
      title: 'Print Collection',
      type: 'reference',
      to: [{type: 'printCollection'}],
      hidden: ({parent}) => parent?.category !== 'prints',
      description: 'Link this print to a collection (shown on /shop/prints/[slug])',
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
                list: paperOptions,
              },
            },
            {
              name: 'price',
              title: 'Price (USD)',
              type: 'number',
              description: 'Price for this paper type and size. Overrides the base product price.',
              validation: (rule: any) => rule.required().positive(),
            },
          ],
          preview: {
            select: {
              name: 'name',
              price: 'price',
            },
            prepare(value: any) {
              const name = value?.name?.split('|')[0] || 'Paper option'
              const price = value?.price
              return {
                title: name,
                subtitle: price ? `$${price}` : 'No price set',
              }
            },
          },
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
