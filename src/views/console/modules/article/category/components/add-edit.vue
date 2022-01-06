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
      <el-form-item :label="t('column.name')" prop="name">
        <el-input
          v-model="form.name"
          :placeholder="t('column.name')"
          maxlength="20"
          show-word-limit />
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

import { ElMessage } from 'element-plus'

import { addApi, editApi, infoApi } from '@/api/console/category'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const { t } = useI18n()

    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      form: {
        id: null,
        name: ''
      }
    })

    const rules = computed(() => {
      const rule = {
        name: [{ required: true, message: t('rule.notBlank', [t('column.name')]), trigger: 'blur' }]
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
          data.form.name = r.data.name
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
