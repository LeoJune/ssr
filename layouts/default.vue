<template>
  <div class="layout">
    <LayoutHeader />
    <div class="core">
      <nuxt />
    </div>
    <LayoutFooter />
  </div>
</template>
<script>
export default {
}
</script>

<style lang='less'>
@import "@/assets/font/font.css";

html {
  font-family: Microsoft YaHei !important;
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
