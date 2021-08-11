import request from '@/utils/request';

/**
 * 新增汇款记录
 *
 * @export
 * @param {*} data
 * @returns
 */
export function addPaymentRemittance(data) {
  return request({
    url: '/paymentRemittance/addSelective',
    method: 'post',
    data
  });
}