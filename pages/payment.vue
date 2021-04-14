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
      <!-- :cartList="cartListCopy" -->
      <shopping-cart
        v-show="showStatus[0]"
        :cartList="cartListCopy"
        :multipleSelection.sync="multipleSelection"
        @multipleChange="multipleChange"
        @nextStep="nextStep"
      ></shopping-cart>
      <address-select
        v-show="showStatus[1]"
        :addressList="addressList"
        :selectAddress="selectAddress"
        @nextStep="nextStep"
        @prevStep="prevStep"
        @addressChoose="addressChoose"
      ></address-select>
      <order-confirm
        v-show="showStatus[2]"
        :carList="multipleSelection"
        :selectAddress="selectAddress"
        @finalStep="finalStep"
        @prevStep="prevStep"
      ></order-confirm>
      <!-- @nextStep="nextStep" -->
      <!-- <pay-way
        :carList="multipleSelection"
        :selectAddress="selectAddress"
        :nowPayWay="nowPayWay"
        v-show="showStatus[3]"
        @finalStep="finalStep"
        @prevStep="prevStep"
        @payWayChange="payWayChange"
      ></pay-way> -->
    </div>
  </div>
</template>

<script>
import shoppingCart from '@/components/payment/shoppingCart'
import addressSelect from '@/components/payment/addressSelect'
import orderConfirm from '@/components/payment/orderConfirm'
// import payWay from './components/payWay'
// import { getAllAddress } from '@/api/user'
// import { generateOrder } from '@/api/order'
// generateConfirmOrder,
// import store from '@/store'
// , deleteAddress, updateAddress
import { mapGetters } from 'vuex'
export default {
  // name: 'payment',
  components: {
    shoppingCart, addressSelect, orderConfirm
  },
  middleware: 'permission',
  data () {
    return {
      active: 0,
      showStatus: [true, false, false],
      multipleSelection: [],
      addressList: [],
      selectAddress: {},
      nowPayWay: 0,
      orderParams: {
        payType: 0,
        cartIds: []
      },
      cartListCopy: []
    }
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  watch: {
    cartList (newer) {
      this.cartListCopy = JSON.parse(JSON.stringify(newer))
    }
  },
  mounted () {
    this.$store.dispatch('cart/GetCartInfo').then(res => {
      // console.log('chengg from getCartInfo')
      this.cartListCopy = JSON.parse(JSON.stringify(this.cartList))
    }).catch(error => {
      console.log(error + 'from getCartInfo')
    })
    this.getAddress()
  },
  methods: {
    getAddress () {
      // getAllAddress().then(res => {
      //   this.addressList = res.data
      //   if (res.data.length === 0) {

      //   } else {
      //     if (res.data.find(v => {
      //       return v.defaultStatus === 1
      //     }) !== undefined) {
      //       this.selectAddress = res.data.find(v => {
      //         return v.defaultStatus === 1
      //       })
      //     }
      //   }
      // })

      this.$api.getAllAddress().then(res => {
        this.addressList = res.data
        if (res.data.length === 0) {

        } else if (res.data.find(v => {
          return v.defaultStatus === 1
        }) !== undefined) {
          this.selectAddress = res.data.find(v => {
            return v.defaultStatus === 1
          })
        }
      })
    },
    hideAll () {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false
      }
    },
    prevStep () {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--
        this.hideAll()
        this.$set(this.showStatus, this.active, true)
        // this.showStatus[this.active] = true
      }
    },
    nextStep () {
      if (this.active < this.showStatus.length - 1) {
        if (this.active === 0) {
          if (this.multipleSelection === null || this.multipleSelection.length < 1) {
            this.$message({
              message: '请选择要结算的商品',
              type: 'warning',
              duration: 1000
            })
            return
          }
          // const cartIds = []
          // // const params = new URLSearchParams()
          // for (let i = 0; i < this.multipleSelection.length; i++) {
          //   cartIds.push(this.multipleSelection[i].id)
          // }
          // params.append(cartIds)
          // generateConfirmOrder(cartIds).then(res => {
          // })
        }
        if (this.active === 1) {
          if (this.selectAddress.id === undefined) {
            this.$message({
              message: '请添加收货地址',
              type: 'warning',
              duration: 1000
            })
            return
          }
        }
        this.active++
        this.hideAll()
        this.$set(this.showStatus, this.active, true)
        // this.showStatus[this.active] = true
      }
    },
    finalStep () {
      this.orderParams.payType = this.nowPayWay
      const cartIds = []
      // const params = new URLSearchParams()
      for (let i = 0; i < this.multipleSelection.length; i++) {
        cartIds.push(this.multipleSelection[i].id)
      }
      this.orderParams.cartIds = cartIds
      this.orderParams.memberReceiveAddressId = this.selectAddress.id
      this.$api.generateOrder(this.orderParams).then(res => {
        this.$message({
          type: 'success',
          duration: 2000,
          message: '下单成功,等待后台确认'
        })
        this.$router.push('/myOrder')
      })
    },
    multipleChange (val) {
      this.multipleSelection = val
    },
    addressChoose (item) {
      console.log(item)
      this.selectAddress = item
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
}
</style>
