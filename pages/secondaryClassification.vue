<template>
  <div
    v-loading="listLoading"
    class="secondary"
  >
    <SideTab
      :tabList.sync="tabList"
      :hotList.sync="hotList"
      :activeTab="nowTab"
      @getTabItem="getTabItem"
    ></SideTab>
    <div class="secondary-right">
      <div
        v-if="hasChild"
        class="secondary-right-class"
      >
        <div class="secondary-right-class-title">{{ classTitle }}-分类</div>
        <div class="secondary-right-class-info">
          <div
            v-for="(item, index) in classList"
            :key="index"
            class="info-item"
            @click="checkChild(item)"
          >
            <div class="info-item-img">
              <img
                :src="item.defaultProductImg || item.productDefaultImg"
                alt
                class="categroy-defaultimg"
              />
            </div>
            <div class="info-item-name">{{ item.name }}</div>
            <button>查看分类详情</button>
          </div>
        </div>
      </div>
      <com-ProductList
        :commodityList="commodityList"
        :pageSize.sync="pageSize"
        :total="total"
        @sortChange="sortChange"
        @collectStatusChange="collectStatusChange"
        @changeCurrent="changeCurrent"
        @goDetail="goDetail"
        @joinCart="joinCart"
      ></com-ProductList>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import { mapGetters } from 'vuex'
// import { getBrother, getChild, getProductByCategory } from '@/api/secondClass'
// import { getProductInDictionary } from '@/api/product'
import SideTab from '@/components/side-tab/sideTab.vue'
import comProductList from '@/components/product-list/comProductList.vue'
const defaultListquery = {
  productCategoryId: null,
  pageNum: 1,
  pageSize: 5,
  sortByPrice: null,
  frontend: true
}
export default {
  name: 'SecondaryClassification',
  components: {
    SideTab,
    comProductList
  },
  async asyncData ({ app, query }) {
    const name = query.name
    const id = query.id
    delete defaultListquery.productCategoryId
    const listQuery = Object.assign({ productCategoryId: id }, defaultListquery)
    console.log(listQuery)
    const nowTab = id
    let tabList = [] // 左边的分类tab
    let hotList = [] // 热卖商品
    let commodityList = [] // 列表商品
    let classList = [] // 下级分类
    const classTitle = name
    let hasChild = false
    let total = 0
    const seoInfo = {}

    await app.$api.getProductByCategory(listQuery).then(res => {
      for (let i = 0; i < res.data.records.length; i++) { // 加入购物车需要的两个属性
        res.data.records[i].quantity = res.data.records[i].productMinimumPurchase || 1
        res.data.records[i].productPic = res.data.records[i].pic
        res.data.records[i].productName = res.data.records[i].name

        res.data.records[i].productPrice = res.data.records[i].price // 收藏需要的属性
      }
      commodityList = res.data.records
      total = res.data.total
    })
    await app.$api.getBrother(id).then(res => {
      tabList = res.data
    })
    await app.$api.getChild(id, { pageSize: 100, pageNum: 1 }).then(res => {
      classList = res.data.list
      if (res.data.list.length === 0) {
        hasChild = false
      } else {
        hasChild = true
      }
    }).catch(error => {
      console.log(error)
      hasChild = false
    })
    await app.$api.getProductInDictionary({ type: 1, recommendStatus: 1 }).then(res => {
      if (res.data.length > 7) {
        hotList = res.data.slice(0, 7)
      } else {
        hotList = res.data
      }
    })

    return { nowTab, tabList, hotList, commodityList, classTitle, classList, hasChild, total, seoInfo, listQuery }
  },
  data () {
    return {
      nowTab: '0',
      hasChild: false,
      listLoading: false,
      // listQuery: {Object.assign({}, defaultListquery)},
      listQuery: {},
      tabList: [],
      hotList: [],
      commodityList: [],
      total: 501,
      pageSize: 5,
      classTitle: '',
      classList: [],
      seoInfo: {},
      defaultSeo: '维元动力商城'
    }
  },
  computed: {
    ...mapGetters([
      'hasLogin'
    ])
  },
  watchQuery: true,
  // watch: {
  //   $route () {
  //     // console.log('luyoubianhual')
  //     this.getData()
  //   }
  // },
  // created () {
  //   this.getData()
  //   this.getHot()
  // },
  beforeMount () {
    // this.getData()
    // this.getHot()
  },
  methods: {
    getListData () {
      this.listLoading = true
      this.$api.getProductByCategory(this.listQuery).then(res => {
        for (let i = 0; i < res.data.records.length; i++) { // 加入购物车需要的两个属性
          res.data.records[i].quantity = res.data.records[i].productMinimumPurchase || 1
          res.data.records[i].productPic = res.data.records[i].pic
          res.data.records[i].productName = res.data.records[i].name

          res.data.records[i].productPrice = res.data.records[i].price // 收藏需要的属性
        }
        this.commodityList = res.data.records
        this.total = res.data.total
        this.listLoading = false
      })
    },
    // 点击左侧tab分类
    getTabItem (item) {
      console.log(item, 123)
      this.classTitle = item.name
    },
    // 排序
    sortChange (i) {
      console.log('paixu' + i)
      if (i === 2) { // comProduct传过来的参数,2代表降序,1升序,业务要求才改变的,和之前和后台约定有出入
        this.listQuery.sortByPrice = 0 // 后台0降序,1升序
      } else if (i === 1) {
        this.listQuery.sortByPrice = 1
      } else {
        this.listQuery.sortByPrice = null
      }
      this.getListData()
    },
    // 收藏
    collectStatusChange (value) {
      if (!this.hasLogin) {
        this.$router.push('/login')
      } else {

      }
      console.log('收藏状态', value.collectStatus)
      if (value.collectStatus === 0) {
        // 调接口修改收藏状态
        console.log('点击收藏1')
      } else if (value.collectStatus === 1) {
        // 调接口修改收藏状态
        console.log('点击收藏2')
      }
    },
    // 加入购物车
    joinCart (item) {
      if (!this.hasLogin) {
        this.$message.warning('请先登录')
        this.$router.push('/login/loginIndex')
      } else {
        this.$store.dispatch('AddGood', item).then(res => {
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
    // 分页器改变
    changeCurrent (current) {
      this.listQuery.pageNum = current
      this.getListData()
    },
    // 查看分类详情
    goProduct (item) {
      this.$router.push({ path: '/productList', query: { id: item.id } })
    },
    checkChild (item) {
      this.$api.getChild(item.id).then(res => {
        if (res.data.list.length === 0) {
          this.$router.push({ path: '/productList', query: { id: item.id } })
        } else {
          this.$router.push({ path: '/secondaryClassification', query: { id: item.id, name: item.name } })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查看单个商品详情
    goDetail (item) {
      this.$router.push({ path: '/productDetail', query: { id: item.productId } })
    }
  },
  head () {
    return {
      title: this.seoInfo.productSeo ? this.seoInfo.productSeo.seoTitle : this.defaultSeo,
      meta: [
        {
          name: 'keywords',
          content: this.seoInfo.productSeo ? this.seoInfo.productSeo.seoKeyword : this.defaultSeo
        },
        {
          hid: 'description',
          name: 'description',
          content: this.seoInfo.productSeo ? this.seoInfo.productSeo.seoDesc : this.defaultSeo
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.secondary {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  .secondary-right {
    width: 960px;
    .secondary-right-class {
      .secondary-right-class-title {
        font-size: 20px;
        color: #666;
        margin-top: 10px;
        margin-bottom: 30px;
      }
      .secondary-right-class-info {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        .info-item {
          width: 225px;
          height: 260px;
          border: 1px solid #d9d9d9;
          border-bottom: none;
          border-radius: 4px;
          position: relative;
          margin-bottom: 20px;
          cursor: pointer;
          margin-right: 16px;
          &:nth-child(4n) {
            margin-right: 0;
          }
          .info-item-img {
            // width: 203px;
            height: 200px;
            width: 100%;
            overflow: hidden;
            margin: 0 auto;
            .categroy-defaultimg {
              max-width: 100%;
              max-height: 100%;
              position: relative;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              object-fit: contain;
            }
          }
          .info-item-name {
            text-align: center;
            font-size: 18px;
            font-weight: 500;
          }
          button {
            width: 100%;
            height: 38px;
            background-color: #00aef3;
            color: #fff;
            font-size: 16px;
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 0 0 4px 4px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
