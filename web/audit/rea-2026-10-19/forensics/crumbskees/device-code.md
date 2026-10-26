# crumbskees — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: audio×3, loader×3, keyboard×3, wheel-step×2, raf-lerp×1, pointer×1, shader-uniforms×3

## audio — js/main.js L184-224 (hit L199)
```js
          }
          return t2._suspendTimer && clearTimeout(t2._suspendTimer), t2._suspendTimer = setTimeout(function() {
            t2.autoSuspend && (t2._suspendTimer = null, t2.state = "suspending", t2.ctx.suspend().then(function() {
              t2.state = "suspended", t2._resumeAfterSuspend && (delete t2._resumeAfterSuspend, t2._autoResume());
            }));
          }, 3e4), t2;
        }
      }, _autoResume: function() {
        var t2 = this;
        if (t2.ctx && void 0 !== t2.ctx.resume && a.usingWebAudio) return "running" === t2.state && t2._suspendTimer ? (clearTimeout(t2._suspendTimer), t2._suspendTimer = null) : "suspended" === t2.state ? (t2.ctx.resume
          t2.state = "running";
          for (var e2 = 0; e2 < t2._howls.length; e2++) t2._howls[e2]._emit("resume");
        }), t2._suspendTimer && (clearTimeout(t2._suspendTimer), t2._suspendTimer = null)) : "suspending" === t2.state && (t2._resumeAfterSuspend = true), t2;
      } };
      var a = new i2(), o = function(t2) {
        t2.src && 0 !== t2.src.length ? this.init(t2) : console.error("An array of source files must be passed with any new Howl.");
      };
      o.prototype = { init: function(t2) {
        var e2 = this;
        return a.ctx || f(), e2._autoplay = t2.autoplay || false, e2._format = "string" != typeof t2.format ? t2.format : [t2.format], e2._html5 = t2.html5 || false, e2._muted = t2.mute || false, e2._loop = t2.loop || fa
          e2.play();
        } }), e2._preload && e2.load(), e2;
      }, load: function() {
        var t2 = null;
        if (a.noAudio) this._emit("loaderror", null, "No audio support.");
        else {
          "string" == typeof this._src && (this._src = [this._src]);
          for (var e2 = 0; e2 < this._src.length; e2++) {
            var r3, n2;
            if (this._format && this._format[e2]) r3 = this._format[e2];
            else {
              if ("string" != typeof (n2 = this._src[e2])) {
                this._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                continue;
              }
              (r3 = /^data:audio\/([^;,]+);/i.exec(n2)) || (r3 = /\.([^.]+)$/.exec(n2.split("?", 1)[0])), r3 && (r3 = r3[1].toLowerCase());
            }
            if (r3 || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), r3 && a.codecs(r3)) {
              t2 = this._src[e2];
              break;
            }
```

## audio — js/main.js L351-368 (hit L354)
```js
      }, fade: function(t2, e2, r3, n2) {
        var i3 = this;
        if ("loaded" !== i3._state || i3._playLock) return i3._queue.push({ event: "fade", action: function() {
          i3.fade(t2, e2, r3, n2);
        } }), i3;
        t2 = parseFloat(t2), e2 = parseFloat(e2), r3 = parseFloat(r3), i3.volume(t2, n2);
        for (var o2 = i3._getSoundIds(n2), s2 = 0; s2 < o2.length; s2++) {
          var l2 = i3._soundById(o2[s2]);
          if (l2) {
            if (n2 || i3._stopFade(o2[s2]), i3._webAudio && !l2._muted) {
              var h2 = a.ctx.currentTime, u2 = h2 + r3 / 1e3;
              l2._volume = t2, l2._node.gain.setValueAtTime(t2, h2), l2._node.gain.linearRampToValueAtTime(e2, u2);
            }
            i3._startFadeInterval(l2, t2, e2, r3, o2[s2], void 0 === n2);
          }
        }
        return i3;
      }, _startFadeInterval: function(t2, e2, r3, n2, i3, a2) {
```

## audio — js/main.js L593-606 (hit L595)
```js
        if (a.usingWebAudio) {
          try {
            "undefined" != typeof AudioContext ? a.ctx = new AudioContext() : "undefined" != typeof webkitAudioContext ? a.ctx = new webkitAudioContext() : a.usingWebAudio = false;
          } catch (t3) {
            a.usingWebAudio = false;
          }
          a.ctx || (a.usingWebAudio = false);
          var t2 = /iP(hone|od|ad)/.test(a._navigator && a._navigator.platform), e2 = a._navigator && a._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), r3 = e2 ? parseInt(e2[1], 10) : null;
          if (t2 && r3 && r3 < 9) {
            var n2 = /safari/.test(a._navigator && a._navigator.userAgent.toLowerCase());
            (a._navigator && a._navigator.standalone && !n2 || a._navigator && !a._navigator.standalone && !n2) && (a.usingWebAudio = false);
          }
          a.usingWebAudio && (a.masterGain = void 0 === a.ctx.createGain ? a.ctx.createGainNode() : a.ctx.createGain(), a.masterGain.gain.setValueAtTime(a._muted ? 0 : 1, a.ctx.currentTime), a.masterGain.connect(a.ctx.de
        }
```

## loader — js/main.js L3953-3960 (hit L3957)
```js
      var e = function(t2, e2, r2, n2) {
        var i3, a2, o2, s2, l, h, u = defaultCurveSegments, c = 0, p = [], f = [], d = bezier_length_pool.newElement();
        for (o2 = r2.length, i3 = 0; i3 < u; i3 += 1) {
          for (l = i3 / (u - 1), h = 0, a2 = 0; a2 < o2; a2 += 1) s2 = bm_pow(1 - l, 3) * t2[a2] + 3 * bm_pow(1 - l, 2) * l * r2[a2] + 3 * (1 - l) * bm_pow(l, 2) * n2[a2] + bm_pow(l, 3) * e2[a2], p[a2] = s2, null !== f[a
          h && (c += h = bm_sqrt(h)), d.percents[i3] = l, d.lengths[i3] = c;
        }
        return d.addedLength = c, d;
      };
```

## loader — js/main.js L3981-3989 (hit L3982)
```js
      function o(t2, e2) {
        var r2 = e2.percents, n2 = e2.lengths, i3 = r2.length, a2 = bm_floor((i3 - 1) * t2), o2 = t2 * e2.addedLength, s2 = 0;
        if (a2 === i3 - 1 || 0 === a2 || o2 === n2[a2]) return r2[a2];
        for (var l = n2[a2] > o2 ? -1 : 1, h = true; h; ) if (n2[a2] <= o2 && n2[a2 + 1] > o2 ? (s2 = (o2 - n2[a2]) / (n2[a2 + 1] - n2[a2]), h = false) : a2 += l, a2 < 0 || a2 >= i3 - 1) {
          if (a2 === i3 - 1) return r2[a2];
          h = false;
        }
        return r2[a2] + (r2[a2 + 1] - r2[a2]) * s2;
      }
```

## loader — js/main.js L4775-4831 (hit L4775)
```js
    }, ImagePreloader = (function() {
      var t = (function() {
        var t2 = createTag("canvas");
        t2.width = 1, t2.height = 1;
        var e2 = t2.getContext("2d");
        return e2.fillStyle = "rgba(0,0,0,0)", e2.fillRect(0, 0, 1, 1), t2;
      })();
      function e() {
        this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
      }
      function r(t2, e2, r2) {
        var n2 = "";
        if (t2.e) n2 = t2.p;
        else if (e2) {
          var i2 = t2.p;
          -1 !== i2.indexOf("images/") && (i2 = i2.split("/")[1]), n2 = e2 + i2;
        } else n2 = r2, n2 += t2.u ? t2.u : "", n2 += t2.p;
        return n2;
      }
      function n(t2) {
        this._imageLoaded = e.bind(this), this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = [];
      }
      return n.prototype = { loadAssets: function(t2, e2) {
        this.imagesLoadedCb = e2;
        var r2, n2 = t2.length;
        for (r2 = 0; r2 < n2; r2 += 1) t2[r2].layers || (this.totalImages += 1, this.images.push(this._createImageData(t2[r2])));
      }, setAssetsPath: function(t2) {
        this.assetsPath = t2 || "";
      }, setPath: function(t2) {
        this.path = t2 || "";
      }, loaded: function() {
        return this.totalImages === this.loadedAssets;
      }, destroy: function() {
        this.imagesLoadedCb = null, this.images.length = 0;
      }, getImage: function(t2) {
        for (var e2 = 0, r2 = this.images.length; e2 < r2; ) {
          if (this.images[e2].assetData === t2) return this.images[e2].img;
          e2 += 1;
        }
      }, createImgData: function(e2) {
        var n2 = r(e2, this.assetsPath, this.path), i2 = createTag("img");
        i2.crossOrigin = "anonymous", i2.addEventListener("load", this._imageLoaded, false), i2.addEventListener("error", function() {
          a.img = t, this._imageLoaded();
        }.bind(this), false), i2.src = n2;
        var a = { img: i2, assetData: e2 };
        return a;
      }, createImageData: function(e2) {
        var n2 = r(e2, this.assetsPath, this.path), i2 = createNS("image");
        i2.addEventListener("load", this._imageLoaded, false), i2.addEventListener("error", function() {
          a.img = t, this._imageLoaded();
        }.bind(this), false), i2.setAttributeNS("http://www.w3.org/1999/xlink", "href", n2);
        var a = { img: i2, assetData: e2 };
        return a;
      }, imageLoaded: e, setCacheType: function(t2) {
        this._createImageData = "svg" === t2 ? this.createImageData.bind(this) : this.createImgData.bind(this);
      } }, n;
    })(), featureSupport = (function() {
```

## keyboard — js/main.js L8597-8608 (hit L8598)
```js
    switch (t2) {
      case "keyup":
        return -1 !== mt.indexOf(e2.keyCode);
      case "keydown":
        return 229 !== e2.keyCode;
      case "keypress":
      case "mousedown":
      case "blur":
        return true;
      default:
        return false;
    }
```

## keyboard — js/main.js L8614-8659 (hit L8630)
```js
  var St = { eventTypes: At, extractEvents: function(t2, e2, r2, n2) {
    var i3 = void 0, a2 = void 0;
    if (yt) t: {
      switch (t2) {
        case "compositionstart":
          i3 = At.compositionStart;
          break t;
        case "compositionend":
          i3 = At.compositionEnd;
          break t;
        case "compositionupdate":
          i3 = At.compositionUpdate;
          break t;
      }
      i3 = void 0;
    }
    else Tt ? wt(t2, r2) && (i3 = At.compositionEnd) : "keydown" === t2 && 229 === r2.keyCode && (i3 = At.compositionStart);
    return i3 ? (bt && "ko" !== r2.locale && (Tt || i3 !== At.compositionStart ? i3 === At.compositionEnd && Tt && (a2 = ot()) : (it = "value" in (nt = n2) ? nt.value : nt.textContent, Tt = true)), i3 = ft.getPooled(i3, 
      switch (t3) {
        case "compositionend":
          return Et(e3);
        case "keypress":
          return 32 !== e3.which ? null : (xt = true, _t);
        case "textInput":
          return (t3 = e3.data) === _t && xt ? null : t3;
        default:
          return null;
      }
    })(t2, r2) : (function(t3, e3) {
      if (Tt) return "compositionend" === t3 || !yt && wt(t3, e3) ? (t3 = ot(), at = it = nt = null, Tt = false, t3) : null;
      switch (t3) {
        case "paste":
          return null;
        case "keypress":
          if (!(e3.ctrlKey || e3.altKey || e3.metaKey) || e3.ctrlKey && e3.altKey) {
            if (e3.char && 1 < e3.char.length) return e3.char;
            if (e3.which) return String.fromCharCode(e3.which);
          }
          return null;
        case "compositionend":
          return bt && "ko" !== e3.locale ? null : e3.data;
        default:
          return null;
      }
    })(t2, r2)) ? ((e2 = dt.getPooled(At.beforeInput, e2, r2, n2)).data = t2, W(e2)) : e2 = null, null === a2 ? e2 : null === e2 ? a2 : [a2, e2];
  } }, Ct = null, kt = null, Pt = null;
```

## keyboard — js/main.js L8925-8965 (hit L8940)
```js
  function Ne(t2) {
    if ("value" === t2.propertyName && Oe(Ie)) if (t2 = Pe(Ie, t2, Vt(t2)), Nt) M(t2);
    else {
      Nt = true;
      try {
        Ot(De, t2);
      } finally {
        Nt = false, Lt();
      }
    }
  }
  function Le(t2, e2, r2) {
    "focus" === t2 ? (Be(), Ie = r2, (Me = e2).attachEvent("onpropertychange", Ne)) : "blur" === t2 && Be();
  }
  function Ue(t2) {
    if ("selectionchange" === t2 || "keyup" === t2 || "keydown" === t2) return Oe(Ie);
  }
  function je(t2, e2) {
    if ("click" === t2) return Oe(e2);
  }
  function Ve(t2, e2) {
    if ("input" === t2 || "change" === t2) return Oe(e2);
  }
  Y && (Fe = Gt("input") && (!document.documentMode || 9 < document.documentMode));
  var Ge = { eventTypes: ke, _isInputEventSupported: Fe, extractEvents: function(t2, e2, r2, n2) {
    var i3 = e2 ? L(e2) : window, a2 = void 0, o2 = void 0, s2 = i3.nodeName && i3.nodeName.toLowerCase();
    if ("select" === s2 || "input" === s2 && "file" === i3.type ? a2 = Re : jt(i3) ? Fe ? a2 = Ve : (a2 = Ue, o2 = Le) : (s2 = i3.nodeName) && "input" === s2.toLowerCase() && ("checkbox" === i3.type || "radio" === i3.typ
    o2 && o2(t2, i3, e2), "blur" === t2 && (t2 = i3._wrapperState) && t2.controlled && "number" === i3.type && Ce(i3, "number", i3.value);
  } }, ze = ht.extend({ view: null, detail: null }), He = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function We(t2) {
    var e2 = this.nativeEvent;
    return e2.getModifierState ? e2.getModifierState(t2) : !!(t2 = He[t2]) && !!e2[t2];
  }
  function Ye() {
    return We;
  }
  var Xe = 0, qe = 0, Qe = false, Ze = false, Ke = ze.extend({ screenX: null, screenY: null, clientX: null, clientY: null, pageX: null, pageY: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, getModifier
    return t2.relatedTarget || (t2.fromElement === t2.srcElement ? t2.toElement : t2.fromElement);
  }, movementX: function(t2) {
    if ("movementX" in t2) return t2.movementX;
    var e2 = Xe;
```

## wheel-step — js/main.js L9103-9143 (hit L9118)
```js
  }
  for (var pr = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrint
    if (t2.key) {
      var e2 = pr[t2.key] || t2.key;
      if ("Unidentified" !== e2) return e2;
    }
    return "keypress" === t2.type ? 13 === (t2 = cr(t2)) ? "Enter" : String.fromCharCode(t2) : "keydown" === t2.type || "keyup" === t2.type ? fr[t2.keyCode] || "Unidentified" : "";
  }, location: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, repeat: null, locale: null, getModifierState: Ye, charCode: function(t2) {
    return "keypress" === t2.type ? cr(t2) : 0;
  }, keyCode: function(t2) {
    return "keydown" === t2.type || "keyup" === t2.type ? t2.keyCode : 0;
  }, which: function(t2) {
    return "keypress" === t2.type ? cr(t2) : "keydown" === t2.type || "keyup" === t2.type ? t2.keyCode : 0;
  } }), mr = Ke.extend({ dataTransfer: null }), yr = ze.extend({ touches: null, targetTouches: null, changedTouches: null, altKey: null, metaKey: null, ctrlKey: null, shiftKey: null, getModifierState: Ye }), gr = ht.exte
    return "deltaX" in t2 ? t2.deltaX : "wheelDeltaX" in t2 ? -t2.wheelDeltaX : 0;
  }, deltaY: function(t2) {
    return "deltaY" in t2 ? t2.deltaY : "wheelDeltaY" in t2 ? -t2.wheelDeltaY : "wheelDelta" in t2 ? -t2.wheelDelta : 0;
  }, deltaZ: null, deltaMode: null }), br = [["blur", "blur", 0], ["cancel", "cancel", 0], ["click", "click", 0], ["close", "close", 0], ["contextmenu", "contextMenu", 0], ["copy", "copy", 0], ["cut", "cut", 0], ["auxcli
    var wr = br[xr], Er = wr[0], Tr = wr[1], Sr = wr[2], Cr = "on" + (Tr[0].toUpperCase() + Tr.slice(1)), kr = { phasedRegistrationNames: { bubbled: Cr, captured: Cr + "Capture" }, dependencies: [Er], eventPriority: Sr }
    _r[Tr] = kr, Ar[Er] = kr;
  }
  var Pr = { eventTypes: _r, getEventPriority: function(t2) {
    return void 0 !== (t2 = Ar[t2]) ? t2.eventPriority : 2;
  }, extractEvents: function(t2, e2, r2, n2) {
    var i3 = Ar[t2];
    if (!i3) return null;
    switch (t2) {
      case "keypress":
        if (0 === cr(r2)) return null;
      case "keydown":
      case "keyup":
        t2 = dr;
        break;
      case "blur":
      case "focus":
        t2 = ur;
        break;
      case "click":
        if (2 === r2.button) return null;
      case "auxclick":
      case "dblclick":
```

## wheel-step — js/main.js L9164-9204 (hit L9179)
```js
      case "touchmove":
      case "touchstart":
        t2 = yr;
        break;
      case $:
      case J:
      case tt:
        t2 = lr;
        break;
      case et:
        t2 = gr;
        break;
      case "scroll":
        t2 = ze;
        break;
      case "wheel":
        t2 = vr;
        break;
      case "copy":
      case "cut":
      case "paste":
        t2 = hr;
        break;
      case "gotpointercapture":
      case "lostpointercapture":
      case "pointercancel":
      case "pointerdown":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "pointerup":
        t2 = $e;
        break;
      default:
        t2 = ht;
    }
    return W(e2 = t2.getPooled(i3, e2, r2, n2)), e2;
  } }, Mr = Pr.getEventPriority, Ir = [];
  function Dr(t2) {
    var e2 = t2.targetInst, r2 = e2;
    do {
```

## raf-lerp — js/main.js L13593-13605 (hit L13598)
```js
      function D(t3) {
        var e2, r2, n2, i3, a2, o2, s2, p2, f2, g2, v2, b2, _2, A2, T2, S2 = [];
        for (b2 = (t3 = C(t3)).length, e2 = m, r2 = 0, a2 = d, o2 = 0; o2 < b2; ++o2) (v2 = t3[o2]) < 128 && S2.push(w(v2));
        for (n2 = i3 = S2.length, i3 && S2.push(y); n2 < b2; ) {
          for (s2 = l, o2 = 0; o2 < b2; ++o2) (v2 = t3[o2]) >= e2 && v2 < s2 && (s2 = v2);
          for (s2 - e2 > x((l - r2) / (_2 = n2 + 1)) && E("overflow"), r2 += (s2 - e2) * _2, e2 = s2, o2 = 0; o2 < b2; ++o2) if ((v2 = t3[o2]) < e2 && ++r2 > l && E("overflow"), v2 == e2) {
            for (p2 = r2, f2 = h; !(p2 < (g2 = f2 <= a2 ? u : f2 >= a2 + c ? c : f2 - a2)); f2 += h) T2 = p2 - g2, A2 = h - g2, S2.push(w(P(g2 + T2 % A2, 0))), p2 = x(T2 / A2);
            S2.push(w(P(p2, 0))), a2 = M(r2, _2, n2 == i3), r2 = 0, ++n2;
          }
          ++r2, ++e2;
        }
        return S2.join("");
      }
```

## pointer — js/main.js L15275-15315 (hit L15290)
```js
  ja.prototype.containerUpdateTransform = ja.prototype.updateTransform;
  La.mixin({ accessible: false, accessibleTitle: null, accessibleHint: null, tabIndex: 0, _accessibleActive: false, _accessibleDiv: false, accessibleType: "button", accessiblePointerEvents: "auto", accessibleChildren: tr
  var Va, Ga = function(t2) {
    this._hookDiv = null, (Ei.tablet || Ei.phone) && this.createTouchHook();
    var e2 = document.createElement("div");
    e2.style.width = "100px", e2.style.height = "100px", e2.style.position = "absolute", e2.style.top = "0px", e2.style.left = "0px", e2.style.zIndex = 2, this.div = e2, this.pool = [], this.renderId = 0, this.debug = fa
  };
  Ga.prototype.createTouchHook = function() {
    var t2 = this, e2 = document.createElement("button");
    e2.style.width = "1px", e2.style.height = "1px", e2.style.position = "absolute", e2.style.top = "-1000px", e2.style.left = "-1000px", e2.style.zIndex = 2, e2.style.backgroundColor = "#FF0000", e2.title = "HOOK DIV", 
      t2.isMobileAccessibility = true, t2.activate(), t2.destroyTouchHook();
    }), document.body.appendChild(e2), this._hookDiv = e2;
  }, Ga.prototype.destroyTouchHook = function() {
    this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
  }, Ga.prototype.activate = function() {
    this.isActive || (this.isActive = true, window.document.addEventListener("mousemove", this._onMouseMove, true), window.removeEventListener("keydown", this._onKeyDown, false), this.renderer.on("postrender", this.updat
  }, Ga.prototype.deactivate = function() {
    this.isActive && !this.isMobileAccessibility && (this.isActive = false, window.document.removeEventListener("mousemove", this._onMouseMove, true), window.addEventListener("keydown", this._onKeyDown, false), this.rend
  }, Ga.prototype.updateAccessibleObjects = function(t2) {
    if (t2.visible && t2.accessibleChildren) {
      t2.accessible && t2.interactive && (t2._accessibleActive || this.addChild(t2), t2.renderId = this.renderId);
      for (var e2 = t2.children, r2 = 0; r2 < e2.length; r2++) this.updateAccessibleObjects(e2[r2]);
    }
  }, Ga.prototype.update = function() {
    if (this.renderer.renderingToScreen) {
      this.updateAccessibleObjects(this.renderer._lastObjectRendered);
      var t2 = this.renderer.view.getBoundingClientRect(), e2 = t2.width / this.renderer.width, r2 = t2.height / this.renderer.height, n2 = this.div;
      n2.style.left = t2.left + "px", n2.style.top = t2.top + "px", n2.style.width = this.renderer.width + "px", n2.style.height = this.renderer.height + "px";
      for (var i3 = 0; i3 < this.children.length; i3++) {
        var a2 = this.children[i3];
        if (a2.renderId !== this.renderId) a2._accessibleActive = false, ia(this.children, i3, 1), this.div.removeChild(a2._accessibleDiv), this.pool.push(a2._accessibleDiv), a2._accessibleDiv = null, i3--, 0 === this.ch
        else {
          n2 = a2._accessibleDiv;
          var o2 = a2.hitArea, s2 = a2.worldTransform;
          a2.hitArea ? (n2.style.left = (s2.tx + o2.x * s2.a) * e2 + "px", n2.style.top = (s2.ty + o2.y * s2.d) * r2 + "px", n2.style.width = o2.width * s2.a * e2 + "px", n2.style.height = o2.height * s2.d * r2 + "px") :
        }
      }
      this.renderId++;
    }
  }, Ga.prototype.updateDebugHTML = function(t2) {
    t2.innerHTML = "type: " + t2.type + "</br> title : " + t2.title + "</br> tabIndex: " + t2.tabIndex;
```

## shader-uniforms — js/main.js L16870-16910 (hit L16885)
```js
    return hs[t2];
  }
  var cs = null, ps = { FLOAT: "float", FLOAT_VEC2: "vec2", FLOAT_VEC3: "vec3", FLOAT_VEC4: "vec4", INT: "int", INT_VEC2: "ivec2", INT_VEC3: "ivec3", INT_VEC4: "ivec4", BOOL: "bool", BOOL_VEC2: "bvec2", BOOL_VEC3: "bvec3
  function fs(t2, e2) {
    if (!cs) {
      var r2 = Object.keys(ps);
      cs = {};
      for (var n2 = 0; n2 < r2.length; ++n2) {
        var i3 = r2[n2];
        cs[t2[i3]] = ps[i3];
      }
    }
    return cs[e2];
  }
  var ds = { float: "\n    if(cv !== v)\n    {\n        cv.v = v;\n        gl.uniform1f(location, v)\n    }", vec2: "\n    if(cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n      
  var ys, gs = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n");
  function vs(t2) {
    for (var e2 = "", r2 = 0; r2 < t2; ++r2) r2 > 0 && (e2 += "\nelse "), r2 < t2 - 1 && (e2 += "if(test == " + r2 + ".0){}");
    return e2;
  }
  var bs = 0, _s = {}, As = function t2(e2, r2, n2) {
    void 0 === n2 && (n2 = "pixi-shader"), this.id = bs++, this.vertexSrc = e2 || t2.defaultVertexSrc, this.fragmentSrc = r2 || t2.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragm
      if (!is) {
        is = Ni.MEDIUM;
        var t3 = ss();
        if (t3 && t3.getShaderPrecisionFormat) {
          var e3 = t3.getShaderPrecisionFormat(t3.FRAGMENT_SHADER, t3.HIGH_FLOAT);
          is = e3.precision ? Ni.HIGH : Ni.MEDIUM;
        }
      }
      return is;
    })())), this.extractData(this.vertexSrc, this.fragmentSrc), this.glPrograms = {}, this.syncUniforms = null;
  }, xs = { defaultVertexSrc: { configurable: true }, defaultFragmentSrc: { configurable: true } };
  As.prototype.extractData = function(t2, e2) {
    var r2 = ss();
    if (r2) {
      var n2 = ts(r2, t2, e2);
      this.attributeData = this.getAttributeData(n2, r2), this.uniformData = this.getUniformData(n2, r2), r2.deleteProgram(n2);
    } else this.uniformData = {}, this.attributeData = {};
  }, As.prototype.getAttributeData = function(t2, e2) {
    for (var r2 = {}, n2 = [], i3 = e2.getProgramParameter(t2, e2.ACTIVE_ATTRIBUTES), a2 = 0; a2 < i3; a2++) {
```

## shader-uniforms — js/main.js L16913-16953 (hit L16928)
```js
    }
    n2.sort(function(t3, e3) {
      return t3.name > e3.name ? 1 : -1;
    });
    for (var h2 = 0; h2 < n2.length; h2++) n2[h2].location = h2;
    return r2;
  }, As.prototype.getUniformData = function(t2, e2) {
    for (var r2 = {}, n2 = e2.getProgramParameter(t2, e2.ACTIVE_UNIFORMS), i3 = 0; i3 < n2; i3++) {
      var a2 = e2.getActiveUniform(t2, i3), o2 = a2.name.replace(/\[.*?\]/, ""), s2 = a2.name.match(/\[.*?\]/, ""), l2 = fs(e2, a2.type);
      r2[o2] = { type: l2, size: a2.size, isArray: s2, value: rs(l2, a2.size) };
    }
    return r2;
  }, xs.defaultVertexSrc.get = function() {
    return "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosit
  }, xs.defaultFragmentSrc.get = function() {
    return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}";
  }, As.from = function(t2, e2, r2) {
    var n2 = t2 + e2, i3 = ua[n2];
    return i3 || (ua[n2] = i3 = new As(t2, e2, r2)), i3;
  }, Object.defineProperties(As, xs);
  var ws = function(t2, e2) {
    for (var r2 in this.program = t2, this.uniformGroup = e2 ? e2 instanceof Go ? e2 : new Go(e2) : new Go({}), t2.uniformData) this.uniformGroup.uniforms[r2] instanceof Array && (this.uniformGroup.uniforms[r2] = new Flo
  }, Es = { uniforms: { configurable: true } };
  ws.prototype.checkUniformExists = function(t2, e2) {
    if (e2.uniforms[t2]) return true;
    for (var r2 in e2.uniforms) {
      var n2 = e2.uniforms[r2];
      if (n2.group && this.checkUniformExists(t2, n2)) return true;
    }
    return false;
  }, ws.prototype.destroy = function() {
    this.uniformGroup = null;
  }, Es.uniforms.get = function() {
    return this.uniformGroup.uniforms;
  }, ws.from = function(t2, e2, r2) {
    var n2 = As.from(t2, e2);
    return new ws(n2, r2);
  }, Object.defineProperties(ws.prototype, Es);
  var Ts = function() {
    this.data = 0, this.blendMode = Ci.NORMAL, this.polygonOffset = 0, this.blend = true;
  }, Ss = { blend: { configurable: true }, offsets: { configurable: true }, culling: { configurable: true }, depthTest: { configurable: true }, clockwiseFrontFace: { configurable: true }, blendMode: { configurable: true 
```

## shader-uniforms — js/main.js L16986-17004 (hit L17002)
```js
  var Cs = (function(t2) {
    function e2(r3, n3, i3) {
      var a2 = As.from(r3 || e2.defaultVertexSrc, n3 || e2.defaultFragmentSrc);
      t2.call(this, a2, i3), this.padding = 0, this.resolution = Ui.FILTER_RESOLUTION, this.enabled = true, this.autoFit = true, this.legacy = !!this.program.attributeData.aTextureCoord, this.state = new Ts();
    }
    t2 && (e2.__proto__ = t2), e2.prototype = Object.create(t2 && t2.prototype), e2.prototype.constructor = e2;
    var r2 = { blendMode: { configurable: true } }, n2 = { defaultVertexSrc: { configurable: true }, defaultFragmentSrc: { configurable: true } };
    return e2.prototype.apply = function(t3, e3, r3, n3, i3) {
      t3.applyFilter(this, e3, r3, n3, i3);
    }, r2.blendMode.get = function() {
      return this.state.blendMode;
    }, r2.blendMode.set = function(t3) {
      this.state.blendMode = t3;
    }, n2.defaultVertexSrc.get = function() {
      return "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 posit
    }, n2.defaultFragmentSrc.get = function() {
      return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n";
    }, Object.defineProperties(e2.prototype, r2), Object.defineProperties(e2, n2), e2;
  })(ws);
```