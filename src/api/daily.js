import request from '@/utils/request';

/**
 * 根据指定日期获取（公账-账户3）收支明细
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getPubGeneralcDailyByDate(data) {
  return request({
    url: '/daily/selectPubGeneralDailyByDate',
    method: 'post',
    data
  });
}

/**
 * 获取每日账单列表(公账)
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getPubGeneralDailyByPage(data) {
  return request({
    url: '/daily/selectPubGeneralDailyByPage',
    method: 'post',
    data
  });
}

/**
 * 根据指定日期获取收支明细
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getGeneralDailyByDate(data) {
  return request({
    url: '/daily/selectGeneralDailyByDate',
    method: 'post',
    data
  });
}

/**
 * 根据指定日期获取收支明细
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getSecondGeneralDailyByDate(data) {
  return request({
    url: '/daily/selectSecondGeneralDailyByDate',
    method: 'post',
    data
  });
}

/**
 * 获取每日账单列表(普通账户1)
 *
 * @export
 * @param {*} 
 * @returns
 */
export function getGeneralAccountDaily(data) {
  return request({
    url: '/daily/selectGeneralAccountDailyByPage',
    method: 'post',
    data
  });
}

/**
 * 获取每日账单列表(普通账户2)
 *
 * @export
 * @param {*} 
 * @returns
 */
export function getSecondGeneralAccountDaily(data) {
  return request({
    url: '/daily/selectSecondGeneralAccountDailyByPage',
    method: 'post',
    data
  });
}

/**
 * 查询待审批账单数量
 *
 * @export
 * @param {*} 
 * @returns
*/
export function selectDailyByState(data) {
  return request({
    url: '/daily/selectDailyByState',
    method: 'post',
    data
  });
}

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
export function updatePublicDaily(data) {
  return request({
    url: '/daily/updatePublicDaily',
    method: 'post',
    data
  });
}

/**
 * 修改日账单（私账）
 *
 * @export
 * @param {*} 
 * @returns
*/
export function updatePrivateDaily(data) {
  return request({
    url: '/daily/updatePrivateDaily',
    method: 'post',
    data
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