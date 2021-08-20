import request from '@/utils/request';


/**
 * 修改日账单
 *
 * @export
 * @param {*} 
 * @returns
*/
export function updateDaily() {
    return request({
      url: '/daily/updateDaily',
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
 * 获取每日账单列表
 *
 * @export
 * @param {*} 
 * @returns
 */
export function getDailyList() {
  return request({
    url: '/daily/selectDailyList',
    method: 'post'
  });
}