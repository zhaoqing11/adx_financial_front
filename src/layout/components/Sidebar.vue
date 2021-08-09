<template>
  <div>
    <div class="br-logo">客户跟踪管理系统</div>
    <div class="br-sideleft sideleft-scrollbar">
      <label class="sidebar-label pd-x-10 mg-t-20 op-3">Navigation</label>
      <ul class="br-sideleft-menu">
        <li class="br-menu-item">
          <div :class="activeIndex == 0 ? 'br-menu-link active' : 'br-menu-link'" @click="clickSubMenu(0, '/home')">
            <span class="menu-item-label">首页</span>
            <span class="svg-container">
              <svg-icon icon-class="home" />
            </span>
          </div>
        </li>
        <li class="br-menu-item" v-for="(item, index) in dataArray" :key="index">
          <div :class="activeIndex == item.idAccessApi ? 'br-menu-link active' : 'br-menu-link'" @click="clickSubMenu(item.idAccessApi, item.routerPath)">
            <span class="menu-item-label">{{item.name}}</span>
            <span class="svg-container">
              <svg-icon :icon-class="item.icon" />
            </span>
          </div>
          <ul :class="activeIndex == item.idAccessApi ? 'br-menu-sub' : 'hide-menu-sub'">
            <li class="sub-item" v-for="(childItem, childIndex) in item.children" :key="childIndex" @click="clickSubMenu(item.idAccessApi, childItem.routerPath)">
              <a href="javascript:void(0);" class="sub-link">{{childItem.name}}</a>
            </li>
          </ul>
        </li>
        <!-- <li class="br-menu-item">
          <a href="#" class="br-menu-link with-sub">
            <span class="menu-item-label">我的客户</span>
            <span class="svg-container">
              <svg-icon icon-class="my-custom" />
            </span>
          </a>
          <ul class="br-menu-sub">
            <li class="sub-item"><a href="card-dashboard.html" class="sub-link">Dashboard</a></li>
            <li class="sub-item"><a href="card-social.html" class="sub-link">Blog &amp; Social Media</a></li>
            <li class="sub-item"><a href="card-listing.html" class="sub-link">Shop &amp; Listing</a></li>
          </ul>
        </li> -->
      </ul>

      <br>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/role";
import * as AUTH from "@/utils/auth";

export default {
  data() {
    return {
      dataArray: [],
      roleId: AUTH.getRole(),
      activeIndex: 0
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.getAuthByRole()
  },
  methods: {
    // 路由至对应菜单项
    clickSubMenu(index, path) {
      this.activeIndex = index
      this.$router.push(path)
    },
    // 根据角色获取角色下的权限
    getAuthByRole() {
      const dataArray = [];
      const dataChildrenArray = [];

      let permission = AUTH.getPerimission()
      // 判断在Cookies中是否已存在permission，存在则移除，防止调用后台方法header请求头过大导致400错误
      if (permission) {
        AUTH.removePerimission()
      }

      const param = {
        idRole: this.roleId
      }
      API.getAuthByRole(param).then(res => {
        if (res.data.status === 200) {
          const tmpData = res.data.datas
          AUTH.setPerimission(tmpData)
          tmpData.forEach(item => {
            // 创建一个新对象，并添加children属性
            const objTemp = {
              idAccessApi: item.idAccessApi,
              name: item.name,
              parenId: item.parenId,
              level: item.level,
              routerPath: item.routerPath,
              icon: item.icon,
              children: []
            };
            if (item.level === 1) {
              dataArray.push(objTemp)
            } else if (item.level === 2) {
              dataChildrenArray.push(item)
            }
          });
          for (const k in dataArray) {
            for (const j in dataChildrenArray) {
              if (dataChildrenArray[j].parentId === dataArray[k].idAccessApi) {
                dataArray[k].children.push(dataChildrenArray[j])
              }
            }
          }
          this.dataArray = dataArray
        }
      }).catch(err => {
        console.log(err)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.hide-menu-sub {
  display: none;
}
</style>
