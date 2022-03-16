<template>
  <div class="footer-container padding-10">页脚</div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const settings = computed(() => store.state.client.settings)

    return {
      settings
    }
  }
})
</script>

<style lang="scss" scoped>
.footer-container {
  background-color: black;
  color: white;
}
</style>
