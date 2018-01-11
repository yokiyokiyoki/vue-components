//全局插件，从directive，filters，proxy（请求）
import Vue from 'vue';
import Proxy from './proxy'
const plugs = [Proxy]

plugs.forEach(plug => {
    Vue.use(plug)
})