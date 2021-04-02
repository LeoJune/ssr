<template>
  <div class="settlement">
    <ul class="settlement-left">
      <li>支持的支付方式</li>
      <li></li>
      <li>
        <img
          src="@/assets/images/settlement-zhifub1.png"
          alt
        />
      </li>
      <li></li>
      <li>
        <img
          src="@/assets/images/settlement-zhifu2.png"
          alt
        />
      </li>
    </ul>
    <div class="settlement-rignt">
      <!-- <router-view></router-view> -->
      <pay-way
        :carList="multipleSelection"
        :nowPayWay="nowPayWay"
        :order="order"
        @finalStep="finalStep"
        @payWayChange="payWayChange"
      ></pay-way>

      <!-- @prevStep="prevStep" -->
      <!-- :selectAddress="selectAddress" -->
      <el-dialog
        :visible.sync="qrcodeDialogVisible"
        width="500px"
      >
        <p style="text-align: center; font-size: 20px">
          微信扫描下方二维码完成支付
        </p>
        <div
          id="qrcode"
          ref="myqrwrap"
        ></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import payWay from '@/components/payment/payWay'
// import { getOrderDetail, orderPayWay, payResult } from '@/api/order'
import QRCode from 'qrcodejs2'
// import store from '@/store'
// import { mapGetters } from 'vuex'
export default {
  // name: 'choosePay',
  components: {
    payWay
  },
  data () {
    return {
      orderId: null,
      multipleSelection: [],
      selectAddress: {},
      nowPayWay: 0,
      orderParams: {
        payType: 0,
        cartIds: []
      },
      order: {},
      qrcodeDialogVisible: false,
      qrInstance: null
    }
  },
  mounted () {
    const id = this.$route.query.id
    this.orderId = id
    this.getOrderInfo(id)
  },
  methods: {
    getOrderInfo (id) {
      this.$api.getOrderDetail(id).then(res => {
        this.order = res.data
        this.multipleSelection = res.data.orderItemList
      })
    },
    checkPayResult () {
      const timer = setInterval(() => {
        // let i = 0
        // if (i < 5) {
        //   i++
        //   console.log(i)
        // } else {
        //   clearInterval(timer)
        //   this.qrcodeDialogVisible = false
        //   this.$alert({
        //     message: '支付成功'
        //   }).then(() => {
        //     this.$router.push('/myOrder')
        //   })
        // }

        this.$api.payResult(this.orderId).then(res => {
          if (res.data === 1) {
            clearInterval(timer)
            this.qrcodeDialogVisible = false
            this.$alert('支付成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/myOrder')
              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }, 5000)
    },
    finalStep () {
      if (this.nowPayWay === 0) { // 0未支付 1支付宝 2微信 3对公
        this.$message({
          message: '请选择支付方式',
          type: 'warning',
          duration: 1000
        })
        return
      }
      if (this.order.status !== 1) {
        this.$message({
          type: 'error',
          duration: '2000',
          message: '订单状态不符合'
        })
        return
      }
      this.$api.orderPayWay(this.orderId, { type: this.nowPayWay }).then(res => {
        if (this.nowPayWay === 3) {
          this.$alert('工作人员会联系您进行线下支付', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/myOrder')
            }
          })
        } else if (this.nowPayWay === 2) {
          this.qrcodeDialogVisible = true
          this.$nextTick(() => {
            this.$refs.myqrwrap.innerHTML = ''
            this.qrInstance = new QRCode('qrcode', {
              width: 200,
              height: 200,
              text: res.data.qrCode, // 二维码地址
              colorDark: '#000',
              colorLight: '#fff'
            })
          })
          // 二维码显示,开始轮询支付结果,
          this.checkPayResult()
        }
      })
    },
    payWayChange (num) {
      this.nowPayWay = num
    }
  }

}
</script>

<style lang="less" scoped>
.settlement {
  padding: 20px 0 94px;
  display: flex;
  justify-content: space-between;
  .settlement-left {
    width: 280px;
    li:first-child {
      height: 60px;
      line-height: 60px;
      background-color: #1487d5;
      text-align: center;
      color: #fff;
      font-size: 20px;
      border-radius: 4px 4px 0 0;
    }
    li:nth-child(2n) {
      height: 16px;
      border: 1px solid #d9d9d9;
    }
    li:nth-child(3),
    li:nth-child(5) {
      height: 68px;
      border-left: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
      img {
        display: block;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    li:last-child {
      border-radius: 0 0 4px 4px;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  .settlement-rignt {
    width: 962px;
  }
  #qrcode {
    // display: inline-block;
    width: 200px;
    height: 200px;
    margin: 30px auto 10px;
    // position: relative;
    // top: -457px;
    // left: 640px;
    background-color: #111c24;
    img {
      width: 200px;
      height: 200px;
      background-color: #fff; //设置白色背景色
      padding: 10px; // 利用padding的特性，挤出白边
    }
  }
}
</style>
