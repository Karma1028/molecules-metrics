// The five rooms of Hostel Radio (D:\antigravity project\Hostel Days), ported as data.
// Tracks play through the public Spotify embed, so no keys or backend are needed.

export interface HostelRoom {
  id: "corridor" | "mess" | "exam" | "sunday" | "powercut"
  freq: string
  name: string
  track: string
  artist: string
  trackId: string
  notes: readonly string[]
}

export const HOSTEL_ROOMS: readonly HostelRoom[] = [
  {
    id: "corridor",
    freq: "93.5",
    name: "2 AM Corridor",
    track: "Iktara",
    artist: "Amit Trivedi, Kavita Seth · Wake Up Sid",
    trackId: "1tibKJNiFWi6todr2LaEIA",
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
