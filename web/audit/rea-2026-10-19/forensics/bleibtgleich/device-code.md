# bleibtgleich — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: keyboard×1, page-transition×1

## keyboard — beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092 L420-433 (hit L420)
```js
          const r3 = ["keydown", "click", "visibilitychange"], s3 = (t4) => {
            if (t4.isTrusted && !n3) {
              const t5 = a2.id;
              q(() => {
                if (!n3) {
                  if (!i3) {
                    f2.disconnect();
                    for (const t6 of r3) removeEventListener(t6, s3, { capture: true });
                  }
                  t5 === a2.id && (n3 = true, o2(true));
                }
              });
            }
          };
```

## page-transition — beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092 L860-863 (hit L863)
```js
    })(), N2 || (yt = window.history, (wt = yt.pushState) && (yt.pushState = function(t3, e3, n2) {
      const i3 = rt(n2);
      return O2 != i3 && (gt(O2), ht(), E2(i3, { navigationType: r.RoutingApis }), vt(i3), O2 = i3), wt.apply(yt, [t3, e3, n2]);
    }, window.addEventListener("popstate", function(t3) {
```