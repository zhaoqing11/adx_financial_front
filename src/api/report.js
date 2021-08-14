import request from '@/utils/request';
import { getToken } from '@/utils/auth';

/**
 * 导出收支明细列表
 *
 * @export
 * @param {*} data
 * @returns
 */
export function exportToExcel(year, month) {
  window.open(
    `${process.env.VUE_APP_BASE_API}/report/exportToExcel?year=`+ year + `&month=` + month +`&AccessToken=${getToken()}`,
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
 * 分页（条件）查询月报
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getReportList(data) {
    return request({
      url: '/report/selectByPage',
      method: 'post',
      data
    });
}