<template>
  <el-sub-menu v-if="data.children && data.children.length > 0" :index="data.value + ''">
    <template #title>
      <g-icon :name="data.icon" class="padding_r-5" />
      <span>{{ data[`label_${language}`] }}</span>
    </template>
    <sub-item v-for="item in data.children" :key="item.value" :data="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="data.value + ''" @click="clickHandle(data.value)">
    <g-icon :name="data.icon" class="padding_r-5" />
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
    const clickHandle = (name) => {
      router.push({ name: name })
    }

    return {
      language,
      clickHandle
    }
  }
})
</script>

<style>

</style>
