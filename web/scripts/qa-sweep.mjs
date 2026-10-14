/**
 * QA Sweep Harness (R0, GEMINI-EXECUTION-BRIEF.md §2).
 * Verifies one-screen contract (H1) and reduced-motion contract (H4/H5)
 * across 15 routes x 3 viewports x 3 variants = 135 runs.
 */
import { chromium } from "playwright"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")

const ROUTES = [
  "/",
  "/artist",
  "/artist/gallery",
  "/artist/sound",
  "/artist/matchday",
  "/artist/notes",
  "/artist/about",
  "/artist/contact",
  "/analyst",
  "/analyst/skills",
  "/analyst/work",
  "/analyst/journey",
  "/analyst/dashboard",
  "/analyst/resume",
  "/analyst/contact",
]

const SIZES = [
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "375x812", width: 375, height: 812 },
]

const VARIANTS = [
  { theme: "dark", rm: false, suffix: "-dark" },
  { theme: "light", rm: false, suffix: "-light" },
  { theme: "light", rm: true, suffix: "-light-rm" },
]

function parseArgs() {
  const args = process.argv.slice(2)
  let step = "r0"
  let baseUrl = "http://localhost:5176"
  let routeFilter = null
  let sizeFilter = null
  let concurrency = 3

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--step" && args[i + 1]) step = args[++i]
    else if (args[i] === "--url" && args[i + 1]) baseUrl = args[++i]
    else if (args[i] === "--route" && args[i + 1]) routeFilter = args[++i]
    else if (args[i] === "--size" && args[i + 1]) sizeFilter = args[++i]
    else if (args[i] === "--concurrency" && args[i + 1]) concurrency = parseInt(args[++i], 10)
  }
  return { step, baseUrl, routeFilter, sizeFilter, concurrency }
}

function routeToSlug(route) {
  if (route === "/") return "_"
  return route.replace(/\//g, "_")
}

async function runSweep() {
  const { step, baseUrl, routeFilter, sizeFilter, concurrency } = parseArgs()
  const outDir = join(ROOT, "qa", step)
  await mkdir(outDir, { recursive: true })

  const routes = routeFilter ? ROUTES.filter((r) => r.includes(routeFilter)) : ROUTES
  const sizes = sizeFilter ? SIZES.filter((s) => s.name === sizeFilter) : SIZES

  const tasks = []
  for (const route of routes) {
    for (const size of sizes) {
      for (const v of VARIANTS) {
        const slug = routeToSlug(route)
        const tag = `${slug}@${size.name}${v.suffix}`
        tasks.push({ route, size, variant: v, tag })
      }
    }
  }

  console.log(`Starting QA Sweep [${step}]: ${tasks.length} runs on ${baseUrl} (concurrency=${concurrency})`)

  let browser
  try {
    browser = await chromium.launch({ channel: "chrome" })
  } catch (err) {
    browser = await chromium.launch()
  }

  const results = []
  let completed = 0

  async function worker(queue) {
    while (queue.length > 0) {
      const task = queue.shift()
      if (!task) break

      const { route, size, variant, tag } = task
      const context = await browser.newContext({
        viewport: { width: size.width, height: size.height },
        reducedMotion: variant.rm ? "reduce" : "no-preference",
      })

      await context.addInitScript(
        ({ theme, rm }) => {
          try {
            window.localStorage.setItem("nb-theme-artist", theme)
            window.localStorage.setItem("nb-theme-analyst", theme)
            if (rm) window.sessionStorage.setItem("mm-rm", "1")
            else window.sessionStorage.removeItem("mm-rm")
          } catch {}
        },
        { theme: variant.theme, rm: variant.rm }
      )

      const page = await context.newPage()
      const errs = []
      const networkErrs = []

      page.on("pageerror", (err) => {
        errs.push(err.message || String(err))
      })

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          const txt = msg.text()
          if (
            txt.includes("502") ||
            txt.includes("ERR_NAME_NOT_RESOLVED") ||
            txt.includes("net::ERR") ||
            txt.includes("Failed to load resource")
          ) {
            networkErrs.push(txt)
          } else {
            errs.push(txt)
          }
        }
      })

      const sep = route.includes("?") ? "&" : "?"
      const targetUrl = `${baseUrl}${route}${sep}theme=${variant.theme}&rm=${variant.rm ? "1" : "0"}`

      try {
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 15000 })
        await page.waitForTimeout(2500)

        const evalData = await page.evaluate(() => {
          const se = document.scrollingElement || document.documentElement
          const sh = se.scrollHeight
          const ih = window.innerHeight
          const sw = se.scrollWidth
          const iw = window.innerWidth

          const inner = []
          const all = document.querySelectorAll("*")
          for (const el of all) {
            const style = window.getComputedStyle(el)
            const ox = style.overflowX
            const oy = style.overflowY
            const hasX = ox === "auto" || ox === "scroll"
            const hasY = oy === "auto" || oy === "scroll"
            if (hasX || hasY) {
              const dx = el.scrollWidth - el.clientWidth
              const dy = el.scrollHeight - el.clientHeight
              if ((hasX && dx > 2) || (hasY && dy > 2)) {
                const cls = (el.className && typeof el.className === "string") ? el.className.trim() : ""
                const tag = el.tagName.toLowerCase()
                const desc = cls ? `.${cls.split(/\s+/).join(".")}` : tag
                inner.push({
                  selector: desc,
                  classes: cls ? cls.split(/\s+/) : [],
                  dx,
                  dy,
                })
              }
            }
          }

          const animList = document.getAnimations()
          const running = animList.filter((a) => a.playState === "running").length
          const infinite = animList.filter((a) => {
            const t = a.effect && a.effect.getTiming ? a.effect.getTiming() : null
            return t && (t.iterations === Infinity || t.iterationCount === Infinity)
          }).length

          return { sh, ih, sw, iw, inner, running, infinite }
        })

        // One-screen check: document scrollHeight/scrollWidth within 1px of viewport
        const noDocScroll = evalData.sh <= size.height + 1 && evalData.sw <= size.width + 1
        const noInnerScroll = evalData.inner.length === 0
        const rmCompliant = !variant.rm || evalData.running === 0
        const noErrors = errs.length === 0

        const ok = noDocScroll && noInnerScroll && rmCompliant && noErrors

        const row = {
          tag,
          route,
          ok,
          sh: evalData.sh,
          ih: evalData.ih,
          sw: evalData.sw,
          iw: evalData.iw,
          theme: variant.theme,
          rm: variant.rm,
          inner: evalData.inner.map((i) => i.selector),
          running: evalData.running,
          infinite: evalData.infinite,
          errs,
          networkErrs,
        }

        if (!ok) {
          const shotPath = join(outDir, `${tag}.png`)
          try {
            await page.screenshot({ path: shotPath })
          } catch {}
        }

        results.push(row)
      } catch (e) {
        results.push({
          tag,
          route,
          ok: false,
          error: e.message,
          theme: variant.theme,
          rm: variant.rm,
          inner: [],
          errs: [e.message],
          networkErrs: [],
        })
      } finally {
        await page.close()
        await context.close()
        completed++
        process.stdout.write(`\rProgress: ${completed}/${tasks.length}`)
      }
    }
  }

  const queue = [...tasks]
  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker(queue))
  await Promise.all(workers)
  await browser.close()

  console.log("\nSweep finished. Writing results...")

  // Sort results by original task order
  const orderMap = new Map(tasks.map((t, idx) => [t.tag, idx]))
  results.sort((a, b) => (orderMap.get(a.tag) ?? 0) - (orderMap.get(b.tag) ?? 0))

  const resultsPath = join(outDir, "results.json")
  await writeFile(resultsPath, JSON.stringify(results, null, 2) + "\n")

  // Generate per-route summary
  const total = results.length
  const passed = results.filter((r) => r.ok).length
  const failed = results.filter((r) => !r.ok)

  console.log(`\n========================================`)
  console.log(`QA Sweep Summary [${step}]: ${passed}/${total} PASS`)
  console.log(`========================================`)

  const byRoute = new Map()
  for (const r of results) {
    if (!byRoute.has(r.route)) byRoute.set(r.route, [])
    byRoute.get(r.route).push(r)
  }

  for (const [route, rows] of byRoute) {
    const routePass = rows.filter((r) => r.ok).length
    const routeTotal = rows.length
    const status = routePass === routeTotal ? "PASS" : "FAIL"
    const fails = rows
      .filter((r) => !r.ok)
      .map((r) => {
        const issues = []
        if (r.sh > r.ih + 1) issues.push(`sh=${r.sh}>${r.ih}`)
        if (r.sw > r.iw + 1) issues.push(`sw=${r.sw}>${r.iw}`)
        if (r.inner && r.inner.length) issues.push(`inner=[${r.inner.join(",")}]`)
        if (r.rm && r.running > 0) issues.push(`running=${r.running}`)
        if (r.errs && r.errs.length) issues.push(`errs=${r.errs.length}`)
        return `${r.tag}(${issues.join(" ")})`
      })
    console.log(`${status.padEnd(5)} ${route.padEnd(20)} ${routePass}/${routeTotal} ${fails.length ? "-> " + fails.join(", ") : ""}`)
  }

  console.log(`\nResults written to: ${resultsPath}`)
  return { total, passed, failed: failed.length }
}

runSweep().catch((e) => {
  console.error("QA Sweep failed with error:", e)
  process.exit(1)
})
