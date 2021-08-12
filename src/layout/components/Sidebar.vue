<template>
  <div>
    <div class="iq-sidebar  sidebar-default  ">
      <div class="iq-sidebar-logo d-flex align-items-end justify-content-between">
        <a href="index.html" class="header-logo">
          <img src="@/assets/images/logo.png" class="img-fluid rounded-normal light-logo" alt="logo">
          <!-- <span>Datum</span>             -->
        </a>
        <div class="side-menu-bt-sidebar-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-light wrapper-menu" width="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="data-scrollbar" data-scroll="1">
        <nav class="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" class="side-menu">
            <li class=" sidebar-layout" @click="goHome()">
              <a href="javaScript:void(0);" class="svg-icon">
                <i class="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </i>
                <span class="ml-2">Home</span>
                <!-- <p class="mb-0 w-10 badge badge-pill badge-primary">6</p> -->
              </a>
            </li>
            <li class="px-3 pt-3 pb-2 ">
              <span class="text-uppercase small font-weight-bold">Application</span>
            </li>
            <li class="active sidebar-layout" @click="routerLinkToMyPaymentForm()">
              <a href="javaScript:void(0);" class="svg-icon">
                <i class="">
                  <svg class="icon line" width="18" id="receipt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17,16V3L13,5,10,3,7,5,3,3V17.83A3.13,3.13,0,0,0,5.84,21,3,3,0,0,0,9,18V17a1,1,0,0,1,1-1H20a1,1,0,0,1,1,1v1a3,3,0,0,1-3,3H6" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path>
                    <line x1="8" y1="10" x2="12" y2="10" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line>
                  </svg> 
                </i>
                <span class="ml-2">我的请款</span>
              </a>
            </li>
            <li class="sidebar-layout" v-if="idRole === '2'" @click="routerLinkToCollectionRecord()">
              <a href="javaScript:void(0);" class="svg-icon">
                <i class="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </i>
                <span class="ml-2">收款</span>
              </a>
            </li>
            <li class=" sidebar-layout" v-if="idRole === '2' || idRole === '3'" @click="routerLinkToPaymentFormList()">
              <a href="javaScript:void(0);" class="svg-icon">
                <i class="">
                  <svg class="icon line" width="18" id="receipt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17,16V3L13,5,10,3,7,5,3,3V17.83A3.13,3.13,0,0,0,5.84,21,3,3,0,0,0,9,18V17a1,1,0,0,1,1-1H20a1,1,0,0,1,1,1v1a3,3,0,0,1-3,3H6" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path>
                    <line x1="8" y1="10" x2="12" y2="10" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line>
                  </svg> 
                </i>
                <span class="ml-2">请款列表</span>
              </a>
            </li>
            <li class=" sidebar-layout" v-if="idRole === '4'" @click="routerLinkToFlowRecord()">
              <a href="javaScript:void(0);" class="svg-icon ">
                <i class="">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                </i>
                <span class="ml-2">收支明细</span>
              </a>
            </li>
            <li class=" sidebar-layout" v-if="idRole === '4'">
              <a href="javaScript:void(0);" class="svg-icon ">
                <i class="">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                </i>
                <span class="ml-2">月报统计</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="pt-5 pb-5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRole  } from "@/utils/auth";

export default {
  data() {
    return {
      idRole: getRole()
    };
  },
  mounted() {
  },
  methods: {
    goHome() {
      this.$router.push('/home')
    },
    // 路由至收支明细
    routerLinkToFlowRecord() {
      this.$router.push('/flowRecord/index')
    },
    // 路由至收款列表
    routerLinkToCollectionRecord() {
      this.$router.push('/collectionRecord/index')
    },
    // 路由至请款列表
    routerLinkToPaymentFormList() {
      this.$router.push('/paymentForm/index')
    },
    // 路由至我的请款
    routerLinkToMyPaymentForm() {
      this.$router.push('/myPaymentForm/index')
    }
  }
};
</script>
