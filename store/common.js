// import { getProductInCart, addProduct } from '@/api/cart'

export const state = () => ({
  bannerList: [],
  brandList: [],
  navList: [],
  tipList: [], // 导航栏的推荐（你是不是在找）
  friendLinkList: []
})
export const mutations = {
  SET_BANNERLIST: (state, arr) => {
    state.bannerList = arr
  },
  SET_BRANDLIST: (state, arr) => {
    state.brandList = arr
  },
  SET_NAVLIST: (state, arr) => {
    state.navList = arr
  },
  SET_TIPLIST: (state, arr) => {
    state.tipList = arr
  },
  SET_FRIENDLINKLIST: (state, arr) => {
    state.friendLinkList = arr
  }
}
export const actions = {
  // 获取banner
  getBanner ({ commit }) {
    this.$api.getAdInDictionary({ type: 1, status: 1 }).then(res => {
      console.log('开始获取banner！！！！！！！！！！！！！！！！！！！！！！！！')
      commit('SET_BANNERLIST', res.data)
      console.log('commit banner数据 ！！！！！！！！！！！！！！！！！！！！！！！！')
    })
  },
  getBrand ({ commit }) {
    this.$api.getBrandList({ typeCode: 'productbrand', pageSize: 100, pageNum: 1 }).then(res => {
      commit('SET_BRANDLIST', res.data.records)
    })
  },
  getNav ({ commit }) {
    this.$api.getAllCategory().then(res => {
      if (res.data.length > 7) {
        // this.navList = res.data.slice(0, 7)
        commit('SET_NAVLIST', res.data.slice(0, 7))
      } else {
        // this.navList = res.data
        commit('SET_NAVLIST', res.data)
      }
    })
  },
  getTip ({ commit }) {
    this.$api.getRecommdNavAndHome({ navStatus: 1 }).then(res => {
      // this.tipList = res.data
      commit('SET_TIPLIST', res.data)
    })
  },
  getFriendLink ({ commit }) {
    this.$api.getAdInDictionary({ type: 3, status: 1 }).then(res => {
      // this.friendLinkList = res.data
      commit('SET_FRIENDLINKLIST', res.data)
    })
  }
}
