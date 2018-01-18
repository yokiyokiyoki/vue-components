// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import GlobalComponents from '@/components'

// 引用全局插件
import '@/plug'

Vue.use(GlobalComponents)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 切换路由，abort掉当前所有的请求
  Vue.abort()
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
