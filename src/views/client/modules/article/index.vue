<template>
  <div>123</div>
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    onBeforeRouteUpdate(() => {
      console.log(8888)
    })

    onBeforeMount(() => {
      console.log(123)
    })
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
