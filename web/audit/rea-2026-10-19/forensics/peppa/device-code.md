# peppa — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, pointer×1

## loader — js/mama-joyce-peppa-sauce.js L4169-4176 (hit L4173)
```js
      var e = function(t2, e2, r2, n2) {
        var i3, a2, s2, o2, h, l, c = defaultCurveSegments, u = 0, f = [], p = [], d = bezier_length_pool.newElement();
        for (s2 = r2.length, i3 = 0; i3 < c; i3 += 1) {
          for (h = i3 / (c - 1), l = 0, a2 = 0; a2 < s2; a2 += 1) o2 = bm_pow(1 - h, 3) * t2[a2] + 3 * bm_pow(1 - h, 2) * h * r2[a2] + 3 * (1 - h) * bm_pow(h, 2) * n2[a2] + bm_pow(h, 3) * e2[a2], f[a2] = o2, null !== p[a
          l && (u += l = bm_sqrt(l)), d.percents[i3] = h, d.lengths[i3] = u;
        }
        return d.addedLength = u, d;
      };
```

## loader — js/mama-joyce-peppa-sauce.js L4197-4205 (hit L4198)
```js
      function s(t2, e2) {
        var r2 = e2.percents, n2 = e2.lengths, i3 = r2.length, a2 = bm_floor((i3 - 1) * t2), s2 = t2 * e2.addedLength, o2 = 0;
        if (a2 === i3 - 1 || 0 === a2 || s2 === n2[a2]) return r2[a2];
        for (var h = n2[a2] > s2 ? -1 : 1, l = true; l; ) if (n2[a2] <= s2 && n2[a2 + 1] > s2 ? (o2 = (s2 - n2[a2]) / (n2[a2 + 1] - n2[a2]), l = false) : a2 += h, a2 < 0 || a2 >= i3 - 1) {
          if (a2 === i3 - 1) return r2[a2];
          l = false;
        }
        return r2[a2] + (r2[a2 + 1] - r2[a2]) * o2;
      }
```

## loader — js/mama-joyce-peppa-sauce.js L4982-5034 (hit L4982)
```js
    }, ImagePreloader = (function() {
      var t = (function() {
        var t2 = createTag("canvas");
        t2.width = 1, t2.height = 1;
        var e2 = t2.getContext("2d");
        return e2.fillStyle = "rgba(0,0,0,0)", e2.fillRect(0, 0, 1, 1), t2;
      })();
      function e() {
        this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
      }
      function r(e2) {
        var r2 = (function(t2, e3, r3) {
          var n3 = "";
          if (t2.e) n3 = t2.p;
          else if (e3) {
            var i4 = t2.p;
            -1 !== i4.indexOf("images/") && (i4 = i4.split("/")[1]), n3 = e3 + i4;
          } else n3 = r3, n3 += t2.u ? t2.u : "", n3 += t2.p;
          return n3;
        })(e2, this.assetsPath, this.path), n2 = createTag("img");
        n2.crossOrigin = "anonymous", n2.addEventListener("load", this._imageLoaded.bind(this), false), n2.addEventListener("error", function() {
          i3.img = t, this._imageLoaded();
        }.bind(this), false), n2.src = r2;
        var i3 = { img: n2, assetData: e2 };
        return i3;
      }
      function n(t2, e2) {
        this.imagesLoadedCb = e2;
        var r2, n2 = t2.length;
        for (r2 = 0; r2 < n2; r2 += 1) t2[r2].layers || (this.totalImages += 1, this.images.push(this._createImageData(t2[r2])));
      }
      function i2(t2) {
        this.path = t2 || "";
      }
      function a(t2) {
        this.assetsPath = t2 || "";
      }
      function s(t2) {
        for (var e2 = 0, r2 = this.images.length; e2 < r2; ) {
          if (this.images[e2].assetData === t2) return this.images[e2].img;
          e2 += 1;
        }
      }
      function o() {
        this.imagesLoadedCb = null, this.images.length = 0;
      }
      function h() {
        return this.totalImages === this.loadedAssets;
      }
      return function() {
        this.loadAssets = n, this.setAssetsPath = a, this.setPath = i2, this.loaded = h, this.destroy = o, this.getImage = s, this._createImageData = r, this._imageLoaded = e, this.assetsPath = "", this.path = "", this.t
      };
    })(), featureSupport = (function() {
```

## pointer — js/mama-joyce-peppa-sauce.js L9744-9769 (hit L9766)
```js
    function n(e3) {
      var n2, i2, a = false, s = false, o = Math.min(Math.round(0.04 * window.innerWidth), 40);
      function h(t3) {
        var e4 = t3.touches;
        e4 && e4.length > 1 || (a = true, e4 ? (s = true, n2 = e4[0].clientX) : n2 = t3.clientX, i2 = n2);
      }
      function l(e4) {
        if (a) {
          if (s && "mousemove" === e4.type) return e4.preventDefault(), void e4.stopPropagation();
          var n3 = e4.touches, h2 = n3 ? n3[0].clientX : e4.clientX, l2 = h2 - i2;
          i2 = h2, Math.abs(l2) > o && r2 && "" === String(r2()) && (!(function(e5, r3, n4) {
            var i3 = t2.Event(e5, { originalEvent: r3 });
            t2(r3.target).trigger(i3, n4);
          })("swipe", e4, { direction: l2 > 0 ? "right" : "left" }), u());
        }
      }
      function c(t3) {
        if (a) return a = false, s && "mouseup" === t3.type ? (t3.preventDefault(), t3.stopPropagation(), void (s = false)) : void 0;
      }
      function u() {
        a = false;
      }
      e3.addEventListener("touchstart", h, false), e3.addEventListener("touchmove", l, false), e3.addEventListener("touchend", c, false), e3.addEventListener("touchcancel", u, false), e3.addEventListener("mousedown", h, 
        e3.removeEventListener("touchstart", h, false), e3.removeEventListener("touchmove", l, false), e3.removeEventListener("touchend", c, false), e3.removeEventListener("touchcancel", u, false), e3.removeEventListener
      };
    }
```