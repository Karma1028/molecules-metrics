# gallipoli — device code slices (tools/slice.cjs; esbuild-reprinted, vendor skipped)
devices: reveal-timeline×3, loader×3, shader-uniforms×3, raf-lerp×3, keyboard×3, pointer×3, audio×3, wheel-step×1

## reveal-timeline — FgXoRbHwNL/main.js L635-651 (hit L651)
```js
        }, TweenMax2.staggerTo = TweenMax2.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
          stagger = stagger || 0;
          var l, copy, i, p2, delay = 0, a = [], finalComplete = function() {
            vars.onComplete && vars.onComplete.apply(vars.onCompleteScope || this, arguments), onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
          }, cycle = vars.cycle, fromCycle = vars.startAt && vars.startAt.cycle;
          for (_isArray(targets) || ("string" == typeof targets && (targets = TweenLite.selector(targets) || targets), _isSelector(targets) && (targets = _slice(targets))), targets = targets || [], 0 > stagger && (target
            copy = {};
            for (p2 in vars) copy[p2] = vars[p2];
            if (cycle && (_applyCycle(copy, targets, i), null != copy.duration && (duration = copy.duration, delete copy.duration)), fromCycle) {
              fromCycle = copy.startAt = {};
              for (p2 in vars.startAt) fromCycle[p2] = vars.startAt[p2];
              _applyCycle(copy.startAt, targets, i);
            }
            copy.delay = delay + (copy.delay || 0), i === l && onCompleteAll && (copy.onComplete = finalComplete), a[i] = new TweenMax2(targets[i], duration, copy), delay += stagger;
          }
          return a;
        }, TweenMax2.staggerFrom = TweenMax2.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
```

## reveal-timeline — FgXoRbHwNL/main.js L638-678 (hit L653)
```js
            vars.onComplete && vars.onComplete.apply(vars.onCompleteScope || this, arguments), onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
          }, cycle = vars.cycle, fromCycle = vars.startAt && vars.startAt.cycle;
          for (_isArray(targets) || ("string" == typeof targets && (targets = TweenLite.selector(targets) || targets), _isSelector(targets) && (targets = _slice(targets))), targets = targets || [], 0 > stagger && (target
            copy = {};
            for (p2 in vars) copy[p2] = vars[p2];
            if (cycle && (_applyCycle(copy, targets, i), null != copy.duration && (duration = copy.duration, delete copy.duration)), fromCycle) {
              fromCycle = copy.startAt = {};
              for (p2 in vars.startAt) fromCycle[p2] = vars.startAt[p2];
              _applyCycle(copy.startAt, targets, i);
            }
            copy.delay = delay + (copy.delay || 0), i === l && onCompleteAll && (copy.onComplete = finalComplete), a[i] = new TweenMax2(targets[i], duration, copy), delay += stagger;
          }
          return a;
        }, TweenMax2.staggerFrom = TweenMax2.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
          return vars.runBackwards = true, vars.immediateRender = 0 != vars.immediateRender, TweenMax2.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
        }, TweenMax2.staggerFromTo = TweenMax2.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
          return toVars.startAt = fromVars, toVars.immediateRender = 0 != toVars.immediateRender && 0 != fromVars.immediateRender, TweenMax2.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParam
        }, TweenMax2.delayedCall = function(delay, callback, params, scope, useFrames) {
          return new TweenMax2(callback, 0, { delay, onComplete: callback, onCompleteParams: params, callbackScope: scope, onReverseComplete: callback, onReverseCompleteParams: params, immediateRender: false, useFrames, 
        }, TweenMax2.set = function(target, vars) {
          return new TweenMax2(target, 0, vars);
        }, TweenMax2.isTweening = function(target) {
          return TweenLite.getTweensOf(target, true).length > 0;
        };
        var _getChildrenOf = function(timeline, includeTimelines) {
          for (var a = [], cnt = 0, tween = timeline._first; tween; ) tween instanceof TweenLite ? a[cnt++] = tween : (includeTimelines && (a[cnt++] = tween), a = a.concat(_getChildrenOf(tween, includeTimelines)), cnt = 
          return a;
        }, getAllTweens = TweenMax2.getAllTweens = function(includeTimelines) {
          return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat(_getChildrenOf(Animation._rootFramesTimeline, includeTimelines));
        };
        TweenMax2.killAll = function(complete, tweens, delayedCalls, timelines) {
          null == tweens && (tweens = true), null == delayedCalls && (delayedCalls = true);
          var isDC, tween, i, a = getAllTweens(0 != timelines), l = a.length, allTrue = tweens && delayedCalls && timelines;
          for (i = 0; l > i; i++) tween = a[i], (allTrue || tween instanceof SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) && (complete ? tween.totalTime(tween._rev
        }, TweenMax2.killChildTweensOf = function(parent, complete) {
          if (null != parent) {
            var a, curParent, p2, i, l, tl = TweenLiteInternals.tweenLookup;
            if ("string" == typeof parent && (parent = TweenLite.selector(parent) || parent), _isSelector(parent) && (parent = _slice(parent)), _isArray(parent)) for (i = parent.length; --i > -1; ) TweenMax2.killChildTwe
            else {
              a = [];
              for (p2 in tl) for (curParent = tl[p2].target.parentNode; curParent; ) curParent === parent && (a = a.concat(tl[p2].tweens)), curParent = curParent.parentNode;
```

## loader — FgXoRbHwNL/main.js L691-694 (hit L694)
```js
        }, TweenMax2.globalTimeScale = function(value) {
          var tl = Animation._rootTimeline, t = TweenLite.ticker.time;
          return arguments.length ? (value = value || _tinyNum, tl._startTime = t - (t - tl._startTime) * tl._timeScale / value, tl = Animation._rootFramesTimeline, t = TweenLite.ticker.frame, tl._startTime = t - (t - tl
        }, p.progress = function(value, suppressEvents) {
```

## loader — FgXoRbHwNL/main.js L681-721 (hit L696)
```js
          }
        };
        var _changePause = function(pause, tweens, delayedCalls, timelines) {
          tweens = tweens !== false, delayedCalls = delayedCalls !== false, timelines = timelines !== false;
          for (var isDC, tween, a = getAllTweens(timelines), allTrue = tweens && delayedCalls && timelines, i = a.length; --i > -1; ) tween = a[i], (allTrue || tween instanceof SimpleTimeline || (isDC = tween.target === 
        };
        return TweenMax2.pauseAll = function(tweens, delayedCalls, timelines) {
          _changePause(true, tweens, delayedCalls, timelines);
        }, TweenMax2.resumeAll = function(tweens, delayedCalls, timelines) {
          _changePause(false, tweens, delayedCalls, timelines);
        }, TweenMax2.globalTimeScale = function(value) {
          var tl = Animation._rootTimeline, t = TweenLite.ticker.time;
          return arguments.length ? (value = value || _tinyNum, tl._startTime = t - (t - tl._startTime) * tl._timeScale / value, tl = Animation._rootFramesTimeline, t = TweenLite.ticker.frame, tl._startTime = t - (t - tl
        }, p.progress = function(value, suppressEvents) {
          return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents) : this._time / this.d
        }, p.totalProgress = function(value, suppressEvents) {
          return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this._totalTime / this.totalDuration();
        }, p.time = function(value, suppressEvents) {
          return arguments.length ? (this._dirty && this.totalDuration(), value > this._duration && (value = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? value = this._duration - value + this._cycle * (this._
        }, p.duration = function(value) {
          return arguments.length ? Animation.prototype.duration.call(this, value) : this._duration;
        }, p.totalDuration = function(value) {
          return arguments.length ? -1 === this._repeat ? this : this.duration((value - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 
        }, p.repeat = function(value) {
          return arguments.length ? (this._repeat = value, this._uncache(true)) : this._repeat;
        }, p.repeatDelay = function(value) {
          return arguments.length ? (this._repeatDelay = value, this._uncache(true)) : this._repeatDelay;
        }, p.yoyo = function(value) {
          return arguments.length ? (this._yoyo = value, this) : this._yoyo;
        }, TweenMax2;
      }, true), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
        var TimelineLite = function(vars) {
          SimpleTimeline.call(this, vars), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === true, this.smoothChildTiming = this.vars.smoothChildTiming === true, this._sortChildren = true, thi
          var val, p2, v = this.vars;
          for (p2 in v) val = v[p2], _isArray(val) && -1 !== val.join("").indexOf("{self}") && (v[p2] = this._swapSelfInParams(val));
          _isArray(v.tweens) && this.add(v.tweens, 0, v.align, v.stagger);
        }, _tinyNum = 1e-10, TweenLiteInternals = TweenLite._internals, _internals = TimelineLite._internals = {}, _isSelector = TweenLiteInternals.isSelector, _isArray = TweenLiteInternals.isArray, _lazyTweens = TweenLi
          var p2, copy = {};
          for (p2 in vars) copy[p2] = vars[p2];
          return copy;
        }, _applyCycle = function(vars, targets, i) {
```

## reveal-timeline — FgXoRbHwNL/main.js L736-739 (hit L738)
```js
        }, p.fromTo = function(target, duration, fromVars, toVars, position) {
          var Engine = toVars.repeat && _globals.TweenMax || TweenLite;
          return duration ? this.add(Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
        }, p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
```

## loader — FgXoRbHwNL/main.js L986-992 (hit L992)
```js
        }, p.getLabelsArray = function() {
          var p2, a = [], cnt = 0;
          for (p2 in this._labels) a[cnt++] = { time: this._labels[p2], name: p2 };
          return a.sort(function(a2, b) {
            return a2.time - b.time;
          }), a;
        }, p.progress = function(value, suppressEvents) {
```

## shader-uniforms — FgXoRbHwNL/main.js L7591-7610 (hit L7600)
```js
}, { "./config.development": 354, "./config.production": 355 }], 357: [function(require2) {
  var PIXI = require2("pixi");
  PIXI.AnimatedNoiseFilter = function(texture) {
    PIXI.AbstractFilter.call(this), this.passes = [this], texture.baseTexture._powerOf2 = true, this.uniforms = { displacementMap: { type: "sampler2D", value: texture }, scale: { type: "2f", value: { x: 1, y: 1 } }, fram
  }, PIXI.AnimatedNoiseFilter.prototype = Object.create(PIXI.AbstractFilter.prototype), PIXI.AnimatedNoiseFilter.prototype.constructor = PIXI.AnimatedNoiseFilter, PIXI.AnimatedNoiseFilter.prototype.onTextureLoaded = func
    this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width, this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height, this.uniforms.displacementMap.value.baseTexture.off("
  }, Object.defineProperty(PIXI.AnimatedNoiseFilter.prototype, "map", { get: function() {
    return this.uniforms.displacementMap.value;
  }, set: function(value) {
    this.uniforms.displacementMap.value = value;
  } }), Object.defineProperty(PIXI.AnimatedNoiseFilter.prototype, "scale", { get: function() {
    return this.uniforms.scale.value;
  }, set: function(value) {
    this.uniforms.scale.value = value;
  } }), Object.defineProperty(PIXI.AnimatedNoiseFilter.prototype, "offset", { get: function() {
    return this.uniforms.offset.value;
  }, set: function(value) {
    this.uniforms.offset.value = value;
  } });
}, { pixi: 361 }], 358: [function(require2) {
```

## shader-uniforms — FgXoRbHwNL/main.js L7630-7639 (hit L7637)
```js
}, { "./BlurXFilter": 359, "./BlurYFilter": 360, pixi: 361 }], 359: [function(require2) {
  var PIXI = require2("pixi");
  PIXI.BlurXFilter = function() {
    PIXI.AbstractFilter.call(this), this.passes = [this], this.uniforms = { blur: { type: "1f", value: 1 / 512 } }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "
  }, PIXI.BlurXFilter.prototype = Object.create(PIXI.AbstractFilter.prototype), PIXI.BlurXFilter.prototype.constructor = PIXI.BlurXFilter, Object.defineProperty(PIXI.BlurXFilter.prototype, "blur", { get: function() {
    return this.uniforms.blur.value / (1 / 7e3);
  }, set: function(value) {
    this.dirty = true, this.uniforms.blur.value = 1 / 7e3 * value;
  } });
}, { pixi: 361 }], 360: [function(require2) {
```

## shader-uniforms — FgXoRbHwNL/main.js L7639-7648 (hit L7646)
```js
}, { pixi: 361 }], 360: [function(require2) {
  var PIXI = require2("pixi");
  PIXI.BlurYFilter = function() {
    PIXI.AbstractFilter.call(this), this.passes = [this], this.uniforms = { blur: { type: "1f", value: 1 / 512 } }, this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "
  }, PIXI.BlurYFilter.prototype = Object.create(PIXI.AbstractFilter.prototype), PIXI.BlurYFilter.prototype.constructor = PIXI.BlurYFilter, Object.defineProperty(PIXI.BlurYFilter.prototype, "blur", { get: function() {
    return this.uniforms.blur.value / (1 / 7e3);
  }, set: function(value) {
    this.uniforms.blur.value = 1 / 7e3 * value;
  } });
}, { pixi: 361 }], 361: [function(require2, module2, exports2) {
```

## raf-lerp — FgXoRbHwNL/main.js L9407-9415 (hit L9411)
```js
    }, apply: function(skeleton, lastTime, time, firedEvents, alpha) {
      var frames = this.frames;
      if (!(time < frames[0])) {
        var bone = skeleton.bones[this.boneIndex];
        if (time >= frames[frames.length - 3]) return bone.x += (bone.data.x + frames[frames.length - 2] - bone.x) * alpha, void (bone.y += (bone.data.y + frames[frames.length - 1] - bone.y) * alpha);
        var frameIndex = spine.Animation.binarySearch(frames, time, 3), prevFrameX = frames[frameIndex - 2], prevFrameY = frames[frameIndex - 1], frameTime = frames[frameIndex], percent = 1 - (time - frameTime) / (frames
        percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent), bone.x += (bone.data.x + prevFrameX + (frames[frameIndex + 1] - prevFrameX) * percent - bone.x) * alpha, bone.y += (bone.data.y + prevFrameY + (
      }
    } }, spine.ScaleTimeline = function(frameCount) {
```

## raf-lerp — FgXoRbHwNL/main.js L9421-9429 (hit L9425)
```js
    }, apply: function(skeleton, lastTime, time, firedEvents, alpha) {
      var frames = this.frames;
      if (!(time < frames[0])) {
        var bone = skeleton.bones[this.boneIndex];
        if (time >= frames[frames.length - 3]) return bone.scaleX += (bone.data.scaleX * frames[frames.length - 2] - bone.scaleX) * alpha, void (bone.scaleY += (bone.data.scaleY * frames[frames.length - 1] - bone.scaleY)
        var frameIndex = spine.Animation.binarySearch(frames, time, 3), prevFrameX = frames[frameIndex - 2], prevFrameY = frames[frameIndex - 1], frameTime = frames[frameIndex], percent = 1 - (time - frameTime) / (frames
        percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent), bone.scaleX += (bone.data.scaleX * (prevFrameX + (frames[frameIndex + 1] - prevFrameX) * percent) - bone.scaleX) * alpha, bone.scaleY += (bone.d
      }
    } }, spine.ColorTimeline = function(frameCount) {
```

## raf-lerp — FgXoRbHwNL/main.js L9435-9449 (hit L9447)
```js
    }, apply: function(skeleton, lastTime, time, firedEvents, alpha) {
      var frames = this.frames;
      if (!(time < frames[0])) {
        var r, g, b, a;
        if (time >= frames[frames.length - 5]) {
          var i = frames.length - 1;
          r = frames[i - 3], g = frames[i - 2], b = frames[i - 1], a = frames[i];
        } else {
          var frameIndex = spine.Animation.binarySearch(frames, time, 5), prevFrameR = frames[frameIndex - 4], prevFrameG = frames[frameIndex - 3], prevFrameB = frames[frameIndex - 2], prevFrameA = frames[frameIndex - 1]
          percent = this.curves.getCurvePercent(frameIndex / 5 - 1, percent), r = prevFrameR + (frames[frameIndex + 1] - prevFrameR) * percent, g = prevFrameG + (frames[frameIndex + 2] - prevFrameG) * percent, b = prevFr
        }
        var slot2 = skeleton.slots[this.slotIndex];
        1 > alpha ? (slot2.r += (r - slot2.r) * alpha, slot2.g += (g - slot2.g) * alpha, slot2.b += (b - slot2.b) * alpha, slot2.a += (a - slot2.a) * alpha) : (slot2.r = r, slot2.g = g, slot2.b = b, slot2.a = a);
      }
    } }, spine.AttachmentTimeline = function(frameCount) {
```

## keyboard — FgXoRbHwNL/main.js L12128-12168 (hit L12143)
```js
    return disposeFn.guid = "vjs-interval-" + intervalId, this.on("dispose", disposeFn), intervalId;
  }, vjs.Component.prototype.clearInterval = function(intervalId) {
    clearInterval(intervalId);
    var disposeFn = function() {
    };
    return disposeFn.guid = "vjs-interval-" + intervalId, this.off("dispose", disposeFn), intervalId;
  }, vjs.Button = vjs.Component.extend({ init: function(player, options) {
    vjs.Component.call(this, player, options), this.emitTapEvents(), this.on("tap", this.onClick), this.on("click", this.onClick), this.on("focus", this.onFocus), this.on("blur", this.onBlur);
  } }), vjs.Button.prototype.createEl = function(type, props) {
    var el;
    return props = vjs.obj.merge({ className: this.buildCSSClass(), role: "button", "aria-live": "polite", tabIndex: 0 }, props), el = vjs.Component.prototype.createEl.call(this, type, props), props.innerHTML || (this.co
  }, vjs.Button.prototype.buildCSSClass = function() {
    return "vjs-control " + vjs.Component.prototype.buildCSSClass.call(this);
  }, vjs.Button.prototype.onClick = function() {
  }, vjs.Button.prototype.onFocus = function() {
    vjs.on(document, "keydown", vjs.bind(this, this.onKeyPress));
  }, vjs.Button.prototype.onKeyPress = function(event2) {
    (32 == event2.which || 13 == event2.which) && (event2.preventDefault(), this.onClick());
  }, vjs.Button.prototype.onBlur = function() {
    vjs.off(document, "keydown", vjs.bind(this, this.onKeyPress));
  }, vjs.Slider = vjs.Component.extend({ init: function(player, options) {
    vjs.Component.call(this, player, options), this.bar = this.getChild(this.options_.barName), this.handle = this.getChild(this.options_.handleName), this.on("mousedown", this.onMouseDown), this.on("touchstart", this.on
  } }), vjs.Slider.prototype.createEl = function(type, props) {
    return props = props || {}, props.className = props.className + " vjs-slider", props = vjs.obj.merge({ role: "slider", "aria-valuenow": 0, "aria-valuemin": 0, "aria-valuemax": 100, tabIndex: 0 }, props), vjs.Componen
  }, vjs.Slider.prototype.onMouseDown = function(event2) {
    event2.preventDefault(), vjs.blockTextSelection(), this.addClass("vjs-sliding"), this.on(document, "mousemove", this.onMouseMove), this.on(document, "mouseup", this.onMouseUp), this.on(document, "touchmove", this.onM
  }, vjs.Slider.prototype.onMouseMove = function() {
  }, vjs.Slider.prototype.onMouseUp = function() {
    vjs.unblockTextSelection(), this.removeClass("vjs-sliding"), this.off(document, "mousemove", this.onMouseMove), this.off(document, "mouseup", this.onMouseUp), this.off(document, "touchmove", this.onMouseMove), this.o
  }, vjs.Slider.prototype.update = function() {
    if (this.el_) {
      var barProgress, progress = this.getPercent(), handle = this.handle, bar = this.bar;
      if (("number" != typeof progress || progress !== progress || 0 > progress || progress === 1 / 0) && (progress = 0), barProgress = progress, handle) {
        var box = this.el_, boxWidth = box.offsetWidth, handleWidth = handle.el().offsetWidth, handlePercent = handleWidth ? handleWidth / boxWidth : 0, boxAdjustedPercent = 1 - handlePercent, adjustedProgress = progress
        barProgress = adjustedProgress + handlePercent / 2, handle.el().style.left = vjs.round(100 * adjustedProgress, 2) + "%";
      }
      bar && (bar.el().style.width = vjs.round(100 * barProgress, 2) + "%");
    }
  }, vjs.Slider.prototype.calculateDistance = function(event2) {
    var el, box, boxX, boxY, boxW, boxH, handle, pageX, pageY;
    if (el = this.el_, box = vjs.findPosition(el), boxW = boxH = el.offsetWidth, handle = this.handle, this.options().vertical) {
```

## keyboard — FgXoRbHwNL/main.js L12166-12206 (hit L12181)
```js
  }, vjs.Slider.prototype.calculateDistance = function(event2) {
    var el, box, boxX, boxY, boxW, boxH, handle, pageX, pageY;
    if (el = this.el_, box = vjs.findPosition(el), boxW = boxH = el.offsetWidth, handle = this.handle, this.options().vertical) {
      if (boxY = box.top, pageY = event2.changedTouches ? event2.changedTouches[0].pageY : event2.pageY, handle) {
        var handleH = handle.el().offsetHeight;
        boxY += handleH / 2, boxH -= handleH;
      }
      return Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
    }
    if (boxX = box.left, pageX = event2.changedTouches ? event2.changedTouches[0].pageX : event2.pageX, handle) {
      var handleW = handle.el().offsetWidth;
      boxX += handleW / 2, boxW -= handleW;
    }
    return Math.max(0, Math.min(1, (pageX - boxX) / boxW));
  }, vjs.Slider.prototype.onFocus = function() {
    this.on(document, "keydown", this.onKeyPress);
  }, vjs.Slider.prototype.onKeyPress = function(event2) {
    37 == event2.which || 40 == event2.which ? (event2.preventDefault(), this.stepBack()) : (38 == event2.which || 39 == event2.which) && (event2.preventDefault(), this.stepForward());
  }, vjs.Slider.prototype.onBlur = function() {
    this.off(document, "keydown", this.onKeyPress);
  }, vjs.Slider.prototype.onClick = function(event2) {
    event2.stopImmediatePropagation(), event2.preventDefault();
  }, vjs.SliderHandle = vjs.Component.extend(), vjs.SliderHandle.prototype.defaultValue = 0, vjs.SliderHandle.prototype.createEl = function(type, props) {
    return props = props || {}, props.className = props.className + " vjs-slider-handle", props = vjs.obj.merge({ innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>" }, props), vjs.Component.prot
  }, vjs.Menu = vjs.Component.extend(), vjs.Menu.prototype.addItem = function(component) {
    this.addChild(component), component.on("click", vjs.bind(this, function() {
      this.unlockShowing();
    }));
  }, vjs.Menu.prototype.createEl = function() {
    var contentElType = this.options().contentElType || "ul";
    this.contentEl_ = vjs.createEl(contentElType, { className: "vjs-menu-content" });
    var el = vjs.Component.prototype.createEl.call(this, "div", { append: this.contentEl_, className: "vjs-menu" });
    return el.appendChild(this.contentEl_), vjs.on(el, "click", function(event2) {
      event2.preventDefault(), event2.stopImmediatePropagation();
    }), el;
  }, vjs.MenuItem = vjs.Button.extend({ init: function(player, options) {
    vjs.Button.call(this, player, options), this.selected(options.selected);
  } }), vjs.MenuItem.prototype.createEl = function(type, props) {
    return vjs.Button.prototype.createEl.call(this, "li", vjs.obj.merge({ className: "vjs-menu-item", innerHTML: this.localize(this.options_.label) }, props));
  }, vjs.MenuItem.prototype.onClick = function() {
    this.selected(true);
```

## keyboard — FgXoRbHwNL/main.js L12195-12235 (hit L12210)
```js
    var contentElType = this.options().contentElType || "ul";
    this.contentEl_ = vjs.createEl(contentElType, { className: "vjs-menu-content" });
    var el = vjs.Component.prototype.createEl.call(this, "div", { append: this.contentEl_, className: "vjs-menu" });
    return el.appendChild(this.contentEl_), vjs.on(el, "click", function(event2) {
      event2.preventDefault(), event2.stopImmediatePropagation();
    }), el;
  }, vjs.MenuItem = vjs.Button.extend({ init: function(player, options) {
    vjs.Button.call(this, player, options), this.selected(options.selected);
  } }), vjs.MenuItem.prototype.createEl = function(type, props) {
    return vjs.Button.prototype.createEl.call(this, "li", vjs.obj.merge({ className: "vjs-menu-item", innerHTML: this.localize(this.options_.label) }, props));
  }, vjs.MenuItem.prototype.onClick = function() {
    this.selected(true);
  }, vjs.MenuItem.prototype.selected = function(selected) {
    selected ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-selected", true)) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-selected", false));
  }, vjs.MenuButton = vjs.Button.extend({ init: function(player, options) {
    vjs.Button.call(this, player, options), this.update(), this.on("keydown", this.onKeyPress), this.el_.setAttribute("aria-haspopup", true), this.el_.setAttribute("role", "button");
  } }), vjs.MenuButton.prototype.update = function() {
    var menu = this.createMenu();
    this.menu && this.removeChild(this.menu), this.menu = menu, this.addChild(menu), this.items && 0 === this.items.length ? this.hide() : this.items && this.items.length > 1 && this.show();
  }, vjs.MenuButton.prototype.buttonPressed_ = false, vjs.MenuButton.prototype.createMenu = function() {
    var menu = new vjs.Menu(this.player_);
    if (this.options().title && menu.contentEl().appendChild(vjs.createEl("li", { className: "vjs-menu-title", innerHTML: vjs.capitalize(this.options().title), tabindex: -1 })), this.items = this.createItems(), this.item
    return menu;
  }, vjs.MenuButton.prototype.createItems = function() {
  }, vjs.MenuButton.prototype.buildCSSClass = function() {
    return this.className + " vjs-menu-button " + vjs.Button.prototype.buildCSSClass.call(this);
  }, vjs.MenuButton.prototype.onFocus = function() {
  }, vjs.MenuButton.prototype.onBlur = function() {
  }, vjs.MenuButton.prototype.onClick = function() {
    this.one("mouseout", vjs.bind(this, function() {
      this.menu.unlockShowing(), this.el_.blur();
    })), this.buttonPressed_ ? this.unpressButton() : this.pressButton();
  }, vjs.MenuButton.prototype.onKeyPress = function(event2) {
    32 == event2.which || 13 == event2.which ? (this.buttonPressed_ ? this.unpressButton() : this.pressButton(), event2.preventDefault()) : 27 == event2.which && (this.buttonPressed_ && this.unpressButton(), event2.preve
  }, vjs.MenuButton.prototype.pressButton = function() {
    this.buttonPressed_ = true, this.menu.lockShowing(), this.el_.setAttribute("aria-pressed", true), this.items && this.items.length > 0 && this.items[0].el().focus();
  }, vjs.MenuButton.prototype.unpressButton = function() {
    this.buttonPressed_ = false, this.menu.unlockShowing(), this.el_.setAttribute("aria-pressed", false);
  }, vjs.MediaError = function(code) {
    "number" == typeof code ? this.code = code : "string" == typeof code ? this.message = code : "object" == typeof code && vjs.obj.merge(this, code), this.message || (this.message = vjs.MediaError.defaultMessages[this.c
  }, vjs.MediaError.prototype.code = 0, vjs.MediaError.prototype.message = "", vjs.MediaError.prototype.status = null, vjs.MediaError.errorTypes = ["MEDIA_ERR_CUSTOM", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR
```

## pointer — FgXoRbHwNL/main.js L12433-12441 (hit L12433)
```js
    }, this.on("mousedown", onMouseDown), this.on("mousemove", onMouseMove), this.on("mouseup", onMouseUp), this.on("keydown", onActivity), this.on("keyup", onActivity), activityCheck = this.setInterval(function() {
      if (this.userActivity_) {
        this.userActivity_ = false, this.userActive(true), this.clearTimeout(inactivityTimeout);
        var timeout = this.options().inactivityTimeout;
        timeout > 0 && (inactivityTimeout = this.setTimeout(function() {
          this.userActivity_ || this.userActive(false);
        }, timeout));
      }
    }, 250);
```

## pointer — FgXoRbHwNL/main.js L12980-12992 (hit L12988)
```js
  }, vjs.Flash = vjs.MediaTechController.extend({ init: function(player, options, ready) {
    vjs.MediaTechController.call(this, player, options, ready);
    var source = options.source, objId = player.id() + "_flash_api", playerOptions = player.options_, flashVars = vjs.obj.merge({ readyFunction: "videojs.Flash.onReady", eventProxyFunction: "videojs.Flash.onEvent", error
    source && this.ready(function() {
      this.setSource(source);
    }), vjs.insertFirst(this.el_, options.parentEl), options.startTime && this.ready(function() {
      this.load(), this.play(), this.currentTime(options.startTime);
    }), vjs.IS_FIREFOX && this.ready(function() {
      this.on("mousemove", function() {
        this.player().trigger({ type: "mousemove", bubbles: false });
      });
    }), player.on("stageclick", player.reportUserActivity), this.el_ = vjs.Flash.embed(options.swf, this.el_, flashVars, params, attributes);
  } }), vjs.Flash.prototype.dispose = function() {
```

## audio — FgXoRbHwNL/main.js L15420-15473 (hit L15423)
```js
    }), dmaf("sound", ["core", "entity", "_", "context", "time", "assets", "instances"], function(a, b, c, d, e2, f, g) {
      var h = c.propIsnt("playbackState", 3);
      return b.extend({ type: { value: "sound" }, construct: { value: function() {
        this.output = d.createGainNode(), this.plays = e2.createScheduler(this, this.proceedPlay), this.stops = e2.createScheduler(this, this.proceedStop), this.events = e2.createScheduler(a, a.dispatch), this.softLoops 
      } }, init: { value: function() {
        this.outputs.forEach(function(a2) {
          var b2;
          "master" === a2 ? this.output.connect(d.destination) : (b2 = g.get("audio", a2), b2 ? this.output.connect(b2.input) : this.log("Can't find bus", a2));
        }, this);
      } }, checkFinished: { value: function() {
        this.sounds = this.sounds.filter(h), this.playing = !!this.sounds.length;
      } }, clearAll: { value: function(a2, b2, c2) {
        this.log("clearAll", a2);
        var d2;
        for (b2 = b2 || 0; this.sounds.length; ) {
          if (d2 = this.sounds.pop(), d2.playbackState <= 2 || c2 === true) {
            this.log("clearing playing sound"), d2._gain.gain.cancelScheduledValues(Math.max(0, a2 / 1e3)), d2._gain.gain.setValueAtTime(d2._gain.gain.value, Math.max(0, a2 / 1e3)), d2._gain.gain.linearRampToValueAtTime(
            try {
              d2.noteOff((a2 + b2) / 1e3);
            } catch (e3) {
            }
          } else this.log("clearing not started, or finished sound.");
          delete d2._gain;
        }
        this.playing = false;
      } }, createSound: { value: function() {
        var a2 = this.getSoundFile(), b2 = d.createBufferSource(), e3 = f.get("buffer", a2), g2 = d.createGainNode();
        return e3 ? (b2.id = c.UID(), b2._gain = g2, b2.buffer = e3, b2.connect(g2), g2.connect(this.output), -2 === this.loop && (b2.loop = true), b2) : (this.error("Buffer", a2, "is missing check soundFile property."),
      } }, dispose: { value: function(a2) {
        this.sounds = this.sounds.filter(c.propIsnt("id", a2)), this.playing = !!this.sounds.length;
      } }, play: { value: function(b2) {
        var c2 = e2.current;
        this.checkFinished(), this.stops.cancel(), this.log(".play(", a.getCurrentEvent(), b2, ")"), this.playing ? (this.reTrig > -1 && (this.plays.cancel(), this.events.cancel()), 0 === this.reTrig || "RESYNC" === this
      } }, proceedPlay: { value: function(a2) {
        var b2, c2, d2, f2 = this.createSound(), g2 = e2.current;
        if (this.log("proceedPlay", a2), f2) {
          if (c2 = 1e3 * f2.buffer.duration, 0 === this.loop && (this.loop = c2), "PLAY" === this.timingCorrection) g2 > a2 && (a2 = g2), f2.noteOn(a2 / 1e3);
          else {
            if ("RESYNC" === this.timingCorrection && this.clearAll(a2, this.fadeOut, true), this.loop > -1) for (; g2 >= a2 + this.loop; ) a2 += this.loop;
            else if (g2 > a2 + c2) return void this.log("Sync or resync sound start time was after buffer.");
            g2 > a2 ? (b2 = g2 - a2, f2.noteGrainOn(g2 / 1e3, b2 / 1e3, (c2 - b2) / 1e3)) : f2.noteOn(a2 / 1e3);
          }
          this.fadeIn > 0 && (g2 > a2 ? (f2._gain.gain.setValueAtTime(0, g2 / 1e3), f2._gain.gain.linearRampToValueAtTime(1, g2 / 1e3 + this.fadeIn / 1e3)) : (f2._gain.gain.setValueAtTime(0, a2 / 1e3), f2._gain.gain.line
        }
      } }, stop: { value: function(a2) {
        this.log("stop", a2), this.plays.cancel(), this.stops.cancel(), this.stops.schedule(a2, this.fadeOut);
      } }, proceedStop: { value: function(a2, b2) {
        this.log("proceedStop"), b2 = b2 || 50, a2 = a2 || e2.current, this.log("Stopping"), this.events.cancel(), this.softLoops.cancel(), this.clearAll(a2, b2, true), g.remove(this.type, this.instanceId);
      } }, volume: { get: function() {
        return this.output.gain;
      }, set: function(a2) {
        this._volume = a2, this.waVolume = c.dbToWAVolume(this._volume), this.output && (this.output.gain.value = this.waVolume);
      } } });
    }), dmaf("actions", ["core", "_", "instances", "time", "logs", "dynamic", "public"], function(a, b, c, d, e2, f) {
```

## audio — FgXoRbHwNL/main.js L15594-15617 (hit L15610)
```js
    }), dmaf("context", ["env", "core"], function(a, b) {
      function c(a2) {
        a2.proto[a2.name] = a2.proto[a2.name] || a2.shim;
      }
      function d(a2, b2, c2) {
        return { name: a2, shim: b2, proto: c2 };
      }
      function e2(a2, b2, c2) {
        return 1 === arguments.length ? this.noteOn(a2) : this.noteGrainOn(a2, b2, c2);
      }
      function f(a2) {
        document.removeEventListener(a2.type, f, false);
        var c2 = b.require("context"), d2 = c2.createBufferSource();
        d2.buffer = c2.createBuffer(1, 100, 44100), d2.noteOn(0), b.dispatch("_internal:unlocked");
      }
      function g(a2) {
        var b2 = Object.getPrototypeOf(a2.createBufferSource()), f2 = Object.getPrototypeOf(a2), g2 = Object.getPrototypeOf(a2.createGain().gain), h2 = !!f2.createGain;
        return [d("createGainNode", f2.createGain, f2), d("createGain", f2.createGainNode, f2), d("createDelayNode", f2.createDelay, f2), d("createDelay", f2.createDelayNode, f2), d("createJavaScriptNode", f2.createScrip
      }
      function h(b2) {
        return document.addEventListener(a.touch ? "touchstart" : "mousemove", f, false), g(new b2());
      }
      return a.webaudio && h(window.AudioContext || window.webkitAudioContext);
    }), dmaf("entity", ["_", "events", "core", "time", "context", "tween", "descriptors", "task"], function(a, b, c, d, e2, f, g, h) {
```

## audio — FgXoRbHwNL/main.js L15997-16011 (hit L15999)
```js
    }), dmaf("audioBus", ["entity", "instances", "audioNodes", "context", "_", "env"], function(a, b, c, d, e2, f) {
      return a.extend({ id: { value: "audioBus" }, type: { value: "audio" }, construct: { value: function() {
        this.input = d.createGainNode(), this.panner = d.createPanner(), this.output = d.createGainNode();
      } }, init: { value: function(a2) {
        this._pan = 0, "safari" === f.browser ? (c.connectOutputs(this), this.effects = c.createRecursive(this.input, a2.audioNodes), (this.effects.length ? e2.last(this.effects) : this.input).connect(this.output)) : (th
      } }, volume: { get: function() {
        return this.output.gain;
      }, set: function(a2) {
        this.output.gain.value = e2.dbToWAVolume(a2);
      } }, pan: { get: function() {
        return this._pan;
      }, set: function(a2) {
        this._pan = a2, this.panner.setPosition(a2 / 100, 0, 1 - Math.abs(a2 / 100));
      } } });
    }), dmaf("htmlBus", ["entity", "_"], function(a) {
```

## pointer — FgXoRbHwNL/main.js L17548-17588 (hit L17563)
```js
      }.bind(this)), this.prevButton.on("mousedown", function() {
        _this.prevButton.disabled !== true && sound.tell("archiveNextBtnDown");
      }), this.nextButton.on("mouseenter", function() {
        _this.nextButton.disabled !== true && (sound.tell("archiveNextBtnOver"), sound.tell("archiveNextSlideIn"), _this.nextButton.icon.css({ fill: "#fefdfc", stroke: "#fefdfc" }), TweenMax2.to(_this.nextButton.tint, 0.
      }.bind(this)), this.nextButton.on("mouseleave", this.nextButton.mouseleave.bind(this.nextButton)), this.prevButton.on("mouseenter", function() {
        _this.prevButton.disabled !== true && (sound.tell("archiveNextBtnOver"), sound.tell("archiveNextSlideIn"), _this.prevButton.icon.css({ fill: "#fefdfc", stroke: "#fefdfc" }), TweenMax2.to(_this.prevButton.tint, 0.
      }), this.prevButton.on("mouseleave", this.prevButton.mouseleave.bind(this.prevButton)), this.archiveButton.on("mouseenter", function() {
        var overlayDuration = 0.3;
        this.archiveButton.overlay.isShown = true, TweenMax2.fromTo(this.archiveButton.overlay, overlayDuration / 6, { x: -10, clip: "rect(0 10px 50px 10px)" }, { x: 0, clip: "rect(0 10px 50px 0)", ease: Linear.easeNone,
          TweenMax2.set(this.archiveButton.overlay, { clip: "rect(0 1000px 50px 0)" });
        }.bind(this) }), TweenMax2.to(this.archiveButton.overlay.text, overlayDuration, { width: this.archiveButton.overlay.text.span.view.offsetWidth + 10, delay: overlayDuration, ease: Expo.easeOut, overwrite: "all" })
      }.bind(this)), this.archiveButton.on("mouseleave", this.archiveButton.hideOverlay.bind(this)), this.addSignal(router.onRouteChanged, function() {
        this.isShown && router.lastRoute && ("map" === router.lastRoute.name && "archive" === router.currentRoute.name || "doc" === router.lastRoute.name && "archive" === router.currentRoute.name) && (this.hotspotToArchi
      }, this), this.archiveButton.on("click", function() {
        this.hotspotToArchive = true, router.go("archive"), this.archiveButton.hideOverlay.call(this);
      }.bind(this)), this.zoomCursor = zoomCursor.appendTo(this), this.on("mousemove", function(e2) {
        var x = that.mouseX = e2.clientX, y = that.mouseY = e2.clientY, windowWidth = that.width, windowHeight = that.height;
        zoomCursor.css({ left: x, top: y }), !that.zoomedIn && zoomCursor.isShown && (40 > x || 40 > y || x > windowWidth - 40 || y > windowHeight - 40) && zoomCursor.animateOut(), that.pan();
      }), this.pan = function(noTween) {
        var windowWidth = that.width, windowHeight = that.height, x = that.mouseX, y = that.mouseY;
        if (that.zoomedIn && !that.zooming) {
          var length, panX = -(x - windowWidth / 2) / (windowWidth / 2) * this.image.maxPanX, panY = -(y - windowHeight / 2) / (windowHeight / 2) * this.image.maxPanY;
          length = noTween ? 0 : 0.4, TweenMax2.to(that.image, length, { x: panX, y: panY, ease: Quad.easeOut });
        }
      }, this.zoomOut = function(_2, noTween) {
        function onComplete() {
          that.zoomedIn = false, that.resizeImage(that.nextImage), that.resizeImage(that.prevImage), TweenMax2.set([that.nextImage, that.prevImage], { x: 0, y: 0 }), that.zooming = false, TweenMax2.set([that.image, that.
        }
        var _this2 = this;
        if (this.zoomedIn && !this.zooming) {
          sound.tell("archiveZoomOut");
          var multiplier;
          multiplier = noTween ? 0 : 1;
          var windowAspect = that.width / that.height;
          that.zooming = true, unmoveUI(noTween), zoomCursor.plus(), showUI(), this.image.imageAspect > windowAspect ? TweenMax2.to(this.image, 0.5 * multiplier, { x: 0, y: 0, width: this.innerTint.width, height: "auto",
          {
            var isArchive = !this.model, isChapter = !!this.chapter;
            !(!this.model || this.chapter);
          }
          isArchive ? backButton.transform(function() {
            router.go("archive");
```

## wheel-step — FgXoRbHwNL/main.js L18952-18992 (hit L18967)
```js
            that.stage.addChild(label);
          }), that.stage.addChild(that.hotspotCursor), that.minimap = new pixi.DisplayObjectContainer(), that.minimap.interactive = true, that.minimap.mouseover = function() {
            that.minimap.hovered = true, clearTimeout(that.minimap.timeout), cursorShown = true, that.minimap.viewCircle.alpha = 0.6, sound.tell("genericBtnOver");
          }, that.minimap.mouseout = function() {
            that.minimap.hovered = false, that.minimap.timeout = setTimeout(function() {
              cursorShown = false;
            }, 1e3), miniMapControlled || (that.minimap.viewCircle.alpha = 0.44);
          }, that.minimap.mousedown = function() {
            gaEvent("Map", "MiniMapClick", "UseMiniMap"), miniMapControlled = true, that.tweenCamera(), that.on("mousemove", that.tweenCamera);
          }, that.minimap.position.x = that.camera.width - 148, that.minimap.position.y = that.camera.height - 143, that.stage.addChild(that.minimap), that.minimap.background = new pixi.Sprite(pixi.TextureCache["minimap.
          var viewCircleRadius = that.camera.width / that.bg.width * 73;
          that.minimap.dotsMask = new pixi.Graphics(), that.minimap.dotsMask.beginFill(), that.minimap.dotsMask.drawCircle(0, 0, viewCircleRadius), that.minimap.dotsMask.endFill(), that.minimap.dotsMask.position.x = that
        });
      }, loader.load(), this.on("mousemove", function(e2) {
        x = e2.clientX, y = e2.clientY;
      }), this.on("wheel", function(e2) {
        e2.deltaY > 0 ? that.zoomOut() : that.zoomIn();
      }), this.zoomOut(true);
    }
    return _inherits(Map2, _SpookyEl), _createClass(Map2, { zoomIn: { value: function(noTween) {
      if (this.zoomInButton.disabled !== true && this.loaded) {
        this.zoomInButton.disabled = true, this.zoomInButton.addClass("disabled"), TweenMax2.set([this.zoomInButton.minus, this.zoomInButton.plus], { "background-color": "#a77915", opacity: 0.3 });
        var multiplier = 1;
        noTween === true && (multiplier = 0), TweenMax2.to(this.blackBox, 0.5 * multiplier, { y: 50, ease: Expo.easeOut });
        var minScale = Math.max(window.innerWidth, window.innerHeight) / 2500 / 4, minZ = 4e3 - 1e3 / minScale;
        TweenMax2.fromTo(this.camera, 1.2 * multiplier, { z: minZ, x: 2500 * minScale * 2, y: 2500 * minScale * 2 }, { z: 0, delay: 0.4 * multiplier, onUpdate: function() {
          this.camera.x = this.camera.y = 125e4 / (4e3 - this.camera.z) * 4;
        }.bind(this), onComplete: function() {
          this.zoomOutButton.disabled = false, this.zoomOutButton.removeClass("disabled"), cursorShown = false, TweenMax2.set(this.zoomOutButton.minus, { "background-color": "#a77915" });
        }.bind(this), ease: Expo.easeOut }), TweenMax2.fromTo(this.mini, 0.6 * multiplier, { autoAlpha: 1 }, { autoAlpha: 0, scale: 1.5, onStart: function() {
          cursorShown = true;
        }.bind(this), transformOrigin: "52% 33.5%", ease: Expo.easeIn, onComplete: function() {
        }.bind(this) });
      }
    } }, zoomOut: { value: function(noTween) {
      if (this.zoomOutButton.disabled !== true && this.loaded) {
        this.zoomOutButton.disabled = true, this.zoomOutButton.addClass("disabled"), TweenMax2.set(this.zoomInButton.plus, { "background-color": "#a77915", opacity: 0.3 });
        var multiplier;
        multiplier = noTween === true ? 0 : 1, TweenMax2.to(this.blackBox, 0.5 * multiplier, { y: 0, ease: Expo.easeOut }), TweenMax2.fromTo(this.mini, 1 * multiplier, { autoAlpha: 0, scale: 1.3 }, { scale: 1, autoAlpha:
          cursorShown = true, this.zoomInButton.disabled = false, this.zoomInButton.removeClass("disabled"), TweenMax2.set([this.zoomInButton.plus, this.zoomInButton.minus], { "background-color": "#a77915", opacity: 1 })
        }.bind(this) });
```