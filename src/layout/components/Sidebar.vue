<template>
  <div>
    <div :class="$store.getters.showSidebar ? 'iq-sidebar  sidebar-default sidebar-mobile-show' : 'iq-sidebar  sidebar-default'">
      <div v-if="$store.getters.showSidebar" class="close-sidebar" @click="closeSidebar"><i class="el-icon-close"></i></div>
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
            <li :class="active === item.id ? 'active sidebar-layout' : 'sidebar-layout'" v-for="(item,index) in meun" :key="index">
              <a href="javaScript:void(0);" class="svg-icon" @click="routerLinkToPage(item)">
                <i class="">
                  <span class="svg-container">
                    <svg-icon :icon-class="item.icon" />
                  </span>
                </i>
                <span class="ml-2">{{item.name}}</span>
              </a>
              <ul id="app1" class="submenu collapse" data-parent="#iq-sidebar-toggle" v-if="active === item.id">                      
                <li :class="active === childItem.id ? 'active sidebar-layout' : 'sidebar-layout'"
                v-for="(childItem,idx) in item.childMeun" :key="idx" @click="routerLinkToPage(childItem)">
                  <a href="javaScript:void(0);" class="svg-icon">
                    <i class="">
                      <span class="svg-container">
                        <svg-icon :icon-class="childItem.icon" />
                      </span>
                    </i>
                    <span class="">{{childItem.name}}</span>
                  </a>
                </li>
              </ul>
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
      meun: [],
      pcMeun: [
        {
          id: 1,
          name: '请款申请',
          url: '/myPaymentForm/index',
          icon: 'payment-form',
          childMeun: []
        }, {
          id: 2,
          name: '收款',
          url: '/collectionRecord/index',
          icon: 'collection-amount',
          childMeun: []
        }, {
          id: 3,
          name: '申请列表',
          url: '/paymentForm/index',
          icon: 'request-list',
          childMeun: []
        }, {
          id: 4,
          name: '收支明细',
          url: '/flowRecord/publicFlowRecord',
          icon: 'flow-record',
          childMeun: [{
            id: 7,
            name: '公账',
            url: '/flowRecord/publicFlowRecord',
            icon: 'public-type'
          }, {
            id: 8,
            name: '私账',
            url: '/flowRecord/privateFlowRecord',
            icon: 'private-type'
          }, {
            id: 19,
            name: '普通账户1',
            url: '/flowRecord/generalAccountRecord',
            icon: 'account-detail'
          }, {
            id: 20,
            name: '普通账户2',
            url: '/flowRecord/secondGeneralAccountRecord',
            icon: 'account-detail'
          }]
        }, {
          id: 5,
          name: '月报统计',
          url: '/report/index',
          icon: 'report',
          childMeun: [{
            id: 12,
            name: '公账',
            url: '/report/index',
            icon: 'public-type'
          }, {
            id: 13,
            name: '私账',
            url: '/report/privateReport',
            icon: 'private-type'
          }]
        }, {
          id: 6,
          name: '账单核对',
          url: '/daily/publicDaily',
          icon: 'daily',
          childMeun: [{
            id: 9,
            name: '公账',
            url: '/daily/publicDaily',
            icon: 'public-type'
          }, {
            id: 10,
            name: '私账',
            url: '/daily/privateDaily',
            icon: 'private-type'
          }, {
            id: 21,
            name: '普通账户1',
            url: '/daily/generalAccountDaily',
            icon: 'account-detail'
          }, {
            id: 22,
            name: '普通账户2',
            url: '/daily/secondGeneralAccountDaily',
            icon: 'account-detail'
          }]
        }, {
          id: 11,
          name: '账户设置',
          url: '/setting/index',
          icon: 'setting',
          childMeun: []
        }, {
          id: 14,
          name: '用户设置',
          url: '/setting/user',
          icon: 'user-setting',
          childMeun: []
        }, {
          id: 15,
          name: '部门管理',
          url: '/setting/department',
          icon: 'department-setting',
          childMeun: []
        }, {
          id: 16,
          name: '统计管理',
          url: '/statistics/index',
          icon: 'statistics',
          childMeun: [{
            id: 17,
            name: '公账',
            url: '/statistics/index',
            icon: 'public-type'
          }, {
            id: 18,
            name: '私账',
            url: '/statistics/privateFlowRecord',
            icon: 'private-type'
          }]
        }
      ],
      mobileMeun: [
        {
          id: 1,
          name: '请款申请',
          url: '/mobile/index',
          icon: 'payment-form',
          childMeun: []
        }, {
          id: 2,
          name: '收款',
          url: '/collectionRecord/index',
          icon: 'collection-amount',
          childMeun: []
        }, {
          id: 3,
          name: '申请列表',
          url: '/mobile/paymentForm',
          icon: 'request-list',
          childMeun: []
        }, {
          id: 4,
          name: '收支明细',
          url: '/flowRecord/publicFlowRecord',
          icon: 'flow-record',
          childMeun: [{
            id: 7,
            name: '公账',
            url: '/flowRecord/publicFlowRecord',
            icon: 'public-type'
          }, {
            id: 8,
            name: '私账',
            url: '/flowRecord/privateFlowRecord',
            icon: 'private-type'
          }, {
            id: 19,
            name: '普通账户1',
            url: '/flowRecord/generalAccountRecord',
            icon: 'general-type'
          }, {
            id: 20,
            name: '普通账户2',
            url: '/flowRecord/generalAccountRecord',
            icon: 'general-type'
          }]
        }, {
          id: 5,
          name: '月报统计',
          url: '/report/index',
          icon: 'report',
          childMeun: [{
            id: 12,
            name: '公账',
            url: '/report/index',
            icon: 'public-type'
          }, {
            id: 13,
            name: '私账',
            url: '/report/privateReport',
            icon: 'private-type'
          }]
        }, {
          id: 6,
          name: '账单核对',
          url: '/mobile/publicDaily',
          icon: 'mobile',
          childMeun: [{
            id: 9,
            name: '公账',
            url: '/mobile/publicDaily',
            icon: 'public-type'
          }, {
            id: 10,
            name: '私账',
            url: '/mobile/privateDaily',
            icon: 'private-type'
          }]
        }, {
          id: 11,
          name: '账户设置',
          url: '/setting/index',
          icon: 'setting',
          childMeun: []
        }, {
          id: 14,
          name: '用户设置',
          url: '/setting/user',
          icon: 'user-setting',
          childMeun: []
        }, {
          id: 15,
          name: '部门管理',
          url: '/setting/department',
          icon: 'department-setting',
          childMeun: []
        }, {
          id: 16,
          name: '统计管理',
          url: '/statistics/index',
          icon: 'statistics',
          childMeun: [{
            id: 17,
            name: '公账',
            url: '/statistics/index',
            icon: 'public-type'
          }, {
            id: 18,
            name: '私账',
            url: '/statistics/privateFlowRecord',
            icon: 'private-type'
          }]
        }
      ],
      windowWidth: document.documentElement.clientWidth,  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
    };
  },
  watch: {
    '$store.getters.winWidth'(newVal) {
      if (newVal < 1024) {
        this.meun = JSON.parse(JSON.stringify(this.mobileMeun))
      } else {
        this.meun = JSON.parse(JSON.stringify(this.pcMeun))
      }
      this.initData()
    },
    windowHeight (val) {
      this.$store.commit('app/WINHEIGHT', val)
    },
    windowWidth (val) {
      this.$store.commit('app/WINWIDTH', val)
    }
  },
  mounted() {
    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.windowHeight = window.fullHeight;  // 高
        that.windowWidth = window.fullWidth; // 宽
      })()
    };
    if (that.windowWidth < 1024) {
      this.meun = JSON.parse(JSON.stringify(this.mobileMeun))
    } else {
      this.meun = JSON.parse(JSON.stringify(this.pcMeun))
    }
    this.initData()
  },
  methods: {
    initData() {
      if (this.idRole === '5') {
        let idx = [1,2,3,4,5,6,11,16]
        idx.forEach(id => {
          let findIdx = this.meun.findIndex(item => {
            return item.id === id
          })
          this.meun.splice(findIdx, 1)
        })
      } else if (this.idRole === '4') {
        let idx = [2,3,11,14,15]
        idx.forEach(id => {
          let findIdx = this.meun.findIndex(item => {
            return item.id === id
          })
          this.meun.splice(findIdx, 1)
        })
      } else if (this.idRole === '3') {
        let idx = [5,11,14,15,16]
        idx.forEach(id => {
          let findIdx = this.meun.findIndex(item => {
            return item.id === id
          })
          this.meun.splice(findIdx, 1)
        })
      } else if (this.idRole === '2') {
        let idx = [2,5,14,15,16]
        idx.forEach(id => {
          let findIdx = this.meun.findIndex(item => {
            return item.id === id
          })
          this.meun.splice(findIdx, 1)
        })
      } else if (this.idRole === '1') {
        let idx = [2,3,4,5,6,11,14,15,16]
        idx.forEach(id => {
          let findIdx = this.meun.findIndex(item => {
            return item.id === id
          })
          this.meun.splice(findIdx, 1)
        })
      }
    },
    closeSidebar() {
      this.$store.commit('app/SHOWSIDEBAR', false)
    },
    // 路由至对应页面
    routerLinkToPage(data) {
      if (data.id == 7 || data.id == 8 || data.id == 19 || data.id == 20) {
        this.active = 4
      } else if (data.id == 9 || data.id == 10 || data.id == 21 || data.id == 22) {
        this.active = 6
      } else if (data.id == 12 || data.id == 13) {
        this.active = 5
      } else if (data.id == 17 || data.id == 18) {
        this.active = 16
      } else {
        this.active = data.id
      }
      this.closeSidebar()
      this.$router.push(data.url)
    },
    // 返回首页
    goHome() {
      this.$router.push('/home')
    }
  }
};
</script>

<style scoped>
.sidebar-mobile-show {
  left: 0;
}
.close-sidebar {
  display: block;
  position: absolute;
  z-index: 9999999;
  color: #fff;
  left: 220px;
  top: 10px;
  font-size: 25px;
}
</style>
