import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 是否登陆过

const needLoginPath = ['myOrder', 'myCollect', 'productDetail'] // 需要登录的页面
export default function ({ app, store }) {
  app.router.beforeEach((to, from, next) => {
    if (process.client) {
      NProgress.start()
    }
    if (getToken()) {
      console.log('getToken()+  !!!   ' + getToken())
      if (to.path === '/login') {
        next({ path: '/' })
        if (process.client) {
          NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
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
      console.log('meiyou token')
      if (!store.getters.hasLogin) {
        Message({
          type: 'warning',
          message: '请先登陆',
          duration: 1000
        })
        next('/login')
      }
    }
    // if (to.meta.title) {
    //   document.title = to.meta.title
    // }
    next()
  })

  app.router.afterEach(() => {
    if (process.client) {
      NProgress.done() // 结束Progress
    }
  })
}
