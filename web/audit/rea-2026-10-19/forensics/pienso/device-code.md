# pienso — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, page-transition×3, keyboard×3, wheel-step×3, observer×3, raf-lerp×3, shader-uniforms×3, audio×1, reveal-timeline×1, pointer×3

## loader — chunks/8901-13fb63ebdc0e269f.js L114-122 (hit L118)
```js
  let l = (e2) => {
    let { mediaPayload: r2, priority: a2, sizes: n2, layout: i2, originalWidth: l2, style: s2 } = e2;
    if ((null == r2 ? void 0 : r2.type) !== "mux-image" || !r2.image) return null;
    let { image: u2 } = r2;
    return (0, t.jsx)(o.E, { alt: u2.alt || "", objectFit: "cover", priority: a2, src: r2.image.src, sizes: n2, layout: i2, loader: (e3) => {
      let { width: r3, src: a3 } = e3, t2 = new URLSearchParams(), n3 = r3 > l2 ? l2 : r3;
      return n3 && t2.append("width", "".concat(n3)), "".concat(a3, "&").concat(t2.toString());
    }, placeholder: "empty", style: s2 });
  };
```

## loader — chunks/8901-13fb63ebdc0e269f.js L127-135 (hit L127)
```js
    let { layout: a2, width: n2, height: o2, sizes: d2, firstFrame: m2, priority: f2, alt: p2, loop: v2 = true, muted: y2 = true, preload: g2 = "none", autoplay: h2 = false, src: j2, play: _2, load: b2, onPlaying: q2, on
      if ("responsive" === a2) {
        if (E2 && "string" == typeof E2) {
          let e3 = s.b[E2];
          return { paddingBottom: "".concat(100 * e3, "%") };
        }
        return { paddingBottom: "".concat(o2 / n2 * 100, "%") };
      }
    })(), S2 = (0, i.useRef)(false), T2 = (0, i.useRef)(null);
```

## loader — chunks/8901-13fb63ebdc0e269f.js L158-187 (hit L178)
```js
  let p = (e2) => {
    let { autoplay: r2, isMuted: a2 } = e2, [t2, n2] = (0, i.useState)(void 0), [o2, l2] = (0, i.useState)(void 0), [s2, u2] = (0, i.useState)(a2), [d2, c2] = (0, i.useState)(void 0), [m2, p2] = (0, i.useState)(void 0), 
    return (0, i.useEffect)(() => {
      if (!(null == j2 ? void 0 : j2.target)) return;
      let e3 = "none" === window.getComputedStyle(null == j2 ? void 0 : j2.target).display;
      h2 && !e3 && r2 && p2(true), !h2 || e3 || r2 || (l2(false), n2(false));
    }, [h2, j2, r2]), { containerRef: g2, videoControlProps: { onPlaying: () => {
      n2(true), l2(false), y2(false);
    }, onPause: () => {
      n2(false);
    }, onCanPlay: () => {
      r2 && !t2 && c2(true), r2 || t2 || !v2 || c2(true), r2 || t2 || v2 || l2(false);
    }, onWaiting: () => {
      c2(false), n2(false), l2(true), y2(true);
    }, onError: () => {
      c2(void 0), n2(void 0), l2(void 0);
    }, onNotAllowed: () => {
      c2(false), n2(false), l2(false);
    }, onLoadStart: () => {
      l2(true);
    }, play: d2, load: m2, muted: s2 }, controlsProps: { isPlaying: t2, isLoading: o2, muted: s2, onRequestPlay: () => {
      c2(true);
    }, onRequestPause: () => {
      c2(false);
    }, onRequestUnmute: () => {
      u2(false);
    }, onRequestMute: () => {
      u2(true);
    } } };
  }, v = () => null, y = (e2) => {
```

## page-transition — chunks/1dd3208c-85ae19142aa40c69.js L1008-1022 (hit L1014)
```js
  function nw() {
    nh = nm = false;
    for (var e10 = Y(), t10 = null, n10 = nd; null !== n10; ) {
      var r10 = n10.next;
      if (0 !== ny && (function() {
        var e11 = window.event;
        return e11 && "popstate" === e11.type ? e11 !== s6 && (s6 = e11, true) : (s6 = null, false);
      })()) {
        var l10 = n10, a10 = ny;
        l10.pendingLanes |= 2, l10.entangledLanes |= 2, l10.entanglements[1] |= a10;
      }
      0 === (l10 = nS(n10, e10)) ? (n10.next = null, null === t10 ? nd = r10 : t10.next = r10, null === r10 && (np = t10)) : (t10 = n10, 0 != (3 & l10) && (nh = true)), n10 = r10;
    }
    ny = 0, nb(false);
  }
```

## keyboard — chunks/1dd3208c-85ae19142aa40c69.js L4636-4642 (hit L4641)
```js
  var uu = iK(u({}, i4, { key: function(e10) {
    if (e10.key) {
      var t10 = ur[e10.key] || e10.key;
      if ("Unidentified" !== t10) return t10;
    }
    return "keypress" === e10.type ? 13 === (e10 = iW(e10)) ? "Enter" : String.fromCharCode(e10) : "keydown" === e10.type || "keyup" === e10.type ? ul[e10.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ui, charCode: function(e10) {
```

## keyboard — chunks/1dd3208c-85ae19142aa40c69.js L4630-4670 (hit L4645)
```js
    var t10 = this.nativeEvent;
    return t10.getModifierState ? t10.getModifierState(e10) : !!(e10 = ua[e10]) && !!t10[e10];
  }
  function ui() {
    return uo;
  }
  var uu = iK(u({}, i4, { key: function(e10) {
    if (e10.key) {
      var t10 = ur[e10.key] || e10.key;
      if ("Unidentified" !== t10) return t10;
    }
    return "keypress" === e10.type ? 13 === (e10 = iW(e10)) ? "Enter" : String.fromCharCode(e10) : "keydown" === e10.type || "keyup" === e10.type ? ul[e10.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ui, charCode: function(e10) {
    return "keypress" === e10.type ? iW(e10) : 0;
  }, keyCode: function(e10) {
    return "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  }, which: function(e10) {
    return "keypress" === e10.type ? iW(e10) : "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  } })), us = iK(u({}, i8, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), uc = iK(u({}, i4, { touches: 0, targetTouches: 0, change
    return "deltaX" in e10 ? e10.deltaX : "wheelDeltaX" in e10 ? -e10.wheelDeltaX : 0;
  }, deltaY: function(e10) {
    return "deltaY" in e10 ? e10.deltaY : "wheelDeltaY" in e10 ? -e10.wheelDeltaY : "wheelDelta" in e10 ? -e10.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 })), up = false, um = null, uh = null, ug = null, uy = /* @__PURE__ */ new Map(), uv = /* @__PURE__ */ new Map(), ub = [], uk = "mousedown mouseup touchcancel touchend touchstart auxclick dbl
  function uw(e10, t10) {
    switch (e10) {
      case "focusin":
      case "focusout":
        um = null;
        break;
      case "dragenter":
      case "dragleave":
        uh = null;
        break;
      case "mouseover":
      case "mouseout":
        ug = null;
        break;
      case "pointerover":
      case "pointerout":
        uy.delete(t10.pointerId);
        break;
```

## keyboard — chunks/1dd3208c-85ae19142aa40c69.js L4858-4898 (hit L4873)
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

## page-transition — chunks/1dd3208c-85ae19142aa40c69.js L4891-4931 (hit L4906)
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
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (X()) {
```

## wheel-step — chunks/1dd3208c-85ae19142aa40c69.js L5149-5161 (hit L5160)
```js
  function sI(e10, t10, n10, r10) {
    switch (uU(t10)) {
      case 2:
        var l10 = uM;
        break;
      case 8:
        l10 = uO;
        break;
      default:
        l10 = uR;
    }
    n10 = l10.bind(null, t10, n10, e10), l10 = void 0, i$ && ("touchstart" === t10 || "touchmove" === t10 || "wheel" === t10) && (l10 = true), r10 ? void 0 !== l10 ? e10.addEventListener(t10, n10, { capture: true, passiv
  }
```

## wheel-step — chunks/1dd3208c-85ae19142aa40c69.js L5234-5274 (hit L5249)
```js
            case "touchstart":
              u11 = uc;
              break;
            case sw:
            case sS:
            case sC:
              u11 = ue;
              break;
            case sE:
              u11 = uf;
              break;
            case "scroll":
            case "scrollend":
              u11 = i6;
              break;
            case "wheel":
              u11 = ud;
              break;
            case "copy":
            case "cut":
            case "paste":
              u11 = ut;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              u11 = us;
          }
          var c2 = 0 != (4 & t10), f2 = !c2 && ("scroll" === e10 || "scrollend" === e10), d2 = c2 ? null !== i11 ? i11 + "Capture" : null : i11;
          c2 = [];
          for (var p2, m2 = r11; null !== m2; ) {
            var h2 = m2;
            if (p2 = h2.stateNode, 5 !== (h2 = h2.tag) && 26 !== h2 && 27 !== h2 || null === p2 || null === d2 || null != (h2 = iQ(m2, d2)) && c2.push(sB(m2, h2, p2)), f2) break;
            m2 = m2.return;
          }
          0 < c2.length && (i11 = new u11(i11, s10, null, n10, l11), o11.push({ event: i11, listeners: c2 }));
```

## observer — chunks/6916-69b1f64ad3f77bbc.js L268-279 (hit L273)
```js
          let { id: n2, observer: o2, elements: i2 } = (function(e5) {
            let t4;
            let r4 = { root: e5.root || null, margin: e5.rootMargin || "" }, n3 = u.find((e6) => e6.root === r4.root && e6.margin === r4.margin);
            if (n3 && (t4 = a.get(n3))) return t4;
            let o3 = /* @__PURE__ */ new Map();
            return t4 = { id: r4, observer: new IntersectionObserver((e6) => {
              e6.forEach((e7) => {
                let t5 = o3.get(e7.target), r5 = e7.isIntersecting || e7.intersectionRatio > 0;
                t5 && r5 && t5(r5);
              });
            }, e5), elements: o3 }, u.push(r4), a.set(r4, t4), t4;
          })(r3);
```

## observer — chunks/3106-26f1bda98dbb54b7.js L519-527 (hit L519)
```js
            let r4 = /* @__PURE__ */ new Map(), a2 = new IntersectionObserver((t5) => {
              t5.forEach((t6) => {
                var n5;
                let l2 = t6.isIntersecting && o2.some((e5) => t6.intersectionRatio >= e5);
                e4.trackVisibility && void 0 === t6.isVisible && (t6.isVisible = l2), null == (n5 = r4.get(t6.target)) || n5.forEach((e5) => {
                  e5(l2, t6);
                });
              });
            }, e4);
```

## page-transition — chunks/586-56eae91133daf825.js L142-165 (hit L144)
```js
  function B() {
    if (!(function() {
      let e11 = D.chrome, t3 = e11 && e11.app && e11.app.runtime, n2 = "history" in D && !!D.history.pushState && !!D.history.replaceState;
      return !t3 && n2;
    })()) return;
    let e10 = H.onpopstate;
    function t2(e11) {
      return function(...t3) {
        let n2 = t3.length > 2 ? t3[2] : void 0;
        if (n2) {
          let e12 = o, t4 = String(n2);
          o = t4, F("history", { from: e12, to: t4 });
        }
        return e11.apply(this, t3);
      };
    }
    H.onpopstate = function(...t3) {
      let n2 = H.location.href, r2 = o;
      if (o = n2, F("history", { from: r2, to: n2 }), e10) try {
        return e10.apply(this, t3);
      } catch (e11) {
      }
    }, (0, R.hl)(H.history, "pushState", t2), (0, R.hl)(H.history, "replaceState", t2);
  }
```

## raf-lerp — chunks/80507811.e7c87bd41fe59f98.js L666-706 (hit L681)
```js
        return Math.round(255 * e10);
      case Int16Array:
        return Math.round(32767 * e10);
      case Int8Array:
        return Math.round(127 * e10);
      default:
        throw Error("Invalid component type.");
    }
  }
  var tQ = Object.freeze({ __proto__: null, DEG2RAD: tF, RAD2DEG: tU, ceilPowerOfTwo: tW, clamp: tV, damp: function(e10, t10, i10, r10) {
    return tG(e10, t10, 1 - Math.exp(-i10 * r10));
  }, degToRad: function(e10) {
    return e10 * tF;
  }, denormalize: tX, euclideanModulo: tj, floorPowerOfTwo: tq, generateUUID: tk, inverseLerp: function(e10, t10, i10) {
    return e10 !== t10 ? (i10 - e10) / (t10 - e10) : 0;
  }, isPowerOfTwo: tH, lerp: tG, mapLinear: function(e10, t10, i10, r10, s10) {
    return r10 + (e10 - t10) * (s10 - r10) / (i10 - t10);
  }, normalize: tY, pingpong: function(e10) {
    let t10 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    return t10 - Math.abs(tj(e10, 2 * t10) - t10);
  }, radToDeg: function(e10) {
    return e10 * tU;
  }, randFloat: function(e10, t10) {
    return e10 + Math.random() * (t10 - e10);
  }, randFloatSpread: function(e10) {
    return e10 * (0.5 - Math.random());
  }, randInt: function(e10, t10) {
    return e10 + Math.floor(Math.random() * (t10 - e10 + 1));
  }, seededRandom: function(e10) {
    void 0 !== e10 && (tN = e10);
    let t10 = tN += 1831565813;
    return t10 = Math.imul(t10 ^ t10 >>> 15, 1 | t10), (((t10 ^= t10 + Math.imul(t10 ^ t10 >>> 7, 61 | t10)) ^ t10 >>> 14) >>> 0) / 4294967296;
  }, setQuaternionFromProperEuler: function(e10, t10, i10, r10, s10) {
    let a10 = Math.cos, o10 = Math.sin, l10 = a10(i10 / 2), h10 = o10(i10 / 2), c10 = a10((t10 + r10) / 2), d10 = o10((t10 + r10) / 2), u10 = a10((t10 - r10) / 2), p10 = o10((t10 - r10) / 2), f10 = a10((r10 - t10) / 2), 
    switch (s10) {
      case "XYX":
        e10.set(l10 * d10, h10 * u10, h10 * p10, l10 * c10);
        break;
      case "YZY":
        e10.set(h10 * p10, l10 * d10, h10 * u10, l10 * c10);
        break;
```

## raf-lerp — chunks/80507811.e7c87bd41fe59f98.js L867-907 (hit L882)
```js
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    distanceTo(e10) {
      return Math.sqrt(this.distanceToSquared(e10));
    }
    distanceToSquared(e10) {
      let t10 = this.x - e10.x, i10 = this.y - e10.y;
      return t10 * t10 + i10 * i10;
    }
    manhattanDistanceTo(e10) {
      return Math.abs(this.x - e10.x) + Math.abs(this.y - e10.y);
    }
    setLength(e10) {
      return this.normalize().multiplyScalar(e10);
    }
    lerp(e10, t10) {
      return this.x += (e10.x - this.x) * t10, this.y += (e10.y - this.y) * t10, this;
    }
    lerpVectors(e10, t10, i10) {
      return this.x = e10.x + (t10.x - e10.x) * i10, this.y = e10.y + (t10.y - e10.y) * i10, this;
    }
    equals(e10) {
      return e10.x === this.x && e10.y === this.y;
    }
    fromArray(e10) {
      let t10 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return this.x = e10[t10], this.y = e10[t10 + 1], this;
    }
    toArray() {
      let e10 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t10 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return e10[t10] = this.x, e10[t10 + 1] = this.y, e10;
    }
    fromBufferAttribute(e10, t10) {
      return this.x = e10.getX(t10), this.y = e10.getY(t10), this;
    }
    rotateAround(e10, t10) {
      let i10 = Math.cos(t10), r10 = Math.sin(t10), s10 = this.x - e10.x, a10 = this.y - e10.y;
      return this.x = s10 * i10 - a10 * r10 + e10.x, this.y = s10 * r10 + a10 * i10 + e10.y, this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this;
```

## raf-lerp — chunks/80507811.e7c87bd41fe59f98.js L1168-1208 (hit L1183)
```js
    addColors(e10, t10) {
      return this.r = e10.r + t10.r, this.g = e10.g + t10.g, this.b = e10.b + t10.b, this;
    }
    addScalar(e10) {
      return this.r += e10, this.g += e10, this.b += e10, this;
    }
    sub(e10) {
      return this.r = Math.max(0, this.r - e10.r), this.g = Math.max(0, this.g - e10.g), this.b = Math.max(0, this.b - e10.b), this;
    }
    multiply(e10) {
      return this.r *= e10.r, this.g *= e10.g, this.b *= e10.b, this;
    }
    multiplyScalar(e10) {
      return this.r *= e10, this.g *= e10, this.b *= e10, this;
    }
    lerp(e10, t10) {
      return this.r += (e10.r - this.r) * t10, this.g += (e10.g - this.g) * t10, this.b += (e10.b - this.b) * t10, this;
    }
    lerpColors(e10, t10, i10) {
      return this.r = e10.r + (t10.r - e10.r) * i10, this.g = e10.g + (t10.g - e10.g) * i10, this.b = e10.b + (t10.b - e10.b) * i10, this;
    }
    lerpHSL(e10, t10) {
      this.getHSL(t7), e10.getHSL(ie);
      let i10 = tG(t7.h, ie.h, t10), r10 = tG(t7.s, ie.s, t10), s10 = tG(t7.l, ie.l, t10);
      return this.setHSL(i10, r10, s10), this;
    }
    equals(e10) {
      return e10.r === this.r && e10.g === this.g && e10.b === this.b;
    }
    fromArray(e10) {
      let t10 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return this.r = e10[t10], this.g = e10[t10 + 1], this.b = e10[t10 + 2], this;
    }
    toArray() {
      let e10 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t10 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return e10[t10] = this.r, e10[t10 + 1] = this.g, e10[t10 + 2] = this.b, e10;
    }
    fromBufferAttribute(e10, t10) {
      return this.r = e10.getX(t10), this.g = e10.getY(t10), this.b = e10.getZ(t10), this;
    }
    toJSON() {
```

## shader-uniforms — chunks/80507811.e7c87bd41fe59f98.js L3658-3664 (hit L3661)
```js
    fromEquirectangularTexture(e10, t10) {
      this.texture.type = t10.type, this.texture.encoding = t10.encoding, this.texture.generateMipmaps = t10.generateMipmaps, this.texture.minFilter = t10.minFilter, this.texture.magFilter = t10.magFilter;
      let i10 = new n$(5, 5, 5), r10 = new n4({ name: "CubemapFromEquirect", uniforms: n0({ tEquirect: { value: null } }), vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir,
      r10.uniforms.tEquirect.value = t10;
      let s10 = new nK(i10, r10), a10 = t10.minFilter;
      return 1008 === t10.minFilter && (t10.minFilter = 1006), new n8(1, 10, this).update(e10, s10), t10.minFilter = a10, s10.geometry.dispose(), s10.material.dispose(), this;
    }
```

## shader-uniforms — chunks/80507811.e7c87bd41fe59f98.js L4244-4251 (hit L4246)
```js
    _textureToCubeUV(e10, t10) {
      let i10 = this._renderer, r10 = 301 === e10.mapping || 302 === e10.mapping;
      r10 ? (null === this._cubemapMaterial && (this._cubemapMaterial = rI()), this._cubemapMaterial.uniforms.flipEnvMap.value = false === e10.isRenderTargetTexture ? -1 : 1) : null === this._equirectMaterial && (this._e
      let s10 = r10 ? this._cubemapMaterial : this._equirectMaterial, a10 = new nK(this._lodPlanes[0], s10);
      s10.uniforms.envMap.value = e10;
      let o10 = this._cubeSize;
      rD(t10, 0, 0, 3 * o10, 2 * o10), i10.setRenderTarget(t10), i10.render(a10, rS);
    }
```

## audio — chunks/80507811.e7c87bd41fe59f98.js L22230-22235 (hit L22233)
```js
    fade(e10) {
      let t10 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3;
      e10 ? (this.sound.volume(this._volume), this.clearFade(), this.fadeTimerId = window.setTimeout(() => {
        this.sound.fade(this._volume, 0, t10), this.clearFade();
      }, e10)) : this.sound.fade(this._volume, 0, t10);
    }
```

## shader-uniforms — chunks/80507811.e7c87bd41fe59f98.js L23910-23950 (hit L23925)
```js
    updateState(e10, t10) {
      this.updateState_Entity(e10, t10), "buffer" in e10 && 1 === Object.keys(e10).length && t10.scene.reloadSplats();
    }
    constructor(e10, t10) {
      super(), this.super_Entity(e10, t10), this.objectHelper.update();
    }
  }, MR = class extends Mp(al, MO) {
    updateState(e10, t10) {
      this.updateState_Entity(e10, t10);
    }
    constructor(e10, t10, i10) {
      super(), this.super_Entity(e10, t10), this.context = i10, this.objectHelper.update();
    }
  }, ML = "varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}", MB = class extends n4 {
    set inputBuffer(e10) {
      this.uniforms.inputBuffer.value = e10;
    }
    setInputBuffer(e10) {
      this.uniforms.inputBuffer.value = e10;
    }
    set cocBuffer(e10) {
      this.uniforms.cocBuffer.value = e10;
    }
    setCoCBuffer(e10) {
      this.uniforms.cocBuffer.value = e10;
    }
    get scale() {
      return this.uniforms.scale.value;
    }
    set scale(e10) {
      this.uniforms.scale.value = e10;
    }
    getScale(e10) {
      return this.uniforms.scale.value = e10;
    }
    setScale(e10) {
      this.uniforms.scale.value = e10;
    }
    generateKernel() {
      let e10 = new Float32Array(128), t10 = new Float32Array(32), i10 = 0, r10 = 0;
      for (let s11 = 0; s11 < 80; ++s11) {
```

## reveal-timeline — chunks/80507811.e7c87bd41fe59f98.js L31292-31322 (hit L31297)
```js
    buildTimeline() {
      var e10, t10, i10, r10, s10, a10;
      let { isForward: o10 = true, needsRebuild: l10 = false, isRebuild: h10 = false } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      try {
        let e11 = DA(this.data.tweens[0].data);
        h10 && "number" == typeof e11.loop && e11.loop--, null === (t10 = this.timeline) || void 0 === t10 || t10.pause(), this.timeline = Di.timeline({ autoplay: false, ...e11, ...true === e11.loop || e11.loop > 1 ? { t
        let c10 = this.tweens.findIndex((e12) => null == e12 ? void 0 : e12.changeBegan);
        if (true === l10 && (this.timelineNeedsRebuild = true), o10) {
          let t11 = -1 === c10 ? 0 : c10;
          for (let s11 = t11; s11 < this.data.tweens.length - 1; s11++) {
            let a11 = this.data.tweens[s11], o11 = this.data.tweens[s11 + 1], l11;
            s11 === t11 && (true === this.object.wasMovedByUser || (null === (i10 = this.object.previousAction) || void 0 === i10 ? void 0 : i10.changeBegan) === true) ? (l11 = void 0, this.object instanceof Mb && (this.
            let h11 = new DC(this.object, l11, void 0 === o11.data.state ? this.currentState : o11.data.state, o11.data, this.shared, null !== (r10 = this.data.allowSlerp) && void 0 !== r10 && r10);
            -1 !== c10 && s11 === t11 && Object.assign(h11.params, { startOnceDelay: 0 }), this.tweens[s11] = h11, this.timeline.add(h11.params, this.timeline.duration + (s11 === t11 ? e11.delay : 0));
          }
          this.timeline.duration += e11.endDelay;
        } else {
          let t11 = -1 === c10 ? this.data.tweens.length - 1 : c10 + 1;
          for (let i11 = t11; i11 > 0; i11--) {
            let r11 = this.data.tweens[i11], o11 = this.data.tweens[i11 - 1], l11;
            i11 === t11 && (true === this.object.wasMovedByUser || (null === (s10 = this.object.previousAction) || void 0 === s10 ? void 0 : s10.changeBegan) === true) ? (l11 = void 0, this.object instanceof Mb && (this.
            let h11 = new DC(this.object, l11, void 0 === o11.data.state ? this.currentState : o11.data.state, r11.data, this.shared, null !== (a10 = this.data.allowSlerp) && void 0 !== a10 && a10);
            -1 !== c10 && i11 === t11 && Object.assign(h11.params, { startOnceDelay: 0 }), this.tweens[i11 - 1] = h11, this.timeline.add(h11.params, this.timeline.duration + (i11 === t11 ? e11.endDelay : 0));
          }
          this.timeline.duration += e11.delay;
        }
      } catch (e11) {
        e11 instanceof Error && console.error(e11.message);
      }
      (null === (e10 = this.object.previousAction) || void 0 === e10 ? void 0 : e10.playing) === true && this.object.previousAction.pause(), this.object.previousAction = this;
    }
```

## pointer — chunks/80507811.e7c87bd41fe59f98.js L31991-32052 (hit L31994)
```js
    constructor(e10, t10, i10, r10, s10, a10, o10, l10, h10) {
      var c10, d10, u10, p10, f10, m10, g10, v10, y10, x10, b10, w10, S10, _10, A10, M10, E10, C10, T10, P10;
      super(), this.object = e10, this.domElement = t10, this.data = i10, this.gloabalPhysics = r10, this.controlsManager = s10, this.cameraFollow = a10, this.camera = o10, this.page = l10, this.sharedAssets = h10, this.
        e11.target !== this.domElement || -1 !== this.firstPointerId || (this.firstPointerId = e11.pointerId, this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove), this.domElement.ownerDocume
      }, this.onPointerUp = (e11) => {
        this.firstPointerId = -1, this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this.onPointerUp), "mouse" === e11.po
      }, this.onPointerMove = (e11) => {
        if (e11.pointerId !== this.firstPointerId) return;
        let t11 = e11.clientX - this.prevMouse.x, i11 = e11.clientY - this.prevMouse.y;
        this.prevMouse.set(e11.clientX, e11.clientY), "mouse" === e11.pointerType && "keys" !== this.rotBy && (uj && uG < 15.5 && !uV ? (this.eulerDelta.y = -t11 * this.mouseOrbitSensitivity, this.eulerDelta.x = -i11 * t
      }, this.onPointerlockChange = (e11) => {
        this.domElement.ownerDocument.pointerLockElement === this.domElement ? Oh.isLocked = true : Oh.isLocked = false;
      }, this.onPointerlockError = () => {
        console.error("SPE.GameControls: Unable to use Pointer Lock API");
      }, this.handleVisibilityChange = () => {
        var e11;
        if (null === (e11 = document) || void 0 === e11 ? void 0 : e11.hidden) for (let e12 in this.movementState) this.movementState[e12] = 0;
      }, this.onKeyDown = (e11) => {
        for (let t11 of (e11.target instanceof HTMLInputElement || "ArrowLeft" !== e11.code && "ArrowUp" !== e11.code && "ArrowRight" !== e11.code && "ArrowDown" !== e11.code && "Space" !== e11.code || e11.preventDefault
          this.movementState[t11[0]] = 1;
          break;
        }
        this.controlsManager.requestRender();
      }, this.onKeyUp = (e11) => {
        for (let t11 of this.keyAssignments) if (e11.key.toUpperCase() === t11[1] || e11.key === t11[1] || e11.code.slice(3, e11.code.length).toUpperCase() === t11[1]) {
          this.movementState[t11[0]] = 0;
          break;
        }
      }, this.copyVRGamePadValues = (e11, t11) => {
        for (let i11 = 2; i11 < 4; i11++) {
          let r11 = e11.axes[i11];
          0 === t11 ? 2 === i11 ? this.movementState.movePosX = r11 : this.movementState.movePosZ = r11 : (e11.buttons[3].pressed ? this.movementState.jump = 1 : this.movementState.jump = 0, 2 === i11 ? (0.3 > Math.abs(t
        }
      }, this.sharedGameControlGlobals = s10.sharedGameControlGlobals, e10 === o10 && (this.isFirstPerson = true), this.hiddenMatrix0.copy(this.object.hiddenMatrix), this.object.parent ? this.object.hiddenMatrix.copy(thi
      let D10 = this.euler0.clone(), O10 = D10.y;
      if (this.objectRealQuat.copy(this.quaternion), D10.y = 0, this.quaternion.setFromEuler(D10), this.objXZQuat.copy(this.quaternion), this.objXZQuatInv.copy(this.objXZQuat).invert(), this.objXZRotMat.makeRotationFromQ
        let e11, t11;
        this.position0Cam.copy(this.camera.position), this.quat0Cam.copy(this.camera.quaternion), this.scale0Cam.copy(this.camera.scale), this.hiddenMatrix0Cam.copy(this.camera.hiddenMatrix), this.camera.parent ? (this.c
        let i11 = new iy(0, 0, -1).applyQuaternion(this.camera.quaternion), r11 = new iy().subVectors(this.position, this.camera.position);
        this.objectToCamXZ.copy(r11), this.objectToCamXZ.y = 0, this.objectToCamXZ0.copy(this.objectToCamXZ), 1e-6 > Math.abs(i11.y) ? (r11.y = 0, i11.y = 0, t11 = r11.projectOnVector(i11)) : t11 = r11.y / i11.y > 0 ? i1
        let s11 = new i4().setFromQuaternion(this.camera.quaternion, "YXZ");
        this.cameraPolarOffset = -s11.x, s11.x = 0, s11.z = 0, s11.y -= Math.PI / 2, this.cameraPolarAxis0.set(0, 0, -1).applyEuler(s11);
      }
      if (this.object instanceof Mb && (this.object.matrixAutoUpdate = false), this.euler.setFromQuaternion(this.quaternion, "YXZ"), this.rotByTouch = null !== (d10 = i10.rotByTouch) && void 0 !== d10 ? d10 : "joystick",
        let t11 = [e11[0], e11[1]];
        return "\u25B2" === t11[1] ? t11[1] = "ArrowUp" : "\u25C0" === t11[1] ? t11[1] = "ArrowLeft" : "\u25BC" === t11[1] ? t11[1] = "ArrowDown" : "\u25B6" === t11[1] ? t11[1] = "ArrowRight" : "\u21E7" === t11[1] ? t11[
      }), "mouse" === i10.rotBy) {
        let e11;
        -1 !== (e11 = this.keyAssignments.findIndex((e12) => "rotNegX" === e12[0])) && (this.keyAssignments[e11][1] = ""), -1 !== (e11 = this.keyAssignments.findIndex((e12) => "rotPosX" === e12[0])) && (this.keyAssignmen
      }
      this.lerpFactorPosStart = 1 - 0.02 ** (1 / ((null !== (y10 = i10.delayPos[0]) && void 0 !== y10 ? y10 : 0.3) * 60)), this.lerpFactorPosEnd = 1 - 0.02 ** (1 / ((null !== (x10 = i10.delayPos[1]) && void 0 !== x10 ? x
      let I10 = new iy().fromArray(i10.collider.position), R2 = new iv().setFromEuler(new i4().fromArray([...i10.collider.rotation, "XYZ"]));
      this.collider.position.copy(I10).multiply(this.scale), this.collider.rotation.copy(R2), this.collider.matrix.compose(I10, R2, On), void 0 !== i10.cameraXAxis && (this.cameraXAxis = i10.cameraXAxis, this.cameraYAxis
      let L2 = 2 * i10.navmesh.destinationHelperRadius;
      if (L2 > 0) {
        let e11 = new pd();
        e11.push({ fi: 0, data: { ...ga.defaultData("light", "phong"), alpha: 0 }, id: "layer1" }), e11.push({ fi: 0, data: { ...ga.defaultData("color"), color: i10.navmesh.destinationHelperColor, alpha: i10.navmesh.dest
        let t11 = new _5({ layers: e11 }, { scene: this.page.scene, shared: this.sharedAssets });
        this.navMeshPathDest = new nK(xy.create({ parameters: { width: L2, height: L2 / 10, hollow: 0.7 } }), t11), this.navMeshPathDest.material.userData.opacity0 = i10.navmesh.destinationHelperColor.a;
      }
      this.activate();
    }
```

## wheel-step — chunks/80507811.e7c87bd41fe59f98.js L32217-32225 (hit L32222)
```js
      super(...arguments), this.objectsPerEvents = /* @__PURE__ */ new Map(), this.splineEvents = {}, this.onBeginEvent = (e10) => {
        var t10;
        if (!e10.eventName || !e10.target || "Scroll" === e10.eventName) return;
        let i10 = null === (t10 = this.splineEvents[OE(e10.eventName)]) || void 0 === t10 ? void 0 : t10[e10.target.uuid];
        if (!i10) return;
        "Scroll" === e10.eventName && void 0 !== e10.deltaY && Object.assign(i10, { deltaY: e10.deltaY });
        let { domElement: r10 } = this.eventContext;
        r10.dispatchEvent(i10);
      };
```

## pointer — chunks/80507811.e7c87bd41fe59f98.js L32605-32618 (hit L32617)
```js
    connect() {
      let e10 = {};
      if (this.eventContext.page.traverseEntity((t11) => {
        t11.component && (e10[t11.component.uuid] ? e10[t11.component.uuid].push(t11.uuid) : e10[t11.component.uuid] = [t11.uuid]);
      }), this.eventContext.page.traverseEntity((t11) => {
        var i10;
        null === (i10 = t11.data) || void 0 === i10 || i10.events.filter((e11) => "DragDrop" === e11.data.type && !e11.data.disabled).forEach((i11) => {
          this.events.push(new O$(t11, i11.id, i11.data, this.eventContext.page, this.eventContext.sharedAssets, this.eventManager, e10));
        });
      }), !this.events.length) return;
      this.domEventsNeeded.clear(), this.domEventsNeeded.add("pointerdown");
      let t10 = this.eventContext.domElement;
      t10.addEventListener("pointerdown", this.onPointerDown), t10.addEventListener("pointermove", this.onPointerMove), t10.addEventListener("pointerup", this.onPointerUp), this.domEventsNeeded.add("pointermove");
    }
```

## pointer — chunks/80507811.e7c87bd41fe59f98.js L32965-32987 (hit L32984)
```js
    connect() {
      let { page: e10, sharedAssets: t10 } = this.eventContext, i10 = (i11, r11) => {
        var s10, a10;
        if (!(!i11.visible || !(null === (s10 = i11.data) || void 0 === s10 ? void 0 : s10.events.length))) {
          for (let { id: r12, data: s11 } of i11.data.events) if (!s11.disabled && "MouseHover" === s11.type) try {
            let a11 = new Ix(r12, s11, i11, e10, t10, this.eventManager);
            this.eventsPerObjects[i11.uuid] ? this.eventsPerObjects[i11.uuid].push(a11) : this.eventsPerObjects[i11.uuid] = [a11];
          } catch (e11) {
          }
          (null === (a10 = this.eventsPerObjects[i11.uuid]) || void 0 === a10 ? void 0 : a10.length) && this.objects.push(i11 instanceof Cf ? r11 : i11);
        }
      };
      if (e10.traverseEntity((e11) => {
        var t11;
        (e11 instanceof C3 || e11 instanceof CQ) && (null === (t11 = e11.frame) || void 0 === t11 || t11.traverse((t12) => {
          i10(t12, e11);
        })), i10(e11);
      }), !this.objects.length) return;
      let { domElement: r10 } = this.eventContext;
      this.domEventsNeeded.clear(), uV && (this.domEventsNeeded.add("pointerdown"), r10.addEventListener("pointerdown", this.onMouseDown), this.domEventsNeeded.add("pointerup"), r10.addEventListener("pointerup", this.onM
        e11.addEventListener("userEvent", this.onUserEvent);
      });
    }
```

## observer — chunks/80507811.e7c87bd41fe59f98.js L33118-33148 (hit L33138)
```js
    connect() {
      let { page: e10, sharedAssets: t10, domElement: i10, isExport: r10 } = this.eventContext, s10 = (s11) => {
        var a10, o10, l10;
        if (null === (a10 = s11.data) || void 0 === a10 ? void 0 : a10.events.length) {
          for (let { id: a11, data: h10 } of s11.data.events) if (!h10.disabled && "Scroll" === h10.type) {
            if ("load" !== h10.trigger && r10) {
              let r11 = new IS(a11, h10, s11, e10, t10, i10, this.managers);
              this.scrollEventsPerObject.has(s11) ? null === (l10 = this.scrollEventsPerObject.get(s11)) || void 0 === l10 || l10.push(r11) : this.scrollEventsPerObject.set(s11, [r11]);
            } else {
              let i11 = new Iw(a11, h10, s11, e10, t10, this.managers);
              this.wheelEventsPerObject.has(s11) ? null === (o10 = this.wheelEventsPerObject.get(s11)) || void 0 === o10 || o10.push(i11) : this.wheelEventsPerObject.set(s11, [i11]);
            }
          }
        }
      };
      e10.traverseEntity((e11) => {
        var t11;
        (e11 instanceof C3 || e11 instanceof CQ) && (null === (t11 = e11.frame) || void 0 === t11 || t11.traverse((e12) => {
          s10(e12);
        })), s10(e11);
      }), this.intersectionObserver = new IntersectionObserver((e11) => {
        let t11 = e11[0];
        t11 && (this.isInview = t11.isIntersecting);
      }, { root: null }), this.intersectionObserver.observe(this.eventContext.domElement), [...this.wheelEventsPerObject.entries()].forEach((e11) => {
        let [t11, i11] = e11;
        i11.forEach((e12) => e12.connect()), t11.addEventListener("userEvent", this.onUserEvent);
      }), [...this.scrollEventsPerObject.entries()].forEach((e11) => {
        let [t11, i11] = e11;
        i11.forEach((e12) => e12.connect()), t11.addEventListener("userEvent", this.onUserEvent);
      }), [...this.wheelEventsPerObject.values()].some((e11) => e11.length) && (this.domEventsNeeded.add("wheel"), window.addEventListener("wheel", this.onWheel)), [...this.scrollEventsPerObject.values()].some((e11) => e
    }
```