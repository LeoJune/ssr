<template>
  <div class="nav-wrap">
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div
      :loading="loading"
      class="right-wrap userInfo"
    >
      <h2>用户信息</h2>
      <div class="content-box">
        <div class="flex">
          <span>用户名:</span>
          <span>{{ userInfo.username }}</span>
        </div>
        <div class="flex">
          <span>密码:</span>
          <span class="password">{{ formatPassword() }}</span>
          <span>
            <i
              class="el-icon-edit-outline"
              @click="handleChangePassword"
            ></i>
          </span>
        </div>
        <div class="flex margin-fix">
          <span>头像:</span>
          <span class="center">
            <img
              v-show="!userInfo.userImg"
              :src="avatar"
              class="userImg"
            />
          </span>
          <span>
            <i
              class="el-icon-edit-outline"
              @click="openDialog"
            ></i>
          </span>
        </div>
        <div class="flex">
          <span>会员状态:</span>
          <span>{{ userInfo.memberLevelName }}</span>
        </div>
        <div class="flex">
          <span>公司名称:</span>
          <span>{{ userInfo.corporateName }}</span>
        </div>
        <div class="flex">
          <span>爱好:</span>
          <span>{{ userInfo.interest }}</span>
        </div>
      </div>
    </div>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <single-upload
        v-model="uploadImg"
        :sizeLimit="2 * 1024"
        :limit="2"
      ></single-upload>
      <el-button
        type="primary"
        size="small"
        class="buttonSure"
        @click="changeUserImg"
      >
        确定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import userNav from '@/components/user-nav/userNav'
// import { getInfo } from '@/api/login'
// import { updateAvatar } from '@/api/user'
import singleUpload from '@/components/Upload/singleUpload'
import { mapGetters } from 'vuex'
export default {
  // name: 'userInfo',
  components: {
    userNav,
    singleUpload
  },
  data () {
    return {
      loading: false,
      nowUserNav: '用户信息', // 现在所处位置
      dialogVisible: false,
      userInfo: {
        userImg: '',
        username: '',
        password: '',
        companyName: '',
        interest: ''
      },
      uploadImg: null
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'username'
    ])
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    handleChangePassword () {
      this.$router.push('/login/forgetPassword')
    },
    openDialog () {
      this.dialogVisible = true
    },
    changeUserImg () {
      this.$api.updateAvatar({ icon: this.uploadImg }).then(res => {
        this.$message({
          type: 'success',
          duration: 1000,
          message: '更新成功'
        })
        // this.getInfo()
        this.$store.dispatch('user/GetInfo')
        this.dialogVisible = false
      })
    },
    getInfo () {
      this.loading = true
      this.$api.getInfo().then(res => {
        this.loading = false
        // this.userInfo = Object.assign({}, res.data)
        this.userInfo = res.data
      })
    },
    formatPassword () {
      let mystr = ''
      const randomNum = parseInt(Math.random() * 10 + 6)
      for (let i = 0; i < randomNum; i++) {
        mystr += '*'
      }
      return mystr
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  .right-wrap {
    width: 960px;
    box-sizing: border-box;
    border: 1px solid #dadada;
    h2 {
      color: #070707;
      font-size: 20px;
      padding-top: 16px;
      padding-left: 16px;
      padding-bottom: 21px;
      font-weight: 700;
      border-bottom: 1px solid #e6e6e6;
    }
    .content-box {
      padding-top: 43px;
      padding-left: 16px;
      font-size: 16px;
      color: #666666;
      .flex {
        display: flex;
        margin-bottom: 32px;
        &.margin-fix {
          margin-bottom: 15px;
        }
        span:first-child {
          width: 72px;
          margin-right: 10px;
        }
        span:nth-child(2) {
          margin-right: 26px;
          width: 120px;
          text-align: center;
        }
        .userImg {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          transform: translateY(-12px);
        }
        i {
          color: #1497db;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
.dialog-footer {
  width: 100%;
}
.buttonSure {
  display: block;
  margin: 60px auto 0;
}
</style>
