<template>
  <div>
    <div :class="$store.getters.showSidebar ? 'iq-sidebar  sidebar-default sidebar-mobile-show' : 'iq-sidebar  sidebar-default'">
      <div v-if="$store.getters.showSidebar" class="close-sidebar" @click="closeSidebar"><i class="el-icon-close"></i></div>
      <div class="iq-sidebar-logo d-flex align-items-end justify-content-between">
        <a href="index.html" class="header-logo">
          <img src="@/assets/images/logo.png" class="img-fluid rounded-normal light-logo" alt="logo">
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
            <li :class="active === item.id ? 'active sidebar-layout' : 'sidebar-layout'" v-for="(item,index) in dataArray" :key="index">
              <a href="javaScript:void(0);" class="svg-icon" @click="routerLinkToPage(item, 1)">
                <i class="">
                  <span class="svg-container">
                    <svg-icon :icon-class="item.icon" />
                  </span>
                </i>
                <span class="ml-2">{{item.name}}</span>
              </a>
              <ul id="app1" class="submenu collapse" data-parent="#iq-sidebar-toggle" v-if="active === item.idAccessApi">                      
                <li :class="active === childItem.idAccessApi ? 'active sidebar-layout' : 'sidebar-layout'"
                v-for="(childItem,idx) in item.children" :key="idx">
                  <a href="javaScript:void(0);" class="svg-icon" @click="routerLinkToPage(childItem, 2)">
                    <i class="">
                      <span class="svg-container">
                        <svg-icon :icon-class="childItem.icon" />
                      </span>
                    </i>
                    <span class="">{{childItem.name}}</span>
                  </a>
                  <ul id="app1" class="submenu collapse" data-parent="#iq-sidebar-toggle" v-if="childActive === childItem.parentId">                      
                    <li :class="childActive === child3.idAccessApi ? 'active sidebar-layout' : 'sidebar-layout'"
                    v-for="(child3,idx) in childItem.children" :key="idx">
                      <a href="javaScript:void(0);" class="svg-icon" @click="routerLinkToPage(child3)">
                        <span class="">{{child3.name}}</span>
                      </a>
                    </li>
                  </ul>
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
import * as API from '@/api/role';
import * as AUTH from "@/utils/auth";

export default {
  data() {
    return {
      idRole: AUTH.getRole(),
      active: -1,
      childActive: -1,
      meun: [],
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
      dataArray: []
    };
  },
  watch: {
    '$store.getters.winWidth'(newVal) {
      if (newVal < 1024) {
        this.dataArray = JSON.parse(JSON.stringify(this.mobileMeun))
      } else {
        this.getAuthByRole()
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
      this.dataArray = JSON.parse(JSON.stringify(this.mobileMeun))
    } else {
      this.getAuthByRole()
    }
    this.getAuthByRole()
  },
  methods: {
    // 获取角色权限列表
    getAuthByRole() {
      let dataArray = []
      let dataChildrenArray = []
      let dataChildrenArray3 = []
      const param = {
        idRole: this.idRole
      }
      API.getAuthByRole(param).then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          AUTH.setPerimission(tmpData)
          tmpData.forEach(ele => {
            let temp = {
              idAccessApi: ele.idAccessApi,
              name: ele.name,
              parentId: ele.parentId,
              level: ele.level,
              routerPath: ele.routerPath,
              icon: ele.icon,
              children: []
            }
            if (ele.level === 1) {
              dataArray.push(temp)
            } else if (ele.level === 2) {
              dataChildrenArray.push(temp)
            } else if (ele.level === 3) {
              dataChildrenArray3.push(temp)
            }
          });
          for (const i in dataChildrenArray) {
            for (const j in dataChildrenArray3) {
              if (dataChildrenArray[i].idAccessApi === dataChildrenArray3[j].parentId) {
                dataChildrenArray[i].children.push(dataChildrenArray3[j])
              }
            }
          }
          for (const i in dataArray) {
            for (const k in dataChildrenArray) {
              if (dataArray[i].idAccessApi === dataChildrenArray[k].parentId) {
                dataArray[i].children.push(dataChildrenArray[k])
              }
            }
          }
          this.dataArray = dataArray
        }
      })
    },
    closeSidebar() {
      this.$store.commit('app/SHOWSIDEBAR', false)
    },
    // 路由至对应页面
    routerLinkToPage(data, type) {
      if (type === 1) {
        if (data.parentId != 0) {
          this.active = data.parentId
        } else {
          this.active = data.idAccessApi
        }
      } else if (type === 2) {
        this.childActive = data.parentId
      }
      this.closeSidebar()
      this.$router.push(data.routerPath)
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
