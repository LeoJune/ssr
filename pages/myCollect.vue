<template>
  <div class="nav-wrap">
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="websiteLetter">
      <div class="websiteLetter-top">
        <div class="left">
          <div class="websiteLetter-top-title">我的收藏</div>
          <div class="websiteLetter-top-read">
            {{ collectList.length }}件商品
          </div>
        </div>
        <div class="right">
          <input
            v-model="listQuery.keyword"
            type="text"
            placeholder="请输入产品名称 品牌 型号"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch">
            <img
              src="@/assets/images/header-search.png"
              alt
            />搜索
          </button>
        </div>
      </div>
      <div class="websiteLetter-line"></div>
      <div class="form-title">
        <span class="in-title">商品信息</span>
      </div>
      <ul
        v-loading="listLoading"
        class="list-wrap"
        :class="collectList.length === 0 ? 'nodata' : ''"
      >
        <li
          v-for="(item, index) in collectList"
          :key="index"
          class="list-item"
        >
          <img
            :src="item.productPic"
            class="product-img"
            @click="toDetail(item.id)"
          />
          <div class="baseInfo-wrap">
            <p class="info-title">{{ item.productName }}</p>
            <p class="info-text">品牌: {{ item.brandName }}</p>
            <p class="info-text">重量: {{ item.weight }}Kg</p>
            <p class="info-text">
              最低起订量: {{ item.productMinimumPurchase }}
            </p>
          </div>
          <div class="price-wrap">
            <p class="price-title">单价</p>
            <p class="price-text myred">{{ item.productPrice }}元</p>
          </div>
          <div class="button-wrap">
            <div
              class="eq-button"
              @click="cancelCollect(item)"
            >
              取消收藏
            </div>
            <div
              class="eq-button"
              @click="joinCart(item)"
            >
              加购物车
            </div>
          </div>
        </li>
      </ul>
      <div
        v-show="!collectList.length"
        class="noData"
      >
        暂无收藏商品，快去逛逛吧！
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import userNav from '@/components/user-nav/userNav'
// import { getCollectList, deleteCollect } from '@/api/product'
// import { formatDate } from '@/utils/date'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
}
export default {
  // name: 'myCollect',
  components: {
    userNav
  },
  data () {
    return {
      listLoading: false,
      nowUserNav: '我的收藏',
      total: 12,
      info: {
        unread: 3,
        read: 10
      },
      collectList: [],
      listQuery: Object.assign({}, defaultListQuery)
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      this.$api.getCollectList(this.listQuery).then(res => {
        for (let i = 0; i < res.data.list.length; i++) { // 加入购物车需要的三个属性
          res.data.list[i].quantity = res.data.list[i].productMinimumPurchase || 1 // 只需要一个quantity
          //   res.data.list[i].productPic = res.data.list[i].pic
          //   res.data.list[i].productName = res.data.list[i].name
          res.data.list[i].price = res.data.list[i].productPrice // 收藏需要的属性
        }
        this.listLoading = false
        this.collectList = res.data.list
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleSearch () {
      this.getList()
    },
    currentChange (value) {
      this.listQuery.pageSize = value
      this.getList()
    },
    joinCart (item) {
      this.$store.dispatch('cart/AddGood', item).then(res => {
        this.$message({
          type: 'success',
          duration: 1000,
          message: '加入成功'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    toDetail (id) {
      this.$router.push({ path: '/productDetail', query: { id } })
    },
    cancelCollect (item) {
      this.$api.deleteCollect({ productId: item.productId }).then(res => {
        this.$message({
          type: 'success',
          duration: 1000,
          message: '取消收藏成功'
        })
        this.getList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  .websiteLetter {
    width: 960px;
    border: 1px solid #e1e1e1;
    border-radius: 4px 4px 0 0;
    .websiteLetter-top {
      width: 100%;
      height: 58px;
      border-bottom: 1px solid #e1e1e1;
      // border: 1px solid #e1e1e1;
      // border-radius: 4px 4px 0 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        .websiteLetter-top-title {
          margin: 10px 0;
          width: 120px;
          line-height: 38px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #343434;
          border-right: 1px solid #e1e1e1;
        }
        .websiteLetter-top-read {
          color: #e43a3c;
          cursor: pointer;
          font-size: 16px;
          padding: 0 10px;
          line-height: 58px;
          &.active {
            color: #1488d6;
          }
        }
      }
      .right {
        margin-right: 7px;
        display: flex;
        align-items: center;
        /deep/input {
          display: block;
          width: 327px;
          height: 44px;
          line-height: 44px;
          border: #1487d5 solid 1px;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          padding: 0 20px;
          box-sizing: border-box;
          font-size: 14px;
          color: #9a9a9a;
        }
        input::-webkit-input-placeholder {
          color: #9a9a9a;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #9a9a9a;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #9a9a9a;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #9a9a9a;
        }
        button {
          display: block;
          width: 100px;
          height: 44px;
          background-color: #1487d5;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(254, 254, 254, 1);
          cursor: pointer;
          img {
            width: 16px;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
        .websiteLetter-top-send {
          width: 144px;
          text-align: center;
          border-radius: 4px;
          margin-left: 20px;
          margin-right: 18px;
        }
      }
    }
    .websiteLetter-line {
      width: 100%;
      height: 10px;
      // border-left: 1px solid #e1e1e1;
      // border-right: 1px solid #e1e1e1;
      box-sizing: border-box;
    }
    /deep/.list-pagination {
      margin-top: 23px;
    }
    .form-title {
      width: 100%;
      height: 45px;
      line-height: 45px;
      background-color: #f1f1f1;
      .in-title {
        display: inline-block;
        width: 160px;
        text-align: center;
        background-color: #0094e6;
        color: #fff;
        font-size: 16px;
        text-align: center;
      }
    }
    .list-wrap {
      width: 100%;
      // min-height: 350px;
      box-sizing: border-box;
      &.nodata {
        height: 350px;
      }
      .list-item {
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #dadada;
        &:last-child {
          border-bottom: none;
        }
        .product-img {
          width: 102px;
          height: 100px;
          object-fit: cover;
          margin-right: 20px;
          cursor: pointer;
        }
        .baseInfo-wrap {
          width: 380px;
          color: #666666;
          font-size: 16px;
          .info-title {
            font-size: 18px;
            color: #343434;
            margin-bottom: 12px;
          }
          .info-text {
            margin-top: 10px;
          }
        }
        .price-wrap {
          width: 150px;
          margin-right: 150px;
          display: flex;
          text-align: center;
          flex-direction: column;
          justify-content: space-between;
          .price-title {
            font-size: 18px;
            color: #343434;
          }
          .price-text {
            font-size: 18px;
            color: #e41a3a;
            margin-bottom: 10px;
          }
        }
        .button-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 10px 0;
          .eq-button {
            padding: 5px 15px;
            color: #0094e6;
            border: 1px solid #0094e6;
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
    }
    .noData {
      text-align: center;
      color: #9a9a9a;
      font-size: 16px;
      // margin-top: 150px;
      transform: translateY(-180px);
    }
  }
}
</style>
