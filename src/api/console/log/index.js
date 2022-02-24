/*
 * @Description: 日志
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/console/log/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 清除日志
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function truncateApi() {
  return service({
    url: '/console/log/truncate',
    method: 'post'
  })
}
