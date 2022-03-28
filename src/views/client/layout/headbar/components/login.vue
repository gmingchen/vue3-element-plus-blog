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
    custom-class="login-dialog"
    :close-on-click-modal="false"
    draggable
    @closed="dialogClosedHandle">
    <div class="logo-box flex-box flex_j_c-center flex_a_i-center margin_b-10">
      <el-image class="logo" src="http://oss.blog.gumingchen.icu/image/logo.png" />
      <span class="font-size-24">Slipper</span>
    </div>
    <el-form
      ref="refForm"
      v-loading="loading"
      class="padding-n-40"
      :model="form"
      :rules="rules"
      @keyup.enter="submit()">
      <el-form-item prop="username">
        <el-input v-model="form.username" :placeholder="t('column.username')">
          <template #prefix>
            <g-icon name="username" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" :placeholder="t('column.password')" type="password">
          <template #prefix>
            <g-icon name="password" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-button type="primary" class="width-full" @click="submit()">{{ t('client.login') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  emits: ['refresh'],
  setup() {
    const store = useStore()
    const { t } = useI18n()

    const visible = computed({
      get: () => {
        return store.state.user.visible
      },
      set: (value) => {
        store.dispatch('user/showLogin', value)
      }
    })

    const refForm = ref()
    const data = reactive({
      loading: false,
      form: {
        username: 'gumingchen',
        password: 'gumingchendashuaibi'
      }
    })

    const rules = computed(() => {
      const rule = {
        username: [{ required: true, message: t('rule.notBlank', [t('column.username')]), trigger: 'blur' }],
        password: [{ required: true, message: t('rule.notBlank', [t('column.password')]), trigger: 'blur' }]
      }
      nextTick(() => {
        refForm.value.clearValidate()
      })
      return rule
    })

    /**
     * @description: 表单验证提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(valid => {
        if (valid) {
          data.loading = true
          store.dispatch('user/login', data.form).then(async r => {
            if (r) {
              visible.value = false
              await store.dispatch('user/getUser')
            }
            nextTick(() => {
              data.loading = false
            })
          })
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
      visible,
      ...toRefs(data),
      rules,
      submit,
      dialogClosedHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-box {
  line-height: 60px;
  .logo {
    width: 64px;
  }
  span {
    font-family: 'AppleChancery';
  }
}
</style>
