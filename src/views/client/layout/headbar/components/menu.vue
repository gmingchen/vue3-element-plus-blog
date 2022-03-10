<template>
  <el-menu :default-active="active" :mode="mode">
    <sub-item v-for="item in menus" :key="item.value" :data="item" />
  </el-menu>
</template>

<script >
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'

import SubItem from './sub-item.vue'

import { listApi } from '@/api/client/category'

export default defineComponent({
  components: { SubItem },
  props: {
    mode: {
      type: String,
      default: () => 'horizontal'
    }
  },
  setup() {
    const data = reactive({
      active: '',
      menus: [
        { value: 'home', label_cn: '首页', label_en: 'Home', children: [] },
        { value: 'blog', label_cn: '博客', label_en: 'Blog', children: [] },
        {
          value: 'category',
          label_cn: '分类',
          label_en: 'Category',
          children: []
        },
        { value: 'time', label_cn: '时光轴', label_en: 'Time line', children: [] },
        { value: 'message', label_cn: '留言', label_en: 'Message', children: [] },
        { value: 'about', label_cn: '关于', label_en: 'About', children: [] }
      ]
    })

    const getCategory = () => {
      listApi().then(r => {
        if (r) {
          data.menus[2].children = r.data.map(item => {
            return {
              value: item.id,
              label_cn: item.name,
              label_en: item.name,
              type: 1
            }
          })
        }
      })
    }

    onBeforeMount(() => {
      getCategory()
    })

    return {
      ...toRefs(data),
      getCategory
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  background-color: transparent;
}
.el-menu {
  border: none;
}
</style>
