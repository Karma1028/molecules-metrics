# localstudio — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: wheel-step×3, raf-lerp×3, shader-uniforms×3, loader×3, observer×2, reveal-timeline×3, keyboard×1, pointer×1

## wheel-step — assets/index-aa194925.js L212-220 (hit L219)
```js
function c2(s26, e) {
  if (!LE.canUseDOM || e && !("addEventListener" in document)) return false;
  var t = "on" + s26, n = t in document;
  if (!n) {
    var i = document.createElement("div");
    i.setAttribute(t, "return;"), n = typeof i[t] == "function";
  }
  return !n && IE && s26 === "wheel" && (n = document.implementation.hasFeature("Events.wheel", "3.0")), n;
}
```

## raf-lerp — assets/index-aa194925.js L3589-3629 (hit L3604)
```js
    return Math.acos(li(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t), i = Math.sin(t), r = this.x - e.x, o = this.y - e.y;
    return this.x = r * n - o * i + e.x, this.y = r * i + o * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
```

## raf-lerp — assets/index-aa194925.js L4059-4099 (hit L4074)
```js
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class ND extends Va {
```

## raf-lerp — assets/index-aa194925.js L4256-4261 (hit L4260)
```js
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const i = Math.min(1, t / n);
    return this.slerp(e, i), this;
  }
```

## shader-uniforms — assets/index-aa194925.js L6325-6365 (hit L6340)
```js
  }
  return e;
}
function jD(s26) {
  const e = [];
  for (let t = 0; t < s26.length; t++) e.push(s26[t].clone());
  return e;
}
function oS(s26) {
  return s26.getRenderTarget() === null ? s26.outputColorSpace : $n;
}
const YD = { clone: cc, merge: Ci };
var KD = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, ZD = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Na extends Zr {
  constructor(e) {
    super(), this.isShaderMaterial = true, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = KD, this.fragmentShader = ZD, this.linewidth = 1, this.wirefra
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = cc(e.uniforms), this.uniformsGroups = jD(e.uniformsGroups), this.defines = Object.assign({}, e.defines
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const i in this.uniforms) {
      const o = this.uniforms[i].value;
      o && o.isTexture ? t.uniforms[i] = { type: "t", value: o.toJSON(e).uuid } : o && o.isColor ? t.uniforms[i] = { type: "c", value: o.getHex() } : o && o.isVector2 ? t.uniforms[i] = { type: "v2", value: o.toArray() } 
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const i in this.extensions) this.extensions[i] === true && (n[i] = true);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}
class aS extends Mn {
  constructor() {
    super(), this.isCamera = true, this.type = "Camera", this.matrixWorldInverse = new Ft(), this.projectionMatrix = new Ft(), this.projectionMatrixInverse = new Ft(), this.coordinateSystem = Zs;
  }
```

## shader-uniforms — assets/index-aa194925.js L6482-6523 (hit L6516)
```js
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = { uniforms: { tEquirect: { value: null } }, vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`, fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			` }, i = new Yu(5, 5, 5), r = new Na({ name: "CubemapFromEquirect", uniforms: cc(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: Xi, blending: Oo });
    r.uniforms.tEquirect.value = t;
    const o = new qi(i, r), a = t.minFilter;
    return t.minFilter === Da && (t.minFilter = Vi), new JD(1, 10, this).update(e, o), t.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
```

## shader-uniforms — assets/index-aa194925.js L7137-7177 (hit L7152)
```js
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, AO = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, CO = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, RO = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, PO = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, LO = "gl_FragColor = linearToOutputTexel( gl_FragColor );", IO = `vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, DO = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
```

## loader — assets/index-aa194925.js L14773-14799 (hit L14777)
```js
  constructor(e, t, n) {
    const i = this;
    let r = false, o = 0, a = 0, c;
    const u = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.itemStart = function(f) {
      a++, r === false && i.onStart !== void 0 && i.onStart(f, o, a), r = true;
    }, this.itemEnd = function(f) {
      o++, i.onProgress !== void 0 && i.onProgress(f, o, a), o === a && (r = false, i.onLoad !== void 0 && i.onLoad());
    }, this.itemError = function(f) {
      i.onError !== void 0 && i.onError(f);
    }, this.resolveURL = function(f) {
      return c ? c(f) : f;
    }, this.setURLModifier = function(f) {
      return c = f, this;
    }, this.addHandler = function(f, p) {
      return u.push(f, p), this;
    }, this.removeHandler = function(f) {
      const p = u.indexOf(f);
      return p !== -1 && u.splice(p, 2), this;
    }, this.getHandler = function(f) {
      for (let p = 0, d = u.length; p < d; p += 2) {
        const m = u[p], g = u[p + 1];
        if (m.global && (m.lastIndex = 0), m.test(f)) return g;
      }
      return null;
    };
  }
```

## loader — assets/index-aa194925.js L14849-14852 (hit L14850)
```js
    if (ks[e] !== void 0) {
      ks[e].push({ onLoad: t, onProgress: n, onError: i });
      return;
    }
```

## loader — assets/index-aa194925.js L14838-14878 (hit L14853)
```js
}
class sd extends Wa {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = fc.get(e);
    if (r !== void 0) return this.manager.itemStart(e), setTimeout(() => {
      t && t(r), this.manager.itemEnd(e);
    }, 0), r;
    if (ks[e] !== void 0) {
      ks[e].push({ onLoad: t, onProgress: n, onError: i });
      return;
    }
    ks[e] = [], ks[e].push({ onLoad: t, onProgress: n, onError: i });
    const o = new Request(e, { headers: new Headers(this.requestHeader), credentials: this.withCredentials ? "include" : "same-origin" }), a = this.mimeType, c = this.responseType;
    fetch(o).then((u) => {
      if (u.status === 200 || u.status === 0) {
        if (u.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || u.body === void 0 || u.body.getReader === void 0) return u;
        const f = ks[e], p = u.body.getReader(), d = u.headers.get("Content-Length") || u.headers.get("X-File-Size"), m = d ? parseInt(d) : 0, g = m !== 0;
        let _ = 0;
        const v = new ReadableStream({ start(x) {
          w();
          function w() {
            p.read().then(({ done: b, value: S }) => {
              if (b) x.close();
              else {
                _ += S.byteLength;
                const M = new ProgressEvent("progress", { lengthComputable: g, loaded: _, total: m });
                for (let C = 0, A = f.length; C < A; C++) {
                  const N = f[C];
                  N.onProgress && N.onProgress(M);
                }
                x.enqueue(S), w();
              }
            });
          }
        } });
        return new Response(v);
      } else throw new nB(`fetch for "${u.url}" responded with ${u.status}: ${u.statusText}`, u);
```

## observer — assets/index-aa194925.js L15533-15573 (hit L15548)
```js
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, Od = function(e) {
  return e._end = ri(e._start + (e._tDur / Math.abs(e._ts || e._rts || dn) || 0));
}, Nd = function(e, t) {
  var n = e._dp;
  return n && n.smoothChildTiming && e._ts && (e._start = ri(n._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Od(e), n._dirty || Aa(n, e)), e;
}, BS = function(e, t) {
  var n;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (n = cd(e.rawTime(), t), (!t._dur || Zu(0, t.totalDuration(), n) - t._tTime > dn) && t.render(n, true)), Aa(e, t)._dp && e._initted 
    if (e._dur < e.duration()) for (n = e; n._dp; ) n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
    e._zTime = -dn;
  }
}, hs = function(e, t, n, i) {
  return t.parent && ko(t), t._start = ri((to(n) ? n : n || e !== En ? Mr(e, n, t) : e._time) + t._delay), t._end = ri(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), FS(e, t, "_first", "_last", e._sort ?
}, zS = function(e, t) {
  return (pr.ScrollTrigger || N_("scrollTrigger", t)) && pr.ScrollTrigger.create(t, e);
}, kS = function(e, t, n, i, r) {
  if (k_(e, t, r), !e._initted) return 1;
  if (!n && e._pt && !xi && (e._dur && e.vars.lazy !== false || !e._dur && e.vars.lazy) && IS !== ur.frame) return Fo.push(e), e._lazy = [r, i], 1;
}, LB = function s9(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || s9(t));
}, zg = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, IB = function(e, t, n, i) {
  var r = e.ratio, o = t < 0 || !t && (!e._start && LB(e) && !(!e._initted && zg(e)) || (e._ts < 0 || e._dp._ts < 0) && !zg(e)) ? 0 : 1, a = e._rDelay, c = 0, u, f, p;
  if (a && e._repeat && (c = Zu(0, e._tDur, t), f = pc(c, a), e._yoyo && f & 1 && (o = 1 - o), f !== pc(e._tTime, a) && (r = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== r || xi || i || e._zTime =
    if (!e._initted && kS(e, t, i, n, c)) return;
    for (p = e._zTime, e._zTime = t || (n ? dn : 0), n || (n = t && !p), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = c, u = e._pt; u; ) u.r(o, u.d), u = u._next;
    t < 0 && Bg(e, t, n, true), e._onUpdate && !n && fr(e, "onUpdate"), c && e._repeat && !n && e.parent && fr(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === o && (o && ko(e, 1), !n && !xi && (fr(e, o ? "onComple
  } else e._zTime || (e._zTime = t);
}, DB = function(e, t, n) {
  var i;
  if (n > t) for (i = e._first; i && i._start <= n; ) {
    if (i.data === "isPause" && i._start > t) return i;
    i = i._next;
  }
  else for (i = e._last; i && i._start >= n; ) {
    if (i.data === "isPause" && i._start < t) return i;
    i = i._prev;
```

## reveal-timeline — assets/index-aa194925.js L15996-16036 (hit L16011)
```js
    return n === void 0 && (n = {}), r = s26.call(this, n) || this, r.labels = {}, r.smoothChildTiming = !!n.smoothChildTiming, r.autoRemoveChildren = !!n.autoRemoveChildren, r._sort = $i(n.sortChildren), En && hs(n.pare
  }
  var t = e.prototype;
  return t.to = function(i, r, o) {
    return Eu(0, arguments, this), this;
  }, t.from = function(i, r, o) {
    return Eu(1, arguments, this), this;
  }, t.fromTo = function(i, r, o, a) {
    return Eu(2, arguments, this), this;
  }, t.set = function(i, r, o) {
    return r.duration = 0, r.parent = this, bu(r).repeatDelay || (r.repeat = 0), r.immediateRender = !!r.immediateRender, new Bn(i, r, Mr(this, o), 1), this;
  }, t.call = function(i, r, o) {
    return hs(this, Bn.delayedCall(0, i, r), o);
  }, t.staggerTo = function(i, r, o, a, c, u, f) {
    return o.duration = r, o.stagger = o.stagger || a, o.onComplete = u, o.onCompleteParams = f, o.parent = this, new Bn(i, o, Mr(this, c)), this;
  }, t.staggerFrom = function(i, r, o, a, c, u, f) {
    return o.runBackwards = 1, bu(o).immediateRender = $i(o.immediateRender), this.staggerTo(i, r, o, a, c, u, f);
  }, t.staggerFromTo = function(i, r, o, a, c, u, f, p) {
    return a.startAt = o, bu(a).immediateRender = $i(a.immediateRender), this.staggerTo(i, r, a, c, u, f, p);
  }, t.render = function(i, r, o) {
    var a = this._time, c = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, f = i <= 0 ? 0 : ri(i), p = this._zTime < 0 != i < 0 && (this._initted || !u), d, m, g, _, v, x, w, b, S, M, C, A;
    if (this !== En && f > c && i >= 0 && (f = c), f !== this._tTime || o || p) {
      if (a !== this._time && u && (f += this._time - a, i += this._time - a), d = f, S = this._start, b = this._ts, x = !b, p && (u || (a = this._zTime), (i || !r) && (this._zTime = i)), this._repeat) {
        if (C = this._yoyo, v = u + this._rDelay, this._repeat < -1 && i < 0) return this.totalTime(v * 100 + i, r, o);
        if (d = ri(f % v), f === c ? (_ = this._repeat, d = u) : (_ = ~~(f / v), _ && _ === f / v && (d = u, _--), d > u && (d = u)), M = pc(this._tTime, v), !a && this._tTime && M !== _ && this._tTime - M * v - this._du
          var N = C && M & 1, T = N === (C && _ & 1);
          if (_ < M && (N = !N), a = N ? 0 : f % u ? u : f, this._lock = 1, this.render(a || (A ? 0 : ri(_ * v)), r, !u)._lock = 0, this._tTime = f, !r && this.parent && fr(this, "onRepeat"), this.vars.repeatRefresh && !
          if (u = this._dur, c = this._tDur, T && (this._lock = 2, a = N ? u : -1e-4, this.render(a, true), this.vars.repeatRefresh && !A && this.invalidate()), this._lock = 0, !this._ts && !x) return this;
          eM(this, A);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (w = DB(this, ri(a), ri(d)), w && (f -= d - (d = w._start))), this._tTime = f, this._time = d, this._act = !b, this._initted || (this._onUpdate = this.vars.
      if (d >= a && i >= 0) for (m = this._first; m; ) {
        if (g = m._next, (m._act || d >= m._start) && m._ts && w !== m) {
          if (m.parent !== this) return this.render(i, r, o);
          if (m.render(m._ts > 0 ? (d - m._start) * m._ts : (m._dirty ? m.totalDuration() : m._tDur) + (d - m._start) * m._ts, r, o), d !== this._time || !this._ts && !x) {
            w = 0, g && (f += this._zTime = -dn);
            break;
          }
        }
        m = g;
```

## wheel-step — assets/index-aa194925.js L17090-17093 (hit L17091)
```js
    }, Pe = function() {
      var Je = se.deltaX = $w(pe), pt = se.deltaY = $w(De), Ue = Math.abs(Je) >= i, gt = Math.abs(pt) >= i;
      j && (Ue || gt) && j(se, Je, pt, pe, De), Ue && (M && se.deltaX > 0 && M(se), C && se.deltaX < 0 && C(se), T && T(se), W && se.deltaX < 0 != nt < 0 && W(se), nt = se.deltaX, pe[0] = pe[1] = pe[2] = 0), gt && (N && 
    }, Ae = function(Je, pt, Ue) {
```

## wheel-step — assets/index-aa194925.js L17089-17129 (hit L17104)
```js
      se._vx.reset(), se._vy.reset(), Ze.pause(), p && p(se);
    }, Pe = function() {
      var Je = se.deltaX = $w(pe), pt = se.deltaY = $w(De), Ue = Math.abs(Je) >= i, gt = Math.abs(pt) >= i;
      j && (Ue || gt) && j(se, Je, pt, pe, De), Ue && (M && se.deltaX > 0 && M(se), C && se.deltaX < 0 && C(se), T && T(se), W && se.deltaX < 0 != nt < 0 && W(se), nt = se.deltaX, pe[0] = pe[1] = pe[2] = 0), gt && (N && 
    }, Ae = function(Je, pt, Ue) {
      pe[Ue] += Je, De[Ue] += pt, se._vx.update(Je), se._vy.update(pt), u ? vt || (vt = requestAnimationFrame(Pe)) : Pe();
    }, Le = function(Je, pt) {
      Fe && !$e && (se.axis = $e = Math.abs(Je) > Math.abs(pt) ? "x" : "y", qe = true), $e !== "y" && (pe[2] += Je, se._vx.update(Je, true)), $e !== "x" && (De[2] += pt, se._vy.update(pt, true)), u ? vt || (vt = requestA
    }, st = function(Je) {
      if (!z(Je, 1)) {
        Je = nu(Je, f);
        var pt = Je.clientX, Ue = Je.clientY, gt = pt - se.x, ot = Ue - se.y, ht = se.isDragging;
        se.x = pt, se.y = Ue, (ht || Math.abs(se.startX - pt) >= r || Math.abs(se.startY - Ue) >= r) && (w && (re = true), ht || (se.isDragging = true), Le(gt, ot), ht || v && v(se));
      }
    }, xt = se.onPress = function(He) {
      z(He, 1) || He && He.button || (se.axis = $e = null, Ze.pause(), se.isPressed = true, He = nu(He), nt = at = 0, se.startX = se.x = He.clientX, se.startY = se.y = He.clientY, se._vx.reset(), se._vy.reset(), Ai(J ? a
    }, X = se.onRelease = function(He) {
      if (!z(He, 1)) {
        Ti(J ? a : le, Xr[1], st, true);
        var Je = !isNaN(se.y - se.startY), pt = se.isDragging, Ue = pt && (Math.abs(se.x - se.startX) > 3 || Math.abs(se.y - se.startY) > 3), gt = nu(He);
        !Ue && Je && (se._vx.reset(), se._vy.reset(), f && ze && ui.delayedCall(0.08, function() {
          if (Au() - xe > 300 && !He.defaultPrevented) {
            if (He.target.click) He.target.click();
            else if (le.createEvent) {
              var ot = le.createEvent("MouseEvents");
              ot.initMouseEvent("click", true, true, hr, 1, gt.screenX, gt.screenY, gt.clientX, gt.clientY, false, false, false, false, 0, null), He.target.dispatchEvent(ot);
            }
          }
        })), se.isDragging = se.isGesturing = se.isPressed = false, p && pt && !J && Ze.restart(true), x && pt && x(se), S && S(se, Ue);
      }
    }, Ie = function(Je) {
      return Je.touches && Je.touches.length > 1 && (se.isGesturing = true) && ae(Je, se.isDragging);
    }, ue = function() {
      return (se.isGesturing = false) || F(se);
    }, Ee = function(Je) {
      if (!z(Je)) {
        var pt = lt(), Ue = yt();
        Ae((pt - k) * Se, (Ue - D) * Se, 1), k = pt, D = Ue, p && Ze.restart(true);
      }
    }, Te = function(Je) {
      if (!z(Je)) {
```

## keyboard — assets/index-aa194925.js L20440-20480 (hit L20455)
```js
if (!qn.now) {
  let s26 = Date.now();
  qn.timing && qn.timing.navigationStart && (s26 = qn.timing.navigationStart), qn.now = () => Date.now() - s26;
}
new L();
const UG = { type: "postStep" }, FG = { type: "preStep" }, su = { type: Xe.COLLIDE_EVENT_NAME, body: null, contact: null }, BG = [], zG = [], kG = [], HG = [], Gs = [], Vs = [], ou = { type: "beginContact", bodyA: null, 
class VG extends Va {
  constructor(e, t) {
    super(), this.object = e, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = true, this.target = new ee(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom =
      return a.phi;
    }, this.getAzimuthalAngle = function() {
      return a.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(z) {
      z.addEventListener("keydown", D), this._domElementKeyEvents = z;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", D), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      n.target0.copy(n.target), n.position0.copy(n.object.position), n.zoom0 = n.object.zoom;
    }, this.reset = function() {
      n.target.copy(n.target0), n.object.position.copy(n.position0), n.object.zoom = n.zoom0, n.object.updateProjectionMatrix(), n.dispatchEvent(Lb), n.update(), r = i.NONE;
    }, this.update = (function() {
      const z = new ee(), ge = new vs().setFromUnitVectors(e.up, new ee(0, 1, 0)), Pe = ge.clone().invert(), Ae = new ee(), Le = new vs(), st = new ee(), xt = 2 * Math.PI;
      return function(Ie = null) {
        const ue = n.object.position;
        z.copy(ue).sub(n.target), z.applyQuaternion(ge), a.setFromVector3(z), n.autoRotate && r === i.NONE && j(T(Ie)), n.enableDamping ? (a.theta += c.theta * n.dampingFactor, a.phi += c.phi * n.dampingFactor) : (a.thet
        let Ee = n.minAzimuthAngle, Te = n.maxAzimuthAngle;
        isFinite(Ee) && isFinite(Te) && (Ee < -Math.PI ? Ee += xt : Ee > Math.PI && (Ee -= xt), Te < -Math.PI ? Te += xt : Te > Math.PI && (Te -= xt), Ee <= Te ? a.theta = Math.max(Ee, Math.min(Te, a.theta)) : a.theta = 
        let mt = false;
        if (n.zoomToCursor && C) {
          let Dt = null;
          if (n.object.isPerspectiveCamera) {
            const Ot = z.length();
            Dt = ae(Ot * u);
            const Tn = Ot - Dt;
            n.object.position.addScaledVector(S, Tn), n.object.updateMatrixWorld();
          } else if (n.object.isOrthographicCamera) {
            const Ot = new ee(M.x, M.y, 0);
            Ot.unproject(n.object), n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / u)), n.object.updateProjectionMatrix(), mt = true;
            const Tn = new ee(M.x, M.y, 0);
```

## pointer — assets/index-aa194925.js L20625-20665 (hit L20640)
```js
        _.set(Pe, Ae);
      }
      v.subVectors(_, g).multiplyScalar(n.panSpeed), H(v.x, v.y), g.copy(_);
    }
    function qe(z) {
      const ge = ne(z), Pe = z.pageX - ge.x, Ae = z.pageY - ge.y, Le = Math.sqrt(Pe * Pe + Ae * Ae);
      w.set(0, Le), b.set(0, Math.pow(w.y / x.y, n.zoomSpeed)), V(b.y), x.copy(w);
    }
    function $e(z) {
      n.enableZoom && qe(z), n.enablePan && Re(z);
    }
    function se(z) {
      n.enableZoom && qe(z), n.enableRotate && it(z);
    }
    function nt(z) {
      n.enabled !== false && (A.length === 0 && (n.domElement.setPointerCapture(z.pointerId), n.domElement.addEventListener("pointermove", at), n.domElement.addEventListener("pointerup", ct)), pe(z), z.pointerType === "t
    }
    function at(z) {
      n.enabled !== false && (z.pointerType === "touch" ? me(z) : yt(z));
    }
    function ct(z) {
      De(z), A.length === 0 && (n.domElement.releasePointerCapture(z.pointerId), n.domElement.removeEventListener("pointermove", at), n.domElement.removeEventListener("pointerup", ct)), n.dispatchEvent(Ib), r = i.NONE;
    }
    function lt(z) {
      let ge;
      switch (z.button) {
        case 0:
          ge = n.mouseButtons.LEFT;
          break;
        case 1:
          ge = n.mouseButtons.MIDDLE;
          break;
        case 2:
          ge = n.mouseButtons.RIGHT;
          break;
        default:
          ge = -1;
      }
      switch (ge) {
        case hl.DOLLY:
          if (n.enableZoom === false) return;
```

## reveal-timeline — assets/index-aa194925.js L23370-23384 (hit L23383)
```js
  constructor({ element: e }) {
    this.element = e, this.spanElement = e.querySelector("span") || e;
    const t = this.element.dataset.buttonIcon !== void 0, n = this.element.textContent, i = document.createElement("div");
    i.textContent = n;
    const r = new $u(i, { types: "chars", tagName: "span" }).chars, o = document.createElement("div");
    o.textContent = n;
    const a = new $u(o, { types: "chars", tagName: "span" }).chars;
    if (t) {
      const c = this.spanElement.querySelector("svg"), u = c.cloneNode(["1"]);
      Ce.set(u, { marginLeft: "0.8rem" }), i.appendChild(u), r.push(u);
      const f = c.cloneNode(["1"]);
      Ce.set(f, { marginLeft: "0.8rem" }), o.appendChild(f), a.push(f);
    }
    e.appendChild(i), e.appendChild(o), Ce.set([o, i], { position: "absolute" }), Ce.set(a, { yPercent: 130 }), this.tl = Ce.timeline({ paused: true, defaults: { duration: 0.35, ease: Zt, stagger: 0.015 } }), this.tl.to(
  }
```

## reveal-timeline — assets/index-aa194925.js L23396-23402 (hit L23400)
```js
  formatText() {
    if (this.element.textContent === "Copied!") {
      this.element.innerHTML = this.innerHTML;
      const e = this.element.children[1].querySelectorAll("span"), t = this.element.children[2].querySelectorAll("span");
      Ce.set(e, { y: 0, yPercent: 0 }), Ce.set(t, { y: 0, yPercent: 130 }), this.tl = Ce.timeline({ paused: true, defaults: { duration: 0.4, ease: Zt, stagger: 0.02 } }), this.tl.to(e, { yPercent: -130 }).fromTo(t, { yPe
    }
  }
```

## observer — assets/index-aa194925.js L23599-23639 (hit L23614)
```js
  constructor({ element: e, index: t }) {
    Ed(e, "span", ""), super({ element: e, elements: { span: e.querySelector("span") } }), this.index = t;
  }
  animateIn() {
    Ce.to(this.elements.span, { yPercent: 0, ease: Zt, duration: 0.6, delay: 0.075 * this.index }), super.animateIn();
  }
  animateOut() {
    Ce.set(this.elements.span, { yPercent: 105 }), super.animateOut();
  }
}
class cq {
  constructor({ element: e }) {
    this.element = e, this.id = "section", this.amount = Number(e.dataset.amount) || 50;
  }
  createAnimation() {
    this.tl = Ce.timeline({ scrollTrigger: { trigger: this.element, start: "top bottom", end: "90% bottom", scrub: 1, paused: true } }), this.tl.fromTo(this.element, { yPercent: () => 0 }, { yPercent: () => -this.amount 
  }
  hide() {
    this.tl.kill(), this.tl = null;
  }
  destroyAnimation() {
    this.element.style[this.transform] = "";
  }
}
function uq(s26, e) {
  for (var t = -1, n = s26 == null ? 0 : s26.length, i = Array(n); ++t < n; ) i[t] = e(s26[t], t, s26);
  return i;
}
var WT = uq;
function hq() {
  this.__data__ = [], this.size = 0;
}
var fq = hq;
function dq(s26, e) {
  return s26 === e || s26 !== s26 && e !== e;
}
var qT = dq, pq = qT;
function mq(s26, e) {
  for (var t = s26.length; t--; ) if (pq(s26[t][0], e)) return t;
  return -1;
}
```