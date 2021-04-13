// import { setToken, getToken } from '@/utils/auth'
export const state = () => ({

})

export const mutations = {

}

export const actions = {
  // async getProductDetail (store, { id, params }) {
  //   return await getProductData({ id, params })
  // }
  async nuxtServerInit ({ dispatch, commit, state }, { req }) {
    console.log('from nuxtSeverInit')
    // console.log(req.headers.cookie)
    console.log(typeof req.headers.cookie)
    let cookies = req.headers.cookie
    let myToken = ''
    // await dispatch({ type: 'common/getNav' })
    // await dispatch({ type: 'common/getBanner' })
    // await dispatch({ type: 'common/getBrand' })
    // await dispatch({ type: 'common/getTip' })
    // await dispatch({ type: 'common/getFriendLink' })
    if (cookies && cookies.includes('loginToken')) {
      cookies = decodeURI(cookies)
      console.log('进来cookies了')
      if (cookies.includes(';')) {
        myToken = cookies.split(';').filter(v => {
          return v.includes('loginToken')
        })[0].split('=')[1]
      } else {
        myToken = cookies.split('=')[1]
      }
      console.log(myToken + ' !!!!!!!!!!!from nuxtServeLint')
      await dispatch('user/SingleSetToken', myToken).then(() => {
        console.log('单独设置token  resolve状态')
      })
      // await dispatch('user/GetInfo').then(() => {
      //   console.log('获取用户信息 resolve状态')
      // }).catch(err => {
      //   console.log('获取用户信息失败')
      //   console.log(err)
      // })
    }
  }
}
