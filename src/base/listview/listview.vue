<template>
  <scroll class="listview" 
    @scroll="scroll"
    :data = "data" 
    :listenScroll = 'listenScroll' 
    :probeType = "probeType"
    ref="listview">
    <ul>
      <li v-for="(group,key) in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" :src="item.avatar" v-lazy = "item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent = 'onShortcutTouchMove'>
      <ul>
        <li v-for="(item,index) in shortcutList" class="item" :data-index = "index" :class="{'current': currentIndex === index}">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18 // 每行元素的高度

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3 //
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0] // 第一次手指的位置
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex // 第一次的index
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 // -> |0 相当于向下取整Math.floor // 在y轴 第一次相对于第二次偏移的元素
      let anchorIndex = parseInt(this.touch.anchorIndex + delta) // 滚动到某一个的index
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (!index && index !== 0) return
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      // scrollToElement 第二个参数的含义是 是否要有动画的时间 滚动动画的时间
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() { // 计算高度
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (var i = 0; i < list.length; i++) {
        var element = list[i]
        height += element.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部 newY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间位置
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        // 如果落在了 height1 和 height2 之间 落在某一个区间
        if (-newY >= height1 && -newY < height2) { // -newY意思是取反
          this.currentIndex = i // 获取当前滚动的哪个index
          return
        }
      }
      // 当滚动到底部的时候，且-newY 大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
