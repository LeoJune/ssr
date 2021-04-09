// import { setToken } from '@/utils/auth'
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
    console.log(req.headers.cookie)
    console.log(typeof req.headers.cookie)
    const cookies = req.headers.cookies
    let myToken = ''
    if (cookies && cookies.includes('loginToken')) {
      if (cookies.includes(';')) {
        myToken = cookies.split(';').filter(v => {
          return v.includes('loginToken')
        })[0].split('=')[1]
      } else {
        myToken = cookies.split('=')[1]
      }
      await dispatch('user/SingleSetToken', myToken)
      await dispatch({ type: 'user/GetInfo' })
    }
    await dispatch({ type: 'common/getBanner' })
    await dispatch({ type: 'common/getBrand' })
    await dispatch({ type: 'common/getNav' })
    await dispatch({ type: 'common/getTip' })
    await dispatch({ type: 'common/getFriendLink' })
    console.log(state)
  }
}
