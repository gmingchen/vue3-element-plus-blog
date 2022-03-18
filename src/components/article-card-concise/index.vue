<template>
  <div class="article-card-concise-container flex-box flex_w-wrap" @click="clickHandle">
    <el-image
      class="image margin_r-20"
      fit="contain"
      :src="data.cover" />
    <div class="detail-box flex-item_f-1">
      <div class="title-box flex-box flex_a_i-center flex_w-wrap">
        <div class="title font-size-14">{{ data.title }}</div>
      </div>
      <div class="describe margin_t-10 font-size-12 ellipse-2">{{ data.describe }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },
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
.article-card-concise-container {
  cursor: pointer;
  &:hover {
    .title-box {
      .title {
        color: var(--el-color-primary);
      }
    }
  }
  .image {
    max-width: 100px;
    max-height: 60px;
    border-radius: 5px;
    ::v-deep(img) {
      background-color: #f2f2f2;
      transition: all .6s;
    }
  }
  .detail-box {
    min-width: 160px;
    .title-box {
      .title {
        font-weight: 600;
      }
    }
    .describe {
      line-height: 16px;
      color: var(--el-color-info);
    }
  }
}
</style>
