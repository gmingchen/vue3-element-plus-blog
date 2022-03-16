<template>
  <div v-loading="loading" class="quantity-box flex-box flex_w-wrap">
    <div class="quantity-item margin_b-20 padding-n-10 flex-item_f-1">
      <el-card shadow="always">
        <template #header>
          <div class="card-header flex-box flex_j_c-space-between">
            <span>{{ t('console.number', [t('console.articles')]) }}</span>
            <el-button class="button" type="text" @click="buttonHandle(1)">{{ t('button.add') }}</el-button>
          </div>
        </template>
        <span class="quantity font-size-30">{{ count.article }}</span>
      </el-card>
    </div>
    <div class="quantity-item margin_b-20 padding-n-10 flex-item_f-1">
      <el-card shadow="always">
        <template #header>
          <div class="card-header flex-box flex_j_c-space-between">
            <span>{{ t('console.number', [t('console.releases')]) }}</span>
            <el-button class="button" type="text" @click="buttonHandle(2)">{{ t('button.view') }}</el-button>
          </div>
        </template>
        <span class="quantity font-size-30">{{ count.release }}</span>
      </el-card>
    </div>
    <div class="quantity-item margin_b-20 padding-n-10 flex-item_f-1">
      <el-card shadow="always">
        <template #header>
          <div class="card-header flex-box flex_j_c-space-between">
            <span>{{ t('console.number', [t('console.comments')]) }}</span>
          </div>
        </template>
        <span class="quantity font-size-30">{{ count.comment }}</span>
      </el-card>
    </div>
    <div class="quantity-item margin_b-20 padding-n-10 flex-item_f-1">
      <el-card shadow="always">
        <template #header>
          <div class="card-header flex-box flex_j_c-space-between">
            <span>{{ t('console.number', [t('console.praises')]) }}</span>
          </div>
        </template>
        <span class="quantity font-size-30">{{ count.praise }}</span>
      </el-card>
    </div>
    <div class="quantity-item margin_b-20 padding-n-10 flex-item_f-1">
      <el-card shadow="always">
        <template #header>
          <div class="card-header flex-box flex_j_c-space-between">
            <span>{{ t('console.number', [t('console.readings')]) }}</span>
          </div>
        </template>
        <span class="quantity font-size-30">{{ count.read }}</span>
      </el-card>
    </div>
    <div class="quantity-item margin_b-20 padding-n-10 flex-item_f-1">
      <el-card shadow="always">
        <template #header>
          <div class="card-header flex-box flex_j_c-space-between">
            <span>{{ t('console.number', [t('console.messages')]) }}</span>
            <el-button class="button" type="text" @click="buttonHandle(3)">{{ t('button.view') }}</el-button>
          </div>
        </template>
        <span class="quantity font-size-30">{{ count.message }}</span>
      </el-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { quantityStatisticsApi } from '@/api/console/dashboard'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    const data = reactive({
      loading: false,
      count: {
        article: 0,
        release: 0,
        comment: 0,
        praise: 0,
        read: 0,
        message: 0
      }
    })

    /**
     * @description: 获取数据统计
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getData = () => {
      data.loading = true
      quantityStatisticsApi().then(r => {
        if (r) {
          data.count = r.data
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    /**
     * @description: 按钮事件
     * @param {Number} type 1-新增文章 2-查看发布的文章列表 3-查看留言
     * @return {*}
     * @author: gumingchen
     */
    const buttonHandle = (type) => {
      switch (type) {
        case 1:
          router.push({ name: 'articleWriting' })
          break
        case 2:
          router.push({ name: 'articleIndex', params: { published: 1 } })
          break
        case 3:
          router.push({ name: 'leaveMessage' })
          break
      }
    }

    onMounted(() => {
      getData()
    })

    return {
      t,
      ...toRefs(data),
      buttonHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.quantity-box {
  .quantity-item {
    min-width: 200px;
    cursor: pointer;
    .quantity {
      font-weight: 600;
    }
  }
}
</style>
