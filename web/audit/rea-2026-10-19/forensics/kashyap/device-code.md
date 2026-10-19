# kashyap — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, keyboard×3, wheel-step×3, page-transition×3, raf-lerp×3, observer×3, reveal-timeline×3, audio×3, text-split×1, pointer×1

## loader — assets/index-DUMfhfOj.js L539-546 (hit L546)
```js
  }, Dn.preinitModule = function(_, g) {
    if (typeof _ == "string") if (typeof g == "object" && g !== null) {
      if (g.as == null || g.as === "script") {
        var y = h(g.as, g.crossOrigin);
        r.d.M(_, { crossOrigin: y, integrity: typeof g.integrity == "string" ? g.integrity : void 0, nonce: typeof g.nonce == "string" ? g.nonce : void 0 });
      }
    } else g == null && r.d.M(_);
  }, Dn.preload = function(_, g) {
```

## loader — assets/index-DUMfhfOj.js L546-551 (hit L551)
```js
  }, Dn.preload = function(_, g) {
    if (typeof _ == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var y = g.as, f = h(y, g.crossOrigin);
      r.d.L(_, y, { crossOrigin: f, integrity: typeof g.integrity == "string" ? g.integrity : void 0, nonce: typeof g.nonce == "string" ? g.nonce : void 0, type: typeof g.type == "string" ? g.type : void 0, fetchPriority
    }
  }, Dn.preloadModule = function(_, g) {
```

## keyboard — assets/index-DUMfhfOj.js L1485-1491 (hit L1490)
```js
  var mp = y({}, qs, { key: function(e) {
    if (e.key) {
      var t = fp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = R1(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? dp[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ju, charCode: function(e) {
```

## keyboard — assets/index-DUMfhfOj.js L1479-1519 (hit L1494)
```js
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = hp[e]) ? !!t[e] : false;
  }
  function Ju() {
    return pp;
  }
  var mp = y({}, qs, { key: function(e) {
    if (e.key) {
      var t = fp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = R1(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? dp[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ju, charCode: function(e) {
    return e.type === "keypress" ? R1(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? R1(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), gp = ir(mp), _p = y({}, L1, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ph = ir(_p), vp = y({}, qs, { touches: 0, target
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  }, deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), bp = ir(wp), Sp = y({}, Fa, { newState: 0, oldState: 0 }), jp = ir(Sp), Tp = [9, 13, 27, 32], e0 = Li && "CompositionEvent" in window, Is = null;
  Li && "documentMode" in document && (Is = document.documentMode);
  var Ep = Li && "TextEvent" in window && !Is, mh = Li && (!e0 || Is && 8 < Is && 11 >= Is), gh = " ", _h = false;
  function vh(e, t) {
    switch (e) {
      case "keyup":
        return Tp.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function xh(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
```

## keyboard — assets/index-DUMfhfOj.js L1581-1621 (hit L1596)
```js
    bh = t0 && (!document.documentMode || 9 < document.documentMode);
  }
  function jh() {
    Fs && (Fs.detachEvent("onpropertychange", Th), Xs = Fs = null);
  }
  function Th(e) {
    if (e.propertyName === "value" && O1(Xs)) {
      var t = [];
      Ch(t, Xs, e, Iu(e)), ch(Np, t);
    }
  }
  function Lp(e, t, i) {
    e === "focusin" ? (jh(), Fs = t, Xs = i, Fs.attachEvent("onpropertychange", Th)) : e === "focusout" && jh();
  }
  function Op(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return O1(Xs);
  }
  function kp(e, t) {
    if (e === "click") return O1(t);
  }
  function Dp(e, t) {
    if (e === "input" || e === "change") return O1(t);
  }
  function Hp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Cr = typeof Object.is == "function" ? Object.is : Hp;
  function Ws(e, t) {
    if (Cr(e, t)) return true;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
    var i = Object.keys(e), o = Object.keys(t);
    if (i.length !== o.length) return false;
    for (o = 0; o < i.length; o++) {
      var p = i[o];
      if (!Oe.call(t, p) || !Cr(e[p], t[p])) return false;
    }
    return true;
  }
  function Eh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
```

## wheel-step — assets/index-DUMfhfOj.js L5442-5454 (hit L5453)
```js
  function n4(e, t, i, o) {
    switch (T4(t)) {
      case 2:
        var p = Wm;
        break;
      case 8:
        p = $m;
        break;
      default:
        p = Z2;
    }
    i = p.bind(null, t, i, e), p = void 0, !Xu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (p = true), o ? p !== void 0 ? e.addEventListener(t, i, { capture: true, passive: p }) : e.addEventListener(t,
  }
```

## wheel-step — assets/index-DUMfhfOj.js L5527-5567 (hit L5542)
```js
            case "touchstart":
              ee = xp;
              break;
            case Oh:
            case kh:
            case Dh:
              ee = sp;
              break;
            case Hh:
              ee = Cp;
              break;
            case "scroll":
            case "scrollend":
              ee = np;
              break;
            case "wheel":
              ee = bp;
              break;
            case "copy":
            case "cut":
            case "paste":
              ee = cp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ee = ph;
              break;
            case "toggle":
            case "beforetoggle":
              ee = jp;
          }
          var He = (t & 4) !== 0, Tt = !He && (e === "scroll" || e === "scrollend"), G = He ? K !== null ? K + "Capture" : null : K;
          He = [];
          for (var P = Q, $; P !== null; ) {
            var se = P;
```

## page-transition — assets/index-DUMfhfOj.js L6237-6240 (hit L6239)
```js
  function Tm() {
    var e = window.event;
    return e && e.type === "popstate" ? e === L2 ? false : (L2 = e, true) : (L2 = null, false);
  }
```

## loader — assets/index-DUMfhfOj.js L6469-6484 (hit L6470)
```js
      if (!T) {
        var A = { loading: 0, preload: null };
        if (T = o.querySelector(Eo(x))) A.loading = 5;
        else {
          e = y({ rel: "stylesheet", href: e, "data-precedence": t }, i), (i = Wr.get(x)) && H2(e, i);
          var Z = T = o.createElement("link");
          ht(Z), Rn(Z, "link", e), Z._p = new Promise(function(Q, le) {
            Z.onload = Q, Z.onerror = le;
          }), Z.addEventListener("load", function() {
            A.loading |= 1;
          }), Z.addEventListener("error", function() {
            A.loading |= 2;
          }), A.loading |= 4, wc(T, t, o);
        }
        T = { type: "stylesheet", instance: T, count: 1, state: A }, p.set(x, T);
      }
```

## page-transition — assets/index-DUMfhfOj.js L6834-6874 (hit L6849)
```js
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (ot()) {
          case Ge:
```

## raf-lerp — assets/index-DUMfhfOj.js L7106-7146 (hit L7121)
```js
  advance(s23) {
    if (!this.isRunning) return;
    let n = false;
    if (this.duration && this.easing) {
      this.currentTime += s23;
      const a = y9(0, this.currentTime / this.duration, 1);
      n = a >= 1;
      const r = n ? 1 : this.easing(a);
      this.value = this.from + (this.to - this.from) * r;
    } else this.lerp ? (this.value = hg(this.value, this.to, this.lerp * 60, s23), Math.round(this.value) === this.to && (this.value = this.to, n = true)) : (this.value = this.to, n = true);
    n && this.stop(), this.onUpdate?.(this.value, n);
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(s23, n, { lerp: a, duration: r, easing: l, onStart: u, onUpdate: d }) {
    this.from = this.value = s23, this.to = n, this.lerp = a, this.duration = r, this.easing = l, this.currentTime = 0, this.isRunning = true, u?.(), this.onUpdate = d;
  }
};
function gg(s23, n) {
  let a;
  return function(...r) {
    let l = this;
    clearTimeout(a), a = setTimeout(() => {
      a = void 0, s23.apply(l, r);
    }, n);
  };
}
var _g = class {
  constructor(s23, n, { autoResize: a = true, debounce: r = 250 } = {}) {
    this.wrapper = s23, this.content = n, a && (this.debouncedResize = gg(this.resize, r), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = n
  }
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  destroy() {
    this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize, false);
```

## wheel-step — assets/index-DUMfhfOj.js L7191-7194 (hit L7193)
```js
  onTouchStart = (s23) => {
    const { clientX: n, clientY: a } = s23.targetTouches ? s23.targetTouches[0] : s23;
    this.touchStart.x = n, this.touchStart.y = a, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: s23 });
  };
```

## raf-lerp — assets/index-DUMfhfOj.js L7350-7392 (hit L7350)
```js
  scrollTo(s23, { offset: n = 0, immediate: a = false, lock: r = false, duration: l = this.options.duration, easing: u = this.options.easing, lerp: d = this.options.lerp, onStart: h, onComplete: _, force: g = false, prog
    if (!((this.isStopped || this.isLocked) && !g)) {
      if (typeof s23 == "string" && ["top", "left", "start"].includes(s23)) s23 = 0;
      else if (typeof s23 == "string" && ["bottom", "right", "end"].includes(s23)) s23 = this.limit;
      else {
        let m;
        if (typeof s23 == "string" ? m = document.querySelector(s23) : s23 instanceof HTMLElement && s23?.nodeType && (m = s23), m) {
          if (this.options.wrapper !== window) {
            const w = this.rootElement.getBoundingClientRect();
            n -= this.isHorizontal ? w.left : w.top;
          }
          const v = m.getBoundingClientRect();
          s23 = (this.isHorizontal ? v.left : v.top) + this.animatedScroll;
        }
      }
      if (typeof s23 == "number") {
        if (s23 += n, s23 = Math.round(s23), this.options.infinite) {
          if (y) {
            this.targetScroll = this.animatedScroll = this.scroll;
            const m = s23 - this.animatedScroll;
            m > this.limit / 2 ? s23 = s23 - this.limit : m < -this.limit / 2 && (s23 = s23 + this.limit);
          }
        } else s23 = y9(0, s23, this.limit);
        if (s23 === this.targetScroll) {
          h?.(this), _?.(this);
          return;
        }
        if (this.userData = f ?? {}, a) {
          this.animatedScroll = this.targetScroll = s23, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), _?.(this), this.userData = {}, requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          });
          return;
        }
        y || (this.targetScroll = s23), typeof l == "number" && typeof u != "function" ? u = P4 : typeof u == "function" && typeof l != "number" && (l = 1), this.animate.fromTo(this.animatedScroll, s23, { duration: l, ea
          r && (this.isLocked = true), this.isScrolling = "smooth", h?.(this);
        }, onUpdate: (m, v) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = m - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = m, this.setScroll(this.scroll), y && (th
            this.dispatchScrollendEvent();
          }), this.preventNextNativeScrollEvent());
        } });
      }
    }
  }
```

## observer — assets/index-DUMfhfOj.js L7647-7687 (hit L7662)
```js
  return (n - a._start) * a._ts + (a._ts >= 0 ? 0 : a._dirty ? a.totalDuration() : a._tDur);
}, Ou = function(n) {
  return n._end = cn(n._start + (n._tDur / Math.abs(n._ts || n._rts || Lt) || 0));
}, ku = function(n, a) {
  var r = n._dp;
  return r && r.smoothChildTiming && n._ts && (n._start = cn(r._time - (n._ts > 0 ? a / n._ts : ((n._dirty ? n.totalDuration() : n._tDur) - a) / -n._ts)), Ou(n), r._dirty || Cl(r, n)), n;
}, B9 = function(n, a) {
  var r;
  if ((a._time || !a._dur && a._initted || a._start < n._time && (a._dur || !a.add)) && (r = vu(n.rawTime(), a), (!a._dur || C1(0, a.totalDuration(), r) - a._tTime > Lt) && a.render(r, true)), Cl(n, a)._dp && n._initted 
    if (n._dur < n.duration()) for (r = n; r._dp; ) r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    n._zTime = -Lt;
  }
}, Ci = function(n, a, r, l) {
  return a.parent && Za(a), a._start = cn((Qi(r) ? r : r || n !== Yt ? Qr(n, r, a) : n._time) + a._delay), a._end = cn(a._start + (a.totalDuration() / Math.abs(a.timeScale()) || 0)), z9(n, a, "_first", "_last", n._sort ?
}, V9 = function(n, a) {
  return (Hr.ScrollTrigger || hd("scrollTrigger", a)) && Hr.ScrollTrigger.create(a, n);
}, Z9 = function(n, a, r, l, u) {
  if (xd(n, a, u), !n._initted) return 1;
  if (!r && n._pt && !Nn && (n._dur && n.vars.lazy !== false || !n._dur && n.vars.lazy) && L9 !== Lr.frame) return za.push(n), n._lazy = [u, l], 1;
}, Hg = function s3(n) {
  var a = n.parent;
  return a && a._ts && a._initted && !a._lock && (a.rawTime() < 0 || s3(a));
}, Df = function(n) {
  var a = n.data;
  return a === "isFromStart" || a === "isStart";
}, zg = function(n, a, r, l) {
  var u = n.ratio, d = a < 0 || !a && (!n._start && Hg(n) && !(!n._initted && Df(n)) || (n._ts < 0 || n._dp._ts < 0) && !Df(n)) ? 0 : 1, h = n._rDelay, _ = 0, g, y, f;
  if (h && n._repeat && (_ = C1(0, n._tDur, a), y = Os(_, h), n._yoyo && y & 1 && (d = 1 - d), y !== Os(n._tTime, h) && (u = 1 - d, n.vars.repeatRefresh && n._initted && n.invalidate())), d !== u || Nn || l || n._zTime =
    if (!n._initted && Z9(n, a, l, r, _)) return;
    for (f = n._zTime, n._zTime = a || (r ? Lt : 0), r || (r = a && !f), n.ratio = d, n._from && (d = 1 - d), n._time = 0, n._tTime = _, g = n._pt; g; ) g.r(d, g.d), g = g._next;
    a < 0 && kf(n, a, r, true), n._onUpdate && !r && kr(n, "onUpdate"), _ && n._repeat && !r && n.parent && kr(n, "onRepeat"), (a >= n._tDur || a < 0) && n.ratio === d && (d && Za(n, 1), !r && !Nn && (kr(n, d ? "onComple
  } else n._zTime || (n._zTime = a);
}, Bg = function(n, a, r) {
  var l;
  if (r > a) for (l = n._first; l && l._start <= r; ) {
    if (l.data === "isPause" && l._start > a) return l;
    l = l._next;
  }
  else for (l = n._last; l && l._start >= r; ) {
    if (l.data === "isPause" && l._start < a) return l;
    l = l._prev;
```

## reveal-timeline — assets/index-DUMfhfOj.js L8110-8150 (hit L8125)
```js
    return r === void 0 && (r = {}), u = s23.call(this, r) || this, u.labels = {}, u.smoothChildTiming = !!r.smoothChildTiming, u.autoRemoveChildren = !!r.autoRemoveChildren, u._sort = fr(r.sortChildren), Yt && Ci(r.pare
  }
  var a = n.prototype;
  return a.to = function(l, u, d) {
    return Qo(0, arguments, this), this;
  }, a.from = function(l, u, d) {
    return Qo(1, arguments, this), this;
  }, a.fromTo = function(l, u, d, h) {
    return Qo(2, arguments, this), this;
  }, a.set = function(l, u, d) {
    return u.duration = 0, u.parent = this, $o(u).repeatDelay || (u.repeat = 0), u.immediateRender = !!u.immediateRender, new on(l, u, Qr(this, d), 1), this;
  }, a.call = function(l, u, d) {
    return Ci(this, on.delayedCall(0, l, u), d);
  }, a.staggerTo = function(l, u, d, h, _, g, y) {
    return d.duration = u, d.stagger = d.stagger || h, d.onComplete = g, d.onCompleteParams = y, d.parent = this, new on(l, d, Qr(this, _)), this;
  }, a.staggerFrom = function(l, u, d, h, _, g, y) {
    return d.runBackwards = 1, $o(d).immediateRender = fr(d.immediateRender), this.staggerTo(l, u, d, h, _, g, y);
  }, a.staggerFromTo = function(l, u, d, h, _, g, y, f) {
    return h.startAt = d, $o(h).immediateRender = fr(h.immediateRender), this.staggerTo(l, u, h, _, g, y, f);
  }, a.render = function(l, u, d) {
    var h = this._time, _ = this._dirty ? this.totalDuration() : this._tDur, g = this._dur, y = l <= 0 ? 0 : cn(l), f = this._zTime < 0 != l < 0 && (this._initted || !g), m, v, w, b, S, j, M, R, k, N, O, L;
    if (this !== Yt && y > _ && l >= 0 && (y = _), y !== this._tTime || d || f) {
      if (h !== this._time && g && (y += this._time - h, l += this._time - h), m = y, k = this._start, R = this._ts, j = !R, f && (g || (h = this._zTime), (l || !u) && (this._zTime = l)), this._repeat) {
        if (O = this._yoyo, S = g + this._rDelay, this._repeat < -1 && l < 0) return this.totalTime(S * 100 + l, u, d);
        if (m = cn(y % S), y === _ ? (b = this._repeat, m = g) : (N = cn(y / S), b = ~~N, b && b === N && (m = g, b--), m > g && (m = g)), N = Os(this._tTime, S), !h && this._tTime && N !== b && this._tTime - N * S - thi
          var z = O && N & 1, D = z === (O && b & 1);
          if (b < N && (z = !z), h = z ? 0 : y % g ? g : y, this._lock = 1, this.render(h || (L ? 0 : cn(b * S)), u, !g)._lock = 0, this._tTime = y, !u && this.parent && kr(this, "onRepeat"), this.vars.repeatRefresh && !
          if (g = this._dur, _ = this._tDur, D && (this._lock = 2, h = z ? g : -1e-4, this.render(h, true), this.vars.repeatRefresh && !L && this.invalidate()), this._lock = 0, !this._ts && !j) return this;
          e8(this, L);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (M = Bg(this, cn(h), cn(m)), M && (y -= m - (m = M._start))), this._tTime = y, this._time = m, this._act = !R, this._initted || (this._onUpdate = this.vars.
      if (m >= h && l >= 0) for (v = this._first; v; ) {
        if (w = v._next, (v._act || m >= v._start) && v._ts && M !== v) {
          if (v.parent !== this) return this.render(l, u, d);
          if (v.render(v._ts > 0 ? (m - v._start) * v._ts : (v._dirty ? v.totalDuration() : v._tDur) + (m - v._start) * v._ts, u, d), m !== this._time || !this._ts && !j) {
            M = 0, w && (y += this._zTime = -Lt);
            break;
          }
        }
        v = w;
```

## reveal-timeline — assets/index-DUMfhfOj.js L9059-9093 (hit L9067)
```js
}, X_ = ({ onComplete: s23, onMidway: n }) => {
  const { progress: a, isComplete: r } = F_(), l = C.useRef(null), u = C.useRef(null), d = C.useRef(null), h = C.useRef(null), _ = C.useRef({ value: 0 }), [g, y] = C.useState(window.innerWidth < 1201);
  C.useEffect(() => {
    const m = () => {
      y(window.innerWidth < 1201);
    };
    return window.addEventListener("resize", m), () => window.removeEventListener("resize", m);
  }, []), Ve(() => {
    re.from(".mobile-info .mobile-word", { yPercent: 120, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.06 }), re.from(".bottom-info .bottom-word", { yPercent: 120, opacity: 0, duration: 0.6, ease: "power2.ou
  }, []), Ve(() => {
    const m = () => {
      re.set("#preloader", { display: "none" }), s23 && s23();
    }, v = re.timeline({ paused: true, onComplete: m });
    v.to(".preloader-box", { width: "100%", height: "100%", borderRadius: 0, duration: 2, ease: "expo.inOut" }, "+=0"), d.current = v;
    const w = re.timeline({ paused: true, onComplete: () => {
      d.current.resume(), n();
    } });
    w.to(h.current, { yPercent: -205, duration: 0.6, ease: "power2.in" }), w.set(h.current, { display: "none" }), w.from(".quote-text.top .word-anim", { yPercent: 155, duration: 0.8, ease: "power2.out", stagger: 0.03 }, 
    const b = re.timeline();
    let S, j;
    return g ? (S = Math.min(356, window.innerWidth * 0.8), window.innerHeight < 400 ? j = 60 : j = 200) : (j = 200, S = 200 * (window.innerWidth / window.innerHeight)), b.to(".preloader-box", { height: j, width: S, rota
      l.current?.kill(), u.current?.kill(), d.current?.kill();
    };
  }, [g]), C.useEffect(() => {
    re.to(_.current, { value: a, duration: 0.5, ease: "power2.out", onUpdate: () => {
      h.current && (h.current.textContent = Math.round(_.current.value) + "%");
    }, onComplete: () => {
      r && _.current.value >= 99.5 && (l.current?.isActive() ? l.current.eventCallback("onComplete", () => {
        u.current?.resume();
      }) : u.current?.resume());
    } });
  }, [a, r]);
  const f = { display: "inline-block" };
  return c.jsxs("div", { id: "preloader", children: [c.jsxs("div", { className: "mobile-info", children: [c.jsx("span", { className: "mobile-word", style: f, children: "Best" }), " ", c.jsx("span", { className: "mobile-w
}, W_ = "_navLink_yjvxf_1", $_ = "_navLinkFooter_yjvxf_21", Q_ = "_large_yjvxf_44", K_ = "_active_yjvxf_55", J_ = "_bracket_yjvxf_69", Ra = { navLink: W_, navLinkFooter: $_, large: Q_, active: K_, bracket: J_ };
```

## audio — assets/index-DUMfhfOj.js L9216-9223 (hit L9219)
```js
      var a = new n(), r = function(f) {
        var m = this;
        if (!f.src || f.src.length === 0) {
          console.error("An array of source files must be passed with any new Howl.");
          return;
        }
        m.init(f);
      };
```

## audio — assets/index-DUMfhfOj.js L9382-9399 (hit L9385)
```js
      }, fade: function(f, m, v, w) {
        var b = this;
        if (b._state !== "loaded" || b._playLock) return b._queue.push({ event: "fade", action: function() {
          b.fade(f, m, v, w);
        } }), b;
        f = Math.min(Math.max(0, parseFloat(f)), 1), m = Math.min(Math.max(0, parseFloat(m)), 1), v = parseFloat(v), b.volume(f, w);
        for (var S = b._getSoundIds(w), j = 0; j < S.length; j++) {
          var M = b._soundById(S[j]);
          if (M) {
            if (w || b._stopFade(S[j]), b._webAudio && !M._muted) {
              var R = a.ctx.currentTime, k = R + v / 1e3;
              M._volume = f, M._node.gain.setValueAtTime(f, R), M._node.gain.linearRampToValueAtTime(m, k);
            }
            b._startFadeInterval(M, f, m, v, S[j], typeof w > "u");
          }
        }
        return b;
      }, _startFadeInterval: function(f, m, v, w, b, S) {
```

## audio — assets/index-DUMfhfOj.js L9642-9655 (hit L9644)
```js
        if (a.usingWebAudio) {
          try {
            typeof AudioContext < "u" ? a.ctx = new AudioContext() : typeof webkitAudioContext < "u" ? a.ctx = new webkitAudioContext() : a.usingWebAudio = false;
          } catch {
            a.usingWebAudio = false;
          }
          a.ctx || (a.usingWebAudio = false);
          var f = /iP(hone|od|ad)/.test(a._navigator && a._navigator.platform), m = a._navigator && a._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), v = m ? parseInt(m[1], 10) : null;
          if (f && v && v < 9) {
            var w = /safari/.test(a._navigator && a._navigator.userAgent.toLowerCase());
            a._navigator && !w && (a.usingWebAudio = false);
          }
          a.usingWebAudio && (a.masterGain = typeof a.ctx.createGain > "u" ? a.ctx.createGainNode() : a.ctx.createGain(), a.masterGain.gain.setValueAtTime(a._muted ? 0 : a._volume, a.ctx.currentTime), a.masterGain.connec
        }
```

## reveal-timeline — assets/index-DUMfhfOj.js L10787-10797 (hit L10792)
```js
  Ve(() => {
    const d = re.utils.toArray("path", n.current);
    r.current = d.sort((h, _) => {
      const g = h.getBoundingClientRect().y, y = _.getBoundingClientRect().y;
      return g - y;
    }), a.current = re.timeline({ paused: true, onStart: () => {
      re.set(n.current, { display: "flex" });
    }, onReverseComplete: () => {
      re.set(n.current, { display: "none" });
    } }), a.current.fromTo(n.current, { width: 0 }, { width: "36px", duration: 0.3, ease: "power2.inOut" }).fromTo(r.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.04, delay: 0.3 }, 
  }, { scope: n }), Ve(() => {
```

## text-split — assets/index-DUMfhfOj.js L10817-10831 (hit L10818)
```js
}, Jx = (s23) => c.jsxs("svg", { width: "30", height: "42", viewBox: "0 0 30 42", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...s23, children: [c.jsx("rect", { x: "6", width: "6", height: "6", rx: "2", fill: "#12
  const r = C.useRef(), l = C.useRef([]), u = String(s23), d = u.startsWith("+"), _ = (d ? u.slice(1) : u).split("").map((g) => parseInt(g, 10));
  return Ve(() => {
    if (n) {
      const g = re.utils.toArray("rect", r.current);
      l.current = g.sort((y, f) => {
        const m = y.getBoundingClientRect().y, v = f.getBoundingClientRect().y;
        return m - v;
      }), re.to(l.current, { opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08, delay: a });
    }
  }, { scope: r, dependencies: [n] }), c.jsxs("div", { ref: r, style: { display: "flex", gap: "7px" }, children: [d && c.jsx(cy, {}), _.map((g, y) => {
    const f = uy[g];
    return f ? c.jsx(f, {}, y) : null;
  })] });
}, fy = 30, dy = 6, gf = 0.18;
```

## raf-lerp — assets/index-DUMfhfOj.js L10858-10870 (hit L10864)
```js
    const f = () => {
      const m = u.current, v = r.current;
      if (!v || !v.length) {
        a.current = null;
        return;
      }
      m.currX += (m.targX - m.currX) * gf, m.currY += (m.targY - m.currY) * gf, m.currStrength += (m.targStrength - m.currStrength) * gf, v.forEach((b) => {
        const S = b.getBoundingClientRect(), j = S.left + S.width / 2, M = S.top + S.height / 2, R = Math.abs(j - m.currX) + Math.abs(M - m.currY), k = Math.min(R / fy, 1);
        b.style.opacity = String((1 - m.currStrength * k * 0.7).toFixed(3));
      }), Math.abs(m.targStrength - m.currStrength) < 2e-3 && Math.abs(m.targX - m.currX) < 0.5 && Math.abs(m.targY - m.currY) < 0.5 ? (m.currStrength = m.targStrength, m.currX = m.targX, m.currY = m.targY, a.current = n
        b.style.opacity = "1";
      })) : a.current = requestAnimationFrame(f);
    };
```

## pointer — assets/index-DUMfhfOj.js L10977-10991 (hit L10990)
```js
  }, [d, s23, fe, Ee, rt]), C.useEffect(() => {
    if (!_.current || !g.current) return;
    const ye = [{ ref: _, maxMove: 0.6 }, { ref: g, maxMove: 1.2 }], ke = (Ie) => {
      const Te = Ie.getBoundingClientRect();
      return { x: Te.left + Te.width / 2, y: Te.top + Te.height / 2 };
    }, je = (Ie) => {
      de.current && ye.forEach(({ ref: Te, maxMove: Me }) => {
        const Ye = Te.current;
        if (!Ye) return;
        const bt = ke(Ye), mn = Ie.clientX - bt.x, dt = Ie.clientY - bt.y, On = Math.sqrt(mn * mn + dt * dt), Wt = Math.min(On, Me * 20) / (Me * 20), Sn = mn / On * Wt * Me, nr = dt / On * Wt * Me;
        re.to(Ye, { x: isNaN(Sn) ? 0 : Sn, y: isNaN(nr) ? 0 : nr, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      });
    };
    return window.addEventListener("mousemove", je), () => window.removeEventListener("mousemove", je);
  }, []), Ve(() => {
```

## observer — assets/index-DUMfhfOj.js L11048-11052 (hit L11050)
```js
  }, []), Ve(() => {
    if (!w.current || !b.current) return;
    const ye = re.to(w.current, { y: 60, ease: "none", scrollTrigger: { trigger: b.current, start: "top top", end: "bottom top", scrub: 1 } });
    return () => ye.kill();
  }, []), C.useEffect(() => {
```

## observer — assets/index-DUMfhfOj.js L11052-11059 (hit L11055)
```js
  }, []), C.useEffect(() => {
    const ye = b.current;
    if (!ye) return;
    const ke = new IntersectionObserver(([je]) => {
      ve.current = je.isIntersecting, je.isIntersecting ? (he.current?.resume(), Ce.current?.resume(), ne.current || pe.current?.resume(), Oe.current && (Oe.current(), Oe.current = null)) : (he.current?.pause(), Ce.curre
    }, { threshold: 0 });
    return ke.observe(ye), () => ke.disconnect();
  }, []), c.jsxs("div", { style: { width: "576px", position: "relative", height: "511px" }, children: [c.jsxs("div", { className: Ft["hero-text"], children: [c.jsxs("div", { className: Ft["wrapper-top"], children: [c.jsx
```

## page-transition — assets/index-DUMfhfOj.js L13572-13633 (hit L13600)
```js
function BT() {
  const n = zT(), [a, r] = C.useState(false), [l, u] = C.useState(false), [d, h] = C.useState("landing"), [_, g] = C.useState(false), [y, f] = C.useState("out"), [m, v] = C.useState(null), [w, b] = C.useState(null), [S, 
  C.useEffect(() => {
    let B = window.innerWidth, V = null;
    const I = () => {
      clearTimeout(V), V = setTimeout(() => {
        window.innerWidth !== B && window.location.reload();
      }, 300);
    };
    return window.addEventListener("resize", I), () => {
      window.removeEventListener("resize", I), clearTimeout(V);
    };
  }, []), C.useEffect(() => {
    "scrollRestoration" in window.history && (window.history.scrollRestoration = "manual");
  }, []), C.useEffect(() => {
    const B = document.title, V = "Observation paused.", I = () => {
      document.title = document.hidden ? V : B;
    };
    return document.addEventListener("visibilitychange", I), () => document.removeEventListener("visibilitychange", I);
  }, []);
  const O = C.useCallback(() => {
    const B = k.current?.lenis;
    y === "in" ? h("project") : y === "modifier_in" ? h("modifier_deck") : y === "loop" ? (v(w), h("project"), j(true), window.scrollTo(0, 0), B?.scrollTo(0, { immediate: true })) : h("landing");
  }, [y, w]), L = C.useCallback(() => {
    g(false), j(false);
  }, []), z = (B) => {
    if (!N.current) {
      const V = B.name.toLowerCase().replace(/\s/g, "_");
      window.history.pushState({ view: "project", name: B.name }, "", `#${V}`);
    }
    v(B.name), f("in"), g(true);
  }, D = C.useCallback(() => {
    N.current || window.history.pushState({ view: "modifier_deck" }, "", "#modifier-deck"), f("modifier_in"), g(true);
  }, []), H = (B) => {
    if (!N.current) {
      const V = B.name.toLowerCase().replace(/\s/g, "_");
      window.history.pushState({ view: "project", name: B.name }, "", `#${V}`);
    }
    b(B.name), f("loop"), g(true);
  }, Y = C.useCallback(() => {
    N.current || window.history.pushState({ view: "landing" }, "", window.location.pathname.split("#")[0]), f("out"), g(true), R(d);
  }, [d]), [U, X] = C.useState(null), ie = C.useCallback((B) => {
    X(B), Y();
  }, [Y]), te = C.useCallback(() => {
    u(true);
  }, []);
  return C.useEffect(() => {
    window.history.state || window.history.replaceState({ view: "landing" }, "", window.location.pathname);
    const B = (V) => {
      const I = V.state;
      if (N.current = true, !I || I.view === "landing") d !== "landing" && Y();
      else if (I.view === "project") {
        const ae = { name: I.name };
        d === "landing" || d === "modifier_deck" ? z(ae) : d === "project" && m !== I.name && H(ae);
      } else I.view === "modifier_deck" && d !== "modifier_deck" && D();
      setTimeout(() => {
        N.current = false;
      }, 0);
    };
    return window.addEventListener("popstate", B), () => window.removeEventListener("popstate", B);
  }, [d, m, w, Y, D]), c.jsxs(c.Fragment, { children: [!l && c.jsx(X_, { onComplete: te, onMidway: () => r(true) }), c.jsxs(wg, { ref: k, root: true, options: { autoRaf: true, ...n }, children: [_ && c.jsx(HT, { directio
}
```