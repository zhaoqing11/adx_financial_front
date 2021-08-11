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
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import * as API from '@/api/paymentForm';
import Pagination from "@/components/Pagination";
import { getRole } from "@/utils/auth";

export default {
  components: { Pagination },
  data() {
    return {
      idRole: getRole(),
      approvalPaymentCount: 0,
      paymentRemittanceCount: 0
    };
  },
  created() {
  },
  mounted() {
    this.getDataInfo()
  },
  methods: {
    routerLinkToApprocalPayment() {
      this.$router.push('/paymentForm/index')
    },
    getDataInfo() {
      API.getDataInfo()
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          this.approvalPaymentCount = tmpData.approvalCount
          this.paymentRemittanceCount = tmpData.remittanceCount
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
}
span {
  font-size: 26px;
  font-weight: bold;
}
</style>
