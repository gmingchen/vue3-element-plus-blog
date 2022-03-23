import { MAPPING } from '@/utils/constant'

/**
 * @description: 生成UUID
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getUUID() {
  let result = ''
  const str = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  result = str.replace(/[xy]/gu, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  return result
}

/**
 * @description: 日期转字符串
 * @param {*} time 日期 默认当前日期
 * @param {*} format 格式
 * @return {*}
 * @author: gumingchen
 */
export function parseDate2Str(time = new Date(), format = '{y}-{M}-{d} {h}:{m}:{s}') {
  let result = ''
  let date = new Date()
  const type = typeof time
  if (type === 'object') {
    date = time
  } else if (type === 'number') {
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  result = format.replace(/\{[yMdhmsa]+\}/g, (val) => {
    const key = val.replace(/\{|\}/g, '')
    const value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return result
}

/**
 * @description: 字符串转日期
 * @param {*} time 日期字符串
 * @param {*} separator 分隔符
 * @return {*}
 * @author: gumingchen
 */
export function parseStr2Date(time = '', separator = ['-', ' ', ':']) {
  let result = new Date()
  const regexp = `/[${ separator.join('') }]/g`
  const data = time.split(eval(regexp))
  switch (data.length) {
    case 3:
      result = new Date(+data[0], +data[1] - 1, +data[2])
      break
    case 6:
      result = new Date(+data[0], +data[1] - 1, +data[2], +data[3], +data[4], +data[5])
      break
  }
  return result
}

/**
 * @description: 字符串转日期
 * @param {string} time 日期字符串
 * @param {string} format 格式
 * @returns {string}
 */
export function parseTime(time = '', format) {
  let result = ''
  const date = parseStr2Date(time)
  const now = new Date()
  const difference = (now.getTime() - date.getTime()) / 1000

  if (difference < 30) {
    result = '刚刚'
  } else if (difference < 3600) {
    result = Math.ceil(difference / 60) + '分钟前'
  } else if (difference < 3600 * 24) {
    result = Math.ceil(difference / 3600) + '小时前'
  } else if (difference < 3600 * 24 * 2) {
    result = '1天前'
  } else {
    result = parseDate2Str(time, format)
  }
  return result
}

/**
 * @description: 获取最近天数的日期 (不包括当天)
 * @param {*} day 天数
 * @param {*} format 格式
 * @return {*}
 * @author: gumingchen
 */
export function getLastDaysDate(day, format = '{y}-{M}-{d}') {
  const result = []
  for (let i = day; i > 0; i--) {
    const times = i * 60 * 60 * 24 * 1000
    const lastDate = new Date().getTime() - times
    result.push(parseDate2Str(new Date(lastDate), format))
  }
  return result
}

/**
 * @description: json 转 param
 * @param {*} json
 * @return {*}
 * @author: gumingchen
 */
export function parseJson2Param(json) {
  let result = ''
  result = Object.keys(json)
    .map(key => {
      if (!json[key]) return ''
      const temp = encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      return temp
    })
    .join('&')
  return result
}

/**
 * @description: param 转 json
 * @param {*} url
 * @return {*}
 * @author: gumingchen
 */
export function parseParam2Json(url) {
  const result = {}
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/gu, ' ')
  if (search) {
    const searchArr = search.split('&')
    searchArr.forEach(r => {
      const index = r.indexOf('=')
      if (index !== -1) {
        const key = r.substring(0, index)
        const val = r.substring(index + 1, r.length)
        result[key] = val
      }
    })
  }
  return result
}

/**
 * @description: 置空json数据
 * @param {*} json
 * @return {*}
 * @author: gumingchen
 */
export function clearJson(data) {
  const json = data
  let key
  for (key in json) {
    if (json[key] instanceof Array) {
      json[key] = []
    } else if (typeof json[key] === 'object' && Object.prototype.toString.call(json[key]).toLowerCase() === '[object object]' && !json[key].length) {
      json[key] = {}
    } else {
      json[key] = ''
    }
  }
}

/**
 * @description: 获取Api BaseUrl
 * @param {*} key
 * @return {*}
 * @author: gumingchen
 */
export function getApiBaseUrl () {
  const baseUrl = process.env.VUE_APP_PROXY === 'true'
    ? `/proxy${ MAPPING }`
    : process.env.VUE_APP_BASE_API + MAPPING
  return baseUrl
}
