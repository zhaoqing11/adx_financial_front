<template>
  <div>
    <div class="wrapper">
      <van-notice-bar
        v-if="showPrompt"
        :scrollable="false"
        :text="promptText"
      />
      <van-divider contentPosition="left">基础信息（必填）</van-divider>
      <van-cell-group>
        <van-field
          :disabled="type == 'view'"
          v-model="paymentForm.cardTypeName"
          label="类型"
          placeholder="请选择类型"
          :border="false"
          @click="clickShowType"
        />
        <van-field
          :disabled="isDisabled"
          v-model="paymentForm.reasonApplication"
          label="事由"
          type="textarea"
          placeholder="请输入事由"
          :border="false"
        />
        <van-field
          :disabled="isDisabled"
          v-model="paymentForm.amount"
          label="申请金额"
          type="number"
          placeholder="请输入申请金额"
          :border="false"
        />
        <van-field
          :disabled="isDisabled"
          v-model="paymentForm.paymentName"
          label="付款名称"
          placeholder="请输入付款名称"
          :border="false"
        />
        <van-field
          :disabled="isDisabled"
          v-model="paymentForm.paymentAccount"
          type="digit"
          label="付款账号"
          placeholder="请输入付款账号"
          :border="false"
        />
      </van-cell-group>
      <van-divider contentPosition="left">上传附件</van-divider>
      <van-row>
        <van-col span="24">
          <van-uploader :file-list="fileList" @after-read="afterRead" />
        </van-col>
      </van-row>
      <br/>
      <!-- add approval mode -->

      <div class="button_group" v-if="!isDisabled">
        <van-button type="info" size="large" @click="addPaymentForm(2)">提 交</van-button>
        <van-button type="warning" size="large" @click="addPaymentForm(1)">保 存</van-button>
        <van-button size="large" @click="goback">取 消</van-button>
      </div>
      <van-action-sheet
        v-model="show"
        :actions="cardTypeData"
        cancel-text="取消"
        @select="selectCardType"
      />
    </div>
    <!-- <div class="_approval" v-if="type == 'view' && isDisabled">
      <div v-if="paymentForm.state != 1">
        <van-divider contentPosition="left">汇款进度</van-divider>
        <van-steps
          :active="active"
          active-icon="success"
          active-color="#38f">
          <van-step v-for="(item,index) in processTable" :key="index">{{item.caseName}}</van-step>
        </van-steps>
      </div>
    </div> -->
    <van-button size="large" style="width:100%;" @click="goback" v-if="type == 'view'">返 回</van-button>
  </div>
</template>

<script>
import { Toast, Steps, Step } from 'vant';
import * as API from '@/api/paymentForm';
import * as APPROVAL from '@/api/approval';
import * as REMITTANCE from '@/api/paymentRemittance';
import * as CTYPE from '@/api/cardType';
import * as DAILY from '@/api/daily';
import { getUserId, getToken } from '@/utils/auth';
import Pagination from '@/components/Pagination';
import PreviewImage from "@/components/PreviewImage"

export default {
  components: { PreviewImage, Pagination },
  data() {
    return {
      
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.promptText {
  color: red;
  font-size: 22px;
}
.van-row {
  text-align: center;
  background-color:#fff;
}
.van-uploader {
  margin: 10px;
}
.van-button {
  width: 95%;
}
.button_group {
  text-align: center;
}
</style>