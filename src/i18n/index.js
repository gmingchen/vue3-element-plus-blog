import { createI18n } from 'vue-i18n'

const requireModules = require.context('./langs/', true, /\.(ts|js)$/iu)
import { getLanguage } from '@/utils/storage'

const messages = {}

requireModules.keys().forEach(filePath => {
  const modular = requireModules(filePath)
  const name = filePath.replace(/\.\/|\.(js|ts)/g, '')
  messages[name] = {
    namespaced: true,
    ...modular.default
  }
})

const i18n = createI18n({
  locale: getLanguage() || 'cn', // 初始语言设置
  fallbackLocale: 'cn',
  messages
})

export default i18n
