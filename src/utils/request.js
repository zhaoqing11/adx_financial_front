import axios from "axios";
import qs from "qs";
import { MessageBox, Message } from "element-ui";
import { getToken, removeToken } from "@/utils/auth";
import router from "@/router";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
});

service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.url += "?AccessToken=" + getToken();
    } else {
      if (
        config.url.indexOf("/user/login") !== -1 ||
        config.url.indexOf("/user-api/getCode") !== -1 ||
        config.url.indexOf("/user/getSmsCode") !== -1
      ) {
      } else {
        MessageBox.confirm("用户未登录，请先登录", "登录", {
          confirmButtonText: "登录",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          removeToken();
          router.push({
            path: "/login"
          });
        });
      }
    }
    if (config.url.indexOf("quotedPrice/insertQuotedPrice") !== -1) {
      if (config.data.idQuotedPrice) {
        config.url += "&idQuotedPrice=" + config.data.idQuotedPrice;
      }
      if (config.data.idProject) {
        config.url += "&idProject=" + config.data.idProject;
      }
      if (config.data.createIdUser) {
        config.url += "&createIdUser=" + config.data.createIdUser;
      }
      config.data = config.data.data;
      config.headers["Content-Type"] = "application/json";

    } else {
      config.method === "post"
        ? (config.data = qs.stringify({ ...config.data }))
        : (config.data = { ...config.data });

      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */

  response => {
    const res = response.data;
    if (res.status === 20001) {
      // 请自行在引入 MessageBox
      MessageBox.confirm("用户未登录，请先登录", "登录", {
        confirmButtonText: "登录",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeToken();
        router.push({
          path: "/login"
        });
      });
    } else if (res.status === 403) {
      Message.error(res.cause);
    } else {
      return response;
    }
    return Promise.reject("error");
  },
  error => {
    if (error.response.data.status === 20001 && getToken()) {
      // 请自行在引入 MessageBox
      removeToken();
      MessageBox.confirm("用户未登录，请先登录", "登录", {
        confirmButtonText: "登录",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        router.push({
          path: "/login"
        });
      });
    } else if (error.response.data.status !== 20001) {
      Message({
        message: error.response.data.cause,
        type: "error",
        duration: 5 * 1000
      });
    }

    return Promise.reject(error);
  }
);

export default service;
