import request from '@/utils/request';

/**
 *创建部门
 *
 * @export
 * @returns
 */
 export function addDepartment(data) {
  return request({
    url: '/department/addDepartment',
    method: 'post',
    data
  });
}

/**
 *修改部门
 *
 * @export
 * @returns
 */
 export function updateDepartment(data) {
  return request({
    url: '/department/updateDepartment',
    method: 'post',
    data
  });
}

/**
 *删除部门
 *
 * @export
 * @returns
 */
 export function deletDepartment(data) {
  return request({
    url: '/department/deletDepartment',
    method: 'post',
    data
  });
}

/**
 *获取部门列表
 *
 * @export
 * @returns
 */
export function getDepartmentList() {
  return request({
    url: '/department/selectAll',
    method: 'post'
  });
}
