
// const needLoginPath = ['/addAddress', '/addressManage', '/choosePay', '/myCollect', '/myMessage', '/myMessageDetail', '/myOrder', '/orderDetail', '/payment', '/sendMyMessage', '/userInfo', '/websiteLetter', '/websiteLetterDetail'] // 需要登录的页面
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
const redirectUrl = '/login'
export default function ({ route, req, res, redirect, store }) {
  const isClient = process.client
  const isServer = process.server
  let myToken
  if (isServer) {
    const cookies = req.headers.cookie
    if (cookies && cookies.includes('loginToken')) {
      if (cookies.includes(';')) {
        myToken = cookies.split(';').filter(v => {
          return v.includes('loginToken')
        })[0].split('=')[1]
      } else {
        myToken = cookies.split('=')[1]
      }
    }
    console.log(myToken + '-------------from isServer')
  }
  if (isClient) {
    myToken = getToken()
  }
  if (!myToken) {
    console.log('qudenglu')
    Message({
      type: 'warning',
      message: '请先登录',
      duration: 1000
    })
    redirect(redirectUrl)
  }
  // else {
  //   console.log(myToken)
  //   console.log('from middleware')
  //   store.dispatch('user/SingleSetToken', myToken).then(() => {
  //     console.log('已经设置了token在server端')
  //     console.log(store.state.user.token)
  //     store.dispatch('user/GetInfo').then(() => {
  //       console.log('获取成功')
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   })
  // }
}
