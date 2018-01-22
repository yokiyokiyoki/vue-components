import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/page/Index')
const Chart = () => import('@/page/chart')
const Ripple = () => import('@/page/ripple')
const Calendar = () => import('@/page/calendar')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/ripple',
      name: 'Ripple',
      component: Ripple
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    }
  ]
})
