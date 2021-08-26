<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">用户列表</h4>
                </div>  
                <div class="create-workform">
                  <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="modal-product-search d-flex">
                      <form class="mr-3 position-relative">
                        <div class="form-group mb-0">
                          <input type="text" class="form-control" id="exampleInputText" v-model="searhForm.realName" placeholder="搜索用户名称">
                          <a class="search-link" href="javaScript:void(0);" @click="getTableData">
                            <svg xmlns="http://www.w3.org/2000/svg" class="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </a>
                        </div>
                      </form>
                      <a href="javaScript:void(0);" class="btn btn-primary position-relative d-flex align-items-center justify-content-between" @click="clickEditUser('add')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                          添加用户
                      </a>
                    </div>
                  </div>
                </div>                    
              </div>
              <el-dialog title="创建用户" :visible.sync="dialogFormVisible">
                <el-form :model="userForm" ref="userForm" :rules="rules">
                  <el-form-item label="姓名" :label-width="formLabelWidth" prop="realName">
                    <el-input v-model="userForm.realName" autocomplete="off" :disabled="isDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="角色" :label-width="formLabelWidth" prop="idRole">
                    <el-select v-model="userForm.idRole" placeholder="请选择" style="width:100%;">
                      <el-option
                        v-for="item in roleData"
                        :key="item.idRole"
                        :label="item.name"
                        :value="item.idRole">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部门" :label-width="formLabelWidth" prop="idDepartment">
                    <el-select v-model="userForm.idDepartment" placeholder="请选择" style="width:100%;">
                      <el-option
                        v-for="item in departmentData"
                        :key="item.idDepartment"
                        :label="item.departmentName"
                        :value="item.idDepartment">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="账号" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="userForm.userName" autocomplete="off" :disabled="isDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" :label-width="formLabelWidth" prop="password" v-if="!userForm.idUser">
                    <el-input v-model="userForm.password" autocomplete="off" :disabled="isDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="userForm.phone" autocomplete="off" :disabled="isDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="userForm.email" autocomplete="off" :disabled="isDisabled" ref="cardInput"></el-input>
                  </el-form-item>
                  <el-form-item label="状态" :label-width="formLabelWidth" prop="enable">
                    <el-select v-model="userForm.enable" placeholder="请选择" style="width:100%;">
                      <el-option label="禁用" :value="0"></el-option>
                      <el-option label="可用" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="userForm.idUser ? updateUserForm('userForm') : addUserForm('userForm')">确 定</el-button>
                </div>
              </el-dialog>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-block card-stretch">
                    <div class="card-body p-0">
                      <div class="d-flex justify-content-between align-items-center p-3">
                        <h5 class="font-weight-bold">用户列表</h5>
                      </div>
                      <div class="table-responsive">
                        <table class="table data-table mb-0">
                          <thead class="table-color-heading">
                            <tr class="text-light">
                              <th scope="col" class="w-01 pr-0">
                                <div class="d-flex justify-content-start align-items-end mb-1">
                                  <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input m-0" id="customCheck">
                                    <label class="custom-control-label" for="customCheck"></label>
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <label class="text-muted m-0" >ID</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >姓名</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0">部门</label>
                              </th>
                              <th scope="col" class="dates">
                                <label class="text-muted mb-0" >角色</label>
                              </th>
                              <th scope="col" class="text-right">
                                <label class="text-muted mb-0">手机号</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >邮箱</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >状态</label>
                              </th>
                              <th scope="col" class="text-right">
                                <span class="text-muted" >操作</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="white-space-no-wrap" v-for="(item,index) in tableData" :key="index">
                              <td class="pr-0">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                  <input type="checkbox" class="custom-control-input m-0" id="customCheck1">
                                  <label class="custom-control-label" for="customCheck1"></label>
                                </div>
                              </td>
                              <td>{{index + 1}}</td>
                              <td>{{item.realName ? item.realName : '--'}}</td>
                              <td>{{item.departmentName}}</td>
                              <td>{{item.roleName}}</td>
                              <td class="text-right">{{item.phone ? item.phone : '--'}}</td>
                              <td>{{item.email ? item.email : '--'}}</td>
                              <td>
                                <span v-if="item.enable"><i class="el-icon-success"></i></span>
                                <span v-else><i class="el-icon-error"></i></span>
                              </td>
                              <td>
                                <div class="d-flex justify-content-end align-items-center">
                                  <i class="el-icon-edit" @click="clickEditUser('edit', item.idUser)"></i>&nbsp;&nbsp;
                                  <i class="el-icon-delete" @click="deleteUser(item.idUser)"></i>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="pagination">
                        <Pagination 
                        v-show="totalPage > 0" 
                        :total="totalPage" 
                        :page.sync="pageNum" 
                        :limit.sync="pageSize" 
                        @pagination="getTableData" 
                        :page-sizes="[10, 15, 20,30]"
                        layout="total, sizes, prev, pager, next"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="iq-footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <ul class="list-inline mb-0">
            </ul>
          </div>
          <div class="col-lg-6 text-right">
            <span class="mr-1">财务管理平台系统 版权所有 | <a href="https://beian.miit.gov.cn/">粤ICP备12030444号</a></span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import * as API from '@/api/user';
import * as ROLE from '@/api/role';
import * as DEPARTMENT from '@/api/department';
import { getUserId } from '@/utils/auth';
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  data() {
    return {
      idUser: getUserId(),
      showUser: false,
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      tableData: [],
      dialogFormVisible: false,
      userForm: {
        idUser: null,
        realName: null,
        idRole: null,
        idDepartment: null,
        userName: null,
        password: null,
        phone: null,
        email: null,
        enable: 1
      },
      formLabelWidth: '120',
      rules: {
        realName: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
        ],
        idRole: [
          { required: true, message: '请选择用户角色', trigger: 'change' },
        ],
        idDepartment: [
          { required: true, message: '请选择所属部门', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      },
      cardTypeData: [],
      isDisabled: false,

      searhForm: {
        realName: '',
        idRole: null,
        idDepartment: null
      },
      roleData: [],
      departmentData: []
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 点击编辑
    clickEditUser(type, idUser) {
      this.getRoleList()
      this.getDepartmentList()
      if (type == 'edit') {
        API.selectUserById({
          idUser: idUser
        }).then(res => {
          if (res.data.status === 200) {
            this.userForm = res.data.datas
            this.userForm.enable = this.userForm.enable ? 1 : 0
          }
        })
      }
      this.dialogFormVisible = true
    },
    changeSelectOption() {
      DAILY.selectIsExitUnApprovalDaily({
        idCardType: this.paymentForm.idCardType
      }).then(res => {
        if (res.data.status === 200) {
          if (res.data.datas >= 1) {
            this.isDisabled = true
          } else {
            this.isDisabled = false
          }
        }
      })
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        API.deleteUser({
          idUser: id
        }).then(res => {
          if (res.data.status === 200) {
            this.$message.success('删除成功');
            this.getTableData();
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    // 编辑用户
    updateUserForm(formName) {
      let flag = this.checkValidate()
      if (!flag) {
        return false
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            idUser: this.userForm.idUser,
            realName: this.userForm.realName,
            idRole: this.userForm.idRole,
            idDepartment: this.userForm.idDepartment,
            userName: this.userForm.userName,
            password: this.userForm.password,
            phone: this.userForm.phone,
            email: this.userForm.email,
            enable: this.userForm.enable
          }
          API.updateUser(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success('编辑成功')
              this.resetForm('userForm')
              this.dialogFormVisible = false
              this.getTableData()
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    // 创建用户
    addUserForm(formName) {
      let flag = this.checkValidate()
      if (!flag) {
        return false
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            realName: this.userForm.realName,
            idRole: this.userForm.idRole,
            idDepartment: this.userForm.idDepartment,
            userName: this.userForm.userName,
            password: this.userForm.password,
            phone: this.userForm.phone,
            email: this.userForm.email,
            enable: this.userForm.enable
          }
          API.addUser(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success('创建成功')
              this.resetForm('userForm')
              this.dialogFormVisible = false
              this.getTableData()
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    isEmpty(value) {
      if (value == null || value == '') {
        return true
      }
    },
    checkValidate() {
      if (!this.isEmpty(this.userForm.email)) {
        let re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (!re.test(this.userForm.email)) {
          this.$message.error("请输入正确邮箱")
          return false
        }
      }
      if (!this.isEmpty(this.userForm.phone)) {
        let re = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        if (!re.test(this.userForm.phone)) {
          this.$message.error("请输入正确的手机号")
          return false
        }
      }
      return true
    },
    // 获取个人请款记录列表
    getTableData() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        realName: this.searhForm.realName,
        idRole: this.searhForm.idRole,
        idDepartment: this.searhForm.idDepartment
      } 
      API.selectByPage(params)
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas;
          this.tableData = tmpData.list;
          this.totalPage = tmpData.totalRecord;
        }
      })
    },
    // 获取角色列表
    getRoleList() {
      ROLE.getRoleList().then(res => {
        if (res.data.status === 200) {
          this.roleData = res.data.datas
        }
      })
    },
    // 获取部门列表
    getDepartmentList() {
      DEPARTMENT.getDepartmentList().then(res => {
        if (res.data.status === 200) {
          this.departmentData = res.data.datas
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" >
.el-icon-delete:before,
.el-icon-edit:before {
  color: #8f9fbc !important;
  font-weight: 500;
}
.pagination {
  float: right;
  margin: 20px;
}
.el-icon-success:before {
  color: #67C23A;
  font-size: 20px;
}
.el-icon-error:before {
  color: red;
  font-size: 20px;
}
</style>
