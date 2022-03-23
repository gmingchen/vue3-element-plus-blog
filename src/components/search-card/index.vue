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

import { searchSuggestApi } from '@/api/client/article'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const data = reactive({
      form: {
        keyword: ''
      }
    })

    const searchHandle = (keyword, callback) => {
      if (keyword) {
        const params = {
          ...data.form,
          limit: 5
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

    const selectHandle = (a) => {
      console.log(a)
    }

    const clickHandle = (a) => {
      console.log(a)
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
