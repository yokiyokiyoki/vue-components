// 全局插件，从directive，filters，proxy（请求）
import Vue from 'vue'
import Proxy from './proxy'
import directives from './directive'

const plugs = [Proxy]

plugs.forEach(plug => {
  Vue.use(plug)
})

for (let key in directives) {
  Vue.directive(key, directives[key])
}
