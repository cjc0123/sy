import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: resolve => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/dashboard',
    component: resolve => require(['@/views/Home'], resolve),
    name: 'Dashboard',
    meta: {
      title: '首页',
      icon: 'index',
      affix: true,
      noCache: true
    },
    children: [
      {
        path: 'content',
        component: resolve =>
          require(['../views/homeContent/HomeContent'], resolve),
        name: 'content',
        meta: {
          title: '主页',
          icon: 'index',
          noCache: true
        }
      },
      {
        path: 'buy',
        component: resolve =>
          require(['@/views/inProduction/inProductOpt'], resolve),
        name: 'buy',
        meta: {
          title: '产品订购',
          icon: 'index',
          noCache: true
        }
      },
      {
        path: 'orderDetail',
        component: resolve =>
          require(['../views/dashboard/OrderDetail'], resolve),
        name: 'orderDetail',
        meta: {
          title: '订单详情',
          icon: 'index',
          noCache: true
        }
      },
      {
        path: 'applyJxs',
        component: resolve => require(['@/views/applyJxs'], resolve),
        name: 'applyJxs',
        meta: {
          title: '申请经销商',
          icon: 'index',
          noCache: true
        }
      },
      {
        path: 'finance',
        component: resolve => require(['../views/dashboard/Finance.vue'], resolve),
        name: 'finance',
        meta: {
          title: '财务中心',
          icon: 'index',
          noCache: true
        }
      },
      {
        path: 'contactUs',
        component: resolve => require(['../views/dashboard/ContactUs.vue'], resolve),
        name: 'contactUs',
        meta: {
          title: '联系我们',
          icon: 'index',
          noCache: true
        }
      },
      {
        path: 'dynamic',
        component: resolve => require(['../views/dashboard/Dynamic.vue'], resolve),
        name: 'dynamic',
        meta: {
          title: '双宇动态',
          icon: 'index',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/404',
    component: resolve => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: resolve => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: resolve => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'applyJxs',
  //       component: resolve => require(['@/views/applyJxs'], resolve),
  //       name: 'applyJxs',
  //       meta: {
  //         title: '申请经销商',
  //         icon: 'index',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'buy',
        component: resolve =>
          require(['@/views/inProduction/inProductOpt'], resolve),
        name: 'buy',
        meta: {
          title: '产品订购',
          icon: 'index',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: resolve => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/yshop/materia/index',
    name: `images`,
    meta: {
      title: '上传图片',
      noCache: true
    },
    component: resolve =>
      require(['@/components/editorMaterial/index'], resolve),
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
