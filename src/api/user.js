import request from '@/utils/request';

/**
 * 获取部门员工列表
 */
export function selectUserByDepartment() {
  return request({
    url: '/user-api/user/selectUserByDepartment',
    method: 'post'
  })
}

/**
 * 
 * @param {获取账号绑定手机号} data 
 */
export function checkUserBindPhone(data) {
  return request({
    url: '/user-api/user/checkUserBindPhone',
    method: 'post',
    data
  })
}

/**
 * 获取短信验证码
 * @param {*} data 
 */
export function getSmsCode(data) {
  return request({
    url: '/user-api/user/getSmsCode',
    method: 'post',
    data
  });
}

/**
 * 判断登录用户IP地址是否为内网地址
 */
export function checkUserReqInnerIP() {
  return request({
    url: '/user-api/user/checkUserReqInnerIP',
    method: 'get'
  })
}

/**
 * 保存用户IP地址
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getClientIpAddress(data) {
  return request({
    url: '/user-api/user/getClientIpAddress/' + data,
    method: 'get'
  });
}

/**
 * 更新用户离开窗口时间
 *
 * @export
 * @param {*} data
 * @returns
 */
export function changeTabLeaveTime(data) {
  return request({
    url: '/user-api/user/updateTabLeaveTime/' + data,
    method: 'get'
  });
}

/**
 *注册
 *
 * @export
 * @param {*} data
 * @returns
 */
export function register(data) {
  return request({
    url: '/user-api/user/regist',
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
    url: '/user-api/user/login',
    method: 'post',
    data
  });
}

/**
 *获取图片验证码
 *
 * @export
 * @param {*} data
 * @returns
 */
export function getCode(data) {
  return request({
    url: '/user-api/getCode',
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
 *查询用户列表
 *
 * @export
 * @returns
 */
export function getUserList(data) {
  return request({
    url: '/user-api/user/selectUserByPage',
    method: 'post',
    data
  });
}

/**
 *管理员新增用户
 *
 * @export
 * @returns
 */
export function insertUser(data) {
  return request({
    url: '/user-api/user/insertUser',
    method: 'post',
    data
  });
}

/**
 *管理员重置用户密码
 *
 * @export
 * @returns
 */
export function reUserPassword(data) {
  return request({
    url: '/user-api/user/reUserPassword',
    method: 'post',
    data
  });
}

/**
 *管理员修改用户信息
 *
 * @export
 * @returns
 */
export function updateUser(data) {
  return request({
    url: '/user-api/user/updateUser',
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

/**
 *禁用用户
 *
 * @export
 * @returns
 */
export function disableUser(data) {
  return request({
    url: '/user-api/user/disableUser',
    method: 'post',
    data
  });
}

/**
 *启用用户
 *
 * @export
 * @returns
 */
export function enabledUser(data) {
  return request({
    url: '/user-api/user/relieveUser',
    method: 'post',
    data
  });
}
