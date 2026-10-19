# the3key — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, page-transition×2, wheel-step×3, keyboard×3, observer×3, reveal-timeline×2, cursor-dom×1, pointer×1

## loader — js/foundation.min.js?ver=6.8.1 L274-292 (hit L276)
```js
        function x() {
          var s3 = _.clientWidth, o2 = _.clientHeight, a2 = e2(-d2 + (d2 = _.scrollLeft || window.pageXOffset)), r2 = e2(-f + (f = _.scrollTop || window.pageYOffset)), u2 = _.scrollLeft / (_.scrollWidth - s3 || 1), g2 = 
          C = C || k.scrollDirX !== a2 || k.scrollDirY !== r2 || k.scrollPercentX !== u2 || k.scrollPercentY !== g2, k.scrollDirX = a2, k.scrollDirY = r2, k.scrollPercentX = u2, k.scrollPercentY = g2;
          for (var m2, v2 = false, b2 = 0; b2 < z.length; b2++) {
            var w2 = z[b2], $2 = w2.element, T2 = $2, x2 = 0, S2 = 0;
            do {
              x2 += T2.offsetLeft, S2 += T2.offsetTop, T2 = T2.offsetParent;
            } while (T2 && T2 !== y);
            var L2, A2 = $2.clientHeight || $2.offsetHeight || 0, E = $2.clientWidth || $2.offsetWidth || 0, H = (t3(x2 + E, d2, d2 + s3) - t3(x2, d2, d2 + s3)) / E, M = (t3(S2 + A2, f, f + o2) - t3(S2, f, f + o2)) / A2,
            L2 = n2.offset ? c(n2.offset, $2, w2, _) <= f ? 1 : 0 : (c(n2.threshold, $2, w2, _) || 0) < H * M ? 1 : 0;
            var q = w2.visible !== L2;
            (w2._changed || q || w2.visibleX !== H || w2.visibleY !== M || w2.index !== b2 || w2.elementHeight !== A2 || w2.elementWidth !== E || w2.offsetX !== x2 || w2.offsetY !== S2 || w2.intersectX != w2.intersectX |
          }
          p || !C && !v2 || (m2 = O, l.push(m2), h(), p = function() {
            !(l = l.filter((function(t4) {
              return t4 !== m2;
            }))).length && i2 && (cancelAnimationFrame(i2), i2 = 0);
          });
        }
```

## page-transition — js/foundation.min.js?ver=6.8.1 L919-925 (hit L923)
```js
      toggle(t3) {
        if (t3.closest("[data-accordion]").is("[disabled]")) console.info("Cannot toggle an accordion that is disabled.");
        else if (t3.parent().hasClass("is-active") ? this.up(t3) : this.down(t3), this.options.deepLink) {
          var e3 = t3.prev("a").attr("href");
          this.options.updateHistory ? history.pushState({}, "", e3) : history.replaceState({}, "", e3);
        }
      }
```

## page-transition — js/foundation.min.js?ver=6.8.1 L1701-1707 (hit L1705)
```js
      _handleTabChange(t3, e3) {
        if (t3.hasClass(`${this.options.linkActiveClass}`)) this.options.activeCollapse && this._collapse();
        else {
          var i2 = this.$element.find(`.${this.options.linkClass}.${this.options.linkActiveClass}`), n2 = t3.find('[role="tab"]'), s2 = n2.attr("data-tabs-target"), o2 = s2 && s2.length ? `#${s2}` : n2[0].hash, a2 = this
          this._collapseTab(i2), this._openTab(t3), this.options.deepLink && !e3 && (this.options.updateHistory ? history.pushState({}, "", location.pathname + location.search + o2) : history.replaceState({}, "", locatio
        }
      }
```

## loader — plugins/lazyload.min.js?ver=17.8.2 L244-262 (hit L246)
```js
  }, En = function(n2, e2) {
    var o2 = c(n2);
    this._settings = o2, this.loadingCount = 0, (function(n3, t2) {
      i && !gn(n3) && (t2._observer = new IntersectionObserver((function(e3) {
        vn(e3, n3, t2);
      }), (function(n4) {
        return { root: n4.container === document ? null : n4.container, rootMargin: n4.thresholds || n4.threshold + "px" };
      })(n3)));
    })(o2, this), (function(n3, e3) {
      t && (e3._onlineHandler = function() {
        !(function(n4, t2) {
          var e4;
          (e4 = mn(n4), bn(e4).filter(pn)).forEach((function(t3) {
            M(t3, n4.class_error), A(t3);
          })), t2.update();
        })(n3, e3);
      }, window.addEventListener("online", e3._onlineHandler));
    })(o2, this), this.update(e2);
  };
```

## loader — plugins/select2.full.min.js?ver=4.1.0 L167-172 (hit L169)
```js
    }, s2.prototype.displayMessage = function(e2) {
      var t2 = this.options.get("escapeMarkup");
      this.clear(), this.hideLoading();
      var n2 = d('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'), s3 = this.options.get("translations").get(e2.message);
      n2.append(t2(s3(e2.args))), n2[0].className += " select2-results__message", this.$results.append(n2);
    }, s2.prototype.hideMessages = function() {
```

## wheel-step — plugins/select2.full.min.js?ver=4.1.0 L228-270 (hit L261)
```js
    }, s2.prototype.bind = function(t2, e2) {
      var i2 = this, n2 = t2.id + "-results";
      this.$results.attr("id", n2), t2.on("results:all", function(e3) {
        i2.clear(), i2.append(e3.data), t2.isOpen() && (i2.setClasses(), i2.highlightFirstItem());
      }), t2.on("results:append", function(e3) {
        i2.append(e3.data), t2.isOpen() && i2.setClasses();
      }), t2.on("query", function(e3) {
        i2.hideMessages(), i2.showLoading(e3);
      }), t2.on("select", function() {
        t2.isOpen() && (i2.setClasses(), i2.options.get("scrollAfterSelect") && i2.highlightFirstItem());
      }), t2.on("unselect", function() {
        t2.isOpen() && (i2.setClasses(), i2.options.get("scrollAfterSelect") && i2.highlightFirstItem());
      }), t2.on("open", function() {
        i2.$results.attr("aria-expanded", "true"), i2.$results.attr("aria-hidden", "false"), i2.setClasses(), i2.ensureHighlightVisible();
      }), t2.on("close", function() {
        i2.$results.attr("aria-expanded", "false"), i2.$results.attr("aria-hidden", "true"), i2.$results.removeAttr("aria-activedescendant");
      }), t2.on("results:toggle", function() {
        var e3 = i2.getHighlightedResults();
        0 !== e3.length && e3.trigger("mouseup");
      }), t2.on("results:select", function() {
        var e3, t3 = i2.getHighlightedResults();
        0 !== t3.length && (e3 = p2.GetData(t3[0], "data"), t3.hasClass("select2-results__option--selected") ? i2.trigger("close", {}) : i2.trigger("select", { data: e3 }));
      }), t2.on("results:previous", function() {
        var e3, t3 = i2.getHighlightedResults(), n3 = i2.$results.find(".select2-results__option--selectable"), s3 = n3.index(t3);
        s3 <= 0 || (e3 = s3 - 1, 0 === t3.length && (e3 = 0), (s3 = n3.eq(e3)).trigger("mouseenter"), t3 = i2.$results.offset().top, n3 = s3.offset().top, s3 = i2.$results.scrollTop() + (n3 - t3), 0 === e3 ? i2.$results.
      }), t2.on("results:next", function() {
        var e3, t3 = i2.getHighlightedResults(), n3 = i2.$results.find(".select2-results__option--selectable"), s3 = n3.index(t3) + 1;
        s3 >= n3.length || ((e3 = n3.eq(s3)).trigger("mouseenter"), t3 = i2.$results.offset().top + i2.$results.outerHeight(false), n3 = e3.offset().top + e3.outerHeight(false), e3 = i2.$results.scrollTop() + n3 - t3, 0 
      }), t2.on("results:focus", function(e3) {
        e3.element[0].classList.add("select2-results__option--highlighted"), e3.element[0].setAttribute("aria-selected", "true");
      }), t2.on("results:message", function(e3) {
        i2.displayMessage(e3);
      }), d.fn.mousewheel && this.$results.on("mousewheel", function(e3) {
        var t3 = i2.$results.scrollTop(), n3 = i2.$results.get(0).scrollHeight - t3 + e3.deltaY, t3 = 0 < e3.deltaY && t3 - e3.deltaY <= 0, n3 = e3.deltaY < 0 && n3 <= i2.$results.height();
        t3 ? (i2.$results.scrollTop(0), e3.preventDefault(), e3.stopPropagation()) : n3 && (i2.$results.scrollTop(i2.$results.get(0).scrollHeight - i2.$results.height()), e3.preventDefault(), e3.stopPropagation());
      }), this.$results.on("mouseup", ".select2-results__option--selectable", function(e3) {
        var t3 = d(this), n3 = p2.GetData(this, "data");
        t3.hasClass("select2-results__option--selected") ? i2.options.get("multiple") ? i2.trigger("unselect", { originalEvent: e3, data: n3 }) : i2.trigger("close", {}) : i2.trigger("select", { originalEvent: e3, data: 
      }), this.$results.on("mouseenter", ".select2-results__option--selectable", function(e3) {
        var t3 = p2.GetData(this, "data");
        i2.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected", "false"), i2.trigger("results:focus", { data: t3, element: d(this) });
      });
    }, s2.prototype.getHighlightedResults = function() {
```

## keyboard — plugins/select2.full.min.js?ver=4.1.0 L290-311 (hit L296)
```js
    }, o2.prototype.bind = function(e2, t2) {
      var n3 = this, s3 = e2.id + "-results";
      this.container = e2, this.$selection.on("focus", function(e3) {
        n3.trigger("focus", e3);
      }), this.$selection.on("blur", function(e3) {
        n3._handleBlur(e3);
      }), this.$selection.on("keydown", function(e3) {
        n3.trigger("keypress", e3), e3.which === i2.SPACE && e3.preventDefault();
      }), e2.on("results:focus", function(e3) {
        n3.$selection.attr("aria-activedescendant", e3.data._resultId);
      }), e2.on("selection:update", function(e3) {
        n3.update(e3.data);
      }), e2.on("open", function() {
        n3.$selection.attr("aria-expanded", "true"), n3.$selection.attr("aria-owns", s3), n3._attachCloseHandler(e2);
      }), e2.on("close", function() {
        n3.$selection.attr("aria-expanded", "false"), n3.$selection.removeAttr("aria-activedescendant"), n3.$selection.removeAttr("aria-owns"), n3.$selection.trigger("focus"), n3._detachCloseHandler(e2);
      }), e2.on("enable", function() {
        n3.$selection.attr("tabindex", n3._tabindex), n3.$selection.attr("aria-disabled", "false");
      }), e2.on("disable", function() {
        n3.$selection.attr("tabindex", "-1"), n3.$selection.attr("aria-disabled", "true");
      });
    }, o2.prototype._handleBlur = function(e2) {
```

## keyboard — plugins/select2.full.min.js?ver=4.1.0 L373-385 (hit L382)
```js
    }, o2.prototype.bind = function(e3, t2) {
      var n2 = this;
      o2.__super__.bind.apply(this, arguments);
      var s2 = e3.id + "-container";
      this.$selection.find(".select2-selection__rendered").attr("id", s2), this.$selection.on("click", function(e4) {
        n2.trigger("toggle", { originalEvent: e4 });
      }), this.$selection.on("click", ".select2-selection__choice__remove", function(e4) {
        var t3;
        n2.isDisabled() || (t3 = i2(this).parent(), t3 = c2.GetData(t3[0], "data"), n2.trigger("unselect", { originalEvent: e4, data: t3 }));
      }), this.$selection.on("keydown", ".select2-selection__choice__remove", function(e4) {
        n2.isDisabled() || e4.stopPropagation();
      });
    }, o2.prototype.clear = function() {
```

## keyboard — plugins/select2.full.min.js?ver=4.1.0 L464-495 (hit L482)
```js
    }, e2.prototype.bind = function(e3, t2, n2) {
      var s3 = this, i2 = t2.id + "-results", o2 = t2.id + "-container";
      e3.call(this, t2, n2), s3.$search.attr("aria-describedby", o2), t2.on("open", function() {
        s3.$search.attr("aria-controls", i2), s3.$search.trigger("focus");
      }), t2.on("close", function() {
        s3.$search.val(""), s3.resizeSearch(), s3.$search.removeAttr("aria-controls"), s3.$search.removeAttr("aria-activedescendant"), s3.$search.trigger("focus");
      }), t2.on("enable", function() {
        s3.$search.prop("disabled", false), s3._transferTabIndex();
      }), t2.on("disable", function() {
        s3.$search.prop("disabled", true);
      }), t2.on("focus", function(e4) {
        s3.$search.trigger("focus");
      }), t2.on("results:focus", function(e4) {
        e4.data._resultId ? s3.$search.attr("aria-activedescendant", e4.data._resultId) : s3.$search.removeAttr("aria-activedescendant");
      }), this.$selection.on("focusin", ".select2-search--inline", function(e4) {
        s3.trigger("focus", e4);
      }), this.$selection.on("focusout", ".select2-search--inline", function(e4) {
        s3._handleBlur(e4);
      }), this.$selection.on("keydown", ".select2-search--inline", function(e4) {
        var t3;
        e4.stopPropagation(), s3.trigger("keypress", e4), s3._keyUpPrevented = e4.isDefaultPrevented(), e4.which !== l2.BACKSPACE || "" !== s3.$search.val() || 0 < (t3 = s3.$selection.find(".select2-selection__choice").l
      }), this.$selection.on("click", ".select2-search--inline", function(e4) {
        s3.$search.val() && e4.stopPropagation();
      });
      var t2 = document.documentMode, r2 = t2 && t2 <= 11;
      this.$selection.on("input.searchcheck", ".select2-search--inline", function(e4) {
        r2 ? s3.$selection.off("input.search input.searchcheck") : s3.$selection.off("keyup.search");
      }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function(e4) {
        var t3;
        r2 && "input" === e4.type ? s3.$selection.off("input.search input.searchcheck") : (t3 = e4.which) != l2.SHIFT && t3 != l2.CTRL && t3 != l2.ALT && t3 != l2.TAB && s3.handleSearch(e4);
      });
    }, e2.prototype._transferTabIndex = function(e3) {
```

## wheel-step — plugins/select2.full.min.js?ver=4.1.0 L1298-1330 (hit L1299)
```js
  }), a = function(u2) {
    var d, p2, e2 = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], t2 = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], h2 = A
    if (u2.event.fixHooks) for (var n2 = e2.length; n2; ) u2.event.fixHooks[e2[--n2]] = u2.event.mouseHooks;
    var f2 = u2.event.special.mousewheel = { version: "3.1.12", setup: function() {
      if (this.addEventListener) for (var e3 = t2.length; e3; ) this.addEventListener(t2[--e3], s2, false);
      else this.onmousewheel = s2;
      u2.data(this, "mousewheel-line-height", f2.getLineHeight(this)), u2.data(this, "mousewheel-page-height", f2.getPageHeight(this));
    }, teardown: function() {
      if (this.removeEventListener) for (var e3 = t2.length; e3; ) this.removeEventListener(t2[--e3], s2, false);
      else this.onmousewheel = null;
      u2.removeData(this, "mousewheel-line-height"), u2.removeData(this, "mousewheel-page-height");
    }, getLineHeight: function(e3) {
      var t3 = u2(e3), e3 = t3["offsetParent" in u2.fn ? "offsetParent" : "parent"]();
      return e3.length || (e3 = u2("body")), parseInt(e3.css("fontSize"), 10) || parseInt(t3.css("fontSize"), 10) || 16;
    }, getPageHeight: function(e3) {
      return u2(e3).height();
    }, settings: { adjustOldDeltas: true, normalizeOffset: true } };
    function s2(e3) {
      var t3, n3 = e3 || window.event, s3 = h2.call(arguments, 1), i2 = 0, o2 = 0, r2 = 0, a2 = 0, l2 = 0, c2 = 0;
      if (e3 = u2.event.fix(n3), e3.type = "mousewheel", "detail" in n3 && (r2 = -1 * n3.detail), "wheelDelta" in n3 && (r2 = n3.wheelDelta), "wheelDeltaY" in n3 && (r2 = n3.wheelDeltaY), "wheelDeltaX" in n3 && (o2 = -1 
    }
    function g2() {
      p2 = null;
    }
    function m2(e3, t3) {
      return f2.settings.adjustOldDeltas && "mousewheel" === e3.type && t3 % 120 == 0;
    }
    u2.fn.extend({ mousewheel: function(e3) {
      return e3 ? this.bind("mousewheel", e3) : this.trigger("mousewheel");
    }, unmousewheel: function(e3) {
      return this.unbind("mousewheel", e3);
    } });
  }, "function" == typeof u.define && u.define.amd ? u.define("jquery-mousewheel", ["jquery"], a) : "object" == typeof exports ? module.exports = a : a(t), u.define("jquery.select2", ["jquery", "jquery-mousewheel", "./se
```

## observer — js/vanilla.min.js L275-315 (hit L290)
```js
    return (e2 - t2._start) * t2._ts + (t2._ts >= 0 ? 0 : t2._dirty ? t2.totalDuration() : t2._tDur);
  }, Ne = function(e2) {
    return e2._end = we(e2._start + (e2._tDur / Math.abs(e2._ts || e2._rts || E) || 0));
  }, qe = function(e2, t2) {
    var n2 = e2._dp;
    return n2 && n2.smoothChildTiming && e2._ts && (e2._start = we(n2._time - (e2._ts > 0 ? t2 / e2._ts : ((e2._dirty ? e2.totalDuration() : e2._tDur) - t2) / -e2._ts)), Ne(e2), n2._dirty || Ie(n2, e2)), e2;
  }, Ve = function(e2, t2) {
    var n2;
    if ((t2._time || !t2._dur && t2._initted || t2._start < e2._time && (t2._dur || !t2.add)) && (n2 = Ge(e2.rawTime(), t2), (!t2._dur || et(0, t2.totalDuration(), n2) - t2._tTime > E) && t2.render(n2, true)), Ie(e2, t2)
      if (e2._dur < e2.duration()) for (n2 = e2; n2._dp; ) n2.rawTime() >= 0 && n2.totalTime(n2._tTime), n2 = n2._dp;
      e2._zTime = -1e-8;
    }
  }, He = function(e2, t2, n2, r2) {
    return t2.parent && ze(t2), t2._start = we((I(n2) ? n2 : n2 || e2 !== l ? Ze(e2, n2, t2) : e2._time) + t2._delay), t2._end = we(t2._start + (t2.totalDuration() / Math.abs(t2.timeScale()) || 0)), Ae(e2, t2, "_first", 
  }, Ye = function(e2, t2) {
    return (U.ScrollTrigger || Q("scrollTrigger", t2)) && U.ScrollTrigger.create(t2, e2);
  }, $e = function(e2, t2, n2, r2, i2) {
    return Ut(e2, t2, i2), e2._initted ? !n2 && e2._pt && !a && (e2._dur && false !== e2.vars.lazy || !e2._dur && e2.vars.lazy) && f !== kt.frame ? (ae.push(e2), e2._lazy = [i2, r2], 1) : void 0 : 1;
  }, je = function e2(t2) {
    var n2 = t2.parent;
    return n2 && n2._ts && n2._initted && !n2._lock && (n2.rawTime() < 0 || e2(n2));
  }, Xe = function(e2) {
    var t2 = e2.data;
    return "isFromStart" === t2 || "isStart" === t2;
  }, We = function(e2, t2, n2, r2) {
    var i2 = e2._repeat, s2 = we(t2) || 0, a2 = e2._tTime / e2._tDur;
    return a2 && !r2 && (e2._time *= s2 / e2._dur), e2._dur = s2, e2._tDur = i2 ? i2 < 0 ? 1e10 : we(s2 * (i2 + 1) + e2._rDelay * i2) : s2, a2 > 0 && !r2 && qe(e2, e2._tTime = e2._tDur * a2), e2.parent && Ne(e2), n2 || I
  }, Ue = function(e2) {
    return e2 instanceof Ht ? Ie(e2) : We(e2, e2._dur);
  }, Ke = { _start: 0, endTime: te, totalDuration: te }, Ze = function e2(t2, n2, r2) {
    var i2, s2, a2, o2 = t2.labels, l2 = t2._recent || Ke, c2 = t2.duration() >= S ? l2.endTime(false) : t2._dur;
    return L(n2) && (isNaN(n2) || n2 in o2) ? (s2 = n2.charAt(0), a2 = "%" === n2.substr(-1), i2 = n2.indexOf("="), "<" === s2 || ">" === s2 ? (i2 >= 0 && (n2 = n2.replace(/=/, "")), ("<" === s2 ? l2._start : l2.endTime(
  }, Qe = function(e2, t2, n2) {
    var r2, i2, s2 = I(t2[1]), a2 = (s2 ? 2 : 1) + (e2 < 2 ? 0 : 1), o2 = t2[a2];
    if (s2 && (o2.duration = t2[1]), o2.parent = n2, e2) {
      for (r2 = o2, i2 = n2; i2 && !("immediateRender" in r2); ) r2 = i2.vars.defaults || {}, i2 = B(i2.vars.inherit) && i2.parent;
      o2.immediateRender = B(r2.immediateRender), e2 < 2 ? o2.runBackwards = 1 : o2.startAt = t2[a2 - 1];
    }
    return new en(t2[0], o2, t2[a2 + 1]);
  }, Je = function(e2, t2) {
    return e2 || 0 === e2 ? t2(e2) : t2;
```

## reveal-timeline — js/vanilla.min.js L656-696 (hit L671)
```js
    }
    i(t2, e2);
    var n2 = t2.prototype;
    return n2.to = function(e3, t3, n3) {
      return Qe(0, arguments, this), this;
    }, n2.from = function(e3, t3, n3) {
      return Qe(1, arguments, this), this;
    }, n2.fromTo = function(e3, t3, n3, r2) {
      return Qe(2, arguments, this), this;
    }, n2.set = function(e3, t3, n3) {
      return t3.duration = 0, t3.parent = this, Oe(t3).repeatDelay || (t3.repeat = 0), t3.immediateRender = !!t3.immediateRender, new en(e3, t3, Ze(this, n3), 1), this;
    }, n2.call = function(e3, t3, n3) {
      return He(this, en.delayedCall(0, e3, t3), n3);
    }, n2.staggerTo = function(e3, t3, n3, r2, i2, s2, a2) {
      return n3.duration = t3, n3.stagger = n3.stagger || r2, n3.onComplete = s2, n3.onCompleteParams = a2, n3.parent = this, new en(e3, n3, Ze(this, i2)), this;
    }, n2.staggerFrom = function(e3, t3, n3, r2, i2, s2, a2) {
      return n3.runBackwards = 1, Oe(n3).immediateRender = B(n3.immediateRender), this.staggerTo(e3, t3, n3, r2, i2, s2, a2);
    }, n2.staggerFromTo = function(e3, t3, n3, r2, i2, s2, a2, o2) {
      return r2.startAt = n3, Oe(r2).immediateRender = B(r2.immediateRender), this.staggerTo(e3, t3, r2, i2, s2, a2, o2);
    }, n2.render = function(e3, t3, n3) {
      var r2, i2, s2, o2, c2, u2, d2, p2, f2, h2, g2, m2, v2 = this._time, w2 = this._dirty ? this.totalDuration() : this._tDur, y2 = this._dur, b2 = e3 <= 0 ? 0 : we(e3), _2 = this._zTime < 0 != e3 < 0 && (this._initted
      if (this !== l && b2 > w2 && e3 >= 0 && (b2 = w2), b2 !== this._tTime || n3 || _2) {
        if (v2 !== this._time && y2 && (b2 += this._time - v2, e3 += this._time - v2), r2 = b2, f2 = this._start, u2 = !(p2 = this._ts), _2 && (y2 || (v2 = this._zTime), (e3 || !t3) && (this._zTime = e3)), this._repeat) 
          if (g2 = this._yoyo, c2 = y2 + this._rDelay, this._repeat < -1 && e3 < 0) return this.totalTime(100 * c2 + e3, t3, n3);
          if (r2 = we(b2 % c2), b2 === w2 ? (o2 = this._repeat, r2 = y2) : ((o2 = ~~(h2 = we(b2 / c2))) && o2 === h2 && (r2 = y2, o2--), r2 > y2 && (r2 = y2)), h2 = Fe(this._tTime, c2), !v2 && this._tTime && h2 !== o2 &&
            var x2 = g2 && 1 & h2, T2 = x2 === (g2 && 1 & o2);
            if (o2 < h2 && (x2 = !x2), v2 = x2 ? 0 : b2 % y2 ? y2 : b2, this._lock = 1, this.render(v2 || (m2 ? 0 : we(o2 * c2)), t3, !y2)._lock = 0, this._tTime = b2, !t3 && this.parent && gt(this, "onRepeat"), this.var
            if (y2 = this._dur, w2 = this._tDur, T2 && (this._lock = 2, v2 = x2 ? y2 : -1e-4, this.render(v2, true), this.vars.repeatRefresh && !m2 && this.invalidate()), this._lock = 0, !this._ts && !u2) return this;
            Dt(this, m2);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2 && (d2 = (function(e4, t4, n4) {
          var r3;
          if (n4 > t4) for (r3 = e4._first; r3 && r3._start <= n4; ) {
            if ("isPause" === r3.data && r3._start > t4) return r3;
            r3 = r3._next;
          }
          else for (r3 = e4._last; r3 && r3._start >= n4; ) {
            if ("isPause" === r3.data && r3._start < t4) return r3;
            r3 = r3._prev;
          }
```

## wheel-step — js/vanilla.min.js L1619-1622 (hit L1620)
```js
      }, pe2 = function() {
        var e4 = K2.deltaX = Li(oe2), n4 = K2.deltaY = Li(le2), r3 = Math.abs(e4) >= t3, i3 = Math.abs(n4) >= t3;
        S2 && (r3 || i3) && S2(K2, e4, n4, oe2, le2), r3 && (w2 && K2.deltaX > 0 && w2(K2), y2 && K2.deltaX < 0 && y2(K2), x2 && x2(K2), E2 && K2.deltaX < 0 != Z2 < 0 && E2(K2), Z2 = K2.deltaX, oe2[0] = oe2[1] = oe2[2] =
      }, fe2 = function(e4, t4, n4) {
```

## cursor-dom — js/vanilla.min.js L3142-3149 (hit L3146)
```js
  } }, Qo = { setGrabCursor: function(e2) {
    const t2 = this;
    if (!t2.params.simulateTouch || t2.params.watchOverflow && t2.isLocked || t2.params.cssMode) return;
    const n2 = "container" === t2.params.touchEventsTarget ? t2.el : t2.wrapperEl;
    t2.isElement && (t2.__preventObserver__ = true), n2.style.cursor = "move", n2.style.cursor = e2 ? "grabbing" : "grab", t2.isElement && requestAnimationFrame(() => {
      t2.__preventObserver__ = false;
    });
  }, unsetGrabCursor: function() {
```

## observer — js/vanilla.min.js L3928-3941 (hit L3939)
```js
      e3.length && e3.forEach(function(e4) {
        var t3 = e4.querySelector(".gsap-scrolling-text"), n3 = t3.querySelectorAll(".letter"), r2 = function() {
          return t3.scrollWidth - window.innerWidth - 0.3 * window.innerHeight;
        }, i2 = Kr.to(t3, { x: function() {
          return -r2();
        }, ease: "none", paused: true });
        no.create({ trigger: e4, start: "top center", end: function() {
          return "+=" + r2();
        }, scrub: true, animation: i2, invalidateOnRefresh: true }), no.create({ trigger: e4, start: "top top", end: function() {
          return "+=" + 0.6 * r2();
        }, pin: true, pinSpacing: true, invalidateOnRefresh: true }), n3.forEach(function(e5) {
          Kr.from(e5, { yPercent: 400 * (Math.random() - 0.5), rotation: 60 * (Math.random() - 0.5), ease: "elastic.out(1.2, 1)", scrollTrigger: { trigger: e5, containerAnimation: i2, start: "left 90%", end: "left 10%", 
        });
      });
```

## reveal-timeline — js/vanilla.min.js L3944-3951 (hit L3946)
```js
      if (e3 && t3.length) {
        var n3 = e3.querySelector(".flx-reveal-cards .text-main-comp");
        n3 && no.create({ trigger: e3, start: "top 15%", end: "bottom bottom", pin: n3, pinSpacing: false, scrub: true }), Kr.fromTo(".flx-reveal-cards .circles", { y: "5%" }, { y: "-5%", ease: "none", scrollTrigger: { t
        var r2 = -3 * (t3.length - 1) / 2, i2 = (e3.clientHeight - window.innerHeight) / t3.length;
        t3.forEach(function(t4, n4) {
          Kr.to(t4, { rotation: r2, ease: "power1.out", scrollTrigger: { trigger: e3, start: "top top-=" + i2 * n4, end: "+=" + i2, scrub: true } }), Kr.to(t4.querySelector(".reveal-card"), { rotation: r2, y: "-50%", eas
        });
      }
```

## observer — js/vanilla.min.js L3966-3976 (hit L3970)
```js
    }), e2.add("(min-width: 1025px)", function() {
      var e3 = document.querySelectorAll(".flx-overlapping-cards .overlapping-card");
      if (e3.length) return e3.forEach(function(e4) {
        var t3 = e4.querySelector(".content-wrapper"), n3 = e4.querySelector(".overlapping-card__inner");
        Kr.to(n3, { rotationZ: 10 * (Math.random() - 0.5), scale: 0.7, rotationX: 40, ease: "power1.in", scrollTrigger: { pin: t3, trigger: e4, start: "top 0%", end: "+=" + window.innerHeight, scrub: true } }), Kr.to(n3,
      }), function() {
        no.getAll().forEach(function(e4) {
          return e4.kill();
        });
      };
    }), document.querySelectorAll(".flx-scroll-text .word").forEach(function(e3) {
```

## pointer — js/vanilla.min.js L4046-4075 (hit L4060)
```js
    if (e2) {
      var t2 = e2.querySelector(".cursor-default"), n2 = e2.querySelector(".cursor-active"), r2 = document.querySelectorAll(".flx-hero-main__image, .tap-btn"), i2 = false, s2 = false, a2 = { x: window.innerWidth / 2, y: 
        for (var t3 = 1; t3 < arguments.length; t3++) {
          var n3 = null != arguments[t3] ? arguments[t3] : {};
          t3 % 2 ? Vl(Object(n3), true).forEach(function(t4) {
            Hl(e3, t4, n3[t4]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n3)) : Vl(Object(n3)).forEach(function(t4) {
            Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n3, t4));
          });
        }
        return e3;
      })({}, a2);
      Kr.set(e2, { opacity: 0, visibility: "hidden", scale: 1, x: a2.x, y: a2.y }), Kr.set(n2, { opacity: 0 }), Kr.set(t2, { opacity: 1 }), Kr.ticker.add(function() {
        a2.x += o2.x - a2.x, a2.y += o2.y - a2.y, Kr.set(e2, a2);
      }), window.addEventListener("mousemove", function(e3) {
        o2.x = e3.clientX, o2.y = e3.clientY;
      }), r2.forEach(function(r3) {
        r3.addEventListener("mouseenter", function() {
          i2 = true, s2 = true, Kr.set(e2, { visibility: "visible" }), Kr.to(e2, { opacity: 1, scale: 1, duration: 0 });
        }), r3.addEventListener("mouseleave", function() {
          s2 = false, Kr.to(e2, { opacity: 0, scale: 1, duration: 0, onComplete: function() {
            Kr.set(e2, { visibility: "hidden" });
          } }), Kr.set(n2, { opacity: 0, scale: 1 }), Kr.set(t2, { opacity: 1, scale: 1 });
        });
      }), document.addEventListener("mousedown", function(e3) {
        s2 && (Kr.to(t2, { opacity: 0, scale: 1, duration: 0 }), Kr.to(n2, { opacity: 1, scale: 1, duration: 0 }));
      }), document.addEventListener("mouseup", function() {
        i2 && (Kr.to(n2, { opacity: 0, scale: 1, duration: 0 }), Kr.to(t2, { opacity: 1, scale: 1, duration: 0 }));
      }), window.matchMedia("(hover: none)").matches && e2.remove();
    }
```