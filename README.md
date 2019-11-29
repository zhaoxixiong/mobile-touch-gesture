# mobile-touch-gesture

## Foreword

This is a mobile touch gesture library.

## Feature

Gestures are supported below:

swiperStart, swiperMove, swiperLeft，swiperRight,  swiperUp, swiperDown, swiperLeftRight, swiperRightLeft, swiperUpDown, swiperDownUp , tap, doubleTap, longTap.

## Usage

Import mobile touch gesture library, then new an instance via some necessary arguments.

```vue
import MobileTouchGesture from "mobile-touch-gesture";
......
const MTG = new MobileTouchGesture(document.documentElement || document.body, {
    // set tips text
    prompt: {
        nameMap: {
            swiperUp: 'Up!!!',
            swiperRight: 'Right!!!'
        }
    },
    // trigger function
    swiperStart(val) {
        console.log(val)
    },
    swiperMove(val1, val2) {
        console.log(val1, val2)
    },
    swiperLeft() {
        console.log('swiperLeft')
    },
    swiperRight() {
        console.log('swiperRight')
    },
    swiperUp() {
        console.log('swiperUp')
    },
    swiperDown() {
        console.log('swiperDown')
    },
    swiperLeftRight() {
        console.log('swiperLeftRight')
    },
    swiperRightLeft() {
        console.log('swiperRightLeft')
    },
    swiperUpDown() {
        console.log('swiperUpDown')
    },
    swiperDownUp() {
        console.log('swiperDownUp')
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

MobileTouchGesture class acept two arguments, first is target element, second is an options object

## Arguement

| attribute | type    | defalut value | descrition     |
| --------- | ------- | ------------- | -------------- |
| ele       | Element |               | target element |
| options   | Object  |               | options        |

Basice gestures: swiperStart, swiperMove, swiperLeft，swiperRight,  swiperUp, swiperDown, swiperLeftRight, swiperRightLeft, swiperUpDown, swiperDownUp , tap, doubleTap, longTap.

If you want to handler more complex situation, you can use swiperStart and swiperMove to handle it.

You can get library version via MobileTouchGesture.version.

## Options attributes

| attribute      | type   | defalut value                                       | descrition                                                   |
| -------------- | ------ | --------------------------------------------------- | ------------------------------------------------------------ |
| effectiveValue | Number | 20                                                  | trigger function until move distance reach effectiveValue    |
| prompt         | Object | {show: false, nameMap:{invalid: 'invalidgesture'} } | show attribute is to defined tips show or not, and you can use nameMap to redefined gesture tips, when gesture is triggered |
| longTapTime    | Number | 200 ms                                              | long press trigger time                                      |
| doubleTapTime  | Number | 200 ms                                              | double click gap time                                        |

You can redefine time for long tap and double tap to trigger relative event.

## Options funtions

| attribute       | type     | defalut value          | descrition               |
| --------------- | -------- | ---------------------- | ------------------------ |
| swiperLeft      | Function | function(){}           | slide left               |
| swiperRight     | Function | function(){}           | slide right              |
| swiperUp        | Function | function(){}           | slide up                 |
| swiperDown      | Function | function(){}           | slide down               |
| swiperLeftRight | Function | function(){}           | slide left then back     |
| swiperRightLeft | Function | function(){}           | slide right then back    |
| swiperUpDown    | Function | function(){}           | slide up then back       |
| swiperDownUp    | Function | function(){}           | slide up then back       |
| tap             | Function | function(e){}          | click down then back     |
| doubleTap       | Function | function(e){}          | double click             |
| longTap         | Function | function(e){}          | long press               |
| swiperStart     | Function | function(val){}        | trigger when touch start |
| swiperMove      | Function | function(val1, val2){} | trigger when move start  |

## 中文文档

http://yunkus.com/post/5ddb6b3cf9b59b20e611e714