import request from '@/utils/request';


/**
 * 查询上一天账单核对信息
 *
 * @export
 * @param {*} 
 * @returns
*/
export function selectIsExitUnApprovalDaily(data) {
  return request({
    url: '/daily/selectIsExitUnApprovalDaily',
    method: 'post',
    data
  });
}

/**
 * 根据指定日期获取（私账）收支明细
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getPrivateDailyByDate(data) {
  return request({
    url: '/daily/selectPrivateDailyByDate',
    method: 'post',
    data
  });
}

/**
 * 根据指定日期获取（公账）收支明细
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getPublicDailyByDate(data) {
  return request({
    url: '/daily/selectPublicDailyByDate',
    method: 'post',
    data
  });
}

/**
 * 修改日账单（公账）
 *
 * @export
 * @param {*} 
 * @returns
*/
export function updatePublicDaily() {
  return request({
    url: '/daily/updatePublicDaily',
    method: 'post'
  });
}

/**
 * 修改日账单（私账）
 *
 * @export
 * @param {*} 
 * @returns
*/
export function updatePrivateDaily() {
  return request({
    url: '/daily/updatePrivateDaily',
    method: 'post'
  });
}

/**
 * 新增日账单
 *
 * @export
 * @param {*} 
 * @returns
*/
export function insertDaily() {
    return request({
      url: '/daily/insertDaily',
      method: 'post'
    });
}

/**
 * 获取每日账单列表(公账)
 *
 * @export
 * @param {*} 
 * @returns
 */
export function getPublicDailyByPage(data) {
  return request({
    url: '/daily/selectPublicDailyByPage',
    method: 'post',
    data
  });
}

/**
 * 获取每日账单列表(私账)
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getPrivateDailyByPage(data) {
  return request({
    url: '/daily/selectPrivateDailyByPage',
    method: 'post',
    data
  });
}