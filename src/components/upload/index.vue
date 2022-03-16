<template>
  <div class="width-full">
    <el-upload
      class="uploader"
      :action="action"
      :headers="{
        [tokenKey]: token
      }"
      :data="{ watermark: watermark }"
      :show-file-list="false"
      :before-upload="beforeHandle"
      :on-success="successHandle"
      accept="image/*">
      <img v-if="thisUrl" :src="thisUrl" class="avatar">
      <GSvg v-else name="plus" />
    </el-upload>
    <el-input v-model="inputUrl" @blur="blurHandle" />
  </div>
</template>

<script >
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'

import { ElMessage } from 'element-plus'

import useModel from '@/mixins/model'
import { TOKEN_KEY, SUCCESS_CODE } from '@/utils/constant'

import { upload } from '@/api/console/oss'

export default defineComponent({
  props: {
    url: {
      type: String
    },
    watermark: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:url', 'update:watermark'],
  setup(props) {
    const store = useStore()
    const data = reactive({
      action: upload(),
      tokenKey: TOKEN_KEY,
      token: store.state.user.token,
      inputUrl: ''
    })

    const thisUrl = useModel(props, 'url')

    watch(thisUrl, (newVal, _oldVal) => {
      data.inputUrl = newVal
    })

    const beforeHandle = () => {
      //
    }
    const successHandle = (r) => {
      if (SUCCESS_CODE.includes(r.code)) {
        thisUrl.value = r.data.url
        data.inputUrl = r.data.url
      } else {
        ElMessage({
          message: r.message,
          type: 'warning'
        })
      }
    }

    const blurHandle = () => {
      if (data.inputUrl) {
        thisUrl.value = data.inputUrl
      } else {
        thisUrl.value = ''
      }
    }

    return {
      ...toRefs(data),
      thisUrl,
      beforeHandle,
      successHandle,
      blurHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.uploader {
  color: red;
  ::v-deep(.el-upload) {
    position: relative;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }
  ::v-deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }
  ::v-deep(.el-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

</style>
