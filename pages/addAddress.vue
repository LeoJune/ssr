<template>
  <div class="nav-wrap">
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="right-wrap-add">
      <div class="steps">
        <span>我的购物车</span>
        <span>收货地址</span>
        <span>订单确认</span>
        <span>支付方式</span>
      </div>
      <div class="right-wrap adress">
        <div class="content-header">
          <h2>新增收货地址</h2>
        </div>
        <div class="content-box">
          <el-form
            ref="addAddressForm"
            :model="addAddressForm"
            :rules="rules"
            labelWidth="110px"
            class="myform"
          >
            <el-form-item label="收件人地址：">
              <el-form-item
                label="省份："
                class="my-el-form-item"
                labelWidth="78px"
                prop="provinceId"
              >
                <el-select
                  v-model="addAddressForm.provinceId"
                  @change="handleProvinceChange"
                >
                  <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.areaName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="城市："
                class="my-el-form-item"
                labelWidth="78px"
                prop="cityId"
              >
                <el-select
                  v-model="addAddressForm.cityId"
                  @change="handleCityChange"
                >
                  <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.areaName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="区(县)："
                class="my-el-form-item"
                labelWidth="78px"
                prop="regionId"
              >
                <el-select v-model="addAddressForm.regionId">
                  <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.areaName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item
              label="详细地址："
              prop="detailAddress"
            >
              <el-input
                v-model="addAddressForm.detailAddress"
                class="mytextarea"
                type="textarea"
                placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="收件人姓名："
              prop="name"
            >
              <el-input
                v-model="addAddressForm.name"
                type="text"
                placeholder="收件人姓名"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="联系方式："
              prop="phoneNumber"
            >
              <el-input
                v-model="addAddressForm.phoneNumber"
                type="text"
                placeholder="手机/电话"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="botton-wrap">
        <div
          class="cancel"
          @click="handleCanel"
        >
          取消保存
        </div>
        <div
          class="sure"
          @click="handleSure"
        >
          确认保存
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getProvince, getCity, getArea, addAddress, getAddressById, updateAddress } from '@/api/user'
import userNav from '@/components/user-nav/userNav'
export default {
  // name: 'addressManage',
  components: {
    userNav
  },
  data () {
    return {
      nowUserNav: '地址管理',
      isEdit: false,
      editId: null,
      addAddressForm: {
        phoneNumber: '',
        name: '',
        detailAddress: '',
        provinceId: '',
        province: '',
        cityId: '',
        city: '',
        regionId: '',
        region: '',
        defaultStatus: 0
      },
      // provinceId: '',
      // cityId: '',
      // regionId: '',
      rules: {
        provinceId: [{ required: true, trigger: 'blur', message: '请选择省份' }],
        cityId: [{ required: true, trigger: 'blur', message: '请选择城市' }],
        regionId: [{ required: true, trigger: 'blur', message: '请选择地区' }],
        detailAddress: [{ required: true, trigger: 'blur', message: '请输入详细地址' }],
        name: [{ required: true, trigger: 'blur', message: '请输入收件人姓名' }],
        phoneNumber: [{ required: true, trigger: 'blur', message: '请输入正确的号码' }]
      },
      provinceList: [],
      cityList: [],
      areaList: []
    }
  },
  mounted () {
    if (this.$route.query.edit) {
      this.isEdit = true
      this.editId = this.$route.query.id
      this.handleEdit(this.$route.query.id)
    } else {
      this.getProvince()
    }
  },
  // watch: {
  //   provinceId: function () {
  //     this.addAddressForm.province = this.provinceList.find(item => {
  //       return item.id === this.provinceId
  //     }).areaName
  //   },
  //   cityId: function () {
  //     this.addAddressForm.city = this.cityList.find(item => {
  //       return item.id === this.cityId
  //     }).areaName
  //   },
  //   regionId: function () {
  //     this.addAddressForm.region = this.areaList.find(item => {
  //       return item.id === this.regionId
  //     }).areaName
  //   }
  // },
  methods: {
    handleCanel () {
      this.$router.back(-1)
    },
    handleSure () {
      this.$refs.addAddressForm.validate((valid) => {
        if (valid) {
          this.addAddressForm.province = this.provinceList.find(item => {
            return item.id === this.addAddressForm.provinceId
          }).areaName

          this.addAddressForm.city = this.cityList.find(item => {
            return item.id === this.addAddressForm.cityId
          }).areaName

          this.addAddressForm.region = this.areaList.find(item => {
            return item.id === this.addAddressForm.regionId
          }).areaName

          if (this.isEdit) {
            this.$api.updateAddress(this.editId, this.addAddressForm).then(res => {
              this.$message({
                type: 'success',
                duration: 1000,
                message: '更新成功'
              })
              this.$router.back(-1)
            })
          } else {
            this.$api.addAddress(this.addAddressForm).then(res => {
              this.$message({
                type: 'success',
                duration: 1000,
                message: '添加成功'
              })
              this.$router.back(-1)
            })
          }
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getProvince () {
      this.$api.getProvince().then(res => {
        this.provinceList = res.data
      })
    },
    getCity (id) {
      this.$api.getCity(id).then(res => {
        this.cityList = res.data
      })
    },
    getArea (id) {
      this.$api.getArea(id).then(res => {
        this.areaList = res.data
      })
    },
    handleProvinceChange (value) {
      this.getCity(value)
      this.addAddressForm.cityId = null
      this.addAddressForm.regionId = null
    },
    handleCityChange (value) {
      this.addAddressForm.regionId = null
      this.getArea(value)
    },
    handleEdit (id) {
      this.$api.getAddressById(id).then(res => {
        const addressInfo = res.data
        this.addAddressForm.name = addressInfo.name
        this.addAddressForm.phoneNumber = addressInfo.phoneNumber
        this.addAddressForm.detailAddress = addressInfo.detailAddress
        this.addAddressForm.defaultStatus = addressInfo.defaultStatus
        this.$api.getProvince().then(res => {
          this.provinceList = res.data
          this.addAddressForm.provinceId = res.data.find(item => {
            return item.areaName === addressInfo.province
          }).id
          this.$api.getCity(this.addAddressForm.provinceId).then(res => {
            this.cityList = res.data
            this.addAddressForm.cityId = res.data.find(item => {
              return item.areaName === addressInfo.city
            }).id
            this.$api.getArea(this.addAddressForm.cityId).then(res => {
              this.areaList = res.data
              this.addAddressForm.regionId = res.data.find(item => {
                return item.areaName === addressInfo.region
              }).id
            })
          })
        })
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
  font-size: 16px;
  .right-wrap-add {
    width: 960px;
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
        background-color: #f1f1f1;
        &.active {
          background-color: #0093e6;
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
        margin-bottom: 16px;
        .header-left {
          display: flex;
          h2 {
            color: #070707;
            font-size: 20px;
            font-weight: 700;
          }
        }
      }
      .content-box {
        padding: 0 33px;
        .my-el-form-item {
          width: 248px;
          border: 1px solid #dcdfe6;
          display: inline-block;
          margin-right: 9px;
          &:last-child {
            margin-right: 0;
          }
          /deep/input {
            border: none;
            padding-left: 0;
          }
        }
        .mytextarea {
          height: 162px;
          /deep/textarea {
            height: 162px;
            font-size: 14px;
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
        &.cancel {
          background-color: #d7d7d7;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
