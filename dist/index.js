'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * mobile touch gesture 1.0.0
 * https://github.com/zhaoxixiong/mobile-touch-gesture
 * Copyright (C) 2019 http://yunkus.com/ - a project by zhaoxixiong
 */
; (function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.MobileTouchGesture = factory();
})(this, function () {
  "use strict";

  var VERSION = "1.0.0";
  function noop() { }
  var cbs = ['swiper', 'swiperStart', 'swiperMove', 'swiperUp', 'swiperRight', 'swiperDown', 'swiperLeft', 'tab', 'doubleTap', 'longTab'];
  function isNumber(val) {
    return typeof val === 'number';
  }
  return function () {
    // static version = VERSION
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

      var len = this.options.touchArea.length;
      if (!this.options.touchArea || !len) {
        this.options.touchArea = [];
      } else {
        if (len === 0 || len === 1) {
          this.options.touchArea = new Array(4).fill(this.options.touchArea[0]);
        } else if (len === 2) {
          var _options$touchArea = _slicedToArray(this.options.touchArea, 2),
            a = _options$touchArea[0],
            b = _options$touchArea[1];

          this.options.touchArea = [a, b, a, b];
        }
      }
      if (!isNumber(this.options.doubleTapTime)) {
        this.options.doubleTapTime = 200;
      }
      if (!isNumber(this.options.longTapTime)) {
        this.options.longTapTime = 200;
      }
      this.page = [];
      this.startTime = 0;
      this.lastTime = 0;
      this.tapTimer = null;
      this.longTapTimer = null;
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
      this.trigger = {
        x: true,
        y: true
        // operation area set
      };
      var _options$touchArea2 = _slicedToArray(this.options.touchArea, 4),
        top = _options$touchArea2[0],
        right = _options$touchArea2[1],
        bottom = _options$touchArea2[2],
        left = _options$touchArea2[3];

      this.unTriggerResponseArea = {
        top: top,
        right: this.winSize.x - right,
        bottom: this.winSize.y - bottom,
        left: left
      };
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

        this.touchFingers = e.changedTouches;
        // if one finger or not
        this.isOneFinger = this.touchFingers && this.touchFingers.length === 1;
        this.page = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.touchFingers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var fg = _step2.value;

            this.page.push({
              pageX: fg.pageX,
              pageY: fg.pageY
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

        var _page$ = this.page[0],
          pageX = _page$.pageX,
          pageY = _page$.pageY;

        if (this.options.touchArea.reduce(function (total, value) {
          return total + Math.abs(value);
        }) === 0) {
          // not restrict
          this.trigger = {
            x: true,
            y: true
          };
        } else {
          // trigger area
          this.trigger = {
            x: pageX < this.unTriggerResponseArea.left || pageX > this.unTriggerResponseArea.right,
            y: pageY < this.unTriggerResponseArea.top || pageY > this.unTriggerResponseArea.bottom
          };
        }
        this.options.swiperStart(this.page[0]);
      }
    }, {
      key: 'move',
      value: function move(e) {
        clearTimeout(this.longTapTimer);
        this.isMove = true;
        var _page$2 = this.page[0],
          pageX = _page$2.pageX,
          pageY = _page$2.pageY;

        var touche = e.changedTouches[0];
        var disX = Math.round(touche.pageX - pageX);
        var disY = Math.round(touche.pageY - pageY);
        if (this.trigger.y) {
          if (disY > 0) {
            this.options.swiperDown(Math.abs(disY));
          } else if (disY < 0) {
            this.options.swiperUp(Math.abs(disY));
          }
        }
        if (this.trigger.x) {
          if (disX > 0) {
            this.options.swiperRight(Math.abs(disX));
          } else if (disX < 0) {
            this.options.swiperLeft(Math.abs(disX));
          }
        }
        // use this function to do more complex situation
        // disX x axios move direction，disY y axios move direction，this.page[0] touchstart touch point
        this.options.swiperMove({ x: disX, y: disY }, this.page[0]);
      }
    }, {
      key: 'end',
      value: function end(e) {
        var _this2 = this;

        if (this.isOneFinger) {
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