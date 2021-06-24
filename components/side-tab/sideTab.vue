<template>
  <div class="secondary-left">
    <ul class="secondary-left-tab">
      <nuxt-link v-for="(item, index) in tabList" :key="index" :to="{ path: '/secondaryClassification', query: { id: item.id, name: item.name } }">
        <li :class="{'li-active': activeTab == item.id || activeTab == item.itemId,}">
          {{ item.name || item.itemName }}
        </li>
      </nuxt-link>
    </ul>
    <div class="secondary-left-hot">
      <div class="secondary-left-hot-title">全部热销商品</div>
      <nuxt-link v-for="(item, index) in hotList" :key="index" :to="{ path: '/productDetail', query: { id: item.productId, flagId: item.id } }">
        <div class="secondary-left-hot-item">
          <div class="item-img">
            <img :src="item.pic || item.defaultProductImg" :alt="item.productName" />
          </div>
          <div class="item-name" :title="(item.brandName ? item.brandName : '') + ' ' + (item.productName ? item.productName : '') + ' ' + (item.productSn ? item.productSn : '') + ' ' + (item.productOldNumber ? '/' + item.productOldNumber : '')">{{
            (item.brandName ? item.brandName : "") +
            " " +
            (item.productName ? item.productName : "") +
            " " +
            (item.productSn ? item.productSn : "") +
            " " +
            (item.productOldNumber ? '/' + item.productOldNumber : "")
            }}</div>
          <div class="item-price">单价：￥{{ item.price }}</div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: () => []
    },
    hotList: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: String,
      default: ''
    }
    // brandTab: Boolean
  },
  data () {
    return {

    }
  },
  methods: {
    toJump (item) {
      // if (this.brandTab) {
      //   this.$router.push({ path: '/productList', query: { id: item.itemId, brandTab: true } })
      // } else {
      //   this.$router.push({ path: '/secondaryClassification', query: { id: item.id, name: item.name } })
      // }
      this.$router.push({ path: '/secondaryClassification', query: { id: item.id, name: item.name } })
    },
    toDetail (item) {
      this.$router.push({ path: '/productDetail', query: { id: item.productId, flagId: item.id } })
    }
  }
}
</script>

<style lang="less" scoped>
.secondary-left {
  width: 280px;
  .secondary-left-tab {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    margin-bottom: 20px;
    border-radius: 4px;
    li {
      height: 44px;
      line-height: 44px;
      border-bottom: 1px solid #d9d9d9;
      padding: 0 0 0 45px;
      color: #666;
      cursor: pointer;
      // &:first-child {
      //   border-top-left-radius: 4px;
      //   border-top-right-radius: 4px;
      // }
      // &:last-child {
      //   border: none;
      //   border-bottom-left-radius: 4px;
      //   border-bottom-right-radius: 4px;
      // }
    }
    a:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    a:last-child {
      border: none;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      li {
        border-bottom: none;
      }
    }
    .li-active {
      background-color: #0193e6;
      color: #fff;
    }
  }
  .secondary-left-hot {
    width: 100%;
    border: 1px solid #d9d9d9;
    border-top: none;
    border-radius: 4px;
    .secondary-left-hot-title {
      height: 40px;
      line-height: 40px;
      border-top: 4px solid #0193e6;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      color: #666;
      background-color: #f7f7f7;
    }
    .secondary-left-hot-item {
      width: 100%;
      height: 300px;
      box-sizing: border-box;
      padding: 10px;
      text-align: center;
      border-top: 1px solid #d9d9d9;
      cursor: pointer;
      .item-img {
        width: 100%;
        height: 194px;
        margin-bottom: 13px;
        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
          margin-left: 50%;
          // margin-top: 40%;
          transform: translateX(-50%);
        }
      }
      .item-name {
        font-size: 18px;
        font-weight: 500;
        // margin-top: -10px;
        color: #333;
        margin-bottom: 12px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
      }
      .item-price {
        font-size: 16px;
        font-weight: 500;
        color: #fc303c;
      }
    }
  }
}
</style>
