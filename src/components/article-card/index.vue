<template>
  <el-card class="article-card" shadow="hover" @click="clickHandle()">
    <div class="flex-box flex_w-wrap">
      <el-image
        class="image margin_r-20"
        fit="contain"
        :src="data.cover" />
      <div class="detail-box flex-item_f-1">
        <div class="title-box flex-box flex_a_i-center flex_w-wrap">
          <div class="category margin_r-5 padding-5 font-size-14">{{ data.category_name }}</div>
          <div class="title font-size-20">{{ data.title }}</div>
        </div>
        <div class="describe margin_t-10 font-size-14 ellipse-2">{{ data.describe }}</div>
        <div class="other-box flex-box flex_w-wrap margin_t-10 font-size-14">
          <div class="margin_r-10">
            <g-icon name="clock" size="16px" />
            <span class="margin_l-5">{{ data.published_at.split(' ')[0] }}</span>
          </div>
          <div class="margin_r-10">
            <g-icon name="comment" size="16px" />
            <span class="margin_l-5">{{ data.comment > 99 ? '99+' : data.comment }}</span>
          </div>
          <div class="margin_r-10">
            <g-icon name="praise" size="16px" />
            <span class="margin_l-5">{{ data.praise > 99 ? '99+' : data.praise }}</span>
          </div>
          <div>
            <g-icon name="eye" size="16px" />
            <span class="margin_l-5">{{ data.read > 99 ? '99+' : data.read }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const clickHandle = () => {
      router.push({
        name: 'articleDetail',
        query: {
          id: props.data.id
        }
      })
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
      line-height: 25px;
      color: var(--el-color-info);
    }
  }
}
</style>
