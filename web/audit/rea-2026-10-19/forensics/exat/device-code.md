# exat — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: text-split×3, reveal-timeline×3, observer×3, raf-lerp×1, pointer×3, keyboard×3, wheel-step×3, loader×3

## text-split — plugins/SplitText.min.js L105-111 (hit L111)
```js
  }, r.revert = function revert() {
    var e2 = this._originals;
    if (!e2) throw "revert() call wasn't scoped properly.";
    return this.elements.forEach(function(D2, u2) {
      D2.innerHTML = e2[u2].html, D2.setAttribute("style", e2[u2].style || "");
    }), this.chars = [], this.words = [], this.lines = [], this.isSplit = false, this;
  }, SplitText.create = function create(D2, u2) {
```

## text-split — plugins/SplitText.min.js L97-124 (hit L112)
```js
      return u2.absolute = s2, void (D2._isSplit = true);
    }
    z(D2, u2, e2, t2);
  }
  var X, e, F, C, i, E, r, _ = /(?:\r|\n|\t\t)/g, S = /(?:\s\s+)/g, T = String.fromCharCode(160), l = ((r = SplitText.prototype).split = function split(D2) {
    this.isSplit && this.revert(), this.vars = D2 = D2 || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
    for (var u2, e2, t2, F2 = this.elements.length, C2 = D2.tag ? D2.tag : D2.span ? "span" : "div", i2 = s(D2.wordsClass, C2), n2 = s(D2.charsClass, C2); -1 < --F2; ) t2 = this.elements[F2], this._originals[F2] = { html
    return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = true, this;
  }, r.revert = function revert() {
    var e2 = this._originals;
    if (!e2) throw "revert() call wasn't scoped properly.";
    return this.elements.forEach(function(D2, u2) {
      D2.innerHTML = e2[u2].html, D2.setAttribute("style", e2[u2].style || "");
    }), this.chars = [], this.words = [], this.lines = [], this.isSplit = false, this;
  }, SplitText.create = function create(D2, u2) {
    return new SplitText(D2, u2);
  }, SplitText);
  function SplitText(D2, u2) {
    F || n(), this.elements = E(D2), this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = u2 || {}, i(this), this.split(u2);
  }
  l.version = "3.12.7", l.register = n, D.SplitText = l, D.default = l;
  if (typeof window === "undefined" || window !== D) {
    Object.defineProperty(D, "__esModule", { value: true });
  } else {
    delete D.default;
  }
});

```

## reveal-timeline — about_section/script.min.js?ver=23.04 L1-5 (hit L3)
```js
window.R2Methods.typeDemo = function(e) {
  const o = e, t = o.querySelectorAll(".media");
  gsap.fromTo(t[1], { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", ease: "none", paused: true, scrollTrigger: { trigger: o.querySelector(".media-
  window.scrollTriggers && window.scrollTriggers.push(ScrollTrigger);
}, window.R2Methods.aboutBigTitle = function(e) {
```

## text-split — about_section/script.min.js?ver=23.04 L7-14 (hit L7)
```js
  new SplitText(o, { type: "lines", linesClass: "lines" }).lines.forEach((function(e2) {
    let o2;
    ScrollTrigger.create({ trigger: e2, start: "50% 80%", end: "50% 80%", onEnter: function() {
      o2?.kill(), o2 = gsap.to(e2, { rotateX: -360, duration: 1, ease: "back.out" });
    }, onEnterBack: function() {
      o2?.kill(), o2 = gsap.to(e2, { rotateX: 0, duration: 1, ease: "back.out" });
    } });
  }));
```

## observer — break_section/script.min.js?ver=23.04 L1-28 (hit L19)
```js
window.R2Methods.numbersControl = function(e) {
  const t = e, n = t.querySelectorAll(".number");
  let o = false;
  let l = 0, r = null, s = [], i = [], a = performance.now();
  for (let e2 = n.length - 1; e2 >= 0; e2--) {
    const t2 = 3.5 - 0.6 * e2;
    s[e2] = t2, i[e2] = t2;
  }
  function d() {
    if (o) {
      const e2 = performance.now(), t2 = (e2 - a) / 16.67;
      a = e2, r && e2 - l > 16 && (processMouseMove(r), r = null, l = e2);
      for (let e3 = n.length - 1; e3 >= 0; e3--) s[e3] += (i[e3] - s[e3]) * (0.1 * t2), n[e3].style.transform = `translateY(${55 * Math.sin(s[e3])}%)`;
      requestAnimationFrame(d);
    }
  }
  window.addEventListener("scroll", (function() {
    if (o) for (let e2 = s.length - 1; e2 >= 0; e2--) i[e2] += 0.05;
  })), ScrollTrigger.create({ trigger: t, pin: false, onEnter: () => {
    a = performance.now(), o = true, d();
  }, onEnterBack: () => {
    a = performance.now(), o = true, d();
  }, onLeave: () => {
    o = false;
  }, onLeaveBack: () => {
    o = false;
  } }), d(), window.scrollTriggers && window.scrollTriggers.push(ScrollTrigger);
}, window.R2Methods.breakExatAnimaiton = function(e) {
```

## reveal-timeline — scripts/index.min.js L1-7 (hit L5)
```js
function revealTitles() {
  document.querySelectorAll("[reveal-title]").forEach((function(e) {
    const t = new SplitText(e, { type: "lines, words", linesClass: "split-lines", wordsClass: "split-words" });
    let o = window.innerWidth <= 768 ? "play none none none" : e.dataset.toggleActions;
    e.anim = gsap.from(t.words, { y: "-250%", skewY: "-5deg", ease: "expo.out", stagger: e.dataset.stagger || 0.1, duration: 1, paused: true, scrollTrigger: { trigger: e, start: "top 90%", toggleActions: o || "play none 
  })), console.log("Reveal update");
}
```

## raf-lerp — scripts/index.min.js L23-27 (hit L24)
```js
function initAll() {
  R2Dom(), RevealsInit(), videosControl(), menuControl(), menuHoverAnimation(), footerControl(), initHeaderAnchors(), isMobile || (lenis = new Lenis({ duration: 0.9, lerp: 0.2, easing: (e) => 1 - Math.pow(1 - e, 6) }), g
    lenis.raf(1e3 * e);
  }))), document.body.classList.add("loaded");
}
```

## observer — scripts/index.min.js L49-67 (hit L50)
```js
  document.querySelectorAll("video[autoplay]").forEach((function(e) {
    e.autoplay = false, ScrollTrigger.create({ trigger: e, onEnter: function() {
      let t = e.play();
      null != t && t.then((() => {
      })).catch(((e2) => {
        console.log(e2);
      }));
    }, onEnterBack: function() {
      let t = e.play();
      null != t && t.then((() => {
      })).catch(((e2) => {
        console.log(e2);
      }));
    }, onLeave: function() {
      e.pause();
    }, onLeaveBack: function() {
      e.pause();
    } });
  }));
```

## reveal-timeline — scripts/index.min.js L81-84 (hit L83)
```js
function footerControl() {
  const e = document.querySelector(".page-footer").querySelector(".title.main-title span:first-child"), t = new SplitText(e, { type: "chars" });
  gsap.fromTo(t.chars, { y: window.innerWidth <= 768 ? "-25%" : "-105%", opacity: window.innerWidth <= 768 ? 0 : 1 }, { y: "0", opacity: 1, duration: 1, stagger: window.innerWidth <= 768 ? 0.15 : 0.1, ease: "power1.inOut
}
```

## pointer — scripts/index.min.js L132-179 (hit L155)
```js
}, window.R2Methods.rotatingPieces = function(e) {
  const t = e, o = t.querySelectorAll(".rotator");
  let n = false;
  const i = window.innerWidth < 768, l = "true" == t.dataset.auto;
  let r, s = new Array(o.length).fill(0), a = new Array(o.length).fill(0), c = 0, d = null, u = true, w = { x: 0, y: 0 };
  function p(e2) {
    for (let t2 = 0; t2 < o.length; t2++) {
      const n2 = o[t2].getBoundingClientRect(), i2 = n2.left + n2.width / 2, l2 = n2.top + n2.height / 2, r2 = e2.clientX - i2, a2 = e2.clientY - l2;
      w.x = e2.clientX, w.y = e2.clientY;
      let c2 = Math.atan2(a2, r2) * (180 / Math.PI) + 90;
      s[t2] = g(s[t2], c2);
    }
  }
  function g(e2, t2) {
    for (; t2 - e2 > 180; ) t2 -= 360;
    for (; t2 - e2 < -180; ) t2 += 360;
    return t2;
  }
  function m() {
    const e2 = performance.now();
    if (d && e2 - c > 16 && (p(d), d = null, c = e2), !l) for (let e3 = 0; e3 < o.length; e3++) a[e3] += 0.1 * (s[e3] - a[e3]), o[e3].style.transform = `rotate(${a[e3]}deg)`;
    n && requestAnimationFrame(m);
  }
  i || window.addEventListener("mousemove", ((e2) => {
    d = e2, u = false, clearTimeout(r), r = setInterval((() => {
      u = true;
    }), 500);
  })), l ? o.forEach(((e2, t2) => {
    gsap.fromTo(e2, { rotate: 0 + 5 * t2 }, { rotate: 360 + 5 * t2, duration: 6, ease: "none", repeat: -1 });
  })) : window.addEventListener("scroll", /* @__PURE__ */ (function(e2, t2) {
    let o2, n2;
    return function(...i2) {
      n2 ? (clearTimeout(o2), o2 = setTimeout((() => {
        Date.now() - n2 >= t2 && (e2.apply(this, i2), n2 = Date.now());
      }), t2 - (Date.now() - n2))) : (e2.apply(this, i2), n2 = Date.now());
    };
  })((() => {
    u && p({ bubbles: true, cancelable: true, clientX: i ? window.innerWidth / 2 : w.x, clientY: i ? window.innerHeight / 2 : w.y });
  }), 16.67)), m(), ScrollTrigger.create({ trigger: t, pin: false, start: "top bottom", end: "bottom top", onEnter: () => {
    n = true, m();
  }, onEnterBack: () => {
    n = true, m();
  }, onLeave: () => {
    n = false;
  }, onLeaveBack: () => {
    n = false;
  } }), window.scrollTriggers && window.scrollTriggers.push(ScrollTrigger);
}, window.R2Methods.selectInit = function(e) {
```

## keyboard — plugins/splide.min.js L288-322 (hit L313)
```js
  function Rt(o2, r3, t3, u2) {
    var e2, n3 = Q(o2), i2 = n3.on, c2 = n3.emit, f2 = n3.bind, a2 = o2.Components, s2 = o2.root, l2 = o2.options, d2 = l2.isNavigation, v2 = l2.updateOnMove, h2 = l2.i18n, p2 = l2.pagination, g2 = l2.slideFocus, m2 = a2
    function k2() {
      var n4 = o2.splides.map(function(n5) {
        n5 = n5.splide.Components.Slides.getAt(r3);
        return n5 ? n5.slide.id : "";
      }).join(" ");
      I(u2, nn, On(h2.slideX, (w2 ? t3 : r3) + 1)), I(u2, Kn, n4), I(u2, Z, g2 ? "button" : ""), g2 && P(u2, tt);
    }
    function S2() {
      e2 || E2();
    }
    function E2() {
      var n4, t4, i3;
      e2 || (n4 = o2.index, (i3 = L2()) !== vn(u2, tn) && (A(u2, tn, i3), I(u2, Vn, d2 && i3 || ""), c2(i3 ? Pn : In, O2)), i3 = (function() {
        if (o2.is(It)) return L2();
        var n5 = N(a2.Elements.track), t5 = N(u2), i4 = m2("left", true), r4 = m2("right", true);
        return xn(n5[i4]) <= kn(t5[i4]) && xn(t5[r4]) <= kn(n5[r4]);
      })(), t4 = !i3 && (!L2() || w2), o2.state.is([G, rn]) || I(u2, $n, t4 || ""), I(gn(u2, l2.focusableNodes || ""), $, t4 ? -1 : ""), g2 && I(u2, $, t4 ? -1 : 0), i3 !== vn(u2, St) && (A(u2, St, i3), c2(i3 ? Rn : Cn, 
    }
    function L2() {
      var n4 = o2.index;
      return n4 === r3 || l2.cloneStatus && n4 === t3;
    }
    var O2 = { index: r3, slideIndex: t3, slide: u2, container: x2, isClone: w2, mount: function() {
      w2 || (u2.id = s2.id + "-slide" + An(r3 + 1), I(u2, Z, p2 ? "tabpanel" : "group"), I(u2, tt, h2.slide), I(u2, nn, b2 || On(h2.slideLabel, [r3 + 1, o2.length]))), f2(u2, "click", R(c2, Mn, O2)), f2(u2, "keydown", R(
    }, destroy: function() {
      e2 = true, n3.destroy(), X(u2, At), P(u2, ut), I(u2, "style", y2), I(u2, nn, b2 || "");
    }, update: E2, style: function(n4, t4, i3) {
      _(i3 && x2 || u2, n4, t4);
    }, isWithin: function(n4, t4) {
      return n4 = U(n4 - r3), (n4 = w2 || !l2.rewind && !o2.is(Pt) ? n4 : Y(n4, o2.length - n4)) <= t4;
    } };
    return O2;
  }
```

## keyboard — plugins/splide.min.js L314-354 (hit L329)
```js
    }, destroy: function() {
      e2 = true, n3.destroy(), X(u2, At), P(u2, ut), I(u2, "style", y2), I(u2, nn, b2 || "");
    }, update: E2, style: function(n4, t4, i3) {
      _(i3 && x2 || u2, n4, t4);
    }, isWithin: function(n4, t4) {
      return n4 = U(n4 - r3), (n4 = w2 || !l2.rewind && !o2.is(Pt) ? n4 : Y(n4, o2.length - n4)) <= t4;
    } };
    return O2;
  }
  var Ct = f + "-interval";
  var jt = { passive: false, capture: true };
  var Nt = { Spacebar: " ", Right: Hn, Left: Bn, Up: t2, Down: n2 };
  function Tt(n3) {
    return n3 = C(n3) ? n3 : n3.key, Nt[n3] || n3;
  }
  var Gt = "keydown";
  var Ft = f + "-lazy", Xt = Ft + "-srcset", Wt = "[" + Ft + "], [" + Xt + "]";
  var Yt = [" ", "Enter"];
  var Ut = Object.freeze({ __proto__: null, Media: function(r3, n3, o2) {
    var u2 = r3.state, t3 = o2.breakpoints || {}, e2 = o2.reducedMotion || {}, i2 = zn(), c2 = [];
    function f2(n4) {
      n4 && i2.destroy();
    }
    function a2(n4, t4) {
      t4 = matchMedia(t4);
      i2.bind(t4, "change", s2), c2.push([n4, t4]);
    }
    function s2() {
      var n4 = u2.is(7), t4 = o2.direction, i3 = c2.reduce(function(n5, t5) {
        return d(n5, t5[1].matches ? t5[0] : {});
      }, {});
      sn(o2), l2(i3), o2.destroy ? r3.destroy("completely" === o2.destroy) : n4 ? (f2(true), r3.mount()) : t4 !== o2.direction && r3.refresh();
    }
    function l2(n4, t4, i3) {
      d(o2, n4), t4 && d(Object.getPrototypeOf(o2), n4), !i3 && u2.is(1) || r3.emit(K, o2);
    }
    return { setup: function() {
      var i3 = "min" === o2.mediaQuery;
      E(t3).sort(function(n4, t4) {
        return i3 ? +n4 - +t4 : +t4 - +n4;
      }).forEach(function(n4) {
```

## keyboard — plugins/splide.min.js L370-406 (hit L401)
```js
  }, Elements: function(n3, t3, i2) {
    var r3, o2, u2, e2 = Q(n3), c2 = e2.on, f2 = e2.bind, a2 = n3.root, s2 = i2.i18n, l2 = {}, d2 = [], v2 = [], h2 = [];
    function p2() {
      r3 = y2("." + ct), o2 = fn(r3, "." + ft), bn(r3 && o2, "A track/list element is missing."), k(d2, S(o2, "." + at + ":not(." + st + ")")), w({ arrows: dt, pagination: gt, prev: ht, next: pt, bar: yt, toggle: bt }, f
        l2[t5] = y2("." + n5);
      }), an(l2, { root: a2, track: r3, list: o2, slides: d2 });
      var n4 = a2.id || (function(n5) {
        return "" + n5 + An(_n[n5] = (_n[n5] || 0) + 1);
      })(yn), t4 = i2.role;
      a2.id = n4, r3.id = r3.id || n4 + "-track", o2.id = o2.id || n4 + "-list", !z(a2, Z) && "SECTION" !== a2.tagName && t4 && I(a2, Z, t4), I(a2, tt, s2.carousel), I(o2, Z, "presentation"), m2();
    }
    function g2(n4) {
      var t4 = ut.concat("style");
      D(d2), X(a2, v2), X(r3, h2), P([r3, o2], t4), P(a2, n4 ? t4 : ["style", tt]);
    }
    function m2() {
      X(a2, v2), X(r3, h2), v2 = b2(et), h2 = b2(ct), M(a2, v2), M(r3, h2), I(a2, nn, i2.label), I(a2, Zn, i2.labelledby);
    }
    function y2(n4) {
      n4 = pn(a2, n4);
      return n4 && (function(n5, t4) {
        if (x(n5.closest)) return n5.closest(t4);
        for (var i3 = n5; i3 && 1 === i3.nodeType && !cn(i3, t4); ) i3 = i3.parentElement;
        return i3;
      })(n4, "." + et) === a2 ? n4 : void 0;
    }
    function b2(n4) {
      return [n4 + "--" + i2.type, n4 + "--" + i2.direction, i2.drag && n4 + "--draggable", i2.isNavigation && n4 + "--nav", n4 === et && tn];
    }
    return an(l2, { setup: p2, mount: function() {
      c2(J, g2), c2(J, p2), c2(K, m2), f2(document, _t + " keydown", function(n4) {
        u2 = "keydown" === n4.type;
      }, { capture: true }), f2(a2, "focusin", function() {
        A(a2, Lt, !!u2);
      });
    }, destroy: g2 });
  }, Slides: function(r3, o2, u2) {
```

## wheel-step — plugins/splide.min.js L947-956 (hit L951)
```js
  }, Wheel: function(e2, c2, f2) {
    var n3 = Q(e2).bind, a2 = 0;
    function t3(n4) {
      var t4, i2, r3, o2, u2;
      n4.cancelable && (t4 = (u2 = n4.deltaY) < 0, i2 = mn(n4), r3 = f2.wheelMinThreshold || 0, o2 = f2.wheelSleep || 0, U(u2) > r3 && o2 < i2 - a2 && (e2.go(t4 ? "<" : ">"), a2 = i2), u2 = t4, f2.releaseWheel && !e2.sta
    }
    return { mount: function() {
      f2.wheel && n3(c2.Elements.track, "wheel", t3, jt);
    } };
  }, Live: function(n3, t3, i2) {
```

## pointer — glyph_section/script.min.js?ver=23.04 L8-18 (hit L8)
```js
  window.addEventListener("mousemove", ((e2) => {
    if (i) {
      const t2 = n.getBoundingClientRect(), r2 = t2.left + t2.width / 2, i2 = t2.top + t2.height / 2, a2 = e2.clientX - r2, c = e2.clientY - i2;
      let l = Math.atan2(c, a2) * (180 / Math.PI) - 90;
      o = (function(e3, t3) {
        for (; t3 - e3 > 180; ) t3 -= 360;
        for (; t3 - e3 < -180; ) t3 += 360;
        return t3;
      })(o, l), o = 45 * Math.round(o / 45);
    }
  })), a(), ScrollTrigger.create({ trigger: t, pin: false, start: "top bottom", end: "bottom top", onEnter: () => {
```

## observer — glyph_section/script.min.js?ver=23.04 L27-62 (hit L41)
```js
}, window.R2Methods.circleAnimation = function(e) {
  const t = e, n = t.querySelector(".circles"), o = t.querySelectorAll(".circles .media"), r = t.querySelector(".track"), i = t.querySelector(".sticky");
  window.location.search;
  function a() {
    const e2 = { val: 2 };
    gsap.fromTo(e2, { val: 10 }, { val: 1, duration: 10, ease: "expo.out", onUpdate: () => {
      o.forEach((function(t2, n2) {
        t2.anim.timeScale(e2.val);
      }));
    } });
  }
  o.forEach((function(e2, t2) {
    const n2 = 0.1 * t2;
    e2.anim = gsap.fromTo(e2, { rotate: 0 }, { rotate: 360, duration: 32 - 4 * t2, delay: n2, ease: "none", repeat: -1, paused: true });
  })), ScrollTrigger.create({ trigger: t, pin: false, onEnter: () => {
    o.forEach((function(e2, t2) {
      e2.anim.play();
    }));
  }, onEnterBack: () => {
    o.forEach((function(e2, t2) {
      e2.anim.play();
    }));
  }, onLeave: () => {
    o.forEach((function(e2, t2) {
      e2.anim.pause();
    }));
  }, onLeaveBack: () => {
    o.forEach((function(e2, t2) {
      e2.anim.pause();
    }));
  } }), ScrollTrigger.create({ trigger: n, pin: false, start: "50% 50%", end: "50% 50%", onEnter: () => {
    a();
  }, onEnterBack: () => {
    a();
  } }), window.innerWidth > 768 && ScrollTrigger.create({ trigger: r, pin: i, start: `top+=${0.5 * i.clientHeight} 50%`, end: `bottom-=${0.5 * i.clientHeight} 50%`, pinSpacer: false, pinSpacing: false }), t.scrollTrigger
};
```

## wheel-step — plugins/ScrollTrigger.min.js L112-115 (hit L113)
```js
    function ff() {
      var e3 = se2.deltaX = N(me), t3 = se2.deltaY = N(ye), r3 = Math.abs(e3) >= o2, n3 = Math.abs(t3) >= o2;
      S2 && (r3 || n3) && S2(se2, e3, t3, me, ye), r3 && (m2 && 0 < se2.deltaX && m2(se2), y2 && se2.deltaX < 0 && y2(se2), _2 && _2(se2), k2 && se2.deltaX < 0 != le < 0 && k2(se2), le = se2.deltaX, me[0] = me[1] = me[2]
    }
```

## wheel-step — plugins/ScrollTrigger.min.js L140-146 (hit L144)
```js
    function pf(e3) {
      if (!df(e3)) {
        e3 = M(e3, s2), X2 && (oe2 = true);
        var t3 = (1 === e3.deltaMode ? r2 : 2 === e3.deltaMode ? Se.innerHeight : 1) * f2;
        gf(e3.deltaX * t3, e3.deltaY * t3, 0), l2 && !z2 && te2.restart(true);
      }
    }
```

## loader — plugins/ScrollTrigger.min.js L441-444 (hit L442)
```js
  }, ut = Math.abs, q = "right", I = "bottom", ft = "width", dt = "height", pt = "Right", gt = "Left", ht = "Top", vt = "Bottom", bt = "padding", mt = "margin", yt = "Width", Y = "Height", xt = "px", wt = function _getBo
    var r2 = t2 && "matrix(1, 0, 0, 1, 0, 0)" !== mb(e2)[f] && He.to(e2, { x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, rotationX: 0, rotationY: 0, scale: 1, skewX: 0, skewY: 0 }).progress(1), n2 = e2.getBoundingCl
    return r2 && r2.progress(0).kill(), n2;
  }, _t = { startColor: "green", endColor: "red", indent: 0, fontSize: "16px", fontWeight: "normal" }, Ct = { toggleActions: "play", anticipatePin: 0 }, H = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 }, X = func
```

## loader — plugins/ScrollTrigger.min.js L444-447 (hit L446)
```js
  }, _t = { startColor: "green", endColor: "red", indent: 0, fontSize: "16px", fontWeight: "normal" }, Ct = { toggleActions: "play", anticipatePin: 0 }, H = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 }, X = func
    var o2 = { display: "block" }, i2 = r2[n2 ? "os2" : "p2"], a2 = r2[n2 ? "p2" : "os2"];
    e2._isFlipped = n2, o2[r2.a + "Percent"] = n2 ? -100 : 0, o2[r2.a] = n2 ? "1px" : 0, o2["border" + i2 + yt] = 1, o2["border" + a2 + yt] = 0, o2[r2.p] = t2 + "px", He.set(e2, o2);
  }, Tt = [], St = {}, W = {}, V = [], U = function _dispatch(e2) {
```

## loader — plugins/ScrollTrigger.min.js L511-515 (hit L512)
```js
      if (Te2._startClamp = Te2._endClamp = false, Te2._dir = he, M2 *= 45, Te2.scroller = be, Te2.scroll = de ? de.time.bind(de) : Ae2, D2 = Ae2(), Te2.vars = E2, O2 = O2 || E2.animation, "refreshPriority" in E2 && (Ze 
        (o2 = Ua(e3) && e3) ? ee2 ? ee2.duration(e3) : ee2 = He.to(O2, { ease: "expo", totalProgress: "+=0", inherit: false, duration: o2, paused: true, onComplete: function onComplete() {
          return s2 && s2(Te2);
        } }) : (ee2 && ee2.progress(1).kill(), ee2 = 0);
      }, O2 && (O2.vars.lazy = false, O2._initted && !Te2.isReverted || false !== O2.vars.immediateRender && false !== E2.immediateRender && O2.duration() && O2.render(0, true, true), Te2.animation = O2.pause(), (O2.scro
```

## pointer — glyph_black_section/script.min.js?ver=23.04 L108-112 (hit L108)
```js
  F(), L(y.x, y.y), window.addEventListener("mousemove", (e2) => {
    y.x = e2.clientX, y.y = e2.clientY, g && (f = e2.clientX, u = e2.clientY, w = true, m = false, clearTimeout(d), d = setTimeout(() => {
      m = true;
    }, 500));
  }), window.addEventListener("scroll", () => {
```