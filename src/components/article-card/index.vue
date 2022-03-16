<template>
  <el-card class="article-card" shadow="hover" @click="clickHandle()">
    <div class="flex-box flex_w-wrap">
      <el-image
        class="image margin_r-20"
        fit="contain"
        src="http://oss.blog.gumingchen.icu/image/qq.png" />
      <div class="detail-box flex-item_f-1">
        <div class="title-box flex-box flex_a_i-center flex_w-wrap">
          <div class="category margin_r-5 padding-5 font-size-14">Vue</div>
          <div class="title font-size-20">JavaScript中的事件循环</div>
        </div>
        <div class="describe margin_t-10 font-size-14 ellipse-2">
          JavaScript中的事件循环11313
          JavaScript中的事件循环21313
          JavaScript中的事件循环3131
          JavaScript中的事件循环131
          JavaScript中的事件循环3131313
          JavaScript中的事件循环1313
          JavaScript中的事件循环13133
        </div>
        <div class="other-box flex-box flex_w-wrap margin_t-10">
          <g-icon name="clock" size="16px" />
          <span class="margin_l-5 margin_r-10">2022-03-13</span>
          <g-icon name="comment" size="16px" />
          <span class="margin_l-5 margin_r-10">99</span>
          <g-icon name="eye" size="16px" />
          <span class="margin_l-5 margin_r-10">99</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const clickHandle = () => {
      console.log('click')
    }
    return {
      clickHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@media screen and (max-width: 461px) {
  .detail-box {
    margin-top: 10px;
  }
}
.article-card {
  cursor: pointer;
  &:hover {
    .title-box {
      .title {
        color: var(--el-color-primary);
      }
    }
  }
  .image {
    max-width: 200px;
    max-height: 120px;
    border-radius: 5px;
    ::v-deep(img) {
      background-color: #f2f2f2;
      transition: all .6s;
    }
  }
  .detail-box {
    min-width: 160px;
    .title-box {
      .category {
        color: white;
        font-weight: 600;
        border-radius: 5px;
        background-color: var(--el-color-primary);
      }
      .title {
        font-weight: 600;
      }
    }
    .describe {
      line-height: 20px;
      color: var(--el-color-info);
    }
    .other-box {
      font-size: 14px;
      line-height: 25px;
      color: var(--el-color-info);
    }
  }
}
</style>
