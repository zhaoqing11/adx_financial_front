<template>
  <div class="iq-top-navbar">
    <div class="iq-navbar-custom">
      <nav class="navbar navbar-expand-lg navbar-light p-0">
        <div class="side-menu-bt-sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary wrapper-menu" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div class="d-flex align-items-center">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto navbar-list align-items-center">
              <li class="nav-item nav-icon dropdown">
                <a href="#" class="nav-item nav-icon dropdown-toggle pr-0 search-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                  <img src="@/assets/images/home/user.png" class="img-fluid avatar-rounded" alt="user" @click="clickShowCard()">
                  <span class="mb-0 ml-2 user-name">{{userName}}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" v-if="showUser">
                  <li class="dropdown-item d-flex svg-icon">
                    <svg class="svg-icon mr-0 text-secondary" id="h-01-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <a href="javaScript:void(0);">个人中心</a>
                  </li>
                  <li class="dropdown-item  d-flex svg-icon border-top" @click="logout()">
                    <svg class="svg-icon mr-0 text-secondary" id="h-05-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <a href="javaScript:void(0);">退 出</a>
                  </li>
                </ul>
              </li>
            </ul>                     
          </div> 
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { getRealName, getUserId, getToken  } from "@/utils/auth";

export default {
  data() {
    return {
      showUser: false,
      userName: getRealName(),
      userInfo: {
        idUser: getUserId(),
        token: getToken()
      }
    };
  },
  methods: {
    clickShowCard() {
      if (this.showUser) {
        this.showUser = false
      } else {
        this.showUser = true
      }
    },
    // 退出登录
    logout() {
      this.$confirm("确定退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("logout", this.userInfo).then(res => {
          if (res.data.status === 200) {
            this.$router.push("/login");
          }
        });
      });
    }
  }
};
</script>


<style lang="scss" scoped>
img {
  background-color: #f6f6f6;
  padding: 5px;
}
</style>
