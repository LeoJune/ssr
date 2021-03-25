// import { getProductInCart, addProduct } from '@/api/cart'

export const state = () => ({
  cartList: [],
  selectAdress: ''
})
export const mutations = {
  SET_CARTLIST: (state, list) => {
    state.cartList = list
  },
  SET_SELECTADDRESS: (state, str) => {
    state.selectAddress = str
  },
  ADD_GOOD: (state, product) => {
    const hasThis = state.cartList.some(function (item) {
      return item.productId === product.productId
    })
    if (hasThis) {
      // console.log(state)
      // for (let i = 0; i < state.cartList.length; i++) {
      //   if (state.cartList[i].productId === product.productId) {
      //     state.cartList[i].quantity += product.quantity
      //   }
      // }
    } else {
      state.cartList.push(product)
    }
  }
}
export const actions = {
  // 设置选中的地址
  SetSelectAddressInfo ({ commit }, str) {
    commit('SET_SELECTADDRESS', str)
  },
  // 清空选中的地址
  ClearSelectAddressInfo ({ commit }) {
    commit('SET_SELECTADDRESS', [])
  },
  // 退出登陆时清空本地购物车
  ClearCart ({ commit }) {
    commit('SET_CARTLIST', [])
  },
  // 设置更新购物车
  GetCartInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$api.getProductInCart().then(res => {
        // console.log(res)
        commit('SET_CARTLIST', res.data)
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  AddGood ({ commit }, product) {
    return new Promise((resolve, reject) => {
      this.$api.addProduct(product).then(res => {
        commit('ADD_GOOD', product)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
