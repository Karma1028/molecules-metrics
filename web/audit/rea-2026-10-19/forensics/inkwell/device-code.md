# inkwell — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: raf-lerp×3, loader×3, reveal-timeline×3, observer×3, shader-uniforms×3, pointer×3, page-transition×2, wheel-step×3, keyboard×3

## raf-lerp — _nuxt/BCYjiYTg.js L139-173 (hit L154)
```js
  normalize() {
    return L(this, this), this;
  }
  dot(t) {
    return A(this, t);
  }
  equals(t) {
    return T(this, t);
  }
  applyMatrix3(t) {
    return z(this, this, t), this;
  }
  applyMatrix4(t) {
    return E(this, this, t), this;
  }
  lerp(t, e) {
    return _(this, this, t, e), this;
  }
  smoothLerp(t, e, n) {
    return v(this, this, t, e, n), this;
  }
  clone() {
    return new d(this[0], this[1]);
  }
  fromArray(t, e = 0) {
    return this[0] = t[e], this[1] = t[e + 1], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this[0], t[e + 1] = this[1], t;
  }
}
export {
  d as V
};

```

## loader — _nuxt/BwPMNtDe.js L29-69 (hit L44)
```js
  G = {
    class: "steps-container"
  };
  N = L({
    __name: "ScrollIndicator",
    props: {
      behind: {
        type: Boolean
      }
    },
    setup(s) {
      const { stepScroll: t } = M(), o = F(), r = y("el"), u = y("wrapper"), g = p([]), k = s, i = [
        {
          name: "Intro",
          index: 0,
          progress: t.intro
        },
        {
          name: "Vision",
          index: 1,
          progress: t.vision
        },
        {
          name: "Intelligence",
          index: 2,
          progress: t.intelligence
        },
        {
          name: "Applications",
          index: 3,
          progress: t.applications
        },
        {
          name: "Talents",
          index: 4,
          progress: t.talents
        },
        {
          name: "Work",
          index: 5,
          progress: t.credit
```

## loader — _nuxt/BwPMNtDe.js L59-99 (hit L74)
```js
          progress: t.applications
        },
        {
          name: "Talents",
          index: 4,
          progress: t.talents
        },
        {
          name: "Work",
          index: 5,
          progress: t.credit
        },
        {
          name: "Contact",
          index: 6,
          progress: t.contact
        }
      ], f = p(0), l = z(() => {
        let e;
        return e = i.find((n) => n.progress.value >= 0 && n.progress.value < 1), e || (e = i[i.length - 1]), e;
      }), v = p([]);
      T(() => {
        b(), B(b), d.to(r.value, {
          autoAlpha: 1,
          duration: 3.2,
          ease: "expo.out",
          delay: 0.8
        }), D(l, (e, n) => {
          var _a;
          e && (f.value = e.index, h(f.value), f.value > 2 ? (o.setLightMode(true), d.delayedCall(1.3, () => {
            var _a2;
            (_a2 = r.value) == null ? void 0 : _a2.classList.add("light");
          })) : (o.setLightMode(false), (_a = r.value) == null ? void 0 : _a.classList.remove("light")));
        });
      });
      const b = () => {
        d.set(u.value, {
          x: 0
        }), g.value.forEach((e, n) => {
          const a = e.getBoundingClientRect(), I = window.innerWidth / 2 - (a.left + a.width / 2);
          v.value[n] = I;
```

## loader — _nuxt/b1fLF-N-.js L71-85 (hit L78)
```js
    setup(l) {
      oe((c) => ({
        v41e26b4e: n(T),
        v6b60f51a: n(C),
        v0854fa30: n(p),
        v52dcedea: n(v)
      }));
      const { growProgress: o, growScaleTo: s, scale: t, domScale: u, logoPosition: x, mousePosition: _, mouseActivate: g } = Be(), { blobProgress: y } = $(), d = ne(), e = re(), p = i(() => e.footerProgress), v = i(() =
      return (c, P) => (b(), I("div", {
        class: "section__wrapper",
        style: F({
          opacity: ("N" in c ? c.N : n(V)).Clamp(("N" in c ? c.N : n(V)).iLerp(n(y).enter * n(o), 0, 0.2), 0, 1)
        })
      }, null, 4));
    }
```

## reveal-timeline — _nuxt/b1fLF-N-.js L102-118 (hit L107)
```js
        d = ce(_.value, true), se(() => {
          f.set(_.value, {
            rotateY: -50,
            rotateZ: 10,
            y: window.innerHeight
          }), p = f.timeline({
            paused: true
          }), p.to(d.lines.value, {
            opacity: 0,
            filter: "blur(3px)",
            stagger: 0.05,
            overwrite: "auto"
          }, 0), p.to(_.value, {
            scale: 0.95,
            overwrite: "auto"
          }, 0);
        }), h(() => u.textUiLeaveScrub, (a) => {
```

## reveal-timeline — _nuxt/b1fLF-N-.js L127-137 (hit L128)
```js
      const T = E(false), C = () => {
        T.value = false, v == null ? void 0 : v.kill(), v = f.timeline({
          defaults: {
            overwrite: "auto"
          }
        }), v.to(y.value, {
          opacity: 1,
          duration: 0.4,
          ease: "power3.inOut"
        }, 0);
      }, c = () => {
```

## reveal-timeline — _nuxt/b1fLF-N-.js L137-147 (hit L138)
```js
      }, c = () => {
        T.value || (T.value = true, v == null ? void 0 : v.kill(), v = f.timeline({
          defaults: {
            overwrite: "auto"
          }
        }), v.to(y.value, {
          opacity: 0,
          duration: 0.1,
          ease: "power3.inOut"
        }, 0));
      };
```

## observer — _nuxt/DruYjBBn.js L34-56 (hit L42)
```js
      return N(() => {
        var _a;
        p = ((_a = ye(s.value).split) == null ? void 0 : _a.words) || [], n.set(p, {
          yPercent: 100
        }), n.set(S.value, {
          autoAlpha: 1
        });
        const a = n.timeline({
          scrollTrigger: {
            start: 25,
            end: "+=200",
            scrub: true
          }
        });
        a.to(p, {
          yPercent: -120,
          stagger: 0.01
        }, 0), a.to(b.value, {
          yPercent: -200,
          duration: 0.5,
          ease: "none"
        }, 0);
      }), g({
```

## shader-uniforms — _nuxt/BvBRvdLA.js L455-495 (hit L470)
```js
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`, hn = `
    precision highp float;

    uniform sampler2D tMap;
    varying vec2 vUv;

    void main() {
        gl_FragColor = texture2D(tMap, vUv);
    }
`;
  class vn extends qe {
    constructor(e, { buffer: t, wrapS: o = e.CLAMP_TO_EDGE, wrapT: s = e.CLAMP_TO_EDGE, anisotropy: n = 0, minFilter: a, magFilter: l } = {}) {
      if (super(e, {
        generateMipmaps: false,
        wrapS: o,
        wrapT: s,
        anisotropy: n,
        minFilter: a,
        magFilter: l
      }), t) return this.parseBuffer(t);
    }
    parseBuffer(e) {
      const t = new mn(e);
      t.mipmaps.isCompressedTexture = true, this.image = t.mipmaps, this.internalFormat = t.glInternalFormat, t.numberOfMipmapLevels > 1 ? this.minFilter === this.gl.LINEAR && (this.minFilter = this.gl.NEAREST_MIPMAP_LIN
    }
  }
  function mn(i) {
    const e = [
      171,
      75,
      84,
      88,
      32,
```

## shader-uniforms — _nuxt/BvBRvdLA.js L1349-1389 (hit L1364)
```js
        vec4 baseColor = mix(texel, glassyColor, glassyFactor) + specular * 0.3;
        vec4 shadowColor = vec4(0.05, 0.05, 0.3, 1.0); // Dark blue shadows

        vec4 fresnelColor = vec4(1., 0.5, 0., .1);

        vec4 glassy = mix(texel, (glassyColor), glassyFactor) + specular * diffuse;

        vec4 shaded = mix(baseColor, shadowColor, (1.0 - diffuse) * ao); // Stronger shadows
        vec4 finalColor = mix(shaded, fresnelColor, fresnel + scattering); // Mix with fresnel & glow


        finalColor.a *= uOpacity;

        finalColor.a *= io2(vNormal.z);

        gl_FragColor = finalColor;
    }
`;
  function ao(i, { texture: e, seed: t }) {
    const o = ft(), s = {
      value: [
        1,
        1
      ]
    };
    ye(({ vh: l, vw: r }) => {
      s.value[0] = r, s.value[1] = l;
    });
    const n = {
      value: 1
    }, a = {
      value: 0
    };
    return {
      program: new Ee(i, {
        vertex: Rn,
        fragment: On,
        transparent: true,
        uniforms: {
          uTime: {
            value: 0
```

## shader-uniforms — _nuxt/BvBRvdLA.js L1457-1517 (hit L1516)
```js
` + co, zn = (i, e, t, o) => {
    const { uPortal: s } = ge(), { stackProgress: n } = le(), { uAspect: a, uFrost: l } = We(), { isSafari: r } = te(), { textures: u } = xe(), d = Q(() => 1 - n.opacity);
    return {
      program: new Ee(i, {
        fragment: i.renderer.isWebgl2 ? An : In,
        vertex: i.renderer.isWebgl2 ? rt : nt,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        uniforms: {
          tMap: e,
          uSafari: r,
          uPortal: s,
          uOpacity: t,
          uAspect: a,
          uFrost: l,
          tFrost: {
            value: u["00-frost"][Et.textures["00-frost"][0].src]
          },
          uLight: d
        }
      })
    };
  }, uo = `
uniform sampler2D tMap;
uniform sampler2D tFrost;

uniform vec4 uId;
uniform float uOpacity;
uniform float uPortal;
uniform float uLight;
uniform float uFrost;
uniform bool uSafari;

uniform float uAspect;

varying vec3 vNormal;
varying vec3 vN;
varying vec2 vUv;

void main() {
    vec4 color = texture(tMap, vec2(vUv.x, (vUv.y - .5) / uAspect + .5));
    color.a = uOpacity;


    color.rgb *= mix(mix(0.90, 1., 1. - uFrost), 1., length(texture(tFrost, vUv).rgb));

    color.a *= 1. - smoothstep(0.4, 1., length(vUv - .5) * 2.) * .18 * uFrost;

    float diffuse = max(dot(vNormal, normalize(vec3(-10., -10., -1.))), 0.0);

    color.rgb -= color.rgb * vec3(1.,1.,1.) * diffuse * 0.6 * uLight;

    color.rgb -= (1. - abs(vN.z)) * 0.2;

    if(uSafari) {
        color.a = uOpacity;
    }

    gl_FragColor = uPortal >= 1. ? vec4(0., 0., 0., 0.) : color;
}
```

## pointer — _nuxt/BvBRvdLA.js L2312-2316 (hit L2313)
```js
    Ct(() => {
      i === void 0 && (i = V(document.body)), i.value && (i.value.addEventListener("mousedown", h), i.value.addEventListener("touchstart", v), window.addEventListener("mousemove", f), window.addEventListener("touchmove",
        i === void 0 && (i = V(document.body)), i.value && (i.value.removeEventListener("mousedown", h), i.value.removeEventListener("touchstart", v), window.removeEventListener("mousemove", f), window.removeEventListene
      }));
    });
```

## observer — _nuxt/BtC8HlFy.js L2010-2023 (hit L2011)
```js
  const dN = (t) => (e, n) => {
    const r = new IntersectionObserver((i) => {
      for (const s of i) if (s.isIntersecting) {
        r.disconnect(), e();
        break;
      }
    }, t);
    return n((i) => {
      if (i instanceof Element) {
        if (pN(i)) return e(), r.disconnect(), false;
        r.observe(i);
      }
    }), () => r.disconnect();
  }, mN = (t) => (e) => {
```

## page-transition — _nuxt/BtC8HlFy.js L10209-10258 (hit L10251)
```js
  function nU(t, e, n, r) {
    let i = [], s = [], o = null;
    const a = ({ state: h }) => {
      const p = hP(t, location), m = n.value, d = e.value;
      let g = 0;
      if (h) {
        if (n.value = p, e.value = h, o && o === m) {
          o = null;
          return;
        }
        g = d ? h.position - d.position : 0;
      } else r(p);
      i.forEach((_) => {
        _(n.value, m, {
          delta: g,
          type: Wv.pop,
          direction: g ? g > 0 ? qg.forward : qg.back : qg.unknown
        });
      });
    };
    function l() {
      o = n.value;
    }
    function c(h) {
      i.push(h);
      const p = () => {
        const m = i.indexOf(h);
        m > -1 && i.splice(m, 1);
      };
      return s.push(p), p;
    }
    function u() {
      if (document.visibilityState === "hidden") {
        const { history: h } = window;
        if (!h.state) return;
        h.replaceState(et({}, h.state, {
          scroll: qm()
        }), "");
      }
    }
    function f() {
      for (const h of s) h();
      s = [], window.removeEventListener("popstate", a), window.removeEventListener("pagehide", u), document.removeEventListener("visibilitychange", u);
    }
    return window.addEventListener("popstate", a), window.addEventListener("pagehide", u), document.addEventListener("visibilitychange", u), {
      pauseListeners: l,
      listen: c,
      destroy: f
    };
  }
```

## observer — _nuxt/BtC8HlFy.js L12382-12422 (hit L12397)
```js
    return (e - n._start) * n._ts + (n._ts >= 0 ? 0 : n._dirty ? n.totalDuration() : n._tDur);
  }, Ym = function(e) {
    return e._end = Yt(e._start + (e._tDur / Math.abs(e._ts || e._rts || lt) || 0));
  }, Xm = function(e, n) {
    var r = e._dp;
    return r && r.smoothChildTiming && e._ts && (e._start = Yt(r._time - (e._ts > 0 ? n / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - n) / -e._ts)), Ym(e), r._dirty || Aa(r, e)), e;
  }, qP = function(e, n) {
    var r;
    if ((n._time || !n._dur && n._initted || n._start < e._time && (n._dur || !n.add)) && (r = Ud(e.rawTime(), n), (!n._dur || wh(0, n.totalDuration(), r) - n._tTime > lt) && n.render(r, true)), Aa(e, n)._dp && e._initte
      if (e._dur < e.duration()) for (r = e; r._dp; ) r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
      e._zTime = -lt;
    }
  }, Xi = function(e, n, r, i) {
    return n.parent && qo(n), n._start = Yt((Gs(r) ? r : r || e !== kt ? Qr(e, r, n) : e._time) + n._delay), n._end = Yt(n._start + (n.totalDuration() / Math.abs(n.timeScale()) || 0)), WP(e, n, "_first", "_last", e._sort
  }, GP = function(e, n) {
    return (Ur.ScrollTrigger || b0("scrollTrigger", n)) && Ur.ScrollTrigger.create(n, e);
  }, KP = function(e, n, r, i, s) {
    if (C0(e, n, s), !e._initted) return 1;
    if (!r && e._pt && !xn && (e._dur && e.vars.lazy !== false || !e._dur && e.vars.lazy) && $P !== Ir.frame) return No.push(e), e._lazy = [
      s,
      i
    ], 1;
  }, K6 = function t(e) {
    var n = e.parent;
    return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n));
  }, eb = function(e) {
    var n = e.data;
    return n === "isFromStart" || n === "isStart";
  }, Y6 = function(e, n, r, i) {
    var s = e.ratio, o = n < 0 || !n && (!e._start && K6(e) && !(!e._initted && eb(e)) || (e._ts < 0 || e._dp._ts < 0) && !eb(e)) ? 0 : 1, a = e._rDelay, l = 0, c, u, f;
    if (a && e._repeat && (l = wh(0, e._tDur, n), u = xc(l, a), e._yoyo && u & 1 && (o = 1 - o), u !== xc(e._tTime, a) && (s = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== s || xn || i || e._zTime
      if (!e._initted && KP(e, n, i, r, l)) return;
      for (f = e._zTime, e._zTime = n || (r ? lt : 0), r || (r = n && !f), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = l, c = e._pt; c; ) c.r(o, c.d), c = c._next;
      n < 0 && Zv(e, n, r, true), e._onUpdate && !r && Fr(e, "onUpdate"), l && e._repeat && !r && e.parent && Fr(e, "onRepeat"), (n >= e._tDur || n < 0) && e.ratio === o && (o && qo(e, 1), !r && !xn && (Fr(e, o ? "onComp
    } else e._zTime || (e._zTime = n);
  }, X6 = function(e, n, r) {
    var i;
    if (r > n) for (i = e._first; i && i._start <= r; ) {
      if (i.data === "isPause" && i._start > n) return i;
      i = i._next;
    }
```

## raf-lerp — _nuxt/BtC8HlFy.js L14264-14267 (hit L14266)
```js
  function IA(t, e, n) {
    var r = t[e], i = t[e + 2], s = t[e + 4], o;
    return r += (i - r) * n, i += (s - i) * n, r += (i - r) * n, o = i + (s + (t[e + 6] - s) * n - i) * n - r, r = t[e + 1], i = t[e + 3], s = t[e + 5], r += (i - r) * n, i += (s - i) * n, r += (i - r) * n, Qe(n4(i + (s 
  }
```

## raf-lerp — _nuxt/BtC8HlFy.js L14303-14307 (hit L14306)
```js
  function fb(t, e, n) {
    if (n <= 0 || n >= 1) return 0;
    var r = t[e], i = t[e + 1], s = t[e + 2], o = t[e + 3], a = t[e + 4], l = t[e + 5], c = t[e + 6], u = t[e + 7], f = r + (s - r) * n, h = s + (a - s) * n, p = i + (o - i) * n, m = o + (l - o) * n, d = f + (h - f) * n,
    return h += (_ - h) * n, m += (y - m) * n, t.splice(e + 2, 4, Qe(f), Qe(p), Qe(d), Qe(g), Qe(d + (h - d) * n), Qe(g + (m - g) * n), Qe(h), Qe(m), Qe(_), Qe(y)), t.samples && t.samples.splice(e / 6 * t.resolution | 0,
  }
```

## wheel-step — _nuxt/BtC8HlFy.js L15370-15373 (hit L15371)
```js
      }, Kn = function() {
        var ge = A.deltaX = xE(Te), Xe = A.deltaY = xE(Ce), ne = Math.abs(ge) >= i, ye = Math.abs(Xe) >= i;
        M && (ne || ye) && M(A, ge, Xe, Te, Ce), ne && (w && A.deltaX > 0 && w(A), x && A.deltaX < 0 && x(A), S && S(A), D && A.deltaX < 0 != j < 0 && D(A), j = A.deltaX, Te[0] = Te[1] = Te[2] = 0), ye && (T && A.deltaY 
      }, fs = function(ge, Xe, ne) {
```

## wheel-step — _nuxt/BtC8HlFy.js L15369-15409 (hit L15384)
```js
        A._vx.reset(), A._vy.reset(), oe.pause(), f && f(A);
      }, Kn = function() {
        var ge = A.deltaX = xE(Te), Xe = A.deltaY = xE(Ce), ne = Math.abs(ge) >= i, ye = Math.abs(Xe) >= i;
        M && (ne || ye) && M(A, ge, Xe, Te, Ce), ne && (w && A.deltaX > 0 && w(A), x && A.deltaX < 0 && x(A), S && S(A), D && A.deltaX < 0 != j < 0 && D(A), j = A.deltaX, Te[0] = Te[1] = Te[2] = 0), ye && (T && A.deltaY 
      }, fs = function(ge, Xe, ne) {
        Te[ne] += ge, Ce[ne] += Xe, A._vx.update(ge), A._vy.update(Xe), c ? Q || (Q = requestAnimationFrame(Kn)) : Kn();
      }, Wt = function(ge, Xe) {
        q && !z && (A.axis = z = Math.abs(ge) > Math.abs(Xe) ? "x" : "y", $ = true), z !== "y" && (Te[2] += ge, A._vx.update(ge, true)), z !== "x" && (Ce[2] += Xe, A._vy.update(Xe, true)), c ? Q || (Q = requestAnimationF
      }, Zt = function(ge) {
        if (!ze(ge, 1)) {
          ge = du(ge, u);
          var Xe = ge.clientX, ne = ge.clientY, ye = Xe - A.x, de = ne - A.y, we = A.isDragging;
          A.x = Xe, A.y = ne, (we || (ye || de) && (Math.abs(A.startX - Xe) >= s || Math.abs(A.startY - ne) >= s)) && (be = we ? 2 : 1, we || (A.isDragging = true), Wt(ye, de));
        }
      }, Vi = A.onPress = function(Se) {
        ze(Se, 1) || Se && Se.button || (A.axis = z = null, oe.pause(), A.isPressed = true, Se = du(Se), j = J = 0, A.startX = A.x = Se.clientX, A.startY = A.y = Se.clientY, A._vx.reset(), A._vy.reset(), Jn(B ? a : he, x
      }, xe = A.onRelease = function(Se) {
        if (!ze(Se, 1)) {
          Yn(B ? a : he, xi[1], Zt, true);
          var ge = !isNaN(A.y - A.startY), Xe = A.isDragging, ne = Xe && (Math.abs(A.x - A.startX) > 3 || Math.abs(A.y - A.startY) > 3), ye = du(Se);
          !ne && ge && (A._vx.reset(), A._vy.reset(), u && U && Sn.delayedCall(0.08, function() {
            if (Zu() - Ze > 300 && !Se.defaultPrevented) {
              if (Se.target.click) Se.target.click();
              else if (he.createEvent) {
                var de = he.createEvent("MouseEvents");
                de.initMouseEvent("click", true, true, Or, 1, ye.screenX, ye.screenY, ye.clientX, ye.clientY, false, false, false, false, 0, null), Se.target.dispatchEvent(de);
              }
            }
          })), A.isDragging = A.isGesturing = A.isPressed = false, f && Xe && !B && oe.restart(true), be && Kn(), _ && Xe && _(A), b && b(A, ne);
        }
      }, ta = function(ge) {
        return ge.touches && ge.touches.length > 1 && (A.isGesturing = true) && F(ge, A.isDragging);
      }, wi = function() {
        return (A.isGesturing = false) || I(A);
      }, Si = function(ge) {
        if (!ze(ge)) {
          var Xe = H(), ne = W();
          fs((Xe - ce) * te, (ne - Z) * te, 1), ce = Xe, Z = ne, f && oe.restart(true);
        }
      }, Ei = function(ge) {
        if (!ze(ge)) {
```

## wheel-step — _nuxt/BtC8HlFy.js L15408-15414 (hit L15412)
```js
      }, Ei = function(ge) {
        if (!ze(ge)) {
          ge = du(ge, u), X && (P = true);
          var Xe = (ge.deltaMode === 1 ? l : ge.deltaMode === 2 ? Or.innerHeight : 1) * m;
          fs(ge.deltaX * Xe, ge.deltaY * Xe, 0), f && !B && oe.restart(true);
        }
      }, na = function(ge) {
```

## keyboard — _nuxt/BtC8HlFy.js L22480-22496 (hit L22490)
```js
      if (a) {
        i = kh(t, r, aq, e.reportAllChanges);
        const l = vw(() => {
          o(a.takeRecords()), a.disconnect(), i(true);
        }), c = (u) => {
          u.isTrusted && (H2(l), lm(u.type, c, {
            capture: true
          }));
        };
        for (const u of [
          "keydown",
          "click",
          "visibilitychange"
        ]) Uo(u, c, {
          capture: true
        });
      }
```

## page-transition — _nuxt/BtC8HlFy.js L23418-23425 (hit L23418)
```js
    if (Ue.addEventListener("popstate", () => {
      const e = Ue.location.href, n = Ap;
      if (Ap = e, n === e) return;
      rs("history", {
        from: n,
        to: e
      });
    }), !IW()) return;
```

## keyboard — _nuxt/BtC8HlFy.js L23907-23968 (hit L23919)
```js
      setup(V) {
        var _a3;
        if (O) {
          Hs && pe.log("[Tracing] Skipping browserTracingIntegration setup for bot user agent.");
          return;
        }
        if (S8(), s && $e.PerformanceObserver && ((_a3 = PerformanceObserver.supportedEntryTypes) == null ? void 0 : _a3.includes("long-animation-frame")) ? Rq() : i && Aq(), o && Mq(), E && n) {
          const F = () => {
            R = Ft();
          };
          addEventListener("click", F, {
            capture: true
          }), addEventListener("keydown", F, {
            capture: true,
            passive: true
          });
        }
        function B() {
          const F = eh(V);
          F && !He(F).timestamp && (Hs && pe.log(`[Tracing] Finishing current active span with op: ${He(F).op}`), F.setAttribute(Kf, "cancelled"), F.end());
        }
        V.on("startNavigationSpan", (F, I) => {
          if (Vt() !== V) return;
          if (I == null ? void 0 : I.isRedirect) {
            Hs && pe.warn("[Tracing] Detected redirect, navigation span will not be the root span, but a child span."), L(V, {
              op: "navigation.redirect",
              ...F
            }, false);
            return;
          }
          R = void 0, B(), hl().setPropagationContext({
            traceId: Ys(),
            sampleRand: Math.random(),
            propagationSpanId: Cr() ? void 0 : Bs()
          });
          const X = pt();
          X.setPropagationContext({
            traceId: Ys(),
            sampleRand: Math.random(),
            propagationSpanId: Cr() ? void 0 : Bs()
          }), X.setSDKProcessingMetadata({
            normalizedRequest: void 0
          }), L(V, {
            op: "navigation",
            ...F,
            parentSpan: null,
            forceTransaction: true
          });
        }), V.on("startPageLoadSpan", (F, I = {}) => {
          if (Vt() !== V) return;
          B();
          const X = I.sentryTrace || jC("sentry-trace") || zC("sentry-trace"), K = I.baggage || jC("baggage") || zC("baggage"), ve = d8(X, K), se = pt();
          se.setPropagationContext(ve), Cr() || (se.getPropagationContext().propagationSpanId = Bs()), se.setSDKProcessingMetadata({
            normalizedRequest: F2()
          }), L(V, {
            op: "pageload",
            ...F
          });
        }), V.on("endPageloadSpan", () => {
          C && N && (N.setAttribute(Kf, "reportPageLoaded"), N.end());
        });
      },
```

## pointer — _nuxt/BtC8HlFy.js L27666-27702 (hit L27688)
```js
  [TK, kK, _ee] = ea(() => {
    const t = Xt({
      x: -0,
      y: -0
    }), e = Xt({
      x: 0,
      y: 0
    }), n = Xt(0), r = Xt(false), i = (o) => {
      t.value = {
        x: o.clientX,
        y: o.clientY
      }, r.value = true;
    }, s = (o) => {
      if (o.touches.length > 0) {
        const a = o.touches[0];
        a && (t.value = {
          x: a.clientX,
          y: a.clientY
        }, r.value = true);
      }
    };
    return Fi(() => {
      document.addEventListener("mousemove", i), document.addEventListener("dragover", i), document.addEventListener("touchstart", s), document.addEventListener("touchmove", s);
    }), ll(() => {
      document.removeEventListener("dragover", i), document.removeEventListener("mousemove", i), document.removeEventListener("touchstart", s), document.removeEventListener("touchmove", s);
    }), bM(({ delta: o }) => {
      e.value = {
        x: Ve.Damp(e.value.x, t.value.x, 6e-3, o),
        y: Ve.Damp(e.value.y, t.value.y, 6e-3, o)
      };
    }), {
      cursorOpacity: n,
      mouse: t,
      mouseDamp: e,
      movedOnce: r
    };
  });
```

## pointer — _nuxt/BtC8HlFy.js L30300-30310 (hit L30304)
```js
    onMouseDown_(e) {
      var n;
      e.preventDefault(), (n = e.currentTarget) === null || n === void 0 || n.focus();
      const r = this.elem_.ownerDocument;
      r.addEventListener("mousemove", this.onDocumentMouseMove_), r.addEventListener("mouseup", this.onDocumentMouseUp_), this.emitter.emit("down", {
        altKey: e.altKey,
        data: this.computePosition_(K_(e, this.elem_)),
        sender: this,
        shiftKey: e.shiftKey
      });
    }
```

## keyboard — _nuxt/BtC8HlFy.js L30407-30418 (hit L30415)
```js
    constructor(e, n) {
      var r;
      this.originRawValue_ = 0, this.onInputChange_ = this.onInputChange_.bind(this), this.onInputKeyDown_ = this.onInputKeyDown_.bind(this), this.onInputKeyUp_ = this.onInputKeyUp_.bind(this), this.onPointerDown_ = this
        arrayPosition: n.arrayPosition,
        dragging: this.dragging_,
        props: this.props,
        value: this.value,
        viewProps: this.viewProps
      }), this.view.inputElement.addEventListener("change", this.onInputChange_), this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_), this.view.inputElement.addEventListener("keyup", this.onInputKey
      const i = new dl(this.view.knobElement);
      i.emitter.on("down", this.onPointerDown_), i.emitter.on("move", this.onPointerMove_), i.emitter.on("up", this.onPointerUp_);
    }
```