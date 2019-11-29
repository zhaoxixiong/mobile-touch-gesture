/*
 * mobile touch gesture 1.0.1
 * https://github.com/zhaoxixiong/mobile-touch-gesture
 * Copyright (C) 2019 http://yunkus.com/ - a project by zhaoxixiong
 */
; (function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      global.MobileTouchGesture = factory()
}(this, (function () {
  "use strict";
  // const VERSION = "1.0.1"
  function noop() { }
  const cbs = [
    'swiper', 'swiperStart', 'swiperMove', 'tap', 'doubleTap', 'longTap',
    'swiperUp', 'swiperDown', 'swiperLeft', 'swiperRight', 'swiperUpDown', 'swiperDownUp', 'swiperLeftRight', 'swiperRightLeft',
  ]
  const ICONS = {
    UP: '<svg t="1574998974491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5367" width="36" height="36"><path d="M553.173333 803.84h-64l0.021334-474.581333-224.021334 224-45.269333-45.226667L521.6 206.293333l301.717333 301.696-45.269333 45.269334-224.853333-224.896v475.477333z" p-id="5368" fill="#ffffff"></path></svg>',
    DOWN: '<svg t="1574998875412" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5214" width="36" height="36"><path d="M553.173333 238.314667h-64l0.021334 474.602666-224.021334-224-45.269333 45.226667L521.6 835.861333l301.717333-301.717333-45.269333-45.226667-224.853333 224.853334V238.336z" p-id="5215" fill="#ffffff"></path></svg>',
    LEFT: '<svg t="1574999027145" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5673" width="36" height="36"><path d="M783.872 542.122667l-0.042667-64.405334-477.610666-0.298666 225.28-225.322667-45.568-45.568L182.506667 509.952l303.829333 303.829333 45.525333-45.504-226.474666-226.453333 478.506666 0.298667z" p-id="5674" fill="#ffffff"></path></svg>',
    RIGHT: '<svg t="1574999005356" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5520" width="36" height="36"><path d="M214.677333 542.122667l0.042667-64.405334 477.653333-0.298666-225.301333-225.322667 45.568-45.568 303.424 303.424L512.213333 813.781333l-45.504-45.504 226.453334-226.453333-478.485334 0.298667z" p-id="5521" fill="#ffffff"></path></svg>',
  }
  const tipsMap = {
    x: {
      1: {
        name: 'Left',
        text: '',
        icon: ICONS.LEFT
      },
      2: {
        name: 'Right',
        text: '',
        icon: ICONS.RIGHT
      },
      3: {
        name: 'LeftRight',
        text: '',
        icon: ICONS.LEFT + ICONS.RIGHT,
      },
      4: {
        name: 'RightLeft',
        text: '',
        icon: ICONS.RIGHT + ICONS.LEFT
      }
    },
    y: {
      1: {
        name: 'Up',
        text: '',
        icon: ICONS.UP
      },
      2: {
        name: 'Down',
        text: '',
        icon: ICONS.DOWN
      },
      3: {
        name: 'UpDown',
        text: '',
        icon: ICONS.UP + ICONS.DOWN,
      },
      4: {
        name: 'DownUp',
        text: '',
        icon: ICONS.DOWN + ICONS.UP
      }
    }
  }
  function isNumber(val) {
    return typeof val === 'number'
  }
  return class MobileTouchGesture {
    constructor(el, options) {
      this.el = el
      this.options = options
      // if not set function, use default function
      for (let cb of cbs) {
        if (!this.options[cb]) {
          this.options[cb] = noop
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
      this.options.effectiveValue = this.options.effectiveValue || 20 // effective value

      // operation area set
      this.gestures = {
        axios: '',
        oldPoint: { x: 0, y: 0 }, // record last point
        changePoint: null, // record point when thd direction change
        changePoints: [],
        direction: 1 // 0: down or left direction, 1: up or right direction
      }
      this.options.prompt = Object.assign({ show: true, nameMap: {} }, options.prompt)
      this.options.prompt.nameMap.invalid = this.options.prompt.nameMap.invalid || 'invalid gesture'
      if (this.options.prompt.show) {
        this.msg = 0
        this.tips = null
        this.tipStyle = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);padding:6px;border-radius:4px;color:#fff;text-align:center;z-index:1991;transition:0.5s;"
        // init tips
        for (let key in tipsMap) {
          for (let iKey in tipsMap[key]) {
            const item = tipsMap[key][iKey]
            item.text = this.options.prompt.nameMap['swiper' + item.name] || item.name
          }
        }
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
          pageX: Math.round(fg.pageX),
          pageY: Math.round(fg.pageY)
        })
      }
      this.options.swiperStart(this.page[0])
    }
    move(e) {
      clearTimeout(this.longTapTimer)
      this.isMove = true;
      if (this.gestures.changePoints.length > 1) {
        this.showTip({ icon: '', text: this.options.prompt.nameMap.invalid })
        return
      }
      const touche = e.changedTouches[0]
      const x0 = this.page[0].pageX
      const y0 = this.page[0].pageY
      const currentPoint = {
        x: touche.pageX.toFixed(0),
        y: touche.pageY.toFixed(0)
      }
      const dis = {
        x: Math.round(currentPoint.x - x0),
        y: Math.round(currentPoint.y - y0)
      }
      if (!this.gestures.axios) {
        if (Math.abs(dis.x) > this.options.effectiveValue) {
          this.gestures.axios = 'x'
        } else if (Math.abs(dis.y) > this.options.effectiveValue) {
          this.gestures.axios = 'y'
        }
        if (this.gestures.axios) {
          if (dis[this.gestures.axios] > 0) {
            this.msg = 2
            this.gestures.direction = 1
          } else {
            this.msg = 1
            this.gestures.direction = 0
          }
          this.showTip(tipsMap[this.gestures.axios][this.msg])
        }
      } else {
        const { oldPoint, axios } = this.gestures
        let result = this.gestures.direction === 1 ? oldPoint[axios] - currentPoint[axios] : currentPoint[axios] - oldPoint[axios]
        if (result > 0) {
          this.gestures.direction = 1 - this.gestures.direction
          this.gestures.changePoint = {
            x: this.gestures.oldPoint.x,
            y: this.gestures.oldPoint.y
          }
        }
        if (this.gestures.changePoint && Math.abs(this.gestures.changePoint[axios] - currentPoint[axios]) > this.options.effectiveValue) {
          this.gestures.changePoints.push(this.gestures.changePoint)
          this.gestures.changePoint = null
          if (this.gestures.changePoints.length === 1) {
            this.msg = this.msg === 1 ? 3 : 4
            this.showTip(tipsMap[this.gestures.axios][this.msg])
          }
        }
      }
      // use this function to do more complex situation
      // disX x axios move direction，disY y axios move direction，current touch point
      this.options.swiperMove({ x: dis.x, y: dis.y }, { pageX: Math.round(touche.pageX), pageY: Math.round(touche.pageY) })
      this.gestures.oldPoint = { x: currentPoint.x, y: currentPoint.y }
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
        this.msg && this.options['swiper' + tipsMap[this.gestures.axios][this.msg].name]()
        this.msg = 0
        this.gestures = {
          axios: '',
          oldPoint: { x: 0, y: 0 },
          changePoint: null,
          changePoints: []
        }
      }
      if (this.tips) {
        this.tips.style = this.tipStyle + "display:none"
      }
    }
    showTip(tip) {
      if (!this.options.prompt || !this.options.prompt.show) { return }
      // if tips not exist, create it
      if (!this.tips) {
        let tipsBox = document.createElement('div')
        tipsBox.style = this.tipStyle
        tipsBox.id = "gesture-tips"
        const _body = document.querySelector("body")
        _body.append(tipsBox)
        this.tips = document.querySelector("#gesture-tips")
      } else {
        //else change text and style only
        this.tips.style = this.tipStyle + "display:block"
      }
      this.tips.innerHTML = tip.icon + '<div style="fontSize:12px;">' + tip.text + '</div>'
    }
    destroy() {
      this.msg = 0
      this.tapTimer && clearTimeout(this.tapTimer)
      this.longTapTimer && clearTimeout(this.longTapTimer)
      this.el.removeEventListener('touchstart', this.start.bind(this))
      this.el.removeEventListener('touchmove', this.move.bind(this))
      this.el.removeEventListener('touchend', this.end.bind(this))
    }
  }
})))