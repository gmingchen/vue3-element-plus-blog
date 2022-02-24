<template>
  <div>
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-input
          v-model="form.name"
          :placeholder="`${t('column.username')} / ${t('column.nickname')}`"
          maxlength="20"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.ip"
          placeholder="IP"
          maxlength="20"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.operation"
          :placeholder="t('column.operation')"
          maxlength="20"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="-"
          :start-placeholder="t('tip.startTime')"
          :end-placeholder="t('tip.endTime')"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-button v-repeat @click="reacquireHandle()">{{ t('button.search') }}</el-button>
        <el-button v-repeat @click="clearJson(form), reacquireHandle()">{{ t('button.reset') }}</el-button>
        <el-button v-repeat type="danger" @click="clearHandle()">{{ t('button.clear') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      border
      :data="list">
      <el-table-column
        align="center"
        label="ID"
        prop="id"
        width="80" />
      <el-table-column
        align="center"
        :label="`${t('column.username')} / ${t('column.nickname')}`"
        prop="username"
        min-width="160"
        show-overflow-tooltip>
        <template #default="{ row }">
          {{ row.username || row.nickname || '-' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('column.operation')"
        prop="operation"
        min-width="100"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        label="URL"
        prop="url"
        min-width="150"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        :label="t('column.requestMethod')"
        prop="method"
        width="140" />
      <el-table-column
        align="center"
        :label="t('column.parameter')"
        prop="params"
        min-width="150"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        :label="t('column.className')"
        prop="class_name"
        min-width="200"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        :label="t('column.duration')"
        prop="times"
        width="100"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        label="IP"
        prop="ip"
        width="140"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        label="User-Agent"
        prop="agent"
        min-width="150"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        :label="t('table.createTime')"
        prop="created_at"
        width="160" />
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, nextTick, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

import { ElMessage, ElMessageBox } from 'element-plus'

import usePage from '@/mixins/page'
import { clearJson, parseDate2Str } from '@/utils'

import { pageApi, truncateApi } from '@/api/console/log'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const refForm = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      form: {
        name: '',
        ip: '',
        operation: '',
        date: []
      },
      list: []
    })

    /**
     * @description: 获取分页列表
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getList = () => {
      const params = {
        name: data.form.name,
        ip: data.form.ip,
        operation: data.form.operation,
        start: data.form.date && data.form.date.length ? parseDate2Str(data.form.date[0]) : '',
        end: data.form.date && data.form.date.length ? parseDate2Str(data.form.date[1]) : '',
        current: page.current,
        size: page.size
      }
      data.loading = true
      pageApi(params).then(r => {
        if (r) {
          data.list = r.data.list
          page.total = r.data.total
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    /**
     * @description: 重新获取、重置 数据
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const reacquireHandle = () => {
      page.current = 1
      getList()
    }

    /**
     * @description: 清除
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const clearHandle = () => {
      ElMessageBox.confirm(t('tip.confirmTip', [t('button.clear')]), t('tip.title'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        type: 'warning'
      }).then(() => {
        truncateApi().then(r => {
          if (r) {
            ElMessage({
              message: t('tip.success'),
              type: 'success'
            })
            getList()
          }
        })
      })
        .catch(() => {
        // to do something on canceled
        })
    }

    /**
     * @description: 分页变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const pageChangeHandle = argPage => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      t,
      refForm,
      page,
      ...toRefs(data),
      getList,
      reacquireHandle,
      clearHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
.author-icon {
  position: absolute;
  top: 0;
  left: 0;
  color: var(--el-color-success);
}
</style>
