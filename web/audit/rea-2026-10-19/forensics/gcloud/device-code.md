# gcloud — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, keyboard×3, raf-lerp×1, observer×2, page-transition×2, pointer×1

## loader — dti=1/m=_b,_tp L7289-7299 (hit L7289)
```js
    _.eh({ preload: function(a, b) {
      var c = [], d = Object.keys(b);
      for (let e of d) {
        let f = b[e];
        f instanceof _.np ? c.push(f.fl()) : f instanceof _.Xg && c.push(f);
      }
      b = _.mp(_.Th.getInstance(), c);
      c = {};
      for (let e of d) c[e] = b;
      return c;
    } }, true);
```

## loader — dti=1/m=_b,_tp L10652-10692 (hit L10667)
```js
    };
    _.ba.Rb = _.da(41);
    _.ba.first = function() {
      return this;
    };
    _.lpa = /* @__PURE__ */ new Set();
    var ffa, hfa, pfa, kfa, gfa, jfa, ifa, mfa;
    ffa = typeof navigator !== "undefined" && /Macintosh/.test(navigator.userAgent);
    hfa = typeof navigator !== "undefined" && !/Opera/.test(navigator.userAgent) && /WebKit/.test(navigator.userAgent);
    pfa = typeof navigator !== "undefined" && !/Opera|WebKit/.test(navigator.userAgent) && /Gecko/.test(navigator.product);
    kfa = { A: 1, INPUT: 1, TEXTAREA: 1, SELECT: 1, BUTTON: 1 };
    gfa = { Enter: 13, " ": 32 };
    _.ql = { A: 13, BUTTON: 0, CHECKBOX: 32, COMBOBOX: 13, FILE: 0, GRIDCELL: 13, LINK: 13, LISTBOX: 13, MENU: 0, MENUBAR: 0, MENUITEM: 0, MENUITEMCHECKBOX: 0, MENUITEMRADIO: 0, OPTION: 0, RADIO: 32, RADIOGROUP: 32, RESE
    jfa = { CHECKBOX: true, FILE: true, OPTION: true, RADIO: true };
    ifa = { COLOR: true, DATE: true, DATETIME: true, "DATETIME-LOCAL": true, EMAIL: true, MONTH: true, NUMBER: true, PASSWORD: true, RANGE: true, SEARCH: true, TEL: true, TEXT: true, TEXTAREA: true, TIME: true, URL: true
    mfa = { A: true, AREA: true, BUTTON: true, DIALOG: true, IMG: true, INPUT: true, LINK: true, MENU: true, OPTGROUP: true, OPTION: true, PROGRESS: true, SELECT: true, TEXTAREA: true };
    var Bk = function(a) {
      if (a = a.j.eia) return { name: a[0], element: a[1] };
    }, mpa = class {
      constructor(a) {
        this.j = a;
      }
      clone() {
        var a = this.j;
        return new mpa({ eventType: a.eventType, event: a.event, targetElement: a.targetElement, eic: a.eic, eia: a.eia, timeStamp: a.timeStamp, eirp: a.eirp, eiack: a.eiack, eir: a.eir });
      }
    };
    var npa = /* @__PURE__ */ Object.create(null), opa = /\s*;\s*/, ppa = class {
      constructor() {
        ({ WR: b = false, fL: a = true } = { WR: true });
        var a, b;
        this.j = false;
        this.fL = true;
        this.wa = this.ya = this.Ca = void 0;
        this.WR = b;
        this.fL = a;
      }
    };
    var qpa = function(a, b) {
      a.wa.push(b);
      a.j || (a.j = true, Promise.resolve().then(() => {
```

## loader — dti=1/m=_b,_tp L11745-11775 (hit L11758)
```js
      initialize() {
        Hqa(this);
        var a = _.gq(_.Ti("Im6cmf")), b = _.am(_.Ti("b5W2zf"), "");
        dea(`${a}/jserror`, b ? _.fa[b] : void 0);
        iea();
        if (a = _.Oj.j) for (var c of Vna) a.j.push(c);
        if (Wp) for (c = Wp.j, a = 0; a < Mi.length; a++) b = Mi[a], _.va(c, b) || c.push(b);
        c = this.j;
        a = window.BOQ_wizbind;
        b = window.document;
        yr = null;
        c = Rpa(a, b, c, Uea(void 0, ooa)).wa;
        c = (0, _.Wh)(c.dirty, c);
        window.wiz_progress = c;
        _.lj(_.Gi(_.br), _.ena);
        _.eh({ data: Qpa, afdata: Qpa }, true);
        _.eh({ afdata_o: Qpa }, true);
        _.eh({ jsdata: xfa }, true);
        _.eh({ dY: wfa }, true);
        c();
        $o(_.dp, [
          _.cp,
          _.gp
        ]);
        $o(_.cqa, [_.Zp]);
        $o(_.cp, [_.Zr, _.$r]);
        $o(_.mq, [_.Zp, _.Yr]);
        Iqa(this);
        var d, e;
        window.top == window && ((d = window.console) == null ? 0 : (e = d.log) == null ? 0 : e.bind) && (setTimeout(console.log.bind(console, "%c%s", "color: red; background: yellow; font-size: 24px;", "WARNING!")), set
      }
```

## keyboard — ed=1/rs=AA2YrTtetQoHbzZfkll_knCcs_JghvSSYQ L1022-1062 (hit L1037)
```js
        if (b(a)) return a;
        a = a.parentNode;
        c++;
      }
      return null;
    };
    _.Hg = function(a, b) {
      return b ? _.Gg(a, function(c) {
        return !b || typeof c.className === "string" && _.Ca(c.className.split(/\s+/), b);
      }) : null;
    };
    var Ig, Jg;
    Ig = function() {
    };
    _.wg = new Ig();
    Jg = ["click", "keydown", "keyup"];
    Ig.prototype.listen = function(a, b, c, d, e) {
      var f = function(g) {
        var h = _.qf(b), k = _.Ie(g.target) ? g.target.getAttribute("role") || null : null;
        g.type != "click" || g.ec.button != 0 || _.oc && g.ctrlKey ? g.keyCode != 13 && g.keyCode != 3 || g.type == "keyup" ? g.keyCode != 32 || k != "button" && k != "tab" && k != "radio" || (g.type == "keyup" && h.call
      };
      f.kb = b;
      f.Rj = d;
      e ? e.listen(a, Jg, f, c) : _.pf(a, Jg, f, c);
    };
    Ig.prototype.Ka = function(a, b, c, d, e) {
      var f;
      for (let l = 0; f = Jg[l]; l++) {
        a: {
          var g = a;
          var h = f;
          var k = !!c;
          if (_.gf(g)) {
            h = g.Xd(h, k);
            break a;
          }
          if (!g) {
            h = [];
            break a;
          }
          h = (g = _.sf(g)) ? g.Xd(h, k) : [];
```

## keyboard — ed=1/rs=AA2YrTtetQoHbzZfkll_knCcs_JghvSSYQ L1613-1653 (hit L1628)
```js
      return c;
    };
    $h = function(a) {
      a = a.tabIndex;
      return typeof a === "number" && a >= 0 && a < 32768;
    };
    Hh = function(a) {
      return a.tagName == "A" && a.hasAttribute("href") || a.tagName == "INPUT" || a.tagName == "TEXTAREA" || a.tagName == "SELECT" || a.tagName == "BUTTON" ? !a.disabled && (!a.hasAttribute("tabindex") || $h(a)) : a.has
    };
    _.ai = function(a, b, c, d) {
      d = _.ug(a, d);
      _.pf(b, c, d);
      _.zg(b, c);
    };
    bi = function(a) {
      a.v || (a.v = _.pf(a.j, "keydown", a.A, false, a));
    };
    ci = function(a) {
      a.v && (_.xf(a.v), a.v = null);
    };
    ei = function(a) {
      ci(a);
      _.W(a.j, "gb_ma", false);
    };
    fi = class {
      constructor(a) {
        this.j = a;
        this.v = null;
      }
      A(a) {
        a.keyCode != 9 || _.T(this.j, "gb_ma") || (_.W(this.j, "gb_ma", true), ci(this));
      }
    };
    _.Nh = class extends _.U {
      constructor(a, b) {
        super();
        this.B = a;
        b && (this.B.id = b);
      }
      H() {
        return this.B;
```

## keyboard — ed=1/rs=AA2YrTtetQoHbzZfkll_knCcs_JghvSSYQ L1709-1728 (hit L1711)
```js
    mi = function(a) {
      _.xg(a.v, a.H(), a.da);
      a.H().addEventListener("keydown", function(c) {
        c.keyCode == 32 && c.preventDefault();
      });
      a.v.listen(a.j, "keydown", a.fa);
      a.v.listen(a.j, "keyup", a.Da);
      var b = /* @__PURE__ */ new Map();
      b.set("close", "cbc");
      b.set("back", "bbc");
      b.forEach((c, d) => {
        _.xg(a.v, a.F.get(d), function() {
          this.dispatchEvent(c);
        });
      });
      if (_.T(a.j, "gb_kb") || _.T(a.j, "gb_9d")) a.v.listen(window, "resize", a.P), a.P();
      _.T(a.j, "gb_jd") || a.v.Ia(window, "touchstart", () => {
        _.V(a.j, "overflow-y", "auto");
      });
    };
```

## raf-lerp — ed=1/rs=AA2YrTtetQoHbzZfkll_knCcs_JghvSSYQ L4189-4251 (hit L4245)
```js
    _.zm = function(a, b, c, d, e, f, g, h, k) {
      var l;
      if (l = c.offsetParent) {
        var n = l.tagName == "HTML" || l.tagName == "BODY";
        if (!n || _.Zf(l, "position") != "static") {
          var p = _.sm(l);
          if (!n) {
            n = _.nm(l);
            var q;
            if (q = n) {
              var r = _.Dc && dm(wm, 10) >= 0;
              if (q = _.uc) q = dm(um, 10) >= 0;
              var w = _.Cc && dm(wm, 85) >= 0;
              q = _.mc || r || q || w;
            }
            n = q ? -l.scrollLeft : n && _.Zf(l, "overflowX") != "visible" ? l.scrollWidth - l.clientWidth - l.scrollLeft : l.scrollLeft;
            p = pm(p, new _.bm(n, l.scrollTop));
          }
        }
      }
      l = p || new _.bm();
      p = _.sm(a);
      n = _.bg(a);
      p = new hm(p.x, p.y, n.width, n.height);
      if (n = _.tm(a)) w = new hm(
        n.left,
        n.top,
        n.right - n.left,
        n.bottom - n.top
      ), n = Math.max(p.left, w.left), q = Math.min(p.left + p.width, w.left + w.width), n <= q && (r = Math.max(p.top, w.top), w = Math.min(p.top + p.height, w.top + w.height), r <= w && (p.left = n, p.top = r, p.width 
      n = _.se(a);
      q = _.se(c);
      if (n.j != q.j) {
        n = n.j.body;
        var D = n;
        q = q.j.defaultView;
        r = new _.bm(0, 0);
        w = _.xe(_.re(D));
        if (_.om(w, "parent")) {
          do {
            if (w == q) var G = _.sm(D);
            else G = _.$f(D), G = new _.bm(G.left, G.top);
            r.x += G.x;
            r.y += G.y;
          } while (w && w != q && w != w.parent && (D = w.frameElement) && (w = w.parent));
        }
        q = r;
        n = pm(q, _.sm(n));
        p.left += n.x;
        p.top += n.y;
      }
      a = xm(a, b);
      b = p.left;
      a & 4 ? b += p.width : a & 2 && (b += p.width / 2);
      b = new _.bm(b, p.top + (a & 1 ? p.height : 0));
      b = pm(b, l);
      e && (b.x += (a & 4 ? -1 : 1) * e.x, b.y += (a & 1 ? -1 : 1) * e.y);
      if (g) {
        if (k) var F = k;
        else if (F = _.tm(c)) F.top -= l.y, F.right -= l.x, F.bottom -= l.y, F.left -= l.x;
      }
      return _.ym(b, c, d, f, F, g, h);
    };
```

## observer — dti=1/m=ws9Tlc,O6y8ed,aW3pY,n73qwf,UUJqVe,IZT63,YYmHzb,e5qFLc,pw70Gc,KUM7Z,O1Gjz L9301-9308 (hit L9303)
```js
      if (b) {
        var c = b == null ? void 0 : b.querySelector(".dGHBmb");
        c && (a.j = new IntersectionObserver((d) => {
          d.forEach((e) => {
            _.Zk(b, "XTLgCe", e.isIntersecting);
          });
        }, { rootMargin: "0px", threshold: 0.5 }), a.j.observe(c));
      }
```

## observer — dti=1/m=ws9Tlc,O6y8ed,aW3pY,n73qwf,UUJqVe,IZT63,YYmHzb,e5qFLc,pw70Gc,KUM7Z,O1Gjz L11241-11255 (hit L11241)
```js
        if (a = (e = (d = this.Ha.node) != null ? d : (c = (b = this.Ha).el) == null ? void 0 : c.call(b)) != null ? e : this.Da().el()) b = { root: null, rootMargin: "0px", threshold: Array.from({ length: 21 }, (f, g) =
          for (let h of f) {
            if (!h.isIntersecting) continue;
            let k, l;
            f = (l = (k = h.rootBounds) == null ? void 0 : k.height) != null ? l : document.documentElement.clientHeight;
            var g = false;
            f && (g = h.intersectionRect.height, g = g / f >= 0.25 || f < 900 && g >= 50);
            if (h.intersectionRatio >= 0.25 || g) {
              this.Ha.nh(true);
              this.Ad();
              let m;
              (m = this.Ca) == null || m.unobserve(h.target);
            }
          }
        }, b), this.Ca.observe(a);
```

## page-transition — dti=1/m=ws9Tlc,O6y8ed,aW3pY,n73qwf,UUJqVe,IZT63,YYmHzb,e5qFLc,pw70Gc,KUM7Z,O1Gjz L22040-22052 (hit L22047)
```js
      constructor(a) {
        super();
        this.Ha = a.service.window.get();
        this.ya = a.service.b9;
        this.Va = 0;
        this.Wa = this.ya.j();
        this.Ia = null;
        this.ya.Fb() || (_.Hp(this.Ha, "popstate", this.Ka, false, this), _.Hp(this.Ha, "hashchange", this.Na, false, this));
        (a = this.ya.state()) && a.url != null || (a = { id: "", Zg: "", url: this.ya.j() });
        this.wa = new _.Eza(this, a, this.Ha, this);
        _.sl(this, this.wa);
        this.ab = a.id;
      }
```

## page-transition — dti=1/m=ws9Tlc,O6y8ed,aW3pY,n73qwf,UUJqVe,IZT63,YYmHzb,e5qFLc,pw70Gc,KUM7Z,O1Gjz L22125-22128 (hit L22127)
```js
      uf() {
        super.uf();
        this.ya.Fb() || (_.Kp(this.Ha, "popstate", this.Ka, false, this), _.Kp(this.Ha, "hashchange", this.Na, false, this));
      }
```

## pointer — rs=AHpOoo84YKT1RVy0T6hcXi5rH3LooB1WCw/cb=gapi.loaded_0?le=scs L5974-5977 (hit L5976)
```js
  _.qf.mda = function(a2) {
    var b2 = window;
    typeof b2.addEventListener != "undefined" ? b2.addEventListener("mousemove", a2, false) : typeof b2.attachEvent != "undefined" ? b2.attachEvent("onmousemove", a2) : _.rf("cannot attachBrowserEvent: mousemove");
  };
```