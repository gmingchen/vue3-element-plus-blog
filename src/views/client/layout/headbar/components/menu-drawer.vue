<template>
  <div class="menu-drawer-box">
    <el-drawer
      v-model="visible"
      size="100%"
      :show-close="false"
      :modal="false"
      custom-class="menu-drawer">
      <UserPanel />
      <Menu mode="vertical" />
    </el-drawer>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

import Menu from './menu.vue'
import UserPanel from './user-panel.vue'

import useModel from '@/mixins/model'

export default defineComponent({
  components: { Menu, UserPanel },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const visible = useModel(props, 'modelValue')

    const init = () => {
      visible.value = true
    }
    return {
      visible,
      init
    }
  }
})
</script>

<style lang="scss">
$height: 60px;

.menu-drawer-box {
  & > div {
    z-index: 0!important;
    top: $height!important;
    .el-drawer {
      // background-color: #f2f2f2;
      background-color: white;
      box-shadow: none;
      bottom: unset;
      .el-drawer__header {
        display: none;
      }
      .el-drawer__body {
        padding: 0;
        flex: unset;
      }
    }
  }
}
</style>
