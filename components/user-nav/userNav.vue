<template>
  <div class="userNav">
    <ul class="userNav-tab">
      <li
        v-for="(item,index) in info"
        :key="index"
        :class="nowUserNav === item.title?'active':''"
        class="item"
        @click="handleClick(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // name: 'userNav',
  props: {
    nowUserNav: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      info: [
        {
          title: '用户信息',
          path: '/userInfo'
        },
        {
          title: '我的订单',
          path: '/myOrder'
        },
        {
          title: '地址管理',
          path: '/addressManage'
        },
        {
          title: '站内信息',
          path: '/websiteLetter'
        },
        {
          title: '我的收藏',
          path: '/myCollect'
        },
        {
          title: '在线反馈',
          path: '/myMessage'
        }
      ]
    }
  },
  create () {

  },
  methods: {
    hello () {
      console.log('this is ' + this.position)
    },
    handleClick (item) {
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang="less" scoped>
.userNav {
  width: 280px;
  .userNav-tab {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    margin-bottom: 20px;
    border-radius: 4px;
    li {
      height: 44px;
      line-height: 44px;
      border-bottom: 1px solid #d9d9d9;
      padding: 0 0 0 102px;
      color: #666;
      cursor: pointer;
      &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      &:last-child {
        border: none;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      &.active {
        background-color: #0193e6;
        color: #fff;
      }
    }
  }
}
</style>
