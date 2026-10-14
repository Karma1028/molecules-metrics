/**
 * Resolves a live-data path to its full URL.
 *
 * Hosting is decision-agnostic (SCOPE §3.1 / §7.1):
 *   - Default (Netlify Functions split): VITE_API_BASE unset → same-origin
 *     `/api/*`, which `netlify.toml` rewrites to `/.netlify/functions/*`.
 *   - Separate Python host (Render/Fly/HF): set VITE_API_BASE to that origin
 *     (e.g. "https://karma-live.onrender.com") and every call hits it directly.
 *
 * Static snapshot data baked by the GitHub Action lives under `/data/*.json`
 * and is read with `dataUrl`, never through the API base.
 */
const RAW_BASE = (import.meta.env.VITE_API_BASE ?? "").trim().replace(/\/+$/, "")

/** Full URL for a live API path. Accepts "/api/foo" or "api/foo" or "foo". */
export function apiUrl(path: string): string {
  const p = path.replace(/^\/+/, "")
  const withApi = p.startsWith("api/") ? p : `api/${p}`
  return RAW_BASE ? `${RAW_BASE}/${withApi}` : `/${withApi}`
}

/** Full URL for a baked static snapshot (public/data/*.json). */
export function dataUrl(file: string): string {
  return `/data/${file.replace(/^\/+/, "")}`
}

/** True when a dedicated live-data host is configured (decision B). */
export const hasRemoteApi = RAW_BASE.length > 0
