<template>
  <drawer
    v-model="visible"
    :title="t('console.theme.title')"
    size="400px"
    append-to-body>
    <el-form class="console-theme-form margin_b-5" label-position="left">
      <el-divider>{{ t('console.title') }}</el-divider>
      <el-form-item :label="t('console.theme.navigationBarFixed')">
        <el-switch v-model="headFixed" />
      </el-form-item>
      <el-form-item :label="t('console.theme.navigationBarHeight')">
        <div class="margin-n-12">
          <el-slider v-model="headHeight" :min="40" :max="70" />
        </div>
      </el-form-item>
      <el-form-item :label="t('console.theme.tabBarDisplay')">
        <el-switch v-model="tabsDisplay" />
      </el-form-item>
      <el-form-item :label="t('console.theme.tabBarHeight')">
        <div class="margin-n-12">
          <el-slider v-model="tabsHeight" :min="40" :max="70" />
        </div>
      </el-form-item>
      <el-form-item :label="t('console.theme.sidebarBackgroundColor')">
        <el-color-picker v-model="backgroundColor" show-alpha />
      </el-form-item>
      <el-form-item :label="t('console.theme.menuTextColor')">
        <el-color-picker v-model="textColor" show-alpha />
      </el-form-item>
      <el-form-item :label="t('console.theme.menuActiveTextColor')">
        <el-color-picker v-model="activeTextColor" show-alpha />
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="resetThemeHandle('console')">重置</el-button>
      </el-form-item>
      <el-divider>{{ t('console.entireWebsite') }}</el-divider>
      <el-form-item :label="t('language.title')">
        <Language />
      </el-form-item>
      <el-form-item label="primary">
        <el-color-picker v-model="primary" />
      </el-form-item>
      <el-form-item label="success">
        <el-color-picker v-model="success" />
      </el-form-item>
      <el-form-item label="warning">
        <el-color-picker v-model="warning" />
      </el-form-item>
      <el-form-item label="danger">
        <el-color-picker v-model="danger" />
      </el-form-item>
      <el-form-item label="error">
        <el-color-picker v-model="error" />
      </el-form-item>
      <el-form-item label="info">
        <el-color-picker v-model="info" />
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="resetThemeHandle('global')">重置</el-button>
      </el-form-item>
    </el-form>
  </drawer>
</template>

<script>
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

import Drawer from '@/components/drawer/index.vue'
import Language from '@/components/language/index.vue'

export default defineComponent({
  components: { Drawer, Language },
  setup() {
    const { t, locale } = useI18n()
    const store = useStore()

    const visible = ref(false)
    // 控制台
    const headFixed = computed({
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
    const headHeight = computed({
      get: () => {
        return store.state.console.theme.layout.headHeight
      },
      set: (value) => {
        store.dispatch('console/setTheme', {
          layout: {
            headHeight: value
          }
        })
      }
    })
    const tabsDisplay = computed({
      get: () => {
        return store.state.console.theme.layout.tabsDisplay
      },
      set: (value) => {
        store.dispatch('console/setTheme', {
          layout: {
            tabsDisplay: value
          }
        })
      }
    })
    const tabsHeight = computed({
      get: () => {
        return store.state.console.theme.layout.tabsHeight
      },
      set: (value) => {
        store.dispatch('console/setTheme', {
          layout: {
            tabsHeight: value
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
    // 是否重新加载组件 使用 v-if 的方式
    const reload = computed({
      get: () => {
        return store.state.setting.reload
      },
      set: (val) => {
        store.dispatch('setting/setReload', val)
      }
    })

    /**
     * 重新加载组件
     */
    const reloadHandle = () => {
      reload.value = true
      nextTick(() => {
        reload.value = false
      })
    }
    // 全站
    const primary = computed({
      get: () => {
        return store.state.setting.theme.primary
      },
      set: (value) => {
        store.dispatch('setting/setTheme', {
          primary: value
        })
        reloadHandle()
      }
    })
    const success = computed({
      get: () => {
        return store.state.setting.theme.success
      },
      set: (value) => {
        store.dispatch('setting/setTheme', {
          success: value
        })
        reloadHandle()
      }
    })
    const warning = computed({
      get: () => {
        return store.state.setting.theme.warning
      },
      set: (value) => {
        store.dispatch('setting/setTheme', {
          warning: value
        })
        reloadHandle()
      }
    })
    const danger = computed({
      get: () => {
        return store.state.setting.theme.danger
      },
      set: (value) => {
        store.dispatch('setting/setTheme', {
          danger: value
        })
        reloadHandle()
      }
    })
    const error = computed({
      get: () => {
        return store.state.setting.theme.error
      },
      set: (value) => {
        store.dispatch('setting/setTheme', {
          error: value
        })
        reloadHandle()
      }
    })
    const info = computed({
      get: () => {
        return store.state.setting.theme.info
      },
      set: (value) => {
        store.dispatch('setting/setTheme', {
          info: value
        })
        reloadHandle()
      }
    })

    /**
     * @description: 重置主题
     * @param {String} type global-全站 console-控制台
     * @return {*}
     * @Author: gumingchen
     */
    const resetThemeHandle = (type) => {
      if (type === 'global') {
        store.dispatch('setting/resetTheme')
        locale.value = 'cn'
        reloadHandle()
      } else if (type === 'console') {
        store.dispatch('console/resetTheme')
      }
    }

    /**
     * @description: 初始化
     * @param {*}
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
      headFixed,
      headHeight,
      tabsDisplay,
      tabsHeight,
      backgroundColor,
      textColor,
      activeTextColor,
      primary,
      success,
      warning,
      danger,
      error,
      info,
      resetThemeHandle
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
