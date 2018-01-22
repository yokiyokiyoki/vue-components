import Tooltip from 'tooltip.js'
import '@/less/tooltip.less'
export default {
  bind (el, binding, vnode) {
    el.__tooltip__ = new Tooltip(el, {
      title: binding.value,
      placement: 'bottom'
    })
  },
  update (el, binding, vnode) {
    el.__tooltip__.options.title = binding.value
  },
  unbind (el, binding, vnode) {
    delete el.__tooltip__
  }
}
