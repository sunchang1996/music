<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex' // 取数据
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
export default {
  created() {
    this._getDetail()
    console.log(this.singer)
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) { // 如果没有歌手id 就回到歌手页面 防止在详情页面刷新没有数据
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => { // 拿到歌手详情数据
        if (res.code === ERR_OK) {
          console.log(res.data.list)
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

.singer-detail
  position:fixed;
  z-index: 100
  top : 0
  left :0
  right :0
  bottom: 0
  background : $color-background
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
