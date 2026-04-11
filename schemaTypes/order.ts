import { createElement } from "react";
import { defineType } from "sanity";
import { StatusEmoji } from "./components/StatusEmoji";

export const order = defineType({
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    {
      name: "orderNumber",
      type: "string",
      title: "Order Number",
      description: "Auto-generated order ID (e.g., ORD-001)",
    },
    {
      name: "stripeSessionId",
      type: "string",
      title: "Stripe Session ID",
    },
    {
      name: "customerEmail",
      type: "string",
      title: "Customer Email",
    },
    {
      name: "customerName",
      type: "string",
      title: "Customer Name",
    },
    {
      name: "shippingAddress",
      type: "object",
      title: "Shipping Address",
      fields: [
        { name: "line1", type: "string", title: "Address Line 1" },
        { name: "line2", type: "string", title: "Address Line 2" },
        { name: "city", type: "string", title: "City" },
        { name: "state", type: "string", title: "State/Province" },
        { name: "postalCode", type: "string", title: "Postal Code" },
        { name: "country", type: "string", title: "Country" },
      ],
    },
    {
      name: "items",
      type: "array",
      title: "Order Items",
      of: [
        {
          type: "object",
          fields: [
            { name: "productName", type: "string", title: "Product Name" },
            { name: "productSlug", type: "string", title: "Product Slug" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "price", type: "number", title: "Price (cents)" },
            { name: "image", type: "image", title: "Product Image", options: { hotspot: true } },
          ],
        },
      ],
    },
    {
      name: "subtotal",
      type: "number",
      title: "Subtotal (cents)",
    },
    {
      name: "total",
      type: "number",
      title: "Total (cents)",
    },
    {
      name: "stripeFees",
      type: "number",
      title: "Stripe Fees (cents)",
      description: "Transaction fees deducted by Stripe",
    },
    {
      name: "stripePaymentIntentId",
      type: "string",
      title: "Stripe Payment Intent ID",
      description: "Used to look up payment details",
    },
    {
      name: "lumaprintsOrderNumber",
      type: "string",
      title: "LumaPrints Order Number",
      description: "Order ID from LumaPrints (if fulfilled via LumaPrints)",
    },
    // Paper details selected at checkout
    {
      name: "paperName",
      type: "string",
      title: "Paper Type",
      description: "Selected paper type (e.g., Archival Matte 4x6)",
    },
    {
      name: "paperSubcategoryId",
      type: "string",
      title: "LumaPrints Subcategory ID",
    },
    {
      name: "paperSize",
      type: "string",
      title: "Paper Size",
      description: "Selected size (e.g., 4x6)",
    },
    {
      name: "trackingNumber",
      type: "string",
      title: "Tracking Number",
      description: "Shipping tracking number from carrier",
    },
    {
      name: "trackingUrl",
      type: "url",
      title: "Tracking URL",
      description: "Link to track shipment",
    },
    {
      name: "fulfillmentType",
      type: "string",
      title: "Fulfillment Type",
      options: {
        list: [
          { title: "LumaPrints", value: "lumaprints" },
          { title: "Self-fulfilled", value: "self" },
          { title: "Digital", value: "digital" },
        ],
      },
      initialValue: "self",
    },
    {
      name: "currency",
      type: "string",
      title: "Currency",
      initialValue: "usd",
    },
    {
      name: "status",
      type: "string",
      title: "Fulfillment Status",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Printing", value: "printing" },
          { title: "Ready to Ship", value: "ready" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Refunded", value: "refunded" },
        ],
      },
      initialValue: "new",
    },
    {
      name: "notes",
      type: "text",
      title: "Internal Notes",
      description: "Notes for fulfillment (paper type, custom requests, etc.)",
    },
    {
      name: "createdAt",
      type: "datetime",
      title: "Order Date",
    },
    {
      name: "updatedAt",
      type: "datetime",
      title: "Last Updated",
    },
  ],
  orderings: [
    {
      title: "Order Date (Newest)",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Order Date (Oldest)",
      name: "createdAtAsc",
      by: [{ field: "createdAt", direction: "asc" }],
    },
    {
      title: "Order Number",
      name: "orderNumberDesc",
      by: [{ field: "orderNumber", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      orderNumber: "orderNumber",
      customerEmail: "customerEmail",
      customerName: "customerName",
      status: "status",
      total: "total",
    },
    prepare({ orderNumber, customerEmail, customerName, status, total }) {
      const formattedTotal = typeof total === "number" ? `$${(total / 100).toFixed(2)}` : "";
      const customer = customerName || customerEmail || "Unknown customer";
      const parts = [status || "new"];
      if (formattedTotal) parts.push(formattedTotal);
      parts.push(customer);
      return {
        title: orderNumber || "No order number",
        subtitle: parts.join(" · "),
        media: createElement(StatusEmoji, { status }),
      };
    },
  },
});
