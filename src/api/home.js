import request from '@/utils/request';
import { getToken } from '@/utils/auth';

/**
 * 获取回款金额数据分析
 * @returns 
 */
export function getPaymentRecordMoney() {
  return request({
    url: '/project-api/index/getPaymentRecordMoney',
    method: 'post'
  })
}

/**
 * 获取回款计划数据分析
 * @returns 
 */
export function getPaymentPlanDataInfo() {
  return request({
    url: '/project-api/index/getPaymentPlanDataInfo',
    method: 'get'
  })
}

/**
 * 获取首页待办任务列表
 *
 * @export
 * @param {*} 
 * @returns
 */
export function getDataInfo() {
  return request({
    url: '/project-api/index/getDataInfo',
    method: 'get'
  });
}

