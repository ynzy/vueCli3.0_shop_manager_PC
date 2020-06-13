/*
 * @Author: zhang
 * @Date: 2020-05-16 18:24:01
 * @Last Modified by: yong
 * @Last Modified time: 2020-06-03 10:03:04
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
new Vue({
  router,
  store,
  data: {
    Bus: new Vue()
  },
  render: h => h(App)
}).$mount('#app')
