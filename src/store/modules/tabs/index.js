/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-08 17:05:24
 */
import router from '@/router'

// todo: ITab value 格式：{a}-{b}-{c}
// todo: a: 路由name b: 路由query字符串 c: 路由params字符串
// todo: c: 多开的时候需要

const defaultTabs = [{
  value: 'dataOverview-{}-{}',
  title_cn: '数据概况',
  title_en: 'Data overview',
  name: 'dataOverview',
  query: {}, // 路由参数
  params: {} // 路由参数
}]

export default {
  state: {
    active: 'dataOverview-{}-{}',
    list: defaultTabs
  },
  getters: {
  },
  mutations: {
    SET_ACTIVE: (state, active) => {
      state.active = active
    },
    SET_TABS: (state, tabs) => {
      state.tabs = tabs
    },
    ADD_TAB: (state, tab) => {
      state.list.push(tab)
    },
    REMOVE_TAB: (state, index) => {
      state.list.splice(index, 1)
    }
  },
  actions: {
    setActive({ commit }, active) {
      commit('SET_ACTIVE', active)
    },
    changeHandle({ commit, state }, route) {
      const meta = route.meta
      const name = route.name
      const queryStr = JSON.stringify(route.query)
      const paramsStr = JSON.stringify(route.params)
      const tab = {
        value: `${ name }-${ queryStr }-${ paramsStr }`,
        title_cn: meta.title_cn,
        title_en: meta.title_en,
        name: name,
        query: route.query,
        params: route.params
      }
      const isExist = state.list.every(item => item.value !== tab.value)
      if (isExist) {
        commit('ADD_TAB', tab)
      }
      commit('SET_ACTIVE', tab.value)
    },
    removeHandle({ commit, state }, value) {
      let index = 0
      for (let i = 0; i < state.list.length; i++) {
        const tab = state.list[i]
        if (tab.value === value) {
          index = i
          break
        }
      }
      commit('REMOVE_TAB', index)
      if (state.active === value) {
        const tab = state.list[state.list.length - 1]
        commit('SET_ACTIVE', tab.value)
        router.push({ name: tab.name })
      }
    }
  }
}
