# FINDINGS v7: element re-study (2026-10-19)

## Why v6 failed
- The harvest captured **homepages**, but most links were Awwwards **inspiration element clips** (player, loader, map, about, news). The real subject was never studied until now.
- We copied **surfaces** (a 3D corridor, a deck), not **mechanisms**. The patronus corridor works because each room holds one painted object on a dark gradient. Ours flew whole photo pages through it, so it lagged and read as noise.
- The artist world is the analyst template re-skinned: same tab bar, title top-left, card right, rail. It is two skins over one scenario, not two worlds.

## What makes each one distinct (signature mechanism)

### A. Place you enter (scenario refs)

| ref | signature | build |
|---|---|---|
| witcher-map | the map IS the nav; camera glides to a place, the name is lettered along terrain, then a marker and side card appear | one big image layer, transform pan/zoom, SVG textPath labels |
| gata-map | dark street map, places are photo stickers, category chips; click opens a full-screen painted sheet with typewriter text and block-wipe reveal | Mapbox or static SVG map + sticker pins |
| marseille | press-and-hold ring fills, radial zoom-blur dives into a full-bleed photo plus a mood line | hold timer + CSS radial blur on one image |
| yauch | 360 photo of a real room; hotspots on objects; the room is the archive of a life | equirect panorama (three.js or CSS cube), hotspot list |
| telekom360 | cosy 3D room, camera turns to a desk, numbered cards fan and flip into scenes | three.js scene, camera tween |
| gucci | slow camera drift through one rendered scene; one glowing object moves and recolours = single focal point | WebGL or layered parallax |
| inmyworld | documentary chapters: B&W portrait slides left, text column reveals right, chapter progress bar | horizontal chapter state machine |
| onelastbeat | full-bleed video character; hand-lettered ABOUT / RESTART menu; **diagonal black wipe** between states | clip-path polygon wipe, video bg |
| patronus | corridor of rooms, one object per room, room colour shifts (new spaces / lost spaces) | CSS 3D corridor, sparse content only |

### B. Instrument you read (analyst refs)

| ref | signature |
|---|---|
| exat | one glyph swings through the variable-font weight axis; the animation IS the data |
| hvd-match | fixed device frames, type rolls inside, colour field flips per frame |
| gcloud | flat grey globe, network arcs draw city to city |
| crumbskees | a token travels across a tile grid while a counter ticks |
| rxk-kinetic | nested fixed frame, words travel through it in steps |
| sainturbain | fixed laptop, cover fan cycles, a big lime stat swaps per case |
| lemkus | carousel morphs into grid, then into an article (layout morph) |
| stripe-blog | list row highlights, title scales from list size to hero |
| bleibtgleich | wordmark assembles from scattered letters while a pixel-mosaic band crossfades |
| pienso | primitive shapes reassemble between sections, then a numbered 01-07 process grid |

### C. Components (portable modules)

| ref | module | where it fits |
|---|---|---|
| teletech | perspective artwork carousel + bottom player bar | Sound page (Hostel Radio) |
| viewchanger | video panel splits into strips with a sweeping divider and reframes | Gallery / Field Notes video |
| monogrid | liquid distortion on giant wordmark, solid to outline | loader (we already have keepy-uppy) |
| sapori | red hand-drawn circle and arrow draw over photos during a pan | artist annotation layer |
| localstudio | framed comic panels, headlines cropped by the panel edge | artist About |
| moonsafari | diagonal line from menu button opens a full-screen menu | artist menu |
| camerino / gallipoli (p05: labels mismatched; the frames show a Pixel 3a page and a polo configurator) | depth slider swaps photo mode; 3D garment with swatch rail | needs re-capture before use |
| carbonation | rings stack and morph into letters | small type flourish |
| kashyap | dithered isometric cards, one perspective tilt | card style |
| vana | collage hero + accordion + giant footer wordmark | low value |
| peppa | edge-cropped product over sliding marquee bands | low value |

## Pattern across the strongest refs
1. **One scene, camera moves** (witcher, yauch, telekom, gucci, marseille). There is no page swap: navigation is the camera travelling inside a single world. This is cheap when it transforms one layer, and it was expensive in v6 because we moved whole DOM pages.
2. **One focal object** per view (patronus, gucci, exat). Never a grid of cards.
3. **The hand is visible** (onelastbeat lettering, sapori strokes, witcher script labels). This is artist-native: "he watched".
4. **The instrument is fixed and the data moves through it** (hvd, rxk, sainturbain, crumbskees). This is analyst-native: "he counted". It is what the crosshair already does well.

## Proposal: two scenarios, not two skins
- **Artist = a place you walk through.** There are no tabs. One scene (a map, a room or a desk) holds Gallery, Sound, Matchday, Field Notes and About as objects or places. The camera glides to each; a hand-lettered label draws in, then that page opens as an overlay sheet. The ball cursor dribbles across the scene. Transition: camera pan on one layer plus a diagonal ink wipe into the sheet (onelastbeat).
- **Analyst = an instrument you read.** Keep the tabs, the crosshair and the lock bracket. Each page is a fixed frame that data moves through. Transition: the scan wipe that exists now.
- **The bridge:** the ball becomes the data point (the existing handoff); orange persists in both worlds.

## Interim state in the tree (uncommitted)
- The deck fly-through is removed (DeckTunnel archived). Artist uses a leaf fade, analyst a scan wipe, and crossing worlds uses the flip.
- Pointer: the nib is instant, the rect is cached and the drop-shadow filter is removed. Probe: tabs p95 48.6 ms -> 14.0 ms, janky frames 31 -> 14.
