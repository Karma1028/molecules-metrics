import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Live data stays on the Python server (port 5195). Dev-proxy the live
// endpoints + static media so the React app can call same-origin paths.
const PY = "http://127.0.0.1:5195"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Only live data is proxied. Static media (frames/, me.jpg) ships in
    // public/ so it bundles for a static deploy and needs no running server.
    proxy: {
      "/api": { target: PY, changeOrigin: true },
    },
  },
})
