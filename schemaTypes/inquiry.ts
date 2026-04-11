/**
 * Inquiry Schema (Read-Only)
 *
 * Contact form submissions stored in the CMS.
 * Created programmatically via the contact form API — not edited in Studio.
 *
 * Used on: admin dashboard (inquiries page)
 */

import { InboxIcon } from "@sanity/icons";
import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { StatusEmoji } from "./components/StatusEmoji";

export const inquiry = defineType({
  name: "inquiry",
  title: "Inquiry",
  type: "document",
  icon: InboxIcon,
  readOnly: true,

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),

    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
    }),

    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),

    defineField({
      name: "sessionType",
      title: "Session Type",
      type: "string",
      description: "If submitted from booking form",
    }),

    defineField({
      name: "preferredDate",
      title: "Preferred Date",
      type: "date",
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Replied", value: "replied" },
        ],
      },
      initialValue: "new",
      // Status is the one field that CAN be edited
      readOnly: false,
    }),

    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      description: "Private notes (not visible to the person who submitted)",
      readOnly: false,
    }),

    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
  ],

  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      name: "name",
      subject: "subject",
      status: "status",
      date: "submittedAt",
    },
    prepare({ name, subject, status, date }) {
      const dateStr = date
        ? new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
        : "";
      const parts = [subject ?? "No subject"];
      if (dateStr) parts.push(dateStr);
      return {
        title: name ?? "Unknown",
        subtitle: parts.join(" · "),
        media: createElement(StatusEmoji, { status }),
      };
    },
  },
});
