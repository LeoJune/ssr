// import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
// import store from '@/store'

export default ({ $axios, store, redirect }, inject) => {
  let baseURL = ''
  if (process.server && process.env.NODE_ENV === 'development') {
    // console.log(process.env)
    // console.log(process.env.dev)
    baseURL = process.env.dev
  } else if (process.server && process.env.NODE_ENV === 'production') {
    baseURL = process.env.prod
  } else {
    baseURL = '/front'
  }
  const request = $axios.create({
    baseURL,
    timeout: 15000
  })

  // request拦截器
  request.interceptors.request.use(
    config => {
      if (getToken() || store.state.token) {
        config.headers.Authorization = getToken() || store.state.token // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  //  response拦截器
  request.interceptors.response.use(
    response => {
      /**
      * code为非200是抛错 可结合自己业务进行修改
      */
      // if (response.data instanceof ArrayBuffer) { //导出表格时候的返回数据
      //   return response.data
      // }
      const res = response.data// response.data没有code的时候为什么在if判断中不加res.code的判断会报错
      if (res.code && res.code !== 200) {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
        // 401:未登录;
        if (res.code === 401) {
          MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/FedLogout').then(() => {
              // location.reload()// 为了重新实例化vue-router对象 避免bug
              redirect('/login')
            })
          })
        }
        return Promise.reject(res.message)
      } else {
        return Promise.resolve(response.data)
      }
    },
    error => {
      // console.log('err' + error)// for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })

      return Promise.reject(error)
    }
  )

  // console.log('my request from plugins')
  inject('request', request)
}
