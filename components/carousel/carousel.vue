<template>
  <div class="home-right-plate">
    <div class="home-right-plate-title">
      <div class="title-left">
        <img
          v-if="showIcon"
          :src="titleIcon"
          alt
          class="categroy-icon"
        />
        {{ title }}
      </div>
      <nuxt-link :to="{path:'/secondaryClassification',query:{id:categoryId,name:categoryName}}">
        <!-- this.$router.push({ path: '/secondaryClassification', query: { id, name } }) -->
        <div
          v-if="isShowRight"
          class="title-right"
        >
          查看更多>
        </div>
      </nuxt-link>
    </div>
    <el-carousel
      :interval="4000"
      arrow="always"
      height="440px"
      indicatorPosition="none"
    >
      <el-carousel-item
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div
          v-for="(jtem, i) in item"
          :key="i"
          class="home-right-plate-item"
        >
          <nuxt-link :to="{ path:'/productDetail',query: (item.needStatistics?{id: jtem.productId, flagId: jtem.id}:{id: jtem.productId})}">
            <div class="home-right-plate-item-img">
              <img
                :src="jtem.pic || defaultProductImg"
                alt
              />
            </div>
            <div class="home-right-plate-item-title">
              {{ jtem.name || jtem.productName }}
            </div>
            <div class="home-right-plate-item-info">
              <div class="info-item">品牌：{{ jtem.brandName }}</div>
              <div class="info-item">重量：{{ jtem.weight }}</div>
              <div class="info-item">
                最低起订量：{{ jtem.productMinimumPurchase }}件
              </div>
            </div>
            <div class="home-right-plate-item-price">￥{{ jtem.price }}</div>
          </nuxt-link>
          <button @click.stop="joinCar(jtem)">
            <img
              :src="img"
              alt
            />加入购物车
          </button>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    titleIcon: {
      type: String,
      default: '../assets/images/home-right-new.png'
    },
    dataList: {
      type: null,
      default: []
    },
    categoryId: {
      type: Number,
      default: 0
    },
    categoryName: {
      type: String,
      default: ''
    },
    defaultProductImg: {
      type: String,
      default: ''
    },
    isShowRight: {
      type: Boolean,
      default: true
    },
    needStatistics: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      img: require('../../assets/images/home-left-car.png')
    }
  },
  methods: {
    // 加入购物车
    joinCar (item) {
      if (this.needStatistics) {
        item.needStatistics = true
      }
      this.$emit('joinCar', item)
    }
  }
}
</script>

<style lang="less" scoped>
.home-right-plate {
  width: 100%;
  margin-bottom: 50px;
  cursor: pointer;
  .home-right-plate-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 8px;
    box-sizing: border-box;
    background-color: #1487d5;
    color: #fff;
    border-radius: 4px;
    .title-left {
      font-size: 20px;
      margin-left: 5px;
      img {
        vertical-align: middle;
        max-width: 44px;
        max-height: 30px;
      }
    }
    .title-right {
      width: 144px;
      height: 40px;
      color: #fff;
      font-size: 16px;
      background-color: #116aa7;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        vertical-align: middle;
      }
    }
  }
  /deep/.el-carousel__item {
    width: calc(100% - 66px);
    // width: 280px;
    padding: 0 33px;
    display: flex;
    // justify-content: space-around;
  }
  .home-right-plate-item {
    width: 280px;
    height: 418px; // 398
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-top: 20px;
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
    .home-right-plate-item-img {
      width: 100%;
      height: 174px; //154
      margin-bottom: 13px;
      overflow: hidden;
      img {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
      }
    }
    .home-right-plate-item-title {
      font-size: 18px;
      color: #333;
      font-weight: 400;
      margin-bottom: 15px;
      line-height: 22px;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .home-right-plate-item-info {
      .info-item {
        color: #666;
        font-size: 15px;
        margin-bottom: 10px;
      }
    }
    .home-right-plate-item-price {
      color: #fc303c;
      font-size: 22px;
      padding-top: 5px;
    }
    button {
      width: 100%;
      height: 35px;
      line-height: 35px;
      border-radius: 4px;
      background-color: #00aef3;
      font-size: 16px;
      color: #fff;
      margin-top: 15px;
      cursor: pointer;
      img {
        vertical-align: text-top;
        margin-right: 5px;
      }
    }
  }
  /deep/.el-carousel__arrow {
    width: 60px;
    height: 60px;
    color: #1487d5;
    background-color: transparent;
    font-size: 60px;
    top: 45%;
  }
  /deep/.el-carousel__arrow--left {
    left: -10px;
  }
  /deep/.el-carousel__arrow--right {
    right: -10px;
  }
}
</style>
