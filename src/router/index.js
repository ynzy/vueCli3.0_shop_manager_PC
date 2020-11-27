import Vue from 'vue'
import VueRouter from 'vue-router'
import { sessionStorage } from '@/utils/storage'
//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    redirect: '/home' // 设置默认打开的页面
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/welcome',
    component: () => import(/* webpackChunkName: "login_home_welcome" */ '@/views/home/index.vue'), // 首页
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () =>
          import(/* webpackChunkName: "login_home_welcome" */ '@/views/home/component/Welcome.vue') // 欢迎
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/user/users/index.vue') // 用户列表
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('@/views/power/rights/index.vue') // 角色列表
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('@/views/power/roles/index.vue') // 角色列表
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/views/goods/categories/index.vue') // 商品分类列表
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('@/views/goods/params/index.vue') // 分类参数
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/views/goods/list/index.vue') // 商品列表
      },
      {
        path: '/goods/add',
        name: 'goodsAdd',
        component: () => import('@/views/goods/add/index.vue') // 添加编辑商品
      },
      {
        path: '/orders',
        name: 'order',
        component: () => import('@/views/order/order/index.vue') // 订单列表
      },
      {
        path: '/reports',
        name: 'report',
        component: () => import('@/views/reportStatistics/report/index.vue') // 数据报表
      },
      {
        path: '/richText',
        name: 'richText',
        component: () => import('@/views/richText/index.vue') // 富文本
      },
      {
        path: '/wxLogin',
        name: 'wxLogin',
        component: () => import('@/views/wxLogin/index.vue') // 富文本
      },
      {
        path: '/more',
        name: 'more',
        component: () => import('@/views/more/index.vue') // 更多
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login') // 登录
  },
  {
    path: '/newlogin',
    name: 'login',
    component: () => import('@/views/login/index.vue') // 登录
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next()  放行    next('/login')  强制跳转
  NProgress.start()
  if (to.path === '/login') return next()
  // 获取token
  const token = sessionStorage.get('token')
  // if (!token) return next('/login')
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
