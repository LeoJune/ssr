<template>
  <div class="nav-wrap">
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="myMessageDetail">
      <div class="myMessageDetail-top">
        <div class="myMessageDetail-top-title">留言详情</div>
        <div
          class="myMessageDetail-top-return"
          @click="toMyMessage"
        >
          <img
            :src="returnIcon"
            alt
          />返回
        </div>
      </div>
      <div class="myMessageDetail-info">
        <div class="myMessageDetail-info-time">
          <div class="left">留言详情</div>
          <div class="right">留言时间：{{ info.createTime }}</div>
        </div>
        <div class="myMessageDetail-info-desc">
          <!-- <div v-if="info.replyStatus" class="myMessageDetail-info-desc-shop">{{info.shop}}</div> -->
          <div class="myMessageDetail-info-desc-text">{{ info.content }}</div>
          <!-- :class="{'text-have':info.replyStatus}" -->
          <div>
            <!-- <img
              :src="item"
              alt
              v-for="(item, index) in info.imgList"
              :key="index"
            /> -->
            <el-image
              v-for="(item, index) in info.imgList"
              :key="index"
              style="width: 108px; height: 82px; margin-right: 30px"
              :src="item"
              :previewSrcList="info.imgList"
            ></el-image>
          </div>
        </div>
        <div class="myMessageDetail-info-time">
          <div class="left">客服回复</div>
          <div class="right">回复时间：{{ info.replyTime }}</div>
        </div>
        <div
          class="myMessageDetail-info-desc"
          style="minheight: 324px"
        >
          <div
            v-if="!info.replyStatus"
            class="myMessageDetail-info-desc-text"
            style="color: #999"
          >
            暂未回复！
          </div>
          <div
            v-else
            class="myMessageDetail-info-desc-text"
          >
            {{ info.replyContent }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getMessageById } from '@/api/message'
import userNav from '@/components/user-nav/userNav'
// import { formatDate } from '@/utils/date'
export default {
  // name: 'myMessageDetail',
  components: {
    userNav
  },
  data () {
    return {
      nowUserNav: '在线反馈',
      returnIcon: require('@/assets/images/return.png'),
      // require('@/assets/images/send-my-message-1.png'),
      // require('@/assets/images/send-my-message-2.png')
      info: {
        createTime: '2018-10-30 03:04:56',
        replyTime: null,
        imgList: [],
        content: '',
        replyContent: null
      }
    }
  },
  mounted () {
    this.getContent(this.$route.query.id)
  },
  methods: {
    getContent (id) {
      this.$api.getMessageById(id).then(res => {
        // this.info = Object.assign(this.info, res.data)
        this.info = res.data
        if (res.data.imageUrls) {
          if (res.data.imageUrls.includes(';')) {
            this.info.imgList = res.data.imageUrls.split(';')
          } else {
            this.info.imgList = [res.data.imageUrls]
          }
        }
      })
    },
    toMyMessage () {
      this.$router.push('/myMessage')
    }
    // formatTime (time) {
    //   if (!time) {
    //     return
    //   }
    //   const mytime = new Date(time)
    //   return formatDate(mytime, 'yyyy-MM-dd hh:mm:ss')
    // }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap {
  padding: 10px 0 94px;
  display: flex;
  justify-content: space-between;
  .myMessageDetail {
    width: 960px;
    .myMessageDetail-top {
      width: 100%;
      height: 58px;
      border: 1px solid #e1e1e1;
      box-sizing: border-box;
      border-radius: 4px 4px 0 0;
      display: flex;
      .myMessageDetail-top-title {
        margin: 10px 0;
        width: 120px;
        line-height: 38px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #343434;
        border-right: 1px solid #e1e1e1;
      }
      .myMessageDetail-top-return {
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
    .myMessageDetail-info {
      border: 1px solid #e1e1e1;
      border-radius: 0 0 4px 4px;
      border-top: none;
      padding-top: 10px;
      .myMessageDetail-info-time {
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
      .myMessageDetail-info-desc {
        width: 100%;
        min-height: 210px;
        padding: 20px 20px 30px;
        box-sizing: border-box;
        .myMessageDetail-info-desc-shop {
          color: #1487d5;
          font-size: 16px;
          padding: 18px 0 16px;
          border-bottom: 1px solid #f0f0f0;
          margin-bottom: 13px;
          cursor: pointer;
        }
        img {
          width: 220px;
          margin-right: 20px;
        }
        .img-box-have {
          margin-bottom: 18px;
        }
        .myMessageDetail-info-desc-text {
          width: 100%;
          line-height: 24px;
          word-break: break-all;
          margin-bottom: 30px;
          color: #666;
          font-size: 15px;
        }
        .text-have {
          margin-bottom: 13px;
        }
      }
    }
  }
}
</style>
