import request from '@/utils/request';

/**
 * 新增余额记录
 *
 * @export
 * @param {*} data
 * @returns
 */
export function addRemainingSumRecord(data) {
  return request({
    url: '/remainingSum/addSelective',
    method: 'post',
    data
  });
}