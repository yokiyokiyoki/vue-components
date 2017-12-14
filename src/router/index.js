import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Chart from '@/page/chart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/chart',
      name: 'Chart',
      component: Chart
    }
  ]
})
