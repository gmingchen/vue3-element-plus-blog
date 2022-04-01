<template>
  <el-sub-menu v-if="data.children && data.children.length > 0" :index="data.value + ''">
    <template #title>
      <span>{{ data[`label_${language}`] }}</span>
    </template>
    <sub-item v-for="item in data.children" :key="item.value" :data="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="data.value + ''" @click="clickHandle(data)">
    <template #title>
      <span>{{ data[`label_${language}`] }}</span>
    </template>
  </el-menu-item>
</template>

<script >
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SubItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const language = computed(() => store.getters['setting/language'])

    /**
     * 菜单点击事件
     * @param name 路由名称
     */
    const clickHandle = (data) => {
      if (data.type === 1) {
        router.push({
          name: 'search',
          query: {
            id: data.value
          }
        })
      } else {
        router.push({ name: data.value })
      }
    }

    return {
      language,
      clickHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: transparent;
}
</style>
