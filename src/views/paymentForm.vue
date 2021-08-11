<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">请款列表</h4>
                </div>  
                <div class="create-workform">
                  <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="modal-product-search d-flex">
                      <form class="mr-3 position-relative">
                        <div class="form-group mb-0">
                          <input type="text" class="form-control" id="exampleInputText" v-model="code" placeholder="搜索申请单编号">
                          <a class="search-link" href="javaScript:void(0);" @click="getTableData">
                            <svg xmlns="http://www.w3.org/2000/svg" class="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </a>
                        </div>
                      </form>
                      <!-- <a href="javaScript:void(0);" class="btn btn-primary position-relative d-flex align-items-center justify-content-between" @click="dialogFormVisible = true">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                          添加申请
                      </a> -->
                    </div>
                  </div>
                </div>                    
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-block card-stretch">
                    <div class="card-body p-0">
                      <div class="d-flex justify-content-between align-items-center p-3">
                        <h5 class="font-weight-bold">请款列表</h5>
                        <!-- <button class="btn btn-secondary btn-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                            导 出
                        </button> -->
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
                                <label class="text-muted mb-0" >申请单编号</label>
                              </th>
                              <th scope="col" class="dates">
                                <label class="text-muted mb-0" >申请事由</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0">申请金额（元）</label>
                              </th>
                              <th scope="col" class="text-right">
                                <label class="text-muted mb-0">付款名称</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >付款账号</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >申请人</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >审批状态</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >审批金额</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >审批操作人</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >汇款金额</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >手续费</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >汇款操作人</label>
                              </th>
                              <!-- <th scope="col" class="text-right">
                                <span class="text-muted" >操作</span>
                              </th> -->
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
                              <td>{{item.code}}</td>
                              <td>{{item.reasonApplication}}</td>
                              <td>{{item.amount}}</td>
                              <td class="text-right">{{item.paymentName}}</td>
                              <td>{{item.paymentAccount}}</td>
                              <td>{{item.userName}}</td>
                              <td :class="item.idPaymentFormState == 1 ? 'orange-cell' : 'green-cell'">{{item.idPaymentFormState == 1 ? '待审批' : '已审批'}}</td>
                              <td>
                                <span v-if="item.approvalAmount">{{item.approvalAmount}}</span>
                                <span v-else>
                                  <span v-if="idRole != '2'">--</span>
                                  <i class="el-icon-edit" v-else @click="editPaymentForm(item)"></i>
                                </span>
                              </td>
                              <td>{{item.approvalUser ? item.approvalUser : '--'}}</td>
                              <td>
                                <span v-if="item.remittanceAmount">{{item.remittanceAmount}}</span>
                                <span v-else>
                                  <span v-if="idRole != '3'">--</span>
                                  <span v-else>
                                    <span v-if="item.idPaymentFormState === 1">--</span>
                                    <i class="el-icon-edit" v-else @click="clickPaymentRemittance(item.idPaymentForm)"></i>
                                  </span>
                                </span>
                              </td>
                              <td>{{item.serviceCharge ? item.serviceCharge : '--'}}</td>
                              <td>{{item.remittanceUser ? item.remittanceUser : '--'}}</td>
                            </tr>
                          </tbody>
                        </table>
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
    <el-dialog title="审批" :visible.sync="dialogFormVisible">
      <el-form :model="paymentForm" ref="paymentForm" :rules="rules" disabled>
        <el-form-item label="申请事由" :label-width="formLabelWidth" prop="reasonApplication">
          <el-input type="textarea" v-model="paymentForm.reasonApplication" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请金额" :label-width="formLabelWidth" prop="amount">
          <!-- oninput="value=value.replace(/[^0-9.]/g,'')" -->
          <el-input v-model="paymentForm.amount" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款名称" :label-width="formLabelWidth" prop="paymentName">
          <el-input v-model="paymentForm.paymentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款账号" :label-width="formLabelWidth" prop="paymentAccount">
          <el-input v-model="paymentForm.paymentAccount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">审批操作</el-divider>
      <el-form :model="paymentFormApproval" ref="paymentFormApproval" :rules="approvalRules">
        <el-form-item label="审批金额" :label-width="formLabelWidth" prop="amount">
          <el-input type="number" v-model="paymentFormApproval.amount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="approvalPaymentForm('paymentFormApproval')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="汇款" :visible.sync="remittanceDialogFormVisible">
      <el-form :model="paymentRemittanceForm" ref="paymentRemittanceForm" :rules="remittanceRules">
        <el-form-item label="汇款金额" :label-width="formLabelWidth" prop="amount">
          <el-input v-model="paymentRemittanceForm.amount" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手续费" :label-width="formLabelWidth" prop="serviceCharge">
          <el-input type="number" min="0" v-model="paymentRemittanceForm.serviceCharge" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="remittanceDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPaymentRemittance('paymentRemittanceForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '@/api/paymentForm';
import * as APPROVAL from '@/api/approvalPayment';
import * as REMITTANCE from '@/api/paymentRemittance';
import { getUserId, getRole } from '@/utils/auth';

export default {
  data() {
    return {
      dialogFormVisible: false,
      remittanceDialogFormVisible: false,
      idUser: getUserId(),
      idRole: getRole(),
      showUser: false,
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 0,
      code: '',
      tableData: [],

      paymentForm: {
        reasonApplication: null,
        amount: null,
        paymentName: null,
        paymentAccount: null
      },
      formLabelWidth: '80',
      rules: {
        reasonApplication: [
            { required: true, message: '请填写申请事由', trigger: 'blur' },
        ],
        amount: [
            { required: true, message: '请填写申请金额', trigger: 'blur' }
        ],
        paymentName: [
            { required: true, message: '请填写付款名称', trigger: 'blur' }
        ],
        paymentAccount: [
            { required: true, message: '请填写付款账号', trigger: 'blur' }
        ]
      },
      paymentFormApproval: {
        idPaymentForm: null,
        amount: null
      },
      approvalRules: {
        amount: [
            { required: true, message: '请填写审批金额', trigger: 'blur' }
        ]
      },
      paymentRemittanceForm: {
        idPaymentForm: null,
        amount: null,
        serviceCharge: 0
      },
      remittanceRules: {
        amount: [
            { required: true, message: '请填写审批金额', trigger: 'blur' }
        ],
        serviceCharge: [
            { required: true, message: '请填写手续费', trigger: 'blur' }
        ]
      },
      idPaymentFormState: 1
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    clickPaymentRemittance(id) {
      this.paymentRemittanceForm.idPaymentForm = id
      this.remittanceDialogFormVisible = true
    },
    // 创建汇款记录
    addPaymentRemittance(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            idPaymentForm: this.paymentRemittanceForm.idPaymentForm,
            amount: this.paymentRemittanceForm.amount,
            serviceCharge: this.paymentRemittanceForm.serviceCharge,
            idUser: this.idUser
          }
          REMITTANCE.addPaymentRemittance(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success('操作成功')
              this.remittanceDialogFormVisible = false
              this.resetForm(formName)
              this.getTableData()
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    // 审批请款单
    approvalPaymentForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            idPaymentForm: this.paymentFormApproval.idPaymentForm,
            amount: this.paymentFormApproval.amount,
            idUser: this.idUser
          }
          APPROVAL.approvalPaymentForm(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success('操作成功')
              this.dialogFormVisible = false
              this.resetForm(formName)
              this.getTableData()
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    editPaymentForm(data) {
      this.paymentForm = data;
      this.paymentFormApproval.idPaymentForm = data.idPaymentForm;
      this.dialogFormVisible = true;
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取个人请款记录列表
    getTableData() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        code: this.code
      } 
      API.queryAllPaymentForm(params)
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas;
          this.tableData = tmpData.list;
          this.totalPage = tmpData.totalPage;
          this.totalRecord = tmpData.totalRecord;
        }
      })
    }
  }
}
</script>

<style lang="scss" >
.el-icon-delete:before {
  color: #8f9fbc !important;
  font-weight: 500;
}
.orange-cell {
  color: orange;
  font-weight: bold;
}
.green-cell {
  color:green;
  font-weight: bold;
}
</style>
