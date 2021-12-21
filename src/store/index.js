import { createStore } from 'vuex'

const importModules = import.meta.globEager('./modules/**/index.js')

const modules = {}

for (const key in importModules) {
  const modular = importModules[key]
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
