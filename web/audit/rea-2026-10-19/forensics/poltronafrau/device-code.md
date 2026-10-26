# poltronafrau — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: keyboard×3, page-transition×3, loader×3, raf-lerp×3, shader-uniforms×3, wheel-step×3, cursor-dom×3, text-split×3, pointer×2

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

## loader — clientlibs/clientlib-gtm.ACSHASH533e88966efb61fca3ab72d6d1ec6718.js L2116-2145 (hit L2120)
```js
}, , , , , , , , , function(t, e, r) {
  "use strict";
  function i(t2, e2) {
    if (!t2) return void console.warn("Cannot proceed on addVatPriceItem since num is null");
    const r2 = document.querySelector('meta[name="vatPercentage"]');
    if (!r2) return void console.warn("vatPercentage is not defined");
    const i2 = parseFloat(r2.getAttribute("content"), 10), n2 = Number(Math.round(i2 / 100 * t2 + "e+2") + "e-2") + t2;
    return e2 ? n2 * e2 : n2;
  }
  function n(t2) {
    if (!t2) return console.warn("product not exist"), "";
    if (!t2.configurable_options) return console.warn("no configurable options found for product"), "";
    const e2 = t2.configurable_options.filter((function(t3) {
      if ("pf_rivestimento" === t3.option_label) return t3.value_label;
    }));
    return null != e2 && e2.length > 0 ? e2[0].value_label : "";
  }
  function o(t2) {
    if (!t2) return void console.warn("the price of the product does not exist");
    const e2 = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(t2);
    return e2.substring(0, e2.length - 2);
  }
  r.r(e), r.d(e, "addVatPriceItem", (function() {
    return i;
  })), r.d(e, "getVariantItem", (function() {
    return n;
  })), r.d(e, "formatNumber", (function() {
    return o;
  }));
}, function(t, e, r) {
```

## loader — clientlibs/clientlib-gtm.ACSHASH533e88966efb61fca3ab72d6d1ec6718.js L2167-2196 (hit L2171)
```js
}, , , , , , , function(t, e, r) {
  "use strict";
  function i(t2, e2) {
    if (!t2) return void console.warn("Cannot proceed on addVatPriceItem since num is null");
    const r2 = document.querySelector('meta[name="vatPercentage"]');
    if (!r2) return void console.warn("vatPercentage is not defined");
    const i2 = parseFloat(r2.getAttribute("content"), 10), n2 = Number(Math.round(i2 / 100 * t2 + "e+2") + "e-2") + t2;
    return e2 ? n2 * e2 : n2;
  }
  function n(t2) {
    if (!t2) return console.warn("product not exist"), "";
    if (!t2.configurable_options) return console.warn("no configurable options found for product"), "";
    const e2 = t2.configurable_options.filter((function(t3) {
      if ("pf_rivestimento" === t3.option_label) return t3.value_label;
    }));
    return null != e2 && e2.length > 0 ? e2[0].value_label : "";
  }
  function o(t2) {
    if (!t2) return void console.warn("the price of the product does not exist");
    const e2 = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(t2);
    return e2.substring(0, e2.length - 2);
  }
  r.r(e), r.d(e, "addVatPriceItem", (function() {
    return i;
  })), r.d(e, "getVariantItem", (function() {
    return n;
  })), r.d(e, "formatNumber", (function() {
    return o;
  }));
}, , , , , , function(t, e, r) {
```

## loader — clientlibs/clientlib-gtm.ACSHASH533e88966efb61fca3ab72d6d1ec6718.js L2972-3012 (hit L2987)
```js
                      }
                      url_key
                      stock_status
                      price_range {
                        minimum_price {
                          regular_price {
                            value
                            currency
                          }
                          final_price {
                            value
                            currency
                          }
                          discount {
                            amount_off
                            percent_off
                          }
                        }
                      }
                      ... on ConfigurableProduct {
                        price_range {
                          maximum_price {
                            regular_price {
                              value
                              currency
                            }
                            final_price {
                              value
                              currency
                            }
                            discount {
                              amount_off
                              percent_off
                            }
                          }
                        }
                        configurable_options {
                          label
                          attribute_code
                          values {
                            value_index
```

## raf-lerp — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L314-354 (hit L329)
```js
      return Math.acos(z(n2, -1, 1));
    }
    distanceTo(e3) {
      return Math.sqrt(this.distanceToSquared(e3));
    }
    distanceToSquared(e3) {
      let t2 = this.x - e3.x, n2 = this.y - e3.y;
      return t2 * t2 + n2 * n2;
    }
    manhattanDistanceTo(e3) {
      return Math.abs(this.x - e3.x) + Math.abs(this.y - e3.y);
    }
    setLength(e3) {
      return this.normalize().multiplyScalar(e3);
    }
    lerp(e3, t2) {
      return this.x += (e3.x - this.x) * t2, this.y += (e3.y - this.y) * t2, this;
    }
    lerpVectors(e3, t2, n2) {
      return this.x = e3.x + (t2.x - e3.x) * n2, this.y = e3.y + (t2.y - e3.y) * n2, this;
    }
    equals(e3) {
      return e3.x === this.x && e3.y === this.y;
    }
    fromArray(e3, t2 = 0) {
      return this.x = e3[t2], this.y = e3[t2 + 1], this;
    }
    toArray(e3 = [], t2 = 0) {
      return e3[t2] = this.x, e3[t2 + 1] = this.y, e3;
    }
    fromBufferAttribute(e3, t2) {
      return this.x = e3.getX(t2), this.y = e3.getY(t2), this;
    }
    rotateAround(e3, t2) {
      let n2 = Math.cos(t2), r2 = Math.sin(t2), i2 = this.x - e3.x, a2 = this.y - e3.y;
      return this.x = i2 * n2 - a2 * r2 + e3.x, this.y = i2 * r2 + a2 * n2 + e3.y, this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this;
    }
    *[Symbol.iterator]() {
```

## raf-lerp — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L476-481 (hit L480)
```js
    rotateTowards(e2, t2) {
      let n2 = this.angleTo(e2);
      if (n2 === 0) return this;
      let r2 = Math.min(1, t2 / n2);
      return this.slerp(e2, r2), this;
    }
```

## raf-lerp — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L514-526 (hit L514)
```js
    slerp(e2, t2) {
      if (t2 === 0) return this;
      if (t2 === 1) return this.copy(e2);
      let n2 = this._x, r2 = this._y, i2 = this._z, a2 = this._w, o2 = a2 * e2._w + n2 * e2._x + r2 * e2._y + i2 * e2._z;
      if (o2 < 0 ? (this._w = -e2._w, this._x = -e2._x, this._y = -e2._y, this._z = -e2._z, o2 = -o2) : this.copy(e2), o2 >= 1) return this._w = a2, this._x = n2, this._y = r2, this._z = i2, this;
      let s2 = 1 - o2 * o2;
      if (s2 <= 2 ** -52) {
        let e3 = 1 - t2;
        return this._w = e3 * a2 + t2 * this._w, this._x = e3 * n2 + t2 * this._x, this._y = e3 * r2 + t2 * this._y, this._z = e3 * i2 + t2 * this._z, this.normalize(), this;
      }
      let c2 = Math.sqrt(s2), l2 = Math.atan2(c2, o2), u2 = Math.sin((1 - t2) * l2) / c2, d2 = Math.sin(t2 * l2) / c2;
      return this._w = a2 * u2 + this._w * d2, this._x = n2 * u2 + this._x * d2, this._y = r2 * u2 + this._y * d2, this._z = i2 * u2 + this._z * d2, this._onChangeCallback(), this;
    }
```

## shader-uniforms — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L3142-3182 (hit L3157)
```js
    }
    return t2;
  }
  function fi(e2) {
    let t2 = [];
    for (let n2 = 0; n2 < e2.length; n2++) t2.push(e2[n2].clone());
    return t2;
  }
  function pi(e2) {
    let t2 = e2.getRenderTarget();
    return t2 === null ? e2.outputColorSpace : t2.isXRRenderTarget === true ? t2.texture.colorSpace : U.workingColorSpace;
  }
  var mi = { clone: ui, merge: di }, hi = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, gi = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, _i = class extends Dr {
    constructor(e2) {
      super(), this.isShaderMaterial = true, this.type = `ShaderMaterial`, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = hi, this.fragmentShader = gi, this.linewidth = 1, this.wiref
    }
    copy(e2) {
      return super.copy(e2), this.fragmentShader = e2.fragmentShader, this.vertexShader = e2.vertexShader, this.uniforms = ui(e2.uniforms), this.uniformsGroups = fi(e2.uniformsGroups), this.defines = Object.assign({}, e2
    }
    toJSON(e2) {
      let t2 = super.toJSON(e2);
      t2.glslVersion = this.glslVersion, t2.uniforms = {};
      for (let n3 in this.uniforms) {
        let r2 = this.uniforms[n3].value;
        r2 && r2.isTexture ? t2.uniforms[n3] = { type: `t`, value: r2.toJSON(e2).uuid } : r2 && r2.isColor ? t2.uniforms[n3] = { type: `c`, value: r2.getHex() } : r2 && r2.isVector2 ? t2.uniforms[n3] = { type: `v2`, valu
      }
      Object.keys(this.defines).length > 0 && (t2.defines = this.defines), t2.vertexShader = this.vertexShader, t2.fragmentShader = this.fragmentShader, t2.lights = this.lights, t2.clipping = this.clipping;
      let n2 = {};
      for (let e3 in this.extensions) this.extensions[e3] === true && (n2[e3] = true);
      return Object.keys(n2).length > 0 && (t2.extensions = n2), t2;
    }
  }, vi = class extends or {
    constructor() {
      super(), this.isCamera = true, this.type = `Camera`, this.matrixWorldInverse = new W(), this.projectionMatrix = new W(), this.projectionMatrixInverse = new W(), this.coordinateSystem = it, this._reversedDepth = fal
    }
    get reversedDepth() {
      return this._reversedDepth;
```

## shader-uniforms — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L3316-3356 (hit L3331)
```js
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
			` }, r2 = new li(5, 5, 5), i2 = new _i({ name: `CubemapFromEquirect`, uniforms: ui(n2.uniforms), vertexShader: n2.vertexShader, fragmentShader: n2.fragmentShader, side: 1, blending: 0 });
      i2.uniforms.tEquirect.value = t2;
      let a2 = new oi(r2, i2), o2 = t2.minFilter;
      return t2.minFilter === 1008 && (t2.minFilter = v), new Ti(1, 10, this).update(e2, a2), t2.minFilter = o2, a2.geometry.dispose(), a2.material.dispose(), this;
    }
    clear(e2, t2 = true, n2 = true, r2 = true) {
      let i2 = e2.getRenderTarget();
      for (let i3 = 0; i3 < 6; i3++) e2.setRenderTarget(this, i3), e2.clear(t2, n2, r2);
      e2.setRenderTarget(i2);
    }
  }, Oi = class extends or {
    constructor() {
      super(), this.isGroup = true, this.type = `Group`;
    }
  }, ki = { type: `move` }, Ai = class {
    constructor() {
      this._targetRay = null, this._grip = null, this._hand = null;
    }
    getHandSpace() {
      return this._hand === null && (this._hand = new Oi(), this._hand.matrixAutoUpdate = false, this._hand.visible = false, this._hand.joints = {}, this._hand.inputState = { pinching: false }), this._hand;
    }
    getTargetRaySpace() {
      return this._targetRay === null && (this._targetRay = new Oi(), this._targetRay.matrixAutoUpdate = false, this._targetRay.visible = false, this._targetRay.hasLinearVelocity = false, this._targetRay.linearVelocity =
```

## shader-uniforms — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L6742-6782 (hit L6757)
```js
	#endif
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
```

## wheel-step — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L23126-23140 (hit L23138)
```js
      let r2 = new Z.Vector2(), i2 = new Z.Vector2(), a2 = new Z.Vector2(), o2 = (e3) => {
        if (!this._enabled || !this._domElement) return;
        if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
          let t4 = this._domElement.getBoundingClientRect(), n4 = e3.clientX / t4.width, r3 = e3.clientY / t4.height;
          if (n4 < this._interactiveArea.left || n4 > this._interactiveArea.right || r3 < this._interactiveArea.top || r3 > this._interactiveArea.bottom) return;
        }
        let t3 = e3.pointerType === `mouse` ? (e3.buttons & Db.LEFT) === Db.LEFT ? Db.LEFT : (e3.buttons & Db.MIDDLE) === Db.MIDDLE ? Db.MIDDLE : (e3.buttons & Db.RIGHT) === Db.RIGHT ? Db.RIGHT : null : null;
        if (t3 !== null) {
          let e4 = this._findPointerByMouseButton(t3);
          e4 && this._disposePointer(e4);
        }
        if ((e3.buttons & Db.LEFT) === Db.LEFT && this._lockedPointer) return;
        let n3 = { pointerId: e3.pointerId, clientX: e3.clientX, clientY: e3.clientY, deltaX: 0, deltaY: 0, mouseButton: t3 };
        this._activePointers.push(n3), this._domElement.ownerDocument.removeEventListener(`pointermove`, s2, { passive: false }), this._domElement.ownerDocument.removeEventListener(`pointerup`, c2), this._domElement.owne
      }, s2 = (e3) => {
```

## wheel-step — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L23143-23157 (hit L23144)
```js
        if (n3) {
          if (n3.clientX = e3.clientX, n3.clientY = e3.clientY, n3.deltaX = e3.movementX, n3.deltaY = e3.movementY, this._state = 0, e3.pointerType === `touch`) switch (this._activePointers.length) {
            case 1:
              this._state = this.touches.one;
              break;
            case 2:
              this._state = this.touches.two;
              break;
            case 3:
              this._state = this.touches.three;
              break;
          }
          else (!this._isDragging && this._lockedPointer || this._isDragging && (e3.buttons & Db.LEFT) === Db.LEFT) && (this._state |= this.mouseButtons.left), this._isDragging && (e3.buttons & Db.MIDDLE) === Db.MIDDLE &
          p2();
        }
```

## wheel-step — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L23178-23210 (hit L23188)
```js
      }, l2 = -1, u2 = (e3) => {
        if (!this._domElement || !this._enabled || this.mouseButtons.wheel === X.NONE) return;
        if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
          let t4 = this._domElement.getBoundingClientRect(), n4 = e3.clientX / t4.width, r4 = e3.clientY / t4.height;
          if (n4 < this._interactiveArea.left || n4 > this._interactiveArea.right || r4 < this._interactiveArea.top || r4 > this._interactiveArea.bottom) return;
        }
        if (e3.preventDefault(), this.dollyToCursor || this.mouseButtons.wheel === X.ROTATE || this.mouseButtons.wheel === X.TRUCK) {
          let e4 = performance.now();
          l2 - e4 < 1e3 && this._getClientRect(this._elementRect), l2 = e4;
        }
        let t3 = Jb ? -1 : -3, n3 = e3.deltaMode === 1 || e3.ctrlKey ? e3.deltaY / t3 : e3.deltaY / (t3 * 10), r3 = this.dollyToCursor ? (e3.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0, i3 = this
        switch (this.mouseButtons.wheel) {
          case X.ROTATE:
            this._rotateInternal(e3.deltaX, e3.deltaY), this._isUserControllingRotate = true;
            break;
          case X.TRUCK:
            this._truckInternal(e3.deltaX, e3.deltaY, false, false), this._isUserControllingTruck = true;
            break;
          case X.SCREEN_PAN:
            this._truckInternal(e3.deltaX, e3.deltaY, false, true), this._isUserControllingTruck = true;
            break;
          case X.OFFSET:
            this._truckInternal(e3.deltaX, e3.deltaY, true, false), this._isUserControllingOffset = true;
            break;
          case X.DOLLY:
            this._dollyInternal(-n3, r3, i3), this._isUserControllingDolly = true;
            break;
          case X.ZOOM:
            this._zoomInternal(-n3, r3, i3), this._isUserControllingZoom = true;
            break;
        }
        this.dispatchEvent({ type: `control` });
      }, d2 = (t3) => {
```

## cursor-dom — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L25221-25229 (hit L25222)
```js
    showStartAR = (e2) => {
      this.setupDOMOverlay(), e2.style.display = ``, e2.style.cursor = `pointer`, e2.style.left = `calc(50% - 50px)`, e2.style.width = `100px`, e2.textContent = `START AR`, e2.onmouseenter = () => {
        e2.style.opacity = `1.0`;
      }, e2.onmouseleave = () => {
        e2.style.opacity = `0.5`;
      }, e2.onclick = () => {
        this.currentSession === null ? navigator.xr?.requestSession(`immersive-ar`, this.sessionInit).then(this.onSessionStarted) : this.currentSession.end();
      };
    };
```

## cursor-dom — clientlibs/clientlib-kjosul.ACSHASH6eb9b24cc416bd206209f5a33b5066c4.js L25228-25268 (hit L25243)
```js
      };
    };
    onSessionStarted = async (e2) => {
      e2.addEventListener(`end`, this.onSessionEnded), this.renderer.xr.setReferenceSpaceType(`local`), await this.renderer.xr.setSession(e2);
      let t2 = this.element;
      t2.textContent = `STOP AR`, this.sessionInit.domOverlay?.root && (this.sessionInit.domOverlay.root.style.display = ``), this.arLoader && (this.arLoader.style.display = ``), this.currentSession = e2;
    };
    onSessionEnded = () => {
      this.currentSession?.removeEventListener(`end`, this.onSessionEnded);
      let e2 = this.element;
      e2.textContent = `START AR`, this.sessionInit.domOverlay?.root && (this.sessionInit.domOverlay.root.style.display = `none`), this.currentSession = null;
      let t2 = document.querySelector(`#ar-container`), n2 = new CustomEvent(`session-end`, {});
      t2?.dispatchEvent(n2);
    };
    disableButton = (e2) => {
      e2.style.display = ``, e2.style.cursor = `auto`, e2.style.left = `calc(50% - 75px)`, e2.style.width = `150px`, e2.onmouseenter = null, e2.onmouseleave = null, e2.onclick = null;
    };
    showARNotSupported = (e2) => {
      this.disableButton(e2), e2.textContent = `AR NOT SUPPORTED`;
    };
    showARNotAllowed = (e2, t2) => {
      this.disableButton(e2), console.warn(`Exception when trying to call xr.isSessionSupported`, t2), e2.textContent = `AR NOT ALLOWED`;
    };
    hideLoader = () => {
      this.arLoader && (this.arLoader.style.display = `none`);
    };
  }, SS = l(s(((e2, t2) => {
    (function(e3, n2, r2, i2) {
      var a2 = [``, `webkit`, `Moz`, `MS`, `ms`, `o`], o2 = n2.createElement(`div`), s2 = `function`, c2 = Math.round, l2 = Math.abs, u2 = Date.now;
      function d2(e4, t3, n3) {
        return setTimeout(y2(e4, n3), t3);
      }
      function f2(e4, t3, n3) {
        return Array.isArray(e4) ? (p2(e4, n3[t3], n3), true) : false;
      }
      function p2(e4, t3, n3) {
        var r3;
        if (e4) if (e4.forEach) e4.forEach(t3, n3);
        else if (e4.length !== i2) for (r3 = 0; r3 < e4.length; ) t3.call(n3, e4[r3], r3, e4), r3++;
        else for (r3 in e4) e4.hasOwnProperty(r3) && t3.call(n3, e4[r3], r3, e4);
      }
```

## text-split — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L4264-4271 (hit L4265)
```js
      var n2 = "".concat(e3), r2 = (function(e4, t3) {
        if ("string" == typeof e4) return e4.split("").map((function(e5) {
          return "#" === e5 ? /\d/ : "*" === e5 ? /[\w]/ : e5;
        }));
        if ("function" == typeof e4) return e4(t3);
        if (Array.isArray(e4)) return e4;
        throw new Error("Formatter must be string, array, or function");
      })(t2, n2), i2 = r2.findIndex((function(e4) {
```

## keyboard — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L7384-7424 (hit L7399)
```js
      return t3;
    })(a2));
  }
  p.fn = l.prototype;
  var f = "resize scroll".split(" ");
  function h(e2) {
    return function() {
      for (var t2 = arguments.length, n2 = new Array(t2), r2 = 0; r2 < t2; r2++) n2[r2] = arguments[r2];
      if (void 0 === n2[0]) {
        for (var i2 = 0; i2 < this.length; i2 += 1) f.indexOf(e2) < 0 && (e2 in this[i2] ? this[i2][e2]() : p(this[i2]).trigger(e2));
        return this;
      }
      return this.on.apply(this, [e2].concat(n2));
    };
  }
  h("click"), h("blur"), h("focus"), h("focusin"), h("focusout"), h("keyup"), h("keydown"), h("keypress"), h("submit"), h("change"), h("mousedown"), h("mousemove"), h("mouseup"), h("mouseenter"), h("mouseleave"), h("mous
  var A = { addClass: function() {
    for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
    var r2 = u(t2.map((function(e3) {
      return e3.split(" ");
    })));
    return this.forEach((function(e3) {
      var t3;
      (t3 = e3.classList).add.apply(t3, r2);
    })), this;
  }, removeClass: function() {
    for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
    var r2 = u(t2.map((function(e3) {
      return e3.split(" ");
    })));
    return this.forEach((function(e3) {
      var t3;
      (t3 = e3.classList).remove.apply(t3, r2);
    })), this;
  }, hasClass: function() {
    for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
    var r2 = u(t2.map((function(e3) {
      return e3.split(" ");
    })));
    return d(this, (function(e3) {
      return r2.filter((function(t3) {
```

## cursor-dom — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L10213-10218 (hit L10216)
```js
  } }, grabCursor: { setGrabCursor: function(e2) {
    if (!(this.support.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
      var t2 = this.el;
      t2.style.cursor = "move", t2.style.cursor = e2 ? "-webkit-grabbing" : "-webkit-grab", t2.style.cursor = e2 ? "-moz-grabbin" : "-moz-grab", t2.style.cursor = e2 ? "grabbing" : "grab";
    }
  }, unsetGrabCursor: function() {
```

## pointer — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L10264-10277 (hit L10274)
```js
  } }, events: { attachEvents: function() {
    var e2 = Object(o.a)(), t2 = this.params, n2 = this.touchEvents, r2 = this.el, i2 = this.wrapperEl, a2 = this.device, s2 = this.support;
    this.onTouchStart = m.bind(this), this.onTouchMove = O.bind(this), this.onTouchEnd = E.bind(this), t2.cssMode && (this.onScroll = I.bind(this)), this.onClick = g.bind(this);
    var c2 = !!t2.nested;
    if (!s2.touch && s2.pointerEvents) r2.addEventListener(n2.start, this.onTouchStart, false), e2.addEventListener(n2.move, this.onTouchMove, c2), e2.addEventListener(n2.end, this.onTouchEnd, false);
    else {
      if (s2.touch) {
        var l2 = !("touchstart" !== n2.start || !s2.passiveListener || !t2.passiveListeners) && { passive: true, capture: false };
        r2.addEventListener(n2.start, this.onTouchStart, l2), r2.addEventListener(n2.move, this.onTouchMove, s2.passiveListener ? { passive: false, capture: c2 } : c2), r2.addEventListener(n2.end, this.onTouchEnd, l2), n
      }
      (t2.simulateTouch && !a2.ios && !a2.android || t2.simulateTouch && !s2.touch && a2.ios) && (r2.addEventListener("mousedown", this.onTouchStart, false), e2.addEventListener("mousemove", this.onTouchMove, c2), e2.add
    }
    (t2.preventClicks || t2.preventClicksPropagation) && r2.addEventListener("click", this.onClick, true), t2.cssMode && i2.addEventListener("scroll", this.onScroll), t2.updateOnWindowResize ? this.on(a2.ios || a2.androi
  }, detachEvents: function() {
```

## page-transition — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L10842-10882 (hit L10857)
```js
            var i3 = n3 - r2;
            i3 && (R = true, B(i3));
          })(e3);
        }));
      }
    }
    var M = C2(g()), w = [M.key];
    function D(e3) {
      return N2 + h(e3);
    }
    function B(e3) {
      n2.go(e3);
    }
    var G = 0;
    function V(e3) {
      1 === (G += e3) && 1 === e3 ? (window.addEventListener("popstate", L2), a2 && window.addEventListener("hashchange", _)) : 0 === G && (window.removeEventListener("popstate", L2), a2 && window.removeEventListener("ha
    }
    var F = false;
    var k = { length: n2.length, action: "POP", location: M, createHref: D, push: function(e3, t3) {
      var r2 = A(e3, t3, b2(), k.location);
      T2.confirmTransitionTo(r2, "PUSH", m2, (function(e4) {
        if (e4) {
          var t4 = D(r2), a3 = r2.key, o3 = r2.state;
          if (i2) if (n2.pushState({ key: a3, state: o3 }, null, t4), c2) window.location.href = t4;
          else {
            var s3 = w.indexOf(k.location.key), l2 = w.slice(0, s3 + 1);
            l2.push(r2.key), w = l2, S2({ action: "PUSH", location: r2 });
          }
          else window.location.href = t4;
        }
      }));
    }, replace: function(e3, t3) {
      var r2 = A(e3, t3, b2(), k.location);
      T2.confirmTransitionTo(r2, "REPLACE", m2, (function(e4) {
        if (e4) {
          var t4 = D(r2), a3 = r2.key, o3 = r2.state;
          if (i2) if (n2.replaceState({ key: a3, state: o3 }, null, t4), c2) window.location.replace(t4);
          else {
            var s3 = w.indexOf(k.location.key);
            -1 !== s3 && (w[s3] = r2.key), S2({ action: "REPLACE", location: r2 });
          }
```

## keyboard — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L12889-12912 (hit L12892)
```js
    constructor(e2) {
      super(e2), l(this, "_removePortal", () => {
        const { parentNode: e3 } = this.portalNode;
        e3 && e3.removeChild(this.portalNode), document.removeEventListener("keydown", this._watchKeyboard);
      }), l(this, "_watchKeyboard", (e3) => {
        e3 = e3 || window.event;
        const { closeOnEsc: t2 } = this.props;
        9 !== e3.keyCode ? 27 === e3.keyCode && t2 && this.props.onRequestClose() : this._handleTabNavigation(e3);
      }), l(this, "_handleOverlayClick", (e3) => {
        const { closeOnOverlayClick: t2 } = this.props;
        t2 && e3.target === e3.currentTarget && this.props.onRequestClose();
      }), l(this, "_setFocus", () => {
        if (!this.props.focusAfterRender) return;
        const e3 = this._getFocusable();
        e3.length > 0 && e3[0].focus();
      }), l(this, "_getFocusable", () => this.modalRef.current.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')), l(
        const t2 = this._getFocusable();
        if (t2.length < 1) return void e3.preventDefault();
        const n2 = t2[0], r2 = t2[t2.length - 1], i2 = document.activeElement;
        if (e3.shiftKey && i2 === n2) return e3.preventDefault(), void r2.focus();
        if (!e3.shiftKey && i2 === r2) return e3.preventDefault(), void n2.focus();
        Array.from(t2).find((e4) => e4 === i2) || (e3.preventDefault(), n2.focus());
      }), this.portalNode = document.createElement("div"), this.portalNode.className = e2.portalClassName, this.modalRef = Object(r.createRef)();
    }
```

## text-split — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L23888-23915 (hit L23910)
```js
    t2 = n(58), r = n(224), e.exports = (function(e2) {
      function n2(e3, r2) {
        if (n2.__super__.constructor.call(this, e3), null == r2) throw new Error("Missing element text. " + this.debugInfo());
        this.name = "#text", this.type = t2.Text, this.value = this.stringify.text(r2);
      }
      return (function(e3, t3) {
        for (var n3 in t3) i.call(t3, n3) && (e3[n3] = t3[n3]);
        function r2() {
          this.constructor = e3;
        }
        r2.prototype = t3.prototype, e3.prototype = new r2(), e3.__super__ = t3.prototype;
      })(n2, e2), Object.defineProperty(n2.prototype, "isElementContentWhitespace", { get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      } }), Object.defineProperty(n2.prototype, "wholeText", { get: function() {
        var e3, t3, n3;
        for (n3 = "", t3 = this.previousSibling; t3; ) n3 = t3.data + n3, t3 = t3.previousSibling;
        for (n3 += this.data, e3 = this.nextSibling; e3; ) n3 += e3.data, e3 = e3.nextSibling;
        return n3;
      } }), n2.prototype.clone = function() {
        return Object.create(this);
      }, n2.prototype.toString = function(e3) {
        return this.options.writer.text(this, this.options.writer.filterOptions(e3));
      }, n2.prototype.splitText = function(e3) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }, n2.prototype.replaceWholeText = function(e3) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }, n2;
    })(r);
```

## page-transition — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L24670-24735 (hit L24729)
```js
    e2(document).ready(() => {
      var n2, r;
      const i = "false" === (null === (n2 = document.querySelector('meta[name="disableEcommerce"]')) || void 0 === n2 ? void 0 : n2.content), a = "true" === (null === (r = document.querySelector("[data-product-sellable]"
      if (void 0 === l || "" === l || null === s) return;
      const f = [], h = (t3, n3, r2 = 1e3 * Math.random(), i2 = false, a2 = false) => {
        const o2 = s.content.cloneNode(true), c2 = (/* @__PURE__ */ new Date()).getTime(), l2 = `accordion-title-${r2}-${c2}`, u2 = `accordion-content-${r2}-${c2}`, f2 = o2.querySelector("[data-title]"), h2 = f2.querySel
        return t3 && n3 ? (h2.textContent = t3, i2 ? m2.innerHTML = n3 : m2.textContent = n3, f2.setAttribute("data-expanded", a2), f2.setAttribute("aria-selected", a2), f2.setAttribute("aria-controls", u2), A2.setAttrib
          O2.classList.toggle("active");
          const t4 = O2.classList.contains("active");
          e3.stopPropagation(), e3.preventDefault(), f2.setAttribute("data-expanded", t4), A2.setAttribute("aria-hidden", !t4), f2.setAttribute("aria-selected", t4), A2.querySelectorAll("a").forEach((e4) => {
            let t5 = e4.getAttribute("href");
            if (t5) {
              if (t5.includes("language-masters")) {
                const e5 = /language-masters\/([a-z_]{2,5})\//;
                e5.test(t5) && (t5 = t5.replace(e5, `${d}/${p}/`)), t5.replace("/language-masters/", `/${d}/`);
              } else {
                const e5 = /\/([a-z]{2})\/([a-z_]{2,5})\//;
                e5.test(t5) && (t5 = t5.replace(e5, `/${d}/${p}/`));
              }
              e4.setAttribute("href", t5);
            }
          });
        }), f2.removeAttribute("data-title"), A2.removeAttribute("data-content"), O2.removeAttribute("data-wrapper"), o2) : (console.warn("Accordion item is missing title or description:", { title: t3, description: n3 })
      };
      function A() {
        location.hash && "#" !== location.hash && (null == f || f.forEach((t3) => {
          const n3 = Object.keys(t3)[0];
          e2(`[data-social="${n3}"]`).each((r2, i2) => {
            const a2 = t3[n3].link.replace("{postUrl}", encodeURIComponent(window.location.href)).replace("{postTitle}", encodeURIComponent(document.title)).replace("{postImg}", encodeURIComponent(document.querySelectorA
            e2(i2).attr("href", a2);
          });
        }));
      }
      o.getPdpAccordion(l, u, i && a).then((e3) => {
        i && (null == e3 || e3.map(({ accordiontitle: e4 = "", accordionText: t3 = { html: "" } }, n3) => {
          if (!e4 || !t3) return;
          const r2 = h(e4, (null == t3 ? void 0 : t3.html) || "", n3, "" !== (null == t3 ? void 0 : t3.html) && null !== (null == t3 ? void 0 : t3.html));
          c.append(r2);
        })), o.getPdpShare(l, u).then((e4) => {
          const t3 = null == e4 ? void 0 : e4.map(({ shareLabel: e5 = "", shareLink: t4 = "", shareIcon: n4 = { _path: "" }, isShow: r2 = false }) => {
            if (!(e5 && t4 && null != n4 && n4._path && r2)) return "";
            f.push({ [e5]: { link: t4 } });
            return `
                    <li class="share-list--item">
                        <a href="${t4.replace("{postUrl}", encodeURIComponent(window.location.href)).replace("{postTitle}", encodeURIComponent(document.title)).replace("{postImg}", encodeURIComponent(document.querySelect
                            <img src="${n4._path}" alt="${e5}" class="share-list--icon" />
                        </a>
                    </li>
                `;
          }), n3 = h(window.getTranslation("pf_share_title"), "" !== t3.join("") ? `<ul class="share-list">${t3.join("")}</ul>` : "", "share-accordion", true);
          c.append(n3);
        });
      }), e2("[data-wrapper].toggle_root").on("click keydown", (t3) => {
        t3.stopPropagation(), t3.preventDefault();
        const n3 = e2(t3.currentTarget);
        n3.toggleClass("active");
        const r2 = n3.hasClass("active"), i2 = n3.find("[data-title]"), a2 = n3.find("[data-content]");
        i2.attr("data-expanded", r2), a2.attr("aria-hidden", !r2), i2.attr("aria-selected", r2), n3.removeAttr("data-wrapper");
      });
      const m = history.pushState, O = history.replaceState;
      history.pushState = function(...e3) {
        m.apply(this, e3), A();
      }, history.replaceState = function(...e3) {
        O.apply(this, e3), A();
      }, window.addEventListener("popstate", A), window.addEventListener("hashchange", A);
    });
```

## text-split — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L47207-47213 (hit L47208)
```js
  }, rules: { multipliers: {}, regex: [/^(BE)(0?\d{9})$/] } }, o = (e2) => e2 % 11 < 2 ? 0 : 11 - e2 % 11, s = { name: "Brazil", codes: ["BR", "BRA", "076"], calcFn: (e2) => {
    const t2 = e2.split("").map(Number);
    if ((n2 = t2).every((e3) => n2[0] === e3)) return false;
    var n2;
    const r2 = ((e3, t3) => t3.reduce(([t4, n3], r3, i2) => [0 === i2 ? 0 : t4 + e3[i2 - 1] * r3, n3 + e3[i2] * r3], [0, 0]))(t2, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    return t2[12] === o(r2[0]) && t2[13] === o(r2[1]);
  }, rules: { multipliers: {}, regex: [/^(BR)?(\d{14}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/] } }, c = { name: "Bulgaria", codes: ["BG", "BGR", "100"], calcFn: (e2) => {
```

## pointer — clientlibs/clientlib-site.ACSHASH01c088717489cd094bfbbc2a1fcc8f08.js L47898-47943 (hit L47902)
```js
    const { isRunning: t2, preventExitTransition: n2, toastRef: r2, eventHandlers: i2 } = (function(e3) {
      const [t3, n3] = Object(f.useState)(false), [r3, i3] = Object(f.useState)(false), a3 = Object(f.useRef)(null), o3 = Object(f.useRef)({ start: 0, x: 0, y: 0, delta: 0, removalDistance: 0, canCloseOnClick: true, canD
      function h2(t4) {
        if (e3.draggable) {
          "touchstart" === t4.nativeEvent.type && t4.nativeEvent.preventDefault(), o3.didMove = false, document.addEventListener("mousemove", E3), document.addEventListener("mouseup", y3), document.addEventListener("touc
          const n4 = a3.current;
          o3.canCloseOnClick = true, o3.canDrag = true, o3.boundingRect = n4.getBoundingClientRect(), n4.style.transition = "", o3.x = w(t4.nativeEvent), o3.y = D(t4.nativeEvent), "x" === e3.draggableDirection ? (o3.star
        }
      }
      function A3(t4) {
        if (o3.boundingRect) {
          const { top: n4, bottom: r4, left: i4, right: a4 } = o3.boundingRect;
          "touchend" !== t4.nativeEvent.type && e3.pauseOnHover && o3.x >= i4 && o3.x <= a4 && o3.y >= n4 && o3.y <= r4 ? O3() : m3();
        }
      }
      function m3() {
        n3(true);
      }
      function O3() {
        n3(false);
      }
      function E3(n4) {
        const r4 = a3.current;
        o3.canDrag && r4 && (o3.didMove = true, t3 && O3(), o3.x = w(n4), o3.y = D(n4), o3.delta = "x" === e3.draggableDirection ? o3.x - o3.start : o3.y - o3.start, o3.start !== o3.x && (o3.canCloseOnClick = false), r4.
      }
      function y3() {
        document.removeEventListener("mousemove", E3), document.removeEventListener("mouseup", y3), document.removeEventListener("touchmove", E3), document.removeEventListener("touchend", y3);
        const t4 = a3.current;
        if (o3.canDrag && o3.didMove && t4) {
          if (o3.canDrag = false, Math.abs(o3.delta) > o3.removalDistance) return i3(true), void e3.closeToast();
          t4.style.transition = "transform 0.2s, opacity 0.2s", t4.style.transform = `translate${e3.draggableDirection}(0)`, t4.style.opacity = "1";
        }
      }
      Object(f.useEffect)(() => {
        s3.current = e3;
      }), Object(f.useEffect)(() => (a3.current && a3.current.addEventListener("d", m3, { once: true }), b(e3.onOpen) && e3.onOpen(Object(f.isValidElement)(e3.children) && e3.children.props), () => {
        const e4 = s3.current;
        b(e4.onClose) && e4.onClose(Object(f.isValidElement)(e4.children) && e4.children.props);
      }), []), Object(f.useEffect)(() => (e3.pauseOnFocusLoss && (document.hasFocus() || O3(), window.addEventListener("focus", m3), window.addEventListener("blur", O3)), () => {
        e3.pauseOnFocusLoss && (window.removeEventListener("focus", m3), window.removeEventListener("blur", O3));
      }), [e3.pauseOnFocusLoss]);
      const g3 = { onMouseDown: h2, onTouchStart: h2, onMouseUp: A3, onTouchEnd: A3 };
      return c3 && l3 && (g3.onMouseEnter = O3, g3.onMouseLeave = m3), p3 && (g3.onClick = (e4) => {
        d3 && d3(e4), o3.canCloseOnClick && u3();
      }), { playToast: m3, pauseToast: O3, isRunning: t3, preventExitTransition: r3, toastRef: a3, eventHandlers: g3 };
    })(e2), { closeButton: a2, children: o2, autoClose: s2, onClick: c2, type: l2, hideProgressBar: u2, closeToast: d2, transition: p2, position: A2, className: m2, style: O2, bodyClassName: E2, bodyStyle: y2, progressCl
```