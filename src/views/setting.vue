<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
      <div class="container-fluid">
         <div class="row">
            <div class="col-md-12">
               <div id="board-content" class="animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
                  <div class="board-content">
                     <div class="board-item">
                        <div class="card">
                           <div class="card-body">
                              <h5 class="item-title">公账</h5>
                           </div>
                        </div>
                        <div class="board-scrollbar board-scrollbar-0">
                           <div id="draggable-item-1">
                               <div class="draggable-item todo-board-card border-color-left-blue">
                                   <div class="item-body">
                                       <div>
                                           <h5>{{publicAccount}}</h5>
                                           <p class="text-ellipsis short-1 mb-0 mt-1">{{publicCardNum}}</p>
                                           <p class="text-ellipsis short-1 mb-0 mt-1">余额： {{publicAmount}}</p>
                                       </div>
                                       <div>
                                         <div class="rounded">
                                            <a href="javaScript:void(0);" data-toggle="tooltip" data-placement="top" title="Assign To">
                                                <span class="svg-container" @click="clickShowDialog(1)">
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
                     <div class="board-item">
                        <div class="card">
                           <div class="card-body">
                              <h5 class="item-title">私账</h5>
                           </div>
                        </div>
                        <div class="board-scrollbar board-scrollbar-1">
                           <div id="draggable-item-7">
                               <div class="draggable-item todo-board-card ">
                                   <div class="item-body">
                                       <div>
                                           <h5>{{privateAccount}}</h5>
                                           <p class="text-ellipsis short-1 mb-0 mt-1">{{privateCardNum}}</p>
                                           <p class="text-ellipsis short-1 mb-0 mt-1">余额： {{privateAmount}}</p>
                                       </div>
                                       <div>
                                         <div class="rounded">
                                            <a href="javaScript:void(0);" data-toggle="tooltip" data-placement="top" title="Assign To">
                                                <span class="svg-container" @click="clickShowDialog(2)">
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
            <span class="mr-1">Copyright © 2021.</span>
          </div>
        </div>
      </div>
    </footer>
    <el-dialog title="设置" :visible.sync="dialogFormVisible">
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
        <el-button type="primary" @click="updateConfig('form')">确 定</el-button>
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
      publicAccount: '账户',
      publicCardNum: '卡号',
      publicAmount: '0.00',

      privateAccount: '账户',
      privateCardNum: '卡号',
      privateAmount: '0.00',

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
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    updateConfig() {
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
    },
    clickShowDialog(type) {
      this.active = type
      this.dialogFormVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getTableData() {
      API.selectAll().then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          let publicData = tmpData.filter(key => {
            return key.idConfig === 1
          })
          let privateData = tmpData.filter(key => {
            return key.idConfig === 2
          })
          let publicCard = JSON.parse(publicData[0].config)
          let privateCard = JSON.parse(privateData[0].config)

          this.publicAccount = publicCard.accountName
          this.publicCardNum = publicCard.cardNum
          this.publicAmount = publicCard.remainingSum

          this.privateAccount = privateCard.accountName
          this.privateCardNum = privateCard.cardNum
          this.privateAmount = privateCard.remainingSum
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
</style>
