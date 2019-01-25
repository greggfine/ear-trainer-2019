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
})({10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var audioCtx = new AudioContext();

var Sound = function () {
    function Sound() {
        var freq = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 261.63;
        var gainVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
        var oscType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sine';
        var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var stopTime = arguments[4];

        _classCallCheck(this, Sound);

        this.freq = freq;
        this.gainVal = gainVal;
        this.oscType = oscType;
        this.offset = offset;
        this.stopTime = stopTime;
    }

    _createClass(Sound, [{
        key: 'init',
        value: function init() {
            this.osc = audioCtx.createOscillator();
            this.amp = audioCtx.createGain();
            this.osc.type = this.oscType;
            this.osc.frequency.value = this.freq;
            this.amp.gain.value = this.gainVal;
            this.osc.connect(this.amp);
            this.amp.connect(audioCtx.destination);
            this.playSound();
        }
    }, {
        key: 'playSound',
        value: function playSound() {
            //  this.amp.gain.setValueAtTime(1, audioCtx.currentTime);
            this.osc.start(audioCtx.currentTime + this.offset);
        }
    }, {
        key: 'stopSound',
        value: function stopSound() {
            // this.amp.gain.exponentialRampToValueAtTime(0.500, audioCtx.currentTime + this.stopTime);
            this.osc.stop(audioCtx.currentTime + this.stopTime);
        }
    }]);

    return Sound;
}();

exports.default = Sound;
},{}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Waveform = function () {
    function Waveform() {
        _classCallCheck(this, Waveform);

        this.btnGroup = document.querySelector('#btn-group');
        this.events();
    }

    _createClass(Waveform, [{
        key: 'events',
        value: function events() {
            var _this = this;

            this.btnGroup.addEventListener('click', function (e) {
                return _this.selectWaveform(e.target.id);
            });
        }
    }, {
        key: 'selectWaveform',
        value: function selectWaveform(waveformId) {
            this.oscType = waveformId;
        }
    }]);

    return Waveform;
}();

exports.default = new Waveform();
},{}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrequencySelector = function () {
    function FrequencySelector() {
        _classCallCheck(this, FrequencySelector);

        this.startingFreqSelector = document.querySelector('#starting-freq-selector');
        this.events();
    }

    _createClass(FrequencySelector, [{
        key: 'events',
        value: function events() {
            var _this = this;

            this.startingFreqSelector.addEventListener('change', function (e) {
                return _this.setStartingFreq(e.target.value);
            });
        }
    }, {
        key: 'setStartingFreq',
        value: function setStartingFreq(startingFreqVal) {
            this.freq = startingFreqVal;
        }
    }]);

    return FrequencySelector;
}();

exports.default = new FrequencySelector();
},{}],26:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// const frequencyArr = [
//     261.63, 
//     293.66, 
//     329.63, 
//     349.23, 
//     392.0, 
//     440.0, 
//     493.88, 
//     523.25
// ]

// export default frequencyArr;


// ==================================================================================


// const frequencyArrEasy = [
//     261.63,
//     293.66,
//     329.63,
// ]

// const frequencyArrHard = [
//     261.63,
//     293.66,
//     329.63,
//     349.23,
//     392.0,
//     440.0,
//     493.88,
//     523.25
// ]

var frequencyMap = {
    frequencyArrEasy: [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25],
    frequencyArrHard: [261.63, 277.183, 293.66, 311.127, 329.63, 349.23, 369.994, 392.0, 415.305, 440.0, 466.164, 493.88, 523.25]
};

exports.default = frequencyMap;
},{}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _FrequencyMap = require('../FrequencyMap');

var _FrequencyMap2 = _interopRequireDefault(_FrequencyMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import frequencyArr from '../FrequencyMap';

// class RandomFrequency {
//     constructor(){
//         this.freq = frequencyArr[Math.floor(Math.random() * frequencyArr.length) ]
//     }
// }

// export default RandomFrequency;


// ========================================

var mode = document.querySelector('#mode');

var RandomFrequency = function RandomFrequency() {
    _classCallCheck(this, RandomFrequency);

    if (mode.value === 'easy') {
        this.freq = _FrequencyMap2.default.frequencyArrEasy[Math.floor(Math.random() * _FrequencyMap2.default.frequencyArrEasy.length)];
    } else {
        this.freq = _FrequencyMap2.default.frequencyArrHard[Math.floor(Math.random() * _FrequencyMap2.default.frequencyArrHard.length)];
    }
};

exports.default = RandomFrequency;
},{"../FrequencyMap":26}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _RandomFrequency = require('./RandomFrequency');

var _RandomFrequency2 = _interopRequireDefault(_RandomFrequency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Guesses = function Guesses(randFreq) {
    var _this = this;

    _classCallCheck(this, Guesses);

    this.guessBtns = document.querySelectorAll('.guess');
    this.randFreq = randFreq;
    var guessBtnArr = Array.from(this.guessBtns);
    var correctAnswer = guessBtnArr.filter(function (guessBtn) {
        return Number(guessBtn.dataset.freq) === _this.randFreq.freq;
    });
    this.correctAnswer = correctAnswer;
};

exports.default = Guesses;
},{"./RandomFrequency":13}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sound = require('./Sound');

var _Sound2 = _interopRequireDefault(_Sound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mode = document.querySelector('#mode');

var correct;
var correctScoreStatus = 0;
var wrongScoreStatus = 0;
var chance = 0;
var answerOscType;
var answerGainVal;

function respondToUser(freq) {
    var sound = new _Sound2.default(freq, answerGainVal.range.value, answerOscType, 0, 1);
    sound.init();
    sound.stopSound();
}

var answerDisplay = document.querySelector('#answer-display');
var correctScore = document.querySelector('#correct-score');
var wrongScore = document.querySelector('#wrong-score');
var chanceDisplay = document.querySelector('#chance');
var resultMessage = document.querySelector('#result-message');
var playBtn = document.querySelector('#play-btn');
var playAgain = document.querySelector('#play-again');

var UserAnswer = function () {
    function UserAnswer(correctAnswer, gainVal, oscType) {
        _classCallCheck(this, UserAnswer);

        correct = correctAnswer;
        this.btnGroup = document.querySelector('#guesses');
        this.btnGroup2 = document.querySelector('#guesses2');
        this.gainVal = gainVal;
        this.oscType = oscType;
        answerOscType = oscType;
        answerGainVal = gainVal;
        this.answered();
    }

    _createClass(UserAnswer, [{
        key: 'answered',
        value: function answered() {
            this.btnGroup.addEventListener('click', this.run);
            this.btnGroup2.addEventListener('click', this.run);
        }
    }, {
        key: 'run',
        value: function run(e) {
            e.target.parentElement.childNodes.forEach(function (child) {
                child.disabled = true;
            });

            if (chance === 2 && +e.target.dataset.freq === +correct[0].dataset.freq) {
                respondToUser(+e.target.dataset.freq);
                chance = 0;
                correctScore.textContent = ++correctScoreStatus;
                resultMessage.textContent = 'You got ' + correctScoreStatus + ' correct!';
                chanceDisplay.textContent = '';
                playBtn.disabled = true;
                var btn = document.createElement('button');
                btn.textContent = 'Play Again?';
                btn.classList = 'btn btn-info';
                btn.addEventListener('click', function () {
                    // CALL A 'RESET' FUNCTION HERE INSTEAD
                    playBtn.disabled = false;
                    correctScoreStatus = 0;
                    wrongScoreStatus = 0;
                    correctScore.textContent = '';
                    wrongScore.textContent = '';
                    resultMessage.textContent = '';
                    chance = 0;
                    this.parentElement.removeChild(btn);
                    setTimeout(function () {
                        playBtn.disabled = false;
                        mode.disabled = false;
                    }, 500);
                });
                playAgain.appendChild(btn);

                return;
            } else if (chance === 2 && +e.target.dataset.freq !== +correct[0].dataset.freq) {
                respondToUser(+e.target.dataset.freq);
                chance = 0;
                wrongScore.textContent = ++wrongScoreStatus;
                resultMessage.textContent = 'You got ' + correctScoreStatus + ' correct!';
                chanceDisplay.textContent = '';
                playBtn.disabled = true;
                var btn = document.createElement('button');
                btn.textContent = 'Play Again?';
                btn.classList = 'btn btn-info';
                btn.addEventListener('click', function () {
                    playBtn.disabled = false;
                    correctScoreStatus = 0;
                    wrongScoreStatus = 0;
                    correctScore.textContent = '';
                    wrongScore.textContent = '';
                    resultMessage.textContent = '';
                    chance = 0;
                    this.parentElement.removeChild(btn);
                    setTimeout(function () {
                        playBtn.disabled = false;
                        mode.disabled = false;
                    }, 500);
                });
                playAgain.appendChild(btn);
                return;
            } else if (+e.target.dataset.freq === +correct[0].dataset.freq) {
                respondToUser(+e.target.dataset.freq);
                chance += 1;
                correctScore.textContent = ++correctScoreStatus;
                setTimeout(function () {
                    playBtn.disabled = false;
                }, 500);
            } else {
                respondToUser(+e.target.dataset.freq);
                wrongScore.textContent = ++wrongScoreStatus;
                chance += 1;
                setTimeout(function () {
                    playBtn.disabled = false;
                }, 500);
            }
        }
    }]);

    return UserAnswer;
}();

exports.default = UserAnswer;
},{"./Sound":10}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GainSlider = function GainSlider() {
    _classCallCheck(this, GainSlider);

    this.range = document.querySelector('#gain-slider');
};

exports.default = GainSlider;
},{}],31:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mode = document.querySelector('#mode');
var visibleEasy = document.querySelector('.visible-easy');
var visibleHard = document.querySelector('.visible-hard');
visibleEasy.classList.add('easy');
mode.addEventListener('change', function (e) {
    if (e.target.value === 'easy') {
        mode.disabled = true;
        visibleEasy.classList.toggle('easy');
        visibleHard.classList.toggle('hard');
    } else {
        mode.disabled = true;
        visibleEasy.classList.toggle('easy');
        visibleHard.classList.toggle('hard');
    }
});

exports.default = mode;
},{}],6:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sound = require('./Sound');

var _Sound2 = _interopRequireDefault(_Sound);

var _Waveform = require('./Waveform');

var _Waveform2 = _interopRequireDefault(_Waveform);

var _FrequencySelector = require('./FrequencySelector');

var _FrequencySelector2 = _interopRequireDefault(_FrequencySelector);

var _RandomFrequency = require('./RandomFrequency');

var _RandomFrequency2 = _interopRequireDefault(_RandomFrequency);

var _Guesses = require('./Guesses');

var _Guesses2 = _interopRequireDefault(_Guesses);

var _UserAnswer = require('./UserAnswer');

var _UserAnswer2 = _interopRequireDefault(_UserAnswer);

var _GainSlider = require('./GainSlider');

var _GainSlider2 = _interopRequireDefault(_GainSlider);

var _Mode = require('./Mode');

var _Mode2 = _interopRequireDefault(_Mode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log(mode.value);
var answerDisplay = document.querySelector('#answer-display');
var chance = 0;
var chanceDisplay = document.querySelector('#chance');
var playAgain = document.querySelector('#play-again');
var guessBtns = document.querySelectorAll('.guess');
Array.from(guessBtns).forEach(function (btn) {
    btn.disabled = true;
});

var Play = function () {
    function Play(startingFreq, waveform, offset, RandomFreq, GainSlider) {
        _classCallCheck(this, Play);

        this.playBtn = document.querySelector('#play-btn');
        this.sound = false;
        this.initialFreq = startingFreq;
        this.waveform = waveform;
        this.offset = offset;
        this.randFreq = RandomFreq;
        this.gainVal = GainSlider;
        this.events();
    }

    _createClass(Play, [{
        key: 'events',
        value: function events() {
            var _this = this;

            this.playBtn.addEventListener('click', function () {
                return _this.playSound();
            });
        }
    }, {
        key: 'playSound',
        value: function playSound() {
            var _this2 = this;

            mode.disabled = true;

            Array.from(guessBtns).forEach(function (btn) {
                btn.disabled = true;
            });
            if (chance === 3) {
                // playAgain.removeChild(button)
                // console.log(playAgain)
                chance = 0;
            }
            if (!this.sound) {
                answerDisplay.textContent = '';
                var randFreq = new this.randFreq();
                var gainVal = new this.gainVal();
                var guesses = new _Guesses2.default(randFreq);
                var userAnswer = new _UserAnswer2.default(guesses.correctAnswer, gainVal, this.waveform.oscType);
                chance += 1;
                chanceDisplay.textContent = chance + ' of 3 chances';

                this.sound = new _Sound2.default(this.initialFreq.freq, gainVal.range.value, this.waveform.oscType, this.offset, 1);
                this.sound.init();
                this.sound.stopSound();

                this.sound2 = new _Sound2.default(randFreq.freq, gainVal.range.value, this.waveform.oscType, 2, 3);
                this.sound2.init();
                this.sound2.stopSound();

                this.playBtn.textContent = 'Listen...';
                this.playBtn.classList.toggle('btn-danger');

                setTimeout(function () {
                    _this2.playBtn.textContent = 'Play';
                    _this2.playBtn.classList.toggle('btn-danger');
                    _this2.playBtn.disabled = true;
                    _this2.sound = false;
                    Array.from(guessBtns).forEach(function (btn) {
                        btn.disabled = false;
                    });
                }, 3300);
            }
        }
    }]);

    return Play;
}();

var play1 = new Play(_FrequencySelector2.default, _Waveform2.default, 0, _RandomFrequency2.default, _GainSlider2.default);
},{"./Sound":10,"./Waveform":12,"./FrequencySelector":11,"./RandomFrequency":13,"./Guesses":14,"./UserAnswer":15,"./GainSlider":16,"./Mode":31}],28:[function(require,module,exports) {
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
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59490' + '/');
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
        parents.push(+k);
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
},{}]},{},[28,6], null)
//# sourceMappingURL=/Play.4b5f8be1.map