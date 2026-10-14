/** Rich per-frame metadata for the local baked roll (roll-01..roll-33).
 *
 *  Two honest layers, keyed by the frame's file stem:
 *   - exif:  REAL camera data read from the source JPGs (no GPS — privacy).
 *            Capture dates are genuine (2019-2025). Absurd electronic-shutter
 *            readings (>1/8000) are shown as "1/8000s+" since the raw EXIF value
 *            is a sensor artifact, not a believable exposure.
 *   - pins:  hand-drawn callouts marking something that is ACTUALLY visible in
 *            the frame (x/y, percent of the image box) with a short handwritten
 *            note about that thing or its feeling. Each pin chooses a marker:
 *              arrow   — points at a subject / person / path
 *              circle  — rings a round light: lamp, sun, moon, orb
 *              box     — frames legible text / signage visible in the shot
 *              bracket — spans a region: a ridgeline, a crowd, a skyline
 *            nx/ny is where the note + the marker's tether sit. NEVER a place,
 *            event or date that is not visibly in the frame itself.
 *
 *  Notes are deliberately scribble-short so they read as handwriting and stay
 *  legible over the photo. They describe only what is in frame.
 *
 *  Live Drive frames (not in this map) simply render without the rich layer.
 */

export interface FrameExif {
  camera?: string
  date?: string
  shutter?: string
  aperture?: string
  iso?: string
  focal?: string
}

/** Marker shape drawn over the frame. Defaults to "arrow". */
export type PinKind = "arrow" | "circle" | "box" | "bracket"

export interface FramePin {
  x: number // 0..100, marker target — what it rings / points AT (percent of image width)
  y: number // 0..100, percent of image height
  note: string // short handwritten line about that thing / its mood
  nx?: number // 0..100, note + tether anchor x (defaults near target)
  ny?: number // 0..100, note + tether anchor y
  kind?: PinKind // marker shape; default "arrow"
  r?: number // marker radius, percent of image WIDTH (circle/box/bracket). default 8
  rot?: number // note rotation in degrees (default: small deterministic jitter)
  size?: "sm" | "md" | "lg" // note size (default "md")
  underline?: boolean // wavy hand underline beneath the note
}

export interface FrameMeta {
  exif?: FrameExif
  pins?: FramePin[]
}

/** Pull the "roll-NN" stem from a frame url like "/frames/roll-07.webp". */
export function rollKey(url: string): string {
  const base = url.split("/").pop() || ""
  return base.replace(/\.[^.]+$/, "")
}

export function metaForUrl(url: string): FrameMeta | undefined {
  return FRAME_META[rollKey(url)]
}

export const FRAME_META: Record<string, FrameMeta> = {
  "roll-01": {
    exif: { camera: "SM-A528B", date: "27 Apr 2024", shutter: "1/30s", aperture: "f/1.8", iso: "ISO 80", focal: "5.23mm" },
    pins: [
      { x: 22, y: 28, note: "each lamp its own little sun", nx: 44, ny: 13, kind: "circle", r: 7, size: "lg", underline: true },
      { x: 52, y: 80, note: "one saffron back in the crush", nx: 73, ny: 70, kind: "arrow", size: "sm" },
      { x: 78, y: 40, note: "bokeh all the way back", nx: 86, ny: 54, kind: "bracket", r: 13, rot: 5 },
    ],
  },
  "roll-02": {
    exif: { camera: "SM-A528B", date: "27 Apr 2024", shutter: "1/45s", aperture: "f/1.8", iso: "ISO 250", focal: "5.23mm" },
    pins: [
      { x: 38, y: 26, note: "one lamp doing all the work", nx: 63, ny: 15, kind: "circle", r: 6, size: "lg", underline: true },
      { x: 40, y: 56, note: "someone walking it home", nx: 15, ny: 62, kind: "arrow" },
      { x: 50, y: 88, note: "lane swallowed in dark", nx: 68, ny: 84, kind: "bracket", r: 12, rot: -4, size: "sm" },
    ],
  },
  "roll-03": {
    exif: { camera: "iPhone 14", date: "1 Feb 2023", shutter: "1/50s", aperture: "f/1.5", iso: "ISO 125", focal: "5.7mm" },
    pins: [
      { x: 48, y: 45, note: "paper fringes, lit from inside", nx: 73, ny: 29, kind: "circle", r: 11, size: "lg" },
      { x: 40, y: 86, note: "every head tipped up", nx: 15, ny: 82, kind: "arrow", underline: true },
    ],
  },
  "roll-04": {
    exif: { camera: "iPhone 14", date: "1 Feb 2023", shutter: "1/60s", aperture: "f/1.5", iso: "ISO 250", focal: "5.7mm" },
    pins: [
      { x: 52, y: 42, note: "Bangla neon, loud in the dark", nx: 75, ny: 22, kind: "box", r: 15, size: "lg", underline: true },
      { x: 20, y: 78, note: "phones up before it starts", nx: 10, ny: 62, kind: "arrow", rot: 3 },
      { x: 76, y: 74, note: "red soaking the whole crowd", nx: 84, ny: 86, kind: "bracket", r: 12, size: "sm" },
    ],
  },
  "roll-05": {
    exif: { camera: "iPhone 14", date: "4 Feb 2023", shutter: "1/50s", aperture: "f/1.5", iso: "ISO 200", focal: "5.7mm" },
    pins: [
      { x: 22, y: 62, note: "the stage, small and far", nx: 40, ny: 40, kind: "arrow", size: "lg" },
      { x: 62, y: 45, note: "beams cutting the haze", nx: 77, ny: 29, kind: "bracket", r: 11, rot: 6, underline: true },
    ],
  },
  "roll-06": {
    exif: { camera: "iPhone 14", date: "2 Mar 2023", shutter: "1/60s", aperture: "f/1.5", iso: "ISO 80", focal: "5.7mm" },
    pins: [
      { x: 12, y: 55, note: "zebras and frogs on the curtain", nx: 30, ny: 36, kind: "arrow", size: "lg" },
      { x: 48, y: 82, note: "the pack, dropped and done", nx: 67, ny: 72, kind: "circle", r: 7, underline: true },
    ],
  },
  "roll-07": {
    exif: { camera: "iPhone 14", date: "3 Mar 2023", shutter: "1/1800s", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 15, y: 62, note: "blue tin roofs on the spur", nx: 30, ny: 48, kind: "box", r: 8 },
      { x: 46, y: 82, note: "the path just keeps going", nx: 62, ny: 86, kind: "arrow", size: "lg", underline: true },
      { x: 32, y: 47, note: "ridge stacked on ridge", nx: 18, ny: 35, kind: "bracket", r: 14, rot: -5 },
    ],
  },
  "roll-08": {
    exif: { camera: "iPhone 14", date: "3 Mar 2023", shutter: "1/8000s+", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 4, y: 35, note: "sun up over the fold", nx: 24, ny: 18, kind: "circle", r: 6, size: "lg", underline: true },
      { x: 42, y: 66, note: "cloud pooled in the valley", nx: 62, ny: 56, kind: "bracket", r: 13, rot: 4 },
    ],
  },
  "roll-09": {
    exif: { camera: "iPhone 14", date: "3 Mar 2023", shutter: "1/8000s+", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 5, y: 36, note: "same sun, gone pastel", nx: 24, ny: 18, kind: "circle", r: 6, size: "lg" },
      { x: 70, y: 60, note: "ridges fading back", nx: 84, ny: 48, kind: "bracket", r: 14, rot: -6, underline: true },
    ],
  },
  "roll-10": {
    exif: { camera: "iPhone 14", date: "3 Mar 2023", shutter: "1/8000s+", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 62, y: 40, note: "clouds spilling over the edge", nx: 79, ny: 28, kind: "bracket", r: 14, size: "lg", underline: true },
      { x: 54, y: 70, note: "bare rock, wind-scrubbed", nx: 33, ny: 62, kind: "arrow" },
    ],
  },
  "roll-11": {
    exif: { camera: "iPhone 14", date: "3 Mar 2023", shutter: "1/2s", aperture: "f/1.5", iso: "ISO 6400", focal: "5.7mm" },
    pins: [
      { x: 53, y: 56, note: "Orion, belt and sword", nx: 73, ny: 40, kind: "circle", r: 10, size: "lg", underline: true },
      { x: 8, y: 88, note: "one window still awake", nx: 25, ny: 80, kind: "arrow", size: "sm" },
    ],
  },
  "roll-12": {
    exif: { camera: "iPhone 14", date: "5 Mar 2023", shutter: "1/1500s", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 30, y: 60, note: "snow peak, caught between trunks", nx: 52, ny: 42, kind: "arrow", size: "lg", underline: true },
      { x: 72, y: 30, note: "pines standing guard", nx: 85, ny: 20, kind: "bracket", r: 12, rot: 5 },
    ],
  },
  "roll-13": {
    exif: { camera: "iPhone 14", date: "5 Mar 2023", shutter: "1/30s", aperture: "f/1.5", iso: "ISO 640", focal: "5.7mm" },
    pins: [
      { x: 46, y: 42, note: "breath and rain on the glass", nx: 63, ny: 26, kind: "bracket", r: 13, size: "lg", underline: true },
      { x: 63, y: 72, note: "a green light bleeding through", nx: 45, ny: 80, kind: "circle", r: 6 },
    ],
  },
  "roll-14": {
    exif: { camera: "Redmi Note 7 Pro", date: "30 Sep 2019", shutter: "1/7s", aperture: "f/1.8", iso: "ISO 4619", focal: "4.74mm" },
    pins: [
      { x: 30, y: 61, note: "the towers all lit up", nx: 12, ny: 51, kind: "bracket", r: 13, rot: -4 },
      { x: 38, y: 47, note: "a thin moon over the water", nx: 55, ny: 35, kind: "circle", r: 5, size: "lg", underline: true },
      { x: 42, y: 88, note: "the lake holds it all", nx: 63, ny: 82, kind: "arrow", size: "sm" },
    ],
  },
  "roll-15": {
    exif: { camera: "Redmi Note 7 Pro", date: "20 Oct 2019", shutter: "1/370s", aperture: "f/1.8", iso: "ISO 100", focal: "4.74mm" },
    pins: [
      { x: 82, y: 32, note: "cell on cell on cell", nx: 66, ny: 17, kind: "bracket", r: 13, size: "lg", underline: true },
      { x: 14, y: 30, note: "old tree keeping watch", nx: 28, ny: 15, kind: "arrow" },
    ],
  },
  "roll-16": {
    exif: { camera: "Redmi Note 7 Pro", date: "20 Oct 2019", shutter: "1/690s", aperture: "f/1.8", iso: "ISO 100", focal: "4.74mm" },
    pins: [
      { x: 52, y: 30, note: "all of it seen through bars", nx: 71, ny: 15, kind: "bracket", r: 12, rot: 4, underline: true },
      { x: 29, y: 39, note: "the watchtower still stands", nx: 13, ny: 24, kind: "arrow", size: "lg" },
    ],
  },
  "roll-17": {
    exif: { camera: "Redmi Note 7 Pro", date: "23 Oct 2019", shutter: "1/6000s", aperture: "f/1.8", iso: "ISO 103", focal: "4.74mm" },
    pins: [
      { x: 40, y: 70, note: "leaves catching fire in the light", nx: 19, ny: 55, kind: "bracket", r: 13, size: "lg", underline: true },
      { x: 62, y: 22, note: "one cloud drifting past", nx: 78, ny: 14, kind: "circle", r: 7 },
    ],
  },
  "roll-18": {
    exif: { camera: "Redmi Note 7 Pro", date: "24 Oct 2019", shutter: "1/1400s", aperture: "f/1.8", iso: "ISO 100", focal: "4.74mm" },
    pins: [
      { x: 66, y: 58, note: "land across the water", nx: 80, ny: 48, kind: "bracket", r: 12, underline: true },
      { x: 36, y: 20, note: "needles hanging low", nx: 20, ny: 12, kind: "arrow", size: "lg" },
    ],
  },
  "roll-19": {
    exif: { camera: "Redmi Note 7 Pro", date: "26 Oct 2019", shutter: "1/1700s", aperture: "f/1.8", iso: "ISO 113", focal: "4.74mm" },
    pins: [
      { x: 82, y: 38, note: "SpiceJet tip, above it all", nx: 61, ny: 25, kind: "box", r: 7, size: "lg", underline: true },
      { x: 40, y: 76, note: "a floor made of cloud", nx: 22, ny: 66, kind: "bracket", r: 13, rot: 5 },
    ],
  },
  "roll-20": {
    exif: { camera: "iPhone 14", date: "4 Apr 2024", shutter: "1/115s", aperture: "f/2.4", iso: "ISO 800", focal: "1.54mm" },
    pins: [
      { x: 18, y: 40, note: "blue beams fanning out", nx: 32, ny: 25, kind: "bracket", r: 12, rot: -5 },
      { x: 48, y: 64, note: "the band, under the dome", nx: 67, ny: 52, kind: "arrow", size: "lg", underline: true },
      { x: 43, y: 73, note: "one screen filming it all", nx: 64, ny: 84, kind: "box", r: 5, size: "sm" },
    ],
  },
  "roll-21": {
    exif: { camera: "iPhone 14", date: "28 Apr 2024", shutter: "1/800s", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 60, y: 52, note: "head on his knee, worn out", nx: 81, ny: 40, kind: "arrow", size: "lg", underline: true },
      { x: 44, y: 16, note: "light through the jali", nx: 25, ny: 12, kind: "bracket", r: 10, rot: 4 },
      { x: 46, y: 82, note: "the bull waiting, garlanded", nx: 24, ny: 84, kind: "arrow", size: "sm" },
    ],
  },
  "roll-22": {
    exif: { camera: "iPhone 14", date: "2 Oct 2024", shutter: "1/8000s+", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 48, y: 40, note: "sun going down, swollen orange", nx: 69, ny: 27, kind: "circle", r: 7, size: "lg", underline: true },
      { x: 44, y: 78, note: "two birds up on the branch", nx: 23, ny: 70, kind: "arrow" },
    ],
  },
  "roll-23": {
    exif: { camera: "iPhone 14", date: "30 Oct 2024", shutter: "1/480s", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 50, y: 54, note: "a moon you can hold", nx: 72, ny: 42, kind: "circle", r: 9, size: "lg", underline: true },
      { x: 50, y: 82, note: "glowing on its little stand", nx: 27, ny: 80, kind: "arrow", size: "sm" },
    ],
  },
  "roll-24": {
    exif: { camera: "iPhone 14", date: "17 Nov 2024", shutter: "1/8s", aperture: "f/1.5", iso: "ISO 6400", focal: "5.7mm" },
    pins: [
      { x: 52, y: 24, note: "moon smeared soft", nx: 70, ny: 14, kind: "circle", r: 8, size: "lg", underline: true },
      { x: 46, y: 44, note: "a stray blue light", nx: 65, ny: 40, kind: "arrow", size: "sm" },
      { x: 50, y: 74, note: "it all doubles on the water", nx: 29, ny: 72, kind: "bracket", r: 13, rot: 3 },
    ],
  },
  "roll-25": {
    exif: { camera: "iPhone 14", date: "14 Dec 2024", shutter: "1/2s", aperture: "f/2.4", iso: "ISO 6400", focal: "1.54mm" },
    pins: [
      { x: 50, y: 85, note: "needle sitting at 37", nx: 27, ny: 82, kind: "box", r: 6, size: "lg", underline: true },
      { x: 53, y: 49, note: "one light coming the other way", nx: 73, ny: 42, kind: "circle", r: 5 },
      { x: 44, y: 66, note: "empty road, just us", nx: 21, ny: 60, kind: "arrow", size: "sm" },
    ],
  },
  "roll-26": {
    exif: { camera: "iPhone 14", date: "4 Jan 2025", shutter: "1/8000s+", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 82, y: 70, note: "our ride, nose to the gate", nx: 63, ny: 57, kind: "arrow", size: "lg", underline: true },
      { x: 53, y: 56, note: "someone landing in the smog", nx: 37, ny: 46, kind: "arrow", size: "sm" },
      { x: 12, y: 83, note: "fuel truck doing the rounds", nx: 10, ny: 68, kind: "arrow", rot: 3 },
    ],
  },
  "roll-27": {
    exif: { camera: "iPhone 14", date: "31 Jan 2025", shutter: "1/50s", aperture: "f/1.5", iso: "ISO 400", focal: "5.7mm" },
    pins: [
      { x: 50, y: 51, note: "a sliver of moon", nx: 69, ny: 41, kind: "circle", r: 5, size: "lg", underline: true },
      { x: 60, y: 66, note: "wires cutting the mauve", nx: 78, ny: 58, kind: "bracket", r: 12, rot: -4 },
    ],
  },
  "roll-28": {
    exif: { camera: "iPhone 14", date: "2 Apr 2025", shutter: "1/8000s+", aperture: "f/1.5", iso: "ISO 32", focal: "5.7mm" },
    pins: [
      { x: 46, y: 13, note: "sun smothered in haze", nx: 65, ny: 10, kind: "circle", r: 7, size: "lg", underline: true },
      { x: 44, y: 70, note: "one tree holding the frame", nx: 23, ny: 64, kind: "arrow" },
    ],
  },
  "roll-29": {
    exif: { camera: "iPhone 16 Pro Max", date: "14 Mar 2025", shutter: "1/2s", aperture: "f/2.8", iso: "ISO 640", focal: "15.66mm" },
    pins: [
      { x: 56, y: 27, note: "full moon, orange ring", nx: 73, ny: 17, kind: "circle", r: 8, size: "lg", underline: true },
      { x: 40, y: 76, note: "the hill going black", nx: 21, ny: 70, kind: "bracket", r: 13, rot: 4 },
    ],
  },
  "roll-30": {
    exif: { camera: "iPhone 14", date: "14 Apr 2025", shutter: "1/8000s+", aperture: "f/1.5", iso: "ISO 40", focal: "5.7mm" },
    pins: [
      { x: 48, y: 30, note: "sky in little scales", nx: 66, ny: 19, kind: "bracket", r: 14, size: "lg", underline: true },
      { x: 33, y: 78, note: "yellow blooms reaching up", nx: 16, ny: 70, kind: "arrow" },
    ],
  },
  "roll-31": {
    exif: { camera: "iPhone 14", date: "25 Jun 2025", shutter: "1/160s", aperture: "f/1.5", iso: "ISO 64", focal: "5.7mm" },
    pins: [
      { x: 60, y: 25, note: "trees closing overhead", nx: 77, ny: 15, kind: "bracket", r: 13, rot: -5 },
      { x: 33, y: 72, note: "speed sign says 20", nx: 15, ny: 64, kind: "box", r: 6, size: "lg", underline: true },
    ],
  },
  "roll-32": {
    exif: { camera: "iPhone 14", date: "29 Jun 2025", shutter: "1/6000s", aperture: "f/1.5", iso: "ISO 50", focal: "5.7mm" },
    pins: [
      { x: 40, y: 12, note: "solar panels for a roof", nx: 60, ny: 6, kind: "box", r: 10, underline: true },
      { x: 48, y: 50, note: "hills wrapped in cloud", nx: 30, ny: 42, kind: "bracket", r: 13, size: "lg" },
      { x: 50, y: 86, note: "rain-polished floor", nx: 69, ny: 82, kind: "arrow", size: "sm" },
    ],
  },
  "roll-33": {
    exif: { camera: "iPhone 14", date: "13 Jul 2025", shutter: "1/900s", aperture: "f/2.4", iso: "ISO 32", focal: "1.54mm" },
    pins: [
      { x: 63, y: 87, note: "WB plate, home colours", nx: 46, ny: 90, kind: "box", r: 7, size: "lg", underline: true },
      { x: 14, y: 62, note: "the water on one side", nx: 6, ny: 51, kind: "arrow" },
      { x: 40, y: 20, note: "monsoon sky piling up", nx: 24, ny: 12, kind: "bracket", r: 14, rot: 4 },
    ],
  },
}
