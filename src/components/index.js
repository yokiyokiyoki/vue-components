import GChart from './g-chart'
import GRipple from './g-ripple'
import GDatePick from './g-date-picker'
const components = [GChart, GRipple, GDatePick]
const install = function (Vue, opt = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default install
