<template>
  <div class="console-headbar padding-n-10 flex-box" :style="{ 'line-height': `${ layout.height }px` }">
    <g-icon :name="`collapse-${ layout.collapse ? 'right' : 'left' }`" @click="collapseHandle" />
    <Crumb class="flex-item_f-1 margin_l-10" />
    <Actionbar />
  </div>
</template>

<script >
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import Crumb from './crumb/index.vue'
import Actionbar from './actionbar/index.vue'

export default defineComponent({
  components: { Crumb, Actionbar },
  setup() {
    const store = useStore()

    const layout = computed(() => {
      return {
        height: store.state.console.theme.layout.headHeight,
        collapse: store.state.console.theme.menu.collapse
      }
    })

    const collapseHandle = () => {
      store.dispatch('console/setTheme', {
        menu: {
          collapse: !layout.value.collapse
        }
      })
    }

    return {
      layout,
      collapseHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.console-headbar {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .iconfont{
    cursor: pointer;
  }
}
</style>
