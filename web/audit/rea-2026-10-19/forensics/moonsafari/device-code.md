# moonsafari — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, text-split×3, pointer×1, reveal-timeline×3, observer×1, page-transition×2, wheel-step×3, raf-lerp×2

## loader — js/scripts.js?ver=0.1.2 L296-307 (hit L307)
```js
      }, u2.totalTime = function(t4, e3, i4) {
        if (h2 || c2.wake(), !arguments.length) return this._totalTime;
        if (this._timeline) {
          if (0 > t4 && !i4 && (t4 += this.totalDuration()), this._timeline.smoothChildTiming) {
            this._dirty && this.totalDuration();
            var n2 = this._totalDuration, r2 = this._timeline;
            if (t4 > n2 && !i4 && (t4 = n2), this._startTime = (this._paused ? this._pauseTime : r2._time) - (this._reversed ? n2 - t4 : t4) / this._timeScale, r2._dirty || this._uncache(false), r2._timeline) for (; r2._
          }
          this._gc && this._enabled(true, false), (this._totalTime !== t4 || 0 === this._duration) && (R.length && Z(), this.render(t4, e3, false), R.length && Z());
        }
        return this;
      }, u2.progress = u2.totalProgress = function(t4, e3) {
```

## text-split — js/scripts.js?ver=0.1.2 L1241-1307 (hit L1278)
```js
  e.a = new ((function(t2) {
    function e2() {
      var t3;
      return (function(t4, e3) {
        if (!(t4 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      })(this, e2), (t3 = h(this, f(e2).call(this))).isMenuOpen = false, t3.isMenuTrans = false, t3.savedScrollY = null, t3.savedForceClose = false, t3.whiteContPos = {}, t3.logoState = "default", t3.logoPos = "visible",
    }
    return (function(t3, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
      t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e3 && p(t3, e3);
    })(e2, g.a), (function(t3, e3, i3) {
      e3 && c(t3.prototype, e3), i3 && c(t3, i3);
    })(e2, [{ key: "initDOM", value: function() {
      this.$header = $(document.getElementById("header")), this.$logo = $(document.getElementById("main-logo")), this.$menuWrap = this.$header.find(".menu-wrapper"), this.$menuOverlay = this.$header.find(".menu-overlay")
    } }, { key: "initEl", value: function() {
      x.init(this.$menu, this.$burgerWrap), this._initBreadcrumb();
    } }, { key: "bindEvents", value: function() {
      m.a.on(m.a.E.RAF, this.raf, this), this.eh.clickBurger = this.manageMenu.bind(this, false), this.$burger.on("click", this.eh.clickBurger);
    } }, { key: "resize", value: function() {
      this._setWhiteContPos();
    } }, { key: "raf", value: function() {
      this._setLogoState(), this._setLogoPos();
    } }, { key: "manageMenu", value: function(t3) {
      if (this.isMenuTrans) t3 && (this.savedForceClose = true);
      else {
        var e3 = false;
        this.isMenuOpen || t3 ? this.isMenuOpen && (this._display(false), this.isMenuOpen = false, e3 = true) : (this._display(true), this.isMenuOpen = true, e3 = true), e3 && this._manageScroll(!this.isMenuOpen);
      }
    } }, { key: "_manageScroll", value: function(t3) {
      t3 ? (b.a.setScrollY(this.savedScrollY), this.savedScrollY = null) : this.savedScrollY = b.a.y;
    } }, { key: "_display", value: function(t3) {
      this.isMenuTrans = true, t3 ? (_.a.forceUpdate(), this.$menuWrap[0].classList.add("open"), this.$menuOverlay[0].style.display = "none", this.$menuWrap[0].style.display = "block", x.isDraw = true, this.tl.open = new
    } }, { key: "_onOpenComplete", value: function() {
      this.isMenuTrans = false, this.savedForceClose && (this.savedForceClose = false, this.manageMenu(true));
    } }, { key: "_onCloseComplete", value: function() {
      x.isDraw = false, this.$menuWrap[0].style.display = "none", this.isMenuTrans = false;
    } }, { key: "_initBreadcrumb", value: function() {
      this.bcCurrentPageChars = this._splitText(this.$bcCurrentPage), this.bcNextPageChars = this._splitText(this.$bcNextPage), this.bcMenuChars = this._splitText(this.$bcMenu), this.tw.bc = TweenLite.set(this.bcMenuChar
    } }, { key: "_splitText", value: function(t3) {
      return new SplitText(t3, { type: "words,chars" }).chars;
    } }, { key: "updateCurrentTitle", value: function(t3) {
      this.$bcNextPage[0].innerHTML = t3, this.bcNextPageChars = this._splitText(this.$bcNextPage), this.tl.title = new TimelineLite({ onComplete: this._onUpdateTitle, callbackScope: this }), this.tl.title.staggerTo(this
    } }, { key: "_onUpdateTitle", value: function() {
      this.$bcCurrentPage[0].innerHTML = this.$bcNextPage[0].innerHTML, this.$bcNextPage[0].innerHTML = "", this.bcCurrentPageChars = this._splitText(this.$bcCurrentPage);
    } }, { key: "_setWhiteContPos", value: function() {
      if (this.$whiteCont) {
        var t3 = this.$whiteCont.position().top, e3 = y(this.$whiteCont.outerHeight());
        this.whiteContPos = { t: t3 - this.$logo.position().top - y(0.5 * this.$logo.height()), b: t3 + e3 - this.$logo.position().top - this.$logo.height() };
      } else this._resetLogoState(), this.whiteContPos = {};
    } }, { key: "_setLogoState", value: function() {
      this.$whiteCont && ("default" == this.logoState && b.a.yI > this.whiteContPos.t && b.a.yI < this.whiteContPos.b ? (this.$logo[0].classList.add("small"), this.logoState = "small") : "small" == this.logoState && (b.a
    } }, { key: "_resetLogoState", value: function() {
      this.$logo[0].classList.remove("small"), this.logoState = "default";
    } }, { key: "_setLogoPos", value: function() {
      639 >= v.a.bW && "visible" == this.logoPos && 200 < b.a.yI ? (this.$logo[0].classList.add("hide"), this.logoPos = "hidden") : "hidden" == this.logoPos && (639 < v.a.bW || 200 > b.a.yI) && (this.$logo[0].classList.r
    } }, { key: "isMenuOpen", set: function(t3) {
      this._isMenuOpen = t3;
    }, get: function() {
      return this._isMenuOpen;
    } }, { key: "$whiteCont", set: function(t3) {
      this._$whiteCont = t3, this._setWhiteContPos();
    }, get: function() {
      return this._$whiteCont;
    } }, { key: "activateIndexLink", set: function(t3) {
      t3 ? this.$indexLink[0].classList.add("active") : this.$indexLink[0].classList.remove("active");
    } }]), e2;
  })())();
```

## pointer — js/scripts.js?ver=0.1.2 L1697-1729 (hit L1717)
```js
  e.a = new ((function(t2) {
    function e2() {
      var t3;
      return (function(t4, e3) {
        if (!(t4 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      })(this, e2), (t3 = o(this, s(e2).call(this))).E = { MOUSE_MOVE: "mousemove", MOUSE_DOWN: "mousedown", MOUSE_UP: "mouseup" }, t3.eh = {}, t3.x = null, t3.y = null, t3.xI = null, t3.yI = null, t3.MOUSE_INERTIA = 0.0
    }
    return (function(t3, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
      t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e3 && a(t3, e3);
    })(e2, u.a), (function(t3, e3, i3) {
      e3 && r(t3.prototype, e3), i3 && r(t3, i3);
    })(e2, [{ key: "init", value: function() {
      var t3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : $(window), e3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : l(t3.width() / 2), i3 = 2 < arguments.length && void 0 !== 
      this._initDOM(t3), this._initEl(e3, i3), this._bindEvents();
    } }, { key: "_initDOM", value: function(t3) {
      this.$window = t3;
    } }, { key: "_initEl", value: function(t3, e3) {
      this.setPosition(t3, e3);
    } }, { key: "_bindEvents", value: function() {
      c.a.on(c.a.E.RAF, this._raf, this), this.eh.mouseMove = this._mouseMove.bind(this), this.$window.on("mousemove", this.eh.mouseMove), this.eh.mouseDown = this._mouseDown.bind(this), this.$window.on("mousedown", this
    } }, { key: "_raf", value: function() {
      this.xI = h.a.getInertia(this.x, this.xI, this.MOUSE_INERTIA), this.yI = h.a.getInertia(this.y, this.yI, this.MOUSE_INERTIA);
    } }, { key: "_mouseMove", value: function(t3) {
      this.x = t3.clientX, this.y = t3.clientY, this.emit(this.E.MOUSE_MOVE);
    } }, { key: "_mouseDown", value: function() {
      this.emit(this.E.MOUSE_DOWN);
    } }, { key: "_mouseUp", value: function() {
      this.emit(this.E.MOUSE_UP);
    } }, { key: "setPosition", value: function(t3, e3) {
      this.x = t3, this.y = e3, this.xI = t3, this.yI = e3;
    } }]), e2;
  })())();
```

## loader — js/scripts.js?ver=0.1.2 L2383-2423 (hit L2398)
```js
    (g = Mt.prototype).parseComplex = function(t3, e3, i4, n2, r2, o2) {
      var s2, a2, l2, u2, c2, h2, f3 = this.keyword;
      if (this.multi && (N.test(i4) || N.test(e3) ? (a2 = e3.replace(N, "|").split("|"), l2 = i4.replace(N, "|").split("|")) : f3 && (a2 = [e3], l2 = [i4])), l2) {
        for (u2 = l2.length > a2.length ? l2.length : a2.length, s2 = 0; s2 < u2; s2++) e3 = a2[s2] = a2[s2] || this.dflt, i4 = l2[s2] = l2[s2] || this.dflt, f3 && ((c2 = e3.indexOf(f3)) !== (h2 = i4.indexOf(f3)) && (-1 
        e3 = a2.join(", "), i4 = l2.join(", ");
      }
      return At(t3, this.p, e3, i4, this.clrs, this.dflt, n2, this.pr, r2, o2);
    }, g.parse = function(t3, e3, n2, r2, o2, s2) {
      return this.parseComplex(t3.style, this.format(lt(t3, this.p, i3, false, this.dflt)), this.format(e3), o2, s2);
    }, p.registerSpecialProp = function(t3, e3, i4) {
      Lt(t3, { parser: function(t4, n2, r2, o2, s2, a2) {
        var l2 = new Et(t4, r2, 0, 0, s2, 2, r2, false, i4);
        return l2.plugin = a2, l2.setRatio = e3(t4, n2, o2._tween, r2), l2;
      }, priority: i4 });
    }, p.useSVGTransformAttr = true;
    var Rt, Dt = ["scaleX", "scaleY", "scaleZ", "x", "y", "z", "skewX", "skewY", "rotation", "rotationX", "rotationY", "perspective", "xPercent", "yPercent"], Bt = ot("transform"), Gt = nt + "transform", Ht = ot("transfo
      this.perspective = parseFloat(p.defaultTransformPerspective) || 0, this.force3D = !(false === p.defaultForce3D || !jt) && (p.defaultForce3D || "auto");
    }, Nt = h.m.SVGElement, Wt = function(t3, e3, i4) {
      var n2, r2 = Y.createElementNS("http://www.w3.org/2000/svg", t3), o2 = /([a-z])([A-Z])/g;
      for (n2 in i4) r2.setAttributeNS(null, n2.replace(o2, "$1-$2").toLowerCase(), i4[n2]);
      return e3.appendChild(r2), r2;
    }, Vt = Y.documentElement || {}, Xt = (function() {
      var t3, e3, i4, n2 = w || /Android/i.test(J) && !h.m.chrome;
      return Y.createElementNS && Vt.appendChild && !n2 && (t3 = Wt("svg", Vt), i4 = (e3 = Wt("rect", t3, { width: 100, height: 50, x: 100 })).getBoundingClientRect().width, e3.style[Ht] = "50% 50%", e3.style[Bt] = "scal
    })(), zt = function(t3, e3, i4, n2, r2, o2) {
      var s2, a2, l2, u2, c2, h2, f3, d2, y2, g2, m2, v2, b2, _2, T2 = t3._gsTransform, w2 = Qt(t3, true);
      T2 && (b2 = T2.xOrigin, _2 = T2.yOrigin), (!n2 || 2 > (s2 = n2.split(" ")).length) && (0 === (f3 = t3.getBBox()).x && 0 === f3.y && 0 === f3.width + f3.height && (f3 = { x: parseFloat(t3.hasAttribute("x") ? t3.getA
    }, Ut = function(t3) {
      try {
        return t3.getBBox();
      } catch (e3) {
        return function t4(e4) {
          var i4, n2 = K("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r2 = this.parentNode, o2 = this.nextSibling, s2 = this.style.cssText;
          if (Vt.appendChild(n2), n2.appendChild(this), this.style.display = "block", e4) try {
            i4 = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = t4;
          } catch (e5) {
          }
          else this._originalGetBBox && (i4 = this._originalGetBBox());
          return o2 ? r2.insertBefore(this, o2) : r2.appendChild(this), Vt.removeChild(n2), this.style.cssText = s2, i4;
        }.call(t3, true);
      }
```

## loader — js/scripts.js?ver=0.1.2 L2451-2458 (hit L2453)
```js
      if (y2) {
        i4 = h2, h2 = -f3, f3 = -i4, e3 = y2.filter, d2.filter = "";
        var g2, m2, v2 = this.t.offsetWidth, b2 = this.t.offsetHeight, _2 = "absolute" !== y2.position, T2 = "progid:DXImageTransform.Microsoft.Matrix(M11=" + u2 + ", M12=" + h2 + ", M21=" + f3 + ", M22=" + p2, S2 = n2.x
        if (null != n2.ox && (S2 += (g2 = (n2.oxp ? v2 * n2.ox * 0.01 : n2.ox) - v2 / 2) - (g2 * u2 + (m2 = (n2.oyp ? b2 * n2.oy * 0.01 : n2.oy) - b2 / 2) * h2), P2 += m2 - (g2 * f3 + m2 * p2)), _2 ? T2 += ", Dx=" + ((g2
          var x2, O2, C2, E2 = 8 > w ? 1 : -1;
          for (g2 = n2.ieOffsetX || 0, m2 = n2.ieOffsetY || 0, n2.ieOffsetX = c((v2 - ((0 > u2 ? -u2 : u2) * v2 + (0 > h2 ? -h2 : h2) * b2)) / 2 + S2), n2.ieOffsetY = c((b2 - ((0 > p2 ? -p2 : p2) * b2 + (0 > f3 ? -f3 : f
        }
      }
```

## reveal-timeline — js/scripts.js?ver=0.1.2 L2636-2644 (hit L2641)
```js
    return p.cascadeTo = function(t3, e3, i4) {
      var n2, r2, o2, s2, a2 = h.n.to(t3, e3, i4), l2 = [a2], u2 = [], c2 = [], f3 = [], p2 = h.n._internals.reservedProps;
      for (t3 = a2._targets || a2.target, oe(t3, u2, f3), a2.render(e3, true, true), oe(t3, c2), a2.render(0, true, true), a2._enabled(true), n2 = f3.length; -1 < --n2; ) if ((r2 = ft(f3[n2], u2[n2], c2[n2])).firstMPT) {
        for (o2 in r2 = r2.difs, i4) p2[o2] && (r2[o2] = i4[o2]);
        for (o2 in s2 = {}, r2) s2[o2] = u2[n2][o2];
        l2.push(h.n.fromTo(f3[n2], e3, s2, r2));
      }
      return l2;
    }, h.l.activate([p]), p;
```

## observer — js/scripts.js?ver=0.1.2 L4466-4483 (hit L4466)
```js
      return !!n2 && (t3._observer = new IntersectionObserver(function(e4) {
        e4.forEach(function(e5) {
          return (function(t4) {
            return t4.isIntersecting || 0 < t4.intersectionRatio;
          })(e5) ? (function(t4, e6, i4) {
            var n3 = i4._settings;
            v(n3.callback_enter, t4, e6, i4), n3.load_delay ? (function(t5, e7) {
              var i5 = e7._settings.load_delay, n4 = h(t5);
              n4 || (n4 = setTimeout(function() {
                P(t5, e7), O(t5);
              }, i5), c(t5, n4));
            })(t4, i4) : P(t4, i4);
          })(e5.target, e5, t3) : (function(t4, e6, i4) {
            var n3 = i4._settings;
            v(n3.callback_exit, t4, e6, i4), n3.load_delay && O(t4);
          })(e5.target, e5, t3);
        });
      }, { root: (e3 = t3._settings).container === document ? null : e3.container, rootMargin: e3.thresholds || e3.threshold + "px" }), true);
```

## page-transition — js/scripts.js?ver=0.1.2 L5865-5905 (hit L5880)
```js
    }
    return (function(t3, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
      t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e3 && I(t3, e3);
    })(e2, Hi.a), (function(t3, e3, i3) {
      e3 && E(t3.prototype, e3), i3 && E(t3, i3);
    })(e2, [{ key: "init", value: function() {
      this.initPages(), this._initDOM(), this._initEl(), this.bindEvents();
    } }, { key: "_initDOM", value: function() {
      this.$adminBar = $(document.getElementById("wpadminbar"));
    } }, { key: "_initEl", value: function() {
      this.hasAdmin = 0 != this.$adminBar.length, Yi.init();
    } }, { key: "bindEvents", value: function() {
      Yi.on(Yi.E.COMPLETE, this._onLoadAssetsComplete, this);
    } }, { key: "changePage", value: function(t3, e3) {
      return !this.isFirstLoad && this.isFreezed ? void (this.nextUrlToLoad = t3) : (this.freezed = true, this.loading = true, this.prev.url = this.current.url || null, this.current.url = t3, void (this.isFirstLoad ? (th
    } }, { key: "initPage", value: function() {
    } }, { key: "loadPage", value: function() {
    } }, { key: "updateSearch", value: function() {
      this.current.page.updateSearch();
    } }, { key: "updateHash", value: function() {
      this.current.page.updateHash();
    } }, { key: "_setView", value: function(t3) {
      this.prev.id = this.current.id || null, this.prev.page = this.current.page || null, this.prev.$dom = this.current.$dom || null, this.current.$dom = t3.find(".lesanimals-page-container"), this.current.id = this.curr
    } }, { key: "ajaxLoad", value: function(t3) {
      var e3 = this, i3 = Ui.Deferred(), n2 = new XMLHttpRequest();
      return n2.open("GET", t3, true), n2.onload = function() {
        e3._onAjaxLoadComplete(i3, $(n2.response));
      }, n2.responseType = "document", n2.send(), i3.promise;
    } }, { key: "_onAjaxLoadComplete", value: function(t3, e3) {
      this._setView(e3), this.setProjectFilter(), this._updateDom(e3), ji.a.BASIC_TRANS || this.updateContent("add-current"), t3.resolve();
    } }, { key: "setProjectFilter", value: function() {
      var t3 = !!(0 < arguments.length && void 0 !== arguments[0]) && arguments[0];
      t3 ? this.projectFilter = null : "projects" == this.prev.id && "project" == this.current.id ? this.projectFilter = this.prev.page.getActiveFilter() : "project" != this.prev.id && ("projects" != this.current.id || "
    } }, { key: "_updateDom", value: function(t3) {
      this._updateAdmin(t3), this._updateGlobal(t3), this._updateMenuClass("#menu li", t3);
    } }, { key: "_updateAdmin", value: function(t3) {
      this.hasAdmin && (this.$adminBar[0].innerHTML = t3.find("#wpadminbar")[0].innerHTML);
    } }, { key: "_updateGlobal", value: function(t3) {
      Fi.a.$body[0].className = t3[0].body.className, Fi.a.$title[0].innerHTML = t3[0].title;
    } }, { key: "_updateMenuClass", value: function(t3, e3) {
```

## reveal-timeline — js/scripts.js?ver=0.1.2 L6107-6162 (hit L6144)
```js
  })(), yn = (function(t2) {
    function e2(t3) {
      var i3;
      return (function(t4, e3) {
        if (!(t4 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      })(this, e2), (i3 = st(this, at(e2).call(this))).$listWrap = t3, i3.$activeItem = null, i3.firstItemH = null, i3.step = [], i3.props = {}, i3.ITEM_MARGIN = null, i3.sto.scroll = null, i3.freezed = false, i3.isInit 
    }
    return (function(t3, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
      t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e3 && lt(t3, e3);
    })(e2, Ni.a), (function(t3, e3, i3) {
      e3 && ot(t3.prototype, e3), i3 && ot(t3, i3);
    })(e2, [{ key: "initDOM", value: function() {
      this.$link = this.$item.find(".prs-link");
    } }, { key: "bindEvents", value: function() {
      Qi.a.on(Qi.a.E.RESIZE, this.resize, this), Fi.a.on(Fi.a.E.RAF, this.raf, this), this.eh.mouseenterItem = Wi.a.lines.hoverStartPoint.bind(Wi.a.lines, true), this.$item.on("mouseenter", this.eh.mouseenterItem), this.
    } }, { key: "unbindEvents", value: function() {
      Qi.a.off(Qi.a.E.RESIZE, this.resize, this), Fi.a.off(Fi.a.E.RAF, this.raf, this), this.$item.off("mouseenter", this.eh.mouseenterItem), this.$item.off("mouseleave", this.eh.mouseleaveItem), Ki.a.IS_IOS ? Fi.a.$body
    } }, { key: "initView", value: function() {
      var t3 = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
      this.isInit = t3;
    } }, { key: "resize", value: function() {
      this.ITEM_MARGIN = Qi.a.IS_DESKTOP ? 230 : 150, this.setProps(), this.firstItemH = this.$firstItem.height(), this._setStep(), this._magnetProjectList(0);
    } }, { key: "setProps", value: function() {
    } }, { key: "_setStep", value: function() {
      this.step = [];
      for (var t3 = 0; t3 < this.$activeItem.length; t3++) {
        var e3 = $(this.$activeItem[t3]), i3 = Gi(0.5 * e3.height()), n2 = this.getStepCenter(i3, e3.position().top, t3);
        this.step.push({ c: n2, e: i3 });
      }
    } }, { key: "_updateScroll", value: function() {
      var t3 = this;
      clearTimeout(this.sto.scroll), this.sto.scroll = setTimeout(function() {
        t3._magnetProjectList(0.5);
      }, 500);
    } }, { key: "_magnetProjectList", value: function(t3) {
      for (var e3, i3 = this, n2 = 1 / 0, r2 = 1 / 0, o2 = 0; o2 < this.step.length; o2++) e3 = this.step[o2], (Ri(e3.c - e3.e - zi.a.y) < r2 || Ri(e3.c + e3.e - zi.a.y) < r2) && (r2 = Bi(Ri(e3.c - e3.e - zi.a.y), Ri(e3.
      Ki.a.IS_IOS ? (this.scrollTo = zi.a.yI, this.scrollTo && (this.tl.scroll && this.killTimeline("scroll"), this.tl.scroll = new TimelineLite(), this.tl.scroll.fromTo(this, t3, { scrollY: zi.a.yI }, { scrollY: n2, eas
        zi.a.setScrollY(i3.scrollY);
      }, onComplete: this._onScrollComplete, callbackScope: this }, 0))) : this.tw.scroll = TweenLite.to(Fi.a.$window, 0.5, { scrollTo: { y: n2 }, ease: Quart.easeInOut });
    } }, { key: "_onScrollComplete", value: function() {
      zi.a.setScrollY(this.scrollY);
    } }, { key: "getItemClickedInfos", value: function() {
      for (var t3, e3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, i3 = { $item: this.$item, y: null }, n2 = 0; n2 < this.$link.length; n2++) if (-1 < (t3 = this.$link[n2]).href.indexOf(Nn.URL.pa
        i3.i = $(t3).parent(".prs-list-item").index();
        var r2 = this.step[n2 + e3];
        i3.y = Qi.a.IS_DESKTOP ? r2.c : Di(0, r2.c - r2.e - 20);
        break;
      }
      return i3;
    } }, { key: "freezed", set: function(t3) {
      this._freezed = t3;
    }, get: function() {
      return this._freezed;
    } }]), e2;
  })(), gn = (function(t2) {
```

## text-split — js/scripts.js?ver=0.1.2 L6305-6351 (hit L6326)
```js
  })(), bn = (function(t2) {
    function e2() {
      var t3;
      return (function(t4, e3) {
        if (!(t4 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      })(this, e2), (t3 = Ct(this, kt(e2).call(this))).itemClickedInfos = null, t3;
    }
    return (function(t3, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
      t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e3 && At(t3, e3);
    })(e2, tn), (function(t3, e3, i3) {
      e3 && Ot(t3.prototype, e3), i3 && Ot(t3, i3);
    })(e2, [{ key: "initDOM", value: function(t3) {
      Et(kt(e2.prototype), "initDOM", this).call(this, t3), this.$listWrap = this.$pageCont.find(".prs-list-wrapper"), this.$title = this.$listWrap.find(".fp-title"), this.$btnSkip = this.$listWrap.find(".fp-btn-skip"), 
    } }, { key: "initEl", value: function() {
      Wi.a.lines.point = "single", this.circles = new pn(Wi.a.ctxBg), this.circles.init(), this._initBgLetters(), this.title = new dn(this.$pageCont), this.title.init(), this.projects = new mn(this.$cvImg, this.$imgBgWra
    } }, { key: "bindEvents", value: function() {
      Et(kt(e2.prototype), "bindEvents", this).call(this), this.eh.clickSkip = un.a.scrollTo.bind(un.a), this.$btnSkip.on("click", this.eh.clickSkip);
    } }, { key: "unbindEvents", value: function() {
      Et(kt(e2.prototype), "unbindEvents", this).call(this), this.$btnSkip.off("click", this.eh.clickSkip);
    } }, { key: "playShow", value: function(t3, e3, i3) {
      var n2 = new SplitText(this.$title, { type: "lines" }).lines;
      this.tl.show = new TimelineLite({ onComplete: this.onShowComplete, onCompleteParams: [t3], onCompleteScope: this }), this.tl.show.set(this.$pageCont, { opacity: 1 }, 0), this.tl.show.call(this.listProg.show, [], th
    } }, { key: "playHide", value: function(t3, e3) {
      if (this.tl.hide = new TimelineLite({ onComplete: this.onHideComplete, onCompleteParams: [t3], onCompleteScope: this }), "homeToProject" == e3) {
        var i3 = this.itemClickedInfos.$item.filter(":nth-child( -n + ".concat(this.itemClickedInfos.i, " )")), n2 = this.itemClickedInfos.$item.filter(":nth-child( n + ".concat(this.itemClickedInfos.i + 2, " )"));
        this.tl.hide.call(this.bgLetters.hide, [1], this.bgLetters, 0), this.tl.hide.call(this.listProg.hide, [], this.listProg, 0), this.tl.hide.to(this.$imgWrap, 1, { opacity: 0, ease: Power1.easeInOut }, 0), this.tl.h
      } else this.tl.hide.call(this.bgLetters.hide, [1], this.bgLetters, 0), this.tl.hide.call(this.listProg.hide, [], this.listProg, 0), this.tl.hide.to([this.$imgWrap, this.$listWrap], 1, { opacity: 0, ease: Power1.eas
      Qi.a.IS_DESKTOP || this.tl.hide.to(this.$pt, 0.5, { opacity: 0, ease: Power1.easeInOut }, 0.5);
    } }, { key: "onHideComplete", value: function(t3) {
      zi.a.setScrollY(0), Et(kt(e2.prototype), "onHideComplete", this).call(this, t3);
    } }, { key: "initView", value: function(t3) {
      Et(kt(e2.prototype), "initView", this).call(this, t3), this.circles.initView(t3), this.bgLetters.initView(t3), this.projects.initView(t3);
    } }, { key: "resize", value: function() {
      this.isInit && (Et(kt(e2.prototype), "resize", this).call(this), this._resizeLines(), un.a.step = Qi.a.IS_DESKTOP ? this.projects.step[1].c : this.projects.step[1].c - this.projects.step[1].e - 20);
    } }, { key: "_resizeLines", value: function() {
      Wi.a.lines.length("main");
    } }, { key: "raf", value: function() {
      this.isInit && Et(kt(e2.prototype), "raf", this).call(this);
    } }, { key: "_initBgLetters", value: function() {
      this.bgLetters = new cn.a(Wi.a.ctxBg, [{ txt: "MON", x: 0, y: -58 }, { txt: "SAFRI", x: 0, y: 302 }], [{ src: { x: 31, y: 7, w: 340, h: 340 }, dest: { x: 17.2, y: 10.5 } }, { src: { x: 418, y: 0, w: 340, h: 355 }, 
    } }, { key: "getItemClickedY", value: function() {
      return this.itemClickedInfos = this.projects.getItemClickedInfos(1), this.itemClickedInfos.y;
    } }, { key: "destroy", value: function() {
      this.circles.destroy(), this.bgLetters.destroy(), this.title.destroy(), this.projects.destroy(), this.listProg.destroy(), Et(kt(e2.prototype), "destroy", this).call(this);
    } }]), e2;
  })(), _n = i2(14), Tn = i2(24), wn = (function(t2) {
```

## wheel-step — js/scripts.js?ver=0.1.2 L6434-6439 (hit L6438)
```js
    function e2(t3) {
      var i3;
      return (function(t4, e3) {
        if (!(t4 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      })(this, e2), (i3 = Vt(this, Xt(e2).call(this))).$wrapper = t3, i3.y = 0, i3.deltaY = 0, i3.deltaYI = 0, i3.dragY = 0, i3.isActive = false, i3.isBottom = false, i3.yCoeff = null, i3.step = [], i3.sto.scroll = null,
    }
```

## wheel-step — js/scripts.js?ver=0.1.2 L6444-6484 (hit L6459)
```js
      e3 && Wt(t3.prototype, e3), i3 && Wt(t3, i3);
    })(e2, [{ key: "initDOM", value: function() {
      this.$imgsCont = this.$wrapper.find(".ag-team-imgs-container"), this.$imgsLeftCont = this.$imgsCont.find(".ag-team-imgs-left-container"), this.$imgsRightCont = this.$imgsCont.find(".ag-team-imgs-right-container"), 
    } }, { key: "initEl", value: function() {
      this._randomizeItems(), this._setLeftImages(), this._initDraggableManager();
    } }, { key: "bindEvents", value: function() {
      this.eh.wheel = this._setWheelDeltaY.bind(this), addWheelListener(Fi.a.$window[0], this.eh.wheel), Qi.a.on(Qi.a.E.RESIZE, this.resize, this), Fi.a.on(Fi.a.E.RAF, this.raf, this), this.eh.scroll = this._updateImgScr
    } }, { key: "unbindEvents", value: function() {
      removeWheelListener(Fi.a.$window[0], this.eh.wheel), Qi.a.off(Qi.a.E.RESIZE, this.resize, this), Fi.a.off(Fi.a.E.RAF, this.raf, this), Fi.a.$window.off("scroll", this.eh.scroll);
    } }, { key: "initView", value: function() {
      var t3 = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
      this.isInit = t3;
    } }, { key: "resize", value: function() {
      this.$wrapper[0].style.height = Qi.a.wH + "px", this.ITEM_W = Qi.a.IS_DESKTOP ? 320 : 240, this.MARGIN = Qi.a.IS_DESKTOP ? 30 : 20, this.ITEM_STEP = this.ITEM_W + this.MARGIN, this.sliderH = this.$imgRight.length *
    } }, { key: "raf", value: function() {
      return this.isInit ? (this._setIsBottom(), this._setDeltaY(), void this._moveSlider(this.deltaYI)) : void (this.y = -this.sliderH + this.ITEM_STEP + this.offset);
    } }, { key: "_randomizeItems", value: function() {
      for (var t3 = [], e3 = 0; e3 < this.$imgRight.length; e3++) t3.push([this.$imgRight[e3], this.$txt[e3]]);
      t3.sort(function() {
        return 0.5 - Math.random();
      }), this.$imgsRightCont[0].innerHTML = "", this.$txtCont[0].innerHTML = "";
      for (var i3 = 0; i3 < t3.length; i3++) this.$imgsRightCont.append(t3[i3][0]), this.$txtCont.append(t3[i3][1]);
      this.$imgRight = this.$imgsRightCont.find(".ag-team-img-container"), this.$txt = this.$txtCont.find(".ag-team-txt");
    } }, { key: "_setLeftImages", value: function() {
      for (var t3 = this.$imgRight.length - 1; 0 <= t3; t3--) this.$imgsLeftCont.append($(this.$imgRight[t3]).clone());
      this.$imgLeft = this.$imgsLeftCont.find(".ag-team-img-container");
    } }, { key: "_initDraggableManager", value: function() {
      Ki.a.IS_DESKTOP || (this.tw.drag = Draggable.create(document.createElement("div"), { type: "y", trigger: this.$wrapper, maxDuration: 0.8, throwProps: true, onDrag: this._updateDrag, onThrowUpdate: this._updateDrag,
    } }, { key: "_updateDrag", value: function() {
      this.deltaY = this.dragY - this.tw.drag.y, this.dragY = this.tw.drag.y, this._updateImgScroll(), this._updatePageScroll();
    } }, { key: "_setStep", value: function() {
      this.step = [];
      for (var t3, e3 = 0; e3 <= this.$imgRight.length; e3++) t3 = this.offset - this.ITEM_STEP * e3, this.step.push(t3);
    } }, { key: "_setIsBottom", value: function() {
      zi.a.y >= Qi.a.sH - 1 && !this.isBottom ? this.isBottom = true : zi.a.y < Qi.a.sH - 1 && this.isBottom && (this.isBottom = false);
    } }, { key: "_setDeltaY", value: function() {
      this.deltaYI = hn.a.getInertia(this.deltaY, this.deltaYI, 0.09), this.deltaY = 0;
    } }, { key: "_setWheelDeltaY", value: function(t3) {
      0 <= t3.deltaY && zi.a.y > Qi.a.sH - 10 && t3.preventDefault();
      var e3 = t3.deltaMode ? 40 * t3.deltaY : t3.deltaY;
      this.isBottom && (this.deltaY = 1 == e3 ? e3 - 1 : e3), this.tw.scroll && this.killTween("scroll"), this._updateImgScroll();
```

## wheel-step — js/scripts.js?ver=0.1.2 L6504-6507 (hit L6506)
```js
    } }, { key: "_magnet", value: function() {
      for (var t3, e3 = 1 / 0, i3 = 1 / 0, n2 = 0; n2 < this.step.length; n2++) t3 = this.step[n2], Ri(t3 - this.y) < i3 && (i3 = Ri(t3 - this.y), e3 = t3);
      this.tw.scroll = TweenLite.to(this, 0.5, { y: e3, ease: Quart.easeInOut }), this.deltaYI = 0, this.deltaY = 0;
    } }, { key: "_updatePageScroll", value: function() {
```

## reveal-timeline — js/scripts.js?ver=0.1.2 L6932-6945 (hit L6938)
```js
    } }, { key: "playShow", value: function(t3, e3, i3) {
      var n2 = this;
      this.tl.show = new TimelineLite({ onComplete: this.onShowComplete, onCompleteParams: [t3], onCompleteScope: this }), this.tl.show.set(this.$pageCont, { opacity: 1 }, 0), Qi.a.IS_DESKTOP || this.tl.show.from(this.$p
        n2.$close[0].classList.remove("hide"), n2.$infos1[0].classList.remove("line-hide"), n2.slider.show();
      }, [], this, 2.2 + i3)) : "homeToProject" == e3 || "projectsToProject" == e3 ? (this.tl.show.from(this.$title, 0.3, { opacity: 0, ease: Power1.easeInOut }, 0), this.tl.show.call(Wi.a.lines.rotate, ["main", 0, "tran
        n2.$close[0].classList.remove("hide"), n2.$infos1[0].classList.remove("line-hide"), n2.slider.show();
      }, [], this, 1.9 + i3)) : "projectToProject" == e3 ? 0 == zi.a.y ? (this.tl.show.staggerFrom([this.$title, this.$infos1, this.$intro], 1.5, { y: 100, opacity: 0, ease: Power2.easeInOut }, 0.08, 0.5 + i3), this.tl.s
        n2.$close[0].classList.remove("hide"), n2.$infos1[0].classList.remove("line-hide"), n2.slider.show();
      }, [], this, 1.7 + i3)) : (this.tl.show.call(Wi.a.lines.length, ["bg", 0], Wi.a.lines, 0 + i3), this.tl.show.call(Wi.a.lines.length, ["main", -Qi.a.cX], Wi.a.lines, 0 + i3), this.tl.show.call(Wi.a.lines.length, ["m
        n2.$close[0].classList.remove("hide"), n2.$infos1[0].classList.remove("line-hide"), n2.slider.show();
      }, [], this, 2 + i3)) : (this.tl.show.call(Wi.a.lines.rotate, ["main", 0, "trans"], Wi.a.lines, 0 + i3), this.tl.show.call(Wi.a.lines.length, ["main", 0, "trans"], Wi.a.lines, 0.4 + i3), "fromContact" == e3 ? this.
        n2.$close[0].classList.remove("hide"), n2.$infos1[0].classList.remove("line-hide"), n2.slider.show();
      }, [], this, 1.9 + i3));
    } }, { key: "playHide", value: function(t3, e3) {
```

## raf-lerp — js/scripts.js?ver=0.1.2 L7281-7289 (hit L7286)
```js
    } }, { key: "_update", value: function() {
      this.offsetX += (this.oX - this.x) / this.JELLY, this.offsetY += (this.oY - this.y) / this.JELLY;
      var t3 = Ki.a.IS_DESKTOP ? this.x - Tn.a.x : this.x - hn.a.mapRange(sn.a.valuesI.y, 15, -15, 0, Qi.a.bW), e3 = Ki.a.IS_DESKTOP ? this.y - Tn.a.y : this.y - hn.a.mapRange(sn.a.valuesI.x, -15, 15, 0, Qi.a.wH);
      if (Math.sqrt(t3 * t3 + e3 * e3) <= this.APPROACH) {
        var i3 = this.APPROACH / 10, n2 = Li(e3, t3);
        this.offsetX += (Math.cos(n2) * this.APPROACH - t3) / i3, this.offsetY += (Math.sin(n2) * this.APPROACH - e3) / i3;
      }
      this.offsetX *= 1 - this.VISCOSITY, this.offsetY *= 1 - this.VISCOSITY, 1e-3 > Ri(this.offsetX) && (this.offsetX = 0), 1e-3 > Ri(this.offsetY) && (this.offsetY = 0), this.x += this.offsetX, this.y += this.offsetY;
    } }, { key: "_move", value: function() {
```

## text-split — js/scripts.js?ver=0.1.2 L7293-7354 (hit L7325)
```js
  })(), Hn = (function(t2) {
    function e2() {
      var t3;
      return (function(t4, e3) {
        if (!(t4 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      })(this, e2), (t3 = bi(this, Ti(e2).call(this))).titleChars = null, t3.letters = [], t3.lineInit = false, t3.lineAngle = null, t3.initAngle = null, t3.initCoeff = 0, t3.APPROACH = 100, t3.APPROACH = 200, t3.JELLY =
    }
    return (function(t3, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
      t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e3 && wi(t3, e3);
    })(e2, tn), (function(t3, e3, i3) {
      e3 && vi(t3.prototype, e3), i3 && vi(t3, i3);
    })(e2, [{ key: "initDOM", value: function(t3) {
      _i(Ti(e2.prototype), "initDOM", this).call(this, t3), this.$title = this.$pageCont.find(".e404-title"), this.$linkCont = this.$pageCont.find(".e404-link-container");
    } }, { key: "initEl", value: function() {
      Wi.a.lines.point = "single", this.lineInit = true, this._initBgLetters(), this._initLetters(), this.title = new dn(this.$pageCont), this.title.init(), _i(Ti(e2.prototype), "initEl", this).call(this);
    } }, { key: "initTl", value: function() {
    } }, { key: "bindEvents", value: function() {
      Fi.a.on(Fi.a.E.RAF, this.raf, this), Qi.a.on(Qi.a.E.RESIZE, this.resize, this);
    } }, { key: "unbindEvents", value: function() {
      Fi.a.off(Fi.a.E.RAF, this.raf, this), Qi.a.off(Qi.a.E.RESIZE, this.resize, this);
    } }, { key: "playShow", value: function(t3, e3, i3) {
      Ki.a.IS_DESKTOP || Tn.a.show(), this.initAngle = Wi.a.lines.main.a, this.tl.show = new TimelineLite({ onComplete: this.onShowComplete, onCompleteParams: [t3], onCompleteScope: this }), this.tl.show.set(this.$pageCo
    } }, { key: "onShowComplete", value: function(t3) {
      sn.a.forceUpdate(), _i(Ti(e2.prototype), "onShowComplete", this).call(this, t3);
    } }, { key: "playHide", value: function(t3) {
      Ki.a.IS_DESKTOP || Tn.a.hide(), this.lineInit = false;
      var e3 = Bn.current.id, i3 = "agency" == e3 || "project" == e3 ? 0 : "sections" == e3 ? -90 : 45;
      this.tl.hide = new TimelineLite({ onComplete: this.onHideComplete, onCompleteParams: [t3], onCompleteScope: this }), this.tl.hide.call(this.bgLetters.hide, [1], this.bgLetters, 0), this.tl.hide.call(Wi.a.lines.rota
    } }, { key: "_initBgLetters", value: function() {
      this.bgLetters = new cn.a(Wi.a.ctxBg, [{ txt: "ERU", x: 0, y: -58 }, { txt: "40", x: 0, y: 302 }], [{ src: { x: 31, y: 7, w: 260, h: 340 }, dest: { x: 48, y: -8.8 } }, { src: { x: 338, y: 7, w: 280, h: 340 }, dest:
    } }, { key: "_initLetters", value: function() {
      for (var t3 = new SplitText(this.$title, { type: "chars" }).chars, e3 = 0; e3 < t3.length; e3++) {
        var i3 = $(t3[e3]), n2 = new Gn(i3, this.APPROACH, this.JELLY, this.VISCOSITY);
        this.letters.push(n2), n2.init();
      }
    } }, { key: "initView", value: function(t3) {
      _i(Ti(e2.prototype), "initView", this).call(this, t3), this.bgLetters.initView(t3);
    } }, { key: "resize", value: function() {
      this._forceTitlePosition(), this.isInit && (_i(Ti(e2.prototype), "resize", this).call(this), this._resizeLines(), this._setLettersPosition());
    } }, { key: "_forceTitlePosition", value: function() {
      var t3 = Gi(0.5 * (Qi.a.wH - this.$title.height())) - 5;
      this.$title[0].style.paddingTop = t3 + "px";
    } }, { key: "_resizeLines", value: function() {
      Wi.a.lines.length("main");
    } }, { key: "_setLettersPosition", value: function() {
      for (var t3 = 0; t3 < this.letters.length; t3++) this.letters[t3].resize();
    } }, { key: "raf", value: function() {
      this.lineInit && this._moveLine(), this.isInit && (this._moveLetters(), this.bgLetters.setDelta(Ri(10 * (this.lineAngle - 90))));
    } }, { key: "_moveLine", value: function() {
      this.lineAngle = this.initAngle + (this._getAngle() - this.initAngle) * this.initCoeff, Wi.a.lines.rotate("main", this.lineAngle);
    } }, { key: "_getAngle", value: function() {
      var t3 = Ki.a.IS_DESKTOP ? on2.a.xI : hn.a.mapRange(sn.a.valuesI.y, 15, -15, 0, Qi.a.bW), e3 = Ki.a.IS_DESKTOP ? on2.a.yI : hn.a.mapRange(sn.a.valuesI.x, -15, 15, 0, Qi.a.wH);
      return hn.a.radToDeg(Li(e3 - Qi.a.cY, t3 - Qi.a.cX)) + 90;
    } }, { key: "_moveLetters", value: function() {
      for (var t3 = 0; t3 < this.letters.length; t3++) this.letters[t3].raf();
    } }, { key: "destroy", value: function() {
      this.bgLetters.destroy();
      for (var t3 = 0; t3 < this.letters.length; t3++) this.letters[t3].destroy();
      this.title.destroy(), _i(Ti(e2.prototype), "destroy", this).call(this);
    } }]), e2;
  })(), jn = new ((function(t2) {
```

## page-transition — js/scripts.js?ver=0.1.2 L7379-7430 (hit L7394)
```js
  })())(), Fn = ji.a.BASIC_TRANS ? jn : Bn, Nn = e.a = new ((function(t2) {
    function e2() {
      var t3;
      return (function(t4, e3) {
        if (!(t4 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      })(this, e2), (t3 = Ai(this, Ii(e2).call(this))).currentUrl = null, t3.lastTrackedUrl = null, t3;
    }
    return (function(t3, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
      t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e3 && Mi(t3, e3);
    })(e2, Hi.a), (function(t3, e3, i3) {
      e3 && ki(t3.prototype, e3), i3 && ki(t3, i3);
    })(e2, [{ key: "init", value: function() {
      Fn.init(), this._bindEvents(), this._changePage(window.location.href, false);
    } }, { key: "_bindEvents", value: function() {
      Fi.a.$window.on("popstate", this._onPopState.bind(this)), Fi.a.$window.on("hashchange", this._onHashChange.bind(this)), Fi.a.$window.on("click", this._clickHandler.bind(this)), Fn.on(Fn.E.UPDATE_GA, this._updateGA,
    } }, { key: "_changePage", value: function(t3, e3) {
      this.currentUrl = t3, Fn.changePage(this.currentUrl, e3);
    } }, { key: "_clickHandler", value: function(t3) {
      var e3 = Ui.findParent("a", t3.target);
      if (e3) {
        var i3 = e3.getAttribute("href"), n2 = this._setUrl(this.currentUrl), r2 = this._setUrl(i3), o2 = this._setUrlPartChange(n2, r2), s2 = this._clickTester(t3, e3);
        s2 && o2.isPageChange ? (event.preventDefault(), this._changePage(i3, true)) : s2 && o2.isSearchChange && (event.preventDefault(), this.currentUrl = i3, history.pushState({}, null, this.currentUrl), this._changeS
      }
    } }, { key: "_clickTester", value: function(t3, e3) {
      var i3 = e3.getAttribute("href");
      return !(!window.history.pushState || 1 < t3.which || t3.metaKey || t3.ctrlKey || t3.shiftKey || t3.altKey || e3.target && "_blank" === e3.target || window.location.protocol !== e3.protocol || window.location.hostn
    } }, { key: "_setUrl", value: function(t3) {
      return this.URL = {}, this.URL.full = En.removeProtocol(this._getFullUrl(t3)), this.URL.path = En.getPath(this.URL.full, En.removeProtocol(ji.a.SITE_URL)), this.URL.pathParams = this.URL.path.split("/"), this.URL.s
    } }, { key: "_getFullUrl", value: function(t3) {
      return null === t3 ? window.location.href : t3;
    } }, { key: "_setUrlPartChange", value: function(t3, e3) {
      return { isPageChange: t3.path != e3.path, isSearchChange: t3.search != e3.search, isHashChange: t3.hash != e3.hash };
    } }, { key: "_onPopState", value: function() {
      var t3 = window.location.href, e3 = this._setUrl(this.currentUrl), i3 = this._setUrl(t3), n2 = this._setUrlPartChange(e3, i3);
      n2.isPageChange ? this._changePage(t3, false) : n2.isSearchChange && (this.currentUrl = t3, this._changeSearch());
    } }, { key: "_onHashChange", value: function() {
      var t3 = window.location.href, e3 = this._setUrl(this.currentUrl), i3 = this._setUrl(t3), n2 = this._setUrlPartChange(e3, i3);
      !n2.isHashChange || n2.isPageChange || n2.isSearchChange || (this.currentUrl = t3, this._changeHash());
    } }, { key: "_changeSearch", value: function() {
      Fn.updateSearch();
    } }, { key: "_changeHash", value: function() {
      Fn.updateHash();
    } }, { key: "_updateGA", value: function(t3) {
      if ("false" != ji.a.IS_PROD && "" != ji.a.GA) {
        var e3 = t3.url.replace(ji.a.SITE_URL, ""), i3 = t3.title;
        e3 !== this.lastTrackedUrl && (this.lastTrackedUrl = e3, "undefined" != typeof ga && ga.getAll && ga.getAll().forEach(function(t4) {
          ga(t4.get("name") + ".set", { page: e3, title: i3 }), ga(t4.get("name") + ".send", "pageview"), ga(t4.get("name") + ".send", "pageview", e3);
        }));
      }
    } }]), e2;
  })())();
```

## raf-lerp — js/scripts.js?ver=0.1.2 L7966-7976 (hit L7970)
```js
    }, l = 999999999999999, u = r.m._gsDefine.globals, c = false, h = { x: 1, y: 1, z: 2, scale: 1, scaleX: 1, scaleY: 1, rotation: 1, rotationZ: 1, rotationX: 2, rotationY: 2, skewX: 1, skewY: 1, xPercent: 1, yPercent: 
      var s3, a2, u2, c2, h2 = e3.length, f2 = 0, p2 = l;
      if ("object" === n(t3)) {
        for (; -1 < --h2; ) {
          for (u2 in s3 = e3[h2], a2 = 0, t3) a2 += (c2 = s3[u2] - t3[u2]) * c2;
          a2 < p2 && (f2 = h2, p2 = a2);
        }
        if ((o3 || l) < l && o3 < Math.sqrt(p2)) return t3;
      } else for (; -1 < --h2; ) 0 > (a2 = (s3 = e3[h2]) - t3) && (a2 = -a2), a2 < p2 && s3 >= r2 && s3 <= i4 && (f2 = h2, p2 = a2);
      return e3[f2];
    }, p = function(t3, e3, i4, r2, o3, s3) {
```