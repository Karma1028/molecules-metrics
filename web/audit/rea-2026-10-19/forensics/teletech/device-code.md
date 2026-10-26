# teletech — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: keyboard×3, pointer×3, loader×3, observer×1, wheel-step×3, shader-uniforms×2

## keyboard — js/webflow.de5ab64c.b8f0d3582abd6255.js L713-747 (hit L730)
```js
          !(function(e4) {
            var t3 = true, n3 = false, i2 = null, a = { text: true, search: true, url: true, tel: true, email: true, password: true, number: true, date: true, month: true, week: true, time: true, datetime: true, "datetim
            function r(e5) {
              return !!e5 && e5 !== document && "HTML" !== e5.nodeName && "BODY" !== e5.nodeName && "classList" in e5 && "contains" in e5.classList;
            }
            function o(e5) {
              e5.getAttribute("data-wf-focus-visible") || e5.setAttribute("data-wf-focus-visible", "true");
            }
            function c() {
              t3 = false;
            }
            function l() {
              document.addEventListener("mousemove", d), document.addEventListener("mousedown", d), document.addEventListener("mouseup", d), document.addEventListener("pointermove", d), document.addEventListener("pointer
            }
            function d(e5) {
              e5.target.nodeName && "html" === e5.target.nodeName.toLowerCase() || (t3 = false, document.removeEventListener("mousemove", d), document.removeEventListener("mousedown", d), document.removeEventListener("mo
            }
            document.addEventListener("keydown", function(n4) {
              n4.metaKey || n4.altKey || n4.ctrlKey || (r(e4.activeElement) && o(e4.activeElement), t3 = true);
            }, true), document.addEventListener("mousedown", c, true), document.addEventListener("pointerdown", c, true), document.addEventListener("touchstart", c, true), document.addEventListener("visibilitychange", fu
              "hidden" === document.visibilityState && (n3 && (t3 = true), l());
            }, true), l(), e4.addEventListener("focus", function(e5) {
              if (r(e5.target)) {
                var n4, i3, c2;
                (t3 || (i3 = (n4 = e5.target).type, "INPUT" === (c2 = n4.tagName) && a[i3] && !n4.readOnly || "TEXTAREA" === c2 && !n4.readOnly || n4.isContentEditable || 0)) && o(e5.target);
              }
            }, true), e4.addEventListener("blur", function(e5) {
              if (r(e5.target) && e5.target.hasAttribute("data-wf-focus-visible")) {
                var t4;
                n3 = true, window.clearTimeout(i2), i2 = window.setTimeout(function() {
                  n3 = false;
                }, 100), (t4 = e5.target).getAttribute("data-wf-focus-visible") && t4.removeAttribute("data-wf-focus-visible");
              }
            }, true);
          })(document);
```

## pointer — js/webflow.de5ab64c.b8f0d3582abd6255.js L1003-1031 (hit L1028)
```js
      function i2(t4) {
        var i3, a, r = false, o = false, c = Math.min(Math.round(0.04 * window.innerWidth), 40);
        function l(e4) {
          var t5 = e4.touches;
          t5 && t5.length > 1 || (r = true, t5 ? (o = true, i3 = t5[0].clientX) : i3 = e4.clientX, a = i3);
        }
        function d(t5) {
          if (r) {
            if (o && "mousemove" === t5.type) {
              t5.preventDefault(), t5.stopPropagation();
              return;
            }
            var i4, l2, d2, s2, f = t5.touches, p = f ? f[0].clientX : t5.clientX, g = p - a;
            a = p, Math.abs(g) > c && n3 && "" === String(n3()) && (i4 = "swipe", l2 = t5, d2 = { direction: g > 0 ? "right" : "left" }, s2 = e3.Event(i4, { originalEvent: l2 }), e3(l2.target).trigger(s2, d2), u());
          }
        }
        function s(e4) {
          if (r && (r = false, o && "mouseup" === e4.type)) {
            e4.preventDefault(), e4.stopPropagation(), o = false;
            return;
          }
        }
        function u() {
          r = false;
        }
        t4.addEventListener("touchstart", l, false), t4.addEventListener("touchmove", d, false), t4.addEventListener("touchend", s, false), t4.addEventListener("touchcancel", u, false), t4.addEventListener("mousedown", l
          t4.removeEventListener("touchstart", l, false), t4.removeEventListener("touchmove", d, false), t4.removeEventListener("touchend", s, false), t4.removeEventListener("touchcancel", u, false), t4.removeEventListen
        };
      }
```

## keyboard — js/webflow.de5ab64c.b8f0d3582abd6255.js L1030-1070 (hit L1045)
```js
        };
      }
      return e3.event.special.tap = { bindType: "click", delegateType: "click" }, t3.init = function(t4) {
        return (t4 = "string" == typeof t4 ? e3(t4).get(0) : t4) ? new i2(t4) : null;
      }, t3.instance = t3.init(document), t3;
    });
  }, 9858: function(e2, t2, n2) {
    "use strict";
    var i2 = n2(3949), a = n2(5134);
    let r = { ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40, ESCAPE: 27, SPACE: 32, ENTER: 13, HOME: 36, END: 35 };
    function o(e3, t3) {
      a.dispatchCustomEvent(e3, "IX3_COMPONENT_STATE_CHANGE", { component: "dropdown", state: t3 });
    }
    let c = /^#[a-zA-Z0-9\-_]+$/;
    i2.define("dropdown", e2.exports = function(e3, t3) {
      var n3, l, d = t3.debounce, s = {}, u = i2.env(), f = false, p = i2.env.touch, g = ".w-dropdown", E = "w--open", y = a.triggers, m = "focusout" + g, b = "keydown" + g, I = "mouseenter" + g, T = "mousemove" + g, O =
      function R() {
        n3 = u && i2.env("design"), (l = A.find(g)).each(S);
      }
      function S(t4, a2) {
        var o2, l2, s2, f2, p2, y2, T2, O2, R2, S2, P = e3(a2), U = e3.data(a2, g);
        U || (U = e3.data(a2, g, { open: false, el: P, config: {}, selectedIdx: -1 })), U.toggle = U.el.children(".w-dropdown-toggle"), U.list = U.el.children(".w-dropdown-list"), U.links = U.list.find("a:not(.w-dropdown
          o2.list.removeClass(E), o2.toggle.removeClass(E), o2.manageZ && o2.el.css("z-index", "");
        }), U.mouseLeave = (l2 = U, function() {
          l2.hovering = false, l2.links.is(":focus") || w(l2);
        }), U.mouseUpOutside = ((s2 = U).mouseUpOutside && A.off(h, s2.mouseUpOutside), d(function(t5) {
          if (s2.open) {
            var n4 = e3(t5.target);
            if (!n4.closest(".w-dropdown-toggle").length) {
              var a3 = -1 === e3.inArray(s2.el[0], n4.parents(g)), r2 = i2.env("editor");
              if (a3) {
                if (r2) {
                  var o3 = 1 === n4.parents().length && 1 === n4.parents("svg").length, c2 = n4.parents(".w-editor-bem-EditorHoverControls").length;
                  if (o3 || c2) return;
                }
                w(s2);
              }
            }
          }
        })), U.mouseMoveOutside = (f2 = U, d(function(t5) {
          if (f2.open) {
```

## keyboard — js/webflow.de5ab64c.b8f0d3582abd6255.js L1207-1236 (hit L1210)
```js
            if (n3.fileUploads && n3.fileUploads[t6]) {
              var i3, a2 = e3(n3.fileUploads[t6]), r3 = a2.find("> .w-file-upload-default"), o2 = a2.find("> .w-file-upload-uploading"), c3 = a2.find("> .w-file-upload-success"), l2 = a2.find("> .w-file-upload-error"), d
              if (T || s2.on("click keydown", function(e4) {
                ("keydown" !== e4.type || 13 === e4.which || 32 === e4.which) && (e4.preventDefault(), d3.click());
              }), s2.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"), E3.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"), T) d3.on("click", function(e4) {
                e4.preventDefault();
              }), s2.on("click", function(e4) {
                e4.preventDefault();
              }), f3.on("click", function(e4) {
                e4.preventDefault();
              });
              else {
                E3.on("click keydown", function(e4) {
                  if ("keydown" === e4.type) {
                    if (13 !== e4.which && 32 !== e4.which) return;
                    e4.preventDefault();
                  }
                  d3.removeAttr("data-value"), d3.val(""), y2.html(""), r3.toggle(true), c3.toggle(false), s2.focus();
                }), d3.on("change", function(a3) {
                  var c4, d4, s3;
                  (i3 = a3.target && a3.target.files && a3.target.files[0]) && (r3.toggle(false), l2.toggle(false), o2.toggle(true), o2.focus(), y2.text(i3.name), S2() || R(n3), n3.fileUploads[t6].uploading = true, c4 = 
                    d4(null, e4);
                  }).fail(function(e4) {
                    d4(e4);
                  }));
                });
                var O2 = s2.outerHeight();
                d3.height(O2), d3.width(1);
              }
            }
```

## loader — js/webflow.de5ab64c.b8f0d3582abd6255.js L1206-1263 (hit L1239)
```js
          !(function(t6, n3) {
            if (n3.fileUploads && n3.fileUploads[t6]) {
              var i3, a2 = e3(n3.fileUploads[t6]), r3 = a2.find("> .w-file-upload-default"), o2 = a2.find("> .w-file-upload-uploading"), c3 = a2.find("> .w-file-upload-success"), l2 = a2.find("> .w-file-upload-error"), d
              if (T || s2.on("click keydown", function(e4) {
                ("keydown" !== e4.type || 13 === e4.which || 32 === e4.which) && (e4.preventDefault(), d3.click());
              }), s2.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"), E3.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"), T) d3.on("click", function(e4) {
                e4.preventDefault();
              }), s2.on("click", function(e4) {
                e4.preventDefault();
              }), f3.on("click", function(e4) {
                e4.preventDefault();
              });
              else {
                E3.on("click keydown", function(e4) {
                  if ("keydown" === e4.type) {
                    if (13 !== e4.which && 32 !== e4.which) return;
                    e4.preventDefault();
                  }
                  d3.removeAttr("data-value"), d3.val(""), y2.html(""), r3.toggle(true), c3.toggle(false), s2.focus();
                }), d3.on("change", function(a3) {
                  var c4, d4, s3;
                  (i3 = a3.target && a3.target.files && a3.target.files[0]) && (r3.toggle(false), l2.toggle(false), o2.toggle(true), o2.focus(), y2.text(i3.name), S2() || R(n3), n3.fileUploads[t6].uploading = true, c4 = 
                    d4(null, e4);
                  }).fail(function(e4) {
                    d4(e4);
                  }));
                });
                var O2 = s2.outerHeight();
                d3.height(O2), d3.width(1);
              }
            }
            function h2(e4) {
              var i4 = e4.responseJSON && e4.responseJSON.msg, a3 = I2;
              "string" == typeof i4 && 0 === i4.indexOf("InvalidFileTypeError") ? a3 = b2 : "string" == typeof i4 && 0 === i4.indexOf("MaxFileSizeError") && (a3 = m3), p2.text(a3), d3.removeAttr("data-value"), d3.val("")
            }
            function v2(t7, n4) {
              if (t7) return h2(t7);
              var a3 = n4.fileName, r4 = n4.postData, o3 = n4.fileId, c4 = n4.s3Url;
              d3.attr("data-value", o3), (function(t8, n5, i4, a4, r5) {
                var o4 = new FormData();
                for (var c5 in n5) o4.append(c5, n5[c5]);
                o4.append("file", i4, a4), e3.ajax({ type: "POST", url: t8, data: o4, processData: false, contentType: false }).done(function() {
                  r5(null);
                }).fail(function(e4) {
                  r5(e4);
                });
              })(c4, r4, i3, a3, _2);
            }
            function _2(e4) {
              if (e4) return h2(e4);
              o2.toggle(false), c3.css("display", "inline-block"), c3.focus(), n3.fileUploads[t6].uploading = false, S2() || A(n3);
            }
            function S2() {
              return (n3.fileUploads && n3.fileUploads.toArray() || []).some(function(e4) {
                return e4.uploading;
              });
            }
          })(t5, d2);
```

## observer — js/webflow.de5ab64c.b8f0d3582abd6255.js L1267-1281 (hit L1276)
```js
        })(d2), S(c2, true), p.on("undefined" != typeof turnstile ? "ready" : o, function() {
          function e4() {
            a(O, r2, (e5) => {
              d2.turnstileToken = e5, A(d2), S(c2, false);
            }, () => {
              A(d2), d2.btn && d2.btn.prop("disabled", true), S(c2, false);
            });
          }
          if ("undefined" != typeof IntersectionObserver) {
            var t5 = new IntersectionObserver(function(n3) {
              n3[0].isIntersecting && (t5.disconnect(), e4());
            }, { rootMargin: "200px" });
            t5.observe(r2);
          } else e4();
        }));
```

## loader — js/webflow.de5ab64c.b8f0d3582abd6255.js L1925-1932 (hit L1927)
```js
    }, el = (e3) => (t3, n3 = {}) => {
      let i3, a2, { stiffScrollTop: r2, scrollHeight: o2, innerHeight: c2 } = en(), { event: { config: l2, eventTypeId: d2 } } = t3, { scrollOffsetValue: s2, scrollOffsetUnit: u2 } = l2, f2 = o2 - c2, p2 = Number((r2 / f
      if (n3 && n3.percentTop === p2) return n3;
      let g2 = ("PX" === u2 ? s2 : c2 * (s2 || 0) / 100) / f2, E2 = 0;
      n3 && (i3 = p2 > n3.percentTop, E2 = (a2 = n3.scrollingDown !== i3) ? p2 : n3.anchorTop);
      let y2 = d2 === S ? p2 >= E2 + g2 : p2 <= E2 - g2, m2 = { ...n3, percentTop: p2, inBounds: y2, anchorTop: E2, scrollingDown: i3 };
      return n3 && y2 && (a2 || m2.inBounds !== n3.inBounds) && e3(t3, m2) || m2;
    }, ed = (e3, t3) => e3.left > t3.left && e3.left < t3.right && e3.top > t3.top && e3.top < t3.bottom, es = (e3) => (t3, n3 = { clickCount: 0 }) => {
```

## loader — js/webflow.de5ab64c.b8f0d3582abd6255.js L1974-1986 (hit L1974)
```js
    } }, [w]: { types: Z, handler: ({ element: e3, store: t3, eventConfig: n3, eventStateKey: i3 }, a2 = { scrollPercent: 0 }) => {
      let { scrollLeft: r2, scrollTop: o2, scrollWidth: l2, scrollHeight: s2, clientHeight: u2 } = en(), { basedOn: f2, selectedAxis: p2, continuousParameterGroupId: g2, startsEntering: E2, startsExiting: y2, addEndOffse
      if (f2 === c.EventBasedOn.VIEWPORT) {
        let e4 = "X_AXIS" === p2 ? r2 / l2 : o2 / s2;
        return e4 !== a2.scrollPercent && t3.dispatch((0, d.parameterChanged)(g2, e4)), { scrollPercent: e4 };
      }
      {
        let n4 = D(i3, g2), r3 = e3.getBoundingClientRect(), o3 = (b2 ? I2 : 0) / 100, c2 = (m2 ? T2 : 0) / 100;
        o3 = E2 ? o3 : 1 - o3, c2 = y2 ? c2 : 1 - c2;
        let l3 = r3.top + Math.min(r3.height * o3, u2), f3 = Math.min(u2 + (r3.top + r3.height * c2 - l3), s2), p3 = Math.min(Math.max(0, u2 - l3), f3) / f3;
        return p3 !== a2.scrollPercent && t3.dispatch((0, d.parameterChanged)(n4, p3)), { scrollPercent: p3 };
      }
    } }, [N]: ep, [L]: ep, [S]: { ...ee, handler: el((e3, t3) => {
```

## wheel-step — assets.teletech.events/OrbitControls.js L154-164 (hit L158)
```js
      this.dispose = function() {
        scope.domElement.removeEventListener("contextmenu", onContextMenu);
        scope.domElement.removeEventListener("pointerdown", onPointerDown);
        scope.domElement.removeEventListener("pointercancel", onPointerCancel);
        scope.domElement.removeEventListener("wheel", onMouseWheel);
        scope.domElement.removeEventListener("pointermove", onPointerMove);
        scope.domElement.removeEventListener("pointerup", onPointerUp);
        if (scope._domElementKeyEvents !== null) {
          scope._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
        }
      };
```

## wheel-step — assets.teletech.events/OrbitControls.js L229-245 (hit L229)
```js
        return function pan2(deltaX, deltaY) {
          const element = scope.domElement;
          if (scope.object.isPerspectiveCamera) {
            const position = scope.object.position;
            offset.copy(position).sub(scope.target);
            let targetDistance = offset.length();
            targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180);
            panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
            panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
          } else if (scope.object.isOrthographicCamera) {
            panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
            panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
          } else {
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
            scope.enablePan = false;
          }
        };
```

## wheel-step — assets.teletech.events/OrbitControls.js L307-314 (hit L308)
```js
      function handleMouseWheel(event) {
        if (event.deltaY < 0) {
          dollyIn(getZoomScale());
        } else if (event.deltaY > 0) {
          dollyOut(getZoomScale());
        }
        scope.update();
      }
```

## pointer — assets.teletech.events/OrbitControls.js L418-431 (hit L422)
```js
      function onPointerDown(event) {
        if (scope.enabled === false) return;
        if (pointers.length === 0) {
          scope.domElement.setPointerCapture(event.pointerId);
          scope.domElement.addEventListener("pointermove", onPointerMove);
          scope.domElement.addEventListener("pointerup", onPointerUp);
        }
        addPointer(event);
        if (event.pointerType === "touch") {
          onTouchStart(event);
        } else {
          onMouseDown(event);
        }
      }
```

## pointer — assets.teletech.events/ttaudioplayer.js L306-319 (hit L311)
```js
      self.$progressBarWrapper.on("mousedown touchstart", function(event) {
        event.preventDefault();
        if (self.audio.readyState === 0) return false;
        self.isDragging = true;
        self.scrubSong(event);
        $(document2).on("mousemove.trueAudioPlayer touchmove.trueAudioPlayer", function(event2) {
          self.scrubSong(event2);
        });
        $(document2).one("mouseup touchend", function() {
          $(document2).off("mousemove.trueAudioPlayer touchmove.trueAudioPlayer");
          self.audio.currentTime = self.tempCurrentTime;
          self.isDragging = false;
        });
      });
```

## shader-uniforms — assets.teletech.events/GLTFLoader.js L809-849 (hit L824)
```js
        }
      };
      this._extraUniforms = uniforms;
      this.onBeforeCompile = function(shader) {
        for (const uniformName in uniforms) {
          shader.uniforms[uniformName] = uniforms[uniformName];
        }
        shader.fragmentShader = shader.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fr
      };
      Object.defineProperties(this, {
        specular: {
          get: function() {
            return uniforms.specular.value;
          },
          set: function(v) {
            uniforms.specular.value = v;
          }
        },
        specularMap: {
          get: function() {
            return uniforms.specularMap.value;
          },
          set: function(v) {
            uniforms.specularMap.value = v;
            if (v) {
              this.defines.USE_SPECULARMAP = "";
            } else {
              delete this.defines.USE_SPECULARMAP;
            }
          }
        },
        glossiness: {
          get: function() {
            return uniforms.glossiness.value;
          },
          set: function(v) {
            uniforms.glossiness.value = v;
          }
        },
        glossinessMap: {
          get: function() {
```

## shader-uniforms — assets.teletech.events/GLTFLoader.js L852-861 (hit L853)
```js
          set: function(v) {
            uniforms.glossinessMap.value = v;
            if (v) {
              this.defines.USE_GLOSSINESSMAP = "";
              this.defines.USE_UV = "";
            } else {
              delete this.defines.USE_GLOSSINESSMAP;
              delete this.defines.USE_UV;
            }
          }
```