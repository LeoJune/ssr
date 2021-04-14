<template>
  <div
    v-if="isShowBack"
    class="backTop"
    @click="backToTop"
  >
    <img
      :src="img"
      alt
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      img: require('../../assets/images/home-gotop.jpg'),
      isShowBack: true
    }
  },
  created () {
    //  在路由meta里控制是否显示回到顶部
    if (this.$route.meta.backTop === false) {
      this.isShowBack = this.$route.meta.backTop
    }
  },
  mounted () {
    window.addEventListener('scroll', this.showbtn, true)
  },
  methods: {
    // 显示回到顶部按钮
    showbtn () {
      const that = this
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
    },
    /**
      * 回到顶部功能实现过程：
      * 1. 获取页面当前距离顶部的滚动距离（虽然IE不常用了，但还是需要考虑一下兼容性的）
      * 2. 计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是做一个减法
      * 3. 用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
      * 4. 最后记得在移动到顶部时，清除定时器
    */
    backToTop () {
      const timer = setInterval(function () {
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        const ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        this.isTop = true
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 15)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
