<template>
  <div class="layout-container margin-0-a flex-box flex_w-wrap">
    <div class="layout-left flex-item_f-2 padding-n-20">
      <View />
    </div>
    <div class="layout-right flex-item_f-1 padding-n-20">
      <BusinessCard />
      <SearchCard class="margin_t-10" />
      <RecommendCard class="margin_t-10" />
      <PopularityCard class="margin_t-10" />
      <ContactCard class="margin_t-10" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import View from '@/components/view/index.vue'
import BusinessCard from '@/components/business-card/index.vue'
import SearchCard from '@/components/search-card/index.vue'
import RecommendCard from '@/components/recommend-card/index.vue'
import PopularityCard from '@/components/popularity-card/index.vue'
import ContactCard from '@/components/contact-card/index.vue'

export default defineComponent({
  components: { View, BusinessCard, SearchCard, RecommendCard, PopularityCard, ContactCard },
  setup() {
    const { t } = useI18n()

    return {
      t
    }
  }
})
</script>

<style lang="scss" scoped>
@media screen and (max-width: 800px) {
  .layout-container {
    flex-direction: column;
  }
}
@media screen and (max-width: 400px) {
  .layout-left, .layout-right {
    padding: 0;
  }
}

.layout-container {
  max-width: 1200px;
  .layout-left {
    min-width: 350px;
  }
  .layout-right {
    min-width: 350px;
  }
}
</style>
