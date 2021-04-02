<template>
  <div class="nav-wrap">
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="websiteLetterDetail">
      <div class="websiteLetterDetail-top">
        <div class="websiteLetterDetail-top-title">信息详情</div>
        <div
          class="websiteLetterDetail-top-return"
          @click="toWebsiteLetter"
        >
          <img
            :src="returnIcon"
            alt
          />返回
        </div>
      </div>
      <div class="websiteLetterDetail-info">
        <div class="websiteLetterDetail-info-time">
          <div class="left">信息详情:</div>
          <div class="right">收信时间：{{ letter.receiveTime }}</div>
        </div>
        <div
          class="websiteLetterDetail-info-desc"
          v-html="letter.content"
        >
          <!-- <div>
            <img :src="item" alt v-for="(item,index) in info.imgList" :key="index" />
          </div>
          <div class="websiteLetterDetail-info-desc-text">{{info.desc}}</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userNav from '@/components/user-nav/userNav'
// import { getLetterById } from '@/api/websiteLetter'
// import { formatDate } from '@/utils/date'
export default {
  // name: 'websiteLetterDetail',
  components: {
    userNav
  },
  data () {
    return {
      nowUserNav: '站内信息',
      returnIcon: require('@/assets/images/return.png'),
      letter: {
        receiveTime: '',
        content: ''
      }

    }
  },
  mounted () {
    this.getLetterInfo(this.$route.query.id)
  },
  methods: {
    getLetterInfo (id) {
      this.$api.getLetterById(id).then(res => {
        // const mytime = new Date(res.data.receiveTime)
        // this.letter.receiveTime = formatDate(mytime, 'yyyy-MM-dd hh:mm:ss')
        this.letter.receiveTime = res.data.receiveTime
        this.letter.content = res.data.content
      })
    },
    toWebsiteLetter () {
      this.$router.push({ name: 'websiteLetter' })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  .websiteLetterDetail {
    width: 960px;
    .websiteLetterDetail-top {
      width: 100%;
      height: 58px;
      border: 1px solid #e1e1e1;
      box-sizing: border-box;
      border-radius: 4px 4px 0 0;
      display: flex;
      .websiteLetterDetail-top-title {
        margin: 10px 0;
        width: 120px;
        line-height: 38px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #343434;
        border-right: 1px solid #e1e1e1;
      }
      .websiteLetterDetail-top-return {
        color: #1487d5;
        font-size: 20px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          margin-right: 5px;
        }
      }
    }
    .websiteLetterDetail-info {
      border: 1px solid #e1e1e1;
      border-radius: 0 0 4px 4px;
      border-top: none;
      padding-top: 10px;
      .websiteLetterDetail-info-time {
        width: 100%;
        height: 50px;
        background-color: #f1f1f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        color: #666;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
      }
      .websiteLetterDetail-info-desc {
        width: 100%;
        min-height: 580px;
        padding: 40px 15px 0;
        box-sizing: border-box;
        img {
          margin-right: 20px;
        }
        .websiteLetterDetail-info-desc {
          width: 100%;
          min-height: 580px;
          padding: 40px 15px 0;
          box-sizing: border-box;
          img {
            width: 360px;
            margin-right: 20px;
          }
          .websiteLetterDetail-info-desc-text {
            width: 100%;
            line-height: 24px;
            word-break: break-all;
            margin-top: 30px;
            color: #666;
            font-size: 15px;
            text-indent: 2em;
          }
        }
      }
    }
  }
}
</style>
