<template>
  <div>
    home
    <Language />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Language from '@/components/language/index.vue'

export default defineComponent({
  components: { Language },
  setup() {
    return {}
  }
})
</script>

