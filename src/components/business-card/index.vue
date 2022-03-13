<template>
  <div class="bussiness-card-container">
    <div class="box margin_t-35 margin_b-10 padding_t-50 padding_b-10">
      <el-image class="avatar height-70 width-70 padding-5" src="http://oss.blog.gumingchen.icu/image/slipper.jpeg" />
      <div class="name text-align-center">拖孩</div>
      <div class="personal-signature margin_t-10 text-align-center font-size-12">本是同根生，相煎何太急</div>
      <div class="job margin_t-10 text-align-center font-size-14">前端开发工程师、Java开发工程师</div>
      <div class="address margin_t-10 text-align-center font-size-14">江苏省-苏州市</div>
      <div class="contact-box margin_t-10 flex-box">
        <div class="flex-item_f-1 text-align-center">
          <el-popover placement="bottom" :width="200" trigger="click">
            <template #reference>
              <el-image class="height-40 width-40" src="http://oss.blog.gumingchen.icu/image/qq.png" />
            </template>
            <el-image class="width-full" src="http://oss.blog.gumingchen.icu/image/qq.png" />
          </el-popover>
        </div>
        <div class="flex-item_f-1 text-align-center">
          <el-popover placement="bottom" :width="200" trigger="click">
            <template #reference>
              <el-image class="height-40 width-40" src="http://oss.blog.gumingchen.icu/image/wechat.png" />
            </template>
            <el-image class="width-full" src="http://oss.blog.gumingchen.icu/image/wechat.png" />
          </el-popover>
        </div>
        <div class="flex-item_f-1 text-align-center">
          <el-image class="height-40 width-40" src="http://oss.blog.gumingchen.icu/image/github.png" @click="githubHandle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const githubHandle = () => {
      window.open('https://www.baidu.com')
    }
    return {
      githubHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.bussiness-card-container {
  overflow: hidden;
  .box {
    position: relative;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);;
    .avatar {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);;
      ::v-deep(img) {
        border-radius: 50%;
        transition: all 0.8s;
        &:hover {
          transform: rotate(360deg);
        }
      }
    }
    .name {
      color: var(--el-color-primary);
    }
    .personal-signature, .job, .address {
      color: var(--el-color-info);
    }
    .contact-box {
      .el-image {
        cursor: pointer;
      }
    }
  }
}
</style>
