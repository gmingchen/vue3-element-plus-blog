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
    width="500px"
    :title="t(`button.${ !form.id ? 'add' : 'edit' }`)"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      ref="refForm"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-position="top"
      @keyup.enter="submit()">
      <el-form-item :label="t('table.headline')" prop="title">
        <el-input
          v-model="form.title"
          :placeholder="t('table.headline')"
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <el-form-item :label="t('table.image')" prop="image">
        <div>
          <el-switch
            v-model="watermark"
            active-text="添加水印"
            inactive-text="取消水印" />
          <Upload v-model:url="form.image" :watermark="watermark" />
        </div>

      </el-form-item>
      <el-form-item :label="t('table.type')" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="item in BANNER_TYPE" :key="item.value" :label="item.value">
            {{ item[`label_${ language }`] }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="t('column.link')" prop="url">
        <el-input v-model="form.url" :placeholder="t('column.link')" maxlength="100" />
      </el-form-item>
      <el-form-item :label="t('table.sort')" prop="sort">
        <el-input-number v-model="form.sort" :min="0" />
      </el-form-item>
      <el-form-item :label="t('table.status')" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio v-for="item in STATUS" :key="item.value" :label="item.value">
            {{ item[`label_${ language }`] }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">{{ t('button.cancel') }}</el-button>
        <el-button v-repeat type="primary" @click="submit()">{{ t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

import { ElMessage } from 'element-plus'
import Upload from '@/components/upload/index.vue'

import { STATUS, BANNER_TYPE } from '@/utils/dictionary'

import { addApi, editApi, infoApi } from '@/api/console/banner'

export default defineComponent({
  components: { Upload },
  emits: ['refresh'],
  setup(_props, { emit }) {
    const { t } = useI18n()
    const store = useStore()

    const language = computed(() => store.getters['setting/language'])

    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      STATUS,
      BANNER_TYPE,
      watermark: false,
      form: {
        id: null,
        title: '',
        image: '',
        url: '',
        type: 0,
        sort: 0,
        status: 1
      }
    })

    const rules = computed(() => {
      const rule = {
        title: [{ required: true, message: t('rule.notBlank', [t('table.headline')]), trigger: 'blur' }],
        image: [{ required: true, message: t('rule.notBlank', [t('table.image')]), trigger: 'change' }]
      }
      nextTick(() => {
        refForm.value.clearValidate()
      })
      return rule
    })

    /**
     * @description: 初始化数据
     * @param {*} id
     * @return {*}
     * @author: gumingchen
     */
    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      if (data.form.id) {
        const r = await infoApi({ id: data.form.id })
        if (r) {
          data.form.title = r.data.title
          data.form.image = r.data.image
          data.form.url = r.data.url
          data.form.type = r.data.type
          data.form.sort = r.data.sort
          data.form.status = r.data.status
        }
      }
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
          const r = !data.form.id ? await addApi(data.form) : await editApi(data.form)
          if (r) {
            data.visible = false
            ElMessage({
              message: t('tip.success'),
              type: 'success'
            })
            emit('refresh')
          }
        }
      })
    }

    /**
     * @description: 弹窗关闭动画结束时的回调
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const dialogClosedHandle = () => {
      refForm.value.resetFields()
    }

    return {
      t,
      language,
      refForm,
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
