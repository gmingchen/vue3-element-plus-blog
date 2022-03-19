import { createStore } from 'vuex'

const requireModules = require.context('./modules/', true, /index\.(ts|js)$/iu)

const modules = {}

requireModules.keys().forEach(filePath => {
  const modular = requireModules(filePath)
  const name = filePath.replace(/\.\/|\/index.(js|ts)/g, '')
  modules[name] = {
    namespaced: true,
    ...modular.default
  }
})

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
