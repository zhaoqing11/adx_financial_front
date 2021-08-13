import request from '@/utils/request';


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