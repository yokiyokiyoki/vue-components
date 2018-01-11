import axios from 'axios'
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
        console.log(ajaxParams)
        return axios(ajaxParams)
    }
}
export default install