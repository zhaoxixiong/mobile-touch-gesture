# mobile-touch-gesture

current version 1.0.3

## Foreword

This is a mobile touch gesture and pc mouse gesture library.

## Feature

Gestures are supported below:

swiperStart, swiperMove, swiperEnd, swiperLeft，swiperRight,  swiperUp, swiperDown, 

swiperLeftRight, swiperLeftUp, swiperLeftDown,

swiperRightLeft, swiperRightUp, swiperRightDown, 

swiperUpDown, swiperUpLeft, swiperUpRight,

swiperDownUp, swiperDownLeft ,swiperDownRight,

 tap, doubleTap, longTap.

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
    swiperEnd(val) {
        console.log(val)
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
    swiperLeftTop() {
        console.log('swiperLeftTop')
    },
    swiperLeftDown() {
        console.log('swiperLeftDown')
    },
    swiperRightLeft() {
        console.log('swiperRightLeft')
    },
    swiperRightUp() {
        console.log('swiperRightUp')
    },
    swiperRightDown() {
        console.log('swiperRightDown')
    },
    swiperUpDown() {
        console.log('swiperUpDown')
    },
    swiperUpLeft() {
        console.log('swiperUpLeft')
    },
    swiperUpRight() {
        console.log('swiperUpRight')
    },
    swiperDownUp() {
        console.log('swiperDownUp')
    },
    swiperDownLeft() {
        console.log('swiperDownLeft')
    },
    swiperDownRight() {
        console.log('swiperDownRight')
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
| swiperLeftUp    | Function | function(){}           | slide left then up       |
| swiperLeftDown  | Function | function(){}           | slide left then down     |
| swiperRightLeft | Function | function(){}           | slide right then back    |
| swiperRightUp   | Function | function(){}           | slide right then up      |
| swiperRightDown | Function | function(){}           | slide right then down    |
| swiperUpDown    | Function | function(){}           | slide up then back       |
| swiperUpRight   | Function | function(){}           | slide up then right      |
| swiperUpLeft    | Function | function(){}           | slide up then left       |
| swiperDownUp    | Function | function(){}           | slide down then back     |
| swiperDownRight | Function | function(){}           | slide down then right    |
| swiperDownLeft  | Function | function(){}           | slide down then left     |
| tap             | Function | function(e){}          | click                    |
| doubleTap       | Function | function(e){}          | double click             |
| longTap         | Function | function(e){}          | long press               |
| swiperStart     | Function | function(val){}        | trigger when touch start |
| swiperMove      | Function | function(val1, val2){} | trigger when move start  |
| swiperEnd       | Function | function(val1, val2){} | trigger when move end    |

## 中文文档

http://yunkus.com/post/5ddb6b3cf9b59b20e611e714