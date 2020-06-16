/*
 * @Author: zhang
 * @Date: 2020-05-16 18:24:01
 * @Last Modified by: yong
 * @Last Modified time: 2020-06-16 19:05:52
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css' // 清除默认样式
import '@/assets/css/global.css' // 全局样式表
import '@/assets/fonts/iconfont.css' // 导入阿里图标

import VueParticles from 'vue-particles'
import particles from 'particles.js'
import TreeTable from 'vue-table-with-tree-grid'
Vue.use(VueParticles)
Vue.use(particles)
Vue.component('tree-table', TreeTable)
// 引入本地存储
import { storage, sessionStorage } from '@/utils/storage'

Vue.config.productionTip = false
Vue.prototype.$storage = storage
Vue.prototype.$sessionStorage = sessionStorage
Vue.prototype.$errorMsg = errorMsg

function errorMsg(err, msg) {
  if (err) {
    console.log(err)
    return this.$message.error(err.meta.msg || msg)
  }
}

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  // 字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  data: {
    Bus: new Vue()
  },
  render: h => h(App)
}).$mount('#app')
