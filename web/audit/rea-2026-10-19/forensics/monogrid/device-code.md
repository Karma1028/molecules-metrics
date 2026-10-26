# monogrid — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, wheel-step×3, reveal-timeline×3, observer×3, shader-uniforms×3, raf-lerp×3

## loader — static/app-ChHEQ1MD.js L1917-1920 (hit L1919)
```js
}, Qo = function() {
  ho = Ao(), ho && (_o = ho.parseEase, vo = ho.utils.toArray, xo = ho.utils.getUnit, Co = ho.core.getCache, To = ho.utils.clamp, Do = ho.core.getStyleSaver, Oo = ho.core.reverting || function() {
  }, yo = _o(`power3`), wo = yo(0.05), So = ho.core.PropTween, ho.config({ resistance: 100, unitFactors: { time: 1e3, totalTime: 1e3, progress: 1e3, totalProgress: 1e3 } }), bo = ho.config(), ho.registerPlugin(mo), go = 
}, $o = { version: `3.15.0`, name: `inertia`, register: function(e18) {
```

## wheel-step — static/app-ChHEQ1MD.js L2130-2133 (hit L2131)
```js
    }, be2 = function() {
      var e20 = U2.deltaX = vc(he2), n3 = U2.deltaY = vc(K2), r3 = Math.abs(e20) >= t3, i3 = Math.abs(n3) >= t3;
      w2 && (r3 || i3) && w2(U2, e20, n3, he2, K2), r3 && (v2 && U2.deltaX > 0 && v2(U2), y2 && U2.deltaX < 0 && y2(U2), S2 && S2(U2), T2 && U2.deltaX < 0 != W2 < 0 && T2(U2), W2 = U2.deltaX, he2[0] = he2[1] = he2[2] = 0
    }, xe2 = function(e20, t4, n3) {
```

## wheel-step — static/app-ChHEQ1MD.js L2129-2169 (hit L2144)
```js
      U2._vx.reset(), U2._vy.reset(), V2.pause(), c2 && c2(U2);
    }, be2 = function() {
      var e20 = U2.deltaX = vc(he2), n3 = U2.deltaY = vc(K2), r3 = Math.abs(e20) >= t3, i3 = Math.abs(n3) >= t3;
      w2 && (r3 || i3) && w2(U2, e20, n3, he2, K2), r3 && (v2 && U2.deltaX > 0 && v2(U2), y2 && U2.deltaX < 0 && y2(U2), S2 && S2(U2), T2 && U2.deltaX < 0 != W2 < 0 && T2(U2), W2 = U2.deltaX, he2[0] = he2[1] = he2[2] = 0
    }, xe2 = function(e20, t4, n3) {
      he2[n3] += e20, K2[n3] += t4, U2._vx.update(e20), U2._vy.update(t4), o2 ? B2 || (B2 = requestAnimationFrame(be2)) : be2();
    }, Se2 = function(e20, t4) {
      te2 && !oe2 && (U2.axis = oe2 = Math.abs(e20) > Math.abs(t4) ? `x` : `y`, ae2 = true), oe2 !== `y` && (he2[2] += e20, U2._vx.update(e20, true)), oe2 !== `x` && (K2[2] += t4, U2._vy.update(t4, true)), o2 ? B2 || (B2
    }, Ce2 = function(e20) {
      if (!ve2(e20, 1)) {
        e20 = _c(e20, s2);
        var t4 = e20.clientX, r3 = e20.clientY, i3 = t4 - U2.x, a3 = r3 - U2.y, o3 = U2.isDragging;
        U2.x = t4, U2.y = r3, (o3 || (i3 || a3) && (Math.abs(U2.startX - t4) >= n2 || Math.abs(U2.startY - r3) >= n2)) && (re2 || (re2 = o3 ? 2 : 1), o3 || (U2.isDragging = true), Se2(i3, a3));
      }
    }, we2 = U2.onPress = function(e20) {
      ve2(e20, 1) || e20 && e20.button || (U2.axis = oe2 = null, V2.pause(), U2.isPressed = true, e20 = _c(e20), W2 = se2 = 0, U2.startX = U2.x = e20.clientX, U2.startY = U2.y = e20.clientY, U2._vx.reset(), U2._vy.reset(
    }, Te2 = U2.onRelease = function(e20) {
      if (!ve2(e20, 1)) {
        oc(j2 ? i2 : G2, Js[1], Ce2, true);
        var t4 = !isNaN(U2.y - U2.startY), n3 = U2.isDragging, r3 = n3 && (Math.abs(U2.x - U2.startX) > 3 || Math.abs(U2.y - U2.startY) > 3), a3 = _c(e20);
        !r3 && t4 && (U2._vx.reset(), U2._vy.reset(), s2 && z2 && Ls.delayedCall(0.08, function() {
          if (ec() - ge2 > 300 && !e20.defaultPrevented) {
            if (e20.target.click) e20.target.click();
            else if (G2.createEvent) {
              var t5 = G2.createEvent(`MouseEvents`);
              t5.initMouseEvent(`click`, true, true, zs, 1, a3.screenX, a3.screenY, a3.clientX, a3.clientY, false, false, false, false, 0, null), e20.target.dispatchEvent(t5);
            }
          }
        })), U2.isDragging = U2.isGesturing = U2.isPressed = false, c2 && n3 && !j2 && V2.restart(true), re2 && be2(), m2 && n3 && m2(U2), _2 && _2(U2, r3);
      }
    }, q2 = function(e20) {
      return e20.touches && e20.touches.length > 1 && (U2.isGesturing = true) && M2(e20, U2.isDragging);
    }, Ee2 = function() {
      return (U2.isGesturing = false) || N2(U2);
    }, De2 = function(e20) {
      if (!ve2(e20)) {
        var t4 = le2(), n3 = ue2();
        xe2((t4 - de2) * L2, (n3 - fe2) * L2, 1), de2 = t4, fe2 = n3, c2 && V2.restart(true);
      }
    }, Oe2 = function(e20) {
      if (!ve2(e20)) {
```

## wheel-step — static/app-ChHEQ1MD.js L2168-2174 (hit L2172)
```js
    }, Oe2 = function(e20) {
      if (!ve2(e20)) {
        e20 = _c(e20, s2), P2 && (H2 = true);
        var t4 = (e20.deltaMode === 1 ? a2 : e20.deltaMode === 2 ? zs.innerHeight : 1) * d2;
        xe2(e20.deltaX * t4, e20.deltaY * t4, 0), c2 && !j2 && V2.restart(true);
      }
    }, ke2 = function(e20) {
```

## loader — static/app-ChHEQ1MD.js L2282-2285 (hit L2283)
```js
}, Kl = function(e18, t2) {
  var n2 = t2 && Ul(e18)[Pc] !== `matrix(1, 0, 0, 1, 0, 0)` && X.to(e18, { x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, rotationX: 0, rotationY: 0, scale: 1, skewX: 0, skewY: 0 }).progress(1), r2 = e18.getBoundingC
  return n2 && n2.progress(0).kill(), r2;
}, ql = function(e18, t2) {
```

## loader — static/app-ChHEQ1MD.js L2338-2341 (hit L2340)
```js
}, su = function(e18, t2, n2, r2) {
  var i2 = { display: `block` }, a2 = n2[r2 ? `os2` : `p2`], o2 = n2[r2 ? `p2` : `os2`];
  e18._isFlipped = r2, i2[n2.a + `Percent`] = r2 ? -100 : 0, i2[n2.a] = r2 ? `1px` : 0, i2[`border` + a2 + Bl] = 1, i2[`border` + o2 + Bl] = 0, i2[n2.p] = t2 + `px`, X.set(e18, i2);
}, Q = [], cu = {}, lu, uu = function() {
```

## reveal-timeline — static/app-ChHEQ1MD.js L3131-3171 (hit L3146)
```js
      for (c2 = [a2, o2], m2 = Math.max(5, (n2.precision || 1) * 200), d2 = 1 / m2, m2 += 2, h2 = 5 / m2, g2 = _f(a2 + d2 * r2), _2 = _f(o2 + t3(d2) * -i2), l2 = (_2 - o2) / (g2 - a2), u2 = 2; u2 < m2; u2++) f2 = _f(a2 +
      c2 = `M` + c2.join(`,`);
    }
    return s2 && s2.setAttribute(`d`, c2), c2;
  }, e18;
})();
wf.version = `3.15.0`, wf.headless = true, mf() && ff.registerPlugin(wf), ze.registerPlugin(wf), wf.create(`cameraBounceBack`, `M0,0 C0.03,0.28 0.07,0.81 0.28,1.06 0.67,1.38 0.5,-0.19 0.71,-0.14 0.82,-0.1 0.81,0.03 0.99,
var Tf = /* @__PURE__ */ new Set([`div`, `span`, `p`, `em`, `strong`, `b`, `i`, `code`, `sub`, `sup`, `time`, `label`]);
function Ef(e18) {
  let t2 = !e18.hasAttribute(`role`) && Tf.has(e18.tagName.toLowerCase());
  return t2 && e18.setAttribute(`role`, `group`), () => {
    t2 && e18.removeAttribute(`role`);
  };
}
function Df(e18, t2) {
  return ze.from(e18, { opacity: 0, ease: `none`, duration: 0.3, stagger: 0.03, ...t2 });
}
function Of(e18, t2) {
  let n2 = Ef(e18), r2 = new Dd(e18, { type: `chars`, mask: `words` }), i2 = r2.chars?.length, a2 = t2?.duration || i2 * 0.167 || 1;
  return ze.from(r2.chars, { data: { destroy: () => {
    r2.revert(), n2();
  } }, display: `none`, ease: `power3.inOut`, stagger: { amount: a2 / 2, from: `start` }, ...t2, duration: a2 });
}
function kf(e18, t2) {
  let n2 = Ef(e18), r2 = new Dd(e18, { type: `words`, mask: `lines` }), i2 = t2?.duration || 1;
  return ze.from(r2.words, { data: { destroy: () => {
    r2.revert(), n2();
  } }, duration: i2, color: `black`, ease: `steps(1)`, stagger: { amount: i2, from: `start` }, ...t2 });
}
function Af(e18, t2) {
  return ze.from(e18, { scale: 0, opacity: 0, ease: `power3.inOut`, stagger: 0.03, ...t2 });
}
function jf(e18, t2) {
  return ze.from(e18, { yPercent: 140, ease: `power3.inOut`, stagger: 0.03, ...t2 });
}
function Mf(e18, t2) {
  return ze.from(e18, { scaleX: 0, ease: `power3.out`, stagger: 0.03, ...t2 });
}
function Nf(e18, t2) {
  return ze.from(e18, { scaleY: 0, ease: `power3.out`, stagger: 0.03, ...t2 });
}
```

## reveal-timeline — static/app-ChHEQ1MD.js L3178-3181 (hit L3180)
```js
ze.registerEffect({ name: `blink`, effect: (e18, t2) => {
  let n2 = ze.timeline();
  return n2.to(e18, { stagger: { each: 0.1, from: `random` }, keyframes: { value: [+!t2.in, 1, 1, 1, 0, 0.4, 0, 0.4, 0, +!!t2.in], ease: `power1.inOut` }, duration: t2.duration, ease: `power2.in` }), n2;
}, defaults: { duration: 0.65, in: true }, extendTimeline: true }), ze.registerEffect({ name: `objScale`, effect: (e18, t2) => {
```

## reveal-timeline — static/app-ChHEQ1MD.js L3181-3184 (hit L3183)
```js
}, defaults: { duration: 0.65, in: true }, extendTimeline: true }), ze.registerEffect({ name: `objScale`, effect: (e18, t2) => {
  let n2 = ze.timeline(), r2 = e18[0];
  return n2.fromTo(r2.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: t2.duration, ease: t2.ease }, 0), n2.fromTo(r2.rotation, { x: () => De.degToRad(-20), y: () => De.degToRad(-90) }, { x: 0, y: 0, duration: 
}, defaults: { ease: `power2.out`, duration: 0.5 }, extendTimeline: true });
```

## observer — static/app-ChHEQ1MD.js L3204-3208 (hit L3205)
```js
function Vf(e18, t2) {
  e18._reveal.observer = new IntersectionObserver(([{ isIntersecting: n2 }]) => {
    n2 ? Bf(e18) : t2 ? e18._reveal.animation.pause() : !e18._reveal.parent && !e18._reveal.animation.paused() && (e18._reveal.animation.seek(e18._reveal.animation.duration()), e18._reveal.destroy?.());
  }), e18._reveal.observer.observe(e18);
}
```

## observer — static/dist-s0CLK6ei.js L281-296 (hit L284)
```js
function q(t2, r2, i2 = {}) {
  let { root: a2, rootMargin: o2, threshold: s2 = 0, window: l2 = j, immediate: u2 = true } = i2, d2 = R(() => l2 && `IntersectionObserver` in l2), p2 = c(() => _(e(t2)).map(N).filter(b)), m2 = g, h2 = f(u2), y2 = d2.val
    if (m2(), !h2.value || !e2.length) return;
    let i3 = new IntersectionObserver(r2, { root: N(t3), rootMargin: n2, threshold: s2 });
    e2.forEach((e3) => e3 && i3.observe(e3)), m2 = () => {
      i3.disconnect(), m2 = g;
    };
  }, { immediate: u2, flush: `post` }) : g, x2 = () => {
    m2(), y2(), h2.value = false;
  };
  return v(x2), { isSupported: d2, isActive: h2, pause() {
    m2(), h2.value = false;
  }, resume() {
    h2.value = true;
  }, stop: x2 };
}
```

## shader-uniforms — static/App-Cc3reAyR.js L569-609 (hit L584)
```js
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`, displacementmap_pars_vertex: `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, displacementmap_vertex: `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, emissivemap_fragment: `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, emissivemap_pars_fragment: `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, colorspace_fragment: `gl_FragColor = linearToOutputTexel( gl_FragColor );`, colorspace_pars_fragment: `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, envmap_fragment: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
```

## shader-uniforms — static/App-Cc3reAyR.js L718-758 (hit L733)
```js
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, fog_vertex: `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, fog_pars_vertex: `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, fog_fragment: `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, fog_pars_fragment: `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, gradientmap_pars_fragment: `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, lightmap_pars_fragment: `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, lights_lambert_fragment: `LambertMaterial material;
```

## shader-uniforms — static/App-Cc3reAyR.js L1830-1870 (hit L1845)
```js
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, iridescence_pars_fragment: `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, opaque_fragment: `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, packing: `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
```

## raf-lerp — static/App-Cc3reAyR.js L7969-8009 (hit L7984)
```js
  advance(e3) {
    if (!this.isRunning) return;
    let t2 = false;
    if (this.duration && this.easing) {
      this.currentTime += e3;
      let n2 = Va(0, this.currentTime / this.duration, 1);
      t2 = n2 >= 1;
      let r2 = t2 ? 1 : this.easing(n2);
      this.value = this.from + (this.to - this.from) * r2;
    } else this.lerp ? (this.value = Ua(this.value, this.to, this.lerp * 60, e3), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, t2 = true)) : (this.value = this.to, t2 = true);
    t2 && this.stop(), this.onUpdate?.(this.value, t2);
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(e3, t2, { lerp: n2, duration: r2, easing: i2, onStart: a2, onUpdate: o2 }) {
    this.from = this.value = e3, this.to = t2, this.lerp = n2, this.duration = r2, this.easing = i2, this.currentTime = 0, this.isRunning = true, a2?.(), this.onUpdate = o2;
  }
};
function Ka(e3, t2) {
  let n2;
  return function(...r2) {
    clearTimeout(n2), n2 = setTimeout(() => {
      n2 = void 0, e3.apply(this, r2);
    }, t2);
  };
}
var qa = class {
  constructor(e3, t2, { autoResize: n2 = true, debounce: r2 = 250 } = {}) {
    Y(this, `width`, 0), Y(this, `height`, 0), Y(this, `scrollHeight`, 0), Y(this, `scrollWidth`, 0), Y(this, `debouncedResize`, void 0), Y(this, `wrapperResizeObserver`, void 0), Y(this, `contentResizeObserver`, void 0)
      this.onWrapperResize(), this.onContentResize();
    }), Y(this, `onWrapperResize`, () => {
      this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    }), Y(this, `onContentResize`, () => {
      this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scroll
    }), this.wrapper = e3, this.content = t2, n2 && (this.debouncedResize = Ka(this.resize, r2), this.wrapper instanceof Window ? window.addEventListener(`resize`, this.debouncedResize) : (this.wrapperResizeObserver = ne
  }
  destroy() {
    this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener(`resize`, this.debouncedResize);
  }
  get limit() {
```

## raf-lerp — static/App-Cc3reAyR.js L8187-8229 (hit L8187)
```js
  scrollTo(e3, { offset: t2 = 0, immediate: n2 = false, lock: r2 = false, programmatic: i2 = true, lerp: a2 = i2 ? this.options.lerp : void 0, duration: o2 = i2 ? this.options.duration : void 0, easing: s2 = i2 ? this.op
    if (this.prefersReducedMotion && (i2 ? n2 = true : (a2 = 1, o2 = void 0, s2 = void 0)), (this.isStopped || this.isLocked) && !u2) return;
    let f2 = e3, p2 = t2;
    if (typeof f2 == `string` && [`top`, `left`, `start`, `#`].includes(f2)) f2 = 0;
    else if (typeof f2 == `string` && [`bottom`, `right`, `end`].includes(f2)) f2 = this.limit;
    else {
      let e4 = null;
      if (typeof f2 == `string` ? (e4 = f2.startsWith(`#`) ? document.getElementById(f2.slice(1)) : document.querySelector(f2), e4 || (f2 === `#top` ? f2 = 0 : console.warn(`Lenis: Target not found`, f2))) : f2 instanceo
        if (this.options.wrapper !== window) {
          let e5 = this.rootElement.getBoundingClientRect();
          p2 -= this.isHorizontal ? e5.left : e5.top;
        }
        let t3 = e4.getBoundingClientRect(), n3 = getComputedStyle(e4), r3 = this.isHorizontal ? Number.parseFloat(n3.scrollMarginLeft) : Number.parseFloat(n3.scrollMarginTop), i3 = getComputedStyle(this.rootElement), a3
        f2 = (this.isHorizontal ? t3.left : t3.top) + this.animatedScroll - (Number.isNaN(r3) ? 0 : r3) - (Number.isNaN(a3) ? 0 : a3);
      }
    }
    if (typeof f2 == `number`) {
      if (f2 += p2, this.options.infinite) {
        if (i2) {
          this.targetScroll = this.animatedScroll = this.scroll;
          let e4 = f2 - this.animatedScroll;
          e4 > this.limit / 2 ? f2 -= this.limit : e4 < -this.limit / 2 && (f2 += this.limit);
        }
      } else f2 = Va(0, f2, this.limit);
      if (f2 === this.targetScroll) {
        c2?.(this), l2?.(this);
        return;
      }
      if (this.userData = d2 ?? {}, n2) {
        this.animatedScroll = this.targetScroll = f2, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), l2?.(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      i2 || (this.targetScroll = f2), typeof o2 == `number` && typeof s2 != `function` ? s2 = $a : typeof s2 == `function` && typeof o2 != `number` && (o2 = 1), this.animate.fromTo(this.animatedScroll, f2, { duration: o2
        r2 && (this.isLocked = true), this.isScrolling = `smooth`, c2?.(this);
      }, onUpdate: (e4, t3) => {
        this.isScrolling = `smooth`, this.lastVelocity = this.velocity, this.velocity = e4 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = e4, this.setScroll(this.scroll), i2 && (t
          this.dispatchScrollendEvent();
        }), this.preventNextNativeScrollEvent());
      } });
    }
  }
```

## observer — static/App-Cc3reAyR.js L8313-8353 (hit L8328)
```js
    }
  }, d2 = () => {
    a2.value && (a2.value = (l2(), a2.value.destroy(), void 0));
  }, f2 = () => {
    d2(), u2();
  }, p2 = { instance: a2, destroy: d2, restart: f2 };
  return i(s2, (e4) => {
    jt && (e4 ? u2() : d2());
  }), i(n2, () => {
    jt && f2();
  }, { immediate: jt }), i([a2, o2], ([e4, t3]) => {
    !jt || !e4 || e4.options.wrapper !== window || (t3 ? e4.stop() : e4.start());
  }), h(d2), t2?.autoProvide && _(no, p2), p2;
}
var io = `/static/share-dKFo8Ben.jpg`, ao = v({ name: `ScrollProgress`, setup(e3, { attrs: t2, slots: n2, emit: r2 }) {
  let s2 = a(lt), c2 = o(`wrapper`), l2 = E(0), u2 = E(1), d2 = g(() => !s2.value || s2.value.visible && !s2.value.leaving), f2 = kt.timeline({ scrollTrigger: { start: `top top`, end: `bottom bottom`, scrub: true } }).fr
  return h(() => f2.kill()), i([c2, d2], ([e4, t3]) => {
    e4 && (Jt.refresh(), kt.to(e4, { width: t3 ? `0%` : `100%`, duration: 1.5, ease: `power4.inOut` }));
  }), { loader: s2, mini: d2, progress1: l2, progress2: u2 };
} }), oo = () => {
  Xt((e3) => ({ v6840ce0d: e3.progress1, v6840ce0e: e3.progress2 }));
}, so = ao.setup;
ao.setup = so ? (e3, t2) => (oo(), so(e3, t2)) : oo;
var co = { ref: `wrapper`, class: `flex items-center h-full w-0` };
function lo(e3, t2, n2, r2, i2, a2) {
  return y(), f(`div`, { class: u([`wrapper fixed bottom-0 left-0 h-2 pointer-events-none`, { "opacity-0": !e3.$route.meta?.scrollProgress }]) }, [d(`div`, co, [...t2[0] || (t2[0] = [c(`<div class="relative w-[20%] h-ful
}
var uo = Ut(ao, [[`render`, lo], [`__scopeId`, `data-v-6fb9f918`]]), fo = v({ name: `LanguageBanner`, components: { CtaPrimary: sn, FormKit: an, FormProvider: on }, setup(e3, { attrs: t2, slots: n2, emit: r2 }) {
  let i2 = a(ee)(), o2 = Nt(`banner-select-lang`, false), s2 = Oe();
  return { options: Object.entries(i2).map(([e4, t3]) => ({ label: t3.name + (e4 === `en` ? `` : `*`), value: e4 })), submit: (e4) => {
    s2.push({ params: { locale: e4.lang } }), o2.value = true;
  }, store: o2 };
} }), po = { key: 0, class: `banner bg-blue c-white fixed left-0 right-0 bottom-0 p-4 flex lt-sm:flex-col lt-sm:gap-2 sm:items-center sm:justify-between` }, mo = { class: `flex gap-2` };
function ho(e3, r2, i2, a2, o2, c2) {
  let l2 = s(`FormKit`), u2 = s(`CtaPrimary`), p2 = s(`FormProvider`);
  return y(), T(rn, null, { default: x(() => [e3.store ? A(``, true) : (y(), f(`div`, po, [r2[2] || (r2[2] = d(`div`, null, [d(`p`, { class: `h5` }, `Choose your language`)], -1)), d(`div`, null, [t(p2, null, { default: 
}
var go = Ut(fo, [[`render`, ho], [`__scopeId`, `data-v-3bf3113e`]]), _o = v({ name: `VersionInfo`, props: { autoPositioned: { type: Boolean, required: false, default: true }, copyOnClick: { type: Boolean, required: false
  let t2 = g(() => `v${e3.gitTag} ${e3.gitHash} ${e3.gitBranch}`);
  return { text: t2, style: g(() => ({ padding: `4px`, backgroundColor: `#000`, color: `#fff`, fontSize: `0.5rem`, fontWeight: `bold`, cursor: `pointer`, ...e3.autoPositioned ? { position: `fixed`, zIndex: 1e4, right: 0,
    if (console.log(`[VERSION] ${t2.value}`), !e3.copyOnClick) return;
```

## raf-lerp — static/cms-BySrRQrH.js L2519-2582 (hit L2555)
```js
    }, fe2 = function(e47) {
      var t4 = [];
      e47 = oe2(e47);
      var n3 = e47.length, r3 = y2, i3 = 0, a3 = v2, o3 = true, s3 = false, c3 = void 0;
      try {
        for (var l3 = e47[Symbol.iterator](), u3; !(o3 = (u3 = l3.next()).done); o3 = true) {
          var d3 = u3.value;
          d3 < 128 && t4.push(ie2(d3));
        }
      } catch (e48) {
        s3 = true, c3 = e48;
      } finally {
        try {
          !o3 && l3.return && l3.return();
        } finally {
          if (s3) throw c3;
        }
      }
      var g3 = t4.length, _3 = g3;
      for (g3 && t4.push(b2); _3 < n3; ) {
        var ee3 = f2, te3 = true, x3 = false, ne3 = void 0;
        try {
          for (var S3 = e47[Symbol.iterator](), w3; !(te3 = (w3 = S3.next()).done); te3 = true) {
            var ae3 = w3.value;
            ae3 >= r3 && ae3 < ee3 && (ee3 = ae3);
          }
        } catch (e48) {
          x3 = true, ne3 = e48;
        } finally {
          try {
            !te3 && S3.return && S3.return();
          } finally {
            if (x3) throw ne3;
          }
        }
        var se3 = _3 + 1;
        ee3 - r3 > re2((f2 - i3) / se3) && C2(`overflow`), i3 += (ee3 - r3) * se3, r3 = ee3;
        var ce3 = true, de3 = false, fe3 = void 0;
        try {
          for (var pe3 = e47[Symbol.iterator](), me3; !(ce3 = (me3 = pe3.next()).done); ce3 = true) {
            var T3 = me3.value;
            if (T3 < r3 && ++i3 > f2 && C2(`overflow`), T3 == r3) {
              for (var he3 = i3, ge3 = p2; ; ge3 += p2) {
                var _e3 = ge3 <= a3 ? m2 : ge3 >= a3 + h2 ? h2 : ge3 - a3;
                if (he3 < _e3) break;
                var ve3 = he3 - _e3, ye3 = p2 - _e3;
                t4.push(ie2(le2(_e3 + ve3 % ye3, 0))), he3 = re2(ve3 / ye3);
              }
              t4.push(ie2(le2(he3, 0))), a3 = ue2(i3, se3, _3 == g3), i3 = 0, ++_3;
            }
          }
        } catch (e48) {
          de3 = true, fe3 = e48;
        } finally {
          try {
            !ce3 && pe3.return && pe3.return();
          } finally {
            if (de3) throw fe3;
          }
        }
        ++i3, ++r3;
      }
      return t4.join(``);
    }, pe2 = { version: `2.1.0`, ucs2: { decode: oe2, encode: se2 }, decode: de2, encode: fe2, toASCII: function(e47) {
```