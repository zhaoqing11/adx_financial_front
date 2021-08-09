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
    path: "/order",
    component: () => import("@/views/order"),
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
  // {
  //   path: "/customerManagement",
  //   component: Layout,
  //   redirect: "/customerManagement",
  //   name: "CustomerManagement",
  //   meta: { title: "客户管理", icon: "customers", requireAuth: true },
  //   children: [
  //     {
  //       path: "customers",
  //       name: "Customers",
  //       component: () => import("@/views/customerManagement/customers"),
  //       meta: { title: "客户池", icon: "customList", requireAuth: true }
  //     },
  //     {
  //       path: "editCustomer",
  //       name: "EditCustomer",
  //       component: () => import("@/views/customerManagement/editCustomer"),
  //       meta: { title: "编辑客户", icon: "edit", requireAuth: true }
  //     },
  //     {
  //       path: "auditCustomers",
  //       name: "AuditCustomers",
  //       component: () => import("@/views/customerManagement/auditCustomers/index"),
  //       meta: { title: "审批列表", icon: "auditCustomers", requireAuth: true }
  //     },
  //     {
  //       path: "approvalDetail",
  //       name: "ApprovalDetail",
  //       component: () => import("@/views/customerManagement/auditCustomers/approvalDetail"),
  //       meta: { title: "审批详情", icon: "approval", requireAuth: true }
  //     },
  //     {
  //       path: "customerDetail",
  //       name: "CustomerDetail",
  //       component: () => import("@/views/customerManagement/customer/index"),
  //       meta: { title: "查看客户详情", icon: "list", requireAuth: true }
  //     },
  //     {
  //       path: "approvalRecord",
  //       name: "ApprovalRecord",
  //       component: () => import("@/views/customerManagement/approvalRecord/index"),
  //       meta: { title: "审批记录", icon: "list", requireAuth: true }
  //     }
  //   ]
  // }
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
