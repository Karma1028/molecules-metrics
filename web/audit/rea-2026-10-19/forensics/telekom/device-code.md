# telekom — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: keyboard×3, pointer×3, loader×3, text-split×2, page-transition×3, wheel-step×3, observer×3, cursor-dom×3, raf-lerp×3

## keyboard — 584608/footer.js L10-17 (hit L12)
```js
  } }, t = { trapFocus: function(t2) {
    var r2 = this;
    t2.addEventListener("keydown", (function(n2) {
      if (!n2 || !e.is("Tab", n2)) return false;
      var i2 = r2.getAll(t2), a2 = Array.from(i2), o2 = a2.indexOf(document.activeElement), u2 = a2.length - 1, l2 = e.isShift(n2);
      return l2 && 0 === o2 ? (i2[u2].focus(), n2.preventDefault()) : l2 || o2 !== u2 || (i2[0].focus(), n2.preventDefault()), true;
    }));
  }, getAll: function(e2) {
```

## keyboard — 584608/footer.js L76-81 (hit L78)
```js
  }, addKeyCloseEvent: function(e2) {
    var t2 = this;
    return !!e2 && (e2.addEventListener("keyup", (function(e3) {
      return t2.keyClose(e3);
    })), true);
  } }, l = { open: function(e2, t2) {
```

## pointer — 584608/footer.js L214-219 (hit L217)
```js
  }, addEvents: function() {
    var e2 = this;
    return !!this.slider && (this.slider.addEventListener("mousedown", (function(t2) {
      e2.scrollPos = e2.slider.scrollLeft, e2.mousePos = t2.clientX, e2.slider.addEventListener("mousemove", e2.handleMove);
    })), this.slider.addEventListener("mouseup", this.handleEnd), this.slider.addEventListener("mouseleave", this.handleEnd), true);
  }, handleMove: function(e2) {
```

## loader — 379488/entertainment.all.min.js L2398-2445 (hit L2417)
```js
})(window, function(t, i) {
  var n = t.requestAnimationFrame || t.webkitRequestAnimationFrame, s = 0, n = n || function(t2) {
    var e = (/* @__PURE__ */ new Date()).getTime(), i2 = Math.max(0, 16 - (e - s)), t2 = setTimeout(t2, i2);
    return s = e + i2, t2;
  }, t = { startAnimation: function() {
    this.isAnimating || (this.isAnimating = true, this.restingFrames = 0, this.animate());
  }, animate: function() {
    this.applyDragForce(), this.applySelectedAttraction();
    var t2, e = this.x;
    this.integratePhysics(), this.positionSlider(), this.settle(e), this.isAnimating && (t2 = this, n(function() {
      t2.animate();
    }));
  } }, o = "string" == typeof document.documentElement.style.transform ? "transform" : "WebkitTransform";
  return t.positionSlider = function() {
    var t2, e = this.x, e = (this.options.wrapAround && 1 < this.cells.length && (e = i.modulo(e, this.slideableWidth), e -= this.slideableWidth, this.shiftWrapCells(e)), e += this.cursorPosition, e = this.options.rightT
    e && (t2 = (e = -this.x - e.target) / this.slidesWidth, this.dispatchEvent("scroll", null, [t2, e]));
  }, t.positionSliderAtSelected = function() {
    this.cells.length && (this.x = -this.selectedSlide.target, this.positionSlider());
  }, t.getPositionValue = function(t2) {
    return this.options.percentPosition ? 0.01 * Math.round(t2 / this.size.innerWidth * 1e4) + "%" : Math.round(t2) + "px";
  }, t.settle = function(t2) {
    this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t2) || this.restingFrames++, 2 < this.restingFrames && (this.isAnimating = false, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEv
  }, t.shiftWrapCells = function(t2) {
    var e = this.cursorPosition + t2, e = (this._shiftCells(this.beforeShiftCells, e, -1), this.size.innerWidth - (t2 + this.slideableWidth + this.cursorPosition));
    this._shiftCells(this.afterShiftCells, e, 1);
  }, t._shiftCells = function(t2, e, i2) {
    for (var n2 = 0; n2 < t2.length; n2++) {
      var s2 = t2[n2];
      s2.wrapShift(0 < e ? i2 : 0), e -= s2.size.outerWidth;
    }
  }, t._unshiftCells = function(t2) {
    if (t2 && t2.length) for (var e = 0; e < t2.length; e++) t2[e].wrapShift(0);
  }, t.integratePhysics = function() {
    this.x += this.velocity, this.velocity *= this.getFrictionFactor();
  }, t.applyForce = function(t2) {
    this.velocity += t2;
  }, t.getFrictionFactor = function() {
    return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"];
  }, t.getRestingPosition = function() {
    return this.x + this.velocity / (1 - this.getFrictionFactor());
  }, t.applyDragForce = function() {
    var t2;
    this.isPointerDown && (t2 = this.dragX - this.x - this.velocity, this.applyForce(t2));
  }, t.applySelectedAttraction = function() {
    var t2;
    this.isPointerDown || this.isFreeScrolling || !this.cells.length || (t2 = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction, this.applyForce(t2));
  }, t;
}), ((r, a) => {
```

## loader — 379488/entertainment.all.min.js L2459-2464 (hit L2459)
```js
  var c = e.jQuery, u = e.getComputedStyle, h = e.console, d = 0, p = {}, f = (l.defaults = { accessibility: true, cellAlign: "center", freeScrollFriction: 0.075, friction: 0.28, namespaceJQueryEvents: true, percentPosit
    var t2 = this.guid = ++d;
    this.element.flickityGUID = t2, (p[t2] = this).selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createE
      this[t3]();
    }, this), this.options.watchCSS ? this.watchCSS() : this.activate();
  }, f.option = function(t2) {
```

## keyboard — 379488/entertainment.all.min.js L2604-2608 (hit L2607)
```js
  }, f.deactivate = function() {
    this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.cells.forEach(function(t2) {
      t2.destroy();
    }), this.unselectSelectedSlide(), this.element.removeChild(this.viewport), o(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListe
  }, f.destroy = function() {
```

## loader — 379488/entertainment.all.min.js L3026-3053 (hit L3052)
```js
})(window, function(t, e, i) {
  function n(t2, e2) {
    this.img = t2, this.flickity = e2, this.load();
  }
  e.createMethods.push("_createLazyload");
  var s = e.prototype;
  return s._createLazyload = function() {
    this.on("select", this.lazyLoad);
  }, s.lazyLoad = function() {
    var e2, t2 = this.options.lazyLoad;
    t2 && (t2 = this.getAdjacentCellElements("number" == typeof t2 ? t2 : 0), e2 = [], t2.forEach(function(t3) {
      t3 = "IMG" == (t3 = t3).nodeName && t3.getAttribute("data-flickity-lazyload") ? [t3] : (t3 = t3.querySelectorAll("img[data-flickity-lazyload]"), i.makeArray(t3));
      e2 = e2.concat(t3);
    }), e2.forEach(function(t3) {
      new n(t3, this);
    }, this));
  }, n.prototype.handleEvent = i.handleEvent, n.prototype.load = function() {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.img.getAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload");
  }, n.prototype.onload = function(t2) {
    this.complete(t2, "flickity-lazyloaded");
  }, n.prototype.onerror = function(t2) {
    this.complete(t2, "flickity-lazyerror");
  }, n.prototype.complete = function(t2, e2) {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
    var i2 = this.flickity.getParentCell(this.img), i2 = i2 && i2.element;
    this.flickity.cellSizeChange(i2), this.img.classList.add(e2), this.flickity.dispatchEvent("lazyLoad", t2, i2);
  }, e.LazyLoader = n, e;
}), ((t) => {
```

## text-split — 742268/ess-redesign.js L346-351 (hit L347)
```js
      function r3(e4) {
        return (e4 = (e4 = e4.toUpperCase()).substr(4) + e4.substr(0, 4)).split("").map((function(e5) {
          var r4 = e5.charCodeAt(0);
          return r4 >= t3 && r4 <= n3 ? r4 - t3 + 10 : e5;
        })).join("");
      }
```

## page-transition — 742268/ess-redesign.js L1359-1399 (hit L1374)
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
          switch (Ye()) {
```

## wheel-step — 742268/ess-redesign.js L1467-1507 (hit L1482)
```js
    }
    var Cn = O({}, hn, { key: function(e3) {
      if (e3.key) {
        var t3 = kn[e3.key] || e3.key;
        if ("Unidentified" !== t3) return t3;
      }
      return "keypress" === e3.type ? 13 === (e3 = tn(e3)) ? "Enter" : String.fromCharCode(e3) : "keydown" === e3.type || "keyup" === e3.type ? wn[e3.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: En, charCode: function(e3) {
      return "keypress" === e3.type ? tn(e3) : 0;
    }, keyCode: function(e3) {
      return "keydown" === e3.type || "keyup" === e3.type ? e3.keyCode : 0;
    }, which: function(e3) {
      return "keypress" === e3.type ? tn(e3) : "keydown" === e3.type || "keyup" === e3.type ? e3.keyCode : 0;
    } }), jn = sn(Cn), An = sn(O({}, dn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), Pn = sn(O({}, hn, { touches: 0, targetTouc
      return "deltaX" in e3 ? e3.deltaX : "wheelDeltaX" in e3 ? -e3.wheelDeltaX : 0;
    }, deltaY: function(e3) {
      return "deltaY" in e3 ? e3.deltaY : "wheelDeltaY" in e3 ? -e3.wheelDeltaY : "wheelDelta" in e3 ? -e3.wheelDelta : 0;
    }, deltaZ: 0, deltaMode: 0 }), Tn = sn(Nn), Ln = [9, 13, 27, 32], Vn = c && "CompositionEvent" in window, Fn = null;
    c && "documentMode" in document && (Fn = document.documentMode);
    var Rn = c && "TextEvent" in window && !Fn, On = c && (!Vn || Fn && 8 < Fn && 11 >= Fn), Mn = String.fromCharCode(32), Dn = false;
    function Bn(e3, t3) {
      switch (e3) {
        case "keyup":
          return -1 !== Ln.indexOf(t3.keyCode);
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
    function zn(e3) {
      return "object" == typeof (e3 = e3.detail) && "data" in e3 ? e3.data : null;
    }
    var Un = false, qn = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true,
    function Hn(e3) {
      var t3 = e3 && e3.nodeName && e3.nodeName.toLowerCase();
      return "input" === t3 ? !!qn[e3.type] : "textarea" === t3;
```

## wheel-step — 742268/ess-redesign.js L1708-1720 (hit L1719)
```js
    function qr(e3, t3, n3, r3) {
      switch (Xt(t3)) {
        case 1:
          var s3 = Wt;
          break;
        case 4:
          s3 = Gt;
          break;
        default:
          s3 = Qt;
      }
      n3 = s3.bind(null, t3, n3, e3), s3 = void 0, !Le || "touchstart" !== t3 && "touchmove" !== t3 && "wheel" !== t3 || (s3 = true), r3 ? void 0 !== s3 ? e3.addEventListener(t3, n3, { capture: true, passive: s3 }) : e3.
    }
```

## wheel-step — 742268/ess-redesign.js L1792-1832 (hit L1807)
```js
              case "touchmove":
              case "touchstart":
                l4 = Pn;
                break;
              case Cr:
              case jr:
              case Ar:
                l4 = gn;
                break;
              case Pr:
                l4 = In;
                break;
              case "scroll":
                l4 = pn;
                break;
              case "wheel":
                l4 = Tn;
                break;
              case "copy":
              case "cut":
              case "paste":
                l4 = xn;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                l4 = An;
            }
            var c2 = !!(4 & t3), h2 = !c2 && "scroll" === e3, p2 = c2 ? null !== o4 ? o4 + "Capture" : null : o4;
            c2 = [];
            for (var d2, f2 = r4; null !== f2; ) {
              var m2 = (d2 = f2).stateNode;
              if (5 === d2.tag && null !== m2 && (d2 = m2, null !== p2 && null != (m2 = Te(f2, p2)) && c2.push(Wr(f2, m2, d2))), h2) break;
              f2 = f2.return;
            }
            0 < c2.length && (o4 = new l4(o4, u2, null, n3, s4), a4.push({ event: o4, listeners: c2 }));
```

## observer — 617438/header.js L948-953 (hit L950)
```js
    }, addObserverEvent: function() {
      var e2 = this;
      new IntersectionObserver((function(t2, n2) {
        return e2.handleScroll(t2, n2);
      }), { root: null, rootMargin: "0px", threshold: 0 }).observe(this.observerElement);
    }, handleScroll: function(e2, t2) {
```

## pointer — start/startseite.js?v=6523f94c L1529-1542 (hit L1539)
```js
    var St = { attachEvents: function() {
      var e3 = this, t3 = De(), n2 = e3.params, a2 = e3.touchEvents, r2 = e3.el, i2 = e3.wrapperEl, s2 = e3.device, o2 = e3.support;
      e3.onTouchStart = vt.bind(e3), e3.onTouchMove = bt.bind(e3), e3.onTouchEnd = yt.bind(e3), n2.cssMode && (e3.onScroll = xt.bind(e3)), e3.onClick = Tt.bind(e3);
      var l2 = !!n2.nested;
      if (!o2.touch && o2.pointerEvents) r2.addEventListener(a2.start, e3.onTouchStart, false), t3.addEventListener(a2.move, e3.onTouchMove, l2), t3.addEventListener(a2.end, e3.onTouchEnd, false);
      else {
        if (o2.touch) {
          var d2 = !("touchstart" !== a2.start || !o2.passiveListener || !n2.passiveListeners) && { passive: true, capture: false };
          r2.addEventListener(a2.start, e3.onTouchStart, d2), r2.addEventListener(a2.move, e3.onTouchMove, o2.passiveListener ? { passive: false, capture: l2 } : l2), r2.addEventListener(a2.end, e3.onTouchEnd, d2), a2.ca
        }
        (n2.simulateTouch && !s2.ios && !s2.android || n2.simulateTouch && !o2.touch && s2.ios) && (r2.addEventListener("mousedown", e3.onTouchStart, false), t3.addEventListener("mousemove", e3.onTouchMove, l2), t3.addEv
      }
      (n2.preventClicks || n2.preventClicksPropagation) && r2.addEventListener("click", e3.onClick, true), n2.cssMode && i2.addEventListener("scroll", e3.onScroll), n2.updateOnWindowResize ? e3.on(s2.ios || s2.android ? 
    }, detachEvents: function() {
```

## cursor-dom — start/startseite.js?v=6523f94c L1610-1616 (hit L1614)
```js
    } }, slide: _t, loop: ft, grabCursor: { setGrabCursor: function(e3) {
      var t3 = this;
      if (!(t3.support.touch || !t3.params.simulateTouch || t3.params.watchOverflow && t3.isLocked || t3.params.cssMode)) {
        var n2 = t3.el;
        n2.style.cursor = "move", n2.style.cursor = e3 ? "-webkit-grabbing" : "-webkit-grab", n2.style.cursor = e3 ? "-moz-grabbin" : "-moz-grab", n2.style.cursor = e3 ? "grabbing" : "grab";
      }
    }, unsetGrabCursor: function() {
```

## observer — start/startseite.js?v=6523f94c L2345-2354 (hit L2345)
```js
            var u3 = new IntersectionObserver((function(e4) {
              e4.forEach((function(e5) {
                if (e5.isIntersecting || e5.intersectionRatio) {
                  var r4 = e5.target;
                  Gn(r4, t3, n3, a3), u3.unobserve(r4), 0 === c3.filter((function(e6) {
                    return e6 !== r4;
                  })).length && false === s3 && u3.disconnect();
                }
              }));
            }), { rootMargin: "".concat(r3, "px 0%") });
```

## page-transition — telekom-suche/header-search-ccp L759-768 (hit L762)
```js
    if (query) {
      const searchInput = this.root.getElementById("results-search-input");
      if (searchInput) searchInput.value = query;
      if (window.history && window.history.pushState) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("q", query);
        window.history.pushState({}, "", newUrl);
      }
      await this.executeSearch(query);
    }
```

## observer — prod/utag.js L3571-3582 (hit L3571)
```js
                  var observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        var tsr = typeof entry.target.teaser === "object" ? entry.target.teaser : entry.target;
                        if (tsr.getAttribute("teaser-visible") !== "1") {
                          this.fireCallbackIfTeaserVisibleForOneSecond(tsr, callback);
                        } else {
                          observer.unobserve(entry.target);
                        }
                      }
                    });
                  }, { threshold: 1 });
```

## page-transition — s/55651514.js L1106-1112 (hit L1112)
```js
    } else "history" === e && (["pushState", "replaceState"].forEach((e2) => {
      let t = w.history[e2];
      w.history[e2] = function(...e3) {
        e3 = t.apply(this, e3);
        return r(), e3;
      };
    }), d.addEventListener("popstate", () => r()));
```

## raf-lerp — assets/index-34905293.js L2220-2268 (hit L2263)
```js
    function interpolateValue(t6, e) {
      var r = this.offsetTime, s;
      this.propType === "multidimensional" && (s = createTypedArray("float32", this.pv.length));
      for (var a = e.lastIndex, n = a, o = this.keyframes.length - 1, f = true, l, p, g; f; ) {
        if (l = this.keyframes[n], p = this.keyframes[n + 1], n === o - 1 && t6 >= p.t - r) {
          l.h && (l = p), a = 0;
          break;
        }
        if (p.t - r > t6) {
          a = n;
          break;
        }
        n < o - 1 ? n += 1 : (a = 0, f = false);
      }
      g = this.keyframesMetadata[n] || {};
      var P, c, E, b, y, M, d = p.t - r, x = l.t - r, u;
      if (l.to) {
        g.bezierData || (g.bezierData = bez.buildBezierData(l.s, p.s || l.e, l.to, l.ti));
        var C = g.bezierData;
        if (t6 >= d || t6 < x) {
          var T = t6 >= d ? C.points.length - 1 : 0;
          for (c = C.points[T].point.length, P = 0; P < c; P += 1) s[P] = C.points[T].point[P];
        } else {
          g.__fnct ? M = g.__fnct : (M = BezierFactory.getBezierEasing(l.o.x, l.o.y, l.i.x, l.i.y, l.n).get, g.__fnct = M), E = M((t6 - x) / (d - x));
          var F = C.segmentLength * E, R, I = e.lastFrame < t6 && e._lastKeyframeIndex === n ? e._lastAddedLength : 0;
          for (y = e.lastFrame < t6 && e._lastKeyframeIndex === n ? e._lastPoint : 0, f = true, b = C.points.length; f; ) {
            if (I += C.points[y].partialLength, F === 0 || E === 0 || y === C.points.length - 1) {
              for (c = C.points[y].point.length, P = 0; P < c; P += 1) s[P] = C.points[y].point[P];
              break;
            } else if (F >= I && F < I + C.points[y + 1].partialLength) {
              for (R = (F - I) / C.points[y + 1].partialLength, c = C.points[y].point.length, P = 0; P < c; P += 1) s[P] = C.points[y].point[P] + (C.points[y + 1].point[P] - C.points[y].point[P]) * R;
              break;
            }
            y < b - 1 ? y += 1 : f = false;
          }
          e._lastPoint = y, e._lastAddedLength = I - C.points[y].partialLength, e._lastKeyframeIndex = n;
        }
      } else {
        var $, z, G, V, H;
        if (o = l.s.length, u = p.s || l.e, this.sh && l.h !== 1) if (t6 >= d) s[0] = u[0], s[1] = u[1], s[2] = u[2];
        else if (t6 <= x) s[0] = l.s[0], s[1] = l.s[1], s[2] = l.s[2];
        else {
          var q = createQuaternion(l.s), B = createQuaternion(u), A = (t6 - x) / (d - x);
          quaternionToEuler(s, slerp(q, B, A));
        }
        else for (n = 0; n < o; n += 1) l.h !== 1 && (t6 >= d ? E = 1 : t6 < x ? E = 0 : (l.o.x.constructor === Array ? (g.__fnct || (g.__fnct = []), g.__fnct[n] ? M = g.__fnct[n] : ($ = l.o.x[n] === void 0 ? l.o.x[0] : 
      }
      return e.lastIndex = a, s;
    }
```

## raf-lerp — assets/index-34905293.js L2269-2272 (hit L2269)
```js
    function slerp(t6, e, r) {
      var s = [], a = t6[0], n = t6[1], o = t6[2], f = t6[3], l = e[0], p = e[1], g = e[2], P = e[3], c, E, b, y, M;
      return E = a * l + n * p + o * g + f * P, E < 0 && (E = -E, l = -l, p = -p, g = -g, P = -P), 1 - E > 1e-6 ? (c = Math.acos(E), b = Math.sin(c), y = Math.sin((1 - r) * c) / b, M = Math.sin(r * c) / b) : (y = 1 - r, 
    }
```

## raf-lerp — assets/index-34905293.js L3066-3106 (hit L3081)
```js
      if (o !== 0) {
        var f, l;
        for (r = 0; r < s; r += 1) {
          if (f = this.shapes[r], l = f.localShapeCollection, !(!f.shape._mdf && !this._mdf && !t6)) for (l.releaseShapes(), f.shape._mdf = true, e = f.shape.paths.shapes, n = f.shape.paths._length, a = 0; a < n; a += 1)
          f.shape.paths = f.localShapeCollection;
        }
      }
      this.dynamicProperties.length || (this._mdf = false);
    };
    function floatEqual(t6, e) {
      return Math.abs(t6 - e) * 1e5 <= Math.min(Math.abs(t6), Math.abs(e));
    }
    function floatZero(t6) {
      return Math.abs(t6) <= 1e-5;
    }
    function lerp(t6, e, r) {
      return t6 * (1 - r) + e * r;
    }
    function lerpPoint(t6, e, r) {
      return [lerp(t6[0], e[0], r), lerp(t6[1], e[1], r)];
    }
    function quadRoots(t6, e, r) {
      if (t6 === 0) return [];
      var s = e * e - 4 * t6 * r;
      if (s < 0) return [];
      var a = -e / (2 * t6);
      if (s === 0) return [a];
      var n = Math.sqrt(s) / (2 * t6);
      return [a - n, a + n];
    }
    function polynomialCoefficients(t6, e, r, s) {
      return [-t6 + 3 * e - 3 * r + s, 3 * t6 - 6 * e + 3 * r, -3 * t6 + 3 * e, t6];
    }
    function singlePoint(t6) {
      return new PolynomialBezier(t6, t6, t6, t6, false);
    }
    function PolynomialBezier(t6, e, r, s, a) {
      a && pointEqual(t6, e) && (e = lerpPoint(t6, s, 1 / 3)), a && pointEqual(r, s) && (r = lerpPoint(t6, s, 2 / 3));
      var n = polynomialCoefficients(t6[0], e[0], r[0], s[0]), o = polynomialCoefficients(t6[1], e[1], r[1], s[1]);
      this.a = [n[0], o[0]], this.b = [n[1], o[1]], this.c = [n[2], o[2]], this.d = [n[3], o[3]], this.points = [t6, e, r, s];
    }
```

## text-split — pollhero-cdn/surveys.t.min.js?project_id=wTzJqMPmXeUTj-UgCgI-3 L87-91 (hit L88)
```js
  function h(e2 = "#fff", t2 = 1) {
    3 === (e2 = e2.replace("#", "")).length && (e2 = e2.split("").map((e3) => e3 + e3).join(""));
    const n2 = parseInt(e2, 16);
    return `rgba(${n2 >> 16 & 255}, ${n2 >> 8 & 255}, ${255 & n2}, ${t2})`;
  }
```

## cursor-dom — pollhero-cdn/surveys.t.min.js?project_id=wTzJqMPmXeUTj-UgCgI-3 L1518-1546 (hit L1520)
```js
      e2 && (l2 = E), t2.forEach((t3) => {
        let i3 = document.createElement("button");
        if (e2) i3.classList.add("ph-emoji__item"), i3.style.border = "2px solid transparent", i3.style.background = "transparent", i3.style.padding = "0", i3.style.cursor = "pointer", i3.style.display = "flex", i3.style
        else {
          switch (i3.classList.add("ph-rating__btn--full"), i3.style.border = "none", this.question.colorScale) {
            case "hcGradient":
              i3.style.backgroundColor = r2[t3], i3.style.color = t3 < 5 ? "white" : "black";
              break;
            case "hcTrafficLight":
              i3.style.backgroundColor = o2[t3], i3.style.color = t3 < 7 ? "white" : "black";
              break;
            case "colorful":
              i3.style.backgroundColor = a2[t3], i3.style.color = "#AF2D4C";
              break;
            default:
              i3.style.backgroundColor = "#F0F0F1", i3.style.color = this.style.elementColor || "#AF2D4C";
          }
          i3.textContent = t3;
        }
        i3.id = "nps" + this.question.id + t3, i3.value = Number(t3), i3.setAttribute("aria-label", `Score ${t3}`), i3.setAttribute("aria-pressed", "false"), s2.appendChild(i3), i3.addEventListener("click", () => {
          let t4 = this.shadowRoot.querySelectorAll(`button[id^="nps${this.question.id}"]`);
          const s3 = "true" === i3.getAttribute("aria-pressed");
          t4.forEach((t5) => {
            e2 ? t5.style.borderColor = "transparent" : t5.style.border = "2px solid #F0F0F1", t5.setAttribute("aria-pressed", "false");
          }), s3 ? (n2 = null, this.ctx.updateAnswers(this.question, n2)) : (i3.style.borderColor = this.style.elementColor || "#AF2D4C", i3.setAttribute("aria-pressed", "true"), n2 = Number(i3.value), setTimeout(() => {
            this.ctx.goNext(this.question, n2);
          }, 250));
        });
      });
```

## cursor-dom — pollhero-cdn/surveys.t.min.js?project_id=wTzJqMPmXeUTj-UgCgI-3 L1614-1626 (hit L1617)
```js
        }), e2.forEach((t4, i3) => {
          if (i3 === n3) return;
          let a3 = document.createElement("div");
          a3.classList.add("ph-ranking__number"), a3.style.cursor = "pointer", a3.style.padding = "0px 8px 8px 8px", a3.style.textAlign = "left", a3.setAttribute("role", "option"), a3.setAttribute("tabindex", "0"), a3.ad
            "Enter" !== e3.key && " " !== e3.key || (e3.preventDefault(), a3.click());
          }), a3.textContent = i3 + 1, a3.addEventListener("click", (t5) => {
            t5.stopPropagation();
            let a4 = this.ctx.getById(this.shadowRoot, "rankingElementNumber" + n3);
            u2.style.display = "none", a4.style.borderBottom = "1px solid " + h(this.style.textColor, 0.32), a4.style.borderBottomLeftRadius = "4px", a4.style.borderBottomRightRadius = "4px", p2.innerHTML = "none" === u2
            const l3 = [...e2], [d3] = l3.splice(n3, 1);
            l3.splice(i3, 0, d3), o2(l3);
          }), u2.appendChild(a3);
        });
```

## pointer — st/trackpoint-async.js L1453-1468 (hit L1467)
```js
    if (null == m) {
      var m = [];
      var p = 0;
      if (window.crypto && window.crypto.getRandomValues) for (F = new Uint32Array(256), window.crypto.getRandomValues(F), B = 0; B < F.length; ++B) m[p++] = F[B] & 255;
      var t = function(a2) {
        this.count = this.count || 0;
        if (256 <= this.count || 256 <= p) window.removeEventListener ? window.removeEventListener("mousemove", t, false) : window.detachEvent && window.detachEvent("onmousemove", t);
        else try {
          var d = a2.x + a2.y;
          m[p++] = d & 255;
          this.count += 1;
        } catch (g) {
        }
      };
      window.addEventListener ? window.addEventListener("mousemove", t, false) : window.attachEvent && window.attachEvent("onmousemove", t);
    }
```