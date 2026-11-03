#!/bin/sh
# usage: slice_kit.sh <look>  (reads story-art/kit-<look>/kN-*.jpg, writes _cut/<look>/); picks first DIL that yields the expected count
look=$1
for p in "k1-horse-turn 4" "k2-tuhin-turn 4" "k3-tuhin-action 6" "k4-tuhin-faces 6" "k5-horse-action 6" "k6-pair 4" "k7-tuhin-work 6" "k8-horse-moods 6"; do
  set -- $p; f=story-art/kit-$look/$1.jpg; [ -f "$f" ] || continue; ok=0
  for d in 2 3 4 1 5 6 7 8; do
    out=$(DIL=$d python -I scripts/slice_sheet.py "$f" $2 _cut/$look/tmp$d $1 2>&1)
    case "$out" in *" OK"*) mkdir -p _cut/$look; cp _cut/$look/tmp$d/*.png _cut/$look/; echo "$1 DIL=$d $out"; ok=1; break;; esac
  done
  [ $ok = 1 ] || echo "$1 NO MATCH"
done
rm -rf _cut/$look/tmp*
