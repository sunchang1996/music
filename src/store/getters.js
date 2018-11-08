// 取数据
export const singer = state => state.singer

export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.node
export const currentIndex = state => state.currentIndex

// getters 也可以充当计算属性
export const currentSong = (state) => {
  return state.playing[state.currentIndex] || {}
}
