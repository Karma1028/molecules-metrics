import { useEffect, useState } from "react"

/** Refresh cadence for the clock (ms). */
const CLOCK_TICK_MS = 15_000

const fmtTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date())

function getGoaPeriod(): { period: "morning" | "afternoon" | "evening" | "night"; phrase: string } {
  // Goa is IST (UTC+5:30)
  const now = new Date()
  const istMinutes = now.getUTCHours() * 60 + now.getUTCMinutes() + 330
  const hour = Math.floor((istMinutes % 1440) / 60)

  if (hour >= 5 && hour < 12) {
    return { period: "morning", phrase: "morning in Goa" }
  }
  if (hour >= 12 && hour < 17) {
    return { period: "afternoon", phrase: "afternoon in Goa" }
  }
  if (hour >= 17 && hour < 21) {
    return { period: "evening", phrase: "evening in Goa" }
  }
  return { period: "night", phrase: "night in Goa" }
}

export interface GoaClockState {
  time: string
  period: "morning" | "afternoon" | "evening" | "night"
  phrase: string
}

/**
 * Clock hook separating the two worlds (C3):
 * - Analyst owns telemetry: HH:MM, live telemetry.
 * - Artist keeps time as a human phrase, e.g. "evening in Goa", no seconds or pulse dot.
 */
export function useGoaClock(): string {
  const [now, setNow] = useState(fmtTime)
  useEffect(() => {
    const t = window.setInterval(() => setNow(fmtTime()), CLOCK_TICK_MS)
    return () => window.clearInterval(t)
  }, [])
  return now
}

export function useGoaPhrase(): string {
  const [phrase, setPhrase] = useState(() => getGoaPeriod().phrase)
  useEffect(() => {
    const t = window.setInterval(() => setPhrase(getGoaPeriod().phrase), CLOCK_TICK_MS)
    return () => window.clearInterval(t)
  }, [])
  return phrase
}
