import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'  // 引入store 数据
import '@/common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body) // 解决移动端事件的三百毫秒的延迟
/* eslint-disable no-new */
Vue.use(VueLazyLoad, {  // 使用懒加载插件
  loading: require('common/image/loading.gif')
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
