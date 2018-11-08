// 定义修改的操作
import * as types from './mutations-type'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },

  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },

  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },

  [types.SET_PLAY_LIST](state, list) {
    state.playing = list
  },

  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },

  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },

  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
}
export default mutations

// 操作 state 必须要通过 mutations 来修改
