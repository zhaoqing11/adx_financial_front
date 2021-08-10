<template>
<!-- class="login-container" -->
  <div>
    <!-- loader Start -->
    <div id="loading">
          <div id="loading-center">
          </div>
    </div>
    <!-- loader END -->

    <div class="wrapper">
      <section class="login-content">
         <div class="container h-100">
            <div class="row align-items-center justify-content-center h-100">
               <div class="col-md-5">
                  <div class="card p-3">
                     <div class="card-body">
                        <div class="auth-logo">
                           <!-- <img src="assets/images/logo.png " class="img-fluid  rounded-normal  darkmode-logo" alt="logo">
                           <img src="assets/images/logo-dark.png" class="img-fluid rounded-normal light-logo" alt="logo"> -->
                        </div>
                        <h3 class="mb-3 font-weight-bold text-center">登 录</h3>
                        <!-- <p class="text-center text-secondary mb-4">Log in to your account to continue</p> -->
                        <div class="social-btn d-flex justify-content-around align-items-center mb-4">
                        </div>
                        <!-- <div class="mb-5">
                            <p class="line-around text-secondary mb-0"><span class="line-around-1">or login with email</span></p>
                        </div> -->
                        <form>
                           <div class="row">
                              <div class="col-lg-12">
                                <div class="form-group">
                                    <label class="text-secondary">用户名</label>
                                    <!-- type="email" -->
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
                           <button type="submit" class="btn btn-primary btn-block mt-2" @click="handleLogin()">登 录</button>
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
// import "@/styles/css/backend-plugin.min.css"

export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: "",
        password: "",
        // tryCode: null,
        // jpgKey: null
      },
      loading: false,
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
    // this.getIdentifyImgCode()
  },
  methods: {
    isEmptyString(val) {
      if (val === '' || val === null) {
        return true
      }
    },
    getCode() {
      if (this.isEmptyString(this.loginForm.user)) {
        this.$message.warning("请填写账号")
        return false
      }
      if (this.isEmptyString(this.loginForm.phone)) {
        this.$message.warning("请填写手机号")
        return false
      }
      let re = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if (!re.test(this.loginForm.phone)) {
        this.$message.error("请输入正确的手机号")
        return false
      } 

      API.checkUserBindPhone({
        userName: this.loginForm.user,
        phone: this.loginForm.phone
      }).then(res => {
        if (res.data.status === 200) {
          this.getSmsCode()
        } else {
          this.$message.error(res.data.datas)
        }
      })
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = ""
      } else {
        this.passwordType = "password"
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 获取图片验证码
    getIdentifyImgCode() {
      const img = document.getElementById("imgCode")
      API.getCode().then(res => {
        if (res.data.status === 200) {
          img.src = res.data.datas.jpg_base64
          this.loginForm.jpgKey = res.data.datas.jpgKey
        } else {
          this.$message.error(res.data.cause)
        }
      })
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
      console.log('form ', this.loginForm)
      this.loading = true
      this.$store.dispatch("LoginByUsername", this.loginForm)
        .then(res => {
          if (res.data.status === 200) {
            this.$router.push("/home")
            this.dialogVisible = true
          } else {
            this.$message.error(res.data.cause)
            this.loading = false
            // this.getIdentifyImgCode()
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
$bg: #2d3a4b;
$light_gray: #fff;
$cursor: #fff;
$font_color: #4d4d4d;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $font_color;
  }
}
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
