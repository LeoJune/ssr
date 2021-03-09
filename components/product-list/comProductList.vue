<template>
  <div class="secondary-right-list">
    <div class="list-title">
      <span :class="{ active: isActiveSort === 0 }" @click="changeSort(0)"
        >综合</span
      >
      <!-- <span :class="{'span-active':isActiveSort==1}" @click="changeSort(1)">
        降序
        <img :src="sortIconDescend" alt />
      </span>
      <span :class="{'span-active':isActiveSort==2}" @click="changeSort(2)">
        升序
        <img :src="sortIconAscend" alt />
      </span>-->
      <span class="price-sort" :class="checkActive" @click="changeSort(1)"
        >价格</span
      >
    </div>
    <div class="list-item" v-for="(item, index) in commodityList" :key="index">
      <div
        class="list-item-img"
        @click="goDetail(item)"
        style="cursor: pointer"
      >
        <img :src="item.pic" alt />
      </div>
      <div
        class="list-item-content"
        @click="goDetail(item)"
        style="cursor: pointer"
      >
        <div class="list-item-desc">
          <div class="list-item-desc-name">
            {{
              (item.brandName ? item.brandName : "") +
              " " +
              (item.name ? item.name : "") +
              " " +
              (item.productModel ? item.productModel : "")
            }}
          </div>
          <div class="list-item-desc-info">
            适用机型：{{ item.productApplyType }}
          </div>
          <div class="list-item-desc-info">
            件号：{{ item.displayProductSn }}
          </div>
          <div class="list-item-desc-info">品质：{{ item.productQuality }}</div>
          <div class="list-item-desc-info">重量：{{ item.weight }}kg</div>
          <!-- <div class="list-item-desc-info">状态：{{ item.status }}</div> -->
        </div>
        <div class="list-item-collect" @click.stop="collect(item)">
          <div :class="item.productCollectStatus === 1 ? 'active-collect' : ''">
            <img
              :src="
                item.productCollectStatus === 1
                  ? collectIconActive
                  : collectIcon
              "
            />收藏
          </div>
        </div>
      </div>
      <div class="list-item-join">
        <div class="list-item-join-price">单价：￥{{ item.price }}</div>
        <div class="list-item-join-car">
          <el-input-number
            v-model="item.quantity"
            :min="item.productMinimumPurchase"
            :max="10000"
            label="请输入数量"
            size="medium"
            :step="1"
            :step-strictly="true"
          ></el-input-number>
          <div class="item-car" @click.stop="joinCart(item)">加入购物车</div>
        </div>
        <div class="list-item-join-min">
          最低起订量：{{ item.productMinimumPurchase }}件
        </div>
      </div>
    </div>
    <div class="nodata" v-if="!commodityList.length">
      <p>暂无数据</p>
    </div>
    <Pagination
      :current_page.sync="currentPage"
      :page_size.sync="pageSize"
      :total.sync="total"
      @changeCurrent="changeCurrent"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination.vue'
import { mapGetters } from 'vuex'
import { productCollect } from '@/api/product'
// const down = require('@/assets/images/secondary-down.png')
// const downActive = require('@/assets/images/secondary-active-sort1.png')
// const up = require('@/assets/images/secondary-up.png')
// const upActive = require('@/assets/images/secondary-active-sort2.png')
export default {
  name: 'comProductList',
  components: {
    Pagination
  },
  props: {
    commodityList: {
      type: Array,
      default: () => { }
    },
    pageSize: {
      type: Number,
      default: 5
    },
    total: {
      type: Number,
      default: 300
    }
  },
  created () {
  },
  watch: {
    commodityList: function () {
      this.quantity = []
      // console.log(this.commodityList)
      if (this.commodityList) {
        this.commodityList.map(v => {
          this.quantity.push(v.productMinimumPurchase)
        })
      }
    }
  },
  data () {
    return {
      isActiveSort: 0,
      collectIcon: require('@/assets/images/secondary-desc-1.png'),
      collectIconActive: require('@/assets/images/secondary-desc-2.png'),
      currentPage: 1,
      quantity: []
    }
  },
  computed: {
    checkActive: function () {
      if (this.isActiveSort === 1) {
        return 'active up'
      } else if (this.isActiveSort === 2) {
        return 'active down'
      } else {
        return ''
      }
    },
    ...mapGetters([
      'hasLogin'
    ])
  },
  methods: {
    // 点击排序
    changeSort (i) {
      if (i === 0) {
        this.isActiveSort = 0 // 0代表综合排序
      } else {
        if (this.isActiveSort === 1) {
          this.isActiveSort = 2 // 2自然就代表降序
        } else {
          this.isActiveSort = 1 // 既然第一下点击要求升序,那么1就代表升序
        }
      }
      this.$emit('sortChange', this.isActiveSort)
    },
    // 点击收藏
    collect (item) {
      // 应该传输收藏状态和id，但是接口未定义所以传递item
      // this.$emit('collectStatusChange', item)
      if (!this.hasLogin) {
        this.$message.warning('请先登录')
        this.$router.push('/login/loginIndex')
      } else {
        if (item.productCollectStatus === 1) {
          console.log('quxiao')
          item.productCollectStatus = 0
          productCollect(item).then(res => {
            this.$message({
              type: 'success',
              duration: 1000,
              message: '取消收藏成功'
            })
          })
        } else {
          console.log('shoucang')
          item.productCollectStatus = 1
          productCollect(item).then(res => {
            this.$message({
              type: 'success',
              duration: 1000,
              message: '收藏成功'
            })
          })
        }
      }
    },
    // 计步器数量改变
    handleChange (value) {
      //   console.log(value);
    },
    // 加入购物车
    joinCart (item) {
      this.$emit('joinCart', item)
    },
    // 分页器
    changeCurrent (value) {
      //   console.log("当前页", value);
      this.$emit('changeCurrent', value)
    },
    // 点击每个
    goDetail (item) {
      this.$emit('goDetail', item)
    }
  }
}
</script>

<style lang="less" scoped>
.secondary-right-list {
  width: 100%;
  .list-title {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: #f1f1f1;
    border-radius: 4px;
    span {
      display: inline-block;
      padding: 0 20px;
      line-height: 45px;
      color: #666;
      cursor: pointer;
      &.active {
        background-color: #0193e6;
        color: #fff;
      }
      &.down {
        &:after {
          border-top-color: #fff;
        }
      }
      &.up {
        &:before {
          border-bottom-color: #fff;
        }
      }
      img {
        vertical-align: middle;
        margin-left: 10px;
      }
      &:nth-child(1) {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }
    .price-sort {
      position: relative;
      padding-right: 30px;
      &:before {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #666;
        position: absolute;
        right: 10px;
        top: 8px;
      }
      &:after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-top-color: #666;
        position: absolute;
        right: 10px;
        bottom: 8px;
      }
    }
  }
  .list-item {
    width: 100%;
    height: 205px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    margin-top: 18px;
    margin-bottom: 25px;
    display: flex;

    .list-item-img {
      width: 203px;
      height: 100%;
      overflow: hidden;
      border-right: 1px solid #e6e6e6;
      border-radius: 4px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        margin-left: 50%;
        margin-top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .list-item-content {
      flex: 1;
      background-color: #f9fdff;
      display: flex;
      justify-content: space-between;
      padding: 30px 20px 0 50px;
      box-sizing: border-box;
      .list-item-desc {
        .list-item-desc-name {
          font-size: 18px;
          margin-bottom: 15px;
        }
        .list-item-desc-info {
          font-size: 14px;
          color: #666;
          font-weight: 500;
          margin-bottom: 10px;
        }
      }
      .list-item-collect {
        width: 70px;
        cursor: pointer;
        div {
          width: 70px;
          height: 40px;
          border: 1px solid #c8c9cd;
          box-sizing: border-box;
          font-size: 14px;
          color: #666;
          line-height: 38px;
          text-align: center;
          border-radius: 4px;
        }
        .active-collect {
          background-color: #ff9900;
          color: #fff;
          border: none;
        }
        img {
          vertical-align: text-top;
          margin-right: 5px;
        }
      }
    }
    .list-item-join {
      width: 210px;
      padding: 60px 0 0 10px;
      box-sizing: border-box;
      border-left: 1px solid #e6e6e6;
      .list-item-join-price {
        font-size: 20px;
        font-weight: 500;
        color: #fc303c;
        margin-bottom: 15px;
      }
      .list-item-join-car {
        display: flex;
        margin-bottom: 15px;
        cursor: pointer;
        /deep/.el-input-number__increase,
        /deep/.el-input-number__decrease {
          width: 20px;
          background-color: transparent;
        }
        /deep/.el-input-number--medium .el-input__inner {
          padding: 0 20px;
        }
        /deep/.el-input__inner {
          border-radius: 4px 0 0 4px;
        }
        /deep/.el-input-number--medium {
          width: 100px;
        }
        .item-car {
          width: 90px;
          height: 34px;
          line-height: 36px;
          font-size: 14px;
          color: #676767;
          border-radius: 0 4px 4px 0;
          text-align: center;
          border: 1px solid #dcdfe6;
          border-left: none;
        }
      }
      .list-item-join-min {
        font-size: 14px;
        font-weight: 500;
        color: #666;
      }
    }
  }
  .nodata {
    height: 80px;
    text-align: center;
    line-height: 80px;
  }
}
</style>
