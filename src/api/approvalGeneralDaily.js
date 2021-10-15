import request from '@/utils/request';

/**
 * 新增（普通账户1）日账审批记录
 *
 * @export
 * @param {*} 
 * @returns
*/
export function approvalGeneralDaily(data) {
  return request({
    url: '/approvalGeneralDaily/insertGeneralDaily',
    method: 'post',
    data
  });
}

/**
 * 新增（普通账户2）日账审批记录
 *
 * @export
 * @param {*} 
 * @returns
*/
export function approvalSecondGeneralDaily(data) {
  return request({
    url: '/approvalGeneralDaily/insertSecondGeneralDaily',
    method: 'post',
    data
  });
}

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