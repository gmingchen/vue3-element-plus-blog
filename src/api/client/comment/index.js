/*
 * @Description: 文章评论
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 文章评论分页
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/client/comment/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 评论文章
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function addApi(params) {
  return service({
    url: '/client/comment/create',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除用户自己的评论
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function delApi(params) {
  return service({
    url: '/client/comment/delete',
    method: 'post',
    data: params
  })
}
