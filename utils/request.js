import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// let url = ''
// if (process.env.NODE_ENV === 'production') {
//   url = process.env.BASE_API
// } else {
//   url = '/api'
// }
// 创建axios实例
const service = axios.create({
  //  baseURL: process.env.BASE_API, // api的base_url
  baseURL: '/front',
  timeout: 15000 // 请求超时时间
  // withCredentials: true
})

//  request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // if (config.type) {
  //   config.baseURL = '/front'
  // } else {
  //   config.baseURL = '/api'
  // }
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
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
          store.dispatch('FedLogout').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(res.message)
    } else {
      return response.data
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

export default service
