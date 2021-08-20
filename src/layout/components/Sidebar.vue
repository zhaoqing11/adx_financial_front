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
            <li :class="active === item.id ? 'active sidebar-layout' : 'sidebar-layout'" v-for="(item,index) in meun" :key="index" @click="routerLinkToPage(item)">
              <a href="javaScript:void(0);" class="svg-icon">
                <i class="">
                  <span class="svg-container">
                    <svg-icon :icon-class="item.icon" />
                  </span>
                </i>
                <span class="ml-2">{{item.name}}</span>
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
      idRole: getRole(),
      active: -1,
      meun: [
        {
          id: 1,
          name: '请款申请',
          url: '/myPaymentForm/index',
          icon: 'payment-form'
        }, {
          id: 2,
          name: '收款',
          url: '/collectionRecord/index',
          icon: 'collection-amount'
        }, {
          id: 3,
          name: '申请列表',
          url: '/paymentForm/index',
          icon: 'request-list'
        }, {
          id: 4,
          name: '收支明细',
          url: '/flowRecord/index',
          icon: 'flow-record'
        }, {
          id: 5,
          name: '月报统计',
          url: '/report/index',
          icon: 'report'
        }, {
          id: 6,
          name: '日报',
          url: '/daily/index',
          icon: 'daily'
        }
      ]
    };
  },
  mounted() {
    if (this.idRole === '4') {
      let idx = [2,3]
      idx.forEach(id => {
        let findIdx = this.meun.findIndex(item => {
          return item.id === id
        })
        this.meun.splice(findIdx, 1)
      })
    } else if (this.idRole === '3') {
      let idx = [4,5]
      idx.forEach(id => {
        let findIdx = this.meun.findIndex(item => {
          return item.id === id
        })
        this.meun.splice(findIdx, 1)
      })
    } else if (this.idRole === '2') {
      let idx = [2,5]
      idx.forEach(id => {
        let findIdx = this.meun.findIndex(item => {
          return item.id === id
        })
        this.meun.splice(findIdx, 1)
      })
    } else if (this.idRole === '1') {
      let idx = [2,3,4,5]
      idx.forEach(id => {
        let findIdx = this.meun.findIndex(item => {
          return item.id === id
        })
        this.meun.splice(findIdx, 1)
      })
    }
  },
  methods: {
    // 路由至对应页面
    routerLinkToPage(data) {
      this.active = data.id
      this.$router.push(data.url)
    },
    // 返回首页
    goHome() {
      this.$router.push('/home')
    }
  }
};
</script>
