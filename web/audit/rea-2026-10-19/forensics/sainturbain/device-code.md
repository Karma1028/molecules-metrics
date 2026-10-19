# sainturbain — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, raf-lerp×3, wheel-step×3, page-transition×2, reveal-timeline×2, keyboard×2, cursor-dom×1

## loader — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L910-936 (hit L910)
```js
            })()), s.assetLoader || (s.assetLoader = /* @__PURE__ */ (function() {
              function t3(t4) {
                var e3 = t4.getResponseHeader("content-type");
                return e3 && "json" === t4.responseType && -1 !== e3.indexOf("json") || t4.response && "object" === _typeof$5(t4.response) ? t4.response : t4.response && "string" == typeof t4.response ? JSON.parse(t4.res
              }
              return { load: function(e3, i2, n2, r2) {
                var s2, a2 = new XMLHttpRequest();
                try {
                  a2.responseType = "json";
                } catch (t4) {
                }
                a2.onreadystatechange = function() {
                  if (4 === a2.readyState) if (200 === a2.status) s2 = t3(a2), n2(s2);
                  else try {
                    s2 = t3(a2), n2(s2);
                  } catch (t4) {
                    r2 && r2(t4);
                  }
                };
                try {
                  a2.open("GET", e3, true);
                } catch (t4) {
                  a2.open("GET", i2 + "/" + e3, true);
                }
                a2.send();
              } };
            })()), "loadAnimation" === t2.data.type) s.assetLoader.load(t2.data.path, t2.data.fullPath, (function(e3) {
```

## loader — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L929-969 (hit L944)
```js
                try {
                  a2.open("GET", e3, true);
                } catch (t4) {
                  a2.open("GET", i2 + "/" + e3, true);
                }
                a2.send();
              } };
            })()), "loadAnimation" === t2.data.type) s.assetLoader.load(t2.data.path, t2.data.fullPath, (function(e3) {
              s.dataManager.completeData(e3), s.postMessage({ id: t2.data.id, payload: e3, status: "success" });
            }), (function() {
              s.postMessage({ id: t2.data.id, status: "error" });
            }));
            else if ("complete" === t2.data.type) {
              var e2 = t2.data.animation;
              s.dataManager.completeData(e2), s.postMessage({ id: t2.data.id, payload: e2, status: "success" });
            } else "loadData" === t2.data.type && s.assetLoader.load(t2.data.path, t2.data.fullPath, (function(e3) {
              s.postMessage({ id: t2.data.id, payload: e3, status: "success" });
            }), (function() {
              s.postMessage({ id: t2.data.id, status: "error" });
            }));
          })), e.onmessage = function(t2) {
            var e2 = t2.data, i2 = e2.id, r2 = n[i2];
            n[i2] = null, "success" === e2.status ? r2.onComplete(e2.payload) : r2.onError && r2.onError();
          });
        }
        function o(t2, e2) {
          var r2 = "processId_" + (i += 1);
          return n[r2] = { onComplete: t2, onError: e2 }, r2;
        }
        return { loadAnimation: function(t2, i2, n2) {
          a();
          var r2 = o(i2, n2);
          e.postMessage({ type: "loadAnimation", path: t2, fullPath: window.location.origin + window.location.pathname, id: r2 });
        }, loadData: function(t2, i2, n2) {
          a();
          var r2 = o(i2, n2);
          e.postMessage({ type: "loadData", path: t2, fullPath: window.location.origin + window.location.pathname, id: r2 });
        }, completeAnimation: function(t2, i2, n2) {
          a();
          var r2 = o(i2, n2);
          e.postMessage({ type: "complete", animation: t2, id: r2 });
```

## loader — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L956-996 (hit L971)
```js
          return n[r2] = { onComplete: t2, onError: e2 }, r2;
        }
        return { loadAnimation: function(t2, i2, n2) {
          a();
          var r2 = o(i2, n2);
          e.postMessage({ type: "loadAnimation", path: t2, fullPath: window.location.origin + window.location.pathname, id: r2 });
        }, loadData: function(t2, i2, n2) {
          a();
          var r2 = o(i2, n2);
          e.postMessage({ type: "loadData", path: t2, fullPath: window.location.origin + window.location.pathname, id: r2 });
        }, completeAnimation: function(t2, i2, n2) {
          a();
          var r2 = o(i2, n2);
          e.postMessage({ type: "complete", animation: t2, id: r2 });
        } };
      })(), ImagePreloader = (function() {
        var t = (function() {
          var t2 = createTag("canvas");
          t2.width = 1, t2.height = 1;
          var e2 = t2.getContext("2d");
          return e2.fillStyle = "rgba(0,0,0,0)", e2.fillRect(0, 0, 1, 1), t2;
        })();
        function e() {
          this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }
        function i() {
          this.loadedFootagesCount += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }
        function n(t2, e2, i2) {
          var n2 = "";
          if (t2.e) n2 = t2.p;
          else if (e2) {
            var r2 = t2.p;
            -1 !== r2.indexOf("images/") && (r2 = r2.split("/")[1]), n2 = e2 + r2;
          } else n2 = i2, n2 += t2.u ? t2.u : "", n2 += t2.p;
          return n2;
        }
        function r(t2) {
          var e2 = 0, i2 = setInterval(function() {
            (t2.getBBox().width || e2 > 500) && (this._imageLoaded(), clearInterval(i2)), e2 += 1;
          }.bind(this), 50);
```

## raf-lerp — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L3897-3948 (hit L3923)
```js
          for (r = 0; r < s; r += 1) {
            if (x.reset(), j = 1, P[r].n) i = 0, n += t.yOffset, n += O ? 1 : 0, o = K, O = false, this._hasMaskedPath && (u = Z, d = (f = m[p = J].points)[u - 1], y = (l = f[u]).partialLength, h = 0), tt = "", Y = "", q
            else {
              if (this._hasMaskedPath) {
                if (Q !== P[r].line) {
                  switch (t.j) {
                    case 1:
                      o += v - t.lineWidths[P[r].line];
                      break;
                    case 2:
                      o += (v - t.lineWidths[P[r].line]) / 2;
                  }
                  Q = P[r].line;
                }
                U !== P[r].ind && (P[U] && (o += P[U].extra), o += P[r].an / 2, U = P[r].ind), o += w[0] * P[r].an * 5e-3;
                var ot = 0;
                for (I = 0; I < D; I += 1) (M = S[I].a).p.propType && ((L = S[I].s.getMult(P[r].anIndexes[I], E.a[I].s.totalChars)).length ? ot += M.p.v[0] * L[0] : ot += M.p.v[0] * L), M.a.propType && ((L = S[I].s.getMu
                for (c = true, this._pathData.a.v && (o = 0.5 * P[0].an + (v - this._pathData.f.v - 0.5 * P[0].an - 0.5 * P[P.length - 1].an) * U / (s - 1), o += this._pathData.f.v); c; ) h + y >= o + ot || !f ? (g = (o 
                B = P[r].an / 2 - P[r].add, x.translate(-B, 0, 0);
              } else B = P[r].an / 2 - P[r].add, x.translate(-B, 0, 0), x.translate(-w[0] * P[r].an * 5e-3, -w[1] * R * 0.01, 0);
              for (I = 0; I < D; I += 1) (M = S[I].a).t.propType && (L = S[I].s.getMult(P[r].anIndexes[I], E.a[I].s.totalChars), 0 === i && 0 === t.j || (this._hasMaskedPath ? L.length ? o += M.t.v * L[0] : o += M.t.v * 
              for (t.strokeWidthAnim && (N = t.sw || 0), t.strokeColorAnim && (G = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && ($ = [t.fc[0], t.fc[1], t.fc[2]]), I = 0; I < D; I += 1) (M =
              for (I = 0; I < D; I += 1) (M = S[I].a).s.propType && ((L = S[I].s.getMult(P[r].anIndexes[I], E.a[I].s.totalChars)).length ? x.scale(1 + (M.s.v[0] - 1) * L[0], 1 + (M.s.v[1] - 1) * L[1], 1) : x.scale(1 + (M
              for (I = 0; I < D; I += 1) {
                if (M = S[I].a, L = S[I].s.getMult(P[r].anIndexes[I], E.a[I].s.totalChars), M.sk.propType && (L.length ? x.skewFromAxis(-M.sk.v * L[0], M.sa.v * L[1]) : x.skewFromAxis(-M.sk.v * L, M.sa.v * L)), M.r.propT
                if (t.fillColorAnim && t.fc) {
                  if (M.fc.propType) for (H = 0; H < 3; H += 1) L.length ? $[H] += (M.fc.v[H] - $[H]) * L[0] : $[H] += (M.fc.v[H] - $[H]) * L;
                  M.fh.propType && ($ = L.length ? addHueToRGB($, M.fh.v * L[0]) : addHueToRGB($, M.fh.v * L)), M.fs.propType && ($ = L.length ? addSaturationToRGB($, M.fs.v * L[0]) : addSaturationToRGB($, M.fs.v * L)), 
                }
              }
              for (I = 0; I < D; I += 1) (M = S[I].a).p.propType && (L = S[I].s.getMult(P[r].anIndexes[I], E.a[I].s.totalChars), this._hasMaskedPath ? L.length ? x.translate(0, M.p.v[1] * L[0], -M.p.v[2] * L[1]) : x.tran
              if (t.strokeWidthAnim && (q = N < 0 ? 0 : N), t.strokeColorAnim && (W = "rgb(" + Math.round(255 * G[0]) + "," + Math.round(255 * G[1]) + "," + Math.round(255 * G[2]) + ")"), t.fillColorAnim && t.fc && (Y = 
                if (x.translate(0, -t.ls), x.translate(0, w[1] * R * 0.01 + n, 0), this._pathData.p.v) {
                  _ = (l.point[1] - d.point[1]) / (l.point[0] - d.point[0]);
                  var lt = 180 * Math.atan(_) / Math.PI;
                  l.point[0] < d.point[0] && (lt += 180), x.rotate(-lt * Math.PI / 180);
                }
                x.translate(V, z, 0), o -= w[0] * P[r].an * 5e-3, P[r + 1] && U !== P[r + 1].ind && (o += P[r].an / 2, o += 1e-3 * t.tr * t.finalSize);
              } else {
                switch (x.translate(i, n, 0), t.ps && x.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                  case 1:
                    x.translate(P[r].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[P[r].line]), 0, 0);
                    break;
                  case 2:
                    x.translate(P[r].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[P[r].line]) / 2, 0, 0);
                }
                x.translate(0, -t.ls), x.translate(B, 0, 0), x.translate(w[0] * P[r].an * 5e-3, w[1] * R * 0.01, 0), i += P[r].l + 1e-3 * t.tr * t.finalSize;
              }
              "html" === k ? tt = x.toCSS() : "svg" === k ? tt = x.to2dCSS() : et = [x.props[0], x.props[1], x.props[2], x.props[3], x.props[4], x.props[5], x.props[6], x.props[7], x.props[8], x.props[9], x.props[10], x.
            }
            C <= r ? (F = new LetterProps(X, q, W, Y, tt, et), this.renderedLetters.push(F), C += 1, this.lettersChangedFlag = true) : (F = this.renderedLetters[r], this.lettersChangedFlag = F.update(X, q, W, Y, tt, et) 
          }
```

## wheel-step — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L5793-5833 (hit L5808)
```js
      return null !== e2 && h(e2[1], t2);
    }, y = function() {
      return g() || v() || _();
    }, v = function(t2) {
      return d(t2) && !g() && !_() && s.maxTouchPoints > 1;
    }, g = function(t2) {
      var e2 = a.match(/iphone(?:.+?os (\d+))?/);
      return null !== e2 && h(e2[1] || 1, t2);
    }, _ = function(t2) {
      var e2 = a.match(/ipod.+?os (\d+)/);
      return null !== e2 && h(e2[1], t2);
    };
    var b = ["touchmove", "mousemove", "scroll", "mouseWheel", "touchstart", "deviceorientation"], w = function(t2) {
      return -1 !== b.indexOf(t2) && { passive: false };
    }, S = function(t2) {
      return "mouseWheel" === t2 ? "onwheel" in document ? "wheel" : (0, n.o8)(document.onmousewheel) ? "DOMMouseScroll" : "mousewheel" : "focusOut" === t2 ? p() ? "blur" : "focusout" : t2;
    }, E = function(t2, e2, n2, r2) {
      for (var s2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, a2 = (0, i.$$)(t2), o2 = S(n2), l2 = Object.assign(s2, w(n2)), h2 = 0, c2 = a2.length; h2 < c2; h2++) a2[h2]["".concat(e2, "EventLi
    }, x = function(t2, e2, i2, n2) {
      E(t2, "add", e2, i2, n2);
    }, k = function(t2, e2, i2, n2) {
      E(t2, "remove", e2, i2, n2);
    };
    var C = __webpack_require__("./node_modules/eventemitter2/lib/eventemitter2.js"), P = __webpack_require__.n(C);
    function T(t2, e2) {
      (null == e2 || e2 > t2.length) && (e2 = t2.length);
      for (var i2 = 0, n2 = new Array(e2); i2 < e2; i2++) n2[i2] = t2[i2];
      return n2;
    }
    function A(t2) {
      if (void 0 === t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t2;
    }
    function M(t2, e2) {
      if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
    }
    function I(t2, e2) {
      for (var i2 = 0; i2 < e2.length; i2++) {
        var n2 = e2[i2];
        n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t2, n2.key, n2);
      }
```

## page-transition — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L6011-6051 (hit L6026)
```js
      } }, { key: "once", value: function(t3, e3) {
        var i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n2 = this, r3 = function() {
          for (var s3 = arguments.length, a2 = new Array(s3), o2 = 0; o2 < s3; o2++) a2[o2] = arguments[o2];
          n2.off(t3, r3), e3.apply(i2, a2);
        };
        this.on(t3, r3);
      } }, { key: "off", value: function(t3, e3) {
        var i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        if (this._listeners.has(t3)) {
          var n2 = this._listeners.get(t3);
          n2.forEach((function(t4) {
            e3 === t4.fn && t4.ctx === i2 && n2.delete(t4);
          }));
        }
      } }, { key: "start", value: function() {
        x(window, "popstate", this._onPopStateBnd), x(document, "click", this._onLinkClickBnd);
      } }, { key: "stop", value: function() {
        k(window, "popstate", this._onPopStateBnd), k(document, "click", this._onLinkClickBnd);
      } }, { key: "back", value: function() {
        var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
        history.go(t3);
      } }, { key: "forward", value: function() {
        var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        history.go(t3);
      } }, { key: "force", value: function(t3) {
        window.location.assign(t3);
      } }, { key: "go", value: function(t3) {
        var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        if (t3) K(t3) || false !== this._checkPrevent(t3, e3, i2) ? this.force(t3) : (history.pushState({ scrollY: 0 }, "", t3), this._run(t3));
        else if (true === this._options.debug) throw new Error("[windmill] Go without url is forbidden.");
      } }, { key: "push", value: function(t3) {
        this._data.current.url = t3, history.pushState({ scrollY: 0 }, "", t3);
      } }, { key: "replace", value: function(t3) {
        this._data.current.url = t3, history.replaceState({ scroll: 0 }, "", t3);
      } }, { key: "_checkPrevent", value: function(t3) {
        var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        if (this._running) return 1;
        if (!window.history.pushState) return 2;
        if (i2 && (i2.which > 1 || i2.metaKey || i2.ctrlKey || i2.shiftKey || i2.altKey)) return 3;
        if (e3 && e3.hasAttribute && e3.hasAttribute("target") && "_blank" === e3.target) return 4;
        if (e3 && (void 0 !== e3.protocol && window.location.protocol !== e3.protocol || void 0 !== e3.hostname && window.location.hostname !== e3.hostname)) return 5;
```

## page-transition — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L6145-6154 (hit L6152)
```js
      } }, { key: "_onLinkClick", value: function(t3) {
        var e3 = (function(t4) {
          for (var e4 = t4.target; e4 && !U(e4); ) e4 = e4.parentNode;
          if (e4) return e4;
        })(t3);
        if (e3) {
          var i2 = U(e3);
          K(i2) || false !== this._checkPrevent(i2, e3, t3) || (t3 && t3.cancelable && (t3.preventDefault(), t3.stopPropagation()), "replace" === e3.getAttribute("data-windmill-method") ? this.replace(i2) : (history.push
        }
      } }, { key: "_onFetch", value: function(t3) {
```

## raf-lerp — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L6254-6294 (hit L6269)
```js
    }
    function Ct(t2, e2, i2) {
      return e2 in t2 ? Object.defineProperty(t2, e2, { value: i2, enumerable: true, configurable: true, writable: true }) : t2[e2] = i2, t2;
    }
    function Pt(t2) {
      for (var e2 = 1; e2 < arguments.length; e2++) {
        var i2 = null != arguments[e2] ? arguments[e2] : {}, n2 = Object.keys(i2);
        "function" == typeof Object.getOwnPropertySymbols && (n2 = n2.concat(Object.getOwnPropertySymbols(i2).filter((function(t3) {
          return Object.getOwnPropertyDescriptor(i2, t3).enumerable;
        })))), n2.forEach((function(e3) {
          Ct(t2, e3, i2[e3]);
        }));
      }
      return t2;
    }
    var Tt, At = ((null === navigator || void 0 === navigator || null === (Tt = navigator.userAgentData) || void 0 === Tt ? void 0 : Tt.platform) || (null === navigator || void 0 === navigator ? void 0 : navigator.platfo
      function t2() {
        var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Mt;
        xt(this, t2), this._options = Pt({}, Mt, e3), this._data = { scroll: window.scrollY, targetScroll: window.scrollY, lastScroll: window.scrollY, max: 0, direction: null, scrollTo: null, started: false, isFirefox: p
      }
      var e2, n2, r2;
      return e2 = t2, n2 = [{ key: "init", value: function() {
        if (this._calcScrollHeight(), it.emit("SiteScroll.init", this), window.location.hash) {
          var t3 = window.location.hash.slice(1, window.location.hash.length), e3 = (0, i.$)("#".concat(t3));
          e3 && this.scrollTo(e3);
        }
      } }, { key: "raf", value: function() {
        var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        this._data.started && this._data.isMouseWheeling && (this._data.lastScroll = mt(this._data.lastScroll, this._data.targetScroll, this._options.lerp * t3), this._data.isMouseWheeling = Math.abs(this._data.scroll - 
      } }, { key: "resize", value: function() {
        this._data.isMouseWheeling = false, this._calcScrollHeight(), this._updateDirection(), this._updateScroll(), this._notify();
      } }, { key: "scrollTo", value: function(t3) {
        var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : dt;
        e3 = Pt({}, dt, e3);
        var n3 = parseInt(e3.offset) || 0, r3 = !!e3.callback && e3.callback;
        if ("string" == typeof t3) {
          if ("top" === t3) t3 = 0;
          else if ("bottom" === t3) t3 = this._data.max;
          else if (!(t3 = (0, i.$)(t3))) return;
        } else if ("number" == typeof t3) t3 = parseInt(t3);
        else if (!t3 || !t3.tagName) return void console.warn("`target` parameter is not valid");
```

## wheel-step — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L6286-6326 (hit L6301)
```js
        var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : dt;
        e3 = Pt({}, dt, e3);
        var n3 = parseInt(e3.offset) || 0, r3 = !!e3.callback && e3.callback;
        if ("string" == typeof t3) {
          if ("top" === t3) t3 = 0;
          else if ("bottom" === t3) t3 = this._data.max;
          else if (!(t3 = (0, i.$)(t3))) return;
        } else if ("number" == typeof t3) t3 = parseInt(t3);
        else if (!t3 || !t3.tagName) return void console.warn("`target` parameter is not valid");
        n3 += "number" != typeof t3 ? (0, i.JA)(t3).top - bt(t3).y + this._data.scroll : t3, this._data.scrollTo = r3 ? { offset: parseInt(n3), callback: r3 } : null, this._data.isMouseWheeling = false, window.scrollTo({
      } }, { key: "start", value: function() {
        this._data.started || (this._data.started = true, this._calcScrollHeight(), this._bindEvents());
      } }, { key: "stop", value: function() {
        this._data.started && (this._data.started = false, this._unbindEvents());
      } }, { key: "reset", value: function() {
        this._data.scroll = this._data.targetScroll = this._data.lastScroll = window.scrollY, this._data.direction = null, this._data.scrollTo = null, this._data.isMouseWheeling = false, this._mousewheel.x = this._mousew
      } }, { key: "_bindEvents", value: function() {
        x(window, "scroll", this._onScroll), window.addEventListener("wheel", this._onWheel, { passive: false }), window.addEventListener("mousewheel", this._onMouseWheel, { passive: true });
      } }, { key: "_unbindEvents", value: function() {
        k(window, "scroll", this._onScroll), window.removeEventListener("wheel", this._onWheel), window.removeEventListener("mousewheel", this._onMouseWheel);
      } }, { key: "_notify", value: function() {
        it.emit("SiteScroll.scroll", { y: this._data.scroll, direction: this._data.direction, limit: this._data.max, progress: this.progress, velocity: this.velocity });
      } }, { key: "_onScroll", value: function() {
        this._data.isMouseWheeling || (this._updateDirection(), this._updateScroll(), this._notify(), this._data.scrollTo && this._data.scrollTo.offset === this._data.scroll >> 0 && (this._data.scrollTo.callback(), this.
      } }, { key: "_onWheel", value: function(t3) {
        this._mousewheel.deltaX = t3.wheelDeltaX || -1 * t3.deltaX, this._mousewheel.deltaY = t3.wheelDeltaY || -1 * t3.deltaY, this._data.isFirefox && (this._mousewheel.deltaX *= this._options.firefoxMultiplier, this._m
      } }, { key: "_onMouseWheel", value: function(t3) {
        this._mousewheel.deltaX = t3.wheelDeltaX ? t3.wheelDeltaX : 0, this._mousewheel.deltaY = t3.wheelDeltaY ? t3.wheelDeltaY : t3.wheelDelta, this._handleMouseWheel(t3);
      } }, { key: "_handleMouseWheel", value: function(t3) {
        this._mousewheel.x += this._mousewheel.deltaX, this._mousewheel.y += this._mousewheel.deltaY, t3.ctrlKey || (this._data.started ? 4 !== t3.buttons && (t3.preventDefault(), this._data.scrollTo = null, this._data.i
      } }, { key: "_calcScrollHeight", value: function() {
        this._data.max = Math.max(0, i.d1.scrollHeight - wt.height);
      } }, { key: "_updateDirection", value: function() {
        var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.scrollY, e3 = t3 - this._data.scroll;
        if (!(Math.abs(e3) <= 0.05)) {
          var i2 = e3 >= 0 ? ot : lt;
          if (i2 !== this._data.direction) {
            var n3 = this._data.direction;
            this._data.direction = i2, it.emit("SiteScroll.direction", i2, n3);
          }
        }
```

## raf-lerp — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L7471-7534 (hit L7481)
```js
    var ki = (function() {
      function t2() {
        !(function(t3, e3) {
          if (!(t3 instanceof e3)) throw new TypeError("Cannot call a class as a function");
        })(this, t2), this.scroll = null, this.direction = null, this.intersection = null, this.minimum = null, this.timeline = null, this.to = null, this.webgl = null, this._raf = null, this._started = false, this._last
      }
      var e2, n2, r2;
      return e2 = t2, n2 = [{ key: "install", value: function(t3) {
        t3.on("init", this._onInit, this), t3.on("loaded", this._onLoaded, this), t3.on("ready", this._onPageReady, this), t3.on("exiting", this._onPageExit, this), t3.on("enter", this._onPageEnter, this), t3.on("entered
      } }, { key: "_onInit", value: function() {
        this.scroll = new Dt({ lerp: 0.135 }), this.direction = new Bt(this.scroll), this.intersection = new ie(this.scroll), this.minimum = new re(this.scroll), this.timeline = new mi(this.scroll), this.to = new _i(this
      } }, { key: "_onLoaded", value: function() {
        var t3;
        null === (t3 = this.webgl) || void 0 === t3 || t3.cleanup();
      } }, { key: "_onRAF", value: function() {
        var t3, e3, i2;
        if (this._started) {
          var n3 = performance.now(), r3 = this._lastTime ? Math.min(Math.ceil((n3 - this._lastTime) / nt * 10) / 10, 1) : 1;
          this._lastTime = n3, this.scroll.raf(r3), null === (t3 = this.intersection) || void 0 === t3 || t3.raf(r3), null === (e3 = this.timeline) || void 0 === e3 || e3.raf(), null === (i2 = this.webgl) || void 0 === i
        } else this._raf = null;
      } }, { key: "_onResize", value: function() {
        var t3, e3, i2;
        this._started && (null === (t3 = this.scroll) || void 0 === t3 || t3.resize(), null === (e3 = this.intersection) || void 0 === e3 || e3.resize(), null === (i2 = this.webgl) || void 0 === i2 || i2.resize());
      } }, { key: "_onPageReady", value: function() {
        var t3, e3, i2;
        this._lastTime = null, null === (t3 = this.scroll) || void 0 === t3 || t3.init(), null === (e3 = this.intersection) || void 0 === e3 || e3.init(), null === (i2 = this.webgl) || void 0 === i2 || i2.init(), this._s
      } }, { key: "_onPageExit", value: function() {
        this._unbindEvents(false);
      } }, { key: "_onPageEnter", value: function(t3) {
        var e3, n3, r3, s2, a2, o2, l2, h2, c2, u2 = t3.next;
        this._unbindEvents(), this._stopModules(), null === (e3 = this.scroll) || void 0 === e3 || e3.reset(), null === (n3 = this.intersection) || void 0 === n3 || n3.reset(), null === (r3 = this.minimum) || void 0 === 
      } }, { key: "_onPageEntered", value: function() {
        this._lastTime = null, this._startModules(), this._bindEvents(), this._onRAF();
      } }, { key: "_onPageDone", value: function() {
        var t3;
        null === (t3 = this.scroll) || void 0 === t3 || t3.resize();
      } }, { key: "_onSiteScrollStart", value: function() {
        var t3, e3;
        null === (t3 = this.scroll) || void 0 === t3 || t3.start(), null === (e3 = this.minimum) || void 0 === e3 || e3.start(), i.dy.classList.remove(pt);
      } }, { key: "_onSiteScrollStop", value: function() {
        var t3, e3, n3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        null === (t3 = this.scroll) || void 0 === t3 || t3.stop(), null === (e3 = this.minimum) || void 0 === e3 || e3.stop(), n3 && i.dy.classList.add(pt);
      } }, { key: "_onSiteScrollUpdate", value: function() {
        var t3, e3, i2;
        it.emit("SiteScroll.before-update", this.scroll), null === (t3 = this.timeline) || void 0 === t3 || t3.reset(), null === (e3 = this.scroll) || void 0 === e3 || e3.resize(), null === (i2 = this.intersection) || vo
      } }, { key: "_onSiteScrollTo", value: function(t3) {
        var e3, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : dt;
        null === (e3 = this.scroll) || void 0 === e3 || e3.scrollTo(t3, i2);
      } }, { key: "_onSiteScrollUp", value: function() {
        var t3;
        null === (t3 = this.scroll) || void 0 === t3 || t3.scrollTo("top");
      } }, { key: "_bindEvents", value: function() {
        Ei.add(this._onResize, -450), it.on("SiteScroll.start", this._onSiteScrollStart), it.on("SiteScroll.stop", this._onSiteScrollStop), it.on("SiteScroll.update", this._onSiteScrollUpdate), it.on("SiteScroll.scrollTo
      } }, { key: "_unbindEvents", value: function() {
        var t3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        Ei.remove(this._onResize), it.off("SiteScroll.start", this._onSiteScrollStart), it.off("SiteScroll.stop", this._onSiteScrollStop), it.off("SiteScroll.update", this._onSiteScrollUpdate), it.off("SiteScroll.scrollT
      } }, { key: "_startModules", value: function() {
        var t3, e3, i2, n3, r3, s2, a2;
        this._started || (this._started = true, null === (t3 = this.direction) || void 0 === t3 || t3.start(), null === (e3 = this.intersection) || void 0 === e3 || e3.start(), null === (i2 = this.minimum) || void 0 === 
      } }, { key: "_stopModules", value: function() {
        var t3, e3, i2, n3, r3, s2, a2;
        this._started && (null === (t3 = this.scroll) || void 0 === t3 || t3.stop(), null === (e3 = this.direction) || void 0 === e3 || e3.stop(), null === (i2 = this.intersection) || void 0 === i2 || i2.stop(), null ===
      } }], n2 && xi(e2.prototype, n2), r2 && xi(e2, r2), t2;
    })();
```

## reveal-timeline — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L7801-7808 (hit L7805)
```js
      } }, { key: "enter", value: function(t3) {
        var e3 = t3.current, n3 = t3.next, r3 = this;
        return new Promise((function(t4) {
          i.d1.style.height = "".concat(i.d1.scrollHeight, "px"), n3.container.parentElement.style.overflow = "hidden", i.dy.style.removeProperty("cursor");
          var s2 = hi.timeline({ autoplay: false });
          s2.add({ targets: e3.container, opacity: { value: 0.5, easing: "linear" }, scale: 0.9, duration: 766.66666667, easing: "cubicBezier(0.20, 0.00, 0.23, 1.00)" }, 0), s2.add({ targets: n3.container, translateY: ["
        }));
      } }, { key: "entered", value: function(t3) {
```

## keyboard — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L8102-8142 (hit L8117)
```js
        for (let i3 = 0; i3 < t3.length; i3 += 1) -1 === e3.indexOf(t3[i3]) && e3.push(t3[i3]);
        return e3;
      })(r2));
    }
    Pn.fn = xn.prototype;
    const Tn = "resize scroll".split(" ");
    function An(t2) {
      return function(...e2) {
        if (void 0 === e2[0]) {
          for (let e3 = 0; e3 < this.length; e3 += 1) Tn.indexOf(t2) < 0 && (t2 in this[e3] ? this[e3][t2]() : Pn(this[e3]).trigger(t2));
          return this;
        }
        return this.on(t2, ...e2);
      };
    }
    An("click"), An("blur"), An("focus"), An("focusin"), An("focusout"), An("keyup"), An("keydown"), An("keypress"), An("submit"), An("change"), An("mousedown"), An("mousemove"), An("mouseup"), An("mouseenter"), An("mous
    const Mn = { addClass: function(...t2) {
      const e2 = kn(t2.map(((t3) => t3.split(" "))));
      return this.forEach(((t3) => {
        t3.classList.add(...e2);
      })), this;
    }, removeClass: function(...t2) {
      const e2 = kn(t2.map(((t3) => t3.split(" "))));
      return this.forEach(((t3) => {
        t3.classList.remove(...e2);
      })), this;
    }, hasClass: function(...t2) {
      const e2 = kn(t2.map(((t3) => t3.split(" "))));
      return Cn(this, ((t3) => e2.filter(((e3) => t3.classList.contains(e3))).length > 0)).length > 0;
    }, toggleClass: function(...t2) {
      const e2 = kn(t2.map(((t3) => t3.split(" "))));
      this.forEach(((t3) => {
        e2.forEach(((e3) => {
          t3.classList.toggle(e3);
        }));
      }));
    }, attr: function(t2, e2) {
      if (1 === arguments.length && "string" == typeof t2) return this[0] ? this[0].getAttribute(t2) : void 0;
      for (let i2 = 0; i2 < this.length; i2 += 1) if (2 === arguments.length) this[i2].setAttribute(t2, e2);
      else for (const e3 in t2) this[i2][e3] = t2[e3], this[i2].setAttribute(e3, t2[e3]);
      return this;
```

## cursor-dom — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L9113-9118 (hit L9117)
```js
    } }, slide: Kn, loop: Jn, grabCursor: { setGrabCursor: function(t2) {
      const e2 = this;
      if (e2.support.touch || !e2.params.simulateTouch || e2.params.watchOverflow && e2.isLocked || e2.params.cssMode) return;
      const i2 = "container" === e2.params.touchEventsTarget ? e2.el : e2.wrapperEl;
      i2.style.cursor = "move", i2.style.cursor = t2 ? "grabbing" : "grab";
    }, unsetGrabCursor: function() {
```

## reveal-timeline — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L10425-10460 (hit L10445)
```js
    var Ns = [46, 60, 72], $s = "grid", Hs = (function() {
      function t2(e2, n2) {
        Vs(this, t2), this.el = e2, this.emitter = n2, this.gridBtn = (0, i.$)(".project-archives__gridBtn", this.el), this.listBtn = (0, i.$)(".project-archives__listBtn", this.el), this.wrap = (0, i.$)(".project-archiv
          return new qs(t3);
        })), this._firstTime = true, this._view = $s, this._onGridBtnClick = this._onGridBtnClick.bind(this), this._onListBtnClick = this._onListBtnClick.bind(this), this._onTransitionCompleted = this._onTransitionComple
      }
      return js(t2, [{ key: "destroy", value: function() {
        this.listItems && this.listItems.forEach((function(t3) {
          return t3.destroy();
        })), this.el = null, this.emitter = null, this.gridBtn = null, this.listBtn = null, this.wrap = null, this.grid = null, this.list = null, this.listItems = null, this._firstTime = null, this._view = null, this._on
      } }, { key: "start", value: function() {
        this._bindEvents();
      } }, { key: "stop", value: function() {
        this.list && hi.remove(this.list), this.grid && hi.remove(this.grid), this.listItems && hi.remove(this.listItems), this._unbindEvents();
      } }, { key: "_bindEvents", value: function() {
        x(this.gridBtn, "click", this._onGridBtnClick), x(this.listBtn, "click", this._onListBtnClick);
      } }, { key: "_unbindEvents", value: function() {
        k(this.gridBtn, "click", this._onGridBtnClick), k(this.listBtn, "click", this._onListBtnClick);
      } }, { key: "_onGridBtnClick", value: function(t3) {
        t3 && (t3.preventDefault(), t3.stopImmediatePropagation()), this._view = $s, this.gridBtn.setAttribute("disabled", "disabled"), this.listBtn.removeAttribute("disabled"), this.wrap.classList.add("pointer-events-no
        var e2 = hi.timeline({ autoplay: false });
        e2.add({ targets: this.grid, opacity: 1, scale: 1, translateY: 0, delay: 100, duration: 450, easing: "easeOutCubic", complete: this._onTransitionCompleted }, 0), e2.add({ targets: this.list, translateY: "100vh", 
      } }, { key: "_onListBtnClick", value: function(t3) {
        t3 && (t3.preventDefault(), t3.stopImmediatePropagation()), this._view = "list", this.listBtn.setAttribute("disabled", "disabled"), this.gridBtn.removeAttribute("disabled"), this.wrap.classList.add("pointer-event
        var e2, i2 = wt.height, n2 = (e2 = wt.width) >= 1200 ? Ns[2] : e2 >= 768 ? Ns[1] : Ns[0], r2 = this.listItems.filter((function(t4, e3) {
          return e3 * n2 < i2;
        })), s2 = hi.timeline({ autoplay: false });
        s2.add({ targets: this.grid, opacity: { value: 0.4, easing: "linear" }, scale: 0.9, translateY: 10, duration: 650, easing: "easeOutCubic" }, 0), s2.add({ targets: this.list, translateY: this._firstTime ? ["100vh"
          return t4.animatables.forEach((function(t5) {
            return t5.target.update();
          }));
        } }, 0), this.list.classList.add("--js-animated"), this.list.setAttribute("aria-hidden", false), this._firstTime = false, s2.play();
      } }, { key: "_onTransitionCompleted", value: function() {
        this[this._view === $s ? "list" : "grid"].setAttribute("aria-hidden", true), this.list.classList.remove("--js-animated"), this.wrap.classList.remove("pointer-events-none", "overflow-clip"), this.emitter.emit("Sit
      } }]), t2;
    })(), qs = (function() {
```

## wheel-step — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L10981-10997 (hit L10989)
```js
    const Va = function(t2) {
      var e2, i2, n2 = false, r2 = function(t3) {
        (e2 = t3).cancelable && e2.preventDefault(), n2 || (requestAnimationFrame(a2), n2 = true);
      }, s2 = function() {
        t2(i2, e2), n2 = false;
      }, a2 = function() {
        if (e2) {
          var t3 = e2.type;
          "wheel" === t3 ? (i2 = e2.wheelDeltaY || -1 * e2.deltaY, s2()) : "mousewheel" === t3 && (i2 = e2.wheelDeltaY ? e2.wheelDeltaY : e2.wheelDelta, s2());
        }
      };
      return { on: function() {
        x(document, "mouseWheel", r2);
      }, off: function() {
        k(document, "mouseWheel", r2);
      } };
    };
```

## keyboard — js/app.fa8187d7bc9a8853efaa.bundle.js?v=1737489602527 L11753-11785 (hit L11763)
```js
    var Qo = "--js-site-nav-opened", tl = (function() {
      function t2(e3, n3) {
        !(function(t3, e4) {
          if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
        })(this, t2), this.el = e3, this.emitter = n3, this.bg = (0, i.$)(".site-nav__bg", this.el), this.triggers = Zo((0, i.$$)('[aria-controls="'.concat(this.el.id, '"]'))), this._opened = false, this._scrollY = 0, th
      }
      var e2, n2, r2;
      return e2 = t2, (n2 = [{ key: "destroy", value: function() {
        this._unbindEvents(), i.dy.classList.remove(Qo), this.el = null, this.emitter = null, this.bg = null, this.triggers = null, this._opened = false, this._scrollY = 0;
      } }, { key: "_bindEvents", value: function() {
        this.triggers && x(this.triggers, "click", this._handleTriggers), x(window, "keydown", this._handleKeyDown), this.emitter.on("SiteNav.toggle", this._handleTriggers), Q.on("exit", this.close, this);
      } }, { key: "_unbindEvents", value: function() {
        this.triggers && k(this.triggers, "click", this._handleTriggers), this.bg && k(this.bg, "transitionend", this._onCloseCompleted), k(window, "keydown", this._handleKeyDown), this.emitter.off("SiteNav.toggle", this
      } }, { key: "open", value: function() {
        true !== this._opened && (this._opened = true, Rt.dispatch("SITE_NAV", this._opened), this._scrollY = window.scrollY, this.bg && k(this.bg, "transitionend", this._onCloseCompleted), i.dy.classList.add(Qo), this.e
          t3.setAttribute("aria-expanded", true), t3.classList.add("is-active");
        })), this.el.setAttribute("aria-hidden", false));
      } }, { key: "close", value: function() {
        false !== this._opened && (this._opened = false, Rt.dispatch("SITE_NAV", this._opened), this.triggers.forEach((function(t3) {
          t3.setAttribute("aria-expanded", false), t3.classList.remove("is-active");
        })), this.bg && (k(this.bg, "transitionend", this._onCloseCompleted), x(this.bg, "transitionend", this._onCloseCompleted)), i.dy.classList.remove(Qo), window.scrollTo({ top: this._scrollY, behavior: "auto" }), th
      } }, { key: "toggle", value: function() {
        true === this._opened ? this.close() : this.open();
      } }, { key: "_handleTriggers", value: function(t3) {
        t3 && (t3.preventDefault(), t3.stopPropagation()), this.toggle();
      } }, { key: "_handleKeyDown", value: function(t3) {
        true !== this._opened || "Escape" !== t3.key && "Esc" !== t3.key || this.close();
      } }, { key: "_onCloseCompleted", value: function() {
        true !== this._opened && (this.emitter.emit("SiteScroll.start"), this.el.setAttribute("aria-hidden", true));
      } }, { key: "opened", get: function() {
        return this._opened;
      } }]) && Jo(e2.prototype, n2), r2 && Jo(e2, r2), t2;
    })();
```