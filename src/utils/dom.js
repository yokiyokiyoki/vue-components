import Vue from 'vue'

const isServer = Vue.prototype.$isServer
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const ieVersion = isServer ? 0 : Number(document.documentMode)
// 一些dom的实用操作方法
const dom = {
  // 获取Y坐标的距离
  getOffsetTop (dom) {
    // 获取top偏移量
    let top = dom.offsetTop
    // 如果该元素的offsetParent存在，递归算出top
    if (dom.offsetParent !== null) {
      top += this.getOffsetTop(dom.offsetParent)
    }
    return top
  },
  // 获取X坐标的距离
  getOffsetLeft (dom) {
    let left = dom.offsetLeft
    if (dom.offsetParent !== null) {
      left += this.getOffsetLeft(dom.offsetParent)
    }
    return left
  },
  on () {
    if (!isServer && document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  }
}
export default dom
