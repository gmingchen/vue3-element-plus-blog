<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:58:28
-->
<template>
  <el-dialog
    v-model="visible"
    width="1000px"
    :title="t('button.detail')"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form ref="refForm" :inline="true">
      <el-form-item>
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
        :label="t('column.nickname')"
        prop="from_nickname"
        width="150">
        <template #default="{ row }">
          <icon
            v-if="row.author"
            name="author"
            class="author-icon"
            size="20px" />
          {{ row.from_nickname }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('column.content')"
        prop="content"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        :label="t('column.target')"
        prop="from_nickname"
        width="150">
        <template #default="{ row }">
          <icon
            v-if="row.author"
            name="author"
            class="author-icon"
            size="20px" />
          {{ row.type === 1 ? row.to_nickname : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('table.createTime')"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        :label="t('table.operation')"
        width="120"
        fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            @click="replyHandle(row)">{{ t('button.reply') }}</el-button>
          <el-button
            type="text"
            @click="delHandle(row.id)">{{ t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="visible = false">{{ t('button.close') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { ElMessage, ElMessageBox } from 'element-plus'

import usePage from '@/mixins/page'

import { replyPageApi, replyAddApi, replyDelApi } from '@/api/console/leave-message-reply'

export default defineComponent({
  emits: ['refresh'],
  setup() {
    const { t } = useI18n()

    const refForm = ref()
    const { page } = usePage()
    const data = reactive({
      visible: false,
      loading: false,
      form: {
        id: ''
      },
      list: [],
      selection: []
    })

    /**
     * @description: 获取分页列表
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getList = () => {
      const params = {
        id: data.form.id,
        current: page.current,
        size: page.size
      }
      data.loading = true
      replyPageApi(params).then(r => {
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
     * @description: 初始化数据
     * @param {*} id
     * @return {*}
     * @author: gumingchen
     */
    const init = (id) => {
      data.visible = true
      data.loading = false
      data.form.id = id
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
          leave_message_id: data.form.id,
          content: value,
          to_user_id: row.from_user_id,
          type: 1,
          leave_message_reply_id: row.id
        }
        replyAddApi(params).then(r => {
          if (r) {
            ElMessage({
              message: t('tip.success'),
              type: 'success'
            })
            getList()
          }
        })
      }).catch(() => {
        // to do something
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
        replyDelApi(params).then(r => {
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

    /**
     * @description: 弹窗关闭动画结束时的回调
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const dialogClosedHandle = () => {
      data.loading = false
    }

    return {
      t,
      refForm,
      page,
      ...toRefs(data),
      init,
      getList,
      replyHandle,
      delHandle,
      selectionHandle,
      pageChangeHandle,
      dialogClosedHandle
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
