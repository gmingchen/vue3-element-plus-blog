import { createI18n } from 'vue-i18n'
const importModules = import.meta.globEager('./langs/*.js')
import { getLanguage } from '@/utils/storage'

const messages = {}

for (const key in importModules) {
  const modular = importModules[key]
  const name = key.replace(/\.\/langs\/|\.js/g, '')
  messages[name] = modular.default
}

const i18n = createI18n({
  locale: getLanguage() || 'cn', // 初始语言设置
  fallbackLocale: 'cn',
  messages
})

export default i18n
