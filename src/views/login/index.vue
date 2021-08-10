<template>
  <div class="login-container">
    <div class="wrapper">
      <section class="login-content">
         <div class="container h-100">
            <div class="row align-items-center justify-content-center h-100">
               <div class="col-md-5">
                  <div class="card p-3">
                     <div class="card-body">
                        <div class="auth-logo">
                           <img src="@/assets/images/logo2.png" class="img-fluid  rounded-normal  darkmode-logo" alt="logo">
                        </div>
                        <!-- <h3 class="mb-3 font-weight-bold text-center">登 录</h3> -->
                        <!-- <p class="text-center text-secondary mb-4">财务收支管理系统</p> -->
                        <div class="social-btn d-flex justify-content-around align-items-center mb-4">
                        </div>
                        <div class="mb-5">
                            <p class="line-around text-secondary mb-0"><span class="line-around-1">登 录</span></p>
                        </div>
                        <form>
                           <div class="row">
                              <div class="col-lg-12">
                                <div class="form-group">
                                    <label class="text-secondary">用户名</label>
                                    <input class="form-control" type="text" v-model="loginForm.userName" placeholder="请输入用户名">
                                </div>
                              </div>
                              <div class="col-lg-12 mt-2">
                                <div class="form-group">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <label class="text-secondary">密码</label>
                                    </div>
                                    <input class="form-control" type="password" v-model="loginForm.password" placeholder="请输入密码">
                                </div>
                              </div>
                           </div>
                           <button class="btn btn-primary btn-block mt-2" v-loading="loading" @click="handleLogin()">登 录</button>
                           <!-- <div class="col-lg-12 mt-3">
                                <p class="mb-0 text-center">Don't have an account? <a href="auth-sign-up.html">Sign Up</a></p>
                           </div> -->
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/user"

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        userName: "",
        password: ""
      },
      passwordType: "password",
      redirect: undefined,
      isShowCode: true,
      codeCount: 60,
      showFindPwd: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    isEmptyString(val) {
      if (val === '' || val === null) {
        return true
      }
    },
    // 登录
    handleLogin() {
      if (this.isEmptyString(this.loginForm.userName)) {
        this.$message.warning("请输入账号")
        return false
      }
      if (this.isEmptyString(this.loginForm.password)) {
        this.$message.warning("请输入密码")
        return false
      }
      if (this.loginForm.password.length < 6) {
        this.$message.error("密码不能小于6位")
        return false
      }
      this.loading = true
      this.$store.dispatch("LoginByUsername", this.loginForm)
        .then(res => {
          if (res.data.status === 200) {
            this.$router.push("/home")
            this.dialogVisible = true
          } else {
            this.$message.error(res.data.cause)
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
// $bg: #2d3a4b;
// $light_gray: #fff;
// $cursor: #fff;
// $font_color: #4d4d4d;
// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $font_color;
//   }
// }
</style>

<style lang="scss" scoped>
$bg: #0a1e39;
$bgb: #061220;
$border: #074874;
$dark_gray: #889aa4;
$light_gray: #eee;
$font_color: #4d4d4d;
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
