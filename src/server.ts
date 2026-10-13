import { setFrameAuth } from "@ilha/router/ssr";
import type { ServerEntry } from "oxidejs";

// Frames (server-page + server-island rendering) are deny-by-default in
// production. This starter serves world-readable state, so open them:
// tighten this once a page reads session data.
setFrameAuth({ defaultAction: "open" });

export default {
  fetch() {
    // No match: fall through to static assets / index.html.
  },
} satisfies ServerEntry<AppEnv>;
