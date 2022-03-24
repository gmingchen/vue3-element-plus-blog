<template>
  <div class="crumb-bar-container height-52 flex-box flex_a_i-center flex_j_c-space-between padding-10">
    <div class="title flex-box flex_a_i-center">
      <g-icon
        name="location"
        size="23px"
        class="margin_r-5" />
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ name: 'home' }">{{ t('client.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'blog' }">{{ t('client.blog') }}</el-breadcrumb-item>
        <template v-for="(item, index) in data" :key="index">
          <el-breadcrumb-item :to="item.route ? item.route : route">
            {{ item.label }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script >
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()

    const clickHandle = () => {
      if (props.name) {
        router.push({
          name: props.name
        })
      }
    }

    return {
      t,
      route,
      clickHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.crumb-bar-container {
  color: var(--el-color-primary);
  font-weight: 600;
  border-radius: 4px;
  background-color: white;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
