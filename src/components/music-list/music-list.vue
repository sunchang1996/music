<template>
  <div class="music-list">
    <div class="back" @click="handleClick">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" ref="playBtn" v-show="songs.length > 0">
          <i class="icon-play"></i>
          <span class="text">随机播放</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="handleScroll" :data="songs" class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll">
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import { prefixStyle } from 'common/js/dom'
import Loading from 'base/loading/loading'
import { mapActions } from 'vuex'

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const filter = prefixStyle('filter')

export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      scrollY: 0
    }
  },

  components: {
    Scroll,
    SongList,
    Loading
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },

  mounted() {
    // 获取图片的高度
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    // 歌曲列表距离上面的高度
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },

  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },

  methods: {
    handleScroll(pos) {
      this.scrollY = pos.y
    },

    handleClick() {
      this.$router.go(-1)
    },

    selectItem(item, index) {
      // 调用 selectPlay 方法传递参数
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },

  watch: {
    scrollY(newY) {
      // 通过设置 zIndex 实现背景根据滚动方向滑动
      let zIndex = 0
      let scale = 1
      let blur = 0
      const translateY = Math.max(this.minTranslateY, newY)
      this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`

      const percent = Math.abs(newY / this.imageHeight)
      const currentEle = this.$refs.bgImage
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(50 * percent, 50)
      }

      this.$refs.filter.style[filter] = `blur(${blur}px)`

      // 但滚动距离小于 minTranslateY 改变背景图片的位置，否则就改变
      if (newY < this.minTranslateY) {
        zIndex = 10
        currentEle.style.paddingTop = 0
        currentEle.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        currentEle.style.paddingTop = '70%'
        currentEle.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      currentEle.style.zIndex = zIndex
      currentEle.style[transform] = `scale(${scale})`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>