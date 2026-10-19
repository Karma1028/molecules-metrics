# zighead — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, keyboard×3, page-transition×3, wheel-step×3, text-split×3, audio×1, pointer×1, observer×1

## loader — gen/packed_store.68d54223.js L102-108 (hit L102)
```js
    this.hideLoader = function(callback) {
      this.$(".content").removeClass("loading");
      this.resizeTo();
      if (typeof callback === "function") {
        callback();
      }
    };
```

## loader — gen/packed_store.68d54223.js L94-134 (hit L109)
```js
      this.$content.html(baseHTML);
      this.$(".checkout-items .error .qty.column").each(function() {
        var $this = $2(this);
        $this.popup({ distanceAway: -6, exclusive: false, html: function() {
          return $2("#lowStock").html().format($this.data("stock"));
        } });
      });
    };
    this.hideLoader = function(callback) {
      this.$(".content").removeClass("loading");
      this.resizeTo();
      if (typeof callback === "function") {
        callback();
      }
    };
    this.showLoader = function() {
      this.$(".content").addClass("loading");
    };
    this.showErrorAlert = function(resp) {
      var error = $2.extend({}, this.templates.error, resp);
      sellfy2.helpers.show_alert(error.header, error.error);
    };
    this.modelLoaded = function(callback, inlineCallback, model) {
      this.render(model);
      if (typeof callback === "function") {
        callback.call(this, model);
      }
      if (typeof inlineCallback === "function") {
        inlineCallback.call(this, model);
      }
    };
    this.onFetch = function() {
      this.showLoader();
    };
    this.onFail = function(resp) {
      if (resp.status > 0) {
        this.showErrorAlert(resp.responseJSON);
        this.model && this.render(this.model);
      }
    };
    this.fetch = function(options) {
```

## loader — gen/packed_store.68d54223.js L390-399 (hit L390)
```js
window.delayedScriptLoader = (src, delay = 300) => {
  if (!src) return;
  setTimeout(() => {
    const scriptNode = document.createElement("script");
    scriptNode.async = true;
    scriptNode.defer = true;
    scriptNode.src = src;
    document.head.appendChild(scriptNode);
  }, delay);
};
```

## keyboard — gen/packed_store.68d54223.js L662-673 (hit L665)
```js
    this.render = function() {
      this.$form = this.$(".contact-seller-form").on("submit", $2.proxy(this.contactSeller, this));
      this.$formCharCounter = this.$form.find(".current-char-count");
      this.$form.find("textarea").on("keyup", $2.proxy(this.countChars, this));
      this.$subscribeForm = this.$(".subscribe-to-store").on("submit", $2.proxy(this.subscribeToSeller, this));
      this.$signInForm = this.$(".sign-in-to-store").on("submit", $2.proxy(this.signInToStore, this));
      this.$signUpForm = this.$(".sign-up-to-store").on("submit", $2.proxy(this.signUpToStore, this));
      this.$resendEmailForm = this.$(".resend-purchase-email").on("submit", $2.proxy(this.resendProductEmail, this));
      this.cart = new sellfy2.CartView(".navigation .shopping-cart-widget");
      this.cart.init();
      if (window._ga) ga("clientTracker.send", "pageview");
    };
```

## keyboard — gen/packed_store.libs.e6099e70.js L2391-2394 (hit L2393)
```js
      } }, bind: { events: function() {
        module2.verbose("Attaching checkbox events");
        $module.on("click" + eventNamespace, module2.event.click).on("keydown" + eventNamespace, selector.input, module2.event.keydown).on("keyup" + eventNamespace, selector.input, module2.event.keyup);
      } }, unbind: { events: function() {
```

## keyboard — gen/packed_store.libs.e6099e70.js L3066-3072 (hit L3068)
```js
      }, bind: { keyboardEvents: function() {
        module2.debug("Binding keyboard events");
        $module.on("keydown" + eventNamespace, module2.event.keydown);
        if (module2.is.searchable()) {
          $module.on(module2.get.inputEvent(), selector.search, module2.event.input);
        }
      }, touchEvents: function() {
```

## page-transition — gen/packed_store.libs.e6099e70.js L4436-4497 (hit L4437)
```js
      } }, changeTab: function(tabPath) {
        var pushStateAvailable = window2.history && window2.history.pushState, shouldIgnoreLoad = pushStateAvailable && settings.ignoreFirstLoad && firstLoad, remoteContent = settings.auto || $2.isPlainObject(settings.ap
        tabPath = module2.utilities.arrayToPath(pathArray);
        $2.each(pathArray, function(index, tab) {
          var currentPathArray = pathArray.slice(0, index + 1), currentPath = module2.utilities.arrayToPath(currentPathArray), isTab = module2.is.tab(currentPath), isLastIndex = index + 1 == pathArray.length, $tab = modu
          module2.verbose("Looking for tab", tab);
          if (isTab) {
            module2.verbose("Tab was found", tab);
            activeTabPath = currentPath;
            parameterArray = module2.utilities.filterArray(pathArray, currentPathArray);
            if (isLastIndex) {
              isLastTab = true;
            } else {
              nextPathArray = pathArray.slice(0, index + 2);
              nextPath = module2.utilities.arrayToPath(nextPathArray);
              isLastTab = !module2.is.tab(nextPath);
              if (isLastTab) {
                module2.verbose("Tab parameters found", nextPathArray);
              }
            }
            if (isLastTab && remoteContent) {
              if (!shouldIgnoreLoad) {
                module2.activate.navigation(currentPath);
                module2.content.fetch(currentPath, tabPath);
              } else {
                module2.debug("Ignoring remote content on first tab load", currentPath);
                firstLoad = false;
                module2.cache.add(tabPath, $tab.html());
                module2.activate.all(currentPath);
                settings.onTabInit.call($tab, currentPath, parameterArray, historyEvent);
                settings.onTabLoad.call($tab, currentPath, parameterArray, historyEvent);
              }
              return false;
            } else {
              module2.debug("Opened local tab", currentPath);
              module2.activate.all(currentPath);
              if (!module2.cache.read(currentPath)) {
                module2.cache.add(currentPath, true);
                module2.debug("First time tab loaded calling tab init");
                settings.onTabInit.call($tab, currentPath, parameterArray, historyEvent);
              }
              settings.onTabLoad.call($tab, currentPath, parameterArray, historyEvent);
            }
          } else if (tabPath.search("/") == -1 && tabPath !== "") {
            $anchor = $2("#" + tabPath + ', a[name="' + tabPath + '"]'), currentPath = $anchor.closest("[data-tab]").data("tab");
            $tab = module2.get.tabElement(currentPath);
            if ($anchor && $anchor.length > 0 && currentPath) {
              module2.debug("No tab found, but deep anchor link present, opening parent tab");
              module2.activate.all(currentPath);
              if (!module2.cache.read(currentPath)) {
                module2.cache.add(currentPath, true);
                module2.debug("First time tab loaded calling tab init");
                settings.onTabInit.call($tab, currentPath, parameterArray, historyEvent);
              }
              return false;
            }
          } else {
            module2.error(error.missingTab, $module, $context, currentPath);
            return false;
          }
        });
      }, content: { fetch: function(tabPath, fullTabPath) {
```

## page-transition — gen/packed_store.libs.e6099e70.js L11103-11148 (hit L11113)
```js
  }, start: function(t2) {
    if (B.started) throw new Error("Backbone.history has already been started");
    B.started = true;
    this.options = x.extend({ root: "/" }, this.options, t2);
    this.root = this.options.root;
    this._trailingSlash = this.options.trailingSlash;
    this._wantsHashChange = this.options.hashChange !== false;
    this._hasHashChange = "onhashchange" in window && (document.documentMode === void 0 || document.documentMode > 7);
    this._useHashChange = this._wantsHashChange && this._hasHashChange;
    this._wantsPushState = !!this.options.pushState;
    this._hasPushState = !!(this.history && this.history.pushState);
    this._usePushState = this._wantsPushState && this._hasPushState;
    this.fragment = this.getFragment();
    this.root = ("/" + this.root + "/").replace(L, "/");
    if (this._wantsHashChange && this._wantsPushState) {
      if (!this._hasPushState && !this.atRoot()) {
        var e2 = this.root.slice(0, -1) || "/";
        this.location.replace(e2 + "#" + this.getPath());
        return true;
      } else if (this._hasPushState && this.atRoot()) {
        this.navigate(this.getHash(), { replace: true });
      }
    }
    if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
      this.iframe = document.createElement("iframe");
      this.iframe.src = "javascript:0";
      this.iframe.style.display = "none";
      this.iframe.tabIndex = -1;
      var i3 = document.body;
      var r2 = i3.insertBefore(this.iframe, i3.firstChild).contentWindow;
      r2.document.open();
      r2.document.close();
      r2.location.hash = "#" + this.fragment;
    }
    var n2 = window.addEventListener || function(t3, e3) {
      return attachEvent("on" + t3, e3);
    };
    if (this._usePushState) {
      n2("popstate", this.checkUrl, false);
    } else if (this._useHashChange && !this.iframe) {
      n2("hashchange", this.checkUrl, false);
    } else if (this._wantsHashChange) {
      this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
    }
    if (!this.options.silent) return this.loadUrl();
  }, stop: function() {
```

## page-transition — gen/packed_store.libs.e6099e70.js L11148-11163 (hit L11153)
```js
  }, stop: function() {
    var t2 = window.removeEventListener || function(t3, e2) {
      return detachEvent("on" + t3, e2);
    };
    if (this._usePushState) {
      t2("popstate", this.checkUrl, false);
    } else if (this._useHashChange && !this.iframe) {
      t2("hashchange", this.checkUrl, false);
    }
    if (this.iframe) {
      document.body.removeChild(this.iframe);
      this.iframe = null;
    }
    if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
    B.started = false;
  }, route: function(t2, e2) {
```

## wheel-step — gen/packed_productpage.d8d6812f.js L1240-1252 (hit L1241)
```js
    }, handleMouseWheel: function(a) {
      if (u <= d.currItem.fitRatio) return k.modal && (!k.closeOnScroll || Za || da ? a.preventDefault() : U && 2 < Math.abs(a.deltaY) && (Sa = true, d.close())), true;
      a.stopPropagation();
      T.x = 0;
      if ("deltaX" in a) 1 === a.deltaMode ? (T.x = 18 * a.deltaX, T.y = 18 * a.deltaY) : (T.x = a.deltaX, T.y = a.deltaY);
      else if ("wheelDelta" in a) a.wheelDeltaX && (T.x = -0.16 * a.wheelDeltaX), T.y = a.wheelDeltaY ? -0.16 * a.wheelDeltaY : -0.16 * a.wheelDelta;
      else if ("detail" in a) T.y = a.detail;
      else return;
      xb(u, true);
      var b = l.x - T.x, c = l.y - T.y;
      (k.modal || b <= r.min.x && b >= r.max.x && c <= r.min.y && c >= r.max.y) && a.preventDefault();
      d.panTo(b, c);
    }, toggleDesktopZoom: function(a) {
```

## wheel-step — gen/packed_store_checkout.ec233270.js L1251-1291 (hit L1266)
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
        switch (Xe()) {
          case Qe:
            return 1;
          case et:
            return 4;
          case tt:
          case rt:
            return 16;
          case ot:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Jt = null, Xt = null, Qt = null;
  function er() {
```

## wheel-step — gen/packed_store_checkout.ec233270.js L1341-1381 (hit L1356)
```js
  }
  var Dr = L({}, cr, { key: function(e2) {
    if (e2.key) {
      var t2 = yr[e2.key] || e2.key;
      if ("Unidentified" !== t2) return t2;
    }
    return "keypress" === e2.type ? 13 === (e2 = tr(e2)) ? "Enter" : String.fromCharCode(e2) : "keydown" === e2.type || "keyup" === e2.type ? vr[e2.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Cr, charCode: function(e2) {
    return "keypress" === e2.type ? tr(e2) : 0;
  }, keyCode: function(e2) {
    return "keydown" === e2.type || "keyup" === e2.type ? e2.keyCode : 0;
  }, which: function(e2) {
    return "keypress" === e2.type ? tr(e2) : "keydown" === e2.type || "keyup" === e2.type ? e2.keyCode : 0;
  } }), wr = nr(Dr), kr = nr(L({}, dr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), Er = nr(L({}, cr, { touches: 0, targetTouche
    return "deltaX" in e2 ? e2.deltaX : "wheelDeltaX" in e2 ? -e2.wheelDeltaX : 0;
  }, deltaY: function(e2) {
    return "deltaY" in e2 ? e2.deltaY : "wheelDeltaY" in e2 ? -e2.wheelDeltaY : "wheelDelta" in e2 ? -e2.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), Ar = nr(Tr), Ir = [9, 13, 27, 32], Nr = c && "CompositionEvent" in window, Pr = null;
  c && "documentMode" in document && (Pr = document.documentMode);
  var Or = c && "TextEvent" in window && !Pr, Rr = c && (!Nr || Pr && 8 < Pr && 11 >= Pr), Lr = String.fromCharCode(32), Mr = false;
  function Fr(e2, t2) {
    switch (e2) {
      case "keyup":
        return -1 !== Ir.indexOf(t2.keyCode);
      case "keydown":
        return 229 !== t2.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function Br(e2) {
    return "object" == typeof (e2 = e2.detail) && "data" in e2 ? e2.data : null;
  }
  var Ur = false;
  var Gr = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function qr(e2) {
    var t2 = e2 && e2.nodeName && e2.nodeName.toLowerCase();
```

## text-split — gen/packed_store_checkout.ec233270.js L22025-22035 (hit L22031)
```js
  function L(e2) {
    const t2 = (e2 = e2.trim().toLowerCase()).match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
    if (t2) return { r: parseInt(t2[1], 10), g: parseInt(t2[2], 10), b: parseInt(t2[3], 10), a: void 0 !== t2[4] ? parseFloat(t2[4]) : 1 };
    const r2 = e2.match(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
    if (r2) {
      let e3 = r2[1];
      3 !== e3.length && 4 !== e3.length || (e3 = e3.split("").map(((e4) => e4 + e4)).join(""));
      return { r: parseInt(e3.slice(0, 2), 16), g: parseInt(e3.slice(2, 4), 16), b: parseInt(e3.slice(4, 6), 16), a: 8 === e3.length ? parseInt(e3.slice(6, 8), 16) / 255 : 1 };
    }
    throw new Error(`Invalid color format: "${e2}"`);
  }
```

## text-split — gen/packed_store_checkout.ec233270.js L22040-22052 (hit L22048)
```js
  const F = (e2) => {
    let t2, r2, o2;
    const n2 = e2.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (n2) t2 = parseInt(n2[1], 10), r2 = parseInt(n2[2], 10), o2 = parseInt(n2[3], 10);
    else {
      if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(e2)) return false;
      {
        let n3 = e2.substring(1);
        3 === n3.length && (n3 = n3.split("").map(((e3) => e3 + e3)).join("")), t2 = parseInt(n3.substring(0, 2), 16), r2 = parseInt(n3.substring(2, 4), 16), o2 = parseInt(n3.substring(4, 6), 16);
      }
    }
    return (0.299 * t2 + 0.587 * r2 + 0.114 * o2) / 255 < 0.5;
  };
```

## audio — gen/packed_store_checkout.ec233270.js L23103-23108 (hit L23106)
```js
  }, audioBaseLatency: function() {
    if (!(G() || R())) return -2;
    if (!window.AudioContext) return -1;
    var e2 = new AudioContext().baseLatency;
    return null == e2 ? -1 : isFinite(e2) ? e2 : -3;
  }, dateTimeLocale: function() {
```

## text-split — gen/packed_store_checkout.ec233270.js L30289-30338 (hit L30298)
```js
}, { "@parcel/transformer-js/src/esmodule-helpers.js": "jiucr" }], a2otm: [function(e, t, r) {
  var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
  o.defineInteropFlag(r), o.export(r, "cpf", (() => c)), o.export(r, "cnpj", (() => x)), o.export(r, "validator", (() => g));
  /*!
   * cpf-cnpj-validator v1.0.3
   * (c) 2020-present Carvalho, Vinicius Luiz <carvalho.viniciusluiz@gmail.com>
   * Released under the MIT License.
   */
  const n = ["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999", "12345678909"], i = /[.-]/g, a = /[^\d]/g, s = (e2) => {
    const t2 = e2.split("").map(((e3) => parseInt(e3, 10))), r2 = t2.length + 1, o2 = t2.map(((e3, t3) => e3 * (r2 - t3))).reduce(((e3, t3) => e3 + t3)) % 11;
    return o2 < 2 ? 0 : 11 - o2;
  }, l = (e2, t2) => {
    const r2 = t2 ? i : a;
    return (e2 || "").replace(r2, "");
  }, u = (e2) => l(e2).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  var c = { verifierDigit: s, strip: l, format: u, isValid: (e2, t2) => {
    const r2 = l(e2, t2);
    if (!r2) return false;
    if (11 !== r2.length) return false;
    if (n.includes(r2)) return false;
    let o2 = r2.substr(0, 9);
    return o2 += s(o2), o2 += s(o2), o2.substr(-2) === r2.substr(-2);
  }, generate: (e2) => {
    let t2 = "";
    for (let e3 = 0; e3 < 9; e3 += 1) t2 += Math.floor(9 * Math.random());
    return t2 += s(t2), t2 += s(t2), e2 ? u(t2) : t2;
  } };
  const p = ["00000000000000", "11111111111111", "22222222222222", "33333333333333", "44444444444444", "55555555555555", "66666666666666", "77777777777777", "88888888888888", "99999999999999"], d = /[-\\/.]/g, f = /[^\d]
    let t2 = 2;
    const r2 = e2.split("").reduce(((e3, t3) => [parseInt(t3, 10)].concat(e3)), []).reduce(((e3, r3) => (e3 += r3 * t2, t2 = 9 === t2 ? 2 : t2 + 1, e3)), 0) % 11;
    return r2 < 2 ? 0 : 11 - r2;
  }, h = (e2, t2) => {
    const r2 = t2 ? d : f;
    return (e2 || "").replace(r2, "");
  }, S = (e2) => h(e2).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  var x = { verifierDigit: m, strip: h, format: S, isValid: (e2, t2) => {
    const r2 = h(e2, t2);
    if (!r2) return false;
    if (14 !== r2.length) return false;
    if (p.includes(r2)) return false;
    let o2 = r2.substr(0, 12);
    return o2 += m(o2), o2 += m(o2), o2.substr(-2) === r2.substr(-2);
  }, generate: (e2) => {
    let t2 = "";
    for (let e3 = 0; e3 < 12; e3 += 1) t2 += Math.floor(9 * Math.random());
    return t2 += m(t2), t2 += m(t2), e2 ? S(t2) : t2;
  } };
  const g = (e2) => ({ type: "document", base: e2.string(), messages: { "document.cpf": "CPF inv\xE1lido", "document.cnpj": "CNPJ inv\xE1lido" }, rules: { cpf: { validate: (e3, t2, r2, o2) => c.isValid(e3) ? e3 : t2.erro
  r.default = g;
}, { "@parcel/transformer-js/src/esmodule-helpers.js": "jiucr" }], efhnN: [function(e, t, r) {
```

## pointer — gen/packed_store_checkout.ec233270.js L31320-31360 (hit L31335)
```js
              t4.o = function() {
                e5.fso();
                var t5 = document.documentElement;
                t5.requestFullscreen ? t5.requestFullscreen() : t5.mozRequestFullScreen ? t5.mozRequestFullScreen() : t5.webkitRequestFullscreen ? t5.webkitRequestFullscreen() : t5.msRequestFullscreen && t5.msRequestFull
              }, t4.x = function() {
                e5.fsx(), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.m
              }, t4.t = function() {
                e5.ifs ? t4.x() : t4.o();
              }, t4.l = function() {
                i4("addEventListener");
              }, t4.q = function() {
                i4("removeEventListener");
              };
            };
          })(e4), o3 = (r4 = (t3 = e4).core).globalEventsController, n3 = r4.windowResizeActioner, i3 = t3.fs, a2 = t3.resolve, s2 = a2(F), l2 = a2(U), u2 = a2(V), o3.attachListeners = function() {
            document.addEventListener("pointermove", l2.listener), document.addEventListener("pointerup", u2.listener), addEventListener("resize", n3.runActions), document.addEventListener("keydown", s2.listener), i3.l()
          }, o3.removeListeners = function() {
            document.removeEventListener("pointermove", l2.listener), document.removeEventListener("pointerup", u2.listener), removeEventListener("resize", n3.runActions), document.removeEventListener("keydown", s2.liste
          }, (function(e5) {
            var t4 = e5.core.lightboxCloser, r5 = (0, e5.resolve)(W);
            t4.closeLightbox = function() {
              r5.isLightboxFadingOut || r5.runActions();
            };
          })(e4), (function(e5) {
            var t4 = e5.data, r5 = e5.core.scrollbarRecompensor;
            function o4() {
              document.body.offsetHeight > innerHeight && (document.body.style.marginRight = t4.scrollbarWidth + "px");
            }
            r5.addRecompense = function() {
              "complete" === document.readyState ? o4() : addEventListener("load", (function() {
                o4(), r5.addRecompense = o4;
              }));
            }, r5.removeRecompense = function() {
              document.body.style.removeProperty("margin-right");
            };
          })(e4), (function(e5) {
            var t4 = e5.core, r5 = t4.slideChangeFacade, o4 = t4.slideIndexChanger, n4 = t4.stageManager;
            e5.props.sources.length > 1 ? (r5.changeToPrevious = function() {
              o4.jumpTo(n4.getPreviousSlideIndex());
            }, r5.changeToNext = function() {
              o4.jumpTo(n4.getNextSlideIndex());
```

## observer — gen/packed_store_checkout.ec233270.js L31674-31695 (hit L31684)
```js
    return (0, o.useEffect)((() => {
      var r3 = c.current;
      return (function(t3) {
        var { observerRef: r4 } = t3, o2 = e2.current;
        if (o2) {
          var i2 = (0, n.findDOMNode)(o2);
          i2 && (null == r4 || r4.observe(i2));
        }
      })({ observerRef: r3 = (function(e3) {
        var { observerRef: r4 } = e3;
        return r4 || (c.current = new IntersectionObserver(h, t2), c.current);
      })({ observerRef: r3 }) }), () => {
        !(function(t3) {
          var { observerRef: r4 } = t3, o2 = e2.current;
          if (o2) {
            var i2 = (0, n.findDOMNode)(o2);
            i2 && (null == r4 || r4.unobserve(i2));
          }
          null == r4 || r4.disconnect(), c.current = null;
        })({ observerRef: r3 });
      };
    }), [e2.current, t2, r2, s, l]), { inViewport: p.current, enterCount: f.current, leaveCount: m.current };
```