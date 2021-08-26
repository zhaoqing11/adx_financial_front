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
                <a href="javaScript:void(0);" class="nav-item nav-icon dropdown-toggle pr-0 search-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                  <img src="@/assets/images/home/user.png" class="img-fluid avatar-rounded" alt="user" @click="clickShowCard()">
                  <span class="mb-0 ml-2 user-name">{{userName}}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" v-if="showUser">
                  <li class="dropdown-item d-flex svg-icon" @click="dialogFormVisible = true">
                    <svg class="svg-icon mr-0 text-secondary" id="h-01-p" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <a href="javaScript:void(0);">修改密码</a>
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
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">
          <el-input v-model="form.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
          <el-input v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="rePassword">
          <el-input v-model="form.rePassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserPassword('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '@/api/user';
import { getRealName, getUserId, getToken  } from "@/utils/auth";

export default {
  data() {
     var validatePass = (rule, value, callback) => {
        if (value != this.form.newPassword) {
          callback(new Error('与新密码输入不一致！'));
        } else {
          callback();
        }
      };
    return {
      showUser: false,
      formLabelWidth: '120',
      dialogFormVisible: false,
      userName: getRealName(),
      userInfo: {
        idUser: getUserId(),
        token: getToken()
      },
      form: {
        idUser: null,
        oldPassword: null,
        newPassword: null,
        rePassword: null
      },
      rules: {
        oldPassword: [
          { required: true, message: '请填写原密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请填写新密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请填写确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    updateUserPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            idUser: getUserId(),
            oldPassword: this.form.oldPassword,
            newPassword: this.form.newPassword,
            rePassword: this.form.rePassword
          }
          API.updatePassword(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success('修改成功')
              this.dialogFormVisible = false
              this.resetForm('form')
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
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
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
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

<style lang="scss" >
.v-modal {
  position: relative;
}
</style>
