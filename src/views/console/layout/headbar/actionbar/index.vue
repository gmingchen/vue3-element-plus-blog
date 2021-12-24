<template>
  <div class="console-actionbar">
    <g-icon name="refresh" @click="refreshHandle" />
    <g-icon :name="screen ? 'collapse' : 'expand'" @click="screenfullHandle" />
    <g-icon name="set" @click="themeHandle" />
    <Language />
    <el-dropdown trigger="click" @command="commandHandle">
      <img class="console-portrait margin_l-5 cursor-pointer" src="http://oss.blog.gumingchen.icu/image/slipper.jpeg">
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="blog">{{ t('console.blog') }}</el-dropdown-item>
          <el-dropdown-item command="exit" divided>{{ t('console.exit') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <ThemeDrawer ref="refThemeDrawer" />
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

import { ElMessage } from 'element-plus'
import Language from '@/components/language/index.vue'
import ThemeDrawer from '../theme-drawer/index.vue'

import screenfull from 'screenfull'

export default defineComponent({
  components: { Language, ThemeDrawer },
  setup() {
    const store = useStore()
    const { t } = useI18n()

    const refThemeDrawer = ref()

    const screen = computed(() => store.state.setting.screenfull)

    /**
     * @description: 组件刷新事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const refreshHandle = () => {
      store.dispatch('console/setRefresh', true)
      nextTick(() => {
        store.dispatch('console/setRefresh', false)
      })
    }

    /**
     * @description: 设置全屏
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const screenfullHandle = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle()
        store.dispatch('setting/setScreenfull', !screenfull.isFullscreen)
      } else {
        ElMessage({
          message: `Your browser doesn't support full screen`,
          type: 'warning'
        })
      }
    }

    const themeHandle = () => {
      console.log(2212121)
      refThemeDrawer.value.init()
    }

    /**
     * @description: 下拉点击事件
     * @param {String} command 指令
     * @return {*}
     * @author: gumingchen
     */
    const commandHandle = (command) => {
      console.log(command)
      switch (command) {
        case 'blog':
          break
        case 'exit':
          break
      }
    }

    return {
      t,
      refThemeDrawer,
      screen,
      refreshHandle,
      screenfullHandle,
      themeHandle,
      commandHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.console-actionbar {
  .iconfont{
    cursor: pointer;
  }
  .console-portrait {
    height: 40px;
    width: 40px;
    vertical-align: middle;
    border-radius: 50%;
  }
}
</style>
