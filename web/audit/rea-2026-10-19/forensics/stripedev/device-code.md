# stripedev — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, keyboard×3, page-transition×3, wheel-step×2, observer×2, audio×3, pointer×1

## loader — chunks/42w8_poafh7zp.js L132-153 (hit L134)
```js
}, 15125, (e, t, r) => {
  Object.defineProperty(r, "__esModule", { value: true });
  var n = { VALID_LOADERS: function() {
    return a;
  }, imageConfigDefault: function() {
    return s;
  }, prepareImageConfig: function() {
    return i;
  } };
  for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
  let a = ["default", "imgix", "cloudinary", "akamai", "custom"], u = {}, l = /* @__PURE__ */ new WeakMap();
  function i(e2, t2) {
    let r2 = e2 ?? u, n2 = t2 ?? u, o2 = l.get(r2);
    if (o2) {
      let e3 = o2.get(n2);
      if (e3) return e3;
    }
    let a2 = e2 || t2 || s, i2 = [...a2.deviceSizes].sort((e3, t3) => e3 - t3), c = [...a2.imageSizes], d = { deviceSizes: i2, imageSizes: c, allSizes: [...i2, ...c].sort((e3, t3) => e3 - t3), qualities: void 0 === a2.qu
    return o2 || (o2 = /* @__PURE__ */ new WeakMap(), l.set(r2, o2)), o2.set(n2, d), d;
  }
  let s = { deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], imageSizes: [32, 48, 64, 96, 128, 256, 384], path: "/_next/image", loader: "default", loaderFile: "", domains: [], disableStaticImages: false, minim
}, 14760, (e, t, r) => {
```

## loader — chunks/turbopack-1byz1flvc-bu1.js L343-350 (hit L345)
```js
    if (!t2) {
      let r2, n2;
      t2 = { resolved: false, loadingStarted: false, retryAttempts: 0, promise: new Promise((e3, t3) => {
        r2 = e3, n2 = t3;
      }), resolve: () => {
        t2.resolved = true, r2();
      }, reject: n2 }, z.set(e2, t2);
    }
```

## loader — chunks/turbopack-1byz1flvc-bu1.js L353-357 (hit L355)
```js
  function Z(e2, t2, r2, n2, o2) {
    !(null == n2 || n2 instanceof DOMException && "NetworkError" === n2.name) || r2.retryAttempts >= 1 || z.get(t2) !== r2 ? (z.get(t2) === r2 && z.delete(t2), r2.reject(n2)) : (r2.retryAttempts++, setTimeout(() => {
      r2.resolved || z.get(t2) !== r2 || (o2 ? o2() : (r2.loadingStarted = false, G(e2, t2)));
    }, 200 + Math.floor(401 * Math.random())));
  }
```

## keyboard — chunks/221levnk5b_6s.js L1429-1435 (hit L1434)
```js
  var nc = tZ(N({}, t6, { key: function(e10) {
    if (e10.key) {
      var t10 = na[e10.key] || e10.key;
      if ("Unidentified" !== t10) return t10;
    }
    return "keypress" === e10.type ? 13 === (e10 = tY(e10)) ? "Enter" : String.fromCharCode(e10) : "keydown" === e10.type || "keyup" === e10.type ? no[e10.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ns, charCode: function(e10) {
```

## keyboard — chunks/221levnk5b_6s.js L1423-1463 (hit L1438)
```js
    var t10 = this.nativeEvent;
    return t10.getModifierState ? t10.getModifierState(e10) : !!(e10 = ni[e10]) && !!t10[e10];
  }
  function ns() {
    return nu;
  }
  var nc = tZ(N({}, t6, { key: function(e10) {
    if (e10.key) {
      var t10 = na[e10.key] || e10.key;
      if ("Unidentified" !== t10) return t10;
    }
    return "keypress" === e10.type ? 13 === (e10 = tY(e10)) ? "Enter" : String.fromCharCode(e10) : "keydown" === e10.type || "keyup" === e10.type ? no[e10.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ns, charCode: function(e10) {
    return "keypress" === e10.type ? tY(e10) : 0;
  }, keyCode: function(e10) {
    return "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  }, which: function(e10) {
    return "keypress" === e10.type ? tY(e10) : "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  } })), nf = tZ(N({}, t9, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), nd = tZ(N({}, t4, { submitter: 0 })), np = tZ(N({}, t6, 
    return "deltaX" in e10 ? e10.deltaX : "wheelDeltaX" in e10 ? -e10.wheelDeltaX : 0;
  }, deltaY: function(e10) {
    return "deltaY" in e10 ? e10.deltaY : "wheelDeltaY" in e10 ? -e10.wheelDeltaY : "wheelDelta" in e10 ? -e10.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 })), ng = tZ(N({}, t4, { newState: 0, oldState: 0, source: 0 })), nv = [9, 13, 27, 32], ny = tH && "CompositionEvent" in window, nb = null;
  tH && "documentMode" in document && (nb = document.documentMode);
  var nS = tH && "TextEvent" in window && !nb, nw = tH && (!ny || nb && 8 < nb && 11 >= nb), nE = false;
  function nk(e10, t10) {
    switch (e10) {
      case "keyup":
        return -1 !== nv.indexOf(t10.keyCode);
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
  function n_(e10) {
    return "object" == typeof (e10 = e10.detail) && "data" in e10 ? e10.data : null;
```

## keyboard — chunks/221levnk5b_6s.js L1493-1533 (hit L1508)
```js
    nz = r && (!document.documentMode || 9 < document.documentMode);
  }
  function nM() {
    nC && (nC.detachEvent("onpropertychange", nF), nO = nC = null);
  }
  function nF(e10) {
    if ("value" === e10.propertyName && nR(nO)) {
      var t10 = [];
      nP(t10, nO, e10, tA(e10)), tj(nL, t10);
    }
  }
  function nU(e10, t10, n10) {
    "focusin" === e10 ? (nM(), nC = t10, nO = n10, nC.attachEvent("onpropertychange", nF)) : "focusout" === e10 && nM();
  }
  function nj(e10) {
    if ("selectionchange" === e10 || "keyup" === e10 || "keydown" === e10) return nR(nO);
  }
  function nB(e10, t10) {
    if ("click" === e10) return nR(t10);
  }
  function nH(e10, t10) {
    if ("input" === e10 || "change" === e10) return nR(t10);
  }
  var nV = "function" == typeof Object.is ? Object.is : function(e10, t10) {
    return e10 === t10 && (0 !== e10 || 1 / e10 == 1 / t10) || e10 != e10 && t10 != t10;
  };
  function n$(e10, t10) {
    if (nV(e10, t10)) return true;
    if ("object" != typeof e10 || null === e10 || "object" != typeof t10 || null === t10) return false;
    var n10 = Object.keys(e10), r10 = Object.keys(t10);
    if (n10.length !== r10.length) return false;
    for (r10 = 0; r10 < n10.length; r10++) {
      var l10 = n10[r10];
      if (!em.call(t10, l10) || !nV(e10[l10], t10[l10])) return false;
    }
    return true;
  }
  function nW(e10) {
    if (void 0 === (e10 = e10 || ("u" > typeof document ? document : void 0))) return null;
    try {
      return e10.activeElement || e10.body;
```

## page-transition — chunks/221levnk5b_6s.js L5990-5999 (hit L5993)
```js
  function sY() {
    sV = sH = false;
    var e10, t10 = 0;
    0 === sW || ((e10 = window.event) && "popstate" === e10.type ? e10 === cE || (cE = e10, 0) : (cE = null, 1)) || (t10 = sW);
    for (var n10 = eb(), r10 = null, l10 = sj; null !== l10; ) {
      var a10 = l10.next, o10 = sX(l10, n10);
      0 === o10 ? (l10.next = null, null === r10 ? sj = a10 : r10.next = a10, null === a10 && (sB = r10)) : (r10 = l10, (0 !== t10 || 0 != (3 & o10)) && (sV = true)), l10 = a10;
    }
    0 !== u1 && 5 !== u1 || sQ(t10, false), 0 !== sW && (sW = 0);
  }
```

## wheel-step — chunks/221levnk5b_6s.js L6131-6143 (hit L6142)
```js
  function ce(e10, t10, n10, r10) {
    switch (fX(t10)) {
      case 2:
        var l10 = f$;
        break;
      case 8:
        l10 = fW;
        break;
      default:
        l10 = fq;
    }
    n10 = l10.bind(null, t10, n10, e10), l10 = void 0, tV && ("touchstart" === t10 || "touchmove" === t10 || "wheel" === t10) && (l10 = true), r10 ? void 0 !== l10 ? e10.addEventListener(t10, n10, { capture: true, passiv
  }
```

## wheel-step — chunks/221levnk5b_6s.js L6216-6256 (hit L6231)
```js
            case "touchstart":
              u11 = np;
              break;
            case n5:
            case n9:
            case n7:
              u11 = nn;
              break;
            case rr:
              u11 = nm;
              break;
            case "scroll":
            case "scrollend":
              u11 = t5;
              break;
            case "wheel":
              u11 = nh;
              break;
            case "copy":
            case "cut":
            case "paste":
              u11 = nr;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              u11 = nf;
              break;
            case "submit":
              u11 = nd;
              break;
            case "toggle":
            case "beforetoggle":
              u11 = ng;
          }
          var f10 = 0 != (4 & t10), d2 = !f10 && ("scroll" === e10 || "scrollend" === e10), p2 = f10 ? null !== i11 ? i11 + "Capture" : null : i11;
```

## page-transition — chunks/221levnk5b_6s.js L7661-7701 (hit L7676)
```js
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
      case "fullscreenerror":
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
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (eS()) {
```

## page-transition — chunks/1tbuotzl4ojut.js L963-990 (hit L988)
```js
    constructor(e2, t2, r2, { initialProps: n2, pageLoader: a2, App: o2, wrapApp: i2, Component: s2, err: u2, subscription: c2, isFallback: f2, locale: p2, locales: d2, defaultLocale: h2, domainLocales: y2, isPreview: P2
      this.sdc = {}, this.sbc = {}, this.isFirstPopStateEvent = true, this._key = Q(), this.onPopState = (e3) => {
        let t3, { isFirstPopStateEvent: r3 } = this;
        this.isFirstPopStateEvent = false;
        let n3 = e3.state;
        if (!n3) {
          let { pathname: e4, query: t4 } = this;
          this.changeState("replaceState", (0, b.formatWithValidation)({ pathname: (0, A.addBasePath)(e4), query: t4 }), (0, m.getURL)());
          return;
        }
        if (n3.__NA) return void window.location.reload();
        if (!n3.__N || r3 && this.locale === n3.options.locale && n3.as === this.asPath) return;
        let { url: a3, as: o3, options: i3, key: s3 } = n3;
        this._key = s3;
        let { pathname: l2 } = (0, _.parseRelativeUrl)(a3);
        this.isSsr && o3 === (0, A.addBasePath)(this.asPath) && l2 === (0, A.addBasePath)(this.pathname) || (!this._bps || this._bps(n3)) && this.change("replaceState", a3, o3, Object.assign({}, i3, { shallow: i3.shallow
      };
      let v2 = (0, l.removeTrailingSlash)(e2);
      this.components = {}, "/_error" !== e2 && (this.components[v2] = { Component: s2, initial: true, props: n2, err: u2, __N_SSG: n2 && n2.__N_SSG, __N_SSP: n2 && n2.__N_SSP }), this.components["/_app"] = { Component: 
      let E2 = (0, g.isDynamicRoute)(e2) && self.__NEXT_DATA__.autoExport;
      if (this.basePath = "", this.sub = c2, this.clc = null, this._wrapApp = i2, this.isSsr = true, this.isLocaleDomain = false, this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.
        if (!r2.startsWith("//")) {
          let n3 = { locale: p2 }, a3 = (0, m.getURL)();
          this._initialMatchesMiddlewarePromise = W({ router: this, locale: p2, asPath: a3 }).then((o3) => (n3._shouldResolveHref = r2 !== e2, this.changeState("replaceState", o3 ? a3 : (0, b.formatWithValidation)({ path
        }
        window.addEventListener("popstate", this.onPopState);
      }
    }
```

## observer — chunks/3zs8w-9t_gots.js L3364-3374 (hit L3368)
```js
          let { id: n2, observer: s2, elements: r2 } = (function(t4) {
            let e4, i5 = { root: t4.root || null, margin: t4.rootMargin || "" }, n3 = a.find((t5) => t5.root === i5.root && t5.margin === i5.margin);
            if (n3 && (e4 = o.get(n3))) return e4;
            let s3 = /* @__PURE__ */ new Map();
            return e4 = { id: i5, observer: new IntersectionObserver((t5) => {
              t5.forEach((t6) => {
                let e5 = s3.get(t6.target), i6 = t6.isIntersecting || t6.intersectionRatio > 0;
                e5 && i6 && e5(i6);
              });
            }, t4), elements: s3 }, a.push(i5), o.set(i5, e4), e4;
          })(i4);
```

## observer — chunks/3zs8w-9t_gots.js L3617-3636 (hit L3632)
```js
    startObserver() {
      var t2;
      let e2;
      this.stopObserver?.();
      let { viewport: i2 = {} } = this.node.getProps(), { root: n2, margin: s2, amount: r2 = "some", once: o2 } = i2, a2 = { root: n2 ? n2.current : void 0, rootMargin: s2, threshold: "number" == typeof r2 ? r2 : R[r2] }
        let { isIntersecting: e3 } = t3;
        if (this.isInView === e3 || (this.isInView = e3, o2 && !e3 && this.hasEnteredView)) return;
        e3 && (this.hasEnteredView = true), this.node.animationState && this.node.animationState.setActive("whileInView", e3);
        let { onViewportEnter: i3, onViewportLeave: n3 } = this.node.getProps(), s3 = e3 ? i3 : n3;
        s3 && s3(t3);
      };
      this.stopObserver = (t2 = this.node.current, e2 = (function({ root: t3, ...e3 }) {
        let i3 = t3 || document;
        A.has(i3) || A.set(i3, {});
        let n3 = A.get(i3), s3 = JSON.stringify(e3);
        return n3[s3] || (n3[s3] = new IntersectionObserver(j, { root: t3, ...e3 })), n3[s3];
      })(a2), E.set(t2, l2), e2.observe(t2), () => {
        E.delete(t2), e2.unobserve(t2);
      });
    }
```

## audio — chunks/069kld4u2z67z.js L79-89 (hit L85)
```js
  }, "Q", 0, function(e2) {
    if (e2) {
      let e3;
      e3 = d || (d = new r.Howl({ src: [`${i}/bossa_adapter.mp3`], html5: true, loop: true, volume: u, preload: false })), t || (t = e3.play());
    } else if (d && t) {
      let e3 = d;
      e3.fade(u, 0, 500, t), e3.once("fade", () => {
        e3.stop(t), t = void 0;
      });
    }
  }, "M", 0, function(e2) {
```

## audio — chunks/069kld4u2z67z.js L240-280 (hit L255)
```js
            var t4 = function() {
              e2.state = "suspended", e2._resumeAfterSuspend && (delete e2._resumeAfterSuspend, e2._autoResume());
            };
            e2.ctx.suspend().then(t4, t4);
          }
        }, 3e4), e2;
      }
    }, _autoResume: function() {
      var e2 = this;
      if (e2.ctx && void 0 !== e2.ctx.resume && r.usingWebAudio) return "running" === e2.state && "interrupted" !== e2.ctx.state && e2._suspendTimer ? (clearTimeout(e2._suspendTimer), e2._suspendTimer = null) : "suspende
        e2.state = "running";
        for (var t3 = 0; t3 < e2._howls.length; t3++) e2._howls[t3]._emit("resume");
      }), e2._suspendTimer && (clearTimeout(e2._suspendTimer), e2._suspendTimer = null)) : "suspending" === e2.state && (e2._resumeAfterSuspend = true), e2;
    } };
    var r = new t2(), n = function(e2) {
      e2.src && 0 !== e2.src.length ? this.init(e2) : console.error("An array of source files must be passed with any new Howl.");
    };
    n.prototype = { init: function(e2) {
      var t3 = this;
      return r.ctx || c(), t3._autoplay = e2.autoplay || false, t3._format = "string" != typeof e2.format ? e2.format : [e2.format], t3._html5 = e2.html5 || false, t3._muted = e2.mute || false, t3._loop = e2.loop || fals
        t3.play();
      } }), t3._preload && "none" !== t3._preload && t3.load(), t3;
    }, load: function() {
      var e2, t3, o2 = null;
      if (r.noAudio) return void this._emit("loaderror", null, "No audio support.");
      "string" == typeof this._src && (this._src = [this._src]);
      for (var n2 = 0; n2 < this._src.length; n2++) {
        if (this._format && this._format[n2]) e2 = this._format[n2];
        else {
          if ("string" != typeof (t3 = this._src[n2])) {
            this._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
            continue;
          }
          (e2 = /^data:audio\/([^;,]+);/i.exec(t3)) || (e2 = /\.([^.]+)$/.exec(t3.split("?", 1)[0])), e2 && (e2 = e2[1].toLowerCase());
        }
        if (e2 || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), e2 && r.codecs(e2)) {
          o2 = this._src[n2];
          break;
        }
      }
      return o2 ? (this._src = o2, this._state = "loading", "https:" === window.location.protocol && "http:" === o2.slice(0, 5) && (this._html5 = true, this._webAudio = false), new i(this), this._webAudio && l(this), thi
```

## audio — chunks/069kld4u2z67z.js L393-410 (hit L396)
```js
    }, fade: function(e2, t3, o2, n2) {
      var i2 = this;
      if ("loaded" !== i2._state || i2._playLock) return i2._queue.push({ event: "fade", action: function() {
        i2.fade(e2, t3, o2, n2);
      } }), i2;
      e2 = Math.min(Math.max(0, parseFloat(e2)), 1), t3 = Math.min(Math.max(0, parseFloat(t3)), 1), o2 = parseFloat(o2), i2.volume(e2, n2);
      for (var a2 = i2._getSoundIds(n2), l2 = 0; l2 < a2.length; l2++) {
        var s2 = i2._soundById(a2[l2]);
        if (s2) {
          if (n2 || i2._stopFade(a2[l2]), i2._webAudio && !s2._muted) {
            var d2 = r.ctx.currentTime, u2 = d2 + o2 / 1e3;
            s2._volume = e2, s2._node.gain.setValueAtTime(e2, d2), s2._node.gain.linearRampToValueAtTime(t3, u2);
          }
          i2._startFadeInterval(s2, e2, t3, o2, a2[l2], void 0 === n2);
        }
      }
      return i2;
    }, _startFadeInterval: function(e2, t3, o2, r2, n2, i2) {
```

## pointer — chunks/3ih8kydmq861j.js L7322-7345 (hit L7328)
```js
  function lk({ title: e10, onTitleIntersect: t10, artConfig: r10 }) {
    var n10;
    let a10, s10, i10, o10, [l2, c2] = (0, P.useState)(false), { x: h2, y: u2 } = (n10 = { damping: 50, stiffness: 500, restDelta: 0.01 }, a10 = lf(0), s10 = lf(0), i10 = lC(a10, n10), o10 = lC(s10, n10), (0, P.useEffect
      function e11(e12) {
        a10.set(e12.clientX + 10), s10.set(e12.clientY + 10);
      }
      return document.addEventListener("mousemove", e11), () => document.removeEventListener("mousemove", e11);
    }, [a10, s10]), { x: i10, y: o10 }), m2 = (function({ onIntersect: e11, threshold: t11 = 1, rootMargin: r11 = "0px" }) {
      let n11 = (0, P.useRef)(null), a11 = new IntersectionObserver((t12) => {
        e11(t12[0].isIntersecting);
      }, { threshold: t11, rootMargin: r11 }), s11 = (0, P.useRef)(a11).current;
      return (0, P.useEffect)(() => {
        let e12 = n11.current;
        return e12 && s11 && s11.observe(e12), () => {
          e12 && s11 && (s11.unobserve(e12), s11.disconnect());
        };
      }, [s11]), n11;
    })({ onIntersect: t10, threshold: [0, 0.01, 0.99, 1], rootMargin: "-20px 0px" });
    return (0, L.jsxs)(lm.f, { className: lh.default.section, children: [(0, L.jsxs)("div", { className: lN.default.backgroundIcons, children: [(0, L.jsx)(lc.f, {}), (0, L.jsx)(lc.f, {}), (0, L.jsx)(lc.f, {}), (0, L.jsx)
      c2(true);
    }, onMouseLeave: () => {
      c2(false);
    }, children: e10 }), (0, L.jsx)("div", { className: lh.default.icon, children: (0, L.jsx)(lu.f, {}) }), (0, L.jsxs)("div", { className: lN.default.backgroundIcons, children: [(0, L.jsx)(lc.f, {}), (0, L.jsx)(lc.f, {}
  }
```