import {
  getLanguage, setLanguage, clearLanguage,
  setTheme, getTheme, clearTheme
} from '@/utils/storage'

const defaultLanguage = 'cn'

// 默认主题色- element 默认颜色
const defaultTheme = {
  primary: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  error: '#f56c6c',
  info: '#909399'
}

export default {
  state: {
    language: getLanguage() || defaultLanguage, // 语言
    screenfull: false, // 是否全屏
    reload: false, // 是否重新加载
    theme: getTheme() || defaultTheme // 全站主题色
  },
  getters: {
    language: (state) => {
      return state.language
    }
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
    },
    SET_SCREENFULL: (state, screenfull) => {
      state.screenfull = screenfull
    },
    SET_RELOAD: (state, reload) => {
      state.reload = reload
    },
    SET_THEME: (state, theme) => {
      state.theme = {
        ...state.theme,
        ...theme
      }
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
      setLanguage(language)
    },
    setScreenfull({ commit }, screenfull) {
      commit('SET_SCREENFULL', screenfull)
    },
    setReload({ commit }, reload) {
      commit('SET_RELOAD', reload)
    },
    setTheme({ commit, state }, theme) {
      const el = document.documentElement
      for (const key in theme) {
        el.style.setProperty(`--el-color-${ key }`, theme[key])
      }
      commit('SET_THEME', theme)
      setTheme(state.theme)
    },
    resetTheme({ commit }) {
      const el = document.documentElement
      for (const key in defaultTheme) {
        el.style.setProperty(`--el-color-${ key }`, defaultTheme[key])
      }
      commit('SET_THEME', defaultTheme)
      commit('SET_LANGUAGE', defaultLanguage)
      clearLanguage()
      clearTheme()
    }
  }
}
