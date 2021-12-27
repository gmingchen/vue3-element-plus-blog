import cookie from 'js-cookie'
import { StorageType } from '@/utils/dictionary'
import {
  TOKEN_KEY, TOKEN_STORAGE,
  LANGUAGE_KEY, LANGUAGE_STORAGE,
  THEME_KEY, THEME_STORAGE,
  CONSOLE_THEME_KEY, CONSOLE_THEME_STORAGE
} from '@/utils/constant'

/**
 * @description: 本地存储、获取、清除
 * @param {String} key 存储键值
 * @param {String} value 存储值
 * @param {String} storage 存储位置
 * @return {*}
 * @author: gumingchen
 */
function set(key, value = '', storage) {
  switch (storage) {
    case StorageType.COOKIE:
      cookie.set(key, value)
      break
    case StorageType.SESSION:
      sessionStorage.setItem(key, value)
      break
    case StorageType.LOCAL:
      localStorage.setItem(key, value)
      break
    default:
      cookie.set(key, value)
      break
  }
}
function get(key, storage) {
  let result
  switch (storage) {
    case StorageType.COOKIE:
      result = cookie.get(key)
      break
    case StorageType.SESSION:
      result = sessionStorage.getItem(key)
      break
    case StorageType.LOCAL:
      result = localStorage.getItem(key)
      break
    default:
      result = cookie.get(key)
      break
  }
  return result
}
function clear(key, storage) {
  switch (storage) {
    case StorageType.COOKIE:
      cookie.remove(key)
      break
    case StorageType.SESSION:
      sessionStorage.removeItem(key)
      break
    case StorageType.LOCAL:
      localStorage.removeItem(key)
      break
    default:
      cookie.remove(key)
      break
  }
}

/**
 * @description: token-存储、获取、清除
 * @param {*} token
 * @return {*}
 * @author: gumingchen
 */
export function setToken(token) {
  set(TOKEN_KEY, token, TOKEN_STORAGE)
}
export function getToken() {
  return get(TOKEN_KEY, TOKEN_STORAGE)
}
export function clearToken() {
  clear(TOKEN_KEY, TOKEN_STORAGE)
}

/**
 * @description: language-存储、获取、清除
 * @param {*} language 语言
 * @return {*}
 * @author: gumingchen
 */
export function setLanguage(language) {
  set(LANGUAGE_KEY, language, LANGUAGE_STORAGE)
}
export function getLanguage() {
  return get(LANGUAGE_KEY, LANGUAGE_STORAGE)
}
export function clearLanguage() {
  clear(LANGUAGE_KEY, LANGUAGE_STORAGE)
}

/**
 * @description: 全站主题-存储、获取、清除
 * @param {*} language 语言
 * @return {*}
 * @author: gumingchen
 */
export function setTheme(theme) {
  set(THEME_KEY, theme ? JSON.stringify(theme) : '', THEME_STORAGE)
}
export function getTheme() {
  try {
    return JSON.parse(get(THEME_KEY, THEME_STORAGE))
  } catch (error) {
    return ''
  }
}
export function clearTheme() {
  clear(THEME_KEY, THEME_STORAGE)
}

/**
 * @description: 控制台主题-存储、获取、清除
 * @param {*} language 语言
 * @return {*}
 * @author: gumingchen
 */
export function setConsoleTheme(theme) {
  set(CONSOLE_THEME_KEY, theme ? JSON.stringify(theme) : '', CONSOLE_THEME_STORAGE)
}
export function getConsoleTheme() {
  try {
    return JSON.parse(get(CONSOLE_THEME_KEY, CONSOLE_THEME_STORAGE))
  } catch (error) {
    return ''
  }
}
export function clearConsoleTheme() {
  clear(CONSOLE_THEME_KEY, CONSOLE_THEME_STORAGE)
}
