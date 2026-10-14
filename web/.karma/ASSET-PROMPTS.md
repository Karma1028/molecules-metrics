# Flow asset prompts (Claude-authored) — Stream B, work-order #1

**Who runs it:** a Haiku subagent drives the Flow MCP grunt-work (generate + download). **Prompts are Claude's, not the agent's** (user directive). Claude authors + collects.
**Save to:** `web/public/characters/` as PNG, transparent bg. **Do NOT commit** (needs Tuhin OK). Report exact filenames back.
**Consistency:** assets 1 & 2 are the SAME stylized persona in two worlds — use Flow `flow_character` to lock one base character, then render both skins. NOT photoreal, NOT fabricated biographical facts — stylized avatars only.

1. **artist-self.png** — Split-self ARTIST guide. Warm film-grain illustrated persona (stylized young man avatar, friendly, holding a 35mm camera), sepia+burnt-orange warm-paper palette, hand-drawn collage / field-notebook margin character, visible grain, portrait aspect, transparent background. Recurring margin guide for the Artist world.

2. **analyst-self.png** — Split-self ANALYST guide. SAME character/face/build, restyled as a precise instrument-panel persona: dark-navy field, blue-teal HUD wireframe linework + subtle data overlays, clean vector, cool palette, calm/focused, portrait aspect, transparent background. Recurring margin guide for the Analyst world.

3. **artist-creature.png** — Artist motif-creature. Friendly molecule/organism mascot: hexagonal benzene-ring body, expressive dot eyes, warm orange, hand-drawn film-grain notebook-doodle style, small, loop-friendly, transparent background.

4. **analyst-creature.png** — Analyst motif-creature. Small data-sprite/bot: glowing blue-teal geometric drone built from chart nodes / tick-marks, instrument-panel style, clean vector, transparent background.

**After gen:** Claude wires them into the two worlds' margins via a follow-up TASK to Antigravity (T:b1 already left labeled comment slots). Each world gets its guide + its creature.
