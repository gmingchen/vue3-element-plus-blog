/**
 * 自定义指令
 */
export default {
  install: function (app) {
    /**
     * @description: 表单防止重复提交指令
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    app.directive('repeat', {
      mounted(el, binding) {
        el.addEventListener('click', () => {
          if (!el.disabled) {
            el.disabled = true
            setTimeout(() => {
              el.disabled = false
            }, binding.value || 2000)
          }
        })
      }
    })
  }
}
