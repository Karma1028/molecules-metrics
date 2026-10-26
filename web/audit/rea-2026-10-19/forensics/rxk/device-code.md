# rxk — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: wheel-step×3, loader×3, raf-lerp×2, reveal-timeline×3, keyboard×2, observer×2, page-transition×2

## wheel-step — _nuxt/HomepageKinetic2.1a6283e5.js L147-150 (hit L148)
```js
    }, Bt = function() {
      var v = c.deltaX = Yi(Qe), I = c.deltaY = Yi(je), G = Math.abs(v) >= r, d = Math.abs(I) >= r;
      fe && (G || d) && fe(c, v, I, Qe, je), G && (Ge && c.deltaX > 0 && Ge(c), X && c.deltaX < 0 && X(c), Le && Le(c), x && c.deltaX < 0 != Fe < 0 && x(c), Fe = c.deltaX, Qe[0] = Qe[1] = Qe[2] = 0), d && (ye && c.deltaY
    }, er = function(v, I, G) {
```

## wheel-step — _nuxt/HomepageKinetic2.1a6283e5.js L146-186 (hit L161)
```js
      c._vx.reset(), c._vy.reset(), ze.pause(), w && w(c);
    }, Bt = function() {
      var v = c.deltaX = Yi(Qe), I = c.deltaY = Yi(je), G = Math.abs(v) >= r, d = Math.abs(I) >= r;
      fe && (G || d) && fe(c, v, I, Qe, je), G && (Ge && c.deltaX > 0 && Ge(c), X && c.deltaX < 0 && X(c), Le && Le(c), x && c.deltaX < 0 != Fe < 0 && x(c), Fe = c.deltaX, Qe[0] = Qe[1] = Qe[2] = 0), d && (ye && c.deltaY
    }, er = function(v, I, G) {
      Qe[G] += v, je[G] += I, c._vx.update(v), c._vy.update(I), p ? kt || (kt = requestAnimationFrame(Bt)) : Bt();
    }, tr = function(v, I) {
      ke && !Be && (c.axis = Be = Math.abs(v) > Math.abs(I) ? "x" : "y", Ie = true), Be !== "y" && (Qe[2] += v, c._vx.update(v, true)), Be !== "x" && (je[2] += I, c._vy.update(I, true)), p ? kt || (kt = requestAnimationF
    }, Ft = function(v) {
      if (!at(v, 1)) {
        v = mr(v, b);
        var I = v.clientX, G = v.clientY, d = I - c.x, O = G - c.y, y = c.isDragging;
        c.x = I, c.y = G, (y || Math.abs(c.startX - I) >= n || Math.abs(c.startY - G) >= n) && (F && (lt = true), y || (c.isDragging = true), tr(d, O), y || P && P(c));
      }
    }, Ct = c.onPress = function(T) {
      at(T, 1) || T && T.button || (c.axis = Be = null, ze.pause(), c.isPressed = true, T = mr(T), Fe = mt = 0, c.startX = c.x = T.clientX, c.startY = c.y = T.clientY, c._vx.reset(), c._vy.reset(), Me(Z ? s : $, nt[1], F
    }, Et = c.onRelease = function(T) {
      if (!at(T, 1)) {
        Ee(Z ? s : $, nt[1], Ft, true);
        var v = !isNaN(c.y - c.startY), I = c.isDragging && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), G = mr(T);
        !I && v && (c._vx.reset(), c._vy.reset(), b && Q && _e.delayedCall(0.08, function() {
          if (xr() - Ht > 300 && !T.defaultPrevented) {
            if (T.target.click) T.target.click();
            else if ($.createEvent) {
              var d = $.createEvent("MouseEvents");
              d.initMouseEvent("click", true, true, qe, 1, G.screenX, G.screenY, G.clientX, G.clientY, false, false, false, false, 0, null), T.target.dispatchEvent(d);
            }
          }
        })), c.isDragging = c.isGesturing = c.isPressed = false, w && !Z && ze.restart(true), W && I && W(c), k && k(c, I);
      }
    }, A = function(v) {
      return v.touches && v.touches.length > 1 && (c.isGesturing = true) && J(v, c.isDragging);
    }, Wt = function() {
      return (c.isGesturing = false) || l(c);
    }, et = function(v) {
      if (!at(v)) {
        var I = zt(), G = ee();
        er((I - It) * _t, (G - Yt) * _t, 1), It = I, Yt = G, w && ze.restart(true);
      }
    }, tt = function(v) {
      if (!at(v)) {
```

## wheel-step — _nuxt/HomepageKinetic2.1a6283e5.js L185-191 (hit L189)
```js
    }, tt = function(v) {
      if (!at(v)) {
        v = mr(v, b), oe && (j = true);
        var I = (v.deltaMode === 1 ? f : v.deltaMode === 2 ? qe.innerHeight : 1) * _;
        er(v.deltaX * I, v.deltaY * I, 0), w && !Z && ze.restart(true);
      }
    }, rt = function(v) {
```

## loader — _nuxt/HomepageKinetic2.1a6283e5.js L311-314 (hit L312)
```js
}, bt = function(e, i) {
  var t = i && Ze(e)[bi] !== "matrix(1, 0, 0, 1, 0, 0)" && g.to(e, { x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, rotationX: 0, rotationY: 0, scale: 1, skewX: 0, skewY: 0 }).progress(1), r = e.getBoundingClientRect
  return t && t.progress(0).kill(), r;
}, Si = function(e, i) {
```

## loader — _nuxt/HomepageKinetic2.1a6283e5.js L366-369 (hit L368)
```js
}, Zr = function(e, i, t, r) {
  var n = { display: "block" }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
  e._isFlipped = r, n[t.a + "Percent"] = r ? -100 : 0, n[t.a] = r ? "1px" : 0, n["border" + a + hr] = 1, n["border" + s + hr] = 0, n[t.p] = i + "px", g.set(e, n);
}, C = [], xi = {}, Pr, qi = function() {
```

## loader — _nuxt/HomepageKinetic2.1a6283e5.js L510-550 (hit L525)
```js
    }, f.onUpdate = function() {
      M.cache++, xt();
    }, f.onComplete = function() {
      a.tween = 0, u && u.call(h);
    }, h = a.tween = g.to(e, f), h;
  };
  return e[r] = t, t.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, ue(e, "wheel", t.wheelHandler), R.isTouch && ue(e, "touchmove", t.wheelHandler), n;
}, R = (function() {
  function o4(i, t) {
    or || o4.register(g) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), yi(this), this.init(i, t);
  }
  var e = o4.prototype;
  return e.init = function(t, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(true, true), !wr) {
      this.update = this.refresh = this.kill = pt;
      return;
    }
    t = Ui(Ve(t) || $r(t) || t.nodeType ? { trigger: t } : t, Wr);
    var n = t, a = n.onUpdate, s = n.toggleClass, f = n.id, p = n.onToggle, b = n.onRefresh, w = n.scrub, h = n.trigger, u = n.pin, _ = n.pinSpacing, Y = n.invalidateOnRefresh, P = n.anticipatePin, W = n.onScrubComplete,
      return t.onRefreshInit(l);
    }, Lt = jn(x, ne, m), Tt = eo(x, ne), $e = 0, _t = 0, Te = 0, Q = At(x, m), ke, me, kt, ze, lt, z, j, Ie, Be, c, Fe, mt, zt, ee, It, Yt, pr, he, $, Qe, je, Ht, vt, at, Ye, Bt, er, tr, Ft, Ct, Et, A, Wt, et, tt, rt, N
    if (l._startClamp = l._endClamp = false, l._dir = m, P *= 45, l.scroller = x, l.scroll = S ? S.time.bind(S) : Q, ze = Q(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (pn = 1, t.refreshPriority === -9
      Wt = $r(d) && d, Wt ? A ? A.duration(d) : A = g.to(r, { ease: "expo", totalProgress: "+=0", duration: Wt, paused: true, onComplete: function() {
        return W && W(l);
      } }) : (A && A.progress(1).kill(), A = 0);
    }, r && (r.vars.lazy = false, r._initted && !l.isReverted || r.vars.immediateRender !== false && t.immediateRender !== false && r.duration() && r.render(0, true, true), l.animation = r.pause(), r.scrollTrigger = l, l
      return Ae(d) && d.target === (ne ? q.scrollingElement || st : x) && (d.smooth = false);
    }), kt = Ae(k.snapTo) ? k.snapTo : k.snapTo === "labels" ? ro(r) : k.snapTo === "labelsDirectional" ? io(r) : k.directional !== false ? function(d, O) {
      return Oi(k.snapTo)(d, De() - _t < 500 ? 0 : O.direction);
    } : g.utils.snap(k.snapTo), et = k.duration || { min: 0.1, max: 2 }, et = Vt(et) ? ar(et.min, et.max) : ar(et, et), tt = g.delayedCall(k.delay || Wt / 2 || 0.1, function() {
      var d = Q(), O = De() - _t < 500, y = ke.tween;
      if ((O || Math.abs(l.getVelocity()) < 10) && !y && !oi && $e !== d) {
        var E = (d - z) / ee, ae = r && !fe ? r.totalProgress() : E, L = O ? 0 : (ae - Et) / (De() - Gr) * 1e3 || 0, K = g.utils.clamp(-E, 1 - E, ir(L / 2) * L / 0.185), Ce = E + (k.inertia === false ? 0 : K), pe = ar(0,
        if (d <= j && d >= z && U !== d) {
          if (y && !y._initted && y.data <= ir(U - d)) return;
          k.inertia === false && (K = pe - E), ke(U, { duration: et(ir(Math.max(ir(Ce - ae), ir(pe - ae)) * 0.185 / L / 0.05 || 0)), ease: k.ease || "power3", data: ir(U - d), onInterrupt: function() {
            return tt.restart(true) && V && V(l);
          }, onComplete: function() {
            l.update(), $e = Q(), Ct = Et = r && !fe ? r.totalProgress() : l.progress, F && F(l), We && We(l);
```

## raf-lerp — _nuxt/HomepageKinetic2.1a6283e5.js L909-949 (hit L924)
```js
      return (1 - b) * f + b * p;
    })(t, r, 1 - Math.exp(-n * a))), Math.round(this.value) === this.to && (this.value = this.to, i = true);
    else {
      this.currentTime += e;
      const f = ni(0, this.currentTime / this.duration, 1);
      i = f >= 1;
      const p = i ? 1 : this.easing(f);
      this.value = this.from + (this.to - this.from) * p;
    }
    var t, r, n, a;
    (s = this.onUpdate) == null || s.call(this, this.value, i), i && this.stop();
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(e, i, { lerp: t = 0.1, duration: r = 1, easing: n = (f) => f, onStart: a, onUpdate: s }) {
    this.from = this.value = e, this.to = i, this.lerp = t, this.duration = r, this.easing = n, this.currentTime = 0, this.isRunning = true, a == null || a(), this.onUpdate = s;
  }
}
class go {
  constructor({ wrapper: e, content: i, autoResize: t = true } = {}) {
    ht(this, "resize", () => {
      this.onWrapperResize(), this.onContentResize();
    });
    ht(this, "onWrapperResize", () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    });
    ht(this, "onContentResize", () => {
      this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth;
    });
    if (this.wrapper = e, this.content = i, t) {
      const r = /* @__PURE__ */ (function(n, a) {
        let s;
        return function() {
          let f = arguments, p = this;
          clearTimeout(s), s = setTimeout(function() {
            n.apply(p, f);
          }, a);
        };
      })(this.resize, 250);
      this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(r), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(r), this.contentResizeObserver.obse
```

## raf-lerp — _nuxt/HomepageKinetic2.1a6283e5.js L1070-1100 (hit L1070)
```js
  scrollTo(e, { offset: i = 0, immediate: t = false, lock: r = false, duration: n = this.options.duration, easing: a = this.options.easing, lerp: s = !n && this.options.lerp, onComplete: f = null, force: p = false, progr
    if (!this.isStopped && !this.isLocked || p) {
      if (["top", "left", "start"].includes(e)) e = 0;
      else if (["bottom", "right", "end"].includes(e)) e = this.limit;
      else {
        let w;
        if (typeof e == "string" ? w = document.querySelector(e) : e != null && e.nodeType && (w = e), w) {
          if (this.options.wrapper !== window) {
            const u = this.options.wrapper.getBoundingClientRect();
            i -= this.isHorizontal ? u.left : u.top;
          }
          const h = w.getBoundingClientRect();
          e = (this.isHorizontal ? h.left : h.top) + this.animatedScroll;
        }
      }
      if (typeof e == "number") {
        if (e += i, e = Math.round(e), this.options.infinite ? b && (this.targetScroll = this.animatedScroll = this.scroll) : e = ni(0, e, this.limit), t) return this.animatedScroll = this.targetScroll = e, this.setScrol
        if (!b) {
          if (e === this.targetScroll) return;
          this.targetScroll = e;
        }
        this.animate.fromTo(this.animatedScroll, e, { duration: n, easing: a, lerp: s, onStart: () => {
          r && (this.isLocked = true), this.isScrolling = true;
        }, onUpdate: (w, h) => {
          this.isScrolling = true, this.velocity = w - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = w, this.setScroll(this.scroll), b && (this.targetScroll = w), h || this.emit(),
            delete this.__preventNextScrollEvent;
          }));
        } });
      }
    }
  }
```

## reveal-timeline — _nuxt/AppFooter.2e0ea797.js L22-28 (hit L23)
```js
  return j(() => {
    l.set(".homepage-hero .word", { opacity: 1, delay: 1, ease: "power4.inOut", stagger: 0.16, onComplete: () => {
      l.set(".laststag", { opacity: 1, delay: 0.16 });
    } }), a.value.querySelectorAll(".ligne-child").forEach((s) => {
      l.to(s, { y: "100%", ease: "power1.inOut", scrollTrigger: { trigger: s, start: () => "top top+=" + s.getBoundingClientRect().top, end: "top top", scrub: true } });
    });
  }), (s, n) => (z(), N("p", { ref_key: "title", ref: a, class: "homepage-title t-h1", translate: "no", "aria-label": "RXK\xA9 is the digital studio of French designer Gilles Tossoukpe" }, Ye, 512));
```

## reveal-timeline — _nuxt/AppFooter.2e0ea797.js L35-51 (hit L36)
```js
    l.matchMedia().add("(max-width: 1024px)", () => {
      s = l.timeline({ paused: true }), r = l.quickTo(h, "delta", { duration: 0.5, ease: "power3" }), window.addEventListener("scroll", () => {
        r(window.scrollY - c), c = window.scrollY, window.clearTimeout(p), p = setTimeout(() => {
          r(0);
        }, 120);
      }), s.to(a.value.children, { scale: 1, ease: "power2.inOut", duration: 4, stagger: { each: 0.5, repeat: -1, onRepeat() {
        h.delta / 600 + i >= 0 ? (n++, this.targets()[0].style.zIndex = n) : (n--, this.targets()[0].style.zIndex = n - 7);
      } } }).time(o + 4), ne.create({ trigger: a.value, start: "top bottom", end: "bottom top", onEnter: () => {
        l.ticker.add(_);
      }, onEnterBack: () => {
        l.ticker.add(_);
      }, onLeave: () => {
        l.ticker.remove(_);
      }, onLeaveBack: () => {
        l.ticker.remove(_);
      } });
    });
```

## reveal-timeline — _nuxt/AppFooter.2e0ea797.js L61-69 (hit L62)
```js
  j(() => {
    s = l.timeline({ onComplete: () => {
      n ? s.kill() : s.restart();
    } }), s.add(() => {
      a.value.$el.classList.add("on");
    }, 3.8), s.add(() => {
      a.value.$el.classList.remove("on");
    }, 4.35);
  });
```

## keyboard — _nuxt/AppFooter.2e0ea797.js L514-522 (hit L516)
```js
  j(() => {
    l.matchMedia().add("(pointer: fine)", () => {
      document.addEventListener("keydown", (x) => {
        c && (x.key === "Escape" && T(), (x.key === "ArrowRight" || x.key === "ArrowDown") && H());
      });
    }), o = document.querySelectorAll(".fiche").length, l.matchMedia().add("(pointer: coarse) and (min-width: 900px)", () => {
      C.value.addEventListener("touchstart", Ie), C.value.addEventListener("touchmove", He);
    });
  });
```

## keyboard — _nuxt/AppFooter.2e0ea797.js L655-672 (hit L658)
```js
  j(() => {
    fe();
    const b = ["lowlyland", "bruce-mau-design", "benjamin-righetti", "vendredi-society", "field-day-sound"], u = window.location.pathname.replace(/^\/|\/$/g, ""), $ = b.indexOf(u);
    $ !== -1 && (a.value.reveal($), a.value.setVideo($)), document.addEventListener("keydown", (L) => {
      L.key === "Escape" && _.value && J();
    }), l.matchMedia().add("(min-width: 1025px)", () => {
      document.querySelectorAll(".innerMedia").forEach((L) => {
        const A = L.querySelector(".media-child"), C = L.querySelector(".grey") || L.querySelector("img"), Z = [A, C].filter(Boolean), T = l.to(Z, { y: 0, ease: "power4.inOut", duration: 1, scrollTrigger: { trigger: C, s
          l.set(L, { pointerEvents: "initial" }), T && T.kill();
        } });
      });
    }), l.matchMedia().add("(pointer: fine)", () => {
      for (let L = 0; L < 5; L++) {
        const A = l.timeline({ paused: true }), C = document.querySelectorAll(".innerMedia")[L];
        A.set(C.querySelectorAll(".hover"), { autoAlpha: 1 }), A.set(C.querySelectorAll(".img")[0], { scale: 0.8, autoAlpha: 0 }, 0), A.set(C.querySelectorAll(".img")[1], { scale: 0.5, autoAlpha: 0 }, 0), A.set(C.querySe
      }
    });
  });
```

## observer — _nuxt/AppFooter.2e0ea797.js L724-732 (hit L727)
```js
    l.matchMedia().add("(min-width: 1025px)", () => {
      l.delayedCall(1, () => {
        a.value.querySelectorAll(".word-above").forEach((i) => {
          l.to(i, { y: "100%", ease: "power1.inOut", scrollTrigger: { trigger: i, start: "bottom bottom", end: "top 55%", scrub: 1 } });
        }), a.value.querySelectorAll(".word-under").forEach((i) => {
          l.to(i, { y: "0%", ease: "power1.inOut", scrollTrigger: { trigger: i.parentElement.querySelector(".word-above"), start: "bottom bottom", end: "top 55%", scrub: 1 } });
        });
      });
    });
```

## observer — _nuxt/index.4db78ffb.js L129-169 (hit L144)
```js
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, ke = function(t) {
  return t._end = q(t._start + (t._tDur / Math.abs(t._ts || t._rts || D) || 0));
}, Ce = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = q(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), ke(t), i._dirty || It(i, t)), t;
}, Ki = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = be(t.rawTime(), e), (!e._dur || ce(0, e.totalDuration(), i) - e._tTime > D) && e.render(i, true)), It(t, e)._dp && t._initted &
    if (t._dur < t.duration()) for (i = t; i._dp; ) i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -D;
  }
}, _t = function(t, e, i, r) {
  return e.parent && St(e), e._start = q((yt(i) ? i : i || t !== R ? nt(t, i, e) : t._time) + e._delay), e._end = q(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), $i(t, e, "_first", "_last", t._sort ? "_
}, Qi = function(t, e) {
  return (rt.ScrollTrigger || ri("scrollTrigger", e)) && rt.ScrollTrigger.create(e, t);
}, Hi = function(t, e, i, r, n) {
  if (ui(t, e, n), !t._initted) return 1;
  if (!i && t._pt && !W && (t._dur && t.vars.lazy !== false || !t._dur && t.vars.lazy) && Yi !== et.frame) return wt.push(t), t._lazy = [n, r], 1;
}, qr = function f3(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || f3(e));
}, Xe = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Gr = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && qr(t) && !(!t._initted && Xe(t)) || (t._ts < 0 || t._dp._ts < 0) && !Xe(t)) ? 0 : 1, a = t._rDelay, o = 0, u, h, l;
  if (a && t._repeat && (o = ce(0, t._tDur, e), h = Qt(o, a), t._yoyo && h & 1 && (s = 1 - s), h !== Qt(t._tTime, a) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || W || r || t._zTime ==
    if (!t._initted && Hi(t, e, r, i, o)) return;
    for (l = t._zTime, t._zTime = e || (i ? D : 0), i || (i = e && !l), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = o, u = t._pt; u; ) u.r(s, u.d), u = u._next;
    e < 0 && Ye(t, e, i, true), t._onUpdate && !i && ut(t, "onUpdate"), o && t._repeat && !i && t.parent && ut(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && St(t, 1), !i && !W && (ut(t, s ? "onComplet
  } else t._zTime || (t._zTime = e);
}, Wr = function(t, e, i) {
  var r;
  if (i > e) for (r = t._first; r && r._start <= i; ) {
    if (r.data === "isPause" && r._start > e) return r;
    r = r._next;
  }
  else for (r = t._last; r && r._start >= i; ) {
    if (r.data === "isPause" && r._start < e) return r;
    r = r._prev;
```

## page-transition — _nuxt/entry.5472ee6a.js L3858-3894 (hit L3891)
```js
function Sh(e, t, n, r) {
  let s = [], o = [], i = null;
  const l = ({ state: h }) => {
    const m = lc(e, location), E = n.value, R = t.value;
    let $ = 0;
    if (h) {
      if (n.value = m, t.value = h, i && i === E) {
        i = null;
        return;
      }
      $ = R ? h.position - R.position : 0;
    } else r(m);
    s.forEach((_) => {
      _(n.value, E, { delta: $, type: kn.pop, direction: $ ? $ > 0 ? bn.forward : bn.back : bn.unknown });
    });
  };
  function c() {
    i = n.value;
  }
  function u(h) {
    s.push(h);
    const m = () => {
      const E = s.indexOf(h);
      E > -1 && s.splice(E, 1);
    };
    return o.push(m), m;
  }
  function a() {
    const { history: h } = window;
    h.state && h.replaceState(se({}, h.state, { scroll: Er() }), "");
  }
  function f() {
    for (const h of o) h();
    o = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", a);
  }
  return window.addEventListener("popstate", l), window.addEventListener("beforeunload", a, { passive: true }), { pauseListeners: c, listen: u, destroy: f };
}
```

## page-transition — _nuxt/entry.5472ee6a.js L4586-4593 (hit L4589)
```js
  const i = Qs({ statusCode: 404, statusMessage: `Page Not Found: ${e.fullPath}` }), l = s.beforeResolve((u) => {
    if (l(), u === e) {
      const a = s.afterEach(async () => {
        a(), await r.runWithContext(() => Bt(i)), window.history.pushState({}, "", e.fullPath);
      });
      return false;
    }
  });
```