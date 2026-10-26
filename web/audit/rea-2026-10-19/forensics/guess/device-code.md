# guess — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, keyboard×3, observer×3, page-transition×3, raf-lerp×1, text-split×3, wheel-step×3, pointer×3, shader-uniforms×3

## loader — scripts-compressed/extract-css-moment-js-vendor-a5cfdec1ae227f33-min.en-US.js L1272-1281 (hit L1279)
```js
    function sz(M, z, b) {
      var p = this._offset || 0, O;
      if (!this.isValid()) return M != null ? this : NaN;
      if (M != null) {
        if (typeof M == "string") {
          if (M = H1(e1, M), M === null) return this;
        } else Math.abs(M) < 16 && !b && (M = M * 60);
        return !this._isUTC && z && (O = G1(this)), this._offset = M, this._isUTC = true, O != null && this.add(O, "m"), p !== M && (!z || this._changeInProgress ? X2(this, b0(M - p, "m"), 1, false) : this._changeInProgr
      } else return this._isUTC ? p : G1(this);
    }
```

## keyboard — scripts/site-bundle.17bbc1daaa96c6be161d933b8de8a091.js L104-116 (hit L116)
```js
    }, _ = [], L = function(e3) {
      if (!s2) {
        var t3 = 0, n3 = document.createTextNode("");
        new MutationObserver(function() {
          return _.splice(0).forEach(function(e4) {
            return e4();
          });
        }).observe(n3, { characterData: true }), s2 = function() {
          n3.textContent = "".concat(t3 ? t3-- : t3++);
        };
      }
      _.push(e3), s2();
    }, T = 0, P = { attributes: true, characterData: true, childList: true, subtree: true }, N = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", 
```

## loader — scripts/site-bundle.17bbc1daaa96c6be161d933b8de8a091.js L252-260 (hit L256)
```js
  }, 37634: (e2, t2) => {
    "use strict";
    var n2;
    Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0, (function(e3) {
      e3.CH = "ch", e3.EM = "em", e3.PERCENT = "%", e3.PIXEL = "px", e3.REM = "rem", e3.VIEWPORT_HEIGHT = "vh", e3.VIEWPORT_WIDTH = "vw", e3.VMAX = "vmax", e3.VMIN = "vmin";
    })(n2 || (n2 = {}));
    t2.default = n2;
    e2.exports = t2.default;
  }, 60649: (e2, t2, n2) => {
```

## loader — scripts/site-bundle.17bbc1daaa96c6be161d933b8de8a091.js L330-338 (hit L332)
```js
  }, 33579: (e2, t2) => {
    "use strict";
    Object.defineProperty(t2, "__esModule", { value: true }), t2.CROP_ARGUMENT_TO_CROP_MODE = t2.FIT_ALIGNMENT_TO_OBJECT_POSITION = t2.LEGACY_IMAGE_LOADING_CLASS = t2.IMAGE_LOADING_CLASS = t2.SQUARESPACE_SIZES = void 0;
    t2.SQUARESPACE_SIZES = [2500, 1500, 1e3, 750, 500, 300, 100];
    t2.IMAGE_LOADING_CLASS = "sqs-image-loading";
    t2.LEGACY_IMAGE_LOADING_CLASS = "loading";
    t2.FIT_ALIGNMENT_TO_OBJECT_POSITION = { horizontal: { center: "50%", left: "0%", right: "100%" }, vertical: { bottom: "100%", center: "50%", top: "0%" } };
    t2.CROP_ARGUMENT_TO_CROP_MODE = { "content-fill": "cover", fill: "cover", cover: "cover", "content-fit": "contain", fit: "contain", contain: "contain" };
  }, 48403: (e2, t2, n2) => {
```

## observer — scripts/site-bundle.17bbc1daaa96c6be161d933b8de8a091.js L420-466 (hit L436)
```js
      return (function(e3) {
        function t3() {
          var e4, o3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          return (function(e5, t4) {
            if (!(e5 instanceof t4)) throw new TypeError("Cannot call a class as a function");
          })(this, t3), (e4 = n3.call(this, o3)).intersectionObserverEntries = [], e4.lazyLoadObserver = null, e4.boundImageLoadHandler = e4._unobserverOnLoad.bind(s2(e4)), e4;
        }
        !(function(e4, t4) {
          if ("function" != typeof t4 && null !== t4) throw new TypeError("Super expression must either be null or a function");
          e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, writable: true, configurable: true } }), t4 && i2(e4, t4);
        })(t3, e3);
        var n3 = a2(t3);
        return (function(e4, t4, n4) {
          t4 && r2(e4.prototype, t4), n4 && r2(e4, n4);
        })(t3, [{ key: "loadLazy", value: function(e4) {
          var t4 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n4 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : l;
          return e4 && "IMG" === e4.tagName ? self.IntersectionObserver ? (this.lazyLoadObserver || (this.observerRootNode = n4.root || self.document.body, this.lazyLoadObserver = new IntersectionObserver(this._onObserve
        } }, { key: "loadAllLazy", value: function() {
          var e4 = this, t4 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, n4 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : document.body, o3 = 2 < arguments.length && void 0 
          if (null === n4 || !n4.querySelectorAll) return new Error("".concat(n4, " is not a valid node."));
          var r3 = n4.querySelectorAll("img[data-src]", "img[data-srcset]", "img[srcset]");
          return 0 === r3.length ? null : self.IntersectionObserver ? (this.observerRootNode = o3.root || self.document.body, this.lazyLoadObserver = new IntersectionObserver(this._onObserverChange.bind(this), o3), r3.fo
            e4._observe(n5, t4);
          }), this.lazyLoadObserver) : (this.loadAll(t4, n4), false);
        } }, { key: "_observe", value: function(e4, t4) {
          var n4 = this._getTargetNode(e4);
          return -1 === this.intersectionObserverEntries.findIndex(function(e5) {
            return e5.target === n4;
          }) && (e4.addEventListener("load", this.boundImageLoadHandler), this.lazyLoadObserver.observe(n4), void this.intersectionObserverEntries.push({ target: n4, params: t4 }));
        } }, { key: "_onObserverChange", value: function(e4) {
          var t4 = this;
          e4.forEach(function(e5) {
            e5.isIntersecting && self.requestAnimationFrame(function() {
              var n4 = "IMG" === e5.target.tagName ? e5.target : e5.target.querySelector("img"), o3 = {};
              t4.intersectionObserverEntries = t4.intersectionObserverEntries.filter(function(t5) {
                return t5.target === e5.target && (o3 = t5.params), t5.target !== e5.target;
              }), t4.load(n4, o3), t4.lazyLoadObserver.unobserve(e5.target);
            });
          });
        } }, { key: "_unobserverOnLoad", value: function(e4) {
          var t4 = e4.currentTarget, n4 = this._getTargetNode(e4.currentTarget);
          this.lazyLoadObserver.unobserve(n4), t4.removeEventListener("load", this.boundImageLoadHandler);
        } }, { key: "_getTargetNode", value: function(e4) {
          var t4 = e4.parentNode;
          return t4 === this.observerRootNode || 0 !== e4.offsetHeight ? e4 : t4;
        } }]), t3;
      })(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {});
```

## keyboard — scripts/site-bundle.17bbc1daaa96c6be161d933b8de8a091.js L1557-1597 (hit L1572)
```js
      onSubFolderOpen = (e3) => {
        if (this.depth.includes(e3)) return;
        const { folderOpenClass: t3 } = this.props, n3 = this.depth[this.depth.length - 1];
        e3.scrollTop = 0, n3.classList.add(t3), this.setActiveFolder(e3), this.depth.push(e3);
      };
      onParentFolderOpen = (e3) => {
        e3.preventDefault();
        const { folderActiveClass: t3, folderOpenClass: n3 } = this.props;
        if (this.depth.length <= 1) return;
        let o3 = this.depth[this.depth.length - 1];
        o3.classList.remove(t3);
        const r3 = o3.dataset.folder, { folderLinkSelector: i3 } = this.props, a3 = i3.trim().substring(1, i3.length - 1), s3 = document.querySelector(`[${a3}="${r3}"]`);
        s3 && s3.focus(), this.depth.pop(), o3 = this.depth[this.depth.length - 1], o3.classList.remove(n3), this.setActiveFolder(o3);
      };
      open = () => {
        this.setInitialState(), document.addEventListener("keyup", this.onKeyUp);
      };
      close = () => {
        document.removeEventListener("keyup", this.onKeyUp), this.revertFocusContainment && this.revertFocusContainment();
      };
      destroy() {
        this.unbindListeners();
      }
    }
    var g = n2(63285), v = n2(75830), b = n2(60369), m = n2.n(b), y = n2(37634), w = n2.n(y);
    const S = (e3, t3) => {
      e3.setAttribute("aria-expanded", "false"), t3 && e3.focus();
    }, E = (e3, t3) => (n3) => {
      switch (n3.code) {
        case "Escape":
          n3.preventDefault(), S(e3, true);
          break;
        case "Space":
        case "Enter":
          document.activeElement === e3 && (n3.preventDefault(), (o3 = e3).setAttribute("aria-expanded", "false" === o3.getAttribute("aria-expanded")));
      }
      var o3;
      if ("Tab" === n3.code && !n3.shiftKey) {
        const n4 = t3();
        (0 === n4.length || n4[n4.length - 1].contains(document.activeElement)) && S(e3);
      }
```

## keyboard — scripts/site-bundle.17bbc1daaa96c6be161d933b8de8a091.js L1607-1657 (hit L1645)
```js
      constructor(e3) {
        super(), this.node = e3, this.state = { isOpen: false, isVisible: false, isSwitching: false, scrollMode: r2().getValue("tweak-fixed-header-style").toLowerCase() };
        const { burgerContainerSelector: t3, burgerButtonSelector: o3, navWrapperSelector: i3, navListSelector: a3, menuSelector: s3, titleLogoSelector: c2, headerShadowSelector: d2 } = this.props, u2 = this.node.querySe
        this.ref = { burgerContainerDesktop: b2, burgerContainerMobile: v2, burgerDesktop: g2, burgerMobile: f2, navWrapper: this.node.querySelector(i3), navList: this.node.querySelector(a3), menu: this.node.querySelecto
          const t4 = JSON.parse(e4.getAttribute("data-current-styles") || "{}").iconOptions, n3 = t4.mobileDropdownIconOptions, o4 = t4.desktopDropdownIconOptions;
          let r3 = n3.folderDropdownIcon;
          r3 || (r3 = m().OPEN_ARROW_HEAD);
          const i4 = o4.folderDropdownIcon, a4 = function(e5) {
            let t5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "left";
            const a5 = "mobile" === e5 ? n3 : o4, s4 = "mobile" === e5 ? r3 : i4;
            if (!s4 || "none" === s4) return null;
            let { size: c3, iconSpacing: l2, strokeWidth: d3, endcapType: u3 } = a5;
            c3 || (c3 = { unit: w().EM, value: 1 }), l2 || (l2 = { unit: w().EM, value: "mobile" === e5 ? 0.15 : 0.35 }), d3 || (d3 = { unit: w().PIXEL, value: "mobile" === e5 ? 0.5 : 1 });
            const h3 = "round" === u3 ? "round" : "miter", f3 = u3, p2 = document.createElement("span");
            p2.style["margin-" + t5] = l2.value + l2.unit, p2.style.width = c3.value + c3.unit, p2.style.height = c3.value + c3.unit, p2.classList.add("header-dropdown-icon"), s4.toLowerCase().includes("arrow") && p2.cla
            const g3 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            g3.setAttribute("viewBox", "0 0 22 22"), g3.setAttribute("xmlns", "http://www.w3.org/2000/svg"), g3.setAttribute("stroke-linecap", f3), g3.setAttribute("stroke-linejoin", h3), g3.setAttribute("stroke-width", 
            const v3 = document.createElementNS("http://www.w3.org/2000/svg", "use");
            return v3.setAttribute("href", `#${s4}`), g3.appendChild(v3), p2.appendChild(g3), p2;
          };
          if (i4) {
            const t5 = a4("desktop");
            e4.querySelectorAll("button.header-nav-folder-title").forEach((e5) => {
              t5 && e5.insertAdjacentElement("beforeend", t5.cloneNode(true));
            });
          }
          if (r3) {
            const t5 = a4("mobile"), n4 = a4("mobile", "right"), o5 = e4.querySelectorAll("div.header-menu-nav-item-content-folder"), r4 = e4.querySelectorAll("div.header-menu-controls.container.header-menu-nav-item > a"
            o5.forEach((e5) => {
              t5 && e5.insertAdjacentElement("beforeend", t5.cloneNode(true));
            }), r4.forEach((e5) => {
              n4 && e5.insertAdjacentElement("afterbegin", n4.cloneNode(true), e5.firstChild);
            });
          }
        })(this.node), this.node.querySelectorAll(this.props.folderWrapperSelector).forEach((e4) => {
          const t4 = e4.querySelector(this.props.folderTitleSelector);
          t4.addEventListener("click", (e5) => {
            e5.preventDefault();
          }), e4.addEventListener("keydown", E(t4, () => e4.querySelectorAll(".header-nav-folder-item")));
        });
        const y2 = this.node.querySelector("#multilingual-language-picker-desktop"), S2 = this.node.querySelector("#multilingual-language-picker-mobile");
        y2 && S2 && (y2.addEventListener("keydown", E(y2, () => y2.querySelectorAll(".language-item"))), (async function(e4) {
          let t4;
          try {
            t4 = JSON.parse(e4.getAttribute("data-native-multilingual") || "{}");
          } catch (e5) {
            (0, A.A)("Header.js", "Failed to parse native multilingual data", e5 instanceof Error ? e5 : new Error(String(e5)));
          }
          t4?.enabled ? new (0, (await n2.e(5636).then(n2.bind(n2, 68976))).default)({ headerNode: e4, multilingualData: t4 }).initializeBehavior() : new (0, (await n2.e(5652).then(n2.bind(n2, 63814))).default)({ headerN
        })(this.node));
      }
```

## page-transition — scripts-compressed/common-vendors-stable-1988b40b24a74586-min.en-US.js L3344-3396 (hit L3353)
```js
  YUI.add("history-base", function(e, V) {
    var A = e.Lang, m = e.Object, _ = YUI.namespace("Env.History"), v = e.Array, u = e.config.doc, t = u.documentMode, h = e.config.win, r = { merge: true }, l = "change", n = "add", s = "replace";
    function c() {
      this._init.apply(this, arguments);
    }
    e.augment(c, e.EventTarget, null, null, { emitFacade: true, prefix: "history", preventable: false, queueable: true }), _._state || (_._state = {});
    function b(E) {
      return A.type(E) === "object";
    }
    c.NAME = "historyBase", c.SRC_ADD = n, c.SRC_REPLACE = s, c.html5 = !!(h.history && h.history.pushState && h.history.replaceState && ("onpopstate" in h || e.UA.gecko >= 2) && (!e.UA.android || e.UA.android >= 2.4)), 
      var g;
      E = this._config = E || {}, this.force = !!E.force, g = this._initialState = this._initialState || E.initialState || null, this.publish(l, { broadcast: 2, defaultFn: this._defChangeFn }), g && this.replace(g);
    }, add: function() {
      var E = v(arguments, 0, true);
      return E.unshift(n), this._change.apply(this, E);
    }, addValue: function(E, g, a) {
      var d = {};
      return d[E] = g, this._change(n, d, a);
    }, get: function(E) {
      var g = _._state, a = b(g);
      return E ? a && m.owns(g, E) ? g[E] : void 0 : a ? e.mix({}, g, true) : g;
    }, replace: function() {
      var E = v(arguments, 0, true);
      return E.unshift(s), this._change.apply(this, E);
    }, replaceValue: function(E, g, a) {
      var d = {};
      return d[E] = g, this._change(s, d, a);
    }, _change: function(E, g, a) {
      return a = a ? e.merge(r, a) : r, a.merge && b(g) && b(_._state) && (g = e.merge(_._state, g)), this._resolveChanges(E, g, a), this;
    }, _fireEvents: function(E, g, a) {
      this.fire(l, { _options: a, changed: g.changed, newVal: g.newState, prevVal: g.prevState, removed: g.removed, src: E }), m.each(g.changed, function(d, o) {
        this._fireChangeEvent(E, o, d);
      }, this), m.each(g.removed, function(d, o) {
        this._fireRemoveEvent(E, o, d);
      }, this);
    }, _fireChangeEvent: function(E, g, a) {
      this.fire(g + "Change", { newVal: a.newVal, prevVal: a.prevVal, src: E });
    }, _fireRemoveEvent: function(E, g, a) {
      this.fire(g + "Remove", { prevVal: a, src: E });
    }, _resolveChanges: function(E, g, a) {
      var d = {}, o, i = _._state, p = {};
      g || (g = {}), a || (a = {}), b(g) && b(i) ? (m.each(g, function(f, y) {
        var N = i[y];
        f !== N && (d[y] = { newVal: f, prevVal: N }, o = true);
      }, this), m.each(i, function(f, y) {
        (!m.owns(g, y) || g[y] === null) && (delete g[y], p[y] = f, o = true);
      }, this)) : o = g !== i, (o || this.force) && this._fireEvents(E, { changed: d, newState: g, prevState: i, removed: p }, a);
    }, _storeState: function(E, g) {
      _._state = g || {};
    }, _defChangeFn: function(E) {
      this._storeState(E.src, E.newVal, E._options);
    } }, true), e.HistoryBase = c;
  }, "3.17.2", { requires: ["event-custom-complex"] });
```

## page-transition — scripts-compressed/common-vendors-stable-1988b40b24a74586-min.en-US.js L3493-3511 (hit L3494)
```js
  YUI.add("history-html5", function(e, V) {
    var A = e.HistoryBase, m = e.Lang, _ = e.config.win, v = e.config.useHistoryHTML5, u = "popstate", t = A.SRC_REPLACE;
    function h() {
      h.superclass.constructor.apply(this, arguments);
    }
    e.extend(h, A, { _init: function(r) {
      var l;
      try {
        l = _.history.state;
      } catch {
        l = null;
      }
      e.Object.isEmpty(l) && (l = null), r || (r = {}), r.initialState && m.type(r.initialState) === "object" && m.type(l) === "object" ? this._initialState = e.merge(r.initialState, l) : this._initialState = l, e.on("po
    }, _storeState: function(r, l, n) {
      r !== u && _.history[r === t ? "replaceState" : "pushState"](l, n.title || e.config.doc.title || "", n.url || e.config.doc.URL), h.superclass._storeState.apply(this, arguments);
    }, _onPopState: function(r) {
      this._resolveChanges(u, r._event.state || null);
    } }, { NAME: "historyhtml5", SRC_POPSTATE: u }), e.Node.DOM_EVENTS.popstate || (e.Node.DOM_EVENTS.popstate = 1), e.HistoryHTML5 = h, (v === true || v !== false && A.html5) && (e.History = h);
  }, "3.17.2", { optional: ["json"], requires: ["event-base", "history-base", "node-base"] });
```

## raf-lerp — scripts-compressed/common-vendors-bded37ca73fe21ab-min.en-US.js L702-734 (hit L730)
```js
        switch (x) {
          case 69:
          case 101:
            if (s & 4) return "Extra exponent character at ".concat(C);
            if (r.length > 0) return "Exponent too large";
            if (R === 0) return "Exponent not provided";
            s |= 4, s &= -2, R = 0, o = a === -1 ? -m : m, a = 1, m = 0, A = 0;
            break;
          case 45:
          case 43:
            if (R === 0) return "Found a bare sign symbol";
            if (s & 1) return "Duplicate sign character at ".concat(C);
            a = x === 45 ? -1 : 1, s |= 1;
            break;
          case 46:
            if (s & 2) return "Extra radix point seen at ".concat(C);
            s |= 2, o -= R;
            break;
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            m += (x - 48) * er[A], A++, R++, A === 7 && (r.push(m), m = 0, A = 0);
            break;
          default:
            return "Unexpected character at ".concat(C, ": ").concat(e[C]);
        }
```

## text-split — scripts-compressed/common-vendors-bded37ca73fe21ab-min.en-US.js L4475-4484 (hit L4476)
```js
    function S(T, l) {
      var y = T.split("_"), v = y[0], b = y[1], M = y[2], I = y[3], D = y[4], B = y[5], w = y[6], $ = f(w), H = B ? B.split("").map(function(O) {
        return E[O];
      }) : [], k = $.length;
      if (k > 0) {
        $[0] = l[$[0]] * 1e3;
        for (var N = 1; N < k; N++) $[N] = $[N - 1] + l[$[N]] * 1e3;
      }
      this.stdoff = parseInt(v, 36) * 1e3, this.latitude = parseInt(b, 36) / 1e6, this.longitude = parseInt(M, 36) / 1e6, this.countries = I ? I.split(",") : [], this.localtime = D.split("|").map(this.decodeInfo), this.t
    }
```

## observer — scripts-compressed/performance-d93749be3aac86ef-min.en-US.js L128-135 (hit L128)
```js
      const O = new Set(f), C = new IntersectionObserver((V) => {
        V.forEach((K) => {
          let { target: le, isIntersecting: Ae } = K;
          if (!O.delete(le)) return;
          const Q = le.tagName === "IMG", ae = le.loading === "lazy";
          Ae && ae ? g[Q ? "inViewportLazyImgs" : "inViewportLazyVideos"]++ : !Ae && !ae && g[Q ? "outsideViewportEagerImgs" : "outsideViewportEagerVideos"]++, C.unobserve(le);
        }), O.size || (C.disconnect(), y(g));
      });
```

## page-transition — scripts-compressed/performance-d93749be3aac86ef-min.en-US.js L1881-1890 (hit L1888)
```js
    enable() {
      if (this._isEnabled) return;
      this._isEnabled = true;
      const e = this._getNavigationApi();
      !e && !this._isHistoryPatched && (this._patchHistoryApi(), this._isHistoryPatched = true), this._waitForPageLoad(), e ? (this._onCurrentEntryChange = (t) => {
        this._onSoftNavigation("currententrychange", t);
      }, e.addEventListener("currententrychange", this._onCurrentEntryChange)) : (this._onPopState = () => {
        this._onSoftNavigation("popstate");
      }, window.addEventListener("popstate", this._onPopState));
    }
```

## observer — scripts-compressed/performance-d93749be3aac86ef-min.en-US.js L3303-3310 (hit L3304)
```js
    return new Promise((q) => {
      const re = new IntersectionObserver((Yt) => {
        Yt.forEach((lt) => {
          if (lt.target === D) return re.disconnect(), q({ visibleOnLoad: lt.isIntersecting, observationTime: Math.floor(lt.time), intersectionRatio: lt.intersectionRatio, squarespaceSize: c, imageType: u, imageLoaderTyp
        });
      });
      re.observe(D);
    });
```

## text-split — scripts-compressed/commerce-604cb982123dab6f-min.en-US.js L1400-1427 (hit L1401)
```js
      return function(T) {
        switch (T = T.split("").map(function(B) {
          return w[B] || A[B] || B;
        }).join(""), k) {
          case "infinity":
            N = 1 / 0;
            break;
          case "nan":
            N = NaN;
            break;
          case "number":
            T = T.replace(/,/g, ""), N = +T;
            break;
          case "prefix":
          case "negativePrefix":
            D = T;
            break;
          case "suffix":
            H = T;
            break;
          case "negativeSuffix":
            H = T, y = true;
            break;
          default:
            throw new Error("Internal error");
        }
        return "";
      };
```

## wheel-step — scripts-compressed/commerce-604cb982123dab6f-min.en-US.js L12274-12314 (hit L12289)
```js
        return 1;
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
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Hs()) {
          case zs:
            return 1;
          case Zo:
            return 4;
          case ze:
          case mt:
            return 16;
          case js:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Yr = null, va = null, lo = null;
  function as() {
```

## wheel-step — scripts-compressed/commerce-604cb982123dab6f-min.en-US.js L12365-12405 (hit L12380)
```js
  }
  var cl = q({}, po, { key: function(e) {
    if (e.key) {
      var t = ul[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Bn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? nc[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: eu, charCode: function(e) {
    return e.type === "keypress" ? Bn(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Bn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), rc = tr(cl), ss = q({}, De, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ll = tr(ss), Af = q({}, po, { touches: 0, target
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  }, deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), _r = tr(fl), cs = [9, 13, 27, 32], yr = H && "CompositionEvent" in window, ls = null;
  H && "documentMode" in document && (ls = document.documentMode);
  var Gl = H && "TextEvent" in window && !ls, ic = H && (!yr || ls && 8 < ls && 11 >= ls), tu = " ", xt = false;
  function Er(e, t) {
    switch (e) {
      case "keyup":
        return cs.indexOf(t.keyCode) !== -1;
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
  function Kl(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var mn = false;
  function wf(e, t) {
    switch (e) {
      case "compositionend":
```

## wheel-step — scripts-compressed/commerce-604cb982123dab6f-min.en-US.js L12634-12646 (hit L12645)
```js
  function hl(e, t, o, l) {
    switch (_n(t)) {
      case 1:
        var _ = ns;
        break;
      case 4:
        _ = sl;
        break;
      default:
        _ = Xs;
    }
    o = _.bind(null, t, o, e), _ = void 0, !qo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (_ = true), l ? _ !== void 0 ? e.addEventListener(t, o, { capture: true, passive: _ }) : e.addEventListener(t,
  }
```

## pointer — scripts-compressed/common-7d289a9a1e9549aa-min.en-US.js L3527-3542 (hit L3539)
```js
    }, setupNavigationFade: function() {
      var m, _ = function() {
        m && m.cancel();
      }, y = function(E) {
        _(), E && E.inViewportRegion() && (E.addClass("mouseover").siblings().removeClass("mouseover"), m = d.later(500, this, function() {
          E && E.inViewportRegion() && E.removeClass("mouseover");
        }));
      };
      this._event(this._nextEl.on("mouseenter", function() {
        _();
      }), "nav-next-onmouse"), this._event(this._previousEl.on("mouseenter", function() {
        _();
      }), "nav-prev-onmouse"), this._event(this._lightboxContentEl.on("mousemove", d.bind(function(E) {
        E.clientX < d.one("body").get("winWidth") / 2 ? y(this._previousEl) : y(this._nextEl);
      }, this)), "container-hovering");
    }, createSlideshow: function(m) {
```

## text-split — scripts-compressed/common-7d289a9a1e9549aa-min.en-US.js L3730-3757 (hit L3731)
```js
      return function(M) {
        switch (M = M.split("").map(function(x) {
          return m[x] || _[x] || x;
        }).join(""), I) {
          case "infinity":
            c = 1 / 0;
            break;
          case "nan":
            c = NaN;
            break;
          case "number":
            M = M.replace(/,/g, ""), c = +M;
            break;
          case "prefix":
          case "negativePrefix":
            h = M;
            break;
          case "suffix":
            g = M;
            break;
          case "negativeSuffix":
            g = M, u = true;
            break;
          default:
            throw new Error("Internal error");
        }
        return "";
      };
```

## shader-uniforms — scripts-compressed/common-7d289a9a1e9549aa-min.en-US.js L19865-19876 (hit L19868)
```js
    setInitialState() {
      const { isAnimationEnabled: oe, animation: Se, direction: Ue } = this.config;
      if (oe && Se === "draw") {
        this.uniforms.progressReveal.value = 1, this.uniforms.progressDraw.value = Ue === "right" ? -1 : 1;
        return;
      }
      if (oe && (Se === "fade" || Se === "fadeScale")) {
        this.uniforms.progressReveal.value = 0, this.uniforms.progressDraw.value = 0;
        return;
      }
      this.uniforms.progressReveal.value = 1, this.uniforms.progressDraw.value = 0;
    }
```

## shader-uniforms — scripts-compressed/common-7d289a9a1e9549aa-min.en-US.js L19894-19897 (hit L19896)
```js
    onUpdateDraw = (oe) => {
      const { onUpdate: Se } = this.props;
      this.uniforms.progressDraw.value = oe, Se();
    };
```

## shader-uniforms — scripts-compressed/common-7d289a9a1e9549aa-min.en-US.js L19898-19901 (hit L19900)
```js
    onUpdateReveal = (oe) => {
      const { onUpdate: Se } = this.props;
      this.uniforms.progressReveal.value = oe, Se();
    };
```

## pointer — scripts/product-detail.83fdeb19237c5a979d15.js L226-233 (hit L229)
```js
      return function(e2) {
        let i2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        try {
          document.addEventListener("scroll", t2.#S), t2._node.addEventListener("mousemove", t2.#w), t2._node.classList.add("is-zoomed"), t2.#a = true, t2._props.onZoomIn(i2);
        } catch (t3) {
          (0, p.A)("ProductGalleryItem", "Failed to zoom in", t3);
        }
      };
```

## pointer — scripts/product-list.c48df97d7a2b831ccf1d.js L173-180 (hit L179)
```js
    #y = (e2) => {
      const t2 = () => {
        e2.style.display = "block", g(e2).then(() => {
          e2.classList.add("loaded");
        });
      };
      this._node.matches(":hover") ? t2() : this._node.addEventListener("mousemove", t2, { once: true });
    };
```