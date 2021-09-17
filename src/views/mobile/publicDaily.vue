<template>
  <div>
    <div class="wrapper">
      <van-search v-model="code" placeholder="搜索申请单编号" @search="getTableData"/>
      <van-row gutter="20" class="_top">
        <van-col span="11">
          <span v-if="idRole == 2">已审核: {{approvalTotal}}</span>
          <!-- <span v-else-if="idRole == 3">已汇款: {{remittanceCount}}</span> -->
        </van-col>
        <van-col span="2"></van-col>
        <van-col span="11">
          <span v-if="idRole == 2">待审核: {{unApprovalCount}}</span>
          <!-- <span v-else-if="idRole == 3">待汇款: {{unRemittance}}</span> -->
        </van-col>
      </van-row>
      <van-collapse clickable v-model="activeName" v-for="(item,index) in tableData" :key="index" @change="changeCollapse($event, item)">
        <van-collapse-item :name="index">
          <template slot="title">{{ item.createTime }}
            <span class="svg-container" v-if="item.state == 0 && idRole == 2">
              <svg-icon icon-class="icon-approval" style="font-size: 20px;"/>
            </span>
            <van-icon name="close" v-else-if="item.state == 2 && idRole == 3"/>
          </template>
          <div class="cell_body">
            <div class="_details">
              <h6>账单</h6>
              <div class="_amount daily">
                <div class="_nav">
                  审核状态：
                  <span v-if="item.state === 0">待审批</span>
                  <span id="green-cell" v-else-if="item.state === 1">审核通过</span>
                  <span id="red-cell" v-else>不通过</span>
                </div>
                <div class="_round">
                  <span class="_num">{{item.collectionAmount ? item.collectionAmount : '--'}}</span>
                  <span class="_text">日收入</span>
                </div>
                <div class="_round">
                  <span class="_num">{{item.payAmount ? item.payAmount : '--'}}</span>
                  <span class="_text">日支出</span>
                </div>
                <div class="_round">
                  <span class="_num">{{item.serviceCharge ? item.serviceCharge : '--'}}</span>
                  <span class="_text">手续费</span>
                </div>
                <div class="_round">
                  <span class="_num">{{item.remainingSum ? item.remainingSum : '--'}}</span>
                  <span class="_text">余额</span>
                </div>
              </div>
              <!-- 添加收款支出 -->
              <div class="add_coll_pay" v-if="item.state == 2 && idRole == 3">
                <a href="javaScript:void(0);" @click="clickOpenCollection">添加收款</a>
                <a href="javaScript:void(0);" @click="clickOpenPayment">添加支出</a>
                <div v-if="collectionVisible">
                  <van-row gutter="20">
                    <van-col span="24" style="padding: 10px;">
                      <h6>收款</h6>
                      <van-cell-group>
                        <van-field
                          v-model="collectionRecordForm.amount"
                          type="number"
                          label="收款金额"
                          placeholder="请输入收款金额"
                          required/>
                        <van-field
                          v-model="collectionRecordForm.collectionDate"
                          label="收款日期"
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
                            @confirm="onConfirmDate('collection')" 
                            :min-date="minDate" 
                            :max-date="maxDate"
                            :formatter="formatter"/>
                        </van-popup>
                        <van-field
                          v-model="collectionRecordForm.remark"
                          type="text"
                          label="备注"
                          placeholder="请输入备注"/>
                      </van-cell-group>
                      <div class="_button">
                        <van-button type="default" size="large" @click="collectionVisible = false">取 消</van-button>
                        <van-button type="info" size="large" @click="addCollectionRecord(item)">确 定</van-button>
                      </div>
                    </van-col>
                  </van-row>
                </div>
                <div v-if="remittanceVisible">
                  <van-row gutter="20">
                    <van-col span="24" style="padding: 10px;">
                      <h6>汇款</h6>
                      <van-cell-group>
                        <van-field
                          v-model="paymentRemittanceForm.amount"
                          type="number"
                          label="汇款金额"
                          placeholder="请输入汇款金额"
                          required/>
                        <van-field
                          v-model="paymentRemittanceForm.serviceCharge"
                          type="number"
                          label="手续费"
                          placeholder="请输入手续费"
                          required/>
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
                            @confirm="onConfirmDate('pay')" 
                            :min-date="minDate" 
                            :max-date="maxDate"
                            :formatter="formatter"/>
                        </van-popup>
                        <van-field
                          v-model="paymentRemittanceForm.remark"
                          type="text"
                          label="备注"
                          placeholder="请输入备注"/>
                      </van-cell-group>
                      <div class="_button">
                        <van-button type="default" size="large" @click="remittanceVisible = false">取 消</van-button>
                        <van-button type="info" size="large" @click="addPaymentRemittance(item)">确 定</van-button>
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </div>
              <h6>明细</h6>
              <div class="flow_card" v-for="(childItem, idx) in flowRecordDta" :key="idx">
                <div class="_date">
                  <span v-if="childItem.collectionAmount">收</span>
                  <span v-else>支</span>
                  {{childItem.createTime}}
                </div>
                <div class="_message">
                  <div v-if="childItem.idPaymentForm">
                    <p><span>事由：</span>{{childItem.reasonApplication ? childItem.reasonApplication : '--'}}</p>
                    <p><span>申请金额：</span>{{childItem.amount ? childItem.amount : '--'}}</p>
                    <p><span>付款名称：</span>{{childItem.paymentName ? childItem.paymentName : '--'}}</p>
                    <p><span>付款账号：</span>{{childItem.paymentAccount ? childItem.paymentAccount : '--'}}</p>
                  </div>
                  <div v-if="childItem.collectionAmount == null">
                    <p><span>审批金额：</span>{{childItem.approvalAmount ? childItem.approvalAmount : '--'}}</p>
                    <p><span>汇款金额：</span>{{childItem.remittanceAmount ? childItem.remittanceAmount : '--'}}</p>
                    <p><span>手续费：</span>{{childItem.serviceCharge ? childItem.serviceCharge : '--'}}</p>
                  </div>
                  <div v-else>
                    <p><span>收款金额：</span>{{childItem.collectionAmount ? childItem.collectionAmount : '--'}}</p>
                  </div>
                  <p><span>余额：</span>{{childItem.remainingSum ? childItem.remainingSum : '--'}}</p>
                </div>
              </div>
              <div v-if="flowRecordDta.length <= 0">
                <van-empty description="暂无记录">
              </van-empty>
              </div>
            </div>
          </div>
          <!-- approval payment form -->
          <div class="_approval" v-if="item.state == 0 && idRole == 2">
            <van-row gutter="20">
              <van-col span="24" style="padding: 0 10px 10px 10px;">
                <h6>审批操作</h6>
                <van-radio-group v-model="form.idResultType">
                  <van-radio :name="1">通过</van-radio>
                  <van-radio :name="2">不通过</van-radio>
                </van-radio-group>
                <van-cell-group>
                  <van-field
                    v-model="form.remark"
                    label="备注"
                    type="textarea"
                    placeholder="请输入备注"
                    autosize
                    :border="false"
                  />
                </van-cell-group>
                <div class="_submit_approval">
                  <van-button type="default" size="large" @click="cancelApproval(index)">取 消</van-button>
                  <van-button type="info" size="large" @click="approvalDaily(index)">确 定</van-button>
                </div>
              </van-col>
            </van-row>
          </div>
          <br/>
          <!-- remittance payment form -->
          <div class="_approval" v-if="item.state == 2 && idRole == 3">
            <div class="_button" style="height:50px;">
              <van-button @click="cancelApproval(index)">取 消</van-button>
              <van-button type="primary" @click="updateCollectionRecordState(index)">确 定</van-button>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import * as API from '@/api/daily';
import * as APPROVAL from '@/api/approvalPublicDaily';
import * as REMITTANCE from '@/api/paymentRemittance';
import * as COLLECTIONAPI from '@/api/collectionRecord';
import { getUserId, getRole } from '@/utils/auth';
import { formatDate2, isEmpty } from '@/utils/validate';
import { Toast, DatetimePicker } from 'vant';

export default {
  components: { DatetimePicker },
  data() {
    return {
      idUser: getUserId(),
      idRole: getRole(),
      pageNum: 1,
      pageSize: 0,
      totalPage: 1,
      activeName: [],
      code: null,
      unApprovalCount: 0,
      approvalTotal: 0,
      dateTime: null,
      tableData: [],
      flowRecordDta: [],
      form: {
        idPublicDaily: null,
        idResultType: null,
        remark: null
      },

      show: false,
      minDate: new Date(1947, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      collectionVisible: false,
      remittanceVisible: false,
      idDaily: null,
      idCardType: 1,
      collectionRecordForm: {
        idCardType: 1,
        idCollectionRecord: null,
        amount: null,
        collectionDate: '',
        remark: null,
        idUser: null
      },
      paymentRemittanceForm: {
        amount: null,
        serviceCharge: 0,
        remittanceDate: '',
        remark: ''
      }
    }
  },
  mounted() {
    this.getApprovalCount()
    this.getTableData()
  },
  methods: {
    updateCollectionRecordState(index) {
      COLLECTIONAPI.updateCollectionRecordState({
        idCardType: this.idCardType,
        idDaily: this.idDaily
      }).then(res => {
        if (res.data.status === 200) {
          Toast.success('提交成功')
          this.activeName.splice(index, 1)
          this.getTableData()
        } else {
          Toast.fail(res.data.cause)
        }
      })
    },
    clickOpenPayment() {
      this.collectionVisible = false
      if (this.remittanceVisible) {
        this.remittanceVisible = false
      } else {
        this.remittanceVisible = true
      }
    },
    resetPaymentRemittance() {
      this.remittanceVisible = false
      this.paymentRemittanceForm.amount = null
      this.paymentRemittanceForm.serviceCharge = null
      this.paymentRemittanceForm.remittanceDate = null
      this.paymentRemittanceForm.remark = null
    },
    checkPaymentRemittance() {
      let form = this.paymentRemittanceForm
      if (!isEmpty(form.amount)) {
        Toast.fail('请输入汇款金额')
        return false
      }
      if (!isEmpty(form.serviceCharge)) {
        Toast.fail('请输入手续费')
        return false
      }
      if (!isEmpty(form.remittanceDate)) {
        Toast.fail('请选择汇款日期')
        return false
      }
      return true
    },
    // 创建汇款记录
    addPaymentRemittance(data) {
      let valid = this.checkPaymentRemittance()
      if (valid) {
        const param = {
          amount: this.paymentRemittanceForm.amount,
          serviceCharge: this.paymentRemittanceForm.serviceCharge,
          remittanceDate: this.paymentRemittanceForm.remittanceDate,
          remark: this.paymentRemittanceForm.remark,
          idUser: this.idUser,
          idDaily: this.idDaily,
          idCardType: this.idCardType
        }
        REMITTANCE.addApprovalPaymentRemittance(param).then(res => {
          if (res.data.status === 200) {
            Toast.success('操作成功')
            this.resetPaymentRemittance()
            this.getPublicDailyByDate(data)
          } else {
            Toast.fail(res.data.cause)
          }
        })
      }
    },
    // 点击添加收款
    clickOpenCollection() {
      this.remittanceVisible = false
      if (this.collectionVisible) {
        this.collectionVisible = false
      } else {
        this.collectionVisible = true 
      }
    },
    // 增加收款非空验证
    checkCollectionRecord() {
      let form = this.collectionRecordForm
      if (!isEmpty(form.amount)) {
        Toast.fail('请填写收款金额')
        return false
      }
      if (!isEmpty(form.collectionDate)) {
        Toast.fail('请选择收款日期')
        return false
      }
      return true
    },
    // 添加收款
    addCollectionRecord(data) {
      let valid = this.checkCollectionRecord()
      if (valid) {
        const param = {
          idCardType: this.collectionRecordForm.idCardType,
          amount: this.collectionRecordForm.amount,
          collectionDate: this.collectionRecordForm.collectionDate,
          remark: this.collectionRecordForm.remark,
          idUser: this.idUser,
          idDaily: this.idDaily
        }
        COLLECTIONAPI.addCollectionByApproval(param).then(res => {
          if (res.data.status === 200) {
            Toast.success('添加成功')
            this.resetCollectionRecord()
            this.getPublicDailyByDate(data)
          } else {
            Toast.fail(res.data.cause)
          }
        })
      }
    },
    // 重置收款内容
    resetCollectionRecord () {
      this.collectionVisible = false
      this.collectionRecordForm.amount = null
      this.collectionRecordForm.collectionDate = null
      this.collectionRecordForm.remark = null
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
    // 取消日期控制
    onCancelDate () {
      this.show = false
    },
    // 点击选中日期
    onConfirmDate (type) {
      let bgDate = `${this.value1}-${this.value2}-${this.value3}`  // 字符串拼接
      if (type === 'collection') {
        this.collectionRecordForm.collectionDate = bgDate
      } else {
        this.paymentRemittanceForm.remittanceDate = bgDate
      }
      this.onCancelDate()
    },
    // 非空验证
    checkDaily() {
      if (!isEmpty(this.form.idResultType)) {
        Toast.fail('请选择审核结果')
        return false
      }
      return true
    },
    // 审批
    approvalDaily(index) {
      let valid = this.checkDaily()
      if (valid) {
        const param = {
          idPublicDaily: this.form.idPublicDaily,
          idResultType: this.form.idResultType,
          remark: this.form.remark,
          idUser: this.idUser
        }
        APPROVAL.approvalPublicDaily(param)
        .then(res => {
          if (res.data.status === 200) {
            Toast.success('审批成功')
            this.cancelApproval(index)
            this.getApprovalCount()
            this.getTableData()
          } else {
            Toast.fail(res.data.cause)
          }
        })
      }
    },
    // 取消审批
    cancelApproval(index) {
      this.activeName.splice(index, 1)
      this.form.idPublicDaily = null
      this.form.idResultType = null
      this.form.remark = null
    },
    changeCollapse(element, data) {
      this.idDaily = data.idPublicDaily
      this.getPublicDailyByDate(data)
    },
    // 获取公账收支明细
    getPublicDailyByDate(val) {
      API.getPublicDailyByDate({
        date: val.createTime
      }).then(res => {
        if (res.data.status === 200) {
          this.flowRecordDta = res.data.datas
          this.form.idPublicDaily = val.idPublicDaily
        }
      })
    },
    // 获取请款记录列表
    getTableData() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        createTime: formatDate2(this.dateTime)
      }
      API.getPublicDailyByPage(params)
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas;

          tmpData.list.forEach(item => {
            item.createTime = formatDate2(item.createTime)
          })
          this.tableData = tmpData.list;
          this.totalPage = tmpData.totalRecord;
        }
      })
    },
    // 获取待审核账单数量
    getApprovalCount() {
      API.selectDailyByState({
        idRole: this.idRole
      }).then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          this.unApprovalCount = tmpData.countPub
          this.approvalTotal = tmpData.approvalTotalPub
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
.van-field__label {
  width: initial;
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
  color: #324253;
}
._approval .van-row,
.daily ._nav {
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
._submit_approval .van-button,
._button {
  width: 49%;
}
._details {
  margin: 10px 0;
}
.flow_card {
  border-radius: 4px;
  margin: 10px 0;
  background-color: #fff;
}
h6 {
  margin: 10px 0;
}
._date {
  padding: 5px;
  border-bottom: 1px solid #F2F6FC;
}
._date span {
  color: #fff;
  font-size: 12px;
  display: inline-block;
  padding: 1px 4px;
  border-radius: 50%;
  text-indent: initial;
  background-color: #909399;
}
._message {
  padding: 10px;
  font-size: 14px;
}
._message p {
  width: 100%;
  margin: 5px 0;
}
._amount {
  height: 120px;
  margin: 0 auto;
  text-align: center;
  padding: 10px 0;
  border-top: 1px solid #F2F6FC;
  background-color: #fff;
}
._round {
  width: 30%;
  height: 50px;
  float: left;
  margin: 0 auto;
}
._round span {
  display: block;
}
._round ._num {
  color: #E6A23C;
  font-size: 14px;
}
._round ._text {
  color: #324253;
  font-size: 12px;
}
.daily {
  height: 140px;
  border-radius: 4px;
  padding-top: 0%;  
}
.daily ._nav{
  text-align: left;
  padding: 5px 0;
  margin-bottom: 10px;
}
.add_coll_pay a {
  display: block;
  margin: 10px 0;
  text-align: right;
}
._button {
  width: 100%;
}
._button .van-button {
  width: 49%;
  float: left;
}
._button .van-button:nth-child(2) {
  border: none;
}
.van-icon-close::before {
  color: red;
  font-size: 18px;
  position: absolute;
  margin-top: -14px;
}
</style>
