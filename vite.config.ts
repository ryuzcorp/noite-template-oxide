import { cloudflare } from "@cloudflare/vite-plugin";
import { pages } from "@ilha/router/vite";
import tailwindcss from "@tailwindcss/vite";
import oxide from "oxidejs/vite";
import { withOxide } from "oxidejs/wrangler";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    oxide({ middleware: ["@ilha/router/ssr"] }),
    cloudflare(withOxide()),
    pages(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
