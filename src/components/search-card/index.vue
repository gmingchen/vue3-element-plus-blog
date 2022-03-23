<template>
  <div class="search-card-container">
    <div class="box margin-10-n">
      <el-autocomplete
        v-model.trim="form.keyword"
        value-key="title"
        :debounce="1000"
        :trigger-on-focus="false"
        :fetch-suggestions="searchHandle"
        class="width-full"
        size="large"
        hide-loading
        @select="selectHandle">
        <template #append>
          <el-button class="search-btn" @click="clickHandle">
            <g-icon name="search" size="26px" />
          </el-button>
        </template>
      </el-autocomplete>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { searchSuggestApi } from '@/api/client/article'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    const data = reactive({
      form: {
        keyword: ''
      }
    })

    const searchHandle = (keyword, callback) => {
      if (keyword) {
        const params = {
          ...data.form,
          limit: 10
        }
        searchSuggestApi(params).then(r => {
          if (r) {
            callback(r.data)
          }
        })
      } else {
        callback([])
      }
    }

    const selectHandle = (row) => {
      router.push({
        name: 'articleDetail',
        query: {
          id: row.id
        }
      })
    }

    const clickHandle = () => {
      router.push({
        name: 'search',
        params: {
          keyword: data.form.keyword
        }
      })
    }

    return {
      t,
      ...toRefs(data),
      searchHandle,
      selectHandle,
      clickHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.search-card-container {
  overflow: hidden;
  .box {
    position: relative;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: var(--el-color-info);
    .search-btn {
      padding: 0 15px;
      color: var(--el-color-primary)
    }
  }
}
</style>
