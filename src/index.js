/*
 * mobile touch gesture 1.0.0
 * https://github.com/zhaoxixiong/mobile-touch-gesture
 * Copyright (C) 2019 http://yunkus.com/ 
 * A project by zhaoxixiong
 */
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
class MobileTouchGesture {
  static version = VERSION
  constructor(el, options) {
    this.el = el
    this.options = options
    // 如果没有设置相关回调，则给默认函数
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
    // 操作区的区域宽高
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
    // 是否设置了临界点
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
    // 是否是单指操作
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
      // 不作限制
      this.trigger = {
        x: true,
        y: true
      }
    } else {
      // 指定区域才会触发
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
    // 可以通过这个回调函数处理更加复杂的逻辑
    // disX x 轴方向移动的距离，disY y 轴方向移动的距离，this.page[0] touchstart 点击时的点坐标
    this.options.swiperMove({ x: disX, y: disY }, this.page[0])
  }
  end(e) {
    if (this.isOneFinger) {
      this.tapTimer = setTimeout(() => {
        this.options.tap(e)
      }, this.options.doubleTapTime)
      // 清掉长按定时器
      clearTimeout(this.longTapTimer)
      // 如果有发生移动，则清空点击长按定时器
      if (this.isMove) {
        clearTimeout(this.tapTimer)
        this.isMove = false
      }
      // 如果是长按则清掉单击定时器
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
export default MobileTouchGesture

