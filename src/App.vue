<template>
  <div id="app">
   <MHeader></MHeader>
   <router-view></router-view>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
export default {
  name: 'app',
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable'

#app {
   color : $color-theme
}
</style>
