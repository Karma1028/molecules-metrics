# gataperduda — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: keyboard×3, page-transition×3, audio×3, pointer×3, loader×3, raf-lerp×3, wheel-step×3, text-split×2, observer×1, reveal-timeline×2

## keyboard — beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092 L420-433 (hit L420)
```js
          const r3 = ["keydown", "click", "visibilitychange"], s3 = (t4) => {
            if (t4.isTrusted && !n3) {
              const t5 = a2.id;
              q(() => {
                if (!n3) {
                  if (!i3) {
                    f2.disconnect();
                    for (const t6 of r3) removeEventListener(t6, s3, { capture: true });
                  }
                  t5 === a2.id && (n3 = true, o2(true));
                }
              });
            }
          };
```

## page-transition — beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092 L860-863 (hit L863)
```js
    })(), N2 || (yt = window.history, (wt = yt.pushState) && (yt.pushState = function(t3, e3, n2) {
      const i3 = rt(n2);
      return O2 != i3 && (gt(O2), ht(), E2(i3, { navigationType: r.RoutingApis }), vt(i3), O2 = i3), wt.apply(yt, [t3, e3, n2]);
    }, window.addEventListener("popstate", function(t3) {
```

## page-transition — cdn.usefathom.com/script.js L10-18 (hit L12)
```js
  function spaHistory() {
    var pushState;
    void 0 !== history && (pushState = history.pushState, history.pushState = function() {
      var ret = pushState.apply(history, arguments);
      return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchangefathom")), ret;
    }, window.addEventListener("popstate", function() {
      window.dispatchEvent(new Event("locationchangefathom"));
    }), window.addEventListener("locationchangefathom", trackPageview));
  }
```

## audio — _nuxt/2521c0a.js L72-75 (hit L74)
```js
  }, watch: { $route: function(e2) {
    var r2 = y(e2), n2 = v(e2);
    r2 ? this.soundAmbience.fade(this.soundAmbience.volume(), 1, 2e3) : this.soundAmbience.fade(this.soundAmbience.volume(), 0.5, 2e3), n2 && 1 !== this.activeIdleSound.volume() && this.activeIdleSound.fade(this.activeId
  } }, mounted: function() {
```

## audio — _nuxt/2521c0a.js L75-110 (hit L93)
```js
  } }, mounted: function() {
    var e2 = this;
    this.isPointerFine = window.matchMedia("(pointer:fine)").matches, this.isInstallationMode = Object(m.d)(), c.a.to(".main-container", { opacity: 1, delay: 0.25 });
    var r2 = null, n2 = null;
    this.isInstallationMode && (window.addEventListener("touchstart", (function() {
      n2 && clearTimeout(n2), e2.$store.commit("isShortInactive", false), r2 && clearTimeout(r2);
    })), window.addEventListener("touchend", (function(o3) {
      0 === o3.touches.length && (n2 = setTimeout((function() {
        window.postMessage("isLongInactive"), e2.$router.replace("/");
      }), 18e4), r2 = setTimeout((function() {
        e2.$store.commit("isShortInactive", true);
      }), 2e4));
    }))), this.soundAmbience = new d.Howl({ src: ["/sounds/ambient_raval.mp3"], autoplay: true, volume: 0 });
    var o2 = new d.Howl({ src: ["/sounds/idle.mp3"], autoplay: true, loop: false, volume: 0 });
    this.activeIdleSound = o2;
    var t2 = new d.Howl({ src: ["/sounds/idle.mp3"], autoplay: false, loop: false, volume: 0 });
    this.soundAmbience.once("play", (function() {
      var r3 = e2.$route.name.includes("mapa");
      e2.soundAmbience.fade(0, r3 ? 1 : 0.5, 3e3);
    })), o2.once("play", (function() {
      v(e2.$route) && o2.fade(0, 1, 3e3);
    }));
    var l2 = false;
    setInterval((function() {
      !l2 && "loaded" === o2.state() && o2.seek() >= o2.duration() - 10 && (console.log("starting fade"), l2 = true, o2.fade(e2.activeIdleSound.volume(), 0, 5e3), o2.once("fade", (function() {
        console.log("faded out"), o2.stop();
      })), e2.activeIdleSound = t2, t2.play(), v(e2.$route) ? (t2.fade(0, 1, 5e3), t2.once("fade", (function() {
        console.log("faded in"), l2 = false;
      }))) : l2 = false);
      !l2 && "loaded" === t2.state() && t2.seek() >= t2.duration() - 10 && (console.log("starting fade"), l2 = true, t2.fade(e2.activeIdleSound.volume(), 0, 5e3), t2.once("fade", (function() {
        console.log("faded out"), t2.stop();
      })), e2.activeIdleSound = o2, o2.play(), v(e2.$route) ? (o2.fade(0, 1, 5e3), o2.once("fade", (function() {
        console.log("faded in"), l2 = false;
      }))) : l2 = false);
    }), 500);
  }, methods: { toggleMutePage: function() {
```

## pointer — _nuxt/2521c0a.js L175-221 (hit L182)
```js
  }, y = c.a.extend({ mounted: function() {
    var e2 = Object(m.d)();
    h();
    window.addEventListener("resize", (function() {
      h();
    }));
    var r2 = { x: 0, y: 0 };
    window.addEventListener("pointermove", (function(e3) {
      return r2 = f(e3);
    }));
    var cursor = new ((function() {
      return Object(l.a)((function n3(o2) {
        var l2 = this;
        Object(t.a)(this, n3), this.DOM = { el: o2 }, this.DOM.el.style.opacity = 0, this.DOM.circleInner = this.DOM.el.querySelector(".cursor__inner"), this.bounds = this.DOM.el.getBoundingClientRect(), this.renderedSty
          var n4 = f(e3.touches[0]);
          r2 = n4, l2.renderedStyles.tx.previous = l2.renderedStyles.tx.current = r2.x - l2.bounds.width / 2, l2.renderedStyles.ty.previous = l2.renderedStyles.ty.current = r2.y - l2.bounds.height / 2, d.a.to(l2.DOM.el, 
        })), window.addEventListener("touchend", (function(e3) {
          0 === e3.touches.length && (d.a.to(l2.DOM.el, { duration: 0.5, ease: "Power3.easeOut", opacity: 0 }), l2.renderedStyles.radius.current = 0);
        })), this.render(), this.onMouseMoveEv = function() {
          l2.renderedStyles.tx.previous = l2.renderedStyles.tx.current = r2.x - l2.bounds.width / 2, l2.renderedStyles.ty.previous = l2.renderedStyles.ty.current = r2.y - l2.bounds.height / 2, d.a.to(l2.DOM.el, { duratio
        }, window.addEventListener("pointermove", this.onMouseMoveEv);
      }), [{ key: "render", value: function() {
        var a, b, e3, n3 = this;
        for (var o2 in this.renderedStyles.tx.current = r2.x - this.bounds.width / 2, this.renderedStyles.ty.current = r2.y - this.bounds.height / 2, this.renderedStyles) this.renderedStyles[o2].previous = (a = this.rend
        this.DOM.el.style.transform = "translateX(".concat(this.renderedStyles.tx.previous, "px) translateY(").concat(this.renderedStyles.ty.previous, "px)"), this.DOM.circleInner.setAttribute("r", this.renderedStyles.ra
          return n3.render();
        }));
      } }, { key: "enter", value: function() {
        this.renderedStyles.radius.current = 60;
      } }, { key: "leave", value: function() {
        this.renderedStyles.radius.current = 30;
      } }]);
    })())(document.querySelector(".cursor")), n2 = function() {
      return cursor.enter();
    }, c2 = function() {
      return cursor.leave();
    }, y2 = [], v2 = function() {
      (y2 = Object(o.a)(document.querySelectorAll("a"))).forEach((function(e3) {
        e3.addEventListener("mouseenter", n2), e3.addEventListener("mouseleave", c2);
      }));
    };
    document.body.addEventListener("after-page-enter", (function() {
      c2(), y2.forEach((function(e3) {
        e3.removeEventListener("mouseenter", n2), e3.removeEventListener("mouseleave", c2);
      })), y2 = [], v2();
    })), document.body.addEventListener("cursor-enter", n2), document.body.addEventListener("cursor-leave", c2), v2();
  } }), v = (n(398), n(26)), component = Object(v.a)(y, (function() {
```

## loader — _nuxt/5314391.js L996-1020 (hit L1014)
```js
          if (f(t3.cid) && (t3 = (function(t4, e3) {
            if (h(t4.error) && l(t4.errorComp)) return t4.errorComp;
            if (l(t4.resolved)) return t4.resolved;
            var n3 = Le;
            if (n3 && l(t4.owners) && -1 === t4.owners.indexOf(n3) && t4.owners.push(n3), h(t4.loading) && l(t4.loadingComp)) return t4.loadingComp;
            if (n3 && !l(t4.owners)) {
              var r3 = t4.owners = [n3], o2 = true, c2 = null, d3 = null;
              n3.$on("hook:destroyed", (function() {
                return j(r3, n3);
              }));
              var v3 = function(t5) {
                for (var i = 0, e4 = r3.length; i < e4; i++) r3[i].$forceUpdate();
                t5 && (r3.length = 0, null !== c2 && (clearTimeout(c2), c2 = null), null !== d3 && (clearTimeout(d3), d3 = null));
              }, m3 = K((function(n4) {
                t4.resolved = Me(n4, e3), o2 ? r3.length = 0 : v3(true);
              })), w3 = K((function(e4) {
                l(t4.errorComp) && (t4.error = true, v3(true));
              })), _3 = t4(m3, w3);
              return y(_3) && (O(_3) ? f(t4.resolved) && _3.then(m3, w3) : O(_3.component) && (_3.component.then(m3, w3), l(_3.error) && (t4.errorComp = Me(_3.error, e3)), l(_3.loading) && (t4.loadingComp = Me(_3.loading
                c2 = null, f(t4.resolved) && f(t4.error) && (t4.loading = true, v3(false));
              }), _3.delay || 200)), l(_3.timeout) && (d3 = setTimeout((function() {
                d3 = null, f(t4.resolved) && w3(null);
              }), _3.timeout)))), o2 = false, t4.loading ? t4.loadingComp : t4.resolved;
            }
          })(v2 = t3, d2), void 0 === t3)) return (function(t4, data2, e3, n3, r3) {
```

## raf-lerp — _nuxt/5314391.js L2793-2851 (hit L2828)
```js
        return _.test(t4) ? "xn--" + (function(t5) {
          var e3, n3 = [], r3 = (t5 = (function(t6) {
            for (var e4 = [], n4 = 0, r4 = t6.length; n4 < r4; ) {
              var o3 = t6.charCodeAt(n4++);
              if (o3 >= 55296 && o3 <= 56319 && n4 < r4) {
                var c3 = t6.charCodeAt(n4++);
                56320 == (64512 & c3) ? e4.push(((1023 & o3) << 10) + (1023 & c3) + 65536) : (e4.push(o3), n4--);
              } else e4.push(o3);
            }
            return e4;
          })(t5)).length, o2 = 128, i = 0, c2 = 72, f2 = m(t5);
          try {
            for (f2.s(); !(e3 = f2.n()).done; ) {
              var l2 = e3.value;
              l2 < 128 && n3.push(A(l2));
            }
          } catch (t6) {
            f2.e(t6);
          } finally {
            f2.f();
          }
          var h2 = n3.length, p = h2;
          for (h2 && n3.push("-"); p < r3; ) {
            var d2, v2 = 2147483647, y2 = m(t5);
            try {
              for (y2.s(); !(d2 = y2.n()).done; ) {
                var w2 = d2.value;
                w2 >= o2 && w2 < v2 && (v2 = w2);
              }
            } catch (t6) {
              y2.e(t6);
            } finally {
              y2.f();
            }
            var a = p + 1;
            v2 - o2 > S((2147483647 - i) / a) && E("overflow"), i += (v2 - o2) * a, o2 = v2;
            var _2, x2 = m(t5);
            try {
              for (x2.s(); !(_2 = x2.n()).done; ) {
                var O2 = _2.value;
                if (O2 < o2 && ++i > 2147483647 && E("overflow"), O2 == o2) {
                  for (var T2 = i, j2 = 36; ; j2 += 36) {
                    var C2 = j2 <= c2 ? 1 : j2 >= c2 + 26 ? 26 : j2 - c2;
                    if (T2 < C2) break;
                    var I2 = T2 - C2, $2 = 36 - C2;
                    n3.push(A(k(C2 + I2 % $2, 0))), T2 = S(I2 / $2);
                  }
                  n3.push(A(k(T2, 0))), c2 = u(i, a, p == h2), i = 0, ++p;
                }
              }
            } catch (t6) {
              x2.e(t6);
            } finally {
              x2.f();
            }
            ++i, ++o2;
          }
          return n3.join("");
        })(t4) : t4;
```

## raf-lerp — _nuxt/5314391.js L3865-3923 (hit L3900)
```js
        return w.test(t4) ? "xn--" + (function(t5) {
          var e3, n3 = [], r3 = (t5 = (function(t6) {
            for (var e4 = [], n4 = 0, r4 = t6.length; n4 < r4; ) {
              var o3 = t6.charCodeAt(n4++);
              if (o3 >= 55296 && o3 <= 56319 && n4 < r4) {
                var c3 = t6.charCodeAt(n4++);
                56320 == (64512 & c3) ? e4.push(((1023 & o3) << 10) + (1023 & c3) + 65536) : (e4.push(o3), n4--);
              } else e4.push(o3);
            }
            return e4;
          })(t5)).length, o2 = 128, i = 0, c2 = 72, f2 = y(t5);
          try {
            for (f2.s(); !(e3 = f2.n()).done; ) {
              var l2 = e3.value;
              l2 < 128 && n3.push(S(l2));
            }
          } catch (t6) {
            f2.e(t6);
          } finally {
            f2.f();
          }
          var h2 = n3.length, p = h2;
          for (h2 && n3.push("-"); p < r3; ) {
            var d2, v2 = 2147483647, m2 = y(t5);
            try {
              for (m2.s(); !(d2 = m2.n()).done; ) {
                var w2 = d2.value;
                w2 >= o2 && w2 < v2 && (v2 = w2);
              }
            } catch (t6) {
              m2.e(t6);
            } finally {
              m2.f();
            }
            var a = p + 1;
            v2 - o2 > O((2147483647 - i) / a) && s("overflow"), i += (v2 - o2) * a, o2 = v2;
            var _2, x2 = y(t5);
            try {
              for (x2.s(); !(_2 = x2.n()).done; ) {
                var E2 = _2.value;
                if (E2 < o2 && ++i > 2147483647 && s("overflow"), E2 == o2) {
                  for (var k2 = i, T2 = 36; ; T2 += 36) {
                    var j2 = T2 <= c2 ? 1 : T2 >= c2 + 26 ? 26 : T2 - c2;
                    if (k2 < j2) break;
                    var C2 = k2 - j2, I2 = 36 - j2;
                    n3.push(S(A(j2 + C2 % I2, 0))), k2 = O(C2 / I2);
                  }
                  n3.push(S(A(k2, 0))), c2 = u(i, a, p == h2), i = 0, ++p;
                }
              }
            } catch (t6) {
              x2.e(t6);
            } finally {
              x2.f();
            }
            ++i, ++o2;
          }
          return n3.join("");
        })(t4) : t4;
```

## page-transition — _nuxt/5314391.js L6722-6728 (hit L6725)
```js
  function gt() {
    "scrollRestoration" in window.history && (window.history.scrollRestoration = "manual");
    var t2 = window.location.protocol + "//" + window.location.host, e2 = window.location.href.replace(t2, ""), n2 = r({}, window.history.state);
    return n2.key = ht(), window.history.replaceState(n2, "", e2), window.addEventListener("popstate", wt), function() {
      window.removeEventListener("popstate", wt);
    };
  }
```

## raf-lerp — _nuxt/5314391.js L10129-10164 (hit L10149)
```js
  }, k = function(input) {
    var output = [];
    input = (function(t3) {
      for (var output2 = [], e3 = 0, n3 = t3.length; e3 < n3; ) {
        var r3 = m(t3, e3++);
        if (r3 >= 55296 && r3 <= 56319 && e3 < n3) {
          var o2 = m(t3, e3++);
          56320 == (64512 & o2) ? _(output2, ((1023 & r3) << 10) + (1023 & o2) + 65536) : (_(output2, r3), e3--);
        } else _(output2, r3);
      }
      return output2;
    })(input);
    var i, t2, e2 = input.length, n2 = 128, r2 = 0, c2 = 72;
    for (i = 0; i < input.length; i++) (t2 = input[i]) < 128 && _(output, y(t2));
    var f2 = output.length, d2 = f2;
    for (f2 && _(output, "-"); d2 < e2; ) {
      var x2 = o;
      for (i = 0; i < input.length; i++) (t2 = input[i]) >= n2 && t2 < x2 && (x2 = t2);
      var O2 = d2 + 1;
      if (x2 - n2 > v((o - r2) / O2)) throw new h(l);
      for (r2 += (x2 - n2) * O2, n2 = x2, i = 0; i < input.length; i++) {
        if ((t2 = input[i]) < n2 && ++r2 > o) throw new h(l);
        if (t2 === n2) {
          for (var q = r2, S2 = 36; ; ) {
            var k2 = S2 <= c2 ? 1 : S2 >= c2 + 26 ? 26 : S2 - c2;
            if (q < k2) break;
            var T = q - k2, j = 36 - k2;
            _(output, y(A(k2 + T % j))), q = v(T / j), S2 += 36;
          }
          _(output, y(A(q))), c2 = E(r2, O2, d2 === f2), r2 = 0, d2++;
        }
      }
      r2++, n2++;
    }
    return w(output, "");
  };
```

## wheel-step — _nuxt/5be642c.js L95-98 (hit L96)
```js
      }, Ge2 = function() {
        var e4 = Ae2.deltaX = G(Le2), r4 = Ae2.deltaY = G(We2), n4 = Math.abs(e4) >= t3, o3 = Math.abs(r4) >= t3;
        ie2 && (n4 || o3) && ie2(Ae2, e4, r4, Le2, We2), n4 && (Q2 && Ae2.deltaX > 0 && Q2(Ae2), ee2 && Ae2.deltaX < 0 && ee2(Ae2), ne2 && ne2(Ae2), ae2 && Ae2.deltaX < 0 != Re2 < 0 && ae2(Ae2), Re2 = Ae2.deltaX, Le2[0] 
      }, je2 = function(e4, t4, r4) {
```

## wheel-step — _nuxt/5be642c.js L93-133 (hit L108)
```js
      }, Ve2 = function(e4, t4) {
        return (Ae2.event = e4) && A2 && ~A2.indexOf(e4.target) || t4 && Ne2 && "touch" !== e4.pointerType || fe2 && fe2(e4, t4);
      }, Ge2 = function() {
        var e4 = Ae2.deltaX = G(Le2), r4 = Ae2.deltaY = G(We2), n4 = Math.abs(e4) >= t3, o3 = Math.abs(r4) >= t3;
        ie2 && (n4 || o3) && ie2(Ae2, e4, r4, Le2, We2), n4 && (Q2 && Ae2.deltaX > 0 && Q2(Ae2), ee2 && Ae2.deltaX < 0 && ee2(Ae2), ne2 && ne2(Ae2), ae2 && Ae2.deltaX < 0 != Re2 < 0 && ae2(Ae2), Re2 = Ae2.deltaX, Le2[0] 
      }, je2 = function(e4, t4, r4) {
        Le2[r4] += e4, We2[r4] += t4, Ae2._vx.update(e4), Ae2._vy.update(t4), S2 ? Ce2 || (Ce2 = requestAnimationFrame(Ge2)) : Ge2();
      }, Je2 = function(e4, t4) {
        _e2 && !Oe2 && (Ae2.axis = Oe2 = Math.abs(e4) > Math.abs(t4) ? "x" : "y", Me2 = true), "y" !== Oe2 && (Le2[2] += e4, Ae2._vx.update(e4, true)), "x" !== Oe2 && (We2[2] += t4, Ae2._vy.update(t4, true)), S2 ? Ce2 ||
      }, Ke2 = function(e4) {
        if (!Ve2(e4, 1)) {
          var t4 = (e4 = V(e4, T2)).clientX, n4 = e4.clientY, o3 = t4 - Ae2.x, l2 = n4 - Ae2.y, c2 = Ae2.isDragging;
          Ae2.x = t4, Ae2.y = n4, (c2 || Math.abs(Ae2.startX - t4) >= r3 || Math.abs(Ae2.startY - n4) >= r3) && (K2 && (Te2 = true), c2 || (Ae2.isDragging = true), Je2(o3, l2), c2 || z2 && z2(Ae2));
        }
      }, Ze2 = Ae2.onPress = function(e4) {
        Ve2(e4, 1) || e4 && e4.button || (Ae2.axis = Oe2 = null, Se2.pause(), Ae2.isPressed = true, e4 = V(e4), Re2 = De2 = 0, Ae2.startX = Ae2.x = e4.clientX, Ae2.startY = Ae2.y = e4.clientY, Ae2._vx.reset(), Ae2._vy.re
      }, $e2 = Ae2.onRelease = function(e4) {
        if (!Ve2(e4, 1)) {
          I(pe2 ? o2 : He2, k[1], Ke2, true);
          var t4 = !isNaN(Ae2.y - Ae2.startY), r4 = Ae2.isDragging, n4 = r4 && (Math.abs(Ae2.x - Ae2.startX) > 3 || Math.abs(Ae2.y - Ae2.startY) > 3), c2 = V(e4);
          !n4 && t4 && (Ae2._vx.reset(), Ae2._vy.reset(), T2 && we2 && l.delayedCall(0.08, (function() {
            if (O() - qe2 > 300 && !e4.defaultPrevented) {
              if (e4.target.click) e4.target.click();
              else if (He2.createEvent) {
                var t5 = He2.createEvent("MouseEvents");
                t5.initMouseEvent("click", true, true, f, 1, c2.screenX, c2.screenY, c2.clientX, c2.clientY, false, false, false, false, 0, null), e4.target.dispatchEvent(t5);
              }
            }
          }))), Ae2.isDragging = Ae2.isGesturing = Ae2.isPressed = false, P2 && r4 && !pe2 && Se2.restart(true), N2 && r4 && N2(Ae2), $2 && $2(Ae2, n4);
        }
      }, Qe2 = function(e4) {
        return e4.touches && e4.touches.length > 1 && (Ae2.isGesturing = true) && de2(e4, Ae2.isDragging);
      }, et2 = function() {
        return (Ae2.isGesturing = false) || he2(Ae2);
      }, tt2 = function(e4) {
        if (!Ve2(e4)) {
          var t4 = Ie2(), r4 = Xe2();
          je2((t4 - ze2) * xe2, (r4 - Be2) * xe2, 1), ze2 = t4, Be2 = r4, P2 && Se2.restart(true);
        }
      }, nt2 = function(e4) {
        if (!Ve2(e4)) {
```

## wheel-step — _nuxt/5be642c.js L132-138 (hit L136)
```js
      }, nt2 = function(e4) {
        if (!Ve2(e4)) {
          e4 = V(e4, T2), ge2 && (Pe2 = true);
          var t4 = (1 === e4.deltaMode ? w2 : 2 === e4.deltaMode ? f.innerHeight : 1) * R2;
          je2(e4.deltaX * t4, e4.deltaY * t4, 0), P2 && !pe2 && Se2.restart(true);
        }
      }, ot2 = function(e4) {
```

## loader — _nuxt/5be642c.js L234-237 (hit L235)
```js
  }, St = function(element, e2) {
    var t2 = e2 && "matrix(1, 0, 0, 1, 0, 0)" !== kt(element)[fe] && Z.to(element, { x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, rotationX: 0, rotationY: 0, scale: 1, skewX: 0, skewY: 0 }).progress(1), r2 = elemen
    return t2 && t2.progress(0).kill(), r2;
  }, Tt = function(element, e2) {
```

## loader — _nuxt/5be642c.js L281-284 (hit L283)
```js
  }, Bt = function(marker, e2, t2, r2) {
    var n2 = { display: "block" }, o2 = t2[r2 ? "os2" : "p2"], l2 = t2[r2 ? "p2" : "os2"];
    marker._isFlipped = r2, n2[t2.a + "Percent"] = r2 ? -100 : 0, n2[t2.a] = r2 ? "1px" : 0, n2["border" + o2 + bt] = 1, n2["border" + l2 + bt] = 0, n2[t2.p] = e2 + "px", Z.set(marker, n2);
  }, Nt = [], Ft = {}, Ht = function() {
```

## text-split — _nuxt/111eb4c.js L505-514 (hit L510)
```js
        function It(t4) {
          if (!t4) return null;
          const e3 = t4.split(".");
          if (!e3 || 3 !== e3.length) return null;
          try {
            return JSON.parse(decodeURIComponent(r3.atob(e3[1]).split("").map(((t5) => "%" + ("00" + t5.charCodeAt(0).toString(16)).slice(-2))).join("")));
          } catch (t5) {
            return null;
          }
        }
```

## pointer — _nuxt/111eb4c.js L19345-19348 (hit L19347)
```js
          _addDragHandler(t4) {
            const e4 = this._map, i2 = this._pos;
            e4 && i2 && this._element.contains(t4.originalEvent.target) && (t4.preventDefault(), this._positionDelta = t4.point.sub(i2), this._pointerdownPos = t4.point, this._state = "pending", e4.on("mousemove", this._
          }
```

## pointer — _nuxt/111eb4c.js L19436-19476 (hit L19451)
```js
          move(t4, e4) {
            const i2 = this.map, r4 = this.mouseRotate.mousemoveWindow(t4, e4), n3 = r4 && r4.bearingDelta;
            if (n3 && i2.setBearing(i2.getBearing() + n3), this.mousePitch) {
              const r5 = this.mousePitch.mousemoveWindow(t4, e4), n4 = r5 && r5.pitchDelta;
              n4 && i2.setPitch(i2.getPitch() + n4);
            }
          }
          off() {
            const t4 = this.element;
            t4.removeEventListener("mousedown", this.mousedown), t4.removeEventListener("touchstart", this.touchstart, { passive: false }), t4.removeEventListener("touchmove", this.touchmove), t4.removeEventListener("tou
          }
          offTemp() {
            u(), t3.window.removeEventListener("mousemove", this.mousemove), t3.window.removeEventListener("mouseup", this.mouseup);
          }
          mousedown(e4) {
            this.down(t3.extend({}, e4, { ctrlKey: true, preventDefault: () => e4.preventDefault() }), p(this.element, e4)), t3.window.addEventListener("mousemove", this.mousemove), t3.window.addEventListener("mouseup", 
          }
          mousemove(t4) {
            this.move(t4, p(this.element, t4));
          }
          mouseup(t4) {
            this.mouseRotate.mouseupWindow(t4), this.mousePitch && this.mousePitch.mouseupWindow(t4), this.offTemp();
          }
          touchstart(t4) {
            1 !== t4.targetTouches.length ? this.reset() : (this._startPos = this._lastPos = m(this.element, t4.targetTouches)[0], this.down({ type: "mousedown", button: 0, ctrlKey: true, preventDefault: () => t4.prevent
          }
          touchmove(t4) {
            1 !== t4.targetTouches.length ? this.reset() : (this._lastPos = m(this.element, t4.targetTouches)[0], this.move({ preventDefault: () => t4.preventDefault() }, this._lastPos));
          }
          touchend(t4) {
            0 === t4.targetTouches.length && this._startPos && this._lastPos && this._startPos.dist(this._lastPos) < this._clickTolerance && this.element.click(), this.reset();
          }
          reset() {
            this.mouseRotate.reset(), this.mousePitch && this.mousePitch.reset(), delete this._startPos, delete this._lastPos, this.offTemp();
          }
        }
        const co = { positionOptions: { enableHighAccuracy: false, maximumAge: 0, timeout: 6e3 }, fitBoundsOptions: { maxZoom: 15 }, trackUserLocation: false, showAccuracyCircle: true, showUserLocation: true, showUserHea
          constructor(e4) {
            if (t3.LivePerformanceUtils.mark(t3.PerformanceMarkers.create), null != (e4 = t3.extend({}, so, e4)).minZoom && null != e4.maxZoom && e4.minZoom > e4.maxZoom) throw new Error("maxZoom must be greater than or 
            if (null != e4.minPitch && null != e4.maxPitch && e4.minPitch > e4.maxPitch) throw new Error("maxPitch must be greater than or equal to minPitch");
            if (null != e4.minPitch && e4.minPitch < 0) throw new Error("minPitch must be greater than or equal to 0");
```

## observer — _nuxt/2cfced0.js L623-663 (hit L638)
```js
    return (t2 - e2._start) * e2._ts + (e2._ts >= 0 ? 0 : e2._dirty ? e2.totalDuration() : e2._tDur);
  }, Zt = function(t2) {
    return t2._end = Et(t2._start + (t2._tDur / Math.abs(t2._ts || t2._rts || P) || 0));
  }, Kt = function(t2, e2) {
    var r2 = t2._dp;
    return r2 && r2.smoothChildTiming && t2._ts && (t2._start = Et(r2._time - (t2._ts > 0 ? e2 / t2._ts : ((t2._dirty ? t2.totalDuration() : t2._tDur) - e2) / -t2._ts)), Zt(t2), r2._dirty || Ut(r2, t2)), t2;
  }, Jt = function(t2, e2) {
    var r2;
    if ((e2._time || !e2._dur && e2._initted || e2._start < t2._time && (e2._dur || !e2.add)) && (r2 = Yt(t2.rawTime(), e2), (!e2._dur || le(0, e2.totalDuration(), r2) - e2._tTime > P) && e2.render(r2, true)), Ut(t2, e2)
      if (t2._dur < t2.duration()) for (r2 = t2; r2._dp; ) r2.rawTime() >= 0 && r2.totalTime(r2._tTime), r2 = r2._dp;
      t2._zTime = -1e-8;
    }
  }, Qt = function(t2, e2, r2, n2) {
    return e2.parent && Ht(e2), e2._start = Et((H(r2) ? r2 : r2 || t2 !== d ? se(t2, r2, e2) : t2._time) + e2._delay), e2._end = Et(e2._start + (e2.totalDuration() / Math.abs(e2.timeScale()) || 0)), zt(t2, e2, "_first", 
  }, te = function(t2, e2) {
    return (ot.ScrollTrigger || ct("scrollTrigger", e2)) && ot.ScrollTrigger.create(e2, t2);
  }, ee = function(t2, time, e2, r2, n2) {
    return sr(t2, time, n2), t2._initted ? !e2 && t2._pt && !h && (t2._dur && false !== t2.vars.lazy || !t2._dur && t2.vars.lazy) && w !== qe.frame ? (gt.push(t2), t2._lazy = [n2, r2], 1) : void 0 : 1;
  }, re = function t2(e2) {
    var r2 = e2.parent;
    return r2 && r2._ts && r2._initted && !r2._lock && (r2.rawTime() < 0 || t2(r2));
  }, ne = function(t2) {
    var data = t2.data;
    return "isFromStart" === data || "isStart" === data;
  }, ie = function(t2, e2, r2, n2) {
    var o2 = t2._repeat, c2 = Et(e2) || 0, l2 = t2._tTime / t2._tDur;
    return l2 && !n2 && (t2._time *= c2 / t2._dur), t2._dur = c2, t2._tDur = o2 ? o2 < 0 ? 1e10 : Et(c2 * (o2 + 1) + t2._rDelay * o2) : c2, l2 > 0 && !n2 && Kt(t2, t2._tTime = t2._tDur * l2), t2.parent && Zt(t2), r2 || U
  }, oe = function(t2) {
    return t2 instanceof er ? Ut(t2) : ie(t2, t2._dur);
  }, ae = { _start: 0, endTime: ht, totalDuration: ht }, se = function t2(e2, r2, n2) {
    var i, o2, c2, l2 = e2.labels, h2 = e2._recent || ae, f2 = e2.duration() >= j ? h2.endTime(false) : e2._dur;
    return z(r2) && (isNaN(r2) || r2 in l2) ? (o2 = r2.charAt(0), c2 = "%" === r2.substr(-1), i = r2.indexOf("="), "<" === o2 || ">" === o2 ? (i >= 0 && (r2 = r2.replace(/=/, "")), ("<" === o2 ? h2._start : h2.endTime(h2
  }, ce = function(t2, e2, r2) {
    var n2, o2, c2 = H(e2[1]), l2 = (c2 ? 2 : 1) + (t2 < 2 ? 0 : 1), h2 = e2[l2];
    if (c2 && (h2.duration = e2[1]), h2.parent = r2, t2) {
      for (n2 = h2, o2 = r2; o2 && !("immediateRender" in n2); ) n2 = o2.vars.defaults || {}, o2 = W(o2.vars.inherit) && o2.parent;
      h2.immediateRender = W(n2.immediateRender), t2 < 2 ? h2.runBackwards = 1 : h2.startAt = e2[l2 - 1];
    }
    return new pr(e2[0], h2, e2[l2 + 1]);
  }, ue = function(t2, e2) {
    return t2 || 0 === t2 ? e2(t2) : e2;
```

## reveal-timeline — _nuxt/2cfced0.js L1004-1044 (hit L1019)
```js
    }
    c(e2, t2);
    var r2 = e2.prototype;
    return r2.to = function(t3, e3, r3) {
      return ce(0, arguments, this), this;
    }, r2.from = function(t3, e3, r3) {
      return ce(1, arguments, this), this;
    }, r2.fromTo = function(t3, e3, r3, n2) {
      return ce(2, arguments, this), this;
    }, r2.set = function(t3, e3, r3) {
      return e3.duration = 0, e3.parent = this, Bt(e3).repeatDelay || (e3.repeat = 0), e3.immediateRender = !!e3.immediateRender, new pr(t3, e3, se(this, r3), 1), this;
    }, r2.call = function(t3, e3, r3) {
      return Qt(this, pr.delayedCall(0, t3, e3), r3);
    }, r2.staggerTo = function(t3, e3, r3, n2, o2, c2, l2) {
      return r3.duration = e3, r3.stagger = r3.stagger || n2, r3.onComplete = c2, r3.onCompleteParams = l2, r3.parent = this, new pr(t3, r3, se(this, o2)), this;
    }, r2.staggerFrom = function(t3, e3, r3, n2, o2, c2, l2) {
      return r3.runBackwards = 1, Bt(r3).immediateRender = W(r3.immediateRender), this.staggerTo(t3, e3, r3, n2, o2, c2, l2);
    }, r2.staggerFromTo = function(t3, e3, r3, n2, o2, c2, l2, h2) {
      return n2.startAt = r3, Bt(n2).immediateRender = W(n2.immediateRender), this.staggerTo(t3, e3, n2, o2, c2, l2, h2);
    }, r2.render = function(t3, e3, r3) {
      var time, n2, o2, c2, l2, f2, _2, m2, v2, y2, w2, x2, k2 = this._time, A2 = this._dirty ? this.totalDuration() : this._tDur, T2 = this._dur, C2 = t3 <= 0 ? 0 : Et(t3), S2 = this._zTime < 0 != t3 < 0 && (this._initt
      if (this !== d && C2 > A2 && t3 >= 0 && (C2 = A2), C2 !== this._tTime || r3 || S2) {
        if (k2 !== this._time && T2 && (C2 += this._time - k2, t3 += this._time - k2), time = C2, v2 = this._start, f2 = !(m2 = this._ts), S2 && (T2 || (k2 = this._zTime), (t3 || !e3) && (this._zTime = t3)), this._repeat
          if (w2 = this._yoyo, l2 = T2 + this._rDelay, this._repeat < -1 && t3 < 0) return this.totalTime(100 * l2 + t3, e3, r3);
          if (time = Et(C2 % l2), C2 === A2 ? (c2 = this._repeat, time = T2) : ((c2 = ~~(C2 / l2)) && c2 === C2 / l2 && (time = T2, c2--), time > T2 && (time = T2)), y2 = Xt(this._tTime, l2), !k2 && this._tTime && y2 !==
            var O2 = w2 && 1 & y2, E2 = O2 === (w2 && 1 & c2);
            if (c2 < y2 && (O2 = !O2), k2 = O2 ? 0 : C2 % T2 ? T2 : C2, this._lock = 1, this.render(k2 || (x2 ? 0 : Et(c2 * l2)), e3, !T2)._lock = 0, this._tTime = C2, !e3 && this.parent && Ce(this, "onRepeat"), this.var
            if (T2 = this._dur, A2 = this._tDur, E2 && (this._lock = 2, k2 = O2 ? T2 : -1e-4, this.render(k2, true), this.vars.repeatRefresh && !x2 && this.invalidate()), this._lock = 0, !this._ts && !f2) return this;
            We(this, x2);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2 && (_2 = (function(t4, e4, time2) {
          var r4;
          if (time2 > e4) for (r4 = t4._first; r4 && r4._start <= time2; ) {
            if ("isPause" === r4.data && r4._start > e4) return r4;
            r4 = r4._next;
          }
          else for (r4 = t4._last; r4 && r4._start >= time2; ) {
            if ("isPause" === r4.data && r4._start < e4) return r4;
            r4 = r4._prev;
          }
```

## keyboard — _nuxt/2cfced0.js L4556-4574 (hit L4571)
```js
          var e2 = function(r3) {
            for (; t2._html5AudioPool.length < t2.html5PoolSize; ) try {
              var n2 = new Audio();
              n2._unlocked = true, t2._releaseHtml5Audio(n2);
            } catch (r4) {
              t2.noAudio = true;
              break;
            }
            for (var i = 0; i < t2._howls.length; i++) if (!t2._howls[i]._webAudio) for (var o2 = t2._howls[i]._getSoundIds(), c2 = 0; c2 < o2.length; c2++) {
              var l2 = t2._howls[i]._soundById(o2[c2]);
              l2 && l2._node && !l2._node._unlocked && (l2._node._unlocked = true, l2._node.load());
            }
            t2._autoResume();
            var source = t2.ctx.createBufferSource();
            source.buffer = t2._scratchBuffer, source.connect(t2.ctx.destination), void 0 === source.start ? source.noteOn(0) : source.start(0), "function" == typeof t2.ctx.resume && t2.ctx.resume(), source.onended = fun
              source.disconnect(0), t2._audioUnlocked = true, document.removeEventListener("touchstart", e2, true), document.removeEventListener("touchend", e2, true), document.removeEventListener("click", e2, true), doc
              for (var i2 = 0; i2 < t2._howls.length; i2++) t2._howls[i2]._emit("unlock");
            };
          };
```

## keyboard — _nuxt/2cfced0.js L4554-4576 (hit L4575)
```js
        if (!t2._audioUnlocked && t2.ctx) {
          t2._audioUnlocked = false, t2.autoUnlock = false, t2._mobileUnloaded || 44100 === t2.ctx.sampleRate || (t2._mobileUnloaded = true, t2.unload()), t2._scratchBuffer = t2.ctx.createBuffer(1, 1, 22050);
          var e2 = function(r3) {
            for (; t2._html5AudioPool.length < t2.html5PoolSize; ) try {
              var n2 = new Audio();
              n2._unlocked = true, t2._releaseHtml5Audio(n2);
            } catch (r4) {
              t2.noAudio = true;
              break;
            }
            for (var i = 0; i < t2._howls.length; i++) if (!t2._howls[i]._webAudio) for (var o2 = t2._howls[i]._getSoundIds(), c2 = 0; c2 < o2.length; c2++) {
              var l2 = t2._howls[i]._soundById(o2[c2]);
              l2 && l2._node && !l2._node._unlocked && (l2._node._unlocked = true, l2._node.load());
            }
            t2._autoResume();
            var source = t2.ctx.createBufferSource();
            source.buffer = t2._scratchBuffer, source.connect(t2.ctx.destination), void 0 === source.start ? source.noteOn(0) : source.start(0), "function" == typeof t2.ctx.resume && t2.ctx.resume(), source.onended = fun
              source.disconnect(0), t2._audioUnlocked = true, document.removeEventListener("touchstart", e2, true), document.removeEventListener("touchend", e2, true), document.removeEventListener("click", e2, true), doc
              for (var i2 = 0; i2 < t2._howls.length; i2++) t2._howls[i2]._emit("unlock");
            };
          };
          return document.addEventListener("touchstart", e2, true), document.addEventListener("touchend", e2, true), document.addEventListener("click", e2, true), document.addEventListener("keydown", e2, true), t2;
        }
```

## audio — _nuxt/2cfced0.js L4596-4636 (hit L4611)
```js
              var e3 = function() {
                t2.state = "suspended", t2._resumeAfterSuspend && (delete t2._resumeAfterSuspend, t2._autoResume());
              };
              t2.ctx.suspend().then(e3, e3);
            }
          }), 3e4), t2;
        }
      }, _autoResume: function() {
        var t2 = this;
        if (t2.ctx && void 0 !== t2.ctx.resume && c.usingWebAudio) return "running" === t2.state && "interrupted" !== t2.ctx.state && t2._suspendTimer ? (clearTimeout(t2._suspendTimer), t2._suspendTimer = null) : "suspen
          t2.state = "running";
          for (var i = 0; i < t2._howls.length; i++) t2._howls[i]._emit("resume");
        })), t2._suspendTimer && (clearTimeout(t2._suspendTimer), t2._suspendTimer = null)) : "suspending" === t2.state && (t2._resumeAfterSuspend = true), t2;
      } };
      var c = new o(), l = function(t2) {
        t2.src && 0 !== t2.src.length ? this.init(t2) : console.error("An array of source files must be passed with any new Howl.");
      };
      l.prototype = { init: function(t2) {
        var e2 = this;
        return c.ctx || y(), e2._autoplay = t2.autoplay || false, e2._format = "string" != typeof t2.format ? t2.format : [t2.format], e2._html5 = t2.html5 || false, e2._muted = t2.mute || false, e2._loop = t2.loop || fa
          e2.play();
        } }), e2._preload && "none" !== e2._preload && e2.load(), e2;
      }, load: function() {
        var t2 = this, e2 = null;
        if (c.noAudio) t2._emit("loaderror", null, "No audio support.");
        else {
          "string" == typeof t2._src && (t2._src = [t2._src]);
          for (var i = 0; i < t2._src.length; i++) {
            var r3, n2;
            if (t2._format && t2._format[i]) r3 = t2._format[i];
            else {
              if ("string" != typeof (n2 = t2._src[i])) {
                t2._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                continue;
              }
              (r3 = /^data:audio\/([^;,]+);/i.exec(n2)) || (r3 = /\.([^.]+)$/.exec(n2.split("?", 1)[0])), r3 && (r3 = r3[1].toLowerCase());
            }
            if (r3 || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), r3 && c.codecs(r3)) {
              e2 = t2._src[i];
              break;
            }
```

## reveal-timeline — _nuxt/7b4ea25.js L81-89 (hit L86)
```js
  }, mounted: function() {
    var e2 = this, t2 = Object(m.d)();
    setTimeout((function() {
      var r2 = document.querySelector(".parallax-container");
      r2.style.height = r2.scrollHeight + 150 + "px", e2.scroll = new e2.$LocomotiveScroll({ el: document.querySelector("[data-scroll-container]"), multiplier: t2 ? 1 : 0.25, smooth: true, tablet: { smooth: true }, smart
    }), 100), o.b.to(".animated-bg-text", { scaleX: "100%", duration: 1.3, ease: "power4.out", stagger: 0.3, delay: 0.5 }), o.b.to(".animated-text", { opacity: 1, duration: 1.5, ease: "power4.out", stagger: 0.3, delay: 1
      "ArrowLeft" === t3.key && e2.$emit("prevPlace"), "ArrowRight" === t3.key && e2.$emit("nextPlace");
    }));
  }, methods: { onModalMouseDown: function(e2) {
```

## text-split — lagataperduda.com/70742c1a-27c9-4ecc-b808-be86026d364d L488-497 (hit L493)
```js
  function It(t2) {
    if (!t2) return null;
    const e2 = t2.split(".");
    if (!e2 || 3 !== e2.length) return null;
    try {
      return JSON.parse(decodeURIComponent(r.atob(e2[1]).split("").map(((t3) => "%" + ("00" + t3.charCodeAt(0).toString(16)).slice(-2))).join("")));
    } catch (t3) {
      return null;
    }
  }
```