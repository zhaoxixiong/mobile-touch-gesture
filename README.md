# mobile-touch-gesture

## foreword

This is a mobile touch gesture library.

## Feature

Gestures are supported below:

swiperLeft，swiperRight,  swiperUp, swiperDown, tap, doubleTap, longTap.

## Usage

Import mobile touch gesture library, then new an instance via some necessary arguments.

```vue
import MobileTouchGesture from "mobile-touch-gesture";
......
const MTG = new MobileTouchGesture(document.documentElement, {
  swiperStart(val1) {
    console.log(val1)
  },
  swiperMove(val1, val2) {
    console.log(val1, val2)
  },
  touchArea: [0],
  swiperUp(val) {
    console.log(val, 'swiperUp')
  },
  swiperRight(val) {
    console.log(val, 'swiperRight')
  },
  swiperDown(val) {
    console.log(val, 'swiperDown')
  },
  swiperLeft(val) {
    console.log(val, 'swiperLeft')
  },
  tap(e) {
    console.log('tap')
  },
  doubleTap(e) {
    console.log('doubleTap')
  },
  longTap(e) {
    console.log('longTap')
  }
})
```

MobileTouchGesture class acept two arguments, first is target element, second is an option object.s

## Arguement

| attribute | type    | defalut value | descrition     |
| --------- | ------- | ------------- | -------------- |
| ele       | Element |               | target element |
| options   | Object  |               | options        |

Basice gestures: swiperLeft, swiperRight, swiperUp, swiperDown, tap, doubleTap, longTap

If you want to handler more complex situation, you can use swiperStart and swiperMove to handle it.

You can get library version via MobileTouchGesture.version.

## Options attributes

| attribute     | type   | defalut value | descrition                         |
| ------------- | ------ | ------------- | ---------------------------------- |
| touchArea     | Array  | [0,0,0,0]     | trigger area, default not restrict |
| longTapTime   | Number | 200 ms        | long press trigger time            |
| doubleTapTime | Number | 200 ms        | double click gap time              |

You can redefine time for long tap and double tap to trigger relative event.

## Options funtions

| attribute   | type     | defalut value | descrition               |
| ----------- | -------- | ------------- | ------------------------ |
| swiperLeft  | Function | function(){}  | slide left               |
| swiperRight | Function | function(){}  | slide right              |
| swiperUp    | Function | function(){}  | slide up                 |
| swiperDown  | Function | function(){}  | slide down               |
| tap         | Function | function(){}  | click                    |
| doubleTap   | Function | function(){}  | double click             |
| longTap     | Function | function(){}  | long press               |
| swiperStart | Function | function(){}  | trigger when touch start |
| swiperMove  | Function | function(){}  | trigger when move start  |

## 中文文档

http://yunkus.com/post/5ddb6b3cf9b59b20e611e714