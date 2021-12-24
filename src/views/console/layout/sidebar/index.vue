<template>
  <el-scrollbar class="console-sidebar" :style="{ 'background-color': theme.backgroundColor }">
    <el-menu
      :default-active="active"
      :background-color="theme.backgroundColor"
      :text-color="theme.textColor"
      :active-text-color="theme.activeTextColor"
      :collapse="theme.collapse"
      class="console-sidebar-menu">
      <sub-item v-for="item in menus" :key="item.value" :data="item" />
    </el-menu>
  </el-scrollbar>
</template>

<script >
import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import SubItem from './sub-item.vue'

export default defineComponent({
  components: { SubItem },
  setup() {
    const store = useStore()
    const route = useRoute()

    const active = computed(() => store.state.console.menu.active)

    const theme = computed(() => {
      return {
        ...store.state.console.theme.menu,
        width: store.state.console.theme.layout.sideWidth
      }
    })

    const data = reactive({
      menus: store.state.console.menu.list
    })

    /**
     * 监听路由 设置菜单选中
     */
    watchEffect(() => {
      store.dispatch('console/setMenuActive', route.name)
    })

    return {
      active,
      theme,
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.console-sidebar {
  &-menu {
    border: none;
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
  ::v-deep(.el-menu-item), ::v-deep(.el-sub-menu), ::v-deep(.el-sub-menu__title) {
    display: block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    & > .el-sub-menu__icon-arrow {
      position: absolute;
      right: 8px;
    }
  }
}
</style>
