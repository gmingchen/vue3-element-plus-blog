import upperFirst from 'lodash/upperFirst'

export default {
  install: function (app) {
    const requireComponents = import.meta.globEager('./**/index.(js|vue)')
    for (const key in requireComponents) {
      const component = requireComponents[key]
      let name = key.replace(/\.\/|\/index\.(js|vue)/g, '')
      name = upperFirst(name)
      app.component(`G${ name }`, component.default || component)
    }
  }
}
