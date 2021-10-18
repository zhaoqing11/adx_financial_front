import request from '@/utils/request';


/**
 * 
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getDataInfo(data) {
  return request({
    url: '/flowRecordStatistics/getDataInfo',
    method: 'post',
    data
  });
}

/**
 * 
 *
 * @export
 * @param {*} 
 * @returns
*/
export function publicFlowRecordByDepartment(data) {
  return request({
    url: '/flowRecordStatistics/publicFlowRecordByDepartment',
    method: 'post',
    data
  });
}

/**
 * 
 *
 * @export
 * @param {*} 
 * @returns
*/
export function privateFlowRecordByDepartment(data) {
  return request({
    url: '/flowRecordStatistics/privateFlowRecordByDepartment',
    method: 'post',
    data
  });
}

/**
 * 
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getPublicFlowRecordDetails(data) {
  return request({
    url: '/flowRecordStatistics/getPublicFlowRecordDetails',
    method: 'post',
    data
  });
}

/**
 * 
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getPrivateFlowRecordDetails(data) {
  return request({
    url: '/flowRecordStatistics/getPrivateFlowRecordDetails',
    method: 'post',
    data
  });
}

/**
 * 
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getCollectionRecordByMonth(data) {
  return request({
    url: '/flowRecordStatistics/getCollectionRecordByMonth',
    method: 'post',
    data
  });
}


/**
 *  获取（普通账户1）部门支出流水
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getGeneralRecordByDepartment(data) {
  return request({
    url: '/flowRecordStatistics/getGeneralRecordByDepartment',
    method: 'post',
    data
  });
}

/**
 *  获取（普通账户2）部门支出流水
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getSecondGeneralRecordByDepartment(data) {
  return request({
    url: '/flowRecordStatistics/getSecondGeneralRecordByDepartment',
    method: 'post',
    data
  });
}


/**
 *  获取（普通账户2）部门支出明细
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getSecondGeneralFlowRecordDetails(data) {
  return request({
    url: '/flowRecordStatistics/getSecondGeneralFlowRecordDetails',
    method: 'post',
    data
  });
}

/**
 * 获取（普通账户1）部门支出明细
 *
 * @export
 * @param {*} 
 * @returns
*/
export function getGeneralRecordDetails(data) {
  return request({
    url: '/flowRecordStatistics/getGeneralRecordDetails',
    method: 'post',
    data
  });
}