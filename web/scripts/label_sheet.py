"""usage: python -I label_sheet.py <out.jpg> <glob-dir> [pattern...]  labelled contact sheet of cut-outs"""
import sys, glob, os
from PIL import Image, ImageDraw
out, d, pats = sys.argv[1], sys.argv[2], sys.argv[3:] or ["*.png"]
fs = sorted(f for p in pats for f in glob.glob(os.path.join(d, p)))
H = 200; ims = [Image.open(f) for f in fs]
ims = [i.resize((max(1, int(i.width * H / i.height)), H)) for i in ims]
W = 1800; rows = [[]]; x = 0
for f, i in zip(fs, ims):
    if x + i.width > W: rows.append([]); x = 0
    rows[-1].append((f, i)); x += i.width + 8
s = Image.new("RGB", (W, (H + 16) * len(rows)), (70, 70, 70)); dr = ImageDraw.Draw(s)
for r, row in enumerate(rows):
    x = 0
    for f, i in row:
        s.paste(i, (x, r * (H + 16) + 14), i)
        dr.text((x, r * (H + 16)), os.path.basename(f)[:-4].replace("tuhin-", "")[:20], fill=(255, 255, 0)); x += i.width + 8
s.save(out, quality=85)
