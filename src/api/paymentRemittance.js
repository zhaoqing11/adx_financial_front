import request from '@/utils/request';


/**
 * 根据请款id查询汇款记录
 *
 * @export
 * @param {*} data
 * @returns
*/
export function getRemittanceByIdPamentForm(data) {
  return request({
    url: '/paymentRemittance/getRemittanceByIdPamentForm',
    method: 'post',
    data
  });
}

/**
 * 审核创建支出流水记录
 *
 * @export
 * @param {*} data
 * @returns
*/
export function addApprovalPaymentRemittance(data) {
  return request({
    url: '/paymentRemittance/addApprovalPaymentRemittance',
    method: 'post',
    data
  });
}

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