"""usage: python -I to_webp.py <look> [maxh=900] : writes public/story/kit/<look>/*.webp beside the PNGs, capped in height"""
import sys
from pathlib import Path
from PIL import Image
look, maxh = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 900
d = Path("public/story/kit") / look
tot = 0
for p in sorted(d.glob("*.png")):
    im = Image.open(p).convert("RGBA")
    if im.height > maxh:
        im = im.resize((round(im.width * maxh / im.height), maxh), Image.LANCZOS)
    o = p.with_suffix(".webp"); im.save(o, "WEBP", quality=84, method=6)
    tot += o.stat().st_size
    if o.stat().st_size > 120_000: print("over 120KB:", o.name, o.stat().st_size // 1024, "KB")
print(look, "total", tot // 1024, "KB")
