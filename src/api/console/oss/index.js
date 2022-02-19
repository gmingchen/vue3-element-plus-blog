/*
 * @Description: 文件存储
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'
import { getApiBaseUrl } from '@/utils'
import { ContentType } from '@/utils/dictionary.js'

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

/**
 * @description: 文件上传
 * @param {*} file 文件
 * @param {*} watermark 水印
 * @param {*} params 额外参数
 * @returns
 * @author: gumingchen
 */
export function uploadApi(file, watermark = false, params = {}) {
  const form = new FormData()
  form.append('file', file)
  form.append('watermark', watermark)
  form.append('params', params)
  return service({
    url: upload(),
    method: 'post',
    headers: {
      'Content-Type': ContentType.upload
    },
    data: form
  })
}
