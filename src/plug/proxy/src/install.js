// 引进路由，可以进行跳转
import vueRouter from 'vue-router'
import axios from 'axios'
import Qs from 'qs'
import Util, { delAjaxMap, setAjaxMap } from './util'
const router = new vueRouter()
const instance = axios.create()
const CancelToken = axios.CancelToken
const install = function (Vue, option = {}) {
  // 一次引用，防止多次调用
  if (install.installed) return
  install.installed = true
  Util(Vue)
  // 基础配置
  axios.defaults.baseURL = '/'
  // 设置默认请求头
  axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  axios.defaults.timeout = 100000
  // 请求拦截器
  axios.interceptors.request.use(
    config => {
      if (!config.ajaxOpt.noAbort) {
        // 如果它是不被abort的，才加进map
        // 发起请求时，取消掉当前正在进行的相同请求
        if (Vue.ajaxMap[`${config.url}`]) {
          Vue.ajaxMap[`${config.url}`](`${config.url}重复发请求,操作取消`)
        }
        Vue.ajaxMap[`${config.url}`] = cancel[`${config.url}`]
      }

      if (config.method === 'post') {
        config.transformRequest = [
          function (data) {
            // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等
            data = Qs.stringify(data)
            return data
          }
        ]
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  axios.interceptors.response.use(
    config => {
      let params = config.params ? JSON.stringify(config.params) : ''
      // 自定义状态，如果超时或者什么的，返回到首页/登录页
      let data = config.data
      if (data.code == 1000) {
        // debugger;
        Vue.prototype.$abort()
        // 还要清掉localstorage
        localStorage.removeItem('userInfo')
        location.href = '/login'
      }
      // 删掉ajaxMap里面的
      deleteAjaxMap(Vue, `${config.url}${params}`)
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )
  Vue.prototype.$proxy = (ajaxParams = {}, ajaxOpt) => {
    ajaxOpt = Object.assign(
      {
        mock: false, // 默认不开启mock数据
        noAbort: false // 不能被规则abort
      },
      ajaxOpt
    )
    if (ajaxOpt.mock) {
      ajaxParams.url = `/mock${ajaxParams.url}`
    }

    // 返回请求
    return axios({
      ...ajaxParams,
      cancelToken: new CancelToken(c => {
        cancel[`${ajaxParams.url}`] = c
      }),
      ajaxOpt
    })
  }
  Vue.abort = Vue.prototype.$abort = () => {
    for (let key in Vue.ajaxMap) {
      Vue.ajaxMap[key]('切换路由，操作取消')
      delAjaxMap(Vue, key)
    }
  }
}
export default install
