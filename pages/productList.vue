<template>
  <div
    v-loading="listLoading"
    class="product-list"
  >
    <SideTab
      :tabList.sync="tabList"
      :hotList.sync="hotList"
      :activeTab="nowTab"
      @getTabItem="getTabItem"
    ></SideTab>
    <!-- :brandTab="brandTab" -->
    <div class="product-list-right">
      <com-ProductList
        :commodityList.sync="commodityList"
        :pageSize.sync="pageSize"
        :total.sync="total"
        @sortChange="sortChange"
        @quantityChange="quantityChange(arguments)"
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
// import { getProduct, getProductInDictionary } from '@/api/product'
// , productCollect
// import { getAllCategory } from '@/api/header'
// getBrandList,
import SideTab from '@/components/side-tab/sideTab.vue'
import comProductList from '@/components/product-list/comProductList.vue'

const defaultListquery = {
  brandId: null,
  productCategoryId: null,
  pageNum: 1,
  pageSize: 5,
  sortByPrice: null,
  frontend: true
}
export default {
  components: {
    SideTab,
    comProductList
  },
  async asyncData ({ query, app }) {
    const brandTab = query.brandTab
    const id = query.id
    const nowTab = '0'
    let tabList = []
    let hotList = []
    let commodityList = []
    let total = 0
    delete defaultListquery.productNameOrSn
    const listQuery = Object.assign({}, defaultListquery)
    if (brandTab) {
      listQuery.brandId = id
    } else {
      listQuery.productCategoryId = id
    }

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
    await app.$api.getProduct(listQuery).then(res => {
      for (let i = 0; i < res.data.records.length; i++) { // 加入购物车需要的两个属性
        res.data.records[i].quantity = res.data.records[i].productMinimumPurchase || 1
        res.data.records[i].productPic = res.data.records[i].pic
        res.data.records[i].productName = res.data.records[i].name

        res.data.records[i].productPrice = res.data.records[i].price // 收藏需要的属性
      }
      commodityList = res.data.records
      total = res.data.total
    })
    return { brandTab, nowTab, tabList, hotList, commodityList, total, listQuery }
  },
  data () {
    return {
      id: null,
      brandTab: null,
      nowTab: null,
      tabList: [],
      hotList: [],
      commodityList: [],
      total: 501,
      pageSize: 8,
      listLoading: false,
      // listQuery: Object.assign({}, defaultListquery)
      listQuery: {}
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
  //     this.listQuery = Object.assign({}, defaultListquery)
  //     console.log('luyoubianhual')
  //     this.getAllData()
  //   }
  // },
  // created () {
  //   this.getAllData()
  //   this.getHot()
  // },
  methods: {
    // getAllData () {
    //   const id = this.$route.query.id
    //   if (this.$route.query.brandTab) {
    //     this.brandTab = true
    //     // this.nowTab = id
    //     this.nowTab = '0'
    //     this.listQuery.brandId = id
    //   } else {
    //     this.brandTab = false
    //     this.nowTab = '0'
    //     this.listQuery.productCategoryId = id
    //   }

    //   this.getTabData() // 获取tab 根据 brandtab 的值

    //   this.listQuery.pageNum = 1 //  在getList之前都要把页数复原,只有在动页数的时候才不是1,动页数的时候再直接指定确切数字
    //   this.getListData() // 获取list
    // },
    // getTabData () {
    //   if (this.$route.query.brandTab) {
    //     this.brandTab = true
    //   } else {
    //     this.brandTab = false
    //   }
    //   getAllCategory().then(res => {
    //     this.tabList = res.data
    //   })
    // },
    getListData () {
      this.listLoading = true
      //  获取商品
      this.$api.getProduct(this.listQuery).then(res => {
        for (let i = 0; i < res.data.records.length; i++) { // 加入购物车需要的三个属性
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
    quantityChange (e) {
      console.log('购物车数量', e)
    },
    joinCart (item) {
      if (!this.hasLogin) {
        this.$message.warning('请先登录')
        this.$router.push('/login')
      } else {
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
    // 分页器改变
    changeCurrent (current) {
      this.listQuery.pageNum = current
      this.getListData()
    },
    // 查看单个商品详情
    goDetail (item) {
      this.$router.push({ path: '/productDetail', query: { id: item.productId } })
    }
  }
}
</script>

<style lang="less" scoped>
.product-list {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  .product-list-right {
    width: 960px;
  }
}
</style>
