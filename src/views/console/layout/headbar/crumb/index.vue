<template>
  <el-breadcrumb separator="/" :style="{ 'line-height': `${ height }px` }">
    <el-breadcrumb-item
      v-for="item in crumbs"
      :key="item.value"
      :to="{ name: item.value }">
      {{ item[`label_${language}`] }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    const language = computed(() => store.getters['setting/language'])
    const height = computed(() => store.state.console.theme.layout.headHeight)

    const data = reactive({
      menus: store.state.menu.list,
      crumbs: []
    })

    /**
     * @description: 通过路由名称递归计算当前面包屑
     * @param {Array} menus 菜单列表
     * @return {*}
     * @author: gumingchen
     */
    const crumbHandle = (menus) => {
      let flag = false
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i]
        if (menu.children && menu.children.length > 0) {
          if (crumbHandle(menu.children)) {
            data.crumbs.push({
              value: menu.value,
              label_cn: menu.label_cn,
              label_en: menu.label_en
            })
          }
        } else {
          if (route.name === menu.value) {
            flag = true
            data.crumbs.push({
              value: menu.value,
              label_cn: menu.label_cn,
              label_en: menu.label_en
            })
            break
          }
        }
      }
      return flag
    }

    watchEffect(() => {
      data.crumbs = []
      crumbHandle(data.menus)
      data.crumbs = data.crumbs.reverse()
    })

    return {
      language,
      height,
      ...toRefs(data)
    }
  }
})
</script>

<style>

</style>
