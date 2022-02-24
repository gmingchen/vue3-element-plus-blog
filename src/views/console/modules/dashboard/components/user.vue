<template>
  <div v-loading="loading" class="user-box margin_b-20 padding-n-10">
    <el-card class="card" shadow="always">
      <div ref="refChart" class="echart" />
    </el-card>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import * as echarts from 'echarts'

import { getLastDaysDate } from '@/utils'

import { userStatisticsApi } from '@/api/console/dashboard'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const refChart = ref()
    const data = reactive({
      loading: false,
      chart: null,
      option: {
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
          type: 'value',
          minInterval: 1
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
     * @description: 获取月增加用户统计-用户统计折线图
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getData = () => {
      const day = 30
      data.loading = true
      userStatisticsApi({ day }).then(r => {
        if (r) {
          const obj = {}
          r.data.forEach(item => {
            obj[item.date] = item.count
          })
          const dates = getLastDaysDate(day)
          const dataList = []

          dates.forEach(date => {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(date)) {
              dataList.push({
                date: date,
                count: obj[date]
              })
            } else {
              dataList.push({
                date: date,
                count: 0
              })
            }
          })
          data.option.xAxis.data = dataList.map(item => item.date)
          data.option.series[0].data = dataList.map(item => item.count)
        }
        data.chart = echarts.init(refChart.value)
        data.chart.setOption(data.option)
        nextTick(() => {
          data.loading = false
        })
      })
    }

    onMounted(() => {
      getData()
    })

    return {
      t,
      refChart,
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.user-box {
  height: 400px;
  min-width: 500px;
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
</style>
