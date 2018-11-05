<template>
  <div class="circle-box">
    <svg viewBox="0 0 100 100">
      <path :d="pathString" :stroke="trailColor" :stoke-width="trailWidth" fill-opacity="0"></path>
      <path :d="pathString" :stroke="strokeColor" fill-opacity="0" :style="pathStyle"></path>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'circles',
  props: {
    percent: String,
    strokeWidth: {
      type: Number,
      default: 6
    },
    trailColor: {
      type: String,
      default: '#eaeef2'
    },
    trailWidth: {
      type: Number,
      default: 5
    },
    strokeColor: {
      type: String,
      default: '#2d8cf0'
    }
  },

  computed: {
    len () {
      return Math.PI * 2 * this.radius
    },

    pathString() {
      return `M 50,50 m 0,-${this.radius}
                    a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
                    a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`
    },

    radius () {
      return 50 - this.strokeWidth / 2
    },

    pathStyle() {
      const style = {
        'stroke-dasharray': `${this.len}px ${this.len}px`,
        'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
      return style
    }
  }
}
</script>
<style lang="stylus" scoped>
.circle-box {
  width 80px
  height 80px
}
</style>
