// The five rooms of Hostel Radio (D:\antigravity project\Hostel Days), ported as data.
// Each room's song opens the radio Stage and plays in full from its official YouTube
// upload (ytId); without one, the Stage looks the song up by title.

export interface HostelRoom {
  id: "corridor" | "mess" | "exam" | "sunday" | "powercut"
  freq: string
  name: string
  track: string
  artist: string
  trackId: string
  /** official full-length YouTube upload, verified via oEmbed */
  ytId?: string
  notes: readonly string[]
}

import type { MusicTrack } from "../../../lib/music"

/** The room's song as a Stage track: the pinned YouTube upload when there is one. */
export function roomTrack(r: HostelRoom): MusicTrack {
  return r.ytId
    ? { id: r.ytId, title: r.track, artist: r.artist, source: "youtube", kind: "video" }
    : { id: r.trackId, title: r.track, artist: r.artist, source: "spotify", kind: "track", url: `https://open.spotify.com/track/${r.trackId}` }
}

export const HOSTEL_ROOMS: readonly HostelRoom[] = [
  {
    id: "corridor",
    freq: "93.5",
    name: "2 AM Corridor",
    track: "Iktara",
    artist: "Amit Trivedi, Kavita Seth · Wake Up Sid",
    trackId: "1tibKJNiFWi6todr2LaEIA",
    ytId: "pdB7v1z8PJk",
    notes: [
      "wing 3 ka fan phir se awaaz kar raha hai",
      "kisi ke room mein maggi ban rahi hai",
      "warden ke steps hain ya overthinking?",
      "kal 8 baje class hai. theoretically.",
    ],
  },
  {
    id: "mess",
    freq: "98.3",
    name: "Mess Line",
    track: "Ilahi",
    artist: "Arijit Singh, Pritam · Yeh Jawaani Hai Deewani",
    trackId: "2cqsr7TiQFWzmMahiDE0Mh",
    ytId: "9YhzTM-KHkM",
    notes: [
      "bhai ek extra roti dena",
      "aaj ki dal suspiciously achhi hai",
      "line lambi hai, gossip usse lambi",
      "dessert ka bowl pehle reserve kar lo",
    ],
  },
  {
    id: "exam",
    freq: "102.4",
    name: "Exam Night Grind",
    track: "Give Me Some Sunshine",
    artist: "Suraj Jagan, Sharman Joshi · 3 Idiots",
    trackId: "1McrQPRJA8Ri6WAwL5pcJZ",
    ytId: "AIWBZbHyNpI", // not a label channel; swap when an official upload is found
    notes: [
      "syllabus dekh ke syllabus bhi darr gaya",
      "notes bhej de bhai, dua lagegi",
      "chai number chaar officially shuru",
      "5 minute break ne 45 minute le liye",
    ],
  },
  {
    id: "sunday",
    freq: "104.8",
    name: "Sunday Laundry + Cricket",
    track: "Choo Lo",
    artist: "The Local Train · Midnight Hostel Jam",
    trackId: "4yP0hu6Vz2f1S13h7w7O2w",
    ytId: "opwZ_PJ-F_E",
    notes: [
      "woh black t-shirt meri hai shayad",
      "one tip one hand abhi bhi valid hai",
      "bucket pe naam likhna zaroori hai",
      "chhat pe dhoop, neeche full toss",
    ],
  },
  {
    id: "powercut",
    freq: "107.2",
    name: "Power Cut Jam",
    track: "cold/mess",
    artist: "Prateek Kuhad · Unplugged Acoustic",
    trackId: "3uU4O43XjD1tH5K82hYvj9",
    ytId: "JZnwa4HBysg",
    notes: [
      "light gayi, talent aa gaya",
      "guitar ka sirf teen chord aata hai",
      "phone ki torch stage light hai ab",
      "inverter ko koi fan se mat jodo",
    ],
  },
]

/** Needle position (0..1) for a room, spread evenly across the dial. */
export function dialPosition(index: number): number {
  const PAD = 0.08
  return PAD + (index / (HOSTEL_ROOMS.length - 1)) * (1 - PAD * 2)
}
