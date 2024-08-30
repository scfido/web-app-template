import path from "path"
import react from "@vitejs/plugin-react"
import mdx from '@mdx-js/rollup'
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
