<template>
  <div v-loading="loading" class="recommend-card-container">
    <div class="box margin-10-n padding_t-30 padding_r-40 padding_b-40 padding_l-40 font-size-16 text-align-center">
      <p>{{ t('client.contactMe') }}</p>
      <p>{{ t('client.contactDirection') }}</p>
      <p>{{ t('client.sendTo') }}</p>
      <el-input
        v-model="email"
        size="large"
        readonly
        class="margin_t-10">
        <template #append>
          <el-button class="send-btn" @click="clickHandle">
            <g-icon name="send-email" size="26px" />
          </el-button>
        </template>
      </el-input>
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
    const email = computed(() => store.state.client.settings.email)

    const clickHandle = () => {
      // window.open(`http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=${ email.value }`)
      window.open(`mailto:${ email.value }`)
    }

    return {
      t,
      loading,
      email,
      clickHandle
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
    color: var(--el-color-info);
    p {
      margin: 0;
      line-height: 36px;
    }
    .send-btn {
      padding: 0 15px;
      color: var(--el-color-primary)
    }
  }
}
</style>
