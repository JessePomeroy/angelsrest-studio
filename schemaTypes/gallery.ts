/**
 * Gallery Schema
 *
 * Defines the structure for photo galleries in the CMS.
 * Galleries can be reordered via drag-and-drop in the Studio.
 *
 * Used on: /gallery, /gallery/[slug]
 */

import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const gallery = defineType({
  // API name — used in GROQ queries: *[_type == "gallery"]
  name: "gallery",
  // Display name in Studio UI
  title: "Gallery",
  // Document type (as opposed to 'object' which is embedded)
  type: "document",

  fields: [
    // Hidden field that stores the sort order for drag-and-drop
    // Query with: | order(orderRank)
    orderRankField({ type: "gallery" }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    // Slug is auto-generated from title, used in URLs
    // e.g., "Film Diary" → "film-diary" → /gallery/film-diary
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title", // Auto-generate from title field
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // Array of images with optional alt text for accessibility
    // Displayed as a visual grid in the Studio
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true, // Enables focal point cropping in Studio
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Describes the image for screen readers and SEO",
            },
          ],
        },
      ],
      options: {
        layout: "grid", // Display as grid instead of list in Studio
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief description of this gallery",
    }),

    // Category dropdown for filtering/organization
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Portrait", value: "portrait" },
          { title: "Landscape", value: "landscape" },
          { title: "Street", value: "street" },
          { title: "Abstract", value: "abstract" },
          { title: "Editorial", value: "editorial" },
        ],
      },
    }),

    // Flexible tags for additional categorization
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" }, // Renders as tag pills
    }),

    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "When was this gallery created/shot?",
    }),

    // Featured galleries can be highlighted on homepage
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show this gallery on the homepage?",
    }),

    defineField({
      name: "isVisible",
      title: "Visible on Site",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this gallery from the public site",
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (rule: any) => rule.max(160),
        },
        {
          name: "ogImage",
          title: "Social Image",
          type: "image",
          description: "Override for social sharing (defaults to first gallery image)",
        },
      ],
    }),
  ],

  // How this document appears in lists in the Studio
  preview: {
    select: {
      title: "title",
      media: "images.0.asset",
      images: "images",
      category: "category",
    },
    prepare({ title, media, images, category }) {
      const count = Array.isArray(images) ? images.length : 0;
      const countText = count === 0 ? "No images yet" : `${count} image${count === 1 ? "" : "s"}`;
      const subtitle = category ? `${countText} · ${category}` : countText;
      return { title, media, subtitle };
    },
  },
});
