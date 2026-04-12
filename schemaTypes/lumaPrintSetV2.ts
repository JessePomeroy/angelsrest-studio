/**
 * LumaPrints Print Set (Shop V2)
 *
 * V2 replacement for the legacy `printSet` schema. A print set is a curated
 * bundle of N photographs sold together at one price per paper × size combo.
 * Each variant represents the entire bundle in one paper × size, NOT a
 * single print.
 *
 * Pricing model: per-set retail. Photographer enters one number ("the whole
 * 4-print archival matte 8×10 set is $80"); the margin component below the
 * field shows wholesale (`per-print cost × image count`), Stripe + platform
 * fees, and final take-home for the bundle. This lets photographers offer
 * bundle discounts vs. buying prints individually.
 *
 * Differences from V1 `printSet`:
 *   - Catalog-aware paper + size dropdowns from `lumaprintsCatalog.ts`
 *     instead of free-form `availablePapers` strings
 *   - Per-paper × size variants instead of one base price + paper overrides
 *   - Inline margin display (RetailPriceWithMarginForSet)
 *   - Designed to flow through the Sharp print pipeline (PR #6 of LumaPrints
 *     expansion) and the post-PR-#8 cart system, not the legacy paper-string
 *     cart path.
 */

import { defineArrayMember, defineField, defineType } from "sanity";
import { RetailPriceWithMarginForSet } from "./components/RetailPriceWithMarginForSet";
import {
  getPaperBySlug,
  getSizeBySlug,
  PAPER_DROPDOWN_OPTIONS,
  SIZE_DROPDOWN_OPTIONS,
} from "./constants/lumaprintsCatalog";

export const lumaPrintSetV2 = defineType({
  name: "lumaPrintSetV2",
  title: "Print Set (V2)",
  type: "document",

  fields: [
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
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "previewImage",
      title: "Preview Image",
      description:
        "Hero / cover shot for shop listings. Optional — falls back to the first image in the set if not set. This image is NOT printed.",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text" }],
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Shown on the set detail page. Story behind the bundle.",
    }),

    defineField({
      name: "images",
      title: "Set Images",
      description:
        "The photographs in the set. Every image here gets printed when a customer buys the set. Order matters — this is the display order on the product page.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alternative text" }],
        },
      ],
      options: { layout: "grid" },
      validation: (rule) =>
        rule.required().min(1).max(20).error("A print set needs between 1 and 20 images."),
    }),

    defineField({
      name: "parent",
      title: "Parent Collection",
      type: "reference",
      to: [{ type: "printCollection" }],
      description: "Optional: link this set to a print collection.",
    }),

    defineField({
      name: "variants",
      title: "Variants",
      description:
        "Each variant is one paper + size combo applied to the entire set. The retail price below is the price for the WHOLE bundle (not per print). The margin display factors in the per-print wholesale cost × the number of images in the set.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "lumaPrintSetVariant",
          fields: [
            defineField({
              name: "paper",
              title: "Paper",
              type: "string",
              options: { list: PAPER_DROPDOWN_OPTIONS },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              options: { list: SIZE_DROPDOWN_OPTIONS },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "retailPrice",
              title: "Set Retail Price (USD)",
              type: "number",
              validation: (rule) => rule.required().positive(),
              components: { field: RetailPriceWithMarginForSet },
              description: "Price for the entire bundle at this paper × size.",
            }),
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: true,
              description: "Uncheck to hide this variant from the shop without deleting it.",
            }),
          ],
          preview: {
            select: {
              paper: "paper",
              size: "size",
              retailPrice: "retailPrice",
              enabled: "enabled",
            },
            prepare({ paper, size, retailPrice, enabled }) {
              const paperDef = paper ? getPaperBySlug(paper) : null;
              const sizeDef = size ? getSizeBySlug(size) : null;
              const label = `${paperDef?.name ?? paper ?? "?"} ${sizeDef?.label ?? size ?? "?"}`;
              const price = typeof retailPrice === "number" ? `$${retailPrice} set` : "no price";
              return {
                title: label,
                subtitle: `${price}${enabled === false ? " · disabled" : ""}`,
              };
            },
          },
        }),
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
      description: "Highlight this set on the homepage or shop page?",
    }),
  ],

  preview: {
    select: {
      title: "title",
      previewImage: "previewImage",
      firstImageAsset: "images.0.asset",
      images: "images",
      variants: "variants",
      inStock: "inStock",
    },
    prepare({ title, previewImage, firstImageAsset, images, variants, inStock }) {
      const imageList = Array.isArray(images) ? images : [];
      const variantList = Array.isArray(variants) ? variants : [];
      const enabledVariants = variantList.filter((v: any) => v?.enabled !== false).length;

      const imageCountText =
        imageList.length === 0
          ? "No prints yet"
          : `${imageList.length} print${imageList.length === 1 ? "" : "s"}`;

      let variantText: string;
      if (variantList.length === 0) {
        variantText = "no variants";
      } else if (enabledVariants === variantList.length) {
        variantText = `${variantList.length} variant${variantList.length === 1 ? "" : "s"}`;
      } else {
        variantText = `${enabledVariants}/${variantList.length} variants enabled`;
      }

      const parts = [imageCountText, variantText];
      if (inStock === false) parts.push("sold out");

      return {
        title,
        media: previewImage ?? firstImageAsset,
        subtitle: parts.join(" · "),
      };
    },
  },
});
