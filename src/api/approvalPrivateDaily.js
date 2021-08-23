import request from '@/utils/request';

/**
 * 新增（私账）日报审批记录
 *
 * @export
 * @param {*} 
 * @returns
*/
export function approvalPrivateDaily(data) {
  return request({
    url: '/approvalPrivateDaily/insertSelective',
    method: 'post',
    data
  });
}