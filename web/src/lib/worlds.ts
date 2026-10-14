import type { World } from "./theme"

export interface NavItem {
  to: string
  label: string
  end?: boolean
}
export interface WorldDef {
  home: string
  brand: string
  other: World
  otherLabel: string
  otherIcon: string
  nav: NavItem[]
}

export const WORLDS: Record<World, WorldDef> = {
  artist: {
    home: "/artist",
    brand: "notebook",
    other: "analyst",
    otherLabel: "Analyst",
    otherIcon: "i-chart",
    nav: [
      { to: "/artist", label: "Home", end: true },
      { to: "/artist/gallery", label: "Gallery" },
      { to: "/artist/sound", label: "Sound" },
      { to: "/artist/matchday", label: "Matchday" },
      { to: "/artist/notes", label: "Field Notes" },
      { to: "/artist/about", label: "About" },
      { to: "/artist/contact", label: "Contact" },
    ],
  },
  analyst: {
    home: "/analyst",
    brand: "analyst",
    other: "artist",
    otherLabel: "Artist",
    otherIcon: "i-camera",
    nav: [
      { to: "/analyst", label: "Home", end: true },
      { to: "/analyst/skills", label: "Skills" },
      { to: "/analyst/work", label: "Work" },
      { to: "/analyst/journey", label: "Journey" },
      { to: "/analyst/dashboard", label: "Dashboard" },
      { to: "/analyst/resume", label: "Résumé" },
      { to: "/analyst/contact", label: "Contact" },
    ],
  },
}

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/tuhinbhattacharya28",
  instagram: "https://www.instagram.com/_threads_of_karma_",
  email: "tuhin.bhattacharya25b@gim.ac.in",
}
