import request from '@/utils/request';

/**
 * 获取审批流程信息
 *
 * @export
 * @param {*} 
 * @returns
*/
export function selectApprovalInfo(data) {
  return request({
    url: '/approval/selectApprovalInfo',
    method: 'post',
    data
  });
}

/**
 * 审批请款信息
 *
 * @export
 * @param {*} 
 * @returns
*/
export function approvalVerify(data) {
  return request({
    url: '/approval/verify',
    method: 'post',
    data
  });
}