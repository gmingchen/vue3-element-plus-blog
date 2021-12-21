import { createStore } from 'vuex'

const requireModules = import.meta.globEager('./modules/**/index.js')

const modules = {}

for (const key in requireModules) {
  const modular = requireModules[key]
  const name = key.replace(/\.\/modules\/|\/index\.js/g, '')
  modules[name] = {
    namespaced: true,
    ...modular.default
  }
}

const store = createStore({
  modules: {
    ...modules
  }
})

export default store
