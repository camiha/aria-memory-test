import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// html は src/routes/ 配下に置き、URL は routes を含まない（/ , /roles/ , /attributes/）
export default defineConfig({
  root: "src/routes",
  // GitHub Pages のプロジェクトページ配信用。CI から BASE_PATH で '/<repo>/' を渡す
  base: process.env.BASE_PATH || "/",
  // root を移しても、html からは /src/... で参照できるようにする
  resolve: {
    alias: {
      "/src": fileURLToPath(new URL("src", import.meta.url))
    }
  },
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("src/routes/index.html", import.meta.url)),
        roles: fileURLToPath(new URL("src/routes/roles/index.html", import.meta.url)),
        attributes: fileURLToPath(new URL("src/routes/attributes/index.html", import.meta.url))
      }
    }
  },
  // vitest は root の影響を受けず、プロジェクト直下から探索する
  test: {
    root: fileURLToPath(new URL(".", import.meta.url))
  }
});
