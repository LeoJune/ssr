<template>
  <div class="shopping-cart">
    <div class="right-wrap-add">
      <div class="steps">
        <span class="active">我的购物车</span>
        <span>收货地址</span>
        <span>订单确认</span>
        <span>支付方式</span>
      </div>
      <div class="right-wrap adress">
        <div class="content-header">
          <h2>我的购物车</h2>
        </div>
        <div class="content-box">
          <el-table
            ref="cartTable"
            v-loading="listLoading"
            :data="cartList"
            class="mytable"
            style="width: 100%"
            @select="selectRow"
            @select-all="selectAll"
          >
            <!-- @selection-change="handleSelectionChange" -->
            <el-table-column
              type="selection"
              label="全选"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              label="商品"
              align="center"
            >
              <template slot-scope="scope">
                <div
                  class="img-wrap"
                  @click="toProductDetail(scope.row.productId)"
                >
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
              label="数量"
              width="240"
              align="center"
            >
              <template slot-scope="scope">
                <div class="count-input">
                  <el-input-number
                    v-model="scope.row.quantity"
                    :min="
                      compareMiniAndQuantity(
                        scope.row.productMinimumPurchase,
                        scope.row.quantity
                      )
                    "
                    :max="10000"
                    size="medium"
                    :step="1"
                    :stepStrictly="true"
                    @change="countChange(scope.$index, scope.row)"
                  ></el-input-number>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="价格"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <p class="myred">{{ scope.row.price }}元</p>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  class="mybotton"
                  @click="handleDelete(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="under-table">
            <span
              class="clear-botton"
              @click="handleDeleteAll"
            >删除选中商品</span>
            <span class="cost-wrap">
              合计：
              <span class="price-color">¥ {{ totalMoney }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="botton-wrap">
        <div
          class="sure"
          @click="handleNext"
        >
          下一步
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getProductInCart, deleteProductInCart, updateProductNum } from '@/api/cart'
// import { mapGetters } from 'vuex'
export default {
  // name: 'shoppingCart',
  components: {
  },
  props: {
    cartList: {
      type: Array,
      default: () => []
    },
    multipleSelection: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      nowUserNav: '地址管理',
      listLoading: false
    }
  },
  computed: {
    totalMoney () {
      let totalMoney = 0
      if (this.cartList.length === 0) {
        return 0
      }
      for (let i = 0; i < this.multipleSelection.length; i++) {
        totalMoney += this.multipleSelection[i].quantity * this.multipleSelection[i].price
      }
      return totalMoney.toFixed(2)
    }
  },
  methods: {
    getProductInCart () {
      this.$api.getProductInCart().then(res => {
        this.cartList = res.data
      })
    },
    handleDeleteAll () {
      if (this.multipleSelection === null || this.multipleSelection.length < 1) {
        this.$message({
          message: '没有要删除的商品',
          type: 'warning',
          duration: 1000
        })
      } else {
        this.$confirm('是否删除选中商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          const ids = []
          const params = new URLSearchParams()
          for (let i = 0; i < this.multipleSelection.length; i++) {
            ids.push(this.multipleSelection[i].id)
          }
          params.append('ids', ids)
          // const params = { ids: JSON.stringify(ids) }
          this.$api.deleteProductInCart(params).then(res => {
            this.$store.dispatch('cart/GetCartInfo').then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!',
                duration: 1000
              })
              // 还原已选 也是还原总计金额
              // this.multipleSelection = []
              this.$emit('multipleChange', [])
            })
          })
        })
      }
    },
    handleDelete (item) {
      const ids = []
      ids.push(item.id)
      const params = new URLSearchParams()
      params.append('ids', ids)
      this.$api.deleteProductInCart(params).then(res => {
        this.$store.dispatch('cart/GetCartInfo').then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          })
          // 还原已选 也是还原总计金额
          const tempArr = this.multipleSelection.filter(v => {
            return v.id !== item.id
          })
          this.$emit('multipleChange', tempArr)
        })
      })
    },
    handleNext () {
      this.$emit('nextStep')
    },
    countChange (index, row) {
      console.log('change')
      const params = new URLSearchParams()
      params.append('id', row.id)
      params.append('quantity', row.quantity)
      this.$api.updateProductNum(params).then(res => {
        console.log('更新购物车商品数量')
      })
      // this.$store.dispatch('cart/')
    },
    handleSelectionChange (val) {
      this.$emit('multipleChange', val)
    },
    selectRow (val, row) {
      let arr = []
      if (row.quantity < row.productMinimumPurchase) {
        this.$message({
          type: 'error',
          duration: 2000,
          message: '商品数量要大于等于起订数量，请重新选择'
        })
        this.$refs.cartTable.toggleRowSelection(row, false)
        arr = val.filter(v => {
          return v.quantity >= v.productMinimumPurchase
        })
      } else {
        arr = val
      }
      this.$emit('multipleChange', arr)
    },
    selectAll (val) {
      const arr = []
      val.map(v => {
        if (v.quantity < v.productMinimumPurchase) {
          this.$message({
            type: 'error',
            duration: 2000,
            message: '商品数量要大于等于起订数量，请重新选择'
          })
          this.$refs.cartTable.toggleRowSelection(v, false)
        } else {
          arr.push(v)
        }
        this.$emit('multipleChange', arr)
      })
    },
    toProductDetail (id) {
      this.$router.push({ path: '/productDetail', query: { id } })
    },
    compareMiniAndQuantity (mini, quantity) {
      if (mini > quantity) {
        return quantity
      } else {
        return mini
      }
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
        .mytable {
          border: none;
          /deep/.el-table__header th {
            background-color: #e6e6e6;
            color: #070707;
          }
          /deep/ td {
            border: none !important;
          }
          /deep/ th {
            border: none !important;
          }
          .myred {
            color: #e31939;
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
            cursor: pointer;
            display: flex;
            padding: 0 10px;
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
              width: 220px;
              color: #333333;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
        }
        .under-table {
          height: 45px;
          line-height: 45px;
          background-color: #e6e6e6;
          display: flex;
          justify-content: space-between;
          padding: 0 92px 0 46px;
          font-size: 14px;
          .clear-botton {
            cursor: pointer;
          }
          .cost-wrap {
            span {
              font-size: 18px;
            }
          }
        }
      }
    }
    .botton-wrap {
      margin-top: 27px;
      div {
        width: 168px;
        height: 45px;
        line-height: 45px;
        float: right;
        color: #ffffff;
        background-color: #0093e6;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
