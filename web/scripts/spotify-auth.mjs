// One-time: gets the SPOTIFY_REFRESH_TOKEN the site needs. Run locally, never in CI.
//   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
// Add http://127.0.0.1:8888/callback as a Redirect URI on the Spotify developer app first.
// The token prints to this terminal only; paste it into Netlify + GitHub secrets yourself.
import { createServer } from "node:http"
import { randomBytes } from "node:crypto"
import { authUrl, exchangeCode } from "../netlify/functions/lib/spotify-auth.mjs"

const id = process.env.SPOTIFY_CLIENT_ID
const secret = process.env.SPOTIFY_CLIENT_SECRET
if (!id || !secret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.")
  process.exit(1)
}

const PORT = 8888
const redirect = `http://127.0.0.1:${PORT}/callback`
const state = randomBytes(8).toString("hex")

const server = createServer(async (req, res) => {
  const u = new URL(req.url, redirect)
  if (u.pathname !== "/callback") return res.writeHead(404).end()
  const code = u.searchParams.get("code")
  if (u.searchParams.get("state") !== state || !code) {
    res.writeHead(400).end("Bad or missing authorisation. Close this tab and re-run the script.")
    return
  }
  const token = await exchangeCode({ id, secret }, code, redirect)
  res.writeHead(200, { "content-type": "text/plain" }).end(token ? "Done. Return to the terminal." : "Spotify refused the code. Re-run the script.")
  console.log(token ? `\nSPOTIFY_REFRESH_TOKEN=${token}\n` : "\nSpotify refused the code (check the client id/secret and redirect URI).")
  server.close()
})

server.listen(PORT, "127.0.0.1", () => {
  console.log("Open this URL in your browser and approve:\n\n" + authUrl(id, redirect, state) + "\n")
})
