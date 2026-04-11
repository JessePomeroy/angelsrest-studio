/**
 * Print Set Schema
 *
 * A curated bundle/set of prints sold together as one purchase.
 * Unlike individual products, a set contains multiple images — all of which
 * are sent to LumaPrints as separate print items in one order.
 *
 * Each set can have its own paper options with per-paper pricing.
 * Sets can optionally belong to a print collection via the `parent` field.
 *
 * Used on: /shop (top-level sets), /shop/sets/[slug] (detail page)
 */

import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";
import { paperOptions } from "./constants/paperOptions";

export const printSet = defineType({
  name: "printSet",
  title: "Print Set",
  type: "document",

  fields: [
    orderRankField({ type: "printSet" }),

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
      description: "Optional: link this set to a print collection",
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
      name: "images",
      title: "Set Images",
      type: "array",
      of: [
        {
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
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().positive(),
      description: "Price for the entire set in USD",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Prints", value: "prints" },
          { title: "Postcards", value: "postcards" },
          { title: "Tapestries", value: "tapestries" },
          { title: "Digital", value: "digital" },
          { title: "Merchandise", value: "merchandise" },
        ],
      },
    }),

    // Paper options specific to this set
    defineField({
      name: "availablePapers",
      title: "Paper Options",
      description: "Paper types and sizes available for this set",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Paper Name",
              type: "string",
              options: {
                list: paperOptions,
              },
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              description: "Override the base price for this paper option",
            },
          ],
          preview: {
            select: {
              name: "name",
              price: "price",
            },
            prepare(value: any) {
              const name = value?.name?.split("|")[0] || "Paper option";
              const price = value?.price;
              return {
                title: name,
                subtitle: price ? `$${price}` : "Uses base price",
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
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
      previewImage: "previewImage",
      firstImage: "images.0",
      images: "images",
      price: "price",
    },
    prepare({ title, previewImage, firstImage, images, price }: any) {
      const count = Array.isArray(images) ? images.length : 0;
      const countText = count === 0 ? "No prints yet" : `${count} print${count === 1 ? "" : "s"}`;
      const priceText = typeof price === "number" ? `$${price}` : "No price";
      return {
        title,
        media: previewImage ?? firstImage,
        subtitle: `${countText} · ${priceText}`,
      };
    },
  },
});
