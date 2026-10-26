# marseille — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: audio×3, raf-lerp×3, shader-uniforms×3, loader×3, pointer×3, wheel-step×3, keyboard×3, reveal-timeline×1, observer×1, page-transition×3

## audio — js/app.adf311ea.js L217-275 (hit L234)
```js
  }, X = [], W = (n("7db0"), n("07ac"), n("d4ec")), G = n("bee2"), K = n("257e"), J = n("262e"), Q = n("2caf"), ee = n("1743"), te = n("1e5c"), ne = (function(e2) {
    Object(J["a"])(n2, e2);
    var t2 = Object(Q["a"])(n2);
    function n2() {
      var e3;
      return Object(W["a"])(this, n2), e3 = t2.call(this), n2.__instance = Object(K["a"])(e3), B = [], 1, false, e3;
    }
    return Object(G["a"])(n2, [{ key: "init", value: function() {
      var e3 = this.createSound("intro", "intro.mp3", 0.5);
      e3.audio.on("load", this.onIntroLoaded.bind(this)), this.createSound("map_loop", "map.mp3", 0.5, true), this.createSound("pin_over", "pin_over.mp3", 0.7), this.createSound("pin_out", "pin_out.mp3", 0.7), this.creat
    } }, { key: "onIntroLoaded", value: function() {
      this.emit("preloaded");
    } }, { key: "createSound", value: function(e3, t3) {
      var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, i2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      return B[e3] || (B[e3] = { audio: new te["Howl"]({ src: ["/assets/sounds/".concat(t3)], loop: i2, volume: n3 }), volume: n3 }), B[e3];
    } }, { key: "playSound", value: function(e3) {
      var t3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      B[e3] && (B[e3].timer && clearTimeout(B[e3].timer), B[e3].audio.play(), t3 && B[e3].audio.fade(0, B[e3].volume, 2e3));
    } }, { key: "stopSound", value: function(e3) {
      if (B[e3]) {
        var t3 = 2;
        B[e3].audio.fade(B[e3].volume, 0, 1e3 * t3), B[e3].timer = setTimeout((function() {
          B[e3].audio.stop();
        }), 1e3 * t3);
      }
    } }, { key: "getSound", value: function(e3) {
      return B[e3];
    } }, { key: "setVolume", value: function(e3) {
      Holwer.volume(e3);
    } }], [{ key: "intro", value: function() {
      var e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      e3 ? n2.__instance.playSound("intro") : n2.__instance.stopSound("intro");
    } }, { key: "map", value: function() {
      var e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      e3 ? (n2.pano360(false), n2.__instance.playSound("map_loop", true)) : n2.__instance.stopSound("map_loop");
    } }, { key: "pinOver", value: function() {
      n2.__instance.playSound("pin_over");
    } }, { key: "pinOut", value: function() {
      n2.__instance.playSound("pin_out");
    } }, { key: "btnClick", value: function() {
      n2.__instance.playSound("btn_click");
    } }, { key: "btnOver", value: function() {
      n2.__instance.playSound("btn_over");
    } }, { key: "pano360", value: function() {
      var e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "default";
      for (var i2 in $) $[i2].audio.stop();
      e3 && (n2.map(false), n2.__instance.playSound("pano_loop_" + (null == t3 ? "default" : t3), true));
    } }, { key: "goto360", value: function() {
      var e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      e3 ? n2.__instance.playSound("goto360") : n2.__instance.stopSound("goto360");
    } }, { key: "gotoMap", value: function() {
      var e3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      e3 ? n2.__instance.playSound("goto360") : n2.__instance.stopSound("goto360");
    } }, { key: "mute", set: function(e3) {
      n2.__instance._mute = e3, te["Howler"].mute(e3);
    }, get: function() {
      return n2.__instance._mute;
    } }]), n2;
  })(ee["a"]), ie = n("5a89"), oe = (n("a434"), (function() {
```

## raf-lerp — js/app.adf311ea.js L356-379 (hit L375)
```js
  })()), ae = Math.PI / 180, se = (function() {
    function e2() {
      Object(W["a"])(this, e2);
    }
    return Object(G["a"])(e2, null, [{ key: "isPowerOfTwo", value: function(e3) {
      return (e3 & -e3) == e3;
    } }, { key: "powerTwo", value: function(e3) {
      if (this.isPowerOfTwo(e3)) return e3;
      var t2 = 1;
      while (t2 < ~~e3) t2 <<= 1;
      return t2;
    } }, { key: "latLngDistance", value: function(e3, t2, n2, i2) {
      var o2 = EARTH_RADIUS, a2 = e3 * ae, s2 = n2 * ae, r2 = (n2 - e3) * ae, l2 = (i2 - t2) * ae, c2 = Math.sin(r2 / 2) * Math.sin(r2 / 2) + Math.cos(a2) * Math.cos(s2) * Math.sin(l2 / 2) * Math.sin(l2 / 2), u2 = 2 * Ma
      return o2 * u2;
    } }, { key: "lerp", value: function(e3, t2, n2) {
      return t2 + e3 * (n2 - t2);
    } }, { key: "norm", value: function(e3, t2, n2) {
      return (e3 - t2) / (n2 - t2);
    } }, { key: "map", value: function(e3, t2, n2, i2, o2) {
      return this.lerp(this.norm(e3, t2, n2), i2, o2);
    } }, { key: "RAD", get: function() {
      return ae;
    } }]), e2;
  })(), re = (function() {
```

## shader-uniforms — js/app.adf311ea.js L442-455 (hit L451)
```js
    function n2(e3, i2) {
      var o2;
      if (Object(W["a"])(this, n2), Y = e3, H = new ie["f"](), o2 = t2.call(this, H, q), zt.push(Object(K["a"])(o2)), void 0 === q) {
        q = new ie["A"]({ color: jt.materials.roads.diffuse, opacity: jt.materials.roads.opacity, transparent: true }), jt.debugMaterial("roads", q);
        Y.width.toFixed(1);
        q.onBeforeCompile = function(e4) {
          var t3 = e4.vertexShader;
          e4.uniforms = Object.assign(e4.uniforms, Lt), t3 = t3.replace("#include <common>", "#include <common>\n        uniform float radius;\n        varying float vRadius;"), t3 = t3.replace("#include <skinning_vertex
          var n3 = e4.fragmentShader;
          n3 = n3.replace("#include <common>", "#include <common>\n        varying float vRadius;"), n3 = n3.replace("#include <dithering_fragment>", "#include <dithering_fragment>\n        gl_FragColor.a *= vRadius;"), 
        };
      }
      return o2.map = Y, o2.key = "", o2.tx = -1, o2.ty = -1, o2.zoom = -1, o2.url = "", o2.loaded = false, o2.loading = false, o2.quadKey = o2.key = i2, void 0 != o2.quadKey && o2.initFromQuadKey(o2.quadKey), o2;
    }
```

## loader — js/app.adf311ea.js L476-502 (hit L478)
```js
    } }, { key: "load", value: function(e3) {
      var t3 = this;
      this.loading = true;
      try {
        fetch(this.url).then((function(e4) {
          return e4.arrayBuffer();
        })).then((function(n3) {
          var i2 = new DataView(n3);
          if (3302 != i2.byteLength) {
            for (var o2, a2, s2, r2 = 3, l2 = [], c2 = [], u2 = 0, d2 = 0; d2 < i2.byteLength; d2 += 4 * r2) {
              o2 = i2.getFloat32(d2, true), a2 = i2.getFloat32(d2 + 4, true);
              try {
                s2 = i2.getFloat32(d2 + 8, true);
              } catch (p2) {
                return void (e3 && e3(t3));
              }
              if (-1 == o2 && -1 == a2 && -1 == s2) {
                for (var h2 = 3; h2 < c2.length; h2 += 3) o2 = c2[h2 - 3], a2 = c2[h2 - 2], s2 = c2[h2 - 1], l2.push(o2, a2, s2), o2 = c2[h2], a2 = c2[h2 + 1], s2 = c2[h2 + 2], l2.push(o2, a2, s2);
                u2 += c2.length / 2, c2 = [];
              } else c2.push(o2, a2, s2);
            }
            t3.geometry.setAttribute("position", new ie["e"](new Float32Array(l2), 3)), t3.geometry.needsUpdate = true, t3.geometry.computeBoundingSphere(), t3.geometry.boundingSphere.radius = 256, t3.loaded = true, t3.l
          }
        }));
      } catch (n3) {
      }
    } }, { key: "show", value: function() {
```

## loader — js/app.adf311ea.js L596-609 (hit L598)
```js
    } }, { key: "load", value: function(e3) {
      var t3 = this;
      this.loading = true, this.controller = new AbortController(), fetch(this.url).then((function(e4) {
        return e4.arrayBuffer();
      })).then((function(n3) {
        if (void 0 !== n3) {
          var i2 = new DataView(n3);
          if (3302 != i2.byteLength) {
            for (var o2, a2, s2, r2 = 3, l2 = [], c2 = [], u2 = 0, d2 = 0; d2 < i2.byteLength; d2 += 4 * r2) o2 = i2.getFloat32(d2, true), a2 = i2.getFloat32(d2 + 4, true), s2 = i2.getFloat32(d2 + 8, true), -1 == o2 && -
            t3.geometry.setAttribute("position", new ie["e"](new Float32Array(l2), 3)), t3.geometry.setIndex(new ie["e"](new Uint32Array(c2), 1)), t3.geometry.needsUpdate = true, t3.geometry.computeBoundingSphere(), t3.g
          }
        }
      }));
    } }, { key: "show", value: function() {
```

## raf-lerp — js/app.adf311ea.js L679-682 (hit L681)
```js
    } }, { key: "getViewRectCenter", value: function() {
      var e3 = this.viewRectToLatLng(this.latitude, this.longitude, this.zoom, this.viewRect);
      return [se.lerp(0.5, -e3[0], -e3[2]), se.lerp(0.5, e3[1], e3[3])];
    } }, { key: "getViewRectCenterPixels", value: function(e3) {
```

## pointer — js/app.adf311ea.js L887-899 (hit L898)
```js
    function n2(e3, i2, o2, a2, s2) {
      var r2;
      if (Object(W["a"])(this, n2), r2 = t2.call(this), Ge = e3, Ge.add(Object(K["a"])(r2)), Ke = i2, Qe = Ke.camera, Je = o2, r2.pos = a2, r2.data = s2, r2.direction = { x: 0, y: 0, distance: 0, element: cn ? r2.getElem
        if (false === Qt) {
          Qt = true;
          var l2 = "/";
          an.load(l2 + "models/pin4.glb", (function(e4) {
            r2.onLoad(e4);
          }));
        }
      } else r2.initialise();
      return Jt.push(Object(K["a"])(r2)), new ie["j"](), nt = new ie["Db"](), window.addEventListener("mousemove", r2.onMouseMove), window.addEventListener("pointerdown", r2.onMouseMove), r2;
    }
```

## shader-uniforms — js/app.adf311ea.js L1073-1084 (hit L1082)
```js
      if (false === o2) {
        var d2;
        r2 = 0, s2.forEach((function(e4) {
          var n4 = i2.plopMetrics(e4, c2, 0, l2, t3);
          e4.draw(c2, r2, l2, t3), r2 += n4;
        }));
        var h2 = new ie["O"]({ map: u2, transparent: true });
        h2.onBeforeCompile = function(e4) {
          var t4 = e4.fragmentShader;
          t4 = t4.replace("#include <dithering_fragment>", "#include <dithering_fragment>\n            gl_FragColor.rgb = vec3( 1. ) - gl_FragColor.rgb;\n            "), e4.fragmentShader = t4;
        }, d2 = new ie["N"](vn, h2), d2.scale.x = r2, d2.scale.y = t3, d2.renderOrder = 1, this.add(d2), this.meshes.push(d2);
      } else {
```

## shader-uniforms — js/app.adf311ea.js L1092-1101 (hit L1099)
```js
        })), p2.forEach((function(e4, n4) {
          var o3, a3 = new ie["O"]({ transparent: true });
          o3 = new ie["N"](vn, a3), o3.material.map = u2, o3.obj = e4, o3.uniforms = { delta: { value: new ie["Db"](o3.obj.s, o3.obj.u) } }, o3.material.onBeforeCompile = function(e5) {
            e5.uniforms = Object.assign(e5.uniforms, o3.uniforms);
            var t4 = e5.vertexShader;
            t4 = t4.replace("#include <common>", "#include <common>\n          uniform vec2 delta;"), t4 = t4.replace("#include <uv_vertex>", "#include <uv_vertex>\n            vUv.x *= delta.x;\n            vUv.x += del
            var n5 = e5.fragmentShader;
            n5 = n5.replace("#include <dithering_fragment>", "#include <dithering_fragment>\n            gl_FragColor.rgb = vec3( 1. ) - gl_FragColor.rgb;\n            "), e5.fragmentShader = n5;
          }, o3.renderOrder = n4 + 1, o3.x = e4.px, o3.w = e4.sx, o3.scale.x = e4.sx, o3.scale.y = t3, o3.position.x = e4.px, o3.position.z = 0.01 * n4, i2.meshes.push(o3), i2.add(o3);
        }));
```

## loader — js/app.adf311ea.js L1116-1125 (hit L1121)
```js
    } }], [{ key: "preload", value: function(e3, t3) {
      var i2 = e3.shift(), o2 = "/";
      fn["a"].load(o2 + i2, (function(o3, a2) {
        if (o3) ;
        else {
          if (gn[i2] = a2, e3.length > 0) return n2.preload(e3, t3);
          t3 && t3();
        }
      }));
    } }]), n2;
```

## wheel-step — js/app.adf311ea.js L1126-1164 (hit L1144)
```js
  })(ie["r"]), wn = new ie["Eb"](), xn = (new ie["Eb"](), new ie["mb"](), new ie["Db"](), new ee["a"]()), kn = Math.PI / 180, _n = false, On = new ie["Db"](), Mn = -180, En = 0, Tn = Mn, Pn = 0, Ln = 0, zn = 0, Dn = 0.1,
    Object(J["a"])(n2, e2);
    var t2 = Object(Q["a"])(n2);
    function n2(e3, i2, o2) {
      var a2;
      return Object(W["a"])(this, n2), Dn = jt.pano.camera_rotation_speed, a2 = t2.call(this, jt.pano.camera_fov, e3, i2, o2), a2.updateProjectionMatrix(), a2.target = new ie["Eb"](), a2.updateHeadingPitch(), a2.update()
    }
    return Object(G["a"])(n2, [{ key: "addListeners", value: function(e3) {
      this.domElement = e3;
      var t3 = new Hammer(this.domElement);
      t3.get("pan").set({ direction: Hammer.DIRECTION_ALL }), t3.on("tap press panstart", this.onDownHandler.bind(this)), t3.on("pan", this.onMoveHandler.bind(this)), t3.on("panend", this.onUpHandler.bind(this));
    } }, { key: "update", value: function() {
      requestAnimationFrame(this.update.bind(this)), Mn += 0.1 * (Tn - Mn), En += 0.1 * (Pn - En), this.updateHeadingPitch();
    } }, { key: "onDownHandler", value: function(e3) {
      _n = true, window.webgl.style.cursor = "grabbing", On.x = e3.center.x, On.y = e3.center.y, Tn = Ln = Mn, Pn = zn = En;
    } }, { key: "onUpHandler", value: function(e3) {
      window.webgl.style.cursor = "grab", _n = false;
    } }, { key: "onMoveHandler", value: function(e3) {
      _n && (Cn.x += e3.deltaX, Cn.y += e3.deltaY, Cn.x *= 0.25, Cn.y *= 0.25, Tn = -(On.x - e3.center.x) * (Dn / this.zoom) + Ln, Pn = (e3.center.y - On.y) * (Dn / this.zoom) + zn, Pn = Math.min(90, Math.max(-90, Pn)));
    } }, { key: "reset", value: function() {
      Mn = -180, En = 0, Tn = Mn, Pn = 0, Ln = 0, zn = 0, this.fov = jt.pano.camera_fov, this.updateProjectionMatrix();
    } }, { key: "updateHeadingPitch", value: function() {
      En = Math.max(jt.pano.min_polar_angle, Math.min(jt.pano.max_polar_angle, En)), wn.set(Math.sin(Mn * kn) * Math.cos(En * kn), Math.sin(En * kn), Math.cos(Mn * kn) * Math.cos(En * kn));
      var e3 = jt.pano.camera_damping;
      this.target.x += (wn.x - this.target.x) * e3, this.target.y += (wn.y - this.target.y) * e3, this.target.z += (wn.z - this.target.z) * e3, this.lookAt(this.target);
    } }, { key: "setParent", value: function(e3) {
      e3.add(this);
    } }, { key: "on", value: function(e3, t3) {
      xn.on(e3, t3);
    } }, { key: "off", value: function(e3, t3) {
      xn.off(e3, t3);
    } }, { key: "once", value: function(e3, t3) {
      xn.once(e3, t3);
    } }], [{ key: "delta", get: function() {
      return Cn;
    } }, { key: "hasMouseDown", get: function() {
      return _n;
    } }]), n2;
  })(ie["bb"]), Sn = (function(e2) {
```

## raf-lerp — js/app.adf311ea.js L1173-1181 (hit L1178)
```js
    } }, { key: "update", value: function() {
      var e3 = this;
      if (0 !== this.meshes.length && false !== pt.controls.enabled) {
        var t3 = new ie["Eb"](), n3 = new ie["Eb"](), i2 = this.meshes[this.needle], o2 = -dt.x, a2 = -dt.z, s2 = Math.atan2(a2, o2) + Math.PI, r2 = Math.cos(s2) * jt.text.letter_x_span, l2 = r2 - this.width / 2 + (this.
        this.meshes.forEach((function(i3, o3) {
          o3 != e3.needle && (n3.copy(i3.rest).multiplyScalar(1 + Math.abs(1e-3 * jn.delta.x)), t3.copy(i3.prev.position).add(n3), i3.position.x += (t3.x - i3.position.x) * jt.text.friction, i3.position.y += (t3.y - i3.p
        })), l2;
      }
    } }, { key: "open", value: function() {
```

## wheel-step — js/app.adf311ea.js L1394-1434 (hit L1409)
```js
    }
    function A2(e3) {
      f2.set(e3.clientX, e3.clientY), v2.subVectors(f2, m2).multiplyScalar(n2.rotateSpeed);
      var t3 = n2.domElement;
      M2(2 * Math.PI * v2.x / t3.clientHeight), E2(2 * Math.PI * v2.y / t3.clientHeight), m2.copy(f2), n2.update();
    }
    function R2(e3) {
      x2.set(e3.clientX, e3.clientY), k2.subVectors(x2, w2), k2.y > 0 ? z2(O2()) : k2.y < 0 && D2(O2()), w2.copy(x2), n2.update();
    }
    function F2(e3) {
      b2.set(e3.clientX, e3.clientY), y2.subVectors(b2, g2).multiplyScalar(n2.panSpeed), L2(y2.x, y2.y), g2.copy(b2), n2.update();
    }
    function I2() {
    }
    function N2(e3) {
      e3.deltaY < 0 ? D2(O2()) : e3.deltaY > 0 && z2(O2()), fo.needsUpdate = true, n2.update();
    }
    function U2(e3) {
      var t3 = false;
      switch (e3.keyCode) {
        case n2.keys.UP:
          L2(0, n2.keyPanSpeed), t3 = true;
          break;
        case n2.keys.BOTTOM:
          L2(0, -n2.keyPanSpeed), t3 = true;
          break;
        case n2.keys.LEFT:
          L2(n2.keyPanSpeed, 0), t3 = true;
          break;
        case n2.keys.RIGHT:
          L2(-n2.keyPanSpeed, 0), t3 = true;
          break;
      }
      t3 && (e3.preventDefault(), n2.update());
    }
    function B2(e3) {
      if (1 == e3.touches.length) m2.set(e3.touches[0].pageX, e3.touches[0].pageY);
      else {
        var t3 = 0.5 * (e3.touches[0].pageX + e3.touches[1].pageX), n3 = 0.5 * (e3.touches[0].pageY + e3.touches[1].pageY);
        m2.set(t3, n3);
      }
```

## pointer — js/app.adf311ea.js L1507-1549 (hit L1548)
```js
    function te2(e3) {
      var t3;
      switch (e3.preventDefault(), n2.domElement.focus ? n2.domElement.focus() : window.focus(), e3.button) {
        case 0:
          t3 = n2.mouseButtons.LEFT;
          break;
        case 1:
          t3 = n2.mouseButtons.MIDDLE;
          break;
        case 2:
          t3 = n2.mouseButtons.RIGHT;
          break;
        default:
          t3 = -1;
      }
      switch (t3) {
        case ie["I"].DOLLY:
          if (false === n2.enableZoom) return;
          j2(e3), r2 = s2.DOLLY;
          break;
        case ie["I"].ROTATE:
          if (e3.ctrlKey || e3.metaKey || e3.shiftKey) {
            if (false === n2.enablePan) return;
            S2(e3), r2 = s2.PAN;
          } else {
            if (false === n2.enableRotate) return;
            C2(e3), r2 = s2.ROTATE;
          }
          break;
        case ie["I"].PAN:
          if (e3.ctrlKey || e3.metaKey || e3.shiftKey) {
            if (false === n2.enableRotate) return;
            C2(e3), r2 = s2.ROTATE;
          } else {
            if (false === n2.enablePan) return;
            S2(e3), r2 = s2.PAN;
          }
          break;
        default:
          r2 = s2.NONE;
      }
      r2 !== s2.NONE && (n2.domElement.ownerDocument.addEventListener("pointermove", Q2, false), n2.domElement.ownerDocument.addEventListener("pointerup", ee2, false), n2.dispatchEvent(o2));
    }
```

## keyboard — js/app.adf311ea.js L1681-1721 (hit L1696)
```js
        case "mouse":
        case "pen":
          D2(e3);
          break;
      }
    }
    function T2(e3) {
      if (false !== n2.enabled) switch (e3.pointerType) {
        case "mouse":
        case "pen":
          C2(e3);
          break;
      }
    }
    function P2(e3) {
      false !== n2.enabled && (window.removeEventListener("keydown", P2), l2 === i2.NONE && (e3.keyCode !== n2.keys[i2.ROTATE] || n2.noRotate ? e3.keyCode !== n2.keys[i2.ZOOM] || n2.noZoom ? e3.keyCode !== n2.keys[i2.PAN
    }
    function L2() {
      false !== n2.enabled && (l2 = i2.NONE, window.addEventListener("keydown", P2, false));
    }
    function z2(e3) {
      if (r2 === i2.NONE) switch (e3.button) {
        case n2.mouseButtons.LEFT:
          r2 = i2.ROTATE;
          break;
        case n2.mouseButtons.MIDDLE:
          r2 = i2.ZOOM;
          break;
        case n2.mouseButtons.RIGHT:
          r2 = i2.PAN;
          break;
        default:
          r2 = i2.NONE;
      }
      var t3 = l2 !== i2.NONE ? l2 : r2;
      t3 !== i2.ROTATE || n2.noRotate ? t3 !== i2.ZOOM || n2.noZoom ? t3 !== i2.PAN || n2.noPan || (b2.copy(_2(e3.pageX, e3.pageY)), y2.copy(b2)) : (m2.copy(_2(e3.pageX, e3.pageY)), f2.copy(m2)) : (d2.copy(O2(e3.pageX, e
    }
    function D2(e3) {
      if (false !== n2.enabled) {
        var t3 = l2 !== i2.NONE ? l2 : r2;
        t3 !== i2.ROTATE || n2.noRotate ? t3 !== i2.ZOOM || n2.noZoom ? t3 !== i2.PAN || n2.noPan || y2.copy(_2(e3.pageX, e3.pageY)) : f2.copy(_2(e3.pageX, e3.pageY)) : (u2.copy(d2), d2.copy(O2(e3.pageX, e3.pageY)));
```

## wheel-step — js/app.adf311ea.js L1729-1739 (hit L1731)
```js
        switch (e3.deltaMode) {
          case 2:
            m2.y -= 0.025 * e3.deltaY;
            break;
          case 1:
            m2.y -= 0.01 * e3.deltaY;
            break;
          default:
            m2.y -= 25e-5 * e3.deltaY;
            break;
        }
```

## pointer — js/app.adf311ea.js L2098-2115 (hit L2104)
```js
    } }, { key: "init", value: function() {
      var e3 = this, t3 = false;
      window.addEventListener("touchend", this.setTimeout), window.addEventListener("pointerdown", (function() {
        t3 = true;
      })), window.addEventListener("pointerup", (function() {
        t3 = false;
      })), window.addEventListener("pointermove", (function() {
        true === t3 && (e3.setTimeout(), e3.emit("interact"));
      })), window.addEventListener("wheel", (function(e4) {
        po = true;
      })), window.addEventListener("mouseleave", this.setTimeout), Di.on("interact", (function() {
        e3.emit("interact"), e3.setTimeout();
      }));
      var n3 = new Hammer(Di.domElement);
      n3.on("tap", this.onClick.bind(this)), un.events.on("clickDirection", (function(t4) {
        e3.goto360(t4);
      })), window.addEventListener("resize", this.onResize.bind(this)), this.onResize();
    } }, { key: "setTimeout", value: function() {
```

## reveal-timeline — js/app.adf311ea.js L2614-2623 (hit L2618)
```js
  } }, mounted: function() {
    var e2 = this;
    this.isReady = true, this.update(), this.$nextTick((function() {
      e2.drawCircle(), e2.$nextTick((function() {
        e2.setText(e2.data.hover_title + " "), e2.scale = Math.max(0.5, 1.5 - (e2.data.distance - jt.controls.minDistance) / (jt.controls.maxDistance - jt.controls.minDistance) * 1.5), e2.tween = $n["g"].fromTo(e2.$refs.
          e2.isOpened = true;
        } });
      }));
    }));
  }, beforeDestroy: function() {
```

## audio — js/chunk-vendors.194f113a.js L21503-21506 (hit L21505)
```js
      var a = new o(), s = function(t2) {
        var e2 = this;
        t2.src && 0 !== t2.src.length ? e2.init(t2) : console.error("An array of source files must be passed with any new Howl.");
      };
```

## audio — js/chunk-vendors.194f113a.js L21657-21674 (hit L21660)
```js
      }, fade: function(t2, e2, n3, r3) {
        var i2 = this;
        if ("loaded" !== i2._state || i2._playLock) return i2._queue.push({ event: "fade", action: function() {
          i2.fade(t2, e2, n3, r3);
        } }), i2;
        t2 = Math.min(Math.max(0, parseFloat(t2)), 1), e2 = Math.min(Math.max(0, parseFloat(e2)), 1), n3 = parseFloat(n3), i2.volume(t2, r3);
        for (var o2 = i2._getSoundIds(r3), s2 = 0; s2 < o2.length; s2++) {
          var c2 = i2._soundById(o2[s2]);
          if (c2) {
            if (r3 || i2._stopFade(o2[s2]), i2._webAudio && !c2._muted) {
              var l2 = a.ctx.currentTime, u2 = l2 + n3 / 1e3;
              c2._volume = t2, c2._node.gain.setValueAtTime(t2, l2), c2._node.gain.linearRampToValueAtTime(e2, u2);
            }
            i2._startFadeInterval(c2, t2, e2, n3, o2[s2], "undefined" === typeof r3);
          }
        }
        return i2;
      }, _startFadeInterval: function(t2, e2, n3, r3, i2, o2) {
```

## observer — js/chunk-vendors.194f113a.js L45546-45559 (hit L45546)
```js
          this.oldResult = void 0, this.observer = new IntersectionObserver((function(t5) {
            var e3 = t5[0];
            if (t5.length > 1) {
              var r4 = t5.find((function(t6) {
                return t6.isIntersecting;
              }));
              r4 && (e3 = r4);
            }
            if (n3.callback) {
              var i3 = e3.isIntersecting && e3.intersectionRatio >= n3.threshold;
              if (i3 === n3.oldResult) return;
              n3.oldResult = i3, n3.callback(i3, e3);
            }
          }), this.options.intersection), e2.context.$nextTick((function() {
```

## keyboard — js/chunk-vendors.194f113a.js L45830-45847 (hit L45847)
```js
  var T = (function() {
    function t2(e2, n2) {
      g2(this, t2), this.initialValue = e2[n2], this.domElement = document.createElement("div"), this.object = e2, this.property = n2, this.__onChange = void 0, this.__onFinishChange = void 0;
    }
    return m(t2, [{ key: "onChange", value: function(t3) {
      return this.__onChange = t3, this;
    } }, { key: "onFinishChange", value: function(t3) {
      return this.__onFinishChange = t3, this;
    } }, { key: "setValue", value: function(t3) {
      return this.object[this.property] = t3, this.__onChange && this.__onChange.call(this, t3), this.updateDisplay(), this;
    } }, { key: "getValue", value: function() {
      return this.object[this.property];
    } }, { key: "updateDisplay", value: function() {
      return this;
    } }, { key: "isModified", value: function() {
      return this.initialValue !== this.getValue();
    } }]), t2;
  })(), S = { HTMLEvents: ["change"], MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"], KeyboardEvents: ["keydown"] }, E = {};
```

## keyboard — js/chunk-vendors.194f113a.js L45962-45974 (hit L45971)
```js
    function e2(t3, n2) {
      g2(this, e2);
      var r3 = _(this, (e2.__proto__ || Object.getPrototypeOf(e2)).call(this, t3, n2)), i2 = r3;
      function o2() {
        i2.setValue(i2.__input.value);
      }
      function a2() {
        i2.__onFinishChange && i2.__onFinishChange.call(i2, i2.getValue());
      }
      return r3.__input = document.createElement("input"), r3.__input.setAttribute("type", "text"), C.bind(r3.__input, "keyup", o2), C.bind(r3.__input, "change", o2), C.bind(r3.__input, "blur", a2), C.bind(r3.__input, "k
        13 === t4.keyCode && this.blur();
      })), r3.updateDisplay(), r3.domElement.appendChild(r3.__input), r3;
    }
```

## page-transition — js/chunk-vendors.194f113a.js L47223-47229 (hit L47226)
```js
  function wt() {
    "scrollRestoration" in window.history && (window.history.scrollRestoration = "manual");
    var t2 = window.location.protocol + "//" + window.location.host, e2 = window.location.href.replace(t2, ""), n2 = i({}, window.history.state);
    return n2.key = _t(), window.history.replaceState(n2, "", e2), window.addEventListener("popstate", Et), function() {
      window.removeEventListener("popstate", Et);
    };
  }
```

## page-transition — js/chunk-vendors.194f113a.js L47282-47285 (hit L47284)
```js
  var Ft = ct && (function() {
    var t2 = window.navigator.userAgent;
    return (-1 === t2.indexOf("Android 2.") && -1 === t2.indexOf("Android 4.0") || -1 === t2.indexOf("Mobile Safari") || -1 !== t2.indexOf("Chrome") || -1 !== t2.indexOf("Windows Phone")) && (window.history && "function"
  })();
```

## page-transition — js/chunk-vendors.194f113a.js L47522-47537 (hit L47533)
```js
    return t2 && (e2.__proto__ = t2), e2.prototype = Object.create(t2 && t2.prototype), e2.prototype.constructor = e2, e2.prototype.setupListeners = function() {
      var t3 = this;
      if (!(this.listeners.length > 0)) {
        var e3 = this.router, n2 = e3.options.scrollBehavior, r3 = Ft && n2;
        r3 && this.listeners.push(wt());
        var i2 = function() {
          var n3 = t3.current, i3 = fe(t3.base);
          t3.current === b2 && i3 === t3._startLocation || t3.transitionTo(i3, (function(t4) {
            r3 && Tt(e3, t4, n3, true);
          }));
        };
        window.addEventListener("popstate", i2), this.listeners.push((function() {
          window.removeEventListener("popstate", i2);
        }));
      }
    }, e2.prototype.go = function(t3) {
```