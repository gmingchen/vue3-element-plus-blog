<template>
  <div class="dashboard-container">
    <Quantity />
    <User />
    <div class="dynamic flex-box flex_w-wrap">
      <div class="margin_b-20 padding-n-10 flex-item_f-1">
        <Dynamic />
      </div>
      <div class="margin_b-20 padding-n-10 flex-item_f-1">
        <Log />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Quantity from './components/quantity.vue'
import User from './components/user.vue'
import Dynamic from './components/dynamic.vue'
import Log from './components/log.vue'

export default defineComponent({
  components: { Quantity, User, Dynamic, Log },
  setup() {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  ::v-deep(.el-card__header) {
    padding: 5px 20px;
    .card-header {
      line-height: 32px;
      span {
        font-size: 14px;
      }
    }
  }
  .dynamic {
    & > div {
      min-width: 500px;
    }
    ::v-deep(.el-card__body) {
      padding: 0px 20px 20px 20px;
    }
  }
}
</style>
