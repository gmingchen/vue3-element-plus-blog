<template>
  <drawer
    v-model="visible"
    :title="t('console.theme.title')"
    size="400px">
    <el-form class="console-theme-form" label-position="left">
      <el-divider>{{ t('console.title') }}</el-divider>
      <el-form-item :label="t('console.theme.navigationBarFixed')">
        <el-switch v-model="fixed" />
      </el-form-item>
      <el-form-item :label="t('console.theme.sidebarBackgroundColor')">
        <el-color-picker v-model="backgroundColor" />
      </el-form-item>
      <el-form-item :label="t('console.theme.menuTextColor')">
        <el-color-picker v-model="textColor" />
      </el-form-item>
      <el-form-item :label="t('console.theme.menuActiveTextColor')">
        <el-color-picker v-model="activeTextColor" />
      </el-form-item>
      <el-divider>{{ t('console.entireWebsite') }}</el-divider>
    </el-form>
  </drawer>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

import Drawer from '@/components/drawer/index.vue'

export default defineComponent({
  components: { Drawer },
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const visible = ref(false)

    const fixed = computed({
      get: () => {
        return store.state.console.theme.layout.fixed
      },
      set: (value) => {
        store.dispatch('console/setTheme', {
          layout: {
            fixed: value
          }
        })
      }
    })
    const backgroundColor = computed({
      get: () => {
        return store.state.console.theme.menu.backgroundColor
      },
      set: (value) => {
        store.dispatch('console/setTheme', {
          menu: {
            backgroundColor: value
          }
        })
      }
    })
    const textColor = computed({
      get: () => {
        return store.state.console.theme.menu.textColor
      },
      set: (value) => {
        store.dispatch('console/setTheme', {
          menu: {
            textColor: value
          }
        })
      }
    })
    const activeTextColor = computed({
      get: () => {
        return store.state.console.theme.menu.activeTextColor
      },
      set: (value) => {
        store.dispatch('console/setTheme', {
          menu: {
            activeTextColor: value
          }
        })
      }
    })

    /**
     * @description: 初始化
     * @param {*} id 字典ID
     * @return {*}
     * @Author: gumingchen
     */
    const init = () => {
      visible.value = true
    }

    return {
      t,
      init,
      visible,
      fixed,
      backgroundColor,
      textColor,
      activeTextColor
    }
  }
})
</script>

<style lang="scss">
.console-theme-form {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__content {
    text-align: right;
  }
}
</style>
