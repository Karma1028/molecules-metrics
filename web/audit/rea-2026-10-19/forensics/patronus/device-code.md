# patronus — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, observer×3, reveal-timeline×1, pointer×1, page-transition×3, keyboard×3, wheel-step×3, raf-lerp×3

## loader — chunks/3qbt_ch0d7yia.js L143-153 (hit L146)
```js
}, 215125, (s, t, a) => {
  "use strict";
  Object.defineProperty(a, "__esModule", { value: true });
  var l = { VALID_LOADERS: function() {
    return i;
  }, imageConfigDefault: function() {
    return n;
  } };
  for (var e in l) Object.defineProperty(a, e, { enumerable: true, get: l[e] });
  let i = ["default", "imgix", "cloudinary", "akamai", "custom"], n = { deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], imageSizes: [32, 48, 64, 96, 128, 256, 384], path: "/_next/image", loader: "default", lo
}, 161935, (s) => {
```

## loader — chunks/0_7ovwxrohq09.js L445-472 (hit L445)
```js
            return c2.loaderName || false === c2.loader || console.warn('\u{1F6A8} [next-translate] You can remove the "loadNamespaces" helper, unless you set "loader: false" in your i18n config file.'), p2 = (void 0 ===
              var l2 = t3.pages, u3 = void 0 === l2 ? {} : l2;
              return a(this, void 0, void 0, function() {
                var t4, l3, d2, h2, c3, _3, f3, p3, g2, m2, v2 = this;
                return n(this, function(b) {
                  switch (b.label) {
                    case 0:
                      return t4 = "rgx:", l3 = function(t5) {
                        return a(v2, void 0, void 0, function() {
                          return n(this, function(e3) {
                            return [2, "function" == typeof t5 ? t5(r2) : t5 || []];
                          });
                        });
                      }, d2 = o(e2), h2 = Object.keys(u3).reduce(function(r3, a2) {
                        return a2.substring(0, t4.length) === t4 && new RegExp(a2.replace(t4, "")).test(e2) && r3.push(l3(u3[a2])), r3;
                      }, []), !(c3 = u3[e2]) && (_3 = Object.keys(u3).find(function(e3) {
                        return "*" !== e3 && !e3.startsWith(t4) && o(e3) === d2;
                      })) && (c3 = u3[_3]), f3 = [[]], [4, l3(u3["*"])];
                    case 1:
                      return p3 = [i.apply(void 0, f3.concat([b.sent(), true]))], [4, l3(c3)];
                    case 2:
                      return g2 = [i.apply(void 0, p3.concat([b.sent(), true]))], m2 = s, [4, Promise.all(h2)];
                    case 3:
                      return [2, i.apply(void 0, g2.concat([m2.apply(void 0, [b.sent()]), true]))];
                  }
                });
              });
            })(c2, p2, c2)];
```

## loader — chunks/0_7ovwxrohq09.js L480-488 (hit L486)
```js
            return m = u2.sent() || [], (function(t3, r2) {
              var a2 = r2.page, n2 = r2.lang, i2 = r2.namespaces;
              if (false !== t3.logBuild && "u" < typeof window) {
                var s2 = null == e.default.env.NODE_DISABLE_COLORS && null == e.default.env.NO_COLOR && "dumb" !== e.default.env.TERM && "0" !== e.default.env.FORCE_COLOR, o2 = function(t4) {
                  return s2 ? "\x1B[36m".concat(t4, "\x1B[0m") : t4;
                };
                console.log(o2("next-translate"), "- compiled page:", o2(a2), "- locale:", o2(n2), "- namespaces:", o2(i2.join(", ")), "- used loader:", o2(t3.loaderName || "-"));
              }
            })(c2, { page: p2, lang: f2, namespaces: g }), [2, { __lang: f2, __namespaces: g.reduce(function(t3, e2, r2) {
```

## observer — chunks/1yb8cdbsweroz.js L123-133 (hit L127)
```js
          let { id: r2, observer: o2, elements: u2 } = (function(e5) {
            let t4, n4 = { root: e5.root || null, margin: e5.rootMargin || "" }, r3 = a.find((e6) => e6.root === n4.root && e6.margin === n4.margin);
            if (r3 && (t4 = i.get(r3))) return t4;
            let o3 = /* @__PURE__ */ new Map();
            return t4 = { id: n4, observer: new IntersectionObserver((e6) => {
              e6.forEach((e7) => {
                let t5 = o3.get(e7.target), n5 = e7.isIntersecting || e7.intersectionRatio > 0;
                t5 && n5 && t5(n5);
              });
            }, e5), elements: o3 }, a.push(n4), i.set(n4, t4), t4;
          })(n3);
```

## observer — chunks/2rptbqn52cq8e.js L120-160 (hit L135)
```js
    return (t10 - e10._start) * e10._ts + (e10._ts >= 0 ? 0 : e10._dirty ? e10.totalDuration() : e10._tDur);
  }, tW = function(t10) {
    return t10._end = tx(t10._start + (t10._tDur / Math.abs(t10._ts || t10._rts || 1e-8) || 0));
  }, tK = function(t10, e10) {
    var r2 = t10._dp;
    return r2 && r2.smoothChildTiming && t10._ts && (t10._start = tx(r2._time - (t10._ts > 0 ? e10 / t10._ts : -(((t10._dirty ? t10.totalDuration() : t10._tDur) - e10) / t10._ts))), tW(t10), r2._dirty || tq(r2, t10)), t1
  }, tH = function(t10, e10) {
    var r2;
    if ((e10._time || !e10._dur && e10._initted || e10._start < t10._time && (e10._dur || !e10.add)) && (r2 = tG(t10.rawTime(), e10), (!e10._dur || t7(0, e10.totalDuration(), r2) - e10._tTime > 1e-8) && e10.render(r2, tr
      if (t10._dur < t10.duration()) for (r2 = t10; r2._dp; ) r2.rawTime() >= 0 && r2.totalTime(r2._tTime), r2 = r2._dp;
      t10._zTime = -1e-8;
    }
  }, tY = function(t10, e10, r2, i2) {
    return e10.parent && tB(e10), e10._start = tx((B(r2) ? r2 : r2 || t10 !== w ? t3(t10, r2, e10) : t10._time) + e10._delay), e10._end = tx(e10._start + (e10.totalDuration() / Math.abs(e10.timeScale()) || 0)), tI(t10, e
  }, t$ = function(t10, e10) {
    return (tt.ScrollTrigger || ti("scrollTrigger", e10)) && tt.ScrollTrigger.create(e10, t10);
  }, tJ = function(t10, e10, r2, i2, n2) {
    return (eZ(t10, e10, n2), t10._initted) ? !r2 && t10._pt && !y && (t10._dur && false !== t10.vars.lazy || !t10._dur && t10.vars.lazy) && M !== eD.frame ? (tl.push(t10), t10._lazy = [n2, i2], 1) : void 0 : 1;
  }, tX = function t10(e10) {
    var r2 = e10.parent;
    return r2 && r2._ts && r2._initted && !r2._lock && (0 > r2.rawTime() || t10(r2));
  }, tZ = function(t10) {
    var e10 = t10.data;
    return "isFromStart" === e10 || "isStart" === e10;
  }, t0 = function(t10, e10, r2, i2) {
    var n2, s2, a2, o2 = t10.ratio, u2 = e10 < 0 || !e10 && (!t10._start && tX(t10) && !(!t10._initted && tZ(t10)) || (t10._ts < 0 || t10._dp._ts < 0) && !tZ(t10)) ? 0 : 1, h2 = t10._rDelay, _2 = 0;
    if (h2 && t10._repeat && (s2 = tV(_2 = t7(0, t10._tDur, e10), h2), t10._yoyo && 1 & s2 && (u2 = 1 - u2), s2 !== tV(t10._tTime, h2) && (o2 = 1 - u2, t10.vars.repeatRefresh && t10._initted && t10.invalidate())), u2 !==
      if (!t10._initted && tJ(t10, e10, i2, r2, _2)) return;
      for (a2 = t10._zTime, t10._zTime = e10 || 1e-8 * !!r2, r2 || (r2 = e10 && !a2), t10.ratio = u2, t10._from && (u2 = 1 - u2), t10._time = 0, t10._tTime = _2, n2 = t10._pt; n2; ) n2.r(u2, n2.d), n2 = n2._next;
      e10 < 0 && tQ(t10, e10, r2, true), t10._onUpdate && !r2 && ec(t10, "onUpdate"), _2 && t10._repeat && !r2 && t10.parent && ec(t10, "onRepeat"), (e10 >= t10._tDur || e10 < 0) && t10.ratio === u2 && (u2 && tB(t10, 1),
    } else t10._zTime || (t10._zTime = e10);
  }, t1 = function(t10, e10, r2) {
    var i2;
    if (r2 > e10) for (i2 = t10._first; i2 && i2._start <= r2; ) {
      if ("isPause" === i2.data && i2._start > e10) return i2;
      i2 = i2._next;
    }
    else for (i2 = t10._last; i2 && i2._start >= r2; ) {
      if ("isPause" === i2.data && i2._start < e10) return i2;
      i2 = i2._prev;
    }
```

## reveal-timeline — chunks/2rptbqn52cq8e.js L514-554 (hit L529)
```js
    }
    r(i2, t10);
    var n2 = i2.prototype;
    return n2.to = function(t11, e10, r2) {
      return t6(0, arguments, this), this;
    }, n2.from = function(t11, e10, r2) {
      return t6(1, arguments, this), this;
    }, n2.fromTo = function(t11, e10, r2, i3) {
      return t6(2, arguments, this), this;
    }, n2.set = function(t11, e10, r2) {
      return e10.duration = 0, e10.parent = this, tL(e10).repeatDelay || (e10.repeat = 0), e10.immediateRender = !!e10.immediateRender, new e6(t11, e10, t3(this, r2), 1), this;
    }, n2.call = function(t11, e10, r2) {
      return tY(this, e6.delayedCall(0, t11, e10), r2);
    }, n2.staggerTo = function(t11, e10, r2, i3, n3, s2, a2) {
      return r2.duration = e10, r2.stagger = r2.stagger || i3, r2.onComplete = s2, r2.onCompleteParams = a2, r2.parent = this, new e6(t11, r2, t3(this, n3)), this;
    }, n2.staggerFrom = function(t11, e10, r2, i3, n3, s2, a2) {
      return r2.runBackwards = 1, tL(r2).immediateRender = Q(r2.immediateRender), this.staggerTo(t11, e10, r2, i3, n3, s2, a2);
    }, n2.staggerFromTo = function(t11, e10, r2, i3, n3, s2, a2, o2) {
      return i3.startAt = r2, tL(i3).immediateRender = Q(i3.immediateRender), this.staggerTo(t11, e10, i3, n3, s2, a2, o2);
    }, n2.render = function(t11, e10, r2) {
      var i3, n3, s2, a2, o2, u2, h2, _2, l2, f2, c2, d2, p2 = this._time, m2 = this._dirty ? this.totalDuration() : this._tDur, v2 = this._dur, g2 = t11 <= 0 ? 0 : tx(t11), T2 = this._zTime < 0 != t11 < 0 && (this._init
      if (this !== w && g2 > m2 && t11 >= 0 && (g2 = m2), g2 !== this._tTime || r2 || T2) {
        if (p2 !== this._time && v2 && (g2 += this._time - p2, t11 += this._time - p2), i3 = g2, l2 = this._start, u2 = !(_2 = this._ts), T2 && (v2 || (p2 = this._zTime), (t11 || !e10) && (this._zTime = t11)), this._repe
          if (c2 = this._yoyo, o2 = v2 + this._rDelay, this._repeat < -1 && t11 < 0) return this.totalTime(100 * o2 + t11, e10, r2);
          if (i3 = tx(g2 % o2), g2 === m2 ? (a2 = this._repeat, i3 = v2) : ((a2 = ~~(f2 = tx(g2 / o2))) && a2 === f2 && (i3 = v2, a2--), i3 > v2 && (i3 = v2)), f2 = tV(this._tTime, o2), !p2 && this._tTime && f2 !== a2 &&
            var b2 = c2 && 1 & f2, x2 = b2 === (c2 && 1 & a2);
            if (a2 < f2 && (b2 = !b2), p2 = b2 ? 0 : g2 % v2 ? v2 : g2, this._lock = 1, this.render(p2 || (d2 ? 0 : tx(a2 * o2)), e10, !v2)._lock = 0, this._tTime = g2, !e10 && this.parent && ec(this, "onRepeat"), this.v
            ez(this, d2);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2 && (h2 = t1(this, tx(p2), tx(i3))) && (g2 -= i3 - (i3 = h2._start)), this._tTime = g2, this._time = i3, this._act = !_2, this._initted || (this._onUpdate = t
        if (i3 >= p2 && t11 >= 0) for (n3 = this._first; n3; ) {
          if (s2 = n3._next, (n3._act || i3 >= n3._start) && n3._ts && h2 !== n3) {
            if (n3.parent !== this) return this.render(t11, e10, r2);
            if (n3.render(n3._ts > 0 ? (i3 - n3._start) * n3._ts : (n3._dirty ? n3.totalDuration() : n3._tDur) + (i3 - n3._start) * n3._ts, e10, r2), i3 !== this._time || !this._ts && !u2) {
              h2 = 0, s2 && (g2 += this._zTime = -1e-8);
              break;
            }
          }
          n3 = s2;
        }
```

## pointer — chunks/1-kz0cr64r4eq.js L87-121 (hit L99)
```js
    function e2(e3) {
      var t3 = true, r2 = false, n = null, o = { text: true, search: true, url: true, tel: true, email: true, password: true, number: true, date: true, month: true, week: true, time: true, datetime: true, "datetime-local
      function a(e4) {
        return !!e4 && e4 !== document && "HTML" !== e4.nodeName && "BODY" !== e4.nodeName && "classList" in e4 && "contains" in e4.classList;
      }
      function u(e4) {
        e4.classList.contains("focus-visible") || (e4.classList.add("focus-visible"), e4.setAttribute("data-focus-visible-added", ""));
      }
      function i(e4) {
        t3 = false;
      }
      function l() {
        document.addEventListener("mousemove", s), document.addEventListener("mousedown", s), document.addEventListener("mouseup", s), document.addEventListener("pointermove", s), document.addEventListener("pointerdown",
      }
      function s(e4) {
        e4.target.nodeName && "html" === e4.target.nodeName.toLowerCase() || (t3 = false, document.removeEventListener("mousemove", s), document.removeEventListener("mousedown", s), document.removeEventListener("mouseup"
      }
      document.addEventListener("keydown", function(r3) {
        r3.metaKey || r3.altKey || r3.ctrlKey || (a(e3.activeElement) && u(e3.activeElement), t3 = true);
      }, true), document.addEventListener("mousedown", i, true), document.addEventListener("pointerdown", i, true), document.addEventListener("touchstart", i, true), document.addEventListener("visibilitychange", function
        "hidden" === document.visibilityState && (r2 && (t3 = true), l());
      }, true), l(), e3.addEventListener("focus", function(e4) {
        if (a(e4.target)) {
          var r3, n2, i2;
          (t3 || (n2 = (r3 = e4.target).type, "INPUT" === (i2 = r3.tagName) && o[n2] && !r3.readOnly || "TEXTAREA" === i2 && !r3.readOnly || r3.isContentEditable || 0)) && u(e4.target);
        }
      }, true), e3.addEventListener("blur", function(e4) {
        if (a(e4.target) && (e4.target.classList.contains("focus-visible") || e4.target.hasAttribute("data-focus-visible-added"))) {
          var t4;
          r2 = true, window.clearTimeout(n), n = window.setTimeout(function() {
            r2 = false;
          }, 100), (t4 = e4.target).hasAttribute("data-focus-visible-added") && (t4.classList.remove("focus-visible"), t4.removeAttribute("data-focus-visible-added"));
        }
      }, true), e3.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e3.host ? e3.host.setAttribute("data-js-focus-visible", "") : e3.nodeType === Node.DOCUMENT_NODE && (document.documentElement.classList.add("js-focus-visible
    }
```

## page-transition — chunks/06xdsl5x469zh.js L139-166 (hit L164)
```js
    constructor(e2, t2, r2, { initialProps: a2, pageLoader: n2, App: o2, wrapApp: i2, Component: s2, err: u2, subscription: c2, isFallback: h2, locale: d2, locales: f2, defaultLocale: g2, domainLocales: b2, isPreview: P2
      this.sdc = {}, this.sbc = {}, this.isFirstPopStateEvent = true, this._key = K(), this.onPopState = (e3) => {
        let t3, { isFirstPopStateEvent: r3 } = this;
        this.isFirstPopStateEvent = false;
        let a3 = e3.state;
        if (!a3) {
          let { pathname: e4, query: t4 } = this;
          this.changeState("replaceState", (0, y.formatWithValidation)({ pathname: (0, j.addBasePath)(e4), query: t4 }), (0, p.getURL)());
          return;
        }
        if (a3.__NA) return void window.location.reload();
        if (!a3.__N || r3 && this.locale === a3.options.locale && a3.as === this.asPath) return;
        let { url: n3, as: o3, options: i3, key: l2 } = a3;
        this._key = l2;
        let { pathname: s3 } = (0, _.parseRelativeUrl)(n3);
        this.isSsr && o3 === (0, j.addBasePath)(this.asPath) && s3 === (0, j.addBasePath)(this.pathname) || (!this._bps || this._bps(a3)) && this.change("replaceState", n3, o3, Object.assign({}, i3, { shallow: i3.shallow
      };
      const E2 = (0, l.removeTrailingSlash)(e2);
      this.components = {}, "/_error" !== e2 && (this.components[E2] = { Component: s2, initial: true, props: a2, err: u2, __N_SSG: a2 && a2.__N_SSG, __N_SSP: a2 && a2.__N_SSP }), this.components["/_app"] = { Component: 
      const w2 = (0, m.isDynamicRoute)(e2) && self.__NEXT_DATA__.autoExport;
      if (this.basePath = "", this.sub = c2, this.clc = null, this._wrapApp = i2, this.isSsr = true, this.isLocaleDomain = false, this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.
        if (!r2.startsWith("//")) {
          const a3 = { locale: d2 }, n3 = (0, p.getURL)();
          this._initialMatchesMiddlewarePromise = W({ router: this, locale: d2, asPath: n3 }).then((o3) => (a3._shouldResolveHref = r2 !== e2, this.changeState("replaceState", o3 ? n3 : (0, y.formatWithValidation)({ path
        }
        window.addEventListener("popstate", this.onPopState);
      }
    }
```

## page-transition — chunks/23u03f8p40h2g.js L928-942 (hit L936)
```js
      return void 0 === e3 && (e3 = window), { load: function(t3) {
        if ("addEventListener" in e3 && t3._isBreadcrumbTypeEnabled("navigation")) {
          var n3 = function(e4) {
            return function() {
              return t3.leaveBreadcrumb(e4, {}, "navigation");
            };
          };
          e3.addEventListener("pagehide", n3("Page hidden"), true), e3.addEventListener("pageshow", n3("Page shown"), true), e3.addEventListener("load", n3("Page loaded"), true), e3.document.addEventListener("DOMContentL
            return e3.addEventListener("popstate", n3("Navigated back"), true);
          }), e3.addEventListener("hashchange", function(n4) {
            var r2 = n4.oldURL ? { from: eB(n4.oldURL, e3), to: eB(n4.newURL, e3), state: eC(e3) } : { to: eB(e3.location.href, e3) };
            t3.leaveBreadcrumb("Hash changed", r2, "navigation");
          }, true), e3.history.pushState && eT(t3, e3.history, "pushState", e3, true), e3.history.replaceState && eT(t3, e3.history, "replaceState", e3);
        }
      } };
```

## keyboard — chunks/04t79uflkgk0d.js L3762-3796 (hit L3770)
```js
    if (f2 && !p2) {
      let r11;
      for (; !t10.isGranted(); ) if (v2(), await new Promise((e11) => t10.onGrantedOnce(e11)), p2 || !(f2 = await m2().catch(F.monitorError)) || p2) return;
      return c2.add(b2(f2), (0, P.clocksOrigin)().relative), g2(f2), r11 = s2.sessionObservable.subscribe((e11) => {
        g2(e11), y2(e11);
      }), iH.push(() => r11.unsubscribe()), t10.observable.subscribe(() => {
        t10.isGranted() ? (l2 = false, s2.setSessionState((t11) => ix(t11, e10), "expandOrRenewOnConsent").catch(F.monitorError)) : v2();
      }), L.isWorkerEnvironment || ((function(e11) {
        let { stop: t11 } = (0, e7.addEventListeners)(window, ["click", "touchstart", "keydown", "scroll"], e11, { capture: true, passive: true });
        iH.push(t11);
      })(() => {
        t10.isGranted() && u2();
      }), (function(e11) {
        let t11 = () => {
          "visible" === document.visibilityState && e11();
        }, { stop: r12 } = (0, e7.addEventListener)(document, "visibilitychange", t11);
        iH.push(r12);
        let n11 = (0, ek.setInterval)(t11, iK);
        iH.push(() => {
          (0, ek.clearInterval)(n11);
        });
      })(() => {
        l2 || s2.setSessionState((e11) => (iA(e11) || iR(e11) || !e11.id || iI(e11), e11), "expandOnVisibility").catch(F.monitorError);
      }), (function(e11) {
        let { stop: t11 } = (0, e7.addEventListener)(window, "resume", e11, { capture: true });
        iH.push(t11);
      })(() => {
        s2.setSessionState((t11) => iD(t11, e10), "initializeOnResume").catch(F.monitorError);
      })), (0, R.addTelemetryMetrics)("Session manager init metrics", { metrics: { duration: (0, P.elapsed)(n10, (0, P.relativeNow)()) } }), { findSession: (e11, t11) => c2.find(e11, t11), findTrackedSession: function(t1
        let { returnInactive: r12 = false, maxAge: n11 = iq } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i3 = c2.find(t11, { returnInactive: r12 });
        if (i3 && "invalid" !== i3.id && tP(i3.id, e10.sessionSampleRate) && !((0, P.dateNow)() - i3.createdAt > n11)) return i3;
      }, renewObservable: i2, expireObservable: o2, expire: v2, updateSessionState: (e11) => {
        s2.setSessionState((t11) => ({ ...t11, ...e11 }), "updateState").catch(F.monitorError);
      } };
    }
```

## keyboard — chunks/0jx6t9m1uj-pm.js L1426-1432 (hit L1431)
```js
  var t2 = tz(m({}, tH, { key: function(e10) {
    if (e10.key) {
      var t10 = tK[e10.key] || e10.key;
      if ("Unidentified" !== t10) return t10;
    }
    return "keypress" === e10.type ? 13 === (e10 = tL(e10)) ? "Enter" : String.fromCharCode(e10) : "keydown" === e10.type || "keyup" === e10.type ? tZ[e10.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: t1, charCode: function(e10) {
```

## keyboard — chunks/0jx6t9m1uj-pm.js L1420-1460 (hit L1435)
```js
    var t10 = this.nativeEvent;
    return t10.getModifierState ? t10.getModifierState(e10) : !!(e10 = tJ[e10]) && !!t10[e10];
  }
  function t1() {
    return t0;
  }
  var t2 = tz(m({}, tH, { key: function(e10) {
    if (e10.key) {
      var t10 = tK[e10.key] || e10.key;
      if ("Unidentified" !== t10) return t10;
    }
    return "keypress" === e10.type ? 13 === (e10 = tL(e10)) ? "Enter" : String.fromCharCode(e10) : "keydown" === e10.type || "keyup" === e10.type ? tZ[e10.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: t1, charCode: function(e10) {
    return "keypress" === e10.type ? tL(e10) : 0;
  }, keyCode: function(e10) {
    return "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  }, which: function(e10) {
    return "keypress" === e10.type ? tL(e10) : "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  } })), t3 = tz(m({}, tV, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), t4 = tz(m({}, tH, { touches: 0, targetTouches: 0, change
    return "deltaX" in e10 ? e10.deltaX : "wheelDeltaX" in e10 ? -e10.wheelDeltaX : 0;
  }, deltaY: function(e10) {
    return "deltaY" in e10 ? e10.deltaY : "wheelDeltaY" in e10 ? -e10.wheelDeltaY : "wheelDelta" in e10 ? -e10.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 })), t5 = tz(m({}, tU, { newState: 0, oldState: 0 })), t9 = [9, 13, 27, 32], t7 = t_ && "CompositionEvent" in window, ne = null;
  t_ && "documentMode" in document && (ne = document.documentMode);
  var nt = t_ && "TextEvent" in window && !ne, nn = t_ && (!t7 || ne && 8 < ne && 11 >= ne), nr = false;
  function nl(e10, t10) {
    switch (e10) {
      case "keyup":
        return -1 !== t9.indexOf(t10.keyCode);
      case "keydown":
        return 229 !== t10.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function na(e10) {
    return "object" == typeof (e10 = e10.detail) && "data" in e10 ? e10.data : null;
```

## page-transition — chunks/0jx6t9m1uj-pm.js L5481-5490 (hit L5484)
```js
  function iQ() {
    iB = iU = false;
    var e10, t10 = 0;
    0 === i$ || ((e10 = window.event) && "popstate" === e10.type ? e10 === sb || (sb = e10, 0) : (sb = null, 1)) || (t10 = i$);
    for (var n10 = ea(), r10 = null, l10 = iF; null !== l10; ) {
      var a10 = l10.next, o10 = iG(l10, n10);
      0 === o10 ? (l10.next = null, null === r10 ? iF = a10 : r10.next = a10, null === a10 && (ij = r10)) : (r10 = l10, (0 !== t10 || 0 != (3 & o10)) && (iB = true)), l10 = a10;
    }
    0 !== u3 && 5 !== u3 || iW(t10, false), 0 !== i$ && (i$ = 0);
  }
```

## wheel-step — chunks/0jx6t9m1uj-pm.js L5626-5638 (hit L5637)
```js
  function i7(e10, t10, n10, r10) {
    switch (cm(t10)) {
      case 2:
        var l10 = ci;
        break;
      case 8:
        l10 = cs;
        break;
      default:
        l10 = cc;
    }
    n10 = l10.bind(null, t10, n10, e10), l10 = void 0, tx && ("touchstart" === t10 || "touchmove" === t10 || "wheel" === t10) && (l10 = true), r10 ? void 0 !== l10 ? e10.addEventListener(t10, n10, { capture: true, passiv
  }
```

## wheel-step — chunks/0jx6t9m1uj-pm.js L5711-5751 (hit L5726)
```js
            case "touchstart":
              i11 = t4;
              break;
            case nB:
            case nH:
            case n$:
              i11 = tG;
              break;
            case nQ:
              i11 = t8;
              break;
            case "scroll":
            case "scrollend":
              i11 = t$;
              break;
            case "wheel":
              i11 = t6;
              break;
            case "copy":
            case "cut":
            case "paste":
              i11 = tX;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              i11 = t3;
              break;
            case "toggle":
            case "beforetoggle":
              i11 = t5;
          }
          var f2 = 0 != (4 & t10), d2 = !f2 && ("scroll" === e10 || "scrollend" === e10), p2 = f2 ? null !== u11 ? u11 + "Capture" : null : u11;
          f2 = [];
          for (var m2, h2 = r11; null !== h2; ) {
            var g2 = h2;
```

## wheel-step — chunks/0jx6t9m1uj-pm.js L6857-6897 (hit L6872)
```js
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
        switch (eo()) {
          case eu:
            return 2;
          case ei:
            return 8;
          case es:
          case ec:
            return 32;
          case ef:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ch = false, cg = null, cy = null, cv = null, cb = /* @__PURE__ */ new Map(), cS = /* @__PURE__ */ new Map(), ck = [], cw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerd
  function cE(e10, t10) {
```

## observer — chunks/0h4wpey40xfpy.js L508-516 (hit L508)
```js
        let r3, i2 = /* @__PURE__ */ new Map(), s2 = new IntersectionObserver((e4) => {
          e4.forEach((e5) => {
            var n4;
            let o2 = e5.isIntersecting && r3.some((t4) => e5.intersectionRatio >= t4);
            t3.trackVisibility && void 0 === e5.isVisible && (e5.isVisible = o2), null == (n4 = i2.get(e5.target)) || n4.forEach((t4) => {
              t4(o2, e5);
            });
          });
        }, t3);
```

## raf-lerp — chunks/18c6rfamk1j63.js L1113-1135 (hit L1135)
```js
      if (y.to) {
        b.bezierData || (b.bezierData = bez.buildBezierData(y.s, v.s || y.e, y.to, y.ti));
        var m = b.bezierData;
        if (t >= c || t < u) {
          var d = t >= c ? m.points.length - 1 : 0;
          for (_ = m.points[d].point.length, x = 0; x < _; x += 1) g[x] = m.points[d].point[x];
        } else {
          b.__fnct ? A = b.__fnct : b.__fnct = A = BezierFactory.getBezierEasing(y.o.x, y.o.y, y.i.x, y.i.y, y.n).get;
          var g, y, v, b, x, _, k, C, A, P, S, w = A((t - u) / (c - u)), D = m.segmentLength * w, T = e.lastFrame < t && e._lastKeyframeIndex === l ? e._lastAddedLength : 0;
          for (C = e.lastFrame < t && e._lastKeyframeIndex === l ? e._lastPoint : 0, f = true, k = m.points.length; f; ) {
            if (T += m.points[C].partialLength, 0 === D || 0 === w || C === m.points.length - 1) {
              for (_ = m.points[C].point.length, x = 0; x < _; x += 1) g[x] = m.points[C].point[x];
              break;
            }
            if (D >= T && D < T + m.points[C + 1].partialLength) {
              for (S = (D - T) / m.points[C + 1].partialLength, _ = m.points[C].point.length, x = 0; x < _; x += 1) g[x] = m.points[C].point[x] + (m.points[C + 1].point[x] - m.points[C].point[x]) * S;
              break;
            }
            C < k - 1 ? C += 1 : f = false;
          }
          e._lastPoint = C, e._lastAddedLength = T - m.points[C].partialLength, e._lastKeyframeIndex = l;
        }
      } else if (p = y.s.length, P = v.s || y.e, this.sh && 1 !== y.h) t >= c ? (g[0] = P[0], g[1] = P[1], g[2] = P[2]) : t <= u ? (g[0] = y.s[0], g[1] = y.s[1], g[2] = y.s[2]) : quaternionToEuler(g, slerp(createQuaterni
```

## raf-lerp — chunks/18c6rfamk1j63.js L1139-1142 (hit L1139)
```js
    function slerp(t, e, i) {
      var s, r, a, n, o, h = [], l = t[0], p = t[1], f = t[2], c = t[3], u = e[0], m = e[1], d = e[2], g = e[3];
      return (r = l * u + p * m + f * d + c * g) < 0 && (r = -r, u = -u, m = -m, d = -d, g = -g), 1 - r > 1e-6 ? (a = Math.sin(s = Math.acos(r)), n = Math.sin((1 - i) * s) / a, o = Math.sin(i * s) / a) : (n = 1 - i, o = 
    }
```

## raf-lerp — chunks/18c6rfamk1j63.js L1781-1821 (hit L1796)
```js
      }, autoOrient: function() {
      } }, extendPrototype([DynamicPropertyContainer], i), i.prototype.addDynamicProperty = e, i.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, { getTransformProperty: function(t2,
        return new i(t2, e2, s);
      } };
    })();
    function RepeaterModifier() {
    }
    function RoundCornersModifier() {
    }
    function floatEqual(t, e) {
      return 1e5 * Math.abs(t - e) <= Math.min(Math.abs(t), Math.abs(e));
    }
    function floatZero(t) {
      return 1e-5 >= Math.abs(t);
    }
    function lerp(t, e, i) {
      return t * (1 - i) + e * i;
    }
    function lerpPoint(t, e, i) {
      return [lerp(t[0], e[0], i), lerp(t[1], e[1], i)];
    }
    function quadRoots(t, e, i) {
      if (0 === t) return [];
      var s = e * e - 4 * t * i;
      if (s < 0) return [];
      var r = -e / (2 * t);
      if (0 === s) return [r];
      var a = Math.sqrt(s) / (2 * t);
      return [r - a, r + a];
    }
    function polynomialCoefficients(t, e, i, s) {
      return [-t + 3 * e - 3 * i + s, 3 * t - 6 * e + 3 * i, -3 * t + 3 * e, t];
    }
    function singlePoint(t) {
      return new PolynomialBezier(t, t, t, t, false);
    }
    function PolynomialBezier(t, e, i, s, r) {
      r && pointEqual(t, e) && (e = lerpPoint(t, s, 1 / 3)), r && pointEqual(i, s) && (i = lerpPoint(t, s, 2 / 3));
      var a = polynomialCoefficients(t[0], e[0], i[0], s[0]), n = polynomialCoefficients(t[1], e[1], i[1], s[1]);
      this.a = [a[0], n[0]], this.b = [a[1], n[1]], this.c = [a[2], n[2]], this.d = [a[3], n[3]], this.points = [t, e, i, s];
    }
```