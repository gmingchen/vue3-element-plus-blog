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
    :title="t('button.set')"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      ref="refForm"
      v-loading="loading"
      :model="form"
      label-position="top"
      @keyup.enter="submit()">
      <el-form-item v-for="item in keys" :key="item" :label="item">
        <el-input v-model="form[item]" :placeholder="item" />
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
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import { ElMessage } from 'element-plus'

import { editApi, infoApi } from '@/api/console/config'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const { t } = useI18n()

    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      id: null,
      form: null,
      keys: []
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
      data.id = id
      if (data.id) {
        const r = await infoApi({ id: data.id })
        if (r && r.data) {
          data.form = JSON.parse(r.data)
          for (const key in data.form) {
            if (Object.hasOwnProperty.call(data.form, key)) {
              data.keys.push(key)
            }
          }
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
          const params = {
            id: data.id,
            value: JSON.stringify(data.form)
          }
          const r = await editApi(params)
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
      data.form = null
      data.keys = []
    }

    return {
      t,
      refForm,
      ...toRefs(data),
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
