<template>
  <div>{{ route.params.categoryId }}-{{ route.params.categoryName }}-{{ route.params.keyword }}</div>
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
    return {
      route
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
