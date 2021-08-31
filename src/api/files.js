import request from '@/utils/request';
import { getToken } from '@/utils/auth';

// /**
//  * 预览文件
//  * 
//  * @param {*} id 
//  */
// export function preViewFile(id) {
//   window.open(
//     `${process.env.VUE_APP_BASE_API}/project-api/accessory/preViewFile?idAccessory=${id}&AccessToken=${getToken()}`,
//     '_blank'
//   );
// }

// // 文件下载
// export function downloadFile(id) {
//   window.open(
//     `${process.env.VUE_APP_BASE_API}/project-api/accessory/download?idAccessory=${id}&AccessToken=${getToken()}`,
//     '_blank'
//   );
// }