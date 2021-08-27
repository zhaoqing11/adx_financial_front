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
    method: 'get',
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
    method: 'get',
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
    method: 'get',
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
    method: 'get',
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
    method: 'get',
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
    method: 'get',
    data
  });
}
