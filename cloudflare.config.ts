// The Worker, declared for the `cf` CLI (https://github.com/cloudflare/cf):
// bindings, assets and defaults in one typed file. oxide() loads it (edits need
// a dev server restart) and withOxide() hands it to the Cloudflare plugin; the
// build emits `dist/wrangler.json`, which Noite deploys with celld.
import { bindings, defineConfig, defineWorker } from "cf/config";

const worker = defineWorker({
  assets: {
    // Oxide's worker answers document navigations itself, so keep real 404s
    // here: a missing `/assets/*.js` must not fall back to index.html.
    notFoundHandling: "none",
    runWorkerFirst: true,
  },
  compatibilityDate: "2026-01-01",
  compatibilityFlags: ["nodejs_compat"],
  entrypoint: "./src/worker.ts",
  env: {
    // Static assets: Oxide's worker serves the client bundle through it.
    ASSETS: bindings.assets(),
    // Optional D1 example, provisioned per app on first deploy; type it in
    // `src/env.d.ts` (`DB?: D1Database`):
    // DB: bindings.d1({ name: "app-db" }),
  },
  name: "noite-app",
});

export default defineConfig({ worker });
