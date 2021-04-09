<template>
  <div class="layout-footer">
    <div class="footer-friendlink">
      <div class="footer-friendlink-box core">
        友情链接：
        <a
          v-for="(item, index) in friendLinkList"
          :key="index"
          :href="item.url"
        >{{ item.name }}</a>
      </div>
    </div>
    <div class="footer-call">
      <div class="footer-call-box core">
        <div class="footer-call-item">
          <div class="footer-call-item-title">
            付款方式
          </div>
          <div class="footer-call-item-payment">
            <img
              src="@/assets/images/footer-payment-wei.png"
              alt
            />
          </div>
          <div class="footer-call-item-payment">
            <img
              src="@/assets/images/footer-payment-zhi.png"
              alt
            />
          </div>
        </div>
        <div class="footer-call-item">
          <div class="footer-call-item-title">
            联系方式
          </div>
          <div class="footer-call-item-info">
            <div><span>电话：</span>027-85903199</div>
            <div><span>传真：</span>027-85903199</div>
            <div><span>邮箱：</span>info@weyeahpower.com</div>
            <div>
              <span>地址：</span>
              <div class="info-address">
                武汉市黄陂区盘龙大道28号E4-13
              </div>
            </div>
          </div>
        </div>
        <div class="footer-call-item">
          <div class="footer-call-item-title">
            公司微信
          </div>
          <div class="footer-call-item-payment">
            <img
              src="@/assets/images/footer-wei.png"
              alt
            />
          </div>
        </div>
        <div class="footer-call-item">
          <div class="footer-call-item-title">
            关注我们
          </div>
          <div class="footer-call-item-follow">
            <img
              src="@/assets/images/footer-follow-bo.png"
              alt
            />
            <img
              src="@/assets/images/footer-follow-kong.png"
              alt
            />
            <img
              src="@/assets/images/footer-follow-ren.png"
              alt
            />
            <img
              src="@/assets/images/footer-follow-q.png"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      ©2018 武汉维元动力有限公司 版权所有 鄂 ICP备17064005号
    </div>
    <div class="footer-back-top">
      <BackTop></BackTop>
    </div>
  </div>
</template>

<script>
// import { getAdInDictionary } from '@/api/dictionary'
import BackTop from '@/components/back-top/backTop.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    BackTop
  },
  data () {
    return {
      // friendLinkList: []
    }
  },
  computed: {
    ...mapGetters([
      'friendLinkList'
    ])
  },
  // created () {
  //   this.getList()
  // },
  beforeMount () {
    // this.getList()
  },
  methods: {
    getList () {
      this.$api.getAdInDictionary({ type: 3, status: 1 }).then(res => {
        this.friendLinkList = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout-footer {
  position: relative;
  .footer-friendlink {
    width: 100%;
    min-height: 47px;
    background-color: #106fb0;
    .footer-friendlink-box {
      font-size: 14px;
      word-break: break-all;
      color: #fff;
      padding: 16px 0;
      box-sizing: border-box;
      a {
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        margin-right: 22px;
      }
    }
  }
  .footer-call {
    width: 100%;
    height: 185px;
    background-color: #1487d5;
    .footer-call-box {
      height: 100%;
      padding: 26px 40px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .footer-call-item {
        color: #fff;
        .footer-call-item-title {
          font-size: 20px;
          // font-weight: bold;
          // font-family: "Microsoft YaHei"
          margin-bottom: 17px;
        }
        .footer-call-item-payment {
          img {
            display: block;
            margin-bottom: 14px;
          }
        }
        .footer-call-item-info {
          width: 320px;
          div {
            margin-bottom: 12px;
            display: flex;
            font-size: 15px;
            span {
              display: block;
              width: 50px;
            }
            .info-address {
              width: calc(100% - 50px);
              word-break: break-all;
            }
          }
        }
        .footer-call-item-follow {
          img {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .footer-bottom {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #106fb0;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
  .footer-back-top {
    position: absolute;
    top: -140px;
    right: 0;
  }
}
</style>
