/*
 * @Description: 文章评论回复
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
export function replyPageApi(params) {
  return service({
    url: '/console/commentReply/page',
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
export function replyAddApi(params) {
  return service({
    url: '/console/commentReply/create',
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
export function replyDelApi(params) {
  return service({
    url: '/console/commentReply/delete',
    method: 'post',
    data: params
  })
}
