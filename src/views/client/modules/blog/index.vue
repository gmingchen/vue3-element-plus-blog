<template>
  <div class="blog-container margin-0-a flex-box flex_w-wrap">
    <div class="blog-left flex-item_f-2 padding-n-20">
      <Banner />
      <ArticleCard class="margin_t-20" />
      <ArticleCard class="margin_t-20" />
      <ArticleCard class="margin_t-20" />
      <ArticleCard class="margin_t-20" />
    </div>
    <div class="blog-right flex-item_f-1 padding-n-20">
      <BusinessCard />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Banner from '@/components/banner/index.vue'
import ArticleCard from '@/components/article-card/index.vue'
import BusinessCard from '@/components/business-card/index.vue'

export default defineComponent({
  components: { Banner, BusinessCard, ArticleCard },
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
