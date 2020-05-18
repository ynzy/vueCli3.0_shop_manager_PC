import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    redirect: '/login' // 设置默认打开的页面
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login') // 登录
  }
]

const router = new VueRouter({
  routes
})

export default router
