import Vue from 'vue';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/css/iconfont.css';
import '@/styles/index.scss'; // global css

// 注入通用接口
import './utils/common';

import App from './App';
import store from './store';
import router from './router';

import axios from 'axios';
import '@/icons'; // icon
import '@/utils/requireAuth';

Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false;

Vue.config.errorHandler = (err) => {
  console.log(err);
};
// Vue.config.warnHandler = (err) => {
//   console.log(err);
// };
Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
