<template>
  <div class="shopping-cart">
    <div class="right-wrap-add">
      <div class="steps">
        <span>我的购物车</span>
        <span>收货地址</span>
        <span>订单确认</span>
        <span class="active">支付方式</span>
      </div>
      <div class="right-wrap adress">
        <div class="content-header">
          <h2>订单支付</h2>
        </div>
        <div class="content-box">
          <el-table
            ref="carTable"
            v-loading="listLoading"
            class="mytable"
            :data="carList"
            style="width: 100%"
            :highlightCurrentRow="false"
          >
            <el-table-column label="商品信息">
              <template slot-scope="scope">
                <div class="img-wrap">
                  <div class="img-box">
                    <img
                      class="item-img"
                      :src="scope.row.productPic"
                    />
                  </div>
                  <p class="mytext">
                    <span>{{ scope.row.productName }}</span>
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="商品数量"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                <div class="count-input">
                  <el-input-number
                    v-model="scope.row.productQuantity"
                    :min="scope.row.productMinimumPurchase"
                    :max="10000"
                    size="medium"
                    :step="1"
                    :stepStrictly="true"
                    :disabled="true"
                    @change="countChange(scope.$index, scope.row)"
                  ></el-input-number>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="商品价格"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <p class="price-color myprice">
                  {{ scope.row.price || scope.row.productPrice }}元
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div class="address-wrap">
            <h2>收货地址</h2>
            <p>
              {{
              formatAddress(
              order.receiverProvince,
              order.receiverCity,
              order.receiverRegion,
              order.receiverDetailAddress
              )
              }}
            </p>
            <p>收货人：{{ order.receiverName }}</p>
            <p>联系方式：{{ order.receiverPhone }}</p>
          </div>
          <div class="payway-wrap">
            <h2>选择支付方式</h2>
            <p>在线支付</p>
            <div class="online-wrap">
              <div
                class="way-item"
                :class="nowPayWay === 2 ? 'active' : ''"
                @click="payWay(2)"
              >
                <img
                  :src="zhifuIco1"
                  alt
                />
                <!-- weixin -->
              </div>
              <div
                class="way-item"
                :class="nowPayWay === 1 ? 'active' : ''"
                @click="payWay(1)"
              >
                <img
                  :src="zhifuIco2"
                  alt
                />
                <!-- zhifubao -->
              </div>
            </div>
            <p>对公付款</p>
            <div class="online-wrap">
              <div
                class="way-item"
                :class="nowPayWay === 3 ? 'active' : ''"
                @click="payWay(3)"
              >
                使用对公付款
              </div>
            </div>
          </div>
          <div class="total-wrap">
            <span>使用对公付款，将由工作人员联系您进行线下结算</span>
            <span>
              <span>应付金额：</span>
              <span class="price-color">¥{{ order.realAmount }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="botton-wrap">
        <!-- <div class @click="handlePrev">上一步</div> -->
        <div
          class="sure"
          @click="handleFinalStep"
        >
          去支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // name: 'payWay',
  components: {
  },
  props: {
    carList: {
      type: Array,
      default: () => []
    },
    // selectAddress: {},
    nowPayWay: {
      type: Number,
      default: 0
    },
    order: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      // nowPayWay: 0, // 支付方式 0未支付 1支付宝 2微信 3对公
      zhifuIco1: require('@/assets/images/settlement-zhifub1.png'),
      zhifuIco2: require('@/assets/images/settlement-zhifu2.png'),
      // carList: [
      //   { name: '23', count: 11, price: 123, pic: '', productMinimumPurchase: 10 },
      // ],
      // selectAddress: {},
      listLoading: false
    }
  },
  computed: {
    // totalMoney: function () {
    //   let totalMoney = 0
    //   if (this.carList.length === 0) {
    //     return 0
    //   }
    //   for (let i = 0; i < this.carList.length; i++) {
    //     totalMoney += this.carList[i].quantity * this.carList[i].price
    //   }
    //   return totalMoney
    // }
  },
  methods: {
    handleFinalStep () {
      this.$emit('finalStep')
    },
    handlePrev () {
      this.$emit('prevStep')
    },
    payWay (num) {
      this.$emit('payWayChange', num)
      // switch (num) {
      //   case 1:
      //     this.nowPayWay = 1
      //     console.log('use zhifubao')
      //     break
      //   case 2:
      //     this.nowPayWay = 2
      //     console.log('use weixin')
      //     break
      //   case 3:
      //     this.nowPayWay = 3
      //     console.log('use duigong')
      //     break
      //   default:
      //     this.nowPayWay = null
      //     console.log('payway error')
      // }
    },
    formatAddress (province, city, region, detailAddress) {
      let finalAddress = ''
      if (province === '北京' || province === '上海' || province === '天津' || province === '重庆') {
        finalAddress = province
      } else {
        finalAddress = province + '省'
      }
      if (city === '县') {
        finalAddress += ''
      } else {
        finalAddress += city
      }
      finalAddress += region
      finalAddress += detailAddress
      return finalAddress
    }
  }
}
</script>

<style lang="less" scoped>
.shopping-cart {
  width: 962px;
  .right-wrap-add {
    width: 962px;
    .steps {
      display: flex;
      height: 45px;
      // align-items: center;
      text-align: center;
      margin-bottom: 14px;
      span {
        width: 240px;
        height: 45px;
        line-height: 45px;
        font-size: 16px;
        background-color: #f1f1f1;
        &.active {
          background-color: #0093e6;
          color: #fff;
        }
      }
    }
    .right-wrap {
      width: 960px;
      box-sizing: border-box;
      border: 1px solid #dadada;
      .content-header {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        padding: 20px 16px;
        h2 {
          color: #070707;
          font-size: 20px;
          font-weight: 700;
        }
      }
      .content-box {
        padding: 16px;
        .mytable {
          border: none;
          /deep/.el-table__header th {
            // background-color: #e6e6e6;
            color: #0093e6;
          }
          /deep/ td {
            border: none !important;
          }
          /deep/ th {
            border: none !important;
          }
          /deep/ tr:hover > td {
            background-color: #fff !important;
          }
          .mytext {
            color: #333333;
          }
          .myprice {
            // color: #e31939;
            font-size: 18px;
          }
          .mybotton {
            color: #333333;
          }
          .count-input {
            // display: flex;
            // margin-bottom: 15px;
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
            /deep/ .el-input.is-disabled .el-input__inner {
              color: #000;
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
          .img-wrap {
            display: flex;
            // padding: 0 10px;
            .img-box {
              width: 102px;
              height: 100px;
              margin-right: 10px;
              .item-img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
            .mytext {
              width: 360px;
              color: #333333;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
        }
        .address-wrap {
          padding: 27px 0;
          line-height: 36px;
          font-size: 16px;
          border-bottom: 1px solid #ebeef5;
          h2 {
            font-size: 20px;
            margin-bottom: 12px;
          }
          p {
            color: #666666;
          }
        }
        .payway-wrap {
          padding: 27px 0;
          font-size: 16px;
          h2 {
            font-size: 20px;
            margin-bottom: 12px;
          }
          p {
            margin: 30px 0;
            color: #666666;
          }
          .online-wrap {
            overflow: hidden;
            font-size: 26px;
            text-align: center;
            div {
              width: 281px;
              height: 86px;
              line-height: 86px;
              float: left;
              border: 1px solid #dadada;
              margin-right: 26px;
              color: #666666;
              position: relative;
              cursor: pointer;
              &.active {
                border-color: #0093e6;
              }
              img {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
              }
            }
          }
        }
        .total-wrap {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          color: #666666;
          padding: 0 68px 10px 0;
          .price-color {
            font-size: 20px;
          }
        }
      }
    }
    .botton-wrap {
      margin-top: 27px;
      // display: flex;
      // justify-content: space-between;
      div {
        width: 168px;
        height: 45px;
        line-height: 45px;
        float: right;
        color: #ffffff;
        background-color: #0093e6;
        text-align: center;
        cursor: pointer;
        &.sure {
          background-color: #e4393c;
        }
      }
    }
  }
}
</style>
