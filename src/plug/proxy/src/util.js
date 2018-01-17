export default Vue => {
  Vue.ajaxMap = {}
}

export const delAjaxMap = (Vue, ajaxKey) => {
  delete Vue.ajaxMap[ajaxKey]
}

export const setAjaxMap = (Vue, ajaxKey) => {
  Vue.ajaxMap[ajaxKey] = ajaxKey
}
