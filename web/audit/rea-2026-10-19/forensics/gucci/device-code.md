# gucci — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: keyboard×3, page-transition×3, wheel-step×3, loader×3, raf-lerp×1, text-split×1

## keyboard — es2022/react-dom.mjs L1015-1055 (hit L1030)
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

## page-transition — es2022/react-dom.mjs L1048-1088 (hit L1063)
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
        switch (Ba()) {
```

## keyboard — es2022/react-dom.mjs L1158-1164 (hit L1163)
```js
  var mc = F({}, It, { key: function(e) {
    if (e.key) {
      var n = cc[e.key] || e.key;
      if (n !== "Unidentified") return n;
    }
    return e.type === "keypress" ? (e = ur(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? fc[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zi, charCode: function(e) {
```

## keyboard — es2022/react-dom.mjs L1152-1192 (hit L1167)
```js
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = dc[e]) ? !!n[e] : false;
  }
  function zi() {
    return pc;
  }
  var mc = F({}, It, { key: function(e) {
    if (e.key) {
      var n = cc[e.key] || e.key;
      if (n !== "Unidentified") return n;
    }
    return e.type === "keypress" ? (e = ur(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? fc[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zi, charCode: function(e) {
    return e.type === "keypress" ? ur(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? ur(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), hc = ce(mc), vc = F({}, Vr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Eu = ce(vc), yc = F({}, It, { touches: 0, target
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  }, deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), Ec = ce(kc), Cc = [9, 13, 27, 32], Pi = Fe && "CompositionEvent" in window, ft = null;
  Fe && "documentMode" in document && (ft = document.documentMode);
  var xc = Fe && "TextEvent" in window && !ft, Yo = Fe && (!Pi || ft && 8 < ft && 11 >= ft), Cu = " ", xu = false;
  function Xo(e, n) {
    switch (e) {
      case "keyup":
        return Cc.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function Go(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
```

## wheel-step — es2022/react-dom.mjs L1430-1442 (hit L1441)
```js
  function ss(e, n, t, r) {
    switch ($o(n)) {
      case 1:
        var l = ba;
        break;
      case 4:
        l = ec;
        break;
      default:
        l = xi;
    }
    t = l.bind(null, n, t, e), l = void 0, !Il || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (l = true), r ? l !== void 0 ? e.addEventListener(n, t, { capture: true, passive: l }) : e.addEventListener(n,
  }
```

## wheel-step — es2022/react-dom.mjs L1514-1554 (hit L1529)
```js
            case "touchmove":
            case "touchstart":
              g = gc;
              break;
            case ts:
            case rs:
            case ls:
              g = uc;
              break;
            case is:
              g = Sc;
              break;
            case "scroll":
              g = nc;
              break;
            case "wheel":
              g = Ec;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = sc;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Eu;
          }
          var k = (n & 4) !== 0, j = !k && e === "scroll", c = k ? p !== null ? p + "Capture" : null : p;
          k = [];
          for (var a = d, f; a !== null; ) {
            f = a;
            var y = f.stateNode;
            if (f.tag === 5 && y !== null && (f = y, c !== null && (y = St(a, c), y != null && k.push(zt(a, y, f)))), j) break;
            a = a.return;
          }
```

## loader — _static/parse-NDnctwM1.js L528-535 (hit L535)
```js
  }, Cl.preinitModule = function(M, b) {
    if (typeof M == "string") if (typeof b == "object" && b !== null) {
      if (b.as == null || b.as === "script") {
        var X = N(b.as, b.crossOrigin);
        v.d.M(M, { crossOrigin: X, integrity: typeof b.integrity == "string" ? b.integrity : void 0, nonce: typeof b.nonce == "string" ? b.nonce : void 0 });
      }
    } else b == null && v.d.M(M);
  }, Cl.preload = function(M, b) {
```

## loader — _static/parse-NDnctwM1.js L535-540 (hit L540)
```js
  }, Cl.preload = function(M, b) {
    if (typeof M == "string" && typeof b == "object" && b !== null && typeof b.as == "string") {
      var X = b.as, R = N(X, b.crossOrigin);
      v.d.L(M, X, { crossOrigin: R, integrity: typeof b.integrity == "string" ? b.integrity : void 0, nonce: typeof b.nonce == "string" ? b.nonce : void 0, type: typeof b.type == "string" ? b.type : void 0, fetchPriority
    }
  }, Cl.preloadModule = function(M, b) {
```

## wheel-step — _static/parse-NDnctwM1.js L1489-1529 (hit L1504)
```js
  }
  var sv = R({}, Cu, { key: function(l) {
    if (l.key) {
      var t = nv[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = Re(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? fv[l.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: yf, charCode: function(l) {
    return l.type === "keypress" ? Re(l) : 0;
  }, keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }, which: function(l) {
    return l.type === "keypress" ? Re(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  } }), yv = xl(sv), vv = R({}, Be, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), xi = xl(vv), mv = R({}, Cu, { touches: 0, target
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  }, deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), Sv = xl(gv), rv = R({}, Oa, { newState: 0, oldState: 0 }), bv = xl(rv), zv = [9, 13, 27, 32], vf = Rt && "CompositionEvent" in window, Yu = null;
  Rt && "documentMode" in document && (Yu = document.documentMode);
  var _v = Rt && "TextEvent" in window && !Yu, Li = Rt && (!vf || Yu && 8 < Yu && 11 >= Yu), Ki = " ", Ji = false;
  function wi(l, t) {
    switch (l) {
      case "keyup":
        return zv.indexOf(t.keyCode) !== -1;
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
  function Wi(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var ka = false;
  function Ev(l, t) {
    switch (l) {
      case "compositionend":
```

## page-transition — _static/parse-NDnctwM1.js L6381-6384 (hit L6383)
```js
  function Tm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Kc ? false : (Kc = l, true) : (Kc = null, false);
  }
```

## loader — _static/parse-NDnctwM1.js L6646-6661 (hit L6647)
```js
      if (!f) {
        var c = { loading: 0, preload: null };
        if (f = u.querySelector(oe(n))) c.loading = 5;
        else {
          l = R({ rel: "stylesheet", href: l, "data-precedence": t }, a), (a = gt.get(n)) && Fc(l, a);
          var i = f = u.createElement("link");
          Ol(i), Nl(i, "link", l), i._p = new Promise(function(d, S) {
            i.onload = d, i.onerror = S;
          }), i.addEventListener("load", function() {
            c.loading |= 1;
          }), i.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Un(f, t, u);
        }
        f = { type: "stylesheet", instance: f, count: 1, state: c }, e.set(n, f);
      }
```

## page-transition — web_tracking_compliance/index.js L30-55 (hit L46)
```js
  function watchPageChanges() {
    if (s) return;
    s = true;
    let e2 = window.location.href, t2 = window.location.pathname;
    const trigger = () => {
      window.location.href === e2 && window.location.pathname === t2 || (e2 = window.location.href, t2 = window.location.pathname, (function pushPageType(e3, t3) {
        setTimeout((() => {
          try {
            const n3 = getPageType(e3, t3);
            window.dataLayer?.push({ pageType: n3 });
          } catch (e4) {
            console.error("pushPageType failed", e4);
          }
        }), 0);
      })(t2, e2));
    };
    window.addEventListener("popstate", trigger);
    const n2 = history.pushState.bind(history);
    history.pushState = (...e3) => {
      n2(...e3), trigger();
    };
    const a2 = history.replaceState.bind(history);
    history.replaceState = (...e3) => {
      a2(...e3), trigger();
    };
  }
```

## raf-lerp — e/65319_1825142910.js L542-551 (hit L550)
```js
      if (0 !== oa) {
        do {
          for (T = la - 1; 0 === c.Ba[T]; ) T--;
          c.Ba[T]--;
          c.Ba[T + 1] += 2;
          c.Ba[la]--;
          oa -= 2;
        } while (0 < oa);
        for (T = la; 0 !== T; T--) for (ba = c.Ba[T]; 0 !== ba; ) D = c.U[--n], D > S || (I[2 * D + 1] !== T && (c.Ha += (T - I[2 * D + 1]) * I[2 * D], I[2 * D + 1] = T), ba--);
      }
```

## text-split — gtmgateway/?id=GTM-NQ9L24L L9572-9579 (hit L9574)
```js
  function Gr(a) {
    if (a) try {
      return new Uint8Array(atob(a.replace(/-/g, "+").replace(/_/g, "/")).split("").map(function(b2) {
        return b2.charCodeAt(0);
      }));
    } catch (b2) {
    }
  }
```