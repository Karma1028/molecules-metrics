import type { World } from "./theme"

const ARTIST: Record<string, string> = {
  gallery: "developing the contact sheet",
  sound: "dropping the needle",
  matchday: "reading the fixture list",
  notes: "setting the type",
  about: "sharpening the pencil",
  contact: "licking the stamp",
}
const ANALYST: Record<string, string> = {
  work: "> select * from work;",
  skills: "> select * from skills;",
  journey: "> select * from journey order by year;",
  resume: "> render resume.pdf",
  contact: "> open channel",
}

/** One line of waiting-as-content for a lazy route, by world and page. */
export function loaderLine(world: World, pathname: string): string {
  const table = world === "artist" ? ARTIST : ANALYST
  const page = pathname.split("/").filter(Boolean)[1] ?? ""
  return table[page] ?? (world === "artist" ? "turning the page" : "> loading module")
}
