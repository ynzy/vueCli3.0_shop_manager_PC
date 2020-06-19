/*
 * @Author: zhang
 * @Date: 2020-05-16 18:24:01
 * @Last Modified by: yong
 * @Last Modified time: 2020-06-19 09:17:01
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

import VueParticles from 'vue-particles' //vue-背景粒子插件
import particles from 'particles.js' // 背景粒子插件
import TreeTable from 'vue-table-with-tree-grid' //表格扩展
import VueQuillEditor from 'vue-quill-editor' //富文本编辑器
// 富文本样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */)
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
