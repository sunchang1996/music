import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import '@/common/stylus/index.styl'

fastclick.attach(document.body) // 结果移动端事件的三百毫秒的延迟
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
