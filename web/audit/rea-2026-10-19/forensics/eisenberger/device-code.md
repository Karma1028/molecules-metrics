# eisenberger — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, page-transition×3, keyboard×3, raf-lerp×1, wheel-step×2, reveal-timeline×1

## loader — js/mainjs.js L594-613 (hit L606)
```js
            e.addClass(o, "delay--5"), (function(t4, r2) {
              var o2, a3, d3 = document.querySelectorAll(".pswp")[0], c2 = (function() {
                for (var t5, n2, i2, r3, o3, a4 = s2, l2 = a4.length, d4 = [], c3 = 0; c3 < l2; c3++) if (1 === (t5 = a4[c3]).nodeType) {
                  i2 = (n2 = t5.children[0]).getAttribute("data-size").split("x");
                  var u3 = e.find(".js-overlay-title", t5)[0].innerHTML, f2 = e.find(".js-overlay-sub-title", t5)[0].innerHTML;
                  o3 = u3, "" != u3 && "" != f2 && (o3 = u3 + '<span class="separator hide-on-mobile">/</span> '), o3 += '<span class="hide-on-mobile">' + f2 + "</span>", (r3 = { msrc: e.find(".js-slide-thumbnail", t5)[0
                }
                return d4;
              })();
              if ((a3 = { galleryUID: r2.getAttribute("data-pswp-uid"), getThumbBoundsFn: function(e2) {
                var t5 = c2[e2].el.getElementsByTagName("img")[0], n2 = window.pageYOffset || document.documentElement.scrollTop, i2 = t5.getBoundingClientRect();
                return { x: i2.left, y: i2.top + n2, w: i2.width };
              }, showHideOpacity: false, spacing: 0, preloaderEl: false, fullscreenEl: false, zoomEl: false, shareEl: false, history: false, preload: [1, 2], barsSize: { top: 90, bottom: 25 } }).index = parseInt(t4, 10),
              if ((o2 = new n(d3, i, c2, a3)).init(), o2.listen("close", m), o2.options.maxSpreadZoom = o2.getZoomLevel(), o2.options.getDoubleTapZoom = function(e2, t5) {
                return t5.initialZoomLevel;
              }, l = o2, window.history && window.history.pushState) {
                var u2 = window.history.state;
                u2 && u2.lightbox || window.history.pushState({ lightbox: true }, "", window.location.href);
              }
            })(d2, r[0]);
```

## page-transition — js/mainjs.js L623-635 (hit L630)
```js
      return { init: function() {
        r = document.querySelectorAll(t2.gallerySelector), s2 = document.querySelectorAll(t2.slideSelector), o = e.find(".js-site-head")[0];
        for (var n2 = 0, i2 = s2.length; n2 < i2; n2++) s2[n2].setAttribute("data-pswp-uid", n2 + 1), s2[n2].onclick = f;
        if (a = (function(e2) {
          for (var t3 = 0; t3 < e2.length; t3++) if (void 0 !== document.body.style[e2[t3]]) return e2[t3];
          return null;
        })(c), !d) {
          window.addEventListener("popstate", function(e2) {
            var t3 = document.querySelector(".pswp");
            t3 && t3.classList.contains("pswp--open") && (l ? l.close() : (t3.classList.remove("pswp--open"), m()));
          }), d = true;
        }
      } };
```

## keyboard — js/mainjs.js L638-675 (hit L665)
```js
    return function(i) {
      i = (function(e2) {
        var t2 = e2 || {}, n2 = { formSelector: "form", formFieldsSelector: ".js-input", submitButton: "#form-submit" };
        for (var i2 in n2) t2[i2] || (t2[i2] = n2[i2]);
        return t2;
      })(i);
      var r, s2, o = [];
      function a(t2) {
        t2.target.value.length >= parseInt(t2.target.getAttribute("data-min-length")) ? (e.addClass(t2.target.parentNode, "is-field-valid"), e.removeClass(t2.target.parentNode, "is-error")) : e.removeClass(t2.target.pare
      }
      function l(t2) {
        c(t2.target.value) ? (e.addClass(t2.target.parentNode, "is-field-valid"), e.removeClass(t2.target.parentNode, "is-error")) : e.removeClass(t2.target.parentNode, "is-field-valid");
      }
      function d(t2) {
        t2.target.value.length >= parseInt(t2.target.getAttribute("data-min-length")) ? (e.removeClass(s2, "is-flipped"), e.removeClass(t2.target.parentNode, "is-error")) : e.addClass(s2, "is-flipped");
      }
      function c(e2) {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e2);
      }
      function u() {
        !(function(t2) {
          for (var n2 = t2.length - 1; n2 >= 0; n2--) t2[n2].el.value = "", e.removeClass(t2[n2].el.parentNode, "is-field-valid");
        })(o), e.addClass(r, "is-submitted");
      }
      return (function() {
        r = e.find(i.formSelector)[0], s2 = e.find("#form-submit .flip-trigger")[0];
        for (var n2 = e.find(i.formFieldsSelector), c2 = n2.length - 1; c2 >= 0; c2--) o.push({ el: n2[c2], isEmail: e.hasClass(n2[c2], "js-is-email"), minLength: n2[c2].getAttribute("data-min-length") || 0 });
        t.addListener(".js-min-length", "keyup", a), t.addListener(".js-min-length", "paste", a), t.addListener(".js-is-email", "keyup", l), t.addListener(".js-is-email", "paste", l), t.addListener("#message", "keyup", d
      })(), { send: function() {
        (function(t2) {
          for (var n2 = true, i2 = t2.length - 1; i2 >= 0; i2--) e.hasClass(t2[i2].el, "js-min-length") && t2[i2].el.value.length < parseInt(t2[i2].el.getAttribute("data-min-length")) && (n2 = false, e.addClass(t2[i2].el
          var r2 = document.querySelector("input#privacy-policy"), s3 = document.querySelector("label#privacy-policy-label");
          return r2.checked ? s3.classList.remove("has-warning") : (n2 = false, s3.classList.add("has-warning")), n2;
        })(o) && (document.querySelector("input#privacy-policy").checked = false, n.post(r.getAttribute("action"), { ajaxcall: true, action: "getInContact", data: { name: e.find("#name")[0].value, email: e.find("#email")
          e2.response && (console.log(e2.response), u());
        }));
      } };
    };
```

## loader — js/mainjs.js L777-792 (hit L791)
```js
    return function(t2) {
      t2 = (function(e2) {
        var t3 = e2 || {}, n2 = { lazyClass: ".js-be-lazy" };
        for (var i2 in n2) t3[i2] || (t3[i2] = n2[i2]);
        return t3;
      })(t2);
      function i(t3) {
        var n2 = '.js-book-slide[data-book-id="' + t3.parentNode.getAttribute("data-book-id") + '"] [data-book-item-index="0"] .js-ll-book-imgs';
        !(function(t4) {
          if (null === t4) return;
          var n3 = t4.getAttribute("data-src"), i2 = t4.getAttribute("data-srcset");
          e.hasClass(t4, "is-loaded") || (i2 && t4.setAttribute("srcset", i2), n3 && t4.setAttribute("src", n3), e.addClass(t4, "is-loaded"));
        })(document.querySelector(n2));
      }
      return new n({ threshold: t2.isMobile ? 400 : 800, elements_selector: t2.lazyClass, throttle: t2.isMobile ? 40 : 200, data_src: "src", class_loaded: "has-loaded", show_while_loading: true, callback_set: t2.isBooks 
    };
```

## loader — vendor/photoswipe-ui.js L6-46 (hit L21)
```js
    define("basejs/vendor/photoswipe-ui", factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.PhotoSwipeUI_Default = factory();
  }
})(this, function() {
  "use strict";
  var PhotoSwipeUI_Default = function(pswp, framework) {
    var ui = this;
    var _overlayUIUpdated = false, _controlsVisible = true, _fullscrenAPI, _controls, _captionContainer, _fakeCaptionContainer, _indexIndicator, _shareButton, _shareModal, _shareModalHidden = true, _initalCloseOnScrollVa
      barsSize: { top: 44, bottom: "auto" },
      closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
      timeToIdle: 4e3,
      timeToIdleOutside: 1e3,
      loadingIndicatorDelay: 1e3,
      // 2s
      addCaptionHTMLFn: function(item, captionEl) {
        if (!item.title) {
          captionEl.children[0].innerHTML = "";
          return false;
        }
        captionEl.children[0].innerHTML = item.title;
        return true;
      },
      closeEl: true,
      captionEl: true,
      fullscreenEl: true,
      zoomEl: true,
      shareEl: true,
      counterEl: true,
      arrowEl: true,
      preloaderEl: true,
      tapToClose: false,
      tapToToggleControls: true,
      clickToCloseNonZoomable: true,
      shareButtons: [
        {
          id: "facebook",
          label: "Share on Facebook",
          url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
```

## page-transition — modules/books.js L53-63 (hit L61)
```js
      if (!popStateHandlerAdded) {
        var handlePopState = function(event) {
          var wrapperEl = document.querySelector(".js-site-body");
          var isBookOpen = wrapperEl && el.hasClass(wrapperEl, "is-book-open");
          if (isBookOpen && currentCloseFunction) {
            currentCloseFunction();
          }
        };
        window.addEventListener("popstate", handlePopState);
        popStateHandlerAdded = true;
      }
```

## page-transition — modules/books.js L101-110 (hit L101)
```js
      if (window.history && window.history.pushState) {
        var currentState = window.history.state;
        if (!currentState || !currentState.book) {
          window.history.pushState(
            { book: true, bookId: id },
            "",
            window.location.href
          );
        }
      }
```

## raf-lerp — vendor/morphsvgplugin.js L128-135 (hit L131)
```js
  }, C = function(a2, b2) {
    var c2, d2, e2, f2, g2, h2, i2, j2 = 0, k2 = parseFloat(a2[0]), l2 = parseFloat(a2[1]), m2 = k2 + "," + l2 + " ", n2 = 0.999999;
    for (e2 = a2.length, c2 = 0.5 * b2 / (0.5 * e2 - 1), d2 = 0; e2 - 2 > d2; d2 += 2) {
      if (j2 += c2, h2 = parseFloat(a2[d2 + 2]), i2 = parseFloat(a2[d2 + 3]), j2 > n2) for (g2 = 1 / (Math.floor(j2) + 1), f2 = 1; j2 > n2; ) m2 += (k2 + (h2 - k2) * g2 * f2).toFixed(2) + "," + (l2 + (i2 - l2) * g2 * f2)
      m2 += h2 + "," + i2 + " ", k2 = h2, l2 = i2;
    }
    return m2;
  }, D = function(a2) {
```

## keyboard — vendor/photoswipe.js L368-378 (hit L369)
```js
    }, _bindEvents = function() {
      framework.bind(document, "keydown", self);
      if (_features.transform) {
        framework.bind(self.scrollWrap, "click", self);
      }
      if (!_options.mouseUsed) {
        framework.bind(document, "mousemove", _onFirstMouseMove);
      }
      framework.bind(window, "resize scroll", self);
      _shout("bindEvents");
    }, _unbindEvents = function() {
```

## keyboard — vendor/photoswipe.js L378-390 (hit L381)
```js
    }, _unbindEvents = function() {
      framework.unbind(window, "resize", self);
      framework.unbind(window, "scroll", _globalEventHandlers.scroll);
      framework.unbind(document, "keydown", self);
      framework.unbind(document, "mousemove", _onFirstMouseMove);
      if (_features.transform) {
        framework.unbind(self.scrollWrap, "click", self);
      }
      if (_isDragging) {
        framework.unbind(window, _upMoveEvents, self);
      }
      _shout("unbindEvents");
    }, _calculatePanBounds = function(zoomLevel, update) {
```

## wheel-step — vendor/photoswipe.js L2321-2328 (hit L2324)
```js
            if (_options.modal) {
              if (!_options.closeOnScroll || _numAnimations || _isDragging) {
                e.preventDefault();
              } else if (_transformKey && Math.abs(e.deltaY) > 2) {
                _closedByScroll = true;
                self.close();
              }
            }
```

## wheel-step — vendor/photoswipe.js L2333-2341 (hit L2336)
```js
          if ("deltaX" in e) {
            if (e.deltaMode === 1) {
              _wheelDelta.x = e.deltaX * 18;
              _wheelDelta.y = e.deltaY * 18;
            } else {
              _wheelDelta.x = e.deltaX;
              _wheelDelta.y = e.deltaY;
            }
          } else if ("wheelDelta" in e) {
```

## reveal-timeline — vendor/CSSPlugin.js L2020-2032 (hit L2031)
```js
        if (difs.firstMPT) {
          difs = difs.difs;
          for (p2 in vars) {
            if (_reservedProps[p2]) {
              difs[p2] = vars[p2];
            }
          }
          from = {};
          for (p2 in difs) {
            from[p2] = b[i2][p2];
          }
          results.push(TweenLite.fromTo(targets[i2], duration, from, difs));
        }
```