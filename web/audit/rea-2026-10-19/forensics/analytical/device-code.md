# analytical — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: page-transition×3, loader×3, keyboard×3, wheel-step×2, observer×3, pointer×1, raf-lerp×1

## page-transition — embed/v2.js L1875-1915 (hit L1890)
```js
            u3.status_code = e4.status;
            const t5 = p(e4);
            t5 && (u3.correlationId = t5);
            return e4;
          }));
        } };
        return n4;
      }), n3);
      if (t3.dom && this._hasDocument) if (_.addEventListener) {
        _.addEventListener("click", e3._breadcrumbEventHandler("click"), false);
        _.addEventListener("keypress", e3._keypressEventHandler(), false);
      } else {
        _.attachEvent("onclick", e3._breadcrumbEventHandler("click"));
        _.attachEvent("onkeypress", e3._keypressEventHandler());
      }
      var i2 = v.chrome, o2 = !(i2 && i2.app && i2.app.runtime) && v.history && history.pushState && history.replaceState;
      if (t3.location && o2) {
        var s2 = v.onpopstate;
        v.onpopstate = function() {
          var t4 = e3._location.href;
          e3._captureUrlChange(e3._lastHref, t4);
          if (s2) return s2.apply(this, arguments);
        };
        var u2 = function(t4) {
          return function() {
            var n4 = arguments.length > 2 ? arguments[2] : void 0;
            n4 && e3._captureUrlChange(e3._lastHref, n4 + "");
            return t4.apply(this, arguments);
          };
        };
        (0, l.fill)(history, "pushState", u2, n3);
        (0, l.fill)(history, "replaceState", u2, n3);
      }
      if (t3.console && "console" in v && console.log) {
        var c2 = function(t4, n4) {
          e3.captureBreadcrumb({ message: t4, level: n4.level, category: "console" });
        };
        (0, l.each)(["debug", "info", "warn", "error", "log"], (function(e4, t4) {
          d(console, t4, c2);
        }));
      }
```

## loader — embed/v2.js L3742-3749 (hit L3745)
```js
          if (i2 !== e3) {
            if (!t4 || this._changeInProgress) Rr(this, Nr(e3 - i2, "m"), 1, false);
            else if (!this._changeInProgress) {
              this._changeInProgress = true;
              r2.updateOffset(this, true);
              this._changeInProgress = null;
            }
          }
```

## keyboard — embed/v2.js L6587-6627 (hit L6602)
```js
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
```

## page-transition — embed/v2.js L6620-6660 (hit L6635)
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
          switch (at()) {
```

## keyboard — embed/v2.js L6742-6748 (hit L6747)
```js
    var Fn = B({}, Sn, { key: function(e3) {
      if (e3.key) {
        var t3 = Dn[e3.key] || e3.key;
        if ("Unidentified" !== t3) return t3;
      }
      return "keypress" === e3.type ? 13 === (e3 = mn(e3)) ? "Enter" : String.fromCharCode(e3) : "keydown" === e3.type || "keyup" === e3.type ? Rn[e3.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: jn, charCode: function(e3) {
```

## keyboard — embed/v2.js L6736-6776 (hit L6751)
```js
      var t3 = this.nativeEvent;
      return t3.getModifierState ? t3.getModifierState(e3) : !!(e3 = Ln[e3]) && !!t3[e3];
    }
    function jn() {
      return Cn;
    }
    var Fn = B({}, Sn, { key: function(e3) {
      if (e3.key) {
        var t3 = Dn[e3.key] || e3.key;
        if ("Unidentified" !== t3) return t3;
      }
      return "keypress" === e3.type ? 13 === (e3 = mn(e3)) ? "Enter" : String.fromCharCode(e3) : "keydown" === e3.type || "keyup" === e3.type ? Rn[e3.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: jn, charCode: function(e3) {
      return "keypress" === e3.type ? mn(e3) : 0;
    }, keyCode: function(e3) {
      return "keydown" === e3.type || "keyup" === e3.type ? e3.keyCode : 0;
    }, which: function(e3) {
      return "keypress" === e3.type ? mn(e3) : "keydown" === e3.type || "keyup" === e3.type ? e3.keyCode : 0;
    } }), Pn = gn(Fn), Un = gn(B({}, In, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), Bn = gn(B({}, Sn, { touches: 0, targetTouc
      return "deltaX" in e3 ? e3.deltaX : "wheelDeltaX" in e3 ? -e3.wheelDeltaX : 0;
    }, deltaY: function(e3) {
      return "deltaY" in e3 ? e3.deltaY : "wheelDeltaY" in e3 ? -e3.wheelDeltaY : "wheelDelta" in e3 ? -e3.wheelDelta : 0;
    }, deltaZ: 0, deltaMode: 0 }), Hn = gn(zn), Gn = [9, 13, 27, 32], $n = c && "CompositionEvent" in window, Yn = null;
    c && "documentMode" in document && (Yn = document.documentMode);
    var qn = c && "TextEvent" in window && !Yn, Wn = c && (!$n || Yn && 8 < Yn && 11 >= Yn), Kn = String.fromCharCode(32), Qn = false;
    function Jn(e3, t3) {
      switch (e3) {
        case "keyup":
          return -1 !== Gn.indexOf(t3.keyCode);
        case "keydown":
          return 229 !== t3.keyCode;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function Xn(e3) {
      return "object" == typeof (e3 = e3.detail) && "data" in e3 ? e3.data : null;
```

## wheel-step — embed/v2.js L7047-7062 (hit L7060)
```js
    function ra(e3, t3, n3, r2) {
      switch (ln(t3)) {
        case 1:
          var a2 = nn;
          break;
        case 4:
          a2 = rn;
          break;
        default:
          a2 = an;
      }
      n3 = a2.bind(null, t3, n3, e3);
      a2 = void 0;
      !Fe || "touchstart" !== t3 && "touchmove" !== t3 && "wheel" !== t3 || (a2 = true);
      r2 ? void 0 !== a2 ? e3.addEventListener(t3, n3, { capture: true, passive: a2 }) : e3.addEventListener(t3, n3, true) : void 0 !== a2 ? e3.addEventListener(t3, n3, { passive: a2 }) : e3.addEventListener(t3, n3, fals
    }
```

## wheel-step — embed/v2.js L7136-7176 (hit L7151)
```js
              case "touchmove":
              case "touchstart":
                l3 = Bn;
                break;
              case Br:
              case Vr:
              case zr:
                l3 = Nn;
                break;
              case Hr:
                l3 = Vn;
                break;
              case "scroll":
                l3 = kn;
                break;
              case "wheel":
                l3 = Hn;
                break;
              case "copy":
              case "cut":
              case "paste":
                l3 = xn;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                l3 = Un;
            }
            var c2 = 0 != (4 & t3), d2 = !c2 && "scroll" === e3, f2 = c2 ? null !== s3 ? s3 + "Capture" : null : s3;
            c2 = [];
            for (var m2, p2 = r3; null !== p2; ) {
              var h2 = (m2 = p2).stateNode;
              5 === m2.tag && null !== h2 && (m2 = h2, null !== f2 && (null != (h2 = je(p2, f2)) && c2.push(ia(p2, h2, m2))));
              if (d2) break;
              p2 = p2.return;
            }
```

## loader — embed/v2.js L13384-13424 (hit L13399)
```js
          return Jl(((e4) => Object.keys(e4).reduce(n3, e4)), ((e4) => Object.keys(e4).reduce(r2, e4)))(e3);
        }
        case _t: {
          const { data: { validationResults: t4 = [] } = {} } = n2;
          return t4.reduce(((t5, { fieldName: n3, formSubmissionValidationType: r2, localizedVisitorErrorMessage: a2 }) => {
            const i2 = e3[n3];
            if (!i2) return t5;
            const o2 = nu([{ key: r2, message: a2 }], { values: [i2.value] });
            return Object.assign({}, t5, { [n3]: Object.assign({}, i2, { errors: o2 }) });
          }), e3);
        }
        default:
          return e3;
      }
    };
    const au = { loading: true, loaded: false, error: false, themeName: "", portalId: "", guid: "", thankYouMessage: "", submitText: "", cssClass: "" };
    var iu = (e3 = au, t3 = {}) => {
      switch (t3.type) {
        case Ke: {
          const { form: { themeName: n2, portalId: r2, guid: a2, inlineMessage: i2, submitText: o2, formTypeNumber: s2 = 11, cssClass: l2 } = {}, properties: u2 = {}, normalized: { metaData: { allowCookieReset: c2 = "fal
          return Object.assign({}, e3, { cssClass: l2, themeName: n2, portalId: r2, guid: a2, thankYouMessage: i2, submitText: o2, formTypeNumber: s2, hasKnownProperties: Object.keys(u2).length > 0, allowCookieReset: "tr
        }
        case Qe:
          return Object.assign({}, e3, { error: true, loading: false });
        case Xe:
          return Object.assign({}, e3, { hasKnownProperties: false });
        default:
          return e3;
      }
    };
    const ou = {};
    var su = (e3 = ou, { type: t3, payload: n2 }) => t3 === Ke ? Object.assign({}, e3, n2.gates) : e3, lu = (e3 = [], { type: t3, payload: n2 } = {}) => {
      switch (t3) {
        case Ke: {
          const { normalized: { groups: e4 } = {} } = n2;
          return e4;
        }
        case Xe:
          return e3.map(((e4) => Object.assign({}, e4, { shown: e4.default })));
        default:
          return e3;
```

## observer — embed/v2.js L13748-13755 (hit L13752)
```js
      (0, i.useEffect)((() => {
        const a3 = e3 && e3.current;
        if (!!!window.IntersectionObserver || l2 || !a3) return () => {
        };
        const i2 = new IntersectionObserver(u2, { threshold: t3, root: n2, rootMargin: r2 });
        i2.observe(a3);
        return () => i2.disconnect();
      }), [e3, JSON.stringify(t3), n2, r2, l2]);
```

## observer — js/frontend-modules.min.js?ver=4.2.4 L465-493 (hit L479)
```js
}, 2970: (e, t, r) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, r(5724);
  t.default = class Scroll {
    static scrollObserver(e2) {
      let t2 = 0;
      const r2 = { root: e2.root || null, rootMargin: e2.offset || "0px", threshold: ((e3 = 0) => {
        const t3 = [];
        if (e3 > 0 && e3 <= 100) {
          const r3 = 100 / e3;
          for (let e4 = 0; e4 <= 100; e4 += r3) t3.push(e4 / 100);
        } else t3.push(0);
        return t3;
      })(e2.sensitivity) };
      return new IntersectionObserver(function handleIntersect(r3) {
        const n = r3[0].boundingClientRect.y, i = r3[0].isIntersecting, s = n < t2 ? "down" : "up", o = Math.abs(parseFloat((100 * r3[0].intersectionRatio).toFixed(2)));
        e2.callback({ sensitivity: e2.sensitivity, isInViewport: i, scrollPercentage: o, intersectionScrollDirection: s }), t2 = n;
      }, r2);
    }
    static getElementViewportPercentage(e2, t2 = {}) {
      const r2 = e2[0].getBoundingClientRect(), n = t2.start || 0, i = t2.end || 0, s = window.innerHeight * n / 100, o = window.innerHeight * i / 100, a = r2.top - window.innerHeight, c = 0 - a + s, l = r2.top + s + e2.
      return parseFloat((100 * u).toFixed(2));
    }
    static getPageScrollPercentage(e2 = {}, t2) {
      const r2 = e2.start || 0, n = e2.end || 0, i = t2 || document.documentElement.scrollHeight - document.documentElement.clientHeight, s = i * r2 / 100, o = i + s + i * n / 100;
      return (document.documentElement.scrollTop + document.body.scrollTop + s) / o * 100;
    }
  };
}, 3005: (e, t, r) => {
```

## loader — js/frontend.min.js?ver=4.2.4 L182-225 (hit L188)
```js
}, 4252: (e, t, n) => {
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0, n(4846), n(6211);
  class LightboxManager extends elementorModules.ViewModule {
    static getLightbox() {
      const e2 = new Promise((e3) => {
        Promise.all([n.e(786), n.e(216)]).then(n.t.bind(n, 3942, 23)).then(({ default: t3 }) => e3(new t3()));
      }), t2 = elementorFrontend.utils.assetsLoader.load("script", "dialog"), r = elementorFrontend.utils.assetsLoader.load("style", "dialog"), o = elementorFrontend.utils.assetsLoader.load("script", "share-link"), s = e
      return Promise.all([e2, t2, r, o, s, i]).then(() => e2);
    }
    getDefaultSettings() {
      return { selectors: { links: "a, [data-elementor-lightbox]", slideshow: "[data-elementor-lightbox-slideshow]" } };
    }
    getDefaultElements() {
      return { $links: jQuery(this.getSettings("selectors.links")), $slideshow: jQuery(this.getSettings("selectors.slideshow")) };
    }
    isLightboxLink(e2) {
      if ("a" === e2.tagName.toLowerCase() && (e2.hasAttribute("download") || !/^[^?]+\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(e2.href)) && !e2.dataset.elementorLightboxVideo) return false;
      const t2 = elementorFrontend.getKitSettings("global_image_lightbox"), n2 = e2.dataset.elementorOpenLightbox;
      return "yes" === n2 || t2 && "no" !== n2;
    }
    isLightboxSlideshow() {
      return 0 !== this.elements.$slideshow.length;
    }
    async onLinkClick(e2) {
      const t2 = e2.currentTarget, n2 = jQuery(e2.target), r = elementorFrontend.isEditMode(), o = r && elementor.$previewContents.find("body").hasClass("elementor-editor__ui-state__color-picker"), s = !!n2.closest(".ele
      if (!this.isLightboxLink(t2)) return void (r && s && e2.preventDefault());
      if (e2.preventDefault(), r && !elementor.getPreferences("lightbox_in_editor")) return;
      if (o) return;
      (await LightboxManager.getLightbox()).createLightbox(t2);
    }
    bindEvents() {
      elementorFrontend.elements.$document.on("click", this.getSettings("selectors.links"), (e2) => this.onLinkClick(e2));
    }
    onInit(...e2) {
      super.onInit(...e2), elementorFrontend.isEditMode() || this.maybeActivateLightboxOnLink();
    }
    maybeActivateLightboxOnLink() {
      this.elements.$links.each((e2, t2) => {
        if (this.isLightboxLink(t2)) return LightboxManager.getLightbox(), false;
      });
    }
  }
  t.default = LightboxManager;
}, 4799: (e, t) => {
```

## pointer — js/frontend.min.js?ver=4.2.3 L362-402 (hit L377)
```js
    destroy() {
      this.removeAnimationFrameRequest(), this.removeIntersectionObserver();
    }
    onInit() {
      super.onInit();
    }
  }
  t.default = _default;
}, 5481(e, t, n) {
  "use strict";
  var s = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = s(n(3323));
  class MouseMoveInteraction extends i.default {
    bindEvents() {
      MouseMoveInteraction.mouseTracked || (elementorFrontend.elements.$window.on("mousemove", MouseMoveInteraction.updateMousePosition), MouseMoveInteraction.mouseTracked = true);
    }
    run() {
      const e2 = MouseMoveInteraction.mousePosition, t2 = this.oldMousePosition;
      if (t2.x === e2.x && t2.y === e2.y) return;
      this.oldMousePosition = { x: e2.x, y: e2.y };
      const n2 = 100 / innerWidth * e2.x, s2 = 100 / innerHeight * e2.y;
      this.runCallback(n2, s2);
    }
    onInit() {
      this.oldMousePosition = {}, super.onInit();
    }
  }
  t.default = MouseMoveInteraction, MouseMoveInteraction.mousePosition = {}, MouseMoveInteraction.updateMousePosition = (e2) => {
    MouseMoveInteraction.mousePosition = { x: e2.clientX, y: e2.clientY };
  };
}, 2647(e, t, n) {
  "use strict";
  var s = n(6784);
  Object.defineProperty(t, "__esModule", { value: true }), t.default = void 0;
  var i = s(n(3323));
  class _default extends i.default {
    run() {
      if (pageYOffset === this.windowScrollTop) return false;
      this.onScrollMovement(), this.windowScrollTop = pageYOffset;
    }
```

## page-transition — js/elements-handlers.min.js?ver=4.2.3 L241-251 (hit L250)
```js
    updateURLQueryString(e2, t2) {
      const n2 = new URL(window.location.href).searchParams, o2 = this.getQueryStringInObjectForm(), s2 = new URLSearchParams();
      n2.forEach((t3, n3) => {
        n3.startsWith("e-filter") || s2.append(n3, t3), n3.startsWith("e-page-" + e2) && s2.delete(n3);
      });
      for (const e3 in o2) s2.set(e3, o2[e3]);
      let r2 = s2.toString();
      r2 = r2.replace(new RegExp(`${l.queryConstants.AND.separator.encoded}`, "g"), l.queryConstants.AND.separator.decoded), r2 = r2.replace(new RegExp(`${l.queryConstants.OR.separator.encoded}`, "g"), l.queryConstants.O
      const i2 = this.getFilterHelperAttributes(t2);
      r2 = i2.pageNum > 1 ? r2 ? this.formatQueryString(i2.baseUrl, r2) : i2.baseUrl : r2 ? `?${r2}` : location.pathname, history.pushState(null, null, r2);
    }
```

## observer — js/elements-handlers.min.js?ver=4.2.3 L1006-1012 (hit L1007)
```js
    setUpIntersectionObserver() {
      this.observer = new IntersectionObserver((e2) => {
        e2.forEach((e3) => {
          e3.isIntersecting && this.callback();
        });
      });
    }
```

## raf-lerp — scripts/tld.min.js?ver=2.3.1 L235-247 (hit L240)
```js
        function encode(input) {
          var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, inputLength, handledCPCountPlusOne, baseMinusT, qMinusT, output = [];
          for (inputLength = (input = ucs2decode(input)).length, n = initialN, delta = 0, bias = initialBias, j = 0; j < inputLength; ++j) (currentValue = input[j]) < 128 && output.push(stringFromCharCode(currentValue));
          for (handledCPCount = basicLength = output.length, basicLength && output.push(delimiter); handledCPCount < inputLength; ) {
            for (m = maxInt, j = 0; j < inputLength; ++j) (currentValue = input[j]) >= n && currentValue < m && (m = currentValue);
            for (m - n > floor((maxInt - delta) / (handledCPCountPlusOne = handledCPCount + 1)) && error("overflow"), delta += (m - n) * handledCPCountPlusOne, n = m, j = 0; j < inputLength; ++j) if ((currentValue = inpu
              for (q = delta, k = base; !(q < (t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias)); k += base) qMinusT = q - t, baseMinusT = base - t, output.push(stringFromCharCode(digitToBasic(t + qMinusT % bas
              output.push(stringFromCharCode(digitToBasic(q, 0))), bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength), delta = 0, ++handledCPCount;
            }
            ++delta, ++n;
          }
          return output.join("");
        }
```