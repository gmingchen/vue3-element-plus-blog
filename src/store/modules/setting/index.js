import { getLanguage } from '@/utils/storage'

export default {
  state: {
    set: {
      language: getLanguage() || 'cn'
    }
  },
  getters: {
    language: (state) => {
      return state.set.language
    }
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.set.language = language
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}
