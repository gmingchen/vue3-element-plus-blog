<template>
  <span>
    <el-icon>
      <component :is="name" />
    </el-icon>
  </span>
</template>
<!--
 * 使用:
 *   1.组件模版中使用
 *      [<g-svg name="icon"></g-svg>]
 * 注意:
 *    1.name      为 element-plus svg组件名称（必填）
-->
<script>
import { defineComponent } from 'vue'
import * as ElIconModules from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ...ElIconModules
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
</script>

<style>

</style>
