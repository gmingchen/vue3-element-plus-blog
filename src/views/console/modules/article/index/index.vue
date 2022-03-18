<template>
  <div>
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-input v-model="form.title" :placeholder="t('table.headline')" clearable />
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.category_ids" multiple :placeholder="t('column.category')">
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.recommended" :placeholder="t('column.recommended')">
          <el-option :label="t('button.yes')" :value="1" />
          <el-option :label="t('button.no')" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.commentable" :placeholder="t('column.commentable')">
          <el-option :label="t('button.yes')" :value="1" />
          <el-option :label="t('button.no')" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.published" :placeholder="t('column.published')">
          <el-option :label="t('button.yes')" :value="1" />
          <el-option :label="t('button.no')" :value="0" />
        </el-select>
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
      <el-table-column type="expand">
        <template #default="{ row }">
          <el-row class="margin-10">
            <el-col :span="7" class="flex-box">
              <div class="width-160">{{ t('column.cover') }}：</div>
              <div class="flex-item_f-1 ellipse-1">
                <el-image style="width: 55px; height: 55px" :src="row.cover" :preview-src-list="[row.cover]" />
              </div>
            </el-col>
            <el-col :span="7">
              <div class="flex-box">
                <div class="width-160">{{ t('console.number', [t('console.praises')]) }}：</div>
                <div class="flex-item_f-1 ellipse-1">{{ row.praise }}</div>
              </div>
              <div class="flex-box margin_t-10">
                <div class="width-160">{{ t('console.number', [t('console.comments')]) }}：</div>
                <div class="flex-item_f-1 ellipse-1">{{ row.comment }}</div>
              </div>
              <div class="flex-box margin_t-10">
                <div class="width-160">{{ t('console.number', [t('console.readings')]) }}：</div>
                <div class="flex-item_f-1 ellipse-1">{{ row.read }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row class="margin-10">
            <el-col :span="7" class="flex-box">
              <div class="width-160">{{ t('table.headline') }}：</div>
              <div class="flex-item_f-1 ellipse-1">{{ row.title }}</div>
            </el-col>
            <el-col :span="17" class="flex-box">
              <div class="width-160">{{ t('column.describe') }}：</div>
              <div class="flex-item_f-1 ellipse-1">{{ row.describe }}</div>
            </el-col>
          </el-row>
          <el-row class="margin-10">
            <el-col :span="7" class="flex-box">
              <div class="width-160">{{ t('column.category') }}：</div>
              <div class="flex-item_f-1 ellipse-1">{{ row.category_name }}</div>
            </el-col>
            <el-col :span="17" class="flex-box">
              <div class="width-160">{{ t('column.tag') }}：</div>
              <div class="flex-item_f-1 ellipse-1">
                <el-tag v-for="item in row.tags" :key="item.id" class="margin_r-5">
                  {{ item.name }}
                </el-tag>
              </div>
            </el-col>
          </el-row>
          <el-row class="margin-10">
            <el-col :span="7" class="flex-box">
              <div class="width-160">{{ t('table.createTime') }}：</div>
              <div class="flex-item_f-1 ellipse-1">{{ row.created_at }}</div>
            </el-col>
            <el-col :span="7" class="flex-box">
              <div class="width-160">{{ t('table.updateTime') }}：</div>
              <div class="flex-item_f-1 ellipse-1">{{ row.updated_at || '-' }}</div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column
        align="center"
        label="ID"
        prop="id"
        width="80" />
      <el-table-column
        align="center"
        :label="t('table.headline')"
        prop="title"
        width="150" />
      <el-table-column
        align="center"
        :label="t('column.describe')"
        prop="describe"
        show-overflow-tooltip />
      <el-table-column
        align="center"
        :label="t('column.category')"
        prop="category_name"
        width="150" />
      <el-table-column
        align="center"
        :label="t('column.recommended')"
        prop="recommended"
        width="160">
        <template #default="{ row }">
          <el-switch
            v-model="row.recommended"
            :active-value="1"
            :inactive-value="0"
            @change="statusHandle('recommended', row)" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('column.commentable')"
        prop="commentable"
        width="195">
        <template #default="{ row }">
          <el-switch
            v-model="row.commentable"
            :active-value="1"
            :inactive-value="0"
            @change="statusHandle('commentable', row)" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('column.published')"
        prop="published"
        width="160">
        <template #default="{ row }">
          <el-switch
            v-model="row.published"
            :active-value="1"
            :inactive-value="0"
            @change="statusHandle('published', row)" />
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
        width="190"
        fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            @click="commentHandle(row.id)">{{ t('button.comment') }}</el-button>
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
    <Comment v-if="visible" ref="refComment" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, nextTick, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { ElMessage, ElMessageBox } from 'element-plus'
import Comment from './components/comment.vue'

import usePage from '@/mixins/page'
import { clearJson, parseDate2Str } from '@/utils'

import { listApi as categoryListApi } from '@/api/console/category'
import { pageApi, delApi, recommendedApi, commentableApi, publishedApi } from '@/api/console/article'

export default defineComponent({
  components: { Comment },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()

    const refForm = ref()
    const refComment = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      categories: [],
      form: {
        title: '',
        category_ids: [],
        tag_ids: [],
        recommended: '',
        commentable: '',
        published: '',
        date: []
      },
      list: [],
      selection: []
    })

    /**
     * @description: 获取分类
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getCategory = async () => {
      const r = await categoryListApi()
      if (r) {
        data.categories = r.data
      }
    }

    /**
     * @description: 获取分页列表
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getList = () => {
      const params = {
        title: data.form.title,
        category_ids: data.form.category_ids,
        tag_ids: data.form.tag_ids,
        recommended: data.form.recommended,
        commentable: data.form.commentable,
        published: data.form.published,
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
     * @description: 评论弹窗
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const commentHandle = id => {
      data.visible = true
      nextTick(() => {
        refComment.value.init(id)
      })
    }

    /**
     * @description: 新增/编辑弹窗
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const addEditHandle = id => {
      router.push({
        name: 'articleWriting',
        query: { id }
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
     * @description: 状态切换
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const statusHandle = async (type, row) => {
      if (row.id) {
        const params = {
          key: row.id,
          value: ''
        }
        let r
        switch (type) {
          case 'recommended':
            params.value = row.recommended
            r = await recommendedApi(params)
            break
          case 'commentable':
            params.value = row.commentable
            r = await commentableApi(params)
            break
          case 'published':
            params.value = row.published
            r = await publishedApi(params)
            break
        }
        if (r) {
          ElMessage({
            message: t('tip.success'),
            type: 'success'
          })
        } else {
          row.is_display = row.is_display === 1 ? 0 : 1
        }
      }
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
      data.form.published = +route.params.published || ''
      getCategory()
      getList()
    })

    return {
      t,
      refForm,
      refComment,
      page,
      ...toRefs(data),
      getList,
      reacquireHandle,
      commentHandle,
      addEditHandle,
      delHandle,
      statusHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
.table-detail {
  &-box {}
  &-label {}
}
</style>
