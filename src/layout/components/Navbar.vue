<template>
  <div class="navbar space-between">
    <div class="br-header">
      <div class="br-header-left">
        <div class="navicon-left hidden-md-down"><a id="btnLeftMenu" href=""><i class="icon ion-navicon-round"></i></a></div>
        <div class="navicon-left hidden-lg-up"><a id="btnLeftMenuMobile" href=""><i class="icon ion-navicon-round"></i></a></div>
      </div>
      <div class="br-header-right">
        <nav class="nav">
          <div class="dropdown">
            <a href="javascript:void(0);" class="nav-link nav-link-profile" data-toggle="dropdown" @click="logout()" >
              <span class="logged-name hidden-md-down">{{userName}}</span>
              <!-- <img src="@/assets/images/user.png" class="wd-32 rounded-circle" alt=""> -->
              <span class="square-10 bg-success"></span>
            </a>
            <!-- <div class="dropdown-menu dropdown-menu-header wd-250" >
              <ul class="list-unstyled user-profile-nav">
                <li><a href=""><i class="icon ion-power"></i>退出</a></li>
              </ul>
            </div> -->
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { getName, getClientIpInfo } from "@/utils/auth";
import * as API from "@/api/user";

export default {
  data() {
    return {
      userName: getName()
    };
  },
  methods: {
    // 退出登录
    logout() {
      this.$confirm("确定退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("logout").then(res => {
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
