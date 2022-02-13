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
        <el-button
          v-repeat
          type="danger"
          :disabled="selection.length <= 0"
          @click="delHandle()">{{ t('button.batch', [t('button.delete')]) }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      border
      :data="list"
      @selection-change="selectionHandle">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column
        align="center"
        label="ID"
        prop="id"
        width="80" />
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
        prop="username"
        width="150" />
      <el-table-column
        align="center"
        :label="t('column.nickname')"
        prop="nickname"
        width="150" />
      <el-table-column
        align="center"
        :label="t('column.sex')"
        prop="sex"
        width="80">
        <template #default="{row}">
          {{ SEX.getLabel(row.sex) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('column.content')"
        prop="content"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        :label="t('table.createTime')"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        :label="t('table.operation')"
        width="170"
        fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            @click="replyHandle(row)">{{ t('button.reply') }}</el-button>
          <el-button
            type="text"
            @click="viewHandle(row.id)">{{ t('button.view') }}</el-button>
          <el-button
            type="text"
            @click="delHandle(row.id)">{{ t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
    <Detail v-if="visible" ref="refDetail" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, nextTick, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

import { ElMessage, ElMessageBox } from 'element-plus'
import Detail from './components/detail.vue'

import usePage from '@/mixins/page'
import { clearJson, parseDate2Str } from '@/utils'
import { SEX } from '@/utils/dictionary.js'

import { pageApi, delApi } from '@/api/console/leave-message'
import { replyAddApi } from '@/api/console/leave-message-reply'

export default defineComponent({
  components: { Detail },
  setup() {
    const { t } = useI18n()

    const refForm = ref()
    const refDetail = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        name: '',
        date: []
      },
      list: [],
      selection: [],
      SEX
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
     * @description: 回复留言
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const replyHandle = (row) => {
      ElMessageBox.prompt('', t('button.reply'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        inputType: 'textarea',
        inputPattern: /\S/,
        inputErrorMessage: t('rule.notBlank', [t('button.reply')])
      }).then(({ value }) => {
        const params = {
          leave_message_id: row.id,
          content: value,
          to_user_id: row.user_id,
          type: 0
        }
        replyAddApi(params).then(r => {
          if (r) {
            ElMessage({
              message: t('tip.success'),
              type: 'success'
            })
          }
        })
      }).catch(() => {
        // to do something
      })
    }

    /**
     * @description: 查看回复弹窗
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const viewHandle = id => {
      data.visible = true
      nextTick(() => {
        refDetail.value.init(id)
      })
    }

    /**
     * @description: 删除
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const delHandle = id => {
      let params
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id)
      }
      ElMessageBox.confirm(t('tip.confirmOperationTip', [params.join(','), id ? t('button.delete') : t('button.batch', [t('button.delete')])]), t('tip.title'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        type: 'warning'
      }).then(() => {
        delApi(params).then(r => {
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
     * @description: table多选事件
     * @param {*} val
     * @return {*}
     * @author: gumingchen
     */
    const selectionHandle = val => {
      data.selection = val
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
      refDetail,
      page,
      ...toRefs(data),
      getList,
      reacquireHandle,
      replyHandle,
      viewHandle,
      delHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>
