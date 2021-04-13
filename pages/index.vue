<template>
  <div class="home">
    <!-- <div @click="testCookies1">测试token1</div>
    <div @click="testCookies2">测试token2</div> -->
    <div class="home-left">
      <div class="home-left-title">
        <img
          src="../assets/images/home-left-hot.png"
          alt
        />
        热卖产品
      </div>
      <div
        v-for="(item, index) in hotList"
        :key="index"
        class="home-left-item"
        @click="fromHotToDetail(item)"
      >
        <div class="home-left-item-img">
          <img
            :src="item.pic || item.defaultProductImg"
            alt
          />
        </div>
        <div class="home-left-item-title">
          {{ item.productName }}
        </div>
        <div class="home-left-item-info">
          <div class="info-item">
            品牌：{{ item.brandName }}
          </div>
          <div class="info-item">
            重量：{{ item.weight }}
          </div>
          <div class="info-item">
            最低起订量：{{ item.productMinimumPurchase }} 件
          </div>
        </div>
        <div class="home-left-item-price">
          ￥{{ item.price }}
        </div>
        <button @click.stop="joinCart(item, true)">
          <img
            src="../assets/images/home-left-car.png"
            alt
          />加入购物车
        </button>
      </div>
    </div>
    <div class="home-right">
      <div class="home-right-info-title">
        维元动力致力于为您提供优质的产品和高质量的一站式服务
      </div>
      <div class="home-right-info-desc">
        <p>
          义乌市维元动力设备有限公司是一家专业从事燃气动力、燃气发电机组产品的研发、生产、销售、维修服务并拥有自营进出口权的专业公司。公司拥有一批从事超过15年燃气发动机研发、生产经验的专业化人才，近年来不断的吸纳高校专业化技术人员,企业建立一套良好的质量管理体系和产品服务管理体系...
        </p>
        <nuxt-link to="/companyProfile">
          <div class="home-right-info-more">
            <!-- @click="toAboutUs" -->
            查看更多>
            <img
              src="../assets/images/header-car.png"
              alt
            />
          </div>
        </nuxt-link>
      </div>
      <!-- 最新上架 -->
      <Carousel
        :showIcon="true"
        :needStatistics="true"
        :title="newTitle"
        :titleIcon.sync="newTitleIcon"
        :dataList.sync="newList"
        :isShowRight.sync="newStatus"
        @joinCar="joinCart"
      ></Carousel>
      <Carousel
        v-for="(item, index) in homeLists"
        v-show="
          !(
            !item.recommendProductList || item.recommendProductList.length === 0
          )
        "
        :key="index"
        :dataList="format(item.recommendProductList, 3)"
        :title="item.name"
        :titleIcon.sync="item.icon"
        :categoryId="item.id"
        :categoryName="item.name"
        :defaultProductImg="item.defaultProductImg"
        @joinCar="joinCart"
      ></Carousel>
      <div class="home-right-buy">
        <div class="home-right-buy-title">
          <img
            src="./../assets/images/home-right-buy.png"
            alt
          />购买流程指南
        </div>
        <p>一站式购买流程，让您体验到最极致的服务与便利！</p>
        <div class="home-right-buy-desc">
          很简单！只需单击几下，您便可以确保开设一个客户帐户，在线访问更多功能；很简单！只需单击几下，您便可以确保开设一个客户帐户，在线访问更多功能；很简单！只需单击几您便可以确保开设一个客户帐户，您便可以确保开设一个客户帐户，在线访问更多功能；很简单！只需单击几下，您便可以确保开设一个客户帐户，在线访问更多功能；在线访问更多功能您便可以确保开设一个客户帐户，在线访问更多功能；很简单！只需单击几下，您便可以确保开设一个客户帐户，在线访问更多功能；在线访问更多功能！
        </div>
        <div class="home-right-buy-img">
          <img
            src="../assets/images/home-right-buy-img.png"
            alt
          />
        </div>
      </div>
      <!-- 图标轮播图 -->
      <CarouselSmall :dataList.sync="smallList"></CarouselSmall>
    </div>
    <!-- <div class="home-fixed">
      <ul>
        <li><img src="../assets/images/home-fixed-1.png" alt />在线咨询</li>
        <li><img src="../assets/images/home-fixed-2.png" alt />QQ咨询</li>
        <li><img src="../assets/images/home-fixed-3.png" alt />微信咨询</li>
        <li>
          <img src="../assets/images/home-fixed-4.png" alt />
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
// import store from '@/store'
import { setToken, getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { formatArrToFitCarousel, formatCorperate } from '@/utils/validate'
import Carousel from '@/components/carousel/carousel.vue'
import CarouselSmall from '@/components/carousel/carouselSmall.vue'

export default {
  components: {
    Carousel,
    CarouselSmall
  },
  async asyncData ({ app }) {
    // 0 最新上架 1 热卖产品 2 推荐产品
    let newList = [] // 最新上架
    let homeLists = [] // 推荐商品（最多三栏的那个）
    let hotList = [] // 热卖商品
    let smallList = [] // 合作伙伴
    // const seoInfo = {}
    let seoInfo = {}
    await app.$api.getDefaultSeo().then(res => {
      seoInfo = res.data[0]
    })
    await app.$api.getProductInDictionary({ type: 0, recommendStatus: 1 }).then(res => {
      for (let i = 0; i < res.data.length; i++) { // 加入购物车需要的两个属性
        res.data[i].quantity = res.data[i].productMinimumPurchase || 1
        res.data[i].productPic = res.data[i].pic
      }
      newList = formatArrToFitCarousel(res.data)
    })
    await app.$api.getProductInDictionary({ type: 1, recommendStatus: 1 }).then(res => {
      for (let i = 0; i < res.data.length; i++) { // 加入购物车需要的两个属性
        res.data[i].quantity = res.data[i].productMinimumPurchase || 1
        res.data[i].productPic = res.data[i].pic
      }
      if (res.data.length > 7) {
        hotList = res.data.slice(0, 7)
      } else {
        hotList = res.data
      }
    })
    await app.$api.getRecomendHomeList({ type: 0, recommendStatus: 1 }).then(res => {
      for (let i = 0; i < res.data.length; i++) { // 加入购物车需要的两个属性
        if (res.data[i].recommendProductList && res.data[i].recommendProductList.length !== 0) {
          for (let j = 0; j < res.data[i].recommendProductList.length; j++) {
            res.data[i].recommendProductList[j].quantity = res.data[i].recommendProductList[j].productMinimumPurchase || 1
            res.data[i].recommendProductList[j].productPic = res.data[i].recommendProductList[j].pic
            // 只有这个没有productName
            res.data[i].recommendProductList[j].productName = res.data[i].recommendProductList[j].name
          }
        }
        // res.data[i].quantity = res.data.productMinimumPurchase || 1
        // res.data[i].productPic = res.data.pic
      }
      homeLists = res.data
    })
    await app.$api.getAdInDictionary({ type: 2, status: 1 }).then(res => {
      // this.bannerList = formatArrToFitCarousel(res.data)
      smallList = formatCorperate(res.data, 4)
    })

    return { newList, homeLists, hotList, smallList, seoInfo }
  },
  data () {
    return {
      hotList: [],
      newList: [], // 三个一组,数组的形式
      homeLists: [],
      newTitle: '最新上架',
      newTitleIcon: require('../assets/images/home-right-new.png'),
      fuelTitle: '燃油系列',
      fuelTitleIcon: require('../assets/images/home-right-fuel.png'),
      launchTitle: '发动机系列',
      launchTitleIcon: require('../assets/images/home-right-launch.png'),
      newStatus: false,
      smallList: [
        [
          require('../assets/images/home-right-small1.png'),
          require('../assets/images/home-right-small1.png'),
          require('../assets/images/home-right-small1.png'),
          require('../assets/images/home-right-small1.png')
        ],
        [
          require('../assets/images/home-right-small2.png'),
          require('../assets/images/home-right-small2.png'),
          require('../assets/images/home-right-small2.png'),
          require('../assets/images/home-right-small2.png')
        ]
      ],
      seoInfo: {},
      defaultSeo: '维元动力商城'
    }
  },
  computed: {
    ...mapGetters([
      'hasLogin'
    ])
  },
  methods: {
    testCookies2 () {
      console.log(setToken)
    },
    testCookies1 () {
      console.log(getToken())
    },
    format (arr, num) {
      return formatCorperate(arr, num)
    },
    joinCart (item, needStatistics) {
      console.log('加入购物车点击')
      if (!this.hasLogin) {
        this.$message.warning('请先登录')
        this.$router.push('/login')
      } else {
        if (needStatistics) {
          item.recommendFlag = item.id
        }
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
    fromHotToDetail (item) {
      this.$router.push({ path: '/productDetail', query: { id: item.productId, flagId: item.id } })
    },
    toAboutUs () {
      this.$router.push('/companyProfile')
    }
  },
  head () {
    return {
      title: this.seoInfo.seoTitle ? this.seoInfo.seoTitle : this.defaultSeo,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.seoInfo.seoKeyword ? this.seoInfo.seoKeyword : this.defaultSeo
        },
        {
          hid: 'description',
          name: 'description',
          content: this.seoInfo.seoDesc ? this.seoInfo.seoDesc : this.defaultSeo
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  padding: 15px 0 46px;
  display: flex;
  justify-content: space-between;
  .home-left {
    width: 280px;
    .home-left-title {
      width: 100%;
      height: 40px;
      padding-left: 12px;
      color: #fff;
      background-color: #1487d5;
      display: flex;
      align-items: center;
      font-size: 20px;
      box-sizing: border-box;
      border-radius: 4px;
      img {
        margin-right: 77px;
      }
    }
    .home-left-item {
      width: 100%;
      // height: 393px;
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      margin-top: 20px;
      cursor: pointer;
      .home-left-item-img {
        width: 100%;
        height: 174px;
        margin-bottom: 13px;
        // overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          // margin-left: 50%;
          // // margin-top: 40%;
          // transform: translateX(-50%);
        }
      }
      .home-left-item-title {
        font-size: 18px;
        color: #333;
        font-weight: 400;
        margin-bottom: 15px;
        line-height: 22px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .home-left-item-info {
        .info-item {
          color: #666;
          font-size: 15px;
          margin-bottom: 8px;
        }
      }
      .home-left-item-price {
        color: #fc303c;
        font-size: 22px;
        padding-top: 5px;
      }
      button {
        width: 100%;
        height: 35px;
        line-height: 35px;
        border-radius: 4px;
        background-color: #00aef3;
        font-size: 16px;
        color: #fff;
        margin-top: 12px;
        cursor: pointer;
        img {
          vertical-align: text-top;
          margin-right: 5px;
        }
      }
    }
  }
  .home-right {
    width: 937px;
    .home-right-info-title {
      color: #1487d5;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .home-right-info-desc {
      font-size: 15px;
      line-height: 26px;
      color: #666;
      border-bottom: 1px solid #cdcdcd;
      padding-bottom: 30px;
      margin-bottom: 25px;
      position: relative;
      .home-right-info-more {
        position: absolute;
        bottom: 30px;
        right: 0;
        font-size: 14px;
        color: #1487d5;
        cursor: pointer;
      }
    }
    .home-right-buy {
      .home-right-buy-title {
        font-size: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
        color: #666;
        font-weight: bold;
        img {
          vertical-align: middle;
          margin-right: 12px;
        }
      }
      p {
        color: #666;
        font-weight: bold;
        font-size: 18px;
        margin: 18px 0 26px;
      }
      .home-right-buy-desc {
        font-size: 16px;
        color: #666;
        line-height: 26px;
        margin-bottom: 35px;
      }
      .home-right-buy-img {
        width: 100%;
        margin-bottom: 45px;
      }
    }
  }
  .home-fixed {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    ul {
      li {
        width: 70px;
        height: 85px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background-color: #00aef3;
        padding: 15px 0 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
        img {
          display: block;
          margin: 0 auto 10px;
        }
        &:nth-child(1) {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        &:nth-child(4) {
          padding-top: 30px;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
  }
}
</style>
