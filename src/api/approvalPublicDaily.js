import request from '@/utils/request';

/**
 * 新增（公账）日报审批记录
 *
 * @export
 * @param {*} 
 * @returns
*/
export function approvalPublicDaily(data) {
  return request({
    url: '/approvalPublicDaily/insertSelective',
    method: 'post',
    data
  });
}