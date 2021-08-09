import router from '@/router';
import { getToken } from './auth';

router.beforeEach((to, from, next) => {
  next();
  // if (to.matched.some(record => record.meta.requireAuth)) {
  //   // 判断该路由是否需要登录权限
  //   if (getToken()) {
  //     // 判断当前的token是否存在,登录存入的token
  //     next();
  //   } else {
  //     // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //     next({ path: '/' });
  //   }
  // } else {
  //   next();
  // }
});
