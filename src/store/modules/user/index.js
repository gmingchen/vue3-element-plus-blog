/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { getToken, setToken } from '@/utils/storage'

export default {
  state: {
    user: {
      id: '',
      username: '',
      nickname: '',
      mobile: '',
      email: '',
      avatar: '',
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
      //
    },
    CLEAR_TOKEN: state => {
      //
    }
  },
  actions: {

    /**
     * 登录
     * @param {*} params
     * @returns
     */
    async login({ commit }, params) {
      //
    },

    /**
     * 获取当前用户信息
     * @returns
     */
    async getUser({ commit }) {
      //
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
    async logout() {
      //
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
