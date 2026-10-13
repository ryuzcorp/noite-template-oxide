/// <reference types="vite/client" />
/// <reference types="@cloudflare/workers-types" />

/** Worker bindings. Add one here and in `cloudflare.config.ts` together. */
interface AppEnv {
  /** Static assets (`env.ASSETS` in `cloudflare.config.ts`). */
  ASSETS?: Fetcher;
  /** D1 database — enable `DB` in `cloudflare.config.ts`. */
  DB?: D1Database;
}
