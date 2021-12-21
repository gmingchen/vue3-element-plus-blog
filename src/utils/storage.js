import cookie from 'js-cookie'
import { TOKEN_KEY, TOKEN_STORAGE, LANGUAGE_KEY, LANGUAGE_STORAGE } from '@/utils/constant'
import { StorageType } from '@/utils/dictionary'

/**
 * @description: token-存储、获取、清除
 * @param {*} token
 * @return {*}
 * @author: gumingchen
 */
export function setToken(token) {
  switch (TOKEN_STORAGE) {
    case StorageType.COOKIE:
      cookie.set(TOKEN_KEY, token)
      break
    case StorageType.SESSION:
      sessionStorage.setItem(TOKEN_KEY, token)
      break
    case StorageType.LOCAL:
      localStorage.setItem(TOKEN_KEY, token)
      break
    default:
      cookie.set(TOKEN_KEY, token)
      break
  }
}
export function getToken() {
  let token
  switch (TOKEN_STORAGE) {
    case StorageType.COOKIE:
      token = cookie.get(TOKEN_KEY)
      break
    case StorageType.SESSION:
      token = sessionStorage.getItem(TOKEN_KEY)
      break
    case StorageType.LOCAL:
      token = localStorage.getItem(TOKEN_KEY)
      break
    default:
      token = cookie.get(TOKEN_KEY)
      break
  }
  return token
}
export function clearToken() {
  switch (TOKEN_STORAGE) {
    case StorageType.COOKIE:
      cookie.remove(TOKEN_KEY)
      break
    case StorageType.SESSION:
      sessionStorage.removeItem(TOKEN_KEY)
      break
    case StorageType.LOCAL:
      localStorage.removeItem(TOKEN_KEY)
      break
    default:
      cookie.remove(TOKEN_KEY)
      break
  }
}

/**
 * @description: language-存储、获取
 * @param {*} language 语言
 * @return {*}
 * @author: gumingchen
 */
export function setLanguage(language) {
  switch (LANGUAGE_STORAGE) {
    case StorageType.COOKIE:
      cookie.set(LANGUAGE_KEY, language)
      break
    case StorageType.SESSION:
      sessionStorage.setItem(LANGUAGE_KEY, language)
      break
    case StorageType.LOCAL:
      localStorage.setItem(LANGUAGE_KEY, language)
      break
    default:
      cookie.set(LANGUAGE_KEY, language)
      break
  }
}
export function getLanguage() {
  let language
  switch (LANGUAGE_STORAGE) {
    case StorageType.COOKIE:
      language = cookie.get(LANGUAGE_KEY)
      break
    case StorageType.SESSION:
      language = sessionStorage.getItem(LANGUAGE_KEY)
      break
    case StorageType.LOCAL:
      language = localStorage.getItem(LANGUAGE_KEY)
      break
    default:
      language = cookie.get(LANGUAGE_KEY)
      break
  }
  return language
}
