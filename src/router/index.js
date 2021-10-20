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
    meta: { title: "请款申请", icon: "myPaymentForm", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/myPaymentForm"),
        meta: { title: "请款申请", icon: "myPaymentForm", requireAuth: true }
      }
    ]
  },
  {
    path: "/paymentForm",
    component: Layout,
    redirect: "/paymentForm",
    name: "PaymentForm",
    meta: { title: "申请列表", icon: "paymentForm", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/paymentForm"),
        meta: { title: "申请列表", icon: "paymentForm", requireAuth: true }
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
        path: "publicFlowRecord",
        name: "PublicFlowRecord",
        component: () => import("@/views/flowRecord/publicFlowRecord"),
        meta: { title: "公账", icon: "publicFlowRcord", requireAuth: true }
      },
      {
        path: "privateFlowRecord",
        name: "PrivateFlowRecord",
        component: () => import("@/views/flowRecord/privateFlowRecord"),
        meta: { title: "私账", icon: "privateFlowRcord", requireAuth: true }
      },
      {
        path: "generalAccountRecord",
        name: "GeneralAccountRecord",
        component: () => import("@/views/flowRecord/generalAccountRecord"),
        meta: { title: "账户2", icon: "privateFlowRcord", requireAuth: true }
      },
      {
        path: "secondGeneralAccountRecord",
        name: "SecondGeneralAccountRecord",
        component: () => import("@/views/flowRecord/secondGeneralAccountRecord"),
        meta: { title: "账户3", icon: "privateFlowRcord", requireAuth: true }
      },
      {
        path: "pubGeneralRecord",
        name: "PubGeneralRecord",
        component: () => import("@/views/flowRecord/pubGeneralRecord"),
        meta: { title: "账户4", icon: "pubGeneralRecord", requireAuth: true }
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
        meta: { title: "公账", icon: "public-report", requireAuth: true }
      },
      {
        path: "privateReport",
        name: "PrivateReport",
        component: () => import("@/views/report/privateReport"),
        meta: { title: "私账", icon: "private-report", requireAuth: true }
      },
      {
        path: "generalAccountReport",
        name: "GeneralAccountReport",
        component: () => import("@/views/report/generalAccountReport"),
        meta: { title: "账户1", icon: "privateFlowReport", requireAuth: true }
      },
      {
        path: "secondGeneralAccountReport",
        name: "SecondGeneralAccountReport",
        component: () => import("@/views/report/secondGeneralAccountReport"),
        meta: { title: "账户2", icon: "privateFlowReport", requireAuth: true }
      },
      {
        path: "pubGeneralReport",
        name: "PubGeneralReport",
        component: () => import("@/views/report/pubGeneralReport"),
        meta: { title: "账户3", icon: "pubGeneralReport", requireAuth: true }
      },
      {
        path: "reportDetail",
        name: "ReportDetail",
        component: () => import("@/views/report/reportDetail"),
        meta: { title: "查看月报详情", icon: "reportDetail", requireAuth: true }
      }
    ]
  },
  {
    path: "/daily",
    component: Layout,
    redirect: "/daily",
    name: "Daily",
    meta: { title: "账单核对", icon: "daily", requireAuth: true },
    children: [
      {
        path: "publicDaily",
        name: "PublicDaily",
        component: () => import("@/views/daily/publicDaily"),
        meta: { title: "公账", icon: "public-daily", requireAuth: true }
      },
      {
        path: "privateDaily",
        name: "PrivateDaily",
        component: () => import("@/views/daily/privateDaily"),
        meta: { title: "私账", icon: "private-daily", requireAuth: true }
      },
      {
        path: "generalAccountDaily",
        name: "GeneralAccountDaily",
        component: () => import("@/views/daily/generalAccountDaily"),
        meta: { title: "账户2", icon: "generalAccount", requireAuth: true }
      },
      {
        path: "secondGeneralAccountDaily",
        name: "SecondGeneralAccountDaily",
        component: () => import("@/views/daily/secondGeneralAccountDaily"),
        meta: { title: "账户3", icon: "secondGeneralAccount", requireAuth: true }
      },
      {
        path: "pubGeneralDaily",
        name: "PubGeneralDaily",
        component: () => import("@/views/daily/pubGeneralDaily"),
        meta: { title: "账户4", icon: "pubGeneralDaily", requireAuth: true }
      }
    ]
  },
  {
    path: "/setting",
    component: Layout,
    redirect: "/setting",
    name: "Setting",
    meta: { title: "账户设置", icon: "setting", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/setting/index"),
        meta: { title: "账户设置", icon: "setting", requireAuth: true }
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/setting/user"),
        meta: { title: "用户设置", icon: "user-setting", requireAuth: true }
      },
      {
        path: "department",
        name: "Department",
        component: () => import("@/views/setting/department"),
        meta: { title: "部门管理", icon: "department-setting", requireAuth: true }
      }
    ]
  },
  {
    path: "/statistics",
    component: Layout,
    redirect: "/statistics",
    name: "Statistics",
    meta: { title: "统计管理", icon: "statistics", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/statistics/publicFlowRecord"),
        meta: { title: "公账", icon: "public", requireAuth: true }
      },
      {
        path: "privateFlowRecord",
        name: "PrivateFlowRecord",
        component: () => import("@/views/statistics/privateFlowRecord"),
        meta: { title: "私账", icon: "private", requireAuth: true }
      },
      {
        path: "generalAccount",
        name: "GeneralAccount",
        component: () => import("@/views/statistics/generalAccount"),
        meta: { title: "账户1", icon: "privateFlow", requireAuth: true }
      },
      {
        path: "secondGeneralAccount",
        name: "SecondGeneralAccount",
        component: () => import("@/views/statistics/secondGeneralAccount"),
        meta: { title: "账户2", icon: "privateFlow", requireAuth: true }
      },
      {
        path: "pubGeneralAccount",
        name: "PubGeneralAccount",
        component: () => import("@/views/statistics/pubGeneralAccount"),
        meta: { title: "账户3", icon: "pubGeneralAccount", requireAuth: true }
      }
    ]
  },
  {
    path: "/mobile",
    component: Layout,
    redirect: "/mobile",
    name: "Mobile",
    meta: { title: "请款申请", icon: "mobile", requireAuth: true },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/mobile/myPaymentForm"),
        meta: { title: "请款申请", icon: "myPaymentForm", requireAuth: true }
      },
      {
        path: "addPaymentForm",
        name: "AddPaymentForm",
        component: () => import("@/views/mobile/addPaymentForm"),
        meta: { title: "创建请款申请", icon: "addPaymentForm", requireAuth: true }
      },
      {
        path: "paymentForm",
        name: "PaymentForm",
        component: () => import("@/views/mobile/paymentForm"),
        meta: { title: "申请列表", icon: "paymentForm", requireAuth: true }
      },
      {
        path: "publicDaily",
        name: "PublicDaily",
        component: () => import("@/views/mobile/publicDaily"),
        meta: { title: "账单核对（公账）", icon: "publicDaily", requireAuth: true }
      },
      {
        path: "privateDaily",
        name: "PrivateDaily",
        component: () => import("@/views/mobile/privateDaily"),
        meta: { title: "账单核对（私账）", icon: "privateDaily", requireAuth: true }
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
