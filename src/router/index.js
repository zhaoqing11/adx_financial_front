import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/login",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: { title: "首页", icon: "home", requireAuth: true }
      }
    ]
  },
  {
    path: "/myPaymentForm",
    component: Layout,
    redirect: "/myPaymentForm",
    name: "MyPaymentForm",
    meta: { title: "我的请款", icon: "myPaymentForm", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/myPaymentForm"),
        meta: { title: "我的请款", icon: "myPaymentForm", requireAuth: true }
      }
    ]
  },
  {
    path: "/paymentForm",
    component: Layout,
    redirect: "/paymentForm",
    name: "PaymentForm",
    meta: { title: "请款列表", icon: "paymentForm", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/paymentForm"),
        meta: { title: "请款列表", icon: "paymentForm", requireAuth: true }
      }
    ]
  },
  {
    path: "/collectionRecord",
    component: Layout,
    redirect: "/collectionRecord",
    name: "CollectionRecord",
    meta: { title: "收款", icon: "collectionRecord", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/collectionRecord"),
        meta: { title: "收款列表", icon: "collectionRecord", requireAuth: true }
      }
    ]
  },
  {
    path: "/flowRecord",
    component: Layout,
    redirect: "/flowRecord",
    name: "FlowRecord",
    meta: { title: "收支明细", icon: "flowRecord", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/flowRecord"),
        meta: { title: "收支明细", icon: "flowRecord", requireAuth: true }
      }
    ]
  },
  {
    path: "/report",
    component: Layout,
    redirect: "/report",
    name: "Report",
    meta: { title: "月报统计", icon: "report", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/report/index"),
        meta: { title: "月报统计", icon: "report", requireAuth: true }
      },
      {
        path: "reportDetail",
        name: "ReportDetail",
        component: () => import("@/views/report/reportDetail"),
        meta: { title: "查看月报详情", icon: "reportDetail", requireAuth: true }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// export const asyncRoutes = [

//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router;
