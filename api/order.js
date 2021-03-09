import request from '@/utils/request'
// import qs from 'qs'

export function generateConfirmOrder (data) {
  return request({
    url: '/order/generateConfirmOrder',
    method: 'post',
    data
  })
}

export function generateOrder (data) {
  return request({
    url: '/order/generateOrder',
    method: 'post',
    data
    // data: qs.stringify(data, { indices: false })
  })
}

export function getOrderList (params) { // 订单列表
  return request({
    url: '/order/list',
    method: 'get',
    params
  })
}

export function cancelOrder (params) { // 取消订单
  return request({
    url: '/order/cancelUserOrder',
    method: 'post',
    params // orderId
  })
}

export function confirmReceive (params) { // 确认收货
  return request({
    url: '/order/confirmReceiveOrder',
    method: 'post',
    params // orderId
  })
}

export function deleteOrder (params) { // 删除订单
  return request({
    url: '/order/deleteOrder',
    method: 'post',
    params // orderId
  })
}

export function getOrderDetail (id) { // 订单详情
  return request({
    url: '/order/detail/' + id,
    method: 'get'
  })
}

export function orderPaySuccess () { // 用户支付成功
  return request({
    url: '/order/paySuccess',
    method: 'get'
  })
}

export function orderPayWay (id, params) { // 用户支付方式选择
  return request({
    url: '/order/pay/' + id,
    method: 'post',
    params // type
  })
}

export function getOrderPayTime () { // 订单支付超时时间
  return request({
    url: '/systemsetting/getOrderPayTime',
    method: 'get'
  })
}

export function buyAgain (id) { // 再次购买
  return request({
    url: '/order/buyAgain/' + id,
    method: 'post'
  })
}

export function payResult (id) { // 轮询支付结果
  return request({
    url: '/order/isPaySuccess/' + id,
    method: 'get'
  })
}
