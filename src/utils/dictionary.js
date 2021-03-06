import i18n from '@/i18n'

// 请求头-内容类型
export const ContentType = {
  JSON: 'application/json;charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD: 'multipart/form-data'
}
// 本地存储类型
export const StorageType = {
  COOKIE: 'cookie',
  SESSION: 'sessionStorage',
  LOCAL: 'localStorage'
}

// 语言
export const LANGUAGE = [
  {
    label_cn: '中文',
    label_en: 'Chinese',
    value: 'cn'
  },
  {
    label_cn: '英文',
    label_en: 'English',
    value: 'en'
  }
]

// 性别
export const SEX = [
  {
    label_cn: '女',
    label_en: 'Girl',
    value: 0
  },
  {
    label_cn: '男',
    label_en: 'Boy',
    value: 1
  },
  {
    label_cn: '保密',
    label_en: 'Secrecy',
    value: 2
  }
]

// 扩展源生 Array 根据 value 获取 label
Array.prototype.getLabel = function (value) {
  let label = ''
  for (let i = 0; i < this.length; i++) {
    if (value + '' === this[i].value + '') {
      label = this[i][`label_${ i18n.global.locale }`]
    }
  }
  return label
}
