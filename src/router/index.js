import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'

/* 主入口 */
const main = {
  path: '/layout',
  name: 'layout',
  redirect: { name: 'home' },
  component: () => import('@/views/layout/index.vue'),
  meta: { title_cn: '布局' },
  children: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/modules/home/index.vue'),
      meta: {
        title_cn: '首页',
        title_en: 'Home'
      }
    }
  ]
}

/* 通用 */
const global = [
  { path: '/', redirect: { name: 'home' }, meta: { title_cn: '重定向', title_en: 'Redirect' } },
  { path: '/401', name: '401', component: () => import('@/views/global/401.vue'), meta: { title_cn: '401', title_en: '401' } },
  { path: '/404', name: '404', component: () => import('@/views/global/404.vue'), meta: { title_cn: '404', title_en: '404' } },
  { path: '/500', name: '500', component: () => import('@/views/global/500.vue'), meta: { title_cn: '500', title_en: '500' } }
]

const routes = global.concat(main).concat([{ path: '/:pathMatch(.*)', redirect: { name: '404' } }])

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  NProgress.start()
  // 标题控制
  document.title = to.meta.title_cn || document.title
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
