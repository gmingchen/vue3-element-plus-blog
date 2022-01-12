/*
 * @Description: 文件存储
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import { getApiBaseUrl } from '@/utils'

/**
 * @description: 分页
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function upload() {
  const reuslt = getApiBaseUrl() + '/console/oss/upload'
  return reuslt
}
