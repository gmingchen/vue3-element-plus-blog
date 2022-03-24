<template>
  <div v-loading="loading" class="recommend-card-container">
    <div class="box margin-10-n padding-10">
      <div class="title flex-box flex_a_i-center">
        <g-icon
          name="fire"
          size="23px"
          color="red"
          class="margin_r-5" />
        <span class="font-size-20">{{ t('client.popularArticle') }}</span>
      </div>
      <el-empty v-if="!list || list.length < 1" />
      <ArticleCardConcise
        v-for="item in list"
        :key="item.id"
        :data="item"
        class="margin_t-10" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

import ArticleCardConcise from '@/components/article-card-concise/index.vue'

export default defineComponent({
  components: { ArticleCardConcise },
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const loading = computed(() => store.state.article.readLoading)
    const list = computed(() => store.state.article.readList)

    return {
      t,
      loading,
      list
    }
  }
})
</script>

<style lang="scss" scoped>
.recommend-card-container {
  overflow: hidden;
  .box {
    position: relative;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-weight: 600;
    .title {
      color: var(--el-color-primary);
    }
  }
}
</style>
