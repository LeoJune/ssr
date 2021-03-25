<template>
  <div class="layout">
    <LayoutHeader :isShowBanner="false" />
    <div class="loginBackground">
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
.loginBackground {
  width: 100%;
  background-color: #eeeeee;
  padding-top: 52px;
  padding-bottom: 52px;
}
</style>
