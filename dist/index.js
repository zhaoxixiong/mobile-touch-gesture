'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * mobile touch gesture 1.0.2
 * https://github.com/zhaoxixiong/mobile-touch-gesture
 * Copyright (C) 2019 http://yunkus.com/ - a project by zhaoxixiong
 */
; (function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.MobileTouchGesture = factory();
})(this, function () {
  "use strict";
  // const VERSION = "1.0.2"

  function noop() { }
  var cbs = ['swiperStart', 'swiperMove', 'tap', 'doubleTap', 'longTap', 'swiperUp', 'swiperDown', 'swiperLeft', 'swiperRight', 'swiperUpDown', 'swiperUpRight', 'swiperUpLeft', 'swiperDownUp', 'swiperDownRight', 'swiperDownLeft', 'swiperLeftRight', 'swiperLeftUp', 'swiperLeftDown', 'swiperRightLeft', 'swiperRightUp', 'swiperRightDown'];
  var ICONS = {
    UP: '<svg t="1574998974491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5367" width="36" height="36"><path d="M553.173333 803.84h-64l0.021334-474.581333-224.021334 224-45.269333-45.226667L521.6 206.293333l301.717333 301.696-45.269333 45.269334-224.853333-224.896v475.477333z" p-id="5368" fill="#ffffff"></path></svg>',
    DOWN: '<svg t="1574998875412" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5214" width="36" height="36"><path d="M553.173333 238.314667h-64l0.021334 474.602666-224.021334-224-45.269333 45.226667L521.6 835.861333l301.717333-301.717333-45.269333-45.226667-224.853333 224.853334V238.336z" p-id="5215" fill="#ffffff"></path></svg>',
    LEFT: '<svg t="1574999027145" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5673" width="36" height="36"><path d="M783.872 542.122667l-0.042667-64.405334-477.610666-0.298666 225.28-225.322667-45.568-45.568L182.506667 509.952l303.829333 303.829333 45.525333-45.504-226.474666-226.453333 478.506666 0.298667z" p-id="5674" fill="#ffffff"></path></svg>',
    RIGHT: '<svg t="1574999005356" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5520" width="36" height="36"><path d="M214.677333 542.122667l0.042667-64.405334 477.653333-0.298666-225.301333-225.322667 45.568-45.568 303.424 303.424L512.213333 813.781333l-45.504-45.504 226.453334-226.453333-478.485334 0.298667z" p-id="5521" fill="#ffffff"></path></svg>'
  };
  var tipsMaps = {
    1: {
      1: {
        name: 'Up',
        text: '',
        icon: ICONS.UP
      },
      2: {
        name: 'Right',
        text: '',
        icon: ICONS.RIGHT
      },
      3: {
        name: 'Left',
        text: '',
        icon: ICONS.LEFT
      },
      4: {
        name: 'Down',
        text: '',
        icon: ICONS.DOWN
      }
    },
    2: {
      14: {
        name: 'UpDown',
        text: '',
        icon: ICONS.UP + ICONS.DOWN
      },
      12: {
        name: 'UpRight',
        text: '',
        icon: ICONS.UP + ICONS.RIGHT
      },
      13: {
        name: 'UpLeft',
        text: '',
        icon: ICONS.UP + ICONS.LEFT
      },
      23: {
        name: 'RightLeft',
        text: '',
        icon: ICONS.RIGHT + ICONS.LEFT
      },
      21: {
        name: 'RightUp',
        text: '',
        icon: ICONS.RIGHT + ICONS.UP
      },
      24: {
        name: 'RightDown',
        text: '',
        icon: ICONS.RIGHT + ICONS.DOWN
      },
      32: {
        name: 'LeftRight',
        text: '',
        icon: ICONS.LEFT + ICONS.RIGHT
      },
      31: {
        name: 'LeftUp',
        text: '',
        icon: ICONS.LEFT + ICONS.UP
      },
      34: {
        name: 'LeftDown',
        text: '',
        icon: ICONS.LEFT + ICONS.DOWN
      },
      41: {
        name: 'DownUp',
        text: '',
        icon: ICONS.DOWN + ICONS.UP
      },
      42: {
        name: 'DownRight',
        text: '',
        icon: ICONS.DOWN + ICONS.RIGHT
      },
      43: {
        name: 'DownLeft',
        text: '',
        icon: ICONS.DOWN + ICONS.LEFT
      }
    }
  };
  function isNumber(val) {
    return typeof val === 'number';
  }
  return function () {
    function MobileTouchGesture(el, options) {
      _classCallCheck(this, MobileTouchGesture);

      this.el = el;
      this.options = options;
      // if not set function, use default function
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = cbs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cb = _step.value;

          if (!this.options[cb]) {
            this.options[cb] = noop;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!isNumber(this.options.doubleTapTime)) {
        this.options.doubleTapTime = 200;
      }
      if (!isNumber(this.options.longTapTime)) {
        this.options.longTapTime = 200;
      }
      this.startTime = 0;
      this.lastTime = 0;
      this.tapTimer = null;
      this.longTapTimer = null;
      this.lastChange = null;
      this.el.addEventListener('touchstart', this.start.bind(this));
      this.el.addEventListener('touchmove', this.move.bind(this));
      this.el.addEventListener('touchend', this.end.bind(this));
      // operation area
      this.winSize = {
        x: document.documentElement.clientWidth || document.body.clientWidth,
        y: document.documentElement.clientHeight || document.body.clientHeight
      };
      this.touchFingers = [];
      this.isOneFinger = true;
      this.isLongTap = false;
      this.isMove = false;
      this.options.effectiveValue = this.options.effectiveValue || 15; // effective value
      // operation area set
      this.gestures = {
        axios: [],
        oldPoint: [0, 0] // record last point
      };
      this.lastAxios = {};
      this.type = 0;
      this.direction = '';
      this.len = 0;
      this.options.prompt = Object.assign({ show: true, nameMap: {} }, options.prompt);
      this.options.prompt.nameMap.invalid = this.options.prompt.nameMap.invalid || 'invalid gesture';
      if (this.options.prompt.show) {
        this.tips = null;
        this.tipStyle = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);padding:6px;border-radius:4px;color:#fff;text-align:center;z-index:1991;transition:0.5s;";
        // init tips
        for (var key in tipsMaps) {
          for (var iKey in tipsMaps[key]) {
            var item = tipsMaps[key][iKey];
            item.text = this.options.prompt.nameMap['swiper' + item.name] || item.name;
          }
        }
      }
    }

    _createClass(MobileTouchGesture, [{
      key: 'start',
      value: function start(e) {
        var _this = this;

        this.startTime = Date.now();
        clearTimeout(this.tapTimer);
        this.longTapTimer = setTimeout(function () {
          clearTimeout(_this.tapTimer);
          clearTimeout(_this.longTapTimer);
          _this.isLongTap = true;
          _this.options.longTap(e);
        }, this.options.longTapTime);
        // this.touchFingers = e.changedTouches
        // if one finger or not
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = e.changedTouches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var ct = _step2.value;

            this.touchFingers.push({
              pageX: Math.round(ct.pageX),
              pageY: Math.round(ct.pageY)
            });
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.isOneFinger = this.touchFingers && this.touchFingers.length === 1;
        this.options.swiperStart(this.touchFingers[0]);
        this.gestures.oldPoint = [this.touchFingers[0].pageX, this.touchFingers[0].pageY];
      }
    }, {
      key: 'move',
      value: function move(e) {
        clearTimeout(this.longTapTimer);
        this.isMove = true;
        if (this.gestures.axios.length > 2) {
          this.showTip({ icon: '', text: this.options.prompt.nameMap.invalid });
          return;
        }
        var touche = e.changedTouches[0];
        var _touchFingers$ = this.touchFingers[0],
          pageX = _touchFingers$.pageX,
          pageY = _touchFingers$.pageY;

        var currentPoint = [touche.pageX, touche.pageY];
        var dis = {
          x: Math.round(currentPoint[0] - pageX),
          y: Math.round(currentPoint[1] - pageY)
        };
        var oldPoint = this.gestures.oldPoint;

        this.len = this.gestures.axios.length;
        var directionX = dis.x > 0 ? 2 : 3;
        var directionY = dis.y > 0 ? 4 : 1;
        if (!this.len) {
          // confirm first direction
          if (Math.abs(dis.x) > this.options.effectiveValue) {
            this.gestures.axios.push({
              type: 0, // x axios
              direction: directionX,
              icons: directionX,
              startPoint: [pageX, pageY],
              trigger: true // had triggered or not，fist direction default value is true
            });
          } else if (Math.abs(dis.y) > this.options.effectiveValue) {
            this.gestures.axios.push({
              type: 1, // y axios
              direction: directionY,
              icons: directionY,
              startPoint: [pageX, pageY],
              trigger: true // had triggered or not
            });
          }
          this.updateDate();
        } else {
          var opposeType = 1 - this.type;
          var mdX = currentPoint[this.type] - oldPoint[this.type];
          var mdY = currentPoint[opposeType] - oldPoint[opposeType];
          if (Math.abs(mdX) < Math.abs(mdY)) {
            if (this.lastAxios.trigger) {
              this.gestures.axios.push({
                type: opposeType,
                direction: opposeType ? mdY > 0 ? 4 : 1 : mdX > 0 ? 2 : 3,
                icons: this.direction + '' + (mdY > 0 ? opposeType ? 4 : 2 : opposeType ? 1 : 3),
                startPoint: [].concat(_toConsumableArray(oldPoint)),
                trigger: false
              });
            } else {
              this.gestures.axios.splice(this.gestures.axios.length - 1, 1);
            }
            this.updateDate();
          }
          var result = this.direction % 2 === 0 ? oldPoint[this.type] - currentPoint[this.type] : currentPoint[this.type] - oldPoint[this.type];
          if (result > 0) {
            // if direction change
            if (this.lastAxios.trigger) {
              this.gestures.axios.push({
                type: this.type,
                direction: 5 - this.direction,
                icons: this.direction + '' + (5 - this.direction),
                startPoint: [].concat(_toConsumableArray(oldPoint)),
                trigger: false
              });
            } else {
              this.gestures.axios.splice(this.gestures.axios.length - 1, 1);
            }
            this.updateDate();
          }
          if (!this.lastAxios.trigger) {
            if (Math.abs(currentPoint[this.type] - this.lastAxios.startPoint[this.type]) > this.options.effectiveValue) {
              this.lastAxios.trigger = true;
            }
          }
        }
        this.len && this.len < 3 && this.lastAxios && this.lastAxios.trigger && this.showTip(tipsMaps[this.len][this.lastAxios.icons]);
        // use this function to do more complex situation
        // disX x axios move direction，disY y axios move direction，current touch point
        this.options.swiperMove({ x: dis.x, y: dis.y }, { pageX: Math.round(touche.pageX), pageY: Math.round(touche.pageY) });
        this.gestures.oldPoint = currentPoint;
      }
    }, {
      key: 'end',
      value: function end(e) {
        var _this2 = this;

        if (this.isOneFinger) {
          this.lastChange = null;
          if (this.tips) {
            this.tips.style = this.tipStyle + "display:none";
          }
          this.tapTimer = setTimeout(function () {
            _this2.options.tap(e);
          }, this.options.doubleTapTime);
          // clear timeout
          clearTimeout(this.longTapTimer);
          // if move，clear tapTimer Timeout
          if (this.isMove) {
            clearTimeout(this.tapTimer);
            this.isMove = false;
          }
          // if long press, clear tapTimer timeout
          if (this.isLongTap) {
            clearTimeout(this.tapTimer);
            this.isLongTap = false;
            return;
          }
          var t = this.startTime - this.lastTime;
          this.lastTime = this.startTime;
          if (0 < t && t < this.options.doubleTapTime) {
            clearTimeout(this.tapTimer);
            this.options.doubleTap(e);
          }
        }
        if (this.len && this.len < 3) {
          this.options['swiper' + tipsMaps[this.len][this.lastAxios.icons].name]();
        }
        // clear gesture data
        this.touchFingers = [];
        this.gestures.axios = [];
        this.lastAxios = [];
        this.len = 0;
        this.type = 0;
        this.direction = '';
      }
    }, {
      key: 'updateDate',
      value: function updateDate() {
        this.len = this.gestures.axios.length;
        this.lastAxios = this.gestures.axios[this.len - 1] || {};
        this.type = this.lastAxios.type;
        this.direction = this.lastAxios.direction;
      }
    }, {
      key: 'showTip',
      value: function showTip(tip) {
        if (!this.options.prompt || !this.options.prompt.show) {
          return;
        }
        // if tips not exist, create it
        if (!this.tips) {
          var tipsBox = document.createElement('div');
          tipsBox.style = this.tipStyle;
          tipsBox.id = "gesture-tips";
          var _body = document.querySelector("body");
          _body.append(tipsBox);
          this.tips = document.querySelector("#gesture-tips");
        } else {
          // change text and style only
          this.tips.style = this.tipStyle + "display:block";
        }
        this.tips.innerHTML = tip.icon + '<div style="fontSize:12px;">' + tip.text + '</div>';
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.tapTimer && clearTimeout(this.tapTimer);
        this.longTapTimer && clearTimeout(this.longTapTimer);
        this.el.removeEventListener('touchstart', this.start.bind(this));
        this.el.removeEventListener('touchmove', this.move.bind(this));
        this.el.removeEventListener('touchend', this.end.bind(this));
      }
    }]);

    return MobileTouchGesture;
  }();
});