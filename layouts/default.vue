<template>
  <div class="layout">
    <LayoutHeader />
    <div
      id="core"
      class="core"
    >
      <nuxt />
    </div>
    <LayoutFooter />
  </div>
</template>
<script>
const noScrollArr = ['/', 'index']
export default {
  watch: {
    $route (newer) {
      if (!noScrollArr.includes(newer.name)) {
        console.log('要滚动了')
        // document.getElementById('core').scrollIntoView()
        window.scrollTop(578)
      }
    }
  }
}
</script>

<style lang='less'>
@import "@/assets/font/font.css";
@import "nprogress/nprogress.css"; // 进度条样式

html {
  font-family: Microsoft YaHei !important;
  // scroll-behavior: smooth;
}
#app {
  // font-family: Microsoft YaHei !important;
  // font-family: mFont !important;
}
body {
  width: 100%;
  overflow-x: hidden;
}
.core {
  width: 1280px;
  margin: 0 auto;
}
.borderBox {
  box-sizing: border-box;
}
.angle {
  width: 18px;
  height: 10px;
}
.price-color {
  color: #e73b57;
}
.normal-blue {
  color: #0093e6;
}
</style>
