import axios from 'axios'
const install = function (Vue, option = {}) {
    Vue.prototype.$proxy = (ajaxParams, ajaxOpt) => {
        ajaxOpt = {
            mock: false, //默认不开启mock数据
            noAbort: false, //默认切换页面会abort请求，可以指定一些不abort掉请求的
        }
        if (ajaxOpt.mock) {
            ajaxParams.url = `/mock${ajaxParams.url}`
        }
        console.log(ajaxParams)
    }
}
export default install