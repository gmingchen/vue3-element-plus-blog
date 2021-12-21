import { createI18n } from 'vue-i18n'
import messages from './langs'

const i18n = createI18n({
  locale: 'cn', // 初始语言设置
  fallbackLocale: 'cn',
  messages
})

export default i18n
