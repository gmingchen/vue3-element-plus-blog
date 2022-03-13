<template>
  <el-card class="log-box" shadow="always">
    <template #header>
      <div class="card-header flex-box flex_j_c-space-between">
        <span>{{ t('console.log') }}</span>
        <el-button class="button" type="text" @click="jumpHandle()">{{ t('button.view') }}</el-button>
      </div>
    </template>
    <ul v-if="list.length">
      <li v-for="item in list" :key="item.id" class="article flex-box flex_j_c-space-between">
        <div class="info ellipse-1">{{ item.username || item.nickname || '-' }}</div>
        <div class="info ellipse-1">{{ item.operation }}</div>
        <div class="info ellipse-1">{{ item.ip }}</div>
        <div class="date font-size-12">{{ parseTime(item.created_at) }}</div>
      </li>
    </ul>
    <el-empty v-else />
  </el-card>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { parseTime } from '@/utils'

import { latestLogApi } from '@/api/console/dashboard'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    const data = reactive({
      loading: false,
      list: []
    })

    /**
     * @description: 获取最近发布的文章
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getList = () => {
      data.loading = true
      latestLogApi({ limit: 5 }).then(r => {
        if (r) {
          data.list = r.data
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    /**
     * @description: 跳转日志列表页
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const jumpHandle = () => {
      router.push({ name: 'systemLog' })
    }

    onMounted(() => {
      getList()
    })

    return {
      t,
      ...toRefs(data),
      jumpHandle,
      parseTime
    }
  }
})
</script>

<style lang="scss" scoped>
.log-box {
  ul {
    li {
      font-size: 14px;
      line-height: 40px;
      .info {
        width: calc((100% - 120px) / 3);
      }
      .date {
        width: 120px;
        text-align: right;
        color: var(--el-text-color-placeholder);
      }
    }
    li + li {
      border-top: 1px solid var(--el-border-color-light);
    }
  }
}
</style>
