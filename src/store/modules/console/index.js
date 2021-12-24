export default {
  state: {
    menu: {
      active: 'dataOverview', // 菜单选中
      list: [
        { value: 'dataOverview', label_cn: '数据概况', label_en: 'Data overview', icon: 'statistics' },
        {
          value: 'article',
          label_cn: '文章管理',
          label_en: 'Article management',
          icon: 'article-module',
          children: [
            { value: 'articleIndex', label_cn: '列表', label_en: 'List', icon: 'article' },
            { value: 'articleWriting', label_cn: '写作', label_en: 'Writing', icon: 'edit-article' },
            { value: 'articleCategory', label_cn: '分类', label_en: 'Category', icon: 'category' },
            { value: 'articleLabel', label_cn: '标签', label_en: 'Label', icon: 'label' }
          ]
        }
      ]
    },
    theme: {
      layout: {
        headHeight: 50, // 导航栏高度
        tabsHeight: 50, // 标签栏高度
        fixed: true, // 是否固定导航栏
        tabsDisplay: true // 是否显示标签栏
      },
      menu: {
        backgroundColor: '#545c64', // 侧边栏背景色
        textColor: '#ffffff', // 菜单字体颜色
        activeTextColor: '#ffd04b', // 菜单选中字体颜色
        collapse: false // 菜单折叠
      }
    },
    refresh: false // 用于组件刷新
  },
  mutations: {
    SET_MENU_ACTIVE: (state, active) => {
      state.menu.active = active
    },
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
    setMenuActive({ commit }, active) {
      commit('SET_MENU_ACTIVE', active)
    },
    setTheme({ commit }, theme) {
      commit('SET_THEME', theme)
    },
    setRefresh({ commit }, refresh) {
      commit('SET_REFRESH', refresh)
    }
  }
}
