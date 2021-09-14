<template>
  <div>
    <div class="wrapper">
      <van-search v-model="code" placeholder="搜索申请单编号" @search="getTableData"/>
      <van-row gutter="20">
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
      <van-cell-group>
        <van-cell is-link v-for="(item,index) in tableData" :key="index" @click="clickItemValue(item)">
          <span>{{item.code}}</span>
          <span class="svg-container" v-if="item.state == 2 && idRole == 2">
            <svg-icon icon-class="icon-approval" style="font-size: 20px;"/>
          </span>
          <span class="svg-container" v-else-if="item.remittanceAmount == null && idRole == 3">
            <svg-icon icon-class="remittance" style="font-size: 50px; margin-top: -10px;"/>
          </span>
        </van-cell>
      </van-cell-group>
      <br/>
      <!-- <van-collapse v-model="activeName" bind:change="onChange" v-for="(item,index) in tableData" :key="index">
        <van-collapse-item name="1">
          <view slot="title">
            111
          </view>
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
        </van-collapse-item>
      </van-collapse> -->

      <van-collapse v-model="activeName" bind:change="onChange">
        <van-collapse-item name="1">
          <view slot="title">有赞微商城
            <van-icon class="iconfont icon-icon-approval" />
          </view>
          提供多样店铺模板，快速搭建网上商城
        </van-collapse-item>
        <van-collapse-item title="有赞零售" name="2" icon="shop-o">
          网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
        </van-collapse-item>
      </van-collapse>


      <!-- <div class="van-collapse van-hairline--top-bottom" :value="activeName" @change="onChange($event)" v-for="(item,index) in tableData" :key="index">
        <div class="van-collapse-item">
          <div role="button" tabindex="0" aria-expanded="false" class="van-cell van-cell--clickable van-collapse-item__title">
            <div class="van-cell__title">
              <span>{{item.code}}</span>
              <span class="svg-container" v-if="item.state == 2 && idRole == 2">
                <svg-icon icon-class="icon-approval" style="font-size: 20px;"/>
              </span>
              <span class="svg-container" v-else-if="item.remittanceAmount == null && idRole == 3">
                <svg-icon icon-class="remittance" style="font-size: 50px; margin-top: -10px;"/>
              </span>
            </div>
            <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
          </div>
          <div class="van-collapse-item__wrapper" v-if="item == null">
            <div class="van-collapse-item__content">
              <div class="van-row">
                <div class="van-col van-col--6" style="padding-right: 10px;">事由：</div> 
                <div class="van-col van-col--18" style="padding-left: 10px;">{{item.reasonApplication}}</div>
              </div> 
            </div>
          </div>
        </div>
      </div> -->

      <van-popup
        v-model="show"
        round
        position="bottom"
        custom-style="height: 20%"
      >
        <div class="form_action" v-if="idRole == 2" @click="routerLinkToApprovalPayment('approval')">
          <span id="view-btn"><van-icon name="records" /></span>
          <span>审核</span>
        </div>
        <div class="form_action" v-if="idRole == 3" @click="routerLinkToApprovalPayment('remittance')">
          <span id="edit-btn"><van-icon name="cash-back-record" /></span>
          <span>汇款</span>
        </div>
        <van-button type="info" size="large" @click="show = false">取 消</van-button>
      </van-popup>
      <!--<tbody>
            <tr class="white-space-no-wrap" v-for="(item,index) in tableData" :key="index">
              <td class="pr-0">
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input m-0" id="customCheck1">
                  <label class="custom-control-label" for="customCheck1"></label>
                </div>
              </td>
              <td>{{index + 1}}</td>
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
          -->
    </div>
    <!-- <el-dialog title="审批" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
  </div>
</template>

<script>
import * as API from '@/api/paymentForm';
import { getRole } from '@/utils/auth';
import Pagination from '@/components/Pagination';
import PreviewImage from "@/components/PreviewImage"

export default {
  components: { PreviewImage, Pagination },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 0,
      code: '',
      tableData: [],
      paymentForm: {},
      show: false,
      approvaled: 0,
      unApproval: 0,
      unRemittance: 0,
      remittanceCount: 0,
      idRole: getRole(),

      activeName: ['1']
    }
  },
  mounted() {
    this.getTableData()
    this.getPaymentFormByState()
  },
  methods: {
    onChange(ele) {
      console.log(ele)
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
    // 路由至审核or汇款页面
    routerLinkToApprovalPayment(type) {
      this.$router.push({
        path: '/mobile/approval',
        query: {
          type: type
        }
      })
    },
    // 展示操作菜单栏
    clickItemValue(data) {
      this.paymentForm = data
      this.show = true
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
</style>

<style scoped>
.van-row {
  color: #646566;
  font-size: 16px;
  margin: 5px 0;
  text-align: center;
}
.van-button {
  color: #646566;
  border: none;
  box-shadow: 10px 2px 5px 10px #f7f8fa;
}
.van-popup .van-button {
  background-color: #fff;
}
/* .svg-icon {
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
  background-color: #F2F6FC;
  font-family: DM Sans, sans-serif;
}
.van-collapse-item .van-col:nth-child(1) {
  background-color: #EBEEF5;
} */
</style>
