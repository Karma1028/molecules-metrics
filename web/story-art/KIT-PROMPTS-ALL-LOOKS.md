# Pose-kit prompts, all looks. Sheets K1..K6 per look, same layout as the Heat pilot (see KIT-PROMPTS-HEAT.md).
Every sheet: IMAGE, Nano Banana 2.1, 16:9, x1 (0 credits). Flat magenta background so sheets slice to cut-outs (web/scripts/slice_sheet.py).

BG (append to every prompt): Plain flat solid magenta (#FF00FF) background, no floor shadow, no gradient, no text, no labels, no borders; every figure fully inside the frame with clear magenta space around it, nothing overlapping or cropped.

TUHIN: the same young Bengali man as the reference image: wavy dark hair swept up and back, neatly trimmed full black beard, rectangular dark sunglasses, oversized off-white short-sleeve hooded t-shirt with a bold orange-and-black dragon graphic, black crossbody sling bag with small round badge pins, dark digital watch, brown trousers, sneakers. Keep exactly the same face, hair, beard, clothes and sling bag in every figure.
HORSE: a traditional Bankura terracotta horse: tall elegant slender-necked clay horse with a long arched neck, tall pointed ears, decorated bridle and a patterned saddle blanket, hand-modelled body with incised and appliqué patterns, warm orange-red terracotta. Keep exactly the same horse design in every figure.

## Look styles
STYLE-GHIBLI: Hand-painted Japanese animated-film style: soft gouache colours, gentle thin clean outlines, flat soft cel shading, warm golden-hour light, calm nostalgic mood.
STYLE-SYSTEM (game-UI window look): clean flat cel shading, crisp dark outlines, strong teal-cyan rim light, translucent holographic status panels and glyph bars drifting around (no readable text), dark void, faint grid and particles.
STYLE-SOLO (Solo Leveling look): cinematic dark-fantasy manhwa rendering, sharp detailed digital painting with hard black shadows, deep midnight blue and violet palette, glowing electric blue-violet aura around the figure, dramatic low-key lighting, intense stare, faint dark shadow-wisps rising from the ground.
STYLE-NORTHERN: Dark martial-arts webtoon style (Legend of the Northern Blade look, checked against web references 2026-10-27): near-monochrome black, white and cool lavender-grey, heavy rough black ink linework with scratchy hatching and screentone shading, flowing wind-blown hair and cloth in solid black, crackling violet-purple energy glow as the only colour accent, grim intense mood, no cartoon softness. TUHIN additionally wears a long black wind-torn travelling coat over his clothes (sling bag over the cloak, dragon graphic still visible at the chest). HORSE additionally wears a battered armoured chest plate and torn cloth.

## Looks (6 + extras): HEAT (done), GHIBLI (running), SYSTEM, SOLO, NORTHERN, PAT (Bengali patachitra scroll: flat bold black outlines, earthy red-ochre, terracotta, indigo, turmeric, alpona border, no shading).
SYSTEM and SOLO are separate: SYSTEM = game-UI window world, SOLO = dark shadow-monarch drama.

## Sheets (identical wording per look; swap only the STYLE line)
K1 HORSE-TURN (text only): Character turnaround sheet of [HORSE]. Four full-body views side by side: front view, three-quarter front view, side profile facing right, back view, standing still, same height and scale, evenly spaced. [STYLE] [BG]
K2 TUHIN-TURN (ref: that look's style anchor picture): Character turnaround sheet of [TUHIN]. Four full-body views side by side: front view, three-quarter front view, side profile facing right, back view, standing relaxed, same height and scale, evenly spaced. [STYLE] [BG]
K3 TUHIN-ACTION (ref: anchor): Action pose sheet of [TUHIN]. Six full-body poses in a 3 by 2 grid, well separated: sprinting forward, striking a football mid-kick, pointing sharply at something off to the right, crouching low studying something on the ground, sitting on the floor resting with forearms on knees, leaning back against an invisible wall with arms crossed. Leave generous magenta gaps between every figure. [STYLE] [BG]
K4 TUHIN-FACES (ref: anchor): Expression sheet of [TUHIN]. Six head-and-shoulders busts in a 3 by 2 grid, sunglasses pushed up on the head so the eyes show: laughing, shocked wide-eyed, intensely focused, tired and relieved, proud smirk, curious head tilt. [STYLE] [BG]
K5 HORSE-ACTION (ref: that look's K1 sheet): Action pose sheet of [HORSE]. Six full-body poses in a 3 by 2 grid, all in side view or three-quarter view: galloping, trotting, rearing up, grazing with head down, lying down resting, standing with head raised looking back. [STYLE] [BG]
K6 PAIR (refs: anchor AND that look's K1 sheet): Four poses of [TUHIN] together with [HORSE] in a 2 by 2 grid: he stands with one hand resting on the horse's neck; they walk side by side to the right; he crouches to feed it by hand; he rides it at a gallop, profile facing right. [STYLE] [BG]

K7 TUHIN-WORK (ref: anchor): Action pose sheet of [TUHIN]. Six full-body poses in a 3 by 2 grid: typing on a laptop sitting cross-legged, presenting at a whiteboard with a marker, holding up a camera to his eye, reading a notebook, standing with arms wide in celebration, thumbs-up with a grin. [STYLE] [BG]
K8 HORSE-MOODS (ref: that look's K1 sheet): Six horse busts and half-bodies in a 3 by 2 grid: curious head tilt, ears pricked alert, sleepy half-closed eyes, happy nuzzling, startled, proud head high. [STYLE] [BG]

## Anchors (style reference picture per look; reuse existing where noted)
GHIBLI anchor: existing char-ghibli (me.jpg-based, leaning on laterite wall).  SYSTEM anchor: existing char-system.
SYSTEM anchor: existing char-system. SOLO anchor (new): [TUHIN] standing in a dark ruined hall, blue-violet aura, shadow-wisps, sunglasses pushed into hair. [STYLE-SOLO] flat magenta bg, no text (ref: me.jpg). PAT anchor: existing char-pat.
NORTHERN anchor (new, N0): [TUHIN] Full-body three-quarter view on a snow-swept road at dusk, hooded fur-collared cloak, wind pulling hair, sunglasses pushed into hair. [STYLE-NORTHERN] Plain flat solid magenta background, no text.  (ref: me.jpg from project media)
Old stark black-and-white "ink" look is dropped; replaced by NORTHERN.

## Extra sheets (once, look-neutral or Ghibli-warm)
X1 FIREFLY-POSES: existing companion sheet, slice to sprites (idle, fast, beside chart); add: perched, sleepy dim, celebrating burst. Original design, flat indigo-friendly illustration on magenta.
X2 PROPS: tablet with chart, football, camera, notebook, laptop, coffee mug, headphones, gym-free. One flat illustration per prop, same style as Ghibli.
