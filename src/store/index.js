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

// todo: 初始化主题色
const el = document.documentElement
const theme = store.state.setting.theme
for (const key in theme) {
  el.style.setProperty(`--el-color-${ key }`, theme[key])
}

export default store
