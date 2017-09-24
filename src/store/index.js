import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // log 的作用 当改变状态的时候 会在控制台打印出改变的状态

Vue.use(Vuex)

const debug = process.env.NDE_ENV !== 'production' // 添加一个vuex debug 的属性
// vuex 的严格模式 上线后就不能用了
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
