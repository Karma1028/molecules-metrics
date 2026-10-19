# lemkus — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, keyboard×3, observer×3, wheel-step×1, pointer×1

## loader — assets/vendor.js?v=9664966025159750891792073412 L206-263 (hit L228)
```js
    })("undefined" != typeof window ? window : i, (function(t3) {
      let e2 = { startAnimation: function() {
        this.isAnimating || (this.isAnimating = true, this.restingFrames = 0, this.animate());
      }, animate: function() {
        this.applyDragForce(), this.applySelectedAttraction();
        let t4 = this.x;
        this.integratePhysics(), this.positionSlider(), this.settle(t4), this.isAnimating && requestAnimationFrame((() => this.animate()));
      }, positionSlider: function() {
        let e3 = this.x;
        this.isWrapping && (e3 = t3.modulo(e3, this.slideableWidth) - this.slideableWidth, this.shiftWrapCells(e3)), this.setTranslateX(e3, this.isAnimating), this.dispatchScrollEvent();
      }, setTranslateX: function(t4, e3) {
        t4 += this.cursorPosition, this.options.rightToLeft && (t4 = -t4);
        let i2 = this.getPositionValue(t4);
        this.slider.style.transform = e3 ? `translate3d(${i2},0,0)` : `translateX(${i2})`;
      }, dispatchScrollEvent: function() {
        let t4 = this.slides[0];
        if (!t4) return;
        let e3 = -this.x - t4.target, i2 = e3 / this.slidesWidth;
        this.dispatchEvent("scroll", null, [i2, e3]);
      }, positionSliderAtSelected: function() {
        this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider());
      }, getPositionValue: function(t4) {
        return this.options.percentPosition ? 0.01 * Math.round(t4 / this.size.innerWidth * 1e4) + "%" : Math.round(t4) + "px";
      }, settle: function(t4) {
        !this.isPointerDown && Math.round(100 * this.x) === Math.round(100 * t4) && this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = false, delete this.isFreeScrolling, this.positionSlider(), this.disp
      }, shiftWrapCells: function(t4) {
        let e3 = this.cursorPosition + t4;
        this._shiftCells(this.beforeShiftCells, e3, -1);
        let i2 = this.size.innerWidth - (t4 + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i2, 1);
      }, _shiftCells: function(t4, e3, i2) {
        t4.forEach(((t5) => {
          let n2 = e3 > 0 ? i2 : 0;
          this._wrapShiftCell(t5, n2), e3 -= t5.size.outerWidth;
        }));
      }, _unshiftCells: function(t4) {
        t4 && t4.length && t4.forEach(((t5) => this._wrapShiftCell(t5, 0)));
      }, _wrapShiftCell: function(t4, e3) {
        this._renderCellPosition(t4, t4.x + this.slideableWidth * e3);
      }, integratePhysics: function() {
        this.x += this.velocity, this.velocity *= this.getFrictionFactor();
      }, applyForce: function(t4) {
        this.velocity += t4;
      }, getFrictionFactor: function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"];
      }, getRestingPosition: function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor());
      }, applyDragForce: function() {
        if (!this.isDraggable || !this.isPointerDown) return;
        let t4 = this.dragX - this.x - this.velocity;
        this.applyForce(t4);
      }, applySelectedAttraction: function() {
        if (this.isDraggable && this.isPointerDown || this.isFreeScrolling || !this.slides.length) return;
        let t4 = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
        this.applyForce(t4);
      } };
      return e2;
    }));
```

## loader — assets/vendor.js?v=9664966025159750891792073412 L269-309 (hit L284)
```js
        e2.Flickity = i2(e2, e2.EvEmitter, e2.getSize, e2.fizzyUIUtils, t3.Cell, t3.Slide, t3.animatePrototype);
      }
    })("undefined" != typeof window ? window : i, (function(t3, e2, i2, n2, s2, o2, r2) {
      const { getComputedStyle: l2, console: a2 } = t3;
      let { jQuery: h2 } = t3, c2 = 0, d2 = {};
      function u2(t4, e3) {
        let i3 = n2.getQueryElement(t4);
        if (i3) {
          if (this.element = i3, this.element.flickityGUID) {
            let t5 = d2[this.element.flickityGUID];
            return t5 && t5.option(e3), t5;
          }
          h2 && (this.$element = h2(this.element)), this.options = { ...this.constructor.defaults }, this.option(e3), this._create();
        } else a2 && a2.error(`Bad element for Flickity: ${i3 || t4}`);
      }
      u2.defaults = { accessibility: true, cellAlign: "center", freeScrollFriction: 0.075, friction: 0.28, namespaceJQueryEvents: true, percentPosition: true, resize: true, selectedAttraction: 0.025, setGallerySize: true
      let f2 = u2.prototype;
      Object.assign(f2, e2.prototype), f2._create = function() {
        let { resize: e3, watchCSS: i3, rightToLeft: n3 } = this.options, s3 = this.guid = ++c2;
        this.element.flickityGUID = s3, d2[s3] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.beginMargin = n3 ? "marginRight" : "marginLeft", this.endMargin = n3 ? "marginLef
        for (let t4 in this.options.on) {
          let e4 = this.options.on[t4];
          this.on(t4, e4);
        }
        for (let t4 in u2.create) u2.create[t4].call(this);
        i3 ? this.watchCSS() : this.activate();
      }, f2.option = function(t4) {
        Object.assign(this.options, t4);
      }, f2.activate = function() {
        if (this.isActive) return;
        this.isActive = true, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize();
        let t4 = this._filterFindCellElements(this.element.children);
        this.slider.append(...t4), this.viewport.append(this.slider), this.element.append(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydo
      }, f2._createSlider = function() {
        let t4 = document.createElement("div");
        t4.className = "flickity-slider", this.slider = t4;
      }, f2._filterFindCellElements = function(t4) {
        return n2.filterFindElements(t4, this.options.cellSelector);
      }, f2.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children), this.positionCells(), this._updateWrapShiftCells(), this.setGallerySize();
      }, f2._makeCells = function(t4) {
```

## loader — assets/vendor.js?v=9664966025159750891792073412 L327-332 (hit L329)
```js
      }, f2._renderCellPosition = function(t4, e3) {
        let i3 = e3 * (this.options.rightToLeft ? -1 : 1);
        this.options.percentPosition && (i3 *= this.size.innerWidth / t4.size.width);
        let n3 = this.getPositionValue(i3);
        t4.element.style.transform = `translateX( ${n3} )`;
      }, f2._sizeCells = function(t4) {
```

## keyboard — assets/theme.js?v=22542589432901007211792073412 L115-155 (hit L130)
```js
    return t2 = t2 || {}, Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).filter(((e2) => {
      if ("#" === e2.hash || "" === e2.hash) return false;
      if (t2.ignore && e2.matches(t2.ignore)) return false;
      if (s2 = e2.hash.substr(1), null === document.getElementById(s2)) return false;
      var s2, i2 = document.querySelector(e2.hash);
      return !!i2 && (e2.addEventListener("click", (() => {
        this.forceFocus(i2, t2);
      })), true);
    }));
  }, focusable(t2) {
    return Array.prototype.slice.call(t2.querySelectorAll("[tabindex],[draggable],a[href],area,button:enabled,input:not([type=hidden]):enabled,object,select:enabled,textarea:enabled")).filter(((t3) => !(!(t3.offsetWidth 
  }, trapFocus(t2, e2) {
    e2 = e2 || {};
    var s2 = this.focusable(t2), i2 = e2.elementToFocus || t2, o2 = s2[0], n2 = s2[s2.length - 1];
    this.removeTrapFocus(), a.focusin = function(e3) {
      t2 !== e3.target && !t2.contains(e3.target) && o2 && o2 === e3.target && o2.focus(), e3.target !== t2 && e3.target !== n2 && e3.target !== o2 || document.addEventListener("keydown", a.keydown);
    }, a.focusout = function() {
      document.removeEventListener("keydown", a.keydown);
    }, a.keydown = function(e3) {
      "Tab" === e3.code && (e3.target !== n2 || e3.shiftKey || (e3.preventDefault(), o2.focus()), e3.target !== t2 && e3.target !== o2 || !e3.shiftKey || (e3.preventDefault(), n2.focus()));
    }, document.addEventListener("focusout", a.focusout), document.addEventListener("focusin", a.focusin), this.forceFocus(i2, e2);
  }, removeTrapFocus() {
    document.removeEventListener("focusin", a.focusin), document.removeEventListener("focusout", a.focusout), document.removeEventListener("keydown", a.keydown);
  }, autoFocusLastElement() {
    window.a11y.lastElement && document.body.classList.contains("is-focused") && setTimeout((() => {
      window.a11y.lastElement?.focus();
    }));
  }, accessibleLinks(t2, e2) {
    if ("string" != typeof t2) throw new TypeError(t2 + " is not a String.");
    if (0 !== (t2 = document.querySelectorAll(t2)).length) {
      (e2 = e2 || {}).messages = e2.messages || {};
      var s2 = { newWindow: e2.messages.newWindow || "Opens in a new window.", external: e2.messages.external || "Opens external website.", newWindowExternal: e2.messages.newWindowExternal || "Opens external website in a
      t2.forEach(((t3) => {
        var e3 = t3.getAttribute("target"), s3 = t3.getAttribute("rel"), i3 = (function(t4) {
          return t4.hostname !== window.location.hostname;
        })(t3), n2 = "_blank" === e3, r2 = null === s3 || -1 === s3.indexOf("noopener");
        if (n2 && r2) {
          var a2 = null === s3 ? "noopener" : s3 + " noopener";
          t3.setAttribute("rel", a2);
        }
        i3 && n2 ? t3.setAttribute("aria-describedby", o2.newWindowExternal) : i3 ? t3.setAttribute("aria-describedby", o2.external) : n2 && t3.setAttribute("aria-describedby", o2.newWindow);
```

## keyboard — assets/theme.js?v=22542589432901007211792073412 L231-238 (hit L234)
```js
  function u(t2) {
    t2.querySelectorAll(".form-field").forEach(((t3) => {
      const e2 = t3.querySelector("label"), s2 = t3.querySelector("input, textarea");
      e2 && s2 && (s2.addEventListener("keyup", ((t4) => {
        "" !== t4.target.value ? e2.classList.add("label--float") : e2.classList.remove("label--float");
      })), s2.value && s2.value.length && e2.classList.add("label--float"));
    }));
  }
```

## observer — assets/theme.js?v=22542589432901007211792073412 L294-301 (hit L301)
```js
  const B = (t2) => {
    for (const e2 of t2) if ("childList" === e2.type) {
      const t3 = e2.target, s2 = t3.querySelectorAll(H), i2 = t3.querySelectorAll(I);
      s2.length && s2.forEach(((t4) => {
        _.observe(t4);
      })), i2.length && R(i2);
    }
  }, _ = new IntersectionObserver(((t2, e2) => {
```

## observer — assets/theme.js?v=22542589432901007211792073412 L305-316 (hit L305)
```js
  }), { root: null, rootMargin: "0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }), $ = new IntersectionObserver(((t2, e2) => {
    t2.forEach(((t3) => {
      if (t3.intersectionRatio) {
        const s2 = t3.target.querySelectorAll(H);
        s2.length && s2.forEach(((t4) => {
          t4.classList.add(D);
        })), e2.unobserve(t3.target);
        const i2 = F.indexOf("#" + t3.target.id);
        -1 !== i2 && F.splice(i2, 1);
      }
    }));
  }), { root: null, rootMargin: "0px", threshold: [0.1, 0.25, 0.5, 0.75, 1] });
```

## keyboard — assets/theme.js?v=22542589432901007211792073412 L397-406 (hit L401)
```js
    focusEvents() {
      let t2 = false, e2 = 0;
      document.addEventListener("mousedown", (() => {
        t2 = false, e2 = Date.now(), this.body.classList.remove(N);
      })), document.addEventListener("keydown", (() => {
        t2 = true;
      })), document.addEventListener("focusin", (() => {
        (t2 || Date.now() - e2 > 1e3) && this.body.classList.add(N);
      }));
    }
```

## observer — assets/theme.js?v=22542589432901007211792073412 L886-895 (hit L888)
```js
    init() {
      const t2 = { root: this.container, threshold: [0.01, 0.5, 0.75, 0.99] };
      this.observer = new IntersectionObserver(((t3) => {
        t3.forEach(((t4) => {
          t4.intersectionRatio >= 0.99 ? t4.target.classList.add(Bt) : t4.target.classList.remove(Bt);
        }));
      }), t2), this.container.querySelectorAll(this.itemSelector)?.forEach(((t3) => {
        this.observer.observe(t3);
      }));
    }
```

## wheel-step — assets/theme.js?v=22542589432901007211792073412 L929-969 (hit L944)
```js
    scrollToSlide() {
      if (!this.velX && !this.isScrolling) return;
      const t2 = this.slider.querySelector(`${Ut}.${Wt}`);
      if (!t2) return;
      const e2 = parseInt(window.getComputedStyle(t2).marginRight) || 0, s2 = t2.offsetWidth + e2, i2 = t2.offsetLeft, o2 = this.velX > 0 ? 1 : -1, n2 = Math.floor(Math.abs(this.velX) / 100) || 1;
      this.startPosition = this.slider.scrollLeft, this.distance = i2 - this.startPosition, this.startTime = performance.now(), this.isScrolling = true, o2 < 0 && this.velX < s2 && (this.distance -= s2 * n2), o2 > 0 && t
    }
    scrollStep() {
      const t2 = performance.now() - this.startTime, e2 = parseFloat(this.easeOutCubic(Math.min(t2, this.duration))).toFixed(1);
      this.slider.scrollLeft = e2, t2 < this.duration ? this.scrollAnimation = requestAnimationFrame(this.scrollStep) : (this.slider.classList.remove(Nt), this.velX = 0, this.isScrolling = false);
    }
    easeOutCubic(t2) {
      return t2 /= this.duration, t2--, this.distance * (t2 * t2 * t2 + 1) + this.startPosition;
    }
    destroy() {
      this.slider.classList.remove(Rt), this.slider.removeEventListener("mousedown", this.handleMouseDown), this.slider.removeEventListener("mouseleave", this.handleMouseLeave), this.slider.removeEventListener("mouseup",
    }
  }
  customElements.get("grid-slider") || customElements.define("grid-slider", class extends HTMLElement {
    constructor() {
      super(), this.isInitialized = false, this.draggableSlider = null, this.positionArrows = this.positionArrows.bind(this), this.onButtonArrowClick = (t2) => this.buttonArrowClickEvent(t2), this.slidesObserver = null, 
    }
    connectedCallback() {
      this.init(), this.addEventListener("theme:grid-slider:init", this.init);
    }
    init() {
      this.slider = this.querySelector("[data-grid-slider]"), this.slides = this.querySelectorAll("[data-grid-item]"), this.buttons = this.querySelectorAll("[data-button-arrow]"), this.slider.classList.add("scroll-snap-d
        this.slider.classList.remove("scroll-snap-disabled");
      })).catch((() => {
        this.slider.classList.remove("scroll-snap-disabled");
      }));
    }
    toggleSlider() {
      if (!(this.slider.clientWidth < this.getSlidesWidth()) || theme.isMobile && window.theme.touch) this.destroy();
      else {
        if (this.isInitialized) return;
        this.slidesObserver = new _t(this.slider, "[data-grid-item]"), this.initArrows(), this.isInitialized = true, this.draggableSlider = new Vt(this.slider);
      }
    }
    initArrows() {
      if (!this.buttons.length) {
```

## pointer — wpm/b9f5e2762wb720532ap19708c42m93b2bec3m.js L5244-5259 (hit L5257)
```js
        r3.setAttribute("id", Qs), Xs(r3, { display: "block", position: "absolute", cursor: "grab", background: "transparent", ...Zs }, { important: true }), e4.appendChild(r3), r3.addEventListener("mousedown", (function
          function o3(t6) {
            t6.preventDefault();
            const o4 = ta, i4 = self.innerHeight - ta, s2 = ta, a2 = self.innerWidth - ta;
            if (t6.clientY < o4 || t6.clientY > i4 || t6.clientX < s2 || t6.clientX > a2) return;
            r4 && r4(t6.clientX - ta, t6.clientY - ta), n3[1] = n3[3] - t6.clientX, n3[2] = n3[4] - t6.clientY, n3[3] = t6.clientX, n3[4] = t6.clientY;
            const c2 = new DOMMatrix(getComputedStyle(e5).transform), u2 = c2.e, d2 = c2.f, l2 = u2 - n3[1], p2 = d2 - n3[2];
            Xs(e5, { transform: `translate(${l2}px, ${p2}px)` }, { important: true });
          }
          function i3(e6) {
            Xs(t5, Zs, { important: true }), self.removeEventListener("mouseup", i3), self.removeEventListener("mousemove", o3);
          }
          return (e6) => {
            e6.preventDefault(), n3[3] = e6.clientX, n3[4] = e6.clientY, self.addEventListener("mouseup", i3), self.addEventListener("mousemove", o3), Xs(t5, ea, { important: true });
          };
        })({ container: e4, handle: r3, onMove: t4 }, { 1: 0, 2: 0, 3: 0, 4: 0 }));
```