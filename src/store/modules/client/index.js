import { infoApi } from '@/api/client/settings'

// 默认设置
const defaultSettings = {
  id: '',
  name: '',
  avatar: '',
  signature: '',
  address: '',
  qq: '',
  wechat: '',
  github: '',
  official_account: '',
  wechat_group: '',
  qq_group: '',
  logo: '',
  title: '',
  record_number: '',
  record_number_link: '',
  link: '',
  describe: '',
  email: ''
}

export default {
  state: {
    loading: false,
    settings: defaultSettings
  },
  mutations: {
    SET_LOADING: (state, loading) => {
      state.loading = loading
    },
    SET_SETTINGS: (state, settings) => {
      state.settings = settings || defaultSettings
    }
  },
  actions: {
    async getSettings({ commit }) {
      commit('SET_LOADING', true)
      const r = await infoApi()
      if (r) {
        commit('SET_SETTINGS', r.data)
      }
      commit('SET_LOADING', false)
    }
  }
}
