import { getLanguage } from '@/utils/storage'

export default {
  state: {
    language: getLanguage() || 'cn', // 语言
    screenfull: false, // 是否全屏
    reload: false, // 是否重新加载
    theme: { // 全站主题色
      primary: '#409eff',
      success: '#67c23a',
      warning: '#e6a23c',
      danger: '#f56c6c',
      error: '#f56c6c',
      info: '#909399'
    }
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
    },
    setScreenfull({ commit }, screenfull) {
      commit('SET_SCREENFULL', screenfull)
    },
    setReload({ commit }, reload) {
      commit('SET_RELOAD', reload)
    },
    setTheme({ commit }, theme) {
      commit('SET_THEME', theme)
    }
  }
}
