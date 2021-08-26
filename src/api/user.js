import request from '@/utils/request';


/**
 * 修改用户密码
 *
 * @export
 * @param {*} data
 * @returns
*/
export function updatePassword(data) {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data
  });
}


/**
 * 分页（条件）查询用户列表
 *
 * @export
 * @param {*} data
 * @returns
*/
export function selectByPage(data) {
  return request({
    url: '/user/selectByPage',
    method: 'post',
    data
  });
}

/**
 * 根据用户id查询用户信息
 *
 * @export
 * @param {*} data
 * @returns
*/
export function selectUserById(data) {
  return request({
    url: '/user/selectUserById',
    method: 'post',
    data
  });
}

/**
 * 删除用户
 *
 * @export
 * @param {*} data
 * @returns
*/
export function deleteUser(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  });
}

/**
 * 修改用户
 *
 * @export
 * @param {*} data
 * @returns
*/
export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  });
}

/**
 * 新增用户
 *
 * @export
 * @param {*} data
 * @returns
 */
export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  });
}

/**
 *登录
 *
 * @export
 * @param {*} data
 * @returns
 */
export function LoginByUsername(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  });
}

/**
 *退出登录
 *
 * @export
 * @returns
 */
export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  });
}

/**
 *用户在个人中心修改密码
 *
 * @export
 * @returns
 */
export function updateUserPassword(data) {
  return request({
    url: '/user-api/user/updateUserPassword',
    method: 'post',
    data
  });
}

