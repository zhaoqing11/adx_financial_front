export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function validUsername(str) {
  return str.trim().length > 0;
}

/* 合法uri*/
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/* 小写字母*/
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// 手机格式验证
export function validPhone(str) {
  const reg = new RegExp(/^((1[3,4,5,7,8][0-9])|(16[6])|(19[8,9]))\d{8}$/);
  return reg.test(str);
}

export function formatDate2(time) {
  var date = new Date(time);
  var len = time.toString().length;
  if (len < 13) {
    var sub = 13 -len;
    sub = Math.pow(10, sub);
    date = new Date(time * sub);
  }
  var y = date.getFullYear() + '-';
  var M = date.getMonth() + 1;
  M = (M < 10 ? '0' + M : M) + '-';
  var d = date.getDate();
  d = (d < 10 ? '0' + d : d);
  return y + M + d;
}

// 日期格式化
export function formatDate(time) {
  var date = new Date(time);
  var len = time.toString().length;
  // 时间戳不足13位则在后面加零
  if (len < 13) {
      var sub = 13 - len;
      sub = Math.pow(10, sub);
      date = new Date(time * sub);
  }
  var y = date.getFullYear() + '-';
  var M = date.getMonth() + 1;
  M = (M < 10 ? '0' + M : M) + '-';
  var d = date.getDate();
  d = (d < 10 ? '0' + d : d) + ' ';
  var h = date.getHours();
  h = (h < 10 ? '0' + h : h) + ':';
  var m = date.getMinutes();
  m = (m < 10 ? '0' + m : m) + ':';
  var s = date.getSeconds();
  s = s < 10 ? '0' + s : s;
  return y + M + d + h + m + s;
}

export function formatStr2Date(val) {
  if (Object.isEmpty(val.createTime)) {
    return val;
  }
  if (val.createTime.length > 19) {
    return val.createTime.substring(0,19);
  }
}

export function formatCardNum(cardNum) {
  const noLine = cardNum.replace(/-/g, '')
  // 去除格式不对的字符并重新插入-的字符串
  const newCardNum = noLine.replace(/\D+/g, '').replace(/(\d{4})/g, '$1-').replace(/-$/, '')
  return newCardNum
}
