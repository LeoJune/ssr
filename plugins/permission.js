// import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 是否登陆过

const needLoginPath = ['/addAddress', '/addressManage', '/choosePay', '/myCollect', '/myMessage', '/myMessageDetail', '/myOrder', '/orderDetail', '/payment', '/sendMyMessage', '/userInfo', '/websiteLetter', '/websiteLetterDetail'] // 需要登录的页面
export default function ({ app, store }) {
  app.router.beforeEach((to, from, next) => {
    // if (process.client) {
    //   NProgress.start()
    // }
    console.log(getToken())
    console.log(store.state.token)
    console.log('举证完毕')
    if (getToken() || store.state.token) {
      console.log('getToken()+  !!!   ' + getToken())
      if (to.path === '/login') {
        next({ path: '/' })
        if (process.client) {
          // NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
        }
      } else if (store.getters.username === '') {
        store.dispatch('user/GetInfo').then(res => {
          if (to.meta.needLogin) {
            if (!store.getters.hasLogin) {
              Message({
                type: 'warning',
                message: '请先登陆',
                duration: 1000
              })
              next('/login')
            }
          }
          store.dispatch('cart/GetCartInfo').then(res => {
            console.log('chengg from getCartInfo')
          }).catch(error => {
            console.log(error + 'from getCartInfo')
          })
        }).catch((err) => {
          store.dispatch('user/FedLogout').then(() => {
            Message.error(err || '认证失败,请重新登陆')
            next({ path: '/' })
          })
        })
      }
    } else if (needLoginPath.includes(to.path)) {
      console.log('没有token')
      if (!store.getters.hasLogin) {
        Message({
          type: 'warning',
          message: '请先登陆',
          duration: 1000
        })
        next('/login')
      }
    }
    // else {
    //   console.log('没有token也不属于需要登录的页面')
    //   next()
    // }
    next()
  })

  app.router.afterEach(() => {
    console.log('gundao哈哈哈哈哈哈哈-------------------------------')
    if (process.client) {
      // NProgress.done() // 结束Progress
      console.log('jinlaile')
      document.body.scrollTop = 557
    }
  })
}
