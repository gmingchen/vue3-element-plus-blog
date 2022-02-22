<template>
  <div class="dashboard-container">
    <div class="statistics flex-box flex_w-wrap">
      <div class="statistics-item margin_b-20 padding-n-10 flex-item_f-1">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header flex-box flex_j_c-space-between">
              <span>{{ t('console.number', [t('console.articles')]) }}</span>
              <el-button class="button" type="text" @click="buttonHandle(1)">{{ t('button.add') }}</el-button>
            </div>
          </template>
          <span class="quantity">{{ count.article }}</span>
        </el-card>
      </div>
      <div class="statistics-item margin_b-20 padding-n-10 flex-item_f-1">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header flex-box flex_j_c-space-between">
              <span>{{ t('console.number', [t('console.releases')]) }}</span>
              <el-button class="button" type="text" @click="buttonHandle(2)">{{ t('button.view') }}</el-button>
            </div>
          </template>
          <span class="quantity">{{ count.release }}</span>
        </el-card>
      </div>
      <div class="statistics-item margin_b-20 padding-n-10 flex-item_f-1">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header flex-box flex_j_c-space-between">
              <span>{{ t('console.number', [t('console.comments')]) }}</span>
            </div>
          </template>
          <span class="quantity">{{ count.comment }}</span>
        </el-card>
      </div>
      <div class="statistics-item margin_b-20 padding-n-10 flex-item_f-1">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header flex-box flex_j_c-space-between">
              <span>{{ t('console.number', [t('console.readings')]) }}</span>
            </div>
          </template>
          <span class="quantity">{{ count.read }}</span>
        </el-card>
      </div>
      <div class="statistics-item margin_b-20 padding-n-10 flex-item_f-1">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header flex-box flex_j_c-space-between">
              <span>{{ t('console.number', [t('console.messages')]) }}</span>
              <el-button class="button" type="text" @click="buttonHandle(3)">{{ t('button.view') }}</el-button>
            </div>
          </template>
          <span class="quantity">{{ count.message }}</span>
        </el-card>
      </div>
    </div>
    <div class="user margin_b-20 padding-n-10">
      <el-card class="card" shadow="none">
        <div ref="refUser" class="echart" />
      </el-card>
    </div>
    <div class="dynamic flex-box flex_w-wrap">
      <div class="margin_b-20 padding-n-10 flex-item_f-1">
        <el-card class="card" shadow="none">
          <template #header>
            <div class="card-header flex-box flex_j_c-space-between">
              <span>{{ t('console.developments') }}</span>
            </div>
          </template>
        </el-card>
      </div>
      <div class="margin_b-20 padding-n-10 flex-item_f-1">
        <el-card class="card" shadow="none">
          <template #header>
            <div class="card-header flex-box flex_j_c-space-between">
              <span>{{ t('console.log') }}</span>
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import * as echarts from 'echarts'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    const refUser = ref()
    const data = reactive({
      count: {
        article: 1,
        release: 2,
        comment: 3,
        read: 4,
        message: 5
      },
      userChart: null,
      userOption: {
        title: {
          text: '近30天新增用户',
          left: 'center'
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      }
    })

    /**
     * @description: 用户统计折线图
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const userChartInit = () => {
      data.userChart = echarts.init(refUser.value)
      data.userChart.setOption(data.userOption)
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
      userChartInit()
    })

    return {
      t,
      refUser,
      ...toRefs(data),
      buttonHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  ::v-deep(.el-card__header) {
    padding: 5px 20px;
    .card-header {
      line-height: 32px;
      span {
        font-size: 14px;
      }
    }
  }
  .statistics {
    &-item {
      min-width: 200px;
      max-width: 20%;
      cursor: pointer;
      .quantity {
        font-size: 30px;
        font-weight: 600;
      }
    }
  }
  .user {
    height: 400px;
    .card {
      height: 100%;
      width: 100%;
      ::v-deep(.el-card__body) {
        height: 100%;
        width: 100%;
      }
      .echart {
        height: 100%;
        width: 100%;
      }
    }
  }
  .dynamic {
    & > div {
      min-width: 400px;
    }
  }
}

</style>
