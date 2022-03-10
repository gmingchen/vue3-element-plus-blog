<template>
  <div class="blog-container margin-0-a flex-box flex_w-wrap">
    <div class="blog-left flex-item_f-2">
      <Banner />
    </div>
    <div class="blog-right flex-item_f-1 padding-n-20">
      123
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Banner from '@/components/banner/index.vue'

export default defineComponent({
  components: { Banner },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@media screen and (max-width: 800px) {
  .blog-container {
    flex-direction: column;
  }
}

.blog-container {
  max-width: 1200px;;
  .blog-left {
    min-width: 400px;
  }
  .blog-right {
    min-width: 400px;
  }
}
</style>
