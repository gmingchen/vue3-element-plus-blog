// 请求头-内容类型
export const ContentType = {
  JSON: 'application/json;charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD: 'multipart/form-data'
}
// 令牌键值
export const TokenKey = {
  TOKEN: 'token',
  ACCESS: 'access'
}
// 本地存储类型
export const StorageType = {
  COOKIE: 'cookie',
  SESSION: 'sessionStorage',
  LOCAL: 'localStorage'
}
// 请求成功状态码
export const SuccessCode = {
  ZERO: 0,
  TWO_HUNDRED: 200
}
// 请求 mapping
export const RequestMapping = {
  SLIPPER: '/slipper',
  API: '/api'
}
// 双向绑定名
export const ModelBinding = {
  MODEL_VALUE: 'update:modelValue',
  MODEL_EVENT: 'update:modelEvent'
}

// 性别
export const SEX = [
  {
    label: '女',
    value: 0
  },
  {
    label: '男',
    value: 1
  },
  {
    label: '男',
    value: 1
  }
]

// 扩展源生 Array 根据 value 获取 label
Array.prototype.getLable = function (value) {
  let label = ''
  for (let i = 0; i < this.length; i++) {
    if (value + '' === this[i].value + '') {
      label = this[i].label
    }
  }
  return label
}

