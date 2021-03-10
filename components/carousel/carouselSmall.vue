<template>
  <div class="home-right-plate-small">
    <el-carousel
      :interval="5000"
      arrow="always"
      height="132px"
      indicatorPosition="none"
    >
      <el-carousel-item
        v-for="(item,index) in dataList"
        :key="index"
      >
        <div
          v-for="(jtem,i) in item"
          :key="i"
          class="home-right-plate-item"
        >
          <img
            :src="jtem.pic"
            alt
          />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => { }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.home-right-plate-small {
  width: 100%;

  /deep/.el-carousel__item {
    width: calc(100% - 66px);
    padding: 0 33px;
    display: flex;
    justify-content: space-around;
  }
  .home-right-plate-item {
    width: 210px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 210px;
      max-height: 100%;
      object-fit: cover;
    }
  }
  /deep/.el-carousel__arrow {
    width: 60px;
    height: 60px;
    color: #1487d5;
    background-color: transparent;
    font-size: 60px;
    top: 50%;
  }
  /deep/.el-carousel__arrow--left {
    left: -10px;
  }
  /deep/.el-carousel__arrow--right {
    right: -10px;
  }
}
</style>
