<template>
  <div class="company-profile">
    <div class="company-title">公司简介</div>
    <div class="company-info">
      <div class="company-info-title">公司背景</div>
      <div class="company-info-bgc">
        <img
          src="@/assets/images/company-bgc.jpg"
          alt=""
        />
      </div>
      <div class="company-info-desc">维元动力是您经验丰富的独立合作伙伴，可安全，快速地供应备件，并为您的热电联产厂（CHP）进行经济优化。在我们的在线报价中，您会发现不断增加的原始和替代零件，磨损和零件，系统组件以及为制造商MWM（道依茨），MAN，Jenbacher，CAT，利勃海尔，MTU，斯堪尼亚，以及更多 提供的范围从用于启动器的 A到用于火花塞的 Z 从简单的密封件到UPF过滤器，再到完整的模块，更换零件，气体分析或新旧系统。作为注册客户，您将收到与您的系统匹配的个性化报价，并受益于创新的系统管理或有效的QR码购物。在ONERGYS.de上，您还可以从知名制造商的库存中找到二手和新的系统组件，用于您的新建筑或装修。基于数十年来全球工厂建设和热电联产工厂运营的经验，我们为热电联产工厂的运营商，服务提供商和工厂建设者开发了一个创新平台。</div>
      <div class="company-info-title">仓库运输</div>
      <!-- <div class='company-info-bgc'><img src="../assets/images/company-bgc.jpg" alt=""></div> -->
      <div class="company-info-desc">
        <p>广泛的仓储，高效的物流以及我们软件系统与经验丰富的合作伙伴和可靠的物流服务提供商之间的连接，确保了及时的订单处理。因此，您将立即收到订购的商品。这样可以减少工厂停机时间，并减少您的仓储费用。</p>
        <p>维元动力是您经验丰富的独立合作伙伴，可安全，快速地供应备件，并为您的热电联产厂（CHP）进行经济优化。在我们的在线报价中，您会发现不断增加的原始和替代零件，磨损和零件，系统组件以及为制造商MWM（道依茨），MAN，Jenbacher，CAT，利勃海尔，MTU，斯堪尼亚，以及更多 提供的范围从用于启动器的 A到用于火花塞的 Z 从简单的密封件到UPF过滤器，再到完整的模块，更换零件，气体分析或新旧系统。作为注册客户，您将收到与您的系统匹配的个性化报价，并受益于创新的系统管理或有效的QR码购物。在ONERGYS.de上，您还可以从知名制造商的库存中找到二手和新的系统组件，用于您的新建筑或装修。基于数十年来全球工厂建设和热电联产工厂运营的经验，我们为热电联产工厂的运营商，服务提供商和工厂建设者开发了一个创新平台。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '公司简介'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '维元动力，公司简介'
        },
        {
          hid: 'description',
          name: 'description',
          content: '公司简介'
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
