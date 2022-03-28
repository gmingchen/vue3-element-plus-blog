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
 * @description: 回复文章评论
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function replyAddApi(params) {
  return service({
    url: '/client/commentReply/create',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除用户自己的回复
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function replyDelApi(params) {
  return service({
    url: '/client/commentReply/delete',
    method: 'post',
    data: params
  })
}
