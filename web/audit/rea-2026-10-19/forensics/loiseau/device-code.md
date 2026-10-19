# loiseau — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, page-transition×2, observer×3, shader-uniforms×1, keyboard×2

## loader — 1DV0d0gU5J7vIi6TKYuVpn/framer.D9Fmsqji.mjs L78-96 (hit L95)
```js
function Ot(e2, t2 = `default`, n2) {
  let r2, i2, a2, o2 = () => {
    if (i2 || !n2 || !nv.has(n2)) return;
    let e3 = nv.get(n2);
    xt(e3) ? s2(() => e3) : i2 = Dt(e3, t2);
  }, s2 = (e3) => i2 ? Promise.resolve(i2) : (r2 ||= e3().then((e4) => {
    let n3 = Dt(e4, t2);
    return i2 = n3, n3;
  }).catch((e4) => {
    a2 = e4;
  }), r2), l2 = false, u2 = b(function(t3, r3) {
    if (c(() => {
      l2 = true;
    }, []), a2) throw a2;
    if (o2(), n2 !== void 0 && rv !== void 0 && rv.add(n2), !i2) throw s2(e2);
    return _(i2, { ref: r3, ...t3 });
  });
  return u2.preload = () => (o2(), s2(e2)), u2.getStatus = () => ({ hasLoaded: i2 !== void 0, hasRendered: l2 }), u2;
}
```

## loader — 1DV0d0gU5J7vIi6TKYuVpn/framer.D9Fmsqji.mjs L735-746 (hit L741)
```js
async function In(e2, t2, n2 = true, r2 = true) {
  if (!Bv || !e2) return;
  let i2 = e2.page;
  if (!(!i2 || !Et(i2))) {
    n2 && await Nn();
    try {
      let e3 = await i2.preload();
      r2 && t2 && e3 && await Ln(e3, t2);
    } catch {
    }
  }
}
```

## page-transition — 1DV0d0gU5J7vIi6TKYuVpn/framer.D9Fmsqji.mjs L1067-1080 (hit L1069)
```js
async function _r(e2, t2, n2 = false) {
  if (performance.mark(`framer-history-push`), dr(t2, N.location.href), !n2) {
    N.history.pushState(e2, ``, t2);
    return;
  }
  let r2 = false, i2;
  ly && (i2 = () => {
    if (r2 = true, uy) return;
    let e3 = `Popstate called after intercept(). Please report this to the Framer team.`;
    console.error(e3), _n(`published_site_load_recoverable_error`, { message: e3 });
  }, N.addEventListener(`popstate`, i2, { once: true })), uy && ly ? N.history.__proto__.pushState.call(N.history, e2, ``, t2) : N.history.pushState(e2, ``, t2), ly && queueMicrotask(() => {
    r2 || (ly = false, N.removeEventListener(`popstate`, i2));
  });
}
```

## loader — 1DV0d0gU5J7vIi6TKYuVpn/framer.D9Fmsqji.mjs L2345-2348 (hit L2347)
```js
function Bo({ image: e2, containerSize: t2, nodeId: n2, alt: r2, draggable: i2, avoidAsyncDecoding: a2 }) {
  let o2 = MS.useImageSource(e2, t2, n2), s2 = Ro(e2), { decoding: c2, onImageLoad: l2, onImageMount: u2 } = zo(a2), { srcSet: d2, src: f2 } = `srcSet` in e2 ? { src: o2, srcSet: e2.srcSet } : Po(e2.nodeFixedSize, e2, o2
  return _(`img`, { suppressHydrationWarning: true, ref: u2, decoding: c2, fetchpriority: e2.fetchPriority, loading: e2.loading, width: e2.pixelWidth, height: e2.pixelHeight, sizes: d2 ? e2.sizes : void 0, srcSet: d2, sr
}
```

## observer — 1DV0d0gU5J7vIi6TKYuVpn/framer.D9Fmsqji.mjs L3752-3789 (hit L3758)
```js
function Ou() {
  let e2 = d.connection || d.mozConnection || d.webkitConnection || {}, t2 = d.deviceMemory && d.deviceMemory > TT, n2, r2, i2;
  function a2() {
    n2 = e2.effectiveType || ``, r2 = e2.saveData || n2.includes(`2g`), i2 = n2 === `3g` || t2 ? ET : DT;
  }
  e2.addEventListener?.(`change`, a2), a2();
  let o2 = new IntersectionObserver(l2, { threshold: wT }), s2 = 0;
  async function c2(e3, t3) {
    if (r2) return;
    let { id: n3, preload: i3 } = e3, a3 = AT.get(n3);
    if (!a3?.size || kT.has(n3)) return;
    ++s2, kT.add(n3);
    let c3 = i3()?.catch(() => {
    });
    o2.unobserve(t3), OT.delete(t3);
    for (let e4 of a3) o2.unobserve(e4), OT.delete(e4);
    a3.clear(), AT.delete(n3), await c3, --s2;
  }
  function l2(e3) {
    for (let t3 of e3) {
      let e4 = t3.target, n3 = OT.get(e4);
      if (!n3 || kT.has(n3.id)) {
        o2.unobserve(e4), OT.delete(e4);
        continue;
      }
      let r3 = n3.id, a3 = AT.get(r3), l3 = AT.get(r3)?.size ?? 0;
      if (t3.isIntersecting) {
        if (s2 >= i2) continue;
        a3 ? a3.add(e4) : AT.set(r3, /* @__PURE__ */ new Set([e4])), setTimeout(c2, CT, n3, e4);
      } else a3 && a3.delete(e4), l3 <= 1 && AT.delete(r3);
    }
  }
  return (e3, t3, n3) => {
    if (!kT.has(n3)) return OT.set(e3, { id: n3, preload: t3 }), o2.observe(e3), () => {
      OT.delete(e3), o2.unobserve(e3);
    };
  };
}
```

## observer — 1DV0d0gU5J7vIi6TKYuVpn/framer.D9Fmsqji.mjs L9363-9403 (hit L9378)
```js
      if (!this.scheduledPromotion || !this.lead || !this.follow) return null;
      let e2 = this.lead?.layoutMaybeMutated && !this.shouldAnimate;
      return this.lead.projectionNodes.forEach((t2) => {
        t2?.promote({ needsReset: e2, transition: this.shouldAnimate ? this.transition : void 0, preserveFollowOpacity: t2.options.layoutId === pC && !this.follow?.isExiting });
      }), this.shouldAnimate ? this.follow.layoutMaybeMutated = true : this.scheduleProjectionDidUpdate(), this.lead.layoutMaybeMutated = false, this.transition = void 0, this.scheduledPromotion = false, null;
    }
    componentDidUpdate() {
      if (!this.lead) return null;
      this.scheduledDidUpdate &&= (this.lead.rootProjectionNode?.root?.didUpdate(), false);
    }
    render() {
      return _(mC.Provider, { value: this.sharedLayoutContext, children: this.props.children });
    }
  }, gC = { width: `100%`, height: `100%`, backgroundColor: `none` }, _C = class {
    constructor(e2) {
      R(this, `sharedIntersectionObserver`), R(this, `callbacks`, /* @__PURE__ */ new WeakMap()), this.sharedIntersectionObserver = new IntersectionObserver(this.intersectionObserverCallback.bind(this), e2);
    }
    intersectionObserverCallback(e2, t2) {
      for (let n2 of e2) {
        let e3 = this.callbacks.get(n2.target);
        e3 && e3(n2, t2);
      }
    }
    observeElementWithCallback(e2, t2) {
      this.sharedIntersectionObserver && (this.sharedIntersectionObserver.observe(e2), this.callbacks.set(e2, t2));
    }
    unobserve(e2) {
      this.sharedIntersectionObserver && (this.sharedIntersectionObserver.unobserve(e2), this.callbacks.delete(e2));
    }
    get root() {
      return this.sharedIntersectionObserver?.root;
    }
  }, vC = a(/* @__PURE__ */ new Map()), yC = typeof IntersectionObserver > `u` ? J_ : Vs, bC = Array(100).fill(void 0).map((e2, t2) => t2 * 0.01), xC = M.createContext(null), SC = class extends v {
    constructor() {
      super(...arguments), R(this, `layoutMaybeMutated`, false), R(this, `projectionNodes`, /* @__PURE__ */ new Map()), R(this, `rootProjectionNode`), R(this, `isExiting`), R(this, `shouldPreserveFollowOpacity`, (e2) => 
    }
    componentDidMount() {
      this.props.isLead && this.props.sharedLayoutContext.initLead(this, !!this.props.animatesLayout);
    }
    shouldComponentUpdate(e2) {
      let { isLead: t2, isExiting: n2, isOverlayed: r2, animatesLayout: i2, transition: a2, sharedLayoutContext: o2 } = e2;
```

## observer — 1DV0d0gU5J7vIi6TKYuVpn/motion.Drjkwjo2.mjs L2197-2202 (hit L2201)
```js
function to({ root: e2, ...t2 }) {
  let n2 = e2 || document;
  Xf.has(n2) || Xf.set(n2, {});
  let r2 = Xf.get(n2), i2 = JSON.stringify(t2);
  return r2[i2] || (r2[i2] = new IntersectionObserver(Qf, { root: e2, ...t2 })), r2[i2];
}
```

## shader-uniforms — 1DV0d0gU5J7vIi6TKYuVpn/mmJCwgaHmpYazWEldD_qQe-hyuHNxh3gPctA66keoKA.DmupdeXl.mjs L305-345 (hit L320)
```js
                    edgeAmount *= interaction;

                    vec3 baseColor = unpremultiply(srcCenter);
                    vec3 chromaTint =
                        u_chromaColorR * aR +
                        u_chromaColorG * aG +
                        u_chromaColorB * aB;

                    color = mix(baseColor, chromaTint, edgeAmount);
                    color += unpremultiply(srcCenter) * clamp(energy, 0.0, 1.0) * 0.18;
                } else {
                    alpha = srcCenter.a;
                    color = unpremultiply(srcCenter);
                }

                gl_FragColor = vec4(color * alpha, alpha);
            }
        `), !d2 || !g2 || (c2 = ((e4, t4) => {
      let n3 = a2.createProgram();
      return n3 ? (a2.attachShader(n3, e4), a2.attachShader(n3, t4), a2.linkProgram(n3), a2.getProgramParameter(n3, a2.LINK_STATUS) ? n3 : (console.error(a2.getProgramInfoLog(n3)), a2.deleteProgram(n3), null)) : null;
    })(d2, g2), !c2)) return;
    a2.useProgram(c2), b3 = a2.createBuffer(), a2.bindBuffer(a2.ARRAY_BUFFER, b3), a2.bufferData(a2.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), a2.STATIC_DRAW);
    let k3 = a2.getAttribLocation(c2, `a_position`);
    a2.enableVertexAttribArray(k3), a2.vertexAttribPointer(k3, 2, a2.FLOAT, false, 0, 0), x3 = a2.createTexture(), a2.bindTexture(a2.TEXTURE_2D, x3), a2.texParameteri(a2.TEXTURE_2D, a2.TEXTURE_WRAP_S, a2.CLAMP_TO_EDGE), 
    let A3 = a2.getUniformLocation(c2, `u_logo`), N3 = a2.getUniformLocation(c2, `u_time`), P3 = a2.getUniformLocation(c2, `u_wakes`), R3 = a2.getUniformLocation(c2, `u_wakeVelocity`), H3 = a2.getUniformLocation(c2, `u_w
      if (!x3) return;
      let e4 = t3.getContext(`2d`);
      if (!e4) return;
      let i3 = w2.width / n2, o3 = w2.height / n2;
      e4.setTransform(1, 0, 0, 1, 0, 0), e4.clearRect(0, 0, t3.width, t3.height), e4.setTransform(t3.width / i3, 0, 0, t3.height / o3, 0, 0), e4.clearRect(0, 0, i3, o3), e4.imageSmoothingEnabled = true, e4.imageSmoothing
    }, de2 = rt(p2), fe2 = rt(m2), J2 = rt(h2), pe2 = () => {
      if (o2 = requestAnimationFrame(pe2), !c2 || !x3) return;
      let e4 = performance.now();
      if (!(E2.current && D2.current)) {
        B2.current.active = false, B2.current.last = null, j2.current = j2.current.filter((t5) => e4 - t5.t < 120), L2.current = nt(L2.current, 0, 0.2);
        return;
      }
      if (_2 && !B2.current.active && e4 - re2.current > 1200 + (1 - X(y2, 0, 1)) * 1400 && (B2.current = { active: true, startTime: e4, fadeIn: 1.4, ax1: 0.5 + v2 * 0.18, ax2: 0.08 + v2 * 0.06, ay1: 0.38 + v2 * 0.16, ay
        let t5 = B2.current, n3 = (e4 - t5.startTime) / 1e3, r4 = X(n3 / t5.fadeIn, 0, 1), i4 = 0.5 + (t5.ax1 * Math.sin(n3 * t5.fx1 * Math.PI * 2 + t5.px1) + t5.ax2 * Math.sin(n3 * t5.fx2 * Math.PI * 2 + t5.px2)) * r4, 
        if (F2.current.x = i4, F2.current.y = a3, t5.last) {
          let n4 = Math.max((e4 - t5.last.t) / 1e3, 1e-4);
```

## page-transition — events.framer.com/script?v=2 L158-164 (hit L159)
```js
  function at() {
    addEventListener("popstate", it);
    let e = history.pushState;
    history.pushState = (...t) => {
      e.apply(history, t), it();
    };
  }
```

## keyboard — events.framer.com/script?v=2 L533-546 (hit L533)
```js
          let u = ["keydown", "click", "visibilitychange"], v = (p) => {
            if (p.isTrusted && !n) {
              let E = m.id;
              Be(() => {
                if (!n) {
                  if (!s) {
                    g.disconnect();
                    for (let C of u) removeEventListener(C, v, { capture: true });
                  }
                  E === m.id && (n = true, c(true));
                }
              });
            }
          };
```

## keyboard — events.framer.com/script?v=2 L727-742 (hit L741)
```js
  function Ut(e) {
    if (!ie()) return;
    let t = Number.NEGATIVE_INFINITY, r, i, o, a = () => {
      r !== void 0 && (clearTimeout(r), r = void 0), i !== void 0 && (cancelIdleCallback(i), i = void 0), o = void 0;
    }, n = () => {
      a(), t = performance.now(), e();
    }, s = (d) => {
      let m = performance.now(), T = Math.max(d, t + Bt - m), S = m + T;
      i === void 0 && (o !== void 0 && o <= S || (r !== void 0 && clearTimeout(r), o = S, r = setTimeout(() => {
        r = void 0, "requestIdleCallback" in window ? i = requestIdleCallback(n, { timeout: Bt }) : n();
      }, T)));
    };
    w(() => s(mn), "load");
    let c = () => s(gn);
    addEventListener("pointerdown", c), addEventListener("keydown", c), w(n, "route-change"), w(n, "lazy");
  }
```