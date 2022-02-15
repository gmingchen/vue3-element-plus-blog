/*
 * @Description: 配置
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function listApi() {
  return service({
    url: '/console/config/list',
    method: 'get'
  })
}

/**
 * @description: 配置值信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function infoApi(params) {
  return service({
    url: '/console/config/info',
    method: 'get',
    params: params
  })
}

/**
 * @description: 编辑配置值
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function editApi(params) {
  return service({
    url: '/console/config/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 启用配置
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function statusApi(params) {
  return service({
    url: '/console/config/status',
    method: 'post',
    data: params
  })
}
