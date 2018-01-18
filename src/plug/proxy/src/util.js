export default Vue => {
  Vue.ajaxMap = {}
}

export const delAjaxMap = (Vue, ajaxKey) => {
  delete Vue.ajaxMap[ajaxKey]
}

export const setAjaxMap = (Vue, ajaxKey, c) => {
  Vue.ajaxMap[ajaxKey] = c
}
