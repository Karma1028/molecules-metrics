# duhaihang — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, wheel-step×3, page-transition×2, raf-lerp×1

## loader — duhaihang.com/build.js?t=eZGGeavHtbYE L976-1001 (hit L995)
```js
          if (I(t3.cid) && void 0 === (t3 = (function(e4, n3) {
            if (S(e4.error) && R(e4.V075V)) return e4.V075V;
            if (R(e4.resolved)) return e4.resolved;
            var t4 = Ye;
            t4 && R(e4.owners) && -1 === e4.owners.indexOf(t4) && e4.owners.push(t4);
            if (S(e4.loading) && R(e4.Up76W)) return e4.Up76W;
            if (t4 && !R(e4.owners)) {
              var r3 = e4.owners = [t4], i3 = true, o3 = null, a3 = null;
              t4.$on("hook:destroyed", function() {
                return y(r3, t4);
              });
              var s3 = function(t5) {
                for (var e5 = 0, n4 = r3.length; e5 < n4; e5++) r3[e5].$forceUpdate();
                t5 && (r3.length = 0, null !== o3 && (clearTimeout(o3), o3 = null), null !== a3 && (clearTimeout(a3), a3 = null));
              }, u3 = N(function(t5) {
                e4.resolved = Xe(t5, n3), i3 ? r3.length = 0 : s3(true);
              }), c3 = N(function(t5) {
                R(e4.V075V) && (e4.error = true, s3(true));
              }), l3 = e4(u3, c3);
              return F(l3) && (_(l3) ? I(e4.resolved) && l3.then(u3, c3) : _(l3.component) && (l3.component.then(u3, c3), R(l3.error) && (e4.V075V = Xe(l3.error, n3)), R(l3.loading) && (e4.Up76W = Xe(l3.loading, n3), 0 =
                o3 = null, I(e4.resolved) && I(e4.error) && (e4.loading = true, s3(false));
              }, l3.delay || 200)), R(l3.timeout) && (a3 = setTimeout(function() {
                a3 = null, I(e4.resolved) && c3(null);
              }, l3.timeout)))), i3 = false, e4.loading ? e4.Up76W : e4.resolved;
            }
          })(a2 = t3, o2))) return s2 = a2, u2 = e3, c2 = n2, l2 = r2, f2 = i2, (d2 = gt()).N16gS = s2, d2.hI17O = { data: u2, context: c2, children: l2, tag: f2 }, d2;
```

## loader — duhaihang.com/build.js?t=eZGGeavHtbYE L2758-2798 (hit L2773)
```js
      if (!arguments.length) return this._tDur;
      var e3 = this.Z329y, n2 = (t3 || this._rDelay) && e3 < 0;
      return this._tDur = n2 ? 1e20 : t3, this._dur = n2 ? t3 : (t3 - e3 * this._rDelay) / (e3 + 1), this.g11VA = 0, d(this.parent), this;
    }, ye.totalTime = function(t3, e3) {
      if (fe(), !arguments.length) return this._tTime;
      var n2, r2 = this.parent || this._dp;
      if (r2 && r2.k63Fo && this._ts) {
        for (n2 = this._start, this._start = r2.s23Uv - (0 < this._ts ? t3 / this._ts : ((this.g11VA ? this.totalDuration() : this._tDur) - t3) / -this._ts), this._end += this._start - n2, r2.g11VA || d(r2); r2.parent; )
        this.parent || y(this._dp, this, this._start - this._delay);
      }
      return this._tTime === t3 && this._dur || i(this, t3, e3), this;
    }, ye.time = function(t3, e3) {
      return arguments.length ? this.totalTime(t3 + g(this), e3) : this.s23Uv;
    }, ye.PA31f = function(t3, e3) {
      return arguments.length ? this.totalTime(this.totalDuration() * t3, e3) : this._tTime / this.totalDuration();
    }, ye.progress = function(t3, e3) {
      return arguments.length ? this.totalTime(this.duration() * t3 + g(this), e3) : this.duration() ? this.s23Uv / this._dur : this.ratio;
    }, ye.iteration = function(t3, e3) {
      var n2 = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this.s23Uv + (t3 - 1) * n2, e3) : this.Z329y ? 1 + ~~(this._tTime / n2) : 1;
    }, ye.timeScale = function(t3) {
      var e3 = this._ts;
      return arguments.length ? e3 ? (this._end = this._start + this._tDur / (this._ts = t3 || Et), (function(t4) {
        for (var e4 = t4.parent; e4 && e4.parent; ) e4.g11VA = 1, e4.totalDuration(), e4 = e4.parent;
        return t4;
      })(this).totalTime(this._tTime, true)) : (this._pauseTS = t3, this) : e3 || this._pauseTS;
    }, ye.paused = function(t3) {
      var e3 = !this._ts;
      return arguments.length ? (e3 !== t3 && (t3 ? (this._pauseTS = this._ts, this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (this._ts = this._pauseTS, t3 = this._tTime 
    }, ye.startTime = function(t3) {
      return arguments.length ? (this.parent && this.parent._sort && y(this.parent, this, t3 - this._delay), this) : this._start;
    }, ye.endTime = function(t3) {
      return this._start + (L(t3) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
    }, ye.rawTime = function(t3) {
      var e3 = this.parent || this._dp;
      return e3 ? t3 && (!this._ts || this.Z329y && this.s23Uv && this.PA31f() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? _(e3.rawTime(t3), this) : this._tTime : this._tTime;
    }, ye.repeat = function(t3) {
      return arguments.length ? (this.Z329y = t3, b(this)) : this.Z329y;
    }, ye.nH20s = function(t3) {
      return arguments.length ? (this._rDelay = t3, b(this)) : this._rDelay;
    }, ye.xp88K = function(t3) {
```

## loader — duhaihang.com/build.js?t=eZGGeavHtbYE L3466-3473 (hit L3467)
```js
    }, wr = "0deg", br = "0px", xr = ") ", Tr = function(t3, e3) {
      var n2 = e3 || this, r2 = n2.xPercent, i2 = n2.yPercent, o2 = n2.x, a2 = n2.y, s2 = n2.z, u2 = n2.rotation, c2 = n2.rotationY, l2 = n2.rotationX, f2 = n2.skewX, d2 = n2.skewY, h2 = n2.scaleX, p2 = n2.scaleY, v2 = n
      if (_2 && (l2 !== wr || c2 !== wr)) {
        var b2, x2 = parseFloat(c2) * rr, T2 = Math.sin(x2), k2 = Math.cos(x2);
        x2 = parseFloat(l2) * rr, b2 = Math.cos(x2), o2 = Cn(g2, o2, T2 * b2 * -_2), a2 = Cn(g2, a2, -Math.sin(x2) * -_2), s2 = Cn(g2, s2, k2 * b2 * -_2 + _2);
      }
      (r2 || i2) && (y2 = "translate(" + r2 + "%, " + i2 + "%) "), !w2 && o2 === br && a2 === br && s2 === br || (y2 += s2 !== br || w2 ? "translate3d(" + o2 + ", " + a2 + ", " + s2 + ") " : "translate(" + o2 + ", " + a2
    }, kr = function(t3, e3) {
```

## wheel-step — duhaihang.com/build.js?t=eZGGeavHtbYE L3833-3895 (hit L3867)
```js
  var p = function(t2) {
    var e2, n2, r2 = this, i2 = t2 || {}, o2 = h.a.mouse, a2 = { resize: {}, wheel: {}, scroll: {}, move: {}, down: {}, up: {} };
    function s2(t3) {
      return t3.match(/\b(resize|wheel|scroll|move|down|up)/gi)[0];
    }
    function u2() {
      r2.width = window.innerWidth, r2.height = window.innerHeight;
      var t3 = a2.resize;
      for (var e3 in t3) t3[e3](r2.width, r2.height);
    }
    function c2(t3) {
      if (t3.targetTouches) {
        var e3 = t3.targetTouches;
        o2.x = e3[0].pageX, o2.y = e3[0].pageY, o2.touches = t3.targetTouches;
      } else t3.pageX || t3.pageY ? (o2.x = t3.pageX, o2.y = t3.pageY) : (o2.x = t3.clientX + document.body.scrollLeft - document.body.clientLeft, o2.y = t3.clientY + document.body.scrollTop - document.body.clientTop);
      o2.halfX = o2.x - r2.width / 2, o2.halfY = o2.y - r2.height / 2;
    }
    function l2(t3) {
      u2(), e2 && (clearTimeout(e2), e2 = null), h.a.yJ88l || (e2 = setTimeout(function() {
        u2(), clearTimeout(e2), e2 = null;
      }, 550));
    }
    this.debounceTime = isNaN(i2.debounceTime) ? 100 : i2.debounceTime, this.pageYThreshold = 100, this.lastYOffset = 0, this.pageYOffset = 0, this.width = window.innerWidth, this.height = window.innerHeight, this.on = f
      var n3 = s2(t3);
      a2[n3][t3] || (a2[n3][t3] = e3);
    }, this.off = function(t3) {
      var e3 = s2(t3);
      a2[e3][t3] && (a2[e3][t3] = null, delete a2[e3][t3]);
    }, this.backToTop = function() {
      r2.pageYOffset = 0, window.scrollTo(0, 0);
    }, this.scrollToTop = function(t3, e3, n3) {
      gsap.to(r2, e3 || 1, { pageYOffset: t3 || 0, ease: n3 || Cubic.LS69n, o67jU: function() {
        window.scrollTo(0, r2.pageYOffset);
      } });
    }, n2 = 0 < r2.debounceTime, window.addEventListener("resize", n2 ? d()(l2, r2.debounceTime) : l2), setTimeout(l2, 1e3), window.addEventListener("wheel", function(t3) {
      !(function(t4) {
        var e3 = a2.wheel;
        for (var n3 in e3) e3[n3](t4);
      })(t3);
    }, { passive: false }), window.addEventListener("scroll", function(t3) {
      !(function(t4) {
        r2.pageYOffset = window.pageYOffset;
        var e3 = a2.scroll;
        for (var n3 in e3) e3[n3](t4);
      })(t3);
    }, { passive: false }), window.addEventListener(h.a.yJ88l ? "mousedown" : "touchstart", function(t3) {
      h.a.mouse.pressed = true, c2(t3), (function(t4) {
        var e3 = a2.down;
        for (var n3 in e3) e3[n3](t4, o2);
      })(t3);
    }, { passive: false }), window.addEventListener(h.a.yJ88l ? "mousemove" : "touchmove", function(t3) {
      var e3;
      e3 = t3, h.a.mouse.prevent && e3.preventDefault(), h.a.mouse.stop && e3.stopPropagation(), h.a.mouse.pressed = true, c2(t3), (function(t4) {
        var e4 = a2.move;
        for (var n3 in e4) e4[n3](t4, o2);
      })(t3);
    }, { passive: false }), window.addEventListener(h.a.yJ88l ? "mouseup" : "touchend", function(t3) {
      h.a.mouse.pressed = false, (function(t4) {
        var e3 = a2.up;
        for (var n3 in e3) e3[n3](t4, o2);
      })(t3);
    }, { passive: false });
  };
```

## page-transition — duhaihang.com/build.js?t=eZGGeavHtbYE L4289-4292 (hit L4291)
```js
  function J(t2) {
    t2 = lt(t2);
    window.history.pushState(null, null, t2);
  }
```

## page-transition — duhaihang.com/build.js?t=eZGGeavHtbYE L4450-4491 (hit L4452)
```js
  function yt(t2) {
    var n2 = this, r2 = gt();
    this.app = null, this.A046u = t2, this.x49aD = U, this.y50A9 = z, this.ZQ51A = I, this.EO52B = I, this.nextRoute = I, this.tx53C = null, this.onUpdated = null, window.addEventListener("popstate", function(t3) {
      n2.EO52B;
      var e2 = gt();
      n2.EO52B === I && e2 === r2 || (n2.nextRoute = dt(e2, n2), st(n2, e2));
    }), this.go = function(t3) {
      window.history.go(t3);
    }, this.navigate = function(t3, e2) {
      t3 || console.log("v47rl.navigate url is not valid", t3), "/" != t3.charAt(0) && (t3 = "/" + t3), "/" == t3 && (t3 = U), ut(this.EO52B.path) !== ut(t3) && (this.nextRoute = dt(t3, this), this[e2 ? "set" : "push"](t
    }, this.ensure = function(t3) {
      var e2;
      Q || (Q = true, t3 = _t(this, t3).replace(/(\#|\?)$/g, ""), e2 = lt(e2 = t3), window.history.replaceState(null, null, e2));
    }, this.set = function(t3) {
      "/" != t3.charAt(0) && (t3 = "/" + t3), J(t3 = _t(this, t3));
    }, this.push = function(t3, e2) {
      "/" != t3.charAt(0) && (t3 = "/" + t3);
      this.EO52B;
      st(this, t3, function(t4) {
        J(_t(n2, t4.path)), e2 && e2(t4);
      });
    }, this.clear = function() {
      for (var t3 = window.history.length, e2 = 0; e2 < t3; e2++) window.history.replaceState(null, null, R);
      window.history.go(1 - t3);
    }, this.init = function(t3) {
      if (null == this.app) {
        this.app = t3;
        for (var e2 = 0; e2 < this.A046u.length; e2++) {
          var n3 = this.A046u[e2], r3 = ut(n3.name);
          X[r3] = n3, V.push(new RegExp(r3)), H.push(r3);
        }
        !(function(t4) {
          for (var e3 = 0; e3 < t4.length; e3++) {
            var n4 = t4[e3];
            B.push({ path: n4.path, components: n4.components || { default: n4.component }, instances: {}, name: n4.name, parent: n4.parent, beforeEnter: n4.beforeEnter, meta: n4.meta || {}, props: null == n4.props ? {} 
          }
        })(this.A046u), st(this, gt()), this.onUpdated = function(t4) {
          this.app.route = t4;
        };
      }
    };
  }
```

## raf-lerp — duhaihang.com/build.js?t=eZGGeavHtbYE L4673-4679 (hit L4674)
```js
    function z() {
      !N && 0 < k && (R += (0 - R) * I, R *= 0.98), R < 0.01 && (R = 0), G();
      var t3 = q(j.position, 0 - R, S + R);
      E = t3, $ = j.target, Z(E);
      var e3 = q(t3 / S, 0, 1);
      O && O(t3, e3, $), _ && (C.scale += (C.min + e3 * (1 - C.min) - C.scale) * T * 2, _.style.transform = "scale3d(1," + C.scale + ",1)"), A = e3, y = requestAnimationFrame(z);
    }
```

## wheel-step — duhaihang.com/build.js?t=eZGGeavHtbYE L4704-4713 (hit L4705)
```js
      var t3 = (function(t4) {
        if ("deltaY" in t4) {
          var e4 = (function(t5) {
            return P[t5] || P[0];
          })(t4.deltaMode);
          return t4.deltaY * e4;
        }
        if ("wheelDeltaY" in t4) return t4.wheelDeltaY / -3;
        return t4.wheelDelta / -3;
      })(e3);
```

## wheel-step — duhaihang.com/build.js?t=eZGGeavHtbYE L4737-4777 (hit L4752)
```js
    function Z(t3) {
      v2.style.transform = "translate3d(0px, " + -t3 + "px, 0px)";
    }
    function J(t3) {
      var o3 = Date.now(), a3 = W(t3);
      this.delta = 0, this.velocity = 0, this.update = function(t4) {
        var e3 = Date.now(), n3 = W(t4), r3 = -(n3 - a3), i3 = r3 / (e3 - o3 || 16) * 16;
        o3 = e3, a3 = n3, this.velocity = 0.9 * i3 + 0.1 * this.velocity, this.delta = r3;
      };
    }
    function tt(t3) {
      var e3 = 2 * t3 * t3;
      return t3 < 0.5 ? e3 : 4 * t3 - e3 - 1;
    }
    this.uuid = "uuid-" + Date.now() + "-" + ~~(16777215 * Math.random()), this.on = function() {
      h2 && (m2.addEventListener("touchstart", Y, { passive: false }), m2.addEventListener("touchmove", X, { passive: false }), m2.addEventListener("touchend", H, { passive: false }), m2.addEventListener("touchcancel", H
    }, this.off = function() {
      h2 && (m2.removeEventListener("touchstart", Y), m2.removeEventListener("touchmove", X), m2.removeEventListener("touchend", H), m2.removeEventListener("touchcancel", H)), m2.removeEventListener("wheel", V), y && can
    }, this.destroy = function(t3) {
      this.off(), null != O && (O = null), _ && (0 < (t3 = 0 < parseFloat(t3) ? t3 : 0) ? (function(t4) {
        if (_) {
          var n3 = 1e3 * t4 || 500, r3 = Date.now();
          b && cancelAnimationFrame(b), b = null, (function t5() {
            var e3 = Date.now() - r3;
            C.scale += 0.2 * (C.min - C.scale), _.style.transform = "scale3d(1," + C.scale + ",1)", b = e3 < n3 ? requestAnimationFrame(t5) : (document.body.removeChild(_), _ = null, cancelAnimationFrame(b), null);
          })();
        }
      })(t3) : (document.body.removeChild(_), _ = null));
    }, this.resize = function() {
      setTimeout(B, 1);
    }, this.scrollTo = function(t3, e3) {
      var i3 = 1e3 * e3 || 500, o3 = E, a3 = q(t3, 0, S) - o3, s3 = Date.now();
      w && cancelAnimationFrame(w), w = null;
      var u3 = tt;
      !(function t4() {
        var e4, n3 = Date.now() - s3, r3 = u3(Math.min(n3 / i3, 1));
        (e4 = q(e4 = o3 + a3 * r3, 0, S)) !== E && Z(E = e4), n3 < i3 && (w = requestAnimationFrame(t4));
      })();
    }, g || (m2.style.overflow = "hidden", m2.style.outline = "none", window.navigator.msPointerEnabled && (m2.style.msTouchAction = "none")), null != C && (C.min = null != C.min ? C.min : 0.2, C.scale = null != C.scale 
  }
  var c, d, h, p = Object(r.a)("Page:Home", "#a1c", "all"), v = { name: "Home", extends: a, data: function() {
```