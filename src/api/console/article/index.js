/*
 * @Description: 文章
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
    url: '/console/article/page',
    method: 'post',
    data: params
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function infoApi(params) {
  return service({
    url: `/console/article/info`,
    method: 'get',
    params: params
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
    url: '/console/article/create',
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
    url: '/console/article/update',
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
    url: '/console/article/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否推荐
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function recommendedApi(params) {
  return service({
    url: '/console/article/recommended',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否可评论
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function commentableApi(params) {
  return service({
    url: '/console/article/commentable',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否发布
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function publishedApi(params) {
  return service({
    url: '/console/article/published',
    method: 'post',
    data: params
  })
}
