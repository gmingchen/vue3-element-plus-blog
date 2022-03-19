import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'

import '@/assets/sass/index.scss'
import components from '@/components/global/index' // 自定义全局组件
import directive from '@/directive' // 自定义指令

const app = createApp(App)
// element 全局配置
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }

app.use(router)
  .use(store)
  .use(i18n)
  .use(components)
  .use(directive)
  .mount('#app')
