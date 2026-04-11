/**
 * Print Collection Schema
 *
 * Hierarchical grouping of prints. Collections can be nested
 * via the optional `parent` reference (e.g., "Film Photography" → "35mm").
 *
 * Top-level collections (no parent) appear on the main shop page under Prints.
 * Nested collections appear inside their parent's detail page.
 *
 * Used on: /shop (top-level), /shop/prints/[slug] (detail + nested)
 */

import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const printCollection = defineType({
  name: "printCollection",
  title: "Print Collection",
  type: "document",

  fields: [
    orderRankField({ type: "printCollection" }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "parent",
      title: "Parent Collection",
      type: "reference",
      to: [{ type: "printCollection" }],
      description:
        "Leave empty for top-level collections. Reference a parent to nest this collection.",
    }),

    defineField({
      name: "previewImage",
      title: "Preview Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "previewImage",
      description: "description",
      parentTitle: "parent.title",
      featured: "featured",
    },
    prepare({ title, media, description, parentTitle, featured }) {
      // Product count would require a back-reference query (not available in
      // preview.select). Deferred to the documents-pane PR. For now we surface
      // hierarchy + description so the list view is at least informative.
      const parts: string[] = [];
      if (parentTitle) parts.push(`↳ ${parentTitle}`);
      else parts.push("Top-level");
      if (featured) parts.push("★ Featured");
      if (description) parts.push(description);
      return { title, media, subtitle: parts.join(" · ") };
    },
  },
});
