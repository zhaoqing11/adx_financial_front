import request from '@/utils/request';
import { getToken } from '@/utils/auth';

// 下载pdf
export function downloadPdf(data) {
  window.open(
    `${process.env.VUE_APP_BASE_API}/project-api/file/downloadPdf/${data.id}/${data.fileName}?AccessToken=${getToken()}`,
    '_blank'
  );
}

/**
 * 预览pdf
 * 
 * @param {*} id 
 */
export function readPDF(data) {
  window.open(
    `${process.env.VUE_APP_BASE_API}/project-api/file/get/${data.id}/${data.fileName}?AccessToken=${getToken()}`,
    '_blank'
  );
}

/**
 * 预览文件
 * 
 * @param {*} id 
 */
export function preViewFile(id) {
  window.open(
    `${process.env.VUE_APP_BASE_API}/project-api/accessory/preViewFile?idAccessory=${id}&AccessToken=${getToken()}`,
    '_blank'
  );
}

// 文件下载
export function downloadFile(id) {
  window.open(
    `${process.env.VUE_APP_BASE_API}/project-api/accessory/download?idAccessory=${id}&AccessToken=${getToken()}`,
    '_blank'
  );
}