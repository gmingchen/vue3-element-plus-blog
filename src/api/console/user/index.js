/*
 * @Description: 用户
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 分页
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/console/user/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 用户状态 禁用 / 启用
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function statusApi(params) {
  return service({
    url: '/console/user/status',
    method: 'post',
    data: params
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function addApi(params) {
  return service({
    url: '/console/tag/create',
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function editApi(params) {
  return service({
    url: '/console/tag/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function delApi(params) {
  return service({
    url: '/console/tag/delete',
    method: 'post',
    data: params
  })
}
