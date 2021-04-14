<template>
  <div>
    <div
      v-if="productInfo.publishStatus === 1"
      class="product-detail"
    >
      <SideTab
        :tabList.sync="tabList"
        :hotList.sync="hotList"
        :activeTab="nowTab"
      ></SideTab>
      <div class="product-detail-right">
        <div class="product-detail-right-title">
          <div class="title-img">
            <el-carousel
              v-if="imgs.length"
              :interval="5000"
              trigger="click"
              class="carousel"
              style="width: 328px; height: 100%"
              height="100%"
              arrow="never"
            >
              <!-- <el-carousel-item v-for="item in 4" :key="item" style="background-color:red">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>-->
              <el-carousel-item
                v-for="item in imgs"
                :key="item"
              >
                <div class="img-wrap">
                  <img
                    :src="item"
                    alt
                    class="imgItem"
                  />
                </div>
              </el-carousel-item>
            </el-carousel>
            <div
              v-else
              class="replace-carousel"
            >
              <p>暂无图片</p>
            </div>
          </div>
          <div class="title-info">
            <div class="title-info-name">
              {{ (productInfo.brandName ? productInfo.brandName : "") +
              " " + (productInfo.name ? productInfo.name : "") + " " + (productInfo.productModel ? productInfo.productModel : "") }}
            </div>
            <div class="title-info-desc">
              适用机型：{{ productInfo.productApplyType }}
            </div>
            <div class="title-info-desc">
              件号：{{ productInfo.displayProductSn }}
            </div>
            <div class="title-info-desc">
              品质：{{ productInfo.productQuality }}
            </div>
            <div class="title-info-desc">
              重量：{{ productInfo.weight }}kg
            </div>
            <div class="title-info-desc">
              最低起订量：{{ productInfo.productMinimumPurchase }}
            </div>
            <div class="title-info-desc">
              单价：
              <span>￥{{ productInfo.price }}</span>
            </div>
          </div>
          <div class="title-join">
            <div
              class="title-join-collect"
              @click="collect"
            >
              <div
                data-info="1"
                :class="{'active-collect': productInfo.productCollectStatus === 1,
                }"
              >
                <img
                  :src="
                    productInfo.productCollectStatus === 1
                      ? collectIconActive
                      : collectIcon
                  "
                  alt
                />收藏
              </div>
            </div>
            <div class="title-join-car">
              <!-- productInfo.quantity -->
              <el-input-number
                v-model="productInfo.quantity"
                :min="productInfo.productMinimumPurchase"
                :max="10000"
                :step="1"
                :stepStrictly="true"
                label="请输入数量"
                size="medium"
                @change="handleChange"
              ></el-input-number>
              <div
                class="item-car"
                @click="joinCar"
              >
                加入购物车
              </div>
            </div>
          </div>
        </div>
        <div class="product-detail-right-desc">
          <div class="desc-title">
            <div
              class="desc-title-item"
              :class="{ 'desc-title-item-active': isActiveDesc === 0 }"
              @click="changeDescTitle(0)"
            >
              内容描述
            </div>
            <div
              class="desc-title-item"
              :class="{ 'desc-title-item-active': isActiveDesc === 1 }"
              @click="changeDescTitle(1)"
            >
              技术指标
            </div>
          </div>
          <div
            v-if="isActiveDesc === 0"
            class="desc-content"
            v-html="productInfo.detailHtml"
          ></div>
          <div
            v-if="isActiveDesc === 1"
            class="desc-content"
            v-html="productInfo.productTechniqueTarget"
          ></div>
        </div>
        <div class="product-detail-right-recommend">
          <Carousel
            :needStatistics="true"
            :title.sync="recommendTitle"
            :titleIcon.sync="recommendTitleIcon"
            :dataList.sync="recommendList"
            :isShowRight.sync="moreStatus"
            @joinCar="recommendJoinCar"
          ></Carousel>
        </div>
      </div>
    </div>
    <div
      v-else-if="productInfo.publishStatus === 0"
      class="offtable"
    >
      <div class="content">
        <img
          src="@/assets/images/offtable.png"
          alt=""
        />
        <div class="text">
          <p class="hard">很抱歉,您查看的宝贝不存在,可能已下架了</p>
          <p>
            你可以去其他地方逛逛:
            <el-button
              type="text"
              @click="toHome"
            >
              商城首页
            </el-button>
            |<el-button
              type="text"
              @click="toMyCollect"
            >
              我的收藏
            </el-button>
            |<el-button
              type="text"
              @click="toMyOrder"
            >
              我的订单
            </el-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getProductDetail, getAllCategory, getProductInDictionary, productCollect } from '@/api/product'
// import store from '@/store'
import { mapGetters } from 'vuex'
import { formatArrToFitCarousel } from '@/utils/validate'
import SideTab from '@/components/side-tab/sideTab.vue'
import Carousel from '@/components/carousel/carousel.vue'

export default {
  components: {
    SideTab,
    Carousel
  },
  async asyncData ({ query, app }) {
    const id = query.id
    const flagId = query.flagId
    const params = flagId ? { id, params: { flagId } } : { id }
    let productInfo = {}
    let imgs = [] // 商品相册
    let tabList = [] // 左边一级分类
    let hotList = [] // 热卖商品
    let recommendList = [] // 推荐商品
    await app.$api.getProductDetail(params).then(response => {
      const res = response.data
      res.quantity = res.productMinimumPurchase
      res.productPic = res.pic
      res.productName = res.name
      res.productPrice = res.price // 收藏需要的属性
      imgs = []
      if (res.pic) {
        imgs.push(res.pic)
      }
      if (res.albumPics && res.albumPics.includes(',')) {
        res.albumPics.split(',').map(v => {
          imgs.push(v)
        })
      } else if (res.albumPics) {
        imgs.push(res.albumPics)
      }
      productInfo = res
    }).catch(err => {
      console.log(err)
      productInfo = { publishStatus: 0 }
    })
    await app.$api.getAllCategory().then(res => {
      tabList = res.data
    })
    await app.$api.getProductInDictionary({ type: 1, recommendStatus: 1 }).then(res => {
      if (res.data.length > 7) {
        hotList = res.data.slice(0, 7)
      } else {
        hotList = res.data
      }
    })
    await app.$api.getProductInDictionary({ type: 2, recommendStatus: 1 }).then(res => {
      for (let i = 0; i < res.data.length; i++) { // 加入购物车需要的两个属性
        res.data[i].quantity = res.data[i].productMinimumPurchase || 1
        res.data[i].productPic = res.data[i].pic
      }
      recommendList = formatArrToFitCarousel(res.data)
    })
    return { productInfo, imgs, tabList, hotList, recommendList }
  },
  data () {
    return {
      nowTab: '0',
      tabList: [],
      hotList: [],
      productInfo: {
        collectStatus: 0,
        productSeo: {},
        quantity: 0
      },
      imgs: [],
      collectIcon: require('@/assets/images/secondary-desc-1.png'),
      collectIconActive: require('@/assets/images/secondary-desc-2.png'),
      count: 1,
      isActiveDesc: 0,
      recommendTitle: '推荐产品',
      recommendTitleIcon: require('@/assets/images/product-detail-recommend-icon.png'),
      recommendList: [
        [
          {
            id: 1,
            infoImg: require('@/assets/images/home-left-info.png'),
            title: '康明斯发电机组1',
            brand: '康明斯',
            weight: '新件号',
            minimum: 2,
            price: 1888.0
          },
          {
            id: 2,
            infoImg: require('@/assets/images/home-left-info.png'),
            title: '康明斯发电机组1',
            brand: '康明斯',
            weight: '新件号',
            minimum: 2,
            price: 1888.0
          },
          {
            id: 3,
            infoImg: require('@/assets/images/home-left-info.png'),
            title: '康明斯发电机组1',
            brand: '康明斯',
            weight: '新件号',
            minimum: 2,
            price: 1888.0
          }
        ],
        [
          {
            id: 1,
            infoImg: require('@/assets/images/home-left-info.png'),
            title: '康明斯发电机组1',
            brand: '康明斯',
            weight: '新件号',
            minimum: 2,
            price: 1888.0
          },
          {
            id: 2,
            infoImg: require('@/assets/images/home-left-info.png'),
            title: '康明斯发电机组1',
            brand: '康明斯',
            weight: '新件号',
            minimum: 2,
            price: 1888.0
          },
          {
            id: 3,
            infoImg: require('@/assets/images/home-left-info.png'),
            title: '康明斯发电机组1',
            brand: '康明斯',
            weight: '新件号',
            minimum: 2,
            price: 1888.0
          }
        ]
      ],
      moreStatus: false,
      defaultSeo: '维元动力商城'
    }
  },
  computed: {
    ...mapGetters([
      'hasLogin'
    ])
  },
  // watch: {
  //   $route () {
  //     console.log('luyoubianhual')
  //     this.getDetail(this.$route.query.id)
  //   }
  // },
  watchQuery: true,
  beforeMount () {
    // const id = this.$route.query.id
    // this.getDetail(id)
    // this.getTabData()

    // this.getRecommend()
    // this.getHot()
  },
  methods: {
    // 点击收藏
    collect () {
      console.log('收藏状态', this.productInfo.collectStatus)
      // 如果收藏了图标改为collectIconActive
      if (!this.hasLogin) {
        this.$message.warning('请先登录')
        this.$router.push('/login')
        return
      }
      if (this.productInfo.productCollectStatus === 1) {
        this.productInfo.productCollectStatus = 0
        this.$api.productCollect(this.productInfo).then(res => {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '取消收藏成功'
          })
        }).catch(err => {
          this.$message({
            type: 'error',
            duration: 1000,
            message: err
          })
          // this.getDetail(this.$route.query.id)
        })
      } else {
        this.productInfo.productCollectStatus = 1
        this.$api.productCollect(this.productInfo).then(res => {
          this.$message({
            type: 'success',
            duration: 1000,
            message: '收藏成功'
          })
        }).catch(err => {
          this.$message({
            type: 'error',
            duration: 1000,
            message: err
          })
          // this.getDetail(this.$route.query.id)
        })
      }
    },
    toMyOrder () {
      this.$router.push('/myOrder')
    },
    toMyCollect () {
      this.$router.push('/myCollect')
    },
    toHome () {
      this.$router.push('/')
    },
    // 计步器数量改变
    handleChange (value) {
      console.log('click')
      console.log(value)
    },
    // 加入购物车
    joinCar () {
      if (!this.hasLogin) {
        this.$message.warning('请先登录')
        this.$router.push('/login')
        return
      }
      if (this.$route.query.flagId !== undefined) {
        this.productInfo.recommendFlag = this.$route.query.flagId
      }
      this.$store.dispatch('cart/AddGood', this.productInfo).then(res => {
        this.$message({
          type: 'success',
          duration: 1000,
          message: '加入成功'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    // 描述内容切换
    changeDescTitle (i) {
      this.isActiveDesc = i
    },
    // 推荐产品轮播图的加入购物车
    recommendJoinCar (item) {
      if (item.needStatistics) {
        item.recommendFlag = item.id
      }
      this.$store.dispatch('cart/AddGood', item).then(res => {
        this.$message({
          type: 'success',
          duration: 1000,
          message: '加入成功'
        })
      }).catch(error => {
        console.log(error)
      })
    }
  },
  head () {
    return {
      notShowBanner: true,
      title: this.productInfo.productSeo ? this.productInfo.productSeo.seoTitle : this.defaultSeo,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.productInfo.productSeo ? this.productInfo.productSeo.seoKeyword : this.defaultSeo
        },
        {
          hid: 'description',
          name: 'description',
          content: this.productInfo.productSeo ? this.productInfo.productSeo.seoDesc : this.defaultSeo
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.product-detail {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  .product-detail-right {
    width: 960px;
    .product-detail-right-title {
      width: 100%;
      height: 328px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      display: flex;
      margin-bottom: 14px;
      .title-img {
        width: 328px;
        height: 328px;
        border-right: 1px solid #d9d9d9;
        /deep/ .el-carousel__container {
          margin-top: 0;
        }
        /deep/ .el-carousel__button {
          background-color: #000;
          opacity: 0.3;
        }
        /deep/ .is-active .el-carousel__button {
          opacity: 1;
        }
        .img-wrap {
          width: 100%;
          height: 100%;
          .imgItem {
            // max-width: 406px;
            // max-height: 468px;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
      .title-info {
        padding: 33px 0 0 60px;
        flex: 1;
        .title-info-name {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 18px;
        }
        .title-info-desc {
          font-size: 15px;
          color: #666;
          line-height: 25px;
          span {
            color: #fc303c;
            font-size: 18px;
          }
        }
      }
      .title-join {
        width: 246px;
        padding: 34px 60px 0 0;
        box-sizing: border-box;
        .title-join-collect {
          width: 70px;
          margin-left: auto;
          margin-bottom: 184px;
          cursor: pointer;
          div {
            width: 70px;
            height: 40px;
            border: 1px solid #c8c9cd;
            box-sizing: border-box;
            font-size: 14px;
            color: #666;
            line-height: 38px;
            text-align: center;
            border-radius: 4px;
          }
          .active-collect {
            background-color: #ff9900;
            color: #fff;
            border: none;
          }
          img {
            vertical-align: text-top;
            margin-right: 5px;
          }
        }

        .title-join-car {
          display: flex;
          margin-bottom: 15px;
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
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 0 4px 4px 0;
            text-align: center;
            // border: 1px solid #dcdfe6;
            border-left: none;
            background-color: #ff9900;
          }
        }
      }
    }
    .product-detail-right-desc {
      margin-bottom: 40px;
      .desc-title {
        width: 100%;
        height: 45px;
        line-height: 45px;
        border: 1px solid #d9d9d9;
        box-sizing: border-box;
        border-radius: 4px 4px 0 0;
        border-bottom: 2px solid #0093e6;
        display: flex;
        .desc-title-item {
          width: 122px;
          height: 100%;
          border-right: 1px solid #d9d9d9;
          color: #666;
          text-align: center;
          font-size: 16px;
        }
        .desc-title-item-active {
          background-color: #0093e6;
          color: #fff;
          border-right: none;
        }
      }
      .desc-content {
        width: 100%;
        min-height: 560px;
        background-color: #fcfcfc;
        border: 1px solid #d9d9d9;
        border-top: none;
        border-radius: 0 0 4px 4px;
        padding: 28px;
        box-sizing: border-box;
        font-size: 15px;
        color: #666;
        line-height: 28px;
        word-break: break-all;
      }
    }
    /deep/.el-carousel__container {
      margin-top: 10px;
    }
  }
}
.offtable {
  width: 1280px;
  height: 300px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin: 40px auto;
  .content {
    width: 650px;
    height: 144px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    .text {
      margin-top: 40px;
      font-size: 16px;
      color: #757575;
      .hard {
        margin-bottom: 10px;
        font-size: 18px;
        color: #333333;
      }
    }
  }
}
[v-cloak] {
  display: none;
}
</style>
