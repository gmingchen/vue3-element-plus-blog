<template>
  <el-container class="console-layout height-full width-full">
    <Sidebar />
    <el-scrollbar class="flex-item_f-1" :view-class="layout.fixed ? 'height-full' : ''">
      <div class="flex-box flex_d-column height-full">
        <div class="head-wrap">
          <Headbar />
        </div>
        <div v-if="!refresh" class="flex-item_f-1 overflow-auto">
          <el-scrollbar>
            <View />
          </el-scrollbar>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import Sidebar from './sidebar/index.vue'
import Headbar from './headbar/index.vue'
import View from '@/components/view/index.vue'

export default defineComponent({
  components: { Sidebar, Headbar, View },
  setup() {
    const store = useStore()

    const layout = computed(() => {
      return {
        fixed: store.state.console.theme.layout.fixed
      }
    })

    const refresh = computed(() => store.state.console.refresh)

    return {
      layout,
      refresh
    }
  }
})
</script>

<style lang="scss" scoped>
.console-layout {
  .head-wrap {
    z-index: 100;
  }
}
</style>
