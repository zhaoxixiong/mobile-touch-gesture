/*
 * mobile touch gesture 1.0.0
 * https://github.com/zhaoxixiong/mobile-touch-gesture
 * Copyright (C) 2019 http://yunkus.com/ - a project by zhaoxixiong
 */
; (function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      global.MobileTouchGesture = factory()
}(this, (function () {
  "use strict";
  const VERSION = "1.0.0"
  function noop() { }
  const cbs = [
    'swiper', 'swiperStart', 'swiperMove',
    'swiperUp', 'swiperRight', 'swiperDown', 'swiperLeft',
    'tab', 'doubleTap', 'longTab'
  ]
  function isNumber(val) {
    return typeof val === 'number'
  }
  return class MobileTouchGesture {
    // static version = VERSION
    constructor(el, options) {
      this.el = el
      this.options = options
      // if not set function, use default function
      for (let cb of cbs) {
        if (!this.options[cb]) {
          this.options[cb] = noop
        }
      }
      const len = this.options.touchArea.length
      if (!this.options.touchArea || !len) {
        this.options.touchArea = []
      } else {
        if (len === 0 || len === 1) {
          this.options.touchArea = new Array(4).fill(this.options.touchArea[0])
        } else if (len === 2) {
          const [a, b] = this.options.touchArea
          this.options.touchArea = [a, b, a, b]
        }
      }
      if (!isNumber(this.options.doubleTapTime)) {
        this.options.doubleTapTime = 200
      }
      if (!isNumber(this.options.longTapTime)) {
        this.options.longTapTime = 200
      }
      this.page = []
      this.startTime = 0
      this.lastTime = 0
      this.tapTimer = null
      this.longTapTimer = null
      this.el.addEventListener('touchstart', this.start.bind(this))
      this.el.addEventListener('touchmove', this.move.bind(this))
      this.el.addEventListener('touchend', this.end.bind(this))
      // operation area
      this.winSize = {
        x: document.documentElement.clientWidth || document.body.clientWidth,
        y: document.documentElement.clientHeight || document.body.clientHeight
      };
      this.touchFingers = []
      this.isOneFinger = true
      this.isLongTap = false
      this.isMove = false
      this.trigger = {
        x: true,
        y: true
      }
      // operation area set
      const [top, right, bottom, left] = this.options.touchArea
      this.unTriggerResponseArea = {
        top: top,
        right: this.winSize.x - right,
        bottom: this.winSize.y - bottom,
        left: left
      }
    }
    start(e) {
      this.startTime = Date.now()
      clearTimeout(this.tapTimer)
      this.longTapTimer = setTimeout(() => {
        clearTimeout(this.tapTimer)
        clearTimeout(this.longTapTimer)
        this.isLongTap = true;
        this.options.longTap(e)
      }, this.options.longTapTime);

      this.touchFingers = e.changedTouches
      // if one finger or not
      this.isOneFinger = this.touchFingers && this.touchFingers.length === 1
      this.page = []
      for (let fg of this.touchFingers) {
        this.page.push({
          pageX: fg.pageX,
          pageY: fg.pageY
        })
      }
      const { pageX, pageY } = this.page[0]
      if (this.options.touchArea.reduce((total, value) => total + Math.abs(value)) === 0) {
        // not restrict
        this.trigger = {
          x: true,
          y: true
        }
      } else {
        // trigger area
        this.trigger = {
          x: pageX < this.unTriggerResponseArea.left || pageX > this.unTriggerResponseArea.right,
          y: pageY < this.unTriggerResponseArea.top || pageY > this.unTriggerResponseArea.bottom
        }
      }
      this.options.swiperStart(this.page[0])
    }
    move(e) {
      clearTimeout(this.longTapTimer)
      this.isMove = true;
      const { pageX, pageY } = this.page[0]
      const touche = e.changedTouches[0]
      const disX = Math.round(touche.pageX - pageX)
      const disY = Math.round(touche.pageY - pageY)
      if (this.trigger.y) {
        if (disY > 0) { this.options.swiperDown(Math.abs(disY)) }
        else if (disY < 0) { this.options.swiperUp(Math.abs(disY)) }
      }
      if (this.trigger.x) {
        if (disX > 0) { this.options.swiperRight(Math.abs(disX)) }
        else if (disX < 0) { this.options.swiperLeft(Math.abs(disX)) }
      }
      // use this function to do more complex situation
      // disX x axios move direction，disY y axios move direction，this.page[0] touchstart touch point
      this.options.swiperMove({ x: disX, y: disY }, this.page[0])
    }
    end(e) {
      if (this.isOneFinger) {
        this.tapTimer = setTimeout(() => {
          this.options.tap(e)
        }, this.options.doubleTapTime)
        // clear timeout
        clearTimeout(this.longTapTimer)
        // if move，clear tapTimer Timeout
        if (this.isMove) {
          clearTimeout(this.tapTimer)
          this.isMove = false
        }
        // if long press, clear tapTimer timeout
        if (this.isLongTap) {
          clearTimeout(this.tapTimer)
          this.isLongTap = false;
          return;
        }
        const t = this.startTime - this.lastTime
        this.lastTime = this.startTime
        if (0 < t && t < this.options.doubleTapTime) {
          clearTimeout(this.tapTimer)
          this.options.doubleTap(e)
        }
      }
    }
    destroy() {
      this.tapTimer && clearTimeout(this.tapTimer)
      this.longTapTimer && clearTimeout(this.longTapTimer)
      this.el.removeEventListener('touchstart', this.start.bind(this))
      this.el.removeEventListener('touchmove', this.move.bind(this))
      this.el.removeEventListener('touchend', this.end.bind(this))
    }
  }
})))
