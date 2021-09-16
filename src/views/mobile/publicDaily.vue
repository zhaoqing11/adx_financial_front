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
            <span class="svg-container" v-else-if="item.state == 2 && idRole == 3">
              <svg-icon icon-class="remittance" style="font-size: 50px; margin-top: -10px;"/>
            </span>
          </template>
          <div class="cell_body">
            <van-row gutter="20">
              <van-col span="6">日收入：</van-col>
              <van-col span="18">{{item.collectionAmount}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">日支出：</van-col>
              <van-col span="18">{{item.payAmount}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">手续费：</van-col>
              <van-col span="18">{{item.serviceCharge}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">余额：</van-col>
              <van-col span="18">{{item.remainingSum}}</van-col>
            </van-row>
            <van-row gutter="20">
              <van-col span="6">审核状态：</van-col>
              <van-col span="18">
                <span id="orange-cell" v-if="item.state == 0">待审批</span>
                <span id="green-cell" v-else-if="item.state == 1">通过</span>
                <span id="red-cell" v-else-if="item.state == 2">不通过</span>
              </van-col>
            </van-row>
            <div class="_details">
              <h6>明细</h6>
              <div class="flow_card" v-for="(item, index) in flowRecordDta" :key="index">
                <div class="_date">
                  <span v-if="item.collectionAmount">收</span>
                  <span v-else>支</span>
                  {{item.createTime}}
                </div>
                <div class="_message">
                  <p><span>事由：</span>{{item.reasonApplication ? item.reasonApplication : '--'}}</p>
                  <p><span>申请金额：</span>{{item.amount ? item.amount : '--'}}</p>
                  <p><span>付款名称：</span>{{item.paymentName ? item.paymentName : '--'}}</p>
                  <p><span>付款账号：</span>{{item.paymentAccount ? item.paymentAccount : '--'}}</p>
                </div>
                <div class="_amount">
                  <div class="_round">
                    <span class="_num">{{item.approvalAmount ? item.approvalAmount : '--'}}</span>
                    <span class="_text">审批金额</span>
                  </div>
                  <div class="_round">
                    <span class="_num">{{item.remittanceAmount ? item.remittanceAmount : '--'}}</span>
                    <span class="_text">汇款金额</span>
                  </div>
                  <div class="_round">
                    <span class="_num">{{item.serviceCharge ? item.serviceCharge : '--'}}</span>
                    <span class="_text">手续费</span>
                  </div>
                  <div class="_round">
                    <span class="_num">{{item.collectionAmount ? item.collectionAmount : '--'}}</span>
                    <span class="_text">收款金额</span>
                  </div>
                  <div class="_round">
                    <span class="_num">{{item.remainingSum ? item.remainingSum : '--'}}</span>
                    <span class="_text">余额</span>
                  </div>
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
          <!-- <div class="_approval" v-if="item.state == 3 && idRole == 3 && item.remittanceAmount == null">
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
          </div> -->
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
import { Toast } from 'vant';

export default {
  data() {
    return {
      idUser: getUserId(),
      idRole: getRole(),
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      activeName: [],
      code: null,
      unApprovalCount: 0,
      approvalTotal: 0,
      currentDate: null,
      tableData: [],
      flowRecordDta: [],
      form: {
        idPublicDaily: null,
        idResultType: null,
        remark: null
      }
    }
  },
  mounted() {
    this.getApprovalCount()
    this.getTableData()
  },
  methods: {
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
        createTime: formatDate2(this.currentDate)
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
  border-top: 1px solid #F2F6FC;
  padding: 10px 0;
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
</style>
