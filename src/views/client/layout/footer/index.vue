<template>
  <div v-loading="loading" class="footer-container padding-25-n font-size-14">
    <div class="image-box flex-box flex_a_i-flex-end flex_j_c-center flex_w-wrap">
      <div class="margin-n-20 width-120 text-align-center">
        <el-image :src="settings.wechat_group" :preview-src-list="[settings.wechat_group]" />
        <p class="margin_b-0">{{ t('column.wechatGroup') }}</p>
      </div>
      <div class="margin-n-20 width-120 text-align-center">
        <el-image :src="settings.qq_group" :preview-src-list="[settings.qq_group]" />
        <p class="margin_b-0">{{ t('column.qqGroup') }}</p>
      </div>
      <div class="margin-n-20 width-120 text-align-center">
        <el-image :src="settings.official_account" :preview-src-list="[settings.official_account]" />
        <p class="margin_b-0">{{ t('column.officialAccount') }}</p>
      </div>
    </div>
    <el-divider />
    <div class="detail-box text-align-center">
      <p class="margin_b-0">{{ settings.describe }}</p>
      <p class="margin_b-0">
        Copyright © <a :href="settings.link">{{ settings.link }}</a> {{ t('client.copyright') }}
      </p>
      <p class="margin_b-0">
        {{ t('column.recordNumber') }}：<a :href="settings.record_number_link">{{ settings.record_number }}</a></p>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const loading = computed(() => store.state.client.loading)
    const settings = computed(() => store.state.client.settings)

    return {
      t,
      loading,
      settings
    }
  }
})
</script>

<style lang="scss" scoped>
.footer-container {
  min-width: 350px;
  background-color: rgba($color: black, $alpha: 1);
  color: var(--el-color-info);
  .image-box {
    & > div {
      min-width: 120px;
    }
  }
  .detail-box {
    & > p {
      a {
        text-decoration: none;
        color: var(--el-color-info);;
        &:hover {
          text-decoration: underline;
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
