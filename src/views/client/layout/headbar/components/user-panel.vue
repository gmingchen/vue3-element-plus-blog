<template>
  <div>
    <div v-if="user.id" class="flex-box">
      <div class="flex-item_f-1 flex-box flex_j_c-center flex_a_i-center">
        <el-image class="avatar" :src="user.avatar" />
      </div>
      <div class="flex-item_f-3">
        <p class="name margin-10-n font-size-18">{{ user.nickname || user.username }}</p>
        <div class="flex-box">
          <div class="flex-item_f-2">
            <div class="info-box">
              <span class="label">{{ t('column.mobile') }}：</span>
              <span class="value">{{ user.mobile }}</span>
            </div>
            <div class="info-box">
              <span class="label">{{ t('column.email') }}：</span>
              <span class="value">{{ user.email || '-' }}</span>
            </div>
            <div v-if="user.author">
              <el-button type="text" @click="toConsoleHandle()">{{ t('console.title') }}</el-button>
            </div>
          </div>
          <div class="flex-item_f-1">
            <div class="info-box">
              <span class="label">{{ t('column.sex') }}：</span>
              <span class="value">{{ SEX.getLabel(user.sex) }}</span>
            </div>
            <div class="info-box">
              <span class="label">{{ t('client.join') }}：</span>
              <span class="value">{{ daysCalculation(user.created_at) }}天</span>
            </div>
            <div>
              <el-button class="exit-btn" type="text" @click="exitHandle()">{{ t('button.exit') }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { parseStr2Date } from '@/utils'
import { SEX } from '@/utils/dictionary.js'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const { t } = useI18n()

    const user = computed(() => store.state.user.user)

    const data = reactive({
      SEX
    })

    const toConsoleHandle = () => {
      router.push({ name: 'dashboard' })
    }
    const exitHandle = () => {
      store.dispatch('user/logout')
    }

    const daysCalculation = (date) => {
      const start = +parseStr2Date(date)
      const now = +new Date()
      const result = now - start
      return parseInt(result / 60 / 60 / 24 / 1000)
    }
    return {
      t,
      user,
      ...toRefs(data),
      toConsoleHandle,
      exitHandle,
      daysCalculation
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
.name {
  color: var(--el-color-primary);
}
.info-box {
  line-height: 20px;
  font-size: 12px;
  .value {
    color: var(--el-color-primary);
  }
}
.exit-btn {
  color: var(--el-color-danger);
}
</style>
