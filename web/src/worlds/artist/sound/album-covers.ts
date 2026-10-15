/* The Wrapped export carries names only, no artwork. These covers were resolved
   once from the iTunes catalogue (2026-10-15) and kept only where both the
   credited artist and the album title matched, so a sleeve never shows somebody
   else's record. Anything not listed falls back to a typographic sleeve. */

export interface AlbumRef {
  album: string
  artist: string
}

const ART = (path: string) => `https://is1-ssl.mzstatic.com/image/thumb/${path}/600x600bb.jpg`

const COVERS: Record<string, string> = {
  "The Local Train::Aalas Ka Pedh": ART("Music116/v4/b4/ab/c3/b4abc3c3-bd25-b8cb-0011-4311e3f9497e/197189936111.jpg"),
  "Pritam::Life In A Metro (Original Motion Picture Soundtrack)": ART("Music211/v4/e7/4c/93/e74c9373-63fa-2787-4d68-6021b214441a/196873386416.jpg"),
  "Chondropith::Punorjonmo": ART("Music211/v4/c6/a7/4a/c6a74afa-4572-5e41-57e9-09d7df1fa618/8905574172066.jpg"),
  "Odd Signature::Amar Dehokhan (Official)": ART("Music115/v4/6a/00/04/6a000484-c478-fd52-03ba-2d39d9ae173f/artwork.jpg"),
  "Shankar-Ehsaan-Loy::My Name Is Khan (Original Motion Picture Soundtrack)": ART("Music211/v4/49/32/5a/49325a52-e5e5-bb10-62f6-eebb211ce423/886446889825.jpg"),
  "Meghdol::E Hawa": ART("Music122/v4/ae/ae/2e/aeae2eff-260f-661a-a3ae-f9813d853b29/8720766556901.png"),
  "The Local Train::Vaaqif": ART("Music126/v4/6e/4c/59/6e4c59e9-342c-3da7-fc09-61959c95dcb5/197189936456.jpg"),
}

/** Cover URLs aligned with `albums` (null where no verified cover exists). */
export function albumArt(albums: AlbumRef[]): (string | null)[] {
  return albums.map((a) => COVERS[`${a.artist}::${a.album}`] ?? null)
}
