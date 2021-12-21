import upperFirst from 'lodash/upperFirst'

export default {
  install: function (app) {
    const importModules = import.meta.globEager('./**/index.(js|vue)')
    for (const key in importModules) {
      const component = importModules[key]
      let name = key.replace(/\.\/|\/index\.(js|vue)/g, '')
      name = upperFirst(name)
      app.component(`G${ name }`, component.default || component)
    }
  }
}
