# Oxide + Ilha starter

A [Noite](https://github.com/ryuzcorp/noite) app template: [Oxide](https://oxide.build)
server actions, [Ilha](https://github.com/ilhajs/ilha) pages and islands,
built with Vite + `@cloudflare/vite-plugin` and served by celld.

## Deploy on Noite

Noite deploys on push. Point a remote at your app and push `main`:

```sh
git remote add noite https://git.<your-noite-host>/<app-slug>
git push -u noite main
```

Or create the app from this template in the Noite UI (or with the MCP
`create_app` tool) and clone the repo it gives you — that remote is already
configured. Every push to `main` runs install → build → `celld deploy`; the
deployment page shows the log and the live SHA.

The build is the same one you run locally:

```sh
bun install
bun run build
```

`vite build` writes `dist/wrangler.json` (a celld-ready config), the Worker at
`dist/celld/entry.js` and the client assets under `dist/client/`. Noite picks
that config up automatically — there is nothing to configure for a deploy.

If the project pins `packageManager` in `package.json`, Noite installs with
that; otherwise a lockfile decides (`bun.lock` here), defaulting to bun.

## Local development

```sh
bun install
bun run dev        # vite + workerd (local D1/R2, HMR)
bun run typecheck  # builds first: tsc reads the generated route types
```

## Pages and islands

- `src/pages/*.tsx` — file-based pages (`/` is `src/pages/index.tsx`).
- `src/lib/*.server.tsx` — server islands: exported `function` components
  render on the server and stream into the page.
- `src/lib/*.server.ts` — server actions: export a function wrapped in
  `action()` and call it from the client like a local function.
- `src/client.ts` — client entry (CSS + page router mount).
- `src/server.ts` — server entry: custom routes and `setFrameAuth`.
- `src/worker.ts` — the Worker entry `cloudflare.config.ts` points at; oxide owns it.
- `cloudflare.config.ts` — the Worker: name, compatibility, assets, bindings.

## Bindings

`cloudflare.config.ts` declares the Worker with the typed helpers from
`cf/config` (the [`cf` CLI](https://github.com/cloudflare/cf)'s config) instead
of a `wrangler.jsonc`. The template ships one commented D1 example; uncomment it
and add `DB?: D1Database` to `AppEnv` in `src/env.d.ts` to use it:

```ts
env: {
  DB: bindings.d1({ name: "app-db" }),
},
```

The platform provisions the database per app on first deploy. Bindings are
read from the built config, so run `bun run build` after editing them.

Secrets: set them as env vars on the app (Noite passes them to the build and
the fleet), never in `cloudflare.config.ts`.

## Stack

| Piece | Version |
| --- | --- |
| oxidejs | ^0.6.1 |
| ilha / @ilha/router | ^0.15.2 / ^0.11.16 |
| vite | ^8.3.4 |

## License

[MIT-0](./LICENSE): copy it into your app, no attribution needed.
