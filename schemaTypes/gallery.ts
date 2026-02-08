/**
 * Gallery Schema
 * 
 * Defines the structure for photo galleries in the CMS.
 * Galleries can be reordered via drag-and-drop in the Studio.
 * 
 * Used on: /gallery, /gallery/[slug]
 */

import {defineField, defineType} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'

export const gallery = defineType({
  // API name — used in GROQ queries: *[_type == "gallery"]
  name: 'gallery',
  // Display name in Studio UI
  title: 'Gallery',
  // Document type (as opposed to 'object' which is embedded)
  type: 'document',
  
  fields: [
    // Hidden field that stores the sort order for drag-and-drop
    // Query with: | order(orderRank)
    orderRankField({type: 'gallery'}),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Slug is auto-generated from title, used in URLs
    // e.g., "Film Diary" → "film-diary" → /gallery/film-diary
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',    // Auto-generate from title field
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // Array of images with optional alt text for accessibility
    // Displayed as a visual grid in the Studio
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,  // Enables focal point cropping in Studio
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Describes the image for screen readers and SEO',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',  // Display as grid instead of list in Studio
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of this gallery',
    }),

    // Category dropdown for filtering/organization
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Portrait', value: 'portrait'},
          {title: 'Landscape', value: 'landscape'},
          {title: 'Street', value: 'street'},
          {title: 'Abstract', value: 'abstract'},
          {title: 'Editorial', value: 'editorial'},
        ],
      },
    }),

    // Flexible tags for additional categorization
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},  // Renders as tag pills
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When was this gallery created/shot?',
    }),

    // Featured galleries can be highlighted on homepage
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show this gallery on the homepage?',
    }),
  ],

  // How this document appears in lists in the Studio
  preview: {
    select: {
      title: 'title',
      media: 'images.0',  // Use first image as thumbnail
    },
  },
})
