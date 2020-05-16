/*
 * @Author: zhang 
 * @Date: 2020-05-16 18:24:01 
 * @Last Modified by: yong
 * @Last Modified time: 2020-05-16 18:26:28
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')