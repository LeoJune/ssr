<template>
  <div class="layout-header">
    <div class="header-top core">
      <div
        class="header-logo"
        @click="goHome"
      >
        <img
          src="@/assets/images/header-logo.jpg"
          alt
        />
      </div>
      <div class="header-search">
        <!-- <input type="text" placeholder="请输入产品名称 品牌 型号" /> -->
        <el-autocomplete
          v-model="searchKeyword"
          :fetchSuggestions="querySearchAsync"
          placeholder="请输入产品名称 新旧件号 机型"
          @select="handleSelect"
          @keyup.enter.native="toSearchList"
        ></el-autocomplete>
        <button @click="toSearchList">
          <img
            src="@/assets/images/header-search.png"
            alt
          />搜索
        </button>
      </div>
      <div class="header-icon">
        <img
          src="@/assets/images/header-e.png"
          alt
        />
      </div>
      <div class="header-my">
        <div class="header-my-car">
          <img
            src="@/assets/images/header-car.png"
            alt
          />
          <div @click="toCart">
            购物车
            <span>
              (
              {{ cartList.length }}
              )
            </span>
          </div>
        </div>
        <div class="header-my-login">
          <div v-if="!hasLogin">
            <img :src="notLoginImg" />
            <div>
              <span @click="openDialog">登录</span>|
              <span @click="toRegister">注册</span>
            </div>
          </div>
          <div v-else>
            <img
              :src="avatar"
              class="userImg"
            />
            <div>
              <span @click="toUserInfo">个人中心</span>|
              <span @click="logout">退出登陆</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isShowBanner">
      <div class="header-banner">
        <el-carousel
          :interval="3000"
          arrow="hover"
          width="100%"
          height="443px"
        >
          <el-carousel-item
            v-for="(item, index) in bannerList"
            :key="index"
          >
            <img
              :src="item.pic"
              alt
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="header-nav core">
        <div
          class="brand-wrap"
          @mouseenter="changeBrandShow"
          @mouseleave="resetBrandShow"
        >
          <div class="brand">
            <img
              src="@/assets/images/header-brand.png"
              class
              alt
            />
            <div>品牌分类</div>
            <img
              src="@/assets/images/header-brand-icon.png"
              class="brand-icon"
              alt
            />
          </div>
          <div
            v-show="brandShow"
            class="brandlist"
          >
            <p
              v-for="(item, index) in brandList"
              :key="index"
              @click="toProductList(item)"
            >
              {{ item.itemName }}
            </p>
          </div>
        </div>
        <div class="category-wrap">
          <div
            v-for="(item, index) in navList"
            :key="index"
            class="category-item"
            @mouseenter="changeNowShow(index)"
            @mouseleave="resetNowShow"
          >
            <div
              class="out"
              @click="toSecondClassFication(item)"
            >
              <span>{{ item.name }}</span>
              <img
                src="@/assets/images/header-nav-item.png"
                class="angle"
              />
            </div>
            <div
              v-show="insideShow(index)"
              class="inside"
              :style="'width:' + listWidth(item) + 'px'"
            >
              <span
                v-for="(child, jIndex) in item.children"
                :key="jIndex"
                @click="toSecondClassFication(child)"
              >{{ child.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <img src="@/assets/images/header-nav-item.png" /> -->
      <div class="header-tips core">
        您是不是在找：
        <span
          v-for="(item, index) in tipList"
          :key="index"
          @click="toSecondClassFication(item)"
        >{{ item.name }}</span>
      </div>
    </div>
    <el-dialog
      title="用户登陆"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        labelWidth="150px"
        size="small"
      >
        <el-form-item
          label="用户名："
          prop="username"
        >
          <el-input
            v-model="loginForm.username"
            type="text"
            style="width: 250px"
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密 码："
          prop="password"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            style="width: 250px"
            maxlength="16"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        style="text-align: center"
      >
        <el-button
          size="small"
          @click="handleForget"
        >忘记密码</el-button>
        <el-button
          type="primary"
          size="small"
          @click="toLogin"
        >登 陆</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBrandList, getAllCategory, getRecommdNavAndHome, search } from '@/api/header'
import { getAdInDictionary } from '@/api/dictionary'
import { login } from '@/api/login'
import { mapGetters } from 'vuex'
export default {
  // prop: {
  //   isShowBanner: Boolean
  // },
  data () {
    return {
      dialogVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ reuqired: true, trigger: 'blur', message: '请填入用户名' }]
      },
      searchKeyword: '',
      timout: null,
      isShowBanner: true,
      nowShow: null,
      brandShow: false,
      bannerList: [
        require('@/assets/images/header-picture.png'),
        require('@/assets/images/header-picture.png')
      ],
      navList: [], //  导航栏
      tipList: [], //  导航栏推荐
      brandList: [],
      navMore: [], //  导航栏二级
      notLoginImg: require('@/assets/images/header-login.png')
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'hasLogin',
      'cartList'
    ])
  },
  // created () {
  //   if (!this.$route.meta.notShowBanner) {
  //     this.isShowBanner = true
  //   } else {
  //     this.isShowBanner = false
  //   }
  //   this.getBanner()
  //   this.getBrandList()
  //   this.getAllCategory()
  //   this.getRecommdNavAndHome()
  // },
  beforeMount () {
    if (!this.$route.meta.notShowBanner) {
      this.isShowBanner = true
    } else {
      this.isShowBanner = false
    }
    this.getBanner()
    this.getBrandList()
    this.getAllCategory()
    this.getRecommdNavAndHome()
  },
  methods: {
    getBanner () { // 1 PC端首页 2 合作厂家 3 友情链接 4 移动端首页
      getAdInDictionary({ type: 1, status: 1 }).then(res => {
        // this.bannerList = formatArrToFitCarousel(res.data)
        this.bannerList = res.data
      })
    },
    getBrandList () {
      getBrandList({ typeCode: 'productbrand', pageSize: 100, pageNum: 1 }).then(res => {
        // console.log('getbrandlist chengzgong')
        this.brandList = res.data.records
      })
    },
    getAllCategory () {
      getAllCategory().then(res => {
        if (res.data.length > 7) {
          this.navList = res.data.slice(0, 7)
        } else {
          this.navList = res.data
        }
      })
    },
    getRecommdNavAndHome () {
      getRecommdNavAndHome({ navStatus: 1 }).then(res => {
        this.tipList = res.data
      })
    },
    toCart () {
      // this.$router.push('/settlement/shoppingCar')
      this.$router.push('/payment')
    },
    goHome () {
      this.$router.push('/')
    },
    toLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.loginForm).then(res => {
            // console.log(res)
          })
        } else {
          this.$message({
            message: '请正确填入密码',
            type: 'warning',
            duration: 1000
          })
          // console.log('error submit!!')
          return false
        }
      })
    },
    openDialog () {
      // this.dialogVisible = true
      this.$router.push('/login')
    },
    handleForget () {
      this.$router.push('/login/forgetPassword')
    },
    toRegister () {
      this.$router.push('/login/register')
    },
    toUserInfo () {
      this.$router.push('/userInfo')
    },
    logout () {
      this.$store.dispatch('FedLogout')
    },
    listWidth (item) {
      if (!item.children) {
        return false
      }
      const columnNum = parseInt(item.children.length / 5)
      const leftNum = item.children.length % 5
      if (leftNum === 0) {
        return columnNum * 140 + 2
      } else {
        return (columnNum + 1) * 140 + 2
      }
    },
    insideShow (index) {
      if (this.nowShow === index) {
        return true
      } else {
        return false
      }
    },
    querySearchAsync (queryString, cb) {
      let list = null
      const filterQueryString = queryString.replace(/[[\]]/g, '')
      search({ productNameOrSn: filterQueryString, pageSize: 10, pageNum: 1 }).then(res => {
        for (const i of res.data.records) {
          i.value = i.name
        }
        list = res.data.records

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(list)
        }, 1000)
      })
    },
    handleSelect (item) {
      // console.log(item)
    },
    toSearchList () {
      // console.log('sousuo')
      this.$router.push({ path: '/searchResult', query: { searchKeyword: this.searchKeyword } })
    },
    toProductList (item) {
      this.$router.push({ path: '/productList', query: { id: item.itemId, brandTab: true } })
    },
    toSecondClassFication (item) {
      this.$router.push({ path: '/secondaryClassification', query: { id: item.id, name: item.name } })
    },
    changeNowShow (index) {
      this.nowShow = index
    },
    resetNowShow () {
      this.nowShow = null
    },
    changeBrandShow () {
      this.brandShow = true
    },
    resetBrandShow () {
      this.brandShow = false
    }
  }

}
</script>

<style lang="less" scoped>
.layout-header {
  .header-top {
    height: 135px;
    display: flex;
    .header-logo {
      transform: translateY(-12px);
      cursor: pointer;
      padding: 32px 63px 0 0;
      img {
        width: 330px;
      }
    }
    .header-search {
      padding: 47px 47px 0 0;
      display: flex;
      /deep/input {
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
        width: 100px;
        height: 44px;
        transform: translateX(-3px);
        background-color: #1487d5;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(254, 254, 254, 1);
        line-height: 33px;
        cursor: pointer;
        img {
          width: 16px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
    .header-icon {
      padding-top: 36px;
      img {
        width: 62px;
      }
    }
    .header-my {
      margin-left: auto;
      padding-top: 32px;
      display: flex;
      .header-my-car,
      .header-my-login {
        width: 140px;
        height: 70px;
        background-color: #1487d5;
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(254, 254, 254, 1);
        border-radius: 4px;

        img {
          margin: 11px auto 10px;
        }
        .userImg {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          object-fit: cover;
        }
        span {
          margin: 0 4px;
          cursor: pointer;
        }
      }
      .header-my-car {
        margin-right: 22px;
        cursor: pointer;
      }
    }
  }
  .header-banner {
    width: 1920px;
    // margin: 0 auto 12px;
    margin-bottom: 12px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 100%;
      height: 443px;
      display: block;
    }
    /deep/.el-carousel__arrow {
      width: 60px;
      height: 60px;
      background-color: transparent;
      font-size: 60px;
      top: 50%;
    }
    /depp/.el-carousel__arrow--right {
      // right: calc((1920px - 50vw) / 2 + 16px);
    }
    /depp/.el-carousel__arrow--left {
      // left: calc((1920px - 50vw) / 2 + 16px);
    }
  }
  .header-nav {
    height: 50px;
    line-height: 50px;
    display: flex;
    margin-bottom: 2px;
    position: relative;
    .brand-wrap {
      width: 286px;
      height: 100%;
      background-color: #1169a8;
      font-size: 22px;
      position: relative;
      color: rgba(255, 255, 255, 1);
      .brand {
        display: flex;
        align-items: center;
        justify-content: space-around;
        img {
          width: 34px;
          height: 34px;
          &.brand-icon {
            width: 19px;
            height: 13px;
            margin-right: 10px;
          }
        }
      }
      .brandlist {
        position: absolute;
        z-index: 9;
        width: 100%;
        left: 0;
        top: 100%;
        background-color: rgb(214, 232, 252);
        padding-bottom: 10px;
        p {
          width: 100%;
          line-height: 40px;
          color: #999999;
          text-align: center;
          font-size: 18px;
          font-weight: 300;
          cursor: pointer;
          &:hover {
            background-color: #076a91;
          }
        }
      }
    }
    .category-wrap {
      flex-grow: 1;
      // margin-left: 2px;
      height: 100%;
      color: #fff;
      .category-item {
        height: 100%;
        width: 140px;
        height: 100%;
        line-height: 50px;
        float: left;
        margin-left: 2px;
        background-color: #1487d5;
        position: relative;
        font-size: 18px;
        .out {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          .angle {
            margin-left: 5px;
          }
        }
        .inside {
          position: absolute;
          left: 0;
          top: 100%;
          z-index: 100;
          box-sizing: border-box;
          min-width: 140px;
          min-height: 50px;
          max-height: 210px;
          padding-bottom: 10px;
          background-color: rgb(214, 232, 252);
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          span {
            width: 140px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            font-size: 16px;
            font-weight: lighter;
            color: #999999;
            &:hover {
              background-color: #076a91;
            }
          }
        }
        &:last-child {
          .inside {
            left: initial;
            right: 0;
          }
        }
      }
    }
  }

  .header-tips {
    height: 46px;
    background-color: #f4f4f4;
    padding: 0 10px;
    box-sizing: border-box;
    color: #666;
    font-size: 16px;
    line-height: 46px;
    span {
      padding: 6px 10px;
      background-color: #00aef3;
      color: #fff;
      border-radius: 6px;
      margin-right: 18px;
      font-size: 15px;
      cursor: pointer;
    }
  }
}
</style>
