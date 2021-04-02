<template>
  <div
    v-loading="loading"
    class="nav-wrap"
  >
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="right-wrap adress">
      <div class="content-header">
        <div class="header-left">
          <h2>地址管理</h2>
          <span class="short-line"></span>
          <!-- <span class="blue myback">返回</span> -->
        </div>
        <span
          class="blue add"
          @click="handleAdd"
        >+ 新增地址</span>
      </div>
      <div class="content-box">
        <div
          v-for="(item,index) in addressList"
          :key="index"
          class="address-item"
          @click="changeAdress(item,index)"
        >
          <!-- <div class="out-wrap" :class="nowAdressIndex === index?'active':''"> -->
          <div
            class="out-wrap"
            :class="item.defaultStatus === 1?'active':''"
          >
            <p class="default-text">默认地址</p>
            <div class="out">
              <span class="dot"></span>
            </div>
          </div>
          <div class="info-wrap">
            <p>
              <span>收货地址:</span>
              <!-- <span>{{item.province+item.city+item.region}}</span> -->
              <span>{{ formatAddress(item.province,item.city,item.region,item.detailAddress) }}</span>
            </p>
            <p>收货人: {{ item.name }}</p>
            <p>联系方式: {{ item.phoneNumber }}</p>
          </div>
          <div class="botton-wrap">
            <span
              class="eqbotton"
              @click.stop="updateAddress(item.id)"
            >编辑</span>
            <span
              class="eqbotton"
              @click.stop="deleteAddress(item.id)"
            >删除</span>
          </div>
        </div>
        <div
          v-show="!addressList.length"
          class
        >
          <p class="nodata">暂无已添加地址</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getAllAddress, deleteAddress, updateAddress } from '@/api/user'
import userNav from '@/components/user-nav/userNav'
export default {
  // name: 'addressManage',
  components: {
    userNav
  },
  data () {
    return {
      loading: false,
      nowUserNav: '地址管理',
      nowAdressIndex: null,
      addressList: []
    }
  },
  mounted () {
    this.getAllAddress()
  },
  methods: {
    changeAdress (item, index) {
      console.log(item.id)
      this.nowAdressIndex = index
      this.$api.updateAddress(item.id, { defaultStatus: 1 }).then(res => {
        // this.nowAdressIndex = index
        this.$message({
          type: 'success',
          duration: 1000,
          message: '修改默认地址成功'
        })
        this.getAllAddress()
      })
    },
    deleteAddress (id) {
      this.$confirm('确定要删除该条地址?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        tyoe: 'warning'
      }).then(() => {
        this.$api.deleteAddress(id).then(res => {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '删除成功'
          })
          this.getAllAddress()
        })
      })
    },
    updateAddress (id) {
      this.$router.push({ path: '/addAddress', query: { id, edit: true } })
    },
    handleAdd () {
      this.$router.push('/addAddress')
    },
    getAllAddress () {
      this.loading = true
      this.$api.getAllAddress().then(res => {
        this.loading = false
        this.addressList = res.data
      }).catch(() => {
        this.loading = false
      })
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
.nav-wrap {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  .right-wrap {
    width: 960px;
    box-sizing: border-box;
    border: 1px solid #dadada;
    .content-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      font-size: 18px;
      padding: 20px 16px;
      .header-left {
        display: flex;
        h2 {
          color: #070707;
          font-size: 20px;
          // padding-top: 16px;
          // padding-left: 16px;
          // padding-bottom: 21px;
          font-weight: 700;
        }
        .short-line {
          margin: 0 20px;
          // color: #e6e6e6;
          height: 37px;
          border-left: 1px solid #e6e6e6;
          transform: translateY(-5px);
        }
      }
      .myback {
        cursor: pointer;
      }
      .add {
        cursor: pointer;
      }
      .blue {
        color: #1487d5;
      }
    }
    .content-box {
      padding: 0 16px;
      .address-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dadada;
        padding: 28px 0;
        &:last-child {
          border-bottom: none;
        }
        .out-wrap {
          width: 30px;
          height: 30px;
          margin-left: 26px;
          position: relative;
          .default-text {
            position: absolute;
            width: 200px;
            color: #1487d5;
            top: -30px;
            left: -14px;
            display: none;
          }
        }
        .out {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #dadada;
          display: flex;
          align-items: center;
          justify-content: space-around;
          box-sizing: border-box;
          // &.active {
          //   border-color: #1487d5;
          //   .dot {
          //     background-color: #1487d5;
          //   }
          // }
          .dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #dadada;
          }
        }
        .out-wrap.active {
          .out {
            border-color: #1487d5;
            .dot {
              background-color: #1487d5;
            }
          }
          .default-text {
            display: block;
          }
        }
        .info-wrap {
          flex-grow: 1;
          margin: 0 62px;
          line-height: 32px;
          color: #666666;
        }
        .botton-wrap {
          width: 60px;
          height: 74px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 28px;
          .eqbotton {
            width: 60px;
            height: 30px;
            line-height: 30px;
            box-sizing: border-box;
            border: 1px solid #dadada;
            background-color: #f7f7f7;
            font-size: 14px;
            color: #666666;
            text-align: center;
            cursor: pointer;
          }
        }
      }
      .nodata {
        padding: 30px;
        text-align: center;
      }
    }
  }
}
</style>
