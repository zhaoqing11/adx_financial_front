import request from '@/utils/request';

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
export function logout() {
  return request({
    url: '/user-api/user/logout',
    method: 'post'
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

