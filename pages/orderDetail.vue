<template>
  <div class="nav-wrap">
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="shopping-cart">
      <div class="right-wrap-add">
        <div class="right-wrap adress">
          <div class="content-header">
            <h2>订单详情</h2>
            <span class="short-line"></span>
            <span
              style="cursor: pointer"
              @click="goBack"
            >
              <img
                :src="returnIcon"
                style="transform: translateY(2px)"
              />
              <span> 返回</span>
            </span>
          </div>
          <div class="eqline"></div>
          <div class="steps">
            <div v-if="order.payType === 3">
              <el-steps
                :active="formatStepStatusForPubLic(order)"
                finishStatus="success"
                alignCenter
              >
                <el-step
                  title="提交订单"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[0])
                  "
                ></el-step>
                <el-step
                  title="平台确认"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[1])
                  "
                ></el-step>
                <el-step
                  title="订单支付"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[2])
                  "
                ></el-step>
                <el-step
                  title="订单完成"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[3])
                  "
                ></el-step>
              </el-steps>
            </div>
            <div v-else-if="order.sourceType === 2">
              <el-steps
                :active="formatStepStatusForImport(order)"
                finishStatus="success"
                alignCenter
              >
                <el-step
                  title="后台导入"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[0])
                  "
                ></el-step>
                <el-step
                  title="平台发货"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[1])
                  "
                ></el-step>
                <el-step
                  title="确认收货"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[2])
                  "
                ></el-step>
                <el-step
                  title="订单完成"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[3])
                  "
                ></el-step>
              </el-steps>
            </div>
            <div v-else>
              <el-steps
                :active="formatStepStatus(order)"
                finishStatus="success"
                alignCenter
              >
                <el-step
                  title="提交订单"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[0])
                  "
                ></el-step>
                <el-step
                  title="平台确认"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[1])
                  "
                ></el-step>
                <el-step
                  title="订单支付"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[2])
                  "
                ></el-step>
                <el-step
                  title="平台发货"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[3])
                  "
                ></el-step>
                <el-step
                  title="确认收货"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[4])
                  "
                ></el-step>
                <el-step
                  title="订单完成"
                  :description="
                    formatTimeForStatusList(order.orderStatusList[4])
                  "
                ></el-step>
              </el-steps>
            </div>
          </div>
          <div class="operate-container">
            <span class="">订单状态: {{ order.status | formatOrderStatus }}
              <span
                v-show="order.status === 1"
                class="countDown-wrap"
              >
                <count-down
                  :deadLine="order.countDownTimeStr"
                  :ready="ready"
                ></count-down>
              </span>
            </span>
            <div
              v-if="order.status === 0"
              class="operate-button-container"
            >
              <!-- <el-button size="mini" type="primary">电话咨询</el-button> -->
              <el-button
                size="mini"
                type="primary"
                plain
                @click="cancelOrder"
              >
                取消订单
              </el-button>
            </div>
            <div
              v-else-if="order.status === 1"
              class="operate-button-container"
            >
              <el-button
                size="mini"
                type="primary"
                @click="toPay"
              >
                立即支付
              </el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click="cancelOrder"
              >
                取消订单
              </el-button>
            </div>
            <div
              v-else-if="order.status === 2"
              class="operate-button-container"
            >
              <el-button
                size="mini"
                type="primary"
                @click="showPhone"
              >
                电话咨询
              </el-button>
              <el-button
                size="mini"
                type="primary"
                plain
              >
                确认收货
              </el-button>
            </div>
            <div
              v-else-if="order.status === 3"
              class="operate-button-container"
            >
              <el-button
                size="mini"
                type="primary"
                @click="showPhone"
              >
                电话咨询
              </el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click="toSendMessage"
              >
                我要留言
              </el-button>
            </div>
            <div
              v-else-if="order.status === 4"
              class="operate-button-container"
            >
              <el-button
                size="mini"
                type="primary"
                @click="showPhone"
              >
                电话咨询
              </el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click="confirmReceive"
              >
                确认收货
              </el-button>
            </div>
            <div
              v-else-if="order.status === 5"
              class="operate-button-container"
            >
              <el-button
                size="mini"
                type="primary"
                @click="buyAgain"
              >
                再次购买
              </el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click="deleteOrder"
              >
                删除订单
              </el-button>
            </div>
            <div
              v-else-if="order.status === 6"
              class="operate-button-container"
            >
              <el-button
                size="mini"
                type="primary"
                @click="buyAgain"
              >
                再次购买
              </el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click="deleteOrder"
              >
                删除订单
              </el-button>
            </div>
          </div>
          <div class="content-box">
            <h4
              class="eqtitle"
              style="padding-top: 10px"
            >
              基本信息
            </h4>
            <div class="layout-wrap">
              <div class="table-layout">
                <el-row>
                  <el-col
                    :span="6"
                    class="table-cell mygray"
                  >
                    订单编号
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell"
                  >
                    {{ order.orderSn }}
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell mygray"
                  >
                    收货人
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell"
                  >
                    {{ order.receiverName }}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="6"
                    class="table-cell mygray"
                  >
                    收货地址
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell"
                  >
                    {{ formatReciveAddress(
                    order.receiverProvince,
                    order.receiverCity,
                    order.receiverRegion,
                    order.receiverDetailAddress
                    ) }}
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell mygray"
                  >
                    收货电话
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell"
                  >
                    {{ order.receiverPhone }}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="6"
                    class="table-cell mygray"
                  >
                    我的备注
                  </el-col>
                  <el-col
                    :span="18"
                    class="table-cell"
                  >
                    {{ order.note }}
                  </el-col>
                </el-row>
              </div>
            </div>
            <h4
              v-show="order.status > 3 && order.deliveryCompany"
              class="eqtitle"
            >
              物流信息
            </h4>
            <div
              v-show="order.status > 3 && order.deliveryCompany"
              class="layout-wrap"
            >
              <div class="table-layout">
                <el-row>
                  <el-col
                    :span="6"
                    class="table-cell mygray"
                  >
                    发货时间
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell"
                  >
                    {{ order.deliveryTime }}
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell mygray"
                  >
                    物流公司
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell"
                  >
                    {{ order.deliveryCompany }}
                  </el-col>
                  <!-- | formatDelieryCompany -->
                </el-row>
                <el-row>
                  <el-col
                    :span="6"
                    class="table-cell mygray"
                  >
                    快递单号
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell"
                  >
                    {{ order.deliverySn }}
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell mygray"
                  >
                    商家留言
                  </el-col>
                  <el-col
                    :span="6"
                    class="table-cell"
                  >
                    {{ order.businessMessage }}
                  </el-col>
                </el-row>
              </div>
            </div>
            <h4
              class="eqtitle"
              style="padding-bottom: 10px"
            >
              商品信息
            </h4>
            <el-table
              ref="carTable"
              v-loading="listLoading"
              :data="order.orderItemList"
              :highlightCurrentRow="false"
              style="width: 100%"
              class="mytable"
              border
            >
              <el-table-column
                label="商品图片"
                align="center"
              >
                <template slot-scope="scope">
                  <img
                    :src="scope.row.productPic"
                    alt=""
                    style="height: 80px"
                  />
                </template>
              </el-table-column>
              <el-table-column label="商品信息">
                <template slot-scope="scope">
                  <p>{{ scope.row.productName }}</p>
                  <p>适用机型: {{ scope.row.productApplyType }}</p>
                  <p>件号: {{ scope.row.productSn }}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                align="center"
              >
                <template slot-scope="scope">
                  <p class="">
                    {{ scope.row.productQuantity }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                label="重量"
                align="center"
              >
                <template slot-scope="scope">
                  <p class="">
                    {{ scope.row.weight }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                label="商品总重"
                align="center"
              >
                <template slot-scope="scope">
                  <p class="">
                    {{ scope.row.weight * scope.row.productQuantity }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                label="单价"
                align="center"
              >
                <template slot-scope="scope">
                  <p class="">
                    {{ scope.row.productPrice }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                label="商品总价"
                align="center"
              >
                <template slot-scope="scope">
                  <p class="">
                    {{ dealWithRound(
                    scope.row.productQuantity * scope.row.productPrice
                    ) }}
                  </p>
                </template>
              </el-table-column>
            </el-table>
            <div class="undertable">
              <div class="myflex">
                <span>商品合计：</span>
                <span class="color-danger init-width">￥{{ order.totalAmount }}</span>
              </div>
              <div class="myflex">
                <span>折扣金额：</span>
                <span class="color-danger init-width">￥{{ order.discountAmount }}</span>
              </div>
              <div class="myflex">
                <span>应付款金额：</span>
                <span class="price-color init-width">￥{{ order.realAmount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="phoneDialogVisible"
        width="300px"
      >
        <p class="service-title">客服电话</p>
        <div class="service-line"></div>
        <p class="service-phone">{{ servicePhone }}</p>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import { getOrderDetail, cancelOrder, deleteOrder, confirmReceive, getOrderPayTime, buyAgain } from '@/api/order'
import countDown from '@/components/count-down/countDown'
import userNav from '@/components/user-nav/userNav'
import { formatDate } from '@/utils/date'
export default {
  // name: 'orderDetail',
  components: {
    userNav,
    countDown
  },
  filters: {
    formatOrderStatus (value) {
      if (value === 0) {
        return '待确认'
      } else if (value === 1) {
        return '待支付'
      } else if (value === 2) {
        return '付款待确认'
      } else if (value === 3) {
        return '待发货'
      } else if (value === 4) {
        return '待收货'
      } else if (value === 5) {
        return '已完成'
      } else if (value === 6) {
        return '已取消'
      } else {
        return '无效订单'
      }
    }
  },
  data () {
    return {
      orderId: null,
      nowUserNav: '我的订单',
      order: {
        orderStatusList: []
      },
      countTimer: null,
      leftTime: null,
      orderList: [
        { name: '23', count: 11, price: 123, pic: '', productMinimumPurchase: 10 },
        { name: '123', count: 11, price: 123, pic: '', productMinimumPurchase: 10 },
        { name: 'qeeqe', count: 20, price: 123, pic: '', productMinimumPurchase: 10 },
        { name: '23', count: 11, price: 123, pic: '', productMinimumPurchase: 10 }
      ],
      listLoading: false,
      returnIcon: require('@/assets/images/return.png'),
      total: null,
      phoneDialogVisible: false,
      servicePhone: '027-8590-3199',
      orderPayTime: null,
      ready: false
    }
  },
  mounted () {
    const id = this.$route.query.id

    this.orderId = id
    this.getOrderPayTime().then(() => {
      this.getList(id)
    }, (error) => {
      console.log(error)
    })
  },
  methods: {
    countChange (index, row) {
      console.log(row)
    },
    getList (id) {
      this.$api.getOrderDetail(id).then(res => {
        this.order = res.data
        if (res.data.status === 1) {
          res.data.countDownTimeStr = new Date(this.order.orderStatusList[1].create_time).getTime() + this.orderPayTime * 3600 * 1000
          this.ready = true
        }
      })
    },
    getOrderPayTime () {
      return new Promise((resolve, reject) => {
        this.$api.getOrderPayTime().then(res => {
          this.orderPayTime = res.data.orderPayTime
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    dealWithRound (price) {
      return Math.round(price)
    },
    formatTime (time) {
      if (time == null || time === '') {
        return ''
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatTimeForStatusList (time) {
      if (time === null || time === '' || time === undefined) {
        return ''
      }
      if (time.order_status === 6) {
        return ''
      }
      const date = new Date(time.create_time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    goBack () {
      this.$router.back(-1)
    },
    showPhone () {
      this.phoneDialogVisible = true
    },
    formatStepStatus (order) { // order.status 订单状态
      if (order.status === 1) {
        // 待发货
        return 2
      } else if (order.status === 3) {
        // 已支付
        return 3
      } else if (order.status === 4) {
        // 已完成
        return 4
      } else if (order.status === 5) {
        return 6
      } else if (order.status === 6) {
        return order.orderStatusList.length - 1
      } else {
        // 待付款、已关闭、无限订单
        return 1
      }
    },
    formatStepStatusForPubLic (order) { // order.status 订单状态
      if (order.status === 1) {
        // 待发货
        return 2
      } else if (order.status === 2) {
        // 已支付
        return 2
      } else if (order.status === 5) {
        return 4
      } else if (order.status === 6) {
        return order.orderStatusList.length
      } else {
        // 待付款、已关闭、无限订单
        return 1
      }
    },
    formatStepStatusForImport (order) { // order.status 订单状态 后台导入使用
      if (order.status === 1) {
        return 2
      } else if (order.status === 4) {
        // 待收货
        return 2
      } else if (order.status === 5) {
        return 4
      } else if (order.status === 6) {
        return order.orderStatusList.length
      } else {
        // 待付款、已关闭、无效订单
        return 1
      }
    },
    toSendMessage () {
      this.$router.push('/sendMyMessage')
    },
    toPay () {
      this.$router.push({ path: '/choosePay', query: { id: this.orderId } })
    },
    buyAgain () {
      this.$api.buyAgain(this.orderId).then(res => {
        this.$message({
          type: 'success',
          duration: 2000,
          message: '订单产品已成功加入购物车'
        })
        this.$router.push('/payment')
      })
    },
    cancelOrder () {
      this.$confirm('是否要取消订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.cancelOrder({ orderId: this.orderId }).then(res => {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '取消成功'
          })
          this.$router.push('/myOrder')
        })
      })
    },
    deleteOrder () {
      this.$confirm('是否要删除订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteOrder({ orderId: this.orderId }).then(res => {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '删除成功'
          })
          this.$router.push('/myOrder')
        })
      })
    },
    confirmReceive () {
      this.$confirm('是否要确认收货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.confirmReceive({ orderId: this.orderId }).then(res => {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '收货成功'
          })
          this.$router.push('/myOrder')
        })
      })
    },
    countDown (time, leftTime) {
      if (!time) {
        return ''
      } else {
        const mytime = new Date('2020-8-31 23:59:59')
        const remainTime = mytime.getTime() + 3600 * 24 * 1000 * 7 - new Date().getTime()
        // console.log(remainTime)
        leftTime = remainTime
        this.countTimer = setInterval(() => {
          const day = parseInt(remainTime / (3600 * 24 * 1000))
          let hour = parseInt((remainTime - day * 3600 * 24 * 1000) / 3600 / 1000)
          let min = parseInt((remainTime - day * 3600 * 24 * 1000 - hour * 3600 * 1000) / 60 / 1000)
          let sec = parseInt((remainTime - day * 3600 * 24 * 1000 - hour * 3600 * 1000 - min * 60 * 1000) / 1000)
          if (hour < 10) {
            hour = '0' + hour
          }
          if (min < 10) {
            min = '0' + min
          }
          if (sec < 10) {
            sec = '0' + sec
          }
          if (day === 0) {
            return `${hour}:${min}:${sec}`
          } else {
            return `${day}天 ${hour}:${min}:${sec}`
          }
          // leftTime -= 1000
        }, 1000)
      }
    },
    formatReciveAddress (province, city, region, detailAddress) {
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
.nav-wrap {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  .right-wrap-add {
    width: 962px;
    .right-wrap {
      width: 960px;
      box-sizing: border-box;
      // border: 1px solid #dadada;
      .content-header {
        display: flex;
        // justify-content: space-between;
        border: 1px solid #e6e6e6;
        padding: 17px 16px 8px 16px;
        h2 {
          color: #070707;
          font-size: 20px;
          font-weight: 700;
          // line-height: 37px;
        }
        .short-line {
          margin: 0 20px;
          // color: #e6e6e6;
          height: 37px;
          border-left: 1px solid #e6e6e6;
          transform: translateY(-5px);
        }
      }
      .steps {
        padding-bottom: 10px;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        /deep/ .el-step__head.is-success {
          color: #409eff;
          border-color: #409eff;
        }
        /deep/ .el-step__title.is-success {
          color: #409eff;
        }
        /deep/ .el-step__description.is-success {
          color: #409eff;
        }
      }
      .eqline {
        height: 12px;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
      }
      .operate-container {
        padding: 0 10px;
        background-color: #f4f4f4;
        height: 50px;
        // margin: -20px -20px 0;
        line-height: 50px;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        font-size: 14px;
        color: #606266;
        .countDown-wrap {
          /deep/ div {
            display: inline-block;
          }
        }
        .operate-button-container {
          float: right;
        }
      }
      .eqtitle {
        // line-height: 50px;
        line-height: 40px;
        padding-left: 10px;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        color: #0093e6;
      }
      .layout-wrap {
        padding: 10px;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        .table-layout {
          // margin-top: 20px;
          border-left: 1px solid #dcdfe6;
          border-top: 1px solid #dcdfe6;
          .table-cell {
            height: 60px;
            line-height: 40px;
            border-right: 1px solid #dcdfe6;
            border-bottom: 1px solid #dcdfe6;
            padding: 10px;
            font-size: 14px;
            color: #606266;
            // text-align: center;
            overflow: hidden;
          }
          .mygray {
            background-color: #f4f4f4;
          }
        }
      }
      .undertable {
        border: 1px solid #dcdfe6;
        border-top: none;
        text-align: right;
        line-height: 30px;
        padding: 20px 30px;
        color: #606266;
        .init-width {
          display: inline-block;
          width: 100px;
        }
      }
    }
  }
  .service-title {
    text-align: center;
    line-height: 60px;
    font-size: 18px;
  }
  .service-line {
    height: 0;
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
  }
  .service-phone {
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }
}
</style>
