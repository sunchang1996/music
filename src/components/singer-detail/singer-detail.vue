<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex' // 取数据
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getDetail()
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  components: {
    MusicList
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) { // 如果没有歌手id 就回到歌手页面 防止在详情页面刷新没有数据
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => { // 拿到歌手详情数据
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"


.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
