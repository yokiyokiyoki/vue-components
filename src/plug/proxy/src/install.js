// 引进路由，可以进行跳转
import vueRouter from 'vue-router'
import axios from 'axios'
import Qs from 'qs'
import Util, { delAjaxMap, setAjaxMap } from './util'
const router = new vueRouter()
const instance = axios.create()
const CancelToken = axios.CancelToken
const install = function (Vue, option = {}) {
  Util(Vue)
  Vue.prototype.$proxy = (ajaxParams = {}, ajaxOpt) => {
    // 根据url和data生成唯一key
    const ajaxKey = `${ajaxParams.url}?${JSON.stringify(
      ajaxParams.data || ajaxParams.params || null
    )}`
    setAjaxMap(Vue, ajaxKey)
    console.log(ajaxKey, Vue.ajaxMap)
    ajaxOpt = Object.assign(
      {
        mock: false, // 默认不开启mock数据
        noAbort: false // 默认切换页面会abort请求，可以指定一些不abort掉请求的
      },
      ajaxOpt
    )
    if (ajaxOpt.mock) {
      ajaxParams.url = `/mock${ajaxParams.url}`
    }
    if (ajaxParams.method == 'post') {
      // 如果是post请求，需要修改请求头,令其提交为from-data
      ajaxParams.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      ajaxParams.transformRequest = [
        function (data) {
          // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等
          data = Qs.stringify(data)
          return data
        }
      ]
    }

    // 默认参数
    ajaxParams = Object.assign(
      {
        // abort掉请求
        cancelToken: new CancelToken(function executor (c) {
          // An executor function receives a cancel function as a parameter
          //   console.log(c)
        })
      },
      ajaxParams
    )
    // all responses interceptors
    instance.interceptors.response.use(
      config => {
        // 自定义状态，如果超时或者什么的，返回到首页/登录页
        let data = config.data
        if (data.success && data.code == 1000) {
          router.push('/Index')
        }
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )
    return instance(ajaxParams)
      .then(res => {
        return res.data
      })
      .catch(err => {
        return err
      })
  }
}
export default install
