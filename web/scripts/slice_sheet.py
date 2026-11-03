"""Slice a magenta-background pose sheet into transparent per-figure PNGs.
usage: DIL=4 python -I slice_sheet.py <sheet.jpg> <expected_count> <out_dir> <prefix>
"""
import os
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

PAD = 8
DIL = max(int(os.environ.get("DIL", "4")), 1)  # 0 would flood-fill in scipy
MIN_AREA = 2500  # px; drops specks
WIDE = 1.45      # a box this many times the median width is probably two touching figures


def key_out(rgb):
    r, g, b = (rgb[..., i].astype(np.int16) for i in range(3))
    bg = ((np.minimum(r, b) - g) > 70) & (r > 150) & (b > 150) & (g < 140)
    return ~bg


def despill(rgb, fg):
    edge = fg & ~ndi.binary_erosion(fg, iterations=3)
    out = rgb.astype(np.int16)
    r, g, b = out[..., 0], out[..., 1], out[..., 2]
    spill = np.maximum(np.minimum(r, b) - g, 0)
    e = edge & (spill > 0)
    r[e] -= spill[e]
    b[e] -= spill[e]
    return np.clip(out, 0, 255).astype(np.uint8)


def components(fg):
    lab, _ = ndi.label(ndi.binary_dilation(fg, iterations=DIL))
    out = []
    for i, sl in enumerate(ndi.find_objects(lab), start=1):
        area = int((fg & (lab == i)).sum())
        if area >= MIN_AREA:
            out.append((sl, i, area))
    return lab, out


def cut_wide(fg, lab, boxes):
    """Cut the thinnest column (or row) inside any unusually wide (tall) box, then relabel."""
    widths = sorted(s[1].stop - s[1].start for s, _, _ in boxes)
    heights = sorted(s[0].stop - s[0].start for s, _, _ in boxes)
    mw, mh = widths[len(widths) // 2], heights[len(heights) // 2]
    changed = False
    for sl, i, _ in boxes:
        w, h = sl[1].stop - sl[1].start, sl[0].stop - sl[0].start
        m = (fg & (lab == i))[sl]
        if w > WIDE * mw:
            lo, hi = int(w * 0.3), int(w * 0.7)
            x = sl[1].start + lo + int(np.argmin(m.sum(axis=0)[lo:hi]))
            fg[sl[0].start:sl[0].stop, x - 1:x + 2] = False
            changed = True
        elif h > WIDE * mh:
            lo, hi = int(h * 0.3), int(h * 0.7)
            y = sl[0].start + lo + int(np.argmin(m.sum(axis=1)[lo:hi]))
            fg[y - 1:y + 2, sl[1].start:sl[1].stop] = False
            changed = True
    return changed


def main(src, expected, out_dir, prefix):
    img = np.array(Image.open(src).convert("RGB"))
    raw = key_out(img)
    # Flow's corner sparkle: wipe a small square if it is only a speck
    corner = raw[-58:, -58:]
    if corner.sum() < 1800:
        raw = raw.copy(); raw[-58:, -58:] = False
    fg = ndi.binary_fill_holes(ndi.binary_opening(raw, iterations=1))   # grouping mask
    solid = ndi.binary_opening(raw, iterations=1)                       # real alpha (holes stay empty)
    lab, boxes = components(fg)
    for _ in range(3):
        if len(boxes) >= expected or not cut_wide(fg, lab, boxes):
            break
        lab, boxes = components(fg)
    heights = [s[0].stop - s[0].start for s, _, _ in boxes]
    band = max(heights) * 0.6
    boxes.sort(key=lambda t: (round(((t[0][0].start + t[0][0].stop) / 2) / band), t[0][1].start))
    clean = despill(img, solid)
    Path(out_dir).mkdir(parents=True, exist_ok=True)
    edge = []
    for k, (sl, i, _) in enumerate(boxes, start=1):
        y0, y1 = max(sl[0].start - PAD, 0), min(sl[0].stop + PAD, img.shape[0])
        x0, x1 = max(sl[1].start - PAD, 0), min(sl[1].stop + PAD, img.shape[1])
        a = ndi.gaussian_filter((solid & (lab == i))[y0:y1, x0:x1].astype(np.float32), 0.8)
        rgba = np.dstack([clean[y0:y1, x0:x1], (np.clip(a, 0, 1) * 255).astype(np.uint8)])
        Image.fromarray(rgba, "RGBA").save(Path(out_dir) / f"{prefix}-{k:02d}.png")
        if sl[0].start <= 2 or sl[1].start <= 2 or sl[0].stop >= img.shape[0] - 2 or sl[1].stop >= img.shape[1] - 2:
            edge.append(k)
    print(f"{Path(src).name}: found {len(boxes)}, expected {expected}"
          + ("  OK" if len(boxes) == expected else "  MISMATCH")
          + (f"  touches-sheet-edge: {edge}" if edge else ""))


if __name__ == "__main__":
    main(sys.argv[1], int(sys.argv[2]), sys.argv[3], sys.argv[4])
