import request from '@/utils/request';

/**
 * 获取所有供应商
 *
 * @export
 * @returns
 */
export function selectAll() {
  return request({
    url: '/project-api/supplier/selectAll',
    method: 'post'
  });
}

/**
 * 获取供应商详细信息
 *
 * @export
 * @returns
 */
export function getSupplierDetail(data) {
  return request({
    url: '/project-api/supplier/selectSupplierDetail',
    method: 'post',
    data
  });
}

/**
 * 分页条件查询供应商列表
 *
 * @export
 * @returns
 */
export function getSupplierList(data) {
  return request({
    url: '/project-api/supplier/selectSupplierList',
    method: 'post',
    data
  });
}

/**
 * 删除供应商
 *
 * @export
 * @returns
 */
export function deleteSupplier(data) {
  return request({
    url: '/project-api/supplier/deleteSupplier',
    method: 'post',
    data
  });
}

/**
 * 新增供应商
 *
 * @export
 * @returns
 */
export function insertSupplier(data) {
  return request({
    url: '/project-api/supplier/insertSupplier',
    method: 'post',
    data
  });
}

/**
 *编辑供应商
 *
 * @export
 * @returns
 */
export function updateSupplier(data) {
  return request({
    url: '/project-api/supplier/updateSupplier',
    method: 'post',
    data
  });
}
