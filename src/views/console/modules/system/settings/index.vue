<template>
  <div>
    <el-form
      ref="refForm"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-position="top"
      @keyup.enter="submit()">
      <el-divider>{{ t('console.businessCard') }}</el-divider>
      <el-row :gutter="20">
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.name')" prop="name">
            <el-input
              v-model="form.name"
              :placeholder="t('column.name')"
              maxlength="20"
              show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.address')" prop="address">
            <el-input
              v-model="form.address"
              :placeholder="t('column.address')"
              maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.github')" prop="github">
            <el-input
              v-model="form.github"
              :placeholder="t('column.github')"
              maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.signature')" prop="signature">
            <el-input
              v-model="form.signature"
              :placeholder="t('column.signature')"
              rows="4"
              type="textarea"
              maxlength="100"
              show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.avatar')" prop="avatar">
            <Upload v-model:url="form.avatar" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.qq')" prop="qq">
            <Upload v-model:url="form.qq" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.wechat')" prop="wechat">
            <Upload v-model:url="form.wechat" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider>{{ t('console.siteInformation') }}</el-divider>
      <el-row :gutter="20">
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('table.headline')" prop="title">
            <el-input
              v-model="form.title"
              :placeholder="t('table.headline')"
              maxlength="20"
              show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.websiteLink')" prop="link">
            <el-input
              v-model="form.link"
              :placeholder="t('column.websiteLink')"
              maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.recordNumber')" prop="record_number">
            <el-input
              v-model="form.record_number"
              :placeholder="t('column.recordNumber')"
              maxlength="20" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.recordNumberLink')" prop="record_number_link">
            <el-input
              v-model="form.record_number_link"
              :placeholder="t('column.recordNumberLink')"
              maxlength="100" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.logo')" prop="logo">
            <Upload v-model:url="form.logo" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.officialAccount')" prop="official_account">
            <Upload v-model:url="form.official_account" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.wechatGroup')" prop="wechat_group">
            <Upload v-model:url="form.wechat_group" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.qqGroup')" prop="qq_group">
            <Upload v-model:url="form.qq_group" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" class="min-width">
          <el-form-item :label="t('column.websiteDescribe')" prop="describe">
            <el-input
              v-model="form.describe"
              :placeholder="t('column.websiteDescribe')"
              rows="2"
              type="textarea"
              maxlength="50"
              show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-repeat type="primary" @click="submit()">{{ t('button.save') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, nextTick, toRefs, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { ElMessage } from 'element-plus'
import Upload from '@/components/upload/index.vue'

import { infoApi, editApi } from '@/api/console/settings'

export default defineComponent({
  components: { Upload },
  setup() {
    const { t } = useI18n()

    const refForm = ref()
    const data = reactive({
      loading: false,
      form: {
        name: '',
        avatar: '',
        signature: '',
        address: '',
        qq: '',
        wechat: '',
        github: '',
        official_account: '',
        wechat_group: '',
        qq_group: '',
        logo: '',
        title: '',
        record_number: '',
        record_number_link: '',
        link: '',
        describe: ''
      }
    })
    const rules = computed(() => {
      const rule = {
        name: [{ required: true, message: t('rule.notBlank', [t('column.name')]), trigger: 'blur' }],
        avatar: [{ required: true, message: t('rule.notBlank', [t('column.avatar')]), trigger: 'blur' }],
        signature: [{ required: true, message: t('rule.notBlank', [t('column.signature')]), trigger: 'blur' }],
        address: [{ required: true, message: t('rule.notBlank', [t('column.address')]), trigger: 'blur' }],
        qq: [{ required: true, message: t('rule.notBlank', [t('column.qq')]), trigger: 'blur' }],
        wechat: [{ required: true, message: t('rule.notBlank', [t('column.wechat')]), trigger: 'blur' }],
        github: [{ required: true, message: t('rule.notBlank', [t('column.github')]), trigger: 'blur' }],
        logo: [{ required: true, message: t('rule.notBlank', [t('column.logo')]), trigger: 'blur' }],
        title: [{ required: true, message: t('rule.notBlank', [t('table.headline')]), trigger: 'blur' }],
        record_number: [{ required: true, message: t('rule.notBlank', [t('column.recordNumber')]), trigger: 'blur' }],
        record_number_link: [{ required: true, message: t('rule.notBlank', [t('column.recordNumberLink')]), trigger: 'blur' }],
        link: [{ required: true, message: t('rule.notBlank', [t('column.websiteLink')]), trigger: 'blur' }],
        describe: [{ required: true, message: t('rule.notBlank', [t('column.websiteDescribe')]), trigger: 'blur' }]
      }
      nextTick(() => {
        if (refForm.value) {
          refForm.value.clearValidate()
        }
      })
      return rule
    })

    /**
     * @description: 获取系统设置
     * @param {*} id 文章ID
     * @param {Number} rout 目标路由
     * @return {*}
     * @author: gumingchen
     */
    const getInfo = async () => {
      await infoApi().then(r => {
        if (r) {
          data.form = { ...r.data }
        }
      })
    }

    /**
     * @description: 表单验证提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(valid => {
        if (valid) {
          editApi(data.form).then(r => {
            if (r) {
              ElMessage({
                message: t('tip.success'),
                type: 'success'
              })
            }
          })
        }
      })
    }

    onMounted(() => {
      getInfo()
    })

    return {
      t,
      refForm,
      ...toRefs(data),
      rules,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.min-width {
  min-width: 300px;
}
</style>
