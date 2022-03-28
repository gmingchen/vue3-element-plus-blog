<template>
  <div v-loading="loading" class="comment-card">
    <ul v-if="list && list.length">
      <li v-for="item in list" :key="item.id" class="comment-box padding_t-10">
        <div class="flex-box">
          <el-image class="avatar" :src="item.avatar" />
          <div class="comment-wrap flex-item_f-1 margin_l-10">
            <div class="user-box font-size-12">
              <span>
                <g-icon v-if="item.author === 1" name="author" color="red" />
                {{ item.nickname || item.username }}
              </span>
              <span class="margin_l-10">{{ parseTime(item.created_at) }}</span>
              <div class="opreation-box">
                <g-icon
                  v-if="userId && item.user_id === userId"
                  name="delete"
                  class="margin_r-10"
                  @click="deleteHandle(item)" />
                <g-icon name="reply" @click="replyHandle(item)" />
              </div>
            </div>
            <div class="content margin_t-5 font-size-14">
              {{ item.content }}
            </div>
          </div>
        </div>
        <ul class="margin_l-30 margin_t-10">
          <li v-if="item.replies && item.replies.length > 0 && !item.show" class="view-all font-size-12 cursor-pointer" @click="item.show = true">
            {{ t('client.viewAll') }} {{ t('client.replies', [item.replies.length]) }}
          </li>
          <template v-if="item.show">
            <li v-for="it in item.replies" :key="it.id" class="reply-box">
              <div class="flex-box">
                <el-image class="avatar" :src="it.from_avatar" />
                <div class="comment-wrap flex-item_f-1 margin_l-10">
                  <div class="user-box font-size-12">
                    <span>
                      <g-icon v-if="it.from_author === 1" name="author" color="red" />
                      {{ it.from_nickname || it.from_username }}
                    </span>
                    <span v-if="it.to_user_id">
                      <span class="margin-n-5">{{ t('client.reply') }}</span>
                      <g-icon v-if="it.to_author === 1" name="author" color="red" />
                      {{ it.to_nickname || it.to_username }}
                    </span>
                    <span class="margin_l-10">{{ parseTime(it.created_at) }}</span>
                    <div class="opreation-box">
                      <g-icon
                        v-if="userId && it.from_user_id === userId"
                        name="delete"
                        class="margin_r-10"
                        @click="deleteHandle(item, it)" />
                      <g-icon name="reply" @click="replyHandle(item, it)" />
                    </div>
                  </div>
                  <div class="content margin_t-5 font-size-14">
                    {{ it.content }}
                  </div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </li>
      <li>
        <g-page
          :page="page"
          small
          layout="total, prev, pager, next"
          @change="pageChangeHandle" />
      </li>
    </ul>
    <el-empty v-else />
    <el-dialog
      v-model="visible"
      :title="t('client.reply')"
      width="500px"
      draggable>
      <TextareaCard
        v-model="form.content"
        class="margin_t-20"
        @submit="replySubmitHandle" />
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, toRefs, watch, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

import { ElMessage, ElMessageBox } from 'element-plus'
import TextareaCard from '@/components/textarea-card'

import usePage from '@/mixins/page'
import { parseTime } from '@/utils'

import { pageApi, delApi } from '@/api/client/comment'
import { replyAddApi, replyDelApi } from '@/api/client/comment-reply'

export default defineComponent({
  components: { TextareaCard },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const store = useStore()

    const token = computed(() => store.getters['user/tokenVal'])
    const userId = computed(() => store.state.user.user.id)

    const { page } = usePage()
    page.size = 5
    const data = reactive({
      loading: false,
      list: [],
      visible: false,
      form: {
        comment_id: '', // 评论ID
        to_user_id: '', // 用户ID
        type: 0, // 回复类型 0-回复 1-回复的回复
        comment_reply_id: '', // 回复的目标ID
        content: ''
      }
    })

    const getList = () => {
      data.loading = true
      const params = {
        id: props.id,
        current: page.current,
        size: page.size
      }
      pageApi(params).then(r => {
        if (r) {
          data.list = r.data.list
          page.total = r.data.total
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    const reacquireHandle = () => {
      page.current = 1
      getList()
    }

    const replyHandle = (comment, reply) => {
      if (token.value && /\S/u.test(token.value)) {
        data.visible = true
        data.form.content = ''
        data.form.comment_id = comment.id
        data.form.to_user_id = reply ? reply.from_user_id : comment.user_id
        data.form.type = reply ? 1 : 0
        data.form.comment_reply_id = reply ? reply.id : ''
      } else {
        store.dispatch('user/showLogin', true)
      }
    }

    const replySubmitHandle = () => {
      replyAddApi(data.form).then(r => {
        if (r) {
          data.visible = false
          ElMessage({
            message: t('tip.commentSuccess'),
            type: 'success'
          })
          getList()
        }
      })
    }

    const deleteHandle = (comment, reply) => {
      if (token.value && /\S/u.test(token.value)) {
        ElMessageBox.confirm(t('tip.confirmTip', [t('button.delete')]), t('tip.title'), {
          confirmButtonText: t('button.confirm'),
          cancelButtonText: t('button.cancel'),
          type: 'warning'
        }).then(async () => {
          const r = reply ? await replyDelApi(reply.id) : await delApi(comment.id)
          if (r) {
            ElMessage({
              message: t('tip.success'),
              type: 'success'
            })
            getList()
          }
        })
          .catch(() => {
            // to do something on canceled
          })
      } else {
        store.dispatch('user/showLogin', true)
      }
    }

    watch(() => props.id, (_newVal, _oldVal) => {
      getList()
    })

    const pageChangeHandle = argPage => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      t,
      userId,
      page,
      ...toRefs(data),
      reacquireHandle,
      pageChangeHandle,
      replyHandle,
      replySubmitHandle,
      deleteHandle,
      parseTime
    }
  }
})
</script>

<style lang="scss" scoped>
.comment-card {
  padding: 10px 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  ul {
    li + li {
      margin-top: 10px;
    }
    .comment-box + .comment-box {
      border-top: 1px solid var(--el-border-color);
    }
    .comment-box {
      .avatar {
        height: 32px;
        width: 32px;
        border-radius: 50%;
      }
      .user-box {
        position: relative;
        color: var(--el-color-info);
        .opreation-box {
          position: absolute;
          right: 0;
          display: none;
          cursor: pointer;
        }
      }
      .comment-wrap:hover {
        .opreation-box{
          display: inline-block;
        }
      }
    }
    .view-all {
      color: var(--el-color-info);
    }
  }
  ::v-deep(.el-dialog__body) {
    padding: 0;
  }
  ::v-deep(.message-comment-container) {
    box-shadow: none;
    margin: 0;
  }
}
</style>
