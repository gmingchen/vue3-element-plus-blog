<template>
  <div class="blog-container margin-0-a flex-box flex_w-wrap">
    <div class="blog-left flex-item_f-2 padding-n-20">
      <Banner />
      <TitleBar
        class="margin_t-20"
        :title="t('client.latestArticle')"
        icon="latest"
        name="blog" />
      <ArticleCard
        v-for="item in latestArticle"
        :key="item.id"
        :data="item"
        class="margin_t-20" />
    </div>
    <div class="blog-right flex-item_f-1 padding-n-20">
      <BusinessCard />
      <RecommendCard class="margin_t-10" />
      <PopularityCard class="margin_t-10" />
      <ContactCard class="margin_t-10" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import Banner from '@/components/banner/index.vue'
import TitleBar from '@/components/title-bar/index.vue'
import ArticleCard from '@/components/article-card/index.vue'
import BusinessCard from '@/components/business-card/index.vue'
import RecommendCard from '@/components/recommend-card/index.vue'
import PopularityCard from '@/components/popularity-card/index.vue'
import ContactCard from '@/components/contact-card/index.vue'

import { latestApi } from '@/api/client/article'

export default defineComponent({
  components: { Banner, TitleBar, BusinessCard, ArticleCard, RecommendCard, PopularityCard, ContactCard },
  setup() {
    const { t } = useI18n()

    const data = reactive({
      latestArticle: []
    })

    const getLatestArticle = () => {
      latestApi({ limit: 10 }).then(r => {
        if (r) {
          data.latestArticle = r.data
        }
      })
    }

    onBeforeMount(() => {
      getLatestArticle()
    })

    return {
      t,
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>
@media screen and (max-width: 800px) {
  .blog-container {
    flex-direction: column;
  }
}
@media screen and (max-width: 400px) {
  .blog-left, .blog-right {
    padding: 0;
  }
}

.blog-container {
  max-width: 1200px;
  .blog-left {
    min-width: 350px;
  }
  .blog-right {
    min-width: 350px;
  }
}
</style>
