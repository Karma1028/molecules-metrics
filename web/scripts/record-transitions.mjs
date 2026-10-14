import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")
const qaDir = path.resolve(rootDir, "qa", "r3")
const framesDir = path.resolve(qaDir, "frames_temp")

if (!fs.existsSync(qaDir)) fs.mkdirSync(qaDir, { recursive: true })
if (fs.existsSync(framesDir)) fs.rmSync(framesDir, { recursive: true, force: true })
fs.mkdirSync(framesDir, { recursive: true })

async function run() {
  console.log("Launching system Chrome to capture transition frames...")
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  })

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  })

  const page = await context.newPage()

  let frameIdx = 0
  const captureIntervalMs = 60 // ~16 fps

  async function recordAction(actionFn, durationMs) {
    let active = true
    const loop = (async () => {
      while (active) {
        const framePath = path.resolve(framesDir, `frame-${String(frameIdx++).padStart(4, "0")}.png`)
        await page.screenshot({ path: framePath })
        await new Promise((r) => setTimeout(r, captureIntervalMs))
      }
    })()

    await actionFn()
    await new Promise((r) => setTimeout(r, durationMs))
    active = false
    await loop
  }

  // 1. Load /artist/gallery
  console.log("Navigating to /artist/gallery...")
  await page.goto("http://localhost:5176/artist/gallery", { waitUntil: "networkidle" })
  await page.waitForTimeout(500)

  // Initial steady frame
  for (let i = 0; i < 5; i++) {
    const framePath = path.resolve(framesDir, `frame-${String(frameIdx++).padStart(4, "0")}.png`)
    await page.screenshot({ path: framePath })
    await new Promise((r) => setTimeout(r, 60))
  }

  // 2. Click door to Analyst
  console.log("Recording transition: Artist -> Analyst...")
  const doorToAnalyst = page.locator("a.twin-door.to-analyst").first()
  await recordAction(async () => {
    await doorToAnalyst.hover()
    await page.waitForTimeout(200)
    await doorToAnalyst.click()
  }, 1600)

  // Steady frame on Analyst
  for (let i = 0; i < 6; i++) {
    const framePath = path.resolve(framesDir, `frame-${String(frameIdx++).padStart(4, "0")}.png`)
    await page.screenshot({ path: framePath })
    await new Promise((r) => setTimeout(r, 60))
  }

  // 3. Click door to Artist
  console.log("Recording transition: Analyst -> Artist...")
  const doorToArtist = page.locator("a.twin-door.to-artist").first()
  await recordAction(async () => {
    await doorToArtist.hover()
    await page.waitForTimeout(200)
    await doorToArtist.click()
  }, 1600)

  // Steady frame on Artist
  for (let i = 0; i < 5; i++) {
    const framePath = path.resolve(framesDir, `frame-${String(frameIdx++).padStart(4, "0")}.png`)
    await page.screenshot({ path: framePath })
    await new Promise((r) => setTimeout(r, 60))
  }

  await page.close()
  await context.close()
  await browser.close()

  console.log(`Captured ${frameIdx} frames. Generating GIF with system ffmpeg...`)
  const targetGif = path.resolve(qaDir, "transition.gif")

  try {
    const inputPattern = path.resolve(framesDir, "frame-%04d.png").replace(/\\/g, "/")
    const outGif = targetGif.replace(/\\/g, "/")
    execSync(
      `ffmpeg -y -framerate 16 -i "${inputPattern}" -vf "scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" "${outGif}"`,
      { stdio: "inherit" }
    )
    console.log(`Generated GIF successfully: ${targetGif}`)
  } catch (err) {
    console.error("FFmpeg error:", err.message)
  }

  // Clean up frames
  try {
    fs.rmSync(framesDir, { recursive: true, force: true })
    console.log("Temporary frames cleaned up.")
  } catch {}
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
