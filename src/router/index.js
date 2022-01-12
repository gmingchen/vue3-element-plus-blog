import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'

/* 主入口 */
const client = {
  path: '/client',
  name: 'client',
  redirect: { name: 'home' },
  component: () => import('@/views/client/layout/index.vue'),
  meta: { title_cn: '布局' },
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/client/modules/home/index.vue'),
      meta: {
        title_cn: '首页',
        title_en: 'Home'
      }
    }
  ]
}

const console = {
  path: '/console',
  name: 'console',
  redirect: { name: 'dataOverview' },
  component: () => import('@/views/console/layout/index.vue'),
  meta: { title_cn: '布局' },
  children: [
    {
      path: 'data-overview',
      name: 'dataOverview',
      component: () => import('@/views/console/modules/data-overview/index.vue'),
      meta: { title_cn: '数据概况', title_en: 'Data overview' }
    },
    {
      path: 'article',
      name: 'article',
      redirect: { name: 'articleIndex' },
      component: () => import('@/components/view/index.vue'),
      meta: { title_cn: '文章管理', title_en: 'Article management' },
      children: [
        {
          path: 'index',
          name: 'articleIndex',
          component: () => import('@/views/console/modules/article/index/index.vue'),
          meta: { title_cn: '列表', title_en: 'List' }
        },
        {
          path: 'writing',
          name: 'articleWriting',
          component: () => import('@/views/console/modules/article/writing/index.vue'),
          meta: { title_cn: '写作', title_en: 'Writing' }
        },
        {
          path: 'category',
          name: 'articleCategory',
          component: () => import('@/views/console/modules/article/category/index.vue'),
          meta: { title_cn: '分类', title_en: 'Category' }
        },
        {
          path: 'tag',
          name: 'articleTag',
          component: () => import('@/views/console/modules/article/tag/index.vue'),
          meta: { title_cn: '标签', title_en: 'Tag' }
        }
      ]
    },
    {
      path: 'banner',
      name: 'banner',
      component: () => import('@/views/console/modules/banner/index.vue'),
      meta: { title_cn: '轮播图', title_en: 'Rotation chart' }
    },
    {
      path: 'leave-message',
      name: 'leaveMessage',
      component: () => import('@/views/console/modules/leave-message/index.vue'),
      meta: { title_cn: '留言', title_en: 'Leaving message' }
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/console/modules/user/index.vue'),
      meta: { title_cn: '用户', title_en: 'User' }
    }
  ]
}

/* 通用 */
const global = [
  { path: '/', redirect: { name: 'articleTag' }, meta: { title_cn: '重定向', title_en: 'Redirect' } },
  { path: '/401', name: '401', component: () => import('@/views/global/401.vue'), meta: { title_cn: '401', title_en: '401' } },
  { path: '/404', name: '404', component: () => import('@/views/global/404.vue'), meta: { title_cn: '404', title_en: '404' } },
  { path: '/500', name: '500', component: () => import('@/views/global/500.vue'), meta: { title_cn: '500', title_en: '500' } }
]

const routes = global.concat(client).concat(console).concat([{ path: '/:pathMatch(.*)', redirect: { name: '404' } }])

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  NProgress.start()
  // 标题控制
  document.title = to.meta[`title_${ store.getters['setting/language'] }`] || document.title
  next()
})

router.afterEach((_to, _from) => {
  NProgress.done()
})

// 添加异常处理
const originalPush = router.push
router.push = (to) => {
  try {
    return originalPush(to)
  } catch (error) {
    console.log(`%c${ error }`, 'color:red')
    return originalPush({ name: '401' })
  }
}

export default router
