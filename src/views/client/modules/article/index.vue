<template>
  <div v-loading="loading" class="article-details-container">
    <CrumbBar :data="crumbs" />
    <div v-if="info" class="content-box margin_t-20">
      <div class="details-box padding-20">
        <div class="title font-size-20">{{ info.title }}</div>
        <div class="other-box padding-5-n flex-box flex_w-wrap font-size-14">
          <div class="margin_r-10">
            <g-icon name="clock" size="14px" />
            <span class="margin_l-5">{{ info.published_at.split(' ')[0] }}</span>
          </div>
          <div class="margin_r-10">
            <g-icon name="comment" size="14px" />
            <span class="margin_l-5">{{ info.comment }}</span>
          </div>
          <div class="margin_r-10">
            <g-icon name="praise" size="14px" />
            <span class="margin_l-5">{{ info.praise }}</span>
          </div>
          <div>
            <g-icon name="eye" size="14px" />
            <span class="margin_l-5">{{ info.read }}</span>
          </div>
        </div>
        <div class="describe padding-5-n font-size-14">{{ info.describe }}</div>
        <md-editor v-model="info.content" class="margin_t-10" preview-only />
        <div v-if="info.tags && info.tags.length" class="tag-box margin_t-10 padding_t-10 flex-box flex_w-wrap flex_a_i-center">
          <g-icon name="tags" size="24px" class="margin_r-10" />
          <el-tag v-for="item in info.tags" :key="item.id" class="margin_r-5">{{ item.name }}</el-tag>
        </div>
      </div>
      <TextareaCard
        v-if="info.commentable"
        v-model="keyword"
        class="margin_t-20"
        @submit="commentHandle" />
      <CommentCard :id="id" class="margin_t-20" />
    </div>
    <el-empty v-else />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, toRefs } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

import CrumbBar from '@/components/crumb-bar'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import TextareaCard from '@/components/textarea-card'
import CommentCard from '@/components/comment-card'

import { detailsApi } from '@/api/client/article'
import { addApi } from '@/api/client/comment'

export default defineComponent({
  components: { CrumbBar, MdEditor, TextareaCard, CommentCard },
  setup() {
    const route = useRoute()

    const data = reactive({
      loading: false,
      crumbs: [],
      id: null,
      info: null,
      keyword: ''
    })

    const getInfo = () => {
      data.loading = true
      detailsApi({ id: data.id }).then(r => {
        if (r) {
          data.info = r.data
          data.crumbs = [
            {
              label: r.data.category_name,
              route: {
                name: 'search',
                params: {
                  categoryId: r.data.category_id,
                  categoryName: r.data.category_name
                }
              }
            },
            {
              label: r.data.title
            }
          ]
        } else {
          data.crumbs = []
          data.info = null
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    const commentHandle = () => {
      const params = {
        article_id: data.id,
        content: data.keyword
      }
      addApi(params).then(r => {
        if (r) {
          console.log(r)
        }
      })
    }

    onBeforeRouteUpdate((to) => {
      data.id = to.query.id
      getInfo()
    })

    onBeforeMount(() => {
      data.id = route.query.id
      getInfo()
    })

    return {
      ...toRefs(data),
      commentHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.article-details-container {
  .content-box {
    .details-box {
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .title {
        font-weight: 600;
      }
      .other-box, .describe {
        line-height: 20px;
        color: var(--el-color-info);
        border-bottom: 1px dashed var(--el-border-color);
      }
      .tag-box {
        color: var(--el-color-info);
        border-top: 1px dashed var(--el-border-color);
      }
    }
  }
}
</style>
