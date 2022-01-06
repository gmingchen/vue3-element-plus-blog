<template>
  <div class="console-actionbar">
    <g-icon name="refresh" @click="refreshHandle" />
    <g-icon :name="screen ? 'collapse' : 'expand'" @click="screenfullHandle" />
    <g-icon name="set" @click="themeHandle" />
    <Language />
    <el-dropdown trigger="click" @command="commandHandle">
      <img
        :style="{ height: `${ height- 5 }px`, width: `${ height- 5 }px` }"
        class="console-portrait margin_l-5 cursor-pointer"
        src="http://oss.blog.gumingchen.icu/image/slipper.jpeg">
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="blog">{{ t('console.enterBlog') }}</el-dropdown-item>
          <el-dropdown-item command="exit" divided>{{ t('console.exit') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <ThemeDrawer ref="refThemeDrawer" />
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

import { ElMessage } from 'element-plus'
import Language from '@/components/language/index.vue'
import ThemeDrawer from '../theme-drawer/index.vue'

import screenfull from 'screenfull'

export default defineComponent({
  components: { Language, ThemeDrawer },
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const refThemeDrawer = ref()

    const screen = computed(() => store.state.setting.screenfull)
    const height = computed(() => store.state.console.theme.layout.headHeight)

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

    /**
     * @description: 打开主题抽屉
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const themeHandle = () => {
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
      height,
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
    vertical-align: middle;
    border-radius: 50%;
  }
}
</style>
