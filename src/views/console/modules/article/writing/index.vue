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
              <el-form-item :label="t('column.recommended')" prop="recommended">
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
              v-model="form.describe"
              type="textarea"
              :placeholder="t('column.describe')"
              :rows="6"
              resize="none"
              maxlength="100"
              show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="t('table.type')" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">Markdown</el-radio>
          <!-- <el-radio :label="2">Rich text</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="t('column.content')" prop="content">
        {{ t('column.watermark') }}&nbsp;-&nbsp;<el-switch v-model="watermark" />
        <md-editor
          v-model="form.content"
          :toolbars-exclude="mdOptions.toolbarsExclude"
          :show-code-row-number="mdOptions.showCodeRowNumber"
          :on-upload-img="uploadImage" />
      </el-form-item>
      <el-form-item>
        <el-button v-repeat type="primary" @click="submit()">{{ t('button.save') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, nextTick, toRefs, onActivated } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'

import { ElMessage } from 'element-plus'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import { listApi as categoryListApi } from '@/api/console/category'
import { listApi as tagListApi } from '@/api/console/tag'
import { infoApi, addApi, editApi } from '@/api/console/article'
import { uploadApi } from '@/api/console/oss'

export default defineComponent({
  components: { MdEditor },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      categories: [],
      tags: [],
      watermark: false,
      form: {
        id: null,
        title: '',
        type: 1,
        content: '',
        describe: '',
        category_id: '',
        recommended: 0,
        commentable: 0,
        published: 0,
        tags: []
      },
      mdOptions: {
        toolbarsExclude: ['save', 'github', 'catalog', 'htmlPreview'], // 不显示的操作栏按钮
        showCodeRowNumber: true // 是否显示行号
      }
    })
    const rules = computed(() => {
      const rule = {
        title: [{ required: true, message: t('rule.notBlank', [t('table.headline')]), trigger: 'blur' }],
        category_id: [{ required: true, message: t('rule.notBlank', [t('column.category')]), trigger: 'blur' }],
        tags: [{ type: 'array', required: true, message: t('rule.notBlank', [t('column.tag')]), trigger: 'blur' }],
        content: [{ required: true, message: t('rule.notBlank', [t('column.content')]), trigger: 'blur' }],
        describe: [{ required: true, message: t('rule.notBlank', [t('column.describe')]), trigger: 'blur' }]
      }
      nextTick(() => {
        if (refForm.value) {
          refForm.value.clearValidate()
        }
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
     * @param {Number} rout 目标路由
     * @return {*}
     * @author: gumingchen
     */
    const getInfo = async (id, rout) => {
      if (id) {
        await infoApi({ id }).then(r => {
          if (r) {
            data.form.title = r.data.title
            data.form.type = r.data.type
            data.form.content = r.data.content
            data.form.describe = r.data.describe
            data.form.category_id = r.data.category_id
            data.form.recommended = r.data.recommended
            data.form.commentable = r.data.commentable
            data.form.published = r.data.published
            data.form.tags = r.data.tags.map(item => item.id)
            store.dispatch('tabs/updateTabTitle', { route: rout, title: data.form.title })
          }
        })
      }
    }

    /**
     * @description: md图片上传
     * @param {*} files 图片列表
     * @param {*} callback 回调函数
     * @return {*}
     * @author: gumingchen
     */
    const uploadImage = async (files, callback) => {
      const arr = await Promise.all(
        Array.from(files).map(file => {
          return uploadApi(file, data.watermark)
        })
      )
      callback(arr.map(res => res.data.url))
    }

    /**
     * @description: 初始化页面数据
     * @param {Number} id 文章ID
     * @param {Number} rout 目标路由
     * @return {*}
     * @Author: gumingchen
     */
    const init = async (id, rout) => {
      data.loading = true
      await getCategory()
      await getTag()
      await getInfo(id, rout)
      nextTick(() => {
        data.loading = false
      })
    }

    /**
     * @description: 表单验证提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(async valid => {
        if (valid) {
          const params = {
            ...data.form
          }
          params.content = encodeURI(params.content)
          const r = !data.form.id ? await addApi(params) : await editApi(params)
          if (r) {
            if (r.data) {
              data.form.id = r.data
              router.push({ name: 'articleWriting', query: { id: data.form.id } })
            } else {
              store.dispatch('tabs/updateTabTitle', { route: route, title: data.form.title })
            }
            data.visible = false
            ElMessage({
              message: t('tip.success'),
              type: 'success'
            })
          }
        }
      })
    }

    /**
     * @description: 路由变化之前的事件
     * @param {Object} to 跳转路由对象
     * @return {*}
     * @Author: gumingchen
     */
    onBeforeRouteUpdate((to) => {
      refForm.value.resetFields()
      init(to.query.id, to)
    })

    onActivated(() => {
      refForm.value.resetFields()
      init(route.query.id, route)
    })

    return {
      t,
      refForm,
      ...toRefs(data),
      rules,
      uploadImage,
      submit
    }
  }
})
</script>
