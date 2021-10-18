import request from '@/utils/request';
import { getToken } from '@/utils/auth';

/**
 * 导出收支明细列表
 *
 * @export
 * @param {*} data
 * @returns
 */
export function exportToExcel(year, month, idCardType) {
  window.open(
    `${process.env.VUE_APP_BASE_API}/report/exportToExcel?year=`+ year + `&month=` + month + `&idCardType=` + idCardType +`&AccessToken=${getToken()}`,
    '_blank'
  );
}

/**
 * 获取指定月份流水明细
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getReportDetailByDay(data) {
  return request({
    url: '/report/selectReportDetailByDay',
    method: 'post',
    data
  });
}

/**
 * 删除月报
 *
 * @export
 * @param {*} data
 * @returns
 */
export function deleteReport(data) {
  return request({
    url: '/report/deleteSelective',
    method: 'post',
    data
  });
}

/**
 * 分页（条件）查询（公账）月报
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getPublicReportList(data) {
  return request({
    url: '/report/selectPublicReportByPage',
    method: 'post',
    data
  });
}

/**
 * 分页（条件）查询（私账）月报
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getPrivateReportList(data) {
  return request({
    url: '/report/selectPrivateReportByPage',
    method: 'post',
    data
  });
}

/**
 * 分页（条件）查询普通账户1月报
 *
 * @export
 * @param {*} data
 * @returns
*/
export function getGeneralReportList(data) {
  return request({
    url: '/report/selectGeneralReportByPage',
    method: 'post',
    data
  });
}

/**
 * 分页（条件）查询普通账户2月报
 *
 * @export
 * @param {*} data
 * @returns
*/
export function getSecondGeneralReportList(data) {
  return request({
    url: '/report/selectSecondGeneralReportByPage',
    method: 'post',
    data
  });
}