/**
 * Paper Options for LumaPrints
 *
 * Shared paper options used in both product and printSet schemas.
 * Single source of truth — add/remove paper types here.
 *
 * Value format: "Display Name|subcategoryId|width|height"
 * Example: "Archival Matte 4×6|103001|4|6"
 *
 * The pipe-delimited value is parsed by `parsePaperOption()` in the frontend
 * (src/lib/utils/images.ts) to extract subcategoryId, width, and height
 * for LumaPrints order submission.
 *
 * Subcategory IDs (LumaPrints Fine Art Paper category 103):
 * - 103001: Archival Matte
 * - 103003: Cold Press / Fine Art Rag
 * - 103007: Glossy
 *
 * Price is stored as a separate field on the paper object, not in this string.
 */

export const paperOptions = [
  // Archival Matte
  { title: "Archival Matte 4×6", value: "Archival Matte 4×6|103001|4|6" },
  { title: "Archival Matte 6×9", value: "Archival Matte 6×9|103001|6|9" },
  { title: "Archival Matte 8×12", value: "Archival Matte 8×12|103001|8|12" },
  { title: "Archival Matte 12×18", value: "Archival Matte 12×18|103001|12|18" },
  { title: "Archival Matte 16×24", value: "Archival Matte 16×24|103001|16|24" },

  // Glossy
  { title: "Glossy 4×6", value: "Glossy 4×6|103007|4|6" },
  { title: "Glossy 6×9", value: "Glossy 6×9|103007|6|9" },
  { title: "Glossy 8×12", value: "Glossy 8×12|103007|8|12" },
  { title: "Glossy 12×18", value: "Glossy 12×18|103007|12|18" },
  { title: "Glossy 16×24", value: "Glossy 16×24|103007|16|24" },

  // Fine Art Rag
  { title: "Fine Art Rag 8×10", value: "Fine Art Rag 8×10|103003|8|10" },
  { title: "Fine Art Rag 11×14", value: "Fine Art Rag 11×14|103003|11|14" },
  { title: "Fine Art Rag 16×20", value: "Fine Art Rag 16×20|103003|16|20" },
];
