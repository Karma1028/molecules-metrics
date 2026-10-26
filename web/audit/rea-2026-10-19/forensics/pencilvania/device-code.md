# pencilvania — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: wheel-step×1, loader×2, page-transition×1

## wheel-step — dist/main.js L60-67 (hit L64)
```js
  }, E = (e2) => {
    e2.preventDefault(), i.zoom.curr = ((t2) => {
      const e3 = i.zoom.curr + t2 * (o.zoomSpeed * i.zoom.curr), a3 = { x: innerWidth / (o.area.width / 2), y: innerHeight / (o.area.height / 2) }, s3 = Math.max(1 / o.maxZoom.out, Math.max(a3.x, a3.y));
      return Math.min(o.maxZoom.in, Math.max(s3, e3));
    })(e2.deltaY);
    const a2 = i.x + l(i.x, e2.offsetX, o.area.width), s2 = i.y + l(i.y, e2.offsetY, o.area.height);
    i.x = m(a2, t.width, o.area.width), i.y = m(s2, t.height, o.area.height), i.zoom.prev = i.zoom.curr;
  }, I = { assets: 0, splash: 0 }, H = { x: (o.area.width - t.width) / 2, y: (o.area.height - t.height) / 2 }, W = (t2, e2) => {
```

## loader — dist/main.js L74-88 (hit L74)
```js
    I.assets++, i.loading.percentage = I.assets / R.length * 100, I.assets === R.length && ((() => {
      const t2 = r(apiDogs);
      let e2 = 0;
      for ((() => {
        const t3 = assets.custom.pattern.img;
        assets.patterns = [];
        for (let e3 = 0; e3 < Math.ceil(o.area.height / t3.height); e3++) for (let a2 = 0; a2 < Math.ceil(o.area.width / t3.width); a2++) assets.patterns.push({ img: t3, start: { x: t3.width * a2, y: t3.height * e3 } });
      })(), assets.custom.spotlight.start = h(assets.custom.spotlight, 250, -150), assets.fixed.push(assets.custom.spotlight); e2 < apiDogs.length; ) {
        const a2 = assets.dynamic[r(assets.dynamic)], s2 = e2 === t2, o2 = apiDogs[e2], i2 = ["a", "e", "i", "o", "u"].includes(o2.age.charAt(0)) ? "an" : "a", n2 = { start: s2 ? h(a2, 0.55 * -a2.img.width + 250, 0.85 * 
        if (s2) n2.spotlight = true;
        else if (d(n2)) continue;
        assets.fixed.push(n2), e2++;
      }
      delete assets.dynamic;
    })(), V(), Y(), setTimeout((() => {
```

## loader — dist/main.js L73-91 (hit L89)
```js
  }, F = [...assets.fixed.filter(((t2) => t2.frames)).flatMap(((t2) => t2.frames)), ...Object.values(assets.custom).filter(((t2) => t2.frames)).flatMap(((t2) => t2.frames))], R = [...assets.fixed, ...assets.fixed.filter(
    I.assets++, i.loading.percentage = I.assets / R.length * 100, I.assets === R.length && ((() => {
      const t2 = r(apiDogs);
      let e2 = 0;
      for ((() => {
        const t3 = assets.custom.pattern.img;
        assets.patterns = [];
        for (let e3 = 0; e3 < Math.ceil(o.area.height / t3.height); e3++) for (let a2 = 0; a2 < Math.ceil(o.area.width / t3.width); a2++) assets.patterns.push({ img: t3, start: { x: t3.width * a2, y: t3.height * e3 } });
      })(), assets.custom.spotlight.start = h(assets.custom.spotlight, 250, -150), assets.fixed.push(assets.custom.spotlight); e2 < apiDogs.length; ) {
        const a2 = assets.dynamic[r(assets.dynamic)], s2 = e2 === t2, o2 = apiDogs[e2], i2 = ["a", "e", "i", "o", "u"].includes(o2.age.charAt(0)) ? "an" : "a", n2 = { start: s2 ? h(a2, 0.55 * -a2.img.width + 250, 0.85 * 
        if (s2) n2.spotlight = true;
        else if (d(n2)) continue;
        assets.fixed.push(n2), e2++;
      }
      delete assets.dynamic;
    })(), V(), Y(), setTimeout((() => {
      i.loading.done = true;
    }), 250));
  }, V = () => {
```

## page-transition — cdn.usefathom.com/script.js L10-18 (hit L12)
```js
  function spaHistory() {
    var pushState;
    void 0 !== history && (pushState = history.pushState, history.pushState = function() {
      var ret = pushState.apply(history, arguments);
      return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchangefathom")), ret;
    }, window.addEventListener("popstate", function() {
      window.dispatchEvent(new Event("locationchangefathom"));
    }), window.addEventListener("locationchangefathom", trackPageview));
  }
```