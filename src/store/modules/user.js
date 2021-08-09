import { LoginByUsername, logout, getClientIpAddress } from "@/api/user";
import * as AUTH from "@/utils/auth";
import * as API from "@/api/role";

const user = {
  state: {
    token: AUTH.getToken(),
    name: AUTH.getName(),
    avatar: "",
    roles: [],
    clientIpInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_CLIENTIPINFO: (state, clientIpInfo) => {
      state.clientIpInfo = clientIpInfo;
    }
  },

  actions: {
    LoginByUsername({ commit }, userInfo) {
      const { userName, password, tryCode, jpgKey } = userInfo;
      return new Promise((resolve, reject) => {
        LoginByUsername({
          userName: userName.trim(),
          password: password.trim(),
          tryCode,
          jpgKey
        }).then(res => {
          if (res.data.status === 200) {
            const tmpData = res.data.datas;
            AUTH.setName(tmpData.userName);
            AUTH.setRole(tmpData.idRole);
            AUTH.setUserId(tmpData.idUser);
            AUTH.setToken(tmpData.accessToken);
            
            resolve(res);
            // const param = {
            //   idRole: tmpData.idRole
            // };
            // API.getAuthByRole(param)
            // .then(res => {
            //   if (res.data.status === 200) {
            //     const tmpData = res.data.datas;
            //     AUTH.setPerimission(tmpData);
            //   }
            //   resolve(res);
            // }).catch(err => {
            //   console.log(err)
            // });
          } else {
            resolve(res);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

    // user logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(res => {
            AUTH.removeName();
            AUTH.removeRole();
            AUTH.removeToken();
            AUTH.removeUserId();
            AUTH.removeClientIpInfo();
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
