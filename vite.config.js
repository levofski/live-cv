import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/live-cv/",
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
  // Ensure Markdown files can be imported with ?raw suffix
  assetsInclude: ["**/*.md"],
});
