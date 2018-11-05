<template>
  <div>
    <div class="rank">
      排行榜
      <circles :percent="80" stroke-color="#ff5500"></circles>
    </div>
  </div>
</template>
<script>
import Circles from '../../base/circle/circles'
export default {
  components: {
    Circles
  }
}
</script>
<style lang="stylus" scoped>
.rank
  color: #fff;
</style>


