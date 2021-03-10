<template>
  <div class="company-profile">
    <div class="company-title">
      用户协议
      <el-button
        type="primary"
        @click="back"
      >
        返回
      </el-button>
    </div>
    <div class="company-info">
      <h3 class="agreement-title">用户服务协议</h3>
      <div class="company-info-desc">
        <p>尊敬的用户，欢迎您使用维元动力商城：</p>
        <p>
          本网站由所有和运营。在登录、使用本网站之前，您应当仔细阅读、充分理解《用户服务协议》（简称“本协议”）的全部内容，特别是本协议中以加粗字体显示的内容，您应当重点阅读。如果您不同意本协议或其中任何条款，请您立即停止登录或使用本网站；您开始登录或使用本网站，即表明您已同意本协议内容，本协议即构成对用户和中国电信（合称“双方”）有约束力的法律文件。
        </p>
        <p>第一条 定义</p>
        <p>1.1 本网站：是指由所有并负责运营的网站。</p>
        <p>
          1.2
          所有权以及相关的权利：在本协议中是指：第一，所有权；第二，知识产权，包括但不限于著作权、专利权、商标权、商业秘密等；第三，除上述权利之外的对物、信息及其载体和表现形式的使用、利用、传播、复制、发行、编辑、修改、处分等权利。
        </p>
        <p>1.3 用户：是指接受本网站服务的自然人、法人或其他组织。</p>
        <p>
          1.4
          个人信息：在本协议中，是指以电子或者其他方式记录的能够单独或者与其他信息结合识别用户身份或者反映用户活动情况的各种信息。
        </p>
        <p>
          1.5
          网络服务：是指本网站基于互联网方式向用户提供的业务宣传、业务查询、业务办理、交费充值、商品交易、用户关怀、营销活动等服务。
        </p>
        <p>
          1.6
          基础电信服务：是指中国电信向用户提供的公共网络基础设施、公共数据传送、基本话音通信服务等服务，包括但不限于移动通信服务、宽带服务等。
        </p>
        <p>
          1.7
          平台内经营者：是指除中国电信以外的、通过本网站销售商品或者提供服务的第三方经营者。
        </p>
        <p>第二条 网络服务内容</p>
        <p>2.1 本网站向用户提供的网络服务包括：</p>
        <p>
          (1)用户注册、登录、安全退出、找回密码、修改密码、基本资料修改、历史订单查询等服务
        </p>
        <p>(2)商品交易服务；</p>
        <p>(3)本网站为用户提供的其他服务。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '用户协议'
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '维元动力，用户协议'
        },
        {
          hid: 'description',
          name: 'description',
          content: '用户协议'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.company-profile {
  padding-bottom: 50px;
  .company-title {
    color: #1487d5;
    font-size: 30px;
    font-weight: 600;
    margin: 40px 100px 30px;
    display: flex;
    justify-content: space-between;
  }
  .agreement-title {
    text-align: center;
    font-size: 18px;
    line-height: 20px;
    margin: 30px 0 10px;
  }
  .company-info {
    border-top: 1px solid #ccc;
    margin: 0 100px;
    padding: 0 30px 30px;
    box-sizing: border-box;
    .company-info-title {
      font-size: 24px;
      color: #1487d5;
      font-weight: 600;
      padding: 30px 0 20px;
    }
    .company-info-bgc {
      width: 100%;
      // height: 40px;
      // overflow: hidden;
      margin-bottom: 10px;
      img {
        width: 100%;
        border-radius: 4px;
      }
    }
    .company-info-desc {
      word-break: break-all;
      font-size: 14px;
      line-height: 26px;
      color: #666;
      text-indent: 2em;
    }
  }
}
</style>
