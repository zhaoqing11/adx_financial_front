import Cookies from 'js-cookie';

const TokenKey = 'vue_admin_template_token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function setName(name) {
  return Cookies.set('name', name, 0);
}

export function getName() {
  return Cookies.get('name');
}

export function removeName() {
  return Cookies.remove('name');
}

export function setUserId(userId) {
  return Cookies.set('userId', userId, 0);
}

export function getUserId() {
  return Cookies.get('userId');
}

export function removeUserId() {
  return Cookies.remove('userId');
}

export function setRole(roleId) {
  return Cookies.set('roleId', roleId, 0);
}

export function getRole() {
  return Cookies.get('roleId');
}

export function removeRole() {
  return Cookies.remove('roleId');
}

export function setClientIpInfo(clientIpInfo) {
  return Cookies.set('clientIpInfo', clientIpInfo, 0);
}

export function getClientIpInfo() {
  const str = Cookies.get('clientIpInfo');
  if(str){
    return JSON.parse(str);
  }
}

export function removeClientIpInfo() {
  return Cookies.remove('clientIpInfo');
}

export function removePerimission() {
  return Cookies.remove('rolePerimissions');
}

export function setPerimission(perimssions) {
  const perimssionsObj = {};
  if (Array.isArray(perimssions) && perimssions.length > 0) {
    perimssions.forEach((item) => {
      perimssionsObj[item.keyName] = true;
    });
  }
  const str = JSON.stringify(perimssionsObj);
  return Cookies.set('rolePerimissions', str);
}

export function getPerimission() {
  const str = Cookies.get('rolePerimissions');
  if(str){
    return JSON.parse(str);
  }
}

/**
 * 检查当前用户角色是否拥有指定Key权限
 *
 * @export
 * @param {*} checkKey
 * @returns boolean
 */
export function checkPerimission(checkKey) {
  const perimssions = getPerimission();
  if(perimssions){
    return perimssions.hasOwnProperty(checkKey);
  }
}
