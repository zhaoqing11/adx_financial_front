<template>
  <div>
    <div class="wrapper">
      <van-search v-model="code" placeholder="搜索申请单编号" @search="getTableData"/>
      <van-row gutter="20" class="_top">
        <van-col span="11">
          <span v-if="idRole == 2">已审核: {{approvaled}}</span>
          <span v-else-if="idRole == 3">已汇款: {{remittanceCount}}</span>
        </van-col>
        <van-col span="2"></van-col>
        <van-col span="11">
          <span v-if="idRole == 2">待审核: {{unApproval}}</span>
          <span v-else-if="idRole == 3">待汇款: {{unRemittance}}</span>
        </van-col>
      </van-row>
      <van-collapse clickable v-model="activeName" v-for="(item,index) in tableData" :key="index" @change="changeCollapse($event, item)">
        <van-collapse-item :name="index">
          <template slot="title">{{item.code}}
            <span class="svg-container" v-if="item.state == 2 && idRole == 2">
              <svg-icon icon-class="icon-approval" style="font-size: 20px;"/>
            </span>
            <span class="svg-container" v-else-if="item.remittanceAmount == null && idRole == 3">
              <svg-icon icon-class="remittance" style="font-size: 50px; margin-top: -10px;"/>
            </span>
          </template>
          <div class="cell_body">
            <van-row gutter="20">
              <van-col span="6">事由：</van-col>
              <van-col span="18">{{item.reasonApplication}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">申请金额：</van-col>
              <van-col span="18">{{item.amount}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">付款名称：</van-col>
              <van-col span="18">{{item.paymentName}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">付款账号：</van-col>
              <van-col span="18">{{item.paymentAccount}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">申请人：</van-col>
              <van-col span="18">{{item.userName}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">账目类型：</van-col>
              <van-col span="18">{{item.idCardType === 1 ? '公账' : '私账'}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">审核状态：</van-col>
              <van-col span="18">
                <span id="orange-cell" v-if="item.state == 2">待审批</span>
                <span id="green-cell" v-else-if="item.state == 3">通过</span>
                <span id="red-cell" v-else-if="item.state == 4">不通过</span>
              </van-col>
            </van-row>
            <br/>
            <van-row gutter="20">
              <van-col span="24" class="_accessory" style="padding:5px 10px; min-height: 120px;">
                <h6 style="text-indent: 0; margin: 5px 0;">附件：</h6>
                <van-uploader
                :file-list="fileList"
                :capture="capture"
                :show-upload="false"
                :deletable="false"/>
              </van-col>
            </van-row>
            <br/>
            <van-row gutter="20" v-if="item.state == 3">
              <van-col span="6">审批金额：</van-col>
              <van-col span="18">{{item.approvalAmount ? item.approvalAmount : '--'}}</van-col>
            </van-row>
            <van-row gutter="20" v-if="item.state == 3">
              <van-col span="6">审批人：</van-col>
              <van-col span="18">{{item.approvalUser ? item.approvalUser : '--'}}</van-col>
            </van-row>
            <van-row gutter="20" v-if="item.remittanceAmount">
              <van-col span="6">汇款金额：</van-col>
              <van-col span="18">{{item.remittanceAmount ? item.remittanceAmount : '--'}}</van-col>
            </van-row>
            <van-row gutter="20" v-if="item.remittanceAmount">
              <van-col span="6">手续费：</van-col>
              <van-col span="18">{{item.serviceCharge ? item.serviceCharge : '--'}}</van-col>
            </van-row>
            <van-row gutter="20" v-if="item.remittanceAmount">
              <van-col span="6">汇款人：</van-col>
              <van-col span="18">{{item.remittanceUser ? item.remittanceUser : '--' }}</van-col>
            </van-row>
          </div>
          <!-- approval payment form -->
          <div class="_approval" v-if="item.state == 2 && idRole == 2">
            <van-row gutter="20">
              <van-col span="24" style="padding: 10px;">
                <h6>审批操作</h6>
                <van-radio-group v-model="approvalForm.idCheckResult">
                  <van-radio :name="1">通过</van-radio>
                  <van-radio :name="2">不通过</van-radio>
                </van-radio-group>
                <van-cell-group>
                  <van-field
                    v-model="approvalForm.checkCommon"
                    label="备注"
                    type="textarea"
                    placeholder="请输入备注"
                    autosize
                    :border="false"
                  />
                  <van-field
                    v-if="approvalForm.idCheckResult == 1"
                    v-model="paymentFormApproval.amount"
                    type="number"
                    label="审批金额"
                    placeholder="请输入审批金额"
                    required
                    :border="false"
                  />
                </van-cell-group>
                <div class="_submit_approval">
                  <van-button type="default" size="large" @click="cancelApproval(index)">取 消</van-button>
                  <van-button type="info" size="large" @click="approvalPaymentForm(index)">审 批</van-button>
                </div>
              </van-col>
            </van-row>
          </div>
          <br/>
          <!-- remittance payment form -->
          <div class="_approval" v-if="item.state == 3 && idRole == 3 && item.remittanceAmount == null">
            <van-row gutter="20">
              <van-col span="24" style="padding: 10px;">
                <h6>汇款操作</h6>
                <van-cell-group>
                  <van-field
                    v-model="paymentRemittanceForm.remittanceDate"
                    label="汇款日期"
                    placeholder="请选择"
                    required
                    input-align="right" 
                    readonly 
                    right-icon="arrow"
                    @click="show = true"
                  />
                  <van-popup
                    v-model="show"
                    round
                    position="bottom"
                    custom-style="height: 20%">
                      <van-datetime-picker 
                      v-model="currentDate" 
                      type="date" 
                      @cancel="onCancelDate" 
                      @confirm="onConfirmDate" 
                      :min-date="minDate" 
                      :max-date="maxDate" 
                      :formatter="formatter" />
                  </van-popup>
                  <van-field
                    v-model="paymentRemittanceForm.amount"
                    type="number"
                    label="金额"
                    placeholder="请输入金额"
                    required
                    :border="false"
                  />
                  <van-field
                    v-model="paymentRemittanceForm.serviceCharge"
                    type="number"
                    label="手续费"
                    placeholder="请输入手续费"
                    :border="false"
                  />
                  <van-field
                    v-model="paymentRemittanceForm.remark"
                    label="备注"
                    type="textarea"
                    placeholder="请输入备注"
                    autosize
                    :border="false"
                  />
                </van-cell-group>
                <div class="_submit_approval">
                  <van-button type="default" size="large" @click="cancelRemittance(index)">取 消</van-button>
                  <van-button type="info" size="large" @click="addPaymentRemittance(index)">确 定</van-button>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { Toast, DatetimePicker } from 'vant';
import * as API from '@/api/paymentForm';
import * as APPROVAL from '@/api/approval';
import * as REMITTANCE from '@/api/paymentRemittance';
import { getRole, getUserId } from '@/utils/auth';
import { isEmpty } from '@/utils/validate';

export default {
  components: { DatetimePicker },
  data() {
    return {
      idRole: getRole(),
      idUser: getUserId(),
      pageNum: 1,
      pageSize: 0,
      totalPage: 1,
      totalRecord: 0,
      code: '',
      tableData: [],
      approvaled: 0,
      unApproval: 0,
      unRemittance: 0,
      remittanceCount: 0,

      activeName: [],
      approvalForm: {
        idCheckResult: null,
        checkCommon: '',
      },
      paymentFormApproval: {
        idPaymentForm: null,
        amount: null
      },
      processTable: [],
      processName: null,

      show: false,
      paymentRemittanceForm: {
        idPaymentForm: null,
        amount: null,
        serviceCharge: 0,
        remittanceDate: '',
        remark: ''
      },

      minDate: new Date(1947, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      capture: ['album'],
      fileList: []
    }
  },
  mounted() {
    this.getTableData()
    this.getPaymentFormByState()
  },
  methods: {
    // 非空验证（汇款）
    checkRemittance() {
      let param = this.paymentRemittanceForm
      if (!isEmpty(param.amount)) {
        Toast.fail('请填写汇款金额')
        return false
      }
      if (!isEmpty(param.remittanceDate)) {
        Toast.fail('请填写汇款日期')
        return false
      }
      return true
    },
    // 取消汇款
    cancelRemittance(index) {
      let id = this.activeName.indexOf(index)
      this.activeName.splice(id, 1)
      this.paymentRemittanceForm.idPaymentForm = null
      this.paymentRemittanceForm.amount = null
      this.paymentRemittanceForm.serviceCharge = 0
      this.paymentRemittanceForm.remittanceDate = ''
      this.paymentRemittanceForm.remark = ''
    },
    // 创建汇款记录
    addPaymentRemittance(index) {
      let valid = this.checkRemittance()
      if (valid) {
        const param = {
          idPaymentForm: this.paymentRemittanceForm.idPaymentForm,
          amount: this.paymentRemittanceForm.amount,
          serviceCharge: this.paymentRemittanceForm.serviceCharge,
          remittanceDate: this.paymentRemittanceForm.remittanceDate,
          remark: this.paymentRemittanceForm.remark,
          idUser: this.idUser
        }
        REMITTANCE.addPaymentRemittance(param).then(res => {
          if (res.data.status === 200) {
            Toast.success('操作成功')
            this.cancelRemittance(index)
            this.getTableData()
            this.getPaymentFormByState()
          } else {
            this.$message.error(res.data.cause)
          }
        })
      }
    },
    // 取消日期控制
    onCancelDate () {
      this.show = false
    },
    // 点击选中日期
    onConfirmDate () {
      let bgDate = `${this.value1}-${this.value2}-${this.value3}`  // 字符串拼接
      this.paymentRemittanceForm.remittanceDate = bgDate
      this.onCancelDate()
    },
    // 日期组件自定义格式
    formatter (type, value) {
      if (type === 'year') {
        this.value1 = value   // 可以拿到当前点击的数值
        return `${value}年`
      } else if (type === 'month') {
        this.value2 = value
        return `${value}月`
      }
      this.value3 = value
      return `${value}日`
    },
    changeCollapse(element, data) {
      this.paymentFormApproval.idPaymentForm = data.idPaymentForm
      this.paymentRemittanceForm.idPaymentForm = data.idPaymentForm
      this.fileList = JSON.parse(data.files)
      this.fileList.forEach((item, idx) => {
        let param = {
          id: item.fileId,
          url: process.env.VUE_APP_BASE_API + `/file/get/` + item.fileId,
          name: item.fileName
        }
        this.fileList[idx] = param
      })
      this.selectApprovalInfo(data.idApproval)
    },
    // 非空验证
    checkApprovalForm() {
      if (!isEmpty(this.approvalForm.idCheckResult)) {
        Toast.fail('请选择审批结果')
        return false
      }
      return true
    },
    // 取消审批
    cancelApproval(index) {
      this.activeName.splice(index, 1)
      this.approvalForm.idCheckResult = null
      this.approvalForm.checkCommon = ''
      this.paymentFormApproval.idPaymentForm = null
      this.paymentFormApproval.amount = null
    },
    // 审批请款单
    approvalPaymentForm(index) {
      let valid = this.checkApprovalForm()
      if (valid) {
        if (this.approvalForm.idCheckResult === 1) { // 通过
          if (this.paymentFormApproval.amount == null) {
            Toast.fail('请填写申请金额')
            return false
          }
        } else {
          this.paymentFormApproval.amount = null
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
            Toast.success(res.data.datas)
            this.cancelApproval(index)
            this.getTableData()
            this.getPaymentFormByState()
          } else {
            this.$message.error(res.data.cause)
          }
        })
      }
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
    getPaymentFormByState() {
      API.selectByStateCount().then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          this.approvaled = tmpData.approvaled
          this.unApproval = tmpData.unApproval
          this.unRemittance = tmpData.unRemittance
          this.remittanceCount = tmpData.remittanceCount
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
.wrapper {
  font-family: DM Sans, sans-serif;
}
.van-collapse-item__content {
  background-color: #F2F6FC;
}
.van-uploader__preview-image {
  background-color: #E4E7ED;
}
</style>

<style scoped>
._top {
  margin: 5px 0;
}
.van-row {
  color: #646566;
  font-size: 16px;
  text-align: center;
}
.svg-icon {
  position: absolute;
  margin-left: 10px;
}
.van-collapse-item .van-col {
  line-height: 30px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  padding: 0%;
  background-color: #fff;
  font-family: DM Sans, sans-serif;
}
.cell_body {
  text-indent: 1em;
}
._approval .van-row {
  border-bottom: 1px solid #F2F6FC;
}
._approval .van-col,
._approval .van-col:nth-child(1) {
  font-size: initial;
}
.van-radio {
  margin: 5px 0;
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
._submit_approval .van-button {
  width: 49%;
}
</style>
