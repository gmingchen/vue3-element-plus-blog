import upperFirst from 'lodash/upperFirst'

export default {
  install: function (app) {
    const globalComponents = require.context('./', true, /index\.(vue|js)$/iu)
    globalComponents.keys().forEach(filePath => {
      if (filePath === './index.js') return
      const component = globalComponents(filePath)
      let name = filePath.replace(/\.\/|\/index.vue/g, '')
      name = upperFirst(name)
      app.component(`G${ name }`, component.default || component)
    })
  }
}
