import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'
const defaultUserImg = require('@/assets/images/header-e.png')

const user = {
  state: {
    token: getToken(),
    username: '',
    avatar: '',
    hasLogin: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => { // 用户名就是手机号
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_HASLOGIN: (state, boolean) => {
      state.hasLogin = boolean
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          const tokenStr = data.tokenHead + data.token
          // if (userInfo.checked) {
          //   setToken(tokenStr)
          // } else {
          //   console.log('meigou')
          //   sessionToken(tokenStr)
          //   console.log('meigou zhihou')
          // }
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_USERNAME', data.username)
          commit('SET_AVATAR', data.icon || defaultUserImg)
          commit('SET_HASLOGIN', true)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USERNAME', '')
          commit('SET_HASLOGIN', false)
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogout ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USERNAME', '')
        commit('SET_HASLOGIN', false)
        store.dispatch('ClearCart')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
