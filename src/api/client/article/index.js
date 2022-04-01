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
 * @description: 最新发布的文章
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function latestApi(params) {
  return service({
    url: '/client/article/latest',
    method: 'get',
    params: params
  })
}

/**
 * @description: 推荐的文章
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function recommendedApi(params) {
  return service({
    url: '/client/article/recommended',
    method: 'get',
    params: params
  })
}

/**
 * @description: 人气文章
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function readApi(params) {
  return service({
    url: '/client/article/read',
    method: 'get',
    params: params
  })
}

/**
 * @description: 搜索建议文章
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function searchSuggestApi(params) {
  return service({
    url: '/client/article/searchSuggest',
    method: 'get',
    params: params
  })
}

/**
 * @description: 获取文章详情
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function detailsApi(params) {
  return service({
    url: '/client/article/details',
    method: 'get',
    params: params
  })
}

/**
 * @description: 搜索文章分页
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function searchApi(params) {
  return service({
    url: '/client/article/search',
    method: 'get',
    params: params
  })
}

