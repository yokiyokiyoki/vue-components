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
  }
}
export default dom
