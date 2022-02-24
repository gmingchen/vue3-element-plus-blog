export default {
  state: {
    active: 'dashboard', // 菜单选中
    list: [
      { value: 'dashboard', label_cn: '仪表盘', label_en: 'dashboard', icon: 'dashboard' },
      {
        value: 'article',
        label_cn: '文章管理',
        label_en: 'Article management',
        icon: 'article-module',
        children: [
          { value: 'articleIndex', label_cn: '列表', label_en: 'List', icon: 'article' },
          { value: 'articleWriting', label_cn: '写作', label_en: 'Writing', icon: 'edit-article' },
          { value: 'articleCategory', label_cn: '分类', label_en: 'Category', icon: 'category' },
          { value: 'articleTag', label_cn: '标签', label_en: 'Tag', icon: 'tag' }
        ]
      },
      { value: 'banner', label_cn: '轮播图', label_en: 'Rotation chart', icon: 'banner' },
      { value: 'leaveMessage', label_cn: '留言', label_en: 'Leaving message', icon: 'leave-message' },
      { value: 'user', label_cn: '用户', label_en: 'User', icon: 'user' },
      {
        value: 'system',
        label_cn: '系统管理',
        label_en: 'System management',
        icon: 'system',
        children: [
          { value: 'systemConfig', label_cn: '配置', label_en: 'Configure', icon: 'config' },
          { value: 'systemLog', label_cn: '日志', label_en: 'Log', icon: 'log' }
        ]
      }
    ]
  },
  mutations: {
    SET_ACTIVE: (state, active) => {
      state.active = active
    }
  },
  actions: {
    setActive({ commit }, active) {
      commit('SET_ACTIVE', active)
    }
  }
}
