import { recommendedApi, readApi } from '@/api/client/article'

export default {
  state: {
    recommendLoading: false,
    recommendedList: [],
    readLoading: false,
    readList: []
  },
  mutations: {
    SET_RECOMMEND_LOADING: (state, loading) => {
      state.recommendLoading = loading
    },
    SET_RECOMMENDED_LIST: (state, list) => {
      state.recommendedList = list
    },
    SET_READ_LOADING: (state, loading) => {
      state.readLoading = loading
    },
    SET_READ_LIST: (state, list) => {
      state.readList = list
    }
  },
  actions: {
    async getRecommended({ commit }) {
      commit('SET_RECOMMEND_LOADING', true)
      const r = await recommendedApi({ limit: 5 })
      if (r) {
        commit('SET_RECOMMENDED_LIST', r.data)
      }
      commit('SET_RECOMMEND_LOADING', false)
    },
    async getRead({ commit }) {
      commit('SET_READ_LOADING', true)
      const r = await readApi({ limit: 5 })
      if (r) {
        commit('SET_READ_LIST', r.data)
      }
      commit('SET_READ_LOADING', false)
    }
  }
}
