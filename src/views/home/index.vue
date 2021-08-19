<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="content-home">
          <div class="card" v-if="idRole === '2'" @click="routerLinkToApprocalPayment">
            <label>待审批</label>
            <span>{{approvalPaymentCount}}</span>
          </div>
          <div class="card" v-if="idRole === '3'" @click="routerLinkToApprocalPayment">
            <label>待汇款</label>
            <span>{{paymentRemittanceCount}}</span>
          </div>
          <div class="card" v-if="idRole === '2'">
            <label>公账余额</label>
            <span>
              <span v-if="publicRemainingSum != null">{{publicRemainingSum}}</span>
              <span v-else><i class="el-icon-edit" @click="clickShowDialogForm(1)"></i></span>
            </span>
          </div>
          <div class="card" v-if="idRole === '2'">
            <label>私账余额</label>
            <span>
              <span v-if="privateRemainingSum != null">{{privateRemainingSum}}</span>
              <span v-else><i class="el-icon-edit" @click="clickShowDialogForm(2)"></i></span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="账目类型" :label-width="formLabelWidth" prop="idCardType">
          <el-select v-model="form.idCardType" placeholder="请选择" style="width:100%;" disabled>
            <el-option
              v-for="item in cardTypeData"
              :key="item.idCardType"
              :label="item.name"
              :value="item.idCardType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="余额" :label-width="formLabelWidth" prop="lastRemainingSum">
          <el-input v-model="form.lastRemainingSum" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRemainingSum('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '@/api/paymentForm';
import * as CTYPE from '@/api/cardType';
import * as REMAINSUM from '@/api/remainingSum';
import Pagination from "@/components/Pagination";
import { getRole } from "@/utils/auth";

export default {
  components: { Pagination },
  data() {
    return {
      idRole: getRole(),
      approvalPaymentCount: 0,
      paymentRemittanceCount: 0,
      publicRemainingSum: null,
      privateRemainingSum: null,
      dialogFormVisible: false,
      form: {
        idCardType: null,
        lastRemainingSum: null
      },
      rules: {
        idCardType: [
          { required: true, message: '请选择账目类型', trigger: 'change' }
        ],
        lastRemainingSum: [
          { required: true, message: '请填写余额', trigger: 'blur' }
        ]
      },
      formLabelWidth: '80',
      cardTypeData: []
    };
  },
  created() {
  },
  mounted() {
    this.getCardTypeList()
    this.getDataInfo()
  },
  methods: {
    clickShowDialogForm(type) {
      this.form.idCardType = type
      this.dialogFormVisible = true
    },
    getCardTypeList() {
      CTYPE.getCardType().then(res => {
        if (res.data.status === 200) {
          this.cardTypeData = res.data.datas
        }
      })
    },
    routerLinkToApprocalPayment() {
      this.$router.push('/paymentForm/index')
    },
    addRemainingSum(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            idCardType: this.form.idCardType,
            lastRemainingSum: this.form.lastRemainingSum
          }
          REMAINSUM.addRemainingSumRecord(param)
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success('保存成功')
              this.dialogFormVisible = false
              this.form.lastRemainingSum = null
              this.getDataInfo()
            } else {
              this.$message.error('保存失败')
            }
          })
        }
      })
    },
    getDataInfo() {
      API.getDataInfo()
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          this.approvalPaymentCount = tmpData.approvalCount
          this.paymentRemittanceCount = tmpData.remittanceCount
          this.publicRemainingSum = tmpData.publicRemainingSum
          this.privateRemainingSum = tmpData.privateRemainingSum

        }
      })
    }
  }
};
</script>

<style scoped>
.content-home {
  margin: 10px;
}
.card {
  width: 300px;
  height: 200px;
  padding: 20px;
  background-color: #fff;
  float: left;
  margin: 5px;
}
span {
  font-size: 26px;
  font-weight: bold;
}
</style>
