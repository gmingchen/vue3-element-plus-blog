<template>
  <div>
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-input v-model="form.name" :placeholder="`${t('column.username')} / ${t('column.nickname')}`" clearable />
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
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      border
      :data="list">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column
        align="center"
        label="ID"
        prop="id"
        width="80">
        <template #default="{row}">
          <icon
            v-if="row.author"
            name="author"
            class="author-icon"
            size="20px" />
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('column.avatar')"
        prop="avatar"
        width="90">
        <template #default="{ row }">
          <el-avatar :src="row.avatar" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('column.username')"
        prop="username" />
      <el-table-column
        align="center"
        :label="t('column.nickname')"
        prop="nickname" />
      <el-table-column
        align="center"
        :label="t('column.mobile')"
        prop="mobile" />
      <el-table-column
        align="center"
        :label="t('column.sex')"
        prop="sex">
        <template #default="{row}">
          {{ SEX.getLabel(row.sex) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('table.status')"
        prop="status">
        <template #default="{row}">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ STATUS.getLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('table.createTime')"
        prop="created_at" />
      <el-table-column
        align="center"
        :label="t('table.operation')"
        width="110"
        fixed="right">
        <template #default="{ row }">
          <el-button v-if="!row.author" type="text" @click="statusHandle(row)">
            {{ t(row.status === 1 ? 'table.disable' : 'table.enable') }}
          </el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
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
import { SEX, STATUS } from '@/utils/dictionary.js'

import { pageApi, statusApi } from '@/api/console/user'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const refForm = ref()
    const refAddEdit = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      form: {
        name: '',
        date: []
      },
      list: [],
      SEX,
      STATUS
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
     * @description: 禁用 / 启用
     * @param {Object} row
     * @return {*}
     * @author: gumingchen
     */
    const statusHandle = row => {
      ElMessageBox.confirm(t('tip.confirmOperationTip', [row.id, t(`table.${ row.status === 1 ? 'disable' : 'enable' }`)]), t('tip.title'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        type: 'warning'
      }).then(() => {
        const params = {
          key: row.id,
          value: row.status === 1 ? 0 : 1
        }
        statusApi(params).then(r => {
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
      refAddEdit,
      page,
      ...toRefs(data),
      getList,
      reacquireHandle,
      statusHandle,
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
