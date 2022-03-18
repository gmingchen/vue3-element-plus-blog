<template>
  <div class="title-bar-container flex-box flex_a_i-center flex_j_c-space-between padding-10">
    <div class="title flex-box flex_a_i-center">
      <g-icon
        v-if="icon"
        :name="icon"
        size="23px"
        color="red"
        class="margin_r-5" />
      <span class="font-size-20">{{ title }}</span>
    </div>
    <el-button v-if="name" type="text" @click="clickHandle">{{ t('client.more') }}</el-button>
  </div>
</template>

<script >
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    title: {
      type: [String, Number],
      required: true
    },
    icon: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      default: () => ''
    }
  },
  setup(props) {
    const { t } = useI18n()
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
      clickHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.title-bar-container {
  color: var(--el-color-primary);
  font-weight: 600;
  border-radius: 4px;
  background-color: white;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
