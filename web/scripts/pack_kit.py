"""usage: python -I pack_kit.py <look> : copies _cut/<look>/k*-NN.png to public/story/kit/<look>/ using NAMES (edit per look) + manifest"""
import sys, json, shutil
from pathlib import Path
look = sys.argv[1]
C, D = Path("_cut") / look, Path("public/story/kit") / look
D.mkdir(parents=True, exist_ok=True)
N = {
 "k1-horse-turn": ["horse-front", "horse-three-quarter", "horse-side", "horse-back"],
 "k2-tuhin-turn": ["tuhin-front", "tuhin-three-quarter", "tuhin-side", "tuhin-back"],
 "k3-tuhin-action": json.loads(sys.argv[2]) if len(sys.argv) > 2 else [f"act{i}" for i in range(1, 7)],
 "k4-tuhin-faces": [f"face{i}" for i in range(1, 7)],
 "k5-horse-action": [f"horse-a{i}" for i in range(1, 7)],
 "k6-pair": json.loads(sys.argv[3]) if len(sys.argv) > 3 else [f"pair{i}" for i in range(1, 5)],
 "k7-tuhin-work": [f"work{i}" for i in range(1, 7)],
 "k8-horse-moods": [f"horse-mood{i}" for i in range(1, 7)],
}
for pre, names in N.items():
    for i, n in enumerate(names, 1):
        s = C / f"{pre}-{i:02d}.png"
        if s.exists(): shutil.copy(s, D / f"{n}.png")
f = sorted(p.name for p in D.glob("*.png"))
(D / "manifest.json").write_text(json.dumps({"style": look, "files": f}, indent=1)); print(look, len(f))
