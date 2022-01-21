<template>
  <div>
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-input v-model="form.name" :placeholder="t('column.name')" clearable />
      </el-form-item>
      <el-form-item>
        <el-button v-repeat @click="reacquireHandle()">{{ t('button.search') }}</el-button>
        <el-button v-repeat @click="clearJson(form), reacquireHandle()">{{ t('button.reset') }}</el-button>
        <el-button v-repeat type="primary" @click="addEditHandle()">{{ t('button.add') }}</el-button>
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
        :label="t('table.headline')"
        prop="title" />
      <el-table-column
        align="center"
        :label="t('table.image')"
        prop="image">
        <template #default="{ row }">
          <el-image
            class="img"
            :src="row.image"
            :preview-src-list="[row.image]" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('table.watermarkImage')"
        prop="watermark">
        <template #default="{ row }">
          <el-image
            class="img"
            :src="row.watermark"
            :preview-src-list="[row.watermark]" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('column.link')"
        prop="url" />
      <el-table-column
        align="center"
        :label="t('table.type')"
        prop="type"
        width="100">
        <template #default="{ row }">
          {{ BANNER_TYPE.getLabel(row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('table.sort')"
        prop="sort" />
      <el-table-column
        align="center"
        :label="t('table.status')"
        prop="status"
        width="100">
        <template #default="{ row }">
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
          <el-button
            type="text"
            @click="addEditHandle(row.id)">{{ t('button.edit') }}</el-button>
          <el-button
            type="text"
            @click="delHandle(row.id)">{{ t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
    <add-edit v-if="visible" ref="refAddEdit" @refresh="getList" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, nextTick, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import usePage from '@/mixins/page'
import { STATUS, BANNER_TYPE } from '@/utils/dictionary'
import { clearJson } from '@/utils'

import { pageApi, delApi } from '@/api/console/banner'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const { t } = useI18n()

    const refForm = ref()
    const refAddEdit = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      STATUS,
      BANNER_TYPE,
      form: {
        name: ''
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
        ...data.form,
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
     * @description: 新增/编辑弹窗
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const addEditHandle = id => {
      data.visible = true
      nextTick(() => {
        refAddEdit.value.init(id)
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
        delApi({ ids: params }).then(r => {
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
      refAddEdit,
      page,
      ...toRefs(data),
      getList,
      reacquireHandle,
      addEditHandle,
      delHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
.img {
  height: 100px;
  width: 100px;
}
</style>
