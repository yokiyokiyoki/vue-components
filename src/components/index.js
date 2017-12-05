import GChart from './g-chart'
const install = function (Vue, opt = {}) {
  Vue.component(GChart.name, GChart)
}
console.log(GChart)
export default install
