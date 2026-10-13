import { action } from "oxidejs";

/** Example server action: `*.server.ts` exports wrapped in `action()` are
 * callable from the client as if they were local functions. Everything else
 * in this file stays server-only. */
export const serverTime = action(async () => {
  const iso = new Date().toISOString();

  return { iso, from: "the server" };
});
