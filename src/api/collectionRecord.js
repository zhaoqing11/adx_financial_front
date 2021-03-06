import request from '@/utils/request';

/**
 * 新增收款信息
 *
 * @export
 * @param {*} data
 * @returns
 */
export function addCollectionRecord(data) {
  return request({
    url: '/collectionRecord/addSelective',
    method: 'post',
    data
  });
}

/**
 * 修改收款信息
 *
 * @export
 * @param {*} data
 * @returns
 */
export function updateCollectionRecord(data) {
    return request({
      url: '/collectionRecord/updateSelective',
      method: 'post',
      data
    });
}

/**
 *删除收款
 *
 * @export
 * @param {*} data
 * @returns
 */
export function delCollectionRecord(data) {
    return request({
      url: '/collectionRecord/deleteSelective',
      method: 'post',
      data
    });
}

/**
 * 分页条件查询收款列表
 *
 * @export
 * @param {*} data
 * @returns
 */
export function selectCollectionRecord(data) {
    return request({
      url: '/collectionRecord/selectByPage',
      method: 'post',
      data
    });
}