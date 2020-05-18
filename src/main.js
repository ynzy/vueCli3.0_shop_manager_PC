/*
 * @Author: zhang
 * @Date: 2020-05-16 18:24:01
 * @Last Modified by: yong
 * @Last Modified time: 2020-05-18 11:20:56
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/reset.css' // 清除默认样式
import '@/assets/css/global.css' // 全局样式表
import '@/assets/fonts/iconfont.css' // 导入阿里图标

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
