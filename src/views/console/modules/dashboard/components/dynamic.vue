<template>
  <el-card class="dynamic-box" shadow="always">
    <template #header>
      <div class="card-header flex-box flex_j_c-space-between">
        <span>{{ t('console.dynamic') }}</span>
      </div>
    </template>
    <el-tabs
      v-model="active"
      class="demo-tabs"
      @tab-click="clickHandle">
      <el-tab-pane v-loading="articleLoading" :label="t('console.articles')" name="article">
        <ul v-if="articleList.length">
          <li v-for="item in articleList" :key="item.id" class="article flex-box flex_j_c-space-between">
            <div class="title ellipse-1" @click="jumpHandle(item.id)">{{ item.title }}</div>
            <div class="date">{{ parseTime(item.published_at) }}</div>
          </li>
        </ul>
        <el-empty v-else />
      </el-tab-pane>
      <el-tab-pane v-loading="commentLoading" :label="t('console.comments')" name="comment">
        <ul v-if="commentList.length">
          <li v-for="item in commentList" :key="item.id" class="comment flex-box flex_j_c-space-between">
            <div class="title ellipse-1" @click="jumpHandle(item.article_id)">{{ item.article_title }}</div>
            <div class="name ellipse-1">{{ item.nickname || item.username }}</div>
            <div class="content ellipse-1">{{ item.content }}</div>
            <div class="date">{{ parseTime(item.created_at) }}</div>
          </li>
        </ul>
        <el-empty v-else />
      </el-tab-pane>
      <el-tab-pane v-loading="messageLoading" :label="t('console.messages')" name="message">
        <ul v-if="messageList.length">
          <li v-for="item in messageList" :key="item.id" class="message flex-box flex_j_c-space-between">
            <div class="name ellipse-1">{{ item.nickname || item.username }}</div>
            <div class="content ellipse-1">{{ item.content }}</div>
            <div class="date">{{ parseTime(item.created_at) }}</div>
          </li>
        </ul>
        <el-empty v-else />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { parseTime } from '@/utils'

import { latestArticleApi, latestCommentApi, latestMessageApi } from '@/api/console/dashboard'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    const data = reactive({
      active: 'article',
      articleLoading: false,
      articleList: [],
      commentLoading: false,
      commentList: [],
      messageLoading: false,
      messageList: []
    })

    /**
     * @description: 获取最近发布的文章
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getArticle = () => {
      data.articleLoading = true
      latestArticleApi({ limit: 5 }).then(r => {
        if (r) {
          data.articleList = r.data
        }
        nextTick(() => {
          data.articleLoading = false
        })
      })
    }

    /**
     * @description: 获取最近发布的文章
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getComment = () => {
      data.commentLoading = true
      latestCommentApi({ limit: 5 }).then(r => {
        if (r) {
          data.commentList = r.data
        }
        nextTick(() => {
          data.commentLoading = false
        })
      })
    }

    /**
     * @description: 获取最近收到的留言
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getMessage = () => {
      data.messageLoading = true
      latestMessageApi({ limit: 5 }).then(r => {
        if (r) {
          data.messageList = r.data
        }
        nextTick(() => {
          data.messageLoading = false
        })
      })
    }

    /**
     * @description: 跳转文章详情编辑页
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const jumpHandle = (id) => {
      router.push({
        name: 'articleWriting',
        query: {
          id: id
        }
      })
    }

    const clickHandle = ({ props }) => {
      switch (props.name) {
        case 'article':
          // getArticle()
          break
        case 'comment':
          // getComment()
          break
        case 'message':
          // getMessage()
          break
      }
    }

    onMounted(() => {
      getArticle()
      getComment()
      getMessage()
    })

    return {
      t,
      ...toRefs(data),
      clickHandle,
      jumpHandle,
      parseTime
    }
  }
})
</script>

<style lang="scss" scoped>
.dynamic-box {
  ::v-deep(.el-tabs__header) {
    margin-bottom: 0;
  }
  ul {
    li {
      font-size: 14px;
      line-height: 40px;
      .title {
        max-width: 100px;
        cursor: pointer;
        &:hover {
          color: var(--el-color-primary);
        }
      }
      .name {
        max-width: 100px;
      }
      .date {
        width: 120px;
        font-size: 12px;
        text-align: right;
        color: var(--el-text-color-placeholder);
      }
    }
    li + li {
      border-top: 1px solid var(--el-border-color-light);
    }
    .comment {
      .content {
        width: calc(100% - 100px - 100px - 140px);
      }
    }
    .message {
      .content {
        width: calc(100% - 100px - 140px);
      }
    }
  }
}
</style>
