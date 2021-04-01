<template>
  <div class="address-select">
    <div class="right-wrap-add">
      <div class="steps">
        <span>我的购物车</span>
        <span class="active">收货地址</span>
        <span>订单确认</span>
        <span>支付方式</span>
      </div>
      <!-- <div class="address-list" v-show="!showEdit"> -->
      <div class="right-wrap adress">
        <div class="content-header">
          <h2>收货地址</h2>
          <span
            class="blue add"
            @click="handleAdd"
          >+ 新增地址</span>
        </div>
        <div class="content-box">
          <ul class="item-wrap">
            <li
              v-for="(item, index) in addressList"
              :key="index"
              class="address-item"
              :class="
                item.detailAddress === selectAddress.detailAddress
                  ? 'active'
                  : ''
              "
              @click="handleItemClick(item)"
            >
              <p>
                <span>{{ item.name }}</span>
                <span style="margin-left: 20px">{{ item.phoneNumber }}</span>
              </p>
              <div>
                {{
                formatAddress(
                item.province,
                item.city,
                item.region,
                item.detailAddress
                )
                }}
              </div>
              <div class="under-address">
                <span
                  class="normal-blue"
                  @click.stop="editAddress(item.id)"
                >修改</span>
                <span @click.stop="updateDefaultAddress(item.id)">默认地址</span>
              </div>
            </li>
          </ul>
          <div
            v-show="!addressList.length"
            class="noAddress"
          >
            <p class="nodata">暂无已添加地址</p>
          </div>
          <!-- <div class="noData" v-show="addressList.length === 0"></div> -->
        </div>
      </div>
      <div class="botton-wrap">
        <div
          class
          @click="handlePrev"
        >
          上一步
        </div>
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
// import { updateAddress } from '@/api/user'
// import { deleteProduct, getProductInCart } from '@/api/cart'
// import { getAllAddress, deleteAddress, updateAddress } from '@/api/user'
export default {
  // name: 'addressSelect',
  components: {
  },
  props: {
    addressList: {
      type: Array,
      default: () => []
    },
    selectAddress: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      // showEdit:false
    }
  },
  methods: {
    handleNext () {
      this.$emit('nextStep')
    },
    handlePrev () {
      this.$emit('prevStep')
    },
    handleItemClick (item) {
      // this.selectAddress = Object.assign({}, item)
      this.$emit('addressChoose', item)
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
    },
    handleAdd () {
      this.$router.push('/addAddress')
    },
    updateDefaultAddress (id) {
      this.$api.updateAddress(id, { defaultStatus: 1 }).then(res => {
        // this.nowAdressIndex = index
        this.$message({
          type: 'success',
          duration: 1000,
          message: '设置默认地址成功'
        })
        // this.getAllAddress()
      })
    },
    editAddress (id) {
      this.$router.push({ path: '/addAddress', query: { id, edit: true } })
    }
  }
}
</script>

<style lang="less" scoped>
.address-select {
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
        .add {
          color: #1487d5;
          cursor: pointer;
          margin-right: 20px;
          margin-top: 2px;
        }
      }
      .content-box {
        padding: 20px 16px;
        .item-wrap {
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-between;
          .address-item {
            width: 292px;
            height: 153px;
            margin-right: 25px;
            padding: 4px 18px 25px 18px;
            box-sizing: border-box;
            border: 1px solid #dadada;
            color: #666666;
            font-size: 14px;
            line-height: 22px;
            margin-bottom: 21px;
            position: relative;
            &.active {
              border-color: #0093e6;
              // border-width: 2px;
              &:before {
                position: absolute;
                content: "";
                width: 0;
                height: 0;
                border-top: 16px solid transparent;
                border-left: 16px solid transparent;
                border-right: 16px solid #439df3;
                border-bottom: 16px solid #439df3;
                bottom: 0;
                right: 0;
              }
              &:after {
                position: absolute;
                content: "✓";
                color: #fff;
                font-size: 22rpx;
                right: 4px;
                bottom: 0;
                z-index: 2;
              }
            }
            &:hover {
              .under-address {
                span {
                  display: flex;
                }
              }
            }
            &:nth-child(3n) {
              margin-right: 0;
            }
            p {
              margin-bottom: 8px;
              line-height: 34px;
              border-bottom: 1px solid #dadada;
            }
            .under-address {
              width: calc(100% - 36px);
              position: absolute;
              bottom: 20px;
              display: flex;
              justify-content: space-between;
              span {
                cursor: pointer;
                display: none;
              }
            }
          }
          .noAddress {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
    .botton-wrap {
      display: flex;
      justify-content: space-between;
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
