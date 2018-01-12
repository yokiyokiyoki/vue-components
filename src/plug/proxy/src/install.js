//引进路由，可以进行跳转
import vueRouter from 'vue-router'
let router = new vueRouter();
import axios from 'axios'
const instance = axios.create()
const install = function (Vue, option = {}) {
    Vue.prototype.$proxy = (ajaxParams = {}, ajaxOpt) => {
        ajaxOpt = Object.assign({
            mock: false, //默认不开启mock数据
            noAbort: false, //默认切换页面会abort请求，可以指定一些不abort掉请求的
        }, ajaxOpt)
        if (ajaxOpt.mock) {
            ajaxParams.url = `/mock${ajaxParams.url}`
        }
        //默认参数
        ajaxParams = Object.assign({}, ajaxParams)
        //all responses interceptors
        instance
            .interceptors
            .response
            .use((config) => {
                //自定义状态，如果超时或者什么的，返回到首页/登录页
                let data = config.data
                if (data.success && data.code == 1000) {
                    router.push('/Index')
                }
                return config
            }, (err) => {
                return Promise.reject(err)
            })
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