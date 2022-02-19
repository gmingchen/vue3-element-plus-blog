<template>
  <el-tabs
    v-model="active"
    class="console-tabsbar"
    :style="{height: tabsHeight + 'px' }"
    @tab-click="clickHandle"
    @tab-remove="removeHandle">
    <el-tab-pane
      v-for="(item, index) in tabs"
      :key="item.value"
      :label="item[`title_${language}`]"
      :name="item.value"
      :closable="index !== 0" />
  </el-tabs>
</template>

<script>
import { computed, defineComponent, onBeforeMount, nextTick } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const tabsHeight = computed(() => store.state.console.theme.layout.tabsHeight)
    const language = computed(() => store.state.setting.language)
    const active = computed({
      get: () => {
        return store.state.tabs.active
      },
      set: (value) => {
        store.dispatch('tabs/setActive', value)
      }
    })
    const tabs = computed(() => store.state.tabs.list)

    /**
     * @description: 标签点击事件
     * @param {Number} index 当前标签的索引
     * @return {*}
     * @Author: gumingchen
     */
    const clickHandle = ({ index }) => {
      const tab = tabs.value[index]
      router.push({
        name: tab.name,
        query: tab.query,
        params: tab.params
      })
    }

    /**
     * @description: 标签移除事件
     * @param {String} value 标签的值
     * @return {*}
     * @Author: gumingchen
     */
    const removeHandle = (value) => {
      store.dispatch('tabs/removeHandle', value)
    }

    /**
     * @description: 路由变化之前的事件：设置tabs
     * @param {Object} to 跳转路由对象
     * @return {*}
     * @Author: gumingchen
     */
    onBeforeRouteUpdate((to) => {
      store.dispatch('tabs/changeHandle', to)
      const meta = to.meta
      if (meta.multiple) {
        store.dispatch('console/setRefresh', true)
        nextTick(() => {
          store.dispatch('console/setRefresh', false)
        })
      }
    })

    /**
     * @description: 载入事件：设置tabs
     * @return {*}
     * @Author: gumingchen
     */
    onBeforeMount(() => {
      store.dispatch('tabs/changeHandle', route)
    })

    return {
      tabsHeight,
      language,
      active,
      tabs,
      clickHandle,
      removeHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.console-tabsbar {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  ::v-deep(.el-tabs__header) {
    margin: 0;
    .el-tabs__nav-scroll {
      padding: 0 10px;
    }
    &,
    .el-tabs__nav-wrap,
    .el-tabs__nav-scroll,
    .el-tabs__nav,
    .el-tabs__item {
      height: 100%;
    }
    .el-tabs__nav {
      display: flex;
      .el-tabs__item {
        display: flex;
        align-items: center;
      }
    }
    .el-tabs__nav-wrap::after {
      height: 0px;
    }
  }
}
</style>
