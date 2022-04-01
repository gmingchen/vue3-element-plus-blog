<template>
  <div class="blog-container">
    <Banner class="margin_b-20" />
    <TitleBar
      :title="t('client.latestArticle')"
      icon="latest"
      name="search" />
    <el-empty v-if="!latestArticle || latestArticle.length < 1" />
    <ArticleCard
      v-for="item in latestArticle"
      :key="item.id"
      :data="item"
      class="margin_t-20" />
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import Banner from '@/components/banner/index.vue'
import TitleBar from '@/components/title-bar/index.vue'
import ArticleCard from '@/components/article-card/index.vue'

import { latestApi } from '@/api/client/article'

export default defineComponent({
  components: { Banner, TitleBar, ArticleCard },
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
</style>
