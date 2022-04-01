<template>
  <div>
    <CrumbBar :data="crumbs" />
    <div class="margin_t-20">
      <ArticleCard
        v-for="item in list"
        :key="item.id"
        :data="item"
        class="margin_t-20" />
      <g-page
        v-show="page.total"
        :page="page"
        small
        layout="total, prev, pager, next"
        @change="pageChangeHandle" />
      <el-empty v-show="!page.total" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, toRefs, computed, nextTick } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useI18n } from 'vue-i18n'

import CrumbBar from '@/components/crumb-bar'
import ArticleCard from '@/components/article-card/index.vue'

import usePage from '@/mixins/page'

import { infoApi as categoryInfoApi } from '@/api/client/category'
import { searchApi } from '@/api/client/article'

export default defineComponent({
  components: { CrumbBar, ArticleCard },
  setup() {
    const route = useRoute()
    const { t } = useI18n()

    const { page } = usePage()
    const data = reactive({
      loading: false,
      form: {
        categoryId: '',
        categoryName: '',
        keyword: ''
      },
      list: []
    })

    const crumbs = computed(() => {
      const result = [
        {
          label: t('button.search'),
          route: {
            name: 'search'
          }
        }
      ]
      if (data.form.categoryId) {
        result.push(
          {
            label: `${ t('column.category') }`
          },
          {
            label: `${ data.form.categoryName }`
          }
        )
      } else if (data.form.keyword) {
        result.push(
          {
            label: data.form.keyword
          }
        )
      }
      return result
    })

    const getList = () => {
      data.loading = true
      const params = {
        keyword: data.form.keyword,
        category_id: data.form.categoryId,
        current: page.current,
        size: page.size
      }
      searchApi(params).then(r => {
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

    const getRouteQuery = (r) => {
      data.form.categoryId = r.query.id
      data.form.keyword = r.query.keyword
      if (data.form.categoryId) {
        categoryInfoApi({ id: data.form.categoryId }).then(res => {
          if (res) {
            data.form.categoryName = res.data.name
          }
        })
      }
    }

    const pageChangeHandle = argPage => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    onBeforeRouteUpdate((to) => {
      getRouteQuery(to)
      reacquireHandle()
    })

    onBeforeMount(() => {
      getRouteQuery(route)
      getList()
    })
    return {
      crumbs,
      page,
      ...toRefs(data),
      pageChangeHandle
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
