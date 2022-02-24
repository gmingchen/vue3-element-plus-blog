/*
 * @Description: 仪表盘
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 数据统计
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function quantityStatisticsApi() {
  return service({
    url: '/console/dashboard/quantityStatistics',
    method: 'get'
  })
}

/**
 * @description: 获取最近增加用户统计
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function userStatisticsApi(params) {
  return service({
    url: '/console/dashboard/userStatistics',
    method: 'get',
    params: params
  })
}

/**
 * @description: 获取最近发布的文章
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function latestArticleApi(params) {
  return service({
    url: '/console/dashboard/latestArticle',
    method: 'get',
    params: params
  })
}

/**
 * @description: 获取最近收到的文章评论
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function latestCommentApi(params) {
  return service({
    url: '/console/dashboard/latestComment',
    method: 'get',
    params: params
  })
}

/**
 * @description: 获取最近收到的留言
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function latestMessageApi(params) {
  return service({
    url: '/console/dashboard/latestMessage',
    method: 'get',
    params: params
  })
}

/**
 * @description: 获取最近操作日志
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function latestLogApi(params) {
  return service({
    url: '/console/dashboard/latestLog',
    method: 'get',
    params: params
  })
}
