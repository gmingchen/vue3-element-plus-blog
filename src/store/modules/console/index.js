import { setConsoleTheme, getConsoleTheme, clearConsoleTheme } from '@/utils/storage'

// 控制台默认主题
const defaultTheme = {
  layout: {
    headHeight: 50, // 导航栏高度
    tabsHeight: 50, // 标签栏高度
    fixed: true, // 是否固定导航栏
    tabsDisplay: true // 是否显示标签栏
  },
  menu: {
    backgroundColor: '#545c64', // 侧边栏背景色
    textColor: '#ffffff', // 菜单字体颜色
    activeTextColor: '#409EFF', // 菜单选中字体颜色
    collapse: false // 菜单折叠
  }
}

export default {
  state: {
    theme: getConsoleTheme() || defaultTheme,
    refresh: false // 用于组件刷新
  },
  mutations: {
    SET_THEME: (state, { layout, menu }) => {
      state.theme = {
        layout: {
          ...state.theme.layout,
          ...layout
        },
        menu: {
          ...state.theme.menu,
          ...menu
        }
      }
    },
    SET_REFRESH: (state, refresh) => {
      state.refresh = refresh
    }
  },
  actions: {
    setTheme({ commit, state }, theme) {
      commit('SET_THEME', theme)
      setConsoleTheme(state.theme)
    },
    resetTheme({ commit }) {
      commit('SET_THEME', defaultTheme)
      clearConsoleTheme()
    },
    setRefresh({ commit }, refresh) {
      commit('SET_REFRESH', refresh)
    }
  }
}
