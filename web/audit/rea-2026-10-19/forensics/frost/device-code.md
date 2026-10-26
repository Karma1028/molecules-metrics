# frost — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, pointer×3, cursor-dom×1, observer×2, page-transition×3, keyboard×1, raf-lerp×3

## loader — _nuxt/Image.48909f74.js L1-25 (hit L4)
```js
import { _ as u } from "./client-only.7934d1e2.js";
import { _ as g } from "./nuxt-link.a0308006.js";
import { r as h, a as y, h as k, o as a, b as n, i as c, c as m, w as d, e as f, t as v, l as r, m as b } from "./entry.216c2138.js";
const p = { class: "image_image_container" }, L = ["src"], S = { key: 1, class: "image_image", playsinline: "", loop: "", muted: "", preload: "" }, w = ["src"], q = c("div", { class: "image_object" }, null, -1), x = { ke
  return { fullActive: this.blok.full, playState: true };
}, mounted() {
  this.aspectRatio(), (this.blok.image.filename || this.blok.video.filename) && this.lazyLoad(), document.addEventListener("scroll", this.lazyLoad);
  const e = this.$el.querySelector(".image_image_container > video");
  e && (e.load(), e.addEventListener("loadeddata", this.lazyLoad));
}, beforeUnmount() {
  document.removeEventListener("scroll", this.lazyLoad);
}, methods: { aspectRatio() {
  const e = this.$el.querySelector(".image_image_container"), t = this.blok.width, i = this.blok.height / t * 100 + "%";
  e.style.paddingTop = i;
}, lazyLoad() {
  const e = this.$el.querySelector(".image_image_container"), t = e.getBoundingClientRect().top - window.innerHeight + 100, l = e.getBoundingClientRect().bottom, i = e.querySelector(".image_image"), o = this.$el.querySel
  o ? (t < 0 && o.readyState >= 3 && (o.play(), i.style.opacity = "1"), l < 0 && o.pause()) : s ? (t < 0 && (i.style.opacity = "1", this.playState = false), l < 0 && (this.playState = true)) : t < 0 && i.complete && (i.s
} } }, V = Object.assign(z, { __name: "Image", props: { blok: Object }, setup(e) {
  return (t, l) => {
    const i = h("Vue3Lottie"), o = u, s = g, _ = y("editable");
    return k((a(), n("div", { class: b(["image", { image_full: t.fullActive }]) }, [c("div", p, [e.blok.image.filename ? (a(), n("img", { key: 0, preload: "", provider: "storyblok", src: e.blok.image.filename, class: "im
  };
} });
export { V as default };

```

## loader — _nuxt/GridTypefacePreview.20ae1d6f.js L6-9 (hit L8)
```js
  return (n, d) => {
    const c = i("editable");
    return r((t(), a("div", { class: "typeface_grid_typeface_preview", "data-src": e.blok.preview.filename }, [e.blok.preview.filename ? (t(), a("img", { key: 0, preload: "", src: e.blok.preview.filename, class: "typefac
  };
```

## pointer — _nuxt/Typeface.87c0fccf.js L4-44 (hit L19)
```js
import { _ as q } from "./Delete.addd6b0c.js";
import { e as $ } from "./index.a704afdc.js";
const R = { class: "typeface_page_title_nav full" }, j = e("div", { class: "typeface_page_background" }, null, -1), G = { class: "grid typeface_page_header" }, H = { class: "typeface_page_header_title" }, K = { class: "u
  return { route: "", opacity: "", activeImage: "", slide: 0, play: null, dragging: null, x: 0, left: 0, caseFeature: this.blok.case, tabFeature: this.blok.tab, oldFeature: this.blok.old, ligaFeature: this.blok.liga, ss0
}, computed: { cssVariables() {
  return { "--background": this.blok.color.color, "--opacity": this.opacity, "--col": this.blok.family_col, "--asc": this.blok.ascender, "--cap": this.blok.cap_height, "--x": this.blok.x_height, "--base": this.blok.basel
} }, mounted() {
  const o = B();
  this.route = o.currentRoute, this.color(), window.addEventListener("scroll", this.color), this.play = setInterval(this.next, 5e3), this.width(), window.addEventListener("resize", this.width), this.pairActive(), setTime
    this.status(), this.hierarchySize();
  }, 1e3), Snipcart.events.on("item.removed", (s) => {
    this.status();
  }), Snipcart.events.on("item.added", (s) => {
    this.status();
  }), this.tierCount(), window.addEventListener("scroll", this.titleNav), window.addEventListener("mousemove", this.tierCount), window.addEventListener("scroll", this.tierCount), window.addEventListener("click", this.tie
    s.addEventListener("input", this.darkMode), window.addEventListener("mousemove", this.darkMode);
  });
}, beforeUnmount() {
  window.removeEventListener("scroll", this.color), window.removeEventListener("resize", this.width), clearInterval(this.play), window.removeEventListener("scroll", this.titleNav), window.removeEventListener("mousemove",
    s.removeEventListener("input", this.darkMode), window.addEventListener("mousemove", this.darkMode);
  });
  const t = document.querySelector("body");
  t.classList.remove("typeface_page_nav_background_active_dark"), t.classList.remove("tester_page_dark"), document.querySelector(".desk_nav_title").style.transform = "translateY(0)", document.querySelector(".typeface_pag
}, methods: { titleNav() {
  var o = window.pageYOffset;
  const t = document.querySelector(".desk_nav_title"), s = document.querySelector(".typeface_page_title_nav");
  window.innerWidth > 1e3 && (o > this.oldScroll ? (this.oldScroll = o, t.style.transform = "translateY(-100px)", s.style.transform = "translateY(0)") : o < this.oldScroll && (this.oldScroll = o, t.style.transform = "tra
}, backgroundChange() {
  this.backgroundActive = true;
}, darkMode() {
  const o = document.querySelector("body");
  document.querySelectorAll(".typeface_page_background_edit").forEach((s) => {
    const c = window.getComputedStyle(s, null).getPropertyValue("background-color"), r = c.substring(c.indexOf("(") + 1, c.lastIndexOf(")")).split(/,\s*/), a = r[0], l = r[1], b = r[2];
    r[3], +a + +l + +b < 210 ? (o.classList.add("typeface_page_nav_background_active_dark"), o.classList.add("tester_page_dark")) : (o.classList.remove("typeface_page_nav_background_active_dark"), o.classList.remove("tes
  });
}, backgroundRemove() {
  this.backgroundActive = false;
  const o = document.querySelector("body");
  o.classList.remove("typeface_page_nav_background_active_dark"), o.classList.remove("tester_page_dark"), this.backgroundEdit = "rgba(255, 255, 255, 1)";
}, preview() {
  document.querySelectorAll(".cut_editable").forEach((t) => {
```

## cursor-dom — _nuxt/Typeface.87c0fccf.js L72-112 (hit L87)
```js
  r == -1 ? (o.src = t[c].src, this.slide = c, s.forEach((a) => a.classList.remove("typeface_page_header_carousel_prog")), s[c].classList.add("typeface_page_header_carousel_prog")) : (o.src = t[r].src, this.slide = r, s.
}, next() {
  const o = document.querySelector(".typeface_page_header_carousel_display_image:first-child img"), t = document.querySelectorAll(".typeface_page_header_carousel_image > .image_image_container > img"), s = document.query
  r == c ? (o.src = t[0].src, this.slide = 0, s.forEach((a) => a.classList.remove("typeface_page_header_carousel_prog")), s[0].classList.add("typeface_page_header_carousel_prog")) : (o.src = t[r].src, this.slide = r, s.f
}, prevCursor(o) {
  const t = this.$el.querySelector(".typeface_page_header_carousel_cursor_prev");
  t.style.opacity = 1;
  const s = this.$el.querySelector(".typeface_page_header_carousel_prev").getBoundingClientRect(), c = s.top, r = s.left, a = o.offsetY + c, l = o.offsetX + r;
  t.style.top = a + "px", t.style.left = l + "px";
}, nextCursor(o) {
  const t = this.$el.querySelector(".typeface_page_header_carousel_cursor_next");
  t.style.opacity = 1;
  const s = this.$el.querySelector(".typeface_page_header_carousel_next").getBoundingClientRect(), c = s.top, r = s.left, a = o.offsetY + c, l = o.offsetX + r;
  t.style.top = a + "px", t.style.left = l + "px";
}, hideCursor() {
  this.$el.querySelector(".typeface_page_header_carousel_cursor_prev").style.opacity = 0, this.$el.querySelector(".typeface_page_header_carousel_cursor_next").style.opacity = 0;
}, width() {
  const o = window.innerWidth, t = (o - 2300) / 2, s = "calc(100% + 40px)", c = "calc(100% + 50px)", r = "calc(100% + " + t + "px)", a = this.$el.querySelector(".typeface_page_samples_cuts"), l = this.$el.querySelector("
  o > 2400 ? (a.style.width = r, l.style.padding = "0 " + t + "px") : o < 1300 && o > 800 ? a.style.width = s : o < 800 ? a.style.width = "calc(100% + 25px)" : a.style.width = c;
}, hierarchySize() {
  this.titleName = this.blok.hierarchy_title_typeface.slice(3), this.subtitleName = this.blok.hierarchy_subtitle_typeface.slice(3), this.sentenceName = this.blok.hierarchy_sentence_typeface.slice(3), this.bodyName = this
  const o = document.querySelector(".typeface_page_details_hierarchy_title"), s = window.getComputedStyle(o, null).getPropertyValue("font-size").slice(0, -2);
  this.titleSize = Math.round(s) + "px", this.titleTrack = this.blok.hierarchy_title_tracking * 1e-3;
  const r = window.getComputedStyle(o, null).getPropertyValue("line-height").slice(0, -2);
  this.titleLead = Math.round(r) + "px";
  const a = document.querySelector(".typeface_page_details_hierarchy_subtitle"), b = window.getComputedStyle(a, null).getPropertyValue("font-size").slice(0, -2);
  this.subtitleSize = Math.round(b) + "px", this.subtitleTrack = this.blok.hierarchy_subtitle_tracking * 1e-3;
  const i = window.getComputedStyle(a, null).getPropertyValue("line-height").slice(0, -2);
  this.subtitleLead = Math.round(i) + "px";
  const A = document.querySelector(".typeface_page_details_hierarchy_sentence"), P = window.getComputedStyle(A, null).getPropertyValue("font-size").slice(0, -2);
  this.sentenceSize = Math.round(P) + "px", this.sentenceTrack = this.blok.hierarchy_sentence_tracking * 1e-3;
  const z = window.getComputedStyle(A, null).getPropertyValue("line-height").slice(0, -2);
  this.sentenceLead = Math.round(z) + "px";
  const F = document.querySelector(".typeface_page_details_hierarchy_body"), D = window.getComputedStyle(F, null).getPropertyValue("font-size").slice(0, -2);
  this.bodySize = Math.round(D) + "px", this.bodyTrack = this.blok.hierarchy_body_tracking * 1e-3;
  const W = window.getComputedStyle(F, null).getPropertyValue("line-height").slice(0, -2);
  this.bodyLead = Math.round(W) + "px";
}, drag(o) {
  const t = this.$el.querySelector(".typeface_page_gallery_carousel_container");
  this.left = t.scrollLeft, this.x = o.clientX, this.dragging = function(s) {
    const c = document.querySelector(".typeface_page_gallery_carousel_container"), r = s.clientX, a = this.x - r, l = this.left + a;
```

## pointer — _nuxt/default.5aa33629.js L1-36 (hit L11)
```js
import { x as v, o as u, b as f, k as y, m, i as t, e as s, w as c, f as o, a0 as k } from "./entry.216c2138.js";
import { _ as g } from "./nuxt-link.a0308006.js";
const w = {}, T = { style: { position: "fixed", top: "0", left: "0", width: "100%", "pointer-events": "none", "z-index": "9999999" } }, $ = y('<div class="grid" style="height:100vh;background:rgba(255, 0, 255, 0.5);opaci
function L(e, n) {
  return u(), f("div", T, x);
}
const N = v(w, [["render", L]]);
const S = { data() {
  return { time: null, idle: false };
}, mounted() {
  this.time = setInterval(this.saver, 17e3), window.addEventListener("mousemove", this.clearTime), window.addEventListener("keydown", this.clearTime), window.addEventListener("scroll", this.clearTime), window.addEventLis
}, methods: { runClock() {
  var e = /* @__PURE__ */ new Date(), n = e.getHours() % 12, d = e.getMinutes(), _ = e.getSeconds(), l = e.getMilliseconds();
  this.$el.querySelector(".clock");
  var a = this.$el.querySelector(".hour"), h = this.$el.querySelector(".minute"), p = this.$el.querySelector(".second"), i = 30 * n + 0.5 * d, r = 6 * d + 0.1 * _, b = 6 * _ + 6e-3 * l;
  a.style.transform = "rotate(" + i + "deg)", h.style.transform = "rotate(" + r + "deg)", p.style.transform = "rotate(" + b + "deg)", requestAnimationFrame(this.runClock);
}, clearTime() {
  window.innerWidth > 800 && (this.idle = false, document.body.classList.remove("freeze_scroll_intro"), clearInterval(this.time), this.time = setInterval(this.saver, 17e3));
}, saver() {
  window.innerWidth > 800 && (this.idle = true, document.body.classList.add("freeze_scroll_intro"));
} } }, C = t("div", { class: "clock" }, [t("div", { class: "hand hour" }, [t("h1", null, "HOUR")]), t("div", { class: "hand minute" }, [t("h1", null, "MINUTE")]), t("div", { class: "hand second" }, [t("h1", null, "SECOND
function E(e, n, d, _, l, a) {
  return u(), f("div", { class: m(["idle", { idle_active: l.idle }]) }, H, 2);
}
const M = v(S, [["render", E]]);
const R = { data() {
  return {};
}, mounted() {
  this.$el.style.pointerEvents = "auto";
  const e = this.$el.querySelector(".site_intro_text");
  document.body.style.overflow = "hidden", setTimeout(() => {
    e.innerHTML = "F";
  }, 500), setTimeout(() => {
    e.innerHTML = "FR";
  }, 550), setTimeout(() => {
    e.innerHTML = "FRO";
```

## pointer — _nuxt/default.5aa33629.js L60-64 (hit L60)
```js
  window.addEventListener("resize", this.closeNav), window.addEventListener("scroll", this.pageScroll), window.addEventListener("click", this.cartButton), window.addEventListener("mousemove", this.cartButton), document.a
    Snipcart.events.on("theme.routechanged", (e) => {
      e.from === "/" && e.to !== "/" && (this.activeCart = true, document.querySelector(".snipcart").classList.add("snip_open")), e.from !== "/" && e.to === "/" && (this.activeCart = false, document.querySelector(".snipc
    });
  }), setTimeout(() => {
```

## loader — _nuxt/nuxt-link.a0308006.js L2-42 (hit L17)
```js
const p = globalThis.requestIdleCallback || ((t) => {
  const a = Date.now(), s = { didTimeout: false, timeRemaining: () => Math.max(0, 50 - (Date.now() - a)) };
  return setTimeout(() => {
    t(s);
  }, 1);
}), I = globalThis.cancelIdleCallback || ((t) => {
  clearTimeout(t);
}), D = (t) => {
  const a = y();
  a.isHydrating ? a.hooks.hookOnce("app:suspense:resolve", () => {
    p(t);
  }) : p(t);
};
async function S(t, a = P()) {
  const { path: s, matched: e } = a.resolve(t);
  if (!e.length || (a._routePreloaded || (a._routePreloaded = /* @__PURE__ */ new Set()), a._routePreloaded.has(s))) return;
  const r = a._preloadPromises = a._preloadPromises || [];
  if (r.length > 4) return Promise.all(r).then(() => S(t, a));
  a._routePreloaded.add(s);
  const i = e.map((n) => {
    var o;
    return (o = n.components) == null ? void 0 : o.default;
  }).filter((n) => typeof n == "function");
  for (const n of i) {
    const o = Promise.resolve(n()).catch(() => {
    }).finally(() => r.splice(r.indexOf(o)));
    r.push(o);
  }
  await Promise.all(r);
}
const O = (...t) => t.find((a) => a !== void 0), U = "noopener noreferrer";
function V(t) {
  const a = t.componentName || "NuxtLink", s = (e, r) => {
    if (!e || t.trailingSlash !== "append" && t.trailingSlash !== "remove") return e;
    const i = t.trailingSlash === "append" ? B : E;
    if (typeof e == "string") return i(e, true);
    const n = "path" in e ? e.path : r(e).path;
    return { ...e, name: void 0, path: i(n, true) };
  };
  return q({ name: a, props: { to: { type: [String, Object], default: void 0, required: false }, href: { type: [String, Object], default: void 0, required: false }, target: { type: String, default: void 0, required: fals
    const i = P(), n = x(() => {
```

## observer — _nuxt/nuxt-link.a0308006.js L88-101 (hit L92)
```js
function j() {
  const t = y();
  if (t._observer) return t._observer;
  let a = null;
  const s = /* @__PURE__ */ new Map(), e = (i, n) => (a || (a = new IntersectionObserver((o) => {
    for (const v of o) {
      const f = s.get(v.target);
      (v.isIntersecting || v.intersectionRatio > 0) && f && f();
    }
  })), s.set(i, n), a.observe(i), () => {
    s.delete(i), a.unobserve(i), s.size === 0 && (a.disconnect(), a = null);
  });
  return t._observer = { observe: e };
}
```

## page-transition — _nuxt/entry.216c2138.js L3769-3805 (hit L3802)
```js
function useHistoryListeners(e, t, r, n) {
  let i = [], s = [], a = null;
  const l = ({ state: d }) => {
    const k = createCurrentLocation$1(e, location), E = r.value, A = t.value;
    let O = 0;
    if (d) {
      if (r.value = k, t.value = d, a && a === E) {
        a = null;
        return;
      }
      O = A ? d.position - A.position : 0;
    } else n(k);
    i.forEach((v) => {
      v(r.value, E, { delta: O, type: NavigationType.pop, direction: O ? O > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown });
    });
  };
  function o() {
    a = r.value;
  }
  function c(d) {
    i.push(d);
    const k = () => {
      const E = i.indexOf(d);
      E > -1 && i.splice(E, 1);
    };
    return s.push(k), k;
  }
  function u() {
    const { history: d } = window;
    d.state && d.replaceState(assign({}, d.state, { scroll: computeScrollPosition() }), "");
  }
  function T() {
    for (const d of s) d();
    s = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", u);
  }
  return window.addEventListener("popstate", l), window.addEventListener("beforeunload", u, { passive: true }), { pauseListeners: o, listen: c, destroy: T };
}
```

## page-transition — _nuxt/entry.216c2138.js L4604-4611 (hit L4607)
```js
  const a = createError({ statusCode: 404, statusMessage: `Page Not Found: ${e.fullPath}` }), l = i.beforeResolve((c) => {
    if (l(), c === e) {
      const u = i.afterEach(async () => {
        u(), await callWithNuxt(n, showError, [a]), window.history.pushState({}, "", e.fullPath);
      });
      return false;
    }
  });
```

## keyboard — _nuxt/entry.216c2138.js L5324-5355 (hit L5335)
```js
}, LoadSnipcart = () => function() {
  var e;
  (e = window.SnipcartSettings).version != null || (e.version = "3.0");
  var t;
  (t = window.SnipcartSettings).timeoutDuration != null || (t.timeoutDuration = 2750);
  var r;
  (r = window.SnipcartSettings).domain != null || (r.domain = "cdn.snipcart.com");
  var n;
  (n = window.SnipcartSettings).protocol != null || (n.protocol = "https");
  var i;
  (i = window.SnipcartSettings).loadCSS != null || (i.loadCSS = true);
  const s = window.SnipcartSettings.version.includes("v3.0.0-ci") || window.SnipcartSettings.version != "3.0" && window.SnipcartSettings.version.localeCompare("3.4.0", void 0, { numeric: true, sensitivity: "base" }) === 
  window.LoadSnipcart = c, document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", l) : l();
  function l() {
    window.SnipcartSettings.loadStrategy ? window.SnipcartSettings.loadStrategy === "on-user-interaction" && (a.forEach(function(T) {
      return document.addEventListener(T, c);
    }), setTimeout(c, window.SnipcartSettings.timeoutDuration)) : c();
  }
  var o = false;
  function c() {
    if (!o) {
      o = true;
      var T = document.getElementsByTagName("head")[0], d = document.querySelector("#snipcart"), k = document.querySelector('src[src^="'.concat(window.SnipcartSettings.protocol, "://").concat(window.SnipcartSettings.doma
      d || (d = document.createElement("div"), d.id = "snipcart", d.setAttribute("hidden", "true"), document.body.appendChild(d)), u(d), k || (k = document.createElement("script"), k.src = "".concat(window.SnipcartSettin
        return document.removeEventListener(A, c);
      });
    }
  }
  function u(T) {
    !s || (T.dataset.apiKey = window.SnipcartSettings.publicApiKey, window.SnipcartSettings.addProductBehavior && (T.dataset.configAddProductBehavior = window.SnipcartSettings.addProductBehavior), window.SnipcartSettings
  }
}, plugin_lzubr1MIjF = defineNuxtPlugin((e) => {
```

## raf-lerp — _nuxt/entry.216c2138.js L7015-7063 (hit L7058)
```js
    function interpolateValue(e, t) {
      var r = this.offsetTime, n;
      this.propType === "multidimensional" && (n = createTypedArray("float32", this.pv.length));
      for (var i = t.lastIndex, s = i, a = this.keyframes.length - 1, l = true, o, c, u; l; ) {
        if (o = this.keyframes[s], c = this.keyframes[s + 1], s === a - 1 && e >= c.t - r) {
          o.h && (o = c), i = 0;
          break;
        }
        if (c.t - r > e) {
          i = s;
          break;
        }
        s < a - 1 ? s += 1 : (i = 0, l = false);
      }
      u = this.keyframesMetadata[s] || {};
      var T, d, k, E, A, O, v = c.t - r, g = o.t - r, S;
      if (o.to) {
        u.bezierData || (u.bezierData = bez.buildBezierData(o.s, c.s || o.e, o.to, o.ti));
        var C = u.bezierData;
        if (e >= v || e < g) {
          var M = e >= v ? C.points.length - 1 : 0;
          for (d = C.points[M].point.length, T = 0; T < d; T += 1) n[T] = C.points[M].point[T];
        } else {
          u.__fnct ? O = u.__fnct : (O = BezierFactory.getBezierEasing(o.o.x, o.o.y, o.i.x, o.i.y, o.n).get, u.__fnct = O), k = O((e - g) / (v - g));
          var ee = C.segmentLength * k, ne, te = t.lastFrame < e && t._lastKeyframeIndex === s ? t._lastAddedLength : 0;
          for (A = t.lastFrame < e && t._lastKeyframeIndex === s ? t._lastPoint : 0, l = true, E = C.points.length; l; ) {
            if (te += C.points[A].partialLength, ee === 0 || k === 0 || A === C.points.length - 1) {
              for (d = C.points[A].point.length, T = 0; T < d; T += 1) n[T] = C.points[A].point[T];
              break;
            } else if (ee >= te && ee < te + C.points[A + 1].partialLength) {
              for (ne = (ee - te) / C.points[A + 1].partialLength, d = C.points[A].point.length, T = 0; T < d; T += 1) n[T] = C.points[A].point[T] + (C.points[A + 1].point[T] - C.points[A].point[T]) * ne;
              break;
            }
            A < E - 1 ? A += 1 : l = false;
          }
          t._lastPoint = A, t._lastAddedLength = te - C.points[A].partialLength, t._lastKeyframeIndex = s;
        }
      } else {
        var le, ue, pe, fe, ve;
        if (a = o.s.length, S = c.s || o.e, this.sh && o.h !== 1) if (e >= v) n[0] = S[0], n[1] = S[1], n[2] = S[2];
        else if (e <= g) n[0] = o.s[0], n[1] = o.s[1], n[2] = o.s[2];
        else {
          var de = createQuaternion(o.s), ye = createQuaternion(S), re = (e - g) / (v - g);
          quaternionToEuler(n, slerp(de, ye, re));
        }
        else for (s = 0; s < a; s += 1) o.h !== 1 && (e >= v ? k = 1 : e < g ? k = 0 : (o.o.x.constructor === Array ? (u.__fnct || (u.__fnct = []), u.__fnct[s] ? O = u.__fnct[s] : (le = o.o.x[s] === void 0 ? o.o.x[0] : o
      }
      return t.lastIndex = i, n;
    }
```

## raf-lerp — _nuxt/entry.216c2138.js L7064-7067 (hit L7064)
```js
    function slerp(e, t, r) {
      var n = [], i = e[0], s = e[1], a = e[2], l = e[3], o = t[0], c = t[1], u = t[2], T = t[3], d, k, E, A, O;
      return k = i * o + s * c + a * u + l * T, k < 0 && (k = -k, o = -o, c = -c, u = -u, T = -T), 1 - k > 1e-6 ? (d = Math.acos(k), E = Math.sin(d), A = Math.sin((1 - r) * d) / E, O = Math.sin(r * d) / E) : (A = 1 - r, 
    }
```

## raf-lerp — _nuxt/entry.216c2138.js L7861-7901 (hit L7876)
```js
      if (a !== 0) {
        var l, o;
        for (r = 0; r < n; r += 1) {
          if (l = this.shapes[r], o = l.localShapeCollection, !(!l.shape._mdf && !this._mdf && !e)) for (o.releaseShapes(), l.shape._mdf = true, t = l.shape.paths.shapes, s = l.shape.paths._length, i = 0; i < s; i += 1) 
          l.shape.paths = l.localShapeCollection;
        }
      }
      this.dynamicProperties.length || (this._mdf = false);
    };
    function floatEqual(e, t) {
      return Math.abs(e - t) * 1e5 <= Math.min(Math.abs(e), Math.abs(t));
    }
    function floatZero(e) {
      return Math.abs(e) <= 1e-5;
    }
    function lerp(e, t, r) {
      return e * (1 - r) + t * r;
    }
    function lerpPoint(e, t, r) {
      return [lerp(e[0], t[0], r), lerp(e[1], t[1], r)];
    }
    function quadRoots(e, t, r) {
      if (e === 0) return [];
      var n = t * t - 4 * e * r;
      if (n < 0) return [];
      var i = -t / (2 * e);
      if (n === 0) return [i];
      var s = Math.sqrt(n) / (2 * e);
      return [i - s, i + s];
    }
    function polynomialCoefficients(e, t, r, n) {
      return [-e + 3 * t - 3 * r + n, 3 * e - 6 * t + 3 * r, -3 * e + 3 * t, e];
    }
    function singlePoint(e) {
      return new PolynomialBezier(e, e, e, e, false);
    }
    function PolynomialBezier(e, t, r, n, i) {
      i && pointEqual(e, t) && (t = lerpPoint(e, n, 1 / 3)), i && pointEqual(r, n) && (r = lerpPoint(e, n, 2 / 3));
      var s = polynomialCoefficients(e[0], t[0], r[0], n[0]), a = polynomialCoefficients(e[1], t[1], r[1], n[1]);
      this.a = [s[0], a[0]], this.b = [s[1], a[1]], this.c = [s[2], a[2]], this.d = [s[3], a[3]], this.points = [e, t, r, n];
    }
```

## page-transition — default/snipcart.js L8567-8617 (hit L8584)
```js
          return Object(P.__extends)(e3, t4), e3.prototype.initialize = function() {
            var e4 = this, n3 = this.document.documentElement;
            n3 && !this.options.language && (this.options.language = n3.lang || "en");
            var r3, i3 = (r3 = window.location.search) ? r3.substr(1, r3.length - 1).split("&").reduce((function(t5, e5) {
              var n4, r4 = e5.split("="), i4 = r4[0], o4 = r4.length > 1 ? decodeURIComponent(r4[1]) : "";
              return Object(P.__assign)(Object(P.__assign)({}, t5), ((n4 = {})[i4] = o4, n4));
            }), {}) : {};
            if (this.options = Object(P.__assign)(Object(P.__assign)({}, this.options), (function(t5) {
              var e5 = t5[Jo.CartToken], n4 = t5[Jo.PaymentSessionId], r4 = {};
              return e5 && (r4.cartToken = e5, r4.shouldRefreshShipping = true), n4 && (r4.paymentSessionId = n4), r4;
            })(i3)), this.options.paymentSessionId) {
              delete i3[Jo.PaymentSessionId];
              var o3 = Object.keys(i3).map((function(t5) {
                return t5 + "=" + i3[t5];
              })).join("&");
              o3 && (o3 = "?" + o3);
              var a2 = "" + window.location.origin + window.location.pathname + o3 + window.location.hash;
              window.history.pushState({ snip_psid: this.options.paymentSessionId }, "", a2);
            }
            var s2, c2, l2 = Object(P.__assign)(Object(P.__assign)({}, t4.prototype.initialize.call(this)), { browser: (s2 = this.store.dispatch, c2 = this.store.getState, { insertPaymentAuthenticationWindow: function(t5
              return Vo(t5, s2, c2);
            }, insertPaymentForm: function(t5, e5) {
              return Bo(t5, e5, s2, c2);
            }, insertPaymentMethodUpdateForm: function(t5, e5, n4, r4) {
              var i4 = c2();
              return Wo(t5, Object(P.__assign)({ customerDetailsId: n4, billingAddress: i4.customer.billingAddress }, e5), r4, s2, c2);
            } }) }), u2 = ia();
            this.options.exportGlobal && (u2.Snipcart = l2), this.document.addEventListener("click", this.documentClickEventListener);
            var p2 = function(t5, n4) {
              return e4.document.cookie = t5 + "=" + n4 + "; max-age=2592000; path=/";
            }, d2 = function(t5) {
              return e4.document.cookie = t5 + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
            }, f2 = function(t5) {
              return p2("snipcart-customer", t5.sessionToken);
            };
            return this.events.on(Ne.CUSTOMER_REGISTERED, f2), this.events.on(Ne.CUSTOMER_SIGNEDIN, f2), this.events.on(Ne.CUSTOMER_SIGNEDOUT, (function() {
              d2("snipcart-customer");
            })), this.events.on(Ne.CART_CREATED, (function(t5) {
              return p2("snipcart-cart", t5.token);
            })), this.events.on(Ne.CART_CONFIRMED, (function() {
              d2("snipcart-cart");
            })), this.events.on(Ne.CART_RESET, (function() {
              d2("snipcart-cart");
            })), this.events.on(Ne.SNIPCART_INITIALIZED, (function(t5) {
              t5.session.featureFlags.some((function(t6) {
                return "ECommAnalytics" === t6.name && t6.isEnabled;
              })) && Zo.enable(l2, u2), e4.store.subscribe((function() {
                return e4.updatePlaceHolders(e4.store.getState());
              })), e4.updatePlaceHolders(e4.store.getState());
            })), l2;
          }, e3.prototype.updatePlaceHolders = function(t5) {
```

## observer — default/snipcart.js L19091-19099 (hit L19095)
```js
    }, e2.prototype.mounted = function() {
      var t3 = this;
      if (this.shouldResize()) {
        var e3 = document.querySelector(".snipcart-modal");
        this.intersectionObserver || (this.intersectionObserver = new IntersectionObserver((function(e4) {
          0 === e4[0].intersectionRatio && t3.setWidth();
        }))), this.intersectionObserver.observe(e3);
      }
    }, e2.prototype.destroyed = function() {
```