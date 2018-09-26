import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/page/home')
const Chart = () => import('@/page/chart')
const Ripple = () => import('@/page/ripple')
const Calendar = () => import('@/page/calendar')
const Input = () => import('@/page/input')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    },
    {
      path: '/input',
      name: 'Input',
      component: Input
    }
  ]
})
