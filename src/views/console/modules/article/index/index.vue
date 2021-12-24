<template>
  <div>
    <el-button
      v-for="item in count"
      :key="item"
      type="primary"
      @click="test">{{ item }}</el-button>
    <el-button v-if="flag" type="primary" @click="test">reload</el-button>
  </div>
</template>

<script>
import { defineComponent, onMounted, nextTick, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(10)
    const flag = ref(true)
    onMounted(() => {
      console.log(222)
    })
    const test = () => {
      const el = document.documentElement
      el.style.setProperty('--el-color-primary', '#e6a23c')
      console.log(el)
      count.value++
      flag.value = false
      nextTick(() => {
        flag.value = true
        console.log(222)
      })

      // const color = getComputedStyle(el).getPropertyValue(`--el-color-primary`)
      // el.style['--el-color-primary'] = 'red'
      // console.log(getComputedStyle(el).getPropertyValue(`--el-color-primary`))
      // const a = useCssVar('--el-color-primary', el)
      // a.value = 'red'
      // console.log(a)
    }
    return {
      count,
      flag,
      test
    }
  }
})
</script>

