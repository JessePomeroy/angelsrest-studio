import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "n7rvza4g",
    dataset: "production",
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    /**
     * App ID for the deployed studio at https://angelsrest.sanity.studio/.
     * Pinning this here means future `sanity deploy` runs don't prompt
     * for an application ID — important for non-interactive deploys
     * (CI, agent-driven sessions) and for client studio repos cloned
     * from this template (they'll need their own appId after their
     * first deploy, but the structure is set up for it).
     */
    appId: "v36dvbb34bxdmx0g3gel8pua",
  },
});
