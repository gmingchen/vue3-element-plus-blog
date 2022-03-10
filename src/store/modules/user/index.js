/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { getToken, setToken, clearToken } from '@/utils/storage'
import { loginApi } from '@/api/client/login'
import { infoApi } from '@/api/client/user'
import { clearJson } from '@/utils/index'

export default {
  state: {
    user: {
      id: '',
      username: '',
      nickname: '',
      mobile: '',
      email: '',
      avatar: '',
      author: 0,
      sex: '',
      status: '',
      roles: []
    },
    token: getToken()
  },
  getters: {
    tokenVal: state => {
      return state.token
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    CLEAR_USER: state => {
      clearJson(state.user)
    },
    CLEAR_TOKEN: state => {
      state.token = ''
    }
  },
  actions: {

    /**
     * 登录
     * @param {*} params
     * @returns
     */
    async login({ commit }, params) {
      const r = await loginApi(params)
      if (r) {
        setToken(r.data)
        commit('SET_TOKEN', r.data)
      }
      return r
    },

    /**
     * 获取当前用户信息
     * @returns
     */
    async getUser({ commit }) {
      const r = await infoApi()
      if (r) {
        commit('SET_USER', r.data)
      }
      return r
    },

    /**
     * 编辑当前用户信息
     * @param {*} params
     */
    async editUser({ dispatch }, params) {
      //
    },

    /**
     * 退出当前账户
     * @returns
     */
    logout({ commit }) {
      clearToken()
      commit('CLEAR_USER')
      commit('CLEAR_TOKEN')
    },

    /**
     * 清除登录信息 用户信息
     * @param {*} param0
     * @param {*} flag
     */
    clear({ commit }, flag = false) {
      //
    }
  }
}
