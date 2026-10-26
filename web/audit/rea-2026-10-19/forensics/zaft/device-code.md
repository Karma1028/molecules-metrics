# zaft — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: observer×3, loader×2, page-transition×2, keyboard×3, pointer×1

## observer — js/global.js L43-54 (hit L43)
```js
  observeVideos = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target;
      if (entry.isIntersecting) {
        target.play().then(() => checkLazy(target)).catch(() => checkLazy(target, observeVideos));
      } else {
        if (!target.paused && !target.classList.contains("lazy")) {
          target.pause();
        }
      }
    });
  });
```

## loader — libs/lazysizes.min.js L338-355 (hit L352)
```js
        ee(function() {
          var e5 = t4.complete && t4.naturalWidth > 1;
          if (!f2 || e5) {
            if (e5) {
              K(t4, H.fastLoadedClass);
            }
            S(u2);
            t4._lazyCache = true;
            I(function() {
              if ("_lazyCache" in t4) {
                delete t4._lazyCache;
              }
            }, 9);
          }
          if (t4.loading == "lazy") {
            M--;
          }
        }, true);
```

## loader — libs/lazysizes.min.js L484-503 (hit L499)
```js
      };
      var t3 = ie(e3);
      return { _: function() {
        a2 = D.getElementsByClassName(H.autosizesClass);
        q("resize", t3);
      }, checkElems: t3, updateElem: i2 };
    })(), t2 = function() {
      if (!t2.i && D.getElementsByClassName) {
        t2.i = true;
        re._();
        e2._();
      }
    };
    return I(function() {
      H.init && t2();
    }), k = { cfg: H, autoSizer: re, loader: e2, init: t2, uP: Y, aC: K, rC: Q, hC: J, fire: X, gW: s, rAF: ee };
  })(e, e.document, Date);
  e.lazySizes = t, "object" == typeof module && module.exports && (module.exports = t);
})("undefined" != typeof window ? window : {});

```

## page-transition — ajax/global.js L26-30 (hit L28)
```js
function updateMeta(url) {
  document.title = metaPage.title;
  window.history.pushState({}, "", url);
  body.attr("data-template", metaPage.template);
}
```

## keyboard — theme/page.js L2-16 (hit L2)
```js
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      if (!body.hasClass("transition")) {
        if ($("#page-close").length) {
          if (!$("#menu-site:visible").length) {
            if (!$(".drawer:visible").length) {
              if (!$(".module-tester.active").length) {
                $("#page-close")[0].click();
              }
            }
          }
        }
      }
    }
  });
```

## observer — modules/variable.js L54-63 (hit L55)
```js
const observerVariableTesters = () => {
  observeVariableTesters = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting ? startAxisAnimation($(entry.target)) : pauseAxisAnimation($(entry.target));
    });
  });
  document.querySelectorAll(".module-variable").forEach((module) => {
    observeVariableTesters.observe(module);
  });
};
```

## keyboard — theme/menu.js L18-24 (hit L19)
```js
if (!isMobile) {
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      !$(".drawer:visible").length && hideMenu();
    }
  });
}
```

## observer — components/carousel-track.js L17-27 (hit L17)
```js
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const slide = entry.target;
        if (entry.isIntersecting) {
          this.active = slide;
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });
    }, {
```

## pointer — components/carousel-track.js L62-73 (hit L71)
```js
  onPointerDown = (event) => {
    if (event.button !== 0 || this.scrollWidth <= window.innerWidth) return;
    event.preventDefault();
    this.pointerId = event.pointerId;
    this.startScroll = this.scrollLeft;
    this.startX = event.clientX;
    this.target = event.currentTarget;
    window.addEventListener("blur", this.onPointerCancel);
    window.addEventListener("pointercancel", this.onPointerCancel);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
  };
```

## keyboard — modules/slider.js L74-88 (hit L81)
```js
if (!isMobile) {
  $(document).on("mouseenter", ".module-slider", function() {
    $(".module-slider").removeClass("active");
    $(this).addClass("active");
  }).on("mouseleave", ".module-slider", function() {
    $(".module-slider").removeClass("active");
  });
  document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft") {
      prevSlide($(".module-slider.active"));
    } else if (e.key == "ArrowRight") {
      nextSlide($(".module-slider.active"));
    }
  });
}
```

## page-transition — modals/drawer.js L13-30 (hit L28)
```js
  if (drawer.length) {
    checkContent(body);
    $(`[data-drawer="#${drawer.attr("id")}"]`).removeClass("active");
    drawer.animate({ scrollTop: 0 }, timing * 3, $.bez([0.7, 0, 0.3, 1])).attr("data-state", "close");
    await new Promise((resolve) => {
      setTimeout(() => {
        drawer.hide().find(".drawer-backdrop").removeClass("active");
        body.removeClass("transition");
        drawer.is("#drawer-purchases") && updateAddToCart(false, false, "Add to basket");
        resolve();
      }, timing * 3);
    });
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.has("basket")) {
      currentUrl.searchParams.delete("basket");
      window.history.pushState({}, "", currentUrl);
    }
  }
```