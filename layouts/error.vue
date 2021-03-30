<template>
  <div>
    <div class="offtable">
      <div class="content">
        <img
          src="@/assets/images/offtable.png"
          alt=""
        />
        <div class="text">
          <p class="hard">很抱歉,您查看的页面构建中</p>
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
import { mapGetters } from 'vuex'

export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'hasLogin'
    ]),
    timeout () {
      return this.error
    }
  },
  created () {
    console.log(this.error)
  },
  methods: {
    toMyOrder () {
      this.$router.push('/myOrder')
    },
    toMyCollect () {
      this.$router.push('/myCollect')
    },
    toHome () {
      this.$router.push('/')
    }
  },
  head () {
    return {
      //   notShowBanner: true,
      //   title: this.productInfo.productSeo ? this.productInfo.productSeo.seoTitle : this.defaultSeo,
      //   meta: [
      //     {
      //       hid: 'keywords',
      //       name: 'keywords',
      //       content: this.productInfo.productSeo ? this.productInfo.productSeo.seoKeyword : this.defaultSeo
      //     },
      //     {
      //       hid: 'description',
      //       name: 'description',
      //       content: this.productInfo.productSeo ? this.productInfo.productSeo.seoDesc : this.defaultSeo
      //     }
      //   ]
    }
  }
}
</script>

<style lang="less" scoped>
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
