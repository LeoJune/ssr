<template>
  <div class="frontendCount">支付倒计时: {{ time }}</div>
</template>
<script>
export default {
  name: 'countDownInList',
  props: {
    deadLine: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      count: null,
      interval: null
    }
  },
  computed: {
    time () {
      if (this.count === null || this.count === undefined || isNaN(this.count)) {
        return ''
      }
      // let day = parseInt(this.count / (3600 * 24 * 1000))
      // let hour = parseInt((this.count - day * 3600 * 24 * 1000) / 3600 / 1000)
      // let min = parseInt((this.count - day * 3600 * 24 * 1000 - hour * 3600 * 1000) / 60 / 1000)
      // let sec = parseInt((this.count - day * 3600 * 24 * 1000 - hour * 3600 * 1000 - min * 60 * 1000) / 1000)
      let hour = parseInt(this.count / 3600 / 1000)
      let min = parseInt((this.count - hour * 3600 * 1000) / 60 / 1000)
      let sec = parseInt((this.count - hour * 3600 * 1000 - min * 60 * 1000) / 1000)
      if (hour < 10) {
        hour = '0' + hour
      }
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      return `${hour}:${min}:${sec}`
    }
  },
  created () {
    console.log('lailema ')
    this.count =
      this.deadLine - Date.now() > 0 ? this.deadLine - Date.now() : 0
    this.interval = setInterval(() => {
      this.count = this.count - 1000
      if (this.count <= 0) {
        this.count = 0
        clearInterval(this.interval)
      }
    }, 1000)
  }
}
</script>
<style scoped>
.frontendCount {
  font-size: 14px;
  color: #0094e6;
}
</style>
