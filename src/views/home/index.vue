<template>
  <div>
    
    <!-- ########## START: MAIN PANEL ########## -->
    <!-- <div class="br-mainpanel"> -->

      <!-- <div class="br-pagebody">
        <div class="row row-sm">
          <div class="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0" v-if="checkPerimission('approvalProjectEdit')" @click="clickApprovalProject()">
            <div class="bg-teal rounded overflow-hidden">
              <div class="pd-x-20 pd-t-20 d-flex align-items-center">
                <i class="ion ion-monitor tx-60 lh-0 tx-white op-7"></i>
                <div class="mg-l-20">
                  <p class="tx-10 tx-spacing-1 tx-mont tx-semibold tx-uppercase tx-white-8 mg-b-10"></p>
                  <p class="tx-24 tx-white tx-lato tx-bold mg-b-0 lh-1">{{approvalProjectCount}}</p>
                  <span class="tx-11 tx-roboto tx-white-8">待审批</span>
                </div>
              </div>
              <div class="icon-style">
                <span class="svg-container">
                  <svg-icon icon-class="approval" />
                </span>
              </div>
              <div id="ch1" class="ht-50 tr-y-1"></div>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0" v-if="checkPerimission('PaymentCollectionRecordAdd')" @click="routerLinkToPaymentPlan()">
            <div class="bg-info rounded overflow-hidden">
              <div class="pd-x-20 pd-t-20 d-flex align-items-center">
                <i class="ion ion-monitor tx-60 lh-0 tx-white op-7"></i>
                <div class="mg-l-20">
                  <p class="tx-10 tx-spacing-1 tx-mont tx-semibold tx-uppercase tx-white-8 mg-b-10"></p>
                  <p class="tx-24 tx-white tx-lato tx-bold mg-b-0 lh-1">{{unPaymentNum}}</p>
                  <span class="tx-11 tx-roboto tx-white-8">待回款</span>
                </div>
              </div>
              <div class="icon-style">
                <span class="svg-container">
                  <svg-icon icon-class="payment" />
                </span>
              </div>
              <div id="ch2" class="ht-50 tr-y-1"></div>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0" v-if="checkPerimission('PaymentCollectionRecordAdd')" @click="routerLinkToPaymentPlan()">
            <div class="bg-warning rounded overflow-hidden">
              <div class="pd-x-20 pd-t-20 d-flex align-items-center">
                <i class="ion ion-monitor tx-60 lh-0 tx-white op-7"></i>
                <div class="mg-l-20">
                  <p class="tx-10 tx-spacing-1 tx-mont tx-semibold tx-uppercase tx-white-8 mg-b-10"></p>
                  <p class="tx-24 tx-white tx-lato tx-bold mg-b-0 lh-1">{{overdueUnPaymentNum}}</p>
                  <span class="tx-11 tx-roboto tx-white-8">超期未回</span>
                </div>
              </div>
              <div class="icon-style">
                <span class="svg-container">
                  <svg-icon icon-class="expired" />
                </span>
              </div>
              <div id="ch3" class="ht-50 tr-y-1"></div>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0" @click="routerLinkToMyProjects()">
            <div class="bg-success rounded overflow-hidden">
              <div class="pd-x-20 pd-t-20 d-flex align-items-center">
                <i class="ion ion-monitor tx-60 lh-0 tx-white op-7"></i>
                <div class="mg-l-20">
                  <p class="tx-10 tx-spacing-1 tx-mont tx-semibold tx-uppercase tx-white-8 mg-b-10"></p>
                  <p class="tx-24 tx-white tx-lato tx-bold mg-b-0 lh-1">{{projectCount}}</p>
                  <span class="tx-11 tx-roboto tx-white-8">项目审核</span>
                </div>
              </div>
              <div class="icon-style">
                <span class="svg-container">
                  <svg-icon icon-class="approval-project" />
                </span>
              </div>
              <div id="ch3" class="ht-50 tr-y-1"></div>
            </div>
          </div>
        </div>
        <div class="row row-sm mg-t-20">
          <div class="col-lg-8"></div>
          <div class="col-lg-4 mg-t-20 mg-lg-t-0">
            <div class="card bd-0 mg-t-20"></div>
          </div>
        </div>
      </div> -->

    <!-- </div> -->

  </div>
</template>

<script>
import * as API from '@/api/home';
import Pagination from "@/components/Pagination";
import { checkPerimission, getRole } from "@/utils/auth";

export default {
  components: { Pagination },
  
  data() {
    return {
      idRole: getRole(),
      listLoading: true,
      // unReadRecord: 0,
      unPaymentNum: 0,
      overdueUnPaymentNum: 0,
      approvalProjectCount: 0,
      projectCount: 0
    };
  },
  created() {
  },
  mounted() {
    this.getDataInfo()
  },
  methods: {
    checkPerimission,
    routerLinkToMyProjects() {
      this.$router.push('/myProjects/projects')
    },
    routerLinkToPaymentPlan() {
      this.$router.push('/contractManagment/paymentPlan')
    },
    clickApprovalProject() {
      this.$router.push('/projectManagement/approvalProject')
    },
    getDataInfo() {
      API.getDataInfo()
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          // this.unReadRecord = tmpData.unReadRecord;
          this.unPaymentNum = tmpData.unPaymentNum;
          this.overdueUnPaymentNum = tmpData.overdueUnPaymentNum;
          this.approvalProjectCount = tmpData.approvalProjectCount;
          this.projectCount = tmpData.projectCount;
        }
      })
    }
  }
};
</script>

<style scoped>
.br-mainpanel {
  margin-top: 0;
}
.svg-icon {
  font-size: 50px;
}
.icon-style {
  background-repeat: no-repeat;
  background-size: 100%;
  width: 50px;
  height: 50px;
  position: absolute;
  right: 40px;
  top: 150px;
}
.tx-24 {
  font-size: 28px;
}
.tx-11 {
  font-size: 12px;
}
</style>
