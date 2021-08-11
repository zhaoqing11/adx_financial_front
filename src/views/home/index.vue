<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="content-home">
          <div class="card" v-if="idRole === '2'" @click="routerLinkToApprocalPayment">
            <label>待审批</label>
            <span>{{approvalPaymentCount}}</span>
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
      approvalPaymentCount: 0
    };
  },
  created() {
  },
  mounted() {
    this.getDataInfo()
  },
  methods: {
    routerLinkToApprocalPayment() {
      this.$router.push('/approvalPaymentForm/index')
    },
    getDataInfo() {
      API.queryApprovalPaymentCount()
      .then(res => {
        if (res.data.status === 200) {
          this.approvalPaymentCount = res.data.datas
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
