<template>
  <section class="app-main option-scroll">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  // name: 'AppMain',
  data() {
    return {
      windowWidth: document.documentElement.clientWidth,  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
    }
  },
  watch: {
    windowHeight (val) {
      let that = this;
      // console.log("实时屏幕高度：",val, that.windowHeight);
    },
    windowWidth (val) {
      let that = this;
      // console.log("实时屏幕宽度：",val, that.windowHeight);

      this.$store.commit('app/WINWIDTH', val)
      this.$store.commit('app/WINHEIGHT', that.windowHeight)
    }
  },
  computed: {
    key() {
      return this.$route.path;
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
  }
};
</script>

<style scoped>
.app-main {
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: scroll;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.option-scroll {
  overflow-y: scroll;
}
.option-scroll::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.option-scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px #1D2939;
  opacity: 0.6;
}
.option-scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
  border-radius: 5px;
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
