<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div id="board-content" class="animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
                <div class="btn">
                  <el-button type="primary" icon="el-icon-plus" @click="clickShowDialog()">创建账户</el-button>
                </div>
                <div class="board-content">
                  <div class="board-item" v-for="(item, index) in tableData" :key="index">
                    <!-- <div class="card">
                      <div class="card-body">
                        <h5 class="item-title">{{item.name}}</h5>
                      </div>
                    </div> -->
                    <div class="board-scrollbar board-scrollbar-0">
                      <div id="draggable-item-1">
                        <div class="draggable-item todo-board-card border-color-left-blue">
                          <div class="item-body">
                            <div>
                              <h5>{{item.accountName}}</h5>
                              <p class="text-ellipsis short-1 mb-0 mt-1">{{item.cardNum}}</p>
                              <p class="text-ellipsis short-1 mb-0 mt-1">余额： {{item.remainingSum}}</p>
                            </div>
                            <div>
                              <div class="rounded">
                                <a href="javaScript:void(0);" data-toggle="tooltip" data-placement="top" title="Assign To">
                                  <span class="svg-container" @click="clickShowDialog(item.idConfigType)">
                                    <svg-icon icon-class="edit" />
                                  </span>
                                </a>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="开户名称" :label-width="formLabelWidth" prop="accountName">
          <el-input v-model="form.accountName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户账号" :label-width="formLabelWidth" prop="cardNum">
          <el-input v-model="form.cardNum" autocomplete="off" ref="cardInput"></el-input>
        </el-form-item>
        <el-form-item label="余额" :label-width="formLabelWidth" prop="remainingSum">
          <el-input v-model="form.remainingSum" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="state == 'add' ? addConfig('form') : updateConfig('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '@/api/config';
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  data() {
    return {
      title: null,
      formLabelWidth: '120',
      dialogFormVisible: false,
      active: -1,
      form: {
        accountName: null,
        cardNum: null,
        remainingSum: null,
      },
      rules: {
        accountName: [
          { required: true, message: '请输入开户名称', trigger: 'blur' },
        ],
        cardNum: [
          { required: true, message: '请输入开户账户', trigger: 'blur' },
        ],
        remainingSum: [
          { required: true, message: '请输入账户余额', trigger: 'blur' },
        ]
      },
      state: null,
      tableData: []
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 创建账户
    addConfig(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            name: this.form.accountName,
            config: JSON.stringify(this.form)
          }
          API.addConfig(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success('创建成功')
              this.dialogFormVisible = false
              this.resetForm('form')
              this.getTableData()
            } else {
              this.$message.error()
            }
          })
        }
      })
    },
    // 修改账户信息
    updateConfig(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            idConfig: this.active,
            config: JSON.stringify(this.form)
          }
          API.updateConfig(param).then(res => {
            if (res.data.status === 200) {
                this.$message.success('编辑成功')
                this.dialogFormVisible = false
                this.resetForm('form')
                this.getTableData()
            } else {
                this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    clickShowDialog(type) {
      if (type == null) {
        this.title = '创建账户'
        this.state = 'add'
      } else {
        this.title = '设置'
        this.state = 'edit'
      }
      this.active = type
      this.dialogFormVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getTableData() {
      this.tableData = []
      API.selectAll().then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          tmpData.forEach(ele => {
            const value = JSON.parse(ele.config)
            let param = {
              idConfigType: ele.idConfigType,
              name: ele.name,
              accountName: value.accountName,
              cardNum: value.cardNum,
              remainingSum: value.remainingSum
            }
            this.tableData.push(param)
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  font-size: 22px;
}
.btn {
  padding: 0;
  margin-bottom: 10px;
}
</style>
