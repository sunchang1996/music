import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import '@/common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body) // 结觉移动端事件的三百毫秒的延迟
/* eslint-disable no-new */
Vue.use(VueLazyLoad, {  // 使用懒加载插件
  loading: require('common/image/loading.gif')
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
