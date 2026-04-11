/**
 * Status emoji thumbnail used as `media` in document list previews.
 *
 * Sanity's preview API accepts a React element as `media`, which renders in
 * the same slot a thumbnail would occupy. For document types without a real
 * image (inquiries, orders) we render a status-based emoji instead so the
 * list view stays scannable rather than falling back to a generic icon.
 *
 * Used by: inquiry.ts, order.ts. Imported via `React.createElement` so the
 * schema files can stay `.ts` (no JSX) while still passing a rendered
 * element to `prepare()`.
 */

import type { CSSProperties } from "react";

const STATUS_EMOJI: Record<string, string> = {
  // Inquiry statuses
  new: "🆕",
  read: "👁",
  replied: "✅",

  // Order statuses
  printing: "🖨",
  ready: "📦",
  shipped: "🚚",
  delivered: "📬",
  refunded: "↩️",
  fulfillment_error: "⚠️",
};

const wrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  fontSize: "1.5rem",
  lineHeight: 1,
};

export function StatusEmoji({ status }: { status?: string }) {
  const emoji = STATUS_EMOJI[status ?? ""] ?? "•";
  return <span style={wrapperStyle}>{emoji}</span>;
}
