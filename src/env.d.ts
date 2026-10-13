/// <reference types="vite/client" />
/// <reference types="@cloudflare/workers-types" />

/** Worker bindings. Add one here and in `wrangler.jsonc` together. */
interface AppEnv {
  /** Static assets (`wrangler.jsonc` `assets.binding`). */
  ASSETS?: Fetcher;
  /** D1 database — enable `d1_databases` in `wrangler.jsonc`. */
  DB?: D1Database;
}
