import request from '@/utils/request';


/**
 * 审批（公账-账户3）日报审批记录
 *
 * @export
 * @param {*} 
 * @returns
*/
export function approvalPubGeneral(data) {
  return request({
    url: '/approvalPublicDaily/approvalPubGeneral',
    method: 'post',
    data
  });
}

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