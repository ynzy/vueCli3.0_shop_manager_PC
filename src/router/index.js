import Vue from 'vue'
import VueRouter from 'vue-router'
import { sessionStorage } from '@/utils/storage'

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
    component: () => import('@/views/home/index.vue'), // 首页
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/home/component/Welcome.vue') // 欢迎
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/user/users/index.vue') // 用户列表
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('@/views/power/Roles/index.vue') // 角色列表
      },
      {
        path: '/richText',
        name: 'richText',
        component: () => import('@/views/richText/index.vue') // 富文本
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
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const token = sessionStorage.get('token')
  // if (!token) return next('/login')
  next()
})
export default router
