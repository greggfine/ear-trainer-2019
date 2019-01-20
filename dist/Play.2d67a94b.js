// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"scripts/GainSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GainSlider = function GainSlider() {
  _classCallCheck(this, GainSlider);

  this.range = document.querySelector('#gain-slider');
};

var _default = new GainSlider();

exports.default = _default;
},{}],"scripts/Sound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GainSlider = _interopRequireDefault(require("./GainSlider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var audioCtx = new AudioContext();

var Sound =
/*#__PURE__*/
function () {
  function Sound() {
    var freq = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 440.0;
    var gainVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
    var oscType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sine';
    var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var stopTime = arguments.length > 4 ? arguments[4] : undefined;

    _classCallCheck(this, Sound);

    this.freq = freq;
    this.gainVal = gainVal;
    this.oscType = oscType;
    this.offset = offset;
    this.stopTime = stopTime;
  }

  _createClass(Sound, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.osc = audioCtx.createOscillator();
      this.amp = audioCtx.createGain();
      this.osc.type = this.oscType;
      this.osc.frequency.value = this.freq;
      this.osc.connect(this.amp);
      this.amp.connect(audioCtx.destination);
      this.timer = setInterval(function () {
        _this.amp.gain.value = _GainSlider.default.range.value;
      }, 50);
      this.playSound();
    }
  }, {
    key: "playSound",
    value: function playSound() {
      this.osc.start(audioCtx.currentTime + this.offset);
    }
  }, {
    key: "stopSound",
    value: function stopSound() {
      this.osc.stop(audioCtx.currentTime + this.stopTime);
      clearInterval(this.timer);
    }
  }]);

  return Sound;
}();

var _default = Sound;
exports.default = _default;
},{"./GainSlider":"scripts/GainSlider.js"}],"scripts/Waveform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Waveform =
/*#__PURE__*/
function () {
  function Waveform() {
    _classCallCheck(this, Waveform);

    this.btnGroup = document.querySelector('#btn-group');
    this.events();
  }

  _createClass(Waveform, [{
    key: "events",
    value: function events() {
      var _this = this;

      this.btnGroup.addEventListener('click', function (e) {
        return _this.selectWaveform(e.target.id);
      });
    }
  }, {
    key: "selectWaveform",
    value: function selectWaveform(waveformId) {
      this.oscType = waveformId;
    }
  }]);

  return Waveform;
}();

var _default = new Waveform();

exports.default = _default;
},{}],"scripts/FrequencySelector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FrequencySelector =
/*#__PURE__*/
function () {
  function FrequencySelector() {
    _classCallCheck(this, FrequencySelector);

    this.startingFreqSelector = document.querySelector('#starting-freq-selector');
    this.events();
  }

  _createClass(FrequencySelector, [{
    key: "events",
    value: function events() {
      var _this = this;

      this.startingFreqSelector.addEventListener('change', function (e) {
        return _this.setStartingFreq(e.target.value);
      });
    }
  }, {
    key: "setStartingFreq",
    value: function setStartingFreq(startingFreqVal) {
      this.freq = startingFreqVal;
    }
  }]);

  return FrequencySelector;
}();

var _default = new FrequencySelector();

exports.default = _default;
},{}],"FrequencyMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// const frequencyMap = { 
//     "c3": 130.81, 
//     "d3": 146.83, 
//     "e3": 164.81, 
//     "f3": 174.61, 
//     "g3": 196.0, 
//     "a3": 220.0, 
//     "b3": 246.94, 
//     "c4": 261.63, 
//     "c#4": 277.18, 
//     "d4": 293.66, 
//     "d#4": 311.13, 
//     "e4": 329.63, 
//     "f4": 349.23, 
//     "f#4": 185.0, 
//     "g4": 392.0, 
//     "g#4": 207.65, 
//     "a4": 440.0, 
//     "a#4": 466.16, 
//     "b4": 493.88, 
//     "c5": 523.25 };
// export default frequencyMap;
var frequencyArr = [130.81, 146.83, 164.81, 174.61, 196.0, 220.0, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 185.0, 392.0, 207.65, 440.0, 466.16, 493.88, 523.25];
var _default = frequencyArr;
exports.default = _default;
},{}],"scripts/RandomFrequency.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FrequencyMap = _interopRequireDefault(require("../FrequencyMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RandomFrequency = function RandomFrequency() {
  _classCallCheck(this, RandomFrequency);

  this.freq = _FrequencyMap.default[Math.floor(Math.random() * _FrequencyMap.default.length)];
};

var _default = RandomFrequency;
exports.default = _default;
},{"../FrequencyMap":"FrequencyMap.js"}],"scripts/Guesses.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RandomFrequency = _interopRequireDefault(require("./RandomFrequency"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Guesses =
/*#__PURE__*/
function () {
  function Guesses() {
    _classCallCheck(this, Guesses);

    this.guesses = document.querySelector('#guesses');
    this.events();
  }

  _createClass(Guesses, [{
    key: "events",
    value: function events() {
      var li = document.createElement('li');
      li.textContent = 'yo';
      li.className = 'list-group-item';
      this.guesses.appendChild(li);
    }
  }]);

  return Guesses;
}();

var _default = new Guesses();

exports.default = _default;
},{"./RandomFrequency":"scripts/RandomFrequency.js"}],"scripts/Play.js":[function(require,module,exports) {
"use strict";

var _Sound = _interopRequireDefault(require("./Sound"));

var _Waveform = _interopRequireDefault(require("./Waveform"));

var _FrequencySelector = _interopRequireDefault(require("./FrequencySelector"));

var _RandomFrequency = _interopRequireDefault(require("./RandomFrequency"));

var _Guesses = _interopRequireDefault(require("./Guesses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Play =
/*#__PURE__*/
function () {
  function Play(startingFreq, waveform, offset, RandomFreq) {
    _classCallCheck(this, Play);

    this.playBtn = document.querySelector('#play-btn');
    this.events();
    this.sound = false;
    this.initialFreq = startingFreq;
    this.waveform = waveform;
    this.offset = offset;
    this.randFreq = RandomFreq;
  }

  _createClass(Play, [{
    key: "events",
    value: function events() {
      var _this = this;

      this.playBtn.addEventListener('click', function () {
        return _this.playSound();
      });
    }
  }, {
    key: "playSound",
    value: function playSound() {
      if (!this.sound) {
        var randFreq = new this.randFreq();
        this.sound = new _Sound.default(this.initialFreq.freq, 0.5, this.waveform.oscType, this.offset, 1);
        this.sound.init();
        this.sound.stopSound();
        this.sound2 = new _Sound.default(randFreq.freq, 0.5, this.waveform.oscType, 2, 3);
        this.sound2.init();
        this.sound2.stopSound();
        this.sound = false;
        this.playBtn.textContent = 'Listen';
        this.playBtn.classList.toggle('btn-danger');
      }
    }
  }]);

  return Play;
}(); // 


var play1 = new Play(_FrequencySelector.default, _Waveform.default, 0, _RandomFrequency.default);
},{"./Sound":"scripts/Sound.js","./Waveform":"scripts/Waveform.js","./FrequencySelector":"scripts/FrequencySelector.js","./RandomFrequency":"scripts/RandomFrequency.js","./Guesses":"scripts/Guesses.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52116" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/Play.js"], null)
//# sourceMappingURL=/Play.2d67a94b.map