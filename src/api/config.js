import request from '@/utils/request';

/**
 * 新增账户
 * @param {*} data 
 * @returns 
 */
export function addConfig(data) {
  return request({
    url: '/config/insertSelective',
    method: 'post',
    data
  })
}

/**
 * 获取账户信息
 *
 * @export
 * @param {*} 
 * @returns
*/
export function selectAll() {
  return request({
    url: '/config/selectAll',
    method: 'post'
  });
}

/**
 * 修改账户信息
 *
 * @export
 * @param {*} 
 * @returns
*/
export function updateConfig(data) {
  return request({
    url: '/config/updateConfig',
    method: 'post',
    data
  });
}