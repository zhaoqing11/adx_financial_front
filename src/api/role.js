import request from '@/utils/request';

/**
 *获取角色列表
 *
 * @export
 * @returns
 */
export function getRoleList() {
  return request({
    url: '/user-api/role/getRoleDictionary',
    method: 'post'
  });
}

/**
 *新增角色
 *
 * @export
 * @returns
 */
export function insertRole(data) {
  return request({
    url: '/user-api/role/insertRole',
    method: 'post',
    data
  });
}

/**
 *修改角色
 *
 * @export
 * @returns
 */
export function updateRole(data) {
  return request({
    url: '/user-api/role/updateRole',
    method: 'post',
    data
  });
}

/**
 *删除角色
 *
 * @export
 * @returns
 */
export function deleteRole(data) {
  return request({
    url: '/user-api/role/deleteRole',
    method: 'post',
    data
  });
}

/**
 *禁用角色
 *
 * @export
 * @returns
 */
export function disabledRole(data) {
  return request({
    url: '/user-api/role/disabledRole',
    method: 'post',
    data
  });
}

/**
 *启用角色
 *
 * @export
 * @returns
 */
export function enabledRole(data) {
  return request({
    url: '/user-api/role/enabledRole',
    method: 'post',
    data
  });
}

/**
 *根据角色获取角色下的权限
 *
 * @export
 * @returns
 */
export function getAuthByRole(data) {
  return request({
    url: '/user-api/role/getAuthByRole',
    method: 'post',
    data
  });
}

/**
 *根据角色获取角色下的用户
 *
 * @export
 * @returns
 */
export function getUserByRole(data) {
  return request({
    url: '/user-api/role/getUserByRole',
    method: 'post',
    data
  });
}

/**
 *角色权限设置
 *
 * @export
 * @returns
 */
export function setAuthByRole(data) {
  return request({
    url: '/user-api/role/setAuthByRole',
    method: 'post',
    data
  });
}

/**
 *获取权限树
 *
 * @export
 * @returns
 */
export function getAuthTree(data) {
  return request({
    url: '/user-api/role/getAuthTree',
    method: 'post',
    data
  });
}

