# vana — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: loader×3, keyboard×3, page-transition×3, wheel-step×2, observer×1

## loader — chunks/14bzl6qv1ewic.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L382-385 (hit L385)
```js
  }, ea = (e2, t2, r2 = false) => {
    let o2 = z.exec(e2);
    return !!o2 && (o2[1] ? t2(o2[1]) : r2);
  }, es = (e2) => "position" === e2 || "percentage" === e2, ei = (e2) => "image" === e2 || "url" === e2, ec = (e2) => "length" === e2 || "size" === e2 || "bg-size" === e2, ed = (e2) => "length" === e2, eu = (e2) => "numb
```

## loader — chunks/turbopack-08_j7jsm1d0rc.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L309-316 (hit L311)
```js
    if (!t2) {
      let r2, n2;
      t2 = { resolved: false, loadingStarted: false, promise: new Promise((e3, t3) => {
        r2 = e3, n2 = t3;
      }), resolve: () => {
        t2.resolved = true, r2();
      }, reject: n2 }, X.set(e2, t2);
    }
```

## loader — chunks/turbopack-08_j7jsm1d0rc.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L336-368 (hit L339)
```js
  }, loadChunkCached: (e2, t2) => (function(e3, t3) {
    let r2 = D(t3);
    if (r2.loadingStarted) return r2.promise;
    if (e3 === i.Runtime) return r2.loadingStarted = true, L(t3) && r2.resolve(), r2.promise;
    if ("function" == typeof importScripts) if (L(t3)) ;
    else if (N.test(t3)) self.TURBOPACK_NEXT_CHUNK_URLS.push(t3), importScripts(t3);
    else throw Error(`can't infer type of chunk from URL ${t3} in worker`);
    else {
      let e4 = decodeURI(t3);
      if (L(t3)) if (document.querySelectorAll(`link[rel=stylesheet][href="${t3}"],link[rel=stylesheet][href^="${t3}?"],link[rel=stylesheet][href="${e4}"],link[rel=stylesheet][href^="${e4}?"]`).length > 0) r2.resolve();
      else {
        let e5 = document.createElement("link");
        e5.rel = "stylesheet", e5.href = t3, e5.onerror = () => {
          r2.reject();
        }, e5.onload = () => {
          r2.resolve();
        }, document.head.appendChild(e5);
      }
      else if (N.test(t3)) {
        let n2 = document.querySelectorAll(`script[src="${t3}"],script[src^="${t3}?"],script[src="${e4}"],script[src^="${e4}?"]`);
        if (n2.length > 0) for (let e5 of Array.from(n2)) e5.addEventListener("error", () => {
          r2.reject();
        });
        else {
          let e5 = document.createElement("script");
          e5.src = t3, e5.onerror = () => {
            r2.reject();
          }, document.head.appendChild(e5);
        }
      } else throw Error(`can't infer type of chunk from URL ${t3}`);
    }
    return r2.loadingStarted = true, r2.promise;
  })(e2, t2), async loadWebAssembly(e2, t2, r2, n2, o2) {
```

## keyboard — chunks/3mxqm_9xxy2hv.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L1146-1152 (hit L1151)
```js
  var no = tK(_({}, t2, { key: function(e10) {
    if (e10.key) {
      var t10 = nt[e10.key] || e10.key;
      if ("Unidentified" !== t10) return t10;
    }
    return "keypress" === e10.type ? 13 === (e10 = tQ(e10)) ? "Enter" : String.fromCharCode(e10) : "keydown" === e10.type || "keyup" === e10.type ? nn[e10.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: na, charCode: function(e10) {
```

## keyboard — chunks/3mxqm_9xxy2hv.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L1140-1180 (hit L1155)
```js
    var t10 = this.nativeEvent;
    return t10.getModifierState ? t10.getModifierState(e10) : !!(e10 = nr[e10]) && !!t10[e10];
  }
  function na() {
    return nl;
  }
  var no = tK(_({}, t2, { key: function(e10) {
    if (e10.key) {
      var t10 = nt[e10.key] || e10.key;
      if ("Unidentified" !== t10) return t10;
    }
    return "keypress" === e10.type ? 13 === (e10 = tQ(e10)) ? "Enter" : String.fromCharCode(e10) : "keydown" === e10.type || "keyup" === e10.type ? nn[e10.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: na, charCode: function(e10) {
    return "keypress" === e10.type ? tQ(e10) : 0;
  }, keyCode: function(e10) {
    return "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  }, which: function(e10) {
    return "keypress" === e10.type ? tQ(e10) : "keydown" === e10.type || "keyup" === e10.type ? e10.keyCode : 0;
  } })), ni = tK(_({}, t4, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })), nu = tK(_({}, t0, { submitter: 0 })), ns = tK(_({}, t2, 
    return "deltaX" in e10 ? e10.deltaX : "wheelDeltaX" in e10 ? -e10.wheelDeltaX : 0;
  }, deltaY: function(e10) {
    return "deltaY" in e10 ? e10.deltaY : "wheelDeltaY" in e10 ? -e10.wheelDeltaY : "wheelDelta" in e10 ? -e10.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 })), nd = tK(_({}, t0, { newState: 0, oldState: 0 })), np = [9, 13, 27, 32], nm = tA && "CompositionEvent" in window, nh = null;
  tA && "documentMode" in document && (nh = document.documentMode);
  var ng = tA && "TextEvent" in window && !nh, nv = tA && (!nm || nh && 8 < nh && 11 >= nh), ny = false;
  function nb(e10, t10) {
    switch (e10) {
      case "keyup":
        return -1 !== np.indexOf(t10.keyCode);
      case "keydown":
        return 229 !== t10.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function nw(e10) {
    return "object" == typeof (e10 = e10.detail) && "data" in e10 ? e10.data : null;
```

## keyboard — chunks/3mxqm_9xxy2hv.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L1210-1250 (hit L1225)
```js
    nO = r && (!document.documentMode || 9 < document.documentMode);
  }
  function nR() {
    nx && (nx.detachEvent("onpropertychange", nM), nP = nx = null);
  }
  function nM(e10) {
    if ("value" === e10.propertyName && nC(nP)) {
      var t10 = [];
      n_(t10, nP, e10, tz(e10)), tD(nN, t10);
    }
  }
  function nI(e10, t10, n10) {
    "focusin" === e10 ? (nR(), nx = t10, nP = n10, nx.attachEvent("onpropertychange", nM)) : "focusout" === e10 && nR();
  }
  function nD(e10) {
    if ("selectionchange" === e10 || "keyup" === e10 || "keydown" === e10) return nC(nP);
  }
  function nF(e10, t10) {
    if ("click" === e10) return nC(t10);
  }
  function nA(e10, t10) {
    if ("input" === e10 || "change" === e10) return nC(t10);
  }
  var nj = "function" == typeof Object.is ? Object.is : function(e10, t10) {
    return e10 === t10 && (0 !== e10 || 1 / e10 == 1 / t10) || e10 != e10 && t10 != t10;
  };
  function nU(e10, t10) {
    if (nj(e10, t10)) return true;
    if ("object" != typeof e10 || null === e10 || "object" != typeof t10 || null === t10) return false;
    var n10 = Object.keys(e10), r10 = Object.keys(t10);
    if (n10.length !== r10.length) return false;
    for (r10 = 0; r10 < n10.length; r10++) {
      var l10 = n10[r10];
      if (!ed.call(t10, l10) || !nj(e10[l10], t10[l10])) return false;
    }
    return true;
  }
  function nB(e10) {
    for (; e10 && e10.firstChild; ) e10 = e10.firstChild;
    return e10;
  }
```

## page-transition — chunks/3mxqm_9xxy2hv.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L5666-5675 (hit L5669)
```js
  function sV() {
    sD = sI = false;
    var e10, t10 = 0;
    0 === sA || ((e10 = window.event) && "popstate" === e10.type ? e10 === cp || (cp = e10, 0) : (cp = null, 1)) || (t10 = sA);
    for (var n10 = ev(), r10 = null, l10 = sR; null !== l10; ) {
      var a10 = l10.next, o10 = sH(l10, n10);
      0 === o10 ? (l10.next = null, null === r10 ? sR = a10 : r10.next = a10, null === a10 && (sM = r10)) : (r10 = l10, (0 !== t10 || 0 != (3 & o10)) && (sD = true)), l10 = a10;
    }
    0 !== uK && 5 !== uK || sU(t10, false), 0 !== sA && (sA = 0);
  }
```

## wheel-step — chunks/3mxqm_9xxy2hv.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L5807-5819 (hit L5818)
```js
  function s3(e10, t10, n10, r10) {
    switch (fI(t10)) {
      case 2:
        var l10 = fT;
        break;
      case 8:
        l10 = fO;
        break;
      default:
        l10 = fz;
    }
    n10 = l10.bind(null, t10, n10, e10), l10 = void 0, tj && ("touchstart" === t10 || "touchmove" === t10 || "wheel" === t10) && (l10 = true), r10 ? void 0 !== l10 ? e10.addEventListener(t10, n10, { capture: true, passiv
  }
```

## wheel-step — chunks/3mxqm_9xxy2hv.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L5892-5932 (hit L5907)
```js
            case "touchstart":
              u11 = ns;
              break;
            case n2:
            case n3:
            case n4:
              u11 = t9;
              break;
            case n9:
              u11 = nc;
              break;
            case "scroll":
            case "scrollend":
              u11 = t3;
              break;
            case "wheel":
              u11 = nf;
              break;
            case "copy":
            case "cut":
            case "paste":
              u11 = t7;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              u11 = ni;
              break;
            case "submit":
              u11 = nu;
              break;
            case "toggle":
            case "beforetoggle":
              u11 = nd;
          }
          var f5 = 0 != (4 & t10), d2 = !f5 && ("scroll" === e10 || "scrollend" === e10), p2 = f5 ? null !== i11 ? i11 + "Capture" : null : i11;
```

## page-transition — chunks/3mxqm_9xxy2hv.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L7271-7311 (hit L7286)
```js
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (ey()) {
```

## page-transition — chunks/3mxqm_9xxy2hv.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L7719-7726 (hit L7722)
```js
  function T({ appRouterState: e2 }) {
    return (0, o.useInsertionEffect)(() => {
      let { tree: t2, pushRef: n2, canonicalUrl: r2, renderedSearch: l2 } = e2, a2 = { ...n2.preserveCustomHistoryState ? window.history.state : {}, __NA: true, __PRIVATE_NEXTJS_INTERNALS_TREE: { tree: t2, renderedSearch
      n2.pendingPush && (0, s.createHrefFromUrl)(new URL(window.location.href)) !== r2 ? (n2.pendingPush = false, window.history.pushState(a2, "", r2)) : window.history.replaceState(a2, "", r2), (0, d.setLastCommittedTre
    }, [e2]), (0, o.useEffect)(() => {
      (0, _.pingVisibleLinks)(e2.nextUrl, e2.tree);
    }, [e2.nextUrl, e2.tree]), null;
  }
```

## observer — chunks/1zboaohvkqfb0.js?dpl=dpl_4BnNoTUSUsA8M7WjdvZjbAsftdci L2846-2851 (hit L2846)
```js
  let y = "function" == typeof WeakMap ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set(), _ = "function" == typeof IntersectionObserver ? new IntersectionObserver(function(e2) {
    for (let t2 of e2) {
      let e3 = t2.intersectionRatio > 0;
      S(t2.target, e3);
    }
  }, { rootMargin: "200px" }) : null;
```