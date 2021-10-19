import request from '@/utils/request';

/**
 * 获取角色权限列表
 *
 * @export
 * @returns
*/
export function getAuthByRole(data) {
  return request({
    url: '/role/getAuthByRole',
    method: 'post',
    data
  });
}

/**
 * 获取角色列表
 *
 * @export
 * @returns
 */
export function getRoleList() {
  return request({
    url: '/role/selectAll',
    method: 'post'
  });
}
