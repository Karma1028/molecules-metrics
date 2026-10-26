# yauch — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, keyboard×3, page-transition×3, reveal-timeline×3, raf-lerp×1, pointer×2, audio×2, wheel-step×3, text-split×1

## loader — app/bundle.js L395-398 (hit L397)
```js
}), define("lib/gaia/flow/Flow", ["require", "exports"], function(t, e2) {
  var n, i2;
  Object.defineProperty(e2, "__esModule", { value: true }), (i2 = n = n || {})[i2.NORMAL = "normal"] = "NORMAL", i2[i2.CROSS = "cross"] = "CROSS", i2[i2.PRELOAD = "preload"] = "PRELOAD", e2.default = n;
}), (function(_e) {
```

## keyboard — app/bundle.js L400-440 (hit L415)
```js
  ff = function(t) {
    var i2, A = void 0 !== t ? t : {};
    function n() {
      return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
    }
    A.exportSymbol = function(t2, e3) {
      for (var n2 = t2.split("."), i3 = A, r2 = 0; r2 < n2.length - 1; r2++) i3 = i3[n2[r2]];
      i3[n2[n2.length - 1]] = e3;
    }, A.exportProperty = function(t2, e3, n2) {
      t2[e3] = n2;
    }, A.version = "3.0.0", A.exportSymbol("version", A.version), A.utils = (function() {
      function h2(t3, e3) {
        for (var n2 in t3) t3.hasOwnProperty(n2) && e3(n2, t3[n2]);
      }
      var t2 = {}, o2 = {};
      t2[cf && /Firefox\/2/i.test(cf.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"], t2.MouseEvents = ["click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mo
        if (e3.length) for (var n2 = 0, i3 = e3.length; n2 < i3; n2++) o2[e3[n2]] = t3;
      });
      var s3 = { propertychange: true }, l2 = bf && (function() {
        for (var t3 = 3, e3 = bf.createElement("div"), n2 = e3.getElementsByTagName("i"); e3.innerHTML = "<!--[if gt IE " + ++t3 + "]><i></i><![endif]-->", n2[0]; ) ;
        return 4 < t3 ? t3 : _e;
      })();
      function c2(t3, e3) {
        if ("input" !== A.utils.tagNameLower(t3) || !t3.type) return false;
        if ("click" != e3.toLowerCase()) return false;
        var n2 = t3.type;
        return "checkbox" == n2 || "radio" == n2;
      }
      return { fieldsIncludedWithJsonPost: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/], arrayForEach: function(t3, e3) {
        for (var n2 = 0, i3 = t3.length; n2 < i3; n2++) e3(t3[n2]);
      }, arrayIndexOf: function(t3, e3) {
        if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(t3, e3);
        for (var n2 = 0, i3 = t3.length; n2 < i3; n2++) if (t3[n2] === e3) return n2;
        return -1;
      }, arrayFirst: function(t3, e3, n2) {
        for (var i3 = 0, r2 = t3.length; i3 < r2; i3++) if (e3.call(n2, t3[i3])) return t3[i3];
        return null;
      }, arrayRemoveItem: function(t3, e3) {
        var n2 = A.utils.arrayIndexOf(t3, e3);
        0 <= n2 && t3.splice(n2, 1);
      }, arrayGetDistinctValues: function(t3) {
```

## loader — app/bundle.js L2598-2609 (hit L2608)
```js
define("lib/gaia/event/AssetEvent", ["require", "exports", "../../temple/event/AbstractEvent"], function(t, e2, n) {
  Object.defineProperty(e2, "__esModule", { value: true });
  var s2, i2 = (s2 = n.default, __extends(r, s2), r.prototype.clone = function() {
    return new r(this.type, this.asset, this.loaded, this.total, this.perc, this.bytes);
  }, r);
  function r(t2, e3, n2, i3, r2, o) {
    void 0 === e3 && (e3 = null), void 0 === n2 && (n2 = 0), void 0 === i3 && (i3 = 0), void 0 === r2 && (r2 = 0), void 0 === o && (o = false);
    var a = s2.call(this, t2) || this;
    return a.asset = e3, a.loaded = n2, a.total = i3, a.perc = r2, a.bytes = o, a;
  }
  i2.ASSET_COMPLETE = "AssetEvent.ASSET_COMPLETE", i2.ASSET_PROGRESS = "AssetEvent.ASSET_PROGRESS", i2.ASSET_ERROR = "AssetEvent.ASSET_ERROR", e2.default = i2;
});
```

## loader — app/bundle.js L2635-2649 (hit L2635)
```js
  }, d.prototype.preload = function() {
    var a2 = this;
    this.active = true;
    var t2 = [this.viewModelName, this.controllerName];
    l.templates.hasOwnProperty(this.id) || document.getElementById(this.id) || t2.push("text!" + this.template);
    for (var s3 = [], e3 = this.partials[isMobile ? "mobile" : "app"] || [], n2 = 0; n2 < e3.length; n2++) {
      var i3 = e3[n2], r2 = i3.split("/").pop().split(".").shift();
      l.templates[r2] || document.getElementById(r2) || (t2.push("text!" + ("mobile" == this._node.template && isMobile ? d.templateMobilePath : d.templatePath) + i3), s3.push(r2));
    }
    o(t2, function(t3, e4, n3) {
      for (var i4 = [], r3 = 3; r3 < arguments.length; r3++) i4[r3 - 3] = arguments[r3];
      for (var o2 = 0; o2 < i4.length; o2++) l.templates[s3[o2]] = i4[o2];
      a2._controller = new e4.default(), a2.onComplete(), n3 && a2._controller.setTemplate(n3), a2._controller.setViewModel(new t3.default()), a2.dispatchEvent(new c.default(c.default.ASSET_COMPLETE, a2));
    });
  }, d.prototype.initPage = function() {
```

## page-transition — app/bundle.js L3778-3787 (hit L3780)
```js
    this._localValue = "", this.bindPopstateListener = function(t3) {
      var e3 = function() {
        window.addEventListener("popstate", function() {
          n2.notifyHistory(n2.getRoute());
        });
      };
      t3 ? (window.removeEventListener("load", n2.bindPopstateListener), setTimeout(function() {
        e3(), e3 = null;
      }, 0)) : (e3(), e3 = null);
    }, this._gaiaHistory = t2, this._config = new i2.default(), this._group = new r.default(this._config);
```

## keyboard — app/bundle.js L8632-8660 (hit L8638)
```js
}), define("app/config/knockout", ["knockout", "vendor/knockout-punches/knockout.punches", "lib/knockout/knockout.gaia", "lib/knockout/knockout.icon", "lib/knockout/stringTemplateEngine", "lib/knockout/knockout.component
  n.default.getIcons(), o.punches.interpolationMarkup.enable(), o.punches.attributeInterpolationMarkup.enable(), o.punches.textFilter.enableForBinding("text"), o.punches.textFilter.enableForBinding("foreach"), o.filters.
    return o.unwrap(t2).filter(function(t3) {
      return -1 != o.unwrap(t3).indexOf(o.unwrap(e3));
    });
  }, o.bindingHandlers.live = { preprocess: function(t2, e3, n2) {
    n2("value", t2), n2("valueUpdate", "['afterkeydown', 'keyup', 'input']");
  } }, o.bindingHandlers.allowBindings = { isBound: false, init: function(t2, e3) {
    var n2 = o.utils.unwrapObservable(e3());
    return { controlsDescendantBindings: !(this.isBound = n2) };
  }, update: function(t2, e3, n2, i3, r) {
    o.utils.unwrapObservable(e3()) && !this.isBound && (this.isBound = true, o.applyBindingsToDescendants(r, t2));
  } }, o.virtualElements.allowedBindings.allowBindings = true, o.punches.utils.setNodePreprocessor(function(t2) {
    if (1 === t2.nodeType) {
      var e3 = t2.tagName.toLowerCase();
      if ("x-" == e3.substr(0, 2)) {
        var n2 = e3.substr(2), i3 = $(t2).attr("data");
        if ($("#" + n2)[0]) {
          var r = $("<div/>");
          r.attr("data-bind", "template: {name: '" + n2 + "'" + (i3 ? ", data: " + i3 : "") + "}"), $(t2).replaceWith(r);
        }
      }
    }
  });
  var i2 = o.punches.interpolationMarkup.wrapExpresssion;
  o.punches.interpolationMarkup.wrapExpresssion = function(t2) {
    return /^lt:[\w\.]+/.test(t2) ? (t2 = t2.replace(/^lt:/, ""), [document.createComment("ko localizedText: '" + t2 + "'"), document.createComment("/ko")]) : i2(t2);
  };
}), (function(t, e2) {
```

## reveal-timeline — app/bundle.js L11327-11330 (hit L11329)
```js
    }, n.fromTo = function(t2, e3, n2, i2, r) {
      var o2 = i2.repeat && a.TweenMax || d;
      return e3 ? this.add(o2.fromTo(t2, e3, n2, i2), r) : this.set(t2, i2, r);
    }, n.staggerTo = function(t2, e3, n2, i2, r, o2, a2, s2) {
```

## reveal-timeline — app/bundle.js L11330-11334 (hit L11334)
```js
    }, n.staggerTo = function(t2, e3, n2, i2, r, o2, a2, s2) {
      var l, c, u2 = new h({ onComplete: o2, onCompleteParams: a2, callbackScope: s2, smoothChildTiming: this.smoothChildTiming }), p2 = n2.cycle;
      for ("string" == typeof t2 && (t2 = d.selector(t2) || t2), g(t2 = t2 || []) && (t2 = _(t2)), (i2 = i2 || 0) < 0 && ((t2 = _(t2)).reverse(), i2 *= -1), c = 0; c < t2.length; c++) (l = f2(n2)).startAt && (l.startAt =
      return this.add(u2, r);
    }, n.staggerFrom = function(t2, e3, n2, i2, r, o2, a2, s2) {
```

## reveal-timeline — app/bundle.js L11321-11361 (hit L11336)
```js
    }, n = h.prototype = new p();
    return h.version = "1.19.1", n.constructor = h, n.kill()._gc = n._forcingPlayhead = n._hasPause = false, n.to = function(t2, e3, n2, i2) {
      var r = n2.repeat && a.TweenMax || d;
      return e3 ? this.add(new r(t2, e3, n2), i2) : this.set(t2, n2, i2);
    }, n.from = function(t2, e3, n2, i2) {
      return this.add((n2.repeat && a.TweenMax || d).from(t2, e3, n2), i2);
    }, n.fromTo = function(t2, e3, n2, i2, r) {
      var o2 = i2.repeat && a.TweenMax || d;
      return e3 ? this.add(o2.fromTo(t2, e3, n2, i2), r) : this.set(t2, i2, r);
    }, n.staggerTo = function(t2, e3, n2, i2, r, o2, a2, s2) {
      var l, c, u2 = new h({ onComplete: o2, onCompleteParams: a2, callbackScope: s2, smoothChildTiming: this.smoothChildTiming }), p2 = n2.cycle;
      for ("string" == typeof t2 && (t2 = d.selector(t2) || t2), g(t2 = t2 || []) && (t2 = _(t2)), (i2 = i2 || 0) < 0 && ((t2 = _(t2)).reverse(), i2 *= -1), c = 0; c < t2.length; c++) (l = f2(n2)).startAt && (l.startAt =
      return this.add(u2, r);
    }, n.staggerFrom = function(t2, e3, n2, i2, r, o2, a2, s2) {
      return n2.immediateRender = 0 != n2.immediateRender, n2.runBackwards = true, this.staggerTo(t2, e3, n2, i2, r, o2, a2, s2);
    }, n.staggerFromTo = function(t2, e3, n2, i2, r, o2, a2, s2, l) {
      return i2.startAt = n2, i2.immediateRender = 0 != i2.immediateRender && 0 != n2.immediateRender, this.staggerTo(t2, e3, i2, r, o2, a2, s2, l);
    }, n.call = function(t2, e3, n2, i2) {
      return this.add(d.delayedCall(0, t2, e3, n2), i2);
    }, n.set = function(t2, e3, n2) {
      return n2 = this._parseTimeOrLabel(n2, 0, true), null == e3.immediateRender && (e3.immediateRender = n2 === this._time && !this._paused), this.add(new d(t2, 0, e3), n2);
    }, h.exportRoot = function(t2, e3) {
      null == (t2 = t2 || {}).smoothChildTiming && (t2.smoothChildTiming = true);
      var n2, i2, r = new h(t2), o2 = r._timeline;
      for (null == e3 && (e3 = true), o2._remove(r, true), r._startTime = 0, r._rawPrevTime = r._time = r._totalTime = o2._time, n2 = o2._first; n2; ) i2 = n2._next, e3 && n2 instanceof d && n2.target === n2.vars.onCompl
      return o2.add(r, 0), r;
    }, n.add = function(t2, e3, n2, i2) {
      var r, o2, a2, s2, l, c;
      if ("number" != typeof e3 && (e3 = this._parseTimeOrLabel(e3, 0, true, t2)), !(t2 instanceof u)) {
        if (t2 instanceof Array || t2 && t2.push && v2(t2)) {
          for (n2 = n2 || "normal", i2 = i2 || 0, r = e3, o2 = t2.length, a2 = 0; a2 < o2; a2++) v2(s2 = t2[a2]) && (s2 = new h({ tweens: s2 })), this.add(s2, r), "string" != typeof s2 && "function" != typeof s2 && ("seq
          return this._uncache(true);
        }
        if ("string" == typeof t2) return this.addLabel(t2, e3);
        if ("function" != typeof t2) throw "Cannot add " + t2 + " into the timeline; it is not a tween, timeline, function, or string.";
        t2 = d.delayedCall(0, t2);
      }
      if (p.prototype.add.call(this, t2, e3), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (c = (l = this).rawTime() > t2._startTime; l._timeline; ) c && l._timeli
      return this;
    }, n.remove = function(t2) {
      if (t2 instanceof u) {
```

## raf-lerp — app/bundle.js L13592-13602 (hit L13596)
```js
    function c(t2, e2, n2, i3, r) {
      var o, a2, s2, l, c2 = e2.length, u = 0, p = d;
      if ("object" == typeof t2) {
        for (; -1 < --c2; ) {
          for (s2 in o = e2[c2], a2 = 0, t2) a2 += (l = o[s2] - t2[s2]) * l;
          a2 < p && (u = c2, p = a2);
        }
        if ((r || d) < d && r < Math.sqrt(p)) return t2;
      } else for (; -1 < --c2; ) (a2 = (o = e2[c2]) - t2) < 0 && (a2 = -a2), a2 < p && i3 <= o && o <= n2 && (u = c2, p = a2);
      return e2[u];
    }
```

## pointer — app/bundle.js L13934-13990 (hit L13942)
```js
function pano2vrGyro(t, e2) {
  function n(t2) {
    isTouching = true;
  }
  function i2(t2) {
    isTouching = false;
  }
  this.enable = function() {
    return o && !m && (window.addEventListener("deviceorientation", r, true), a.addEventListener("touchstart", n, true), a.addEventListener("touchend", i2, true), a.addEventListener("touchcancel", i2, true), a.addEventLi
  }, this.disable = function() {
    return o && m && (window.removeEventListener("deviceorientation", r), a.removeEventListener("touchstart", n), a.removeEventListener("touchend", i2), a.removeEventListener("touchcancel", i2), m = false), m;
  }, this.toggle = function() {
    return m ? this.disable() : this.enable();
  }, this.setAdaptiveVOffset = function(t2) {
    _ = null == t2 || null === t2 || "" == t2 ? !_ : Boolean(t2);
  }, this.setTrueNorth = function(t2) {
    g = null == t2 || null === t2 || "" == t2 ? !g : Boolean(t2);
  };
  var u = 0, p = 0, d = 0, h = 10;
  function r(t2) {
    if (t2.alpha && t2.beta && t2.gamma) {
      var e3 = /* @__PURE__ */ new Date(), n2 = f2.isTouching();
      if (n2 && (d = e3.getTime()), !n2 && m && 1e3 < e3.getTime() - d) {
        var i3, r2 = (function(t3) {
          var e4, n3, i4, r3 = Math.cos(t3.yaw), o3 = Math.sin(t3.yaw), a3 = Math.cos(t3.pitch), s3 = Math.sin(t3.pitch), l2 = Math.cos(t3.roll), c2 = Math.sin(t3.roll);
          matrix = new Array(o3 * c2 - r3 * s3 * l2, -r3 * a3, r3 * s3 * c2 + o3 * l2, a3 * l2, -s3, -a3 * c2, o3 * s3 * l2 + r3 * c2, o3 * a3, -o3 * s3 * c2 + r3 * l2), 0.9999 < matrix[3] ? (e4 = Math.atan2(matrix[2], m
          return new Object({ yaw: e4, pitch: i4, roll: n3 });
        })(new Object({ yaw: t2.alpha * degRad, pitch: t2.beta * degRad, roll: t2.gamma * degRad })), o2 = r2.yaw / degRad, a2 = r2.pitch / degRad, s2 = o2;
        if (70 < Math.abs(a2)) {
          switch (s2 = t2.alpha, window.orientation) {
            case 0:
              0 < a2 && (s2 += 180);
              break;
            case 90:
              s2 += 90;
              break;
            case -90:
              s2 += -90;
              break;
            case 180:
              a2 < 0 && (s2 += 180);
          }
          s2 %= 360, 180 < Math.abs(s2 - o2) && (s2 += s2 < o2 ? 360 : -360), o2 = o2 * (1 - (i3 = Math.min(1, (Math.abs(a2) - 70) / 10))) + s2 * i3;
        }
        if (g) {
          var l = f2.getPanNorth() - f2.getPanN(), c = -t2.alpha;
          t2.webkitCompassHeading && (!t2.webkitCompassAccuracy || 0 <= t2.webkitCompassAccuracy) && (c = t2.webkitCompassHeading), window.orientation && (c += window.orientation), diffPan = -(c + l + o2);
        }
        0 == h && f2.moveTo(diffPan + o2, diffTilt - a2, f2.getFov(), 10), u = o2, p = -a2, 0 < h && (diffPan = f2.getPan() - u, diffTilt = f2.getTilt() - p, h--), 0 != diffTilt && _ && (diffTilt *= 0.98, Math.abs(diffTi
      } else diffPan = f2.getPan() - u, diffTilt = f2.getTilt() - p;
    }
  }
  var f2, o = !!window.DeviceOrientationEvent, m = false, _ = false, g = false;
  isTouching = false, diffPan = 0, diffTilt = 0, hlookat = 0, vlookat = 0, degRad = Math.PI / 180, f2 = t, g = !(_ = true);
  var a = document.getElementById(e2);
  diffPan = f2.getPan(), diffTilt = f2.getTilt(), this.enable();
}
```

## page-transition — app/bundle.js L14255-14264 (hit L14261)
```js
    if (i3) {
      if (null == (e3 = "string" == typeof t2 ? e3 : t2).target) for (var r2 = ["target", "currentTarget", "srcElement", "type"]; t2 = r2.pop(); ) e3 = I(e3, t2, { get: "type" === t2 ? function() {
        return n2;
      } : function() {
        return u;
      } });
      (("popstate" === n2 ? u.onpopstate : u.onhashchange) || j2).call(u, e3);
      for (var o2 = 0, a2 = i3.length; o2 < a2; o2++) i3[o2].call(u, e3);
      return true;
    }
```

## page-transition — app/bundle.js L14267-14270 (hit L14269)
```js
  function F() {
    var t2 = p.createEvent ? p.createEvent("Event") : p.createEventObject();
    t2.initEvent ? t2.initEvent("popstate", false, false) : t2.type = "popstate", t2.state = g.state, B(t2);
  }
```

## audio — app/bundle.js L16575-16589 (hit L16578)
```js
    if (null == s2._capabilities) {
      var t2 = document.createElement("audio");
      if (null == t2.canPlayType) return null;
      if (null == s2.context) if (window.AudioContext) s2.context = new AudioContext();
      else {
        if (!window.webkitAudioContext) return null;
        s2.context = new webkitAudioContext();
      }
      s2._compatibilitySetUp(), s2.playEmptySound(), s2._capabilities = { panning: true, volume: true, tracks: -1 };
      for (var e3 = createjs.Sound.SUPPORTED_EXTENSIONS, n = createjs.Sound.EXTENSION_MAP, i2 = 0, r = e3.length; i2 < r; i2++) {
        var o = e3[i2], a = n[o] || o;
        s2._capabilities[o] = "no" != t2.canPlayType("audio/" + o) && "" != t2.canPlayType("audio/" + o) || "no" != t2.canPlayType("audio/" + a) && "" != t2.canPlayType("audio/" + a);
      }
      s2.context.destination.numberOfChannels < 2 && (s2._capabilities.panning = false);
    }
```

## audio — app/bundle.js L16542-16605 (hit L16591)
```js
})(), this.createjs = this.createjs || {}, (function() {
  "use strict";
  function t() {
    this.AbstractPlugin_constructor(), this._panningModel = s2._panningModel, this.context = s2.context, this.dynamicsCompressorNode = this.context.createDynamicsCompressor(), this.dynamicsCompressorNode.connect(this.con
  }
  var e2 = createjs.extend(t, createjs.AbstractPlugin), s2 = t;
  s2._capabilities = null, s2._panningModel = "equalpower", s2.context = null, s2.isSupported = function() {
    var t2 = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry;
    return !("file:" == location.protocol && !t2 && !this._isFileXHRSupported()) && (s2._generateCapabilities(), null != s2.context);
  }, s2.playEmptySound = function() {
    if (null != s2.context) {
      var t2 = s2.context.createBufferSource();
      t2.buffer = s2.context.createBuffer(1, 1, 22050), t2.connect(s2.context.destination), t2.start(0, 0, 0);
    }
  }, s2._isFileXHRSupported = function() {
    var e3 = true, t2 = new XMLHttpRequest();
    try {
      t2.open("GET", "WebAudioPluginTest.fail", false);
    } catch (t3) {
      return e3 = false;
    }
    t2.onerror = function() {
      e3 = false;
    }, t2.onload = function() {
      e3 = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response;
    };
    try {
      t2.send();
    } catch (t3) {
      e3 = false;
    }
    return e3;
  }, s2._generateCapabilities = function() {
    if (null == s2._capabilities) {
      var t2 = document.createElement("audio");
      if (null == t2.canPlayType) return null;
      if (null == s2.context) if (window.AudioContext) s2.context = new AudioContext();
      else {
        if (!window.webkitAudioContext) return null;
        s2.context = new webkitAudioContext();
      }
      s2._compatibilitySetUp(), s2.playEmptySound(), s2._capabilities = { panning: true, volume: true, tracks: -1 };
      for (var e3 = createjs.Sound.SUPPORTED_EXTENSIONS, n = createjs.Sound.EXTENSION_MAP, i2 = 0, r = e3.length; i2 < r; i2++) {
        var o = e3[i2], a = n[o] || o;
        s2._capabilities[o] = "no" != t2.canPlayType("audio/" + o) && "" != t2.canPlayType("audio/" + o) || "no" != t2.canPlayType("audio/" + a) && "" != t2.canPlayType("audio/" + a);
      }
      s2.context.destination.numberOfChannels < 2 && (s2._capabilities.panning = false);
    }
  }, s2._compatibilitySetUp = function() {
    if (s2._panningModel = "equalpower", !s2.context.createGain) {
      s2.context.createGain = s2.context.createGainNode;
      var t2 = s2.context.createBufferSource();
      t2.__proto__.start = t2.__proto__.noteGrainOn, t2.__proto__.stop = t2.__proto__.noteOff, s2._panningModel = 0;
    }
  }, e2.toString = function() {
    return "[WebAudioPlugin]";
  }, e2._addPropsToClasses = function() {
    var t2 = this._soundInstanceClass;
    t2.context = this.context, t2.destinationNode = this.gainNode, t2._panningModel = this._panningModel, this._loaderClass.context = this.context;
  }, e2._updateVolume = function() {
    var t2 = createjs.Sound._masterMute ? 0 : this._volume;
    t2 != this.gainNode.gain.value && (this.gainNode.gain.value = t2);
  }, createjs.WebAudioPlugin = createjs.promote(t, "AbstractPlugin");
})(), this.createjs = this.createjs || {}, (function() {
```

## wheel-step — app/bundle.js L18254-18294 (hit L18269)
```js
          At(it, true), H2 && (se(H2, "touchcancel", ht), se(H2, "touchend", ht), se(H2, "touchmove", pt)), se(It, "mouseup", ht), se(It, "mousemove", pt);
        }
        return Qt(h2, _2), v3 = false, Ct && "soft" !== t3 && Ct.untrack(y2 || h2, $2 ? "x,y" : J ? "rotation" : "top,left"), y2 && y2.disable(), vt(p2), nt.isDragging = nt.isPressed = F2 = false, i3 && Tt(nt, "dragend",
      }, this.enabled = function(t3, e4) {
        return arguments.length ? t3 ? nt.enable(e4) : nt.disable(e4) : v3;
      }, this.kill = function() {
        return nt.isThrowing = false, ft.killTweensOf(y2 || h2, true, n2), nt.disable(), delete Gt[h2._gsDragID], nt;
      }, -1 !== e3.indexOf("scroll") && (y2 = this.scrollProxy = new St(h2, (function(t3, e4) {
        var n3;
        for (n3 in e4) void 0 === t3[n3] && (t3[n3] = e4[n3]);
        return t3;
      })({ onKill: function() {
        nt.isPressed && ht(null);
      } }, u2)), h2.style.overflowY = tt && !re ? "auto" : "hidden", h2.style.overflowX = Q && !re ? "auto" : "hidden", h2 = y2.content), false !== u2.force3D && ft.set(h2, { force3D: true }), J ? n2.rotation = 1 : (Q &&
    }, Y = ce.prototype = new i2();
    Y.constructor = ce, Y.pointerX = Y.pointerY = Y.startX = Y.startY = Y.deltaX = Y.deltaY = 0, Y.isDragging = Y.isPressed = false, ce.version = "0.15.0", ce.zIndex = 1e3, ae(It, "touchcancel", function() {
    }), ae(It, "contextmenu", function(t2) {
      var e3;
      for (e3 in Gt) Gt[e3].isPressed && Gt[e3].endDrag();
    }), ce.create = function(t2, e3) {
      "string" == typeof t2 && (t2 = ft.selector(t2));
      for (var n2 = t2 && 0 !== t2.length ? s2(t2) ? (function(t3) {
        var e4, n3, i4, r2 = [], o2 = t3.length;
        for (e4 = 0; e4 < o2; e4++) if (n3 = t3[e4], s2(n3)) for (i4 = n3.length, i4 = 0; i4 < n3.length; i4++) r2.push(n3[i4]);
        else n3 && 0 !== n3.length && r2.push(n3);
        return r2;
      })(t2) : [t2] : [], i3 = n2.length; -1 < --i3; ) n2[i3] = new ce(n2[i3], e3);
      return n2;
    }, ce.get = function(t2) {
      return Gt[(bt(t2) || {})._gsDragID];
    }, ce.timeSinceDrag = function() {
      return (qt() - $t) / 1e3;
    };
    var W = {}, ue = function(t2, e3) {
      if (t2 === window) return W.left = W.top = 0, W.width = W.right = Dt.clientWidth || t2.innerWidth || It.body.clientWidth || 0, W.height = W.bottom = (t2.innerHeight || 0) - 20 < Dt.clientHeight ? Dt.clientHeight : 
      var n2 = t2.pageX !== e3 ? { left: t2.pageX - A(), top: t2.pageY - O(), right: t2.pageX - A() + 1, bottom: t2.pageY - O() + 1 } : t2.nodeType || t2.left === e3 || t2.top === e3 ? Vt ? (function(t3) {
        var e4, n3, i3 = 0, r2 = 0;
        for (e4 = (t3 = bt(t3)).offsetWidth, n3 = t3.offsetHeight; t3; ) i3 += t3.offsetTop, r2 += t3.offsetLeft, t3 = t3.offsetParent;
        return { top: i3, left: r2, width: e4, height: n3 };
      })(t2) : bt(t2).getBoundingClientRect() : t2;
      return n2.right === e3 && n2.width !== e3 ? (n2.right = n2.left + n2.width, n2.bottom = n2.top + n2.height) : n2.width === e3 && (n2 = { width: n2.right - n2.left, height: n2.bottom - n2.top, right: n2.right, left:
```

## wheel-step — app/bundle.js L18310-18355 (hit L18311)
```js
})(function(d) {
  var h, f2, t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], e2 = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], m = Array
  if (d.event.fixHooks) for (var n = t.length; n; ) d.event.fixHooks[t[--n]] = d.event.mouseHooks;
  var _ = d.event.special.mousewheel = { version: "3.1.12", setup: function() {
    if (this.addEventListener) for (var t2 = e2.length; t2; ) this.addEventListener(e2[--t2], i2, false);
    else this.onmousewheel = i2;
    d.data(this, "mousewheel-line-height", _.getLineHeight(this)), d.data(this, "mousewheel-page-height", _.getPageHeight(this));
  }, teardown: function() {
    if (this.removeEventListener) for (var t2 = e2.length; t2; ) this.removeEventListener(e2[--t2], i2, false);
    else this.onmousewheel = null;
    d.removeData(this, "mousewheel-line-height"), d.removeData(this, "mousewheel-page-height");
  }, getLineHeight: function(t2) {
    var e3 = d(t2), n2 = e3["offsetParent" in d.fn ? "offsetParent" : "parent"]();
    return n2.length || (n2 = d("body")), parseInt(n2.css("fontSize"), 10) || parseInt(e3.css("fontSize"), 10) || 16;
  }, getPageHeight: function(t2) {
    return d(t2).height();
  }, settings: { adjustOldDeltas: true, normalizeOffset: true } };
  function i2(t2) {
    var e3, n2 = t2 || window.event, i3 = m.call(arguments, 1), r = 0, o = 0, a = 0, s2 = 0, l = 0;
    if ((t2 = d.event.fix(n2)).type = "mousewheel", "detail" in n2 && (a = -1 * n2.detail), "wheelDelta" in n2 && (a = n2.wheelDelta), "wheelDeltaY" in n2 && (a = n2.wheelDeltaY), "wheelDeltaX" in n2 && (o = -1 * n2.whee
      if (1 === n2.deltaMode) {
        var c = d.data(this, "mousewheel-line-height");
        r *= c, a *= c, o *= c;
      } else if (2 === n2.deltaMode) {
        var u = d.data(this, "mousewheel-page-height");
        r *= u, a *= u, o *= u;
      }
      if (e3 = Math.max(Math.abs(a), Math.abs(o)), (!f2 || e3 < f2) && v2(n2, f2 = e3) && (f2 /= 40), v2(n2, e3) && (r /= 40, o /= 40, a /= 40), r = Math[1 <= r ? "floor" : "ceil"](r / f2), o = Math[1 <= o ? "floor" : "c
        var p = this.getBoundingClientRect();
        s2 = t2.clientX - p.left, l = t2.clientY - p.top;
      }
      return t2.deltaX = o, t2.deltaY = a, t2.deltaFactor = f2, t2.offsetX = s2, t2.offsetY = l, t2.deltaMode = 0, i3.unshift(t2, r, o, a), h && clearTimeout(h), h = setTimeout(g, 200), (d.event.dispatch || d.event.handl
    }
  }
  function g() {
    f2 = null;
  }
  function v2(t2, e3) {
    return _.settings.adjustOldDeltas && "mousewheel" === t2.type && e3 % 120 == 0;
  }
  d.fn.extend({ mousewheel: function(t2) {
    return t2 ? this.bind("mousewheel", t2) : this.trigger("mousewheel");
  }, unmousewheel: function(t2) {
    return this.unbind("mousewheel", t2);
  } });
});
```

## keyboard — app/bundle.js L18384-18412 (hit L18390)
```js
})(), define("lib/externals", ["jquery", "knockout", "jquerymobile", "vendor/knockout-punches/knockout.punches", "lib/knockout/knockout.gaia", "xdomainrequest", "lottie", "TimelineLite", "TweenMax", "CSSPlugin", "ScrollT
  a.punches.interpolationMarkup.enable(), a.punches.attributeInterpolationMarkup.enable(), a.punches.textFilter.enableForBinding("text"), a.punches.textFilter.enableForBinding("foreach"), a.filters.filter = function(t, e
    return a.unwrap(t).filter(function(t2) {
      return -1 != a.unwrap(t2).indexOf(a.unwrap(e3));
    });
  }, a.bindingHandlers.live = { preprocess: function(t, e3, n) {
    n("value", t), n("valueUpdate", "['afterkeydown', 'keyup', 'input']");
  } }, a.bindingHandlers.allowBindings = { isBound: false, init: function(t, e3) {
    var n = a.utils.unwrapObservable(e3());
    return { controlsDescendantBindings: !(this.isBound = n) };
  }, update: function(t, e3, n, i2, r) {
    a.utils.unwrapObservable(e3()) && !this.isBound && (this.isBound = true, a.applyBindingsToDescendants(r, t));
  } }, a.virtualElements.allowedBindings.allowBindings = true, a.punches.utils.setNodePreprocessor(function(t) {
    if (1 === t.nodeType) {
      var e3 = t.tagName.toLowerCase();
      if ("x-" == e3.substr(0, 2)) {
        var n = e3.substr(2), i2 = o(t).attr("data");
        if (o("#" + n)[0]) {
          var r = o("<div/>");
          r.attr("data-bind", "template: {name: '" + n + "'" + (i2 ? ", data: " + i2 : "") + "}"), o(t).replaceWith(r);
        }
      }
    }
  });
  var e2 = a.punches.interpolationMarkup.wrapExpresssion;
  a.punches.interpolationMarkup.wrapExpresssion = function(t) {
    return /^lt:[\w\.]+/.test(t) ? (t = t.replace(/^lt:/, ""), [document.createComment("ko localizedText: '" + t + "'"), document.createComment("/ko")]) : e2(t);
  };
}), Array.from || (Array.from = (function() {
```

## text-split — app/bundle.js L20880-20896 (hit L20884)
```js
define("app/component/button-hotspot/ButtonHotspotController", ["require", "exports", "lib/temple/component/AbstractComponentController", "lib/temple/util/Log"], function(t, e2, n, i2) {
  Object.defineProperty(e2, "__esModule", { value: true });
  var r, o = (r = n.default, __extends(a, r), a.prototype.init = function() {
    this._debug.log("Init"), this.viewModel.text(this.options.text);
    var t2 = this.element.getElementsByClassName("text"), e3 = new TimelineLite(), n2 = new SplitText(t2, { type: "words, chars", wordsClass: "word", charsClass: "char" }), i3 = n2.chars, r2 = n2.words;
    e3.set(i3, { position: "absolute" }), e3.set(r2, { rotation: -10 * (i3.length + 1) + "deg" });
  }, a.prototype.setViewModel = function(t2) {
    return t2.type("icon-" + this.options.type), r.prototype.setViewModel.call(this, t2);
  }, a.prototype.destruct = function() {
    r.prototype.destruct.call(this);
  }, a);
  function a() {
    var t2 = null !== r && r.apply(this, arguments) || this;
    return t2._debug = new i2.default("app.component.ButtonHotspot"), t2;
  }
  e2.default = o;
});
```

## wheel-step — panorama/PanoramaManager.js L103-110 (hit L107)
```js
    $(this.container).on("mousewheel", function(t2) {
      if (t2.preventDefault(), !i2.camera.isAnimating() && !i2._forceDisableRendering) {
        var e2 = document.createEvent("KeyboardEvent");
        e2[void 0 !== e2.initKeyboardEvent ? "initKeyboardEvent" : "initKeyEvent"]("keydown", true, true, window, false, false, true, false, 0, 0), document.dispatchEvent(e2);
        var a2 = Math.max(m._MIN_FOV, Math.min(m._MAX_FOV, i2.camera.fov - t2.deltaY * t2.deltaFactor / 12));
        i2.camera.fov !== m._ULTRAZOOM_FOV ? (a2 === m._MIN_FOV ? i2.disableZoomInButton() : a2 === m._MAX_FOV ? i2.disableZoomOutButton() : i2.enableZoomButtons(), (i2.camera.fov < m._MIN_FOV || i2.camera.fov > m._MAX_F
      }
    });
```

## pointer — panorama/PointerPositionManager.js L14-48 (hit L26)
```js
define(["require", "exports", "../../lib/temple/event/EventDispatcher", "../../lib/temple/event/CommonEvent"], function(e, t, n, s) {
  Object.defineProperty(t, "__esModule", { value: true });
  var o, i = (o = n.default, __extends(r, o), Object.defineProperty(r.prototype, "pointerDirection", { get: function() {
    return this._pointerDirection;
  }, enumerable: true, configurable: true }), Object.defineProperty(r.prototype, "cursorEnabled", { get: function() {
    return this._cursorEnabled;
  }, set: function(e2) {
    this._cursorEnabled = e2, this._removeEventListeners(), this._initEvents();
  }, enumerable: true, configurable: true }), r.prototype.getPointerSpherePosition = function() {
    var e2 = this.pointerDirection, t2 = this._panoramaManager.camera.directionRelativeToAbsolute(e2), n2 = Math.asin(t2.y), o2 = Math.asin(t2.x / Math.cos(n2));
    return t2.z < 0 && (o2 = Math.PI - o2), { pan: o2 / Math.PI * -180, tilt: n2 / Math.PI * 180 };
  }, r.prototype._initEvents = function() {
    this._cursorEnabled && (window.addEventListener("mousemove", this._mouseMoveHandler, true), this._panoramaManager.container.addEventListener("mouseup", this._mouseUpHandler, true), this._panoramaManager.container.add
  }, r.prototype._removeEventListeners = function() {
    window.removeEventListener("mousemove", this._mouseMoveHandler, true), this._panoramaManager.container.removeEventListener("mouseup", this._mouseUpHandler, true), this._panoramaManager.container.removeEventListener("
  }, r.prototype._updatePointerDirection = function(e2, t2) {
    var n2 = this._panoramaManager.camera, o2 = e2 - n2.viewWidth / 2 - this.panoramaOffset.x, i2 = -1 * (t2 - n2.viewHeight / 2 - this.panoramaOffset.y), r2 = n2.projectionDistance, a = Math.sqrt(o2 * o2 + i2 * i2 + r2 
    this._pointerDirection.x = o2 / a, this._pointerDirection.y = i2 / a, this._pointerDirection.z = r2 / a, this.dispatchEvent(new s.default(s.default.CHANGE));
  }, r.prototype.destruct = function() {
    this._removeEventListeners(), $(window).off(this.eventNamespace), o.prototype.destruct.call(this);
  }, r);
  function r(e2, t2) {
    void 0 === t2 && (t2 = true);
    var n2 = o.call(this) || this;
    return n2._panoramaManager = e2, n2._cursorEnabled = t2, n2.panoramaOffset = { x: 0, y: 0 }, n2._pointerDirection = { x: 0, y: 0, z: 1 }, n2._mouseUpHandler = function(e3) {
      n2._updatePointerDirection(e3.clientX, e3.clientY);
    }, n2._touchEndHandler = function(e3) {
      var t3 = e3.changedTouches;
      t3.length && n2._updatePointerDirection(t3[0].clientX, t3[0].clientY);
    }, n2._mouseMoveHandler = function(e3) {
      n2._updatePointerDirection(e3.clientX, e3.clientY);
    }, n2._initEvents(), n2;
  }
  t.default = i;
});
```