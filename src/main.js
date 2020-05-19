/*
 * @Author: zhang
 * @Date: 2020-05-16 18:24:01
 * @Last Modified by: yong
 * @Last Modified time: 2020-05-19 18:21:59
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/reset.css' // 清除默认样式
import '@/assets/css/global.css' // 全局样式表
import '@/assets/fonts/iconfont.css' // 导入阿里图标

// 引入本地存储
import storage from '@/utils/storage'
// 错误处理方法
import { awaitWrap } from './utils/util'

Vue.config.productionTip = false

Vue.prototype.$storage = storage
Vue.prototype.$awaitWrap = awaitWrap

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
