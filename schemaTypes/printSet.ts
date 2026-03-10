/**
 * Print Set Schema
 *
 * A curated bundle/set of prints sold together.
 * Unlike individual products, a set has multiple images.
 */

import {defineField, defineType} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'

export const printSet = defineType({
  name: 'printSet',
  title: 'Print Set',
  type: 'document',

  fields: [
    orderRankField({type: 'printSet'}),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

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

    defineField({
      name: 'parent',
      title: 'Parent Collection',
      type: 'reference',
      to: [{type: 'printCollection'}],
      description: 'Optional: link this set to a print collection',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'images',
      title: 'Set Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
      description: 'Price for the entire set in USD',
    }),

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

    // Paper options specific to this set
    defineField({
      name: 'availablePapers',
      title: 'Paper Options',
      description: 'Paper types and sizes available for this set',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Paper Name',
              type: 'string',
              options: {
                list: [
                  {title: 'Archival Matte 4×6', value: 'Archival Matte 4×6|103001|4|6'},
                  {title: 'Archival Matte 6×9', value: 'Archival Matte 6×9|103001|6|9'},
                  {title: 'Archival Matte 8×12', value: 'Archival Matte 8×12|103001|8|12'},
                  {title: 'Archival Matte 12×18', value: 'Archival Matte 12×18|103001|12|18'},
                ],
              },
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              description: 'Override the base price for this paper option',
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
                subtitle: price ? `$${price}` : 'Uses base price',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'price',
    },
    prepare({title, media, subtitle}: any) {
      return {
        title,
        subtitle: subtitle ? `$${subtitle}` : 'No price',
        media,
      }
    },
  },
})
