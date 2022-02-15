<template>
  <div>
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
        :label="t('column.name')"
        prop="name" />
      <el-table-column
        align="center"
        :label="t('column.key')"
        prop="json_key" />
      <el-table-column
        align="center"
        :label="t('column.value')"
        prop="json_value"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        :label="t('table.remark')"
        prop="remark" />
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
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        :label="t('table.updateTime')"
        prop="updated_at"
        width="160" />
      <el-table-column
        align="center"
        :label="t('table.operation')"
        width="110"
        fixed="right">
        <template #default="{ row }">
          <el-button v-if="row.status === 0" type="text" @click="statusHandle(row)">
            {{ t(row.status === 1 ? 'table.disable' : 'table.enable') }}
          </el-button>
          <el-button type="text" @click="setHandle(row)">
            {{ t('button.set') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Set v-if="visible" ref="refSet" @refresh="getList" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, nextTick, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

import { ElMessage, ElMessageBox } from 'element-plus'
import Set from './components/set.vue'

import { STATUS } from '@/utils/dictionary.js'

import { listApi, statusApi } from '@/api/console/config'

export default defineComponent({
  components: { Set },
  setup() {
    const { t } = useI18n()

    const refSet = ref()
    const data = reactive({
      loading: false,
      visible: false,
      list: [],
      STATUS
    })

    /**
     * @description: 获取分页列表
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getList = () => {
      data.loading = true
      listApi().then(r => {
        if (r) {
          data.list = r.data
        }
        nextTick(() => {
          data.loading = false
        })
      })
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
     * @description: 设置弹窗
     * @param {Object} row
     * @return {*}
     * @author: gumingchen
     */
    const setHandle = row => {
      data.visible = true
      nextTick(() => {
        refSet.value.init(row.id)
      })
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      t,
      refSet,
      ...toRefs(data),
      getList,
      statusHandle,
      setHandle
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
