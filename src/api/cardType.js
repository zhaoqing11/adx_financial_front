import request from '@/utils/request';

/**
 * 获取账号类型
 *
 * @export
 * @param {*} 
 * @returns
 */
export function getCardType() {
  return request({
    url: '/cardType/selectAll',
    method: 'post'
  });
}