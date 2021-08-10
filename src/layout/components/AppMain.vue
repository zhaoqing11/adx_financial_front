<template>
  <section class="app-main option-scroll">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path;
    }
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
