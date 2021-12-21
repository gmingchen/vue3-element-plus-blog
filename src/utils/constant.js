import { ContentType, StorageType } from '@/utils/dictionary'

// request Mapping
export const MAPPING = '/slipper'
// 请求数据类型
export const CONTENT_TYPE = ContentType.JSON
// 请求超时时长
export const TIME_OUT = 10000
// 访问秘钥 存储
export const TOKEN_KEY = 'token'
// 秘钥本地存储类型
export const TOKEN_STORAGE = StorageType.COOKIE
// 访问秘钥 存储
export const LANGUAGE_KEY = 'language'
// 秘钥本地存储类型
export const LANGUAGE_STORAGE = StorageType.LOCAL
// 请求成功响应code
export const SUCCESS_CODE = [0, 200]
// 双向绑定方法名
export const UPDATE_MODEL_EVENT = 'update:modelValue'
