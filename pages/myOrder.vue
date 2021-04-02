<template>
  <div
    v-loading.fullscreen.lock="pageLoading"
    class="nav-wrap"
  >
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="shopping-cart">
      <div class="right-wrap-add">
        <div class="right-wrap adress">
          <div class="content-header">
            <div class="left">
              <h2>我的订单</h2>
              <span class="short-line"></span>
            </div>
            <div
              v-if="listQuery.status === -1"
              class="right"
            >
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
          <div class="eqline"></div>
          <div class="steps">
            <span
              :class="listQuery.status === 0 ? 'active' : ''"
              @click="handleSearch(0)"
            >待确认</span>
            <span
              :class="listQuery.status === 1 ? 'active' : ''"
              @click="handleSearch(1)"
            >待付款</span>
            <span
              :class="listQuery.status === 3 ? 'active' : ''"
              @click="handleSearch(3)"
            >待发货</span>
            <span
              :class="listQuery.status === 4 ? 'active' : ''"
              @click="handleSearch(4)"
            >待收货</span>
            <span
              :class="listQuery.status === 5 ? 'active' : ''"
              @click="handleSearch(5)"
            >已完成</span>
            <span
              :class="listQuery.status === 6 ? 'active' : ''"
              @click="handleSearch(6)"
            >已取消</span>
            <span
              :class="listQuery.status === -1 ? 'active' : ''"
              @click="handleSearch(-1)"
            >历史订单</span>
          </div>
          <div class="eqline"></div>
          <div class="content-box">
            <el-table
              ref="carTable"
              v-loading="listLoading"
              :data="orderList"
              :highlightCurrentRow="false"
              style="width: 100%"
              class="mytable"
              border
            >
              <el-table-column
                label="订单编号"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="toDetail(scope.row.id)"
                  >
                    {{ scope.row.orderSn }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="数量"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.totalQuantity }}
                </template>
              </el-table-column>
              <el-table-column
                label="订单总重"
                align="center"
              >
                <template slot-scope="scope">
                  <p class="">{{ scope.row.totalWeight }}kg</p>
                </template>
              </el-table-column>
              <el-table-column
                label="订单总金额"
                align="center"
              >
                <template slot-scope="scope">
                  <p class="">¥{{ scope.row.realAmount }}</p>
                </template>
              </el-table-column>
              <el-table-column
                v-if="listQuery.status === -1 || listQuery.status === 1"
                label="订单状态"
                align="center"
              >
                <template slot-scope="scope">
                  <p class="">{{ scope.row.status | formatStatus }}</p>
                  <p v-if="scope.row.status === 1">
                    <count-down-in-list :deadLine="scope.row.countDownTimeStr"></count-down-in-list>
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.status === 0">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="cancelOrder(scope.row.id)"
                    >
                      取消订单
                    </el-button>
                  </div>
                  <div v-else-if="scope.row.status === 1">
                    <p>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="toPay(scope.row.id)"
                      >
                        立即支付
                      </el-button>
                    </p>
                    <p style="margin-top: 6px">
                      <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="cancelOrder(scope.row.id)"
                      >
                        取消订单
                      </el-button>
                    </p>
                  </div>
                  <div v-else-if="scope.row.status === 2">
                    <p>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="showPhone"
                      >
                        电话咨询
                      </el-button>
                    </p>
                    <p style="margin-top: 6px">
                      <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="toSendMessage"
                      >
                        我要留言
                      </el-button>
                    </p>
                  </div>
                  <div v-else-if="scope.row.status === 3">
                    <p>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="showPhone"
                      >
                        电话咨询
                      </el-button>
                    </p>
                    <p style="margin-top: 6px">
                      <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="toSendMessage"
                      >
                        我要留言
                      </el-button>
                    </p>
                  </div>
                  <div v-else-if="scope.row.status === 4">
                    <p>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="showPhone"
                      >
                        电话咨询
                      </el-button>
                    </p>
                    <p style="margin-top: 6px">
                      <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="confirmReceive(scope.row.id)"
                      >
                        确认收货
                      </el-button>
                    </p>
                  </div>
                  <div v-else-if="scope.row.status === 5">
                    <p>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="buyAgain(scope.row.id)"
                      >
                        再次购买
                      </el-button>
                    </p>
                    <p style="margin-top: 6px">
                      <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="deleteOrder(scope.row.id)"
                      >
                        删除订单
                      </el-button>
                    </p>
                  </div>
                  <div v-else-if="scope.row.status === 6">
                    <p>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="buyAgain(scope.row.id)"
                      >
                        再次购买
                      </el-button>
                    </p>
                    <p style="margin-top: 6px">
                      <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="deleteOrder(scope.row.id)"
                      >
                        删除订单
                      </el-button>
                    </p>
                  </div>
                  <div v-else-if="scope.row.status === 7">
                    <p>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="buyAgain(scope.row.id)"
                      >
                        再次购买
                      </el-button>
                    </p>
                    <p style="margin-top: 6px">
                      <el-button
                        size="mini"
                        type="primary"
                        plain
                        @click="deleteOrder(scope.row.id)"
                      >
                        删除订单
                      </el-button>
                    </p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div
          class="pagination-container"
          style="text-align: center; margintop: 35px"
        >
          <el-pagination
            background
            layout="prev, pager, next"
            :pageSize="listQuery.pageSize"
            :currentPage.sync="listQuery.pageNum"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
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
// import { getOrderList, deleteOrder, cancelOrder, confirmReceive, getOrderPayTime, buyAgain } from '@/api/order'
import userNav from '@/components/user-nav/userNav'
import countDownInList from '@/components/count-down/countDownInList'
const defaultListQuery = {
  status: 0,
  pageSize: 10,
  pageNum: 1
}
export default {
  // name: 'myOrder',
  components: {
    userNav,
    countDownInList
  },
  filters: {
    formatStatus (value) {
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
      } else if (value === 6 || value === 7) {
        return '已取消'
      }
    }
  },
  data () {
    return {
      pageLoading: false,
      nowUserNav: '我的订单',
      orderList: [],
      listLoading: false,
      listQuery: Object.assign({}, defaultListQuery),
      total: null,
      phoneDialogVisible: false,
      servicePhone: '027-8590-3199',
      orderPayTime: null
    }
  },
  mounted () {
    this.getOrderPayTime()
    this.getList()
  },
  methods: {
    countChange (index, row) {
      console.log(row)
    },
    getList () {
      this.listLoading = true
      this.$api.getOrderList(this.listQuery).then(res => {
        this.listLoading = false
        if (res.data.list === undefined || res.data.list === []) {
          this.orderList = []
          this.total = 0
          return
        }
        for (let i = 0; i <= res.data.list.length - 1; i++) {
          if (res.data.list[i].status === 1 && res.data.list[i].confirmTime) {
            console.log()
            res.data.list[i].countDownTimeStr = new Date(res.data.list[i].confirmTime).getTime() + this.orderPayTime * 3600 * 1000
          }
        }
        this.orderList = res.data.list
        this.total = res.data.total
      }).catch(err => {
        console.log(err)
        this.listLoading = false
      })
    },
    getOrderPayTime () {
      this.$api.getOrderPayTime().then(res => {
        this.orderPayTime = res.data.orderPayTime
      })
    },
    handleSearch (value) {
      if (typeof value === 'number') {
        this.listQuery.status = value
        this.listQuery.keyword = null
      }
      this.getList()
    },
    showPhone () {
      this.phoneDialogVisible = true
    },
    toDetail (id) {
      this.$router.push({ path: '/orderDetail', query: { id } })
    },
    toSendMessage () {
      this.$router.push('/sendMyMessage')
    },
    toPay (id) {
      this.$router.push({ path: '/choosePay', query: { id } })
    },
    buyAgain (id) {
      this.pageLoading = true
      this.$api.buyAgain(id).then(res => {
        this.pageLoading = false
        this.$message({
          type: 'success',
          duration: 2000,
          message: '订单产品已成功加入购物车'
        })
        this.$router.push('/payment')
      })
    },
    cancelOrder (id) {
      this.$confirm('是否要取消订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.cancelOrder({ orderId: id }).then(res => {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '取消成功'
          })
          this.getList()
        })
      })
    },
    deleteOrder (id) {
      this.$confirm('是否要删除订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteOrder({ orderId: id }).then(res => {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '删除成功'
          })
          this.getList()
        })
      })
    },
    confirmReceive (id) {
      this.$confirm('是否要确认收货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.confirmReceive({ orderId: id }).then(res => {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '收货成功'
          })
          this.getList()
        })
      })
    },
    handleSizeChange (val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.getList()
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
        justify-content: space-between;
        border: 1px solid #e6e6e6;
        padding: 17px 16px 8px 16px;
        .left {
          display: flex;
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
        .right {
          transform: translateY(-6px);
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
        }
      }
      .eqline {
        height: 12px;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
      }
      .steps {
        display: flex;
        height: 45px;
        // align-items: center;
        text-align: center;
        // margin: 12px 0;
        border: 1px solid #dadada;
        span {
          width: 137px;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          color: #666666;
          background-color: #f1f1f1;
          cursor: pointer;
          &.active {
            background-color: #0093e6;
            color: #fff;
          }
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
