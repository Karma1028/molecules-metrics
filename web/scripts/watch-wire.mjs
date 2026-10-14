import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const wirePath = path.resolve(__dirname, '..', '.karma', 'conversation.md')

console.log(`[Watcher] Monitoring ${wirePath} for WAITING_ANTIGRAVITY: yes...`)

let lastMtime = 0
let lastSize = 0
try {
  const s = fs.statSync(wirePath)
  lastMtime = s.mtimeMs
  lastSize = s.size
} catch {}

const interval = setInterval(() => {
  try {
    const stat = fs.statSync(wirePath)
    if (stat.mtimeMs !== lastMtime || stat.size !== lastSize) {
      lastMtime = stat.mtimeMs
      lastSize = stat.size
      const text = fs.readFileSync(wirePath, 'utf8')
      const lines = text.trim().split(/\r?\n/)
      const tail = lines.slice(-20).join('\n')
      if (tail.includes('WAITING_ANTIGRAVITY: yes')) {
        console.log(`[Watcher] Detected WAITING_ANTIGRAVITY: yes!`)
        console.log(tail)
        clearInterval(interval)
        process.exit(0)
      }
    }
  } catch (err) {
    console.error(`[Watcher] Error:`, err.message)
  }
}, 1500)

// Safety timeout: 30 minutes
setTimeout(() => {
  console.log(`[Watcher] Timed out after 30 minutes without WAITING_ANTIGRAVITY.`)
  clearInterval(interval)
  process.exit(0)
}, 30 * 60 * 1000)
