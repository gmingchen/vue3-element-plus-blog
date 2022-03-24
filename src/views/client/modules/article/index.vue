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
      </div>
      <div v-if="info.commentable" class="comment-box margin_t-20 padding-10">2</div>
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

import { detailsApi } from '@/api/client/article'

export default defineComponent({
  components: { CrumbBar, MdEditor },
  setup() {
    const route = useRoute()

    const data = reactive({
      loading: false,
      crumbs: [],
      id: null,
      info: null
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

    onBeforeRouteUpdate((to) => {
      data.id = to.query.id
      getInfo()
    })

    onBeforeMount(() => {
      data.id = route.query.id
      getInfo()
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.article-details-container {
  .content-box {
    .details-box, .comment-box {
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .details-box {
      .title {
        font-weight: 600;
      }
      .other-box, .describe {
        line-height: 20px;
        color: var(--el-color-info);
        border-bottom: 1px dashed var(--el-border-color);
      }
    }
    .comment-box {}
  }
}
</style>
