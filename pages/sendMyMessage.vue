<template>
  <div class="nav-wrap">
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="sendMyMessage">
      <div class="sendMyMessage-top">
        <div class="sendMyMessage-top-title">我要留言</div>
        <div
          class="sendMyMessage-top-return"
          @click="toMyMessage"
        >
          <img
            :src="returnIcon"
            alt
          />返回
        </div>
      </div>
      <div class="sendMyMessage-info">
        <el-form
          ref="messageInfo"
          :model="messageInfo"
          :rules="rules"
        >
          <el-form-item prop="content">
            <div class="sendMyMessage-info-title">留言信息：</div>
            <el-input
              v-model="messageInfo.content"
              type="textarea"
              maxlength="200"
              placeholder="请输入留言信息"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机："
            prop="mobile"
            labelWidth="60px"
          >
            <el-input
              v-model="messageInfo.mobile"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱："
            prop="email"
            labelWidth="60px"
          >
            <el-input
              v-model="messageInfo.email"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传图片（不超过5张）：">
            <!-- <single-upload v-model="messageInfo.imgList" style :sizeLimit="2*1024" :limit="5"></single-upload> -->
            <multi-upload v-model="messageInfo.piclist"></multi-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { sendMessage } from '@/api/message'
import userNav from '@/components/user-nav/userNav'
import multiUpload from '@/components/Upload/multiUpload'

const checkPhone = (rule, value, callback) => {
  if (value === '') {
    callback()
  } else {
    const reg = /^1[34578][0-9]\d{8}$/
    if (!reg.test(value)) {
      callback(new Error('请输入正确手机号码'))
    } else {
      callback()
    }
  }
}
const checkEmail = (rule, value, callback) => {
  if (value === '') {
    callback()
  } else if (!value.includes('@')) {
    callback(new Error('请输入正确邮箱'))
  } else {
    callback()
  }
}
export default {
  // name: 'sendMyMessage',
  components: {
    userNav,
    multiUpload
  },
  data () {
    return {
      nowUserNav: '在线反馈',
      returnIcon: require('@/assets/images/return.png'),
      messageInfo: {
        content: '',
        mobile: '',
        email: '',
        piclist: []
      },
      rules: {
        content: [{ required: true, trigger: 'blur', message: '请输入留言信息' }],
        mobile: [{ trigger: 'blur', validator: checkPhone }],
        email: [{ trigger: 'blur', validator: checkEmail }]
      }
    }
  },
  created () {

  },
  methods: {
    hello () {
      console.log('this is ' + this.position)
    },
    toMyMessage () {
      this.$router.push('/myMessage')
    },
    handleSubmit () {
      this.$refs.messageInfo.validate((valid) => {
        if (valid) {
          if (!this.messageInfo.mobile && !this.messageInfo.email) {
            this.$message({
              type: 'error',
              duration: 1000,
              message: '请至少输入一种联系方式'
            })
          } else {
            if (this.messageInfo.piclist.length > 0) {
              this.messageInfo.imageUrls = ''
              for (let i = 0; i < this.messageInfo.piclist.length; i++) {
                if (i === this.messageInfo.piclist.length - 1) {
                  this.messageInfo.imageUrls = this.messageInfo.imageUrls + this.messageInfo.piclist[i]
                } else {
                  this.messageInfo.imageUrls = this.messageInfo.imageUrls + this.messageInfo.piclist[i] + ';'
                }
              }
            }

            this.$api.sendMessage(this.messageInfo).then(res => {
              this.$message({
                type: 'success',
                duration: 1000,
                message: '留言成功'
              })
              this.$router.push('/myMessage')
            })
          }
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'error',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap {
  padding: 10px 0 200px;
  display: flex;
  justify-content: space-between;
  .sendMyMessage {
    width: 960px;
    .sendMyMessage-top {
      width: 100%;
      height: 58px;
      border: 1px solid #e1e1e1;
      box-sizing: border-box;
      border-radius: 4px 4px 0 0;
      display: flex;
      .sendMyMessage-top-title {
        margin: 10px 0;
        width: 120px;
        line-height: 38px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #343434;
        border-right: 1px solid #e1e1e1;
      }
      .sendMyMessage-top-return {
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
    .sendMyMessage-info {
      padding: 0 15px;
      border: 1px solid #e1e1e1;
      box-sizing: border-box;
      border-top: none;
      border-radius: 0 0 4px 4px;
      .sendMyMessage-info-title {
        padding-top: 40px;
        color: #666;
        font-size: 15px;
      }
      /deep/.el-input {
        width: 388px;
      }
      /deep/.el-input__inner {
        border: 1px solid #a6a6a6;
      }
      /deep/.el-textarea__inner::placeholder {
        color: #999;
        font-size: 14px;
      }
      /* 谷歌 */
      /deep/.el-textarea__inner::-webkit-input-placeholder {
        font-size: 14px;
        color: #999;
      }
      /* 火狐 */
      /deep/.el-textarea__inner:-moz-placeholder {
        color: #999;
        font-size: 14px;
      }
      /*ie*/
      /deep/.el-textarea__inner:-ms-input-placeholder {
        color: #999;
        font-size: 14px;
      }
      /deep/.el-textarea .el-textarea__inner {
        height: 188px;
        resize: none;
        padding: 16px 20px;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
        background-color: #fcfcfc;
      }
      /deep/.el-button--small {
        background-color: #0093e6;
      }
      .el-button {
        border: none;
        background-color: #0093e6;
        width: 220px;
        height: 45px;
        color: #fff;
        font-size: 18px;
        position: absolute;
        left: -15px;
        bottom: -100px;
      }
    }
  }
}
</style>
