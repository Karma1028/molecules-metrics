# hvdmatch — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: keyboard×3, page-transition×1, loader×3, raf-lerp×1, observer×1

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

## loader — assets/app-BHmhj9u_.js L2200-2233 (hit L2201)
```js
  function _i() {
    window.fontLoader = { initialElements: document.querySelectorAll("[data-font-family]"), fontsLoaded: [], supportsWoff2, init: () => {
      [].forEach.call(window.fontLoader.initialElements, function(e) {
        var t = e.dataset.fontFamily + "-" + e.dataset.fontCurrentWeight, r = t + (e.dataset.fontCurrentWeightItalic === "1" ? "-italic" : "");
        window.fontLoader.loadStyle(r);
      });
    }, styleNotYetTriggered: (e) => window.fontLoader.fontsLoaded[e] === void 0, loadStyle: (e) => {
      if (window.fontLoader.styleNotYetTriggered(e)) {
        var t = "/assets/fonts/css/" + e + "-" + (window.fontLoader.supportsWoff2 ? "woff2" : "woff") + ".css";
        window.fontLoader.fontsLoaded[e] = loadCSS(t), onloadCSS(window.fontLoader.fontsLoaded[e], function() {
          window.fontLoader.announceStyleLoaded(e);
        });
      }
    }, getMatchingElements: (e) => document.querySelectorAll('[data-font-current-style="' + e + '"]'), announceStyleLoaded: (e) => {
      window.fontLoader.fontsLoaded[e] = true, [].forEach.call(window.fontLoader.getMatchingElements(e), function(t) {
        t.classList.remove("webfont-loading"), t.classList.add("webfont-loaded"), t.addEventListener("transitionend", () => {
          t.classList.add("webfont-loaded-done");
        }, { once: true }), setTimeout(function() {
          t.classList.add("webfont-loaded-done");
        }, 1e3);
      });
    }, setStyle(e, t, r, n) {
      e.style.fontFamily = e.dataset.fontFamily + "-" + t, e.style.fontStyle = r ? "italic" : "normal", e.dataset.fontCurrentWeight = t, e.dataset.fontCurrentWeightItalic = r ? 1 : 0, e.dataset.fontCurrentStyle = t + (r 
    }, setRandomWeight: (e, t) => {
    }, setNextWeight: (e, t) => {
    }, setPreviousWeight: (e, t) => {
    }, setRandomStyle: (e, t) => {
    }, setNextStyle: (e, t) => {
    }, setPreviousStyle: (e, t) => {
    }, toggleItalic: (e) => {
    } }, $(function() {
      window.fontLoader.init();
    });
  }
```

## keyboard — assets/app-BHmhj9u_.js L2359-2367 (hit L2360)
```js
        function Ie(P) {
          y.noScrollbars && (document.documentElement.style.overflowY = "hidden", document.body.style.overflowY = "scroll"), r.style.display !== "block" && (Ge(document, "keydown", De), _ = { count: 0, startX: null, star
            Ot(B), st(B);
          }), _t(), r.style.display = "block", y.fullScreen && (function() {
            r.requestFullscreen ? r.requestFullscreen() : r.webkitRequestFullscreen ? r.webkitRequestFullscreen() : r.mozRequestFullScreen && r.mozRequestFullScreen();
          })(), setTimeout(function() {
            r.className = "visible", y.bodyClass && document.body.classList && document.body.classList.add(y.bodyClass), y.afterShow && y.afterShow();
          }, 50), y.onChange && y.onChange(B, he.length), ae = document.activeElement, Ae(), G = true);
        }
```

## keyboard — assets/app-BHmhj9u_.js L2371-2377 (hit L2372)
```js
        function Fe() {
          y.noScrollbars && (document.documentElement.style.overflowY = "auto", document.body.style.overflowY = "auto"), r.style.display !== "none" && (Je(document, "keydown", De), r.className = "", setTimeout(function()
            r.style.display = "none", document.fullscreen && (function() {
              document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
            })(), y.bodyClass && document.body.classList && document.body.classList.remove(y.bodyClass), y.afterHide && y.afterHide(), ae && ae.focus(), G = false;
          }, 500));
        }
```

## loader — assets/app-BHmhj9u_.js L2786-2796 (hit L2793)
```js
      }), $(".type-tester__controls").each(function(e, t) {
        var r = $(t).find(".js-tester-choose-size"), n = $(t).find(".js-tester-select-styles"), i = $(t).next();
        r.val(i.css("font-size").replace("px", "")), r.on("change mousemove", function(c) {
          i.css("font-size", $(this).val() + "px");
        });
        var s, l, h;
        n.change(function(c) {
          s = $(this).val(), l = s.indexOf("-italic") !== -1, h = s.replace("-italic", ""), window.fontLoader.setStyle(i[0], h, l, function() {
          });
        });
      }));
```

## loader — assets/app-BHmhj9u_.js L3937-3977 (hit L3952)
```js
        r(l, n, i);
        var h = s(e.glyphs, l);
        return h.unitsPerEm = e.unitsPerEm, h;
      }, tn(l, "xMin", "_xMin"), tn(l, "xMax", "_xMax"), tn(l, "yMin", "_yMin"), tn(l, "yMax", "_yMax"), l;
    };
  }
  function Bu(e, t, r, n) {
    return function() {
      var i = new pt({ index: t, font: e });
      return i.path = function() {
        var s = r(e, i, n);
        return s.unitsPerEm = e.unitsPerEm, s;
      }, i;
    };
  }
  var Nt = { GlyphSet: sa, glyphLoader: Nu, ttfGlyphLoader: Iu, cffGlyphLoader: Bu };
  function Ji(e, t) {
    if (e === t) return true;
    if (Array.isArray(e) && Array.isArray(t)) {
      if (e.length !== t.length) return false;
      for (var r = 0; r < e.length; r += 1) if (!Ji(e[r], t[r])) return false;
      return true;
    } else return false;
  }
  function Xn(e) {
    var t;
    return e.length < 1240 ? t = 107 : e.length < 33900 ? t = 1131 : t = 32768, t;
  }
  function Xt(e, t, r) {
    var n = [], i = [], s = Q.getCard16(e, t), l, h;
    if (s !== 0) {
      var c = Q.getByte(e, t + 2);
      l = t + (s + 1) * c + 2;
      for (var g = t + 3, y = 0; y < s + 1; y += 1) n.push(Q.getOffset(e, g, c)), g += c;
      h = l + n[s];
    } else h = t + 2;
    for (var w = 0; w < n.length - 1; w += 1) {
      var b = Q.getBytes(e, l + n[w], l + n[w + 1]);
      r && (b = r(b)), i.push(b);
    }
    return { objects: i, startOffset: t, endOffset: h };
```

## raf-lerp — assets/app-BHmhj9u_.js L5347-5359 (hit L5355)
```js
  function As(e, t) {
    var r = e.prog, n = e.ip, i = 1, s;
    do
      if (s = r[++n], s === 88) i++;
      else if (s === 89) i--;
      else if (s === 64) n += r[n + 1] + 1;
      else if (s === 65) n += 2 * r[n + 1] + 1;
      else if (s >= 176 && s <= 183) n += s - 176 + 1;
      else if (s >= 184 && s <= 191) n += (s - 184 + 1) * 2;
      else if (t && i === 1 && s === 27) break;
    while (i > 0);
    e.ip = n;
  }
```

## observer — assets/app-BHmhj9u_.js L7076-7094 (hit L7087)
```js
  async function Cp() {
    if (Rr = $(".js-vf-demo-title"), !Rr.length) return;
    Jn = $(".js-vf-demo-axis-control"), sr = $(".js-vf-demo").first().data("variable-fonts"), Is = sr[0].familySlug, Gt = sr[0].fontSlug;
    for (const t in sr) {
      const r = sr[t].url, i = (await kp.load(r)).tables.fvar.axes;
      Kt[sr[t].fontSlug] = {};
      for (const s in i) {
        const l = { label: i[s].name.en, slug: i[s].tag, value: i[s].defaultValue, min: i[s].minValue, max: i[s].maxValue, countingUp: true, slider: Jn[s] };
        Kt[sr[t].fontSlug][i[s].tag] = l;
      }
    }
    new IntersectionObserver((t) => {
      t.forEach((r) => {
        r.isIntersecting ? Op() : Lp();
      });
    }).observe(Rr[0]), $(".js-vf-demo-select-font-control").change(function(t) {
      Gt = $(this).val(), wp(), Fp();
    }).trigger("change");
  }
```