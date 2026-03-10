/**
 * Print Collection Schema
 *
 * Defines collections of prints that can be sold as sets.
 * Used on: /shop/prints/[slug]
 */

import {defineField, defineType} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'

export const printCollection = defineType({
  name: 'printCollection',
  title: 'Print Collection',
  type: 'document',

  fields: [
    orderRankField({type: 'printCollection'}),

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
      description: 'Leave empty for top-level collections. Reference a parent to nest this collection.',
    }),

    defineField({
      name: 'previewImage',
      title: 'Preview Image',
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
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'previewImage',
    },
  },
})
