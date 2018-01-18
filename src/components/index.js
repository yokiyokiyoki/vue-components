import GChart from './g-chart'
import GRipple from './g-ripple'
const components = [GChart, GRipple]
const install = function (Vue, opt = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default install
