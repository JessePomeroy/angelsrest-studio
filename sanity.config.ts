/**
 * Sanity Studio Configuration
 *
 * This file configures the Sanity Studio:
 * - Project connection (projectId, dataset)
 * - Plugins (structure tool, vision tool)
 * - Custom desk structure (sidebar organization)
 * - Schema types
 *
 * Deploy changes with: npx sanity deploy
 */

import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import DocumentsPane from "sanity-plugin-documents-pane";
import { clientConfig } from "./client.config";
import { schemaTypes } from "./schemaTypes";
import { DashboardHome } from "./src/components/DashboardHome";

// Singleton document IDs — ensures only one of each exists
const SINGLETON_TYPES = new Set(["siteSettings", "about", "contactPage"]);
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

// Document types that get a "Used in" back-reference tab showing every
// document that references the current one. Uses sanity-plugin-documents-pane.
const TYPES_WITH_BACK_REFS = new Set([
  "gallery",
  "lumaProductV2",
  "lumaPrintSetV2",
  "printCollection",
]);

export default defineConfig({
  name: "default",
  title: clientConfig.studioTitle,
  projectId: clientConfig.projectId,
  dataset: clientConfig.dataset,

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title(clientConfig.studioTitle)
          .items([
            // ═══════════════════════════════════════
            // Dashboard
            // ═══════════════════════════════════════
            S.listItem().title("Dashboard").child(S.component(DashboardHome).title("Dashboard")),

            // ═══════════════════════════════════════
            // Needs Attention — content health checks
            // (Operational triage like unanswered inquiries / unfulfilled
            // orders lives in the admin dashboard, not here. Sanity owns
            // content health; admin owns operational triage.)
            // ═══════════════════════════════════════
            S.listItem()
              .title("⚠️ Needs Attention")
              .child(
                S.list()
                  .title("Needs Attention")
                  .items([
                    S.listItem()
                      .title("Drafts older than 7 days")
                      .child(
                        S.documentList()
                          .title("Stale drafts")
                          .filter('_id in path("drafts.**") && _updatedAt < $weekAgo')
                          .params({
                            weekAgo: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                          })
                          .defaultOrdering([{ field: "_updatedAt", direction: "asc" }]),
                      ),
                    S.listItem()
                      .title("Products without pricing")
                      .child(
                        S.documentList()
                          .title("Missing pricing")
                          // A product is missing pricing if:
                          //   - fulfillmentType=lumaprints  → needs availablePapers entries
                          //   - fulfillmentType=self (default) → needs a base price
                          // Prints often leave the base price blank because each
                          // paper variant has its own price; don't false-flag them.
                          .schemaType("product")
                          .filter(
                            '_type == "product" && (' +
                              '(fulfillmentType == "lumaprints" && (!defined(availablePapers) || count(availablePapers) == 0))' +
                              ' || (fulfillmentType != "lumaprints" && !defined(price))' +
                              ")",
                          )
                          .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
                      ),
                    S.listItem()
                      .title("Galleries without images")
                      .child(
                        S.documentList()
                          .title("Empty galleries")
                          .schemaType("gallery")
                          .filter('_type == "gallery" && (!defined(images) || count(images) == 0)')
                          .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
                      ),
                    S.listItem()
                      .title("Print products without variants")
                      .child(
                        S.documentList()
                          .title("Missing variants")
                          .schemaType("lumaProductV2")
                          .filter(
                            '_type == "lumaProductV2" && (!defined(variants) || count(variants) == 0)',
                          )
                          .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
                      ),
                  ]),
              ),

            S.divider(),

            // ═══════════════════════════════════════
            // Content
            // ═══════════════════════════════════════
            orderableDocumentListDeskItem({
              type: "gallery",
              title: "Galleries",
              S,
              context,
            }),

            // About — singleton (opens directly to the document)
            S.listItem()
              .title("About")
              .schemaType("about")
              .child(
                S.documentTypeList("about")
                  .title("About")
                  .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
              ),

            // Contact & Booking — singleton
            S.listItem()
              .title("Contact & Booking")
              .schemaType("contactPage")
              .child(
                S.documentTypeList("contactPage")
                  .title("Contact & Booking")
                  .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
              ),

            S.divider(),

            // ═══════════════════════════════════════
            // Shop
            // ═══════════════════════════════════════
            S.listItem()
              .title("Products")
              .schemaType("product")
              .child(
                S.list()
                  .title("Products")
                  .items([
                    S.listItem()
                      .title("All Products")
                      .child(
                        S.documentTypeList("product")
                          .title("All Products")
                          .defaultOrdering([{ field: "orderRank", direction: "asc" }]),
                      ),
                    S.divider(),
                    ...["prints", "postcards", "tapestries", "digital", "merchandise"].map((cat) =>
                      S.listItem()
                        .title(cat.charAt(0).toUpperCase() + cat.slice(1))
                        .child(
                          S.documentList()
                            .title(cat.charAt(0).toUpperCase() + cat.slice(1))
                            .schemaType("product")
                            .filter('_type == "product" && category == $category')
                            .params({ category: cat })
                            .defaultOrdering([{ field: "orderRank", direction: "asc" }]),
                        ),
                    ),
                  ]),
              ),

            orderableDocumentListDeskItem({
              type: "printCollection",
              title: "Print Collections",
              S,
              context,
            }),

            orderableDocumentListDeskItem({
              type: "printSet",
              title: "Print Sets",
              S,
              context,
            }),

            S.listItem()
              .title("Coupons")
              .schemaType("coupon")
              .child(S.documentTypeList("coupon").title("Coupons")),

            S.divider(),

            // ═══════════════════════════════════════
            // Shop V2 (audit #23 — behind SHOP_V2_ENABLED flag)
            // ═══════════════════════════════════════
            S.listItem()
              .title("Shop V2 (Print Products)")
              .schemaType("lumaProductV2")
              .child(
                S.documentTypeList("lumaProductV2")
                  .title("Print Products (V2)")
                  .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
              ),

            S.listItem()
              .title("Shop V2 (Print Sets)")
              .schemaType("lumaPrintSetV2")
              .child(
                S.documentTypeList("lumaPrintSetV2")
                  .title("Print Sets (V2)")
                  .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
              ),

            S.divider(),

            // ═══════════════════════════════════════
            // Inquiries
            // ═══════════════════════════════════════
            S.listItem()
              .title("Inquiries")
              .schemaType("inquiry")
              .child(
                S.list()
                  .title("Inquiries")
                  .items([
                    S.listItem()
                      .title("New")
                      .child(
                        S.documentList()
                          .title("New Inquiries")
                          .schemaType("inquiry")
                          .filter('_type == "inquiry" && status == "new"')
                          .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
                      ),
                    S.listItem()
                      .title("All Inquiries")
                      .child(
                        S.documentTypeList("inquiry")
                          .title("All Inquiries")
                          .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
                      ),
                  ]),
              ),

            S.divider(),

            // ═══════════════════════════════════════
            // Orders
            // ═══════════════════════════════════════
            S.listItem()
              .title("Orders")
              .schemaType("order")
              .child(
                S.list()
                  .title("Orders")
                  .items([
                    S.listItem()
                      .title("All Orders")
                      .child(
                        S.documentTypeList("order")
                          .title("All Orders")
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
                      ),
                    S.divider(),
                    S.listItem()
                      .title("Today")
                      .child(
                        S.documentList()
                          .title("Today")
                          .schemaType("order")
                          .filter('_type == "order" && createdAt >= $start')
                          .params({
                            start: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                          })
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
                      ),
                    S.listItem()
                      .title("This Week")
                      .child(
                        S.documentList()
                          .title("This Week")
                          .schemaType("order")
                          .filter('_type == "order" && createdAt >= $start')
                          .params({
                            start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                          })
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
                      ),
                    S.listItem()
                      .title("This Month")
                      .child(
                        S.documentList()
                          .title("This Month")
                          .schemaType("order")
                          .filter('_type == "order" && createdAt >= $start')
                          .params({
                            start: new Date(
                              new Date().getFullYear(),
                              new Date().getMonth(),
                              1,
                            ).toISOString(),
                          })
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
                      ),
                    S.listItem()
                      .title("This Year")
                      .child(
                        S.documentList()
                          .title("This Year")
                          .schemaType("order")
                          .filter('_type == "order" && createdAt >= $start')
                          .params({
                            start: new Date(new Date().getFullYear(), 0, 1).toISOString(),
                          })
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
                      ),
                  ]),
              ),

            S.divider(),

            // ═══════════════════════════════════════
            // Blog
            // ═══════════════════════════════════════
            S.listItem().title("Posts").schemaType("post").child(S.documentTypeList("post")),
            S.listItem().title("Authors").schemaType("author").child(S.documentTypeList("author")),
            S.listItem()
              .title("Categories")
              .schemaType("category")
              .child(S.documentTypeList("category")),

            S.divider(),

            // ═══════════════════════════════════════
            // Settings
            // ═══════════════════════════════════════
            S.listItem()
              .title("Site Settings")
              .schemaType("siteSettings")
              .child(
                S.documentTypeList("siteSettings")
                  .title("Site Settings")
                  .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
              ),
          ]),
      defaultDocumentNode: (S, { schemaType }) => {
        if (TYPES_WITH_BACK_REFS.has(schemaType)) {
          return S.document().views([
            S.view.form(),
            S.view
              .component(DocumentsPane)
              .options({
                query: "*[references($id)]",
                params: { id: "_id" },
                options: { perspective: "previewDrafts" },
              })
              .title("Used in"),
          ]);
        }
        return S.document().views([S.view.form()]);
      },
    }),

    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft/enable",
        },
      },
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // For singletons, limit the actions to publish/discard/restore
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter((action) => SINGLETON_ACTIONS.has(action.action ?? ""))
        : input,
  },
});
