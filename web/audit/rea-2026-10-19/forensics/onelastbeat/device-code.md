# onelastbeat — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: audio×3, raf-lerp×1, loader×3, pointer×2, shader-uniforms×3, reveal-timeline×3, cursor-dom×1, keyboard×1

## audio — js/app.js L998-1002 (hit L1000)
```js
  var e = new t2(), i2 = function(t3) {
    var e2 = this;
    if (!t3.src || 0 === t3.src.length) return void console.error("An array of source files must be passed with any new Howl.");
    e2.init(t3);
  };
```

## audio — js/app.js L1138-1155 (hit L1141)
```js
  }, fade: function(t3, i3, n2, r2) {
    var s3 = this;
    if ("loaded" !== s3._state) return s3._queue.push({ event: "fade", action: function() {
      s3.fade(t3, i3, n2, r2);
    } }), s3;
    s3.volume(t3, r2);
    for (var o2 = s3._getSoundIds(r2), a2 = 0; a2 < o2.length; a2++) {
      var h2 = s3._soundById(o2[a2]);
      if (h2) {
        if (r2 || s3._stopFade(o2[a2]), s3._webAudio && !h2._muted) {
          var l2 = e.ctx.currentTime, u = l2 + n2 / 1e3;
          h2._volume = t3, h2._node.gain.setValueAtTime(t3, l2), h2._node.gain.linearRampToValueAtTime(i3, u);
        }
        s3._startFadeInterval(h2, t3, i3, n2, o2[a2], void 0 === r2);
      }
    }
    return s3;
  }, _startFadeInterval: function(t3, e2, i3, n2, r2, s3) {
```

## audio — js/app.js L1375-1387 (hit L1377)
```js
  }, l = function() {
    try {
      "undefined" != typeof AudioContext ? e.ctx = new AudioContext() : "undefined" != typeof webkitAudioContext ? e.ctx = new webkitAudioContext() : e.usingWebAudio = false;
    } catch (t4) {
      e.usingWebAudio = false;
    }
    var t3 = /iP(hone|od|ad)/.test(e._navigator && e._navigator.platform), i3 = e._navigator && e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), n2 = i3 ? parseInt(i3[1], 10) : null;
    if (t3 && n2 && n2 < 9) {
      var r2 = /safari/.test(e._navigator && e._navigator.userAgent.toLowerCase());
      (e._navigator && e._navigator.standalone && !r2 || e._navigator && !e._navigator.standalone && !r2) && (e.usingWebAudio = false);
    }
    e.usingWebAudio && (e.masterGain = void 0 === e.ctx.createGain ? e.ctx.createGainNode() : e.ctx.createGain(), e.masterGain.gain.setValueAtTime(e._muted ? 0 : 1, e.ctx.currentTime), e.masterGain.connect(e.ctx.destinat
  };
```

## raf-lerp — js/app.js L2431-2443 (hit L2436)
```js
        function f(t3) {
          var e3, i3, n2, r2, o2, a2, l2, u2, p2, f2, m2, _2, y3, v2, g2, x2 = [];
          for (t3 = h(t3), _2 = t3.length, e3 = M, i3 = 0, o2 = P, a2 = 0; a2 < _2; ++a2) (m2 = t3[a2]) < 128 && x2.push(F(m2));
          for (n2 = r2 = x2.length, r2 && x2.push(O); n2 < _2; ) {
            for (l2 = w, a2 = 0; a2 < _2; ++a2) (m2 = t3[a2]) >= e3 && m2 < l2 && (l2 = m2);
            for (y3 = n2 + 1, l2 - e3 > L((w - i3) / y3) && s2("overflow"), i3 += (l2 - e3) * y3, e3 = l2, a2 = 0; a2 < _2; ++a2) if (m2 = t3[a2], m2 < e3 && ++i3 > w && s2("overflow"), m2 == e3) {
              for (u2 = i3, p2 = T; f2 = p2 <= o2 ? A : p2 >= o2 + S ? S : p2 - o2, !(u2 < f2); p2 += T) g2 = u2 - f2, v2 = T - f2, x2.push(F(c(f2 + g2 % v2, 0))), u2 = L(g2 / v2);
              x2.push(F(c(u2, 0))), o2 = d(i3, y3, n2 == r2), i3 = 0, ++n2;
            }
            ++i3, ++e3;
          }
          return x2.join("");
        }
```

## loader — js/app.js L2712-2776 (hit L2715)
```js
    })(u), d = t3("./Resource"), p = n(d), f = /(#[\w-]+)?$/, m = (function() {
      function t4() {
        var e2 = this, i3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
        r(this, t4), this.baseUrl = i3, this.progress = 0, this.loading = false, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource
          return e2._loadResource(t5, i4);
        }, this._queue = c.queue(this._boundLoadResource, n2), this._queue.pause(), this.resources = {}, this.onProgress = new a.default(), this.onError = new a.default(), this.onLoad = new a.default(), this.onStart = ne
      }
      return t4.prototype.add = function(t5, e2, i3, n2) {
        if (Array.isArray(t5)) {
          for (var r2 = 0; r2 < t5.length; ++r2) this.add(t5[r2]);
          return this;
        }
        if ("object" === (void 0 === t5 ? "undefined" : s2(t5)) && (n2 = e2 || t5.callback || t5.onComplete, i3 = t5, e2 = t5.url, t5 = t5.name || t5.key || t5.url), "string" != typeof e2 && (n2 = i3, i3 = e2, e2 = t5), 
        if ("function" == typeof i3 && (n2 = i3, i3 = null), this.loading && (!i3 || !i3.parentResource)) throw new Error("Cannot add resources while the loader is running.");
        if (this.resources[t5]) throw new Error('Resource named "' + t5 + '" already exists.');
        if (e2 = this._prepareUrl(e2), this.resources[t5] = new p.default(t5, e2, i3), "function" == typeof n2 && this.resources[t5].onAfterMiddleware.once(n2), this.loading) {
          for (var o2 = i3.parentResource, a2 = [], h2 = 0; h2 < o2.children.length; ++h2) o2.children[h2].isComplete || a2.push(o2.children[h2]);
          var l2 = o2.progressChunk * (a2.length + 1), u2 = l2 / (a2.length + 2);
          o2.children.push(this.resources[t5]), o2.progressChunk = u2;
          for (var c2 = 0; c2 < a2.length; ++c2) a2[c2].progressChunk = u2;
          this.resources[t5].progressChunk = u2;
        }
        return this._queue.push(this.resources[t5]), this;
      }, t4.prototype.pre = function(t5) {
        return this._beforeMiddleware.push(t5), this;
      }, t4.prototype.use = function(t5) {
        return this._afterMiddleware.push(t5), this;
      }, t4.prototype.reset = function() {
        this.progress = 0, this.loading = false, this._queue.kill(), this._queue.pause();
        for (var t5 in this.resources) {
          var e2 = this.resources[t5];
          e2._onLoadBinding && e2._onLoadBinding.detach(), e2.isLoading && e2.abort();
        }
        return this.resources = {}, this;
      }, t4.prototype.load = function(t5) {
        if ("function" == typeof t5 && this.onComplete.once(t5), this.loading) return this;
        for (var e2 = 100 / this._queue._tasks.length, i3 = 0; i3 < this._queue._tasks.length; ++i3) this._queue._tasks[i3].data.progressChunk = e2;
        return this.loading = true, this.onStart.dispatch(this), this._queue.resume(), this;
      }, t4.prototype._prepareUrl = function(t5) {
        var e2 = (0, l.default)(t5, { strictMode: true }), i3 = void 0;
        if (i3 = e2.protocol || !e2.path || 0 === t5.indexOf("//") ? t5 : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t5.charAt(0) ? this.baseUrl + "/" + t5 : this.baseUrl 
          var n2 = f.exec(i3)[0];
          i3 = i3.substr(0, i3.length - n2.length), i3 += -1 !== i3.indexOf("?") ? "&" + this.defaultQueryString : "?" + this.defaultQueryString, i3 += n2;
        }
        return i3;
      }, t4.prototype._loadResource = function(t5, e2) {
        var i3 = this;
        t5._dequeue = e2, c.eachSeries(this._beforeMiddleware, function(e3, n2) {
          e3.call(i3, t5, function() {
            n2(t5.isComplete ? {} : null);
          });
        }, function() {
          t5.isComplete ? i3._onLoad(t5) : (t5._onLoadBinding = t5.onComplete.once(i3._onLoad, i3), t5.load());
        });
      }, t4.prototype._onComplete = function() {
        this.loading = false, this.onComplete.dispatch(this, this.resources);
      }, t4.prototype._onLoad = function(t5) {
        var e2 = this;
        t5._onLoadBinding = null, t5._dequeue(), this._resourcesParsing.push(t5), c.eachSeries(this._afterMiddleware, function(i3, n2) {
          i3.call(e2, t5, n2);
        }, function() {
          t5.onAfterMiddleware.dispatch(t5), e2.progress += t5.progressChunk, e2.onProgress.dispatch(e2, t5), t5.error ? e2.onError.dispatch(t5.error, e2, t5) : e2.onLoad.dispatch(e2, t5), e2._resourcesParsing.splice(e2.
        });
      }, t4;
    })();
```

## loader — js/app.js L2862-2868 (hit L2865)
```js
      }, t4.prototype._loadXdr = function() {
        "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
        var t5 = this.xhr = new XDomainRequest();
        t5.timeout = 5e3, t5.onerror = this._boundXhrOnError, t5.ontimeout = this._boundXdrOnTimeout, t5.onprogress = this._boundOnProgress, t5.onload = this._boundXhrOnLoad, t5.open("GET", this.url, true), setTimeout(fu
          return t5.send();
        }, 1);
      }, t4.prototype._createSource = function(t5, e2, i3) {
```

## loader — js/app.js L2859-2899 (hit L2874)
```js
        "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
        var e2 = this.xhr = new XMLHttpRequest();
        e2.open("GET", this.url, true), this.xhrType === t4.XHR_RESPONSE_TYPE.JSON || this.xhrType === t4.XHR_RESPONSE_TYPE.DOCUMENT ? e2.responseType = t4.XHR_RESPONSE_TYPE.TEXT : e2.responseType = this.xhrType, e2.addE
      }, t4.prototype._loadXdr = function() {
        "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
        var t5 = this.xhr = new XDomainRequest();
        t5.timeout = 5e3, t5.onerror = this._boundXhrOnError, t5.ontimeout = this._boundXdrOnTimeout, t5.onprogress = this._boundOnProgress, t5.onload = this._boundXhrOnLoad, t5.open("GET", this.url, true), setTimeout(fu
          return t5.send();
        }, 1);
      }, t4.prototype._createSource = function(t5, e2, i3) {
        i3 || (i3 = t5 + "/" + e2.substr(e2.lastIndexOf(".") + 1));
        var n2 = document.createElement("source");
        return n2.src = e2, n2.type = i3, n2;
      }, t4.prototype._onError = function(t5) {
        this.abort("Failed to load element using: " + t5.target.nodeName);
      }, t4.prototype._onProgress = function(t5) {
        t5 && t5.lengthComputable && this.onProgress.dispatch(this, t5.loaded / t5.total);
      }, t4.prototype._xhrOnError = function() {
        var t5 = this.xhr;
        this.abort(a(t5) + " Request failed. Status: " + t5.status + ', text: "' + t5.statusText + '"');
      }, t4.prototype._xhrOnAbort = function() {
        this.abort(a(this.xhr) + " Request was aborted by the user.");
      }, t4.prototype._xdrOnTimeout = function() {
        this.abort(a(this.xhr) + " Request timed out.");
      }, t4.prototype._xhrOnLoad = function() {
        var e2 = this.xhr, i3 = void 0 === e2.status ? e2.status : 200;
        if (!(200 === i3 || 204 === i3 || 0 === i3 && e2.responseText.length > 0)) return void this.abort("[" + e2.status + "] " + e2.statusText + ": " + e2.responseURL);
        if (this.xhrType === t4.XHR_RESPONSE_TYPE.TEXT) this.data = e2.responseText, this.type = t4.TYPE.TEXT;
        else if (this.xhrType === t4.XHR_RESPONSE_TYPE.JSON) try {
          this.data = JSON.parse(e2.responseText), this.type = t4.TYPE.JSON;
        } catch (t5) {
          return void this.abort("Error trying to parse loaded json: " + t5);
        }
        else if (this.xhrType === t4.XHR_RESPONSE_TYPE.DOCUMENT) try {
          if (window.DOMParser) {
            var n2 = new DOMParser();
            this.data = n2.parseFromString(e2.responseText, "text/xml");
          } else {
            var r2 = document.createElement("div");
            r2.innerHTML = e2.responseText, this.data = r2;
          }
```

## pointer — js/app.js L3172-3231 (hit L3184)
```js
    var c = 100, d = 0, p = 0, f = 2, m = (function() {
      function t4(e2) {
        r(this, t4), !h.default.tablet && !h.default.phone || navigator.isCocoonJS || this.createTouchHook();
        var i3 = document.createElement("div");
        i3.style.width = c + "px", i3.style.height = c + "px", i3.style.position = "absolute", i3.style.top = d + "px", i3.style.left = p + "px", i3.style.zIndex = f, this.div = i3, this.pool = [], this.renderId = 0, thi
      }
      return t4.prototype.createTouchHook = function() {
        var t5 = this, e2 = document.createElement("button");
        e2.style.width = "1px", e2.style.height = "1px", e2.style.position = "absolute", e2.style.top = "-1000px", e2.style.left = "-1000px", e2.style.zIndex = 2, e2.style.backgroundColor = "#FF0000", e2.title = "HOOK DI
          t5.isMobileAccessabillity = true, t5.activate(), document.body.removeChild(e2);
        }), document.body.appendChild(e2);
      }, t4.prototype.activate = function() {
        this.isActive || (this.isActive = true, window.document.addEventListener("mousemove", this._onMouseMove, true), window.removeEventListener("keydown", this._onKeyDown, false), this.renderer.on("postrender", this.u
      }, t4.prototype.deactivate = function() {
        this.isActive && !this.isMobileAccessabillity && (this.isActive = false, window.document.removeEventListener("mousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown, false), this.rende
      }, t4.prototype.updateAccessibleObjects = function(t5) {
        if (t5.visible) {
          t5.accessible && t5.interactive && (t5._accessibleActive || this.addChild(t5), t5.renderId = this.renderId);
          for (var e2 = t5.children, i3 = e2.length - 1; i3 >= 0; i3--) this.updateAccessibleObjects(e2[i3]);
        }
      }, t4.prototype.update = function() {
        if (this.renderer.renderingToScreen) {
          this.updateAccessibleObjects(this.renderer._lastObjectRendered);
          var t5 = this.renderer.view.getBoundingClientRect(), e2 = t5.width / this.renderer.width, i3 = t5.height / this.renderer.height, n2 = this.div;
          n2.style.left = t5.left + "px", n2.style.top = t5.top + "px", n2.style.width = this.renderer.width + "px", n2.style.height = this.renderer.height + "px";
          for (var r2 = 0; r2 < this.children.length; r2++) {
            var s3 = this.children[r2];
            if (s3.renderId !== this.renderId) s3._accessibleActive = false, o.utils.removeItems(this.children, r2, 1), this.div.removeChild(s3._accessibleDiv), this.pool.push(s3._accessibleDiv), s3._accessibleDiv = null
            else {
              n2 = s3._accessibleDiv;
              var a2 = s3.hitArea, h2 = s3.worldTransform;
              s3.hitArea ? (n2.style.left = (h2.tx + a2.x * h2.a) * e2 + "px", n2.style.top = (h2.ty + a2.y * h2.d) * i3 + "px", n2.style.width = a2.width * h2.a * e2 + "px", n2.style.height = a2.height * h2.d * i3 + "px
            }
          }
          this.renderId++;
        }
      }, t4.prototype.capHitArea = function(t5) {
        t5.x < 0 && (t5.width += t5.x, t5.x = 0), t5.y < 0 && (t5.height += t5.y, t5.y = 0), t5.x + t5.width > this.renderer.width && (t5.width = this.renderer.width - t5.x), t5.y + t5.height > this.renderer.height && (t
      }, t4.prototype.addChild = function(t5) {
        var e2 = this.pool.pop();
        e2 || (e2 = document.createElement("button"), e2.style.width = c + "px", e2.style.height = c + "px", e2.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", e2.style.position = "absolute", e2
      }, t4.prototype._onClick = function(t5) {
        var e2 = this.renderer.plugins.interaction;
        e2.dispatchEvent(t5.target.displayObject, "click", e2.eventData);
      }, t4.prototype._onFocus = function(t5) {
        var e2 = this.renderer.plugins.interaction;
        e2.dispatchEvent(t5.target.displayObject, "mouseover", e2.eventData);
      }, t4.prototype._onFocusOut = function(t5) {
        var e2 = this.renderer.plugins.interaction;
        e2.dispatchEvent(t5.target.displayObject, "mouseout", e2.eventData);
      }, t4.prototype._onKeyDown = function(t5) {
        9 === t5.keyCode && this.activate();
      }, t4.prototype._onMouseMove = function() {
        this.deactivate();
      }, t4.prototype.destroy = function() {
        this.div = null;
        for (var t5 = 0; t5 < this.children.length; t5++) this.children[t5].div = null;
        window.document.removeEventListener("mousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null;
      }, t4;
    })();
```

## shader-uniforms — js/app.js L5643-5666 (hit L5665)
```js
  }, { "../../../const": 44, "../../../math": 68, "../../../settings": 99, "pixi-gl-core": 12 }], 95: [function(t3, e, i2) {
    "use strict";
    function n(t4, e2) {
      var i3 = !e2;
      if (i3) {
        var n2 = document.createElement("canvas");
        n2.width = 1, n2.height = 1, e2 = o.default.createContext(n2);
      }
      for (var s3 = e2.createShader(e2.FRAGMENT_SHADER); ; ) {
        var h = a.replace(/%forloop%/gi, r(t4));
        if (e2.shaderSource(s3, h), e2.compileShader(s3), e2.getShaderParameter(s3, e2.COMPILE_STATUS)) break;
        t4 = t4 / 2 | 0;
      }
      return i3 && e2.getExtension("WEBGL_lose_context") && e2.getExtension("WEBGL_lose_context").loseContext(), t4;
    }
    function r(t4) {
      for (var e2 = "", i3 = 0; i3 < t4; ++i3) i3 > 0 && (e2 += "\nelse "), i3 < t4 - 1 && (e2 += "if(test == " + i3 + ".0){}");
      return e2;
    }
    i2.__esModule = true, i2.default = n;
    var s2 = t3("pixi-gl-core"), o = (function(t4) {
      return t4 && t4.__esModule ? t4 : { default: t4 };
    })(s2), a = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n");
  }, { "pixi-gl-core": 12 }], 96: [function(t3, e, i2) {
```

## shader-uniforms — js/app.js L5962-5980 (hit L5979)
```js
  }, { "../../renderers/webgl/WebGLRenderer": 82, "../../renderers/webgl/utils/ObjectRenderer": 92, "../../renderers/webgl/utils/checkMaxIfStatmentsInShader": 95, "../../settings": 99, "../../utils/createIndicesForQuads"
    "use strict";
    function n(t4, e2) {
      var i3 = a;
      i3 = i3.replace(/%count%/gi, e2), i3 = i3.replace(/%forloop%/gi, r(e2));
      for (var n2 = new o.default(t4, "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvary
      return n2.bind(), n2.uniforms.uSamplers = s3, n2;
    }
    function r(t4) {
      var e2 = "";
      e2 += "\n", e2 += "\n";
      for (var i3 = 0; i3 < t4; i3++) i3 > 0 && (e2 += "\nelse "), i3 < t4 - 1 && (e2 += "if(textureId == " + i3 + ".0)"), e2 += "\n{", e2 += "\n	color = texture2D(uSamplers[" + i3 + "], vTextureCoord);", e2 += "\n}";
      return e2 += "\n", e2 += "\n";
    }
    i2.__esModule = true, i2.default = n;
    var s2 = t3("../../Shader"), o = (function(t4) {
      return t4 && t4.__esModule ? t4 : { default: t4 };
    })(s2), a = (t3("path"), ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vText
  }, { "../../Shader": 42, path: 22 }], 106: [function(t3, e, i2) {
```

## shader-uniforms — js/app.js L8035-8046 (hit L8038)
```js
  }, { "../../core": 63, "./generateBlurFragSource": 143, "./generateBlurVertSource": 144, "./getMaxBlurKernelSize": 145 }], 143: [function(t3, e, i2) {
    "use strict";
    function n(t4) {
      for (var e2 = r[t4], i3 = e2.length, n2 = s2, o = "", a = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", h = void 0, l = 0; l < t4; l++) {
        var u = a.replace("%index%", l);
        h = l, l >= i3 && (h = t4 - l - 1), u = u.replace("%value%", e2[h]), o += u, o += "\n";
      }
      return n2 = n2.replace("%blur%", o), n2 = n2.replace("%size%", t4);
    }
    i2.__esModule = true, i2.default = n;
    var r = { 5: [0.153388, 0.221461, 0.250301], 7: [0.071303, 0.131514, 0.189879, 0.214607], 9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236], 11: [93e-4, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596], 13: [2406
  }, {}], 144: [function(t3, e, i2) {
```

## reveal-timeline — js/app.js L9889-9905 (hit L9905)
```js
    }, s2.staggerTo = s2.allTo = function(t3, e2, o2, a2, u2, d2, p2) {
      a2 = a2 || 0;
      var f2, m, _, y2, v = 0, g = [], x = function() {
        o2.onComplete && o2.onComplete.apply(o2.onCompleteScope || this, arguments), u2.apply(p2 || o2.callbackScope || this, d2 || c);
      }, b = o2.cycle, w = o2.startAt && o2.startAt.cycle;
      for (l(t3) || ("string" == typeof t3 && (t3 = i2.selector(t3) || t3), h(t3) && (t3 = n(t3))), t3 = t3 || [], 0 > a2 && (t3 = n(t3), t3.reverse(), a2 *= -1), f2 = t3.length - 1, _ = 0; f2 >= _; _++) {
        m = {};
        for (y2 in o2) m[y2] = o2[y2];
        if (b && (r(m, t3, _), null != m.duration && (e2 = m.duration, delete m.duration)), w) {
          w = m.startAt = {};
          for (y2 in o2.startAt) w[y2] = o2.startAt[y2];
          r(m.startAt, t3, _);
        }
        m.delay = v + (m.delay || 0), _ === f2 && u2 && (m.onComplete = x), g[_] = new s2(t3[_], e2, m), v += a2;
      }
      return g;
    }, s2.staggerFrom = s2.allFrom = function(t3, e2, i3, n2, r2, o2, a2) {
```

## reveal-timeline — js/app.js L9892-9932 (hit L9907)
```js
        o2.onComplete && o2.onComplete.apply(o2.onCompleteScope || this, arguments), u2.apply(p2 || o2.callbackScope || this, d2 || c);
      }, b = o2.cycle, w = o2.startAt && o2.startAt.cycle;
      for (l(t3) || ("string" == typeof t3 && (t3 = i2.selector(t3) || t3), h(t3) && (t3 = n(t3))), t3 = t3 || [], 0 > a2 && (t3 = n(t3), t3.reverse(), a2 *= -1), f2 = t3.length - 1, _ = 0; f2 >= _; _++) {
        m = {};
        for (y2 in o2) m[y2] = o2[y2];
        if (b && (r(m, t3, _), null != m.duration && (e2 = m.duration, delete m.duration)), w) {
          w = m.startAt = {};
          for (y2 in o2.startAt) w[y2] = o2.startAt[y2];
          r(m.startAt, t3, _);
        }
        m.delay = v + (m.delay || 0), _ === f2 && u2 && (m.onComplete = x), g[_] = new s2(t3[_], e2, m), v += a2;
      }
      return g;
    }, s2.staggerFrom = s2.allFrom = function(t3, e2, i3, n2, r2, o2, a2) {
      return i3.runBackwards = true, i3.immediateRender = 0 != i3.immediateRender, s2.staggerTo(t3, e2, i3, n2, r2, o2, a2);
    }, s2.staggerFromTo = s2.allFromTo = function(t3, e2, i3, n2, r2, o2, a2, h2) {
      return n2.startAt = i3, n2.immediateRender = 0 != n2.immediateRender && 0 != i3.immediateRender, s2.staggerTo(t3, e2, n2, r2, o2, a2, h2);
    }, s2.delayedCall = function(t3, e2, i3, n2, r2) {
      return new s2(e2, 0, { delay: t3, onComplete: e2, onCompleteParams: i3, callbackScope: n2, onReverseComplete: e2, onReverseCompleteParams: i3, immediateRender: false, useFrames: r2, overwrite: 0 });
    }, s2.set = function(t3, e2) {
      return new s2(t3, 0, e2);
    }, s2.isTweening = function(t3) {
      return i2.getTweensOf(t3, true).length > 0;
    };
    var d = function(t3, e2) {
      for (var n2 = [], r2 = 0, s3 = t3._first; s3; ) s3 instanceof i2 ? n2[r2++] = s3 : (e2 && (n2[r2++] = s3), n2 = n2.concat(d(s3, e2)), r2 = n2.length), s3 = s3._next;
      return n2;
    }, p = s2.getAllTweens = function(e2) {
      return d(t2._rootTimeline, e2).concat(d(t2._rootFramesTimeline, e2));
    };
    s2.killAll = function(t3, i3, n2, r2) {
      null == i3 && (i3 = true), null == n2 && (n2 = true);
      var s3, o2, a2, h2 = p(0 != r2), l2 = h2.length, u2 = i3 && n2 && r2;
      for (a2 = 0; l2 > a2; a2++) o2 = h2[a2], (u2 || o2 instanceof e || (s3 = o2.target === o2.vars.onComplete) && n2 || i3 && !s3) && (t3 ? o2.totalTime(o2._reversed ? 0 : o2.totalDuration()) : o2._enabled(false, false
    }, s2.killChildTweensOf = function(t3, e2) {
      if (null != t3) {
        var r2, o2, u2, c2, d2, p2 = a.tweenLookup;
        if ("string" == typeof t3 && (t3 = i2.selector(t3) || t3), h(t3) && (t3 = n(t3)), l(t3)) for (c2 = t3.length; --c2 > -1; ) s2.killChildTweensOf(t3[c2], e2);
        else {
          r2 = [];
          for (u2 in p2) for (o2 = p2[u2].target.parentNode; o2; ) o2 === t3 && (r2 = r2.concat(p2[u2].tweens)), o2 = o2.parentNode;
```

## reveal-timeline — js/app.js L9990-9993 (hit L9992)
```js
    }, _.fromTo = function(t3, e2, n2, r2, s3) {
      var o2 = r2.repeat && c.TweenMax || i2;
      return e2 ? this.add(o2.fromTo(t3, e2, n2, r2), s3) : this.set(t3, r2, s3);
    }, _.staggerTo = function(t3, e2, r2, s3, o2, h2, l2, u2) {
```

## pointer — js/app.js L11707-11722 (hit L11711)
```js
}), define("utils/watchforhover", [], function() {
  var t2 = { isTouch: false, className: "has-hover", start: function(t3) {
    this.check();
  }, check: function() {
    this.hasHoverClass = false, this.container = document.body, this.lastTouchTime = 0, document.addEventListener("touchstart", this.updateLastTouchTime.bind(this), true), document.addEventListener("touchstart", this.dis
  }, enableHover: function() {
    /* @__PURE__ */ new Date() - this.lastTouchTime < 500 || this.hasHoverClass || (this.container.className += " " + this.className, this.hasHoverClass = true);
  }, disableHover: function() {
    this.hasHoverClass && (this.container.className = this.container.className.replace(" " + this.className, ""), this.hasHoverClass = false, t2.isTouch = true);
  }, updateLastTouchTime: function() {
    this.lastTouchTime = /* @__PURE__ */ new Date();
  }, reset: function() {
    t2.disableHover(), this.lastTouchTime = 0;
  } };
  return t2;
}), define("utils/gtaghelper", [], function() {
```

## cursor-dom — js/app.js L12243-12260 (hit L12259)
```js
  return t2.prototype = { constructor: t2, onPointerEvent: function(t3) {
    var e, i2, n = this.canvas.getBoundingClientRect(), r = this.canvas.width / n.width, s2 = this.canvas.height / n.height, o = false;
    switch (t3.type) {
      case "mousedown":
      case "mousemove":
        e = t3.clientX, i2 = t3.clientY;
        break;
      case "touchstart":
      case "touchmove":
        o = true, e = t3.touches[0].clientX, i2 = t3.touches[0].clientY;
    }
    e = (e - n.left) * r, i2 = (i2 - n.top) * s2;
    var a = [e, i2];
    this.hovering = [];
    var h, l, u;
    for (var c in this.buttons) h = this.buttons[c], l = h.polygon, u = this.checkPoint(a, l), u && this.hovering.push(h.id), u && !l.hovering && this.onHover && !o && this.onHover(h.id), !u && l.hovering && this.onOut &
    this.cursor && this.hovering.length ? this.canvas.style.cursor = this.cursor : this.canvas.style.cursor = "default";
  }, addButtonRect: function(t3, e, i2, n, r) {
```

## keyboard — js/app.js L12564-12627 (hit L12625)
```js
}), define("partials/interactionkeyboard", ["TweenMax", "models/globals", "partials/cardboardbutton"], function(e, i2, n) {
  var r = function() {
    this.sequence = [], this.buttons = [], this.strictSequence = false, this.ref = {}, this.currentIndex = 0, this.defaultDemoIntervalTime = 300, this.demoIntervalTime = this.defaultIntervalTime, this.demoIndex = -1, thi
  };
  return r.prototype = { create: function(t2, i3, r2) {
    function s2() {
      c.press(this.id);
    }
    var o, a, h, l, u, c = this;
    for (o = 0; o < t2.length; ++o) l = t2[o].key, h = "SPACE" == l ? n.BIG : n.SQUARE, u = t2[o].caption, a = new n(h, u, false), a.id = l, a.onInmediatePress = s2, this.container.appendChild(a.getDom()), this.buttons.p
    if (i3) this.strictSequence = true, this.demoIndex = 0;
    else for (this.strictSequence = false, i3 = [], o = 0; o < t2.length; ++o) i3.push(o);
    this.sequence = i3, r2 && (reverse = i3.reverse()), this.demoBall = document.createElement("div"), this.demoBall.className = "demo-ball", t2.length > 1 && this.container.appendChild(this.demoBall), setTimeout(this.de
  }, demoStep: function() {
    clearTimeout(this.demoIntervalId);
    var i3 = this;
    this.strictSequence || ++this.demoIndex, this.demoIndex >= this.sequence.length && (this.demoIndex = 0);
    var n2 = this.buttons[this.sequence[this.demoIndex]], r2 = n2.getDom();
    n2.demoPress(true);
    var s2 = r2.offsetLeft + r2.clientWidth / 2;
    s2 != this.demoBallLastX && (console.log("offsetLeft: " + r2.offsetLeft), console.log("x: " + s2), console.log("demoBallLastX: " + this.demoBallLastX), this.demoBallTimeline && this.demoBallTimeline.kill(), this.demo
    } }), t.to(this.demoBall, 0.1, { left: s2 }, 0), t.to(this.demoBall, 0.05, { top: -30 }, 0), t.to(this.demoBall, 0.05, { top: -10 }, 0.05), this.demoBallLastX = s2);
    var o = this.demoIndex;
    setTimeout(function() {
      i3.demoBallTimeline.isActive() || e.to(i3.demoBall, 0.1, { top: -20, left: s2 }), i3.buttons[i3.sequence[o]].demoPress(false);
    }, 100), this.demoIntervalId = setTimeout(function() {
      i3.demoBallTimeline.isActive() || e.to(i3.demoBall, 0.1, { top: -5, left: s2 }), i3.demoStep();
    }, this.demoIntervalTime);
  }, show: function() {
    this.demoIndex = this.strictSequence ? 0 : -1;
    for (var t2, i3 = 0; i3 < this.buttons.length; ++i3) t2 = this.buttons[i3].getDom(), e.from(t2, 0.1, { scaleX: 0, scaleY: 0, delay: 0.1 * i3 });
    e.set(this.container, { visibility: "visible" }), e.to(this.container, 0.5, { opacity: 1 }), this.visible = true;
  }, hide: function() {
    var t2 = this;
    e.to(this.container, 0.3, { opacity: 0, onComplete: function() {
      e.set(t2.container, { visibility: "hidden" });
    } }), this.visible = false;
  }, onKeyDown: function(t2) {
    if (this.isKeyDown) return null;
    var e2 = t2.keyCode;
    t2.keyCode >= 96 && t2.keyCode <= 105 && (e2 -= 48);
    var i3 = String.fromCharCode(e2);
    " " == i3 && (i3 = "SPACE"), this.ref[i3] && this.ref[i3].onPress(), this.isKeyDown = true;
  }, onKeyUp: function(t2) {
    var e2 = t2.keyCode, i3 = String.fromCharCode(e2);
    " " == i3 && (i3 = "SPACE"), this.ref[i3] && this.ref[i3].onRelease(), this.isKeyDown = false;
  }, next: function() {
    ++this.currentIndex, ++this.demoIndex;
  }, press: function(t2) {
    if (!this.visible) return null;
    if (this.strictSequence) this.buttons[this.sequence[this.currentIndex]].id == t2 && (this.currentIndex >= this.sequence.length && (this.currentIndex = 0), this.onGoodPress && this.onGoodPress(), this.autoNext && this
    else {
      var e2 = -1, i3 = this.currentIndex + 1;
      i3 >= this.sequence.length && (i3 = 0);
      for (var n2, r2 = 0; r2 < this.sequence.length; ++r2) n2 = this.buttons[this.sequence[r2]].id, t2 == n2 && (e2 = r2);
      e2 >= 0 && (e2 == i3 && this.onGoodPress && this.onGoodPress(), this.currentIndex = e2);
    }
  }, resize: function() {
    var t2 = this.container.querySelectorAll(".cardboardbutton")[0].getBoundingClientRect();
    this.container.style.top = Math.round(0.95 * i2.height - t2.height) + "px";
  }, destroy: function() {
    window.removeEventListener("keydown", this.keyDownHandler), window.removeEventListener("keyup", this.keyUpHandler), clearTimeout(this.demoIntervalId), this.parent.removeChild(this.container), i2.events.off(i2.RESIZE,
  } }, r;
}), define("partials/chest", ["pixi", "utils/preloaders", "models/globals", "controllers/pixiapp"], function(t2, e, i2, n) {
```