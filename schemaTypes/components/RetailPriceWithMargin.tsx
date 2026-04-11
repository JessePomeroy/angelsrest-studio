/**
 * Custom field component for `retailPrice` on a Shop V2 product variant.
 *
 * Renders the standard Sanity number input and adds a line below showing the
 * wholesale cost (looked up from `constants/lumaprintsCatalog.ts` based on
 * the variant's selected paper + size) and the computed margin percentage.
 * The margin updates live as the photographer types a retail price.
 *
 * Reads sibling `paper` and `size` fields via `useFormValue` on the parent
 * variant path. If either is unset, prompts the user to pick them. If both
 * are set but the combination isn't in the wholesale cost table, says so
 * explicitly so the photographer knows the margin can't be computed.
 *
 * Wired up via `components: { field: RetailPriceWithMargin }` in the
 * `lumaProductV2` schema.
 */

import { Stack, Text } from "@sanity/ui";
import type { FieldProps } from "sanity";
import { useFormValue } from "sanity";
import { getWholesaleCost } from "../constants/lumaprintsCatalog";

interface VariantContext {
  paper?: string;
  size?: string;
}

export function RetailPriceWithMargin(props: FieldProps) {
  // path is e.g. ["variants", { _key: "abc" }, "retailPrice"] — drop the
  // last segment to read the parent variant object via useFormValue.
  const parentPath = props.path.slice(0, -1);
  const variant = useFormValue(parentPath) as VariantContext | undefined;

  const cost =
    variant?.paper && variant?.size ? getWholesaleCost(variant.paper, variant.size) : null;

  const retailRaw = (props as { value?: unknown }).value;
  const retail = typeof retailRaw === "number" ? retailRaw : 0;

  let summary: string;
  if (!variant?.paper || !variant?.size) {
    summary = "Pick a paper and size to see wholesale cost.";
  } else if (cost === null) {
    summary = "Wholesale cost not yet in catalog for this paper × size.";
  } else if (retail <= 0) {
    summary = `Wholesale: $${cost.toFixed(2)} · set a retail price to see margin.`;
  } else if (retail < cost) {
    const loss = cost - retail;
    summary = `Wholesale: $${cost.toFixed(2)} · LOSS: $${loss.toFixed(2)} per unit.`;
  } else {
    const profit = retail - cost;
    const marginPct = (profit / retail) * 100;
    summary = `Wholesale: $${cost.toFixed(2)} · Margin: ${marginPct.toFixed(1)}% ($${profit.toFixed(2)} profit)`;
  }

  return (
    <Stack space={2}>
      {props.renderDefault(props)}
      <Text size={1} muted>
        {summary}
      </Text>
    </Stack>
  );
}
