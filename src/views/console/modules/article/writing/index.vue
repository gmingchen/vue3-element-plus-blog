<template>
  <div>
    <el-form
      ref="refForm"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-position="top"
      @keyup.enter="submit()">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item :label="t('table.headline')" prop="title">
            <el-input
              v-model="form.title"
              :placeholder="t('table.headline')"
              maxlength="20"
              show-word-limit />
          </el-form-item>
          <el-form-item :label="t('column.category')" prop="category_id">
            <el-select v-model="form.category_id" :placeholder="t('column.category')" class="width-full">
              <el-option
                v-for="item in categories"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('column.tag')" prop="tags">
            <el-select
              v-model="form.tags"
              multiple
              collapse-tags
              :placeholder="t('column.tag')"
              class="width-full">
              <el-option
                v-for="item in tags"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="t('column.recommended')" prop="tags">
                <el-switch
                  v-model="form.recommended"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="t('column.commentable')" prop="commentable">
                <el-switch
                  v-model="form.commentable"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="t('column.published')" prop="published">
                <el-switch
                  v-model="form.published"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="t('column.describe')" prop="describe">
            <el-input
              v-model="form.title"
              type="textarea"
              :placeholder="t('column.describe')"
              :rows="6"
              resize="none"
              maxlength="100"
              show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="t('column.content')" prop="content">
        <md-editor v-model="form.content" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, nextTick, toRefs, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import { listApi as categoryListApi } from '@/api/console/category'
import { listApi as tagListApi } from '@/api/console/tag'
import { infoApi } from '@/api/console/article'

export default defineComponent({
  components: { MdEditor },
  setup() {
    const { t } = useI18n()
    const route = useRoute()

    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      categories: [],
      tags: [],
      form: {
        id: null,
        title: '',
        content: '',
        describe: '',
        category_id: '',
        recommended: 0,
        commentable: 0,
        published: 0,
        tags: []
      }
    })
    const rules = computed(() => {
      const rule = {
        title: [{ required: true, message: t('rule.notBlank', [t('table.headline')]), trigger: 'blur' }],
        category_id: [{ required: true, message: t('rule.notBlank', [t('column.category')]), trigger: 'blur' }],
        content: [{ required: true, message: t('rule.notBlank', [t('column.content')]), trigger: 'blur' }]
      }
      nextTick(() => {
        refForm.value.clearValidate()
      })
      return rule
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
     * @description: 获取标签
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getTag = async () => {
      const r = await tagListApi()
      if (r) {
        data.tags = r.data
      }
    }

    /**
     * @description: 获取文章详情
     * @param {*} id 文章ID
     * @return {*}
     * @author: gumingchen
     */
    const getInfo = (id) => {
      if (id) {
        infoApi(id).then(r => {
          if (r) {
            //
          }
        })
      }
    }

    onBeforeMount(async () => {
      await getCategory()
      await getTag()
      getInfo(route.query.id)
    })
    return {
      t,
      refForm,
      ...toRefs(data),
      rules
    }
  }
})
</script>

