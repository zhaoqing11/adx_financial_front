import request from '@/utils/request';

/**
 * 创建审批请款记录
 *
 * @export
 * @param {*} data
 * @returns
 */
export function approvalPaymentForm(data) {
  return request({
    url: '/approvalPayment/addSelective',
    method: 'post',
    data
  });
}