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
    console.log('正在调用getBanner')
    this.$api.getAdInDictionary({ type: 1, status: 1 }).then(res => {
      commit('SET_BANNERLIST', res.data)
      console.log('调用getBanner结束，已提交')
    })
  }
}
