<template>
  <div v-loading="loading" class="comment-card">
    {{ id }}
    <g-page
      :page="page"
      small
      layout="total, prev, pager, next"
      @change="pageChangeHandle" />
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, toRefs, watch, nextTick } from 'vue'

import usePage from '@/mixins/page'

import { pageApi } from '@/api/client/comment'

export default defineComponent({
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const { page } = usePage()
    page.size = 5
    const data = reactive({
      loading: false,
      list: []
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
      page,
      ...toRefs(data),
      pageChangeHandle
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
}
</style>
