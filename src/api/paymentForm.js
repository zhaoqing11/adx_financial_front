import request from '@/utils/request';


/**
 * 获取收支流水列表
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getFlowRecordDetail(data) {
  return request({
    url: '/paymentForm/queryFlowRecordDetail',
    method: 'post',
    data
  });
}


/**
 * 获取待审批请款数
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getDataInfo(data) {
  return request({
    url: '/paymentForm/getDataInfo',
    method: 'post',
    data
  });
}


/**
 * 分页条件查询全部请款列表
 *
 * @export
 * @param {*} data
 * @returns
 */
export function queryAllPaymentForm(data) {
  return request({
    url: '/paymentForm/queryAllPaymentForm',
    method: 'post',
    data
  });
}

/**
 *分页（条件）查询审批列表
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getApprovalPaymentForm(data) {
  return request({
    url: '/paymentForm/selectApprovalPaymentFormByPage',
    method: 'post',
    data
  });
}

/**
 *创建请款单
 *
 * @export
 * @param {*} data
 * @returns
 */
export function addPaymentForm(data) {
  return request({
    url: '/paymentForm/addSelective',
    method: 'post',
    data
  });
}

/**
 *根据id修改请款单
 *
 * @export
 * @param {*} data
 * @returns
 */
export function updatePaymentForm(data) {
    return request({
      url: '/paymentForm/updateSelective',
      method: 'post',
      data
    });
}

/**
 *根据id删除请款单
 *
 * @export
 * @param {*} data
 * @returns
 */
export function delPaymentForm(data) {
    return request({
      url: '/paymentForm/deleteSelective',
      method: 'post',
      data
    });
}

/**
 *根据id查询请款单
 *
 * @export
 * @param {*} data
 * @returns
 */
export function selectPaymentFormById(data) {
    return request({
      url: '/paymentForm/selectByPrimaryKey',
      method: 'post',
      data
    });
}

/**
 *分页（条件）查询请款单列表
 *
 * @export
 * @param {*} data
 * @returns
 */
export function selectPaymentFormList(data) {
    return request({
      url: '/paymentForm/selectByPage',
      method: 'post',
      data
    });
}