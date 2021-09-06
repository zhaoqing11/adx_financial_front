<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">申请列表</h4>
                </div>  
                <div class="create-workform">
                  <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="modal-product-search d-flex">
                      <el-select v-model="idCardType" clearable id="selectCardType" placeholder="请选择账目类型" style="width:100%;">
                        <el-option
                          v-for="item in cardTypeData"
                          :key="item.idCardType"
                          :label="item.name"
                          :value="item.idCardType">
                        </el-option>
                      </el-select>
                      &nbsp;&nbsp;
                      <form class="mr-3 position-relative">
                        <div class="form-group mb-0">
                          <input type="text" class="form-control" id="exampleInputText" v-model="code" placeholder="搜索申请单编号">
                        </div>
                      </form>
                      <el-button type="primary" icon="el-icon-search" @click="getTableData"></el-button>
                    </div>
                  </div>
                </div>                    
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-block card-stretch">
                    <div class="card-body p-0">
                      <div class="d-flex justify-content-between align-items-center p-3">
                        <h5 class="font-weight-bold">申请列表</h5>
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
                                <label class="text-muted mb-0" >事由</label>
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
                                <label class="text-muted mb-0" >账目类型</label>
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
                              <!-- {{item.state ? item.code : '--'}} -->
                              <td>{{item.code ? item.code : '--'}}</td>
                              <td>{{item.reasonApplication}}</td>
                              <td>{{item.amount}}</td>
                              <td class="text-right">{{item.paymentName}}</td>
                              <td>{{formatCardNum(item.paymentAccount)}}</td>
                              <td>{{item.userName}}</td>
                              <td>{{item.idCardType === 1 ? '公账' : '私账'}}</td>
                              <td>
                                <span id="orange-cell" v-if="item.state == 2">待审批</span>
                                <span id="green-cell" v-else-if="item.state == 3">通过</span>
                                <span id="red-cell" v-else-if="item.state == 4">不通过</span>
                              </td>
                              <td>
                                <!-- item.approvalAmount -->
                                <span v-if="item.state != 2">{{item.approvalAmount ? item.approvalAmount : '--'}}</span>
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
                                    <i class="el-icon-edit" v-else @click="clickPaymentRemittance(item)"></i>
                                  </span>
                                </span>
                              </td>
                              <td>{{item.serviceCharge ? item.serviceCharge : '--'}}</td>
                              <td>{{item.remittanceUser ? item.remittanceUser : '--'}}</td>
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
    <el-dialog title="审批" :visible.sync="dialogFormVisible">
      <el-form :model="paymentForm" ref="paymentForm" :rules="rules" disabled>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="idCardType">
          <el-select v-model="paymentForm.idCardType" placeholder="请选择" style="width:100%;" disabled>
            <el-option
              v-for="item in cardTypeData"
              :key="item.idCardType"
              :label="item.name"
              :value="item.idCardType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请事由" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="paymentForm.reasonApplication" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请金额" :label-width="formLabelWidth">
          <el-input v-model="paymentForm.amount" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款名称" :label-width="formLabelWidth">
          <el-input v-model="paymentForm.paymentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款账号" :label-width="formLabelWidth">
          <el-input v-model="paymentForm.paymentAccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="附件" :label-width="formLabelWidth">
          <el-tag 
          v-for="(item,index) in fileList"
          :key="index" 
          @click="clickTag(fileList, index)">
            {{item.fileName}}
          </el-tag>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">审批操作</el-divider>
      <el-form :model="approvalForm" ref="approvalForm" :rules="approvalRules">
        <el-form-item label="审核结果：" :label-width="formLabelWidth" prop="idCheckResult">
          <el-radio-group v-model="approvalForm.idCheckResult" style="width:100%;">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="checkCommon">
          <el-input type="textarea" v-model="approvalForm.checkCommon" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="paymentFormApproval" ref="paymentFormApproval" :rules="pfApprovalRules" v-if="approvalForm.idCheckResult == 1">
        <el-form-item label="审批金额" :label-width="formLabelWidth" prop="amount">
          <el-input type="number" v-model="paymentFormApproval.amount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="approvalPaymentForm('approvalForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="汇款" :visible.sync="remittanceDialogFormVisible">
      <el-form :model="paymentForm" ref="paymentForm" :rules="rules" disabled>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="idCardType">
          <el-select v-model="paymentForm.idCardType" placeholder="请选择" style="width:100%;" disabled>
            <el-option
              v-for="item in cardTypeData"
              :key="item.idCardType"
              :label="item.name"
              :value="item.idCardType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请事由" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="paymentForm.reasonApplication" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请金额" :label-width="formLabelWidth">
          <el-input v-model="paymentForm.amount" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款名称" :label-width="formLabelWidth">
          <el-input v-model="paymentForm.paymentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款账号" :label-width="formLabelWidth">
          <el-input v-model="paymentForm.paymentAccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="附件" :label-width="formLabelWidth">
          <el-tag 
          v-for="(item,index) in fileList"
          :key="index" 
          @click="clickTag(fileList, index)">
            {{item.fileName}}
          </el-tag>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">汇款操作</el-divider>
      <el-form :model="paymentRemittanceForm" ref="paymentRemittanceForm" :rules="remittanceRules">
        <el-form-item label="汇款金额" :label-width="formLabelWidth" prop="amount">
          <el-input v-model="paymentRemittanceForm.amount" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手续费" :label-width="formLabelWidth" prop="serviceCharge">
          <el-input type="number" min="0" v-model="paymentRemittanceForm.serviceCharge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="汇款日期" :label-width="formLabelWidth" prop="remittanceDate">
          <el-date-picker
            v-model="paymentRemittanceForm.remittanceDate"
            type="datetime"
            placeholder="选择日期"
            style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
          <el-input type="textarea" v-model="paymentRemittanceForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="remittanceDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPaymentRemittance('paymentRemittanceForm')">确 定</el-button>
      </div>
    </el-dialog>
    <PreviewImage ref="previewImage" />
  </div>
</template>

<script>
import * as APPROVAL from '@/api/approval';
import * as CTYPE from '@/api/cardType';
import * as API from '@/api/paymentForm';
import * as APPROVALPAY from '@/api/approvalPayment';
import * as REMITTANCE from '@/api/paymentRemittance';
import { getUserId, getRole } from '@/utils/auth';
import { formatDate, formatCardNum } from '@/utils/validate';
import Pagination from '@/components/Pagination';
import PreviewImage from "@/components/PreviewImage"

export default {
  components: { PreviewImage, Pagination },
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
      idCardType: null,
      tableData: [],
      paymentForm: {
        idCardType: null,
        reasonApplication: null,
        amount: null,
        paymentName: null,
        paymentAccount: null,
        files: null
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
      pfApprovalRules: {
        amount: [
          { required: true, message: '请填写审批金额', trigger: 'blur' }
        ]
      },
      approvalForm: {
        idCheckResult: null,
        checkCommon: '',
      },
      approvalRules: {
        idCheckResult: [
          { required: true, message: '请选择审批结果', trigger: 'change' }
        ]
      },
      paymentRemittanceForm: {
        idPaymentForm: null,
        amount: null,
        serviceCharge: 0,
        remittanceDate: '',
        remark: ''
      },
      remittanceRules: {
        amount: [
          { required: true, message: '请填写汇款金额', trigger: 'blur' }
        ],
        serviceCharge: [
          { required: true, message: '请填写手续费', trigger: 'blur' }
        ],
        remittanceDate: [
          { required: true, message: '请选择汇款日期', trigger: 'change' }
        ]
      },
      idPaymentFormState: 1,
      formatCardNum: formatCardNum,
      cardTypeData: [],
      fileList: [],
      
      processTable: [],
      processName: null
    }
  },
  mounted() {
    this.getCardTypeList()
    this.getTableData()
  },
  methods: {
    // 预览图片
    clickTag(file, index) {
      this.$refs.previewImage.show(file, index)
    },
    // 获取账目类型
    getCardTypeList() {
      CTYPE.getCardType().then(res => {
        if (res.data.status === 200) {
          this.cardTypeData = res.data.datas
        }
      })
    },
    clickPaymentRemittance(data) {
      this.paymentForm = data;
      this.fileList = data.files != null ? JSON.parse(data.files) : [];

      this.paymentRemittanceForm.idPaymentForm = data.idPaymentForm
      this.remittanceDialogFormVisible = true
    },
    // 创建汇款记录
    addPaymentRemittance(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let remittanceDate = formatDate(this.paymentRemittanceForm.remittanceDate)
          const param = {
            idPaymentForm: this.paymentRemittanceForm.idPaymentForm,
            amount: this.paymentRemittanceForm.amount,
            serviceCharge: this.paymentRemittanceForm.serviceCharge,
            remittanceDate: remittanceDate,
            remark: this.paymentRemittanceForm.remark,
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
          if (this.approvalForm.idCheckResult === 1) { // 通过
            if (this.paymentFormApproval.amount == null) {
              this.$message.warning('请填写申请金额')
              return false
            }
          }
          const processTable = this.processTable[this.processTable.length - 1]
          const param = {
            idApprovalProcessNode: processTable.idApprovalProcessNode,
            idApproval: processTable.idApproval,
            idApprovalCaseNodeUser: processTable.idApprovalCaseNodeUser,
            idCheckResult: this.approvalForm.idCheckResult,
            checkCommon: this.approvalForm.checkCommon,
            idPaymentForm: this.paymentFormApproval.idPaymentForm,
            amount: this.paymentFormApproval.amount,
            idUser: this.idUser
          }
          APPROVAL.approvalVerify(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success(res.data.datas)
              this.dialogFormVisible = false
              this.resetForm(formName)
              this.paymentFormApproval.amount = null
              this.paymentFormApproval.idPaymentForm = null
              this.getTableData()
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    editPaymentForm(data) {
      this.paymentForm = data
      this.fileList = data.files != null ? JSON.parse(data.files) : []
      this.paymentFormApproval.idPaymentForm = data.idPaymentForm;
      this.approvalForm.idApproval = data.idApproval
      this.dialogFormVisible = true
      this.selectApprovalInfo(data.idApproval)
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取审批流信息
    selectApprovalInfo(id) {
      APPROVAL.selectApprovalInfo({
        idApproval: id
      }).then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          this.processTable = tmpData.list
          this.processName = tmpData.name
        }
      })
    },
    // 获取个人请款记录列表
    getTableData() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        idCardType: this.idCardType,
        code: this.code
      }
      API.queryAllPaymentForm(params)
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas;
          this.tableData = tmpData.list;
          this.totalPage = tmpData.totalRecord;
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
#orange-cell {
  color: orange;
  font-weight: bold;
}
#green-cell {
  color:green;
  font-weight: bold;
}
#red-cell {
  color: red;
  font-weight: bold;
}
.pagination {
  float: right;
  margin: 20px 10px;
}
#selectCardType {
  border: 1px solid #f1f1f1;
}
#selectCardType::-webkit-input-placeholder{
  color: #6c757d;
}
</style>
