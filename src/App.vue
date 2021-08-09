<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import * as AUTH from "@/utils/auth";
import { changeTabLeaveTime } from "@/api/user";
// import * as API from "@/api/systemaction";

export default {
  name: 'App',
  data() {
    return {
      clientInfo: {},

      evtname: '', // 监听tab切换的事件名称，为了兼容性
      isFullscreenChange: false, // 记录当前tab切换是否是全屏引起的，如果是全屏引起的则不执行tab的监听事件
      visibilitychangeTimer: null
    }
  },
  mounted() {
  },
  methods: {
    getHiddenProp () {
      var prefixes = ['webkit', 'moz', 'ms', 'o']
      // if 'hidden' is natively supported just return it
      if ('hidden' in document) return 'hidden'
      // otherwise loop over all the known prefixes until we find one
      for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'Hidden') in document) return prefixes[i] + 'Hidden'
      }
      // otherwise it's not supported
      return null
    }
  }
};
</script>
