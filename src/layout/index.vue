<template>
  <div :class="classObj" class="app-wrapper" style="overflow:hidden">
    <el-container>
      <el-header>
        <navbar />
      </el-header>
      <el-container>
        <sidebar />
        <el-container>
          <el-main class="column">
            <app-main />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
        // withoutAnimation: this.sidebar.withoutAnimation,
        // mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/css/backend-plugin.min.css";
@import "~@/styles/css/backend.css";

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.hamburger-container {
  height: 46px;
  line-height: 50px;
  float: left;
  margin-left: 3px;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.breadcrumbContainer {
  width: 100%;
  color: #999;
}
.breadcrumb-container {
  float: left;
}
.el-main {
  padding: 0;
  background: #f7faff;
  overflow: hidden;
}
.el-footer {
  height: 30px;
  line-height: 10px;
  font-size: 12px;
  color:#868ba1;
  background-color: #f7faff;
}
</style>
